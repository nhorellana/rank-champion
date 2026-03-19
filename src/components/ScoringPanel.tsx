import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project, Judge, Score } from "@/types/contest";
import { Save, Star, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface ScoringPanelProps {
  projects: Project[];
  judges: Judge[];
  scores: Score[];
  onUpdateScore: (score: Score) => void;
}

export const ScoringPanel = ({ projects, judges, scores, onUpdateScore }: ScoringPanelProps) => {
  const [selectedJudge, setSelectedJudge] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [categoryA, setCategoryA] = useState<number>(1);
  const [categoryB, setCategoryB] = useState<number>(1);
  const [categoryC, setCategoryC] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [melaJuego, setMelaJuego] = useState<boolean>(false);
  const { toast } = useToast();

  const currentScore = scores.find(
    s => s.judgeId === selectedJudge && s.projectId === selectedProject
  );

  const loadCurrentScore = () => {
    if (currentScore) {
      setCategoryA(currentScore.categoryA);
      setCategoryB(currentScore.categoryB);
      setCategoryC(currentScore.categoryC);
      setComment(currentScore.comment || "");
      setMelaJuego(currentScore.melaJuego);
    } else {
      setCategoryA(1);
      setCategoryB(1);
      setCategoryC(1);
      setComment("");
      setMelaJuego(false);
    }
  };

  const handleJudgeChange = (judgeId: string) => {
    setSelectedJudge(judgeId);
    if (selectedProject) {
      const score = scores.find(s => s.judgeId === judgeId && s.projectId === selectedProject);
      if (score) {
        setCategoryA(score.categoryA);
        setCategoryB(score.categoryB);
        setCategoryC(score.categoryC);
        setComment(score.comment || "");
        setMelaJuego(score.melaJuego);
      } else {
        setCategoryA(5);
        setCategoryB(5);
        setCategoryC(5);
        setComment("");
        setMelaJuego(false);
      }
    }
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    if (selectedJudge) {
      const score = scores.find(s => s.judgeId === selectedJudge && s.projectId === projectId);
      if (score) {
        setCategoryA(score.categoryA);
        setCategoryB(score.categoryB);
        setCategoryC(score.categoryC);
        setComment(score.comment || "");
        setMelaJuego(score.melaJuego);
      } else {
        setCategoryA(1);
        setCategoryB(1);
        setCategoryC(1);
        setComment("");
        setMelaJuego(false);
      }
    }
  };

  const handleSaveScore = () => {
    if (!selectedJudge || !selectedProject) {
      toast({
        title: "Falta selección",
        description: "Por favor, selecciona un evaluador y un proyecto",
        variant: "destructive"
      });
      return;
    }

    const newScore: Score = {
      judgeId: selectedJudge,
      projectId: selectedProject,
      categoryA,
      categoryB,
      categoryC,
      lastUpdated: new Date().toISOString(),
      comment,
      melaJuego,
    };

    onUpdateScore(newScore);

    toast({
      title: "Puntaje actualizado",
      description: `Puntaje guardado para ${judges.find(j => j.id === selectedJudge)?.name}`,
    });
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const selectedJudgeData = judges.find(j => j.id === selectedJudge);

  const eficiencia = selectedProjectData?.eficienciaRecursos ?? 3;
  const desempeno = selectedProjectData?.desempenoEquipo ?? 3;
  const totalScore = ((categoryA * 30 + categoryB * 20 + categoryC * 10 + eficiencia * 10 + desempeno * 30) / 100).toFixed(2);

  const renderValueLabel = (value: number) => {
    switch (value) {
      case 1: return "Muy débil";
      case 2: return "Débil";
      case 3: return "Aceptable";
      case 4: return "Bueno";
      case 5: return "Excelente";
      default: return value.toString();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-innovation" />
            Panel de calificación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Selecciona un evaluador</label>
              <Select value={selectedJudge} onValueChange={handleJudgeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Quién eres?" />
                </SelectTrigger>
                <SelectContent>
                  {judges.map((judge) => (
                    <SelectItem key={judge.id} value={judge.id}>
                      <div className="flex flex-col items-start">
                        <div className="font-medium">{judge.name}</div>
                        <div className="text-xs text-muted-foreground">{judge.expertise}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Selecciona un proyecto</label>
              <Select value={selectedProject} onValueChange={handleProjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="¿Qué proyecto estás evaluando?" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      <div>
                        <div className="font-medium">{project.title}</div>
                        {project.category && (
                          <div className="text-xs text-muted-foreground">{project.category}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProjectData && (
            <Card className="bg-muted/30">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-2xl">{selectedProjectData.title}</h3>
                  {selectedProjectData.category && (
                    <Badge variant="outline">{selectedProjectData.category}</Badge>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Descripción</h4>
                  <p className="text-xs text-muted-foreground">{selectedProjectData.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Solución propuesta</h4>
                  <p className="text-xs text-muted-foreground">{selectedProjectData.proposedSolution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1">Miembros del equipo</h4>
                  <p className="text-xs text-muted-foreground">{selectedProjectData.team.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedJudge && selectedProject && (
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-xl font-bold text-muted-foreground">Puntaje ponderado actual:</div>
                  <div className="text-3xl font-bold text-primary">{totalScore}</div>
                </div>

                {/* Editable categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Calidad de la Ejecución (PoC) <span className="text-muted-foreground font-normal">— 30%</span>
                    </label>
                    <Select value={categoryA.toString()} onValueChange={(value) => setCategoryA(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona puntaje" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}. {renderValueLabel(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Validación y Resultados <span className="text-muted-foreground font-normal">— 20%</span>
                    </label>
                    <Select value={categoryB.toString()} onValueChange={(value) => setCategoryB(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona puntaje" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}. {renderValueLabel(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Escalabilidad Técnica <span className="text-muted-foreground font-normal">— 10%</span>
                    </label>
                    <Select value={categoryC.toString()} onValueChange={(value) => setCategoryC(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona puntaje" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value}. {renderValueLabel(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Fixed (read-only) categories */}
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Categorías fijas (definidas por los organizadores)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Eficiencia de Recursos <span className="font-normal">— 10%</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border/50">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">{eficiencia}</span>
                        <span className="text-xs text-muted-foreground">— {renderValueLabel(eficiencia)}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">
                        Desempeño del Equipo <span className="font-normal">— 30%</span>
                      </label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 border border-border/50">
                        <Lock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold">{desempeno}</span>
                        <span className="text-xs text-muted-foreground">— {renderValueLabel(desempeno)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comentarios adicionales (opcional)</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe aquí tus observaciones sobre el proyecto..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button onClick={loadCurrentScore} variant="outline" className="flex-1">
                  Reiniciar a puntaje actual
                </Button>
                <Button onClick={handleSaveScore} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar puntaje
                </Button>
              </div>

              {currentScore && (
                <div className="text-xs text-muted-foreground text-center">
                  Última actualización: {new Date(currentScore.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
