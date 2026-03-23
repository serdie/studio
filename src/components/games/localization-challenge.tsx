'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface LocalizationChallenge {
  id: number;
  original: string;
  region: string;
  options: { text: string; correct: boolean; explanation: string }[];
}

const challenges: LocalizationChallenge[] = [
  {
    id: 1,
    original: 'Vale, vamos a echar un vistazo a las vacaciones de verano. Tenéis que pedir las vacaciones con antelación.',
    region: 'México',
    options: [
      {
        text: 'Vale, vamos a ver las vacaciones de verano. Tenéis que pedir las vacaciones con antelación.',
        correct: false,
        explanation: 'Mantiene "vale" y "tenéis" que no se usan en México.'
      },
      {
        text: 'Bueno, vamos a revisar el periodo vacacional de verano. Deben solicitar sus vacaciones con anticipación.',
        correct: true,
        explanation: 'Correcto: "vale"→"bueno", "echar un vistazo"→"revisar", "tenéis"→"deben", "antelación"→"anticipación"'
      },
      {
        text: 'Órale, vamos a checar las vacaciones de verano. Tienen que pedir las vacaciones antes.',
        correct: false,
        explanation: 'Demasiado informal para contexto corporativo.'
      }
    ]
  },
  {
    id: 2,
    original: 'El coche tiene un maletero grande y consume poco.',
    region: 'Argentina',
    options: [
      {
        text: 'El auto tiene un baúl grande y consume poco.',
        correct: true,
        explanation: 'Correcto: "coche"→"auto", "maletero"→"baúl"'
      },
      {
        text: 'El coche tiene un maletero grande y gasta poco.',
        correct: false,
        explanation: 'Mantiene "coche" y "maletero" que no son comunes en Argentina.'
      },
      {
        text: 'El vehículo tiene un compartimento de carga amplio y es eficiente en combustible.',
        correct: false,
        explanation: 'Demasiado formal y técnico para comunicación cotidiana.'
      }
    ]
  },
  {
    id: 3,
    original: 'La reunión es el lunes a las nueve de la mañana.',
    region: 'Colombia',
    options: [
      {
        text: 'La reunión es el lunes a las nueve de la mañana.',
        correct: true,
        explanation: 'Correcto: Esta frase es neutra y funciona en todos los países.'
      },
      {
        text: 'La reunión es el lunes a las nueve de la mañana, ¿vale?',
        correct: false,
        explanation: 'Añade "¿vale?" que no es común en Colombia.'
      },
      {
        text: 'La reunión es el lunes a las 9:00 AM.',
        correct: false,
        explanation: 'Cambio innecesario de formato. "Nueve de la mañana" es más natural.'
      }
    ]
  },
  {
    id: 4,
    original: 'Necesitamos hacer un presupuesto para el proyecto.',
    region: 'Chile',
    options: [
      {
        text: 'Necesitamos hacer un presupuesto para el proyecto.',
        correct: true,
        explanation: 'Correcto: "Presupuesto" y "proyecto" son términos neutros.'
      },
      {
        text: 'Necesitamos hacer un pololo para el proyecto.',
        correct: false,
        explanation: '"Pololo" en Chile significa "novio", no "presupuesto".'
      },
      {
        text: 'Necesitamos cotizar para el proyecto.',
        correct: false,
        explanation: '"Cotizar" es diferente de "hacer un presupuesto".'
      }
    ]
  },
  {
    id: 5,
    original: 'El ordenador se ha quedado colgado.',
    region: 'México',
    options: [
      {
        text: 'El ordenador se ha quedado colgado.',
        correct: false,
        explanation: '"Ordenador" y "colgado" son términos de España.'
      },
      {
        text: 'La computadora se ha trabado.',
        correct: true,
        explanation: 'Correcto: "ordenador"→"computadora", "colgado"→"trabado"'
      },
      {
        text: 'El equipo se ha detenido.',
        correct: false,
        explanation: 'Demasiado formal. No captura la expresión coloquial.'
      }
    ]
  },
  {
    id: 6,
    original: 'Vamos a tomar un café después de comer.',
    region: 'Argentina',
    options: [
      {
        text: 'Vamos a tomar un café después de almorzar.',
        correct: true,
        explanation: 'Correcto: "comer"→"almorzar" (en Argentina "comer" es la cena)'
      },
      {
        text: 'Vamos a tomar un café después de comer.',
        correct: false,
        explanation: 'En Argentina "comer" se refiere a la cena, no al almuerzo.'
      },
      {
        text: 'Vamos a tomar un café después de la comida.',
        correct: false,
        explanation: '"La comida" en Argentina puede ser confuso.'
      }
    ]
  }
];

