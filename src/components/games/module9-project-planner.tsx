'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Rocket, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight, ListChecks } from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  description: string;
  tasks: string[];
  correctOrder: number;
  timePercent: string;
  tips: string;
}

const phases: Phase[] = [
  { id: 'p1', name: 'Business Understanding', description: 'Entender el problema de negocio y definir objetivos', tasks: ['Identificar oportunidad', 'Definir KPIs', 'Evaluar viabilidad', 'Estimar ROI'], correctOrder: 1, timePercent: '10%', tips: 'Sin un buen entendimiento del negocio, incluso un modelo perfecto será inútil.' },
  { id: 'p2', name: 'Data Understanding', description: 'Explorar y comprender los datos disponibles', tasks: ['Identificar fuentes', 'Análisis exploratorio (EDA)', 'Evaluar calidad', 'Documentar metadatos'], correctOrder: 2, timePercent: '20%', tips: 'Los datos son el activo más valioso. Dedica tiempo a entenderlos antes de modelar.' },
  { id: 'p3', name: 'Data Preparation', description: 'Limpiar, transformar y preparar los datos', tasks: ['Limpieza (missing values, outliers)', 'Feature engineering', 'Normalización', 'Train/val/test split'], correctOrder: 3, timePercent: '30%', tips: 'Esta fase consume el 30% del tiempo. "Garbage in, garbage out" - la calidad del modelo depende de los datos.' },
  { id: 'p4', name: 'Modeling', description: 'Seleccionar y entrenar modelos de IA', tasks: ['Selección de algoritmos', 'Entrenamiento', 'Hyperparameter tuning', 'Cross-validation'], correctOrder: 4, timePercent: '20%', tips: 'Empieza siempre con un modelo simple (baseline) antes de probar modelos complejos.' },
  { id: 'p5', name: 'Evaluation', description: 'Evaluar el rendimiento del modelo', tasks: ['Métricas técnicas (F1, AUC)', 'Análisis de errores', 'Evaluación de sesgo', 'Validación con stakeholders'], correctOrder: 5, timePercent: '10%', tips: 'Un buen modelo técnico puede ser malo para el negocio. Evalúa siempre con métricas de negocio.' },
  { id: 'p6', name: 'Deployment', description: 'Desplegar el modelo en producción', tasks: ['Integración con sistemas', 'APIs/endpoints', 'Rollout gradual', 'Monitorización'], correctOrder: 6, timePercent: '10%', tips: 'El deployment no es el final. La monitorización continua es clave para detectar data drift.' },
];

interface OrderItem { phaseId: string; placed: boolean }

export default function Module9ProjectPlanner() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [remaining, setRemaining] = useState<Phase[]>([]);

  const start = () => {
    setRemaining([...phases].sort(() => Math.random() - 0.5));
    setStarted(true);
    setCurrentStep(0);
    setScore(0);
  };

  const handleSelect = (phaseId: string) => {
    if (answered) return;
    setSelected(phaseId);
    setAnswered(true);
    const correctPhase = phases.find(p => p.correctOrder === currentStep + 1);
    if (correctPhase && correctPhase.id === phaseId) setScore(s => s + 1);
  };

  const next = () => {
    if (currentStep + 1 < phases.length) {
      setCurrentStep(s => s + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStarted(false); setCurrentStep(0); setScore(0); setSelected(null); setAnswered(false); setShowResult(false);
  };

  if (!started) {
    return (
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
              <ListChecks className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-rose-900">Planificador de Proyecto IA (CRISP-DM)</CardTitle>
              <p className="text-sm text-rose-700">Ordena las 6 fases de un proyecto de IA</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-rose-800">
            Eres el líder de un proyecto de IA. Debes organizar las 6 fases del proyecto CRISP-DM en el orden correcto. En cada paso, elige qué fase va a continuación.
          </p>
          <Button onClick={start} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
            <Rocket className="h-4 w-4 mr-2" /> Comenzar planificación
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / phases.length) * 100);
    return (
      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-rose-900">
            {pct === 100 ? '¡Planificación perfecta!' : pct >= 70 ? '¡Buen Project Manager!' : 'Repasa CRISP-DM'}
          </h3>
          <p className="text-4xl font-bold text-rose-600">{score}/{phases.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <div className="mt-4 text-left bg-rose-50 p-4 rounded-lg border border-rose-200">
            <p className="text-sm font-bold text-rose-900 mb-2">Orden correcto CRISP-DM:</p>
            {phases.map((p, i) => (
              <p key={p.id} className="text-xs text-rose-700"><strong>{i + 1}.</strong> {p.name} ({p.timePercent}) - {p.description}</p>
            ))}
          </div>
          <Button onClick={reset} variant="outline" className="border-rose-300"><RefreshCw className="h-4 w-4 mr-2" /> Jugar de nuevo</Button>
        </CardContent>
      </Card>
    );
  }

  const correctPhase = phases.find(p => p.correctOrder === currentStep + 1)!;

  return (
    <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Fase {currentStep + 1} de {phases.length}</Badge>
          <span className="text-sm text-rose-600 font-medium">Puntos: {score}</span>
        </div>
        <Progress value={((currentStep + 1) / phases.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-rose-50 p-3 rounded-lg border border-rose-200">
          <p className="text-sm text-rose-900 font-medium">¿Qué fase va en la posición {currentStep + 1}?</p>
          {currentStep > 0 && (
            <div className="mt-2 space-y-1">
              {phases.filter(p => p.correctOrder <= currentStep).map(p => (
                <p key={p.id} className="text-xs text-green-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> {p.correctOrder}. {p.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {remaining.map(phase => {
            const isCorrect = phase.id === correctPhase.id;
            const isSelected = phase.id === selected;
            const alreadyPlaced = phase.correctOrder <= currentStep;
            if (alreadyPlaced) return null;
            return (
              <button key={phase.id} onClick={() => handleSelect(phase.id)} disabled={answered}
                className={`p-3 rounded-lg border-2 text-left transition-all ${!answered ? 'border-rose-200 hover:border-rose-400 hover:bg-rose-50 cursor-pointer' : isCorrect ? 'border-green-500 bg-green-50' : isSelected ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-50'}`}>
                <p className="text-sm font-bold">{phase.name}</p>
                <p className="text-xs text-slate-600">{phase.description}</p>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
              <p className="text-xs font-bold text-amber-800">{correctPhase.name} ({correctPhase.timePercent} del proyecto)</p>
              <p className="text-xs text-amber-700 mt-1">{correctPhase.tips}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {correctPhase.tasks.map(t => (
                  <Badge key={t} variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={next} className="bg-rose-500 hover:bg-rose-600">
                {currentStep + 1 < phases.length ? <><ArrowRight className="h-4 w-4 mr-1" /> Siguiente fase</> : 'Ver resultados'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
