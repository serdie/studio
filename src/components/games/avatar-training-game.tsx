'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, CheckCircle2, XCircle, HelpCircle, RotateCcw, Play, Award } from 'lucide-react';

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
    question: '¿Cuál es la duración recomendada para un guion de vídeo corporativo con avatar?',
    options: [
      '30-45 segundos (muy corto)',
      '60-90 segundos (óptimo)',
      '180-240 segundos (largo)',
      'No hay límite de duración'
    ],
    correct: 1,
    explanation: 'Los vídeos de 60-90 segundos mantienen la atención del espectador y son ideales para formación corporativa. Equivalen a aproximadamente 100-180 palabras.'
  },
  {
    id: 2,
    question: '¿Qué herramienta es MEJOR para crear vídeos con avatares profesionales?',
    options: [
      'Midjourney',
      'HeyGen o Synthesia',
      'ChatGPT',
      'Canva'
    ],
    correct: 1,
    explanation: 'HeyGen y Synthesia son plataformas especializadas en avatares de vídeo con IA, ofreciendo +100 avatares, sincronización labial perfecta y múltiples idiomas.'
  },
  {
    id: 3,
    question: '¿En qué situación NO es apropiado usar un avatar virtual?',
    options: [
      'Vídeo de onboarding para nuevos empleados',
      'Comunicación de un despido o noticia sensible',
      'Presentación de un producto nuevo',
      'Vídeo formativo sobre seguridad industrial'
    ],
    correct: 1,
    explanation: 'Las noticias sensibles requieren empatía humana genuina. Un avatar parecería insensible y podría dañar la reputación de la empresa.'
  },
  {
    id: 4,
    question: '¿Cuál es el primer paso en el pipeline de producción de un vídeo con avatar?',
    options: [
      'Seleccionar el avatar',
      'Grabar la voz',
      'Briefing y definición del objetivo',
      'Editar el vídeo final'
    ],
    correct: 2,
    explanation: 'El briefing es fundamental: define objetivo, audiencia, mensaje clave y tono. Sin un buen briefing, el resto del proceso carece de dirección.'
  },
  {
    id: 5,
    question: '¿Qué significa "localización" en el contexto de vídeos con avatar?',
    options: [
      'Saber dónde se grabó el vídeo',
      'Adaptar el contenido al contexto cultural y lingüístico de cada mercado',
      'Traducir palabra por palabra el guion',
      'Cambiar el avatar según el país'
    ],
    correct: 1,
    explanation: 'La localización va más allá de la traducción: adapta referencias culturales, ejemplos, tono y formato para que el mensaje resuene en cada mercado.'
  },
  {
    id: 6,
    question: '¿Qué diferencia hay entre traducción y localización?',
    options: [
      'Son lo mismo',
      'La traducción es más cara',
      'La localización adapta culturalmente, la traducción solo convierte texto',
      'La traducción es para documentos, la localización para vídeos'
    ],
    correct: 2,
    explanation: 'Traducir es convertir texto de un idioma a otro. Localizar es adaptar el mensaje completo: cultura, ejemplos, tono, referencias locales.'
  },
  {
    id: 7,
    question: '¿Qué herramienta es líder en Texto-a-Voz (TTS) con voces neuronales?',
    options: [
      'Google Translate',
      'ElevenLabs',
      'Photoshop',
      'Zoom'
    ],
    correct: 1,
    explanation: 'ElevenLabs ofrece las voces neuronales más naturales del mercado, con control emocional, clonación de voz y 40+ idiomas.'
  },
  {
    id: 8,
    question: '¿Cuál es la velocidad de locución recomendada en español para vídeos con avatar?',
    options: [
      '100-120 palabras por minuto',
      '150-160 palabras por minuto',
      '200-220 palabras por minuto',
      'No importa la velocidad'
    ],
    correct: 1,
    explanation: '150-160 palabras por minuto es el ritmo natural en español. Más rápido parece robótico, más lento resulta aburrido.'
  },
  {
    id: 9,
    question: '¿Qué es el "lip-sync" en vídeos con avatar?',
    options: [
      'El tipo de micrófono usado',
      'La sincronización entre el movimiento de los labios y el audio',
      'El estilo de maquillaje del avatar',
      'La música de fondo del vídeo'
    ],
    correct: 1,
    explanation: 'El lip-sync (sincronización labial) es crucial para que el avatar parezca natural. Un desfase de más de 0.2 segundos se nota y distrae.'
  },
  {
    id: 10,
    question: '¿Qué elemento NO es esencial en un checklist de QA para vídeos con avatar?',
    options: [
      'Volumen y claridad del audio',
      'Sincronización labial',
      'La marca de ropa del avatar',
      'Ortografía de subtítulos'
    ],
    correct: 2,
    explanation: 'La ropa del avatar se define en el briefing. El QA se centra en: audio, lip-sync, visuales, subtítulos y coherencia del mensaje.'
  },
  {
    id: 11,
    question: '¿Cuál es la longitud máxima recomendada para una línea de subtítulos?',
    options: [
      '20 caracteres',
      '42 caracteres',
      '80 caracteres',
      'No hay límite'
    ],
    correct: 1,
    explanation: '42 caracteres por línea es el estándar de la industria. Permite lectura cómoda en 1-2 segundos sin saturar la pantalla.'
  },
  {
    id: 12,
    question: '¿Qué herramienta usarías para doblar un vídeo manteniendo la voz original?',
    options: [
      'DeepL',
      'Rask AI',
      'Excel',
      'PowerPoint'
    ],
    correct: 1,
    explanation: 'Rask AI especializa en doblaje manteniendo la voz original mediante clonación vocal, soportando 130+ idiomas.'
  },
  {
    id: 13,
    question: '¿Qué parámetro de ElevenLabs controla la consistencia de la voz?',
    options: [
      'Pitch',
      'Stability (Estabilidad)',
      'Volume',
      'Speed'
    ],
    correct: 1,
    explanation: 'Stability (50-70% recomendado) controla la consistencia. Valores bajos = más expresivo pero variable. Valores altos = más consistente pero monótono.'
  },
  {
    id: 14,
    question: '¿Qué formato de subtítulos es el más común para vídeos web?',
    options: [
      '.txt',
      '.srt o .vtt',
      '.pdf',
      '.docx'
    ],
    correct: 1,
    explanation: 'SRT y WebVTT son los formatos estándar para subtítulos web, compatibles con YouTube, Vimeo y la mayoría de reproductores.'
  },
  {
    id: 15,
    question: '¿Qué consideración ética es CRUCIAL al usar avatares virtuales?',
    options: [
      'El avatar debe ser siempre masculino',
      'Indicar que es un avatar, no una persona real',
      'El avatar debe hablar inglés',
      'El avatar debe vestir formal'
    ],
    correct: 1,
    explanation: 'La transparencia es esencial. Los espectadores deben saber que interactúan con un avatar para evitar engaños y mantener la confianza.'
  },
  {
    id: 16,
    question: '¿Qué herramienta es MEJOR para animar una foto estática con sincronización labial?',
    options: [
      'Canva',
      'D-ID',
      'Photoshop',
      'Word'
    ],
    correct: 1,
    explanation: 'D-ID especializa en animar fotos estáticas con sincronización labial perfecta, ideal para avatares personalizados desde una foto.'
  },
  {
    id: 17,
    question: '¿Cuál es el orden CORRECTO del pipeline de producción?',
    options: [
      'Avatar → Guion → Voz → Edición → QA',
      'Briefing → Guion → Voz → Avatar → Edición → QA → Publicación',
      'Edición → Guion → Avatar → Voz → QA',
      'Guion → Avatar → QA → Voz → Publicación'
    ],
    correct: 1,
    explanation: 'El flujo completo es: Briefing → Guion → Voz/TTS → Avatar → Edición → QA → Publicación. Saltarse pasos genera problemas de calidad.'
  },
  {
    id: 18,
    question: '¿Qué es un "glosario de localización"?',
    options: [
      'Una lista de palabras prohibidas',
      'Una lista de términos clave con su traducción/adaptación acordada',
      'Un diccionario de sinónimos',
      'Una lista de errores comunes'
    ],
    correct: 1,
    explanation: 'El glosario define cómo traducir términos clave (marcas, productos, conceptos técnicos) para mantener consistencia en todos los vídeos localizados.'
  },
  {
    id: 19,
    question: '¿Qué margen de variación de duración es aceptable al localizar un guion?',
    options: [
      '±1%',
      '±10%',
      '±50%',
      'No importa la variación'
    ],
    correct: 1,
    explanation: '±10% es el estándar aceptable. Una variación mayor puede indicar que la traducción es demasiado larga/corta y afectará la sincronización.'
  },
  {
    id: 20,
    question: '¿Qué elemento es ESENCIAL en un brief para producción con avatar?',
    options: [
      'El color favorito del CEO',
      'Objetivo, audiencia, mensaje clave y tono',
      'La música de moda',
      'El nombre del equipo de producción'
    ],
    correct: 1,
    explanation: 'El brief debe definir: objetivo (¿qué queremos lograr?), audiencia (¿para quién?), mensaje clave (¿qué decimos?) y tono (¿cómo lo decimos?).'
  },
  {
    id: 21,
    question: '¿Qué plataforma está enfocada en formación corporativa con avatares?',
    options: [
      'TikTok',
      'Colossyan',
      'Instagram',
      'Snapchat'
    ],
    correct: 1,
    explanation: 'Colossyan está específicamente diseñado para e-learning y formación corporativa, con avatares conversacionales y funcionalidades pedagógicas.'
  },
  {
    id: 22,
    question: '¿Qué es el "SSML" en el contexto de TTS?',
    options: [
      'Un tipo de avatar 3D',
      'Un lenguaje de marcado para controlar la síntesis de voz',
      'Un formato de vídeo',
      'Una herramienta de edición'
    ],
    correct: 1,
    explanation: 'SSML (Speech Synthesis Markup Language) permite controlar pausas, énfasis, velocidad y tono en la generación de voz sintética.'
  },
  {
    id: 23,
    question: '¿Qué consideración es importante para subtítulos accesibles?',
    options: [
      'Usar tipografía cursiva',
      'Contraste suficiente y tamaño legible (mínimo 16px)',
      'Colores neón',
      'Animaciones en el texto'
    ],
    correct: 1,
    explanation: 'La accesibilidad requiere: contraste alto (WCAG AA), tamaño mínimo 16px, fuente sans-serif, y tiempo suficiente de lectura.'
  },
  {
    id: 24,
    question: '¿Qué herramienta usarías para crear avatares 3D para metaverso/VR?',
    options: [
      'Excel',
      'Ready Player Me',
      'Word',
      'Calculator'
    ],
    correct: 1,
    explanation: 'Ready Player Me permite crear avatares 3D personalizables compatibles con múltiples plataformas de metaverso y VR.'
  },
  {
    id: 25,
    question: '¿Qué es un "deepfake" y por qué es relevante en el contexto de avatares?',
    options: [
      'Un tipo de avatar 3D',
      'Un vídeo falso creado con IA que suplanta la identidad de alguien',
      'Una herramienta de edición',
      'Un efecto especial para cine'
    ],
    correct: 1,
    explanation: 'Los deepfakes son vídeos manipulados con IA que pueden suplantar identidades. Es crucial usar avatares éticamente, con consentimiento y transparencia.'
  }
];

