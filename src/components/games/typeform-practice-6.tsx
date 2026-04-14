'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Copy, Trash2, FileText, AlertCircle, CheckCircle2,
  GitBranch, Filter, Users, BarChart3, Zap, HelpCircle, Shield, UserCheck
} from 'lucide-react';

interface TestCase {
  id: string;
  tipo: 'normal' | 'incompleto' | 'limite';
  entrada: string;
  rutaEsperada: string;
  resultado: string;
}

interface Regla {
  prioridad: string;
  condicion: string;
  accion: string;
}

export default function TypeformPractice6() {
  const [reglas, setReglas] = useState<Regla[]>([
    { prioridad: 'Alta', condicion: '', accion: '' },
    { prioridad: 'Media', condicion: '', accion: '' },
    { prioridad: 'Baja', condicion: '', accion: '' },
    { prioridad: 'Revisión humana', condicion: '', accion: '' },
  ]);
  const [justificacion, setJustificacion] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>(Array(15).fill({ id: '', tipo: 'normal' as const, entrada: '', rutaEsperada: '', resultado: '' }));
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateRegla = (index: number, field: keyof Regla, value: string) => {
    const updated = [...reglas];
    updated[index] = { ...updated[index], [field]: value };
    setReglas(updated);
  };

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const generate = () => {
    const missing: string[] = [];
    const filledReglas = reglas.filter(r => r.condicion && r.accion);
    if (filledReglas.length < 4) missing.push('4 reglas de prioridad');
    if (!justificacion) missing.push('justificación de reglas');
    const filledTests = testCases.filter(tc => tc.entrada && tc.rutaEsperada);
    if (filledTests.length < 15) missing.push('15 casos de prueba (5 normales, 5 incompletos, 5 límite)');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Escenario Router/Filters completo.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 6 — MAKE NIVEL 2: ROUTER/FILTERS + RUTA DE REVISIÓN (Typeform)');
    sb.push('');
    sb.push('1. Reglas de prioridad (Router/Filters)');
    sb.push('');
    reglas.forEach((r, i) => {
      if (r.condicion && r.accion) {
        sb.push(`Prioridad ${r.prioridad}:`);
        sb.push(`  Condición: ${r.condicion}`);
        sb.push(`  Acción: ${r.accion}`);
        sb.push('');
      }
    });
    sb.push('2. Justificación de reglas');
    sb.push(justificacion);
    sb.push('');
    sb.push('3. 15 casos de prueba');
    sb.push('');
    testCases.forEach((tc, i) => {
      if (tc.entrada && tc.rutaEsperada) {
        sb.push(`Caso ${i + 1} (${tc.tipo}):`);
        sb.push(`  Entrada: ${tc.entrada}`);
        sb.push(`  Ruta esperada: ${tc.rutaEsperada}`);
        sb.push(`  Resultado: ${tc.resultado || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- Make (make.com): construir Router con 4 ramas + Filters + ruta de revisión humana');
    sb.push('- VS Code + Qwen CLI: "Diseña un escenario Make con Router de 4 rutas para leads B2B: alta prioridad → comercial senior + aviso inmediato, media → cola estándar, baja → nurturing email, revisión humana → antes de actuar. Incluye reglas de filtrado"');
    sb.push('- Gemini Pro (Antigravity): "Genera 15 casos de prueba para un Router de leads: 5 normales (empresa grande con urgencia, startup interesada, estudiante, etc.), 5 incompletos (falta empresa, falta email, etc.), 5 límite (empresa mediana sin urgencia, presupuesto ajustado, etc.)"');
    sb.push('- Alternativas gratuitas: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)');
    sb.push('- Si no tienes acceso a Make: diseña el Router en draw.io con las 4 rutas y describe las reglas de cada Filter');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setReglas([
      { prioridad: 'Alta', condicion: '', accion: '' },
      { prioridad: 'Media', condicion: '', accion: '' },
      { prioridad: 'Baja', condicion: '', accion: '' },
      { prioridad: 'Revisión humana', condicion: '', accion: '' },
    ]);
    setJustificacion('');
    setTestCases(Array(15).fill({ id: '', tipo: 'normal' as const, entrada: '', rutaEsperada: '', resultado: '' }));
    setSummary(''); setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado.' }); }
    catch { setStatus({ type: 'error', message: 'Copia manualmente.' }); }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">6</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 6 · Make Nivel 2: Router/Filters + Ruta de Revisión (Typeform)</h1>
            <p className="text-sm text-slate-600">Construye lógica de Router con 4 rutas + 15 casos de prueba + reglas de prioridad</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200"><GitBranch className="h-3 w-3 mr-1" /> 4 rutas</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Filter className="h-3 w-3 mr-1" /> 15 casos prueba</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Zap className="h-3 w-3 mr-1" /> Vibe Coding</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="h-5 w-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-100 text-cyan-700 border-cyan-300">Typeform · software B2B</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una empresa de software B2B recibe leads muy variados. No todos merecen atención comercial: algunos son estudiantes, otros piden "prueba gratis", otros son empresas grandes con urgencia. Quieren que la automatización <strong>enrute automáticamente</strong>: alta prioridad → comercial senior, media → cola estándar, baja → nurturing, sensible/ambiguo → revisión humana.
          </p>

          {/* Step-by-step help */}
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 space-y-3">
            <h4 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para construir el Router</h4>
            <div className="space-y-2 text-xs text-cyan-800">
              <p><strong>Paso 1 — Trigger:</strong> Webhook cuando se envía el formulario de contacto/demo.</p>
              <p><strong>Paso 2 — Router:</strong> Añade un módulo Router que divide el flujo en 4 caminos. Cada camino tiene un Filter con reglas diferentes.</p>
              <p><strong>Paso 3 — Ruta Alta:</strong> Filter: empresa grande + urgencia + presupuesto. Acción: crear tarea para comercial senior + aviso inmediato (Slack/Teams).</p>
              <p><strong>Paso 4 — Ruta Media:</strong> Filter: empresa mediana + interés genuino. Acción: añadir a cola estándar de CRM.</p>
              <p><strong>Paso 5 — Ruta Baja:</strong> Filter: estudiante, prueba gratis, sin presupuesto. Acción: enviar email informativo (nurturing).</p>
              <p><strong>Paso 6 — Ruta Revisión:</strong> Filter: caso ambiguo, datos inconsistentes, sensible. Acción: notificar a humano para revisión antes de actuar.</p>
              <p><strong>Paso 7 — Filtros antes de pasos caros:</strong> Coloca los Filters ANTES de crear tareas en CRM o enviar emails para evitar ejecuciones innecesarias.</p>
              <p><strong>Paso 8 — Pruebas:</strong> Ejecuta 15 casos (5 normales, 5 incompletos, 5 límite). Verifica que cada uno va a la ruta correcta.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-200 text-xs text-cyan-800">
            <strong>💡 Herramientas Vibe Coding:</strong> Make (make.com) para construir el Router. VS Code + Qwen CLI para diseñar las reglas. Gemini Pro (Antigravity) para generar los 15 casos de prueba. Alternativas gratuitas: Claude, ChatGPT, Gemini. Si no tienes acceso a Make: diseña en draw.io y describe cada regla.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Reglas */}
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><Filter className="h-4 w-4" /> 4 reglas de prioridad (Router/Filters)</h3>
              {reglas.map((r, i) => (
                <Card key={i} className="border-slate-200 bg-white">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Prioridad: {r.prioridad}</span>
                      <Badge variant="outline" className={`text-[9px] ${
                        r.prioridad === 'Alta' ? 'bg-red-100 text-red-700 border-red-200' :
                        r.prioridad === 'Media' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        r.prioridad === 'Baja' ? 'bg-green-100 text-green-700 border-green-200' :
                        'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>{r.prioridad}</Badge>
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Condición del Filter (ej.: empresa = 'grande' AND urgencia = 'si')" className="text-xs bg-white" value={r.condicion} onChange={(e) => updateRegla(i, 'condicion', e.target.value)} />
                      <Input placeholder="Acción (ej.: crear tarea comercial senior + aviso Slack)" className="text-xs bg-white" value={r.accion} onChange={(e) => updateRegla(i, 'accion', e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Justificación de las reglas</label>
                <Textarea placeholder="Ej.: La prioridad Alta se asigna a empresas grandes con urgencia porque el coste de oportunidad es alto. La ruta de Revisión humana captura casos ambiguos donde la IA no puede decidir con confianza..." className="text-xs bg-white min-h-[80px]" value={justificacion} onChange={(e) => setJustificacion(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Test Cases */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> 15 casos de prueba (5 normales, 5 incompletos, 5 límite)</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {testCases.map((tc, i) => (
                  <Card key={i} className="border-slate-200 bg-white">
                    <CardContent className="p-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-700">Caso {i + 1}</span>
                        <select
                          className="text-[9px] bg-white border border-slate-200 rounded px-1.5 py-0.5"
                          value={tc.tipo}
                          onChange={(e) => updateTestCase(i, 'tipo', e.target.value as TestCase['tipo'])}
                        >
                          <option value="normal">Normal</option>
                          <option value="incompleto">Incompleto</option>
                          <option value="limite">Límite</option>
                        </select>
                      </div>
                      <Input placeholder="Entrada (datos del lead)" className="text-[10px] bg-white h-7" value={tc.entrada} onChange={(e) => updateTestCase(i, 'entrada', e.target.value)} />
                      <Input placeholder="Ruta esperada (alta/media/baja/revisión)" className="text-[10px] bg-white h-7" value={tc.rutaEsperada} onChange={(e) => updateTestCase(i, 'rutaEsperada', e.target.value)} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Generar entregable
            </Button>
            <Button onClick={clearAll} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>

          {/* Summary */}
          {summary && (
            <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Entregable final</h3>
                  <Button onClick={copySummary} variant="outline" size="sm" className="border-slate-300"><Copy className="h-3.5 w-3.5 mr-1" /> Copiar</Button>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                  <pre className="whitespace-pre-wrap">{summary}</pre>
                </div>
                {status.message && (
                  <div className={`flex items-center gap-2 text-sm p-2.5 rounded-lg ${status.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
                    {status.message}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
