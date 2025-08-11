import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Star, BarChart3, Trophy, Users, ArrowRight, ArrowLeft } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "¡Bienvenido al Desafío de Innovación!",
    description: "Esta plataforma te permite explorar proyectos innovadores, calificarlos y ver el ranking en tiempo real.",
    icon: Trophy,
    content: (
      <div className="space-y-4">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-innovation mx-auto mb-4" />
          <p className="text-muted-foreground">
            Descubre proyectos universitarios innovadores y participa en su evaluación.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card/50 rounded-lg">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Explorar Proyectos</p>
          </div>
          <div className="text-center p-4 bg-card/50 rounded-lg">
            <Star className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-sm font-medium">Calificar</p>
          </div>
          <div className="text-center p-4 bg-card/50 rounded-lg">
            <BarChart3 className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-sm font-medium">Ver Rankings</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Explora los Proyectos",
    description: "En la pestaña 'Proyectos' puedes ver todos los proyectos participantes.",
    icon: Target,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-innovation/10 to-innovation-secondary/10 border border-innovation/20 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-innovation/20 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-innovation" />
            </div>
            <div>
              <h4 className="font-semibold">Proyecto Ejemplo</h4>
              <p className="text-sm text-muted-foreground">Innovación en energía renovable</p>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <Badge variant="secondary">Energía</Badge>
            <Badge variant="outline">Sustentabilidad</Badge>
          </div>
          <Button size="sm" className="w-full">Ver Detalles</Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Haz clic en "Ver Detalles" para conocer más sobre cada proyecto, incluyendo descripción completa, equipo y recursos.
        </p>
      </div>
    )
  },
  {
    title: "Sistema de Calificación",
    description: "Los jurados pueden calificar proyectos en 4 categorías clave.",
    icon: Star,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-card/50 rounded-lg">
            <h4 className="font-medium mb-2">Viabilidad Técnica</h4>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 4 ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
              ))}
            </div>
          </div>
          <div className="p-4 bg-card/50 rounded-lg">
            <h4 className="font-medium mb-2">Potencial de Mercado</h4>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 3 ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
              ))}
            </div>
          </div>
          <div className="p-4 bg-card/50 rounded-lg">
            <h4 className="font-medium mb-2">Calidad del Equipo</h4>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 5 ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
              ))}
            </div>
          </div>
          <div className="p-4 bg-card/50 rounded-lg">
            <h4 className="font-medium mb-2">Nivel de Innovación</h4>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 4 ? 'text-warning fill-warning' : 'text-muted-foreground'}`} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Cada categoría se califica del 1 al 10. El puntaje final es el promedio de todas las categorías.
        </p>
      </div>
    )
  },
  {
    title: "Ranking en Tiempo Real",
    description: "Ve cómo se posicionan los proyectos según las calificaciones de los jurados.",
    icon: BarChart3,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-innovation/20 to-innovation-secondary/20 rounded-lg border border-innovation/30">
            <div className="w-8 h-8 rounded-full bg-innovation text-innovation-foreground flex items-center justify-center font-bold text-sm">1</div>
            <div className="flex-1">
              <p className="font-medium">EcoGen Pro</p>
              <p className="text-sm text-muted-foreground">8.7 promedio</p>
            </div>
            <Trophy className="h-5 w-5 text-innovation" />
          </div>
          <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm">2</div>
            <div className="flex-1">
              <p className="font-medium">Smart Campus</p>
              <p className="text-sm text-muted-foreground">8.3 promedio</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-card/50 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm">3</div>
            <div className="flex-1">
              <p className="font-medium">BioTech Solutions</p>
              <p className="text-sm text-muted-foreground">7.9 promedio</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          El ranking se actualiza automáticamente con cada nueva calificación.
        </p>
      </div>
    )
  }
];

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('onboarding-completed', 'true');
    onClose();
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-innovation/20 flex items-center justify-center">
              <currentStepData.icon className="h-5 w-5 text-innovation" />
            </div>
            <div>
              <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6">
          {currentStepData.content}
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-innovation' : 
                  index < currentStep ? 'bg-innovation/60' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
            )}
            <Button onClick={handleNext}>
              {isLastStep ? 'Comenzar' : 'Siguiente'}
              {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};