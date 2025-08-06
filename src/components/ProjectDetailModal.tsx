import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectScore, Judge, Score } from "@/types/contest";
import { Users, Calendar, Trophy, Target, Lightbulb, AlertCircle } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  projectScore: ProjectScore | null;
  judges: Judge[];
  scores: Score[];
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal = ({
  project,
  projectScore,
  judges,
  scores,
  isOpen,
  onClose
}: ProjectDetailModalProps) => {
  if (!project || !projectScore) return null;

  const projectScores = scores.filter(s => s.projectId === project.id);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Trophy className={`h-6 w-6 ${getRankColor(projectScore.rank)}`} />
            <div>
              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-sm font-medium ${getRankColor(projectScore.rank)}`}>
                  Posición #{projectScore.rank}
                </span>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Resumen del proyecto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Descripción</h4>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.submissionDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Problema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.problem}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-innovation" />
                  Solución propuesta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.proposedSolution}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Etiquetas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scoring Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Puntajes actuales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground">Puntaje promedio</div>
                  <div className="text-2xl font-bold text-primary">{projectScore.totalAverage}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Viabilidad</div>
                    <div className="text-lg font-semibold text-primary">{projectScore.averageA}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Potencial</div>
                    <div className="text-lg font-semibold text-primary">{projectScore.averageB}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Equipo</div>
                    <div className="text-lg font-semibold text-primary">{projectScore.averageC}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground">Innovación</div>
                    <div className="text-lg font-semibold text-primary">{projectScore.averageD}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Puntajes de los jurados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {judges.map((judge) => {
                  const judgeScore = projectScores.find(s => s.judgeId === judge.id);
                  return (
                    <div key={judge.id} className="bg-muted/60 rounded-lg p-3 flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2">
                        {/* <span className="text-lg">{judge.avatar}</span> */}
                        <div>
                          <div className="font-medium text-sm">{judge.name}</div>
                          <div className="text-xs text-muted-foreground">{judge.expertise}</div>
                        </div>
                      </div>
                      {judgeScore ? (
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="text-center">
                            <div className="text-muted-foreground">Viabilidad</div>
                            <div className="font-semibold text-primary">{judgeScore.categoryA}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground">Potencial</div>
                            <div className="font-semibold text-primary">{judgeScore.categoryB}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground">Equipo</div>
                            <div className="font-semibold text-primary">{judgeScore.categoryC}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground">Innovación</div>
                            <div className="font-semibold text-primary">{judgeScore.categoryD}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-left -mt-2">
                          <div className="text-muted-foreground font-bold text-xs">No ha evaluado</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
