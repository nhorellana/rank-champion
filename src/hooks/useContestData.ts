import { useState, useCallback } from 'react';
import { Project, Score, ProjectScore } from '@/types/contest';
import { mockProjects, mockScores, mockJudges } from '@/data/mockData';

export const useContestData = () => {
  const [projects] = useState<Project[]>(mockProjects);
  const [judges] = useState(mockJudges);
  const [scores, setScores] = useState<Score[]>(mockScores);

  const updateScore = useCallback((updatedScore: Score) => {
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
    updateScore,
    getProjectScores,
    getScoreByJudgeAndProject
  };
};