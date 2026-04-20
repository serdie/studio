'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, TrendingUp, CheckCircle2, RefreshCw, Trophy, Zap } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: 'fundamentos' | 'herramientas' | 'estrategias' | 'casos' | 'etica';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const questions: Question[] = [
  {
    id: 'q1',
    question: '¿Cuál es el principal beneficio de usar IA en segmentación de audiencias?',
    options: [
      {
        id: 'a',
        text: 'Reducir costos de publicidad',
        isCorrect: false,
        explanation: 'Aunque puede reducir costos, no es el principal beneficio'
      },
      {
        id: 'b',
        text: 'Crear segmentos dinámicos que se actualizan en tiempo real',
        isCorrect: true,
        explanation: 'La IA permite segmentación predictiva y dinámica basada en comportamiento actual'
      },
      {
        id: 'c',
        text: 'Eliminar necesidad de investigación de mercado',
        isCorrect: false,
        explanation: 'La IA complementa pero no elimina la necesidad de investigación humana'
      },
      {
        id: 'd',
        text: 'Automatizar completamente el marketing',
        isCorrect: false,
        explanation: 'La IA automatiza tareas pero no reemplaza completamente el juicio humano'
      }
    ],
    category: 'fundamentos',
    difficulty: 'basic'
  },
  {
    id: 'q2',
    question: '¿Qué métrica mejora más significativamente con la personalización hiperpersonalizada?',
    options: [
      {
        id: 'a',
        text: 'Tráfico web',
        isCorrect: false,
        explanation: 'El tráfico puede no cambiar significativamente con la personalización'
      },
      {
        id: 'b',
        text: 'Tasa de conversión',
        isCorrect: true,
        explanation: 'La personalización relevante aumenta significativamente las conversiones'
      },
      {
        id: 'c',
        text: 'Número de seguidores sociales',
        isCorrect: false,
        explanation: 'Los seguidores no dependen directamente de la personalización'
      },
      {
        id: 'd',
        text: 'Costo por clic',
        isCorrect: false,
        explanation: 'El CPC puede reducirse pero no es la métrica más impactada'
      }
    ],
    category: 'estrategias',
    difficulty: 'intermediate'
  },
  {
    id: 'q3',
    question: '¿Cuál de estas herramientas es especializada en creación de contenido para marketing?',
    options: [
      {
        id: 'a',
        text: 'Google Analytics',
        isCorrect: false,
        explanation: 'Google Analytics es para análisis, no creación de contenido'
      },
      {
        id: 'b',
        text: 'HubSpot',
        isCorrect: false,
        explanation: 'HubSpot es una plataforma completa pero no especializada solo en contenido'
      },
      {
        id: 'c',
        text: 'Jasper.ai',
        isCorrect: true,
        explanation: 'Jasper.ai está especializado en generación de contenido para marketing'
      },
      {
        id: 'd',
        text: 'Salesforce',
        isCorrect: false,
        explanation: 'Salesforce es principalmente CRM y gestión de relaciones con clientes'
      }
    ],
    category: 'herramientas',
    difficulty: 'basic'
  },
  {
    id: 'q4',
    question: 'En el caso de Starbucks, ¿qué tipo de datos usaron para personalización?',
    options: [
      {
        id: 'a',
        text: 'Solo demográficos básicos',
        isCorrect: false,
        explanation: 'Usaron datos mucho más ricos que solo demográficos'
      },
      {
        id: 'b',
        text: 'Historial de compras, clima, hora y ubicación',
        isCorrect: true,
        explanation: 'Combinaron múltiples fuentes de datos contextuales para personalización'
      },
      {
        id: 'c',
        text: 'Preferencias de redes sociales únicamente',
        isCorrect: false,
        explanation: 'Las redes sociales fueron solo una parte de su estrategia'
      },
      {
        id: 'd',
        text: 'Datos de terceros comprados',
        isCorrect: false,
        explanation: 'Se enfocaron en datos propios y contextuales'
      }
    ],
    category: 'casos',
    difficulty: 'intermediate'
  },
  {
    id: 'q5',
    question: '¿Qué considera el GDPR sobre el uso de IA en marketing?',
    options: [
      {
        id: 'a',
        text: 'Prohíbe completamente el uso de IA en marketing',
        isCorrect: false,
        explanation: 'El GDPR no prohíbe la IA, pero establece requisitos estrictos'
      },
      {
        id: 'b',
        text: 'Requiere consentimiento explícito y derecho a explicación',
        isCorrect: true,
        explanation: 'El GDPR exige transparencia, consentimiento y derecho a explicación de decisiones automatizadas'
      },
      {
        id: 'c',
        text: 'Permite cualquier uso de datos sin restricciones',
        isCorrect: false,
        explanation: 'El GDPR establece límites claros al uso de datos personales'
      },
      {
        id: 'd',
        text: 'Solo aplica a empresas europeas',
        isCorrect: false,
        explanation: 'Aplica a cualquier empresa que trate datos de ciudadanos europeos'
      }
    ],
    category: 'etica',
    difficulty: 'advanced'
  },
  {
    id: 'q6',
    question: '¿Cuál es el ROI típico de implementación de IA en marketing según los casos estudiados?',
    options: [
      {
        id: 'a',
        text: '50-100%',
        isCorrect: false,
        explanation: 'Los ROIs reales son significativamente mayores'
      },
      {
        id: 'b',
        text: '150-300%',
        isCorrect: false,
        explanation: 'Es un rango bajo comparado con casos reales exitosos'
      },
      {
        id: 'c',
        text: '200-500%',
        isCorrect: true,
        explanation: 'La mayoría de casos exitosos muestran ROIs entre 200-500%'
      },
      {
        id: 'd',
        text: 'Más de 1000%',
        isCorrect: false,
        explanation: 'Aunque algunos casos pueden ser muy altos, 200-500% es más típico'
      }
    ],
    category: 'casos',
    difficulty: 'intermediate'
  },
  {
    id: 'q7',
    question: '¿Qué técnica de IA es más efectiva para predecir churn de clientes?',
    options: [
      {
        id: 'a',
        text: 'Análisis de sentimiento simple',
        isCorrect: false,
        explanation: 'El análisis de sentimiento es útil pero insuficiente por sí solo'
      },
      {
        id: 'b',
        text: 'Modelos de clasificación con históricos de comportamiento',
        isCorrect: true,
        explanation: 'Los modelos de clasificación ML entrenados con datos históricos son más efectivos'
      },
      {
        id: 'c',
        text: 'Encuestas de satisfacción',
        isCorrect: false,
        explanation: 'Las encuestas son subjetivas y no predictivas por sí solas'
      },
      {
        id: 'd',
        text: 'Análisis demográfico básico',
        isCorrect: false,
        explanation: 'Los datos demográficos solos son predictores débiles de churn'
      }
    ],
    category: 'estrategias',
    difficulty: 'advanced'
  },
  {
    id: 'q8',
    question: '¿Qué característica hace a Copy.ai especializado para marketing?',
    options: [
      {
        id: 'a',
        text: 'Generación de código',
        isCorrect: false,
        explanation: 'Copy.ai no está especializado en generación de código'
      },
      {
        id: 'b',
        text: 'Creación de copy publicitario y contenido de marketing',
        isCorrect: true,
        explanation: 'Copy.ai está diseñado específicamente para crear textos de marketing'
      },
      {
        id: 'c',
        text: 'Análisis financiero',
        isCorrect: false,
        explanation: 'No es una herramienta de análisis financiero'
      },
      {
        id: 'd',
        text: 'Diseño gráfico',
        isCorrect: false,
        explanation: 'Se enfoca en texto, no en diseño visual'
      }
    ],
    category: 'herramientas',
    difficulty: 'basic'
  },
  {
    id: 'q9',
    question: '¿Cuál es el principal desafío ético en marketing con IA?',
    options: [
      {
        id: 'a',
        text: 'Costo de implementación',
        isCorrect: false,
        explanation: 'El costo es un desafío técnico, no ético'
      },
      {
        id: 'b',
        text: 'Privacidad de datos y consentimiento',
        isCorrect: true,
        explanation: 'La privacidad y el consentimiento son los principales desafíos éticos'
      },
      {
        id: 'c',
        text: 'Complejidad técnica',
        isCorrect: false,
        explanation: 'La complejidad es un desafío técnico, no ético'
      },
      {
        id: 'd',
        text: 'Integración con sistemas existentes',
        isCorrect: false,
        explanation: 'La integración es un desafío operativo, no ético'
      }
    ],
    category: 'etica',
    difficulty: 'basic'
  },
  {
    id: 'q10',
    question: '¿Qué métrica mejora Amazon con su sistema de recomendaciones?',
    options: [
      {
        id: 'a',
        text: '35% de las ventas totales',
        isCorrect: true,
        explanation: 'Las recomendaciones representan el 35% de todas las ventas de Amazon'
      },
      {
        id: 'b',
        text: '10% de las ventas totales',
        isCorrect: false,
        explanation: 'Es mucho mayor que 10%'
      },
      {
        id: 'c',
        text: '50% de las ventas totales',
        isCorrect: false,
        explanation: 'Aunque es significativo, no llega al 50%'
      },
      {
        id: 'd',
        text: 'Menos del 5% de las ventas',
        isCorrect: false,
        explanation: 'Es mucho más significativo que 5%'
      }
    ],
    category: 'casos',
    difficulty: 'intermediate'
  }
];

