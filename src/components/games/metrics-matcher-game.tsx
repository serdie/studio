'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Users,
  Smile,
  Clock,
  DollarSign,
  Target,
  MessageSquare,
  ShoppingCart,
  Briefcase,
  Ticket
} from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  description: string;
  type: 'interno' | 'externo' | 'ambos';
  icon: string;
}

interface MatchingChallenge {
  id: number;
  metric: string;
  options: { id: string; label: string }[];
  correct: string[];
}

const metrics: Metric[] = [
  { id: 'csat', name: 'CSAT', description: 'Satisfacción del cliente', type: 'externo', icon: 'Smile' },
  { id: 'enps', name: 'eNPS', description: 'Employee Net Promoter Score', type: 'interno', icon: 'Users' },
  { id: 'fcr', name: 'FCR', description: 'Resolución en primer contacto', type: 'externo', icon: 'CheckCircle2' },
  { id: 'tickets_reducidos', name: 'Tickets Reducidos', description: 'Reducción de tickets a IT/RRHH', type: 'interno', icon: 'Ticket' },
  { id: 'tiempo_respuesta', name: 'Tiempo de Respuesta', description: 'Rapidez en contestar', type: 'ambos', icon: 'Clock' },
  { id: 'conversion', name: 'Tasa de Conversión', description: 'Impacto en ventas', type: 'externo', icon: 'ShoppingCart' },
  { id: 'adopcion', name: 'Tasa de Adopción', description: 'Empleados que usan el bot', type: 'interno', icon: 'Users' },
  { id: 'coste_operacion', name: 'Reducción de Costes', description: 'Ahorro operativo', type: 'ambos', icon: 'DollarSign' },
  { id: 'resolucion_autonoma', name: 'Resolución Autónoma', description: '% resuelto sin humano', type: 'ambos', icon: 'Target' },
  { id: 'engagement', name: 'Engagement', description: 'Interacciones por usuario', type: 'externo', icon: 'MessageSquare' }
];

const challenges: MatchingChallenge[] = [
  {
    id: 1,
    metric: 'CSAT (Customer Satisfaction Score)',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['externo']
  },
  {
    id: 2,
    metric: 'eNPS (Employee NPS)',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['interno']
  },
  {
    id: 3,
    metric: 'Resolución en Primer Contacto (FCR)',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['externo']
  },
  {
    id: 4,
    metric: 'Reducción de Tickets a IT/RRHH',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['interno']
  },
  {
    id: 5,
    metric: 'Tiempo Medio de Respuesta',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['ambos']
  },
  {
    id: 6,
    metric: 'Impacto en Ventas/Conversión',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['externo']
  },
  {
    id: 7,
    metric: 'Tasa de Adopción por Empleado',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['interno']
  },
  {
    id: 8,
    metric: 'Reducción de Costes Operativos',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['ambos']
  },
  {
    id: 9,
    metric: '% de Resoluciones Autónomas (sin humano)',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['ambos']
  },
  {
    id: 10,
    metric: 'Engagement (interacciones por usuario)',
    options: [
      { id: 'interno', label: '🏢 Asistente Interno' },
      { id: 'externo', label: '👥 Asistente Externo' },
      { id: 'ambos', label: '✅ Ambos' }
    ],
    correct: ['externo']
  }
];

export default function MetricsMatcherGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const isCorrect = challenges[currentChallenge].correct.includes(optionId);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentChallenge(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setGameFinished(false);
  };

  const getMetricData = (metricName: string) => {
    return metrics.find(m => m.name.includes(metricName.split(' ')[0]));
  };

  if (gameFinished) {
    const percentage = (score / challenges.length) * 100;
    
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <TrendingUp className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Metrics Matcher Completado!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has emparejado {challenges.length} métricas con su tipo de asistente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              {score}/{challenges.length}
            </div>
            <p className="text-slate-300">
              {percentage === 100 ? '🏆 ¡Perfecto! Dominas las métricas de bots' :
               percentage >= 80 ? '✅ ¡Excelente! Conoces bien las métricas' :
               percentage >= 60 ? '👍 Bien, entiendes los conceptos clave' :
               '📚 Repasa las métricas de internos vs externos'}
            </p>
          </div>

          <Progress value={percentage} className="h-3 bg-slate-700" />

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-900/30 border-green-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-green-300">Aciertos</p>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-400">{challenges.length - score}</p>
                <p className="text-sm text-red-300">Errores</p>
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

  const challenge = challenges[currentChallenge];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-white">Metrics Matcher</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
              Aciertos: {score}
            </Badge>
            <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-700">
              {currentChallenge + 1}/{challenges.length}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-300">
          ¿Esta métrica es para asistente interno, externo o ambos?
        </CardDescription>
        <Progress value={(currentChallenge / challenges.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-xl text-white">{challenge.metric}</CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenge.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = challenge.correct.includes(option.id);
            
            return (
              <Card
                key={option.id}
                onClick={() => !showExplanation && handleSelect(option.id)}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  showExplanation && isCorrect
                    ? 'bg-green-900/50 border-green-500 ring-2 ring-green-500'
                    : showExplanation && isSelected && !isCorrect
                    ? 'bg-red-900/50 border-red-500 ring-2 ring-red-500'
                    : isSelected
                    ? 'bg-blue-900/50 border-blue-500'
                    : 'bg-slate-800/50 border-slate-600 hover:border-blue-500'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <p className="text-2xl mb-2">{option.label.split(' ')[0]}</p>
                  <p className="text-white font-semibold">{option.label.substring(option.label.indexOf(' '))}</p>
                  
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mt-3" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="h-8 w-8 text-red-500 mx-auto mt-3" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {showExplanation && (
          <Card className="bg-slate-800/50 border-slate-600 animate-in fade-in slide-in-from-bottom-4">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {challenge.correct.includes('interno') && (
                  <Badge className="bg-orange-600">🏢 Interno</Badge>
                )}
                {challenge.correct.includes('externo') && (
                  <Badge className="bg-blue-600">👥 Externo</Badge>
                )}
                {challenge.correct.includes('ambos') && (
                  <Badge className="bg-purple-600">✅ Ambos</Badge>
                )}
              </div>
              
              <p className="text-slate-300">
                {challenge.correct.includes('interno') && 'Los asistentes internos miden satisfacción de empleados (eNPS) y reducción de carga a departamentos internos.'}
                {challenge.correct.includes('externo') && 'Los asistentes externos miden satisfacción de cliente (CSAT), conversión y resolución en primer contacto.'}
                {challenge.correct.includes('ambos') && 'Algunas métricas como tiempo de respuesta, costes y resolución autónoma aplican a ambos tipos.'}
              </p>

              <Button onClick={nextChallenge} className="w-full bg-blue-600 hover:bg-blue-700">
                {currentChallenge < challenges.length - 1 ? 'Siguiente Métrica' : 'Ver Resultados'}
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
