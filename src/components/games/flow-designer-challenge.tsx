'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  Map,
  ArrowRight,
  AlertCircle,
  UserCheck,
  MessageSquare
} from 'lucide-react';

interface FlowStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FlowChallenge {
  id: number;
  scenario: string;
  correctOrder: number[];
  steps: FlowStep[];
}

const challenges: FlowChallenge[] = [
  {
    id: 1,
    scenario: 'Reset de Contraseña de Empleado',
    steps: [
      { id: 1, title: 'Usuario solicita reset', description: 'Empleado indica que olvidó su contraseña', icon: 'message' },
      { id: 2, title: 'Verificar identidad', description: 'Confirmar email o ID de empleado', icon: 'user' },
      { id: 3, title: 'Generar token temporal', description: 'Crear código de un solo uso', icon: 'alert' },
      { id: 4, title: 'Enviar email con enlace', description: 'Enviar link de reset seguro', icon: 'email' },
      { id: 5, title: 'Usuario establece nueva contraseña', description: 'Empleado crea contraseña nueva', icon: 'check' },
      { id: 6, title: 'Confirmar éxito', description: 'Notificar que el reset fue completado', icon: 'check' }
    ],
    correctOrder: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 2,
    scenario: 'Consulta de Vacaciones Disponibles',
    steps: [
      { id: 1, title: 'Saludo inicial', description: 'Bot saluda y pregunta en qué puede ayudar', icon: 'message' },
      { id: 2, title: 'Usuario pregunta vacaciones', description: 'Empleado consulta días disponibles', icon: 'user' },
      { id: 3, title: 'Autenticar usuario', description: 'Verificar identidad del empleado', icon: 'user' },
      { id: 4, title: 'Consultar sistema RRHH', description: 'Obtener datos de vacaciones del sistema', icon: 'alert' },
      { id: 5, title: 'Mostrar saldo disponible', description: 'Informar días totales y disponibles', icon: 'check' },
      { id: 6, title: 'Ofrecer ayuda adicional', description: 'Preguntar si necesita algo más', icon: 'message' }
    ],
    correctOrder: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 3,
    scenario: 'Devolución de Producto (Ecommerce)',
    steps: [
      { id: 1, title: 'Cliente solicita devolución', description: 'Usuario quiere devolver producto', icon: 'message' },
      { id: 2, title: 'Verificar número de pedido', description: 'Confirmar order ID válido', icon: 'user' },
      { id: 3, title: 'Comprobar política devoluciones', description: 'Verificar si está dentro del plazo', icon: 'alert' },
      { id: 4, title: 'Generar etiqueta de envío', description: 'Crear etiqueta prepagada', icon: 'email' },
      { id: 5, title: 'Instrucciones de envío', description: 'Explicar cómo y dónde enviar', icon: 'message' },
      { id: 6, title: 'Confirmar recepción', description: 'Notificar cuando se reciba el producto', icon: 'check' },
      { id: 7, title: 'Procesar reembolso', description: 'Iniciar proceso de pago de vuelta', icon: 'check' }
    ],
    correctOrder: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 4,
    scenario: 'Reserva de Cita Previa',
    steps: [
      { id: 1, title: 'Saludo y ofrecimiento', description: 'Bot ofrece ayuda para reservar cita', icon: 'message' },
      { id: 2, title: 'Usuario solicita cita', description: 'Cliente quiere pedir cita', icon: 'user' },
      { id: 3, title: 'Preguntar tipo de cita', description: 'Consultar qué tipo de servicio necesita', icon: 'message' },
      { id: 4, title: 'Mostrar disponibilidad', description: 'Presentar huecos disponibles', icon: 'alert' },
      { id: 5, title: 'Cliente selecciona hueco', description: 'Usuario elige fecha y hora', icon: 'user' },
      { id: 6, title: 'Confirmar reserva', description: 'Validar y confirmar la cita', icon: 'check' },
      { id: 7, title: 'Enviar confirmación', description: 'Email o SMS con detalles de la cita', icon: 'email' }
    ],
    correctOrder: [1, 2, 3, 4, 5, 6, 7]
  }
];

