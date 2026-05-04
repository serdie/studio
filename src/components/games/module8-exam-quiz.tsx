'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, RefreshCw, Trophy, Zap, Layers } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  category: 'marketing' | 'rrhh' | 'finanzas' | 'operaciones' | 'logistica';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const questions: Question[] = [
  {
    id: 'q1',
    question: '¿Qué porcentaje de ventas de Amazon proviene de recomendaciones personalizadas con IA?',
    options: [
      { id: 'a', text: '10%', isCorrect: false, explanation: 'Es mucho más que el 10%' },
      { id: 'b', text: '35%', isCorrect: true, explanation: 'Correcto. Amazon genera aproximadamente el 35% de sus ventas a través de su sistema de recomendación personalizada' },
      { id: 'c', text: '50%', isCorrect: false, explanation: 'Aunque significativo, no llega al 50%' },
      { id: 'd', text: '5%', isCorrect: false, explanation: 'Es mucho mayor que el 5%' }
    ],
    category: 'marketing',
    difficulty: 'basic'
  },
  {
    id: 'q2',
    question: '¿Qué herramienta de IA se usa para People Analytics y predicción de rotación?',
    options: [
      { id: 'a', text: 'Salesforce Einstein', isCorrect: false, explanation: 'Salesforce Einstein es principalmente para ventas y marketing' },
      { id: 'b', text: 'Workday Adaptive Planning', isCorrect: true, explanation: 'Correcto. Workday ofrece herramientas avanzadas de People Analytics, predicción de rotación y planificación de fuerza laboral' },
      { id: 'c', text: 'Google Ads', isCorrect: false, explanation: 'Google Ads es para publicidad, no para RRHH' },
      { id: 'd', text: 'SAP HANA', isCorrect: false, explanation: 'SAP HANA es una base de datos in-memory, no específica de People Analytics' }
    ],
    category: 'rrhh',
    difficulty: 'intermediate'
  },
  {
    id: 'q3',
    question: '¿Cuál es la principal aplicación de IA en detección de fraude financiero?',
    options: [
      { id: 'a', text: 'Análisis de sentimientos en redes sociales', isCorrect: false, explanation: 'Eso es más de marketing que de detección de fraude' },
      { id: 'b', text: 'Detección de patrones anómalos en transacciones en tiempo real', isCorrect: true, explanation: 'Correcto. La IA analiza millones de transacciones en tiempo real identificando patrones sospechosos' },
      { id: 'c', text: 'Automatización de nóminas', isCorrect: false, explanation: 'La automatización de nóminas no detecta fraude' },
      { id: 'd', text: 'Chatbots bancarios', isCorrect: false, explanation: 'Los chatbots son para atención al cliente, no detección de fraude' }
    ],
    category: 'finanzas',
    difficulty: 'basic'
  },
  {
    id: 'q4',
    question: '¿Qué es el mantenimiento predictivo con IA?',
    options: [
      { id: 'a', text: 'Reparar máquinas cuando se rompen', isCorrect: false, explanation: 'Eso es mantenimiento correctivo, no predictivo' },
      { id: 'b', text: 'Programar mantenimiento cada 6 meses', isCorrect: false, explanation: 'Eso es mantenimiento preventivo basado en tiempo' },
      { id: 'c', text: 'Usar sensores IoT y ML para predecir cuándo fallará un equipo antes de que ocurra', isCorrect: true, explanation: 'Correcto. El mantenimiento predictivo usa datos de sensores y ML para anticipar fallos y programar intervenciones' },
      { id: 'd', text: 'Comprar equipos nuevos regularmente', isCorrect: false, explanation: 'Renovar equipos no es mantenimiento predictivo' }
    ],
    category: 'operaciones',
    difficulty: 'basic'
  },
  {
    id: 'q5',
    question: '¿Qué tipo de sistema de recomendación usa la frase "usuarios como tú compraron..."?',
    options: [
      { id: 'a', text: 'Basado en contenido', isCorrect: false, explanation: 'El basado en contenido usa "similar a lo que viste"' },
      { id: 'b', text: 'Colaborativo', isCorrect: true, explanation: 'Correcto. El filtrado colaborativo encuentra usuarios con gustos similares y recomienda lo que ellos compraron' },
      { id: 'c', text: 'Híbrido', isCorrect: false, explanation: 'El híbrido combina ambos métodos' },
      { id: 'd', text: 'Basado en reglas', isCorrect: false, explanation: 'Los sistemas basados en reglas usan lógica predefinida, no comportamiento de usuarios similares' }
    ],
    category: 'marketing',
    difficulty: 'intermediate'
  },
  {
    id: 'q6',
    question: '¿Qué herramienta de IA puede cualificar leads automáticamente, aumentando la conversión un 20%?',
    options: [
      { id: 'a', text: 'Chatbots de ventas como Drift o Intercom', isCorrect: true, explanation: 'Correcto. Los chatbots de ventas con IA pueden cualificar leads 24/7, respondiendo en menos de 1 minuto' },
      { id: 'b', text: 'Hojas de cálculo Excel', isCorrect: false, explanation: 'Excel no tiene IA para cualificación automática de leads' },
      { id: 'c', text: 'Email masivo', isCorrect: false, explanation: 'El email masivo no cualifica leads individualmente' },
      { id: 'd', text: 'Publicidad en TV', isCorrect: false, explanation: 'La TV no cualifica leads automáticamente' }
    ],
    category: 'marketing',
    difficulty: 'intermediate'
  },
  {
    id: 'q7',
    question: '¿Qué reducción de tiempo en screening de CVs puede lograr la IA en RRHH?',
    options: [
      { id: 'a', text: '10-20%', isCorrect: false, explanation: 'La reducción es mucho mayor' },
      { id: 'b', text: '30-40%', isCorrect: false, explanation: 'Puede ser mayor' },
      { id: 'c', text: '60-75%', isCorrect: true, explanation: 'Correcto. La IA puede reducir el tiempo de screening de CVs entre un 60-75%, permitiendo procesar miles de candidaturas rápidamente' },
      { id: 'd', text: '100%', isCorrect: false, explanation: 'La supervisión humana sigue siendo necesaria' }
    ],
    category: 'rrhh',
    difficulty: 'intermediate'
  },
  {
    id: 'q8',
    question: '¿Qué tecnología combina IA con automatización de procesos financieros repetitivos?',
    options: [
      { id: 'a', text: 'Blockchain', isCorrect: false, explanation: 'Blockchain es para registro distribuido, no automatización de procesos' },
      { id: 'b', text: 'RPA (Robotic Process Automation)', isCorrect: true, explanation: 'Correcto. RPA automatiza tareas repetitivas como conciliaciones, facturación y reporting financiero' },
      { id: 'c', text: 'Big Data', isCorrect: false, explanation: 'Big Data es almacenamiento y análisis, no automatización' },
      { id: 'd', text: 'IoT', isCorrect: false, explanation: 'IoT es para sensores y dispositivos, no procesos financieros' }
    ],
    category: 'finanzas',
    difficulty: 'basic'
  },
  {
    id: 'q9',
    question: '¿Qué empresa usa IA para predicción de demanda y envíos anticipados?',
    options: [
      { id: 'a', text: 'Netflix', isCorrect: false, explanation: 'Netflix usa IA para recomendaciones de contenido, no logística' },
      { id: 'b', text: 'Amazon', isCorrect: true, explanation: 'Correcto. Amazon usa IA para anticipar demanda y pre-posicionar productos en almacenes cercanos antes de que el cliente compre' },
      { id: 'c', text: 'Spotify', isCorrect: false, explanation: 'Spotify es de streaming musical' },
      { id: 'd', text: 'Instagram', isCorrect: false, explanation: 'Instagram es una red social' }
    ],
    category: 'logistica',
    difficulty: 'basic'
  },
  {
    id: 'q10',
    question: '¿Qué es el "digital twin" en operaciones industriales?',
    options: [
      { id: 'a', text: 'Un empleado que trabaja en remoto', isCorrect: false, explanation: 'No tiene relación con trabajo remoto' },
      { id: 'b', text: 'Una copia de seguridad de datos', isCorrect: false, explanation: 'No es un backup' },
      { id: 'c', text: 'Una réplica virtual de un activo físico que simula su comportamiento en tiempo real', isCorrect: true, explanation: 'Correcto. Los gemelos digitales permiten simular, monitorizar y optimizar activos físicos usando datos en tiempo real' },
      { id: 'd', text: 'Un robot que sustituye a un trabajador', isCorrect: false, explanation: 'No es un robot físico' }
    ],
    category: 'operaciones',
    difficulty: 'intermediate'
  },
  {
    id: 'q11',
    question: '¿Qué beneficio principal ofrece el análisis predictivo de ventas?',
    options: [
      { id: 'a', text: 'Eliminar al equipo comercial', isCorrect: false, explanation: 'La IA complementa al equipo, no lo elimina' },
      { id: 'b', text: 'Forecast de demanda más preciso y detección temprana de oportunidades', isCorrect: true, explanation: 'Correcto. Permite prever ventas con mayor precisión, identificar leads prometedores y detectar riesgo de churn' },
      { id: 'c', text: 'Reducir el precio de los productos', isCorrect: false, explanation: 'El análisis predictivo no está diseñado para reducir precios' },
      { id: 'd', text: 'Aumentar la publicidad', isCorrect: false, explanation: 'No se trata de aumentar publicidad sino de optimizar predicciones' }
    ],
    category: 'marketing',
    difficulty: 'intermediate'
  },
  {
    id: 'q12',
    question: '¿Qué herramienta de IA analiza llamadas de ventas para mejorar conversiones?',
    options: [
      { id: 'a', text: 'Google Analytics', isCorrect: false, explanation: 'Google Analytics mide tráfico web, no llamadas' },
      { id: 'b', text: 'Gong', isCorrect: true, explanation: 'Correcto. Gong usa IA para analizar llamadas de ventas, identificar patrones de éxito y coaching automatizado' },
      { id: 'c', text: 'Canva', isCorrect: false, explanation: 'Canva es para diseño gráfico' },
      { id: 'd', text: 'Trello', isCorrect: false, explanation: 'Trello es para gestión de proyectos' }
    ],
    category: 'marketing',
    difficulty: 'advanced'
  },
  {
    id: 'q13',
    question: '¿Qué IA se usa para optimizar rutas de reparto en logística?',
    options: [
      { id: 'a', text: 'Algoritmos de optimización combinatoria y ML', isCorrect: true, explanation: 'Correcto. Se usan algoritmos de optimización (vehicle routing problem) combinados con ML para considerar tráfico, clima y patrones históricos' },
      { id: 'b', text: 'GPT-4', isCorrect: false, explanation: 'GPT-4 es un LLM de lenguaje, no optimiza rutas de reparto' },
      { id: 'c', text: 'Reconocimiento facial', isCorrect: false, explanation: 'El reconocimiento facial no optimiza rutas' },
      { id: 'd', text: 'Blockchain', isCorrect: false, explanation: 'Blockchain es para trazabilidad, no optimización de rutas' }
    ],
    category: 'logistica',
    difficulty: 'advanced'
  },
  {
    id: 'q14',
    question: '¿Qué es NLP aplicado a RRHH?',
    options: [
      { id: 'a', text: 'Análisis de sentimiento en encuestas de empleados y procesamiento de CVs', isCorrect: true, explanation: 'Correcto. NLP en RRHH se usa para analizar feedback, procesar CVs y detectar patrones en comunicación interna' },
      { id: 'b', text: 'Nóminas Liquidación y Pagos', isCorrect: false, explanation: 'NLP significa Natural Language Processing' },
      { id: 'c', text: 'Un tipo de contrato laboral', isCorrect: false, explanation: 'NLP es procesamiento de lenguaje natural' },
      { id: 'd', text: 'New Labor Protocol', isCorrect: false, explanation: 'NLP es Natural Language Processing' }
    ],
    category: 'rrhh',
    difficulty: 'intermediate'
  },
  {
    id: 'q15',
    question: '¿Qué reducción de costes logísticos puede aportar la IA en optimización de rutas?',
    options: [
      { id: 'a', text: '1-5%', isCorrect: false, explanation: 'La reducción puede ser mayor' },
      { id: 'b', text: '10-30%', isCorrect: true, explanation: 'Correcto. La optimización de rutas con IA puede reducir costes de transporte entre un 10-30% según el caso' },
      { id: 'c', text: '50-70%', isCorrect: false, explanation: 'Aunque significativa, normalmente no llega a esos niveles' },
      { id: 'd', text: '0% - la IA no mejora la logística', isCorrect: false, explanation: 'La IA tiene un impacto demostrado en logística' }
    ],
    category: 'logistica',
    difficulty: 'advanced'
  },
  {
    id: 'q16',
    question: '¿Qué es el "churn prediction" en marketing?',
    options: [
      { id: 'a', text: 'Predecir qué clientes van a abandonar la empresa', isCorrect: true, explanation: 'Correcto. Churn prediction usa ML para identificar clientes con alta probabilidad de darse de baja, permitiendo acciones de retención proactivas' },
      { id: 'b', text: 'Predecir tendencias de moda', isCorrect: false, explanation: 'No se refiere a tendencias de moda' },
      { id: 'c', text: 'Calcular el ROI de campañas', isCorrect: false, explanation: 'El ROI se calcula con otras métricas' },
      { id: 'd', text: 'Crear contenido viral', isCorrect: false, explanation: 'No tiene relación con contenido viral' }
    ],
    category: 'marketing',
    difficulty: 'basic'
  },
  {
    id: 'q17',
    question: '¿Qué empresa es ejemplo de IA en predicción de tendencias y optimización de inventario en retail?',
    options: [
      { id: 'a', text: 'Tesla', isCorrect: false, explanation: 'Tesla es automoción, no retail' },
      { id: 'b', text: 'Zara (Inditex)', isCorrect: true, explanation: 'Correcto. Inditex usa IA para predecir tendencias de moda y optimizar inventario en tiempo real en sus miles de tiendas' },
      { id: 'c', text: 'SpaceX', isCorrect: false, explanation: 'SpaceX es aeroespacial' },
      { id: 'd', text: 'Duolingo', isCorrect: false, explanation: 'Duolingo es educación' }
    ],
    category: 'logistica',
    difficulty: 'basic'
  },
  {
    id: 'q18',
    question: '¿Qué es la "Industria 4.0"?',
    options: [
      { id: 'a', text: 'La cuarta revolución industrial: integración de IA, IoT, Big Data y automatización en manufactura', isCorrect: true, explanation: 'Correcto. La Industria 4.0 combina tecnologías digitales para crear fábricas inteligentes con producción autónoma y flexible' },
      { id: 'b', text: 'La versión 4.0 de un software industrial', isCorrect: false, explanation: 'No es una versión de software' },
      { id: 'c', text: 'Una empresa de manufactura', isCorrect: false, explanation: 'No es una empresa específica' },
      { id: 'd', text: 'Un tipo de robot industrial', isCorrect: false, explanation: 'No es un tipo específico de robot' }
    ],
    category: 'operaciones',
    difficulty: 'basic'
  },
  {
    id: 'q19',
    question: '¿Qué herramienta de IA se usa para análisis de riesgo crediticio en tiempo real?',
    options: [
      { id: 'a', text: 'Excel con macros', isCorrect: false, explanation: 'Excel no procesa en tiempo real volúmenes masivos' },
      { id: 'b', text: 'Modelos de ML de scoring crediticio con gradient boosting', isCorrect: true, explanation: 'Correcto. Modelos como XGBoost y LightGBM se usan ampliamente en scoring crediticio por su precisión y velocidad' },
      { id: 'c', text: 'WordPress', isCorrect: false, explanation: 'WordPress es un CMS, no análisis de riesgo' },
      { id: 'd', text: 'Photoshop', isCorrect: false, explanation: 'Photoshop es edición de imagen' }
    ],
    category: 'finanzas',
    difficulty: 'advanced'
  },
  {
    id: 'q20',
    question: '¿Cuál es el principal beneficio del mantenimiento predictivo frente al preventivo?',
    options: [
      { id: 'a', text: 'Es más barato de implementar', isCorrect: false, explanation: 'La implementación puede ser más costosa pero el ahorro a largo plazo es mayor' },
      { id: 'b', text: 'Interviene solo cuando es necesario, evitando paradas innecesarias y reduciendo costes un 25-30%', isCorrect: true, explanation: 'Correcto. A diferencia del preventivo (que interviene por calendario), el predictivo actúa basándose en el estado real del equipo' },
      { id: 'c', text: 'No requiere sensores ni datos', isCorrect: false, explanation: 'El mantenimiento predictivo requiere sensores IoT y datos' },
      { id: 'd', text: 'Funciona sin conexión a internet', isCorrect: false, explanation: 'Generalmente requiere conectividad para procesar datos' }
    ],
    category: 'operaciones',
    difficulty: 'intermediate'
  }
];

