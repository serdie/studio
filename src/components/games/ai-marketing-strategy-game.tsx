'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Lightbulb, ArrowRight, CheckCircle2, RefreshCw, Zap, Users, DollarSign } from 'lucide-react';

interface MarketingChallenge {
  id: string;
  title: string;
  description: string;
  budget: number;
  targetAudience: string;
  currentMetrics: {
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
  };
  aiSuggestions: {
    channel: string;
    improvement: string;
    expectedImpact: number;
  }[];
  correctChoices: string[];
}

const challenges: MarketingChallenge[] = [
  {
    id: 'challenge1',
    title: 'Campaña de Lanzamiento de Producto Tech',
    description: 'Tu empresa lanza un nuevo dispositivo wearable. Tienes €50,000 para marketing y necesitas maximizar el ROI.',
    budget: 50000,
    targetAudience: 'Millennials y Gen Z (18-35 años)',
    currentMetrics: {
      reach: 150000,
      engagement: 8.5,
      conversion: 2.1,
      roi: 180
    },
    aiSuggestions: [
      {
        channel: 'TikTok',
        improvement: 'Contenido generado por IA con tendencias virales',
        expectedImpact: 35
      },
      {
        channel: 'Instagram Reels',
        improvement: 'Stories automatizadas con personalización',
        expectedImpact: 28
      },
      {
        channel: 'YouTube',
        improvement: 'Reviews generados por IA y SEO optimizado',
        expectedImpact: 22
      },
      {
        channel: 'Email Marketing',
        improvement: 'Segmentación predictiva y contenido dinámico',
        expectedImpact: 18
      }
    ],
    correctChoices: ['TikTok', 'Instagram Reels', 'YouTube']
  },
  {
    id: 'challenge2',
    title: 'Recuperación de Clientes Perdidos',
    description: 'Has perdido el 15% de tus clientes en los últimos 3 meses. Necesitas una campaña de win-back efectiva.',
    budget: 25000,
    targetAudience: 'Clientes inactivos (6+ meses sin compra)',
    currentMetrics: {
      reach: 75000,
      engagement: 12.3,
      conversion: 1.8,
      roi: 145
    },
    aiSuggestions: [
      {
        channel: 'Email Personalizado',
        improvement: 'Análisis de churn con recomendaciones específicas',
        expectedImpact: 42
      },
      {
        channel: 'SMS con IA',
        improvement: 'Timing óptimo basado en comportamiento',
        expectedImpact: 38
      },
      {
        channel: 'Retargeting Display',
        improvement: 'Audiencias similares con lookalikes',
        expectedImpact: 25
      },
      {
        channel: 'Push Notifications',
        improvement: 'Predicción de momento óptimo de interacción',
        expectedImpact: 19
      }
    ],
    correctChoices: ['Email Personalizado', 'SMS con IA', 'Push Notifications']
  }
];

export default function AIMarketingStrategyGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const challenge = challenges[currentChallenge];

  const handleChoiceSelect = (choice: string) => {
    if (selectedChoices.includes(choice)) {
      setSelectedChoices(selectedChoices.filter(c => c !== choice));
    } else {
      setSelectedChoices([...selectedChoices, choice]);
    }
  };

  const checkAnswer = () => {
    const correctCount = selectedChoices.filter(choice =>
      challenge.correctChoices.includes(choice)
    ).length;

    const accuracy = correctCount / challenge.correctChoices.length;
    const points = Math.round(accuracy * 100);
    setScore(score + points);
    setShowResults(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedChoices([]);
      setShowResults(false);
    } else {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentChallenge(0);
    setSelectedChoices([]);
    setShowResults(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            ¡Juego Completado!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-green-600">
            {score} puntos
          </div>
          <p className="text-gray-600">
            Has completado el desafío de estrategias de marketing con IA.
            {score >= 150 ? ' ¡Excelente trabajo!' : ' Sigue practicando para mejorar.'}
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={resetGame} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Jugar de Nuevo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Estrategia IA en Marketing
          </CardTitle>
          <Badge variant="secondary">
            Desafío {currentChallenge + 1} de {challenges.length}
          </Badge>
        </div>
        <Progress value={(currentChallenge / challenges.length) * 100} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
          <p className="text-gray-700 mb-3">{challenge.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <DollarSign className="w-4 h-4 mx-auto mb-1 text-green-600" />
              <div className="font-semibold">€{challenge.budget.toLocaleString()}</div>
              <div className="text-gray-600">Presupuesto</div>
            </div>
            <div className="text-center">
              <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <div className="font-semibold">{challenge.targetAudience}</div>
              <div className="text-gray-600">Audiencia</div>
            </div>
            <div className="text-center">
              <Target className="w-4 h-4 mx-auto mb-1 text-purple-600" />
              <div className="font-semibold">{challenge.currentMetrics.conversion}%</div>
              <div className="text-gray-600">Conversión</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-4 h-4 mx-auto mb-1 text-orange-600" />
              <div className="font-semibold">{challenge.currentMetrics.roi}%</div>
              <div className="text-gray-600">ROI Actual</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Sugiere canales y mejoras con IA:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {challenge.aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedChoices.includes(suggestion.channel)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleChoiceSelect(suggestion.channel)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{suggestion.channel}</h5>
                  <Badge variant="outline" className="text-green-600">
                    +{suggestion.expectedImpact}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{suggestion.improvement}</p>
              </div>
            ))}
          </div>
        </div>

        {showResults && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Resultados del Desafío
            </h4>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>Tu selección:</strong> {selectedChoices.join(', ')}
              </p>
              <p className="text-sm">
                <strong>Mejor estrategia:</strong> {challenge.correctChoices.join(', ')}
              </p>

              {selectedChoices.filter(choice => challenge.correctChoices.includes(choice)).length ===
               challenge.correctChoices.length ? (
                <p className="text-green-600 font-medium">
                  ¡Perfecto! Has seleccionado la estrategia óptima.
                </p>
              ) : (
                <p className="text-orange-600 font-medium">
                  Buena selección, pero podrías optimizar más canales.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Puntaje acumulado: <span className="font-semibold">{score} puntos</span>
          </div>

          <div className="flex gap-2">
            {!showResults ? (
              <Button
                onClick={checkAnswer}
                disabled={selectedChoices.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Verificar Estrategia
              </Button>
            ) : (
              <Button onClick={nextChallenge} className="bg-green-600 hover:bg-green-700">
                {currentChallenge < challenges.length - 1 ? 'Siguiente Desafío' : 'Ver Resultados'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}