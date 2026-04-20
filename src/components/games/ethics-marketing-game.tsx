'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Scale, Eye, Lock } from 'lucide-react';

interface EthicsScenario {
  id: string;
  title: string;
  description: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isEthical: boolean;
    explanation: string;
    regulation?: string;
  }[];
  correctChoice: string;
  category: 'privacy' | 'bias' | 'transparency' | 'consent';
}

const scenarios: EthicsScenario[] = [
  {
    id: 'scenario1',
    title: 'Segmentación Predictiva',
    description: 'Tu equipo de marketing quiere usar IA para predecir qué clientes están a punto de divorciarse basándose en patrones de compra.',
    scenario: 'El algoritmo ha identificado que clientes que compran ciertos productos (como cenas románticas o viajes solos) tienen mayor probabilidad de separación. Quieres usar esta información para enviar ofertas de "reinicio de relación".',
    options: [
      {
        id: 'a',
        text: 'Implementar la segmentación porque mejora el ROI',
        isEthical: false,
        explanation: 'Viola la privacidad al inferir información sensible sobre la vida personal sin consentimiento explícito.',
        regulation: 'GDPR Art. 22'
      },
      {
        id: 'b',
        text: 'Usar solo datos explícitamente proporcionados por el cliente',
        isEthical: true,
        explanation: 'Respeta la privacidad y evita inferencias no consentidas sobre asuntos personales sensibles.',
        regulation: 'GDPR Art. 5'
      },
      {
        id: 'c',
        text: 'Pedir consentimiento específico para este tipo de análisis',
        isEthical: true,
        explanation: 'Permite el análisis predictivo con consentimiento informado y transparente.',
        regulation: 'GDPR Art. 7'
      },
      {
        id: 'd',
        text: 'Anonimizar los datos antes del análisis',
        isEthical: false,
        explanation: 'La anonimización no es suficiente cuando se pueden re-identificar patrones personales.',
        regulation: 'GDPR Art. 4'
      }
    ],
    correctChoice: 'c',
    category: 'privacy'
  },
  {
    id: 'scenario2',
    title: 'Sesgo Algorítmico en Contratación',
    description: 'Estás desarrollando un sistema de IA para filtrar CVs en el proceso de selección.',
    scenario: 'El algoritmo aprende de CVs históricos y rechaza sistemáticamente candidatas mujeres para posiciones técnicas, porque los datos históricos muestran menor representación femenina.',
    options: [
      {
        id: 'a',
        text: 'Desplegar el sistema porque refleja datos reales del mercado',
        isEthical: false,
        explanation: 'Perpetúa la discriminación histórica sin cuestionar las causas subyacentes.',
        regulation: 'AI Act - Alto Riesgo'
      },
      {
        id: 'b',
        text: 'Auditar el algoritmo y corregir sesgos en los datos de entrenamiento',
        isEthical: true,
        explanation: 'Aborda el problema del sesgo en la raíz mediante auditorías y corrección de datos.',
        regulation: 'AI Act Art. 10'
      },
      {
        id: 'c',
        text: 'Eliminar el filtro automático y usar solo revisión humana',
        isEthical: true,
        explanation: 'Evita riesgos de discriminación algorítmica manteniendo supervisión humana.',
        regulation: 'GDPR Art. 22'
      },
      {
        id: 'd',
        text: 'Añadir una nota de "resultado generado por IA" en las decisiones',
        isEthical: false,
        explanation: 'No soluciona el sesgo, solo añade transparencia superficial.',
        regulation: 'AI Act Art. 13'
      }
    ],
    correctChoice: 'b',
    category: 'bias'
  },
  {
    id: 'scenario3',
    title: 'Transparencia en Recomendaciones',
    description: 'Tu plataforma de e-commerce usa IA para recomendaciones personalizadas.',
    scenario: 'Los usuarios no saben que las recomendaciones están influenciadas por IA, y algunos productos aparecen más frecuentemente debido a acuerdos comerciales ocultos.',
    options: [
      {
        id: 'a',
        text: 'Continuar sin informar porque mejora la experiencia del usuario',
        isEthical: false,
        explanation: 'Oculta información relevante sobre cómo se generan las recomendaciones.',
        regulation: 'DSA Art. 27'
      },
      {
        id: 'b',
        text: 'Informar que "las recomendaciones son personalizadas con IA"',
        isEthical: true,
        explanation: 'Proporciona transparencia básica sobre el uso de IA.',
        regulation: 'AI Act Art. 52'
      },
      {
        id: 'c',
        text: 'Explicar detalladamente los factores que influyen en las recomendaciones',
        isEthical: true,
        explanation: 'Ofrece máxima transparencia sobre el funcionamiento del sistema.',
        regulation: 'AI Act Art. 13'
      },
      {
        id: 'd',
        text: 'Eliminar la personalización para evitar complejidad',
        isEthical: false,
        explanation: 'Solución excesiva que reduce la utilidad del servicio sin resolver el problema ético.',
        regulation: 'No aplica'
      }
    ],
    correctChoice: 'c',
    category: 'transparency'
  }
];

