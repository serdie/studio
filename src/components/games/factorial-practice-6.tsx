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
  Target,
  BarChart3,
  Shield,
  Search,
} from 'lucide-react';

export default function FactorialPractice6() {
  const [grupo1, setGrupo1] = useState('');
  const [grupo2, setGrupo2] = useState('');
  const [grupo3, setGrupo3] = useState('');
  const [keywords, setKeywords] = useState('');
  const [negativas, setNegativas] = useState('');
  const [anuncios, setAnuncios] = useState('');
  const [coherencia, setCoherencia] = useState('');
  const [claims, setClaims] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!grupo1) missing.push('Grupo 1');
    if (!grupo2) missing.push('Grupo 2');
    if (!grupo3) missing.push('Grupo 3');
    if (getLines(keywords).length < 6) missing.push('mín. 6 keywords iniciales');
    if (getLines(negativas).length < 10) missing.push(`mín. 10 negativas (tienes ${getLines(negativas).length})`);
    if (getLines(anuncios).length < 9) missing.push('mín. 9 anuncios (3 por grupo)');
    if (!coherencia) missing.push('checklist coherencia anuncio-landing');
    if (!claims) missing.push('lista de claims con evidencia');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Estructura SEM completa según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 6 — SEM CON IA: ESTRUCTURA CAMPAÑA → GRUPOS → ANUNCIOS + COHERENCIA (Factorial)');
    sb.push('Fase del ciclo: Distribución');
    sb.push('Tipo: Grupal');
    sb.push('');
    sb.push('1) ESTRUCTURA: 1 CAMPAÑA · 3 GRUPOS POR INTENCIÓN');
    sb.push('--- Grupo 1 ---');
    sb.push(grupo1);
    sb.push('--- Grupo 2 ---');
    sb.push(grupo2);
    sb.push('--- Grupo 3 ---');
    sb.push(grupo3);
    sb.push('');
    sb.push('2) KEYWORDS INICIALES');
    getLines(keywords).forEach((k, i) => sb.push(`  ${i + 1}. ${k}`));
    sb.push('');
    sb.push('3) NEGATIVAS (mín. 10)');
    getLines(negativas).forEach((n, i) => sb.push(`  -${i + 1}. ${n}`));
    sb.push('');
    sb.push('4) ANUNCIOS (3 por grupo: variantes por beneficio / objeción / CTA)');
    getLines(anuncios).forEach((a, i) => sb.push(`  Ad${i + 1}. ${a}`));
    sb.push('');
    sb.push('5) CHECKLIST COHERENCIA ANUNCIO ↔ LANDING (promesa / prueba / CTA)');
    sb.push(coherencia);
    sb.push('');
    sb.push('6) CLAIMS (si hay claim, indicar evidencia REQUERIDA / VERIFICADA / REESCRITA)');
    sb.push(claims);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Google Ads (simulado en tabla).');
    sb.push('Resultado: documento de campaña listo para cargar (estructura + ads + negativas + coherencia).');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setGrupo1(''); setGrupo2(''); setGrupo3(''); setKeywords(''); setNegativas(''); setAnuncios('');
    setCoherencia(''); setClaims(''); setSummary('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">6</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 6 · SEM con IA: estructura campaña → grupos → anuncios + coherencia (Factorial)</h1>
            <p className="text-sm text-slate-600">Diseñar estructura SEM y mensajes coherentes para no romper la promesa en la landing</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Target className="h-3 w-3 mr-1" /> 3 grupos</Badge>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200"><Search className="h-3 w-3 mr-1" /> 9 ads</Badge>
          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200"><Shield className="h-3 w-3 mr-1" /> 10 negativas</Badge>
        </div>
      </div>

      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">Factorial · SaaS RRHH</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Factorial</strong> (software RRHH) va a lanzar campañas SEM para "software de RRHH", "control horario", "gestión de vacaciones".
            Problema típico: anuncios prometen una cosa y la landing otra → sube CPA y baja CVR. Se pide diseñar estructura y mensajes coherentes.
          </p>
          <a href="https://factorialhr.es/" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-blue-200 hover:border-blue-400 text-blue-700 text-xs">🔗 factorialhr.es</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> 1 campaña con 3 grupos por intención (transaccional / comparativa) · keywords + negativas · 3 anuncios por grupo (variantes beneficio/objeción/CTA) · checklist coherencia anuncio-landing. Prohibido inventar claims. Mín. 10 negativas razonables (gratis, empleo, curso…).
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Target className="h-4 w-4" /> Grupo 1 — transaccional</h3>
              <Textarea placeholder={'Tema: software RRHH\nIntención: transaccional\nLanding: /software-rrhh\nMatch type: frase'} className="text-xs bg-white min-h-[100px]" value={grupo1} onChange={(e) => setGrupo1(e.target.value)} />
            </CardContent>
          </Card>
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2"><Target className="h-4 w-4" /> Grupo 2 — control horario</h3>
              <Textarea placeholder={'Tema: control horario\nIntención: transaccional\nLanding: /control-horario\nMatch type: frase'} className="text-xs bg-white min-h-[100px]" value={grupo2} onChange={(e) => setGrupo2(e.target.value)} />
            </CardContent>
          </Card>
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Target className="h-4 w-4" /> Grupo 3 — comparativa</h3>
              <Textarea placeholder={'Tema: factorial vs alternativa\nIntención: comparativa\nLanding: /comparar/...\nMatch type: frase'} className="text-xs bg-white min-h-[100px]" value={grupo3} onChange={(e) => setGrupo3(e.target.value)} />
            </CardContent>
          </Card>
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><Search className="h-4 w-4" /> Keywords iniciales</h3>
              <Textarea placeholder={'1. software rrhh\n2. control horario empleados\n3. gestión vacaciones empresa\n...'} className="text-xs bg-white min-h-[120px] font-mono" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Negativas (mín. 10)</h3>
              <Textarea placeholder={'1. gratis\n2. empleo\n3. curso\n4. tfg\n5. plantilla excel\n6. opensource\n...'} className="text-xs bg-white min-h-[140px] font-mono" value={negativas} onChange={(e) => setNegativas(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Anuncios (3 por grupo, total 9)</h3>
              <Textarea placeholder={'G1.A1 Headlines: Software RRHH para PYMES | Automatiza nóminas y vacaciones | Prueba gratis 14 días\nG1.A2 ...\nG2.A1 ...\nG3.A1 ...'} className="text-xs bg-white min-h-[180px] font-mono" value={anuncios} onChange={(e) => setAnuncios(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Coherencia anuncio ↔ landing</h3>
              <Textarea placeholder={'Promesa anuncio = headline landing\nPrueba anuncio (testimonios/cifras) coincide con prueba landing\nCTA único y consistente'} className="text-xs bg-white min-h-[100px]" value={coherencia} onChange={(e) => setCoherencia(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Claims con evidencia</h3>
              <Textarea placeholder={'1. "+10.000 PYMES nos eligen" → VERIFICADA (web)\n2. "Ahorra 10h/mes" → EVIDENCIA REQUERIDA (caso de cliente)'} className="text-xs bg-white min-h-[100px]" value={claims} onChange={(e) => setClaims(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold shadow-lg">
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