export default function Module8ExamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [mode, setMode] = useState<'practice' | 'exam' | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startQuiz = (selectedMode: 'practice' | 'exam') => {
    setMode(selectedMode);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(selectedMode === 'exam' ? shuffled.slice(0, 10) : shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const handleAnswer = (optionId: string) => {
    if (answered) return;
    setSelectedAnswer(optionId);
    setAnswered(true);
    if (shuffledQuestions[currentQuestion].options.find(o => o.id === optionId)?.isCorrect) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => { setMode(null); setCurrentQuestion(0); setScore(0); setShowResult(false); setSelectedAnswer(null); setAnswered(false); };

  if (!mode) {
    return (
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-indigo-900">Test de IA en Áreas Funcionales</CardTitle>
              <p className="text-sm text-indigo-700">20 preguntas sobre Marketing, RRHH, Finanzas, Logística y Operaciones</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={() => startQuiz('practice')} className="h-20 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
              <div className="text-center">
                <Brain className="h-6 w-6 mx-auto mb-1" />
                <div className="font-bold">Modo Práctica</div>
                <div className="text-xs opacity-80">20 preguntas con explicaciones</div>
              </div>
            </Button>
            <Button onClick={() => startQuiz('exam')} className="h-20 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <div className="text-center">
                <Trophy className="h-6 w-6 mx-auto mb-1" />
                <div className="font-bold">Modo Examen</div>
                <div className="text-xs opacity-80">10 preguntas aleatorias</div>
              </div>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">Marketing</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">RRHH</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Finanzas</Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Operaciones</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Logística</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-indigo-900">
            {pct >= 90 ? '¡Experto en IA empresarial!' : pct >= 70 ? '¡Buen conocimiento!' : pct >= 50 ? 'Vas por buen camino' : 'Necesitas repasar más'}
          </h3>
          <p className="text-4xl font-bold text-indigo-600">{score}/{shuffledQuestions.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <div className="flex gap-3 justify-center">
            <Button onClick={resetQuiz} variant="outline" className="border-indigo-300"><RefreshCw className="h-4 w-4 mr-2" /> Volver</Button>
            <Button onClick={() => startQuiz(mode)} className="bg-indigo-500 hover:bg-indigo-600"><Zap className="h-4 w-4 mr-2" /> Repetir</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const q = shuffledQuestions[currentQuestion];

  return (
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${q.category === 'marketing' ? 'bg-pink-50 text-pink-700 border-pink-200' : q.category === 'rrhh' ? 'bg-green-50 text-green-700 border-green-200' : q.category === 'finanzas' ? 'bg-blue-50 text-blue-700 border-blue-200' : q.category === 'logistica' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
            {q.category === 'rrhh' ? 'RRHH' : q.category.charAt(0).toUpperCase() + q.category.slice(1)}
          </Badge>
          <span className="text-sm text-indigo-600 font-medium">Pregunta {currentQuestion + 1}/{shuffledQuestions.length}</span>
        </div>
        <Progress value={((currentQuestion + 1) / shuffledQuestions.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold text-indigo-900">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map(opt => (
            <button key={opt.id} onClick={() => handleAnswer(opt.id)} disabled={answered}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${!answered ? 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer' : opt.isCorrect ? 'border-green-500 bg-green-50' : selectedAnswer === opt.id ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-60'}`}>
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-600">{opt.id.toUpperCase()})</span>
                <span className="text-sm">{opt.text}</span>
              </div>
              {answered && (selectedAnswer === opt.id || opt.isCorrect) && (
                <p className="text-xs mt-1 ml-6 text-slate-600 italic">{opt.explanation}</p>
              )}
            </button>
          ))}
        </div>
        {answered && (
          <div className="flex justify-end">
            <Button onClick={nextQuestion} className="bg-indigo-500 hover:bg-indigo-600">
              {currentQuestion + 1 < shuffledQuestions.length ? 'Siguiente' : 'Ver resultados'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
