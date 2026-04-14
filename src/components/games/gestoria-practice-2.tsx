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
  Code2,
  Shield,
  Database,
  Zap,
  BarChart3,
  AlertTriangle,
  ArrowRightLeft
} from 'lucide-react';

export default function GestoriaPractice2() {
  const [jsonSchema, setJsonSchema] = useState('');
  const [ejemploOk, setEjemploOk] = useState('');
  const [ejemploFaltan, setEjemploFaltan] = useState('');
  const [ejemploSensible, setEjemploSensible] = useState('');
  const [reglas, setReglas] = useState('');
  const [rutaFaltantes, setRutaFaltantes] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const getLines = (text: string) => text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const generate = () => {
    const missing: string[] = [];
    if (!jsonSchema) missing.push('JSON contrato');
    if (getLines(reglas).length < 10) missing.push('mínimo 10 reglas de validación');
    if (!ejemploOk) missing.push('ejemplo buen caso');
    if (!ejemploFaltan) missing.push('ejemplo faltan datos');
    if (!rutaFaltantes) missing.push('ruta datos faltantes');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Contrato de datos completo según los mínimos.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 2 — CONTRATO DE DATOS (JSON) + VALIDACIÓN (Gestoría)');
    sb.push('');
    sb.push('1. JSON contrato para "solicitud de trámite"');
    sb.push(jsonSchema);
    sb.push('');
    sb.push('2. Ejemplos de entrada');
    sb.push('');
    sb.push('=== CASO OK ===');
    sb.push(ejemploOk);
    sb.push('');
    sb.push('=== FALTAN DATOS ===');
    sb.push(ejemploFaltan);
    sb.push('');
    sb.push('=== CASO SENSIBLE ===');
    sb.push(ejemploSensible);
    sb.push('');
    sb.push('3. Reglas de validación (entrada y salida)');
    getLines(reglas).forEach((r, i) => sb.push(`  ${i + 1}. ${r}`));
    sb.push('');
    sb.push('4. Ruta "datos faltantes"');
    sb.push(rutaFaltantes);
    sb.push('');
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- VS Code + Qwen CLI: "Genera un JSON schema para solicitud de trámite con campos mínimos, opcionales, tipos y metadatos"');
    sb.push('- Gemini Pro (Antigravity): "Valida estos 3 ejemplos de JSON contra el schema y detecta errores"');
    sb.push('- Validador JSON online: jsonschema.net o jsonlint.com');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setJsonSchema(''); setEjemploOk(''); setEjemploFaltan('');
    setEjemploSensible(''); setReglas(''); setRutaFaltantes('');
    setSummary(''); setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado.' }); }
    catch { setStatus({ type: 'error', message: 'Copia manualmente.' }); }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">2</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 2 · Contrato de Datos JSON + Validación (Gestoría)</h1>
            <p className="text-sm text-slate-600">Normaliza la entrada de solicitudes a un JSON estándar antes de automatizar</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Code2 className="h-3 w-3 mr-1" /> JSON Schema</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Shield className="h-3 w-3 mr-1" /> 10 reglas validación</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Zap className="h-3 w-3 mr-1" /> Vibe Coding</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">Gestoría · trámites</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una gestoría recibe solicitudes por email para "alta de autónomo", "cambio de domicilio fiscal", "certificados", etc. El problema: cada email trae datos distintos, y el equipo pierde tiempo pidiendo lo mismo una y otra vez. Quieren <strong>normalizar la entrada a un JSON estándar</strong> antes de automatizar nada. El 80% de los problemas vienen de datos mal estructurados.
          </p>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
            <strong>💡 Herramientas Vibe Coding:</strong> VS Code + Qwen CLI para generar el JSON schema. Gemini Pro (Antigravity) para validar ejemplos. JSONLint para verificación rápida.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* JSON Schema */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><Code2 className="h-4 w-4" /> JSON contrato (campos mínimos, opcionales, tipos, metadatos)</h3>
              <Textarea placeholder='{\n  "tipo_tramite": "alta_autonomo",\n  "email_contacto": "cliente@email.com",\n  "nombre_cliente": "Maria Garcia",\n  "resumen": "Solicitud de alta como autonoma",\n  "prioridad": "media",\n  "attachments": [{"nombre": "dni.pdf", "tipo": "application/pdf"}],\n  "metadata": {\n    "source": "email",\n    "timestamp": "2025-04-12T10:30:00Z",\n    "trace_id": "req-001",\n    "schema_version": "1.0"\n  }\n}' className="text-xs bg-white min-h-[200px] font-mono" value={jsonSchema} onChange={(e) => setJsonSchema(e.target.value)} />
            </CardContent>
          </Card>

          {/* Reglas */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-green-900 flex items-center gap-2"><Shield className="h-4 w-4" /> 10 reglas de validación (entrada y salida)</h3>
              <Textarea placeholder="1. tipo_tramite en {alta_autonomo, cambio_domicilio, certificado, baja_autonomo, consulta}\n2. email_contacto debe tener formato valido\n3. prioridad en {alta, media, baja}\n4. nombre_cliente no vacio, max 100 chars\n5. attachments[]: cada item debe tener nombre y tipo\n6. metadata.source en {email, formulario, telefono}\n7. metadata.timestamp en formato ISO 8601\n8. metadata.trace_id unico (UUID o similar)\n9. schema_version = 1.0\n10. Si falta algun campo minimo -> ruta datos faltantes" className="text-xs bg-white min-h-[200px] font-mono" value={reglas} onChange={(e) => setReglas(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Ejemplos */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><FileText className="h-4 w-4" /> 3 ejemplos de entrada</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-green-700 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Buen caso</label>
                  <Textarea placeholder='{"tipo_tramite": "alta_autonomo", "email_contacto": "maria@email.com", ...}' className="text-xs bg-green-50 border-green-200 min-h-[80px] font-mono" value={ejemploOk} onChange={(e) => setEjemploOk(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-amber-700 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Faltan datos</label>
                  <Textarea placeholder='{"tipo_tramite": "alta_autonomo", "email_contacto": "maria@email.com"} // falta nombre, prioridad...' className="text-xs bg-amber-50 border-amber-200 min-h-[80px] font-mono" value={ejemploFaltan} onChange={(e) => setEjemploFaltan(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-red-700 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Caso sensible</label>
                  <Textarea placeholder='{"tipo_tramite": "baja_autonomo", "resumen": "Tengo una deuda con Hacienda de 15.000€...", ...}' className="text-xs bg-red-50 border-red-200 min-h-[80px] font-mono" value={ejemploSensible} onChange={(e) => setEjemploSensible(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ruta faltantes */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" /> Ruta "datos faltantes"</h3>
              <Textarea placeholder={"Si faltan datos mínimos:\n1. Sistema detecta campos vacíos\n2. Genera preguntas automáticas ('¿Cuál es tu nombre completo?')\n3. Reintenta hasta 2 veces\n4. Si persiste → deriva a revisión humana\n5. Registra trace_id y campos faltantes en logs"} className="text-xs bg-white min-h-[120px]" value={rutaFaltantes} onChange={(e) => setRutaFaltantes(e.target.value)} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Generar entregable
            </Button>
            <Button onClick={clearAll} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>

          {/* Summary */}
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
