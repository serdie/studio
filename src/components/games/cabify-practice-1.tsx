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
  Target,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react';

export default function CabifyPractice1() {
  const [investigacion, setInvestigacion] = useState('');
  const [creacion, setCreacion] = useState('');
  const [distribucion, setDistribucion] = useState('');
  const [medicion, setMedicion] = useState('');
  const [optimizacion, setOptimizacion] = useState('');
  const [kpisRendimiento, setKpisRendimiento] = useState('');
  const [kpisRiesgo, setKpisRiesgo] = useState('');
  const [noAutomatizar, setNoAutomatizar] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    const totalCasos =
      getLines(investigacion).length +
      getLines(creacion).length +
      getLines(distribucion).length +
      getLines(medicion).length +
      getLines(optimizacion).length;

    if (getLines(investigacion).length < 2) missing.push('mín. 2 casos en Investigación');
    if (getLines(creacion).length < 2) missing.push('mín. 2 casos en Creación');
    if (getLines(distribucion).length < 2) missing.push('mín. 2 casos en Distribución');
    if (getLines(medicion).length < 2) missing.push('mín. 2 casos en Medición');
    if (getLines(optimizacion).length < 2) missing.push('mín. 2 casos en Optimización');
    if (totalCasos < 12) missing.push(`mín. 12 casos totales (tienes ${totalCasos})`);
    if (getLines(kpisRendimiento).length < 6) missing.push('mín. 6 KPIs de rendimiento');
    if (getLines(kpisRiesgo).length < 2) missing.push('mín. 2 KPIs de riesgo/calidad');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: `Mapa con ${totalCasos} casos de uso completos según los mínimos.` });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 1 — MAPA DE CASOS DE USO + KPIs POR FASE (Cabify)');
    sb.push('Fase del ciclo: Investigación → Creación → Distribución → Medición → Optimización');
    sb.push('');
    sb.push('1) FASE: INVESTIGACIÓN');
    getLines(investigacion).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('2) FASE: CREACIÓN');
    getLines(creacion).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('3) FASE: DISTRIBUCIÓN');
    getLines(distribucion).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('4) FASE: MEDICIÓN');
    getLines(medicion).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('5) FASE: OPTIMIZACIÓN');
    getLines(optimizacion).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('KPIs DE RENDIMIENTO (mín. 6)');
    getLines(kpisRendimiento).forEach((k, i) => sb.push(`  ${i + 1}. ${k}`));
    sb.push('');
    sb.push('KPIs DE RIESGO / CALIDAD (mín. 2, p. ej. % claims pendientes de validar)');
    getLines(kpisRiesgo).forEach((k, i) => sb.push(`  ${i + 1}. ${k}`));
    sb.push('');
    sb.push('QUÉ NO AUTOMATIZAR (límites éticos / reputacionales)');
    sb.push(noAutomatizar || '(pendiente)');
    sb.push('');
    sb.push('Brief mínimo recordatorio: objetivo, audiencia, oferta, objeciones, prueba, canal, tono, restricciones.');
    sb.push('Datos personales: anonimiza con [EMAIL], [TEL], [CLIENTE], [PEDIDO_ID].');
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude/Gemini + Google Sheets.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setInvestigacion(''); setCreacion(''); setDistribucion(''); setMedicion(''); setOptimizacion('');
    setKpisRendimiento(''); setKpisRiesgo(''); setNoAutomatizar(''); setSummary('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-400 via-purple-400 to-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">1</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 1 · Mapa de casos de uso + KPIs por fase (Cabify)</h1>
            <p className="text-sm text-slate-600">Marketing "de verdad": dónde aporta valor la IA, qué NO automatizar y cómo medirlo por fase</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200"><Map className="h-3 w-3 mr-1" /> 5 fases · 12 casos</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Target className="h-3 w-3 mr-1" /> 6+2 KPIs</Badge>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200"><Shield className="h-3 w-3 mr-1" /> Control de riesgos</Badge>
        </div>
      </div>

      {/* Scenario */}
      <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Map className="h-5 w-5 text-fuchsia-600" />
            <h3 className="font-semibold text-fuchsia-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300">Cabify · movilidad</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Cabify</strong> quiere que el equipo junior entienda "dónde aporta valor la IA" sin caer en "hacer posts por hacer". El CMO pide un mapa realista: qué automatizar, qué NO, y cómo medirlo por fase
            (investigación, creación, distribución, medición, optimización).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <a href="https://cabify.com/es" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white border border-fuchsia-200 hover:border-fuchsia-400 text-fuchsia-700">🔗 cabify.com/es</a>
            <a href="https://cabify.com/es/empresas" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white border border-fuchsia-200 hover:border-fuchsia-400 text-fuchsia-700">🔗 cabify.com/es/empresas</a>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> 12 casos de uso (mín. 2 por fase). Para cada uno: entrada → salida operativa → riesgo → control → KPIs. + 6 KPIs de rendimiento y 2 KPIs de riesgo/calidad (p. ej. % claims pendientes de validar).
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Fases 1-3 */}
        <div className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Target className="h-4 w-4" /> 1) Investigación (mín. 2 casos)</h3>
              <p className="text-xs text-slate-500">Formato por línea: caso · entrada · salida operativa · riesgo · control · KPI</p>
              <Textarea placeholder={'Ej.: Análisis de reseñas | reseñas anonimizadas | top 10 quejas accionables | sesgo en muestreo | revisión humana | % insights con evidencia citada'} className="text-xs bg-white min-h-[110px] font-mono" value={investigacion} onChange={(e) => setInvestigacion(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-pink-900 flex items-center gap-2"><Zap className="h-4 w-4" /> 2) Creación (mín. 2 casos)</h3>
              <Textarea placeholder={'Ej.: Variantes de copy | brief + producto | 10 variantes anuncio | claim no verificable | checklist legal | CTR'} className="text-xs bg-white min-h-[110px] font-mono" value={creacion} onChange={(e) => setCreacion(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2"><Map className="h-4 w-4" /> 3) Distribución (mín. 2 casos)</h3>
              <Textarea placeholder={'Ej.: Personalización emails B2B | segmento + perfil | asunto+cuerpo por segmento | spam/over-personal | A/B test | open rate'} className="text-xs bg-white min-h-[110px] font-mono" value={distribucion} onChange={(e) => setDistribucion(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Fases 4-5 + KPIs */}
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> 4) Medición (mín. 2 casos)</h3>
              <Textarea placeholder={'Ej.: Resumen semanal de KPIs | datos GA4 | informe + 3 alertas | datos sin contexto | revisión analista | precisión vs anomalías'} className="text-xs bg-white min-h-[110px] font-mono" value={medicion} onChange={(e) => setMedicion(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Zap className="h-4 w-4" /> 5) Optimización (mín. 2 casos)</h3>
              <Textarea placeholder={'Ej.: Sugerencias CRO | resultados test | hipótesis priorizadas | sobreajuste | comité de revisión | uplift en CVR'} className="text-xs bg-white min-h-[110px] font-mono" value={optimizacion} onChange={(e) => setOptimizacion(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> KPIs (6 rendimiento + 2 riesgo)</h3>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">6 KPIs de rendimiento</label>
                <Textarea placeholder={'Ej.: CTR, CVR, CPA, ROAS, tiempo de entrega de pieza, # variantes producidas/semana'} className="text-xs bg-white min-h-[80px]" value={kpisRendimiento} onChange={(e) => setKpisRendimiento(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">2 KPIs de riesgo / calidad</label>
                <Textarea placeholder={'Ej.: % claims marcados "pendiente de validar", % piezas que requieren reescritura tras revisión'} className="text-xs bg-white min-h-[60px]" value={kpisRiesgo} onChange={(e) => setKpisRiesgo(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">¿Qué NO automatizar?</label>
                <Input placeholder="Ej.: respuestas a quejas legales, claims sobre seguridad…" className="text-xs bg-white" value={noAutomatizar} onChange={(e) => setNoAutomatizar(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 text-white font-semibold shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Generar entregable
            </Button>
            <Button onClick={clearAll} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>

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
