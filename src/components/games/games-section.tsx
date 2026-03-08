'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Gamepad2, ExternalLink, Brain, Trophy, Sparkles, Search, Code2, Image as ImageIcon } from 'lucide-react';
import ProjectNeural from './project-neural';
import IAMLDeepLearningQuiz from './ia-ml-dl-quiz';
import IAClassificationGame from './ia-classification-game';
import FactorySensorsGame from './factory-sensors-game';
import AutomationLabGame from './automation-lab-game';
import PromptEngineeringQuiz from './prompt-quiz';
import LLMSelectorTool from './llm-selector-tool';

interface GameItem {
  id: string;
  title: string;
  description: string;
  type: 'internal' | 'external';
  url?: string;
  category: 'juego' | 'actividad';
  icon: React.ReactNode;
  component?: React.ReactNode;
}

const gamesList: GameItem[] = [
  {
    id: 'project-neural',
    title: 'Project NEURAL - AI Training Simulator',
    description: 'Simulador donde eres un CTO en 2030. Debes diagnosticar tecnologías, detectar hype y entrenar modelos sin sesgos.',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-cyan-400" />,
    component: <ProjectNeural />,
  },
  {
    id: 'ia-ml-dl-quiz',
    title: '¿IA, ML, Deep Learning o Automatización?',
    description: 'Pon a prueba tus conocimientos identificando qué tecnología se usa en cada ejemplo del mundo real.',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-indigo-400" />,
    component: <IAMLDeepLearningQuiz />,
  },
  {
    id: 'ia-classification-game',
    title: '🗂️ Clasifica los Ejemplos por Tipo de IA',
    description: 'Arrastra cada ejemplo a la columna correcta (Reglas, ML, Deep Learning, IA Generativa).',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-teal-400" />,
    component: <IAClassificationGame />,
  },
  {
    id: 'factory-sensors',
    title: '🏭 Fábrica con Impresora 3D: Sensores IoT',
    description: 'Arrastra los sensores a la zona de la fábrica donde aporten más valor (Recepción, Almacén, Impresión, Calidad).',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-emerald-400" />,
    component: <FactorySensorsGame />,
  },
  {
    id: 'automation-lab',
    title: '🔬 Laboratorio de Automatización e IA',
    description: 'Diseña sistemas de automatización colocando sensores y actuadores en diferentes escenarios (fábrica, casa domótica, invernadero, etc.).',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-cyan-400" />,
    component: <AutomationLabGame />,
  },
];

// Lista de juegos específica para Módulo 2 (LLMs)
const module2GamesList: GameItem[] = [
  {
    id: 'llm-selector-tool',
    title: '🧠 Selector Inteligente de IAs (LLM)',
    description: 'Elige un caso de uso, tu perfil y descubre las mejores IAs para cada escenario. Incluye calculadora de costes de tokens.',
    type: 'internal',
    category: 'juego',
    icon: <Brain className="h-5 w-5 text-purple-400" />,
    component: <LLMSelectorTool />,
  },
  {
    id: 'prompt-quiz',
    title: '✨ Quiz de Prompt Engineering',
    description: 'Identifica las técnicas de prompt engineering en cada ejemplo: Role Prompting, Few-Shot, Chain of Thought, etc.',
    type: 'internal',
    category: 'juego',
    icon: <Sparkles className="h-5 w-5 text-pink-400" />,
    component: <PromptEngineeringQuiz />,
  },
];

