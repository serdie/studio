'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Film, CheckCircle2, XCircle, RotateCcw, Award, ClipboardList, Play } from 'lucide-react';

interface Phase {
  id: number;
  name: string;
  description: string;
  deliverables: string[];
  icon: string;
}

const phases: Phase[] = [
  {
    id: 1,
    name: 'Briefing',
    description: 'Definir objetivo, audiencia y mensaje clave',
    deliverables: ['Objetivo claro', 'Audiencia definida', 'Mensaje principal', 'Tono de voz'],
    icon: '📋'
  },
  {
    id: 2,
    name: 'Guion',
    description: 'Escribir el texto completo con timing',
    deliverables: ['Texto completo', 'Duración estimada', 'Pausas marcadas', 'Énfasis indicados'],
    icon: '📝'
  },
  {
    id: 3,
    name: 'Storyboard',
    description: 'Planificar escenas y visuales',
    deliverables: ['6-8 escenas', 'Descripción visual', 'Transiciones', 'Elementos en pantalla'],
    icon: '🎬'
  },
  {
    id: 4,
    name: 'Voz / TTS',
    description: 'Generar audio con voz sintética',
    deliverables: ['Audio generado', 'Voz seleccionada', 'Pronunciación verificada', 'Timing ajustado'],
    icon: '🎙️'
  },
  {
    id: 5,
    name: 'Avatar',
    description: 'Seleccionar avatar y sincronizar labios',
    deliverables: ['Avatar seleccionado', 'Lip-sync generado', 'Gestos configurados', 'Vestimenta definida'],
    icon: '👤'
  },
  {
    id: 6,
    name: 'Edición',
    description: 'Añadir rótulos, música y B-roll',
    deliverables: ['Rótulos añadidos', 'Música de fondo', 'B-roll insertado', 'Transiciones aplicadas'],
    icon: '✂️'
  },
  {
    id: 7,
    name: 'QA',
    description: 'Control de calidad del vídeo',
    deliverables: ['Audio verificado', 'Lip-sync revisado', 'Subtítulos corregidos', 'Checklist completado'],
    icon: '✅'
  },
  {
    id: 8,
    name: 'Publicación',
    description: 'Exportar y distribuir el vídeo',
    deliverables: ['Vídeo exportado', 'Formatos generados', 'Subtítulos incrustados', 'Publicado en canal'],
    icon: '🚀'
  }
];

interface DragItem {
  phase: Phase;
  isCorrect: boolean;
}

