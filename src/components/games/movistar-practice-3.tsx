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
  Wifi,
  Network,
  Shield,
  Ticket,
  Brain,
  Database,
  Users,
  ClipboardList
} from 'lucide-react';

export default function MovistarPractice3() {
  const [formData, setFormData] = useState({
    canales: '',
    motorTipo: 'hibrido',
    motorJustificacion: '',
    orquestador: '',
    kb: '',
    ticketing: '',
    seguridad: '',
    logs: '',
    handoff: ''
  });
  const [archDiagram, setArchDiagram] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generate = () => {
    const { canales, motorTipo, motorJustificacion, orquestador, kb, ticketing, seguridad, logs, handoff } = formData;

    const missing: string[] = [];
    if (!canales) missing.push('canales');
    if (!motorJustificacion) missing.push('justificación del motor conversacional');
    if (!orquestador) missing.push('descripción del orquestador');
    if (!kb) missing.push('descripción de la KB / RAG');
    if (!ticketing) missing.push('integración con ticketing');
    if (!seguridad) missing.push('controles de seguridad');
    if (!logs) missing.push('gestión de logs');
    if (!handoff) missing.push('handoff a humano');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Revisa estos bloques antes de entregar: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Arquitectura completa según los mínimos recomendados.' 
      });
    }

    // Diagrama ASCII
    const motorLabel = motorTipo === 'reglas' ? 'MOTOR REGLAS' : motorTipo === 'llm' ? 'MOTOR LLM' : 'MOTOR HÍBRIDO';

    const diagram = [
      'USUARIOS / CANALES',
      '  ' + (canales || '- Web Movistar\n- App Mi Movistar\n- WhatsApp').replace(/\n/g, '\n  '),
      '',
      '          ┌───────────────────────────────┐',
      '          │   ORQUESTADOR / GESTOR       │',
      '          │   DE SESIÓN E INTENTS        │',
      '          └─────────────┬────────────────┘',
      '                        │',
      '          ┌─────────────┴───────────────┐',
      '          │  ' + motorLabel.padEnd(26, ' ') + '│',
      '          └───────┬───────────┬─────────┘',
      '                  │           │',
      '      ┌───────────┘           └────────────┐',
      '      │                                    │',
      '┌─────▼─────┐                       ┌──────▼─────┐',
      '│   KB /    │                       │  TICKETING │',
      '│   RAG     │                       │  INCIDENCIAS│',
      '└─────┬─────┘                       └──────┬─────┘',
      '      │                                    │',
      '      ├───────────────┐            ┌───────┴────────┐',
      '      │ RESPUESTA     │            │ HANDOFF A      │',
      '      │ AL USUARIO    │            │ AGENTE HUMANO  │',
      '      └───────────────┘            └────────────────┘',
      '',
      'Seguridad / Logs envolviendo todas las piezas (auditoría, mínimos datos, trazabilidad).',
    ].join('\n');

    setArchDiagram(diagram);

    // Justificación
    const motorTexto = motorTipo === 'reglas'
      ? 'Se opta por un motor principalmente de reglas (árboles de decisión) para mantener máximo control sobre qué se pregunta, qué se responde y cómo se crean las incidencias, minimizando riesgos de invención.'
      : motorTipo === 'llm'
      ? 'Se opta por un motor principalmente basado en LLM, apoyado en documentación interna, para manejar lenguaje natural variado y dar explicaciones más ricas al usuario.'
      : 'Se opta por un enfoque híbrido: reglas para los pasos críticos del proceso (identificación mínima, avisos legales, comprobaciones básicas del router) y LLM apoyado por RAG para explicar instrucciones y resolver dudas menos estructuradas.';

    const sb: string[] = [];
    sb.push('ARQUITECTURA FUNCIONAL DEL ASISTENTE DE SOPORTE MOVISTAR');
    sb.push('');
    sb.push('1. Canales de entrada');
    sb.push(canales || '- Web de soporte Movistar, app Mi Movistar y canal de mensajería para seguimiento de incidencias.');
    sb.push('');

    sb.push('2. Orquestador y gestión de intents');
    sb.push(orquestador || '- El orquestador centraliza mensajes de todos los canales, detecta la intención principal (avería, cortes, seguimiento, router) y gestiona el contexto de sesión (servicio afectado, pasos ya probados, etc.).');
    sb.push('');

    sb.push('3. Motor conversacional: ' + motorLabel);
    sb.push(motorTexto);
    if (motorJustificacion) {
      sb.push('');
      sb.push('Justificación adicional específica:');
      sb.push(motorJustificacion);
    }
    sb.push('');

    sb.push('4. Base de conocimiento / RAG');
    sb.push(kb || '- El asistente se apoya en una KB de guías de router, procedimientos de diagnóstico y políticas de soporte. Se recomienda un patrón RAG para que cualquier respuesta generada se base en documentación oficial y actualizada, reduciendo al máximo las invenciones.');
    sb.push('');

    sb.push('5. Integración con ticketing de averías');
    sb.push(ticketing || '- Cuando no se puede resolver en el bot, el sistema crea o actualiza un ticket en la plataforma de incidencias de Movistar, incluyendo todo el contexto recopilado por el asistente (síntomas, pruebas realizadas, horarios, tipo de cliente).');
    sb.push('');

    sb.push('6. Seguridad y protección de datos');
    sb.push(seguridad || '- Se aplican principios de mínimo dato, enmascarado de identificadores y control estricto de quién puede acceder a los logs y a los tickets, garantizando cumplimiento normativo.');
    sb.push('');

    sb.push('7. Logs y observabilidad');
    sb.push(logs || '- Se registran intents, pasos de flujo, resultados de diagnóstico y motivos de escalado, de forma anonimizada, para mejorar el asistente y auditar decisiones sin guardar datos personales innecesarios.');
    sb.push('');

    sb.push('8. Handoff a agente humano');
    sb.push(handoff || '- El handoff incluye un resumen estructurado de la conversación y los datos clave de la incidencia, de modo que el agente humano no tenga que pedir al cliente que repita la información ya aportada.');
    sb.push('');

    sb.push('9. Razones para esta arquitectura');
    sb.push('- Permite manejar lenguaje libre del usuario, pero con control fuerte en los puntos de riesgo (creación de tickets, mensajes legales, gestión de datos).');
    sb.push('- Facilita introducir RAG y LLM de forma gradual, empezando por documentación de soporte y ampliando flujos una vez que se validan métricas y riesgos.');
    sb.push('- Garantiza trazabilidad: cada decisión importante (diagnóstico sugerido, creación de ticket, escalado) queda registrada para auditoría y mejora continua.');

    setSummary(sb.join('\n'));
  };

  const clearFields = () => {
    setFormData({
      canales: '',
      motorTipo: 'hibrido',
      motorJustificacion: '',
      orquestador: '',
      kb: '',
      ticketing: '',
      seguridad: '',
      logs: '',
      handoff: ''
    });
    setArchDiagram('');
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copyAll = async () => {
    const text = archDiagram + '\n\n' + summary;
    if (!text.trim()) {
      setStatus({ type: 'error', message: 'No hay diagrama ni justificación generados todavía.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ type: 'ok', message: 'Diagrama + justificación copiados al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 flex items-center justify-center shadow-lg">
            <Wifi className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 3 · Arquitectura funcional del asistente (Movistar)</h1>
            <p className="text-sm text-slate-600">Diseña el mapa de piezas del asistente de soporte técnico de Movistar para averías de router, cortes y seguimiento de incidencias</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Averías "router / cortes / seguimiento" Movistar</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Objetivo</strong> <span className="ml-1">guiar diagnóstico inicial y crear ticket con contexto</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Decisión clave</strong> <span className="ml-1">Reglas, LLM o híbrido (riesgo / datos / control)</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Network className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Movistar recibe incidencias de "averías", "router", "cortes", "seguimiento de incidencia", muchas veces con información incompleta por parte del usuario.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El asistente guía un diagnóstico básico y recopila datos mínimos.</li>
            <li>Si no resuelve, crea un ticket con contexto para el equipo técnico.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            Evitar pedir credenciales completas; usar el mínimo dato útil y derivar a canales oficiales (1002, Mi Movistar) cuando el caso es crítico.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Components */}
        <div className="lg:col-span-3 space-y-6">
          {/* 1. Canales */}
          <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">1. Canales y entrada de usuario</h2>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-slate-700">Canales que usarán el asistente</label>
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">elige y describe</Badge>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Ej.: Web Movistar, app Mi Movistar, WhatsApp, IVR telefónico, etc.
                </p>
                <Textarea 
                  id="canales"
                  placeholder="- Widget web de soporte técnico en movistar.es
- Chat dentro de la app Mi Movistar
- Canal de mensajería (WhatsApp) para seguimiento de incidencia
..." 
                  className="min-h-[100px] bg-white border-slate-200 focus:border-cyan-400 focus:ring-cyan-200"
                  value={formData.canales}
                  onChange={(e) => handleInputChange('canales', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* 2. Motor Conversacional */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">2. Motor conversacional</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Enfoque tecnológico</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">obligatorio</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    ¿Reglas, LLM o híbrido? Piensa en los riesgos (dato personal, promesas, diagnósticos) y en la necesidad de control / explicabilidad.
                  </p>
                  <select 
                    id="motorTipo"
                    className="w-full bg-white border border-slate-200 rounded-md px-3 py-2 text-sm focus:border-purple-400 focus:ring-purple-200"
                    value={formData.motorTipo}
                    onChange={(e) => handleInputChange('motorTipo', e.target.value)}
                  >
                    <option value="hibrido">Híbrido (reglas + LLM)</option>
                    <option value="reglas">Primero reglas (árboles de decisión)</option>
                    <option value="llm">Principalmente LLM</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Justificación de la elección</label>
                  <Textarea 
                    id="motorJustificacion"
                    placeholder="Ej.: Híbrido: reglas para flujos críticos (identificación mínima, avisos legales, comprobaciones básicas de router) y LLM con RAG para explicar pasos de soporte usando documentación oficial. Esto limita invenciones y asegura que el diagnóstico inicial siga guías homologadas."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                    value={formData.motorJustificacion}
                    onChange={(e) => handleInputChange('motorJustificacion', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Componentes Principales */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">3. Componentes principales</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Motor de orquestación / sesión</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">router de intents</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Explica qué hace el orquestador: detección de intención ("avería router", "seguimiento incidencia", etc.), gestión de slots/datos y paso a KB o ticketing.
                  </p>
                  <Textarea 
                    id="orquestador"
                    placeholder="- Recibe mensajes desde todos los canales y detecta el intent principal (avería, router, cortes, seguimiento).
- Gestiona el contexto de sesión (línea/servicio afectado, tipo de dispositivo, pasos ya probados).
- Decide cuándo usar árbol de decisión, KB o derivar a ticket."
                    className="min-h-[100px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.orquestador}
                    onChange={(e) => handleInputChange('orquestador', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Base de conocimiento / RAG</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Qué documentos usa (FAQ, guías de router, políticas) y cómo se asegura que las respuestas estén basadas en evidencia y actualizadas.
                  </p>
                  <Textarea 
                    id="kb"
                    placeholder="- Documentación oficial Movistar de averías, guías de router, procedimientos de seguimiento.
- Índice RAG para que el LLM consulte siempre contenido actualizado y cite fuente.
- Mecanismo de versionado y caducidad de artículos críticos."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.kb}
                    onChange={(e) => handleInputChange('kb', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Integración con ticketing</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Sistema donde se crea/actualiza el ticket de avería (número de incidencia, estado, SLA, etc.).
                  </p>
                  <Textarea 
                    id="ticketing"
                    placeholder="- API de ticketing interna de Movistar para crear, actualizar y consultar incidencias.
- El asistente envía el resumen del diagnóstico inicial (síntomas, pruebas realizadas, router, horarios, etc.)."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.ticketing}
                    onChange={(e) => handleInputChange('ticketing', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Seguridad, Logs y Handoff */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">4. Seguridad, logs y handoff</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Controles de seguridad y datos</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: enmascarado de datos, validación de que no se piden credenciales completas, cifrado en tránsito, control de acceso a logs.
                  </p>
                  <Textarea 
                    id="seguridad"
                    placeholder="- Enmascarado parcial de datos (ej.: mostrar solo últimos dígitos del número de línea).
- Validación de que el bot no pide usuario/contraseña completos ni datos sensibles.
- Cifrado TLS extremo a extremo y acceso a logs solo para equipo autorizado."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.seguridad}
                    onChange={(e) => handleInputChange('seguridad', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Logs y observabilidad</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Qué se registra, para qué y durante cuánto tiempo (cumpliendo normativa de privacidad).
                  </p>
                  <Textarea 
                    id="logs"
                    placeholder="- Registro de intents, pasos de flujo, resultados de diagnosis y motivos de escalado.
- Anonimización de contenido de conversación, conservando solo lo necesario para mejorar el asistente y auditar decisiones."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.logs}
                    onChange={(e) => handleInputChange('logs', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Handoff a agente humano</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Cómo se pasa el contexto al agente para evitar que el cliente repita todo (resumen automático de la conversación).
                  </p>
                  <Textarea 
                    id="handoff"
                    placeholder="- Resumen automático de la conversación con datos clave: servicio afectado, síntomas, pruebas realizadas, resultado, nivel de urgencia.
- Enlace directo al ticket en la herramienta de atención, visible para el agente en tiempo real."
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.handoff}
                    onChange={(e) => handleInputChange('handoff', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generate} 
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold shadow-lg"
                >
                  <Network className="h-4 w-4 mr-2" />
                  Generar diagrama y justificación
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

        {/* Right Column - Diagram + Summary */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md sticky top-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Diagrama funcional + justificación</h3>
                <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Texto para pegar</Badge>
              </div>
              
              {/* ASCII Diagram */}
              {archDiagram && (
                <div className="bg-slate-900 border border-slate-300 rounded-lg p-3 overflow-auto font-mono text-xs leading-relaxed text-slate-100 shadow-inner">
                  <pre className="whitespace-pre">{archDiagram}</pre>
                </div>
              )}

              {/* Summary */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El diagrama y justificación aparecerán aquí después de generar...'}</pre>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  onClick={copyAll} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar todo
                </Button>
                <span className="text-xs text-slate-500">
                  Pega el diagrama y la justificación en tu documento
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
                  ¿Incluye al menos 8 componentes, decisión de motor (reglas/LLM/híbrido) y explicación de riesgos, datos y control?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
