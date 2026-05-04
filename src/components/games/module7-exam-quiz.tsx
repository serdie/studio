'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, CheckCircle2, RefreshCw, Trophy, Zap, ShieldCheck } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: 'etica' | 'gdpr' | 'ai-act' | 'gobernanza' | 'xai';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const questions: Question[] = [
  {
    id: 'q1',
    question: '¿Qué es el sesgo algorítmico?',
    options: [
      { id: 'a', text: 'Un error de programación en el código', isCorrect: false, explanation: 'No es un simple bug, es un problema sistemático de los datos o diseño' },
      { id: 'b', text: 'Resultados sistemáticamente prejudiciales para ciertos grupos', isCorrect: true, explanation: 'Correcto. El sesgo algorítmico produce resultados desproporcionados que afectan a grupos específicos' },
      { id: 'c', text: 'La preferencia del programador por un lenguaje', isCorrect: false, explanation: 'No tiene relación con preferencias de lenguajes de programación' },
      { id: 'd', text: 'Un tipo de red neuronal', isCorrect: false, explanation: 'No es una arquitectura de red neuronal' }
    ],
    category: 'etica',
    difficulty: 'basic'
  },
  {
    id: 'q2',
    question: '¿Qué significa GDPR/RGPD?',
    options: [
      { id: 'a', text: 'General Data Protection Regulation / Reglamento General de Protección de Datos', isCorrect: true, explanation: 'Correcto. Es el reglamento europeo de protección de datos personales, vigente desde 2018' },
      { id: 'b', text: 'Global Digital Privacy Rules', isCorrect: false, explanation: 'Este acrónimo no existe' },
      { id: 'c', text: 'General Design Protocol for Robots', isCorrect: false, explanation: 'No tiene relación con diseño de robots' },
      { id: 'd', text: 'Governance Data Processing Requirements', isCorrect: false, explanation: 'Aunque suena similar, no es el significado correcto' }
    ],
    category: 'gdpr',
    difficulty: 'basic'
  },
  {
    id: 'q3',
    question: '¿Cuál de estos es un ejemplo real de sesgo algorítmico?',
    options: [
      { id: 'a', text: 'Netflix recomendando películas populares', isCorrect: false, explanation: 'Eso es simplemente un sistema de recomendación, no sesgo' },
      { id: 'b', text: 'Google Translate usando "he" para médico y "she" para enfermera', isCorrect: true, explanation: 'Correcto. Los modelos de lenguaje reflejan sesgos de género presentes en los datos de entrenamiento' },
      { id: 'c', text: 'Siri no entendiendo un acento fuerte', isCorrect: false, explanation: 'Es una limitación técnica, no necesariamente un sesgo' },
      { id: 'd', text: 'Un chatbot respondiendo lento', isCorrect: false, explanation: 'Eso es un problema de rendimiento, no de sesgo' }
    ],
    category: 'etica',
    difficulty: 'intermediate'
  },
  {
    id: 'q4',
    question: '¿Qué categorías de riesgo establece el AI Act europeo?',
    options: [
      { id: 'a', text: 'Bajo, medio y alto', isCorrect: false, explanation: 'El AI Act tiene 4 niveles, no 3' },
      { id: 'b', text: 'Inaceptable, alto, limitado y mínimo', isCorrect: true, explanation: 'Correcto. El AI Act clasifica los sistemas en estas 4 categorías según su riesgo potencial' },
      { id: 'c', text: 'Verde, amarillo y rojo', isCorrect: false, explanation: 'No usa un sistema de colores' },
      { id: 'd', text: 'Nivel 1, nivel 2, nivel 3, nivel 4 y nivel 5', isCorrect: false, explanation: 'No usa niveles numéricos del 1 al 5' }
    ],
    category: 'ai-act',
    difficulty: 'basic'
  },
  {
    id: 'q5',
    question: '¿Qué técnica de XAI usa "valores de Shapley" para explicar predicciones?',
    options: [
      { id: 'a', text: 'LIME', isCorrect: false, explanation: 'LIME crea modelos locales simplificados, no usa valores de Shapley' },
      { id: 'b', text: 'Attention Visualization', isCorrect: false, explanation: 'Attention visualization muestra qué partes del input son importantes en transformers' },
      { id: 'c', text: 'SHAP', isCorrect: true, explanation: 'Correcto. SHAP (SHapley Additive exPlanations) usa valores de Shapley de teoría de juegos para explicar predicciones' },
      { id: 'd', text: 'Contrafactuales', isCorrect: false, explanation: 'Los contrafactuales preguntan "¿qué cambiaría la decisión?"' }
    ],
    category: 'xai',
    difficulty: 'advanced'
  },
  {
    id: 'q6',
    question: '¿Cuál es el principio de "Privacy by Design"?',
    options: [
      { id: 'a', text: 'Añadir privacidad después de desarrollar el producto', isCorrect: false, explanation: 'Privacy by Design es lo opuesto: la privacidad se integra desde el principio' },
      { id: 'b', text: 'Integrar la protección de datos desde la fase de diseño del sistema', isCorrect: true, explanation: 'Correcto. Significa considerar la privacidad desde el inicio del desarrollo, no como un añadido posterior' },
      { id: 'c', text: 'Usar diseño gráfico para políticas de privacidad', isCorrect: false, explanation: 'No tiene relación con diseño gráfico' },
      { id: 'd', text: 'Contratar un DPO después del lanzamiento', isCorrect: false, explanation: 'Contratar un DPO es importante pero no define Privacy by Design' }
    ],
    category: 'gdpr',
    difficulty: 'intermediate'
  },
  {
    id: 'q7',
    question: '¿Qué sistema de IA está clasificado como "riesgo inaceptable" en el AI Act?',
    options: [
      { id: 'a', text: 'Chatbots de atención al cliente', isCorrect: false, explanation: 'Los chatbots son de riesgo limitado (deben informar que son IA)' },
      { id: 'b', text: 'Sistemas de scoring social por gobiernos', isCorrect: true, explanation: 'Correcto. El social scoring gubernamental está prohibido por representar un riesgo inaceptable para los derechos fundamentales' },
      { id: 'c', text: 'Filtros de spam en email', isCorrect: false, explanation: 'Los filtros de spam son de riesgo mínimo' },
      { id: 'd', text: 'Sistemas de recomendación de Netflix', isCorrect: false, explanation: 'Son de riesgo mínimo' }
    ],
    category: 'ai-act',
    difficulty: 'intermediate'
  },
  {
    id: 'q8',
    question: '¿Qué derecho del GDPR permite solicitar la eliminación de datos personales?',
    options: [
      { id: 'a', text: 'Derecho de acceso', isCorrect: false, explanation: 'El derecho de acceso permite ver tus datos, no eliminarlos' },
      { id: 'b', text: 'Derecho de portabilidad', isCorrect: false, explanation: 'La portabilidad permite transferir datos a otro proveedor' },
      { id: 'c', text: 'Derecho al olvido (supresión)', isCorrect: true, explanation: 'Correcto. El Art. 17 GDPR establece el derecho de supresión o "derecho al olvido"' },
      { id: 'd', text: 'Derecho de oposición', isCorrect: false, explanation: 'El derecho de oposición permite oponerse al tratamiento, pero no necesariamente implica eliminación' }
    ],
    category: 'gdpr',
    difficulty: 'basic'
  },
  {
    id: 'q9',
    question: '¿Qué es una DPIA (Data Protection Impact Assessment)?',
    options: [
      { id: 'a', text: 'Un test de rendimiento de bases de datos', isCorrect: false, explanation: 'No es un test técnico de rendimiento' },
      { id: 'b', text: 'Una evaluación de impacto sobre la protección de datos personales', isCorrect: true, explanation: 'Correcto. Es obligatoria cuando el tratamiento de datos puede suponer un alto riesgo para los derechos de las personas' },
      { id: 'c', text: 'Un certificado de seguridad informática', isCorrect: false, explanation: 'No es un certificado, es un proceso de evaluación' },
      { id: 'd', text: 'Un seguro contra ciberataques', isCorrect: false, explanation: 'No tiene relación con seguros' }
    ],
    category: 'gdpr',
    difficulty: 'intermediate'
  },
  {
    id: 'q10',
    question: '¿Cuál es la multa máxima por infracción grave del GDPR?',
    options: [
      { id: 'a', text: '1 millón de euros', isCorrect: false, explanation: 'La multa máxima es mucho mayor' },
      { id: 'b', text: '10 millones de euros o 2% de facturación anual global', isCorrect: false, explanation: 'Esa es la multa para infracciones menos graves' },
      { id: 'c', text: '20 millones de euros o 4% de facturación anual global', isCorrect: true, explanation: 'Correcto. La multa máxima es de 20M€ o el 4% de la facturación anual global, lo que sea mayor' },
      { id: 'd', text: '50 millones de euros', isCorrect: false, explanation: 'Aunque Google fue multada con 50M, la multa máxima legal es 20M€ o 4% de facturación' }
    ],
    category: 'gdpr',
    difficulty: 'advanced'
  },
  {
    id: 'q11',
    question: '¿Qué caso de Amazon demostró sesgo de género en IA de contratación?',
    options: [
      { id: 'a', text: 'Alexa respondía diferente a voces femeninas', isCorrect: false, explanation: 'No está relacionado con Alexa' },
      { id: 'b', text: 'Su sistema de IA de contratación penalizaba CVs con palabras como "women"', isCorrect: true, explanation: 'Correcto. El sistema aprendió de 10 años de CVs predominantemente masculinos y penalizaba términos asociados a mujeres' },
      { id: 'c', text: 'Los precios en Amazon variaban por género', isCorrect: false, explanation: 'No es el caso mencionado' },
      { id: 'd', text: 'La publicidad de Amazon excluía a mujeres', isCorrect: false, explanation: 'No es el caso específico' }
    ],
    category: 'etica',
    difficulty: 'intermediate'
  },
  {
    id: 'q12',
    question: '¿Qué organismo español vela por la protección de datos?',
    options: [
      { id: 'a', text: 'INCIBE', isCorrect: false, explanation: 'INCIBE se centra en ciberseguridad, no específicamente en protección de datos' },
      { id: 'b', text: 'AEPD (Agencia Española de Protección de Datos)', isCorrect: true, explanation: 'Correcto. La AEPD es la autoridad supervisora en España para la protección de datos personales' },
      { id: 'c', text: 'CNMC', isCorrect: false, explanation: 'La CNMC regula competencia y mercados, no protección de datos' },
      { id: 'd', text: 'BOE', isCorrect: false, explanation: 'El BOE es el Boletín Oficial del Estado, no un organismo regulador' }
    ],
    category: 'gdpr',
    difficulty: 'basic'
  },
  {
    id: 'q13',
    question: '¿Qué principio ético establece que una IA debe poder explicar sus decisiones?',
    options: [
      { id: 'a', text: 'Beneficencia', isCorrect: false, explanation: 'La beneficencia es hacer el bien, no explicar decisiones' },
      { id: 'b', text: 'Explicabilidad', isCorrect: true, explanation: 'Correcto. La explicabilidad (o transparencia algorítmica) es el principio que exige que las decisiones de IA sean comprensibles' },
      { id: 'c', text: 'Autonomía', isCorrect: false, explanation: 'La autonomía se refiere a la capacidad de actuar independientemente' },
      { id: 'd', text: 'No maleficencia', isCorrect: false, explanation: 'No maleficencia es no causar daño, no explicar decisiones' }
    ],
    category: 'xai',
    difficulty: 'basic'
  },
  {
    id: 'q14',
    question: '¿Qué es una auditoría algorítmica?',
    options: [
      { id: 'a', text: 'Una revisión del código fuente por hackers éticos', isCorrect: false, explanation: 'Aunque incluye revisión técnica, va más allá del código fuente' },
      { id: 'b', text: 'Una evaluación sistemática de un sistema de IA para detectar sesgos, errores y cumplimiento normativo', isCorrect: true, explanation: 'Correcto. Evalúa equidad, transparencia, precisión y cumplimiento legal del sistema' },
      { id: 'c', text: 'Un informe financiero de la empresa de IA', isCorrect: false, explanation: 'No es una auditoría financiera' },
      { id: 'd', text: 'Una revisión de la velocidad del algoritmo', isCorrect: false, explanation: 'No se centra en rendimiento computacional' }
    ],
    category: 'gobernanza',
    difficulty: 'intermediate'
  },
  {
    id: 'q15',
    question: '¿Qué base legal del GDPR es necesaria para tratar datos con IA?',
    options: [
      { id: 'a', text: 'Solo el consentimiento', isCorrect: false, explanation: 'El consentimiento es una base legal, pero no la única posible' },
      { id: 'b', text: 'Al menos una de las 6 bases legales: consentimiento, contrato, obligación legal, interés vital, interés público o interés legítimo', isCorrect: true, explanation: 'Correcto. El Art. 6 GDPR establece 6 bases legales posibles para el tratamiento de datos' },
      { id: 'c', text: 'Ninguna, la IA está exenta', isCorrect: false, explanation: 'La IA NO está exenta del GDPR' },
      { id: 'd', text: 'Solo una autorización judicial', isCorrect: false, explanation: 'No se requiere autorización judicial como base legal general' }
    ],
    category: 'gdpr',
    difficulty: 'advanced'
  },
  {
    id: 'q16',
    question: '¿Qué principio del AI Act exige que los usuarios sepan cuando interactúan con una IA?',
    options: [
      { id: 'a', text: 'Principio de proporcionalidad', isCorrect: false, explanation: 'La proporcionalidad no se centra en la notificación al usuario' },
      { id: 'b', text: 'Obligación de transparencia', isCorrect: true, explanation: 'Correcto. El AI Act exige que los sistemas de IA de riesgo limitado (como chatbots) informen a los usuarios que están interactuando con IA' },
      { id: 'c', text: 'Principio de minimización', isCorrect: false, explanation: 'La minimización se refiere a datos, no a transparencia' },
      { id: 'd', text: 'Principio de exactitud', isCorrect: false, explanation: 'La exactitud se refiere a la calidad de los datos' }
    ],
    category: 'ai-act',
    difficulty: 'intermediate'
  },
  {
    id: 'q17',
    question: '¿Qué es el "derecho a no ser objeto de decisiones automatizadas" del GDPR?',
    options: [
      { id: 'a', text: 'El derecho a que ningún algoritmo procese tus datos', isCorrect: false, explanation: 'No prohíbe todo procesamiento, solo decisiones exclusivamente automatizadas con efectos jurídicos' },
      { id: 'b', text: 'El derecho a solicitar intervención humana en decisiones automatizadas con efectos significativos', isCorrect: true, explanation: 'Correcto. El Art. 22 GDPR da derecho a no ser objeto de decisiones basadas únicamente en tratamiento automatizado que produzcan efectos jurídicos' },
      { id: 'c', text: 'El derecho a apagar cualquier IA', isCorrect: false, explanation: 'No es un derecho a apagar sistemas' },
      { id: 'd', text: 'El derecho a que las empresas no usen IA', isCorrect: false, explanation: 'No prohíbe el uso de IA en general' }
    ],
    category: 'gdpr',
    difficulty: 'advanced'
  },
  {
    id: 'q18',
    question: '¿Cuáles son los 7 principios de la IA Confiable según la Comisión Europea?',
    options: [
      { id: 'a', text: 'Velocidad, eficiencia, rentabilidad, escalabilidad, innovación, diseño, marketing', isCorrect: false, explanation: 'Estos son principios de negocio, no de IA confiable' },
      { id: 'b', text: 'Supervisión humana, robustez, privacidad, transparencia, diversidad, bienestar social, rendición de cuentas', isCorrect: true, explanation: 'Correcto. Son los 7 requisitos clave definidos por el grupo de expertos de alto nivel de la UE' },
      { id: 'c', text: 'Precisión, recall, F1-score, AUC, accuracy, loss, perplexity', isCorrect: false, explanation: 'Esas son métricas técnicas de ML, no principios éticos' },
      { id: 'd', text: 'Rapidez, costo, calidad, seguridad, disponibilidad, soporte, documentación', isCorrect: false, explanation: 'Son principios de ingeniería de software, no de IA confiable' }
    ],
    category: 'gobernanza',
    difficulty: 'advanced'
  },
  {
    id: 'q19',
    question: '¿Qué caso de COMPAS demostró sesgo racial en IA?',
    options: [
      { id: 'a', text: 'Un sistema de navegación GPS que evitaba barrios', isCorrect: false, explanation: 'COMPAS no es un sistema de navegación' },
      { id: 'b', text: 'Un algoritmo de riesgo criminal que puntuaba más alto a personas negras', isCorrect: true, explanation: 'Correcto. ProPublica demostró que COMPAS asignaba puntuaciones de riesgo más altas a acusados negros de forma desproporcionada' },
      { id: 'c', text: 'Un chatbot que usaba lenguaje racista', isCorrect: false, explanation: 'COMPAS no es un chatbot' },
      { id: 'd', text: 'Un sistema de reconocimiento facial en aeropuertos', isCorrect: false, explanation: 'COMPAS es un sistema de justicia penal, no de reconocimiento facial' }
    ],
    category: 'etica',
    difficulty: 'intermediate'
  },
  {
    id: 'q20',
    question: '¿Qué significa el principio de "minimización de datos" en el GDPR?',
    options: [
      { id: 'a', text: 'Usar la menor cantidad de servidores posible', isCorrect: false, explanation: 'No se refiere a infraestructura técnica' },
      { id: 'b', text: 'Recoger solo los datos estrictamente necesarios para el fin declarado', isCorrect: true, explanation: 'Correcto. El principio de minimización (Art. 5.1.c GDPR) exige que los datos sean adecuados, pertinentes y limitados a lo necesario' },
      { id: 'c', text: 'Comprimir los datos para que ocupen menos espacio', isCorrect: false, explanation: 'No se refiere a compresión de datos' },
      { id: 'd', text: 'Eliminar datos después de 30 días', isCorrect: false, explanation: 'No establece un plazo fijo de retención' }
    ],
    category: 'gdpr',
    difficulty: 'basic'
  }
];