export default function PipelineSimulator() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [availablePhases, setAvailablePhases] = useState<Phase[]>([]);
  const [placedPhases, setPlacedPhases] = useState<(Phase | null)[]>([null, null, null, null, null, null, null, null]);
  const [attempts, setAttempts] = useState(0);
  const [correctPlacements, setCorrectPlacements] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showHint, setShowHint] = useState(false);

  const startGame = () => {
    const shuffled = [...phases].sort(() => Math.random() - 0.5);
    setAvailablePhases(shuffled);
    setPlacedPhases([null, null, null, null, null, null, null, null]);
    setGameState('playing');
    setAttempts(0);
    setCorrectPlacements(0);
    setFeedback('');
    setShowHint(false);
  };

  const handlePhaseClick = (phaseIndex: number) => {
    if (gameState !== 'playing') return;

    const phase = availablePhases[phaseIndex];
    if (!phase) return;

    // Find first empty slot
    const emptySlotIndex = placedPhases.findIndex(p => p === null);
    if (emptySlotIndex === -1) return;

    // Place the phase
    const newPlacedPhases = [...placedPhases];
    newPlacedPhases[emptySlotIndex] = phase;
    setPlacedPhases(newPlacedPhases);

    // Remove from available
    const newAvailablePhases = availablePhases.filter((_, idx) => idx !== phaseIndex);
    setAvailablePhases(newAvailablePhases);

    // Check if correct position
    const isCorrect = phase.id === emptySlotIndex + 1;
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectPlacements(prev => prev + 1);
      setFeedback(`✅ ¡Correcto! ${phase.name} va en la posición ${emptySlotIndex + 1}`);
    } else {
      setFeedback(`❌ Incorrecto. ${phase.name} debería ir en otra posición.`);
    }

    // Check if completed
    if (newAvailablePhases.length === 0) {
      setGameState('completed');
    }
  };

  const handleRemovePhase = (slotIndex: number) => {
    if (gameState !== 'playing') return;
    
    const phase = placedPhases[slotIndex];
    if (!phase) return;

    // Remove from placed
    const newPlacedPhases = [...placedPhases];
    newPlacedPhases[slotIndex] = null;
    setPlacedPhases(newPlacedPhases);

    // Add back to available
    setAvailablePhases([...availablePhases, phase]);
    setFeedback('');
  };

  const resetGame = () => {
    setGameState('intro');
    setAvailablePhases([]);
    setPlacedPhases([null, null, null, null, null, null, null, null]);
    setAttempts(0);
    setCorrectPlacements(0);
    setFeedback('');
    setShowHint(false);
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
            <Film className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-900">🎬 Pipeline Simulator</h3>
          <p className="text-blue-700 mt-2">
            Ordena las 8 fases del pipeline de producción de vídeo con avatar
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">📋 Instrucciones:</h4>
            <ol className="space-y-2 text-blue-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                Haz clic en las fases desordenadas para colocarlas en el pipeline
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                Colócalas en el orden correcto: desde Briefing hasta Publicación
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                Recibe feedback inmediato para aprender el orden correcto
              </li>
            </ol>
          </div>

          <Button onClick={startGame} className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg">
            <Play className="h-5 w-5 mr-2" />
            Comenzar el Juego
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const perfectScore = correctPlacements === 8;
    const goodScore = correctPlacements >= 6;

    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-blue-900">
            {perfectScore ? '🏆 ¡Perfecto!' : goodScore ? '🎉 ¡Muy Bien!' : '📚 ¡Buen Intento!'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {perfectScore ? '🌟' : goodScore ? '⭐' : '📖'}
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-blue-900">
                Aciertos: {correctPlacements} / 8
              </p>
              <p className="text-lg text-blue-700">
                Intentos: {attempts}
              </p>
            </div>
            <p className="text-blue-800">
              {perfectScore
                ? '¡Excelente! Conoces perfectamente el pipeline de producción.'
                : goodScore
                ? '¡Bien hecho! Tienes una buena base del pipeline.'
                : 'Sigue practicando para memorizar el orden del pipeline.'}
            </p>
          </div>

          <div className="bg-white/70 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3">📊 Orden Correcto:</h4>
            <div className="grid grid-cols-4 gap-2">
              {phases.map((phase, idx) => (
                <div key={idx} className="text-center text-xs">
                  <div className="text-2xl mb-1">{phase.icon}</div>
                  <div className="font-semibold text-blue-800">{phase.name}</div>
                  <div className="text-blue-600">Paso {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing Screen
  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-500">
              <ClipboardList className="h-3 w-3 mr-1" />
              Pipeline de Producción
            </Badge>
            <span className="text-sm text-blue-700">
              Colocadas: {8 - availablePhases.length} / 8
            </span>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {correctPlacements}
            </Badge>
            <Badge variant="secondary">
              Intentos: {attempts}
            </Badge>
          </div>
        </div>
        {feedback && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-semibold ${
            feedback.includes('Correcto') 
              ? 'bg-green-100 text-green-900 border border-green-300' 
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}>
            {feedback}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Placed Phases */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-bold text-blue-900">Pipeline (haz clic para quitar):</h4>
            {showHint && (
              <Badge variant="outline" className="text-xs">💡 Pista activa</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {placedPhases.map((phase, idx) => (
              <div
                key={idx}
                onClick={() => phase && handleRemovePhase(idx)}
                className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                  phase
                    ? phase.id === idx + 1
                      ? 'bg-green-100 border-green-500 cursor-pointer hover:bg-green-200'
                      : 'bg-amber-100 border-amber-500 cursor-pointer hover:bg-amber-200'
                    : 'bg-white border-dashed border-blue-300'
                }`}
              >
                {phase ? (
                  <>
                    <div className="text-3xl">{phase.icon}</div>
                    <div className="text-xs font-semibold text-center">{phase.name}</div>
                    <div className="text-xs text-blue-600">Pos {idx + 1}</div>
                  </>
                ) : (
                  <div className="text-2xl text-blue-300">{idx + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Phases */}
        <div>
          <h4 className="font-bold text-blue-900 mb-3">Fases disponibles (haz clic para colocar):</h4>
          <div className="grid grid-cols-4 gap-2">
            {availablePhases.map((phase, idx) => (
              <Button
                key={idx}
                onClick={() => handlePhaseClick(idx)}
                variant="outline"
                className="h-24 flex flex-col gap-1 border-blue-300 hover:bg-blue-50 hover:border-blue-500"
              >
                <div className="text-3xl">{phase.icon}</div>
                <div className="text-xs font-semibold">{phase.name}</div>
                <div className="text-xs text-blue-600 line-clamp-2">{phase.description}</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Hint Button */}
        <Button
          onClick={() => setShowHint(!showHint)}
          variant="outline"
          className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          💡 {showHint ? 'Ocultar pista' : 'Mostrar pista'}
        </Button>

        {showHint && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>Orden correcto:</strong> Briefing → Guion → Storyboard → Voz/TTS → Avatar → Edición → QA → Publicación
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
