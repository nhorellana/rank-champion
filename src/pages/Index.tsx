import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../public/logo-copec.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { ScoringPanel } from "@/components/ScoringPanel";
import { LeaderboardChart } from "@/components/LeaderboardChart";
import { useContestData } from "@/hooks/useContestData";
import { Project } from "@/types/contest";
import { Trophy, Users, Star, BarChart3, Target, Lightbulb } from "lucide-react";

const Index = () => {
  const { projects, judges, scores, loading, updateScore, getProjectScores } = useContestData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const projectScores = getProjectScores();
  const selectedProjectScore = selectedProject
    ? projectScores.find(ps => ps.projectId === selectedProject.id)
    : null;

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProject(null);
  };

  const topProject = projectScores[0];
  const winningProject = projects.find(p => p.id === topProject?.projectId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando datos del concurso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-3">
                <img src={logo} className="w-40" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Copec desafío de innovación</h1>
                <p className="text-sm text-muted-foreground">Desafío de innovación abierta para universitarios</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block md:text-right">
                <div className="text-sm text-muted-foreground">Total de proyectos</div>
                <div className="text-xl font-bold text-primary">{projects.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-innovation/10 to-innovation-secondary/10 border-innovation/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Trophy className="h-8 w-8 text-innovation" />
                <div>
                  <p className="text-sm text-muted-foreground">Proyecto líder</p>
                  <p className="text-lg font-semibold text-foreground">
                    {winningProject?.title || "TBD"}
                  </p>
                  <p className="text-sm text-innovation">{topProject?.totalAverage || "0"} puntaje promedio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hidden md:block">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Categorías</p>
                  <p className="text-lg font-semibold text-foreground">4</p>
                  <p className="text-sm text-primary">Viabilidad, Potencial, Equipo, Innovación</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hidden md:block">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Jurados</p>
                  <p className="text-lg font-semibold text-foreground">{judges.length}</p>
                  <p className="text-sm text-success">Todos calificando</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Puntaje promedio</p>
                  <p className="text-lg font-semibold text-foreground">
                    {(projectScores.reduce((sum, ps) => sum + ps.totalAverage, 0) / projectScores.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-warning">De 10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="scoring" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Calificación
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Ranking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const projectScore = projectScores.find(ps => ps.projectId === project.id);
                return projectScore ? (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    projectScore={projectScore}
                    onViewDetails={handleViewDetails}
                  />
                ) : null;
              })}
            </div>
          </TabsContent>

          <TabsContent value="scoring">
            <ScoringPanel
              projects={projects}
              judges={judges}
              scores={scores}
              onUpdateScore={updateScore}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <LeaderboardChart
              projectScores={projectScores}
              projects={projects}
            />
          </TabsContent>
        </Tabs>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        projectScore={selectedProjectScore}
        judges={judges}
        scores={scores}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default Index;
