'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { Module, Resource } from '@/lib/data';
import ResourceList from './resource-list';
import AISummarizer from './ai-summarizer';
import AIAssistant from './ai-assistant';
import AIImageGenerator from './ai-image-generator';
import AvatarCreator from './avatar-creator';
import LearningObjectives from './learning-objectives';
import ModuleContentAccordion from './module-content-accordion';
import GamesSection from '@/components/games/games-section';
import SoundAIExercises from './sound-ai-exercises';
import AvatarExercises from './avatar-exercises';
import PracticeLab from './practice-lab';
import Module3Summary from './module-3-summary';
import DronesGuide from '../games/drones-guide';
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog, CheckCircle, CheckCircle2, Loader2, Gamepad2, BookOpen, FileText as FileTextIcon, ChevronDown, ChevronUp, Film, Headphones, Music, Beaker } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';

// Componente plegable para secciones
interface CollapsibleSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleSection({ title, description, icon, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <CardTitle className="text-lg text-purple-900">{title}</CardTitle>
                  <p className="text-sm text-purple-700">{description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600">
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Ver
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-0">
          <CardContent className="space-y-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// Componente para tarjetas de películas
interface MovieCardProps {
  title: string;
  description: string;
  poster: string;
  themes: string[];
}

function MovieCard({ title, description, poster, themes }: MovieCardProps) {
  return (
    <Card className="border-slate-200 overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="aspect-[2/3] overflow-hidden bg-slate-100">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3 space-y-2">
        <h4 className="font-bold text-purple-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {themes.map((theme, idx) => (
            <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700 bg-purple-50">
              {theme}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ModuleContentProps {
  module: Omit<Module, 'icon'>;
  objectives?: any;
}

export default function ModuleContent({ module, objectives }: ModuleContentProps) {
  const [isMarkedComplete, setIsMarkedComplete] = useState(module.progress === 100);
  const db = useFirestore();

  // Fetch dynamic resources from Firestore (simplified for debugging)
  const resourcesQuery = useMemoFirebase(() => {
    return collection(db, 'resources');
  }, [db]);

  const { data: dynamicResources, isLoading: isLoadingResources } = useCollection<any>(resourcesQuery);

  // Merge static and dynamic resources
  const allResources = useMemo(() => {
    const staticResources: Resource[] = module.resources || [];
    const formattedDynamicResources: Resource[] = (dynamicResources || []).map(res => ({
      title: res.title,
      file: res.url, // Using url as file for compatibility with ResourceList
    }));
    return [...staticResources, ...formattedDynamicResources];
  }, [module.resources, dynamicResources]);

  // Generate context from dynamic resources for RAG
  const resourcesContext = useMemo(() => {
    if (!dynamicResources || dynamicResources.length === 0) return '';
    return dynamicResources
      .map(res => `Recurso: ${res.title}. Descripción: ${res.description || 'Sin descripción'}. Tipo: ${res.type}`)
      .join('\n');
  }, [dynamicResources]);

  return (
    <div className="space-y-6">
      {/* Completion button */}
      <div className="flex justify-end">
        <Button
          variant={isMarkedComplete ? 'outline' : 'default'}
          size="sm"
          onClick={() => setIsMarkedComplete(!isMarkedComplete)}
          className={isMarkedComplete ? 'border-green-500 text-green-600 hover:bg-green-50' : ''}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          {isMarkedComplete ? 'Módulo completado ✓' : 'Marcar como completado'}
        </Button>
      </div>

      {objectives && (
        <LearningObjectives objectives={objectives.objectives} />
      )}

      {/* Deberes de Fin de Semana - Solo en Módulo 1 */}
      {module.slug === 'introduccion-ia' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y IA"
          description="Películas recomendadas para reflexionar sobre el futuro de la IA"
          icon={<Film className="h-5 w-5 text-purple-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MovieCard
              title="Her (2013)"
              description="Un hombre solitario se enamora de una IA con voz femenina. Explora la relación entre humanos e IA, el amor y la soledad en la era digital."
              poster="https://pics.filmaffinity.com/her-716403893-mmed.jpg"
              themes={['IA emocional', 'Relaciones humano-IA', 'Soledad digital']}
            />
            <MovieCard
              title="I, Robot - Yo, Robot (2004)"
              description="En 2035, un detective investiga un crimen que podría haber sido cometido por un robot. Basado en Asimov, explora las Tres Leyes de la Robótica."
              poster="https://pics.filmaffinity.com/i_robot-964272233-mmed.jpg"
              themes={['Tres Leyes de la Robótica', 'Ética de la IA', 'Conciencia artificial']}
            />
            <MovieCard
              title="Bicentennial Man - El Hombre Bicentenario (1999)"
              description="Un robot con capacidad de sentir emociones lucha por ser reconocido como humano a lo largo de 200 años. Una reflexión sobre humanidad y conciencia."
              poster="https://pics.filmaffinity.com/bicentennial_man-582339231-mmed.jpg"
              themes={['Humanidad vs Artificialidad', 'Evolución de la IA', 'Derechos de los robots']}
            />
            <MovieCard
              title="The Imitation Game - Descifrando Enigma (2014)"
              description="La historia de Alan Turing, el matemático que descifró el código Enigma nazi durante la Segunda Guerra Mundial y sentó las bases de la computación moderna."
              poster="https://pics.filmaffinity.com/the_imitation_game-824166913-mmed.jpg"
              themes={['Alan Turing', 'Criptografía', 'Orígenes de la computación', 'IA simbólica']}
            />
          </div>
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              💡 <strong>Actividad:</strong> Después de ver cada película, piensa en cómo se relaciona con los conceptos de IA que hemos aprendido en el módulo.
              ¿Son realistas las representaciones? ¿Qué aspectos éticos plantean?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 2 (LLMs) */}
      {module.slug === 'llms-generativa' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y IA"
          description="Películas recomendadas para reflexionar sobre LLMs y conciencia artificial"
          icon={<Film className="h-5 w-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Juegos de Guerra / WarGames (1983)"
              description="Un joven hacker accede por error a una supercomputadora militar con IA que está aprendiendo sola. La IA comienza una simulación de guerra nuclear que podría desencadenar un conflicto real. Una película visionaria sobre IA, aprendizaje automático y los peligros de delegar decisiones críticas a máquinas."
              poster="https://pics.filmaffinity.com/wargames_war_games-169101753-large.jpg"
              themes={['IA Militar', 'Aprendizaje Automático', 'Ética', 'Toma de Decisiones']}
            />
            <MovieCard
              title="Transcendence (2014)"
              description="Un investigador de IA es envenenado y su conciencia es subida a una computadora cuántica. A medida que la IA evoluciona, surgen preguntas sobre conciencia, ética tecnológica y los límites de la IA."
              poster="https://pics.filmaffinity.com/transcendence-787338727-mmed.jpg"
              themes={['Conciencia IA', 'Ética', 'IA cuántica', 'Singularity']}
            />
            <MovieCard
              title="Ex Machina (2014)"
              description="Un programador es seleccionado para evaluar el comportamiento de un robot con IA avanzado. Un thriller psicológico sobre el Test de Turing y la manipulación."
              poster="https://pics.filmaffinity.com/ex_machina-368494509-mmed.jpg"
              themes={['Test de Turing', 'Manipulación', 'Conciencia', 'Ética IA']}
            />
            <MovieCard
              title="Atlas (2024)"
              description="Una brillante analista de datos con desconfianza hacia la IA debe confiar en un sistema de IA avanzado para cazar a un robot rebelde que una vez fue su aliado. Una aventura de ciencia ficción sobre la relación humano-IA en un futuro donde los mechas y la inteligencia artificial dominan el campo de batalla."
              poster="https://pics.filmaffinity.com/atlas-570877983-mmed.jpg"
              themes={['IA Militar', 'Confianza', 'Mecha', 'Futuro']}
            />
            <MovieCard
              title="A.I. Inteligencia Artificial (2001)"
              description="En un futuro donde el calentamiento global ha derretido los polos, un niño robot programado para amar es abandonado por sus dueños. Una obra maestra de Spielberg sobre la conciencia artificial, el amor y lo que significa ser humano."
              poster="https://pics.filmaffinity.com/a_i_artificial_intelligence-535598622-mmed.jpg"
              themes={['Conciencia IA', 'Amor', 'Humanidad', 'Ética']}
            />
          </div>
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-800">
              💡 <strong>Actividad para el Lunes:</strong> 
              (1) Ver al menos una película antes del lunes, 
              (2) Tomar notas sobre aspectos éticos, 
              (3) Preparar 2-3 preguntas para debatir en clase,
              (4) Pensar: ¿Es realista lo que muestra la película con la tecnología actual de LLMs?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 3 (Avatares Virtuales) */}
      {module.slug === 'avatares-virtuales' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y Avatares"
          description="Películas recomendadas para reflexionar sobre avatares virtuales e identidad digital"
          icon={<Film className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Los Sustitutos / Surrogates (2009)"
              description="En un futuro donde las personas viven aisladas en sus hogares pero se relacionan a través de avatares robóticos perfectos que interactúan en el mundo real. Cuando un agente investiga un asesinato, descubre una conspiración que amenaza la distinción entre humanos y sus sustitutos. Una película visionaria sobre avatares, identidad digital y las consecuencias de delegar nuestra presencia física en representaciones virtuales."
              poster="https://pics.filmaffinity.com/surrogates-502617815-mmed.jpg"
              themes={['Avatares', 'Identidad Digital', 'Futuro', 'Ética IA']}
            />
            <MovieCard
              title="Ready Player One (2018)"
              description="En un futuro distópico de 2045, la humanidad escapa de la realidad refugiándose en OASIS, un universo de realidad virtual masivo. Cuando el excéntrico creador de OASIS muere, deja un concurso: quien encuentre el 'Huevo de Pascua' oculto en el juego heredará su fortuna y el control del universo virtual. Una aventura épica sobre avatares, mundos virtuales y la línea entre realidad y ficción digital."
              poster="https://pics.filmaffinity.com/ready_player_one-508487059-mmed.jpg"
              themes={['Metaverso', 'Avatares', 'Realidad Virtual', 'Mundos Virtuales']}
            />
            <MovieCard
              title="Upload (Serie - 2020)"
              description="En un futuro donde la conciencia humana puede ser 'subida' a un más allá digital después de la muerte, una joven investigadora ayuda a los residentes de un lujoso cielo virtual a adaptarse a su nueva existencia como avatares digitales. Una comedia de ciencia ficción que explora la vida después de la muerte digital, la identidad consciente y las implicaciones éticas de la inmortalidad virtual."
              poster="https://pics.filmaffinity.com/upload-296365789-mmed.jpg"
              themes={['Conciencia Digital', 'Avatares', 'Más Allá Virtual', 'Ética IA']}
            />
            <MovieCard
              title="S1m0ne / Simone (2002)"
              description="Un director de cine en decadencia crea una actriz virtual perfecta llamada Simone usando un software avanzado. Cuando la película se estrena, nadie sabe que la actriz no existe realmente. Una sátira brillante sobre la fama, los medios, la manipulación digital y cómo la industria del entretenimiento puede ser engañada por una creación virtual. Una visión profética de 2002 sobre los avatares e influencers virtuales."
              poster="https://pics.filmaffinity.com/simone-340232754-mmed.jpg"
              themes={['Actores Virtuales', 'Manipulación Mediática', 'Fama Digital', 'Ética IA']}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver al menos una película o 2-3 episodios de la serie antes del lunes,
              (2) Tomar notas sobre cómo se representan los avatares y la conciencia digital,
              (3) Preparar 2-3 preguntas para debatir: ¿Qué diferencias hay entre los avatares de la ficción y los actuales?,
              (4) Reflexionar: ¿Sería ético 'subir' nuestra conciencia a un entorno virtual?
            </p>
          </div>
        </CollapsibleSection>
      )}

      <Tabs defaultValue="content" className="w-full">
        <TabsList className={`grid w-full ${
          module.slug === 'avatares-virtuales' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' : 
          module.slug === 'bots-asistentes' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' :
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        } h-auto p-1`}>
          <TabsTrigger value="content" className="flex items-center gap-2 py-2.5">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contenido</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2 py-2.5">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Recursos</span>
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center gap-2 py-2.5">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Herramientas IA</span>
          </TabsTrigger>
          {module.slug === 'avatares-virtuales' && (
            <TabsTrigger value="practice-lab" className="flex items-center gap-2 py-2.5">
              <Beaker className="h-4 w-4" />
              <span className="hidden sm:inline">Laboratorio</span>
            </TabsTrigger>
          )}
          {module.slug === 'avatares-virtuales' && (
            <TabsTrigger value="sound-exercises" className="flex items-center gap-2 py-2.5">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Ejercicios Avatar</span>
            </TabsTrigger>
          )}
          {module.slug === 'llms-generativa' && (
            <TabsTrigger value="sound-exercises" className="flex items-center gap-2 py-2.5">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Ejercicios Sonido</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="games" className="flex items-center gap-2 py-2.5">
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Juegos y Enlaces</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <ModuleContentAccordion
                htmlContent={module.content}
                moduleSlug={module.slug}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          {isLoadingResources ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            </div>
          ) : (
            <div className="space-y-6">
              <ResourceList resources={allResources} />

              {/* Resumen Ejecutivo del Módulo 3 - Solo para Avatares Virtuales */}
              {module.slug === 'avatares-virtuales' && (
                <Module3Summary />
              )}

              {/* Sección de Videos - Solo en Módulo 1 */}
              {module.slug === 'introduccion-ia' && (
                <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-red-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-red-900">🎬 Videos Recomendados</CardTitle>
                        <p className="text-sm text-red-700">Contenido audiovisual para complementar tu aprendizaje</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Video 1 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/Q6BclIP5QBQ?start=421"
                            title="Video 1: Introducción a la IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 Introducción a la Inteligencia Artificial
                        </p>
                      </div>

                      {/* Video 2 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/5MWT_doo68k?start=17"
                            title="Video 2: Aplicaciones de la IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 Aplicaciones Prácticas de la IA
                        </p>
                      </div>
                    </div>

                    {/* Fila de videos adicionales */}
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {/* Video 3 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/IY1WXMOJMVw"
                            title="Video 3: IA y Automatización"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 IA y Automatización en la Industria
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-red-600 text-center">
                      💡 Consejo: Los videos comienzan en el punto exacto recomendado para este módulo.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Videos - Módulo 2 (LLMs) */}
              {module.slug === 'llms-generativa' && (
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-purple-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-purple-900">🎬 Videos Recomendados - LLMs</CardTitle>
                        <p className="text-sm text-purple-700">Videos sobre Modelos de Lenguaje y Prompt Engineering</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Video 1: LLMs explicados */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/Sz4qacFBHLk"
                            title="Video 1: LLMs explicados"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 ¿Qué son los LLMs?
                        </p>
                      </div>

                      {/* Video 2: Prompt Engineering */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/x-iTco25VGI"
                            title="Video 2: Prompt Engineering"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Prompt Engineering básico
                        </p>
                      </div>

                      {/* Video 3: Aplicaciones de IA */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/OCdIvYcH3Gc"
                            title="Video 3: Aplicaciones de IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Aplicaciones prácticas de IA
                        </p>
                      </div>

                      {/* Video 4: Google Cloud LLMs */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/GjvgtwSOCao"
                            title="Video 4: Google Cloud LLMs"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 LLMs en Google Cloud
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 text-center">
                      💡 Consejo: Toma notas mientras ves los videos. Hay conceptos clave que usarás en las prácticas.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Videos Recomendados - Módulo 4 (Bots y Asistentes) */}
              {module.slug === 'bots-asistentes' && (
                <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-cyan-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-cyan-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-cyan-900">🎬 Videos Recomendados - Bots y Asistentes</CardTitle>
                        <p className="text-sm text-cyan-700">Videos sobre Chatbots, NLP y Diseño Conversacional</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Video 1: Cómo funcionan los chatbots */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/gXj55zpRoUE"
                            title="Video 1: Cómo funcionan los chatbots"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 ¿Cómo funcionan los Chatbots?
                        </p>
                      </div>

                      {/* Video 2: Dialogflow Tutorial */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/5MWT_doo68k"
                            title="Video 2: Dialogflow Tutorial"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Dialogflow para Principiantes
                        </p>
                      </div>

                      {/* Video 3: Diseño Conversacional */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/1vI5n9Y0kXg"
                            title="Video 3: Diseño Conversacional"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Diseño de Conversaciones para Chatbots
                        </p>
                      </div>

                      {/* Video 4: Ética en IA Conversacional */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/OCdIvYcH3Gc"
                            title="Video 4: Ética en IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Ética en Asistentes Virtuales
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-cyan-600 text-center">
                      💡 Consejo: Toma notas mientras ves los videos. Hay conceptos clave que usarás en las prácticas de diseño de flujos.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Drones e IA - Módulo 3 (Avatares Virtuales) - Contenido COMPLETO */}
              {module.slug === 'avatares-virtuales' && (
                <DronesGuide />
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai-tools" className="mt-4">
          <Card className="border-border/60 overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="summarizer" orientation="vertical" className="flex flex-col md:flex-row min-h-[400px]">
                <div className="w-full md:w-56 border-b md:border-b-0 md:border-r bg-muted/30">
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">Herramientas</p>
                    <TabsList className="flex flex-row md:flex-col w-full h-auto bg-transparent gap-1 p-0">
                      <TabsTrigger value="summarizer" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Sparkles className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Resumen con IA</span>
                      </TabsTrigger>
                      <TabsTrigger value="assistant" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Bot className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Asistente de Dudas</span>
                      </TabsTrigger>
                      <TabsTrigger value="image-generator" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <ImageIcon className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Crear Imágenes</span>
                      </TabsTrigger>
                      {module.slug === 'creacion-avatares-virtuales' && (
                        <TabsTrigger value="avatar-creator" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <UserRoundCog className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">Crear Avatar</span>
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <TabsContent value="summarizer" className="mt-0">
                    <AISummarizer content={module.content} />
                  </TabsContent>
                  <TabsContent value="assistant" className="mt-0">
                    <AIAssistant
                      courseContent={module.content}
                      moduleSlug={module.slug}
                      additionalContext={resourcesContext}
                    />
                  </TabsContent>
                  <TabsContent value="image-generator" className="mt-0">
                    <AIImageGenerator />
                  </TabsContent>
                  {module.slug === 'creacion-avatares-virtuales' && (
                    <TabsContent value="avatar-creator" className="mt-0">
                      <AvatarCreator />
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice-lab" className="mt-4">
          <PracticeLab />
        </TabsContent>

        <TabsContent value="sound-exercises" className="mt-4">
          {module.slug === 'avatares-virtuales' ? (
            <AvatarExercises />
          ) : module.slug === 'llms-generativa' ? (
            <SoundAIExercises />
          ) : null}
        </TabsContent>

        <TabsContent value="games" className="mt-4">
          <GamesSection moduleSlug={module.slug} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
