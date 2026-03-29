'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  Shield,
  Lock,
  Eye,
  UserCheck,
  AlertTriangle,
  FileCheck,
  Key,
  Database
} from 'lucide-react';

interface EthicsQuestion {
  id: number;
  category: 'etica' | 'seguridad' | 'privacidad' | 'regulacion';
  question: string;
  scenarios: {
    text: string;
    correct: boolean;
    explanation: string;
  }[];
}

const questions: EthicsQuestion[] = [
  {
    id: 1,
    category: 'etica',
    question: '¿Cuáles de estas prácticas son ÉTICAS en un chatbot?',
    scenarios: [
      {
        text: 'Revelar claramente que es un bot, no un humano',
        correct: true,
        explanation: '✅ La transparencia es fundamental. Los usuarios deben saber que interactúan con IA.'
      },
      {
        text: 'Simular emociones humanas para crear vínculo emocional',
        correct: false,
        explanation: '❌ Engañar sobre capacidades emocionales es manipulativo.'
      },
      {
        text: 'Permitir al usuario optar por hablar con humano cuando lo pida',
        correct: true,
        explanation: '✅ El usuario debe tener siempre opción de escalar a persona real.'
      },
      {
        text: 'Ocultar limitaciones del bot para no decepcionar',
        correct: false,
        explanation: '❌ Ser transparente sobre limitaciones genera confianza.'
      }
    ]
  },
  {
    id: 2,
    category: 'privacidad',
    question: '¿Qué prácticas de PRIVACIDAD son correctas según GDPR?',
    scenarios: [
      {
        text: 'Pedir solo datos estrictamente necesarios para la tarea',
        correct: true,
        explanation: '✅ Minimización de datos: recoger solo lo esencial.'
      },
      {
        text: 'Guardar todo el historial de conversaciones indefinidamente',
        correct: false,
        explanation: '❌ Los datos deben conservarse solo el tiempo necesario.'
      },
      {
        text: 'Informar claramente cómo se usarán los datos',
        correct: true,
        explanation: '✅ Transparencia: los usuarios deben consentir con información clara.'
      },
      {
        text: 'Permitir al usuario solicitar eliminación de sus datos',
        correct: true,
        explanation: '✅ Derecho al olvido: los usuarios pueden pedir borrar sus datos.'
      }
    ]
  },
  {
    id: 3,
    category: 'seguridad',
    question: '¿Qué medidas de SEGURIDAD son esenciales?',
    scenarios: [
      {
        text: 'Encriptar datos en tránsito (HTTPS/TLS)',
        correct: true,
        explanation: '✅ Encriptación es básica para proteger comunicaciones.'
      },
      {
        text: 'Guardar contraseñas de usuarios para "facilitar" acceso futuro',
        correct: false,
        explanation: '❌ Nunca almacenar credenciales. Usar sistemas de autenticación seguros.'
      },
      {
        text: 'Implementar rate limiting para evitar ataques',
        correct: true,
        explanation: '✅ Previene scraping, brute force y denial of service.'
      },
      {
        text: 'Logs de auditoría de quién accede a qué datos',
        correct: true,
        explanation: '✅ Trazabilidad es crucial para detectar accesos indebidos.'
      }
    ]
  },
  {
    id: 4,
    category: 'regulacion',
    question: '¿Qué requiere el EU AI Act para chatbots?',
    scenarios: [
      {
        text: 'Informar a usuarios que interactúan con IA',
        correct: true,
        explanation: '✅ Requisito de transparencia para sistemas de IA.'
      },
      {
        text: 'Prohibir manipulación subliminal o engañosa',
        correct: true,
        explanation: '✅ Prohibido explotar vulnerabilidades o manipular.'
      },
      {
        text: 'Auditorías anuales obligatorias para todos los bots',
        correct: false,
        explanation: '❌ Solo para IA de alto riesgo, no chatbots básicos.'
      },
      {
        text: 'Documentación técnica detallada del sistema',
        correct: true,
        explanation: '✅ Necesario para demostrar cumplimiento.'
      }
    ]
  },
  {
    id: 5,
    category: 'etica',
    question: '¿Cómo evitar SESGOS en un asistente virtual?',
    scenarios: [
      {
        text: 'Entrenar con datos diversos de múltiples fuentes',
        correct: true,
        explanation: '✅ Datos diversos reducen sesgos demográficos y culturales.'
      },
      {
        text: 'Usar solo datos de un país para mayor consistencia',
        correct: false,
        explanation: '❌ Esto introduce sesgo cultural y geográfico.'
      },
      {
        text: 'Auditar respuestas por grupo demográfico',
        correct: true,
        explanation: '✅ Monitorizar trato diferencial detecta sesgos.'
      },
      {
        text: 'Ignorar el tema, los bots son objetivos por defecto',
        correct: false,
        explanation: '❌ La IA hereda sesgos de datos de entrenamiento.'
      }
    ]
  },
  {
    id: 6,
    category: 'seguridad',
    question: '¿Cómo proteger contra JAILBREAKS y abusos?',
    scenarios: [
      {
        text: 'Filtrar contenido malicioso o peligroso',
        correct: true,
        explanation: '✅ Content filtering previene respuestas dañinas.'
      },
      {
        text: 'Responder siempre todo sin restricciones',
        correct: false,
        explanation: '❌ Sin filtros, el bot puede ser manipulado para daño.'
      },
      {
        text: 'Detectar intentos de ingeniería social',
        correct: true,
        explanation: '✅ Identificar manipulación previene extracción de información sensible.'
      },
      {
        text: 'Permitir que usuarios reprogramen el bot',
        correct: false,
        explanation: '❌ Los usuarios no deben poder modificar comportamiento del sistema.'
      }
    ]
  }
];

