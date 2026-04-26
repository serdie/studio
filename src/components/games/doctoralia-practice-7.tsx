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
  BarChart3,
  Database,
  Target,
  Shield,
} from 'lucide-react';

export default function DoctoraliaPractice7() {
  const [funnel, setFunnel] = useState('');
  const [eventos, setEventos] = useState('');
  const [parametros, setParametros] = useState('');
  const [naming, setNaming] = useState('');
  const [qa, setQa] = useState('');
  const [microconv, setMicroconv] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!funnel) missing.push('definición del funnel');
    if (getLines(eventos).length < 8) missing.push(`mín. 8 eventos (tienes ${getLines(eventos).length})`);
    if (getLines(parametros).length < 6) missing.push(`mín. 6 parámetros clave (tienes ${getLines(parametros).length})`);
    if (!naming) missing.push('naming conventions');
    if (!qa) missing.push('checklist QA de instrumentación');
    if (!microconv) missing.push('microconversiones por etapa');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Funnel + plan de medición GA4 completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 7 — FUNNEL + PLAN DE MEDICIÓN GA4 (Doctoralia)');
    sb.push('Fase del ciclo: Medición');
    sb.push('Tipo: Individual');
    sb.push('');
    sb.push('1) FUNNEL (etapas)');
    sb.push(funnel);
    sb.push('');
    sb.push('2) MICROCONVERSIONES POR ETAPA');
    sb.push(microconv);
    sb.push('');
    sb.push('3) EVENTOS GA4 (mín. 8)');
    sb.push('Sugeridos: click_cta, form_start / booking_start, form_submit / booking_confirm, scroll_50, scroll_90, faq_open, search_doctor, contact_click...');
    getLines(eventos).forEach((e, i) => sb.push(`  ${i + 1}. ${e}`));
    sb.push('');
    sb.push('4) PARÁMETROS CLAVE (mín. 6)');
    sb.push('Sugeridos: page_type, cta_id, funnel_stage, device, source, medium, doctor_id, specialty');
    getLines(parametros).forEach((p, i) => sb.push(`  ${i + 1}. ${p}`));
    sb.push('');
    sb.push('5) NAMING CONVENTIONS');
    sb.push(naming);
    sb.push('');
    sb.push('6) CHECKLIST QA DE INSTRUMENTACIÓN');
    sb.push(qa);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT + Sheets (+ GTM/GA4 si el aula lo tiene).');
    sb.push('Resultado: diccionario de eventos + tabla lista para implementación.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFunnel(''); setEventos(''); setParametros(''); setNaming(''); setQa(''); setMicroconv('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-400 to-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">7</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 7 · Funnel + plan de medición GA4 (Doctoralia)</h1>
            <p className="text-sm text-slate-600">Eventos, parámetros y naming para dejar de discutir conversión por opiniones</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200"><BarChart3 className="h-3 w-3 mr-1" /> 8 eventos</Badge>
          <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200"><Database className="h-3 w-3 mr-1" /> 6 parámetros</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Shield className="h-3 w-3 mr-1" /> QA</Badge>
        </div>
      </div>

      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-100 text-cyan-700 border-cyan-300">Doctoralia · salud</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Doctoralia</strong> (reserva de cita) quiere saber por qué baja la conversión: ¿falla el tráfico, la landing, el flujo de reserva o el "show-up"?
            Marketing necesita un funnel claro y un plan mínimo de medición (eventos y microconversiones) para dejar de discutir por opiniones.
          </p>
          <a href="https://www.doctoralia.es/" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-cyan-200 hover:border-cyan-400 text-cyan-700 text-xs">🔗 doctoralia.es</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> definir funnel (etapas + microconversiones) y traducirlo a tabla de eventos GA4 + parámetros mínimos · naming conventions · checklist QA. Mín. 8 eventos (click_cta, form_start/booking_start, confirm…) · 6 parámetros clave (page_type, cta_id, funnel_stage, device, source…).
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><Target className="h-4 w-4" /> Funnel (etapas)</h3>
              <Textarea placeholder={'1. Awareness (búsqueda médico/especialidad)\n2. Consideración (perfil del doctor + opiniones)\n3. Conversión (reserva)\n4. Confirmación (recordatorio)\n5. Show-up (asistencia)'} className="text-xs bg-white min-h-[140px] font-mono" value={funnel} onChange={(e) => setFunnel(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-sky-200 bg-gradient-to-br from-sky-50 via-blue-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-sky-900 flex items-center gap-2"><Target className="h-4 w-4" /> Microconversiones</h3>
              <Textarea placeholder={'Awareness: scroll_50, ver listado especialidad\nConsideración: ver perfil doctor, leer 3+ opiniones\nConversión: booking_start, booking_confirm\nShow-up: marca asistencia'} className="text-xs bg-white min-h-[120px] font-mono" value={microconv} onChange={(e) => setMicroconv(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Eventos GA4 (mín. 8)</h3>
              <Textarea placeholder={'1. click_cta\n2. booking_start\n3. booking_confirm\n4. doctor_view\n5. search_specialty\n6. faq_open\n7. scroll_50\n8. scroll_90\n9. share_doctor'} className="text-xs bg-white min-h-[160px] font-mono" value={eventos} onChange={(e) => setEventos(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Database className="h-4 w-4" /> Parámetros clave (mín. 6)</h3>
              <Textarea placeholder={'1. page_type (home / listado / perfil / booking)\n2. cta_id\n3. funnel_stage\n4. device\n5. source / medium\n6. doctor_id\n7. specialty'} className="text-xs bg-white min-h-[140px] font-mono" value={parametros} onChange={(e) => setParametros(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-fuchsia-900 flex items-center gap-2"><FileText className="h-4 w-4" /> Naming conventions</h3>
              <Textarea placeholder={'Eventos: snake_case, verbo_objeto (booking_confirm)\nParámetros: snake_case (funnel_stage)\nValores: kebab-case (perfil-doctor)\nNo usar acentos ni espacios'} className="text-xs bg-white min-h-[100px] font-mono" value={naming} onChange={(e) => setNaming(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Checklist QA de instrumentación</h3>
              <Textarea placeholder={'[ ] cada evento se dispara una sola vez por interacción\n[ ] funnel_stage coherente entre eventos\n[ ] datos personales NO en parámetros (anonimizar)\n[ ] testeo en GA4 DebugView\n[ ] documentación en Notion/Sheets'} className="text-xs bg-white min-h-[120px]" value={qa} onChange={(e) => setQa(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg">
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
