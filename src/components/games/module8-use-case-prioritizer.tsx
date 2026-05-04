'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, CheckCircle2, RotateCcw, TrendingUp, AlertTriangle, Zap, MinusCircle } from 'lucide-react';

type Quadrant = 'quick-win' | 'strategic' | 'low-value' | 'high-risk';

interface UseCase {
  id: string;
  text: string;
  correctQuadrant: Quadrant;
  explanation: string;
}

const useCases: UseCase[] = [
  {
    id: 'uc1',
    text: 'Chatbot interno para responder preguntas frecuentes de RRHH basándose en el manual del empleado.',
    correctQuadrant: 'quick-win',
    explanation: 'Quick Win: Alto impacto (ahorra mucho tiempo a RRHH) y bajo esfuerzo (implementación fácil con RAG y documentos existentes).'
  },
  {
    id: 'uc2',
    text: 'Sistema de IA predictivo para reestructurar completamente la cadena de suministro global y proveedores.',
    correctQuadrant: 'strategic',
    explanation: 'Estratégico: Alto impacto en el negocio pero requiere un enorme esfuerzo técnico, integración de datos e inversión.'
  },
  {
    id: 'uc3',
    text: 'Generar felicitaciones de cumpleaños automáticas con rimas para cada empleado usando GPT-4.',
    correctQuadrant: 'low-value',
    explanation: 'Bajo Valor: Bajo esfuerzo pero impacto casi nulo en los objetivos de la empresa.'
  },
  {
    id: 'uc4',
    text: 'IA autónoma que toma decisiones finales de despido basándose en métricas de rendimiento en tiempo real.',
    correctQuadrant: 'high-risk',
    explanation: 'Alto Riesgo (Evitar): Puede parecer útil, pero el esfuerzo legal, ético y de gestión del cambio es extremo, y los riesgos superan el valor.'
  },
  {
    id: 'uc5',
    text: 'Automatización de clasificación y extracción de datos de facturas en PDF recibidas por email.',
    correctQuadrant: 'quick-win',
    explanation: 'Quick Win: Alto impacto en eficiencia contable y bajo esfuerzo con herramientas No-Code actuales (Make + IA).'
  }
];

export default function Module8UseCasePrioritizer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuadrant, setSelectedQuadrant] = useState<Quadrant | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentCase = useCases[currentIndex];

  const handleSelect = (quadrant: Quadrant) => {
    if (showFeedback) return;
    setSelectedQuadrant(quadrant);
    setShowFeedback(true);
    if (quadrant === currentCase.correctQuadrant) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < useCases.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedQuadrant(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedQuadrant(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <Card className="border-indigo-200 bg-white">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Evaluación Completada</h3>
          <p className="text-slate-600 mb-6">
            Has clasificado correctamente {score} de {useCases.length} casos de uso.
          </p>
          <Button onClick={resetGame} className="bg-indigo-600 hover:bg-indigo-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Priorizar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-medium text-indigo-700 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
        <span>Caso {currentIndex + 1} de {useCases.length}</span>
        <span>Puntuación: {score}</span>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-indigo-500" />
            Evalúa el Caso de Uso
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-4 mb-6 bg-white border-2 border-dashed border-indigo-200 rounded-xl text-center shadow-sm">
            <p className="text-lg font-medium text-slate-700">"{currentCase.text}"</p>
          </div>

          {!showFeedback ? (
            <div>
              <p className="text-sm text-center text-slate-500 mb-4">¿En qué cuadrante de la matriz Impacto vs Esfuerzo lo ubicarías?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSelect('quick-win')}
                  className="p-4 rounded-xl border border-slate-200 hover:border-green-400 hover:bg-green-50 transition-all flex flex-col items-center gap-2"
                >
                  <Zap className="h-6 w-6 text-green-500" />
                  <span className="font-semibold text-slate-700">Quick Win</span>
                  <span className="text-xs text-slate-500 text-center">(Alto Impacto, Bajo Esfuerzo)</span>
                </button>
                <button
                  onClick={() => handleSelect('strategic')}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center gap-2"
                >
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold text-slate-700 text-center">Proyecto Estratégico</span>
                  <span className="text-xs text-slate-500 text-center">(Alto Impacto, Alto Esfuerzo)</span>
                </button>
                <button
                  onClick={() => handleSelect('low-value')}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-100 transition-all flex flex-col items-center gap-2"
                >
                  <MinusCircle className="h-6 w-6 text-slate-500" />
                  <span className="font-semibold text-slate-700 text-center">Bajo Valor</span>
                  <span className="text-xs text-slate-500 text-center">(Bajo Impacto, Bajo Esfuerzo)</span>
                </button>
                <button
                  onClick={() => handleSelect('high-risk')}
                  className="p-4 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50 transition-all flex flex-col items-center gap-2"
                >
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <span className="font-semibold text-slate-700 text-center">Alto Riesgo</span>
                  <span className="text-xs text-slate-500 text-center">(Bajo Impacto, Alto Esfuerzo)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-5 rounded-xl border ${selectedQuadrant === currentCase.correctQuadrant ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedQuadrant === currentCase.correctQuadrant ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
                <h4 className={`font-semibold ${selectedQuadrant === currentCase.correctQuadrant ? 'text-green-800' : 'text-red-800'}`}>
                  {selectedQuadrant === currentCase.correctQuadrant ? '¡Decisión Correcta!' : 'Decisión Incorrecta'}
                </h4>
              </div>
              <p className="text-slate-700 mb-4">{currentCase.explanation}</p>
              <Button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Siguiente Caso
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
