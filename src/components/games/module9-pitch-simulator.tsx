'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Presentation, CheckCircle2, RotateCcw, Target, AlertCircle, XCircle } from 'lucide-react';

interface PitchSlide {
  id: string;
  title: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const pitchDeck: PitchSlide[] = [
  {
    id: 'problem',
    title: 'Slide 1: El Problema (Pain Point)',
    options: [
      {
        id: 'a',
        text: 'Nuestros competidores usan IA y nosotros no. Nos estamos quedando atrás tecnológicamente.',
        isCorrect: false,
        feedback: 'Demasiado genérico. "Usar IA" no es un objetivo de negocio. FOMO (Fear Of Missing Out) no justifica la inversión.'
      },
      {
        id: 'b',
        text: 'El equipo de atención al cliente dedica el 45% de su tiempo a responder preguntas repetitivas, causando un tiempo medio de espera de 24 horas y perdiendo ventas.',
        isCorrect: true,
        feedback: '¡Perfecto! Identificas un problema medible, específico y que afecta al negocio (coste y pérdida de ventas).'
      },
      {
        id: 'c',
        text: 'Los modelos LLM como GPT-4 son muy avanzados y podemos integrarlos por API.',
        isCorrect: false,
        feedback: 'Eso es tecnología, no un problema. Al CEO le importa el problema que resuelves, no la herramienta que usas.'
      }
    ]
  },
  {
    id: 'solution',
    title: 'Slide 2: La Solución (The Solution)',
    options: [
      {
        id: 'a',
        text: 'Implementaremos un Asistente Virtual conversacional con IA (RAG) conectado a nuestra base de conocimientos, capaz de resolver el 80% de las consultas frecuentes al instante.',
        isCorrect: true,
        feedback: '¡Excelente! Explicas QUÉ vas a hacer y el IMPACTO esperado de forma clara y directa.'
      },
      {
        id: 'b',
        text: 'Vamos a construir nuestra propia red neuronal desde cero entrenando un modelo de 7 billones de parámetros en servidores locales.',
        isCorrect: false,
        feedback: 'Sobredimensionado (Over-engineering). Construir un modelo desde cero para soporte es innecesario, costoso y muy arriesgado.'
      },
      {
        id: 'c',
        text: 'Pondremos ChatGPT a disposición de todos los empleados para que sean más rápidos.',
        isCorrect: false,
        feedback: 'Solución vaga. No soluciona el problema de atención al cliente y crea riesgos de privacidad de datos.'
      }
    ]
  },
  {
    id: 'roi',
    title: 'Slide 3: ROI y Viabilidad (Business Case)',
    options: [
      {
        id: 'a',
        text: 'El proyecto costará 15.000€ y reducirá las horas extra del equipo en 4.000€/mes. Retorno de inversión en 4 meses. Riesgo técnico bajo porque usamos plataformas No-Code maduras.',
        isCorrect: true,
        feedback: '¡Genial! Presentas costes claros, ahorro cuantificable, tiempo de retorno (Payback) y análisis de riesgo.'
      },
      {
        id: 'b',
        text: 'No sabemos exactamente cuánto costará porque la IA es impredecible, pero seguro que generaremos millones en el futuro.',
        isCorrect: false,
        feedback: 'Ningún comité de dirección aprobará un proyecto sin una estimación de costes y sin un ROI proyectado creíble.'
      },
      {
        id: 'c',
        text: 'Costará 50.000€ y despediremos a la mitad del equipo de atención al cliente en un mes.',
        isCorrect: false,
        feedback: 'Irrealista y destructivo. La IA aumentada (AI augmentation) debe potenciar al equipo, no reemplazarlo de la noche a la mañana, causando un desastre cultural.'
      }
    ]
  }
];

export default function Module9PitchSimulator() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentSlide = pitchDeck[currentSlideIndex];

  const handleSelectOption = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    const option = currentSlide.options.find(o => o.id === selectedOption);
    if (option?.isCorrect) {
      setScore(s => s + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentSlideIndex < pitchDeck.length - 1) {
      setCurrentSlideIndex(i => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentSlideIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const isSuccess = score === pitchDeck.length;
    return (
      <Card className={`border ${isSuccess ? 'border-orange-200' : 'border-amber-200'} bg-white`}>
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className={`h-16 w-16 rounded-full ${isSuccess ? 'bg-orange-100' : 'bg-amber-100'} flex items-center justify-center mb-4`}>
            {isSuccess ? <Target className="h-8 w-8 text-orange-600" /> : <AlertCircle className="h-8 w-8 text-amber-600" />}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {isSuccess ? '¡Proyecto Aprobado!' : 'Proyecto Rechazado'}
          </h3>
          <p className="text-slate-600 mb-6">
            Has seleccionado {score} de {pitchDeck.length} argumentos correctos.
            {isSuccess 
              ? ' El Comité de Dirección ha entendido el problema, la solución técnica y el valor de negocio. ¡Te han dado el presupuesto!' 
              : ' Necesitas pulir tu mensaje. Enfócate más en el negocio y menos en el "hype" tecnológico.'}
          </p>
          <Button onClick={resetGame} className="bg-orange-600 hover:bg-orange-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Volver a presentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-medium text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-100">
        <span>Progreso: {currentSlideIndex + 1} / {pitchDeck.length}</span>
        <span>Aciertos: {score}</span>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Presentation className="h-5 w-5 text-orange-500" />
            {currentSlide.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-slate-500 text-sm mb-4">¿Qué argumento incluirías en esta diapositiva para convencer al CEO?</p>
          
          <div className="space-y-3">
            {currentSlide.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedOption === option.id && !showFeedback
                    ? 'border-orange-500 bg-orange-50 shadow-md ring-1 ring-orange-500'
                    : showFeedback && option.id === selectedOption && option.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : showFeedback && option.id === selectedOption && !option.isCorrect
                    ? 'border-red-500 bg-red-50'
                    : showFeedback && option.isCorrect
                    ? 'border-green-500 bg-green-50/50 opacity-70'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    selectedOption === option.id ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                  }`}>
                    {selectedOption === option.id && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className={`text-sm ${
                    selectedOption === option.id && !showFeedback ? 'text-orange-900 font-medium' : 'text-slate-700'
                  }`}>
                    {option.text}
                  </span>
                </div>

                {showFeedback && selectedOption === option.id && (
                  <div className={`mt-3 p-3 rounded-lg text-sm flex items-start gap-2 ${
                    option.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {option.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p>{option.feedback}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            {!showFeedback ? (
              <Button 
                onClick={handleConfirm} 
                disabled={!selectedOption}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Elegir Argumento
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {currentSlideIndex < pitchDeck.length - 1 ? 'Siguiente Slide' : 'Ver Resultado'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
