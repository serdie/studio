'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Gamepad2, ExternalLink, Brain, Trophy } from 'lucide-react';
import ProjectNeural from './project-neural';
import IAMLDeepLearningQuiz from './ia-ml-dl-quiz';
import IAClassificationGame from './ia-classification-game';
import FactorySensorsGame from './factory-sensors-game';

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

  const handleToggle = (gameId: string) => {
    setOpenGameId(openGameId === gameId ? null : gameId);
  };

  // Solo mostrar juegos y enlaces en el módulo 1 (introduccion-ia)
  if (moduleSlug !== 'introduccion-ia') {
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
        
        {gamesList.length > 0 ? (
          <div className="space-y-3">
            {gamesList.map(game => (
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

      {/* Sección de Actividades Externas */}
      {externalActivities.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="text-lg font-semibold">Actividades Externas Recomendadas</h3>
          </div>
          
          <div className="space-y-3">
            {externalActivities.map(activity => (
              <GameAccordionItem
                key={activity.id}
                game={activity}
                isOpen={openGameId === activity.id}
                onToggle={() => handleToggle(activity.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