// Enlaces externos específicos para Módulo 2 (LLMs)
const module2ExternalActivities: GameItem[] = [
  {
    id: 'chatgpt',
    title: 'ChatGPT - OpenAI',
    description: 'El LLM más popular. Ideal para redacción general, código, brainstorming y tareas cotidianas.',
    type: 'external',
    url: 'https://chat.openai.com',
    category: 'actividad',
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'claude',
    title: 'Claude - Anthropic',
    description: 'Excelente para documentos largos, análisis profundo y razonamiento. Ventana de contexto de 200K tokens.',
    type: 'external',
    url: 'https://claude.ai',
    category: 'actividad',
    icon: <Brain className="h-5 w-5 text-orange-400" />,
  },
  {
    id: 'gemini',
    title: 'Gemini - Google',
    description: 'Multimodal nativo. Integrado con Google Workspace. Ideal para investigación y productividad.',
    type: 'external',
    url: 'https://gemini.google.com',
    category: 'actividad',
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'copilot',
    title: 'Microsoft Copilot',
    description: 'Integrado en Word, Excel, PowerPoint y Edge. Perfecto si usas Microsoft 365.',
    type: 'external',
    url: 'https://copilot.microsoft.com',
    category: 'actividad',
    icon: <ExternalLink className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: 'perplexity',
    title: 'Perplexity AI',
    description: 'Motor de búsqueda con IA. Proporciona respuestas con fuentes citadas. Ideal para investigación.',
    type: 'external',
    url: 'https://www.perplexity.ai',
    category: 'actividad',
    icon: <Search className="h-5 w-5 text-cyan-400" />,
  },
  {
    id: 'mistral',
    title: 'Mistral AI - Le Chat',
    description: 'Modelo europeo eficiente. Excelente para código y tareas técnicas. API muy competitiva.',
    type: 'external',
    url: 'https://chat.mistral.ai',
    category: 'actividad',
    icon: <Code2 className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 'llama-meta',
    title: 'LLaMA - Meta',
    description: 'Modelo open source. Ideal para ejecutar localmente o personalizar para casos específicos.',
    type: 'external',
    url: 'https://ai.meta.com/llama',
    category: 'actividad',
    icon: <Brain className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'qwen',
    title: 'Qwen - Alibaba',
    description: 'Modelo versátil con buen rendimiento en código y tareas generales. API competitiva.',
    type: 'external',
    url: 'https://chat.qwen.ai',
    category: 'actividad',
    icon: <Sparkles className="h-5 w-5 text-red-400" />,
  },
  {
    id: 'grok',
    title: 'Grok - xAI',
    description: 'Integrado en X (Twitter). Acceso a información en tiempo real desde redes sociales.',
    type: 'external',
    url: 'https://grok.x.ai',
    category: 'actividad',
    icon: <ExternalLink className="h-5 w-5 text-slate-400" />,
  },
  {
    id: 'huggingface',
    title: 'Hugging Face',
    description: 'Plataforma con miles de modelos open source. Ideal para explorar y probar alternativas.',
    type: 'external',
    url: 'https://huggingface.co/chat',
    category: 'actividad',
    icon: <Brain className="h-5 w-5 text-pink-400" />,
  },
];

