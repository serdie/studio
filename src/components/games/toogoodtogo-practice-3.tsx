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
  BookOpen,
  Layers,
  Shield,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export default function TooGoodToGoPractice3() {
  const [brandVoice, setBrandVoice] = useState('');
  const [vocabulario, setVocabulario] = useState('');
  const [prompts, setPrompts] = useState('');
  const [ejemplosBuenos, setEjemplosBuenos] = useState('');
  const [ejemplosMalos, setEjemplosMalos] = useState('');
  const [checklist, setChecklist] = useState('');
  const [versionado, setVersionado] = useState('');
  const [claims, setClaims] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!brandVoice) missing.push('brand voice (somos / no somos)');
    if (!vocabulario) missing.push('vocabulario permitido/prohibido + CTAs');
    if (getLines(prompts).length < 10) missing.push('mín. 10 prompts reutilizables');
    if (getLines(ejemplosBuenos).length < 5) missing.push('mín. 5 ejemplos buenos');
    if (getLines(ejemplosMalos).length < 5) missing.push('mín. 5 ejemplos malos');
    if (!checklist) missing.push('checklist editorial');
    if (!versionado) missing.push('estructura/versionado');
    if (!claims) missing.push('lista de claims permitidos');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'MVP del sistema de contenidos completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 3 — SISTEMA DE CONTENIDOS CON IA: BRAND VOICE + PROMPTS + CHECKLIST (Too Good To Go)');
    sb.push('Fase del ciclo: Creación → Distribución');
    sb.push('Tipo: Grupal (4-5)');
    sb.push('');
    sb.push('1) BRAND VOICE (1-2 páginas: somos / no somos)');
    sb.push(brandVoice);
    sb.push('');
    sb.push('2) VOCABULARIO PERMITIDO / PROHIBIDO + CTAs');
    sb.push(vocabulario);
    sb.push('');
    sb.push('3) BIBLIOTECA DE PROMPTS REUTILIZABLES (mín. 10)');
    sb.push('   Cubre: brief, borrador, variantes, auditoría de claims, adaptación multicanal');
    getLines(prompts).forEach((p, i) => sb.push(`  P${i + 1}. ${p}`));
    sb.push('');
    sb.push('4) EJEMPLOS DE TONO');
    sb.push('--- BUENOS ---');
    getLines(ejemplosBuenos).forEach((e, i) => sb.push(`  ✓ ${i + 1}. ${e}`));
    sb.push('--- MALOS ---');
    getLines(ejemplosMalos).forEach((e, i) => sb.push(`  ✗ ${i + 1}. ${e}`));
    sb.push('');
    sb.push('5) CHECKLIST EDITORIAL (exactitud / marca / cumplimiento / CTA)');
    sb.push(checklist);
    sb.push('');
    sb.push('6) ESTRUCTURA DE CARPETAS Y VERSIONADO');
    sb.push(versionado);
    sb.push('');
    sb.push('7) CLAIMS PERMITIDOS (cómo redactarlos sin prometer)');
    sb.push(claims);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Notion/Drive + Grammarly/LanguageTool.');
    sb.push('Resultado: kit operativo para el equipo (guía + prompts + checklist + estructura).');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setBrandVoice(''); setVocabulario(''); setPrompts(''); setEjemplosBuenos(''); setEjemplosMalos('');
    setChecklist(''); setVersionado(''); setClaims(''); setSummary('');
    setStatus({ type: '', message: '' });
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-lime-400 via-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">3</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 3 · Sistema de contenidos con IA: brand voice + prompts + checklist (Too Good To Go)</h1>
            <p className="text-sm text-slate-600">Montar un sistema (no piezas sueltas): tono, prompts reutilizables, checklist editorial y versionado</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-lime-50 text-lime-700 border-lime-200"><BookOpen className="h-3 w-3 mr-1" /> Brand voice</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Sparkles className="h-3 w-3 mr-1" /> 10 prompts</Badge>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Shield className="h-3 w-3 mr-1" /> Claims auditados</Badge>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200"><Layers className="h-3 w-3 mr-1" /> Grupal 4-5</Badge>
        </div>
      </div>

      <Card className="border-lime-200 bg-gradient-to-br from-lime-50 via-green-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-lime-600" />
            <h3 className="font-semibold text-lime-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-lime-100 text-lime-700 border-lime-300">Too Good To Go · sostenibilidad</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Too Good To Go</strong> quiere escalar contenidos en varios canales sin perder coherencia (y sin prometer cosas que no puede verificar).
            Marketing pide montar un sistema, no piezas sueltas: guía de tono, prompts reutilizables, checklist editorial, versionado.
          </p>
          <a href="https://www.toogoodtogo.com/es" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-lime-200 hover:border-lime-400 text-lime-700 text-xs">🔗 toogoodtogo.com/es</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> MVP de sistema de contenidos para 1 campaña (4 semanas) — brand voice 1-2 páginas · 10 prompts reutilizables · checklist editorial · estructura/versionado · 10 ejemplos buenos/malos · lista de claims permitidos.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-lime-200 bg-gradient-to-br from-lime-50 via-white to-green-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-lime-900 flex items-center gap-2"><BookOpen className="h-4 w-4" /> Brand voice (somos / no somos)</h3>
              <Textarea placeholder={'SOMOS: cercanos, prácticos, optimistas, transparentes con cifras…\nNO SOMOS: alarmistas, condescendientes, vagos con datos…'} className="text-xs bg-white min-h-[140px]" value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><Sparkles className="h-4 w-4" /> Vocabulario permitido / prohibido + CTAs</h3>
              <Textarea placeholder={'Permitido: salvar, rescatar, sorpresa, descubrir…\nProhibido: garantizado, mejor del mundo, #1, gratis (sin asterisco)…\nCTAs: "Descúbrelo", "Salva un Pack", "Empieza hoy"'} className="text-xs bg-white min-h-[120px] font-mono" value={vocabulario} onChange={(e) => setVocabulario(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Biblioteca de prompts (mín. 10)</h3>
              <Textarea placeholder={'P1. Brief de pieza social: rol, objetivo, audiencia, claims permitidos, CTA, formato\nP2. Borrador con tono [SOMOS] y vocabulario [permitido]\nP3. 5 variantes por canal: IG / TT / LinkedIn / email / web\nP4. Auditoría de claims: lista cada afirmación y marca evidencia/pendiente\n...'} className="text-xs bg-white min-h-[180px] font-mono" value={prompts} onChange={(e) => setPrompts(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-teal-900 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Ejemplos "BUENOS" (mín. 5)</h3>
              <Textarea placeholder={'1. "Hoy salvamos tortilla casera por 3,99 €. Mañana puede ser tu cena."\n2. ...'} className="text-xs bg-white min-h-[120px] font-mono" value={ejemplosBuenos} onChange={(e) => setEjemplosBuenos(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Ejemplos "MALOS" (mín. 5)</h3>
              <Textarea placeholder={'1. "¡Garantizado el mejor sabor del mundo!" (claim sin evidencia)\n2. ...'} className="text-xs bg-white min-h-[120px] font-mono" value={ejemplosMalos} onChange={(e) => setEjemplosMalos(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Checklist editorial</h3>
              <Textarea placeholder={'[ ] Exactitud (cifras citadas)\n[ ] Marca (tono y vocabulario)\n[ ] Cumplimiento (legal/RGPD)\n[ ] CTA claro y único\n[ ] Sin claims sin evidencia'} className="text-xs bg-white min-h-[120px]" value={checklist} onChange={(e) => setChecklist(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Layers className="h-4 w-4" /> Estructura / versionado</h3>
              <Textarea placeholder={'/campañas/2025-Q4_save-food/\n  /briefs/  /borradores_v1/  /aprobados/  /publicados/\nNomenclatura: aaaa-mm-dd_canal_pieza_v#'} className="text-xs bg-white min-h-[100px] font-mono" value={versionado} onChange={(e) => setVersionado(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Claims permitidos (sin prometer)</h3>
              <Textarea placeholder={'"Hasta un X% de descuento sobre PVP recomendado" (en lugar de "el más barato")\n"Ayudamos a evitar el desperdicio" (con cifra real auditada)…'} className="text-xs bg-white min-h-[100px]" value={claims} onChange={(e) => setClaims(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-white font-semibold shadow-lg">
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
