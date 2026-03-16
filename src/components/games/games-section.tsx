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
import CUMPLEPromptWorkshop from './cumple-prompt-workshop';
import LLMTrainingGame from './llm-training-game';
import ImagePromptWorkshop from './image-prompt-workshop';

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
            {/* Google Colab Script Card */}
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
