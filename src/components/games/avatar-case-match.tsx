'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, HelpCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  correctAnswer: 'yes' | 'no';
  explanation: string;
  reasons: string[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Vídeo de Onboarding para Nuevos Empleados',
    description: 'Necesitas crear un vídeo explicando las políticas de RRHH y beneficios de la empresa para nuevos empleados. El vídeo se usará cientos de veces al año.',
    correctAnswer: 'yes',
    explanation: '✅ Avatar SÍ es apropiado',
    reasons: [
      'Contenido repetitivo que se usa muchas veces',
      'No requiere interacción emocional profunda',
      'Permite actualización fácil del contenido',
      'Ahorro de costes vs grabar con persona real',
      'Consistencia en el mensaje'
    ]
  },
  {
    id: 2,
    title: 'Comunicación de Despido o Noticia Sensible',
    description: 'Debes comunicar un despido o una noticia difícil a un empleado. ¿Es apropiado usar un avatar virtual?',
    correctAnswer: 'no',
    explanation: '❌ Avatar NO es apropiado',
    reasons: [
      'Requiere empatía humana genuina',
      'La sensibilidad emocional es prioritaria',
      'El avatar parecería insensible/inapropiado',
      'Puede dañar la reputación de la empresa',
      'Falta de autenticidad en momentos críticos'
    ]
  },
  {
    id: 3,
    title: 'Vídeo de Seguridad Industrial',
    description: 'Vídeo formativo sobre protocolos de seguridad en una fábrica. Se mostrará en pantallas y en la formación inicial.',
    correctAnswer: 'yes',
    explanation: '✅ Avatar SÍ es apropiado',
    reasons: [
      'Contenido técnico que requiere claridad',
      'Se usa de forma repetitiva',
      'Fácil de actualizar cuando cambian protocolos',
      'Multilingüe sin coste adicional',
      'Consistencia en la formación'
    ]
  },
  {
    id: 4,
    title: 'Presentación de Resultados Trimestrales',
    description: 'El CEO debe presentar los resultados trimestrales a inversores y analistas financieros.',
    correctAnswer: 'no',
    explanation: '❌ Avatar NO es apropiado',
    reasons: [
      'Requiere autenticidad y transparencia',
      'Los inversores esperan ver al líder real',
      'Momento de alta visibilidad y credibilidad',
      'Las preguntas y respuestas deben ser humanas',
      'Riesgo reputacional si se descubre el avatar'
    ]
  },
  {
    id: 5,
    title: 'Vídeo de Bienvenida en Página Web',
    description: 'Vídeo corto de bienvenida en la página de inicio de la web corporativa, explicando qué hace la empresa.',
    correctAnswer: 'yes',
    explanation: '✅ Avatar SÍ es apropiado',
    reasons: [
      'Mensaje genérico de bienvenida',
      'Alto impacto visual inicial',
      'No requiere interacción profunda',
      'Fácil de mantener actualizado',
      'Coste-efectivo vs producción con persona real'
    ]
  },
  {
    id: 6,
    title: 'Entrenamiento de Ventas y Negociación',
    description: 'Formación avanzada en técnicas de negociación para el equipo de ventas. Incluye role-playing y feedback personalizado.',
    correctAnswer: 'no',
    explanation: '❌ Avatar NO es apropiado',
    reasons: [
      'Requiere interacción bidireccional',
      'El feedback debe ser personalizado y humano',
      'Role-playing necesita empatía real',
      'Las sutilezas de negociación son complejas',
      'Mejor con formador humano experto'
    ]
  },
  {
    id: 7,
    title: 'Vídeo Explicativo de Producto Nuevo',
    description: 'Presentación de las características y beneficios de un nuevo producto para clientes potenciales.',
    correctAnswer: 'yes',
    explanation: '✅ Avatar SÍ es apropiado',
    reasons: [
      'Contenido informativo estándar',
      'Fácil de actualizar si cambia el producto',
      'Se puede versionar para múltiples mercados',
      'Consistencia en el mensaje de ventas',
      'Escalable para múltiples productos'
    ]
  },
  {
    id: 8,
    title: 'Disculpas Públicas por Error Grave',
    description: 'La empresa cometió un error grave que afectó a clientes. Necesitas presentar disculpas públicas.',
    correctAnswer: 'no',
    explanation: '❌ Avatar NO es apropiado',
    reasons: [
      'Requiere autenticidad y humildad reales',
      'La credibilidad es crítica',
      'Los stakeholders esperan ver al responsable',
      'Un avatar parecería evasivo/insincero',
      'Riesgo de crisis de reputación mayor'
    ]
  }
];

export default function AvatarCaseMatch() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'yes' | 'no' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answer: 'yes' | 'no') => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === scenarios[currentScenario].correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
    setCompleted(false);
  };

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + (showExplanation ? 1 : 0)) / scenarios.length) * 100;

  if (completed) {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader className="text-center">
          <h3 className="text-2xl font-bold text-purple-900">🎭 ¡Juego Completado!</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {score.correct >= 6 ? '🏆' : score.correct >= 4 ? '🎯' : '📚'}
            </div>
            <div className="text-xl font-semibold text-purple-900">
              Tu puntuación: {score.correct} / {scenarios.length}
            </div>
            <p className="text-purple-700">
              {score.correct >= 6 
                ? '¡Excelente! Entiendes muy bien cuándo usar avatares.'
                : score.correct >= 4
                ? '¡Bien! Tienes buena base, pero puedes mejorar.'
                : 'Sigue practicando. Revisa las explicaciones para aprender más.'}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={restartGame} className="bg-purple-600 hover:bg-purple-700">
              Jugar de Nuevo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-purple-900">
            🎭 Avatar Case Match - Caso {currentScenario + 1} de {scenarios.length}
          </h3>
          <div className="flex gap-2">
            <Badge className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {score.correct}
            </Badge>
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              {score.incorrect}
            </Badge>
          </div>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-2 mt-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-purple-900">{scenario.title}</h4>
          <p className="text-purple-800">{scenario.description}</p>
        </div>

        {!showExplanation ? (
          <div className="space-y-4">
            <p className="font-semibold text-purple-900">¿Usarías un avatar virtual en este caso?</p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleAnswer('yes')}
                className="h-20 text-lg bg-green-600 hover:bg-green-700"
              >
                <ThumbsUp className="h-6 w-6 mr-2" />
                SÍ, Avatar Virtual
              </Button>
              <Button
                onClick={() => handleAnswer('no')}
                variant="outline"
                className="h-20 text-lg border-red-300 hover:bg-red-50"
              >
                <ThumbsDown className="h-6 w-6 mr-2" />
                NO, Mejor Humano
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === scenario.correctAnswer
                ? 'bg-green-100 border-2 border-green-300'
                : 'bg-red-100 border-2 border-red-300'
            }`}>
              <p className="text-lg font-bold">
                {selectedAnswer === scenario.correctAnswer ? '✅ ¡Correcto!' : '❌ Incorrecto'}
              </p>
              <p className="text-purple-900 mt-2">{scenario.explanation}</p>
            </div>

            <div className="bg-white/70 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 mb-3">Razones:</p>
              <ul className="space-y-2">
                {scenario.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-purple-800">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={nextScenario} className="w-full bg-purple-600 hover:bg-purple-700">
              {currentScenario < scenarios.length - 1 ? 'Siguiente Caso →' : 'Ver Resultados Finales'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
