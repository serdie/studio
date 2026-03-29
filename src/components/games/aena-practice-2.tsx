'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp,
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Plane,
  BarChart3
} from 'lucide-react';

export default function AenaPractice2() {
  const [formData, setFormData] = useState({
    kpi1_name: '',
    kpi1_measure: '',
    kpi1_target: '',
    kpi2_name: '',
    kpi2_measure: '',
    kpi2_target: '',
    kpi3_name: '',
    kpi3_measure: '',
    kpi3_target: '',
    kpi4_name: '',
    kpi4_measure: '',
    kpi4_target: '',
    kpi5_name: '',
    kpi5_measure: '',
    kpi5_target: '',
    kpi6_name: '',
    kpi6_measure: '',
    kpi6_target: '',
    alerta1: '',
    alerta2: '',
    alerta3: '',
    riesgo: ''
  });
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSummary = () => {
    const fields = [
      "kpi1_name", "kpi1_measure", "kpi1_target",
      "kpi2_name", "kpi2_measure", "kpi2_target",
      "kpi3_name", "kpi3_measure", "kpi3_target",
      "kpi4_name", "kpi4_measure", "kpi4_target",
      "kpi5_name", "kpi5_measure", "kpi5_target",
      "kpi6_name", "kpi6_measure", "kpi6_target",
      "alerta1", "alerta2", "alerta3", "riesgo"
    ];

    const values: Record<string, string> = {};
    fields.forEach((id) => {
      values[id] = formData[id as keyof typeof formData].trim();
    });

    const missing: string[] = [];
    if (!values.kpi1_name || !values.kpi1_measure || !values.kpi1_target) missing.push("KPI 1 completo");
    if (!values.kpi2_name || !values.kpi2_measure || !values.kpi2_target) missing.push("KPI 2 completo");
    if (!values.kpi3_name || !values.kpi3_measure || !values.kpi3_target) missing.push("KPI 3 completo");
    if (!values.kpi4_name || !values.kpi4_measure || !values.kpi4_target) missing.push("KPI 4 completo");
    if (!values.kpi5_name || !values.kpi5_measure || !values.kpi5_target) missing.push("KPI 5 completo");
    if (!values.kpi6_name || !values.kpi6_measure || !values.kpi6_target) missing.push("KPI 6 completo");
    if (!values.alerta1 || !values.alerta2 || !values.alerta3) missing.push("3 alertas");
    if (!values.riesgo) missing.push("métrica de riesgo");

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Revisa estos elementos antes de entregar: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Cuadro de mando completo según los mínimos recomendados.' 
      });
    }

    const sb: string[] = [];

    sb.push('CUADRO DE MANDO MÍNIMO · CHATBOT OLI (AENA)');
    sb.push('');
    sb.push('1. KPIs PRINCIPALES');
    sb.push('');
    sb.push('KPI | Definición | Cómo se mide | Objetivo');
    sb.push('--- | ----------- | ------------ | --------');

    sb.push(
      (values.kpi1_name || 'Tiempo de primera respuesta (FRT)') +
      ' | ' + (values.kpi1_name || '') +
      ' | ' + (values.kpi1_measure || '') +
      ' | ' + (values.kpi1_target || '')
    );
    sb.push(
      (values.kpi2_name || '% consultas resueltas con calidad') +
      ' | ' + (values.kpi2_name || '') +
      ' | ' + (values.kpi2_measure || '') +
      ' | ' + (values.kpi2_target || '')
    );
    sb.push(
      (values.kpi3_name || '% retrabajo / recontactos') +
      ' | ' + (values.kpi3_name || '') +
      ' | ' + (values.kpi3_measure || '') +
      ' | ' + (values.kpi3_target || '')
    );
    sb.push(
      (values.kpi4_name || 'CSAT específico del bot') +
      ' | ' + (values.kpi4_name || '') +
      ' | ' + (values.kpi4_measure || '') +
      ' | ' + (values.kpi4_target || '')
    );
    sb.push(
      (values.kpi5_name || '% de escalado a humano') +
      ' | ' + (values.kpi5_name || '') +
      ' | ' + (values.kpi5_measure || '') +
      ' | ' + (values.kpi5_target || '')
    );
    sb.push(
      (values.kpi6_name || 'KPI adicional') +
      ' | ' + (values.kpi6_name || '') +
      ' | ' + (values.kpi6_measure || '') +
      ' | ' + (values.kpi6_target || '')
    );

    sb.push('');
    sb.push('2. ALERTAS OPERATIVAS');
    sb.push('');
    sb.push('Alerta | Condición / umbral | Acción al activarse');
    sb.push('--- | -------------------- | -------------------');

    const parseAlerta = (txt: string, nombre: string) => {
      if (!txt) return nombre + ' |  | ';
      const partes = txt.split('->');
      const condicion = partes[0].trim();
      const accion = partes[1] ? partes[1].trim() : '';
      return nombre + ' | ' + condicion + ' | ' + accion;
    };

    sb.push(parseAlerta(values.alerta1, 'Alerta 1'));
    sb.push(parseAlerta(values.alerta2, 'Alerta 2'));
    sb.push(parseAlerta(values.alerta3, 'Alerta 3'));

    sb.push('');
    sb.push('3. MÉTRICA DE RIESGO');
    sb.push('');
    sb.push(values.riesgo || "Definir una métrica de riesgo (p. ej., '% respuestas sin evidencia' o 'nº de quejas escaladas vinculadas al bot').");
    sb.push('');
    sb.push('Notas:');
    sb.push('- Las métricas se revisarán en comité de seguimiento periódico.');
    sb.push('- El objetivo es detectar a tiempo problemas de calidad, frustración o escalado excesivo, y no solo aumentar el volumen de conversaciones.');

    setSummary(sb.join('\n'));
  };

  const clearFields = () => {
    setFormData({
      kpi1_name: '',
      kpi1_measure: '',
      kpi1_target: '',
      kpi2_name: '',
      kpi2_measure: '',
      kpi2_target: '',
      kpi3_name: '',
      kpi3_measure: '',
      kpi3_target: '',
      kpi4_name: '',
      kpi4_measure: '',
      kpi4_target: '',
      kpi5_name: '',
      kpi5_measure: '',
      kpi5_target: '',
      kpi6_name: '',
      kpi6_measure: '',
      kpi6_target: '',
      alerta1: '',
      alerta2: '',
      alerta3: '',
      riesgo: ''
    });
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'No hay cuadro de mando generado todavía.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Cuadro de mando copiado al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 2 · KPIs y métricas de éxito (Aena · Oli)</h1>
            <p className="text-sm text-slate-600">Define un cuadro de mando mínimo para el chatbot de Aena (Oli): 6 KPIs clave, 3 alertas operativas y 1 métrica de riesgo</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Aena · chatbot Oli · info vuelos y servicios</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Objetivo</strong> <span className="ml-1">medir valor real, no solo volumen de chats</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Incluye</strong> <span className="ml-1">FRT, % resuelto, % retrabajo, CSAT, % escalado + 1 KPI extra</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Aena quiere saber si su asistente Oli realmente aporta valor: informa sobre vuelos, servicios y orientación en el aeropuerto, en varios canales (web, app, pantallas, WhatsApp).
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>Más conversaciones no es mejor si no resuelve.</li>
            <li>Importa el % de dudas resueltas, la calidad y el escalado correcto.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            La guía pide 6 KPIs (con definición, cómo medir, objetivo), 3 alertas y 1 métrica de riesgo.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - KPIs */}
        <div className="lg:col-span-3 space-y-6">
          {/* KPI 1 */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 1 · Tiempo de primera respuesta (FRT)</h2>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Nombre / definición</label>
                <Input 
                  id="kpi1_name"
                  placeholder="Ej.: Tiempo de primera respuesta (FRT): segundos desde que inicia el chat hasta la primera respuesta útil del bot."
                  className="bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                  value={formData.kpi1_name}
                  onChange={(e) => handleInputChange('kpi1_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Cómo se mide (fuente / cálculo)</label>
                  <Textarea 
                    id="kpi1_measure"
                    placeholder="Ej.: Diferencia entre timestamp del primer mensaje del usuario y timestamp de la primera respuesta del bot, en segundos."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                    value={formData.kpi1_measure}
                    onChange={(e) => handleInputChange('kpi1_measure', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Objetivo</label>
                  <Input 
                    id="kpi1_target"
                    placeholder="Ej.: < 2 segundos de media"
                    className="bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                    value={formData.kpi1_target}
                    onChange={(e) => handleInputChange('kpi1_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI 2 */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 2 · % consultas resueltas con calidad</h2>
              </div>

              <div>
                <Input 
                  id="kpi2_name"
                  placeholder="Ej.: % de consultas resueltas con calidad sin necesidad de contactar con un agente humano."
                  className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200 mb-2"
                  value={formData.kpi2_name}
                  onChange={(e) => handleInputChange('kpi2_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Textarea 
                    id="kpi2_measure"
                    placeholder="Ej.: (nº conversaciones marcadas como 'resueltas' / nº total de conversaciones del bot) × 100. Basado en intent final + encuesta rápida."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200"
                    value={formData.kpi2_measure}
                    onChange={(e) => handleInputChange('kpi2_measure', e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    id="kpi2_target"
                    placeholder="Ej.: ≥ 70 % de conversaciones resueltas en bot"
                    className="bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200"
                    value={formData.kpi2_target}
                    onChange={(e) => handleInputChange('kpi2_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI 3 */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 3 · % retrabajo / recontactos</h2>
              </div>

              <div>
                <Input 
                  id="kpi3_name"
                  placeholder="Ej.: % de usuarios que vuelven a contactar por el mismo tema en < 24–48 h."
                  className="bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200 mb-2"
                  value={formData.kpi3_name}
                  onChange={(e) => handleInputChange('kpi3_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Textarea 
                    id="kpi3_measure"
                    placeholder="Ej.: (nº de chats que se reabren sobre el mismo vuelo/consulta en 48 h / nº total de chats) × 100, a partir de IDs de sesión y vuelo."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.kpi3_measure}
                    onChange={(e) => handleInputChange('kpi3_measure', e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    id="kpi3_target"
                    placeholder="Ej.: < 10 % de retrabajo"
                    className="bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.kpi3_target}
                    onChange={(e) => handleInputChange('kpi3_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI 4 */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 4 · CSAT específico del bot</h2>
              </div>

              <div>
                <Input 
                  id="kpi4_name"
                  placeholder="Ej.: Satisfacción media (CSAT) de los usuarios con el asistente Oli, en escala 1–5."
                  className="bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 mb-2"
                  value={formData.kpi4_name}
                  onChange={(e) => handleInputChange('kpi4_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Textarea 
                    id="kpi4_measure"
                    placeholder="Ej.: Encuesta rápida al cierre del chat ('¿Te ha servido la ayuda? 1–5') → media sobre respuestas recibidas."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.kpi4_measure}
                    onChange={(e) => handleInputChange('kpi4_measure', e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    id="kpi4_target"
                    placeholder="Ej.: ≥ 4/5 de media o ≥ 80 % de respuestas positivas"
                    className="bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.kpi4_target}
                    onChange={(e) => handleInputChange('kpi4_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI 5 */}
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 5 · % de escalado a humano</h2>
              </div>

              <div>
                <Input 
                  id="kpi5_name"
                  placeholder="Ej.: Porcentaje de conversaciones en las que interviene un agente humano tras el bot."
                  className="bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-200 mb-2"
                  value={formData.kpi5_name}
                  onChange={(e) => handleInputChange('kpi5_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Textarea 
                    id="kpi5_measure"
                    placeholder="Ej.: (nº conversaciones donde se produce handoff a agente / nº total de conversaciones) × 100, segmentando por motivo de escalado."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                    value={formData.kpi5_measure}
                    onChange={(e) => handleInputChange('kpi5_measure', e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    id="kpi5_target"
                    placeholder="Ej.: < 25 % de handoff, sin sacrificar CSAT"
                    className="bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-200"
                    value={formData.kpi5_target}
                    onChange={(e) => handleInputChange('kpi5_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI 6 */}
          <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPI 6 · KPI extra (a elegir)</h2>
              </div>

              <div>
                <Input 
                  id="kpi6_name"
                  placeholder="Ej.: Tasa de automatización / deflexión, uso de AenaMaps, precisión de respuestas, etc."
                  className="bg-white border-slate-200 focus:border-pink-400 focus:ring-pink-200 mb-2"
                  value={formData.kpi6_name}
                  onChange={(e) => handleInputChange('kpi6_name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Textarea 
                    id="kpi6_measure"
                    placeholder="Describe la fórmula y la fuente de datos para este KPI adicional."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-pink-400 focus:ring-pink-200"
                    value={formData.kpi6_measure}
                    onChange={(e) => handleInputChange('kpi6_measure', e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    id="kpi6_target"
                    placeholder="Objetivo propuesto (ej.: 70–85 % de automatización)"
                    className="bg-white border-slate-200 focus:border-pink-400 focus:ring-pink-200"
                    value={formData.kpi6_target}
                    onChange={(e) => handleInputChange('kpi6_target', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas y Métrica de Riesgo */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Alertas operativas (3) y métrica de riesgo</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">3 alertas con umbral</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">umbral + acción</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: &quot;Si CSAT &lt; 3,5 durante 7 días → revisar logs&quot;, &quot;Si % escalado &gt; 30 % → reforzar FAQs/personal&quot;.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Alerta 1</label>
                  <Textarea 
                    id="alerta1"
                    placeholder="Describe la condición (métrica + umbral) y qué ocurre si se supera."
                    className="min-h-[60px] bg-white border-slate-200 focus:border-red-400 focus:ring-red-200"
                    value={formData.alerta1}
                    onChange={(e) => handleInputChange('alerta1', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Alerta 2</label>
                  <Textarea 
                    id="alerta2"
                    placeholder="Ej.: Si FRT medio > X segundos durante Y días → ajustar capacidad / canales."
                    className="min-h-[60px] bg-white border-slate-200 focus:border-red-400 focus:ring-red-200"
                    value={formData.alerta2}
                    onChange={(e) => handleInputChange('alerta2', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Alerta 3</label>
                  <Textarea 
                    id="alerta3"
                    placeholder="Ej.: Si % retrabajo supera X % → revisar intents de vuelos concretos."
                    className="min-h-[60px] bg-white border-slate-200 focus:border-red-400 focus:ring-red-200"
                    value={formData.alerta3}
                    onChange={(e) => handleInputChange('alerta3', e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Métrica de riesgo</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">1 métrica</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: "% respuestas sin evidencia / sin enlace oficial", "nº de quejas formales escaladas vinculadas al bot".
                  </p>
                  <Textarea 
                    id="riesgo"
                    placeholder="- Nombre de la métrica de riesgo
- Cómo se mide
- Umbral que dispara revisión"
                    className="min-h-[80px] bg-white border-slate-200 focus:border-red-400 focus:ring-red-200"
                    value={formData.riesgo}
                    onChange={(e) => handleInputChange('riesgo', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generateSummary} 
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold shadow-lg"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generar cuadro de mando
                </Button>
                <Button 
                  onClick={clearFields} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar campos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md sticky top-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Cuadro de mando mínimo · Oli (Aena)</h3>
                <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Texto para copiar</Badge>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El cuadro de mando aparecerá aquí después de generar...'}</pre>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  onClick={copySummary} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar cuadro de mando
                </Button>
                <span className="text-xs text-slate-500">
                  Pega este contenido en una tabla en tu documento
                </span>
              </div>

              {status.message && (
                <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                  status.type === 'ok' ? 'bg-green-50 text-green-700' : 
                  status.type === 'error' ? 'bg-red-50 text-red-700' : ''
                }`}>
                  {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4" /> : 
                   status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : null}
                  {status.message}
                </div>
              )}

              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs text-slate-600">
                  ¿Incluye al menos 6 KPIs (definición + medición + objetivo), 3 alertas con umbral y 1 métrica de riesgo?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
