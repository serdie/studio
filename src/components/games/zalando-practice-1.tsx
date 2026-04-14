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
  Map,
  ArrowRightLeft,
  Target,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';

export default function ZalandoPractice1() {
  const [proceso, setProceso] = useState('');
  const [asiSteps, setAsiSteps] = useState('');
  const [tobeSteps, setTobeSteps] = useState('');
  const [alcanceIncluye, setAlcanceIncluye] = useState('');
  const [alcanceExcluye, setAlcanceExcluye] = useState('');
  const [puntosControl, setPuntosControl] = useState('');
  const [excepciones, setExcepciones] = useState('');
  const [matriz, setMatriz] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!proceso) missing.push('proceso troncal');
    if (getLines(asiSteps).length < 8) missing.push('mínimo 8 pasos AS-IS');
    if (getLines(tobeSteps).length < 3) missing.push('rutas TO-BE (OK/revisión/error)');
    if (!excepciones || getLines(excepciones).length < 6) missing.push('mínimo 6 excepciones');
    if (!matriz) missing.push('matriz valor/riesgo');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Mapa AS-IS/TO-BE completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 1 — CASO TRONCAL Y MAPA AS-IS → TO-BE (Zalando)');
    sb.push('');
    sb.push('1. Proceso troncal elegido');
    sb.push(proceso);
    sb.push('');
    sb.push('2. Matriz rápida (valor/riesgo/datos/complejidad)');
    sb.push(matriz);
    sb.push('');
    sb.push('3. Mapa AS-IS (proceso actual)');
    getLines(asiSteps).forEach((step, i) => sb.push(`  ${i + 1}. ${step}`));
    sb.push('');
    sb.push('4. Mapa TO-BE (con automatización + control)');
    sb.push(tobeSteps);
    sb.push('');
    sb.push('5. Alcance');
    sb.push('Incluye: ' + (alcanceIncluye || '(pendiente)'));
    sb.push('Excluye: ' + (alcanceExcluye || '(pendiente)'));
    sb.push('');
    sb.push('6. Puntos de control humano');
    sb.push(puntosControl || '(pendiente)');
    sb.push('');
    sb.push('7. Lista de excepciones (mín. 6)');
    getLines(excepciones).forEach((exc, i) => sb.push(`  ${i + 1}. ${exc}`));
    sb.push('');
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- VS Code + Qwen (CLI o extensión) para generar diagramas en Mermaid/PlantUML');
    sb.push('- Antigravity + Gemini Pro para análisis del proceso y sugerencias de automatización');
    sb.push('- draw.io / Miro para el mapa visual final');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setProceso(''); setAsiSteps(''); setTobeSteps('');
    setAlcanceIncluye(''); setAlcanceExcluye(''); setPuntosControl('');
    setExcepciones(''); setMatriz(''); setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado al portapapeles.' }); }
    catch { setStatus({ type: 'error', message: 'No se pudo copiar. Copia manualmente.' }); }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">1</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 1 · Caso Troncal y Mapa AS-IS → TO-BE (Zalando)</h1>
            <p className="text-sm text-slate-600">Elige un proceso automatizable, mapea el estado actual y diseña el futuro con automatización + IA</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><Map className="h-3 w-3 mr-1" /> AS-IS / TO-BE</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Target className="h-3 w-3 mr-1" /> Matriz valor/riesgo</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Zap className="h-3 w-3 mr-1" /> Vibe Coding</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Map className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-orange-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-orange-100 text-orange-700 border-orange-300">Zalando · e-commerce</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Zalando quiere reducir el tiempo que su equipo de soporte dedica a clasificar y registrar incidencias de pedidos (devolución, entrega fallida, cambio de talla, facturación). La información llega desordenada por email/formulario: a veces falta número de pedido, otras el cliente mezcla temas. La empresa pide un primer paso: <strong>elegir un caso "troncal" automatizable</strong> y describirlo con precisión.
          </p>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>💡 Herramientas Vibe Coding:</strong> VS Code + Qwen (CLI o extensión) para generar diagramas en Mermaid. Antigravity + Gemini Pro para análisis del proceso. draw.io / Miro para el mapa visual final.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Proceso troncal */}
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2"><Target className="h-4 w-4" /> Proceso troncal y matriz</h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Proceso troncal elegido</label>
                <Textarea placeholder="Ej.: Devolución y reembolso por incidencia de entrega" className="text-xs bg-white min-h-[60px]" value={proceso} onChange={(e) => setProceso(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Matriz rápida (valor/riesgo/datos/complejidad)</label>
                <Textarea placeholder="Valor: Alto | Riesgo: Medio | Datos disponibles: Sí | Complejidad: Media" className="text-xs bg-white min-h-[60px]" value={matriz} onChange={(e) => setMatriz(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* AS-IS */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-red-900 flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" /> Mapa AS-IS (proceso actual, 8-12 pasos)</h3>
              <Textarea placeholder={"1. Cliente envía email con incidencia\n2. Soporte lee y clasifica manualmente\n3. Busca pedido en sistema\n4. Registra ticket en CRM\n5. ..."} className="text-xs bg-white min-h-[150px] font-mono" value={asiSteps} onChange={(e) => setAsiSteps(e.target.value)} />
            </CardContent>
          </Card>

          {/* TO-BE */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-2"><Zap className="h-4 w-4" /> Mapa TO-BE (con automatización + rutas)</h3>
              <Textarea placeholder={"Ruta OK (datos completos):\n1. IA clasifica automáticamente → 2. Crea ticket → 3. Notifica\n\nRuta Revisión (faltan datos/caso sensible):\n1. IA pide datos faltantes → 2. Deriva a humano\n\nRuta Error (fallo técnico):\n1. Reintento → 2. Si persiste, alerta a ops"} className="text-xs bg-white min-h-[150px] font-mono" value={tobeSteps} onChange={(e) => setTobeSteps(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Alcance */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Alcance y puntos de control</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Incluye</label>
                  <Textarea placeholder="Ej.: Clasificación automática de incidencias de entrega" className="text-xs bg-white min-h-[60px]" value={alcanceIncluye} onChange={(e) => setAlcanceIncluye(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Excluye</label>
                  <Textarea placeholder="Ej.: Reembolsos > 100€, reclamaciones legales" className="text-xs bg-white min-h-[60px]" value={alcanceExcluye} onChange={(e) => setAlcanceExcluye(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Puntos de control humano</label>
                <Textarea placeholder="Ej.: Revisión humana antes de procesar reembolsos > 50€" className="text-xs bg-white min-h-[60px]" value={puntosControl} onChange={(e) => setPuntosControl(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Excepciones */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Lista de excepciones (mín. 6)</h3>
              <Textarea placeholder={"1. Falta número de pedido\n2. Cliente mezcla temas (devolución + cambio de dirección)\n3. Pedido ya reembolsado previamente\n4. Cliente solicita excepción a política\n5. Datos de pago inconsistentes\n7. Timeout del sistema de pedidos"} className="text-xs bg-white min-h-[150px] font-mono" value={excepciones} onChange={(e) => setExcepciones(e.target.value)} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg">
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
