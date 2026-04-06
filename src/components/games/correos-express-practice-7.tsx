'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Package,
  MessageSquare,
  Shield,
  ArrowRight,
  User,
  Bot,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface FormData {
  empresa: string;
  intent: string;
  objetivo: string;
  slot1: string;
  slot2: string;
  slot3: string;
  ordenPreguntas: string;
  validacion: string;
  confirmacion: string;
  fallbacks: string;
  bienvenida: string;
  pedirDato: string;
  errorDato: string;
  cierre: string;
}

interface Preset {
  nombre: string;
  estado: string;
  data: FormData;
}

const presets: Record<string, Preset> = {
  seguimiento: {
    nombre: 'Seguimiento estándar',
    estado: 'Estándar',
    data: {
      empresa: 'Correos Express',
      intent: 'Consultar_estado_envio',
      objetivo: 'Permitir al usuario consultar el estado de su envío en el menor número de turnos posible, solicitando solo los datos imprescindibles y confirmando antes de ejecutar la consulta.',
      slot1: 'localizador_envio',
      slot2: 'codigo_postal',
      slot3: 'email_destinatario',
      ordenPreguntas: '1) Si el usuario no aporta localizador, pedirlo primero. 2) Si el sistema detecta varios posibles envíos o necesita verificación, pedir código postal. 3) Solo si persiste la ambigüedad, pedir email asociado.',
      validacion: 'Comprobar que el localizador no está vacío, tiene formato plausible (6-15 caracteres alfanuméricos) y no incluye caracteres extraños. Si falla, explicar el error y ofrecer un ejemplo de cómo encontrarlo.',
      confirmacion: 'Voy a consultar el envío con localizador {localizador_envio} y código postal {codigo_postal}. ¿Es correcto? Responde sí o no.',
      fallbacks: 'Primer fallo: reformular la pregunta. Segundo fallo: ofrecer opciones guiadas (seguimiento, cambio de entrega, incidencia). Si sigue sin entender o hay alta frustración, escalar a un agente con resumen.',
      bienvenida: 'Puedo ayudarte a consultar el estado de tu envío. Si lo tienes a mano, indícame tu localizador.',
      pedirDato: 'Para localizar tu envío necesito el número de seguimiento. Puedes copiarlo tal y como aparece en el SMS o email.',
      errorDato: 'Ese localizador no parece válido. Revísalo y envíamelo de nuevo, por favor.',
      cierre: 'Ya tengo la información necesaria. En cuanto confirmes, consulto el estado de tu envío.',
    }
  },
  faltadato: {
    nombre: 'Falta localizador',
    estado: 'Recuperación',
    data: {
      empresa: 'Correos Express',
      intent: 'Consultar_estado_envio',
      objetivo: 'Recuperar el dato crítico que falta sin frustrar al usuario y sin pedir información irrelevante.',
      slot1: 'localizador_envio',
      slot2: 'codigo_postal',
      slot3: 'telefono_destinatario',
      ordenPreguntas: '1) Pedir localizador. 2) Si no lo tiene, preguntar si dispone del email/SMS. 3) Ofrecer alternativa limitada con código postal y teléfono solo si la política lo permite.',
      validacion: 'Detectar entradas vacías, fragmentos incompletos o números demasiado cortos (menos de 6 caracteres). En esos casos, pedir reenvío con ejemplo visual de dónde encontrarlo.',
      confirmacion: 'Quiero asegurarme de que voy a buscar el envío correcto. ¿Confirmas estos datos antes de continuar?',
      fallbacks: 'Si no tiene localizador, no bloquear de golpe: ofrecer guía para encontrarlo en el email de confirmación o SMS. Tras varios intentos fallidos, derivar con transparencia.',
      bienvenida: 'Te ayudo a encontrar tu envío. Si no ves el localizador, también puedo decirte dónde suele aparecer.',
      pedirDato: '¿Puedes enviarme el localizador? Suele venir en el SMS, email de envío o comprobante de compra.',
      errorDato: 'Con ese dato no puedo identificar bien el envío. Comprueba que no falte ninguna letra o número.',
      cierre: 'Cuando me envíes el dato correcto, continúo con la consulta.',
    }
  },
  enfado: {
    nombre: 'Usuario enfadado',
    estado: 'Sensibilidad alta',
    data: {
      empresa: 'Correos Express',
      intent: 'Consultar_estado_envio',
      objetivo: 'Mantener la calma conversacional, recopilar el mínimo dato útil y escalar si el enfado o la incidencia lo requieren.',
      slot1: 'localizador_envio',
      slot2: 'codigo_postal',
      slot3: 'motivo_malestar',
      ordenPreguntas: '1) Reconocer la frustración. 2) Pedir solo el localizador. 3) Si hace falta, pedir un dato adicional. 4) Si el tono sigue escalando, pasar a humano.',
      validacion: 'No discutir ni corregir de forma fría. Validar el dato recibido y, si no sirve, pedirlo de nuevo de manera empática.',
      confirmacion: 'Voy a revisar el envío {localizador_envio}. Antes de continuar, ¿confirmas que este es el dato correcto?',
      fallbacks: 'Ante insultos, amenazas o reclamación formal, activar derivación prioritaria con resumen. Evitar bucles de "no te entiendo".',
      bienvenida: 'Siento la molestia. Voy a intentar ayudarte con tu envío lo antes posible.',
      pedirDato: 'Para revisarlo ahora mismo necesito el localizador del envío. Envíamelo y continúo.',
      errorDato: 'No consigo validar ese localizador. Si quieres, vuelve a copiarlo y lo revisamos juntos.',
      cierre: 'Gracias. Ya tengo lo necesario para revisar el caso o dejarlo preparado para un agente.',
    }
  }
};