const categoryColors = {
  fundamentos: 'bg-blue-100 text-blue-800',
  herramientas: 'bg-green-100 text-green-800',
  estrategias: 'bg-purple-100 text-purple-800',
  casos: 'bg-orange-100 text-orange-800',
  etica: 'bg-red-100 text-red-800'
};

const difficultyColors = {
  basic: 'bg-green-50 border-green-200',
  intermediate: 'bg-yellow-50 border-yellow-200',
  advanced: 'bg-red-50 border-red-200'
};

export default function Module6ExamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer) {
        const selectedOption = question.options.find(opt => opt.id === selectedAnswer);
        if (selectedOption?.isCorrect) {
          correct++;
        }
      }
    });
    return correct;
  };

  const calculateCategoryScores = () => {
    const scores: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach(question => {
      if (!scores[question.category]) {
        scores[question.category] = { correct: 0, total: 0 };
      }
      scores[question.category].total++;
      
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer) {
        const selectedOption = question.options.find(opt => opt.id === selectedAnswer);
        if (selectedOption?.isCorrect) {
          scores[question.category].correct++;
        }
      }
    });
    
    return scores;
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanations({});
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQ.id];
  const selectedOption = selectedAnswer ? currentQ.options.find(opt => opt.id === selectedAnswer) : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(selectedAnswers).length;

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    const categoryScores = calculateCategoryScores();

    return (
      <div className="space-y-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-900">
              <Trophy className="h-6 w-6" />
              Resultados del Examen - Módulo 6
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-purple-600">{percentage.toFixed(0)}%</div>
              <div className="text-xl text-purple-800">
                Has respondido correctamente {score} de {questions.length} preguntas
              </div>
              
              <div className="w-full max-w-md mx-auto">
                <Progress value={percentage} className="h-4" />
              </div>

              <div className={`text-lg font-semibold ${
                percentage >= 80 ? 'text-green-600' :
                percentage >= 60 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {percentage >= 80 ? '🎉 ¡Excelente!' :
                 percentage >= 60 ? '👍 ¡Buen trabajo!' :
                 '📚 Sigue estudiando'}
              </div>

              {/* Category Breakdown */}
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-purple-800">Resultados por Categoría:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(categoryScores).map(([category, scores]) => {
                    const categoryPercentage = (scores.correct / scores.total) * 100;
                    return (
                      <Card key={category} className="p-3">
                        <div className="space-y-2">
                          <Badge className={categoryColors[category as keyof typeof categoryColors]}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Badge>
                          <div className="text-sm">
                            <div className="font-semibold">{scores.correct}/{scores.total}</div>
                            <Progress value={categoryPercentage} className="h-2 mt-1" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="mt-6 text-left">
                <h4 className="font-semibold text-purple-800 mb-3">Revisión Detallada:</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const userOption = userAnswer ? question.options.find(opt => opt.id === userAnswer) : null;
                    const correctOption = question.options.find(opt => opt.isCorrect);
                    const isCorrect = userOption?.isCorrect;

                    return (
                      <Card key={question.id} className={`p-3 ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Pregunta {index + 1}:</span>
                            <Badge className={categoryColors[question.category]}>
                              {question.category}
                            </Badge>
                            {isCorrect ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <span className="text-red-600 text-sm">✗</span>
                            )}
                          </div>
                          <p className="text-sm">{question.question}</p>
                          <div className="text-xs space-y-1">
                            <div>
                              <span className="font-medium">Tu respuesta:</span>
                              <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                {userOption ? userOption.text : 'No respondida'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="font-medium">Respuesta correcta:</span>
                                <span className="text-green-600">{correctOption?.text}</span>
                              </div>
                            )}
                            <div className="text-gray-600 mt-1">
                              {correctOption?.explanation}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Button onClick={resetQuiz} className="bg-purple-600 hover:bg-purple-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar de Nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="h-6 w-6" />
            Examen de Evaluación - Módulo 6: IA y Marketing Digital
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-purple-700">
              <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
              <span>Respondidas: {answeredQuestions}/{questions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Question */}
            <Card className={`border-2 ${difficultyColors[currentQ.difficulty]}`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={categoryColors[currentQ.category]}>
                      {currentQ.category.charAt(0).toUpperCase() + currentQ.category.slice(1)}
                    </Badge>
                    <Badge variant="outline">
                      {currentQ.difficulty === 'basic' ? 'Básico' :
                       currentQ.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-900">{currentQ.question}</h3>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const showExplanation = showExplanations[currentQ.id];
                
                return (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all border-2 ${
                      isSelected 
                        ? option.isCorrect 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-red-400 bg-red-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? option.isCorrect 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-red-500 bg-red-500'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <span className="text-white text-xs font-bold">
                                {String.fromCharCode(65 + currentQ.options.indexOf(option))}
                              </span>
                            )}
                          </div>
                          <span className={`font-medium ${
                            isSelected && option.isCorrect ? 'text-green-700' :
                            isSelected && !option.isCorrect ? 'text-red-700' :
                            'text-gray-700'
                          }`}>
                            {option.text}
                          </span>
                          {showExplanation && option.isCorrect && (
                            <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />
                          )}
                        </div>
                        
                        {showExplanation && (
                          <div className={`ml-9 p-3 rounded text-sm ${
                            option.isCorrect 
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : isSelected
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            <p>{option.explanation}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button 
                onClick={prevQuestion} 
                disabled={currentQuestion === 0}
                variant="outline"
              >
                Anterior
              </Button>
              
              <div className="text-sm text-gray-600">
                Progreso: {Math.round(progress)}%
              </div>
              
              {currentQuestion === questions.length - 1 ? (
                <Button 
                  onClick={submitQuiz}
                  disabled={answeredQuestions < questions.length}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Finalizar Examen
                </Button>
              ) : (
                <Button onClick={nextQuestion}>
                  Siguiente
                </Button>
              )}
            </div>

            {/* Quick Navigation */}
            <div className="flex flex-wrap gap-2 justify-center">
              {questions.map((_, index) => {
                const isAnswered = selectedAnswers[questions[index].id];
                const isCurrent = index === currentQuestion;
                
                return (
                  <Button
                    key={index}
                    variant={isCurrent ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      isAnswered ? 'bg-green-100 border-green-300 text-green-700' : ''
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}