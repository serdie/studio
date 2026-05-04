'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, ShieldAlert, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  company: string;
  options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  biasType: string;
  lesson: string;
}

const scenarios: Scenario[] = [
  {
    id: 's1',
    title: 'Sistema de Contratación IA',
    description: 'Una empresa tecnológica usa IA para filtrar CVs. Después de 6 meses, notan que solo el 12% de candidatos seleccionados son mujeres, cuando el 40% de solicitudes son de mujeres. ¿Qué tipo de sesgo está ocurriendo?',
    company: 'TechCorp',
    options: [
      { id: 'a', text: 'Sesgo de representación: los datos de entrenamiento reflejan contrataciones históricas dominadas por hombres', isCorrect: true, feedback: '¡Correcto! El sistema aprendió patrones de contrataciones pasadas sesgadas.' },
      { id: 'b', text: 'No hay sesgo, simplemente los hombres están más cualificados', isCorrect: false, feedback: 'Incorrecto. Asumir que un género está más cualificado ES un sesgo.' },
      { id: 'c', text: 'Es un error técnico del algoritmo', isCorrect: false, feedback: 'No es un bug técnico, es un sesgo sistémico en los datos.' },
      { id: 'd', text: 'Es culpa de las mujeres por no aplicar con los términos correctos', isCorrect: false, feedback: 'Culpar a las víctimas del sesgo es perpetuar la discriminación.' }
    ],
    biasType: 'Sesgo de representación',
    lesson: 'Los datos históricos de contratación pueden perpetuar desigualdades. Siempre hay que auditar los datos de entrenamiento.'
  },
  {
    id: 's2',
    title: 'Algoritmo de Crédito Bancario',
    description: 'Un banco implementa IA para evaluar solicitudes de crédito. El sistema usa el código postal como variable. Resulta que rechaza desproporcionadamente solicitudes de barrios con mayoría de minorías étnicas. ¿Qué está pasando?',
    company: 'BankAI',
    options: [
      { id: 'a', text: 'El sistema funciona correctamente porque evalúa riesgo geográfico', isCorrect: false, feedback: 'Aunque parezca objetivo, el código postal actúa como proxy de raza.' },
      { id: 'b', text: 'Discriminación indirecta: el código postal es una variable proxy de etnia', isCorrect: true, feedback: '¡Correcto! Las variables proxy correlacionadas con atributos protegidos generan discriminación indirecta.' },
      { id: 'c', text: 'Es coincidencia estadística sin significado', isCorrect: false, feedback: 'No es coincidencia, es un patrón de discriminación estructural.' },
      { id: 'd', text: 'El algoritmo necesita más datos', isCorrect: false, feedback: 'Más datos no resolverán el problema si la variable proxy sigue presente.' }
    ],
    biasType: 'Discriminación indirecta (variable proxy)',
    lesson: 'Variables aparentemente neutras como el código postal pueden ser proxies de atributos protegidos. La equidad algorítmica requiere analizar correlaciones ocultas.'
  },
  {
    id: 's3',
    title: 'Reconocimiento Facial en Aeropuerto',
    description: 'Un aeropuerto implementa reconocimiento facial para control de pasaportes. El sistema tiene una tasa de error del 0.5% para personas de piel clara pero del 5% para personas de piel oscura. ¿Cuál es el problema?',
    company: 'SecureAirport',
    options: [
      { id: 'a', text: 'Es normal que haya diferencias de rendimiento', isCorrect: false, feedback: 'Una diferencia de 10x en tasa de error NO es aceptable.' },
      { id: 'b', text: 'Sesgo de representación en datos de entrenamiento: subrepresentación de personas de piel oscura', isCorrect: true, feedback: '¡Correcto! Los datasets de entrenamiento suelen tener sobrerrepresentación de personas caucásicas.' },
      { id: 'c', text: 'Las personas de piel oscura deben mejorar la calidad de sus fotos', isCorrect: false, feedback: 'Culpar al usuario es inaceptable. El sistema debe funcionar equitativamente.' },
      { id: 'd', text: 'El hardware de las cámaras es defectuoso', isCorrect: false, feedback: 'Aunque el hardware puede contribuir, el sesgo principal está en los datos.' }
    ],
    biasType: 'Sesgo de representación en datos',
    lesson: 'Los sistemas de reconocimiento facial presentan tasas de error desproporcionadas para minorías. Es crucial testear rendimiento por grupos demográficos.'
  },
  {
    id: 's4',
    title: 'Chatbot de Atención Sanitaria',
    description: 'Un hospital implementa un chatbot de triaje que clasifica urgencias. Tras analizar los datos, descubren que el chatbot subestima sistemáticamente el dolor de mujeres, clasificando sus casos como menos urgentes. ¿Qué sesgo es este?',
    company: 'HealthBot',
    options: [
      { id: 'a', text: 'Es un error de calibración sin relación con género', isCorrect: false, feedback: 'El patrón sistemático indica sesgo, no error aleatorio.' },
      { id: 'b', text: 'Las mujeres tienden a exagerar sus síntomas', isCorrect: false, feedback: 'Esta creencia ES parte del sesgo médico histórico que el sistema aprendió.' },
      { id: 'c', text: 'Sesgo de medición: los datos médicos históricos reflejan el sesgo de género existente en medicina', isCorrect: true, feedback: '¡Correcto! Históricamente, el dolor femenino ha sido subestimado en medicina, y los datos reflejan este sesgo.' },
      { id: 'd', text: 'El chatbot necesita más datos masculinos', isCorrect: false, feedback: 'El problema no es falta de datos masculinos, sino que los datos existentes reflejan sesgos médicos.' }
    ],
    biasType: 'Sesgo de medición histórico',
    lesson: 'Los sesgos médicos históricos se transfieren a los modelos de IA. En salud, los sesgos algorítmicos pueden ser letales.'
  },
  {
    id: 's5',
    title: 'Sistema de Publicidad Online',
    description: 'Una plataforma de anuncios usa IA para segmentar audiencias. Descubren que los anuncios de empleo de alta remuneración se muestran mayoritariamente a hombres jóvenes, mientras que los de limpieza se muestran a mujeres mayores. ¿Es ético?',
    company: 'AdTech',
    options: [
      { id: 'a', text: 'Sí, la IA optimiza para la audiencia que más clica', isCorrect: false, feedback: 'Optimizar clics puede perpetuar discriminación laboral.' },
      { id: 'b', text: 'No es problema de la plataforma, es de los anunciantes', isCorrect: false, feedback: 'La plataforma es corresponsable del impacto discriminatorio de su algoritmo.' },
      { id: 'c', text: 'Es discriminación por impacto: el algoritmo refuerza estereotipos laborales de género y edad', isCorrect: true, feedback: '¡Correcto! Aunque no hay intención discriminatoria, el resultado es discriminatorio y perpetúa desigualdades.' },
      { id: 'd', text: 'Es aceptable si los usuarios dan consentimiento', isCorrect: false, feedback: 'El consentimiento no justifica la discriminación algorítmica.' }
    ],
    biasType: 'Discriminación por impacto',
    lesson: 'La optimización algorítmica sin guardarraíles éticos puede perpetuar y amplificar estereotipos sociales existentes.'
  },
  {
    id: 's6',
    title: 'IA de Scoring Social',
    description: 'Un gobierno propone usar IA para asignar una puntuación social a cada ciudadano basada en comportamiento online, compras, y relaciones sociales. Esta puntuación determinará acceso a servicios públicos. ¿Qué dice el AI Act?',
    company: 'GovScore',
    options: [
      { id: 'a', text: 'Es legal si se hace de forma transparente', isCorrect: false, feedback: 'El scoring social gubernamental está prohibido independientemente de la transparencia.' },
      { id: 'b', text: 'Es riesgo alto pero permitido con supervisión', isCorrect: false, feedback: 'No es alto riesgo, está directamente PROHIBIDO.' },
      { id: 'c', text: 'Está prohibido: es un sistema de riesgo inaceptable según el AI Act', isCorrect: true, feedback: '¡Correcto! El AI Act clasifica el social scoring gubernamental como riesgo inaceptable y lo prohíbe.' },
      { id: 'd', text: 'No está regulado por el AI Act', isCorrect: false, feedback: 'Es uno de los casos más explícitamente regulados (prohibidos) por el AI Act.' }
    ],
    biasType: 'Riesgo inaceptable (AI Act)',
    lesson: 'El AI Act prohíbe sistemas de scoring social por gobiernos, manipulación subliminal y explotación de vulnerabilidades.'
  }
];

