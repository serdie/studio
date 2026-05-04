'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

const dilemmas = [
  {
    id: 1,
    title: 'El algoritmo de selección de CVs',
    scenario: 'Tu empresa ha comprado un software de IA para filtrar currículums. Tras unos meses, notas que rechaza sistemáticamente a candidatos de ciertas universidades y zonas geográficas, a pesar de que tienen las calificaciones requeridas. El proveedor asegura que el sistema es un "black box" y no se puede modificar fácilmente. Necesitas contratar a 50 personas urgentemente.',
    options: [
      {
        id: 'a',
        text: 'Seguir usando el sistema por la urgencia, pero revisar manualmente el 10% de los descartes.',
        isCorrect: false,
        feedback: 'Inadecuado. Estás permitiendo un sesgo sistémico que podría ser ilegal y poco ético, incluso si revisas un pequeño porcentaje.'
      },
      {
        id: 'b',
        text: 'Pausar el uso del algoritmo, reportar el sesgo al proveedor exigiendo explicabilidad (XAI) o auditoría, y volver temporalmente al filtrado manual.',
        isCorrect: true,
        feedback: '¡Correcto! Prima la ética y la transparencia. Según normativas como la AI Act, los sistemas de RRHH son de "Alto Riesgo" y requieren supervisión humana y mitigación de sesgos.'
      },
      {
        id: 'c',
        text: 'Ignorar el patrón ya que el proveedor garantiza que la IA es imparcial matemáticamente.',
        isCorrect: false,
        feedback: 'Peligroso. "Imparcialidad matemática" no significa ausencia de sesgos en los datos de entrenamiento (Data Bias).'
      }
    ]
  },
  {
    id: 2,
    title: 'Chatbot de soporte que miente (Alucinación)',
    scenario: 'El nuevo chatbot de atención al cliente de tu e-commerce, basado en LLMs, se ha inventado una política de devoluciones muy generosa ante la pregunta de un cliente furioso. El cliente ha capturado la pantalla y exige que se cumpla lo que la IA le prometió.',
    options: [
      {
        id: 'a',
        text: 'Explicar que la IA se equivocó, no honrar la promesa y poner un disclaimer invisible en los términos y condiciones.',
        isCorrect: false,
        feedback: 'Mala gestión de crisis. Legalmente, la empresa suele ser responsable de las acciones de sus agentes automatizados ante los consumidores.'
      },
      {
        id: 'b',
        text: 'Honrar la promesa para este cliente, desactivar el bot temporalmente, e implementar barandillas (guardrails) y RAG estricto para evitar futuras alucinaciones.',
        isCorrect: true,
        feedback: '¡Excelente! Asumes la responsabilidad del fallo técnico (accountability), solucionas el caso particular y actúas para prevenirlo técnicamente mediante Guardrails y RAG.'
      },
      {
        id: 'c',
        text: 'Culpar públicamente a OpenAI/Anthropic por el fallo de su modelo y amenazar al cliente con acciones legales.',
        isCorrect: false,
        feedback: 'Terrible. Como integrador de la IA, la empresa es responsable del uso y despliegue hacia el cliente final.'
      }
    ]
  },
  {
    id: 3,
    title: 'IA Generativa y Copyright de Imágenes',
    scenario: 'El equipo de marketing ha generado cientos de imágenes impresionantes usando Midjourney para una nueva campaña global muy costosa. Alguien en el equipo señala que las imágenes generadas se parecen sospechosamente al estilo de un artista digital famoso.',
    options: [
      {
        id: 'a',
        text: 'Lanzar la campaña de todos modos; al fin y al cabo, las imágenes de IA no tienen copyright y son de dominio público.',
        isCorrect: false,
        feedback: 'Arriesgado. Aunque la salida de la IA a veces no tiene copyright, si plagia o copia directamente elementos reconocibles de un artista vivo, te expones a demandas por infracción de derechos de autor.'
      },
      {
        id: 'b',
        text: 'Utilizar las imágenes pero modificar los colores ligeramente con Photoshop para evitar que el artista se dé cuenta.',
        isCorrect: false,
        feedback: 'Poco ético y legalmente cuestionable. Sigue habiendo un riesgo importante de infracción.'
      },
      {
        id: 'c',
        text: 'Pausar la campaña, consultar con legal, y re-generar las imágenes usando herramientas éticas (ej. Adobe Firefly) o licenciar obras originales del artista.',
        isCorrect: true,
        feedback: 'Correcto. La procedencia de los datos (data provenance) es clave en IA. Es mejor prevenir riesgos legales de IP usando modelos entrenados con datos licenciados o contratando al artista original.'
      }
    ]
  }
];

export default function Module7EthicalDilemmas() {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentDilemma = dilemmas[currentDilemmaIndex];

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    
    const option = currentDilemma.options.find(o => o.id === selectedOption);
    if (option?.isCorrect) {
      setScore(s => s + 1);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentDilemmaIndex < dilemmas.length - 1) {
      setCurrentDilemmaIndex(i => i + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentDilemmaIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <Card className="border-emerald-200 bg-white">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Simulación Completada</h3>
          <p className="text-slate-600 mb-6">
            Has resuelto {score} de {dilemmas.length} dilemas éticos correctamente.
          </p>
          <Button onClick={resetGame} className="bg-emerald-600 hover:bg-emerald-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Jugar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-medium text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
        <span>Dilema {currentDilemmaIndex + 1} de {dilemmas.length}</span>
        <span>Puntuación: {score}</span>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-100">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            {currentDilemma.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-slate-700 mb-6 leading-relaxed">
            {currentDilemma.scenario}
          </p>

          <div className="space-y-3">
            {currentDilemma.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedOption === option.id && !showFeedback
                    ? 'border-emerald-500 bg-emerald-50 shadow-md ring-1 ring-emerald-500'
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
                    selectedOption === option.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                  }`}>
                    {selectedOption === option.id && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className={`text-sm ${
                    selectedOption === option.id && !showFeedback ? 'text-emerald-900 font-medium' : 'text-slate-700'
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
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Confirmar Decisión
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Siguiente Dilema
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
