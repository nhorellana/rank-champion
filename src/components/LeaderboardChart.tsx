import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectScore, Project } from "@/types/contest";
import { Trophy, TrendingUp, Award } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface LeaderboardChartProps {
  projectScores: ProjectScore[];
  projects: Project[];
}

export const LeaderboardChart = ({ projectScores, projects }: LeaderboardChartProps) => {
  const chartData = projectScores.slice(0, 10).map(score => {
    const project = projects.find(p => p.id === score.projectId);
    return {
      name: project?.title.substring(0, 15) + "..." || "Unknown",
      totalScore: score.totalAverage,
      categoryA: score.averageA,
      categoryB: score.averageB,
      categoryC: score.averageC,
      categoryD: score.averageD,
      rank: score.rank
    };
  });

  const topThree = projectScores.slice(0, 3);

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
                  <Badge variant="default" className="mb-2">{project?.category}</Badge>
                  <div className="text-2xl font-bold text-primary">{score.totalAverage} / 10</div>

                  <div className="grid grid-cols-2 gap-1 mt-3 text-xs">
                    <div className="text-center">
                      <div className="text-muted-foreground">Viabilidad</div>
                      <div className="font-semibold">{score.averageA}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Potencial</div>
                      <div className="font-semibold">{score.averageB}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Equipo</div>
                      <div className="font-semibold">{score.averageC}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">Innovación</div>
                      <div className="font-semibold">{score.averageD}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Resumen de puntajes
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
                <YAxis domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="categoryA" fill="hsl(var(--primary))" name="Viabilidad" />
                <Bar dataKey="categoryB" fill="hsl(var(--innovation))" name="Potencial" />
                <Bar dataKey="categoryC" fill="hsl(var(--innovation-tertiary))" name="Equipo" />
                <Bar dataKey="categoryD" fill="hsl(var(--success))" name="Innovación" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking completo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {projectScores.map((score) => {
              const project = projects.find(p => p.id === score.projectId);
              return (
                <div
                  key={score.projectId}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
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
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{score.totalAverage}</div>
                      <div className="text-xs text-muted-foreground">Puntaje promedio</div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs text-center">
                      <div>
                        <div className="text-muted-foreground">Viabilidad</div>
                        <div className="font-semibold">{score.averageA}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Potencial</div>
                        <div className="font-semibold">{score.averageB}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Equipo</div>
                        <div className="font-semibold">{score.averageC}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Innovación</div>
                        <div className="font-semibold">{score.averageD}</div>
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