export default function EthicsSecurityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const question = questions[currentQuestion];

  const toggleAnswer = (index: number) => {
    if (showExplanation) return;
    
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter(i => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  const checkAnswers = () => {
    const allCorrect = question.scenarios.every((scenario, index) => {
      const isSelected = selectedAnswers.includes(index);
      return isSelected === scenario.correct;
    });

    if (allCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers([]);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setScore(0);
    setShowExplanation(false);
    setGameFinished(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'etica': return <UserCheck className="h-5 w-5" />;
      case 'seguridad': return <Shield className="h-5 w-5" />;
      case 'privacidad': return <Lock className="h-5 w-5" />;
      case 'regulacion': return <FileCheck className="h-5 w-5" />;
      default: return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'etica': return 'text-green-400 bg-green-900/50 border-green-700';
      case 'seguridad': return 'text-red-400 bg-red-900/50 border-red-700';
      case 'privacidad': return 'text-blue-400 bg-blue-900/50 border-blue-700';
      case 'regulacion': return 'text-purple-400 bg-purple-900/50 border-purple-700';
      default: return 'text-slate-400 bg-slate-900/50 border-slate-700';
    }
  };

  if (gameFinished) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Quiz de Ética y Seguridad Completado!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has respondido {questions.length} preguntas sobre ética, seguridad y privacidad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-green-400 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-slate-300">
              {percentage === 100 ? '🏆 ¡Perfecto! Eres un experto en ética de IA' :
               percentage >= 80 ? '✅ ¡Excelente! Dominas los principios éticos' :
               percentage >= 60 ? '👍 Bien, conoces los conceptos básicos' :
               '📚 Repasa ética, seguridad y privacidad en IA'}
            </p>
          </div>

          <Progress value={percentage} className="h-3 bg-slate-700" />

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-900/30 border-green-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-green-300">Respuestas Correctas</p>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-400">{questions.length - score}</p>
                <p className="text-sm text-red-300">Errores</p>
              </CardContent>
            </Card>
          </div>

          <Button onClick={restartGame} className="w-full bg-green-600 hover:bg-green-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-400" />
            <CardTitle className="text-white">Quiz de Ética y Seguridad</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={getCategoryColor(question.category)}>
              {getCategoryIcon(question.category)}
              <span className="ml-2 capitalize">{question.category}</span>
            </Badge>
            <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
              Puntos: {score}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-300">
          Selecciona TODAS las opciones correctas
        </CardDescription>
        <Progress value={(currentQuestion / questions.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            {question.question}
          </h3>
          <div className="space-y-3">
            {question.scenarios.map((scenario, index) => {
              const isSelected = selectedAnswers.includes(index);
              
              return (
                <Card
                  key={index}
                  onClick={() => toggleAnswer(index)}
                  className={`cursor-pointer transition-all ${
                    showExplanation
                      ? scenario.correct
                        ? 'bg-green-900/50 border-green-500'
                        : isSelected
                        ? 'bg-red-900/50 border-red-500'
                        : 'bg-slate-800/50 border-slate-600'
                      : isSelected
                      ? 'bg-blue-900/50 border-blue-500'
                      : 'bg-slate-800/50 border-slate-600 hover:border-blue-500'
                  }`}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    {showExplanation && scenario.correct && (
                      <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    {showExplanation && !scenario.correct && isSelected && (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    {!showExplanation && (
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-500'
                      }`}>
                        {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-white">{scenario.text}</p>
                      {showExplanation && (
                        <p className="text-sm text-slate-300 mt-2">{scenario.explanation}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <Button onClick={nextQuestion} className="w-full bg-green-600 hover:bg-green-700">
            {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
          </Button>
        )}

        {!showExplanation && (
          <Button 
            onClick={checkAnswers} 
            disabled={selectedAnswers.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Verificar Respuestas
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
