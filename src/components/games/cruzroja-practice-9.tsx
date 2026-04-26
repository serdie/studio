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
  Calendar,
  Users,
  BarChart3,
  Target,
  RefreshCw,
} from 'lucide-react';

export default function CruzRojaPractice9() {
  const [objetivos, setObjetivos] = useState('');
  const [pilares, setPilares] = useState('');
  const [calendario, setCalendario] = useState('');
  const [kpis, setKpis] = useState('');
  const [ritual, setRitual] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!objetivos) missing.push('objetivos por canal');
    if (getLines(pilares).length < 4) missing.push('mín. 4 pilares de contenido');
    if (getLines(calendario).length < 16) missing.push(`mín. 16 publicaciones planificadas (4 por semana, tienes ${getLines(calendario).length})`);
    if (getLines(kpis).length < 6) missing.push('mín. 6 KPIs (alcance, engagement, CTR, leads…)');
    if (!ritual) missing.push('ritual semanal de revisión');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Calendario editorial 4 semanas + KPIs y ritual completos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 9 — SOCIAL: ESTRATEGIA POR OBJETIVOS + CALENDARIO 4 SEMANAS (Cruz Roja)');
    sb.push('Fase del ciclo: Distribución → Medición');
    sb.push('Tipo: Grupal');
    sb.push('');
    sb.push('1) OBJETIVOS POR CANAL (awareness · comunidad · conversión)');
    sb.push(objetivos);
    sb.push('');
    sb.push('2) PILARES DE CONTENIDO (mín. 4)');
    getLines(pilares).forEach((p, i) => sb.push(`  P${i + 1}. ${p}`));
    sb.push('');
    sb.push('3) CALENDARIO 4 SEMANAS (16 publicaciones, formato post/carrusel/reel/story)');
    sb.push('   Cada fila: Sem# · Día · Canal · Formato · Objetivo · Hook · CTA');
    getLines(calendario).forEach((c, i) => sb.push(`  ${i + 1}. ${c}`));
    sb.push('');
    sb.push('4) KPIs POR FORMATO (mín. 6)');
    getLines(kpis).forEach((k, i) => sb.push(`  ${i + 1}. ${k}`));
    sb.push('');
    sb.push('5) RITUAL SEMANAL DE REVISIÓN (qué mirar y cómo iterar)');
    sb.push(ritual);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Notion/Trello/Airtable.');
    sb.push('Resultado: calendario operativo + tabla de KPIs y rutina.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setObjetivos(''); setPilares(''); setCalendario(''); setKpis(''); setRitual('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-400 via-rose-400 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">9</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 9 · Social: estrategia por objetivos + calendario editorial 4 semanas (Cruz Roja)</h1>
            <p className="text-sm text-slate-600">Plan social equilibrado: awareness, comunidad y conversión sin caer en contenido repetitivo</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><Calendar className="h-3 w-3 mr-1" /> 16 posts</Badge>
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200"><Users className="h-3 w-3 mr-1" /> 4 pilares</Badge>
          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200"><RefreshCw className="h-3 w-3 mr-1" /> Ritual semanal</Badge>
        </div>
      </div>

      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-rose-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-red-100 text-red-700 border-red-300">Cruz Roja · ONG</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Cruz Roja Española</strong> quiere un plan social de 4 semanas para una campaña de captación (voluntariado / donaciones) equilibrando:
            awareness, comunidad y conversión, sin caer en contenido repetitivo. Piden pilares, formatos y KPIs por formato, con rutina de revisión.
          </p>
          <a href="https://www2.cruzroja.es/" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-red-200 hover:border-red-400 text-red-700 text-xs">🔗 cruzroja.es</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> objetivos por canal · 4 pilares de contenido · mix de formatos (post/carrusel/reel/story) · calendario 4 semanas (16 publicaciones, 4 por semana) · KPIs por formato (mín. 6) + "ritual semanal" de revisión.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-rose-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-red-900 flex items-center gap-2"><Target className="h-4 w-4" /> Objetivos por canal</h3>
              <Textarea placeholder={'IG: awareness + comunidad (alcance, engagement)\nTikTok: awareness joven (alcance + saves)\nLinkedIn: B2B/empresas voluntariado (leads cualificados)\nFacebook: comunidad senior + donaciones'} className="text-xs bg-white min-h-[140px] font-mono" value={objetivos} onChange={(e) => setObjetivos(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><Users className="h-4 w-4" /> Pilares (mín. 4)</h3>
              <Textarea placeholder={'P1. Historias reales de voluntariado\nP2. Datos del impacto (verificados)\nP3. Cómo ayudar paso a paso\nP4. Detrás de la causa'} className="text-xs bg-white min-h-[140px] font-mono" value={pilares} onChange={(e) => setPilares(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-pink-900 flex items-center gap-2"><Calendar className="h-4 w-4" /> Calendario 4 semanas (16 entradas)</h3>
              <p className="text-xs text-slate-500">Sem · Día · Canal · Formato · Objetivo · Hook · CTA</p>
              <Textarea placeholder={'1. S1 · Lun · IG · Reel · awareness · "¿Sabías que...?" · Saber más\n2. S1 · Mié · TikTok · Reel · comunidad · "Un día con voluntarios" · Únete\n3. S1 · Vie · LinkedIn · Carrusel · leads · "Programa empresas" · Contacta\n...'} className="text-xs bg-white min-h-[260px] font-mono" value={calendario} onChange={(e) => setCalendario(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> KPIs por formato (mín. 6)</h3>
              <Textarea placeholder={'1. Alcance / impresiones\n2. Engagement rate\n3. CTR a landing\n4. Leads cualificados\n5. Saves / shares\n6. Coste por lead (CPL)'} className="text-xs bg-white min-h-[120px] font-mono" value={kpis} onChange={(e) => setKpis(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Ritual semanal de revisión</h3>
              <Textarea placeholder={'Lunes 10 min: top 3 posts/floppers, qué hipótesis confirma o invalida, ajustar próxima semana.\nFormato: tabla "qué funcionó / por qué / qué cambiamos".'} className="text-xs bg-white min-h-[100px]" value={ritual} onChange={(e) => setRitual(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold shadow-lg">
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
