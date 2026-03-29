'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  TrendingUp, 
  Shield,
  MessageSquare,
  Brain,
  ArrowRight
} from 'lucide-react';

interface Scenario {
  id: number;
  situation: string;
  correctAnswer: 'bot' | 'assistant';
  explanation: string;
  riskLevel: 'bajo' | 'medio' | 'alto';
  controlNeeded: 'alto' | 'medio' | 'bajo';
  flexibilityNeeded: 'alta' | 'media' | 'baja';
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: 'Consulta de vacaciones disponibles en el portal del empleado',
    correctAnswer: 'bot',
    explanation: 'Proceso predecible con reglas claras. El dato está en un sistema interno y la consulta es binaria (sí/no o número específico). No se necesita flexibilidad.',
    riskLevel: 'bajo',
    controlNeeded: 'alto',
    flexibilityNeeded: 'baja'
  },
  {
    id: 2,
    situation: 'Cliente quiere recomendación personalizada de producto según sus necesidades',
    correctAnswer: 'assistant',
    explanation: 'Requiere entender contexto, preferencias y hacer preguntas aclaratorias. La redacción debe ser natural y persuasiva. Alta flexibilidad necesaria.',
    riskLevel: 'medio',
    controlNeeded: 'medio',
    flexibilityNeeded: 'alta'
  },
  {
    id: 3,
    situation: 'Reset automático de contraseña de empleado',
    correctAnswer: 'bot',
    explanation: 'Flujo completamente predecible con pasos definidos. Alto control necesario por seguridad, pero cero flexibilidad requerida.',
    riskLevel: 'medio',
    controlNeeded: 'alto',
    flexibilityNeeded: 'baja'
  },
  {
    id: 4,
    situation: 'Explicación creativa de características técnicas de un producto nuevo',
    correctAnswer: 'assistant',
    explanation: 'Requiere adaptación al nivel técnico del cliente, ejemplos personalizados y capacidad de responder preguntas inesperadas.',
    riskLevel: 'bajo',
    controlNeeded: 'bajo',
    flexibilityNeeded: 'alta'
  },
  {
    id: 5,
    situation: 'Cálculo de nómina y desglose de conceptos salariales',
    correctAnswer: 'bot',
    explanation: 'Cálculos precisos basados en reglas fiscales y laborales. Cero margen de error, 100% predecible. La IA podría alucinar con números.',
    riskLevel: 'alto',
    controlNeeded: 'alto',
    flexibilityNeeded: 'baja'
  },
  {
    id: 6,
    situation: 'Soporte emocional a cliente frustrado por un problema',
    correctAnswer: 'assistant',
    explanation: 'Requiere empatía, comprensión del estado emocional y adaptación del tono. Un bot rígido podría empeorar la situación.',
    riskLevel: 'alto',
    controlNeeded: 'medio',
    flexibilityNeeded: 'alta'
  },
  {
    id: 7,
    situation: 'Reserva de sala de reuniones con validación de disponibilidad',
    correctAnswer: 'bot',
    explanation: 'Proceso transaccional con reglas claras: verificar disponibilidad, confirmar, reservar. No necesita interpretación creativa.',
    riskLevel: 'bajo',
    controlNeeded: 'alto',
    flexibilityNeeded: 'baja'
  },
  {
    id: 8,
    situation: 'Asesoramiento financiero personalizado para inversión',
    correctAnswer: 'assistant',
    explanation: 'Requiere entender perfil de riesgo, objetivos, contexto personal. Pero OJO: siempre con supervisión humana y validación de cumplimiento.',
    riskLevel: 'alto',
    controlNeeded: 'alto',
    flexibilityNeeded: 'alta'
  },
  {
    id: 9,
    situation: 'Clasificación automática de tickets de soporte por palabras clave',
    correctAnswer: 'bot',
    explanation: 'Reglas simples de clasificación basadas en keywords o categorías predefinidas. Rápido, predecible y eficiente.',
    riskLevel: 'bajo',
    controlNeeded: 'medio',
    flexibilityNeeded: 'baja'
  },
  {
    id: 10,
    situation: 'Negociación de condiciones contractuales con proveedor',
    correctAnswer: 'assistant',
    explanation: 'Proceso complejo que requiere contexto, estrategia y adaptación. Aunque probablemente requiera intervención humana final.',
    riskLevel: 'alto',
    controlNeeded: 'alto',
    flexibilityNeeded: 'alta'
  }
];