export default function FlowDesignerChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = challenges[currentChallenge];

  const handleStepClick = (stepId: number) => {
    if (showResult) return;
    
    if (userOrder.includes(stepId)) {
      setUserOrder(userOrder.filter(id => id !== stepId));
    } else {
      setUserOrder([...userOrder, stepId]);
    }
  };

  const checkFlow = () => {
    const correct = JSON.stringify(userOrder) === JSON.stringify(challenge.correctOrder);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setUserOrder([]);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const restartGame = () => {
    setCurrentChallenge(0);
    setUserOrder([]);
    setScore(0);
    setShowResult(false);
    setIsCorrect(false);
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'message': return <MessageSquare className="h-5 w-5" />;
      case 'user': return <UserCheck className="h-5 w-5" />;
      case 'alert': return <AlertCircle className="h-5 w-5" />;
      case 'email': return <MessageSquare className="h-5 w-5" />;
      case 'check': return <CheckCircle2 className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  if (showResult && currentChallenge === challenges.length - 1) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Map className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Flujos Completados!
          </CardTitle>
          <CardDescription className="text-slate-300">
            Has diseñado {challenges.length} flujos conversacionales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              {score}/{challenges.length}
            </div>
            <p className="text-slate-300">
              {score === challenges.length ? '🏆 ¡Perfecto! Eres un experto en diseño conversacional' :
               score >= challenges.length - 1 ? '✅ ¡Muy bien! Dominas los flujos' :
               '📚 Sigue practicando diseño de flujos'}
            </p>
          </div>
          <Button onClick={restartGame} className="w-full bg-blue-600 hover:bg-blue-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-white">Diseña el Flujo Conversacional</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
            Puntos: {score}/{challenges.length}
          </Badge>
        </div>
        <CardDescription className="text-slate-300">
          Escenario: <span className="font-semibold text-white">{challenge.scenario}</span>
        </CardDescription>
        <Progress value={(currentChallenge / challenges.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Pasos Disponibles (haz clic para añadir):</h3>
            <div className="space-y-2">
              {challenge.steps.map((step, index) => {
                const isSelected = userOrder.includes(step.id);
                const position = userOrder.indexOf(step.id) + 1;
                
                return (
                  <Card
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-900/50 border-blue-500'
                        : 'bg-slate-800/50 border-slate-600 hover:border-blue-500'
                    }`}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {isSelected ? position : step.id}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{step.title}</p>
                        <p className="text-xs text-slate-400">{step.description}</p>
                      </div>
                      {getStepIcon(step.icon)}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tu Flujo (orden seleccionado):</h3>
            <div className="space-y-2">
              {userOrder.length === 0 && (
                <p className="text-slate-400 text-center py-8">
                  Selecciona los pasos en el orden correcto
                </p>
              )}
              {userOrder.map((stepId, index) => {
                const step = challenge.steps.find(s => s.id === stepId);
                if (!step) return null;
                
                return (
                  <Card key={step.id} className="bg-green-900/30 border-green-700">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{step.title}</p>
                        <p className="text-xs text-slate-300">{step.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-green-400" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {showResult && (
          <Card className={`${isCorrect ? 'bg-green-900/30 border-green-700' : 'bg-red-900/30 border-red-700'}`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <p className="text-xl font-bold text-white">
                    {isCorrect ? '¡Flujo Correcto!' : 'Flujo Incorrecto'}
                  </p>
                  <p className="text-slate-300">
                    {isCorrect 
                      ? 'Has ordenado correctamente todos los pasos del flujo.'
                      : 'El orden no es el óptimo. Revisa el flujo correcto arriba.'}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={nextChallenge} className="bg-blue-600 hover:bg-blue-700">
                  Siguiente Escenario
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!showResult && userOrder.length === challenge.steps.length && (
          <Button onClick={checkFlow} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Verificar Flujo
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
