'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Copy, Trash2, FileText, AlertCircle, CheckCircle2,
  Webhook, Database, Mail, BarChart3, Zap, HelpCircle, Lightbulb, Shield, ArrowRightLeft
} from 'lucide-react';

interface TestCase {
  id: string;
  tipo: string;
  entrada: string;
  esperado: string;
  resultado: string;
}

export default function SeurPractice5() {
  const [trigger, setTrigger] = useState('');
  const [camposMinimos, setCamposMinimos] = useState('');
  const [rutaOk, setRutaOk] = useState('');
  const [rutaFaltan, setRutaFaltan] = useState('');
  const [traceId, setTraceId] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 'tc1', tipo: 'OK', entrada: '', esperado: '', resultado: '' },
    { id: 'tc2', tipo: 'Faltan datos', entrada: '', esperado: '', resultado: '' },
    { id: 'tc3', tipo: 'Caso ambiguo', entrada: '', esperado: '', resultado: '' },
  ]);
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const generate = () => {
    const missing: string[] = [];
    if (!trigger) missing.push('trigger');
    if (!camposMinimos) missing.push('campos mínimos');
    if (!rutaOk) missing.push('ruta OK');
    if (!rutaFaltan) missing.push('ruta faltan datos');
    const filledTests = testCases.filter(tc => tc.entrada && tc.esperado);
    if (filledTests.length < 3) missing.push('3 casos de prueba');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Escenario MVP completo.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 5 — MAKE NIVEL 1: PRIMER ESCENARIO REPRODUCIBLE (SEUR)');
    sb.push('');
    sb.push('1. Trigger del escenario');
    sb.push(trigger);
    sb.push('');
    sb.push('2. Campos mínimos del formulario de incidencia');
    sb.push(camposMinimos);
    sb.push('');
    sb.push('3. Ruta OK (datos completos)');
    sb.push(rutaOk);
    sb.push('');
    sb.push('4. Ruta "Faltan datos"');
    sb.push(rutaFaltan);
    sb.push('');
    sb.push('5. Trazabilidad (trace_id)');
    sb.push(traceId || 'trace_id generado automáticamente en cada ejecución');
    sb.push('');
    sb.push('6. Casos de prueba (3 entradas reproducibles)');
    sb.push('');
    testCases.forEach((tc, i) => {
      if (tc.entrada && tc.esperado) {
        sb.push(`Caso ${i + 1} (${tc.tipo}):`);
        sb.push(`  Entrada: ${tc.entrada}`);
        sb.push(`  Esperado: ${tc.esperado}`);
        sb.push(`  Resultado: ${tc.resultado || '(pendiente de ejecutar)'}`);
        sb.push('');
      }
    });
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- Make (make.com): construir el escenario visual con Webhook → Filter → Google Sheets → Email');
    sb.push('- VS Code + Qwen CLI: "Diseña un escenario Make para automatizar formulario de incidencia de envío: webhook valida campos mínimos, crea fila en Google Sheets y envía email al responsable. Incluye trace_id"');
    sb.push('- Gemini Pro (Antigravity): "Genera 3 casos de prueba para un escenario de incidencias de envío: 1 OK, 1 faltan datos, 1 ambiguo. Incluye entrada esperada y salida"');
    sb.push('- Alternativas gratuitas: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)');
    sb.push('- Si no tienes acceso a Make: diseña el escenario en draw.io con los módulos y describe cada paso');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setTrigger(''); setCamposMinimos(''); setRutaOk(''); setRutaFaltan(''); setTraceId('');
    setTestCases([
      { id: 'tc1', tipo: 'OK', entrada: '', esperado: '', resultado: '' },
      { id: 'tc2', tipo: 'Faltan datos', entrada: '', esperado: '', resultado: '' },
      { id: 'tc3', tipo: 'Caso ambiguo', entrada: '', esperado: '', resultado: '' },
    ]);
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">5</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 5 · Make Nivel 1: Primer Escenario Reproducible (SEUR)</h1>
            <p className="text-sm text-slate-600">Construye un MVP con trigger, validación, salida visible y 3 casos de prueba</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Webhook className="h-3 w-3 mr-1" /> Trigger + Validación</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Database className="h-3 w-3 mr-1" /> 3 casos de prueba</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Zap className="h-3 w-3 mr-1" /> Vibe Coding</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-700 border-green-300">SEUR · logística</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            SEUR quiere automatizar un primer paso muy acotado: cuando entra un formulario de <strong>"incidencia de envío"</strong>, crear un registro interno (sheet) y avisar a un responsable. Solo piden un <strong>MVP reproducible</strong>, con trazabilidad y control de datos mínimos antes de crecer a ticketing real.
          </p>

          {/* Step-by-step help */}
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-3">
            <h4 className="text-sm font-bold text-green-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para construir el escenario</h4>
            <div className="space-y-2 text-xs text-green-800">
              <p><strong>Paso 1 — Trigger:</strong> Elige cómo se dispara el escenario. Opciones: Webhook (cuando alguien envía el formulario) o Watch (revisar cada X minutos si hay nuevos formularios).</p>
              <p><strong>Paso 2 — Validación:</strong> Añade un módulo Filter que compruebe si los campos mínimos están presentes (número de pedido, tipo de incidencia, email de contacto).</p>
              <p><strong>Paso 3 — Ruta OK:</strong> Si los campos están completos → crea una fila en Google Sheets con los datos + trace_id → envía email al responsable.</p>
              <p><strong>Paso 4 — Ruta "Faltan datos":</strong> Si faltan campos → envía email pidiendo los datos faltantes al cliente → registra el intento en logs.</p>
              <p><strong>Paso 5 — Trazabilidad:</strong> Cada ejecución debe generar un trace_id único (puedes usar timestamp + random). Registra qué se ejecutó y cuándo.</p>
              <p><strong>Paso 6 — Pruebas:</strong> Ejecuta 3 veces con las mismas entradas. Verifica que la salida es siempre la esperada (reproducibilidad).</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-green-800">
            <strong>💡 Herramientas Vibe Coding:</strong> Make (make.com) para construir el escenario. VS Code + Qwen CLI para diseñar la lógica. Gemini Pro (Antigravity) para generar casos de prueba. Alternativas gratuitas: Claude, ChatGPT, Gemini. Si no tienes acceso a Make: diseña en draw.io y describe cada paso.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Trigger + Campos */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-2"><Webhook className="h-4 w-4" /> Trigger y campos mínimos</h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Trigger del escenario</label>
                <Textarea placeholder="Ej.: Webhook POST /incidencias cuando el cliente envía el formulario de incidencia de envío" className="text-xs bg-white min-h-[60px]" value={trigger} onChange={(e) => setTrigger(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Campos mínimos del formulario</label>
                <Textarea placeholder={"numero_pedido: texto (obligatorio)\ntipo_incidencia: lista [no_recibido, danado, direccion_incorrecta, otro]\nemail_contacto: email (obligatorio)\ndescripcion: texto (opcional)"} className="text-xs bg-white min-h-[100px] font-mono" value={camposMinimos} onChange={(e) => setCamposMinimos(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Rutas */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" /> Rutas OK y "Faltan datos"</h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-green-700 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Ruta OK (datos completos)</label>
                <Textarea placeholder="1. Filter: todos los campos obligatorios presentes\n2. Crear fila en Google Sheets con datos + trace_id\n3. Enviar email al responsable con resumen" className="text-xs bg-white min-h-[80px]" value={rutaOk} onChange={(e) => setRutaOk(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-amber-700 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Ruta "Faltan datos"</label>
                <Textarea placeholder="1. Filter: falta al menos 1 campo obligatorio\n2. Enviar email al cliente pidiendo datos faltantes\n3. Registrar intento en log con trace_id y campos faltantes" className="text-xs bg-white min-h-[80px]" value={rutaFaltan} onChange={(e) => setRutaFaltan(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Shield className="h-3 w-3" /> Trazabilidad (trace_id)</label>
                <Textarea placeholder="Ej.: trace_id = INC-fecha-{{random(1000,9999)}. Se registra en cada ejecución y se incluye en logs y notificaciones." className="text-xs bg-white min-h-[60px]" value={traceId} onChange={(e) => setTraceId(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Test Cases */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> 3 casos de prueba reproducibles</h3>
              {testCases.map((tc, i) => (
                <Card key={tc.id} className="border-slate-200 bg-white">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">Caso {i + 1}</span>
                      <Badge variant="outline" className={`text-[9px] ${
                        tc.tipo === 'OK' ? 'bg-green-100 text-green-700 border-green-200' :
                        tc.tipo === 'Faltan datos' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>{tc.tipo}</Badge>
                    </div>
                    <div className="space-y-1">
                      <Input placeholder="Entrada (datos del formulario)" className="text-xs bg-white" value={tc.entrada} onChange={(e) => updateTestCase(i, 'entrada', e.target.value)} />
                      <Input placeholder="Resultado esperado" className="text-xs bg-white" value={tc.esperado} onChange={(e) => updateTestCase(i, 'esperado', e.target.value)} />
                      <Input placeholder="Resultado obtenido (tras ejecutar)" className="text-xs bg-white" value={tc.resultado} onChange={(e) => updateTestCase(i, 'resultado', e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg">
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
