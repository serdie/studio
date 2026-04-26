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
  MessageSquare,
  Users,
  Target,
  BarChart3,
  Search,
} from 'lucide-react';

export default function WallapopPractice2() {
  const [clusters, setClusters] = useState('');
  const [objeciones, setObjeciones] = useState('');
  const [drivers, setDrivers] = useState('');
  const [audiencias, setAudiencias] = useState('');
  const [hipotesis, setHipotesis] = useState('');
  const [evidencias, setEvidencias] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (getLines(clusters).length < 8) missing.push('mín. 8 clusters (ideal 8-12)');
    if (getLines(objeciones).length < 3) missing.push('mín. 3 objeciones top');
    if (getLines(drivers).length < 3) missing.push('mín. 3 drivers');
    if (getLines(audiencias).length < 3) missing.push('mín. 3 audiencias operativas');
    if (getLines(hipotesis).length < 10) missing.push('mín. 10 hipótesis si X entonces Y');
    if (!evidencias) missing.push('citas/evidencias (sin datos personales)');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'VoC + backlog completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 2 — VOZ DEL CLIENTE (VoC): RESEÑAS A INSIGHTS ACCIONABLES (Wallapop)');
    sb.push('Fase del ciclo: Investigación → Optimización');
    sb.push('');
    sb.push('1) CLUSTERS (8-12)');
    getLines(clusters).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('2) TOP OBJECIONES');
    getLines(objeciones).forEach((o, i) => sb.push(`  ${i + 1}. ${o}`));
    sb.push('');
    sb.push('3) DRIVERS (motivos de compra/uso)');
    getLines(drivers).forEach((d, i) => sb.push(`  ${i + 1}. ${d}`));
    sb.push('');
    sb.push('4) AUDIENCIAS OPERATIVAS (mín. 3)');
    getLines(audiencias).forEach((a, i) => sb.push(`  ${i + 1}. ${a}`));
    sb.push('');
    sb.push('5) HIPÓTESIS "si X entonces Y" (mín. 10, priorizadas por evidencia/impacto/esfuerzo)');
    sb.push('   Cada insight termina en acción + KPI sugerido (CTR, CVR, reducir dudas…)');
    getLines(hipotesis).forEach((h, i) => sb.push(`  ${i + 1}. ${h}`));
    sb.push('');
    sb.push('6) EVIDENCIAS (fragmentos citados, ANONIMIZADOS — sin datos personales)');
    sb.push('   Anonimiza con [EMAIL], [TEL], [CLIENTE], [PEDIDO_ID]');
    sb.push(evidencias);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Sheets/Notion.');
    sb.push('Resultado: documento "VoC + backlog" reutilizable como base de insights.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setClusters(''); setObjeciones(''); setDrivers(''); setAudiencias(''); setHipotesis(''); setEvidencias('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">2</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 2 · Voz del cliente (VoC) — de reseñas a insights accionables (Wallapop)</h1>
            <p className="text-sm text-slate-600">Convertir señales dispersas (reviews, RRSS, FAQs) en clusters, objeciones, audiencias y un backlog de hipótesis priorizadas</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><MessageSquare className="h-3 w-3 mr-1" /> 8-12 clusters</Badge>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200"><Users className="h-3 w-3 mr-1" /> 3 audiencias</Badge>
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200"><Target className="h-3 w-3 mr-1" /> 10 hipótesis</Badge>
        </div>
      </div>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-emerald-100 text-emerald-700 border-emerald-300">Wallapop · marketplace C2C</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Wallapop</strong> quiere mejorar mensajes de campaña y landings con el lenguaje real del usuario.
            El equipo tiene señales dispersas (reviews, comentarios en RRSS, FAQs) y no consigue convertirlas en acciones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <a href="https://es.wallapop.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700">🔗 es.wallapop.com</a>
            <a href="https://ayuda.wallapop.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700">🔗 ayuda.wallapop.com</a>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> con un "pack" de 30-40 textos simulados (reseñas/tickets/FAQs) → 8-12 clusters · top objeciones y drivers con evidencias · 3 audiencias operativas · 10 hipótesis "si X entonces Y" priorizadas por evidencia/impacto/esfuerzo. Cada insight debe terminar en acción + KPI.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Clusters (8-12)</h3>
              <Textarea placeholder={'1. Confianza al pagar\n2. Calidad del producto\n3. Estafas y verificación\n4. ...'} className="text-xs bg-white min-h-[160px] font-mono" value={clusters} onChange={(e) => setClusters(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Top objeciones</h3>
              <Textarea placeholder={'1. "No sé si llegará"\n2. "Comisión es alta"\n3. ...'} className="text-xs bg-white min-h-[120px] font-mono" value={objeciones} onChange={(e) => setObjeciones(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><Target className="h-4 w-4" /> Drivers</h3>
              <Textarea placeholder={'1. Ahorro vs nuevo\n2. Sostenibilidad\n3. Cercanía/local\n...'} className="text-xs bg-white min-h-[120px] font-mono" value={drivers} onChange={(e) => setDrivers(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2"><Users className="h-4 w-4" /> Audiencias operativas (mín. 3)</h3>
              <Textarea placeholder={'A1. Comprador puntual urbano 25-34 — busca chollos\nA2. Vendedor recurrente — quiere rotación rápida\nA3. ...'} className="text-xs bg-white min-h-[120px] font-mono" value={audiencias} onChange={(e) => setAudiencias(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Hipótesis "si X entonces Y" (mín. 10)</h3>
              <p className="text-xs text-slate-500">Formato: si X entonces Y porque … → acción → KPI · Evidencia/Impacto/Esfuerzo (1-5)</p>
              <Textarea placeholder={'1. Si mostramos "envío protegido" en ficha entonces sube CVR porque reduce fricción → añadir badge → +CVR · E:4 I:5 Esf:2\n2. ...'} className="text-xs bg-white min-h-[160px] font-mono" value={hipotesis} onChange={(e) => setHipotesis(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Search className="h-4 w-4" /> Evidencias citadas (anonimizadas)</h3>
              <Textarea placeholder={'"...nunca sé si me llegará a tiempo, [PEDIDO_ID]..." (FAQ)\n"...la comisión me echó para atrás..." (reseña)'} className="text-xs bg-white min-h-[120px] font-mono" value={evidencias} onChange={(e) => setEvidencias(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg">
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
