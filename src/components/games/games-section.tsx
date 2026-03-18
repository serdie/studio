'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Gamepad2, ExternalLink, Brain, Trophy, Sparkles, Search, Code2, Image as ImageIcon, Film } from 'lucide-react';
import ProjectNeural from './project-neural';
import IAMLDeepLearningQuiz from './ia-ml-dl-quiz';
import IAClassificationGame from './ia-classification-game';
import FactorySensorsGame from './factory-sensors-game';
import AutomationLabGame from './automation-lab-game';
import PromptEngineeringQuiz from './prompt-quiz';
import LLMSelectorTool from './llm-selector-tool';
import CUMPLEPromptWorkshop from './cumple-prompt-workshop';
import LLMTrainingGame from './llm-training-game';
import ImagePromptWorkshop from './image-prompt-workshop';
import VideoPromptWorkshop from './video-prompt-workshop';

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
    id: 'cumple-prompt-workshop',
    title: '📝 C.U.M.P.L.E? – Taller de Prompts IA',
    description: 'Constructor de prompts paso a paso usando el método C.U.M.P.L.E?: Contexto, U (extra), Manda, Pregunta, Lenguaje y Estructura.',
    type: 'internal',
    category: 'juego',
    icon: <Sparkles className="h-5 w-5 text-pink-400" />,
    component: <CUMPLEPromptWorkshop />,
  },
  {
    id: 'image-prompt-workshop',
    title: '🎨 Taller de Prompts para IA de Imagen',
    description: 'Crea prompts profesionales para Midjourney, DALL-E y Stable Diffusion: sujeto, acción, estilo, iluminación, cámara y parámetros.',
    type: 'internal',
    category: 'juego',
    icon: <ImageIcon className="h-5 w-5 text-blue-400" />,
    component: <ImagePromptWorkshop />,
  },
  {
    id: 'video-prompt-workshop',
    title: '🚀 PromptMaster Video IA Pro Max',
    description: 'Generador de prompts ULTRA completos con 12 secciones: personaje, acción, escenario, iluminación, cámara, estilo, clima, audio y más.',
    type: 'internal',
    category: 'juego',
    icon: <Film className="h-5 w-5 text-red-400" />,
    component: <VideoPromptWorkshop />,
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
  {
    id: 'llm-training-game',
    title: '🎯 Entrenamiento de evaluación - Módulo 2',
    description: 'Juego didáctico con las 20 preguntas clave del test: uso seguro, prompts, RAG, GPTs y proyectos. Incluye modo práctica y modo examen.',
    type: 'internal',
    category: 'juego',
    icon: <Trophy className="h-5 w-5 text-amber-400" />,
    component: <LLMTrainingGame />,
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
  const [localhostLlmOpen, setLocalhostLlmOpen] = useState(false);
  const [localhostImageAiOpen, setLocalhostImageAiOpen] = useState(false);
  const [localhostVideoAiOpen, setLocalhostVideoAiOpen] = useState(false);
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

  const handleLocalhostLlmToggle = () => {
    setLocalhostLlmOpen(!localhostLlmOpen);
  };

  const handleLocalhostImageAiToggle = () => {
    setLocalhostImageAiOpen(!localhostImageAiOpen);
  };

  const handleLocalhostVideoAiToggle = () => {
    setLocalhostVideoAiOpen(!localhostVideoAiOpen);
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

      {/* Sección LLMs en LOCALHOST - Desplegable */}
      <div className="mt-8">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 cursor-pointer" onClick={handleLocalhostLlmToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-200 flex items-center justify-center">
                  <Code2 className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900">🖥️ Enlace Externo a LLMs en LOCALHOST</h3>
                  <p className="text-sm text-green-700">
                    {localhostLlmOpen
                      ? '7 herramientas para ejecutar IAs en tu propio ordenador'
                      : 'Ejecuta modelos de lenguaje localmente sin conexión - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 text-green-700 transition-transform duration-300 ${
                  localhostLlmOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {localhostLlmOpen && (
          <div className="space-y-3 mt-4 animate-in slide-in-from-top-2 duration-300">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <a
                    href="https://ollama.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">Ollama</span>
                  </a>
                  <a
                    href="https://lmstudio.ai/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">LM Studio</span>
                  </a>
                  <a
                    href="https://www.nomic.ai/gpt4all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">GPT4All</span>
                  </a>
                  <a
                    href="https://www.jan.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">Jan</span>
                  </a>
                  <a
                    href="https://msty.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">Msty</span>
                  </a>
                  <a
                    href="https://localai.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">LocalAI</span>
                  </a>
                  <a
                    href="https://anythingllm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-green-200 hover:border-green-400 hover:bg-green-100 transition-all group"
                  >
                    <ExternalLink className="h-5 w-5 text-green-600 group-hover:text-green-700" />
                    <span className="font-medium text-green-900">AnythingLLM</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

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
                      ? '20 IAs de generación y edición de imágenes disponibles'
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
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Grid de tarjetas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* 1. Midjourney */}
              <a
                href="https://midjourney.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">1. Midjourney (v7)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  El estándar de oro para el arte digital. Su v7 destaca por texturas hiperrealistas y una iluminación global que parece renderizada por motores de cine.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Arte conceptual</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Fotografía editorial</Badge>
                </div>
              </a>

              {/* 2. ChatGPT (DALL-E) */}
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">2. ChatGPT (GPT Image 1 / DALL-E)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La evolución de DALL-E integrada en el chat. Permite edición selectiva (Inpainting) hablando con la IA: "haz que el gato tenga gafas de sol".
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Iteración rápida</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Lenguaje natural</Badge>
                </div>
              </a>

              {/* 3. Nano Banana (Google) */}
              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">3. Nano Banana (Google Gemini 3)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La apuesta de Google para 2026. Es imbatible en consistencia de personajes: puedes crear el mismo personaje en 10 escenas distintas sin que cambie su cara.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Consistencia personajes</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Storyboarding</Badge>
                </div>
              </a>

              {/* 4. FLUX.1.1 Pro */}
              <a
                href="https://blackforestlabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">4. FLUX.1.1 Pro</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  El sucesor espiritual de Stable Diffusion. Es ultra rápido y capaz de generar manos y rostros en ángulos complejos sin distorsiones.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Velocidad</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Anatomía perfecta</Badge>
                </div>
              </a>

              {/* 5. Adobe Firefly */}
              <a
                href="https://firefly.adobe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">5. Adobe Firefly (Image 3)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La IA "ética" entrenada con Adobe Stock. Su integración con Photoshop permite "expandir" imágenes (Generative Fill) de forma transparente.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Copyright-safe</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Agencias</Badge>
                </div>
              </a>

              {/* 6. Leonardo.ai */}
              <a
                href="https://leonardo.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">6. Leonardo.ai (Master Model)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Ofrece un control de "Director". Puedes fijar la postura de un modelo o la estructura de una habitación usando bocetos simples.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Diseño interiores</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Arquitectura</Badge>
                </div>
              </a>

              {/* 7. Ideogram 3.0 */}
              <a
                href="https://ideogram.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">7. Ideogram 3.0</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Sigue siendo el rey absoluto de la tipografía. Renderiza textos largos, carteles y logotipos con una precisión ortográfica del 100%.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Tipografía</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Diseño gráfico</Badge>
                </div>
              </a>

              {/* 8. Canva */}
              <a
                href="https://canva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">8. Canva (Estudio Mágico)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Combina múltiples motores (Leonardo, DALL-E, Google) en una sola interfaz. Su "Edición Mágica" permite sustituir objetos con un solo clic.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Community Managers</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Contenido rápido</Badge>
                </div>
              </a>

              {/* 9. Stable Diffusion */}
              <a
                href="https://stability.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">9. Stable Diffusion (SDXL / SD 3.5)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La plataforma de código abierto preferida por los desarrolladores. Permite instalar "Loras" (mini-entrenamientos) para copiar estilos muy específicos.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Open Source</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Local</Badge>
                </div>
              </a>

              {/* 10. Microsoft Designer */}
              <a
                href="https://designer.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">10. Microsoft Designer</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La herramienta gratuita más potente integrada en Windows 12 y Office 365. Ideal para generar visuales para presentaciones rápidamente.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Estudiantes</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Microsoft 365</Badge>
                </div>
              </a>

              {/* 11. Recraft.ai */}
              <a
                href="https://recraft.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">11. Recraft.ai</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Especializada en diseño vectorial e iconos. Genera archivos SVG infinitamente escalables, algo que casi ninguna otra IA hace bien.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Vectorial</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">UI/UX</Badge>
                </div>
              </a>

              {/* 12. Seedream 4 */}
              <a
                href="https://seedream.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">12. Seedream 4 (ByteDance)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La IA detrás de los filtros avanzados de TikTok. Es asombrosamente buena captando tendencias visuales gen-Z y estética de video vertical.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Influencers</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Viral</Badge>
                </div>
              </a>

              {/* 13. Playground AI */}
              <a
                href="https://playground.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">13. Playground AI</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Una interfaz web muy potente que te permite mezclar diferentes modelos de IA en un lienzo infinito (Canvas).
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Collage</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Composición</Badge>
                </div>
              </a>

              {/* 14. Reve AI */}
              <a
                href="https://reve.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">14. Reve AI</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Su función estrella es el "Reve Flow", un sistema de edición por capas que permite mover objetos dentro de la imagen generada como si fuera Photoshop.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Edición capas</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Equipos creativos</Badge>
                </div>
              </a>

              {/* 15. Grok Imagine */}
              <a
                href="https://x.com/grok"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">15. Grok Imagine (X.ai)</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Integrada en la red social X. Es famosa por su falta de censura política y su estilo crudo y periodístico.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Realismo crudo</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Memes</Badge>
                </div>
              </a>

              {/* 16. Krea.ai */}
              <a
                href="https://krea.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">16. Krea.ai</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La líder en generación en tiempo real. Mientras mueves un círculo rojo en la pantalla, la IA va dibujando una manzana en tiempo real.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Tiempo real</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Brainstorming</Badge>
                </div>
              </a>

              {/* 17. Freepik AI */}
              <a
                href="https://freepik.com/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">17. Freepik AI</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  La IA del gigante español de recursos gráficos. Genera imágenes que ya vienen "listas para usar" con estilos comerciales muy pulidos.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Stock</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Marketing</Badge>
                </div>
              </a>

              {/* 18. PromeAI */}
              <a
                href="https://promeai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">18. PromeAI</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Especializada en renderizado arquitectónico. Pasas un plano o un dibujo a lápiz y te devuelve una foto real de la casa terminada.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Arquitectura</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Interiorismo</Badge>
                </div>
              </a>

              {/* 19. Artbreeder */}
              <a
                href="https://artbreeder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">19. Artbreeder</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  En 2026 se ha especializado en la genealogía de personajes. Puedes "cruzar" dos caras generadas para crear un hijo que herede rasgos de ambos.
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Worldbuilding</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Escritores</Badge>
                </div>
              </a>

              {/* 20. Kling Image */}
              <a
                href="https://klingai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-pink-900 group-hover:text-pink-600">20. Kling Image</h4>
                  <ExternalLink className="h-4 w-4 text-pink-400 group-hover:text-pink-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-pink-700 mb-3 line-clamp-3">
                  Aunque es famosa por sus videos, su motor de imagen fija es el que mejor entiende las físicas de los materiales (vidrio, fluidos, telas).
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Producto lujo</Badge>
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">Efectos visuales</Badge>
                </div>
              </a>
            </div>

            {/* Consejo Pro */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-700"><path d="M12 2a7 7 0 1 1-7 7c0-2.38 1.19-4.47 3-5.74V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.26c1.81 1.27 3 3.36 3 5.74a7 7 0 1 1-7-7z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">💡 Consejo Pro para tu examen</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Si te preguntan por <strong>"Consistencia de Personaje"</strong>, menciona <strong>Nano Banana (Google Gemini 3)</strong>.</li>
                      <li>• Si te preguntan por <strong>"Tipografía"</strong>, menciona <strong>Ideogram 3.0</strong>.</li>
                      <li>• Si te preguntan por <strong>"Seguridad Legal"</strong>, menciona <strong>Adobe Firefly</strong>.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Sección IA-Imagen en LOCALHOST - Desplegable */}
      <div className="mt-8">
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 cursor-pointer" onClick={handleLocalhostImageAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900">🖼️ Enlace Externo a IA-Imagen en LOCALHOST</h3>
                  <p className="text-sm text-emerald-700">
                    {localhostImageAiOpen
                      ? 'IAs de imagen para ejecutar en tu ordenador o Google Colab'
                      : 'Generación de imágenes con IA en local - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 text-emerald-700 transition-transform duration-300 ${
                  localhostImageAiOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {localhostImageAiOpen && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Google Colab Script Card - Fooocus */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-700"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">📜 Script para Google Colab - Fooocus</h4>
                    <p className="text-sm text-emerald-700 mb-3">
                      Copia y pega este código en una celda de Google Colab para ejecutar Fooocus gratuitamente en la nube:
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre">
{`!pip install pygit2==1.15.1
%cd /content
!git clone https://github.com/lllyasviel/Fooocus.git
%cd /content/Fooocus
!python entry_with_update.py --share --always-high-vram`}
                  </pre>
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href="https://colab.research.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Abrir Google Colab
                  </a>
                  <a
                    href="https://www.kaggle.com/account/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
                    Abrir Kaggle
                  </a>
                  <a
                    href="https://github.com/lllyasviel/Fooocus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-300 text-emerald-700 hover:bg-emerald-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    Ver Fooocus en GitHub
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Automatic1111 Card with Embed */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-700"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">⚡ Stable Diffusion v2.0 con AUTOMATIC1111</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Notebook interactivo en Kaggle con la interfaz AUTOMATIC1111. Ejecuta Stable Diffusion v2.0 directamente en el navegador sin instalación.
                    </p>
                  </div>
                </div>

                {/* Embed iframe */}
                <div className="rounded-lg overflow-hidden border-2 border-blue-200 bg-white mb-4">
                  <iframe
                    src="https://www.kaggle.com/embed/amida168/stable-diffusion-v2-0-with-automatic1111?cellIds=2&kernelSessionId=119900699"
                    height="300"
                    style={{ margin: '0 auto', width: '100%', maxWidth: '950px' }}
                    frameBorder="0"
                    scrolling="auto"
                    title="Stable Diffusion v2.0 with Automatic1111"
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    href="https://www.kaggle.com/code/amida168/stable-diffusion-v2-0-with-automatic1111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
                    Abrir Notebook en Kaggle
                  </a>
                  <a
                    href="https://colab.research.google.com/github/TheLastBen/fast-stable-diffusion/blob/main/fast_stable_diffusion_AUTOMATIC1111.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Abrir Google Colab
                  </a>
                  <a
                    href="https://github.com/AUTOMATIC1111/stable-diffusion-webui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    Ver AUTOMATIC1111 en GitHub
                  </a>
                </div>

                {/* Info adicional */}
                <div className="mt-4 p-3 bg-blue-100/50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong className="text-blue-900">💡 Tip:</strong> Este notebook incluye la interfaz completa de AUTOMATIC1111 con txt2img, img2img, inpainting, y control de todos los parámetros de generación.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Grid de IAs Locales */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Fooocus */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">1. Fooocus</h4>
                    <a
                      href="https://github.com/lllyasviel/Fooocus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    La opción más sencilla para ejecutar Stable Diffusion XL en local. Interfaz minimalista estilo Midjourney con resultados profesionales sin necesidad de configuración compleja.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">SDXL</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Fácil uso</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Google Colab</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Stable Diffusion WebUI */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">2. Stable Diffusion WebUI (AUTOMATIC1111)</h4>
                    <a
                      href="https://github.com/AUTOMATIC1111/stable-diffusion-webui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    La interfaz más popular y completa para Stable Diffusion. Miles de extensiones, control total sobre generación, entrenamiento de LoRAs y soporte para todos los modelos.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Avanzado</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Extensiones</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">LoRA</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* ComfyUI */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">3. ComfyUI</h4>
                    <a
                      href="https://github.com/comfyanonymous/ComfyUI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    Interfaz basada en nodos para crear flujos de trabajo complejos de generación de imágenes. Máxima flexibilidad y optimización de recursos. Ideal para usuarios avanzados.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Nodos</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Workflows</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Optimizado</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* InvokeAI */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">4. InvokeAI</h4>
                    <a
                      href="https://github.com/invoke-ai/InvokeAI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    Interfaz profesional con herramientas de edición avanzadas, canvas infinito y control preciso. Diseñado para artistas y profesionales creativos.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Profesional</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Canvas infinito</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Inpainting</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Draw Things */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">5. Draw Things (macOS/iOS)</h4>
                    <a
                      href="https://drawthings.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    Aplicación nativa para Mac, iPhone y iPad. Ejecuta Stable Diffusion localmente en dispositivos Apple Silicon sin necesidad de conexión a internet.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">macOS</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">iOS</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Apple Silicon</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* SwarmUI */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">6. SwarmUI</h4>
                    <a
                      href="https://github.com/mcmonkeyprojects/SwarmUI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    Interfaz modular que combina lo mejor de AUTOMATIC1111 y ComfyUI. Permite generar múltiples variaciones simultáneamente y gestionar varios modelos.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Modular</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Batch</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Multi-modelo</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pinokio */}
              <Card className="border-emerald-200 bg-white hover:border-emerald-400 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900">7. Pinokio</h4>
                    <a
                      href="https://pinokio.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-xs text-emerald-700 mb-3">
                    El "navegador" todo-en-uno para IAs locales. Instala y gestiona con un clic Fooocus, ComfyUI, FaceFusion y decenas de herramientas más sin configuración manual.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Todo-en-uno</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">1-clic</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Gestor</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Card */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-700"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">💡 Requisitos para ejecutar en local</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• <strong>GPU NVIDIA:</strong> Mínimo 4GB VRAM (recomendado 8GB+ para SDXL)</li>
                      <li>• <strong>RAM:</strong> 16GB mínimo, 32GB recomendado</li>
                      <li>• <strong>Almacenamiento:</strong> 20-50GB libres para modelos y checkpoints</li>
                      <li>• <strong>Google Colab:</strong> Opción gratuita con GPU T4 de 16GB (límite de tiempo por sesión)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <div className="mt-4 space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Categoría 1: 100% Creación de Video */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <h4 className="text-lg font-bold text-purple-900">🎬 100% Creación de Video (Text/Image to Video)</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Runway */}
                <a
                  href="https://runwayml.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">1. Runway (Gen-3)</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    La herramienta profesional de referencia para creación cinematográfica. Ofrece control creativo avanzado con herramientas de edición integradas, generación desde texto o imagen, motion brush para controlar movimiento específico, y capacidades de inpainting/outpainting temporal. Usada en producciones de Hollywood.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Profesional</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Cinematográfico</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Edición</Badge>
                  </div>
                </a>

                {/* OpenAI Sora */}
                <a
                  href="https://openai.com/sora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">2. OpenAI Sora</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    El modelo más avanzado de OpenAI para narrativa visual. Genera clips de hasta 60 segundos con coherencia temporal excepcional, comprensión profunda de física del mundo real, y capacidad de mantener consistencia de personajes y escenarios a lo largo del tiempo. Calidad cinematográfica realista.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Storytelling</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Realista</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">60 segundos</Badge>
                  </div>
                </a>

                {/* Kling AI */}
                <a
                  href="https://klingai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">3. Kling AI</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Especializado en humanos fotorrealistas con movimientos fluidos de alta calidad. Destaca por generar expresiones faciales naturales, gestos corporales coherentes, y física de cabello y ropa realista. Ideal para crear contenido con personas que no parezcan generadas por IA.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Fotorrealista</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Humanos</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Movimiento fluido</Badge>
                  </div>
                </a>

                {/* Luma Dream Machine */}
                <a
                  href="https://lumalabs.ai/dream-machine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">4. Luma Dream Machine</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Resultados rápidos y cinematográficos, ideal para iteraciones rápidas de producción. Genera videos de alta calidad en minutos, con comprensión de iluminación cinematográfica, composición de planos, y movimiento de cámara profesional. Perfecto para prototipado y previsualización.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Rápido</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Cinematográfico</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Iteración</Badge>
                  </div>
                </a>

                {/* Pika */}
                <a
                  href="https://pika.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">5. Pika (Pika 2.0)</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Contenido creativo optimizado para redes sociales con animaciones divertidas y dinámicas. Ofrece efectos especiales integrados, transiciones creativas, estilo anime/animación, y herramientas para modificar regiones específicas del video. Ideal para TikTok, Instagram Reels y YouTube Shorts.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Redes Sociales</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Animación</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Efectos</Badge>
                  </div>
                </a>

                {/* Google Veo 3 */}
                <a
                  href="https://deepmind.google/technologies/veo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">6. Google Veo 3</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Realismo cinematográfico con audio integrado sincronizado. El modelo de Google genera videos en 1080p con comprensión de terminología cinematográfica profesional, iluminación realista, y genera automáticamente bandas sonoras y efectos de sonido que coinciden con la acción visual.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">1080p</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Audio integrado</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Google</Badge>
                  </div>
                </a>

                {/* Hailuo AI */}
                <a
                  href="https://hailuoai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">7. Hailuo AI (MiniMax)</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Animaciones estilizadas con movimientos suaves y fluidos. Especializado en crear videos con estética de animación profesional, interpolación de frames de alta calidad, y transiciones naturales entre escenas. Ideal para contenido animado y artístico.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Animación</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Estilizado</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Movimiento suave</Badge>
                  </div>
                </a>

                {/* Wan 2.6 */}
                <a
                  href="https://wan.video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-purple-900 group-hover:text-purple-600">8. Wan 2.6</h4>
                    <ExternalLink className="h-4 w-4 text-purple-400 group-hover:text-purple-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-purple-700 mb-3 line-clamp-4">
                    Clips largos con construcción de mundo sólida y coherente. Capaz de generar secuencias de hasta 2 minutos manteniendo consistencia en escenarios, personajes y narrativa. Ideal para storytelling extendido y creación de mundos fantásticos detallados.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Clips largos</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Worldbuilding</Badge>
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Coherente</Badge>
                  </div>
                </a>
              </div>
            </div>

            {/* Categoría 2: Videos con Avatares */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h4 className="text-lg font-bold text-blue-900">👤 Videos con Avatares IA</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* HeyGen */}
                <a
                  href="https://heygen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-blue-900 group-hover:text-blue-600">9. HeyGen</h4>
                    <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-blue-700 mb-3 line-clamp-4">
                    Videos personalizados con avatares IA hiperrealistas y traducción multilingüe automática. Crea presentadores virtuales que hablan en 40+ idiomas con sincronización labial perfecta. Incluye clonación de voz y avatares personalizables que se parecen a ti o a tu equipo.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Avatares</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Multilingüe</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Traducción</Badge>
                  </div>
                </a>

                {/* Synthesia */}
                <a
                  href="https://synthesia.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-blue-900 group-hover:text-blue-600">10. Synthesia</h4>
                    <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-blue-700 mb-3 line-clamp-4">
                    Plataforma líder para videos empresariales y de training con avatares realistas. Más de 140 avatares diversos, 120+ idiomas, plantillas corporativas profesionales. Usada por el 50% de las empresas Fortune 100 para formación interna, onboarding y comunicaciones corporativas.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Empresarial</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Training</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">140+ avatares</Badge>
                  </div>
                </a>

                {/* Elai.io */}
                <a
                  href="https://elai.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-blue-900 group-hover:text-blue-600">11. Elai.io</h4>
                    <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-blue-700 mb-3 line-clamp-4">
                    Explainer videos educativos con avatares personalizables. Convierte texto, artículos o presentaciones en videos con presentadores IA. Ideal para e-learning, tutoriales, y contenido educativo. Incluye pizarra virtual, integración con PowerPoint y Google Slides.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Educación</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Explainer</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">E-learning</Badge>
                  </div>
                </a>

                {/* Rephrase.ai */}
                <a
                  href="https://rephrase.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-blue-900 group-hover:text-blue-600">12. Rephrase.ai</h4>
                    <ExternalLink className="h-4 w-4 text-blue-400 group-hover:text-blue-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-blue-700 mb-3 line-clamp-4">
                    Presentadores virtuales hiperrealistas para videos personalizados a escala. Crea miles de variaciones de un video con diferentes presentadores, idiomas y mensajes. Ideal para marketing personalizado, ventas outreach, y comunicaciones masivas personalizadas.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Hiperrealista</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Personalización</Badge>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Escala</Badge>
                  </div>
                </a>
              </div>
            </div>

            {/* Categoría 3: Article/Text to Video */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                </div>
                <h4 className="text-lg font-bold text-amber-900">📝 Article/Text to Video</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Pictory */}
                <a
                  href="https://pictory.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-amber-900 group-hover:text-amber-600">13. Pictory</h4>
                    <ExternalLink className="h-4 w-4 text-amber-400 group-hover:text-amber-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-amber-700 mb-3 line-clamp-4">
                    Convierte artículos de blog y contenido escrito largo en videos engaging automáticamente. Extrae puntos clave, añade stock footage relevante, música de fondo y voiceover. Ideal para marketers de contenido que quieren repurpostear artículos en videos para redes sociales.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Blog a Video</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Auto-editado</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Stock footage</Badge>
                  </div>
                </a>

                {/* InVideo */}
                <a
                  href="https://invideo.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-amber-900 group-hover:text-amber-600">14. InVideo</h4>
                    <ExternalLink className="h-4 w-4 text-amber-400 group-hover:text-amber-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-amber-700 mb-3 line-clamp-4">
                    Miles de plantillas IA para marketing y redes sociales. Convierte texto a video con escenas pre-diseñadas, transiciones profesionales, y biblioteca de 8M+ stock media. Incluye editor drag-and-drop, voiceover IA, y optimización automática para cada plataforma social.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Plantillas</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Marketing</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">8M+ stock</Badge>
                  </div>
                </a>

                {/* Fliki */}
                <a
                  href="https://fliki.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-amber-900 group-hover:text-amber-600">15. Fliki</h4>
                    <ExternalLink className="h-4 w-4 text-amber-400 group-hover:text-amber-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-amber-700 mb-3 line-clamp-4">
                    Voiceovers naturales con conversión texto a video en minutos. 2000+ voces IA ultra realistas en 75+ idiomas, sincronización automática con visuals, y biblioteca de 100M+ assets. Ideal para videos de YouTube, cursos online, y contenido narrado profesional.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Voiceover</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">2000+ voces</Badge>
                    <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">75+ idiomas</Badge>
                  </div>
                </a>
              </div>
            </div>

            {/* Categoría 4: Edición de Video con IA */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h4 className="text-lg font-bold text-emerald-900">✂️ Edición de Video con IA</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Veed.io */}
                <a
                  href="https://veed.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600">16. Veed.io</h4>
                    <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-700 mb-3 line-clamp-4">
                    Editor de video online con features IA automáticas: subtítulos auto-generados (95% precisión), eliminación de ruido de audio, eye contact correction, background removal, y resize automático para cada red social. Todo en el navegador sin instalar software.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Subtítulos auto</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Online</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Eye contact</Badge>
                  </div>
                </a>

                {/* Kapwing */}
                <a
                  href="https://kapwing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600">17. Kapwing</h4>
                    <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-700 mb-3 line-clamp-4">
                    Edición versátil con IA para memes, shorts y contenido viral. Herramientas de auto-crop, smart cut para eliminar silencios, generación automática de memes con templates trending, y colaboración en tiempo real para equipos. Popular entre creadores de contenido.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Memes</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Shorts</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Colaboración</Badge>
                  </div>
                </a>

                {/* Wisecut */}
                <a
                  href="https://wisecut.video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600">18. Wisecut</h4>
                    <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-700 mb-3 line-clamp-4">
                    Edición automática con sincronización de audio inteligente. Elimina silencios automáticamente, ajusta música de fondo según el volumen de voz (auto-ducking), añade subtítulos, y optimiza el ritmo del video. Ideal para podcasts, tutoriales y talking head videos.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Auto-cut</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Audio ducking</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Podcasts</Badge>
                  </div>
                </a>

                {/* Vidyo.ai */}
                <a
                  href="https://vidyo.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600">19. Vidyo.ai</h4>
                    <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-700 mb-3 line-clamp-4">
                    Resume videos largos en clips cortos virales automáticamente. Detecta momentos highlights, añade captions dinámicos, emojis, y reformatea para TikTok/Reels/Shorts. Ideal para podcaster y creadores de contenido largo que quieren maximizar reach en redes.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Clips virales</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Auto-highlights</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Captions</Badge>
                  </div>
                </a>

                {/* Opus Clip */}
                <a
                  href="https://opus.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-5 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600">20. Opus Clip</h4>
                    <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-emerald-700 mb-3 line-clamp-4">
                    Clips cortos de videos largos optimizados para viralidad con AI curation score. Analiza tu contenido largo, identifica los momentos más engaging, y crea múltiples clips con diferentes hooks. Usado por top creators para escalar contenido en redes sociales.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">AI curation</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Viral score</Badge>
                    <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">Multi-clips</Badge>
                  </div>
                </a>
              </div>
            </div>

            {/* Consejo Pro */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-700"><path d="M12 2a7 7 0 1 1-7 7c0-2.38 1.19-4.47 3-5.74V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.26c1.81 1.27 3 3.36 3 5.74a7 7 0 1 1-7-7z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">💡 Consejo Pro para tu examen</h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• Si te preguntan por <strong>"Video cinematográfico profesional"</strong>, menciona <strong>Runway</strong> o <strong>Google Veo</strong>.</li>
                      <li>• Si te preguntan por <strong>"Avatares para empresa"</strong>, menciona <strong>Synthesia</strong> o <strong>HeyGen</strong>.</li>
                      <li>• Si te preguntan por <strong>"Clips virales de podcasts"</strong>, menciona <strong>Opus Clip</strong> o <strong>Vidyo.ai</strong>.</li>
                      <li>• Si te preguntan por <strong>"Humanos más realistas"</strong>, menciona <strong>Kling AI</strong>.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Sección IA-Video en LOCALHOST - Desplegable */}
      <div className="mt-8">
        <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 cursor-pointer" onClick={handleLocalhostVideoAiToggle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal-700"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-teal-900">🎥 IA-Video en LOCALHOST</h3>
                  <p className="text-sm text-teal-700">
                    {localhostVideoAiOpen
                      ? 'IAs de video para ejecutar en tu ordenador'
                      : 'Generación de video con IA en local - Haz clic para ver'}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-6 w-6 text-teal-700 transition-transform duration-300 ${
                  localhostVideoAiOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contenido desplegable */}
        {localhostVideoAiOpen && (
          <div className="mt-4 space-y-6 animate-in slide-in-from-top-2 duration-300">
            {/* Categoría 1: Modelos Open Source Principales */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><path d="M12 2a7 7 0 1 0 10 10 7 7 0 0 0-10-10z"/><circle cx="12" cy="12" r="3"/><path d="m12 9 3 3-3 3"/></svg>
                </div>
                <h4 className="text-lg font-bold text-teal-900">🚀 Modelos Open Source Principales</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Wan 2.1 / Wan2GP */}
                <Card className="border-teal-200 bg-white hover:border-teal-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-teal-900">1. Wan 2.1 / Wan2GP</h4>
                      <a
                        href="https://github.com/Wan-Video/Wan2.1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-teal-700 mb-3">
                      Top open-source text-to-video con arquitectura MoE (Mixture of Experts). Rápido y eficiente, genera clips de hasta 10 segundos en resolución 720p. Disponible vía Pinokio para instalación en 1-clic. Ideal para quienes buscan calidad Sora-like en local.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">MoE Architecture</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">720p</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Pinokio</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* LTX-2 / LTX Video */}
                <Card className="border-teal-200 bg-white hover:border-teal-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-teal-900">2. LTX-2 / LTX Video</h4>
                      <a
                        href="https://github.com/Lightricks/LTX-Video"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-teal-700 mb-3">
                      La mejor calidad local disponible actualmente. En tests independientes supera a Sora en coherencia temporal y física realista. Incluye audio sync automático. Requiere mínimo 12GB VRAM pero los resultados son cinematográficos.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Calidad Sora+</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Audio sync</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">12GB VRAM</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* HunyuanVideo 1.5 */}
                <Card className="border-teal-200 bg-white hover:border-teal-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-teal-900">3. HunyuanVideo 1.5 (Tencent)</h4>
                      <a
                        href="https://github.com/Tencent/HunyuanVideo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-teal-700 mb-3">
                      Excelente optimización para low VRAM (funciona con 8GB). Nativo en ComfyUI con nodos dedicados. Soporta tanto Image-to-Video como Text-to-Video. Calidad profesional con menor consumo de recursos que la competencia.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Low VRAM</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">ComfyUI</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">I2V + T2V</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* CogVideoX */}
                <Card className="border-teal-200 bg-white hover:border-teal-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-teal-900">4. CogVideoX</h4>
                      <a
                        href="https://github.com/THUDM/CogVideo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-teal-700 mb-3">
                      Text-to-video gratis y open source de Tsinghua University. Incluye Streamlit app para instalación local simple. Genera clips de 6 segundos a 480p. Perfecto para principiantes que quieren experimentar con video IA sin hardware potente.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Gratis</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Streamlit</Badge>
                      <Badge variant="outline" className="text-xs bg-teal-50 text-teal-700 border-teal-200">Principiantes</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Categoría 2: Frameworks y Nodos */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                </div>
                <h4 className="text-lg font-bold text-blue-900">🔧 Frameworks y Nodos para Video</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {/* ComfyUI Video Nodes */}
                <Card className="border-blue-200 bg-white hover:border-blue-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-blue-900">5. ComfyUI Video Nodes</h4>
                      <a
                        href="https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      Framework modular que soporta múltiples modelos de video (Mochi, TI2V, AnimateDiff). Permite crear workflows personalizados con nodos para load video, extract frames, video combine, y upscale. Esencial para producción profesional de video IA en local.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Modular</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Multi-modelo</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Workflows</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* AnimateDiff */}
                <Card className="border-blue-200 bg-white hover:border-blue-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-blue-900">6. AnimateDiff (SD1.5/SDXL)</h4>
                      <a
                        href="https://github.com/guoyww/AnimateDiff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      El pionero en animación de imágenes estáticas usando Stable Diffusion. Crea loops animados de 2-4 segundos a partir de una imagen + prompt. Compatible con miles de checkpoints de SD. Ideal para animaciones sutiles de retratos y paisajes.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Image Animation</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">SD Compatible</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Loops</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Deforum */}
                <Card className="border-blue-200 bg-white hover:border-blue-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-blue-900">7. Deforum (Automatic1111)</h4>
                      <a
                        href="https://github.com/deforum-art/deforum-stable-diffusion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      Extension clásica para Automatic1111 especializada en videos psicodélicos y transformaciones morphing. Control total de camera movement, keyframes, y prompts por frame. Popular para videos musicales y arte abstracto animado.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Morphing</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Keyframes</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">A1111 Extension</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Stable Video Diffusion */}
                <Card className="border-blue-200 bg-white hover:border-blue-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-blue-900">8. Stable Video Diffusion (SVD)</h4>
                      <a
                        href="https://github.com/Stability-AI/generative-models"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      Modelo oficial de Stability AI para image-to-video. Genera 2-4 segundos de video a partir de una imagen. Requiere 16GB VRAM para calidad óptima. Se integra con ComfyUI y Automatic1111. Base para muchos fine-tunes de la comunidad.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Image-to-Video</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Stability AI</Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">16GB VRAM</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Categoría 3: Herramientas Todo-en-Uno */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h4 className="text-lg font-bold text-purple-900">📦 Herramientas Todo-en-Uno</h4>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Pinokio */}
                <Card className="border-purple-200 bg-white hover:border-purple-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-purple-900">9. Pinokio (Video Scripts)</h4>
                      <a
                        href="https://pinokio.computer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-purple-700 mb-3">
                      Navegador/gestor que incluye scripts de instalación 1-clic para Wan2GP, CogVideo, y otros modelos de video. Gestiona dependencias, actualizaciones y ejecución automáticamente. Ideal para quienes no quieren complicaciones con terminal y Python.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">1-Click Install</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Auto-Update</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Gestor</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Fooocus Video (Experimental) */}
                <Card className="border-purple-200 bg-white hover:border-purple-400 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-purple-900">10. Fooocus Video (Experimental)</h4>
                      <a
                        href="https://github.com/lllyasviel/Fooocus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-purple-700 mb-3">
                      Extensión experimental del popular Fooocus para generación de video. Mantiene la interfaz simple y minimalista característica de Fooocus. Actualmente en desarrollo activo, promete democratizar el video IA como hizo con las imágenes.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Experimental</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">Simple UI</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">En desarrollo</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Info Card con Requisitos */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-700"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">💡 Requisitos para Video IA en Local</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-800">
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">Mínimo recomendado:</strong></p>
                        <ul className="space-y-1">
                          <li>• <strong>GPU:</strong> NVIDIA RTX 3060 12GB o superior</li>
                          <li>• <strong>VRAM:</strong> 12GB mínimo, 16GB+ recomendado</li>
                          <li>• <strong>RAM:</strong> 32GB system memory</li>
                          <li>• <strong>Storage:</strong> SSD con 50GB+ libres</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong className="text-amber-900">Para modelos avanzados (LTX-2, Wan 2.1):</strong></p>
                        <ul className="space-y-1">
                          <li>• <strong>GPU:</strong> RTX 4090 (24GB) o RTX 3090/4090</li>
                          <li>• <strong>VRAM:</strong> 24GB recomendado</li>
                          <li>• <strong>RAM:</strong> 64GB system memory</li>
                          <li>• <strong>Storage:</strong> NVMe SSD 100GB+ libres</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-100/50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-800">
                        <strong>💡 Tip:</strong> Si no tienes hardware suficiente, usa <strong>Google Colab Pro</strong> ($10/mes) con GPU A100 de 40GB o <strong>RunPod</strong> / <strong>Vast.ai</strong> para alquilar GPUs potentes por horas (~$0.40-0.70/hora).
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consejo Pro */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-200 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-teal-700"><path d="M12 2a7 7 0 1 1-7 7c0-2.38 1.19-4.47 3-5.74V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.26c1.81 1.27 3 3.36 3 5.74a7 7 0 1 1-7-7z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900 mb-2">🎯 Recomendaciones según tu hardware</h4>
                    <ul className="text-sm text-teal-800 space-y-1">
                      <li>• <strong>8GB VRAM:</strong> Empieza con <strong>CogVideoX</strong> o <strong>HunyuanVideo</strong> en baja resolución.</li>
                      <li>• <strong>12GB VRAM:</strong> <strong>LTX-2</strong> para máxima calidad, <strong>Wan2GP</strong> para velocidad.</li>
                      <li>• <strong>16-24GB VRAM:</strong> Todos los modelos, incluyendo <strong>SVD</strong> y workflows complejos de <strong>ComfyUI</strong>.</li>
                      <li>• <strong>&lt;8GB VRAM:</strong> Usa <strong>Colab Pro</strong>, <strong>RunPod</strong>, o <strong>Pinokio</strong> con modelos optimizados.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
