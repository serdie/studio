'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Package,
  MessageSquare,
  Shield,
  ArrowRight,
  User,
  Bot,
  AlertTriangle,
  Zap,
  UserPlus,
  ClipboardList,
  ShoppingCart
} from 'lucide-react';

interface Excepcion {
  nombre: string;
  descripcion: string;
  senal: string;
  accion: string;
}

interface CasoPrueba {
  escenario: string;
  entrada: string;
  esperado: string;
  tipo: 'happy' | 'incompleto' | 'limite' | 'excepcion';
}

interface FormData {
  empresa: string;
  intent: string;
  objetivo: string;
  bienvenida: string;
  pedirDatos: string;
  confirmarAccion: string;
  cierreNormal: string;
  cierreHandoff: string;
}

const requiredFields: (keyof FormData)[] = [
  'empresa', 'intent', 'objetivo',
  'bienvenida', 'pedirDatos', 'confirmarAccion',
  'cierreNormal', 'cierreHandoff'
];

export default function IkeaPractice8() {
  const [formData, setFormData] = useState<FormData>({
    empresa: 'IKEA',
    intent: 'Devolucion_o_Incidencia',
    objetivo: '',
    bienvenida: '',
    pedirDatos: '',
    confirmarAccion: '',
    cierreNormal: '',
    cierreHandoff: '',
  });

  const [excepciones, setExcepciones] = useState<Excepcion[]>(
    Array(6).fill({ nombre: '', descripcion: '', senal: '', accion: '' })
  );

  const [casosPrueba, setCasosPrueba] = useState<CasoPrueba[]>(
    Array(15).fill({ escenario: '', entrada: '', esperado: '', tipo: 'happy' as const })
  );

  const [handoffResumen, setHandoffResumen] = useState('');
  const [handoffDatos, setHandoffDatos] = useState('');
  const [handoffContexto, setHandoffContexto] = useState('');

  const [chkMaxFallbacks, setChkMaxFallbacks] = useState(true);
  const [chkResumenAuto, setChkResumenAuto] = useState(true);
  const [chkNoRepetir, setChkNoRepetir] = useState(true);

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExcepcionChange = (index: number, field: keyof Excepcion, value: string) => {
    const newEx = [...excepciones];
    newEx[index] = { ...newEx[index], [field]: value };
    setExcepciones(newEx);
  };

  const handleCasoChange = (index: number, field: keyof CasoPrueba, value: string) => {
    const newCasos = [...casosPrueba];
    newCasos[index] = { ...newCasos[index], [field]: value };
    setCasosPrueba(newCasos);
  };

  const completionPercentage = useMemo(() => {
    const filled = requiredFields.filter(f => formData[f].trim().length > 0).length;
    const exRellenas = excepciones.filter(e => e.nombre.trim() && e.descripcion.trim()).length;
    const casosRellenos = casosPrueba.filter(c => c.escenario.trim() && c.esperado.trim()).length;
    const total = filled + exRellenas + casosRellenos;
    const max = requiredFields.length + 6 + 15;
    return Math.round((total / max) * 100);
  }, [formData, excepciones, casosPrueba]);

  const excepcionesCount = useMemo(() => {
    return excepciones.filter(e => e.nombre.trim() && e.descripcion.trim()).length;
  }, [excepciones]);

  const casosCount = useMemo(() => {
    return casosPrueba.filter(c => c.escenario.trim() && c.esperado.trim()).length;
  }, [casosPrueba]);

  const checksCount = useMemo(() => {
    return [chkMaxFallbacks, chkResumenAuto, chkNoRepetir].filter(Boolean).length;
  }, [chkMaxFallbacks, chkResumenAuto, chkNoRepetir]);

  const generate = () => {
    const missing: string[] = [];
    if (!formData.empresa) missing.push('empresa');
    if (!formData.intent) missing.push('intent principal');
    if (!formData.objetivo) missing.push('objetivo del flujo');
    if (excepcionesCount < 6) missing.push('6 excepciones definidas');
    if (casosCount < 15) missing.push('15 casos de prueba');
    if (!handoffResumen.trim()) missing.push('resumen de handoff');
    if (!handoffDatos.trim()) missing.push('datos clave del handoff');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Flujo 2 + excepciones + handoff completos según los mínimos.' });
    }

    const sb: string[] = [];

    sb.push('PRÁCTICA 8 · FLUJO 2: DEVOLUCIÓN/INCIDENCIA + EXCEPCIONES + HANDOFF');
    sb.push('Empresa: ' + (formData.empresa || '(pendiente)'));
    sb.push('');
    sb.push('1. Contexto del caso');
    sb.push('Empresa / marca: ' + (formData.empresa || '(pendiente)'));
    sb.push('Intent principal: ' + (formData.intent || '(pendiente)'));
    sb.push('Objetivo: ' + (formData.objetivo || '(pendiente)'));
    sb.push('');
    sb.push('2. Flujo conversacional base');
    sb.push('- Bienvenida: ' + (formData.bienvenida || '(pendiente)'));
    sb.push('- Petición de datos: ' + (formData.pedirDatos || '(pendiente)'));
    sb.push('- Confirmación de acción: ' + (formData.confirmarAccion || '(pendiente)'));
    sb.push('- Cierre normal: ' + (formData.cierreNormal || '(pendiente)'));
    sb.push('- Cierre con handoff: ' + (formData.cierreHandoff || '(pendiente)'));
    sb.push('');
    sb.push('3. Excepciones (6)');
    sb.push('');
    excepciones.forEach((ex, idx) => {
      if (ex.nombre || ex.descripcion) {
        sb.push(`3.${idx + 1} ${ex.nombre || '(sin nombre)'}`);
        sb.push(`   Descripción: ${ex.descripcion || '(pendiente)'}`);
        sb.push(`   Señal de detección: ${ex.senal || '(pendiente)'}`);
        sb.push(`   Acción del bot: ${ex.accion || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('4. Regla de fallback');
    if (chkMaxFallbacks) sb.push('- Máximo 2 fallbacks seguidos → ofrecer humano + resumen automático');
    sb.push('');
    sb.push('5. Casos de prueba (15)');
    sb.push('');
    casosPrueba.forEach((caso, idx) => {
      if (caso.escenario || caso.esperado) {
        sb.push(`Caso ${idx + 1} [${caso.tipo.toUpperCase()}]: ${caso.escenario || '(sin descripción)'}`);
        sb.push(`   Entrada: ${caso.entrada || '(pendiente)'}`);
        sb.push(`   Resultado esperado: ${caso.esperado || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('6. Plantilla de Handoff (resumen para el humano)');
    sb.push('Resumen del caso: ' + (handoffResumen || '(pendiente)'));
    sb.push('Datos clave a transferir: ' + (handoffDatos || '(pendiente)'));
    sb.push('Contexto de la conversación: ' + (handoffContexto || '(pendiente)'));
    sb.push('');
    if (chkResumenAuto) sb.push('- El bot genera automáticamente un resumen estructurado antes de derivar.');
    if (chkNoRepetir) sb.push('- El humano recibe todo el contexto para NO repetir preguntas al usuario.');
    sb.push('');
    sb.push('7. Criterios de calidad');
    sb.push('- El bot NO debe hacer promesas ("te devolvemos seguro").');
    sb.push('- Debe detectar excepciones y derivar con contexto completo.');
    sb.push('- Tras 2 fallbacks seguidos, ofrecer humano automáticamente.');
    sb.push('- El resumen de handoff debe incluir: intent, datos recogidos, excepciones detectadas, tono del usuario.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFormData({
      empresa: 'IKEA', intent: 'Devolucion_o_Incidencia', objetivo: '',
      bienvenida: '', pedirDatos: '', confirmarAccion: '',
      cierreNormal: '', cierreHandoff: '',
    });
    setExcepciones(Array(6).fill({ nombre: '', descripcion: '', senal: '', accion: '' }));
    setCasosPrueba(Array(15).fill({ escenario: '', entrada: '', esperado: '', tipo: 'happy' as const }));
    setHandoffResumen('');
    setHandoffDatos('');
    setHandoffContexto('');
    setChkMaxFallbacks(true);
    setChkResumenAuto(true);
    setChkNoRepetir(true);
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'Primero genera el entregable antes de copiarlo.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Entregable copiado al portapapeles.' });
    } catch {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Copia el texto manualmente.' });
    }
  };

  // Mini diálogo de ejemplo con handoff
  const exampleDialog = useMemo(() => {
    const bienvenida = formData.bienvenida || 'Lamento que tengas una incidencia. Voy a intentar ayudarte con tu devolución o problema.';
    const pedirDatos = formData.pedirDatos || 'Para poder ayudarte, necesito que me indiques tu número de pedido y qué producto tiene el problema.';
    const cierreHandoff = formData.cierreHandoff || 'Entiendo que es un caso complejo. Voy a pasar tu consulta a un agente humano con todo el contexto para que no tengas que repetir nada.';

    return [
      { role: 'user' as const, text: 'Quiero devolver un sofá que compré hace 40 días' },
      { role: 'bot' as const, text: bienvenida },
      { role: 'user' as const, text: 'El pedido es 450-2891-334' },
      { role: 'bot' as const, text: pedirDatos },
      { role: 'user' as const, text: 'Es el sofá KIVIK de 3 plazas, pero ya lo monté' },
      { role: 'bot' as const, text: 'He detectado una excepción: devolución fuera de plazo (30 días) + producto montado. Voy a derivar tu caso a un agente especializado.' },
      { role: 'bot' as const, text: cierreHandoff },
    ];
  }, [formData]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-red-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">8</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 8 · Flujo 2: Excepciones + Handoff (IKEA)</h1>
            <p className="text-sm text-slate-600">Diseña un flujo de devolución/incidencia con 6 excepciones, 15 casos de prueba y plantilla de handoff</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">IKEA · devoluciones fuera de plazo, productos montados, incidencias transporte</span>
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <strong className="font-semibold">Reto</strong> <span className="ml-1">evitar promesas + derivar con contexto completo al agente humano</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Entregable</strong> <span className="ml-1">6 excepciones · 15 casos prueba · resumen handoff</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-5 w-5 text-amber-600" />
            <h3 className="font-semibold text-amber-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-amber-100 text-amber-700 border-amber-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            IKEA recibe casos "difíciles" que el bot no puede resolver directamente: devoluciones fuera de plazo (30 días), productos ya montados, promociones conjuntas, incidencias por transporte. El bot debe <strong>evitar hacer promesas</strong> ("te devolvemos seguro") y <strong>derivar con contexto completo</strong> al agente humano cuando detecte una excepción o situación de riesgo.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El bot debe identificar <strong>6 tipos de excepciones</strong> y actuar en consecuencia.</li>
            <li>Regla clave: <strong>2 fallbacks seguidos → ofrecer humano + resumen automático</strong>.</li>
            <li>El handoff debe incluir un <strong>resumen estructurado</strong> para que el humano NO repita preguntas.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            No inventes políticas de devolución de IKEA: céntrate en el diseño del flujo de detección y escalado.
          </p>
        </CardContent>
      </Card>

      {/* Barra de completitud */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">Progreso del formulario</span>
                <span className="text-sm font-bold text-slate-800">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                {excepcionesCount}/6 exc.
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                {casosCount}/15 casos
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                {checksCount}/3 checks
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mapa del flujo */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Mapa del flujo con excepciones y handoff</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
            {[
              { num: '1', title: 'Detectar intent', desc: 'Devolución o incidencia', color: 'from-blue-400 to-blue-600' },
              { num: '2', title: 'Pedir datos', desc: 'Número pedido + producto', color: 'from-indigo-400 to-indigo-600' },
              { num: '3', title: 'Verificar excepciones', desc: '¿Fuera de plazo? ¿Montado?', color: 'from-amber-400 to-amber-600' },
              { num: '4', title: '¿Excepción?', desc: 'Sí → preparar handoff', color: 'from-red-400 to-red-600' },
              { num: '5', title: 'Generar resumen', desc: 'Contexto completo para humano', color: 'from-purple-400 to-purple-600' },
              { num: '6', title: 'Derivar', desc: 'Transferir con resumen', color: 'from-green-400 to-green-600' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 text-center space-y-1">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-sm`}>
                      <span className="text-sm font-bold text-white">{step.num}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-800">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Formulario y Excepciones */}
        <div className="space-y-6">
          {/* Contexto base */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Contexto base</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">caso principal</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Empresa / marca</label>
                  <Input
                    placeholder="Ej.: IKEA"
                    className="text-xs bg-white"
                    value={formData.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Intent principal</label>
                  <Input
                    placeholder="Ej.: Devolucion_o_Incidencia"
                    className="text-xs bg-white"
                    value={formData.intent}
                    onChange={(e) => updateField('intent', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Objetivo del flujo</label>
                <Textarea
                  placeholder="Ej.: Gestionar devoluciones e incidencias detectando excepciones y derivando con contexto completo..."
                  className="text-xs bg-white min-h-[70px]"
                  value={formData.objetivo}
                  onChange={(e) => updateField('objetivo', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Bienvenida</label>
                  <Textarea
                    placeholder="Ej.: Lamento que tengas una incidencia..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.bienvenida}
                    onChange={(e) => updateField('bienvenida', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Petición de datos</label>
                  <Textarea
                    placeholder="Ej.: Necesito tu número de pedido..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.pedirDatos}
                    onChange={(e) => updateField('pedirDatos', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Confirmación de acción</label>
                  <Textarea
                    placeholder="Ej.: Voy a revisar tu caso..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.confirmarAccion}
                    onChange={(e) => updateField('confirmarAccion', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Cierre normal</label>
                  <Textarea
                    placeholder="Ej.: Tu devolución ha sido registrada..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.cierreNormal}
                    onChange={(e) => updateField('cierreNormal', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Cierre con handoff (derivación)</label>
                <Textarea
                  placeholder="Ej.: Entiendo que es un caso complejo. Voy a pasar tu consulta a un agente humano con todo el contexto..."
                  className="text-xs bg-white min-h-[60px]"
                  value={formData.cierreHandoff}
                  onChange={(e) => updateField('cierreHandoff', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Excepciones */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">6 Excepciones</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">casos fuera de alcance</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define 6 situaciones que el bot no puede resolver y debe derivar: fuera de plazo, producto montado, falta evidencia, etc.
              </p>

              <div className="space-y-3">
                {excepciones.map((ex, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Excepción {index + 1}</span>
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">fuera de alcance</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Nombre (ej.: Fuera_de_plazo)"
                          className="text-xs bg-white"
                          value={ex.nombre}
                          onChange={(e) => handleExcepcionChange(index, 'nombre', e.target.value)}
                        />
                        <Input
                          placeholder="Señal de detección (ej.: dias_compra > 30)"
                          className="text-xs bg-white"
                          value={ex.senal}
                          onChange={(e) => handleExcepcionChange(index, 'senal', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Textarea
                          placeholder="Descripción (ej.: Devolución solicitada pasados 30 días desde la compra)"
                          className="text-xs bg-white min-h-[50px]"
                          value={ex.descripcion}
                          onChange={(e) => handleExcepcionChange(index, 'descripcion', e.target.value)}
                        />
                        <Textarea
                          placeholder="Acción del bot (ej.: Informar de política + ofrecer handoff)"
                          className="text-xs bg-white min-h-[50px]"
                          value={ex.accion}
                          onChange={(e) => handleExcepcionChange(index, 'accion', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Regla de fallback */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-slate-700">Regla de fallback</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={chkMaxFallbacks}
                      onChange={(e) => setChkMaxFallbacks(e.target.checked)}
                      className="accent-amber-500"
                    />
                    2 fallbacks seguidos → ofrecer humano
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={chkResumenAuto}
                      onChange={(e) => setChkResumenAuto(e.target.checked)}
                      className="accent-amber-500"
                    />
                    Resumen automático antes de derivar
                  </label>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={chkNoRepetir}
                      onChange={(e) => setChkNoRepetir(e.target.checked)}
                      className="accent-amber-500"
                    />
                    Humano NO repite preguntas
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Casos de prueba */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">15 Casos de prueba</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">escenarios de test</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define 15 casos: happy path (5), datos incompletos (5), límite/borde (5). Incluye al menos 3 con excepción.
              </p>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {casosPrueba.map((caso, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Caso {index + 1}</span>
                        <select
                          className="text-xs bg-white border border-slate-200 rounded-md px-2 py-1"
                          value={caso.tipo}
                          onChange={(e) => handleCasoChange(index, 'tipo', e.target.value as CasoPrueba['tipo'])}
                        >
                          <option value="happy">✅ Happy path</option>
                          <option value="incompleto">⚠️ Datos incompletos</option>
                          <option value="limite">🔶 Límite/borde</option>
                          <option value="excepcion">🚨 Excepción</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Escenario (ej.: Devolución sofá dentro de plazo)"
                          className="text-xs bg-white"
                          value={caso.escenario}
                          onChange={(e) => handleCasoChange(index, 'escenario', e.target.value)}
                        />
                        <Input
                          placeholder="Entrada del usuario (ej.: Pedido 123, sofá EKTORP)"
                          className="text-xs bg-white"
                          value={caso.entrada}
                          onChange={(e) => handleCasoChange(index, 'entrada', e.target.value)}
                        />
                      </div>

                      <Textarea
                        placeholder="Resultado esperado (ej.: Bot procesa devolución y confirma fecha de recogida)"
                        className="text-xs bg-white min-h-[40px]"
                        value={caso.esperado}
                        onChange={(e) => handleCasoChange(index, 'esperado', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              onClick={generate}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg"
            >
              <Package className="h-4 w-4 mr-2" />
              Generar práctica 8
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar campos
            </Button>
          </div>
        </div>

        {/* Right Column - Preview y Resumen */}
        <div className="space-y-6">
          {/* Mini diálogo de ejemplo */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Vista previa del diálogo con handoff</h3>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">ejemplo interactivo</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Así se vería un diálogo con detección de excepción y derivación a humano. Se actualiza automáticamente.
              </p>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {exampleDialog.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                          : 'bg-gradient-to-br from-amber-400 to-orange-500'
                      }`}>
                        {msg.role === 'user'
                          ? <User className="h-3.5 w-3.5 text-white" />
                          : <Bot className="h-3.5 w-3.5 text-white" />
                        }
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plantilla de Handoff */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Plantilla de Handoff</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">resumen para humano</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define qué información se transfiere al agente humano para que NO repita preguntas al usuario.
              </p>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <ClipboardList className="h-3 w-3" />
                    Resumen del caso
                  </label>
                  <Textarea
                    placeholder="Ej.: Usuario solicita devolución de sofá KIVIK fuera de plazo (40 días). Producto ya montado. Requiere excepción aprobada por supervisor."
                    className="text-xs bg-white min-h-[80px]"
                    value={handoffResumen}
                    onChange={(e) => setHandoffResumen(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Datos clave a transferir
                  </label>
                  <Textarea
                    placeholder="Ej.: Nº pedido: 450-2891-334 | Producto: KIVIK 3 plazas | Días desde compra: 40 | Estado: Montado | Excepción: Fuera_plazo + Producto_montado"
                    className="text-xs bg-white min-h-[80px]"
                    value={handoffDatos}
                    onChange={(e) => setHandoffDatos(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Contexto de la conversación
                  </label>
                  <Textarea
                    placeholder="Ej.: Usuario inició con 'quiero devolver sofá'. Se le pidió pedido y producto. Detectadas 2 excepciones. Tono: normal. Sin enfado."
                    className="text-xs bg-white min-h-[80px]"
                    value={handoffContexto}
                    onChange={(e) => setHandoffContexto(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="flex items-start gap-2">
                  <UserPlus className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-purple-800">
                    <strong>Principio de handoff:</strong> El agente humano debe recibir TODO el contexto para que el usuario NO tenga que repetir nada. Esto mejora la experiencia y reduce el tiempo de resolución.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen generado */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Entregable final</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">texto para pegar</Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Excepciones</span>
                  <strong className="text-lg text-red-600 font-headline">{excepcionesCount}/6</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Casos prueba</span>
                  <strong className="text-lg text-blue-600 font-headline">{casosCount}/15</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Completitud</span>
                  <strong className="text-lg text-amber-600 font-headline">{completionPercentage}%</strong>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El entregable aparecerá aquí después de generar...'}</pre>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={copySummary}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar entregable
                </Button>
                <span className="text-xs text-slate-500">
                  Pega el contenido en tu documento de entrega.
                </span>
              </div>

              {/* Status */}
              {status.message && (
                <div className={`flex items-center gap-2 text-sm p-2.5 rounded-lg ${
                  status.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-slate-50 text-slate-600 border border-slate-200'
                }`}>
                  {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> :
                   status.type === 'error' ? <AlertCircle className="h-4 w-4 flex-shrink-0" /> :
                   <Shield className="h-4 w-4 flex-shrink-0" />}
                  {status.message}
                </div>
              )}

              {/* Checklist */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-semibold text-slate-700">Qué evalúa esta práctica</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 ml-4 list-disc">
                  <li>Si se han definido 6 excepciones claras con señal de detección y acción del bot.</li>
                  <li>Si los 15 casos de prueba cubren happy path, datos incompletos y límites.</li>
                  <li>Si el handoff incluye resumen, datos clave y contexto completo.</li>
                  <li>Si se aplica la regla de 2 fallbacks → ofrecer humano + resumen automático.</li>
                  <li>Si el bot evita hacer promesas ("te devolvemos seguro").</li>
                </ul>
              </div>

              {/* Consejo */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  <strong>Consejo:</strong> El bot NO debe prometer devoluciones ni soluciones que no puede garantizar. Cuando detecte una excepción, debe informar con transparencia y derivar con contexto completo para que el humano no repita preguntas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
