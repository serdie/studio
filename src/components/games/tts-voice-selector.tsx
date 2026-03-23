'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Headphones, CheckCircle2, XCircle, RotateCcw, Award, Volume2 } from 'lucide-react';

interface VoiceCase {
  id: number;
  scenario: string;
  industry: string;
  targetAudience: string;
  options: {
    id: string;
    name: string;
    age: string;
    tone: string;
    description: string;
    correct: boolean;
    explanation: string;
  }[];
}

const voiceCases: VoiceCase[] = [
  {
    id: 1,
    scenario: 'Vídeo corporativo para banco tradicional explicando productos financieros',
    industry: 'Finanzas',
    targetAudience: 'Clientes 40-65 años',
    options: [
      {
        id: 'a',
        name: 'Voz Joven Dinámica',
        age: '25-35 años',
        tone: 'Enérgico y cercano',
        description: 'Voz alegre y dinámica que transmite innovación',
        correct: false,
        explanation: 'Demasiado juvenil para un banco tradicional. Los clientes de 40-65 años buscan seriedad y confianza.'
      },
      {
        id: 'b',
        name: 'Voz Madura Confiable',
        age: '45-55 años',
        tone: 'Serio y profesional',
        description: 'Voz grave que transmite experiencia y seguridad',
        correct: true,
        explanation: 'Perfecto: Una voz madura y seria transmite confianza y experiencia, esencial para productos financieros.'
      },
      {
        id: 'c',
        name: 'Voz Infantil Amigable',
        age: '8-12 años',
        tone: 'Dulce y simpático',
        description: 'Voz de niño que genera ternura',
        correct: false,
        explanation: 'Totalmente inapropiado para productos financieros. Falta de profesionalidad y credibilidad.'
      }
    ]
  },
  {
    id: 2,
    scenario: 'Onboarding para startup tecnológica explicando la cultura de la empresa',
    industry: 'Tecnología',
    targetAudience: 'Nuevos empleados 25-40 años',
    options: [
      {
        id: 'a',
        name: 'Voz Corporativa Formal',
        age: '50-60 años',
        tone: 'Muy serio y distante',
        description: 'Voz grave y autoritaria',
        correct: false,
        explanation: 'Demasiado formal para una startup. Genera distancia en lugar de cercanía cultural.'
      },
      {
        id: 'b',
        name: 'Voz Cercana y Dinámica',
        age: '30-40 años',
        tone: 'Amigable y entusiasta',
        description: 'Voz cálida que transmite pasión por el proyecto',
        correct: true,
        explanation: 'Ideal: Una voz cercana y entusiasta refleja la cultura de startup y conecta con empleados jóvenes.'
      },
      {
        id: 'c',
        name: 'Voz Robótica',
        age: 'N/A',
        tone: 'Monótono y artificial',
        description: 'Voz sintética sin emoción',
        correct: false,
        explanation: 'Aunque es una startup tecnológica, la cultura empresarial requiere calidez humana.'
      }
    ]
  },
  {
    id: 3,
    scenario: 'Formación en seguridad industrial para trabajadores de fábrica',
    industry: 'Industria',
    targetAudience: 'Operarios 30-60 años',
    options: [
      {
        id: 'a',
        name: 'Voz Autoritaria Clara',
        age: '40-50 años',
        tone: 'Firme pero accesible',
        description: 'Voz que transmite autoridad y claridad',
        correct: true,
        explanation: 'Perfecto: Para seguridad industrial se necesita una voz que transmita autoridad y seriedad, pero que sea clara y comprensible.'
      },
      {
        id: 'b',
        name: 'Voz Susurrada Relajante',
        age: '30-40 años',
        tone: 'Suave y calmado',
        description: 'Voz tranquila que relaja',
        correct: false,
        explanation: 'Inapropiado para formación de seguridad. Se necesita alerta y atención, no relajación.'
      },
      {
        id: 'c',
        name: 'Voz Infantil Educativa',
        age: '25-35 años',
        tone: 'Didáctico y dulce',
        description: 'Voz que explica como a niños',
        correct: false,
        explanation: 'Patronizante para trabajadores adultos. La formación de seguridad debe ser clara pero respetuosa.'
      }
    ]
  },
  {
    id: 4,
    scenario: 'Atención al cliente en retail explicando política de devoluciones',
    industry: 'Retail',
    targetAudience: 'Clientes generales',
    options: [
      {
        id: 'a',
        name: 'Voz Amable y Paciente',
        age: '35-45 años',
        tone: 'Cálido y servicial',
        description: 'Voz que transmite disposición a ayudar',
        correct: true,
        explanation: 'Ideal: Para atención al cliente se necesita una voz amable, paciente y servicial que transmita disposición a ayudar.'
      },
      {
        id: 'b',
        name: 'Voz Impaciente Rápida',
        age: '25-35 años',
        tone: 'Acelerado y tenso',
        description: 'Voz que va con prisa',
        correct: false,
        explanation: 'Transmite impaciencia y falta de interés en el cliente. Contraproducente para servicio al cliente.'
      },
      {
        id: 'c',
        name: 'Voz Autoritaria',
        age: '50-60 años',
        tone: 'Imponente y distante',
        description: 'Voz que impone respeto',
        correct: false,
        explanation: 'Demasiado autoritaria para atención al cliente. Puede intimidar en lugar de ayudar.'
      }
    ]
  },
  {
    id: 5,
    scenario: 'Vídeo de ventas para producto de lujo (relojes premium)',
    industry: 'Lujo',
    targetAudience: 'Clientes alto poder adquisitivo 35-65 años',
    options: [
      {
        id: 'a',
        name: 'Voz Sofisticada Elegante',
        age: '45-55 años',
        tone: 'Refinado y exclusivo',
        description: 'Voz culta que transmite exclusividad',
        correct: true,
        explanation: 'Perfecto: Para productos de lujo se necesita una voz sofisticada que transmita exclusividad, elegancia y calidad premium.'
      },
      {
        id: 'b',
        name: 'Voz Popular Cercana',
        age: '30-40 años',
        tone: 'Coloquial y divertido',
        description: 'Voz del pueblo que genera confianza',
        correct: false,
        explanation: 'Demasiado popular para productos de lujo. El lujo requiere distancia y sofisticación.'
      },
      {
        id: 'c',
        name: 'Voz Juvenil Energética',
        age: '20-30 años',
        tone: 'Entusiasta y vibrante',
        description: 'Voz llena de energía',
        correct: false,
        explanation: 'Demasiado juvenil y energética. El lujo transmite calma, exclusividad y sofisticación.'
      }
    ]
  }
];

