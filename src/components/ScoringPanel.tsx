import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project, Judge, Score } from "@/types/contest";
import { Save, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScoringPanelProps {
  projects: Project[];
  judges: Judge[];
  scores: Score[];
  onUpdateScore: (score: Score) => void;
}

export const ScoringPanel = ({ projects, judges, scores, onUpdateScore }: ScoringPanelProps) => {
  const [selectedJudge, setSelectedJudge] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [categoryA, setCategoryA] = useState<number>(5);
  const [categoryB, setCategoryB] = useState<number>(5);
  const [categoryC, setCategoryC] = useState<number>(5);
  const [categoryD, setCategoryD] = useState<number>(5);
  const { toast } = useToast();

  const currentScore = scores.find(
    s => s.judgeId === selectedJudge && s.projectId === selectedProject
  );

  const loadCurrentScore = () => {
    if (currentScore) {
      setCategoryA(currentScore.categoryA);
      setCategoryB(currentScore.categoryB);
      setCategoryC(currentScore.categoryC);
      setCategoryD(currentScore.categoryD);
    } else {
      setCategoryA(5);
      setCategoryB(5);
      setCategoryC(5);
      setCategoryD(5);
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
        setCategoryD(score.categoryD);
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
        setCategoryD(score.categoryD);
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
      categoryD,
      lastUpdated: new Date().toISOString()
    };

    onUpdateScore(newScore);

    toast({
      title: "Puntaje actualizado",
      description: `Puntaje guardado para ${judges.find(j => j.id === selectedJudge)?.name}`,
    });
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const selectedJudgeData = judges.find(j => j.id === selectedJudge);
  const totalScore = ((categoryA + categoryB + categoryC + categoryD) / 4).toFixed(2);

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
                        <div className="text-xs text-muted-foreground">{project.category}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProjectData && (
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{selectedProjectData.title}</h3>
                  <Badge variant="secondary">{selectedProjectData.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedProjectData.description}</p>
              </CardContent>
            </Card>
          )}

          {selectedJudge && selectedProject && (
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-sm text-muted-foreground">Puntaje promedio actual</div>
                  <div className="text-2xl font-bold text-primary">{totalScore}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Viabilidad
                      <span className="text-primary font-bold">{categoryA}</span>
                    </label>
                    <Slider
                      value={[categoryA]}
                      onValueChange={(value) => setCategoryA(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Potencial
                      <span className="text-primary font-bold">{categoryB}</span>
                    </label>
                    <Slider
                      value={[categoryB]}
                      onValueChange={(value) => setCategoryB(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Equipo
                      <span className="text-primary font-bold">{categoryC}</span>
                    </label>
                    <Slider
                      value={[categoryC]}
                      onValueChange={(value) => setCategoryC(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Innovación
                      <span className="text-primary font-bold">{categoryD}</span>
                    </label>
                    <Slider
                      value={[categoryD]}
                      onValueChange={(value) => setCategoryD(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
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
