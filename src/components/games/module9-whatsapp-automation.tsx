'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  KeyRound,
  LifeBuoy,
  Lock,
  Mail,
  MessageCircle,
  Network,
  PlugZap,
  ShieldCheck,
  Workflow,
  Zap,
} from 'lucide-react';

const thirdPartyTools = [
  {
    name: 'Make',
    url: 'https://www.make.com',
    role: 'Automatizaciones visuales',
    bestFor: 'Conectar email, hojas de cálculo, CRM y WhatsApp sin programar.',
    tags: ['No-code', 'Escenarios', 'Rápido'],
  },
  {
    name: 'n8n',
    url: 'https://n8n.io',
    role: 'Workflows con control técnico',
    bestFor: 'Flujos con webhooks, lógica condicional, bases de datos y APIs propias.',
    tags: ['Open source', 'Webhooks', 'APIs'],
  },
  {
    name: 'Zapier',
    url: 'https://zapier.com',
    role: 'Integración SaaS',
    bestFor: 'Activar mensajes desde formularios, calendarios, CRM o tickets.',
    tags: ['SaaS', 'Triggers', 'Fácil'],
  },
  {
    name: 'Manychat',
    url: 'https://manychat.com',
    role: 'Chatbot conversacional',
    bestFor: 'Flujos de atención, captación, respuestas rápidas y derivación humana.',
    tags: ['Chatbot', 'Marketing', 'Bandeja'],
  },
  {
    name: 'Landbot',
    url: 'https://landbot.io',
    role: 'Conversaciones guiadas',
    bestFor: 'Diseñar árboles de decisión y formularios conversacionales para clientes.',
    tags: ['Visual', 'Formularios', 'CX'],
  },
  {
    name: 'Twilio',
    url: 'https://www.twilio.com/whatsapp',
    role: 'API de mensajería',
    bestFor: 'Equipos técnicos que quieren una capa API madura para WhatsApp y otros canales.',
    tags: ['API', 'Escala', 'Omnicanal'],
  },
  {
    name: 'respond.io',
    url: 'https://respond.io',
    role: 'Atención multicanal',
    bestFor: 'Centralizar WhatsApp, asignar agentes, medir conversaciones y automatizar reglas.',
    tags: ['Inbox', 'Soporte', 'CRM'],
  },
  {
    name: 'Botpress',
    url: 'https://botpress.com',
    role: 'Bots con IA',
    bestFor: 'Crear asistentes con conocimiento, flujos y conexión a canales de mensajería.',
    tags: ['IA', 'Knowledge base', 'Bot'],
  },
];

const metaSteps = [
  {
    title: '1. Preparar Meta',
    icon: KeyRound,
    items: [
      'Crear o usar una cuenta en Meta for Developers.',
      'Crear una app de tipo Business y añadir el producto WhatsApp.',
      'Vincular o crear el portfolio empresarial y la cuenta de WhatsApp Business.',
    ],
  },
  {
    title: '2. Obtener credenciales',
    icon: Lock,
    items: [
      'Guardar el Phone Number ID y el WhatsApp Business Account ID.',
      'Generar un token de acceso con permisos de mensajería y gestión de WhatsApp.',
      'Mantener los tokens fuera del frontend y rotarlos con un responsable definido.',
    ],
  },
  {
    title: '3. Configurar webhooks',
    icon: Network,
    items: [
      'Publicar un endpoint HTTPS para recibir eventos de Meta.',
      'Verificar el webhook con el challenge que envía Meta.',
      'Suscribirse al campo messages para mensajes entrantes y estados de entrega.',
    ],
  },
  {
    title: '4. Crear plantillas',
    icon: FileText,
    items: [
      'Diseñar plantillas de utilidad para citas, facturas, avisos y seguimiento.',
      'Enviar las plantillas a revisión antes de usarlas en conversaciones iniciadas por la empresa.',
      'Usar variables como nombre, fecha, importe o número de reserva.',
    ],
  },
  {
    title: '5. Automatizar con terceros',
    icon: Workflow,
    items: [
      'Conectar email, CRM, ERP, calendario o base de datos con Make, n8n o Zapier.',
      'Validar datos antes de mandar el mensaje: teléfono, consentimiento y contexto.',
      'Registrar cada envío y crear una ruta de escalado a un humano.',
    ],
  },
  {
    title: '6. Medir y gobernar',
    icon: ShieldCheck,
    items: [
      'Revisar tasas de entrega, bloqueo, respuesta, opt-out y satisfacción.',
      'Auditar prompts, bases de conocimiento y respuestas automáticas.',
      'Documentar límites: qué puede responder el bot y cuándo debe parar.',
    ],
  },
];

