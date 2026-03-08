'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RefreshCw, Sparkles } from 'lucide-react';

interface Question {
  text: string;
  answer: 'specific' | 'context' | 'fewshot' | 'role' | 'cot' | 'structure';
  explanation: string;
}

const questions: Question[] = [
  {
    text: '"Eres un abogado especializado en propiedad intelectual con 20 años de experiencia. Revisa este contrato y señala las cláusulas potencialmente problemáticas..." ¿Qué técnica de prompt engineering se está usando?',
    answer: 'role',
    explanation: 'Role Prompting: Se asigna un rol específico y experto al modelo para obtener respuestas más especializadas y contextualizadas.'
  },
  {
    text: `"Clasifica el sentimiento: 'El producto es excelente' → Positivo. 'La entrega tardó mucho' → Neutral. Ahora clasifica: 'Calidad aceptable por el precio'..." ¿Qué técnica es esta?`,
    answer: 'fewshot',
    explanation: 'Few-Shot Prompting: Se proporcionan ejemplos de entrada/salida para que el modelo aprenda el patrón a seguir.'
  },
  {
    text: '"Resuelve este problema matemático paso a paso, explicando tu razonamiento en cada etapa antes de dar la respuesta final." ¿Qué técnica es?',
    answer: 'cot',
    explanation: 'Chain of Thought (Cadena de Pensamiento): Se pide al modelo que razone paso a paso, mejorando la precisión en tareas complejas.'
  },
  {
    text: '"Genera una tabla con columnas: Estrategia, Descripción, Coste, ROI, Tiempo. Incluye 5 estrategias de marketing digital." ¿Qué técnica es?',
    answer: 'structure',
    explanation: 'Estructurar la salida: Se especifica el formato exacto deseado para la respuesta, facilitando el uso posterior.'
  },
  {
    text: '"Escribe un artículo de 800 palabras sobre estrategias de marketing digital para pymes del sector retail en España, con ejemplos y tendencias 2025." ¿Qué principio se aplica?',
    answer: 'specific',
    explanation: 'Ser específico y claro: El prompt define extensión, tema, audiencia, ubicación y contenido esperado.'
  },
  {
    text: `"Eres un consultor senior de marketing con 15 años en IBEX 35. Tu cliente es una cadena de moda que quiere expandirse online. El presupuesto es 50K€..." ¿Qué combinación de técnicas se usa?`,
    answer: 'context',
    explanation: 'Proporcionar contexto: Se da información detallada sobre el escenario, permitiendo respuestas más relevantes y personalizadas.'
  },
  {
    text: '"Genera 3 enfoques diferentes para resolver este problema. Para cada uno, analiza pros, contras y viabilidad. Luego recomienda el mejor." ¿Qué técnica avanzada es?',
    answer: 'cot',
    explanation: 'Tree of Thoughts variante: Se exploran múltiples caminos de razonamiento antes de llegar a una conclusión.'
  },
  {
    text: '"Primero genera un borrador. Luego revísalo y mejora la claridad. Finalmente, optimiza para SEO." ¿Qué técnica es?',
    answer: 'cot',
    explanation: 'Iterative Refinement: Se divide el proceso en pasos secuenciales de mejora progresiva.'
  }
];

const labelsByValue: Record<string, string> = {
  specific: 'Ser Específico',
  context: 'Proporcionar Contexto',
  fewshot: 'Few-Shot Prompting',
  role: 'Role Prompting',
  cot: 'Chain of Thought',
  structure: 'Estructurar Salida'
};

const colorsByValue: Record<string, string> = {
  specific: 'bg-blue-500',
  context: 'bg-green-500',
  fewshot: 'bg-purple-500',
  role: 'bg-orange-500',
  cot: 'bg-pink-500',
  structure: 'bg-cyan-500'
};

export default function PromptEngineeringQuiz() {
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
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-purple-200 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-purple-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-900">✨ Quiz de Prompt Engineering</h3>
            <p className="text-sm text-purple-700">Identifica las técnicas de prompt engineering en cada ejemplo</p>
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
              {score >= 6 ? '¡Excelente! Dominas el prompt engineering' :
               score >= 4 ? '¡Bien! Pero puedes mejorar' :
               'Sigue practicando para dominar las técnicas'}
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
                  <p className="font-semibold text-slate-800 italic">"{question.text}"</p>

                  {/* Options */}
                  <RadioGroup
                    value={answers[index] || ''}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    disabled={showResults}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    {Object.entries(labelsByValue).map(([value, label]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={value}
                          id={`q${index}-${value}`}
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
                          <Sparkles className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
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
            className="flex-1 bg-purple-600 hover:bg-purple-700"
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
              className="bg-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
