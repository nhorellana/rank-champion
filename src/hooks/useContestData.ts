import { useState, useCallback, useEffect } from 'react';
import { Project, Score, ProjectScore, Judge } from '@/types/contest';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export const useContestData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase and setup real-time subscription
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .order('submission_date', { ascending: false });

        // Load judges
        const { data: judgesData } = await supabase
          .from('judges')
          .select('*');

        // Load scores
        const { data: scoresData } = await supabase
          .from('scores')
          .select('*');

        if (projectsData) {
          setProjects(projectsData.map(p => ({
            ...p,
            proposedSolution: p.proposed_solution,
            submissionDate: p.submission_date
          })));
        }
        if (judgesData) setJudges(judgesData);
        if (scoresData) {
          setScores(scoresData.map(s => ({
            projectId: s.project_id,
            judgeId: s.judge_id,
            categoryA: s.category_a,
            categoryB: s.category_b,
            categoryC: s.category_c,
            categoryD: s.category_d,
            lastUpdated: s.last_updated
          })));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Setup real-time subscription for scores
    const subscription = supabase
      .channel('scores-changes')
      .on(
        'postgres_changes' as const,
        {
          event: '*',
          schema: 'public',
          table: 'scores'
        },
        (payload: RealtimePostgresChangesPayload<Database['public']['Tables']['scores']['Row']>) => {
          setScores(prevScores => {
            // Handle DELETE event
            if (payload.eventType === 'DELETE' && payload.old) {
              return prevScores.filter(
                s => s.projectId !== payload.old.project_id || s.judgeId !== payload.old.judge_id
              );
            }

            // Handle INSERT and UPDATE events
            const rawScore = payload.new;
            if (!rawScore || !('project_id' in rawScore)) return prevScores;

            const transformedScore = {
              projectId: rawScore.project_id ?? '',
              judgeId: rawScore.judge_id ?? '',
              categoryA: rawScore.category_a,
              categoryB: rawScore.category_b,
              categoryC: rawScore.category_c,
              categoryD: rawScore.category_d,
              lastUpdated: rawScore.last_updated ?? new Date().toISOString()
            };

            const existingIndex = prevScores.findIndex(
              s => s.projectId === transformedScore.projectId && s.judgeId === transformedScore.judgeId
            );

            if (existingIndex >= 0) {
              const newScores = [...prevScores];
              newScores[existingIndex] = transformedScore;
              return newScores;
            } else {
              return [...prevScores, transformedScore];
            }
          });
        }
      )
      .subscribe();

    loadData();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateScore = useCallback(async (updatedScore: Score) => {
    try {
      const { error } = await supabase
        .from('scores')
        .upsert({
          project_id: updatedScore.projectId,
          judge_id: updatedScore.judgeId,
          category_a: updatedScore.categoryA,
          category_b: updatedScore.categoryB,
          category_c: updatedScore.categoryC,
          category_d: updatedScore.categoryD,
        }, {
          onConflict: 'project_id,judge_id'
        })
        .select();

      if (error) throw error;

      // Update local state
      setScores(prevScores => {
        const existingIndex = prevScores.findIndex(
          s => s.projectId === updatedScore.projectId && s.judgeId === updatedScore.judgeId
        );

        if (existingIndex >= 0) {
          const newScores = [...prevScores];
          newScores[existingIndex] = { ...updatedScore, lastUpdated: new Date().toISOString() };
          return newScores;
        } else {
          return [...prevScores, { ...updatedScore, lastUpdated: new Date().toISOString() }];
        }
      });
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }, []);

  const getProjectScores = useCallback((): ProjectScore[] => {
    return projects.map(project => {
      const projectScores = scores.filter(s => s.projectId === project.id);

      const avgA = projectScores.length > 0
        ? projectScores.reduce((sum, s) => sum + s.categoryA, 0) / projectScores.length
        : 0;
      const avgB = projectScores.length > 0
        ? projectScores.reduce((sum, s) => sum + s.categoryB, 0) / projectScores.length
        : 0;
      const avgC = projectScores.length > 0
        ? projectScores.reduce((sum, s) => sum + s.categoryC, 0) / projectScores.length
        : 0;
      const avgD = projectScores.length > 0
        ? projectScores.reduce((sum, s) => sum + s.categoryD, 0) / projectScores.length
        : 0;

      const totalAverage = (avgA + avgB + avgC + avgD) / 4;

      return {
        projectId: project.id,
        averageA: Number(avgA.toFixed(2)),
        averageB: Number(avgB.toFixed(2)),
        averageC: Number(avgC.toFixed(2)),
        averageD: Number(avgD.toFixed(2)),
        totalAverage: Number(totalAverage.toFixed(2)),
        rank: 0 // Will be calculated after sorting
      };
    }).sort((a, b) => b.totalAverage - a.totalAverage)
      .map((score, index) => ({ ...score, rank: index + 1 }));
  }, [projects, scores]);

  const getScoreByJudgeAndProject = useCallback((judgeId: string, projectId: string): Score | undefined => {
    return scores.find(s => s.judgeId === judgeId && s.projectId === projectId);
  }, [scores]);

  return {
    projects,
    judges,
    scores,
    loading,
    updateScore,
    getProjectScores,
    getScoreByJudgeAndProject
  };
};
