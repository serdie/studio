'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RefreshCw, Brain } from 'lucide-react';

interface Question {
  text: string;
  answer: 'ia' | 'ml' | 'deep' | 'automatizacion';
  explanation: string;
}

const questions: Question[] = [
  {
    text: "Termostato clásico con rueda que enciende/apaga la calefacción según la temperatura.",
    answer: "automatizacion",
    explanation: "Es automatización porque sigue una regla fija (si temperatura < X, enciende; si > X, apaga) sin aprender de datos nuevos."
  },
  {
    text: "Filtro de spam del correo electrónico que mejora con el tiempo según lo que marcas como spam.",
    answer: "ml",
    explanation: "Es Machine Learning porque el modelo aprende a partir de ejemplos etiquetados (correos marcados como spam / no spam)."
  },
  {
    text: "Recomendaciones de Netflix basadas en lo que ves y lo que ven usuarios similares.",
    answer: "ml",
    explanation: "Es Machine Learning porque aprende patrones en tus datos de uso para predecir qué contenido te puede gustar."
  },
  {
    text: "Detector de caras para desbloquear el móvil a partir de la cámara frontal.",
    answer: "deep",
    explanation: "Es Deep Learning porque usa redes neuronales profundas de visión por computador para reconocer caras en imágenes."
  },
  {
    text: "Brazo mecánico en una fábrica que repite siempre el mismo movimiento programado.",
    answer: "automatizacion",
    explanation: "Es automatización: ejecuta un programa fijo, no adapta su comportamiento aprendiendo de datos."
  },
  {
    text: "Sistema que analiza miles de imágenes de radiografías y aprende a detectar tumores.",
    answer: "deep",
    explanation: "Es Deep Learning porque necesita redes neuronales profundas para aprender patrones complejos en imágenes médicas."
  },
  {
    text: "Script sencillo que copia datos de una carpeta a otra todos los días a la misma hora.",
    answer: "automatizacion",
    explanation: "Es automatización simple: una tarea repetitiva programada en el tiempo, sin modelo que aprenda."
  },
  {
    text: "Modelo que aprende a predecir si un cliente va a dejar de comprar según su historial.",
    answer: "ml",
    explanation: "Es Machine Learning clásico sobre datos tabulares (historial de compras, variables numéricas, etc.)."
  }
];

const labelsByValue: Record<string, string> = {
  ia: "IA (genérico)",
  ml: "Machine Learning",
  deep: "Deep Learning",
  automatizacion: "Automatización"
};

const colorsByValue: Record<string, string> = {
  ia: "bg-blue-500",
  ml: "bg-green-500",
  deep: "bg-purple-500",
  automatizacion: "bg-orange-500"
};

export default function IAMLDeepLearningQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
    if (showResults) {
      setShowResults(false);
      setScore(null);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setScore(null);
  };

  const getQuestionStatus = (index: number) => {
    if (!showResults) return null;
    const question = questions[index];
    const userAnswer = answers[index];
    
    if (!userAnswer) return 'unanswered';
    if (userAnswer === question.answer) return 'correct';
    return 'incorrect';
  };

  const allAnswered = questions.every((_, index) => answers[index]);

  return (
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-indigo-200 flex items-center justify-center">
            <Brain className="h-6 w-6 text-indigo-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-indigo-900">🧠 ¿IA, ML, Deep Learning o Automatización?</h3>
            <p className="text-sm text-indigo-700">Identifica qué tecnología se usa en cada ejemplo</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        {showResults && score !== null && (
          <div className={`p-4 rounded-lg text-center ${
            score >= 6 ? 'bg-green-100 border-2 border-green-300' :
            score >= 4 ? 'bg-yellow-100 border-2 border-yellow-300' :
            'bg-red-100 border-2 border-red-300'
          }`}>
            <p className="text-2xl font-bold">
              {score >= 6 ? '🎉' : score >= 4 ? '👍' : '📚'}
              {` ${score} de ${questions.length} correctas`}
            </p>
            <p className="text-sm mt-1">
              {score >= 6 ? '¡Excelente! Dominas los conceptos' :
               score >= 4 ? '¡Bien! Pero puedes mejorar' :
               'Sigue practicando para mejorar'}
            </p>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((question, index) => {
            const status = getQuestionStatus(index);
            return (
              <Card 
                key={index}
                className={`transition-all ${
                  status === 'correct' ? 'border-green-400 bg-green-50' :
                  status === 'incorrect' ? 'border-red-400 bg-red-50' :
                  status === 'unanswered' ? 'border-yellow-400 bg-yellow-50' :
                  'border-slate-200 bg-white'
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Question Text */}
                  <p className="font-semibold text-slate-800">{question.text}</p>

                  {/* Options */}
                  <RadioGroup
                    value={answers[index] || ''}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {Object.entries(labelsByValue).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={value} 
                          id={`q${index}-${value}`}
                          disabled={showResults}
                          className={colorsByValue[value]}
                        />
                        <Label 
                          htmlFor={`q${index}-${value}`}
                          className="flex-1 cursor-pointer text-sm"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Explanation */}
                  {showResults && (
                    <div className={`p-3 rounded-lg text-sm ${
                      status === 'correct' ? 'bg-green-100 border-l-4 border-green-500' :
                      status === 'incorrect' ? 'bg-red-100 border-l-4 border-red-500' :
                      'bg-yellow-100 border-l-4 border-yellow-500'
                    }`}>
                      <div className="flex items-start gap-2">
                        {status === 'correct' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : status === 'incorrect' ? (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Brain className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          {status === 'correct' && (
                            <Badge className="bg-green-600 mb-1">Correcto</Badge>
                          )}
                          {status === 'incorrect' && (
                            <Badge className="bg-red-600 mb-1">Incorrecto</Badge>
                          )}
                          {status === 'unanswered' && (
                            <Badge className="bg-yellow-600 mb-1">Sin responder</Badge>
                          )}
                          <p className="text-slate-700 mt-1">
                            <strong>Respuesta:</strong> {labelsByValue[question.answer]}
                          </p>
                          {answers[index] && answers[index] !== question.answer && (
                            <p className="text-slate-600 text-xs mt-1">
                              <strong>Tu respuesta:</strong> {labelsByValue[answers[index]]}
                            </p>
                          )}
                          <p className="text-slate-600 mt-2 italic">
                            💡 {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={checkAnswers}
            disabled={!allAnswered || showResults}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Corregir
          </Button>
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-slate-600">
          <p>
            Respondidas: <strong>{Object.keys(answers).length}</strong> de <strong>{questions.length}</strong>
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
