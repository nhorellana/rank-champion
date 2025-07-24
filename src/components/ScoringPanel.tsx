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
        title: "Missing Selection",
        description: "Please select both a judge and a project",
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
      title: "Score Updated",
      description: `Score saved for ${judges.find(j => j.id === selectedJudge)?.name}`,
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
            Judge Scoring Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Judge</label>
              <Select value={selectedJudge} onValueChange={handleJudgeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a judge..." />
                </SelectTrigger>
                <SelectContent>
                  {judges.map((judge) => (
                    <SelectItem key={judge.id} value={judge.id}>
                      <div className="flex items-center gap-2">
                        <span>{judge.avatar}</span>
                        <div>
                          <div className="font-medium">{judge.name}</div>
                          <div className="text-xs text-muted-foreground">{judge.expertise}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Select Project</label>
              <Select value={selectedProject} onValueChange={handleProjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." />
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
                  <div className="text-sm text-muted-foreground">Current Total Average</div>
                  <div className="text-2xl font-bold text-primary">{totalScore}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center justify-between">
                      Category A (Innovation)
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
                      Category B (Technical)
                      <span className="text-innovation font-bold">{categoryB}</span>
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
                      Category C (Impact)
                      <span className="text-innovation-tertiary font-bold">{categoryC}</span>
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
                      Category D (Feasibility)
                      <span className="text-success font-bold">{categoryD}</span>
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

              <div className="flex gap-4">
                <Button onClick={loadCurrentScore} variant="outline" className="flex-1">
                  Reset to Current
                </Button>
                <Button onClick={handleSaveScore} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Score
                </Button>
              </div>

              {currentScore && (
                <div className="text-xs text-muted-foreground text-center">
                  Last updated: {new Date(currentScore.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};