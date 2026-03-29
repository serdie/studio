'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Stethoscope, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Eye, 
  TrendingUp,
  Copy,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function SanitasPractice1() {
  const [formData, setFormData] = useState({
    perfil1: '',
    perfil2: '',
    perfil3: '',
    tareas: '',
    alcance: '',
    noHace: '',
    datosPermitidos: '',
    datosProhibidos: '',
    transparencia: '',
    escalado: '',
    kpis: ''
  });
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getLines = (value: string) => {
    return value
      .split('\n')
      .map(l => l.replace(/^[-•]\s*/, '').trim())
      .filter(l => l.length > 0);
  };

  const generateSummary = () => {
    const { perfil1, perfil2, perfil3 } = formData;
    const tareas = getLines(formData.tareas);
    const alcance = getLines(formData.alcance);
    const noHace = getLines(formData.noHace);
    const datosPermitidos = getLines(formData.datosPermitidos);
    const datosProhibidos = getLines(formData.datosProhibidos);
    const transparencia = getLines(formData.transparencia);
    const escalado = getLines(formData.escalado);
    const kpis = getLines(formData.kpis);

    const missing: string[] = [];
    if (!perfil1 || !perfil2 || !perfil3) missing.push('3 perfiles de usuario');
    if (tareas.length < 6) missing.push('al menos 6 tareas iniciales');
    if (noHace.length === 0) missing.push("bloque de 'lo que NO hace'");
    if (datosPermitidos.length === 0) missing.push('lista de datos permitidos');
    if (datosProhibidos.length === 0) missing.push('lista de datos prohibidos');
    if (escalado.length < 5) missing.push('5 reglas de escalado a humano');
    if (kpis.length < 3) missing.push('al menos 3 KPIs');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Faltan algunos elementos recomendados: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Brief completo según los mínimos recomendados.' 
      });
    }

    const sb: string[] = [];

    sb.push('BRIEF / CONTRATO DEL ASISTENTE · SANITAS');
    sb.push('');
    sb.push('1. Contexto y objetivo');
    sb.push('- Sanitas sufre saturación en la gestión de citas y dudas repetitivas (picos de llamadas, dudas sobre cómo pedir/cambiar cita, documentación y resultados).');
    sb.push('- El objetivo del asistente es orientar al usuario y derivar al canal adecuado, sin realizar diagnóstico médico ni pedir datos sensibles innecesarios.');
    sb.push('');

    sb.push('2. Perfiles de usuario principales');
    if (perfil1) sb.push('- ' + perfil1);
    if (perfil2) sb.push('- ' + perfil2);
    if (perfil3) sb.push('- ' + perfil3);
    sb.push('');

    sb.push('3. Tareas iniciales del asistente');
    tareas.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('4. Alcance funcional (lo que SÍ hace)');
    alcance.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('5. Lo que NO hace (fuera de alcance)');
    noHace.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('6. Política de datos');
    sb.push('6.1 Datos permitidos (mínimo dato útil)');
    datosPermitidos.forEach(t => sb.push('- ' + t));
    sb.push('');
    sb.push('6.2 Datos prohibidos');
    datosProhibidos.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('7. Mensajes de transparencia');
    transparencia.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('8. Reglas de escalado a humano');
    escalado.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('9. KPIs (indicadores de éxito)');
    kpis.forEach(t => sb.push('- ' + t));
    sb.push('');

    sb.push('10. Límites y notas');
    sb.push('- El asistente no sustituye nunca a un profesional médico ni a los canales de urgencia.');
    sb.push('- Se aplicará el principio de \'mínimo dato útil\': solo se piden los datos imprescindibles para orientar al usuario.');

    setSummary(sb.join('\n'));
  };

  const clearFields = () => {
    setFormData({
      perfil1: '',
      perfil2: '',
      perfil3: '',
      tareas: '',
      alcance: '',
      noHace: '',
      datosPermitidos: '',
      datosProhibidos: '',
      transparencia: '',
      escalado: '',
      kpis: ''
    });
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
      setStatus({ type: 'ok', message: 'Resumen copiado al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">4</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 1 · Brief y contrato del asistente (Sanitas)</h1>
            <p className="text-sm text-slate-600">Completa este formulario para generar un brief/contrato claro del asistente de citas y dudas frecuentes de Sanitas</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Sanitas · Mi Sanitas / Sanitas Dental</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Rol</strong> <span className="ml-1">Asistente para citas y dudas recurrentes</span>
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <strong className="font-semibold">Clave</strong> <span className="ml-1">No diagnóstico · No urgencias · Mínimo dato útil</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Sanitas quiere reducir la saturación en la gestión de citas y dudas repetitivas: picos de llamadas los lunes y muchas consultas sobre cómo pedir o cambiar cita, qué documentación llevar y dónde ver resultados.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El asistente orienta y deriva; no hace diagnóstico médico.</li>
            <li>No debe pedir datos sensibles innecesarios.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            En el aula: usar siempre datos ficticios y aplicar el principio de "mínimo dato útil".
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Perfiles y Tareas */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Perfiles de usuario y tareas iniciales</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define quién usará el asistente y para qué. Piensa en 3 perfiles principales y al menos 6–8 tareas concretas.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Perfiles de usuario</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">mínimo 3</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ejemplos: "Paciente joven con seguro privado", "Madre/padre que pide cita para hijos", "Paciente mayor con poca experiencia digital"...
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <Input 
                      id="perfil1" 
                      placeholder="Perfil 1 · breve descripción" 
                      className="bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                      value={formData.perfil1}
                      onChange={(e) => handleInputChange('perfil1', e.target.value)}
                    />
                    <Input 
                      id="perfil2" 
                      placeholder="Perfil 2 · breve descripción" 
                      className="bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                      value={formData.perfil2}
                      onChange={(e) => handleInputChange('perfil2', e.target.value)}
                    />
                    <Input 
                      id="perfil3" 
                      placeholder="Perfil 3 · breve descripción" 
                      className="bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                      value={formData.perfil3}
                      onChange={(e) => handleInputChange('perfil3', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Tareas iniciales del asistente</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">6–8 tareas</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Escribe una tarea por línea: "Explicar cómo pedir cita online", "Guiar cambio de cita", "Indicar documentación para pruebas diagnósticas", etc.
                  </p>
                  <Textarea 
                    id="tareas" 
                    placeholder="- Tarea 1
- Tarea 2
- Tarea 3
..." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-purple-400 focus:ring-purple-200"
                    value={formData.tareas}
                    onChange={(e) => handleInputChange('tareas', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alcance */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Alcance y "lo que NO hace"</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Deja muy claro qué entra en el alcance del asistente y qué casos deben ir sí o sí a un humano (urgencias, síntomas, reclamaciones médicas, etc.).
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">Lo que SÍ hace el asistente</label>
                  <p className="text-xs text-slate-500 mb-2">
                    Enfoque en orientación sobre citas, trámites, documentación y canales (Mi Sanitas, teléfono, clínica, etc.).
                  </p>
                  <Textarea 
                    id="alcance" 
                    placeholder="- Orientar sobre cómo pedir y cambiar cita
- Explicar documentación necesaria según tipo de visita
- Indicar dónde ver resultados y justificantes
..." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.alcance}
                    onChange={(e) => handleInputChange('alcance', e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Lo que NO hace (fuera de alcance)</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">ejemplos concretos</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ejemplos: no evalúa síntomas, no atiende urgencias, no confirma reembolsos, no modifica pólizas, etc.
                  </p>
                  <Textarea 
                    id="noHace" 
                    placeholder="- No evalúa síntomas ni da diagnóstico médico
- No atiende urgencias (deriva a 112 / urgencias presenciales)
- No garantiza reembolsos ni autorizaciones económicas
..." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-200"
                    value={formData.noHace}
                    onChange={(e) => handleInputChange('noHace', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos, Transparencia y Escalado */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Datos, transparencia y escalado</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Aplica el principio de "mínimo dato útil": solo pedir lo imprescindible. Separa bien datos permitidos/prohibidos y define reglas claras de escalado a humano.
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Datos permitidos (mínimos)</label>
                    <p className="text-xs text-slate-500 mb-2">
                      Ej.: nombre de pila, número de póliza parcialmente enmascarado, tipo de cita, etc.
                    </p>
                    <Textarea 
                      id="datosPermitidos" 
                      placeholder="- Nombre de pila o alias
- Tipo de póliza (sin detalles financieros)
- Tipo de cita (médico de familia, especialista, prueba diagnóstica)
..." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                      value={formData.datosPermitidos}
                      onChange={(e) => handleInputChange('datosPermitidos', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-1">Datos prohibidos</label>
                    <p className="text-xs text-slate-500 mb-2">
                      No debe pedir: diagnósticos clínicos detallados, información bancaria completa, contraseñas, DNI real, etc.
                    </p>
                    <Textarea 
                      id="datosProhibidos" 
                      placeholder="- Contraseñas o claves de acceso
- Datos bancarios completos
- Síntomas detallados para diagnóstico
- DNI real o número de historia clínica completo
..." 
                      className="min-h-[100px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                      value={formData.datosProhibidos}
                      onChange={(e) => handleInputChange('datosProhibidos', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Mensajes de transparencia</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">2–4 frases</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Mensajes donde el asistente explica qué puede hacer, límites, uso de datos y cuándo derivará a personal humano.
                  </p>
                  <Textarea 
                    id="transparencia" 
                    placeholder="- Soy un asistente virtual de Sanitas y puedo ayudarte con gestiones sencillas de citas y dudas frecuentes.
- No sustituyo a un profesional médico. Para síntomas o urgencias, te derivaré a los canales adecuados.
..." 
                    className="min-h-[80px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.transparencia}
                    onChange={(e) => handleInputChange('transparencia', e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Reglas de escalado a humano</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">mínimo 5</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Condiciones claras: lenguaje de urgencia, reclamación grave, 2 intentos fallidos, datos insuficientes, petición fuera de política, etc.
                  </p>
                  <Textarea 
                    id="escalado" 
                    placeholder="- Si el usuario menciona dolor intenso, dificultad para respirar o urgencia → derivar a urgencias / teléfono médico.
- Si tras 2 aclaraciones no se consigue la información mínima → ofrecer agente humano.
- Si la consulta implica reembolsos, reclamaciones formales o cambios de póliza → escalar a atención al cliente.
..." 
                    className="min-h-[100px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200"
                    value={formData.escalado}
                    onChange={(e) => handleInputChange('escalado', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">KPIs (indicadores de éxito)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define 3–5 KPIs medibles que permitan saber si el asistente está funcionando (no vale solo "más chats").
              </p>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-semibold text-slate-700">KPIs propuestos</label>
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">3–5</Badge>
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  Ej.: % de consultas resueltas sin llamar al call center, CSAT del asistente, tiempo medio para guiar una cita, % de casos escalados correctamente, etc.
                </p>
                <Textarea 
                  id="kpis" 
                  placeholder="- % de consultas sobre citas resueltas sin llamada al call center
- Tiempo medio en guiar al usuario hasta la acción (pedir o cambiar cita)
- CSAT específico del asistente (> X/5)
..." 
                  className="min-h-[80px] bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-200"
                  value={formData.kpis}
                  onChange={(e) => handleInputChange('kpis', e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generateSummary} 
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold shadow-lg"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generar resumen del brief
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
        <div className="space-y-6">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md sticky top-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Resumen / contrato del asistente</h3>
                <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Salida lista para copiar</Badge>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El resumen aparecerá aquí después de generar...'}</pre>
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
                  Pega el texto en tu documento de entrega
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
                  ¿Has incluido al menos 3 perfiles, 6–8 tareas, datos permitidos/prohibidos, reglas de escalado y 3–5 KPIs?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