export default function AvatarTrainingGame() {
  const [gameMode, setGameMode] = useState<'menu' | 'practice' | 'exam'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examCompleted, setExamCompleted] = useState(false);

  // Shuffle questions for exam mode
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startPractice = () => {
    setGameMode('practice');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
    setAnswers({});
    setExamCompleted(false);
  };

  const startExam = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffledQuestions(shuffled);
    setGameMode('exam');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
    setAnswers({});
    setExamCompleted(false);
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const currentQ = gameMode === 'exam' ? shuffledQuestions[currentQuestion] : questions[currentQuestion];
    
    if (optionIndex === currentQ.correct) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }

    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const nextQuestion = () => {
    const maxQuestions = gameMode === 'exam' ? shuffledQuestions.length : questions.length;
    
    if (currentQuestion < maxQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setExamCompleted(true);
    }
  };

  const restartGame = () => {
    setGameMode('menu');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore({ correct: 0, incorrect: 0 });
    setAnswers({});
    setExamCompleted(false);
  };

  const currentQ = gameMode === 'exam' 
    ? shuffledQuestions[currentQuestion] 
    : questions[currentQuestion];

  const progress = gameMode === 'exam'
    ? ((currentQuestion + (showExplanation ? 1 : 0)) / shuffledQuestions.length) * 100
    : ((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100;

  // Menu Screen
  if (gameMode === 'menu') {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">🎯 Entrenamiento Módulo 3: Avatares</h3>
          <p className="text-purple-700 mt-2">
            Prepárate para el examen con 25 preguntas sobre avatares, localización, TTS y QA
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={startPractice}
              className="h-24 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-6 w-6" />
              <span className="text-base">Modo Práctica</span>
              <span className="text-xs opacity-80">25 preguntas con explicaciones</span>
            </Button>
            <Button
              onClick={startExam}
              className="h-24 flex flex-col gap-2 bg-amber-600 hover:bg-amber-700"
            >
              <Award className="h-6 w-6" />
              <span className="text-base">Modo Examen</span>
              <span className="text-xs opacity-80">20 preguntas aleatorias sin pistas</span>
            </Button>
          </div>

          <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3">📚 Temas del test:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-purple-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Avatares y casos de uso
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Pipeline de producción
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Localización
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                TTS y voces
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                QA y subtítulos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Ética y deepfakes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Exam Completed Screen
  if (examCompleted) {
    const percentage = (score.correct / (gameMode === 'exam' ? 20 : 25)) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">
            {passed ? '🎉 ¡Felicidades!' : '📚 Sigue Practicando'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {passed ? '🏆' : '📖'}
            </div>
            <div className="text-xl font-semibold text-purple-900">
              Tu puntuación: {score.correct} / {gameMode === 'exam' ? 20 : 25}
            </div>
            <div className="text-lg text-purple-700">
              {percentage.toFixed(0)}% de aciertos
            </div>
            <p className="text-purple-800">
              {passed
                ? '¡Excelente! Estás preparado para el examen del Módulo 3.'
                : 'Repasa los conceptos y vuelve a intentarlo. ¡Tú puedes!'}
            </p>
          </div>

          {gameMode === 'exam' && (
            <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3">📊 Resumen:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Correctas:</span>
                  <span className="text-green-600 font-bold">{score.correct}</span>
                </div>
                <div className="flex justify-between">
                  <span>Incorrectas:</span>
                  <span className="text-red-600 font-bold">{score.incorrect}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Nota final:</span>
                  <span className={passed ? 'text-green-600' : 'text-amber-600'}>
                    {percentage.toFixed(1)}/100
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={restartGame} className="bg-purple-600 hover:bg-purple-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Volver al Menú
            </Button>
            {gameMode === 'practice' && (
              <Button onClick={startPractice} variant="outline" className="border-purple-300">
                <RotateCcw className="h-4 w-4 mr-2" />
                Repetir Práctica
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Question Screen
  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge className={gameMode === 'exam' ? 'bg-amber-500' : 'bg-blue-500'}>
              {gameMode === 'exam' ? '🏆 Modo Examen' : '📚 Modo Práctica'}
            </Badge>
            <span className="text-sm text-purple-700">
              Pregunta {currentQuestion + 1} de {gameMode === 'exam' ? shuffledQuestions.length : questions.length}
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
        <div className="w-full bg-purple-200 rounded-full h-3">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-purple-900">{currentQ.question}</h4>
          
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correct;
              const showResult = showExplanation;

              return (
                <Button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(idx)}
                  disabled={showResult}
                  variant="outline"
                  className={`w-full h-auto py-4 text-left justify-start transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : isSelected
                        ? 'bg-red-100 border-red-500 text-red-900'
                        : 'bg-white border-purple-200'
                      : 'bg-white border-purple-200 hover:bg-purple-50 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      showResult
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-purple-200 text-purple-700'
                        : 'bg-purple-200 text-purple-700'
                    }`}>
                      {showResult && isCorrect ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : showResult && isSelected ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </div>
                    <span className="text-base">{option}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`p-4 rounded-lg border-2 ${
              selectedAnswer === currentQ.correct
                ? 'bg-green-100 border-green-300'
                : 'bg-amber-50 border-amber-300'
            }`}>
              <div className="flex items-start gap-3">
                <HelpCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-purple-900 mb-2">💡 Explicación:</p>
                  <p className="text-purple-800">{currentQ.explanation}</p>
                </div>
              </div>
            </div>

            <Button onClick={nextQuestion} className="w-full bg-purple-600 hover:bg-purple-700">
              {currentQuestion < (gameMode === 'exam' ? shuffledQuestions.length : questions.length) - 1
                ? 'Siguiente Pregunta →'
                : 'Ver Resultados Finales'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