export default function TTSVoiceSelector() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentCase, setCurrentCase] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const startGame = () => {
    setGameState('playing');
    setCurrentCase(0);
    setSelectedVoice(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const handleSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    setShowExplanation(true);
    
    const caseData = voiceCases[currentCase];
    const selected = caseData.options.find(o => o.id === voiceId);
    if (selected?.correct) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const nextCase = () => {
    if (currentCase < voiceCases.length - 1) {
      setCurrentCase(prev => prev + 1);
      setSelectedVoice(null);
      setShowExplanation(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentCase(0);
    setSelectedVoice(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-cyan-500 flex items-center justify-center mx-auto mb-4">
            <Headphones className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-cyan-900">🎙️ TTS Voice Selector</h3>
          <p className="text-cyan-700 mt-2">
            Selecciona la voz apropiada para cada caso de uso empresarial
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 p-4 rounded-lg border border-cyan-200">
            <h4 className="font-bold text-cyan-900 mb-3">📋 Instrucciones:</h4>
            <ol className="space-y-2 text-cyan-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                Lee el escenario y el público objetivo
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                Selecciona la voz más apropiada de las 3 opciones
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                Aprende por qué esa voz es la correcta para ese contexto
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl mb-1">👔</div>
              <div className="text-xs font-semibold text-purple-800">Corporativo</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl mb-1">🛍️</div>
              <div className="text-xs font-semibold text-green-800">Retail</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-2xl mb-1">💎</div>
              <div className="text-xs font-semibold text-amber-800">Lujo</div>
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-cyan-600 hover:bg-cyan-700 h-14 text-lg">
            <Volume2 className="h-5 w-5 mr-2" />
            Comenzar Selector de Voces
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const percentage = (score.correct / voiceCases.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-cyan-900">
            {passed ? '🎉 ¡Excelente Selector!' : '📚 Sigue Practicando'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{passed ? '🌟' : '📖'}</div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-cyan-900">
                Aciertos: {score.correct} / {voiceCases.length}
              </p>
              <p className="text-lg text-cyan-700">
                {percentage.toFixed(0)}% de precisión
              </p>
            </div>
            <p className="text-cyan-800">
              {passed
                ? '¡Fantástico! Tienes buen criterio para seleccionar voces.'
                : 'Repasa las explicaciones y vuelve a intentarlo.'}
            </p>
          </div>

          <Button onClick={resetGame} className="w-full bg-cyan-600 hover:bg-cyan-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing Screen
  const caseData = voiceCases[currentCase];

  return (
    <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-cyan-500">
              <Headphones className="h-3 w-3 mr-1" />
              Caso {currentCase + 1} de {voiceCases.length}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {caseData.industry}
            </Badge>
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
        <div className="bg-white p-4 rounded-lg border border-cyan-200">
          <h4 className="font-bold text-cyan-900 mb-3">Escenario:</h4>
          <p className="text-cyan-800 mb-4">{caseData.scenario}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-sm">
              <span className="font-semibold text-cyan-900">Industria:</span>
              <span className="text-cyan-700 ml-2">{caseData.industry}</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-cyan-900">Público:</span>
              <span className="text-cyan-700 ml-2">{caseData.targetAudience}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {caseData.options.map((option) => {
            const isSelected = selectedVoice === option.id;
            const isCorrect = option.correct;
            const showResult = showExplanation;

            return (
              <Button
                key={option.id}
                onClick={() => !showResult && handleSelect(option.id)}
                disabled={showResult}
                variant="outline"
                className={`w-full h-auto py-4 text-left justify-start transition-all ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 text-green-900'
                      : isSelected
                      ? 'bg-red-100 border-red-500 text-red-900'
                      : 'bg-white border-cyan-200'
                    : 'bg-white border-cyan-200 hover:bg-cyan-50 hover:border-cyan-500'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={isCorrect ? 'bg-green-500' : isSelected ? 'bg-red-500' : 'bg-cyan-500'}>
                      {option.name}
                    </Badge>
                    <span className="text-xs text-cyan-700">{option.age}</span>
                  </div>
                  <p className="text-sm text-cyan-800 mb-1"><strong>Tono:</strong> {option.tone}</p>
                  <p className="text-xs text-cyan-600">{option.description}</p>
                  {showResult && isSelected && (
                    <p className={`text-xs mt-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {option.explanation}
                    </p>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {showExplanation && (
          <Button onClick={nextCase} className="w-full bg-cyan-600 hover:bg-cyan-700">
            {currentCase < voiceCases.length - 1
              ? 'Siguiente Caso →'
              : 'Ver Resultados Finales'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
