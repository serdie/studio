'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Zap,
  Clock,
  AlertTriangle,
  BarChart3,
  Shield,
  Repeat
} from 'lucide-react';

interface FlowData {
  trigger: string;
  entrada: string;
  salida: string;
  kpi: string;
  riesgo: string;
  mitigacion: string;
  idempotencia: string;
}

export default function GlovoPractice3() {
  const [flowA, setFlowA] = useState<FlowData>({
    trigger: '', entrada: '', salida: '', kpi: '', riesgo: '', mitigacion: '', idempotencia: ''
  });
  const [flowB, setFlowB] = useState<FlowData>({
    trigger: '', entrada: '', salida: '', kpi: '', riesgo: '', mitigacion: '', idempotencia: ''
  });
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateFlow = (flow: 'A' | 'B', field: keyof FlowData, value: string) => {
    const setter = flow === 'A' ? setFlowA : setFlowB;
    const current = flow === 'A' ? flowA : flowB;
    setter({ ...current, [field]: value });
  };

  const generate = () => {
    const missing: string[] = [];
    if (!flowA.trigger) missing.push('trigger flujo A');
    if (!flowB.trigger) missing.push('trigger flujo B');
    if (!flowA.kpi) missing.push('KPI flujo A');
    if (!flowB.kpi) missing.push('KPI flujo B');
    if (!flowA.idempotencia) missing.push('idempotencia flujo A');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Tabla comparativa A/B completa.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 3 — TRIGGER: EVENTO vs CRON vs POLLING (Glovo)');
    sb.push('');
    sb.push('FLUJO A — Incidencias en tiempo real (en caliente)');
    sb.push(`Trigger: ${flowA.trigger}`);
    sb.push(`Entrada: ${flowA.entrada}`);
    sb.push(`Salida: ${flowA.salida}`);
    sb.push(`KPI principal: ${flowA.kpi}`);
    sb.push(`Riesgo: ${flowA.riesgo}`);
    sb.push(`Mitigación: ${flowA.mitigacion}`);
    sb.push(`Idempotencia: ${flowA.idempotencia}`);
    sb.push('');
    sb.push('FLUJO B — Resumen diario de incidencias por zona (batch)');
    sb.push(`Trigger: ${flowB.trigger}`);
    sb.push(`Entrada: ${flowB.entrada}`);
    sb.push(`Salida: ${flowB.salida}`);
    sb.push(`KPI principal: ${flowB.kpi}`);
    sb.push(`Riesgo: ${flowB.riesgo}`);
    sb.push(`Mitigación: ${flowB.mitigacion}`);
    sb.push(`Idempotencia: ${flowB.idempotencia}`);
    sb.push('');
    sb.push('COMPARATIVA');
    sb.push(`| Aspecto | Flujo A (tiempo real) | Flujo B (diario) |`);
    sb.push(`| Trigger | ${flowA.trigger} | ${flowB.trigger} |`);
    sb.push(`| Latencia | Inmediata (< 1 min) | Programada (24h) |`);
    sb.push(`| Riesgo duplicados | ${flowA.riesgo} | ${flowB.riesgo} |`);
    sb.push(`| Coste ejecuciones | Alto (volumen) | Bajo (1/día) |`);
    sb.push('');
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- VS Code + Qwen CLI: "Compara triggers webhook vs cron vs polling para un sistema de incidencias. Dame ventajas, riesgos y coste por ejecución"');
    sb.push('- Gemini Pro (Antigravity): "Diseña una estrategia de idempotencia para evitar duplicados en un flujo de incidencias con trace_id"');
    sb.push('- CLI Qwen: "Genera una tabla comparativa de triggers para automatización de procesos"');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFlowA({ trigger: '', entrada: '', salida: '', kpi: '', riesgo: '', mitigacion: '', idempotencia: '' });
    setFlowB({ trigger: '', entrada: '', salida: '', kpi: '', riesgo: '', mitigacion: '', idempotencia: '' });
    setSummary(''); setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado.' }); }
    catch { setStatus({ type: 'error', message: 'Copia manualmente.' }); }
  };

  const FlowCard = ({ label, flow, update }: { label: string; flow: FlowData; update: (field: keyof FlowData, value: string) => void }) => (
    <Card className="border-slate-200 bg-white">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800">{label}</span>
          <Badge variant="outline" className="text-[10px] bg-slate-100 text-slate-600 border-slate-300">
            {label.includes('A') ? '⚡ Tiempo real' : '📅 Batch diario'}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><Zap className="h-2.5 w-2.5" /> Trigger</label>
            <Input placeholder="Ej.: webhook, cron 0 8 * * *, polling cada 5min" className="text-xs bg-white" value={flow.trigger} onChange={(e) => update('trigger', e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><BarChart3 className="h-2.5 w-2.5" /> KPI principal</label>
            <Input placeholder="Ej.: tiempo medio de respuesta < 2min" className="text-xs bg-white" value={flow.kpi} onChange={(e) => update('kpi', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600">Entrada</label>
            <Input placeholder="Ej.: incidencia con pedido_id, tipo, zona" className="text-xs bg-white" value={flow.entrada} onChange={(e) => update('entrada', e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600">Salida</label>
            <Input placeholder="Ej.: ticket creado + notificación al rider" className="text-xs bg-white" value={flow.salida} onChange={(e) => update('salida', e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><AlertTriangle className="h-2.5 w-2.5" /> Riesgo</label>
            <Input placeholder="Ej.: duplicados por reintento automático" className="text-xs bg-white" value={flow.riesgo} onChange={(e) => update('riesgo', e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><Shield className="h-2.5 w-2.5" /> Mitigación</label>
            <Input placeholder="Ej.: trace_id único + check antes de crear" className="text-xs bg-white" value={flow.mitigacion} onChange={(e) => update('mitigacion', e.target.value)} />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-slate-600 flex items-center gap-1"><Repeat className="h-2.5 w-2.5" /> Idempotencia (cómo evitar duplicados)</label>
          <Textarea placeholder="Ej.: Usar trace_id como clave única. Antes de crear ticket, verificar si ya existe uno con el mismo trace_id en los últimos 5 minutos." className="text-xs bg-white min-h-[50px]" value={flow.idempotencia} onChange={(e) => update('idempotencia', e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">3</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 3 · Trigger: Evento vs Cron vs Polling (Glovo)</h1>
            <p className="text-sm text-slate-600">Propón 2 flujos (tiempo real + batch) y justifica trigger, latencia, riesgo e idempotencia</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Zap className="h-3 w-3 mr-1" /> Tiempo real</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Clock className="h-3 w-3 mr-1" /> Batch diario</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Repeat className="h-3 w-3 mr-1" /> Idempotencia</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-700 border-green-300">Glovo · delivery</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Glovo recibe incidencias operativas en tiempo real (pedidos retrasados, entrega fallida, reclamaciones), pero también necesita consolidar informes diarios para operaciones. Quieren automatizar dos cosas: <strong>A) un flujo "en caliente"</strong> para incidencias, y <strong>B) un resumen diario</strong> de incidencias por zona. La decisión clave: cómo se dispara cada flujo (evento / cron / polling) y qué riesgos genera.
          </p>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-green-800">
            <strong>💡 Herramientas Vibe Coding:</strong> VS Code + Qwen CLI para comparar triggers. Gemini Pro (Antigravity) para diseñar idempotencia. CLI Qwen para generar tablas comparativas.
          </div>
        </CardContent>
      </Card>

      {/* Flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlowCard label="Flujo A — Incidencias en tiempo real" flow={flowA} update={(f, v) => updateFlow('A', f, v)} />
        <FlowCard label="Flujo B — Resumen diario (batch)" flow={flowB} update={(f, v) => updateFlow('B', f, v)} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={generate} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg">
          <FileText className="h-4 w-4 mr-2" />
          Generar tabla comparativa
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
  );
}