export default function Module7BiasDetective() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const handleAnswer = (optionId: string) => {
    if (answered) return;
    setSelectedAnswer(optionId);
    setAnswered(true);
    const correct = scenarios[currentScenario].options.find(o => o.id === optionId)?.isCorrect;
    if (correct) setScore(prev => prev + 1);
  };

  const nextScenario = () => {
    if (currentScenario + 1 < scenarios.length) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowResult(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-red-900">Detective de Sesgos IA</CardTitle>
              <p className="text-sm text-red-700">Analiza escenarios reales y detecta sesgos algorítmicos</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-red-800">
            En este juego serás un auditor de IA. Analizarás 6 escenarios empresariales reales donde la IA ha causado discriminación o sesgos. Tu misión: identificar el tipo de sesgo y entender por qué ocurre.
          </p>
          <Button onClick={() => setStarted(true)} className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            <ShieldAlert className="h-4 w-4 mr-2" /> Comenzar investigación
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / scenarios.length) * 100);
    return (
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-red-900">
            {pct >= 80 ? '¡Detective experto!' : pct >= 60 ? '¡Buen ojo para los sesgos!' : 'Sigue investigando'}
          </h3>
          <p className="text-4xl font-bold text-red-600">{score}/{scenarios.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <Button onClick={reset} variant="outline" className="border-red-300">
            <RefreshCw className="h-4 w-4 mr-2" /> Jugar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const s = scenarios[currentScenario];

  return (
    <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{s.company}</Badge>
          <span className="text-sm text-red-600">Caso {currentScenario + 1}/{scenarios.length}</span>
        </div>
        <Progress value={((currentScenario + 1) / scenarios.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-bold text-red-900">{s.title}</h3>
        <p className="text-sm text-red-800 bg-red-50 p-3 rounded-lg border border-red-200">{s.description}</p>
        <div className="space-y-2">
          {s.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={answered}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                !answered
                  ? 'border-red-200 hover:border-red-400 hover:bg-red-50 cursor-pointer'
                  : opt.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : selectedAnswer === opt.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 opacity-60'
              }`}
            >
              <span className="text-sm">{opt.text}</span>
              {answered && (selectedAnswer === opt.id || opt.isCorrect) && (
                <p className="text-xs mt-1 italic text-slate-600 flex items-center gap-1">
                  {opt.isCorrect ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                  {opt.feedback}
                </p>
              )}
            </button>
          ))}
        </div>
        {answered && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
              <p className="text-xs font-bold text-amber-800">Tipo de sesgo: {s.biasType}</p>
              <p className="text-xs text-amber-700 mt-1">{s.lesson}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={nextScenario} className="bg-red-500 hover:bg-red-600">
                {currentScenario + 1 < scenarios.length ? 'Siguiente caso' : 'Ver resultados'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
