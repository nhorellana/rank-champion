import { Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project, ProjectScore } from "@/types/contest";

interface ProjectCardProps {
  project: Project;
  projectScore: ProjectScore;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard = ({ project, projectScore, onViewDetails }: ProjectCardProps) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getRankIcon = (rank: number) => {
    return rank <= 3 ? <Trophy className={`h-4 w-4 ${getRankColor(rank)}`} /> : null;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getRankIcon(projectScore.rank)}
            <span className={`text-sm font-medium ${getRankColor(projectScore.rank)}`}>
              Posición #{projectScore.rank}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{project.team.length} miembros</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground">Viabilidad</div>
              <div className="text-sm font-semibold text-primary">{projectScore.averageA}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground">Potencial</div>
              <div className="text-sm font-semibold text-primary">{projectScore.averageB}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground">Equipo</div>
              <div className="text-sm font-semibold text-primary">{projectScore.averageC}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-xs text-muted-foreground">Innovación</div>
              <div className="text-sm font-semibold text-primary">{projectScore.averageD}</div>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <div className="text-xs text-muted-foreground">Puntaje promedio</div>
            <div className="text-xl font-bold text-primary">{projectScore.totalAverage}</div>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          <Button
            onClick={() => onViewDetails(project)}
            className="w-full"
            variant="default"
          >
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