const scenarios = [
  {
    id: 'invoice',
    title: 'Factura recibida por email',
    icon: Mail,
    color: 'emerald',
    flow: ['Email entra', 'Extraer PDF', 'Leer datos', 'Consultar BBDD/ERP', 'Validar cliente', 'Enviar WhatsApp'],
    message:
      'Hola {{1}}, hemos recibido tu factura {{2}} por {{3}}. Queda registrada y te avisaremos cuando cambie de estado.',
    controls: ['OCR revisable', 'No enviar importes sensibles sin base legal', 'Trazabilidad en CRM'],
  },
  {
    id: 'booking',
    title: 'Reserva de cita confirmada',
    icon: CalendarCheck,
    color: 'sky',
    flow: ['Cliente reserva', 'Calendario confirma', 'Crear registro', 'Elegir plantilla', 'Enviar recordatorio', 'Medir asistencia'],
    message:
      'Hola {{1}}, tu cita queda confirmada para el {{2}} a las {{3}}. Si necesitas cambiarla, responde a este mensaje.',
    controls: ['Plantilla Utility', 'Zona horaria correcta', 'Opción de cancelar o modificar'],
  },
  {
    id: 'support',
    title: 'Chatbot de atención al cliente',
    icon: Bot,
    color: 'violet',
    flow: ['Mensaje entrante', 'Clasificar intención', 'Buscar en base de conocimiento', 'Responder', 'Pedir dato si falta', 'Derivar si hay riesgo'],
    message:
      'Entiendo tu consulta sobre {{1}}. Según tu contrato, el siguiente paso es {{2}}. ¿Quieres que lo gestione un agente?',
    controls: ['Ventana de 24 horas', 'No inventar datos', 'Handoff humano obligatorio'],
  },
];

const risks = [
  {
    title: 'Consentimiento y finalidad',
    text: 'No uses WhatsApp para comunicaciones no solicitadas. Registra de dónde sale el consentimiento y para qué canal se concedió.',
  },
  {
    title: 'Plantillas y ventana de servicio',
    text: 'Fuera de la ventana de atención iniciada por el cliente, usa plantillas aprobadas y evita mezclar avisos útiles con publicidad.',
  },
  {
    title: 'Datos personales',
    text: 'Minimiza datos en mensajes. Evita adjuntar facturas, diagnósticos, documentos sensibles o información financiera sin controles.',
  },
  {
    title: 'Seguridad operativa',
    text: 'Tokens, webhooks y firmas deben estar protegidos. El bot no debe exponer secretos, IDs internos ni respuestas de sistemas privados.',
  },
  {
    title: 'Calidad del bot',
    text: 'Un chatbot debe reconocer incertidumbre, pedir aclaraciones, citar la fuente interna usada y derivar cuando la conversación se complique.',
  },
  {
    title: 'Dependencia del proveedor',
    text: 'Documenta flujos y exporta configuraciones. Si un proveedor cambia precios o límites, el proceso crítico no debe quedar bloqueado.',
  },
];

