'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, RefreshCw, Layers, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Example {
  id: string;
  text: string;
  type: 'reglas' | 'ml' | 'dl' | 'generativa';
  explanation: string;
}

const examples: Example[] = [
  {
    id: "e1",
    text: "Semáforo que cambia según un horario fijo.",
    type: "reglas",
    explanation: "Solo sigue un horario programado (reglas fijas), no aprende de datos."
  },
  {
    id: "e2",
    text: "Filtro de spam que aprende de tus correos marcados.",
    type: "ml",
    explanation: "Es Machine Learning clásico: aprende a partir de ejemplos etiquetados (spam / no spam)."
  },
  {
    id: "e3",
    text: "Sistema que reconoce objetos en imágenes de una cámara.",
    type: "dl",
    explanation: "Reconocer objetos en imágenes suele requerir redes neuronales profundas de visión (Deep Learning)."
  },
  {
    id: "e4",
    text: "Chat tipo ChatGPT que redacta correos y resúmenes.",
    type: "generativa",
    explanation: "Es IA generativa / LLM: genera texto nuevo a partir de prompts."
  },
  {
    id: "e5",
    text: "Regla en Excel: si el stock es menor de 10, mostrar alerta.",
    type: "reglas",
    explanation: "Es lógica basada en reglas (if/then), sin aprendizaje."
  },
  {
    id: "e6",
    text: "Modelo que predice la demanda de un producto con datos históricos en tabla.",
    type: "ml",
    explanation: "Predicciones sobre datos tabulares encajan en Machine Learning clásico (regresión/clasificación)."
  },
  {
    id: "e7",
    text: "Sistema que transcribe audio a texto y detecta palabras clave.",
    type: "dl",
    explanation: "El reconocimiento de voz moderno usa redes neuronales profundas (Deep Learning)."
  },
  {
    id: "e8",
    text: "Herramienta que genera imágenes a partir de texto (tipo DALL·E, Midjourney).",
    type: "generativa",
    explanation: "Genera contenido nuevo (imágenes) a partir de texto, típico de IA generativa."
  }
];

const categories = {
  reglas: {
    title: 'IA basada en Reglas / Automatización',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    icon: '⚙️'
  },
  ml: {
    title: 'Machine Learning Clásico',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-300',
    icon: '📊'
  },
  dl: {
    title: 'Deep Learning',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    icon: '🧠'
  },
  generativa: {
    title: 'IA Generativa / LLMs',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    icon: '✨'
  }
};