export default function EthicsMarketingGame() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
  };

  const checkAnswer = () => {
    const selectedOption = scenario.options.find(opt => opt.id === selectedChoice);
    if (selectedOption?.isEthical) {
      setScore(score + 100);
    }
    setShowResults(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice('');
      setShowResults(false);
    } else {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedChoice('');
    setShowResults(false);
    setScore(0);
    setCompleted(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'privacy': return <Lock className="w-4 h-4" />;
      case 'bias': return <Scale className="w-4 h-4" />;
      case 'transparency': return <Eye className="w-4 h-4" />;
      case 'consent': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  if (completed) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            Evaluación Ética Completada
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">
            {score} puntos
          </div>
          <p className="text-gray-600">
            Has evaluado {scenarios.length} escenarios éticos en marketing con IA.
            {score >= 200 ? ' ¡Excelente comprensión ética!' : ' Considera revisar los principios éticos.'}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Regulaciones Clave Recordadas:</h4>
            <ul className="text-sm text-left space-y-1">
              <li>• GDPR: Protección de datos personales</li>
              <li>• AI Act: Regulación de sistemas de IA</li>
              <li>• DSA: Servicios digitales y algoritmos</li>
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            <Button onClick={resetGame} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Repetir Evaluación
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
            <Shield className="w-5 h-5 text-blue-500" />
            Ética en Marketing con IA
          </CardTitle>
          <div className="flex items-center gap-2">
            {getCategoryIcon(scenario.category)}
            <Badge variant="secondary" className="capitalize">
              {scenario.category}
            </Badge>
            <Badge variant="outline">
              Caso {currentScenario + 1} de {scenarios.length}
            </Badge>
          </div>
        </div>
        <Progress value={(currentScenario / scenarios.length) * 100} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <AlertTriangle className="w-5 h-5 text-red-500 inline mr-2" />
          <span className="font-semibold">Escenario Ético</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{scenario.title}</h3>
          <p className="text-gray-700">{scenario.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Situación:</p>
            <p className="text-gray-700">{scenario.scenario}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">¿Cuál es la acción más ética?</h4>
          <div className="space-y-3">
            {scenario.options.map((option) => (
              <div
                key={option.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedChoice === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleChoiceSelect(option.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                    selectedChoice === option.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedChoice === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{option.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showResults && (
          <div className={`p-4 rounded-lg border-l-4 ${
            scenario.options.find(opt => opt.id === selectedChoice)?.isEthical
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {scenario.options.find(opt => opt.id === selectedChoice)?.isEthical ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <h4 className="font-semibold">
                {scenario.options.find(opt => opt.id === selectedChoice)?.isEthical
                  ? '¡Decisión Ética Correcta!'
                  : 'Decisión Problemática'}
              </h4>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Tu elección:</strong> {scenario.options.find(opt => opt.id === selectedChoice)?.text}
              </p>
              <p>
                <strong>Explicación:</strong> {scenario.options.find(opt => opt.id === selectedChoice)?.explanation}
              </p>
              {scenario.options.find(opt => opt.id === selectedChoice)?.regulation && (
                <p>
                  <strong>Regulación relevante:</strong> {scenario.options.find(opt => opt.id === selectedChoice)?.regulation}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Puntaje ético: <span className="font-semibold">{score} puntos</span>
          </div>

          <div className="flex gap-2">
            {!showResults ? (
              <Button
                onClick={checkAnswer}
                disabled={!selectedChoice}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Evaluar Decisión
              </Button>
            ) : (
              <Button onClick={nextScenario} className="bg-green-600 hover:bg-green-700">
                {currentScenario < scenarios.length - 1 ? 'Siguiente Escenario' : 'Ver Resultados Finales'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}