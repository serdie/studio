'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Target,
  Shield,
  BarChart3,
  Layers,
} from 'lucide-react';

export default function PcComponentesPractice8() {
  const [diagnostico, setDiagnostico] = useState('');
  const [hipotesis, setHipotesis] = useState('');
  const [iceBacklog, setIceBacklog] = useState('');
  const [variantes, setVariantes] = useState('');
  const [claims, setClaims] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!diagnostico) missing.push('diagnóstico (tasas + insights)');
    if (getLines(hipotesis).length < 12) missing.push(`mín. 12 hipótesis CRO (tienes ${getLines(hipotesis).length})`);
    if (!iceBacklog) missing.push('backlog priorizado con ICE');
    if (getLines(variantes).length < 10) missing.push(`mín. 10 variantes de hero (tienes ${getLines(variantes).length})`);
    if (!claims) missing.push('lista de claims con estado');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Backlog ICE + 10 variantes listo para test.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 8 — CRO: DIAGNÓSTICO → HIPÓTESIS → BACKLOG ICE + 10 VARIANTES (PcComponentes)');
    sb.push('Fase del ciclo: Optimización');
    sb.push('Tipo: Grupal');
    sb.push('');
    sb.push('1) DIAGNÓSTICO (tasas por etapa + 5 insights tipo Clarity)');
    sb.push(diagnostico);
    sb.push('');
    sb.push('2) HIPÓTESIS CRO (mín. 12, formato "si X entonces Y porque…", indicar etapa afectada)');
    getLines(hipotesis).forEach((h, i) => sb.push(`  H${i + 1}. ${h}`));
    sb.push('');
    sb.push('3) BACKLOG PRIORIZADO POR ICE (Impact · Confidence · Ease, 1-10)');
    sb.push(iceBacklog);
    sb.push('');
    sb.push('4) 10 VARIANTES DE HERO (headline / subheadline / prueba / CTA, atacando objeciones)');
    getLines(variantes).forEach((v, i) => sb.push(`  V${i + 1}. ${v}`));
    sb.push('');
    sb.push('5) CLAIMS (estado: VERIFICADO / PENDIENTE / REESCRITO)');
    sb.push(claims);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Sheets.');
    sb.push('Resultado: backlog priorizado + pack de variantes listo para test.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setDiagnostico(''); setHipotesis(''); setIceBacklog(''); setVariantes(''); setClaims('');
    setSummary(''); setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado al portapapeles.' }); }
    catch { setStatus({ type: 'error', message: 'No se pudo copiar. Copia manualmente.' }); }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">8</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 8 · CRO: diagnóstico → hipótesis → backlog ICE + 10 variantes (PcComponentes)</h1>
            <p className="text-sm text-slate-600">Proceso CRO serio: hipótesis con mecanismo, ICE y variantes para test, sin inventar claims</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><TrendingUp className="h-3 w-3 mr-1" /> 12 hipótesis</Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><Target className="h-3 w-3 mr-1" /> ICE</Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Layers className="h-3 w-3 mr-1" /> 10 variantes</Badge>
        </div>
      </div>

      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-orange-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-orange-100 text-orange-700 border-orange-300">PcComponentes · e-commerce</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>PcComponentes</strong> detecta que "hay tráfico pero no convierte" en una landing de campaña. Quieren un proceso CRO serio:
            hipótesis con mecanismo, priorización ICE y variantes para test, sin inventar claims.
          </p>
          <a href="https://www.pccomponentes.com/" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-orange-200 hover:border-orange-400 text-orange-700 text-xs">🔗 pccomponentes.com</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> a partir de tasas por etapa + 5 insights tipo Clarity → 12 hipótesis CRO (formato "si X entonces Y porque") · backlog ICE · 10 variantes de hero (headline/subheadline/prueba/CTA) atacando objeciones. Cada hipótesis indica etapa afectada (CTA, formulario, checkout…). Lista de claims con estado.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Diagnóstico</h3>
              <Textarea placeholder={'Tasas por etapa: hero 100% → click CTA 8% → ATC 3% → checkout 1.5% → compra 0.8%\nInsights Clarity:\n1. rage clicks en imagen del producto\n2. dead clicks en bullets\n3. drop-off al ver shipping\n4. ...\n5. ...'} className="text-xs bg-white min-h-[180px] font-mono" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><Target className="h-4 w-4" /> Hipótesis CRO (mín. 12)</h3>
              <p className="text-xs text-slate-500">Formato: si X entonces Y porque … · etapa afectada (CTA / formulario / checkout / hero)</p>
              <Textarea placeholder={'1. Si añadimos badge "envío 24h" en hero entonces sube CTR porque resuelve objeción de tiempo · etapa: hero\n2. Si simplificamos formulario a 3 campos entonces sube CVR porque reduce fricción · etapa: formulario\n3. ...'} className="text-xs bg-white min-h-[200px] font-mono" value={hipotesis} onChange={(e) => setHipotesis(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Layers className="h-4 w-4" /> Backlog ICE</h3>
              <Textarea placeholder={'H# | Impact (1-10) | Confidence (1-10) | Ease (1-10) | Score = I*C*E\nH1 | 9 | 7 | 8 | 504 → priorizar primero\nH2 | 8 | 6 | 9 | 432\n...'} className="text-xs bg-white min-h-[160px] font-mono" value={iceBacklog} onChange={(e) => setIceBacklog(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><FileText className="h-4 w-4" /> 10 variantes de hero</h3>
              <p className="text-xs text-slate-500">Formato: headline | subheadline | prueba | CTA · objeción que ataca</p>
              <Textarea placeholder={'1. "Tu PC gaming en 24h" | "Envío gratis desde 50€" | "+1M reseñas" | "Configura el tuyo" · objeción: tiempo de entrega\n2. ...'} className="text-xs bg-white min-h-[180px] font-mono" value={variantes} onChange={(e) => setVariantes(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Claims con estado</h3>
              <Textarea placeholder={'1. "+1M reseñas" → VERIFICADO\n2. "Mejor precio garantizado" → REESCRITO ("igualamos precio")\n3. "Envío 24h" → PENDIENTE'} className="text-xs bg-white min-h-[100px] font-mono" value={claims} onChange={(e) => setClaims(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg">
              <FileText className="h-4 w-4 mr-2" /> Generar entregable
            </Button>
            <Button onClick={clearAll} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" /> Limpiar
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
