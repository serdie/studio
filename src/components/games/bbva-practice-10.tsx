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
  ClipboardList,
  Lock,
  Eye,
  TrendingUp,
  Play,
  Users,
  Key,
  Bug,
  BarChart3,
  RefreshCw,
  Rocket
} from 'lucide-react';

interface TestSeguridad {
  nombre: string;
  tipo: 'prompt_injection' | 'abuso' | 'datos_sensibles' | 'escalada' | 'otro';
  descripcion: string;
  esperado: string;
}

interface TestFuncional {
  escenario: string;
  entrada: string;
  esperado: string;
  tipo: 'happy' | 'incompleto' | 'limite';
}

interface FormData {
  empresa: string;
  asistente: string;
  objetivo: string;
  politicaDatos: string;
  promptInjection: string;
  abuso: string;
  datosSensibles: string;
  roles: string;
  cadencia: string;
  kpis: string;
  incidencias: string;
  cambios: string;
  demoGuion: string;
  demoHandoff: string;
}

const requiredFields: (keyof FormData)[] = [
  'empresa', 'asistente', 'objetivo',
  'politicaDatos', 'promptInjection', 'abuso', 'datosSensibles',
  'roles', 'cadencia', 'kpis', 'incidencias', 'cambios',
  'demoGuion', 'demoHandoff'
];