const externalActivities: GameItem[] = [
  {
    id: 'code-org-frozen',
    title: 'Frozen - Aprende a Programar con IA',
    description: 'Ayuda a Elsa y Anna a crear copos de nieve usando bloques de código. ¡Un juego divertido de Code.org para entender la lógica de programación!',
    type: 'external',
    url: 'https://studio.code.org/courses/frozen/units/1/lessons/1/levels/1',
    category: 'actividad',
    icon: <Gamepad2 className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'mit-ai-classifier',
    title: 'MIT AI Classifier - App Inventor',
    description: 'Explora cómo funciona el aprendizaje automático creando tu propio clasificador de imágenes. ¡Entrena una IA para reconocer diferentes objetos!',
    type: 'external',
    url: 'https://classifier.appinventor.mit.edu/',
    category: 'actividad',
    icon: <ExternalLink className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'mit-app-inventor',
    title: 'MIT App Inventor',
    description: 'Crea tus propias aplicaciones móviles para Android de forma visual y sencilla. ¡Desarrolla apps sin necesidad de escribir código complejo!',
    type: 'external',
    url: 'https://appinventor.mit.edu/',
    category: 'actividad',
    icon: <ExternalLink className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'code-org-students',
    title: 'Code.org - Estudiantes',
    description: 'Plataforma completa de Code.org para aprender programación. Tutoriales interactivos, desafíos de código y recursos para todos los niveles.',
    type: 'external',
    url: 'https://code.org/es/students',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-cyan-400" />,
  },
  {
    id: 'scratch-mit',
    title: 'Scratch - MIT',
    description: 'Crea historias interactivas, juegos y animaciones con Scratch. La plataforma del MIT para aprender programación de forma creativa y divertida.',
    type: 'external',
    url: 'https://scratch.mit.edu/',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-orange-400" />,
  },
  {
    id: 'tinkercad',
    title: 'Tinkercad - Diseño 3D y Electrónica',
    description: 'Herramienta gratuita de Autodesk para diseño 3D, electrónica y programación. Ideal para principiantes que quieren crear modelos 3D y circuitos.',
    type: 'external',
    url: 'https://www.tinkercad.com/',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-pink-400" />,
  },
  {
    id: 'ultimaker-cura',
    title: 'Ultimaker Cura - Software de Impresión 3D',
    description: 'El software de laminado (slicer) más popular para impresión 3D. Prepara tus modelos 3D para imprimir con configuración profesional.',
    type: 'external',
    url: 'https://ultimaker.com/es/software/ultimaker-cura/',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: 'thingiverse',
    title: 'Thingiverse - Modelos 3D Gratuitos',
    description: 'La mayor comunidad de diseño y compartición de modelos 3D. Descarga archivos STL gratuitos para impresión 3D.',
    type: 'external',
    url: 'https://www.thingiverse.com/',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'reprap',
    title: 'RepRap - Impresoras 3D Open Source',
    description: 'Proyecto de impresoras 3D de código abierto. Documentación, diseños y comunidad de makers.',
    type: 'external',
    url: 'https://reprap.org/wiki/RepRap/es',
    category: 'enlace',
    icon: <ExternalLink className="h-5 w-5 text-slate-400" />,
  },
];

interface GameAccordionItemProps {
  game: GameItem;
  isOpen: boolean;
  onToggle: () => void;
}

