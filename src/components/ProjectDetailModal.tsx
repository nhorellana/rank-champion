import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, ProjectScore, Judge, Score } from "@/types/contest";
import { Users, Calendar, Trophy, Target, Lightbulb, TagIcon, Star, MessageSquare } from "lucide-react";

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
  const finalistsVotes = projectScores.filter(s => s.melaJuego).length;

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
          <DialogTitle className="text-2xl text-start">{project.title}</DialogTitle>
          <div className="flex items-center gap-2">
            <Trophy className={`h-4 w-4 ${getRankColor(projectScore.rank)}`} />
            <span className={`text-sm font-medium ${getRankColor(projectScore.rank)}`}>
              Posición #{projectScore.rank}
            </span>
            <Badge variant="outline">{project.category}</Badge>
            {finalistsVotes > 0 && (
              <Badge variant="secondary" className="bg-innovation/20 text-innovation border-innovation">
                <Star className="h-3 w-3 mr-1" />
                {finalistsVotes} juez{finalistsVotes === 1 ? '' : 'es'} apuesta{finalistsVotes === 1 ? '' : 'n'} por este proyecto
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
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
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Categoría</h4>
                  <p className="text-muted-foreground">{project.problem}</p>
                </div>
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
                <CardTitle className="flex items-center gap-2">
                  <TagIcon className="h-5 w-5 text-primary" />
                  Etiquetas
                </CardTitle>
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
                    <div key={judge.id} className="bg-muted/60 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium text-sm">{judge.name}</div>
                            <div className="text-xs text-muted-foreground">{judge.expertise}</div>
                          </div>
                        </div>
                        {judgeScore?.melaJuego && (
                          <Badge variant="secondary" className="bg-innovation/20 text-innovation border-innovation">
                            <Star className="h-3 w-3 mr-1" />
                            Me la juego
                          </Badge>
                        )}
                      </div>
                      
                      {judgeScore ? (
                        <>
                          <div className="grid grid-cols-2 gap-2 text-xs">
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
                          
                          {judgeScore.comment && (
                            <div className="mt-3 p-3 bg-muted/40 rounded-md">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">Comentarios</span>
                              </div>
                              <p className="text-xs text-foreground">{judgeScore.comment}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-left">
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
