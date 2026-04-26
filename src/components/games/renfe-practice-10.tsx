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
  Shield,
  Clock,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';

export default function RenfePractice10() {
  const [plantillas, setPlantillas] = useState('');
  const [matrizRiesgo, setMatrizRiesgo] = useState('');
  const [protocolo, setProtocolo] = useState('');
  const [casosTest, setCasosTest] = useState('');
  const [registro, setRegistro] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (getLines(plantillas).length < 12) missing.push(`mín. 12 plantillas (tienes ${getLines(plantillas).length})`);
    if (!matrizRiesgo) missing.push('matriz riesgo → acción');
    if (!protocolo) missing.push('protocolo de crisis (30min / 2h / 24h)');
    if (getLines(casosTest).length < 10) missing.push(`mín. 10 casos difíciles de test (tienes ${getLines(casosTest).length})`);
    if (!registro) missing.push('registro/log de casos');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Kit de community management completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 10 — COMMUNITY Y "MINI-CRISIS": PLANTILLAS + PROTOCOLO DE ESCALADO (Renfe)');
    sb.push('Fase del ciclo: Distribución → Optimización (gestión de comunidad)');
    sb.push('Tipo: Grupal');
    sb.push('');
    sb.push('REGLAS BASE:');
    sb.push('  - Prohibido pedir datos sensibles en público (solo por canal privado).');
    sb.push('  - No prometer compensaciones no verificables.');
    sb.push('  - Anonimiza con [EMAIL], [TEL], [CLIENTE], [PEDIDO_ID].');
    sb.push('');
    sb.push('1) PLANTILLAS DE RESPUESTA (mín. 12)');
    sb.push('Categorías: info · disculpa · pedir datos mínimos · derivar a privado · escalado · cierre');
    getLines(plantillas).forEach((p, i) => sb.push(`  T${i + 1}. ${p}`));
    sb.push('');
    sb.push('2) MATRIZ "RIESGO → ACCIÓN" (cuándo responde CM y cuándo escala a Legal/Operaciones)');
    sb.push(matrizRiesgo);
    sb.push('');
    sb.push('3) PROTOCOLO DE CRISIS');
    sb.push('Primeros 30 min / 2h / 24h');
    sb.push(protocolo);
    sb.push('');
    sb.push('4) CASOS DIFÍCILES DE TEST (mín. 10: enfado / acusación / petición de compensación / etc.)');
    getLines(casosTest).forEach((c, i) => sb.push(`  C${i + 1}. ${c}`));
    sb.push('');
    sb.push('5) REGISTRO / LOG');
    sb.push(registro);
    sb.push('');
    sb.push('Herramientas recomendadas: ChatGPT/Claude + Notion (repositorio) + checklist de claims.');
    sb.push('Resultado: kit de community management listo para uso real.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setPlantillas(''); setMatrizRiesgo(''); setProtocolo(''); setCasosTest(''); setRegistro('');
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-500 via-zinc-500 to-stone-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">10</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 10 · Community y "mini-crisis": plantillas + protocolo de escalado (Renfe)</h1>
            <p className="text-sm text-slate-600">Responder rápido, con empatía y sin comprometer compensaciones no verificables</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200"><MessageSquare className="h-3 w-3 mr-1" /> 12 plantillas</Badge>
          <Badge variant="outline" className="bg-zinc-50 text-zinc-700 border-zinc-200"><AlertTriangle className="h-3 w-3 mr-1" /> Matriz riesgo</Badge>
          <Badge variant="outline" className="bg-stone-50 text-stone-700 border-stone-200"><Clock className="h-3 w-3 mr-1" /> Protocolo 30m/2h/24h</Badge>
        </div>
      </div>

      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-zinc-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-5 w-5 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-700 border-slate-300">Renfe · transporte</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Renfe</strong> recibe quejas en redes (retrasos, devoluciones, incidencias). Marketing/Comms necesita responder rápido,
            con empatía y sin comprometer compensaciones no verificables. Piden un kit: plantillas + criterios de escalado + registro.
          </p>
          <a href="https://www.renfe.com/es/es/ayuda/atencion-al-cliente" target="_blank" rel="noopener noreferrer" className="inline-block p-2 rounded bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs">🔗 renfe.com/.../atencion-al-cliente</a>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <strong>📋 Lo que se pide:</strong> 12 plantillas (info, disculpa, pedir datos mínimos, derivar a privado, escalado, cierre) · matriz "riesgo → acción" (CM vs Legal/Operaciones) · protocolo básico de crisis (30 min / 2 h / 24 h). Prohibido pedir datos sensibles en público (solo por canal privado). 10 casos difíciles de test.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-zinc-50">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Plantillas (mín. 12)</h3>
              <p className="text-xs text-slate-500">Categorías: info · disculpa · datos · privado · escalado · cierre</p>
              <Textarea placeholder={'T1 [INFO] Hola {nombre}, en este momento el tren {linea} circula con retraso por {motivo}. Te avisamos en cuanto haya novedades.\nT2 [DISCULPA] Lamentamos las molestias ocasionadas hoy en {servicio}. Trabajamos para minimizar el impacto.\nT3 [DATOS] Para revisar tu caso, ¿podrías escribirnos por privado tu localizador? Por aquí no compartas datos personales.\nT4 [PRIVADO] Te respondemos por DM para tratar tu caso de forma segura.\nT5 [ESCALADO] He derivado tu caso al equipo correspondiente. Te contactarán en {plazo}.\nT6 [CIERRE] Gracias por tu paciencia. Damos por resuelto tu caso. Si necesitas algo más, escríbenos.\n...'} className="text-xs bg-white min-h-[260px] font-mono" value={plantillas} onChange={(e) => setPlantillas(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Matriz "riesgo → acción"</h3>
              <Textarea placeholder={'Riesgo BAJO (queja general) → CM responde con plantilla pública.\nRiesgo MEDIO (datos personales mencionados) → derivar a privado.\nRiesgo ALTO (acusación legal / mención medios) → escalar Legal + Comms en < 30 min.\nRiesgo CRÍTICO (incidente seguridad) → activar protocolo crisis.'} className="text-xs bg-white min-h-[140px] font-mono" value={matrizRiesgo} onChange={(e) => setMatrizRiesgo(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><Clock className="h-4 w-4" /> Protocolo crisis</h3>
              <Textarea placeholder={'30 MIN: detección + acuse de recibo público + alerta interna (Comms + Operaciones).\n2 H: posición oficial preliminar (sin claims sin evidencia) + canal privado activo.\n24 H: balance + acciones correctivas + comunicado de cierre o seguimiento.'} className="text-xs bg-white min-h-[140px] font-mono" value={protocolo} onChange={(e) => setProtocolo(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Casos difíciles de test (mín. 10)</h3>
              <Textarea placeholder={'1. Cliente enfadado pide compensación pública por retraso de 3h\n2. Acusación de mal trato sin pruebas\n3. Periodista replicando hilo viral\n4. Cliente con datos personales en post público\n5. Petición legal vía DM\n6. ...'} className="text-xs bg-white min-h-[160px] font-mono" value={casosTest} onChange={(e) => setCasosTest(e.target.value)} />
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
            <CardContent className="p-5 space-y-2">
              <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Registro / log de casos</h3>
              <Textarea placeholder={'Campos: id_caso, fecha, canal, categoría, riesgo, plantilla_usada, escalado (sí/no), tiempo_respuesta, estado.\nFrecuencia revisión: semanal (ratio escalados, tiempo medio, claims marcados).'} className="text-xs bg-white min-h-[100px] font-mono" value={registro} onChange={(e) => setRegistro(e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-slate-600 to-zinc-700 hover:from-slate-700 hover:to-zinc-800 text-white font-semibold shadow-lg">
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
