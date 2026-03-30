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
  Users,
  Building2
} from 'lucide-react';

export default function TelefonicaPractice5() {
  const [internoTono, setInternoTono] = useState('');
  const [internoDatos, setInternoDatos] = useState('');
  const [internoLimites, setInternoLimites] = useState('');
  const [internoMicro, setInternoMicro] = useState('');
  const [externoTono, setExternoTono] = useState('');
  const [externoDatos, setExternoDatos] = useState('');
  const [externoLimites, setExternoLimites] = useState('');
  const [externoMicro, setExternoMicro] = useState('');
  const [frasesProhibidas, setFrasesProhibidas] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const toLines = (text: string) => {
    return text
      .split('\n')
      .map(l => l.replace(/^[-•]\s*/, '').trim())
      .filter(l => l.length > 0);
  };

  const generate = () => {
    const missing: string[] = [];
    if (!internoTono || !internoDatos || !internoLimites || !internoMicro)
      missing.push('bloque completo del asistente interno');
    if (!externoTono || !externoDatos || !externoLimites || !externoMicro)
      missing.push('bloque completo del asistente externo');
    if (!frasesProhibidas) missing.push('3 frases prohibidas');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Revisa: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Documento comparativo completo según los mínimos recomendados.' 
      });
    }

    const internoMicroLines = toLines(internoMicro);
    const externoMicroLines = toLines(externoMicro);
    const prohibidasLines = toLines(frasesProhibidas);

    const sb: string[] = [];
    sb.push('COMPARATIVA ASISTENTE INTERNO VS EXTERNO · TELEFÓNICA EMPRESAS');
    sb.push('');
    sb.push('1. Diferencias aplicadas (no teóricas)');
    sb.push('');
    sb.push('Dimensión | Interno (empleados soporte) | Externo (clientes empresa)');
    sb.push('--------- | --------------------------- | ---------------------------');

    sb.push(
      'Tono y estilo | ' +
        (internoTono.split('\n')[0] || 'Directo, técnico, orientado a eficiencia.') +
        ' | ' +
        (externoTono.split('\n')[0] || 'Cercano, claro, orientado a empatía y explicación.')
    );
    sb.push(
      'Nivel de jerga | Puede usar jerga técnica, códigos internos y nombres de herramientas. | Evita jerga y traduce conceptos técnicos a lenguaje de negocio.'
    );
    sb.push(
      'Datos solicitables | ' +
        (internoDatos.split('\n')[0] || 'IDs y códigos internos detallados.') +
        ' | ' +
        (externoDatos.split('\n')[0] || 'Solo datos mínimos para identificar contrato/servicio sin detalles sensibles.')
    );
    sb.push(
      'Visibilidad de procesos | Conoce y muestra nombres de procedimientos internos. | Describe pasos de forma genérica sin exponer procesos internos completos.'
    );
    sb.push(
      'Objetivo principal | Eficiencia operativa y reducción de errores en apertura de averías. | Claridad para el cliente y reducción de fricción en la experiencia.'
    );
    sb.push(
      'Gestión de límites | ' +
        (internoLimites.split('\n')[0] || 'Respeta políticas internas y SLAs, pero puede gestionar más permisos.') +
        ' | ' +
        (externoLimites.split('\n')[0] || 'Deja claros los límites: no promete plazos ni compensaciones sin validación.')
    );
    sb.push(
      'Escalado | Escala a segundo nivel técnico o supervisor interno con detalles muy técnicos. | Escala a agente humano de atención empresarial con resumen comprensible para el cliente.'
    );
    sb.push(
      'Formato de mensajes | Breve, estructurado en bullets o códigos. | Más narrativo, con frases completas y confirmaciones explícitas.'
    );
    sb.push(
      'Gestión de errores | Supone que el usuario interno puede corregir parámetros y reintentar. | Ofrece alternativas y guía para corregir datos sin culpar al cliente.'
    );
    sb.push(
      'Trazabilidad | Centrado en logs técnicos y referencias de ticket. | Centrado en claridad de comunicación y registro de promesas hechas al cliente.'
    );

    sb.push('');
    sb.push('2. Mini-especificación asistente interno');
    sb.push('');
    sb.push('2.1 Tono y estilo (interno)');
    sb.push(internoTono || '(definir tono interno)');
    sb.push('');
    sb.push('2.2 Datos solicitables (interno)');
    sb.push(internoDatos || '(definir datos internos permitidos)');
    sb.push('');
    sb.push('2.3 Transparencia y límites (interno)');
    sb.push(internoLimites || '(definir límites del asistente interno)');
    sb.push('');
    sb.push('2.4 Microcopys asistente interno (6)');
    internoMicroLines.forEach(l => sb.push('- ' + l));
    sb.push('');

    sb.push('3. Mini-especificación asistente externo');
    sb.push('');
    sb.push('3.1 Tono y estilo (externo)');
    sb.push(externoTono || '(definir tono externo)');
    sb.push('');
    sb.push('3.2 Datos solicitables (externo)');
    sb.push(externoDatos || '(definir datos externos permitidos)');
    sb.push('');
    sb.push('3.3 Transparencia y límites (externo)');
    sb.push(externoLimites || '(definir límites del asistente externo)');
    sb.push('');
    sb.push('3.4 Microcopys asistente externo (6)');
    externoMicroLines.forEach(l => sb.push('- ' + l));
    sb.push('');

    sb.push('4. Frases prohibidas (ambos asistentes)');
    prohibidasLines.forEach(l => sb.push('- ' + l));
    sb.push('');
    sb.push('Notas:');
    sb.push('- El asistente externo debe evitar prometer plazos, reembolsos o resultados que no pueda garantizar y usar siempre lenguaje condicional o de derivación a canales oficiales.');
    sb.push('- El asistente interno puede ser más directo y técnico, pero debe seguir las políticas internas y registrar adecuadamente cambios y escalados.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setInternoTono('');
    setInternoDatos('');
    setInternoLimites('');
    setInternoMicro('');
    setExternoTono('');
    setExternoDatos('');
    setExternoLimites('');
    setExternoMicro('');
    setFrasesProhibidas('');
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'No hay resumen generado todavía.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Comparativa copiada al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-green-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">5</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 5 · Interno vs externo (Telefónica Empresas)</h1>
            <p className="text-sm text-slate-600">Redacta dos mini-especificaciones de asistente (interno vs externo) para averías y procedimientos en Telefónica Empresas</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Averías y apertura guiada para clientes empresa</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Reto</strong> <span className="ml-1">interno puede usar jerga y enlaces internos; externo debe ser claro, empático y pedir pocos datos</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Entrega</strong> <span className="ml-1">10 diferencias aplicadas + 12 microcopys (6+6) + 3 frases prohibidas</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-100 text-cyan-700 border-cyan-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Telefónica Empresas quiere un asistente interno para personal de soporte (procedimientos y apertura de averías) y otro externo para clientes empresa.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>Interno: puede usar jerga técnica, códigos y enlaces internos.</li>
            <li>Externo: debe priorizar empatía, claridad y mínimos datos.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            Tu trabajo es pasar de teoría a diferencias concretas en tono, permisos, transparencia, límites y mensajes tipo ("microcopys").
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Especificaciones */}
        <div className="space-y-6">
          {/* Asistente Interno */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Especificación asistente interno
                </h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Asistente para empleados de soporte: puede asumir conocimientos previos y acceso a herramientas internas.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Tono y estilo (interno)</label>
                  <Textarea 
                    placeholder="- Directo, técnico, orientado a la eficiencia.
- Permite abreviaturas y códigos de servicio internos.
- Supone familiaridad con herramientas corporativas (Remedy, ServiceNow, etc.)." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200 text-xs"
                    value={internoTono}
                    onChange={(e) => setInternoTono(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Datos solicitables (interno)</label>
                    <Textarea 
                      placeholder="- ID de cliente o servicio interno
- Nº de circuito / línea
- Código de router / CPE
- Referencia de ticket previo..." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200 text-xs"
                      value={internoDatos}
                      onChange={(e) => setInternoDatos(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Límites y transparencia (interno)</label>
                    <Textarea 
                      placeholder="- No cierra averías críticas sin validación humana.
- No cambia SLAs ni compromisos contractuales.
- Indica siempre qué procedimiento está aplicando." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200 text-xs"
                      value={internoLimites}
                      onChange={(e) => setInternoLimites(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">6 microcopys asistente interno</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">bienvenida, pedir dato, confirmación, no encontrado, escalado, cierre</Badge>
                  </div>
                  <Textarea 
                    placeholder="- Bienvenida:
- Pedir dato:
- Confirmación:
- No encontrado:
- Escalado:
- Cierre:" 
                    className="min-h-[120px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200 text-xs"
                    value={internoMicro}
                    onChange={(e) => setInternoMicro(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Asistente Externo */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Especificación asistente externo
                </h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Asistente para clientes empresa: lenguaje claro, empatía, explicación de pasos y límites.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Tono y estilo (externo)</label>
                  <Textarea 
                    placeholder="- Cercano pero profesional.
- Explica cada paso y por qué se pide cada dato.
- Evita jerga interna y códigos incomprensibles para el cliente." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs"
                    value={externoTono}
                    onChange={(e) => setExternoTono(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Datos solicitables (externo)</label>
                    <Textarea 
                      placeholder="- Nombre y datos básicos de contacto
- Identificador de contrato o CIF empresa (sin detalles financieros completos)
- Nº de línea / servicio afectado
- Franja horaria preferente para intervención..." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs"
                      value={externoDatos}
                      onChange={(e) => setExternoDatos(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Límites y transparencia (externo)</label>
                    <Textarea 
                      placeholder="- No promete plazos exactos de resolución.
- No confirma compensaciones económicas sin validación.
- Deriva a humano en casos críticos (servicios vitales, caídas masivas, quejas formales)." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs"
                      value={externoLimites}
                      onChange={(e) => setExternoLimites(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">6 microcopys asistente externo</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">bienvenida, pedir dato, confirmación, no encontrado, escalado, cierre</Badge>
                  </div>
                  <Textarea 
                    placeholder="- Bienvenida:
- Pedir dato:
- Confirmación:
- No encontrado:
- Escalado:
- Cierre:" 
                    className="min-h-[120px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs"
                    value={externoMicro}
                    onChange={(e) => setExternoMicro(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frases Prohibidas */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">3 frases prohibidas (ambos asistentes)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Frases que nunca deberían usarse (por ejemplo, prometer reembolsos, tiempos o resultados que no controla el asistente).
              </p>
              <Textarea 
                placeholder="- Frase prohibida 1
- Frase prohibida 2
- Frase prohibida 3" 
                className="min-h-[80px] bg-white border-slate-200 focus:border-red-400 focus:ring-red-200 text-xs"
                value={frasesProhibidas}
                onChange={(e) => setFrasesProhibidas(e.target.value)}
              />

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generate} 
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold shadow-lg"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generar comparativa y microcopys
                </Button>
                <Button 
                  onClick={clearAll} 
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
        <div>
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md sticky top-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Documento comparativo interno vs externo</h3>
                <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Texto para pegar</Badge>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El documento comparativo aparecerá aquí después de generar...'}</pre>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  onClick={copySummary} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar resumen
                </Button>
                <span className="text-xs text-slate-500">
                  Pega el contenido en tu documento y, si quieres, conviértelo en tabla
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
                  <Badge className="bg-green-100 text-green-700 border-green-300 mr-2">Checklist rápido</Badge>
                  ¿Has incluido 10 diferencias aplicadas (no teóricas), 12 microcopys (6+6) y 3 frases prohibidas?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
