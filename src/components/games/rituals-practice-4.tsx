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
  Search,
  Layers,
  Target,
  BarChart3,
  Map,
} from 'lucide-react';

export default function RitualsPractice4() {
  const [categoria, setCategoria] = useState('');
  const [keywordMap, setKeywordMap] = useState('');
  const [pilar, setPilar] = useState('');
  const [clusters, setClusters] = useState('');
  const [enlazado, setEnlazado] = useState('');
  const [canibalizacion, setCanibalizacion] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!categoria) missing.push('categoría objetivo');
    if (getLines(keywordMap).length < 20) missing.push(`mín. 20 filas en keyword map (tienes ${getLines(keywordMap).length})`);
    if (!pilar) missing.push('definición del pilar');
    if (getLines(clusters).length < 6) missing.push('mín. 6 clusters');
    if (!enlazado) missing.push('plan de enlazado interno');
    if (!canibalizacion) missing.push('chequeo de canibalización');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Keyword map + arquitectura pilar/cluster completos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 4 — SEO CON IA: KEYWORD MAP + ARQUITECTURA PILAR/CLUSTER (Rituals)');
    sb.push('Fase del ciclo: Investigación → Creación');
    sb.push('Tipo: Grupal');
    sb.push('');
    sb.push(`1) CATEGORÍA OBJETIVO: ${categoria}`);
    sb.push('');
    sb.push('2) KEYWORD MAP (mín. 20 filas)');
    sb.push('Formato: keyword | intención (info/trans/nav/comp) | página objetivo | etapa funnel | CTA | prioridad (Imp/Esf/Evid 1-5)');
    getLines(keywordMap).forEach((k, i) => sb.push(`  ${i + 1}. ${k}`));
    sb.push('');
    sb.push('3) PÁGINA PILAR');
    sb.push(pilar);
    sb.push('');
    sb.push('4) CLUSTERS (mín. 6) que orbitan el pilar');
    getLines(clusters).forEach((c, i) => sb.push(`  C${i + 1}. ${c}`));
    sb.push('');
    sb.push('5) ENLAZADO INTERNO');
    sb.push(enlazado);
    sb.push('');
    sb.push('6) CHEQUEO DE CANIBALIZACIÓN (1 intención = 1 página)');
    sb.push(canibalizacion);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Sheets (+ Semrush/Ahrefs/Sistrix si disponible).');
    sb.push('Resultado: keyword map + arquitectura lista para sprint SEO.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setCategoria(''); setKeywordMap(''); setPilar(''); setClusters(''); setEnlazado(''); setCanibalizacion('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">4</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 4 · SEO con IA: keyword map por intención + arquitectura pilar/cluster (Rituals)</h1>
            <p className="text-sm text-slate-600">Crecer en orgánico con un plan: intención clasificada, mapa de keywords y arquitectura interna</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200"><Search className="h-3 w-3 mr-1" /> 20 keywords</Badge>
          <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200"><Layers className="h-3 w-3 mr-1" /> 1 pilar + 6 clusters</Badge>
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200"><Map className="h-3 w-3 mr-1" /> Sin canibalización</Badge>
        </div>
      </div>

      <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-rose-600" />
            <h3 className="font-semibold text-rose-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-rose-100 text-rose-700 border-rose-300">Rituals · cosmética/lifestyle</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Rituals</strong> quiere crecer en orgánico en una categoría (p. ej. cosmética natural / regalo / cuidado corporal) sin publicar artículos sueltos.
            Piden un plan: intención, keyword map y arquitectura con enlazado interno.
          </p>
          <a href="https://www.rituals.com/es-es" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-rose-200 hover:border-rose-400 text-rose-700 text-xs">🔗 rituals.com/es-es</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> keyword map (20 filas) con keyword principal · intención · página objetivo · etapa funnel · CTA · prioridad. + 1 pilar + 6 clusters con enlazado interno. Intención clasificada (informacional / transaccional / navegacional / comparativa). Una intención = una página.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-white to-pink-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><Target className="h-4 w-4" /> Categoría objetivo</h3>
              <Input placeholder="Ej.: cosmética natural / regalo cuidado corporal" className="text-xs bg-white" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-pink-900 flex items-center gap-2"><Search className="h-4 w-4" /> Keyword map (mín. 20 filas)</h3>
              <p className="text-xs text-slate-500">keyword | intención | página | funnel | CTA | prioridad</p>
              <Textarea placeholder={'1. cosmetica natural | info | /guia/cosmetica-natural | TOFU | leer guía | 5/3/4\n2. regalo cuidado corporal mujer | trans | /regalos/mujer | BOFU | comprar | 5/4/4\n3. ...'} className="text-xs bg-white min-h-[260px] font-mono" value={keywordMap} onChange={(e) => setKeywordMap(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-fuchsia-900 flex items-center gap-2"><Layers className="h-4 w-4" /> Página pilar</h3>
              <Textarea placeholder={'Pilar: "Guía completa de cosmética natural"\nObjetivo: cubrir intención informacional amplia y enlazar a clusters.'} className="text-xs bg-white min-h-[100px]" value={pilar} onChange={(e) => setPilar(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Layers className="h-4 w-4" /> Clusters (mín. 6)</h3>
              <Textarea placeholder={'C1. Ingredientes naturales: aceites esenciales\nC2. Rutinas de cuidado corporal\nC3. Regalo según ocasión\n...'} className="text-xs bg-white min-h-[140px]" value={clusters} onChange={(e) => setClusters(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Map className="h-4 w-4" /> Enlazado interno</h3>
              <Textarea placeholder={'Pilar → cada cluster (links contextuales)\nCluster → pilar (anchor tematizado)\nClusters relacionados entre sí (max 2 cross-links)'} className="text-xs bg-white min-h-[100px]" value={enlazado} onChange={(e) => setEnlazado(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Chequeo canibalización</h3>
              <Textarea placeholder={'Cada intención apunta a una sola página objetivo.\nKeywords competidoras detectadas: ...\nDecisión: fusionar / redirigir / re-enfocar.'} className="text-xs bg-white min-h-[100px]" value={canibalizacion} onChange={(e) => setCanibalizacion(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600 text-white font-semibold shadow-lg">
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