export default function LocalizationChallenge() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const startGame = () => {
    setGameState('playing');
    setCurrentChallenge(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowExplanation(true);
    
    const challenge = challenges[currentChallenge];
    if (challenge.options[optionIndex].correct) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentChallenge(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-900">🌍 Localization Challenge</h3>
          <p className="text-green-700 mt-2">
            Adapta mensajes de España a diferentes países de Latinoamérica
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 p-4 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-900 mb-3">📋 Instrucciones:</h4>
            <ol className="space-y-2 text-green-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                Lee el mensaje original en español de España
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                Selecciona la mejor adaptación para el país indicado
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                Aprende las diferencias culturales y lingüísticas
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl mb-1">🇪🇸</div>
              <div className="text-xs font-semibold text-blue-800">España</div>
              <div className="text-xs text-blue-600">Original</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl mb-1">🌎</div>
              <div className="text-xs font-semibold text-purple-800">Latinoamérica</div>
              <div className="text-xs text-purple-600">Localizado</div>
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg">
            <Globe className="h-5 w-5 mr-2" />
            Comenzar Reto de Localización
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const percentage = (score.correct / challenges.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-900">
            {passed ? '🎉 ¡Excelente Localizador!' : '📚 Sigue Practicando'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{passed ? '🌟' : '📖'}</div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-green-900">
                Aciertos: {score.correct} / {challenges.length}
              </p>
              <p className="text-lg text-green-700">
                {percentage.toFixed(0)}% de precisión
              </p>
            </div>
            <p className="text-green-800">
              {passed
                ? '¡Fantástico! Entiendes las diferencias culturales y lingüísticas.'
                : 'Repasa las explicaciones y vuelve a intentarlo.'}
            </p>
          </div>

          <Button onClick={resetGame} className="w-full bg-green-600 hover:bg-green-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing Screen
  const challenge = challenges[currentChallenge];

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500">
              <Globe className="h-3 w-3 mr-1" />
              Localización: {challenge.region}
            </Badge>
            <span className="text-sm text-green-700">
              {currentChallenge + 1} de {challenges.length}
            </span>
          </div>
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
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="text-2xl">🇪🇸</div>
            <div>
              <h4 className="font-bold text-green-900 mb-2">Mensaje Original (España):</h4>
              <p className="text-green-800 italic">"{challenge.original}"</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">👉</div>
            <Badge className="bg-purple-500">Adaptar a: {challenge.region}</Badge>
            <div className="text-2xl">
              {challenge.region === 'México' ? '🇲🇽' :
               challenge.region === 'Argentina' ? '🇦🇷' :
               challenge.region === 'Colombia' ? '🇨🇴' :
               challenge.region === 'Chile' ? '🇨🇱' : '🌎'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {challenge.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = option.correct;
            const showResult = showExplanation;

            return (
              <Button
                key={idx}
                onClick={() => !showResult && handleSelect(idx)}
                disabled={showResult}
                variant="outline"
                className={`w-full h-auto py-4 text-left justify-start transition-all ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 text-green-900'
                      : isSelected
                      ? 'bg-red-100 border-red-500 text-red-900'
                      : 'bg-white border-green-200'
                    : 'bg-white border-green-200 hover:bg-green-50 hover:border-green-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-green-200 text-green-700'
                      : 'bg-green-200 text-green-700'
                  }`}>
                    {showResult && isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : showResult && isSelected ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{option.text}</p>
                    {showResult && isSelected && (
                      <p className="text-xs mt-2 text-green-800">{option.explanation}</p>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <Button onClick={nextChallenge} className="w-full bg-green-600 hover:bg-green-700">
            {currentChallenge < challenges.length - 1
              ? 'Siguiente Mensaje →'
              : 'Ver Resultados Finales'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
