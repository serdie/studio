'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2, AlertCircle, RotateCcw, ChevronRight,
  Sparkles, Zap, Brain, Code2, Layout, Database, Globe, Shield
} from 'lucide-react';

interface PlatformQuestion {
  scenario: string;
  options: { name: string; correct: boolean; why: string; icon: string }[];
}

const questions: PlatformQuestion[] = [
  {
    scenario: 'Necesito automatizar el envío de leads desde Facebook Ads a Google Sheets y enviar un email de bienvenida automáticamente.',
    options: [
      { name: 'MAKE (Integromat)', correct: true, why: 'MAKE es ideal para conectar múltiples servicios (Facebook Ads → Sheets → Gmail) con flujos visuales sin código.', icon: '⚡' },
      { name: 'Bubble', correct: false, why: 'Bubble es para crear aplicaciones web completas, no para automatizaciones entre servicios.', icon: '🫧' },
      { name: 'Webflow', correct: false, why: 'Webflow es para diseñar y publicar websites, no para automatizar flujos de datos.', icon: '🌐' },
    ],
  },
  {
    scenario: 'Quiero crear una app interna para gestionar inventario sin saber programar.',
    options: [
      { name: 'Zapier', correct: false, why: 'Zapier conecta apps pero no crea interfaces de usuario completas para gestión de datos.', icon: '🔗' },
      { name: 'Airtable', correct: true, why: 'Airtable combina base de datos con interfaz visual, perfecto para gestión de inventario sin código.', icon: '📊' },
      { name: 'n8n', correct: false, why: 'n8n es para automatización de flujos, no para crear interfaces de gestión de datos.', icon: '🔄' },
    ],
  },
  {
    scenario: 'Necesito clasificar automáticamente tickets de soporte usando IA y enrutarlos al equipo correcto.',
    options: [
      { name: 'Glide', correct: false, why: 'Glide crea apps móviles desde hojas de cálculo, no tiene capacidades de IA nativas para clasificación.', icon: '📱' },
      { name: 'MAKE + OpenAI', correct: true, why: 'MAKE permite conectar un módulo de OpenAI para analizar texto y un router para enrutar según categoría.', icon: '⚡' },
      { name: 'Softr', correct: false, why: 'Softr crea portales web desde Airtable, no tiene automatización con IA integrada.', icon: '🏗️' },
    ],
  },
  {
    scenario: 'Quiero crear un portal de clientes donde puedan ver sus pedidos y facturas.',
    options: [
      { name: 'Softr + Airtable', correct: true, why: 'Softr crea portales web directamente desde datos en Airtable, perfecto para portales de clientes.', icon: '🏗️' },
      { name: 'Make', correct: false, why: 'Make automatiza flujos pero no crea interfaces web para usuarios finales.', icon: '⚡' },
      { name: 'Zapier', correct: false, why: 'Zapier conecta apps pero no crea portales web con autenticación de usuarios.', icon: '🔗' },
    ],
  },
  {
    scenario: 'Necesito transcribir reuniones de Zoom y generar resúmenes automáticos con IA.',
    options: [
      { name: 'Webflow', correct: false, why: 'Webflow es para diseño web, no tiene capacidades de procesamiento de audio o IA.', icon: '🌐' },
      { name: 'MAKE + Whisper + OpenAI', correct: true, why: 'MAKE puede conectar Zoom → Whisper (transcripción) → OpenAI (resumen) → Email automáticamente.', icon: '⚡' },
      { name: 'Adalo', correct: false, why: 'Adalo crea apps móviles pero no tiene integración nativa con servicios de transcripción.', icon: '📱' },
    ],
  },
  {
    scenario: 'Quiero crear una landing page profesional con diseño personalizado sin código.',
    options: [
      { name: 'Airtable', correct: false, why: 'Airtable es base de datos con vistas, no es un constructor de páginas web con diseño libre.', icon: '📊' },
      { name: 'Webflow', correct: true, why: 'Webflow es el estándar para diseño web visual profesional con control total de CSS y animaciones.', icon: '🌐' },
      { name: 'n8n', correct: false, why: 'n8n automatiza flujos de trabajo, no crea páginas web con diseño visual.', icon: '🔄' },
    ],
  },
  {
    scenario: 'Necesito una app móvil para que los empleados registren gastos con foto del ticket.',
    options: [
      { name: 'Glide', correct: true, why: 'Glide crea apps móviles desde Google Sheets, perfecto para formularios con fotos y geolocalización.', icon: '📱' },
      { name: 'Make', correct: false, why: 'Make automatiza procesos pero no crea apps móviles con interfaz de usuario.', icon: '⚡' },
      { name: 'Softr', correct: false, why: 'Softr crea portales web, no apps móviles nativas con cámara.', icon: '🏗️' },
    ],
  },
  {
    scenario: 'Quiero automatizar la facturación: cuando se cierra un proyecto, generar factura y enviarla.',
    options: [
      { name: 'Bubble', correct: false, why: 'Bubble crea apps web completas pero es excesivo para una automatización de facturación simple.', icon: '🫧' },
      { name: 'MAKE', correct: true, why: 'MAKE conecta tu herramienta de proyectos con el software de facturación y email automáticamente.', icon: '⚡' },
      { name: 'Webflow', correct: false, why: 'Webflow diseña websites, no automatiza procesos de facturación entre sistemas.', icon: '🌐' },
    ],
  },
];

export default function PlatformMatcherGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const q = questions[currentIndex];
  const correctIndex = q.options.findIndex(o => o.correct);
  const maxScore = questions.length * 12;
  const progressPercent = ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedIndex(idx);
    if (q.options[idx].correct) setScore(prev => prev + 12);
  };

  const nextQuestion = () => {
    if (!answered) return;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
      setSelectedIndex(null);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedIndex(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Platform Matcher</h1>
            <p className="text-sm text-slate-600">Elige la plataforma No-Code/Low-Code correcta para cada caso de uso</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Zap className="h-3 w-3 mr-1" /><strong>{score}</strong> <span className="ml-1">/ {maxScore}</span></Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Pregunta {currentIndex + 1} de {questions.length}</Badge>
        </div>
      </div>

      {/* Progress */}
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">Progreso</span>
            <span className="text-xs font-bold text-slate-800">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <CardContent className="p-5 space-y-4">
          <p className="text-sm font-medium text-slate-800 leading-relaxed">{q.scenario}</p>

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
                btnClass += 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 cursor-pointer ';
              }

              return (
                <button key={idx} className={btnClass} onClick={() => handleAnswer(idx)} disabled={answered}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <div className="flex-1">
                      <span className="font-semibold block">{opt.name}</span>
                      {showFeedback && <span className="text-xs block mt-1 opacity-80">{opt.why}</span>}
                    </div>
                    {showFeedback && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />}
                    {showFeedback && isSelected && !isCorrect && <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">{answered ? 'Lee la explicación antes de continuar.' : 'Selecciona la plataforma correcta.'}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetQuiz} className="border-slate-300 text-xs"><RotateCcw className="h-3.5 w-3.5 mr-1" /> Reiniciar</Button>
              <Button size="sm" onClick={nextQuestion} disabled={!answered}
                className={`rounded-full text-xs ${answered ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                {currentIndex === questions.length - 1 ? 'Finalizado 🏁' : 'Siguiente'}
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
