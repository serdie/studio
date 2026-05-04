'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Scale, CheckCircle2, XCircle, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';

type RiskLevel = 'inaceptable' | 'alto' | 'limitado' | 'minimo';

interface AISystem {
  id: string;
  name: string;
  description: string;
  correctRisk: RiskLevel;
  explanation: string;
}

const aiSystems: AISystem[] = [
  { id: 's1', name: 'Social Scoring gubernamental', description: 'Sistema que puntúa ciudadanos basándose en su comportamiento social para determinar acceso a servicios públicos', correctRisk: 'inaceptable', explanation: 'El AI Act prohíbe los sistemas de puntuación social por autoridades públicas por violar derechos fundamentales.' },
  { id: 's2', name: 'Filtro de spam', description: 'Algoritmo que clasifica emails como spam o legítimos basándose en patrones', correctRisk: 'minimo', explanation: 'Los filtros de spam son de riesgo mínimo: no requieren obligaciones específicas bajo el AI Act.' },
  { id: 's3', name: 'Sistema de diagnóstico médico', description: 'IA que analiza radiografías para detectar tumores y recomendar tratamientos', correctRisk: 'alto', explanation: 'Los dispositivos médicos con IA son de alto riesgo: requieren certificación, documentación técnica y supervisión humana.' },
  { id: 's4', name: 'Chatbot de atención al cliente', description: 'Bot conversacional que atiende consultas de clientes en una web de e-commerce', correctRisk: 'limitado', explanation: 'Los chatbots son de riesgo limitado: deben informar al usuario de que interactúan con una IA (transparencia).' },
  { id: 's5', name: 'IA de contratación', description: 'Sistema que filtra CVs, realiza scoring de candidatos y preselecciona para entrevistas', correctRisk: 'alto', explanation: 'La IA en procesos de contratación es de alto riesgo por su impacto en derechos laborales y oportunidades de las personas.' },
  { id: 's6', name: 'Manipulación subliminal', description: 'Sistema que usa técnicas subliminales para alterar el comportamiento de las personas sin que sean conscientes', correctRisk: 'inaceptable', explanation: 'Las técnicas subliminales de manipulación están prohibidas por el AI Act como riesgo inaceptable.' },
  { id: 's7', name: 'Videojuego con NPC inteligentes', description: 'NPCs en un videojuego que usan IA para generar diálogos y comportamientos dinámicos', correctRisk: 'minimo', explanation: 'Los videojuegos con IA son de riesgo mínimo: son entretenimiento sin impacto en derechos fundamentales.' },
  { id: 's8', name: 'Scoring crediticio', description: 'IA que evalúa la solvencia de personas para decidir si se les concede un préstamo', correctRisk: 'alto', explanation: 'El credit scoring con IA es de alto riesgo por su impacto directo en el acceso a servicios financieros.' },
  { id: 's9', name: 'Deepfake generator', description: 'Herramienta que genera videos falsos realistas de personas diciendo cosas que nunca dijeron', correctRisk: 'limitado', explanation: 'Los deepfakes son de riesgo limitado: deben etiquetar claramente que el contenido es generado por IA.' },
  { id: 's10', name: 'IA en infraestructura crítica', description: 'Sistema que gestiona el suministro de agua y electricidad de una ciudad usando IA', correctRisk: 'alto', explanation: 'La IA en infraestructura crítica es de alto riesgo: fallos pueden afectar a la seguridad y bienestar de ciudades enteras.' },
  { id: 's11', name: 'Vigilancia biométrica masiva', description: 'Cámaras con reconocimiento facial en tiempo real en espacios públicos por la policía', correctRisk: 'inaceptable', explanation: 'La vigilancia biométrica masiva en tiempo real en espacios públicos está prohibida (con excepciones muy limitadas para terrorismo).' },
  { id: 's12', name: 'Recomendador de música', description: 'Algoritmo que sugiere canciones basándose en el historial de escucha del usuario', correctRisk: 'minimo', explanation: 'Los sistemas de recomendación de contenido son de riesgo mínimo: no afectan a derechos fundamentales.' },
];

