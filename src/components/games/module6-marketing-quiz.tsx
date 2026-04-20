'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, RefreshCw, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: '¿Cuál es el objetivo principal del marketing predictivo?',
    options: [
      'Anticipar comportamientos de clientes y tendencias del mercado',
      'Reducir costes de publicidad',
      'Aumentar seguidores en redes sociales',
      'Eliminar competencia'
    ],
    correct: 0,
    explanation: 'El marketing predictivo utiliza algoritmos de ML para anticipar comportamientos y tendencias, permitiendo estrategias más precisas.'
  },
  {
    id: 2,
    question: '¿Qué herramienta es especializada en e-commerce y marketing automation?',
    options: [
      'HubSpot',
      'Marketo',
      'Klaviyo',
      'ActiveCampaign'
    ],
    correct: 2,
    explanation: 'Klaviyo es especialista en e-commerce, permitiendo automatización de email marketing y análisis de comportamiento de compra.'
  },
  {
    id: 3,
    question: '¿Cuál es un KPI clave para medir efectividad en marketing digital?',
    options: [
      'Número de empleados',
      'Customer Lifetime Value (CLV)',
      'Tamaño de la oficina',
      'Edad del CEO'
    ],
    correct: 1,
    explanation: 'CLV mide el valor total que un cliente aporta a la empresa durante su relación, esencial para ROI.'
  },
  {
    id: 4,
    question: '¿Qué estrategia utiliza datos de clientes similares a los conversores?',
    options: [
      'Lookalike audiences',
      'In-market audiences',
      'Custom intent audiences',
      'Retargeting'
    ],
    correct: 0,
    explanation: 'Las Lookalike audiences en Meta Ads crean segmentos de usuarios similares a tus conversores actuales.'
  },
  {
    id: 5,
    question: '¿Cuál es la principal ventaja del marketing automation?',
    options: [
      'Eliminar el trabajo humano',
      'Optimizar procesos repetitivos a escala',
      'Reducir presupuesto',
      'Automatizar todas las decisiones'
    ],
    correct: 1,
    explanation: 'La automatización optimiza tareas repetitivas (emails, seguimientos) permitiendo que el equipo se enfoque en estrategia.'
  },
  {
    id: 6,
    question: '¿Qué significa SMART en objetivos de marketing?',
    options: [
      'Small, Minimal, Achievable, Realistic, Time-bound',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Strategic, Market-driven, Actionable, Realistic, Tangible',
      'Simple, Measurable, Actionable, Realistic, Transparent'
    ],
    correct: 1,
    explanation: 'SMART (Específico, Medible, Alcanzable, Relevante, Temporal) son los criterios para objetivos efectivos.'
  },
  {
    id: 7,
    question: '¿Cuál es la principal diferencia entre SEO y SEM?',
    options: [
      'No hay diferencia',
      'SEO es orgánico, SEM es publicidad pagada',
      'SEM solo funciona en móvil',
      'SEO es más costoso'
    ],
    correct: 1,
    explanation: 'SEO (posicionamiento orgánico) vs SEM (publicidad pagada). Ambos son complementarios.'
  },
  {
    id: 8,
    question: '¿Qué es un Buyer Persona?',
    options: [
      'Un influencer de marketing',
      'Un perfil semificticio del cliente ideal',
      'Un tipo de seguidor en redes',
      'Un competidor identificado'
    ],
    correct: 1,
    explanation: 'Un Buyer Persona es una representación semificticia del cliente ideal, basada en datos y research.'
  }
];

export default function Module6MarketingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswered(optionIndex);
    setShowExplanation(true);
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(null);
    setCompleted(false);
    setShowExplanation(false);
  };

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  const percentage = Math.round((score / questions.length) * 100);

  if (completed) {
    return (
      <Card className="bg-gradient-to-br from-pink-50/80 via-purple-50/50 to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-pink-200 dark:border-pink-900">
        <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 border-b border-pink-200 dark:border-pink-900">
          <div className="text-center space-y-4">
            <Award className="h-16 w-16 mx-auto text-yellow-500" />
            <CardTitle className="text-2xl text-pink-900 dark:text-pink-100">
              ¡Quiz completado!
            </CardTitle>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-300">
                {percentage}%
              </p>
              <p className="text-pink-700 dark:text-pink-300">
                {score} de {questions.length} respuestas correctas
              </p>
            </div>
            <Button
              onClick={handleRestart}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar de nuevo
            </Button>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const q = questions[currentQuestion];

  return (
    <Card className="bg-gradient-to-br from-pink-50/80 via-purple-50/50 to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-pink-200 dark:border-pink-900">
      <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 border-b border-pink-200 dark:border-pink-900">
        <div className="flex justify-between items-center">
          <CardTitle className="text-pink-900 dark:text-pink-100">Quiz: Marketing con IA</CardTitle>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            Pregunta {currentQuestion + 1}/{questions.length}
          </Badge>
        </div>
        <Progress value={progressPercent} className="mt-4" />
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {q.question}
            </h3>
            <div className="space-y-3">
              {q.options.map((option, idx) => {
                const isSelected = answered === idx;
                const isCorrect = idx === q.correct;
                let bgClass = 'bg-white dark:bg-slate-800 border-purple-200 dark:border-purple-900 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-700';

                if (isSelected && showExplanation) {
                  bgClass = isCorrect
                    ? 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-700'
                    : 'bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-700';
                }

                if (!isSelected && isCorrect && showExplanation) {
                  bgClass = 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-700';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${bgClass}`}
                  >
                    <div className="flex items-center gap-3">
                      {showExplanation && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />}
                      {showExplanation && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />}
                      {!showExplanation && <div className="h-5 w-5 rounded-full border-2 border-purple-400" />}
                      <span className="text-slate-900 dark:text-slate-100">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Explicación:</strong> {q.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!showExplanation}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white disabled:opacity-50"
            >
              {currentQuestion === questions.length - 1 ? 'Ver resultados' : 'Siguiente pregunta'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
