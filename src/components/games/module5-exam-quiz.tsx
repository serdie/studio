'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2, AlertCircle, RotateCcw, ChevronRight,
  Trophy, Shield, Zap, AlertTriangle
} from 'lucide-react';

interface Question {
  topic: string;
  text: string;
  options: { text: string; correct: boolean; why: string }[];
}

const questions: Question[] = [
  {
    topic: 'No-Code vs Low-Code',
    text: '¿Cuál es la diferencia principal entre No-Code y Low-Code?',
    options: [
      { text: 'No-Code permite crear sin programar; Low-Code requiere mínima programación para funcionalidades avanzadas.', correct: true, why: 'No-Code es 100% visual; Low-Code combina componentes visuales con código personalizado para mayor flexibilidad.' },
      { text: 'No-Code es más potente que Low-Code en todos los aspectos.', correct: false, why: 'Low-Code es más potente porque permite añadir código personalizado cuando los componentes visuales no son suficientes.' },
      { text: 'No-Code solo sirve para websites y Low-Code solo para apps móviles.', correct: false, why: 'Ambos pueden usarse para websites, apps, automatizaciones y bases de datos.' },
    ],
  },
  {
    topic: 'MAKE - Conceptos',
    text: 'En MAKE, ¿qué diferencia hay entre un Trigger y una Action?',
    options: [
      { text: 'El Trigger inicia el escenario; la Action es lo que ejecuta el escenario.', correct: true, why: 'El Trigger es el evento que dispara el flujo; las Actions son las operaciones que se realizan después.' },
      { text: 'El Trigger es manual y la Action siempre es automática.', correct: false, why: 'Los triggers pueden ser automáticos (webhooks) o programados (polling), no solo manuales.' },
      { text: 'No hay diferencia, son intercambiables.', correct: false, why: 'Son conceptos distintos: uno inicia el flujo y el otro ejecuta operaciones.' },
    ],
  },
  {
    topic: 'IA en automatizaciones',
    text: '¿Qué módulo de MAKE usarías para clasificar automáticamente tickets de soporte por categoría?',
    options: [
      { text: 'Un módulo de OpenAI con un prompt de clasificación y un Router para enrutar según el resultado.', correct: true, why: 'OpenAI analiza el texto del ticket, clasifica, y el Router divide el flujo según la categoría detectada.' },
      { text: 'Un módulo de Google Sheets para guardar los tickets.', correct: false, why: 'Google Sheets solo almacena datos, no clasifica texto con IA.' },
      { text: 'Un Iterator para procesar cada ticket individualmente.', correct: false, why: 'El Iterator procesa elementos pero no clasifica contenido; necesitas IA para la clasificación.' },
    ],
  },
  {
    topic: 'Manejo de errores',
    text: 'En MAKE, ¿qué directiva de error usarías si quieres que el escenario continúe aunque un módulo falle?',
    options: [
      { text: 'Ignore: el escenario continúa sin hacer nada ante el error.', correct: true, why: 'Ignore permite que el escenario siga ejecutándose aunque un módulo falle, sin detener el flujo.' },
      { text: 'Break: detiene el escenario inmediatamente.', correct: false, why: 'Break detiene el escenario, que es lo contrario de lo que queremos.' },
      { text: 'Rollback: revierte todas las operaciones anteriores.', correct: false, why: 'Rollback es para deshacer operaciones, no para continuar ante un error.' },
    ],
  },
  {
    topic: 'Plataformas No-Code',
    text: '¿Qué plataforma es más adecuada para crear un portal de clientes donde puedan ver sus pedidos?',
    options: [
      { text: 'Softr + Airtable: Softr crea el portal web y Airtable gestiona los datos de pedidos.', correct: true, why: 'Softr se conecta directamente a Airtable para crear portales con autenticación de usuarios.' },
      { text: 'Webflow: es el mejor para crear cualquier tipo de portal web.', correct: false, why: 'Webflow es para diseño web visual, pero no tiene autenticación de usuarios ni gestión de datos nativa como Softr.' },
      { text: 'Zapier: conecta el portal con la base de datos de pedidos.', correct: false, why: 'Zapier automatiza flujos entre apps, no crea interfaces web con autenticación.' },
    ],
  },
  {
    topic: 'Prompt Engineering para automatizaciones',
    text: '¿Cuál es la mejor práctica al diseñar prompts para automatizaciones con IA en MAKE?',
    options: [
      { text: 'Ser extremadamente específico en el formato de salida y usar ejemplos (few-shot prompting).', correct: true, why: 'En automatizaciones, el formato de salida es crítico para que los siguientes módulos puedan procesar los datos correctamente.' },
      { text: 'Dejar que la IA decida el formato más apropiado para cada caso.', correct: false, why: 'Sin formato definido, la IA puede variar la salida y romper el flujo de automatización.' },
      { text: 'Usar siempre el modelo más potente (GPT-4) para garantizar precisión.', correct: false, why: 'No siempre es necesario; GPT-3.5 puede ser suficiente y más económico para tareas simples de clasificación.' },
    ],
  },
  {
    topic: 'Router y Filtros',
    text: '¿Cuándo es más apropiado usar un Router en lugar de un Filtro en MAKE?',
    options: [
      { text: 'Cuando necesito dividir el flujo en múltiples caminos condicionales (ej: ticket técnico → equipo A, ticket ventas → equipo B).', correct: true, why: 'El Router permite crear múltiples caminos con filtros diferentes, mientras el filtro solo continúa o detiene un camino.' },
      { text: 'Cuando solo quiero verificar si un campo tiene un valor específico.', correct: false, why: 'Para una sola verificación, un Filtro es más simple y eficiente.' },
      { text: 'Cuando quiero detener el escenario si hay un error.', correct: false, why: 'Para detener por error se usa la directiva Break, no un Router.' },
    ],
  },
  {
    topic: 'Optimización de operaciones',
    text: '¿Qué práctica reduce mejor el consumo de operaciones en MAKE?',
    options: [
      { text: 'Usar webhooks en lugar de polling y agrupar operaciones cuando sea posible.', correct: true, why: 'Los webhooks solo se ejecutan cuando hay datos nuevos; el polling consume operaciones aunque no haya cambios.' },
      { text: 'Ejecutar escenarios cada minuto para tener datos siempre actualizados.', correct: false, why: 'Polling frecuente consume muchas operaciones innecesariamente.' },
      { text: 'No usar filtros para que todos los datos pasen al siguiente módulo.', correct: false, why: 'Sin filtros, se procesan datos innecesarios consumiendo más operaciones.' },
    ],
  },
  {
    topic: 'Integración de IA',
    text: '¿Qué servicio de IA en MAKE usarías para transcribir una grabación de Zoom?',
    options: [
      { text: 'Whisper (OpenAI): especializado en transcripción de audio a texto.', correct: true, why: 'Whisper es el modelo de OpenAI diseñado específicamente para transcripción de audio.' },
      { text: 'GPT-4: porque es el modelo más potente de OpenAI.', correct: false, why: 'GPT-4 procesa texto, no audio. Para audio necesitas Whisper.' },
      { text: 'DALL-E: porque genera contenido a partir de multimedia.', correct: false, why: 'DALL-E genera imágenes, no transcribe audio.' },
    ],
  },
  {
    topic: 'Decisiones de arquitectura',
    text: 'Una empresa quiere automatizar el procesamiento de facturas: recibir PDF por email, extraer datos y crear registro en contabilidad. ¿Qué enfoque es más coherente?',
    options: [
      { text: 'MAKE: Trigger email → OpenAI Vision (extraer datos del PDF) → Crear registro en contabilidad → Notificar si importe > umbral.', correct: true, why: 'MAKE conecta todos los servicios necesarios y OpenAI Vision puede extraer datos de PDFs/imágenes.' },
      { text: 'Bubble: crear una app completa de gestión de facturas desde cero.', correct: false, why: 'Bubble es excesivo para una automatización; MAKE es más rápido y adecuado para este caso.' },
      { text: 'Webflow: diseñar un formulario web para que los empleados introduzcan los datos manualmente.', correct: false, why: 'Introducir datos manualmente pierde la ventaja de la automatización con IA.' },
    ],
  },
];