const docsLinks = [
  { title: 'Meta WhatsApp Cloud API', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api' },
  { title: 'Enviar mensajes', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages' },
  { title: 'Webhooks', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks' },
  { title: 'Plantillas de mensaje', url: 'https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates' },
  { title: 'Gemini API', url: 'https://ai.google.dev/gemini-api/docs/quickstart' },
  { title: 'Deploy Git con Vercel', url: 'https://vercel.com/docs/deployments/git' },
];

const appBlueprint = [
  {
    area: 'Panel empresa',
    icon: ShieldCheck,
    detail: 'Login, roles, cuentas de empresa, usuarios, permisos, límites de uso y auditoría de conversaciones.',
  },
  {
    area: 'Canal WhatsApp',
    icon: MessageCircle,
    detail: 'Alta del número, webhook de entrada, envío de plantillas, ventana de 24 horas y estados de entrega.',
  },
  {
    area: 'Motor IA',
    icon: Bot,
    detail: 'Gemini responde con instrucciones, tono de marca, base de conocimiento y reglas de escalado humano.',
  },
  {
    area: 'Conectores',
    icon: PlugZap,
    detail: 'CRM, email, calendario, formularios, ERP, Google Sheets, Make, n8n o Zapier mediante webhooks/API.',
  },
];

const codexAppSteps = [
  {
    title: '1. Definir el producto',
    icon: FileText,
    items: [
      'Crear una herramienta de marketing para empresas, no una app personal de WhatsApp.',
      'Entidades mínimas: empresa, usuario, canal, contacto, conversación, mensaje, plantilla, integración y regla.',
      'Separar el panel interno de administración del webhook público de WhatsApp.',
    ],
  },
  {
    title: '2. Pedir a Codex el scaffold',
    icon: Github,
    items: [
      'Crear app Next.js con dashboard, API routes, base de datos y componentes visuales.',
      'Añadir autenticación y control multiempresa para que cada negocio vea solo sus datos.',
      'Generar una pantalla de configuración para WhatsApp, Gemini, plantillas y conectores externos.',
    ],
  },
  {
    title: '3. Conectar WhatsApp Cloud API',
    icon: MessageCircle,
    items: [
      'Implementar GET /api/whatsapp/webhook para verificar el challenge de Meta.',
      'Implementar POST /api/whatsapp/webhook para recibir mensajes, contactos y estados.',
      'Crear un servicio server-side para enviar mensajes usando Phone Number ID y token seguro.',
    ],
  },
  {
    title: '4. Añadir Gemini como cerebro',
    icon: Bot,
    items: [
      'Guardar GEMINI_API_KEY solo en variables de entorno de servidor.',
      'Construir un prompt con rol, tono, límites, datos del cliente y conocimiento de empresa.',
      'Registrar respuesta, fuente usada, confianza y si requiere revisión humana.',
    ],
  },
  {
    title: '5. Crear automatizaciones',
    icon: Workflow,
    items: [
      'Reglas por intención: precios, citas, facturas, estado de pedido, soporte, reclamaciones.',
      'Conectores salientes a CRM, calendarios, email, hojas de cálculo o webhooks de Make/n8n.',
      'Cola de revisión para mensajes delicados antes de enviarlos al cliente.',
    ],
  },
  {
    title: '6. Subir a GitHub y publicar en Vercel',
    icon: Cloud,
    items: [
      'Crear repositorio, hacer commit y push a GitHub.',
      'Importar el repositorio en Vercel y configurar el branch main como producción.',
      'Añadir variables de entorno en Vercel y usar la URL pública como webhook de Meta.',
    ],
  },
];

const envVars = [
  'WHATSAPP_VERIFY_TOKEN',
  'WHATSAPP_ACCESS_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
  'WHATSAPP_BUSINESS_ACCOUNT_ID',
  'GEMINI_API_KEY',
  'DATABASE_URL',
  'APP_BASE_URL',
  'WEBHOOK_SECRET',
];

export default function Module9WhatsAppAutomation() {
  const [open, setOpen] = useState(true);
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const selectedScenario = scenarios.find((scenario) => scenario.id === activeScenario) ?? scenarios[0];
  const ScenarioIcon = selectedScenario.icon;

  return (
    <div className="space-y-4">
      <Card
        className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-950">Automatización de WhatsApp Business</h3>
                <p className="text-sm text-emerald-800">
                  {open
                    ? 'Herramientas, arquitectura, tutorial API de Meta y cautelas para proyectos reales'
                    : 'Chatbots, facturas, reservas, webhooks y herramientas de terceros - Haz clic para ver'}
                </p>
              </div>
            </div>
            <ChevronDown className={`h-6 w-6 text-emerald-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
          <Card className="overflow-hidden border-emerald-200 bg-white">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 space-y-5 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white">
                  <div className="space-y-3">
                    <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20">Proyecto integrador real</Badge>
                    <h3 className="text-2xl font-bold">De evento de negocio a conversación útil en WhatsApp</h3>
                    <p className="text-sm text-emerald-50 leading-relaxed">
                      El objetivo no es "mandar WhatsApps". Es conectar un evento fiable (factura, reserva, ticket o pedido),
                      comprobar datos y consentimiento, y enviar una respuesta trazable con una vía de atención humana.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Entrada', value: 'Email / CRM / Calendario', icon: Mail },
                      { label: 'Motor', value: 'Make / n8n / API', icon: PlugZap },
                      { label: 'Datos', value: 'BBDD / ERP / Sheets', icon: Database },
                      { label: 'Salida', value: 'WhatsApp + registro', icon: MessageCircle },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/15 bg-white/10 p-3">
                        <item.icon className="h-5 w-5 text-emerald-200 mb-2" />
                        <p className="text-[10px] uppercase text-emerald-200 font-semibold">{item.label}</p>
                        <p className="text-xs font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-emerald-50">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-emerald-700" />
                    Arquitectura mínima recomendada
                  </h4>
                  {['Webhook recibe evento', 'Validador revisa reglas', 'Base de datos aporta contexto', 'Plantilla compone el mensaje', 'WhatsApp envía y devuelve estado'].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 rounded-lg border border-emerald-200 bg-white p-3 text-sm text-emerald-900">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid h-auto grid-cols-2 md:grid-cols-5 gap-2 bg-transparent">
              <TabsTrigger value="tools" className="border border-emerald-200 data-[state=active]:bg-emerald-100">Herramientas</TabsTrigger>
              <TabsTrigger value="tutorial" className="border border-emerald-200 data-[state=active]:bg-emerald-100">Tutorial Meta</TabsTrigger>
              <TabsTrigger value="codex-app" className="border border-emerald-200 data-[state=active]:bg-emerald-100">App Codex</TabsTrigger>
              <TabsTrigger value="flows" className="border border-emerald-200 data-[state=active]:bg-emerald-100">Flujos ejemplo</TabsTrigger>
              <TabsTrigger value="risks" className="border border-emerald-200 data-[state=active]:bg-emerald-100">Cuidados</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {thirdPartyTools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border-2 border-emerald-200 bg-white p-4 hover:border-emerald-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-emerald-950 group-hover:text-emerald-700">{tool.name}</h4>
                        <p className="text-xs text-emerald-700">{tool.role}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-emerald-500" />
                    </div>
                    <p className="text-xs text-slate-600 mt-3 min-h-12">{tool.bestFor}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorial" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {metaSteps.map((step) => (
                  <Card key={step.title} className="border-teal-200 bg-gradient-to-br from-white to-teal-50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-teal-100 flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-teal-700" />
                        </div>
                        <h4 className="font-bold text-teal-950">{step.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {step.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mt-4 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-blue-950">Documentación oficial para validar la integración:</span>
                    {docsLinks.map((link) => (
                      <Button key={link.url} asChild variant="outline" size="sm" className="h-8 border-blue-200 bg-white text-blue-800">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.title}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codex-app" className="mt-4">
              <div className="space-y-4">
                <Card className="overflow-hidden border-indigo-200 bg-white">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-950 to-emerald-950 text-white space-y-4">
                        <Badge className="w-fit bg-white/15 text-white border-white/20 hover:bg-white/20">
                          Tutorial de producto completo
                        </Badge>
                        <h4 className="text-2xl font-bold">Crear una app de marketing conversacional con Codex</h4>
                        <p className="text-sm text-indigo-50 leading-relaxed">
                          La idea es construir un panel para empresas donde cada cuenta pueda conectar su WhatsApp,
                          definir reglas, activar Gemini como asistente y enlazar otras aplicaciones sin mezclar datos entre clientes.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {appBlueprint.map((item) => (
                            <div key={item.area} className="rounded-xl border border-white/15 bg-white/10 p-3">
                              <item.icon className="h-5 w-5 text-emerald-200 mb-2" />
                              <p className="text-sm font-bold">{item.area}</p>
                              <p className="text-[11px] text-indigo-100 mt-1">{item.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 space-y-4 bg-indigo-50">
                        <h4 className="font-bold text-indigo-950 flex items-center gap-2">
                          <GitBranch className="h-5 w-5 text-indigo-700" />
                          Arquitectura recomendada
                        </h4>
                        {[
                          ['Frontend', 'Dashboard Next.js: bandeja, contactos, reglas, plantillas, analítica y configuración.'],
                          ['API interna', 'Endpoints server-side para WhatsApp, Gemini, conectores y operaciones de empresa.'],
                          ['Base de datos', 'Tablas multiempresa con companyId en todos los registros sensibles.'],
                          ['Automatización', 'Reglas que deciden si responde IA, plantilla, humano o conector externo.'],
                          ['Observabilidad', 'Logs de conversación, errores, coste, tiempos, auditoría y estados de entrega.'],
                        ].map(([label, text], index) => (
                          <div key={label} className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {index + 1}
                            </div>
                            <div className="rounded-lg border border-indigo-200 bg-white p-3">
                              <p className="text-sm font-bold text-indigo-950">{label}</p>
                              <p className="text-xs text-slate-700">{text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {codexAppSteps.map((step) => (
                    <Card key={step.title} className="border-slate-200 bg-gradient-to-br from-white to-slate-50">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                            <step.icon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-bold text-slate-950">{step.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {step.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                  <Card className="border-emerald-200 bg-emerald-50">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="font-bold text-emerald-950 flex items-center gap-2">
                        <Bot className="h-5 w-5 text-emerald-700" />
                        Prompt maestro para Codex
                      </h4>
                      <div className="rounded-lg bg-slate-950 p-3 text-xs text-emerald-50 font-mono leading-relaxed">
                        Crea una app Next.js de marketing conversacional B2B con multiempresa, WhatsApp Cloud API,
                        Gemini, webhooks, reglas de automatización, bandeja humana, logs, plantillas y despliegue en Vercel.
                        No pongas tokens en cliente. Usa API routes server-side, validación, auditoría y UI responsive.
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="font-bold text-blue-950 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-700" />
                        Variables de entorno
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {envVars.map((envVar) => (
                          <Badge key={envVar} variant="outline" className="bg-white text-blue-800 border-blue-200 text-[10px]">
                            {envVar}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-blue-900">
                        En local van en .env.local. En Vercel se configuran en Project Settings, nunca en código ni en GitHub.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="font-bold text-amber-950 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-700" />
                        Checklist antes de producción
                      </h4>
                      {[
                        'Webhook de Meta verificado en URL pública de Vercel.',
                        'Plantillas aprobadas y probadas con números internos.',
                        'Gemini no responde fuera de los límites definidos.',
                        'Botón de pausa y derivación humana funcionando.',
                        'Logs y borrado de datos preparados para cumplimiento.',
                      ].map((item) => (
                        <p key={item} className="text-xs text-amber-900 flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-violet-200 bg-violet-50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-bold text-violet-950 flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-violet-700" />
                      Flujo GitHub + Vercel
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                      {[
                        'Codex genera app',
                        'Commit en GitHub',
                        'Vercel importa repo',
                        'Variables seguras',
                        'Meta apunta al webhook',
                      ].map((step, index) => (
                        <div key={step} className="rounded-lg border border-violet-200 bg-white p-3 text-center">
                          <div className="mx-auto mb-2 h-7 w-7 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-xs font-medium text-violet-950">{step}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-violet-900">
                      Si el repositorio está conectado a Vercel, cada push a main puede publicar producción y cada rama puede crear una preview.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="flows" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => setActiveScenario(scenario.id)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                        activeScenario === scenario.id
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <scenario.icon className="h-5 w-5 text-emerald-700" />
                        <span className="font-bold text-slate-900">{scenario.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <Card className="border-emerald-200 bg-white">
                  <CardContent className="p-5 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <ScenarioIcon className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-950">{selectedScenario.title}</h4>
                        <p className="text-sm text-emerald-700">Blueprint listo para convertir en workflow</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedScenario.flow.map((step, index) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900">
                            {step}
                          </div>
                          {index < selectedScenario.flow.length - 1 && <ArrowRight className="h-4 w-4 text-emerald-500" />}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase text-slate-500 mb-2">Plantilla de mensaje</p>
                      <p className="text-sm text-slate-800">{selectedScenario.message}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {selectedScenario.controls.map((control) => (
                        <div key={control} className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                          <AlertTriangle className="h-4 w-4 mb-1 text-amber-600" />
                          {control}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {risks.map((risk) => (
                  <Card key={risk.title} className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <h4 className="font-bold text-amber-950">{risk.title}</h4>
                      </div>
                      <p className="text-sm text-slate-700">{risk.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mt-4 border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-start gap-3">
                  <LifeBuoy className="h-5 w-5 text-red-700 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-900">
                    Regla de proyecto: si el mensaje puede afectar dinero, salud, contrato, reclamación o datos sensibles,
                    el bot debe registrar evidencia y ofrecer derivación humana antes de cerrar la conversación.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-slate-200 bg-slate-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-start gap-2 text-slate-700">
                  <Zap className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span><strong>Automatiza</strong> solo eventos claros y medibles.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <Database className="h-5 w-5 text-blue-600 shrink-0" />
                  <span><strong>Consulta datos</strong> antes de responder al cliente.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
                  <span><strong>Gobierna</strong> permisos, plantillas, logs y escalado humano.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
