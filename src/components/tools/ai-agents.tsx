'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Globe,
  Monitor,
  Smartphone,
  Code2,
  Brain,
  Zap,
  ExternalLink,
  Sparkles,
  Terminal,
  Cloud,
  Cpu,
  Search,
  MessageSquare,
  Bot
} from 'lucide-react';

interface Agent {
  name: string;
  description: string;
  url: string;
  type: 'web' | 'desktop' | 'cli' | 'mobile';
  category: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

const agents: Agent[] = [
  // Web Agents
  {
    name: 'Manus (Web)',
    description: 'Agente de IA autónomo que ejecuta tareas complejas en el navegador: investigación, análisis de datos, automatización de workflows.',
    url: 'https://manus.im/',
    type: 'web',
    category: 'Agente Autónomo',
    icon: <Globe className="h-5 w-5" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'OpenClaw',
    description: 'Agente de IA open-source que puede navegar por internet, ejecutar código y automatizar tareas repetitivas.',
    url: 'https://openclaw.com/',
    type: 'web',
    category: 'Agente Open Source',
    icon: <Code2 className="h-5 w-5" />,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    name: 'Devin (Cognition AI)',
    description: 'El primer ingeniero de software IA autónomo. Planifica, escribe código, depura y despliega proyectos completos.',
    url: 'https://www.cognition.ai/',
    type: 'web',
    category: 'Agente de Desarrollo',
    icon: <Terminal className="h-5 w-5" />,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    name: 'AutoGPT',
    description: 'Agente autónomo de código abierto que encadena pensamientos para lograr objetivos complejos sin intervención humana.',
    url: 'https://agpt.co/',
    type: 'web',
    category: 'Agente Autónomo',
    icon: <Brain className="h-5 w-5" />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    name: 'BabyAGI',
    description: 'Sistema de gestión de tareas impulsado por IA que crea, prioriza y ejecuta tareas basándose en resultados anteriores.',
    url: 'https://babyagi.org/',
    type: 'web',
    category: 'Agente Autónomo',
    icon: <Zap className="h-5 w-5" />,
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    name: 'Perplexity AI',
    description: 'Motor de búsqueda con IA que responde preguntas con fuentes citadas. Funciona como agente de investigación autónomo.',
    url: 'https://www.perplexity.ai/',
    type: 'web',
    category: 'Agente de Investigación',
    icon: <Search className="h-5 w-5" />,
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
  },
  // Desktop Agents
  {
    name: 'Manus (Desktop)',
    description: 'Versión de escritorio de Manus. Controla aplicaciones locales, gestiona archivos y automatiza flujos de trabajo en tu ordenador.',
    url: 'https://manus.im/download',
    type: 'desktop',
    category: 'Agente de Escritorio',
    icon: <Monitor className="h-5 w-5" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Open Interpreter',
    description: 'Ejecuta código en tu ordenador mediante lenguaje natural. Controla el terminal, navega por archivos y automatiza tareas.',
    url: 'https://openinterpreter.com/',
    type: 'desktop',
    category: 'Agente de Terminal',
    icon: <Terminal className="h-5 w-5" />,
    color: 'text-slate-700',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
  },
  {
    name: 'Aider',
    description: 'Agente de programación en terminal que edita código en tu repositorio local mediante conversación con IA.',
    url: 'https://aider.chat/',
    type: 'desktop',
    category: 'Agente de Código',
    icon: <Code2 className="h-5 w-5" />,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    name: 'Cursor',
    description: 'Editor de código con IA integrada. Agente de desarrollo que entiende todo tu proyecto y sugiere cambios contextuales.',
    url: 'https://cursor.com/',
    type: 'desktop',
    category: 'Agente de Desarrollo',
    icon: <Cpu className="h-5 w-5" />,
    color: 'text-violet-700',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    name: 'Windsurf (Codeium)',
    description: 'IDE con IA integrada y "Flows" que entienden todo tu proyecto. Agente de programación con contexto completo.',
    url: 'https://windsurf.com/',
    type: 'desktop',
    category: 'Agente de Desarrollo',
    icon: <Cloud className="h-5 w-5" />,
    color: 'text-sky-700',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  {
    name: 'Continue.dev',
    description: 'Extensión open-source para VS Code y JetBrains. Conecta cualquier modelo de IA como agente de programación.',
    url: 'https://www.continue.dev/',
    type: 'desktop',
    category: 'Agente de Código',
    icon: <Code2 className="h-5 w-5" />,
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  // Mobile Agents
  {
    name: 'Rabbit R1',
    description: 'Dispositivo de bolsillo con agente de IA que ejecuta acciones en apps: pedir comida, reservar viajes, buscar información.',
    url: 'https://www.rabbit.tech/',
    type: 'mobile',
    category: 'Agente Móvil',
    icon: <Smartphone className="h-5 w-5" />,
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    name: 'Humane AI Pin',
    description: 'Dispositivo wearable con agente de IA proyectado. Responde preguntas, traduce, envía mensajes sin pantalla.',
    url: 'https://humane.com/',
    type: 'mobile',
    category: 'Agente Wearable',
    icon: <Smartphone className="h-5 w-5" />,
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  // Cloud/Platform Agents
  {
    name: 'Google AI Studio',
    description: 'Plataforma de Google para prototipar con Gemini. Agente de IA con contexto de 1M de tokens.',
    url: 'https://aistudio.google.com/',
    type: 'web',
    category: 'Plataforma Cloud',
    icon: <Cloud className="h-5 w-5" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Claude (Anthropic)',
    description: 'Agente conversacional con ventana de contexto de 200K tokens. Especializado en análisis de documentos largos.',
    url: 'https://claude.ai/',
    type: 'web',
    category: 'Agente Conversacional',
    icon: <MessageSquare className="h-5 w-5" />,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    name: 'ChatGPT (OpenAI)',
    description: 'Agente de IA más popular del mundo. GPT-4o con capacidades multimodales: texto, voz, imagen y código.',
    url: 'https://chatgpt.com/',
    type: 'web',
    category: 'Agente Conversacional',
    icon: <Bot className="h-5 w-5" />,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    name: 'Gemini (Google)',
    description: 'Agente multimodal nativo de Google. Integrado con Workspace, búsqueda en tiempo real y análisis de datos.',
    url: 'https://gemini.google.com/',
    type: 'web',
    category: 'Agente Multimodal',
    icon: <Sparkles className="h-5 w-5" />,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
];

export default function AIAgentsSection() {
  const [activeType, setActiveType] = useState<'all' | 'web' | 'desktop' | 'mobile'>('all');

  const filteredAgents = activeType === 'all'
    ? agents
    : agents.filter(a => a.type === activeType);

  const typeLabels = {
    all: 'Todos',
    web: 'Web',
    desktop: 'Escritorio',
    mobile: 'Móvil/Wearable',
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Agentes de IA</h1>
            <p className="text-sm text-slate-600">Explora los principales agentes de IA autónomos: web, escritorio y móvil</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200"><Brain className="h-3 w-3 mr-1" /><strong>{agents.length}</strong> <span className="ml-1">agentes</span></Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Globe className="h-3 w-3 mr-1" />Web</Badge>
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200"><Monitor className="h-3 w-3 mr-1" />Escritorio</Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><Smartphone className="h-3 w-3 mr-1" />Móvil</Badge>
        </div>
      </div>

      {/* Type Filter Tabs */}
      <Tabs value={activeType} onValueChange={(v) => setActiveType(v as typeof activeType)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
          <TabsTrigger value="web" className="text-xs">🌐 Web</TabsTrigger>
          <TabsTrigger value="desktop" className="text-xs">💻 Escritorio</TabsTrigger>
          <TabsTrigger value="mobile" className="text-xs">📱 Móvil</TabsTrigger>
        </TabsList>

        <TabsContent value={activeType} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <Card key={agent.name} className={`${agent.bgColor} ${agent.borderColor} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-9 w-9 rounded-lg ${agent.bgColor} flex items-center justify-center ${agent.color}`}>
                        {agent.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{agent.name}</h3>
                        <Badge variant="outline" className={`text-[9px] ${agent.bgColor} ${agent.color} ${agent.borderColor} mt-0.5`}>
                          {agent.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[9px] ${
                      agent.type === 'web' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      agent.type === 'desktop' ? 'bg-slate-100 text-slate-700 border-slate-200' :
                      'bg-orange-100 text-orange-700 border-orange-200'
                    }`}>
                      {agent.type === 'web' ? '🌐 Web' : agent.type === 'desktop' ? '💻 Desktop' : '📱 Mobile'}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{agent.description}</p>

                  <a
                    href={agent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Visitar {agent.name}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
