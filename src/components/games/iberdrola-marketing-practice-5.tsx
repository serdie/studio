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
  Shield,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

export default function IberdrolaMarketingPractice5() {
  const [keyword, setKeyword] = useState('');
  const [briefSEO, setBriefSEO] = useState('');
  const [meta, setMeta] = useState('');
  const [borrador, setBorrador] = useState('');
  const [claims, setClaims] = useState('');
  const [checklistOnPage, setChecklistOnPage] = useState('');
  const [checklistEEAT, setChecklistEEAT] = useState('');
  const [planRefresh, setPlanRefresh] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!keyword) missing.push('keyword/intención objetivo');
    if (!briefSEO) missing.push('brief SEO (H1/H2, entidades, FAQs, snippet, enlazado, fuentes / qué NO afirmar)');
    if (!meta) missing.push('meta title + description');
    if (getLines(borrador).length < 2) missing.push('borrador de 2 secciones');
    if (!claims) missing.push('lista de claims con estado');
    if (!checklistOnPage) missing.push('checklist on-page');
    if (!checklistEEAT) missing.push('checklist EEAT');
    if (!planRefresh) missing.push('plan de refresh');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Brief + borrador + checklists + plan de refresh completos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 5 — PRODUCCIÓN SEO ASISTIDA: BRIEF + BORRADOR + CHECKLIST EEAT (Iberdrola)');
    sb.push('Fase del ciclo: Creación');
    sb.push('Tipo: Individual');
    sb.push('');
    sb.push(`1) KEYWORD / INTENCIÓN: ${keyword}`);
    sb.push('');
    sb.push('2) BRIEF SEO');
    sb.push('Incluye H1/H2, entidades, FAQs, snippet objetivo, enlazado interno, fuentes y "qué NO afirmar".');
    sb.push(briefSEO);
    sb.push('');
    sb.push('3) META TITLE + META DESCRIPTION (orientados a CTR)');
    sb.push(meta);
    sb.push('');
    sb.push('4) BORRADOR (2 secciones para demostrar método)');
    sb.push(borrador);
    sb.push('');
    sb.push('5) CLAIMS DEL BORRADOR (estado: verificado / pendiente / reescrito sin cifra)');
    sb.push(claims);
    sb.push('');
    sb.push('6) CHECKLIST ON-PAGE');
    sb.push(checklistOnPage);
    sb.push('');
    sb.push('7) CHECKLIST EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)');
    sb.push(checklistEEAT);
    sb.push('');
    sb.push('8) PLAN DE REFRESH (cuándo actualizar)');
    sb.push(planRefresh);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Search Console / Screaming Frog si aplica.');
    sb.push('Resultado: 1 documento (brief + secciones + checklists + plan de refresh).');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setKeyword(''); setBriefSEO(''); setMeta(''); setBorrador(''); setClaims('');
    setChecklistOnPage(''); setChecklistEEAT(''); setPlanRefresh('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-green-400 to-lime-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">5</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 5 · Producción SEO asistida — brief + borrador + checklist EEAT (Iberdrola)</h1>
            <p className="text-sm text-slate-600">Un artículo SEO con credibilidad EEAT y sin inventar cifras</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Search className="h-3 w-3 mr-1" /> Brief SEO</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Shield className="h-3 w-3 mr-1" /> EEAT</Badge>
          <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-200"><RefreshCw className="h-3 w-3 mr-1" /> Plan de refresh</Badge>
        </div>
      </div>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-emerald-100 text-emerald-700 border-emerald-300">Iberdrola · energía</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Iberdrola</strong> quiere un artículo SEO que responda a una intención informacional (p. ej. "cómo ahorrar energía en casa")
            pero con credibilidad (EEAT) y sin inventar cifras. El equipo necesita un brief SEO profesional para que la IA no escriba genérico.
          </p>
          <a href="https://www.iberdrola.com/innovacion" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 text-xs">🔗 iberdrola.com/innovacion</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> brief SEO (H1/H2, entidades, FAQs, snippet, enlazado, fuentes / qué NO afirmar) · borrador de 2 secciones · checklist on-page + EEAT + plan de refresh · meta title + description orientados a CTR · lista de claims con estado.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-green-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><Search className="h-4 w-4" /> Keyword / intención</h3>
              <Input placeholder="Ej.: cómo ahorrar energía en casa (informacional)" className="text-xs bg-white" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Brief SEO completo</h3>
              <Textarea placeholder={'H1: ...\nH2: 1) ... 2) ... 3) ...\nEntidades: bombillas LED, factura de luz, eficiencia energética...\nFAQs: ¿cuánto se ahorra al apagar el stand-by?\nSnippet objetivo: lista numerada de 5-7 pasos\nEnlazado: a /tarifa-verde, /guia-bombillas\nFuentes: IDAE, AEE, Iberdrola Innovation\nQUÉ NO AFIRMAR: cifras concretas no respaldadas, "el método más eficiente"'} className="text-xs bg-white min-h-[260px] font-mono" value={briefSEO} onChange={(e) => setBriefSEO(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Search className="h-4 w-4" /> Meta (title + description)</h3>
              <Textarea placeholder={'Title: Cómo ahorrar energía en casa: guía 2025 | Iberdrola\nDescription: 7 pasos prácticos para reducir tu factura este invierno sin perder confort. Datos verificados, recomendaciones del IDAE.'} className="text-xs bg-white min-h-[100px] font-mono" value={meta} onChange={(e) => setMeta(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Borrador (2 secciones)</h3>
              <Textarea placeholder={'## Sección 1: Ilumina con eficiencia\n...\n\n## Sección 2: Climatización inteligente\n...'} className="text-xs bg-white min-h-[180px] font-mono" value={borrador} onChange={(e) => setBorrador(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Claims con estado</h3>
              <Textarea placeholder={'1. "Las LED ahorran un 80% frente a las incandescentes" → VERIFICADO (IDAE)\n2. "El stand-by representa hasta el X% de la factura" → REESCRITO SIN CIFRA\n3. ...'} className="text-xs bg-white min-h-[120px] font-mono" value={claims} onChange={(e) => setClaims(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Checklist on-page</h3>
              <Textarea placeholder={'[ ] H1 único con keyword\n[ ] alt text en imágenes\n[ ] schema FAQ / Article\n[ ] enlazado interno coherente\n[ ] core web vitals OK'} className="text-xs bg-white min-h-[100px]" value={checklistOnPage} onChange={(e) => setChecklistOnPage(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-fuchsia-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Checklist EEAT</h3>
              <Textarea placeholder={'[ ] Autor con experiencia/credenciales visibles\n[ ] Fuentes citadas (IDAE, organismos oficiales)\n[ ] Política editorial enlazada\n[ ] Última actualización visible\n[ ] Sin claims sin evidencia'} className="text-xs bg-white min-h-[100px]" value={checklistEEAT} onChange={(e) => setChecklistEEAT(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-lime-200 bg-gradient-to-br from-lime-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-lime-900 flex items-center gap-2"><RefreshCw className="h-4 w-4" /> Plan de refresh</h3>
              <Textarea placeholder={'Revisión cada 6 meses o si:\n- cambia normativa\n- bajan posiciones > 3 puestos\n- aparecen nuevas FAQs en SERP'} className="text-xs bg-white min-h-[80px]" value={planRefresh} onChange={(e) => setPlanRefresh(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-semibold shadow-lg">
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