export default function IAClassificationGame() {
  const [pool, setPool] = useState<Example[]>(examples);
  const [columns, setColumns] = useState<Record<string, Example[]>>({
    reglas: [],
    ml: [],
    dl: [],
    generativa: []
  });
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<Example | null>(null);
  const [dragSource, setDragSource] = useState<'pool' | string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: Example, source: 'pool' | string) => {
    setDraggedItem(item);
    setDragSource(source);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetType: 'pool' | string) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    if (targetType === 'pool') {
      // Return to pool
      if (!pool.find(ex => ex.id === draggedItem.id)) {
        setPool([...pool, draggedItem]);
        setColumns(prev => ({
          ...prev,
          [dragSource as string]: prev[dragSource as string].filter(ex => ex.id !== draggedItem.id)
        }));
      }
    } else {
      // Move to column
      const targetColumn = columns[targetType];
      if (!targetColumn.find(ex => ex.id === draggedItem.id)) {
        setColumns(prev => ({
          ...prev,
          [targetType]: [...prev[targetType], draggedItem]
        }));
        
        if (dragSource === 'pool') {
          setPool(pool.filter(ex => ex.id !== draggedItem.id));
        } else {
          setColumns(prev => ({
            ...prev,
            [dragSource as string]: prev[dragSource as string].filter(ex => ex.id !== draggedItem.id)
          }));
        }
      }
    }
    
    setDraggedItem(null);
    setDragSource(null);
    
    if (showResults) {
      setShowResults(false);
      setScore(null);
    }
  };

  const handleCardClick = (item: Example, source: 'pool' | string) => {
    if (showResults) return;
    
    if (source === 'pool') {
      // Move to first empty column or create new
      const firstEmpty = Object.keys(columns).find(key => columns[key].length === 0) || 'reglas';
      setColumns(prev => ({
        ...prev,
        [firstEmpty]: [...prev[firstEmpty], item]
      }));
      setPool(pool.filter(ex => ex.id !== item.id));
    } else {
      // Return to pool
      setPool([...pool, item]);
      setColumns(prev => ({
        ...prev,
        [source]: prev[source].filter(ex => ex.id !== item.id)
      }));
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    
    Object.entries(columns).forEach(([type, items]) => {
      items.forEach(item => {
        const correctExample = examples.find(ex => ex.id === item.id);
        if (correctExample && correctExample.type === type) {
          correctCount++;
        }
      });
    });
    
    setScore(correctCount);
    setShowResults(true);
  };

  const resetGame = () => {
    setPool(examples);
    setColumns({
      reglas: [],
      ml: [],
      dl: [],
      generativa: []
    });
    setShowResults(false);
    setScore(null);
  };

  const isCorrect = (item: Example, columnType: string) => {
    return showResults && item.type === columnType;
  };

  const isIncorrect = (item: Example, columnType: string) => {
    return showResults && item.type !== columnType;
  };

  const allPlaced = pool.length === 0 && Object.values(columns).flat().length === examples.length;

  return (
    <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-teal-200 flex items-center justify-center">
            <Layers className="h-6 w-6 text-teal-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-teal-900">🗂️ Clasifica los Ejemplos por Tipo de IA</h3>
            <p className="text-sm text-teal-700">Arrastra cada ejemplo a la columna correcta</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        {showResults && score !== null && (
          <div className={`p-4 rounded-lg text-center ${
            score >= 6 ? 'bg-green-100 border-2 border-green-300' :
            score >= 4 ? 'bg-yellow-100 border-2 border-yellow-300' :
            'bg-red-100 border-2 border-red-300'
          }`}>
            <p className="text-2xl font-bold">
              {score >= 6 ? '🎉' : score >= 4 ? '👍' : '📚'}
              {` ${score} de ${examples.length} correctas`}
            </p>
            <p className="text-sm mt-1">
              {score >= 6 ? '¡Excelente! Dominas los tipos de IA' :
               score >= 4 ? '¡Bien! Pero puedes mejorar' :
               'Sigue practicando para mejorar'}
            </p>
          </div>
        )}

        {/* Classification Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {Object.entries(categories).map(([type, config]) => (
            <Card 
              key={type}
              className={cn(
                'transition-all',
                config.lightColor,
                config.borderColor,
                'border-2'
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, type)}
            >
              <CardHeader className="py-2 px-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{config.icon}</span>
                  <h4 className="font-semibold text-sm text-slate-800">{config.title}</h4>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div 
                  className={cn(
                    'min-h-[100px] rounded-lg p-2 transition-all',
                    'border-2 border-dashed',
                    columns[type].length > 0 ? 'border-slate-300 bg-white' : 'border-slate-400 bg-slate-50'
                  )}
                >
                  {columns[type].length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-slate-400 text-sm">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Arrastra ejemplos aquí
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {columns[type].map((item) => (
                        <div
                          key={item.id}
                          draggable={!showResults}
                          onDragStart={(e) => handleDragStart(e, item, type)}
                          onClick={() => handleCardClick(item, type)}
                          className={cn(
                            'p-2 rounded-lg text-sm cursor-grab active:cursor-grabbing transition-all',
                            'border-2',
                            isCorrect(item, type) 
                              ? 'bg-green-100 border-green-400' 
                              : isIncorrect(item, type)
                              ? 'bg-red-100 border-red-400'
                              : 'bg-amber-50 border-amber-300 hover:shadow-md'
                          )}
                        >
                          <p className="text-slate-800">{item.text}</p>
                          {showResults && (
                            <div className="mt-2 flex items-start gap-2">
                              {isCorrect(item, type) ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                              )}
                              <p className="text-xs text-slate-600">{item.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cards Pool */}
        {pool.length > 0 && (
          <Card className="border-slate-300 bg-white">
            <CardHeader className="py-2 px-3">
              <h4 className="font-semibold text-sm text-slate-700">
                📦 Ejemplos para clasificar ({pool.length})
              </h4>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ScrollArea className="h-[200px]">
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'pool')}
                >
                  {pool.map((item) => (
                    <div
                      key={item.id}
                      draggable={!showResults}
                      onDragStart={(e) => handleDragStart(e, item, 'pool')}
                      onClick={() => handleCardClick(item, 'pool')}
                      className={cn(
                        'p-2 rounded-lg text-sm cursor-grab active:cursor-grabbing transition-all',
                        'bg-amber-50 border-2 border-amber-300 hover:shadow-md hover:bg-amber-100'
                      )}
                    >
                      <p className="text-slate-800">{item.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={checkAnswers}
            disabled={!allPlaced || showResults}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Corregir
          </Button>
          <Button
            onClick={resetGame}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-slate-600">
          <p>
            Clasificados: <strong>{Object.values(columns).flat().length}</strong> de <strong>{examples.length}</strong>
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="bg-teal-600 h-2 rounded-full transition-all"
              style={{ width: `${(Object.values(columns).flat().length / examples.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Instructions */}
        {!showResults && (
          <div className="text-xs text-slate-500 text-center">
            💡 Arrastra los ejemplos a la columna que mejor los describa. También puedes hacer clic para mover.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