export default function Module5ExamQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[currentIndex];
  const correctIndex = q.options.findIndex((o) => o.correct);
  const maxScore = questions.length * 10;
  const progressPercent = ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedIndex(idx);
    if (q.options[idx].correct) setScore((prev) => prev + 10);
  };

  const nextQuestion = () => {
    if (!answered) return;
    if (currentIndex === questions.length - 1) { setShowResult(true); return; }
    setCurrentIndex((prev) => prev + 1);
    setAnswered(false);
    setSelectedIndex(null);
  };

  const resetQuiz = () => {
    setCurrentIndex(0); setScore(0); setAnswered(false); setSelectedIndex(null); setShowResult(false);
  };

  const getResultMessage = () => {
    const ratio = score / maxScore;
    if (ratio === 1) return { msg: '¡Perfecto! Dominas No-Code, MAKE e IA aplicada a automatizaciones.', tips: 'Puedes dedicar el resto del tiempo a practicar escenarios reales en MAKE.', color: 'text-green-500' };
    if (ratio >= 0.7) return { msg: 'Muy buen nivel. Solo te faltan pulir un par de matices de MAKE e IA.', tips: 'Repasa especialmente: manejo de errores, routers vs filtros, y optimización de operaciones.', color: 'text-blue-500' };
    if (ratio >= 0.4) return { msg: 'Vas encaminado, pero conviene repasar conceptos de MAKE, IA y plataformas No-Code.', tips: 'Repite el quiz y fíjate en las explicaciones: cada porqué te da frases útiles para el examen.', color: 'text-amber-500' };
    return { msg: 'Buen intento, pero es mejor que repases bien el módulo 5 antes del examen real.', tips: 'Relee el contenido del módulo y repite el test hasta alcanzar al menos 70 puntos.', color: 'text-red-500' };
  };

  if (showResult) {
    const result = getResultMessage();
    return (
      <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <CardContent className="p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto"><Trophy className="h-8 w-8 text-white" /></div>
            <h2 className="text-2xl font-bold text-slate-800">Resultado Final</h2>
            <div className={`text-5xl font-bold ${result.color}`}>{score} / {maxScore}</div>
            <p className="text-sm text-slate-600">{result.msg}</p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">💡 {result.tips}</div>
            <Button onClick={resetQuiz} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full"><RotateCcw className="h-4 w-4 mr-1.5" /> Repetir Quiz</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-lg"><Zap className="h-5 w-5 text-white" /></div>
          <div><h1 className="text-2xl font-bold text-slate-800">Simulacro Examen — Módulo 5</h1><p className="text-sm text-slate-600">10 preguntas tipo test sobre No-Code, MAKE e IA aplicada a automatizaciones.</p></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">No-Code vs Low-Code</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">MAKE y automatizaciones</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">IA en flujos</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Plataformas</Badge>
        </div>
      </div>

      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-xs font-medium text-slate-600">Pregunta {currentIndex + 1} de {questions.length}</span><span className="text-xs font-bold text-slate-800">Puntuación: <span className="text-green-600">{score}</span> / {maxScore}</span></div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex items-center justify-between mt-1"><Badge variant="outline" className="text-[10px] bg-orange-50 text-orange-700 border-orange-200">Tema: {q.topic}</Badge><span className="text-[10px] text-slate-500">{Math.round(progressPercent)}%</span></div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between"><Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">Pregunta {currentIndex + 1}</Badge><Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">{q.topic}</Badge></div>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">{q.text}</p>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrect = opt.correct;
              const showFeedback = answered;
              let btnClass = 'w-full text-left p-3 rounded-xl border-2 transition-all text-sm ';
              if (showFeedback) {
                if (isCorrect) btnClass += 'border-green-400 bg-green-50 text-green-800 ';
                else if (isSelected && !isCorrect) btnClass += 'border-red-400 bg-red-50 text-red-800 ';
                else btnClass += 'border-slate-200 bg-slate-50 text-slate-500 opacity-60 ';
              } else {
                btnClass += 'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50 cursor-pointer ';
              }
              return (
                <button key={idx} className={btnClass} onClick={() => handleAnswer(idx)} disabled={answered}>
                  <div className="flex items-start gap-3">
                    <span className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${showFeedback && isCorrect ? 'bg-green-500 text-white' : showFeedback && isSelected && !isCorrect ? 'bg-red-500 text-white' : 'bg-orange-100 text-orange-700'}`}>
                      {showFeedback && isCorrect ? '✓' : showFeedback && isSelected && !isCorrect ? '✕' : ['A', 'B', 'C'][idx]}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`p-3 rounded-xl border text-xs leading-relaxed ${selectedIndex === correctIndex ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <div className="flex items-start gap-2">
                {selectedIndex !== null && selectedIndex === correctIndex ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                <div>
                  <strong>{selectedIndex !== null && selectedIndex === correctIndex ? '✅ Correcto.' : '❌ No es la mejor opción.'}</strong>{' '}
                  {selectedIndex !== null && selectedIndex !== correctIndex && <><span className="block mt-1">{q.options[selectedIndex]?.why}</span><span className="block mt-2 font-semibold">Opción correcta:</span></>}
                  <span className="block mt-1">{q.options[correctIndex].why}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">{answered ? 'Lee la explicación antes de continuar.' : 'Selecciona una respuesta.'}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetQuiz} className="border-slate-300 text-xs"><RotateCcw className="h-3.5 w-3.5 mr-1" /> Reiniciar</Button>
              <Button size="sm" onClick={nextQuestion} disabled={!answered} className={`rounded-full text-xs ${answered ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                {currentIndex === questions.length - 1 ? 'Ver resultado 🏁' : 'Siguiente'}<ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
