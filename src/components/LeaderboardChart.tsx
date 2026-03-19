import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectScore, Project, Judge, Score } from "@/types/contest";
import { Trophy, TrendingUp, Award, Star } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface LeaderboardChartProps {
  projectScores: ProjectScore[];
  projects: Project[];
  judges: Judge[];
  scores: Score[];
}

export const LeaderboardChart = ({ projectScores, projects, judges, scores }: LeaderboardChartProps) => {
  const [selectedJudgeId, setSelectedJudgeId] = useState<string>("todos");

  // Calculate personal rankings for a specific judge
  const getPersonalProjectScores = (judgeId: string): ProjectScore[] => {
    const judgeScores = scores.filter(score => score.judgeId === judgeId);

    const personalScores = projects.map(project => {
      const score = judgeScores.find(s => s.projectId === project.id);
      const eficiencia = project.eficienciaRecursos;
      const desempeno = project.desempenoEquipo;

      if (!score) {
        return {
          projectId: project.id,
          averageA: 0,
          averageB: 0,
          averageC: 0,
          totalAverage: 0,
          rank: 0,
          weight: project.weight || 999
        };
      }

      const total = (score.categoryA * 30 + score.categoryB * 20 + score.categoryC * 10 + eficiencia * 10 + desempeno * 30) / 100;
      return {
        projectId: project.id,
        averageA: score.categoryA,
        averageB: score.categoryB,
        averageC: score.categoryC,
        totalAverage: Number(total.toFixed(1)),
        rank: 0,
        weight: project.weight || 999
      };
    }).sort((a, b) => {
      // Sort by weight first (lower numbers = higher priority), then by total average
      if (a.weight !== b.weight) {
        return a.weight - b.weight;
      }
      return 0;
    });

    // Assign ranks
    return personalScores.map((score, index) => ({
      ...score,
      rank: index + 1
    }));
  };
  const displayScores = selectedJudgeId === "todos"
    ? projectScores
    : getPersonalProjectScores(selectedJudgeId);

  const isPersonalView = selectedJudgeId !== "todos";

  const chartData = displayScores.slice(0, 10).map(score => {
    const project = projects.find(p => p.id === score.projectId);
    return {
      name: project?.title.substring(0, 15) + "..." || "Unknown",
      totalScore: score.totalAverage,
      categoryA: score.averageA,
      categoryB: score.averageB,
      categoryC: score.averageC,
      rank: score.rank,
      weight: score.weight
    };
  });

  const topThree = projectScores.sort((a, b) => b.totalAverage - a.totalAverage).slice(0, 3);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500 bg-yellow-500/10";
    if (rank === 2) return "text-gray-400 bg-gray-400/10";
    if (rank === 3) return "text-amber-600 bg-amber-600/10";
    return "text-muted-foreground bg-muted/50";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Award className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
    return <TrendingUp className="h-6 w-6 text-muted-foreground" />;
  };

  const getMelaJuegoCount = (projectId: string) => {
    return scores.filter(score => score.projectId === projectId && score.melaJuego).length;
  };

  console.log('Project scores', projectScores, projects)

  return (
    <div className="space-y-6">
      {/* Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 3 Proyectos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((score) => {
              const project = projects.find(p => p.id === score.projectId);
              return (
                <div
                  key={score.projectId}
                  className={`p-4 rounded-lg border-2 ${
                    score.rank === 1
                      ? "border-yellow-500/30 bg-yellow-500/5"
                      : score.rank === 2
                      ? "border-gray-400/30 bg-gray-400/5"
                      : "border-amber-600/30 bg-amber-600/5"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getRankIcon(score.rank)}
                    <span className={`font-bold ${getRankColor(score.rank).split(' ')[0]}`}>
                      #{score.rank}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{project?.title}</h3>
                  <div className="text-2xl font-bold text-primary">{score.totalAverage} / 5</div>
                  <div className="grid grid-cols-3 gap-1 mt-3 text-xs">
                    <div className="text-center">
                      <div className="text-muted-foreground">Calidad PoC</div>
                      <div className="font-semibold">{score.averageA}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Validación</div>
                      <div className="font-semibold">{score.averageB}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Escalabilidad</div>
                      <div className="font-semibold">{score.averageC}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Judge Selector */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="judge-select" className="text-sm font-medium">Juez:</Label>
            <Select value={selectedJudgeId} onValueChange={setSelectedJudgeId}>
              <SelectTrigger id="judge-select" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {judges.map((judge) => (
                  <SelectItem key={judge.id} value={judge.id}>
                    {judge.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {isPersonalView ? "Resumen de puntajes (Personal)" : "Resumen de puntajes"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="categoryA" fill="hsl(var(--primary))" name="Calidad PoC" />
                <Bar dataKey="categoryB" fill="hsl(var(--innovation))" name="Validación" />
                <Bar dataKey="categoryC" fill="hsl(var(--innovation-tertiary))" name="Escalabilidad" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isPersonalView ? "Ranking completo (Personal)" : "Ranking completo"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {displayScores.sort((a, b) => b.totalAverage - a.totalAverage).map((score) => {
              const project = projects.find(p => p.id === score.projectId);
              return (
                <div
                  key={score.projectId}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankColor(score.rank)}`}>
                        <span className="text-sm font-bold">{score.rank}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{project?.title}</h4>
                        <p className="text-xs text-muted-foreground">{project?.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getMelaJuegoCount(score.projectId) > 0 && (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-semibold">{getMelaJuegoCount(score.projectId)}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{score.totalAverage}</div>
                        <div className="text-xs text-muted-foreground">Promedio</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <div className="text-muted-foreground">Calidad PoC</div>
                          <div className="font-semibold">{score.averageA}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Validación</div>
                          <div className="font-semibold">{score.averageB}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Escalabilidad</div>
                          <div className="font-semibold">{score.averageC}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    {/* Row 1: Rank - Title - Average */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getRankColor(score.rank)}`}>
                          <span className="text-sm font-bold">{score.rank}</span>
                        </div>
                        <h4 className="font-medium truncate">{project?.title}</h4>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-lg font-bold text-primary">{score.totalAverage}</div>
                      </div>
                    </div>

                    {/* Row 2: Category Scores */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div>
                        <div className="text-muted-foreground">Calidad PoC</div>
                        <div className="font-semibold">{score.averageA}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Validación</div>
                        <div className="font-semibold">{score.averageB}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Escalabilidad</div>
                        <div className="font-semibold">{score.averageC}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