function GameAccordionItem({ game, isOpen, onToggle }: GameAccordionItemProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 overflow-hidden">
      <CardHeader className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
              {game.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-100">{game.title}</h4>
                {game.type === 'external' && (
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  game.category === 'juego' 
                    ? 'bg-purple-500/20 text-purple-400' 
                    : game.category === 'cuento'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {game.category === 'juego' ? 'Juego' : game.category === 'cuento' ? 'Cuento' : 'Actividad'}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{game.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0 text-slate-400 hover:text-slate-100"
          >
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0 pb-4">
          {game.type === 'internal' && game.component ? (
            <div className="mt-2">
              {game.component}
            </div>
          ) : game.type === 'external' && game.url ? (
            <div className="mt-2 relative overflow-hidden rounded-lg border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900">
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" />
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                      {game.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-100 text-lg">{game.title}</h4>
                      <p className="text-sm text-blue-300/70">Actividad Externa Recomendada</p>
                    </div>
                  </div>
                  <ExternalLink className="h-6 w-6 text-blue-400" />
                </div>
                
                <p className="text-slate-300 mb-6">{game.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => window.open(game.url, '_blank')}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 text-base font-semibold shadow-lg shadow-blue-500/25"
                  >
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Jugar Ahora
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => window.open(game.url, '_blank')}
                    variant="outline"
                    className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-500/20 py-6"
                  >
                    Abrir en Nueva Pestaña
                  </Button>
                </div>
                
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Gratis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Code.org</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span>Todos los niveles</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      )}
    </Card>
  );
}

interface GamesSectionProps {
  moduleSlug: string;
}

export default function GamesSection({ moduleSlug }: GamesSectionProps) {
  const [openGameId, setOpenGameId] = useState<string | null>(null);
  const [externalLinksOpen, setExternalLinksOpen] = useState(false);
  const [imageAiOpen, setImageAiOpen] = useState(false);
  const [videoAiOpen, setVideoAiOpen] = useState(false);
  const [musicAiOpen, setMusicAiOpen] = useState(false);
  const [voiceAiOpen, setVoiceAiOpen] = useState(false);
  const [threeDAiOpen, setThreeDAiOpen] = useState(false);

  const handleToggle = (gameId: string) => {
    setOpenGameId(openGameId === gameId ? null : gameId);
  };

  const handleExternalLinksToggle = () => {
    setExternalLinksOpen(!externalLinksOpen);
  };

  const handleImageAiToggle = () => {
    setImageAiOpen(!imageAiOpen);
  };

  const handleVideoAiToggle = () => {
    setVideoAiOpen(!videoAiOpen);
  };

  const handleMusicAiToggle = () => {
    setMusicAiOpen(!musicAiOpen);
  };

  const handleVoiceAiToggle = () => {
    setVoiceAiOpen(!voiceAiOpen);
  };

  const handleThreeDAiToggle = () => {
    setThreeDAiOpen(!threeDAiOpen);
  };

  // Determinar qué lista de juegos y enlaces usar según el módulo
  const currentGamesList = moduleSlug === 'llms-generativa' ? module2GamesList : gamesList;
  const currentExternalActivities = moduleSlug === 'llms-generativa' ? module2ExternalActivities : externalActivities;

  // Solo mostrar juegos y enlaces en el módulo 1 y 2
  if (moduleSlug !== 'introduccion-ia' && moduleSlug !== 'llms-generativa') {
    return (
      <Card className="border-slate-700 bg-slate-800/50">
        <CardContent className="p-12 text-center space-y-4">
          <Gamepad2 className="h-16 w-16 mx-auto text-slate-600" />
          <div>
            <h3 className="text-xl font-semibold text-slate-300">🎮 Juegos y Enlaces - Próximamente</h3>
            <p className="text-slate-400 mt-2">
              Estamos preparando contenido interactivo y enlaces recomendados para este módulo.
            </p>
            <p className="text-slate-500 text-sm mt-4">
              ¡Vuelve pronto para descubrir nuevas actividades!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Sección de Juegos Interactivos */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Gamepad2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Juegos Interactivos</h3>
        </div>
        
        {currentGamesList.length > 0 ? (
          <div className="space-y-3">
            {currentGamesList.map(game => (
              <GameAccordionItem
                key={game.id}
                game={game}
                isOpen={openGameId === game.id}
                onToggle={() => handleToggle(game.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-8 text-center text-slate-400">
              <Gamepad2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay juegos disponibles todavía</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sección de Actividades Externas - Desplegable */}
      {currentExternalActivities.length > 0 && (
        <div className="mt-8">
          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 cursor-pointer" onClick={handleExternalLinksToggle}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-200 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-900">🔗 Enlaces Externos a LLMs</h3>
                    <p className="text-sm text-yellow-700">
                      {externalLinksOpen 
                        ? `${currentExternalActivities.length} enlaces disponibles - Haz clic para ocultar`
                        : `${currentExternalActivities.length} enlaces a principales IAs - Haz clic para ver`}
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  className={`h-6 w-6 text-yellow-700 transition-transform duration-300 ${
                    externalLinksOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Enlaces desplegables */}
          {externalLinksOpen && (
            <div className="space-y-3 mt-4 animate-in slide-in-from-top-2 duration-300">
              {currentExternalActivities.map(activity => (
                <GameAccordionItem
                  key={activity.id}
                  game={activity}
                  isOpen={openGameId === activity.id}
                  onToggle={() => handleToggle(activity.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Sección IA de Imagen - Desplegable */}
      <div className="mt-8">
        <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 cursor-pointer" onClick={handleImageAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-pink-200 flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-pink-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pink-900">🎨 Enlaces Externos a IAs de Imagen</h3>
                  <p className="text-sm text-pink-700">
                    {imageAiOpen 
                      ? 'Próximamente en los próximos días'
                      : 'Generación y edición de imágenes con IA - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-pink-700 transition-transform duration-300 ${
                  imageAiOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {imageAiOpen && (
          <Card className="border-pink-200 bg-pink-50 mt-4 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-8 text-center">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 text-pink-400 opacity-50" />
              <p className="text-pink-700 font-medium">🚧 Próximamente en los próximos días</p>
              <p className="text-pink-600 text-sm mt-2">
                Estamos preparando una selección de las mejores IAs para generación y edición de imágenes.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sección IA de Video - Desplegable */}
      <div className="mt-6">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 cursor-pointer" onClick={handleVideoAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-900">🎬 Enlaces Externos a IAs de Video</h3>
                  <p className="text-sm text-purple-700">
                    {videoAiOpen 
                      ? 'Próximamente en los próximos días'
                      : 'Generación y edición de video con IA - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-purple-700 transition-transform duration-300 ${
                  videoAiOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {videoAiOpen && (
          <Card className="border-purple-200 bg-purple-50 mt-4 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-3 text-purple-400 opacity-50"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
              <p className="text-purple-700 font-medium">🚧 Próximamente en los próximos días</p>
              <p className="text-purple-600 text-sm mt-2">
                Estamos preparando una selección de las mejores IAs para generación y edición de video.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sección IA de Música - Desplegable */}
      <div className="mt-6">
        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 cursor-pointer" onClick={handleMusicAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan-700"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cyan-900">🎵 Enlaces Externos a IAs de Música</h3>
                  <p className="text-sm text-cyan-700">
                    {musicAiOpen 
                      ? 'Próximamente en los próximos días'
                      : 'Generación de música y audio con IA - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-cyan-700 transition-transform duration-300 ${
                  musicAiOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {musicAiOpen && (
          <Card className="border-cyan-200 bg-cyan-50 mt-4 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-3 text-cyan-400 opacity-50"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              <p className="text-cyan-700 font-medium">🚧 Próximamente en los próximos días</p>
              <p className="text-cyan-600 text-sm mt-2">
                Estamos preparando una selección de las mejores IAs para generación de música y audio.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sección IA de Voz - Desplegable */}
      <div className="mt-6">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 cursor-pointer" onClick={handleVoiceAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-700"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900">🎙️ Enlaces Externos a IAs de Voz</h3>
                  <p className="text-sm text-green-700">
                    {voiceAiOpen 
                      ? 'Próximamente en los próximos días'
                      : 'Síntesis y clonación de voz con IA - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-green-700 transition-transform duration-300 ${
                  voiceAiOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {voiceAiOpen && (
          <Card className="border-green-200 bg-green-50 mt-4 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-3 text-green-400 opacity-50"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></svg>
              <p className="text-green-700 font-medium">🚧 Próximamente en los próximos días</p>
              <p className="text-green-600 text-sm mt-2">
                Estamos preparando una selección de las mejores IAs para síntesis y clonación de voz.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sección IA 3D - Desplegable */}
      <div className="mt-6 mb-8">
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 cursor-pointer" onClick={handleThreeDAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-indigo-700"><path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3Z"/><path d="m2 12 10 9 10-9"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900">🧊 Enlaces Externos a IAs 3D</h3>
                  <p className="text-sm text-indigo-700">
                    {threeDAiOpen 
                      ? 'Próximamente en los próximos días'
                      : 'Generación de modelos y escenas 3D con IA - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown 
                className={`h-6 w-6 text-indigo-700 transition-transform duration-300 ${
                  threeDAiOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {threeDAiOpen && (
          <Card className="border-indigo-200 bg-indigo-50 mt-4 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 mx-auto mb-3 text-indigo-400 opacity-50"><path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3Z"/><path d="m2 12 10 9 10-9"/></svg>
              <p className="text-indigo-700 font-medium">🚧 Próximamente en los próximos días</p>
              <p className="text-indigo-600 text-sm mt-2">
                Estamos preparando una selección de las mejores IAs para generación de modelos 3D.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