const requiredFields: (keyof FormData)[] = [
  'empresa', 'intent', 'objetivo',
  'slot1', 'slot2',
  'ordenPreguntas', 'validacion', 'confirmacion', 'fallbacks',
  'bienvenida', 'pedirDato', 'errorDato', 'cierre'
];

export default function CorreosExpressPractice7() {
  const [formData, setFormData] = useState<FormData>({
    empresa: '',
    intent: '',
    objetivo: '',
    slot1: '',
    slot2: '',
    slot3: '',
    ordenPreguntas: '',
    validacion: '',
    confirmacion: '',
    fallbacks: '',
    bienvenida: '',
    pedirDato: '',
    errorDato: '',
    cierre: '',
  });

  const [chkReintento, setChkReintento] = useState(true);
  const [chkEscalado, setChkEscalado] = useState(true);
  const [chkTransparencia, setChkTransparencia] = useState(true);
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [activePreset, setActivePreset] = useState('seguimiento');

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const loadPreset = (name: string) => {
    const preset = presets[name];
    if (!preset) return;
    setFormData({ ...preset.data });
    setActivePreset(name);
    setSummary('');
    setStatus({ type: '', message: `Preset "${preset.nombre}" cargado. Puedes editarlo antes de generar.` });
  };

  const completionPercentage = useMemo(() => {
    const filled = requiredFields.filter(f => formData[f].trim().length > 0).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [formData]);

  const slotsCount = useMemo(() => {
    return [formData.slot1, formData.slot2, formData.slot3].filter(s => s.trim()).length;
  }, [formData]);

  const checksCount = useMemo(() => {
    return [chkReintento, chkEscalado, chkTransparencia].filter(Boolean).length;
  }, [chkReintento, chkEscalado, chkTransparencia]);

  const generate = () => {
    const missing: string[] = [];
    if (!formData.empresa) missing.push('empresa');
    if (!formData.intent) missing.push('intent principal');
    if (!formData.objetivo) missing.push('objetivo del flujo');
    if (slotsCount < 2) missing.push('al menos 2 slots');
    if (!formData.validacion) missing.push('reglas de validación');
    if (!formData.confirmacion) missing.push('mensaje de confirmación');
    if (!formData.fallbacks) missing.push('fallbacks / recovery');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Flujo completo según los mínimos recomendados.' });
    }

    const sb: string[] = [];

    sb.push('PRÁCTICA 7 · FLUJO "¿DÓNDE ESTÁ MI ENVÍO?"');
    sb.push('Empresa: ' + (formData.empresa || '(pendiente)'));
    sb.push('');
    sb.push('1. Contexto del caso');
    sb.push('Empresa / marca: ' + (formData.empresa || '(pendiente)'));
    sb.push('Intent principal: ' + (formData.intent || '(pendiente)'));
    sb.push('Objetivo: ' + (formData.objetivo || '(pendiente)'));
    sb.push('');
    sb.push('2. Slots mínimos y orden de captura');
    if (slotsCount > 0) {
      if (formData.slot1) sb.push('- Slot 1: ' + formData.slot1);
      if (formData.slot2) sb.push('- Slot 2: ' + formData.slot2);
      if (formData.slot3) sb.push('- Slot 3 (opcional): ' + formData.slot3);
    } else {
      sb.push('- Definir los slots mínimos necesarios para ejecutar la acción');
    }
    sb.push('Orden de preguntas: ' + (formData.ordenPreguntas || '(pendiente)'));
    sb.push('');
    sb.push('3. Diseño del flujo conversacional');
    sb.push('- Paso 1: detectar que la intención del usuario es consultar el estado del envío.');
    sb.push('- Paso 2: comprobar si el usuario ya ha facilitado alguno de los slots críticos en el primer mensaje.');
    sb.push('- Paso 3: si faltan datos, pedirlos de uno en uno siguiendo este criterio: ' + (formData.ordenPreguntas || '(pendiente)'));
    sb.push('- Paso 4: validar el dato recibido según estas reglas: ' + (formData.validacion || '(pendiente)'));
    sb.push('- Paso 5: resumir lo entendido y pedir confirmación final: ' + (formData.confirmacion || '(pendiente)'));
    sb.push('- Paso 6: si el usuario confirma, ejecutar la consulta; si responde que no, corregir el dato equivocado sin reiniciar todo el flujo.');
    sb.push('');
    sb.push('4. Validación y control de errores');
    sb.push('Reglas de validación: ' + (formData.validacion || '(pendiente)'));
    sb.push('Mensaje de error / repregunta: ' + (formData.errorDato || '(pendiente)'));
    if (chkReintento) sb.push('- Se define un máximo de reintentos antes de ofrecer una vía alternativa o cerrar con escalado.');
    if (chkTransparencia) sb.push('- El bot debe indicar con transparencia qué puede hacer y qué dato necesita para continuar.');
    sb.push('');
    sb.push('5. Confirmación');
    sb.push('Mensaje de confirmación recomendado: ' + (formData.confirmacion || '(pendiente)'));
    sb.push('- La confirmación debe aparecer cuando ya exista suficiente información para evitar consultas equivocadas o ambiguas.');
    sb.push('');
    sb.push('6. Fallbacks y recovery');
    sb.push('Estrategia principal: ' + (formData.fallbacks || '(pendiente)'));
    if (chkEscalado) sb.push('- Debe incluirse una regla clara de derivación a humano para casos de alta frustración, amenaza, reclamación formal o imposibilidad de identificar el envío.');
    sb.push('');
    sb.push('7. Microcopys clave del flujo');
    sb.push('- Bienvenida: ' + (formData.bienvenida || '(pendiente)'));
    sb.push('- Petición de dato faltante: ' + (formData.pedirDato || '(pendiente)'));
    sb.push('- Error de validación: ' + (formData.errorDato || '(pendiente)'));
    sb.push('- Cierre / siguiente paso: ' + (formData.cierre || '(pendiente)'));
    sb.push('');
    sb.push('8. Criterios de calidad del diseño');
    sb.push('- El flujo debe pedir solo la información imprescindible.');
    sb.push('- El bot no debe inventar estados del envío ni saltarse la validación.');
    sb.push('- Tras un error menor, debe reparar la conversación sin reiniciarla por completo.');
    sb.push('- Si el usuario muestra enfado o la conversación se degrada, debe activarse una estrategia de recovery o escalado.');
    sb.push('');
    sb.push('9. Mini ejemplo de diálogo');
    sb.push('Usuario: ¿Dónde está mi envío?');
    sb.push('Bot: ' + (formData.bienvenida || 'Puedo ayudarte a consultar el estado de tu envío.'));
    sb.push('Usuario: [aporta o no el localizador]');
    sb.push('Bot: ' + (formData.pedirDato || 'Necesito el localizador para continuar.'));
    sb.push('Usuario: [envía dato]');
    sb.push('Bot: ' + (formData.confirmacion || 'Voy a revisar el envío con los datos indicados. ¿Es correcto?'));
    sb.push('Usuario: Sí / No');
    sb.push('Bot: ' + (formData.cierre || 'Continúo con la consulta o corrijo el dato según tu respuesta.'));

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFormData({
      empresa: '', intent: '', objetivo: '',
      slot1: '', slot2: '', slot3: '',
      ordenPreguntas: '', validacion: '', confirmacion: '', fallbacks: '',
      bienvenida: '', pedirDato: '', errorDato: '', cierre: '',
    });
    setChkReintento(false);
    setChkEscalado(false);
    setChkTransparencia(false);
    setSummary('');
    setStatus({ type: '', message: '' });
    setActivePreset('');
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'Primero genera el entregable antes de copiarlo.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Entregable copiado al portapapeles.' });
    } catch {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Copia el texto manualmente.' });
    }
  };

  // Mini diálogo de ejemplo interactivo
  const exampleDialog = useMemo(() => {
    const empresa = formData.empresa || 'Correos Express';
    const bienvenida = formData.bienvenida || 'Puedo ayudarte a consultar el estado de tu envío. Si lo tienes a mano, indícame tu localizador.';
    const pedirDato = formData.pedirDato || 'Para localizar tu envío necesito el número de seguimiento.';
    const errorDato = formData.errorDato || 'Ese localizador no parece válido. Revísalo y envíamelo de nuevo.';
    const confirmacion = formData.confirmacion || 'Voy a consultar el envío con los datos indicados. ¿Es correcto?';
    const cierre = formData.cierre || 'Ya tengo la información necesaria. En cuanto confirmes, consulto el estado de tu envío.';

    return [
      { role: 'user' as const, text: '¿Dónde está mi envío?' },
      { role: 'bot' as const, text: bienvenida },
      { role: 'user' as const, text: 'No tengo el localizador a mano...' },
      { role: 'bot' as const, text: pedirDato },
      { role: 'user' as const, text: 'Ah sí, es CE-2024-78543-ES' },
      { role: 'bot' as const, text: formData.slot2
        ? `He recibido el localizador CE-2024-78543-ES. Para confirmar, ¿cuál es tu código postal?`
        : confirmacion
      },
      ...(formData.slot2 ? [
        { role: 'user' as const, text: '45001' },
        { role: 'bot' as const, text: confirmacion },
      ] : []),
      { role: 'user' as const, text: 'Sí, correcto' },
      { role: 'bot' as const, text: cierre },
    ];
  }, [formData]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">7</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 7 · Flujo "¿Dónde está mi envío?"</h1>
            <p className="text-sm text-slate-600">Diseña un flujo conversacional con slot filling, validación, confirmación y escalado a humano</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Correos Express · seguimiento de envíos</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Objetivo</strong> <span className="ml-1">pedir solo datos imprescindibles + confirmar antes de ejecutar</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Técnica</strong> <span className="ml-1">intent + slots + validación + confirmación + fallbacks</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-teal-600" />
            <h3 className="font-semibold text-teal-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-teal-100 text-teal-700 border-teal-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Correos Express recibe consultas repetitivas sobre el estado de envíos: "¿dónde está mi paquete?", "pone en reparto pero no llega", "no tengo el localizador". El reto es diseñar un flujo que pida solo los datos imprescindibles, valide correctamente, confirme antes de consultar y sepa cuándo escalar a un agente humano.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El bot debe detectar la intención <strong>Consultar_estado_envio</strong> sin mezclarla con incidencias o cambios de entrega.</li>
            <li>Si falta el localizador, pedirlo de forma clara y empática, sin saturar al usuario.</li>
            <li>Confirmar siempre antes de ejecutar la consulta para evitar errores.</li>
            <li>Si la conversación se degrada, escalar a humano con resumen del caso.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            No inventes políticas de Correos Express: céntrate en el diseño conversacional y en cómo se formula el diálogo.
          </p>
        </CardContent>
      </Card>

      {/* Barra de completitud */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">Progreso del formulario</span>
                <span className="text-sm font-bold text-slate-800">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-teal-400" />
                {slotsCount} slots
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                {checksCount}/3 checks
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Presets */}
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Modo de ejemplo rápido (presets)</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(presets).map(([key, preset]) => (
              <Button
                key={key}
                variant={activePreset === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => loadPreset(key)}
                className={activePreset === key
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                }
              >
                {preset.nombre}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mapa del flujo */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ArrowRight className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Mapa del flujo conversacional</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: '1', title: 'Detectar intención', desc: 'El usuario pregunta "¿dónde está mi envío?" con o sin localizador', color: 'from-blue-400 to-blue-600' },
              { num: '2', title: 'Rellenar slots', desc: 'Si falta un dato esencial, pedirlo de uno en uno', color: 'from-indigo-400 to-indigo-600' },
              { num: '3', title: 'Validar', desc: 'Comprobar formato del localizador y coherencia del dato', color: 'from-purple-400 to-purple-600' },
              { num: '4', title: 'Confirmar', desc: '"Voy a consultar el envío X con CP Y, ¿correcto?"', color: 'from-pink-400 to-pink-600' },
              { num: '5', title: 'Resolver o escalar', desc: 'Si no hay respuesta fiable o hay enfado, derivar a humano', color: 'from-red-400 to-red-600' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 text-center space-y-1">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-sm`}>
                      <span className="text-sm font-bold text-white">{step.num}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-800">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Formulario */}
        <div className="space-y-6">
          {/* Contexto base */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Contexto base</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">caso principal</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Empresa / marca</label>
                  <Input
                    placeholder="Ej.: Correos Express"
                    className="text-xs bg-white"
                    value={formData.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Intent principal</label>
                  <Input
                    placeholder="Ej.: Consultar_estado_envio"
                    className="text-xs bg-white"
                    value={formData.intent}
                    onChange={(e) => updateField('intent', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Objetivo del flujo</label>
                <Textarea
                  placeholder="Ej.: Permitir al usuario consultar el estado de su envío con el mínimo número de turnos posible..."
                  className="text-xs bg-white min-h-[70px]"
                  value={formData.objetivo}
                  onChange={(e) => updateField('objetivo', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Slots mínimos */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Slots mínimos</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">datos imprescindibles</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Slot 1</label>
                  <Input
                    placeholder="Ej.: localizador_envio"
                    className="text-xs bg-white"
                    value={formData.slot1}
                    onChange={(e) => updateField('slot1', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Slot 2</label>
                  <Input
                    placeholder="Ej.: codigo_postal"
                    className="text-xs bg-white"
                    value={formData.slot2}
                    onChange={(e) => updateField('slot2', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Slot 3 (opcional)</label>
                  <Input
                    placeholder="Ej.: email_destinatario"
                    className="text-xs bg-white"
                    value={formData.slot3}
                    onChange={(e) => updateField('slot3', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Orden de preguntas para pedir slots</label>
                <Textarea
                  placeholder="Ej.: 1) Si no hay localizador, pedirlo primero. 2) Si el localizador existe pero hay ambigüedad, pedir código postal..."
                  className="text-xs bg-white min-h-[70px]"
                  value={formData.ordenPreguntas}
                  onChange={(e) => updateField('ordenPreguntas', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Validación y confirmación */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Validación y confirmación</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">antes de ejecutar</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Reglas de validación</label>
                  <Textarea
                    placeholder="Ej.: verificar que el localizador tiene longitud mínima, no contiene caracteres imposibles..."
                    className="text-xs bg-white min-h-[90px]"
                    value={formData.validacion}
                    onChange={(e) => updateField('validacion', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Mensaje de confirmación</label>
                  <Textarea
                    placeholder="Ej.: Voy a consultar el envío con localizador {localizador_envio} y código postal {codigo_postal}. ¿Es correcto?"
                    className="text-xs bg-white min-h-[90px]"
                    value={formData.confirmacion}
                    onChange={(e) => updateField('confirmacion', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fallbacks y recovery */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Fallbacks y recovery</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">conversaciones rotas</Badge>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Qué hace el bot si no entiende, faltan datos o el usuario se enfada</label>
                <Textarea
                  placeholder="Ej.: primer fallo → reformular; segundo fallo → ofrecer opciones guiadas; enfado alto → derivar a humano con resumen."
                  className="text-xs bg-white min-h-[70px]"
                  value={formData.fallbacks}
                  onChange={(e) => updateField('fallbacks', e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={chkReintento}
                    onChange={(e) => setChkReintento(e.target.checked)}
                    className="accent-teal-500"
                  />
                  Máximo de reintentos
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={chkEscalado}
                    onChange={(e) => setChkEscalado(e.target.checked)}
                    className="accent-teal-500"
                  />
                  Escalado a humano
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={chkTransparencia}
                    onChange={(e) => setChkTransparencia(e.target.checked)}
                    className="accent-teal-500"
                  />
                  Frase de transparencia
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Microcopys clave */}
          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Microcopys clave</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">mensajes listos</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Bienvenida / apertura</label>
                  <Textarea
                    placeholder="Ej.: Puedo ayudarte a consultar el estado de tu envío..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.bienvenida}
                    onChange={(e) => updateField('bienvenida', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Mensaje para pedir dato faltante</label>
                  <Textarea
                    placeholder="Ej.: Para localizar tu envío necesito el número de seguimiento..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.pedirDato}
                    onChange={(e) => updateField('pedirDato', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Mensaje de error de validación</label>
                  <Textarea
                    placeholder="Ej.: Ese localizador no parece válido. Revísalo..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.errorDato}
                    onChange={(e) => updateField('errorDato', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Cierre / siguiente paso</label>
                  <Textarea
                    placeholder="Ej.: Ya tengo la información necesaria. En cuanto confirmes..."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.cierre}
                    onChange={(e) => updateField('cierre', e.target.value)}
                  />
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={generate}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Generar práctica 7
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

        {/* Right Column - Preview y Resumen */}
        <div className="space-y-6">
          {/* Mini diálogo de ejemplo */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Vista previa del diálogo</h3>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">ejemplo interactivo</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Así se vería un diálogo de ejemplo con los mensajes que has definido. Se actualiza automáticamente.
              </p>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {exampleDialog.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                          : 'bg-gradient-to-br from-teal-400 to-cyan-500'
                      }`}>
                        {msg.role === 'user'
                          ? <User className="h-3.5 w-3.5 text-white" />
                          : <Bot className="h-3.5 w-3.5 text-white" />
                        }
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumen generado */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Entregable final</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">texto para pegar</Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Slots definidos</span>
                  <strong className="text-lg text-teal-600 font-headline">{slotsCount}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Checks activos</span>
                  <strong className="text-lg text-purple-600 font-headline">{checksCount}/3</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Completitud</span>
                  <strong className="text-lg text-blue-600 font-headline">{completionPercentage}%</strong>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El entregable aparecerá aquí después de generar...'}</pre>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={copySummary}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar entregable
                </Button>
                <span className="text-xs text-slate-500">
                  Pega el contenido en tu documento de entrega.
                </span>
              </div>

              {/* Status */}
              {status.message && (
                <div className={`flex items-center gap-2 text-sm p-2.5 rounded-lg ${
                  status.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-slate-50 text-slate-600 border border-slate-200'
                }`}>
                  {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> :
                   status.type === 'error' ? <AlertCircle className="h-4 w-4 flex-shrink-0" /> :
                   <Shield className="h-4 w-4 flex-shrink-0" />}
                  {status.message}
                </div>
              )}

              {/* Checklist */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-500" />
                  <h4 className="text-sm font-semibold text-slate-700">Qué evalúa esta práctica</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 ml-4 list-disc">
                  <li>Si el flujo pide solo la información imprescindible y en el orden correcto.</li>
                  <li>Si confirma antes de ejecutar y evita consultas ambiguas.</li>
                  <li>Si maneja bien errores, reintentos y fallbacks sin romper la conversación.</li>
                  <li>Si escala a humano cuando la conversación se degrada o el usuario está enfadado.</li>
                </ul>
              </div>

              {/* Consejo */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  <strong>Consejo:</strong> No pedir demasiados datos de golpe, no confirmar a medias, no inventar estados de envío y no reiniciar la conversación tras un error pequeño.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