export default function BBVAPractice10() {
  const [formData, setFormData] = useState<FormData>({
    empresa: 'BBVA',
    asistente: 'Blue',
    objetivo: '',
    politicaDatos: '',
    promptInjection: '',
    abuso: '',
    datosSensibles: '',
    roles: '',
    cadencia: '',
    kpis: '',
    incidencias: '',
    cambios: '',
    demoGuion: '',
    demoHandoff: '',
  });

  const [testsSeguridad, setTestsSeguridad] = useState<TestSeguridad[]>(
    Array(10).fill({ nombre: '', tipo: 'prompt_injection' as const, descripcion: '', esperado: '' })
  );

  const [testsFuncionales, setTestsFuncionales] = useState<TestFuncional[]>(
    Array(15).fill({ escenario: '', entrada: '', esperado: '', tipo: 'happy' as const })
  );

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSeguridadChange = (index: number, field: keyof TestSeguridad, value: string) => {
    const newTests = [...testsSeguridad];
    newTests[index] = { ...newTests[index], [field]: value };
    setTestsSeguridad(newTests);
  };

  const handleFuncionalChange = (index: number, field: keyof TestFuncional, value: string) => {
    const newTests = [...testsFuncionales];
    newTests[index] = { ...newTests[index], [field]: value };
    setTestsFuncionales(newTests);
  };

  const completionPercentage = useMemo(() => {
    const filled = requiredFields.filter(f => formData[f].trim().length > 0).length;
    const segRellenos = testsSeguridad.filter(t => t.nombre.trim() && t.esperado.trim()).length;
    const funcRellenos = testsFuncionales.filter(t => t.escenario.trim() && t.esperado.trim()).length;
    const total = filled + segRellenos + funcRellenos;
    const max = requiredFields.length + 10 + 15;
    return Math.round((total / max) * 100);
  }, [formData, testsSeguridad, testsFuncionales]);

  const seguridadCount = useMemo(() => {
    return testsSeguridad.filter(t => t.nombre.trim() && t.esperado.trim()).length;
  }, [testsSeguridad]);

  const funcionalCount = useMemo(() => {
    return testsFuncionales.filter(t => t.escenario.trim() && t.esperado.trim()).length;
  }, [testsFuncionales]);

  const generate = () => {
    const missing: string[] = [];
    if (!formData.empresa) missing.push('empresa');
    if (!formData.asistente) missing.push('nombre del asistente');
    if (!formData.objetivo) missing.push('objetivo');
    if (!formData.politicaDatos) missing.push('política de datos');
    if (seguridadCount < 10) missing.push('10 tests de seguridad');
    if (funcionalCount < 15) missing.push('15 tests funcionales');
    if (!formData.demoGuion) missing.push('guion de demo');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Dossier "Listo para operar" completo según los mínimos.' });
    }

    const sb: string[] = [];

    sb.push('PRÁCTICA 10 · "LISTO PARA OPERAR": SEGURIDAD + CONTROL DE CAMBIOS + DEMO FINAL');
    sb.push('Empresa: ' + (formData.empresa || '(pendiente)'));
    sb.push('Asistente: ' + (formData.asistente || '(pendiente)'));
    sb.push('');
    sb.push('1. Contexto del caso');
    sb.push('Empresa / marca: ' + (formData.empresa || '(pendiente)'));
    sb.push('Asistente virtual: ' + (formData.asistente || '(pendiente)'));
    sb.push('Objetivo: ' + (formData.objetivo || '(pendiente)'));
    sb.push('');
    sb.push('2. Política de datos y salvaguardas');
    sb.push('Política general: ' + (formData.politicaDatos || '(pendiente)'));
    sb.push('');
    sb.push('2.1. Protección contra Prompt Injection');
    sb.push(formData.promptInjection || '(pendiente)');
    sb.push('');
    sb.push('2.2. Prevención de abuso');
    sb.push(formData.abuso || '(pendiente)');
    sb.push('');
    sb.push('2.3. Protección de datos sensibles');
    sb.push(formData.datosSensibles || '(pendiente)');
    sb.push('');
    sb.push('3. Tests de seguridad (10)');
    sb.push('');
    testsSeguridad.forEach((test, idx) => {
      if (test.nombre || test.descripcion) {
        sb.push(`S${idx + 1}: ${test.nombre || '(sin nombre)'} [${test.tipo.toUpperCase()}]`);
        sb.push(`   Descripción: ${test.descripcion || '(pendiente)'}`);
        sb.push(`   Resultado esperado: ${test.esperado || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('4. Tests funcionales (15)');
    sb.push('');
    testsFuncionales.forEach((test, idx) => {
      if (test.escenario || test.esperado) {
        sb.push(`F${idx + 1}: ${test.escenario || '(sin escenario)'} [${test.tipo.toUpperCase()}]`);
        sb.push(`   Entrada: ${test.entrada || '(pendiente)'}`);
        sb.push(`   Resultado esperado: ${test.esperado || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('5. Plan de operación');
    sb.push('Roles y responsables: ' + (formData.roles || '(pendiente)'));
    sb.push('Cadencia de revisión: ' + (formData.cadencia || '(pendiente)'));
    sb.push('KPIs de seguimiento: ' + (formData.kpis || '(pendiente)'));
    sb.push('Proceso de incidencias: ' + (formData.incidencias || '(pendiente)'));
    sb.push('Proceso de cambios: ' + (formData.cambios || '(pendiente)'));
    sb.push('');
    sb.push('6. Demo final (role-play, 3 minutos)');
    sb.push('Guion de la demo: ' + (formData.demoGuion || '(pendiente)'));
    sb.push('Handoff a humano: ' + (formData.demoHandoff || '(pendiente)'));
    sb.push('');
    sb.push('7. Checklist final "Listo para operar"');
    sb.push('☐ Política de datos definida y aprobada');
    sb.push('☐ Salvaguardas de prompt injection implementadas');
    sb.push('☐ Prevención de abuso configurada');
    sb.push('☐ Protección de datos sensibles activa');
    sb.push('☐ 10 tests de seguridad superados');
    sb.push('☐ 15 tests funcionales superados (5/5/5)');
    sb.push('☐ Roles y cadencia de operación definidos');
    sb.push('☐ KPIs de seguimiento configurados');
    sb.push('☐ Proceso de incidencias documentado');
    sb.push('☐ Proceso de cambios establecido');
    sb.push('☐ Demo final realizada con handoff a humano');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFormData({
      empresa: 'BBVA', asistente: 'Blue', objetivo: '',
      politicaDatos: '', promptInjection: '', abuso: '', datosSensibles: '',
      roles: '', cadencia: '', kpis: '', incidencias: '', cambios: '',
      demoGuion: '', demoHandoff: '',
    });
    setTestsSeguridad(Array(10).fill({ nombre: '', tipo: 'prompt_injection' as const, descripcion: '', esperado: '' }));
    setTestsFuncionales(Array(15).fill({ escenario: '', entrada: '', esperado: '', tipo: 'happy' as const }));
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
      setStatus({ type: 'ok', message: 'Dossier operativo copiado al portapapeles.' });
    } catch {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Copia el texto manualmente.' });
    }
  };

  // Mini diálogo de ejemplo para la demo final
  const exampleDialog = useMemo(() => {
    return [
      { role: 'user' as const, text: 'Hola Blue, quiero consultar mi saldo disponible' },
      { role: 'bot' as const, text: 'Hola, soy Blue, tu asistente virtual de BBVA. Para consultar tu saldo, necesito verificar tu identidad. ¿Puedes confirmarme tu DNI o número de cliente?' },
      { role: 'user' as const, text: 'Mi DNI es 12345678A' },
      { role: 'bot' as const, text: 'Gracias. He verificado tu identidad. Tu saldo disponible en la cuenta principal es de 3.245,67€. ¿Necesitas algo más?' },
      { role: 'user' as const, text: 'Quiero que me devuelvan un cargo que no reconozco de 89€' },
      { role: 'bot' as const, text: 'Entiendo tu preocupación. Para reclamaciones de cargos no reconocidos, necesito derivarte a un agente especializado que podrá gestionar tu caso de forma personalizada. Voy a pasarle toda la información para que no tengas que repetir nada.' },
      { role: 'bot' as const, text: '🔒 Handoff activado: Reclamación cargo no reconocido · Cliente verificado · Importe: 89€ · Contexto completo transferido' },
    ];
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">10</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 10 · "Listo para operar" (BBVA Blue)</h1>
            <p className="text-sm text-slate-600">Dossier operativo: seguridad + control de cambios + demo final con handoff</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">BBVA · asistente Blue · alta exigencia en seguridad y privacidad</span>
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <strong className="font-semibold">Seguridad</strong> <span className="ml-1">prompt injection + abuso + datos sensibles + 10 tests</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Entregable</strong> <span className="ml-1">dossier operativo + 15 tests funcionales + demo 3 min + checklist</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-100 text-cyan-700 border-cyan-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            BBVA (asistente Blue) trabaja con un contexto de <strong>alta exigencia</strong>: privacidad, seguridad, riesgo reputacional y "errores caros". El reto es diseñar un <strong>paquete mínimo para operar</strong> un asistente: controles, pruebas, seguimiento y mejora continua.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li><strong>Política de datos y salvaguardas</strong>: prompt injection, abuso, datos sensibles.</li>
            <li><strong>Plan de pruebas de regresión</strong>: 10 tests seguridad + 15 funcionales (5/5/5) + ataques.</li>
            <li><strong>Rutina operativa mensual</strong>: métricas, revisión de logs, control de cambios.</li>
            <li><strong>Demo final (role-play)</strong>: 3 minutos con handoff a humano.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            Contexto de referencia: Blue, asistente virtual de BBVA (bbva.es/general/nueva-relacion-banca/blue.html)
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
                <span className="text-sm font-semibold text-slate-700">Progreso del dossier</span>
                <span className="text-sm font-bold text-slate-800">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                {seguridadCount}/10 seg.
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                {funcionalCount}/15 func.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mapa del dossier */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Estructura del dossier "Listo para operar"</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: '1', title: 'Política de datos', desc: 'Salvaguardas y protección', color: 'from-cyan-400 to-cyan-600' },
              { num: '2', title: 'Tests seguridad', desc: '10 tests: injection, abuso, datos', color: 'from-red-400 to-red-600' },
              { num: '3', title: 'Tests funcionales', desc: '15 tests: 5/5/5 happy/incompleto/límite', color: 'from-green-400 to-green-600' },
              { num: '4', title: 'Plan de operación', desc: 'Roles, KPIs, incidencias, cambios', color: 'from-purple-400 to-purple-600' },
              { num: '5', title: 'Demo final', desc: 'Role-play 3 min + handoff', color: 'from-amber-400 to-amber-600' },
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
        {/* Left Column - Formulario, Seguridad, Tests */}
        <div className="space-y-6">
          {/* Contexto base */}
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Contexto del dossier</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">base del proyecto</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Empresa / marca</label>
                  <Input
                    placeholder="Ej.: BBVA"
                    className="text-xs bg-white"
                    value={formData.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Nombre del asistente</label>
                  <Input
                    placeholder="Ej.: Blue"
                    className="text-xs bg-white"
                    value={formData.asistente}
                    onChange={(e) => updateField('asistente', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Objetivo del dossier</label>
                <Textarea
                  placeholder="Ej.: Preparar el paquete mínimo para operar el asistente Blue con seguridad, controles y mejora continua..."
                  className="text-xs bg-white min-h-[70px]"
                  value={formData.objetivo}
                  onChange={(e) => updateField('objetivo', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Política de datos y salvaguardas */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Política de datos y salvaguardas</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">seguridad y privacidad</Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Política general de datos
                  </label>
                  <Textarea
                    placeholder="Ej.: Los datos del cliente se cifran en tránsito y en reposo. No se almacenan conversaciones completas. Solo se retienen intents y métricas anonimizados."
                    className="text-xs bg-white min-h-[70px]"
                    value={formData.politicaDatos}
                    onChange={(e) => updateField('politicaDatos', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Bug className="h-3 w-3" />
                    Protección contra Prompt Injection
                  </label>
                  <Textarea
                    placeholder="Ej.: Filtrado de entrada, detección de patrones de injection, sandbox de ejecución, validación de salida antes de enviar al usuario."
                    className="text-xs bg-white min-h-[70px]"
                    value={formData.promptInjection}
                    onChange={(e) => updateField('promptInjection', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Prevención de abuso
                  </label>
                  <Textarea
                    placeholder="Ej.: Rate limiting, detección de patrones de abuso, bloqueo temporal tras N intentos, escalado a humano si persiste."
                    className="text-xs bg-white min-h-[70px]"
                    value={formData.abuso}
                    onChange={(e) => updateField('abuso', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Protección de datos sensibles
                  </label>
                  <Textarea
                    placeholder="Ej.: Enmascaramiento automático de DNI, cuentas, saldos. No mostrar datos completos en logs. Acceso solo con autenticación fuerte."
                    className="text-xs bg-white min-h-[70px]"
                    value={formData.datosSensibles}
                    onChange={(e) => updateField('datosSensibles', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tests de seguridad */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">10 Tests de seguridad</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">prompt injection + abuso + datos</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define 10 tests que cubran: prompt injection (3), abuso (3), datos sensibles (2), escalada de privilegios (2).
              </p>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {testsSeguridad.map((test, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Test S{index + 1}</span>
                        <select
                          className="text-xs bg-white border border-slate-200 rounded-md px-2 py-1"
                          value={test.tipo}
                          onChange={(e) => handleSeguridadChange(index, 'tipo', e.target.value as TestSeguridad['tipo'])}
                        >
                          <option value="prompt_injection">🐛 Prompt Injection</option>
                          <option value="abuso">⚠️ Abuso</option>
                          <option value="datos_sensibles">🔒 Datos sensibles</option>
                          <option value="escalada">🔑 Escalada privilegios</option>
                          <option value="otro">📋 Otro</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Nombre (ej.: Injection con instrucción oculta)"
                          className="text-xs bg-white"
                          value={test.nombre}
                          onChange={(e) => handleSeguridadChange(index, 'nombre', e.target.value)}
                        />
                        <Input
                          placeholder="Esperado (ej.: Bot rechaza y alerta)"
                          className="text-xs bg-white"
                          value={test.esperado}
                          onChange={(e) => handleSeguridadChange(index, 'esperado', e.target.value)}
                        />
                      </div>

                      <Textarea
                        placeholder="Descripción del test (ej.: Enviar mensaje con instrucción oculta en formato markdown para ver si el bot la ejecuta)"
                        className="text-xs bg-white min-h-[40px]"
                        value={test.descripcion}
                        onChange={(e) => handleSeguridadChange(index, 'descripcion', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tests funcionales */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">15 Tests funcionales (5/5/5)</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">happy + incompleto + límite</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                5 happy path (flujo normal), 5 datos incompletos, 5 casos límite/borde.
              </p>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {testsFuncionales.map((test, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Test F{index + 1}</span>
                        <select
                          className="text-xs bg-white border border-slate-200 rounded-md px-2 py-1"
                          value={test.tipo}
                          onChange={(e) => handleFuncionalChange(index, 'tipo', e.target.value as TestFuncional['tipo'])}
                        >
                          <option value="happy">✅ Happy path</option>
                          <option value="incompleto">⚠️ Datos incompletos</option>
                          <option value="limite">🔶 Límite/borde</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Escenario (ej.: Consulta de saldo con verificación)"
                          className="text-xs bg-white"
                          value={test.escenario}
                          onChange={(e) => handleFuncionalChange(index, 'escenario', e.target.value)}
                        />
                        <Input
                          placeholder="Entrada del usuario (ej.: Quiero ver mi saldo)"
                          className="text-xs bg-white"
                          value={test.entrada}
                          onChange={(e) => handleFuncionalChange(index, 'entrada', e.target.value)}
                        />
                      </div>

                      <Textarea
                        placeholder="Resultado esperado (ej.: Bot pide verificación, muestra saldo enmascarado, ofrece detalles)"
                        className="text-xs bg-white min-h-[40px]"
                        value={test.esperado}
                        onChange={(e) => handleFuncionalChange(index, 'esperado', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Plan de operación */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Plan de operación</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">rutina mensual</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Roles y responsables
                  </label>
                  <Textarea
                    placeholder="Ej.: Product Owner (decide cambios), Ingeniero ML (modelo), Analista QA (tests), Agente líder (feedback)"
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.roles}
                    onChange={(e) => updateField('roles', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Cadencia de revisión
                  </label>
                  <Textarea
                    placeholder="Ej.: Revisión mensual de métricas y logs. Trimestral: retraining del modelo. Anual: auditoría completa."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.cadencia}
                    onChange={(e) => updateField('cadencia', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    KPIs de seguimiento
                  </label>
                  <Textarea
                    placeholder="Ej.: % resolución sin agente, tasa de satisfacción, tiempo medio de respuesta, % escalados, tests fallidos, incidentes seguridad"
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.kpis}
                    onChange={(e) => updateField('kpis', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Proceso de incidencias
                  </label>
                  <Textarea
                    placeholder="Ej.: Detección automática → ticket → clasificación → resolución en 24h (crítico) / 72h (normal) → post-mortem"
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.incidencias}
                    onChange={(e) => updateField('incidencias', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Proceso de cambios
                </label>
                <Textarea
                  placeholder="Ej.: Propuesta → revisión → test en staging → aprobación → despliegue gradual → monitorización → rollback si KPIs caen"
                  className="text-xs bg-white min-h-[60px]"
                  value={formData.cambios}
                  onChange={(e) => updateField('cambios', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Demo final */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Demo final (role-play, 3 minutos)</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">con handoff a humano</Badge>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Guion de la demo
                  </label>
                  <Textarea
                    placeholder="Ej.: Min 0-1: Saludo y verificación. Min 1-2: Consulta de saldo y movimiento. Min 2-3: Reclamación y handoff a humano."
                    className="text-xs bg-white min-h-[80px]"
                    value={formData.demoGuion}
                    onChange={(e) => updateField('demoGuion', e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Handoff a humano
                  </label>
                  <Textarea
                    placeholder="Ej.: Bot detecta reclamación, resume contexto (cliente verificado, tipo de reclamación, importe), transfiere a agente con dossier completo."
                    className="text-xs bg-white min-h-[80px]"
                    value={formData.demoHandoff}
                    onChange={(e) => updateField('demoHandoff', e.target.value)}
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={generate}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Generar práctica 10
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
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview y Resumen */}
        <div className="space-y-6">
          {/* Mini diálogo de ejemplo */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Vista previa de la demo final</h3>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">role-play 3 min</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Así se vería una demo de 3 minutos con consulta, verificación y handoff a humano. El asistente Blue de BBVA.
              </p>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {exampleDialog.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                          : 'bg-gradient-to-br from-cyan-400 to-blue-600'
                      }`}>
                        {msg.role === 'user'
                          ? <User className="h-3.5 w-3.5 text-white" />
                          : <Bot className="h-3.5 w-3.5 text-white" />
                        }
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
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

          {/* Resumen generado */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Dossier operativo final</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">texto para pegar</Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Tests seguridad</span>
                  <strong className="text-lg text-red-600 font-headline">{seguridadCount}/10</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Tests funcionales</span>
                  <strong className="text-lg text-green-600 font-headline">{funcionalCount}/15</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Completitud</span>
                  <strong className="text-lg text-cyan-600 font-headline">{completionPercentage}%</strong>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El dossier aparecerá aquí después de generar...'}</pre>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={copySummary}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar dossier
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
                  <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                  <h4 className="text-sm font-semibold text-slate-700">Qué evalúa esta práctica</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 ml-4 list-disc">
                  <li>Si se han definido 10 tests de seguridad cubriendo injection, abuso, datos sensibles y escalada.</li>
                  <li>Si los 15 tests funcionales cubren happy path (5), datos incompletos (5) y límite (5).</li>
                  <li>Si la política de datos incluye salvaguardas claras y medibles.</li>
                  <li>Si el plan de operación define roles, cadencia, KPIs, incidencias y cambios.</li>
                  <li>Si la demo final incluye guion de 3 minutos con handoff a humano.</li>
                </ul>
              </div>

              {/* Consejo */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-cyan-50 border border-cyan-200">
                <Shield className="h-4 w-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-800">
                  <strong>Consejo final:</strong> En banca, un error del asistente puede ser muy costoso. La seguridad NO es negociable: cada test debe superarse antes de operar. El handoff a humano debe ser fluido y con contexto completo. ¡Buena suerte con la demo!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
