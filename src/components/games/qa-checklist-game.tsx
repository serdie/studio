'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle, RotateCcw, Award, Eye } from 'lucide-react';

interface VideoError {
  id: number;
  category: 'audio' | 'lip-sync' | 'visuales' | 'subtitulos' | 'coherencia';
  description: string;
  severity: 'leve' | 'moderado' | 'grave';
  explanation: string;
}

const videoErrors: VideoError[] = [
  {
    id: 1,
    category: 'audio',
    description: 'Volumen demasiado bajo, apenas se escucha',
    severity: 'grave',
    explanation: 'El volumen debe estar entre -6dB y -3dB para ser audible claramente.'
  },
  {
    id: 2,
    category: 'lip-sync',
    description: 'Desfase de 0.5s entre audio y movimiento de labios',
    severity: 'grave',
    explanation: 'El lip-sync debe tener un desfase máximo de 0.2s. Más de 0.3s se nota claramente.'
  },
  {
    id: 3,
    category: 'subtitulos',
    description: 'Subtítulos con 60 caracteres por línea',
    severity: 'moderado',
    explanation: 'El máximo recomendado es 42 caracteres por línea para lectura cómoda.'
  },
  {
    id: 4,
    category: 'visuales',
    description: 'Texto en pantalla con tipografía de 12px',
    severity: 'grave',
    explanation: 'El tamaño mínimo para móvil es 16px. 12px es ilegible en pantallas pequeñas.'
  },
  {
    id: 5,
    category: 'audio',
    description: 'Ruido de fondo audible (hiss constante)',
    severity: 'moderado',
    explanation: 'El audio debe estar limpio. Usa reducción de ruido o regenera el audio.'
  },
  {
    id: 6,
    category: 'coherencia',
    description: 'Cambio de fondo entre escenas sin transición',
    severity: 'leve',
    explanation: 'Los cambios de fondo deben tener transición suave o justificarse narrativamente.'
  },
  {
    id: 7,
    category: 'subtitulos',
    description: 'Faltas de ortografía en subtítulos',
    severity: 'grave',
    explanation: 'Los errores ortográficos dañan la credibilidad. Revisa siempre antes de publicar.'
  },
  {
    id: 8,
    category: 'lip-sync',
    description: 'Fonemas incorrectos en palabras clave',
    severity: 'moderado',
    explanation: 'Palabras importantes deben tener sincronización perfecta. Regenera si es necesario.'
  },
  {
    id: 9,
    category: 'visuales',
    description: 'Avatar cortado en el encuadre (parte de la cabeza fuera)',
    severity: 'grave',
    explanation: 'El avatar debe estar completamente visible con margen de seguridad.'
  },
  {
    id: 10,
    category: 'coherencia',
    description: 'Tipografías diferentes entre escenas',
    severity: 'leve',
    explanation: 'Mantén consistencia tipográfica en todo el vídeo para profesionalidad.'
  }
];