export default function Module7ExamQuiz() {
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
    const correct = shuffledQuestions[currentQuestion].options.find(o => o.id === optionId)?.isCorrect;
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setMode(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (!mode) {
    return (
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-emerald-900">Test de Ética, Privacidad y Legislación en IA</CardTitle>
              <p className="text-sm text-emerald-700">20 preguntas sobre GDPR, AI Act, sesgos y gobernanza</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={() => startQuiz('practice')} className="h-20 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
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
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Ética IA</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">GDPR/RGPD</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">AI Act UE</Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Gobernanza</Badge>
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">XAI</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${percentage >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-emerald-900">
            {percentage >= 90 ? '¡Experto en Ética IA!' : percentage >= 70 ? '¡Buen conocimiento!' : percentage >= 50 ? 'Vas por buen camino' : 'Necesitas repasar más'}
          </h3>
          <div className="text-4xl font-bold text-emerald-600">{score}/{shuffledQuestions.length}</div>
          <Progress value={percentage} className="w-64 mx-auto" />
          <p className="text-emerald-700">{percentage}% de aciertos</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={resetQuiz} variant="outline" className="border-emerald-300">
              <RefreshCw className="h-4 w-4 mr-2" /> Volver al inicio
            </Button>
            <Button onClick={() => startQuiz(mode)} className="bg-emerald-500 hover:bg-emerald-600">
              <Zap className="h-4 w-4 mr-2" /> Intentar de nuevo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const q = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            {q.category === 'etica' ? 'Ética' : q.category === 'gdpr' ? 'GDPR' : q.category === 'ai-act' ? 'AI Act' : q.category === 'gobernanza' ? 'Gobernanza' : 'XAI'}
          </Badge>
          <span className="text-sm text-emerald-600 font-medium">
            Pregunta {currentQuestion + 1}/{shuffledQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold text-emerald-900">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              disabled={answered}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                !answered
                  ? 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'
                  : option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : selectedAnswer === option.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">{option.id.toUpperCase()})</span>
                <span className="text-sm">{option.text}</span>
              </div>
              {answered && (selectedAnswer === option.id || option.isCorrect) && (
                <p className="text-xs mt-1 ml-6 text-slate-600 italic">{option.explanation}</p>
              )}
            </button>
          ))}
        </div>
        {answered && (
          <div className="flex justify-end">
            <Button onClick={nextQuestion} className="bg-emerald-500 hover:bg-emerald-600">
              {currentQuestion + 1 < shuffledQuestions.length ? 'Siguiente' : 'Ver resultados'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
