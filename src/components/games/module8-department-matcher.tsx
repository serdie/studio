'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

type Department = 'Marketing' | 'RRHH' | 'Finanzas' | 'Logística' | 'Operaciones';

interface UseCase {
  id: string;
  description: string;
  correctDept: Department;
  tool: string;
  explanation: string;
}

const useCases: UseCase[] = [
  { id: 'u1', description: 'Predecir qué clientes van a darse de baja del servicio premium en los próximos 30 días', correctDept: 'Marketing', tool: 'Salesforce Einstein / HubSpot Predictive', explanation: 'El churn prediction es una aplicación clave de IA en marketing para retención de clientes.' },
  { id: 'u2', description: 'Automatizar el screening de 5.000 CVs recibidos para una posición de ingeniería', correctDept: 'RRHH', tool: 'HireVue / Pymetrics', explanation: 'La IA en RRHH puede reducir el tiempo de screening un 60-75%.' },
  { id: 'u3', description: 'Detectar transacciones sospechosas en tiempo real entre millones de operaciones bancarias', correctDept: 'Finanzas', tool: 'FICO / Featurespace', explanation: 'La detección de fraude financiero con IA analiza patrones anómalos en milisegundos.' },
  { id: 'u4', description: 'Optimizar las rutas de 200 vehículos de reparto considerando tráfico y clima en tiempo real', correctDept: 'Logística', tool: 'Google OR-Tools / Route4Me', explanation: 'La optimización de rutas con IA puede reducir costes de transporte un 10-30%.' },
  { id: 'u5', description: 'Predecir cuándo va a fallar un motor de la línea de producción para programar mantenimiento', correctDept: 'Operaciones', tool: 'Uptake / C3.ai', explanation: 'El mantenimiento predictivo usa sensores IoT y ML para anticipar fallos.' },
  { id: 'u6', description: 'Generar contenido personalizado para 50.000 suscriptores de email según su comportamiento', correctDept: 'Marketing', tool: 'Jasper.ai / Persado', explanation: 'La personalización masiva de contenido con IA mejora las tasas de conversión significativamente.' },
  { id: 'u7', description: 'Analizar el sentimiento de las encuestas de clima laboral y detectar riesgo de rotación', correctDept: 'RRHH', tool: 'Workday / Peakon', explanation: 'People Analytics con NLP permite detectar insatisfacción antes de que se materialice en bajas.' },
  { id: 'u8', description: 'Automatizar conciliaciones bancarias y generar informes de cierre mensual', correctDept: 'Finanzas', tool: 'BlackLine / Trintech', explanation: 'RPA + IA automatiza tareas financieras repetitivas reduciendo errores humanos.' },
  { id: 'u9', description: 'Predecir la demanda de productos para la temporada navideña y optimizar inventario', correctDept: 'Logística', tool: 'Blue Yonder / o9 Solutions', explanation: 'El demand forecasting con IA permite optimizar stock evitando roturas y excesos.' },
  { id: 'u10', description: 'Monitorizar calidad de producto en línea de ensamblaje usando visión artificial', correctDept: 'Operaciones', tool: 'Landing AI / Cognex', explanation: 'La visión artificial detecta defectos en tiempo real con mayor precisión que inspectores humanos.' },
];

const deptColors: Record<Department, { bg: string; text: string; border: string }> = {
  Marketing: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-300' },
  RRHH: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-300' },
  Finanzas: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  Logística: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' },
  Operaciones: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
};

export default function Module8DepartmentMatcher() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<Department | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [shuffled, setShuffled] = useState<UseCase[]>([]);

  const start = () => {
    setShuffled([...useCases].sort(() => Math.random() - 0.5));
    setStarted(true);
  };

  const handleSelect = (dept: Department) => {
    if (answered) return;
    setSelected(dept);
    setAnswered(true);
    if (dept === shuffled[currentIdx].correctDept) setScore(s => s + 1);
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

  const reset = () => { setCurrentIdx(0); setScore(0); setSelected(null); setAnswered(false); setShowResult(false); setStarted(false); };

  if (!started) {
    return (
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center shadow-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-cyan-900">IA en la Empresa: ¿Qué Departamento?</CardTitle>
              <p className="text-sm text-cyan-700">Asigna cada caso de uso de IA al departamento correcto</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-cyan-800">
            Eres el Director de Transformación Digital. Se te presentan casos de uso de IA y debes asignarlos al departamento correcto: Marketing, RRHH, Finanzas, Logística u Operaciones.
          </p>
          <Button onClick={start} className="w-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600">
            <Building2 className="h-4 w-4 mr-2" /> Comenzar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-cyan-900">
            {pct >= 80 ? '¡Director de IA experto!' : pct >= 60 ? '¡Buena visión empresarial!' : 'Repasa las áreas funcionales'}
          </h3>
          <p className="text-4xl font-bold text-cyan-600">{score}/{shuffled.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <Button onClick={reset} variant="outline" className="border-cyan-300"><RefreshCw className="h-4 w-4 mr-2" /> Jugar de nuevo</Button>
        </CardContent>
      </Card>
    );
  }

  const uc = shuffled[currentIdx];

  return (
    <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Caso {currentIdx + 1}/{shuffled.length}</Badge>
          <span className="text-sm text-cyan-600 font-medium">Puntos: {score}</span>
        </div>
        <Progress value={((currentIdx + 1) / shuffled.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
          <p className="text-sm text-cyan-900 font-medium">{uc.description}</p>
        </div>
        <p className="text-sm font-semibold text-cyan-800">¿A qué departamento pertenece este caso de uso?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['Marketing', 'RRHH', 'Finanzas', 'Logística', 'Operaciones'] as Department[]).map(dept => {
            const colors = deptColors[dept];
            const isCorrect = dept === uc.correctDept;
            const isSelected = dept === selected;
            return (
              <button key={dept} onClick={() => handleSelect(dept)} disabled={answered}
                className={`p-3 rounded-lg border-2 text-center transition-all ${!answered ? `${colors.border} ${colors.bg} hover:shadow-md cursor-pointer` : isCorrect ? 'border-green-500 bg-green-50' : isSelected ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-50'}`}>
                <span className={`text-sm font-bold ${answered && isCorrect ? 'text-green-700' : answered && isSelected ? 'text-red-700' : colors.text}`}>
                  {answered && isCorrect && <CheckCircle2 className="h-4 w-4 inline mr-1" />}
                  {answered && isSelected && !isCorrect && <XCircle className="h-4 w-4 inline mr-1" />}
                  {dept}
                </span>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="space-y-3">
            <div className={`p-3 rounded-lg border ${deptColors[uc.correctDept].border} ${deptColors[uc.correctDept].bg}`}>
              <p className={`text-xs font-bold ${deptColors[uc.correctDept].text}`}>Herramienta: {uc.tool}</p>
              <p className="text-xs text-slate-700 mt-1">{uc.explanation}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={next} className="bg-cyan-500 hover:bg-cyan-600">
                {currentIdx + 1 < shuffled.length ? <><ArrowRight className="h-4 w-4 mr-1" /> Siguiente</> : 'Ver resultados'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