export default function QAChecklistGame() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentError, setCurrentError] = useState(0);
  const [identified, setIdentified] = useState<number[]>([]);
  const [missed, setMissed] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');

  const startGame = () => {
    setGameState('playing');
    setCurrentError(0);
    setIdentified([]);
    setMissed([]);
    setShowFeedback(false);
    setSelectedSeverity('');
  };

  const handleIdentify = (severity: 'leve' | 'moderado' | 'grave') => {
    setSelectedSeverity(severity);
    setShowFeedback(true);
    
    const error = videoErrors[currentError];
    if (severity === error.severity) {
      setIdentified(prev => [...prev, error.id]);
    } else {
      setMissed(prev => [...prev, error.id]);
    }
  };

  const nextError = () => {
    if (currentError < videoErrors.length - 1) {
      setCurrentError(prev => prev + 1);
      setShowFeedback(false);
      setSelectedSeverity('');
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentError(0);
    setIdentified([]);
    setMissed([]);
    setShowFeedback(false);
    setSelectedSeverity('');
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-4">
            <Eye className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900">✅ QA Checklist Game</h3>
          <p className="text-amber-700 mt-2">
            Detecta errores en vídeos con avatar y clasifícalos por gravedad
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 mb-3">📋 Instrucciones:</h4>
            <ol className="space-y-2 text-amber-800 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                Lee cada error detectado en un vídeo
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                Clasifícalo como: Leve, Moderado o Grave
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                Recibe explicación de por qué es ese nivel de gravedad
              </li>
            </ol>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl mb-1">🟢</div>
              <div className="text-xs font-semibold text-green-800">Leve</div>
              <div className="text-xs text-green-600">Mejorable</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl mb-1">🟡</div>
              <div className="text-xs font-semibold text-yellow-800">Moderado</div>
              <div className="text-xs text-yellow-600">Importante</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl mb-1">🔴</div>
              <div className="text-xs font-semibold text-red-800">Grave</div>
              <div className="text-xs text-red-600">Crítico</div>
            </div>
          </div>

          <Button onClick={startGame} className="w-full bg-amber-600 hover:bg-amber-700 h-14 text-lg">
            <Eye className="h-5 w-5 mr-2" />
            Comenzar Revisión QA
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const score = identified.length;
    const percentage = (score / videoErrors.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-amber-900">
            {passed ? '🎉 ¡Revisión Completada!' : '📚 Sigue Practicando QA'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {passed ? '🏆' : '📖'}
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-amber-900">
                Aciertos: {score} / {videoErrors.length}
              </p>
              <p className="text-lg text-amber-700">
                {percentage.toFixed(0)}% de precisión
              </p>
            </div>
            <p className="text-amber-800">
              {passed
                ? '¡Excelente! Tienes ojo clínico para detectar errores de calidad.'
                : 'Repasa el checklist de QA y vuelve a intentarlo.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-bold text-green-900">Identificados</span>
              </div>
              <div className="text-2xl font-bold text-green-700">{identified.length}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-900">Fallados</span>
              </div>
              <div className="text-2xl font-bold text-red-700">{missed.length}</div>
            </div>
          </div>

          <Button onClick={resetGame} className="w-full bg-amber-600 hover:bg-amber-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Volver a Revisar
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing Screen
  const error = videoErrors[currentError];

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-amber-500">
            <Eye className="h-3 w-3 mr-1" />
            Error {currentError + 1} de {videoErrors.length}
          </Badge>
          <div className="flex gap-2">
            <Badge className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {identified.length}
            </Badge>
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              {missed.length}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-2">Error Detectado:</h4>
              <p className="text-amber-800">{error.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge className={
              error.category === 'audio' ? 'bg-blue-500' :
              error.category === 'lip-sync' ? 'bg-purple-500' :
              error.category === 'visuales' ? 'bg-pink-500' :
              error.category === 'subtitulos' ? 'bg-green-500' :
              'bg-orange-500'
            }>
              {error.category.toUpperCase()}
            </Badge>
          </div>
        </div>

        {!showFeedback ? (
          <div className="space-y-3">
            <p className="font-semibold text-amber-900 text-center">
              ¿Qué gravedad tiene este error?
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleIdentify('leve')}
                className="h-20 flex flex-col gap-1 bg-green-600 hover:bg-green-700"
              >
                <span className="text-2xl">🟢</span>
                <span className="text-sm font-semibold">Leve</span>
                <span className="text-xs opacity-80">Mejorable</span>
              </Button>
              <Button
                onClick={() => handleIdentify('moderado')}
                className="h-20 flex flex-col gap-1 bg-yellow-600 hover:bg-yellow-700"
              >
                <span className="text-2xl">🟡</span>
                <span className="text-sm font-semibold">Moderado</span>
                <span className="text-xs opacity-80">Importante</span>
              </Button>
              <Button
                onClick={() => handleIdentify('grave')}
                className="h-20 flex flex-col gap-1 bg-red-600 hover:bg-red-700"
              >
                <span className="text-2xl">🔴</span>
                <span className="text-sm font-semibold">Grave</span>
                <span className="text-xs opacity-80">Crítico</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`p-4 rounded-lg border-2 ${
              selectedSeverity === error.severity
                ? 'bg-green-100 border-green-300'
                : 'bg-red-100 border-red-300'
            }`}>
              <div className="flex items-start gap-3">
                {selectedSeverity === error.severity ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                )}
                <div>
                  <p className="font-bold text-amber-900 mb-2">
                    {selectedSeverity === error.severity ? '✅ ¡Correcto!' : '❌ Incorrecto'}
                  </p>
                  <p className="text-amber-800 text-sm mb-2">
                    <strong>Gravedad:</strong> {error.severity.toUpperCase()}
                  </p>
                  <p className="text-amber-800 text-sm">
                    <strong>Explicación:</strong> {error.explanation}
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={nextError} className="w-full bg-amber-600 hover:bg-amber-700">
              {currentError < videoErrors.length - 1
                ? 'Siguiente Error →'
                : 'Ver Resultados Finales'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