const riskColors: Record<RiskLevel, { bg: string; text: string; border: string; label: string }> = {
  inaceptable: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-300', label: 'PROHIBIDO' },
  alto: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', label: 'Alto Riesgo' },
  limitado: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300', label: 'Riesgo Limitado' },
  minimo: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300', label: 'Riesgo Mínimo' }
};

export default function Module7AIActClassifier() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<RiskLevel | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [shuffled, setShuffled] = useState<AISystem[]>([]);

  const start = () => {
    setShuffled([...aiSystems].sort(() => Math.random() - 0.5).slice(0, 8));
    setStarted(true);
  };

  const handleSelect = (risk: RiskLevel) => {
    if (answered) return;
    setSelected(risk);
    setAnswered(true);
    if (risk === shuffled[currentIdx].correctRisk) setScore(s => s + 1);
  };

  const next = () => {
    if (currentIdx + 1 < shuffled.length) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setShowResult(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center shadow-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-purple-900">Clasificador AI Act</CardTitle>
              <p className="text-sm text-purple-700">Clasifica sistemas de IA según su nivel de riesgo</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-800">
            Eres regulador europeo. Se te presentan sistemas de IA y debes clasificarlos en las 4 categorías de riesgo del AI Act: <strong>Inaceptable</strong> (prohibido), <strong>Alto</strong>, <strong>Limitado</strong> o <strong>Mínimo</strong>.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(['inaceptable', 'alto', 'limitado', 'minimo'] as RiskLevel[]).map(risk => (
              <div key={risk} className={`p-2 rounded-lg border ${riskColors[risk].border} ${riskColors[risk].bg}`}>
                <p className={`text-xs font-bold ${riskColors[risk].text}`}>{riskColors[risk].label}</p>
              </div>
            ))}
          </div>
          <Button onClick={start} className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
            <Scale className="h-4 w-4 mr-2" /> Comenzar clasificación
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-purple-900">
            {pct >= 80 ? '¡Regulador experto!' : pct >= 60 ? '¡Buena clasificación!' : 'Repasa el AI Act'}
          </h3>
          <p className="text-4xl font-bold text-purple-600">{score}/{shuffled.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <Button onClick={reset} variant="outline" className="border-purple-300">
            <RefreshCw className="h-4 w-4 mr-2" /> Jugar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const sys = shuffled[currentIdx];

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Sistema {currentIdx + 1}/{shuffled.length}
          </Badge>
          <span className="text-sm text-purple-600 font-medium">Puntos: {score}</span>
        </div>
        <Progress value={((currentIdx + 1) / shuffled.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-bold text-purple-900">{sys.name}</h3>
        <p className="text-sm text-purple-800 bg-purple-50 p-3 rounded-lg border border-purple-200">{sys.description}</p>
        <p className="text-sm font-semibold text-purple-800">¿Qué nivel de riesgo tiene según el AI Act?</p>
        <div className="grid grid-cols-2 gap-2">
          {(['inaceptable', 'alto', 'limitado', 'minimo'] as RiskLevel[]).map(risk => {
            const colors = riskColors[risk];
            const isCorrect = risk === sys.correctRisk;
            const isSelected = risk === selected;
            return (
              <button
                key={risk}
                onClick={() => handleSelect(risk)}
                disabled={answered}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  !answered
                    ? `${colors.border} hover:shadow-md cursor-pointer ${colors.bg}`
                    : isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-slate-200 opacity-50'
                }`}
              >
                <span className={`text-sm font-bold ${answered && isCorrect ? 'text-green-700' : answered && isSelected ? 'text-red-700' : colors.text}`}>
                  {answered && isCorrect && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                  {answered && isSelected && !isCorrect && <XCircle className="h-4 w-4 inline mr-1" />}
                  {colors.label}
                </span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${riskColors[sys.correctRisk].border} ${riskColors[sys.correctRisk].bg}`}>
              <p className={`text-xs font-bold ${riskColors[sys.correctRisk].text}`}>
                {sys.correctRisk === 'inaceptable' && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                Clasificación correcta: {riskColors[sys.correctRisk].label}
              </p>
              <p className="text-xs text-slate-700 mt-1">{sys.explanation}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={next} className="bg-purple-500 hover:bg-purple-600">
                {currentIdx + 1 < shuffled.length ? 'Siguiente sistema' : 'Ver resultados'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