export default function BotVsAssistantDecision() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'bot' | 'assistant' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [answers, setAnswers] = useState<{ scenario: number; correct: boolean }[]>([]);

  const handleAnswer = (answer: 'bot' | 'assistant') => {
    setSelectedAnswer(answer);
    const isCorrect = answer === scenarios[currentScenario].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { scenario: currentScenario, correct: isCorrect }]);
    setShowExplanation(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameFinished(false);
    setAnswers([]);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'bajo': return 'bg-green-500';
      case 'medio': return 'bg-yellow-500';
      case 'alto': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (gameFinished) {
    const percentage = (score / scenarios.length) * 100;
    
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            🎉 ¡Juego Completado!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has completado el desafío de Bot vs. Asistente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              {score}/{scenarios.length}
            </div>
            <p className="text-slate-300">
              {percentage === 100 ? '🏆 ¡Perfecto! Eres un experto en estrategia de bots' :
               percentage >= 70 ? '✅ ¡Muy bien! Dominas los conceptos clave' :
               percentage >= 50 ? '👍 Bien, pero puedes mejorar' :
               '📚 Sigue repasando los conceptos'}
            </p>
          </div>

          <Progress value={percentage} className="h-3 bg-slate-700" />

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-orange-900/30 border-orange-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-orange-400">Bots (Reglas)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {answers.filter((a, i) => scenarios[i].correctAnswer === 'bot' && a.correct).length} / 
                  {scenarios.filter(s => s.correctAnswer === 'bot').length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Acertadas</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/30 border-blue-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-400">Asistentes (IA)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">
                  {answers.filter((a, i) => scenarios[i].correctAnswer === 'assistant' && a.correct).length} / 
                  {scenarios.filter(s => s.correctAnswer === 'assistant').length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Acertadas</p>
              </CardContent>
            </Card>
          </div>

          <Button onClick={restartGame} className="w-full bg-blue-600 hover:bg-blue-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const scenario = scenarios[currentScenario];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-700">
            Escenario {currentScenario + 1} de {scenarios.length}
          </Badge>
          <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
            Puntos: {score}
          </Badge>
        </div>
        <Progress value={(currentScenario / scenarios.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            ¿Bot o Asistente?
          </h3>
          <p className="text-lg text-slate-200 bg-slate-800/50 p-4 rounded-lg border border-slate-600">
            {scenario.situation}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleAnswer('bot')}
            disabled={showExplanation}
            className={`h-24 flex flex-col items-center justify-center gap-2 transition-all ${
              selectedAnswer === 'bot' && scenario.correctAnswer === 'bot'
                ? 'bg-green-600 hover:bg-green-700'
                : selectedAnswer === 'bot' && scenario.correctAnswer !== 'bot'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            <Shield className="h-8 w-8" />
            <span className="font-semibold">BOT</span>
            <span className="text-xs opacity-80">Reglas y Control</span>
          </Button>

          <Button
            onClick={() => handleAnswer('assistant')}
            disabled={showExplanation}
            className={`h-24 flex flex-col items-center justify-center gap-2 transition-all ${
              selectedAnswer === 'assistant' && scenario.correctAnswer === 'assistant'
                ? 'bg-green-600 hover:bg-green-700'
                : selectedAnswer === 'assistant' && scenario.correctAnswer !== 'assistant'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Brain className="h-8 w-8" />
            <span className="font-semibold">ASISTENTE</span>
            <span className="text-xs opacity-80">IA y Flexibilidad</span>
          </Button>
        </div>

        {showExplanation && (
          <Card className="bg-slate-800/50 border-slate-600 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {selectedAnswer === scenario.correctAnswer ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <CardTitle className="text-lg text-white">
                  {selectedAnswer === scenario.correctAnswer ? '¡Correcto!' : 'Incorrecto'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-200">
                <Lightbulb className="inline h-4 w-4 mr-2 text-yellow-500" />
                {scenario.explanation}
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Nivel de Riesgo</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getRiskColor(scenario.riskLevel)}`} />
                    <span className="text-sm font-semibold text-white capitalize">{scenario.riskLevel}</span>
                  </div>
                </div>

                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Control Necesario</p>
                  <span className="text-sm font-semibold text-white capitalize">{scenario.controlNeeded}</span>
                </div>

                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-xs text-slate-400 mb-1">Flexibilidad</p>
                  <span className="text-sm font-semibold text-white capitalize">{scenario.flexibilityNeeded}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-orange-500" />
                    Bot: 100% Predecible
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    Asistente: Redacción Natural
                  </span>
                </div>

                <Button onClick={nextScenario} className="bg-blue-600 hover:bg-blue-700">
                  {currentScenario < scenarios.length - 1 ? 'Siguiente' : 'Ver Resultados'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
