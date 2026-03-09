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
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog, CheckCircle, CheckCircle2, Loader2, Gamepad2, BookOpen, FileText as FileTextIcon, ChevronDown, ChevronUp, Film } from 'lucide-react';
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

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
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
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Video 1: How LLMs Work - Dot CSV (español) */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/ZYlZaRKeSCA"
                            title="Video 1: Cómo funcionan los LLMs"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 ¿Cómo Funcionan los Modelos de Lenguaje? (Dot CSV)
                        </p>
                      </div>

                      {/* Video 2: Prompt Engineering */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/8tFMX7cZBdU"
                            title="Video 2: Prompt Engineering Guide"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Guía Completa de Prompt Engineering
                        </p>
                      </div>
                    </div>

                    {/* Fila de videos adicionales */}
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {/* Video 3: GPT-4 vs Claude vs Gemini */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/MLqMqZ2Z8qE"
                            title="Video 3: Comparativa de LLMs"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 GPT-4 vs Claude vs Gemini: ¿Cuál es Mejor?
                        </p>
                      </div>

                      {/* Video 4: Aplicaciones de LLMs en Empresa */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/nvqH5V4SqOw"
                            title="Video 4: Aplicaciones de LLMs"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Aplicaciones Empresariales de la IA Generativa
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 text-center">
                      💡 Consejo: Toma notas mientras ves los videos. Hay conceptos clave que usarás en las prácticas.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Deberes de Fin de Semana */}
              {module.slug === 'llms-generativa' && (
                <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 mt-6">
                  <CardHeader className="pb-3 border-b border-indigo-200/50">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Film className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-indigo-900">📚 Deberes de Fin de Semana</CardTitle>
                        <p className="text-sm text-indigo-700">
                          Películas, documentales y actividades para reforzar lo aprendido
                        </p>
                      </div>
                      <Badge variant="outline" className="border-indigo-300 text-indigo-700 bg-indigo-100/50">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Módulo 2
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {/* Película: Transcendence */}
                      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="grid md:grid-cols-3 gap-4 p-4">
                            {/* Poster de la película */}
                            <div className="md:col-span-1">
                              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg mx-auto max-w-[200px]">
                                <img
                                  src="https://pics.filmaffinity.com/transcendence-787338727-mmed.jpg"
                                  alt="Transcendence (2014) - Poster"
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </div>

                            {/* Información de la película */}
                            <div className="md:col-span-2 space-y-3">
                              <div>
                                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                  🎬 Transcendence (2014)
                                  <Badge className="bg-purple-500 text-white text-xs">IA y Conciencia</Badge>
                                </h4>
                                <p className="text-sm text-slate-600 mt-1">
                                  Dirigida por Wally Pfister | Protagonizada por Johnny Depp, Rebecca Hall, Paul Bettany
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="border-indigo-300 text-indigo-700">Ciencia Ficción</Badge>
                                <Badge variant="outline" className="border-indigo-300 text-indigo-700">Thriller</Badge>
                                <Badge variant="outline" className="border-indigo-300 text-indigo-700">2h 59min</Badge>
                                <Badge variant="outline" className="border-indigo-300 text-indigo-700">IMDb: 6.2/10</Badge>
                              </div>

                              <div className="space-y-2">
                                <h5 className="text-sm font-semibold text-indigo-900">📖 Sinopsis:</h5>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                  Un investigador de inteligencia artificial es envenenado por radicales anti-tecnología. 
                                  Antes de morir, su esposa sube su conciencia a una computadora cuántica, permitiéndole 
                                  seguir vivo en forma digital. A medida que la IA evoluciona y se vuelve más poderosa, 
                                  surgen preguntas sobre la naturaleza de la conciencia, los límites de la tecnología 
                                  y las consecuencias de jugar a ser Dios.
                                </p>
                              </div>

                              <div className="space-y-2">
                                <h5 className="text-sm font-semibold text-indigo-900">🎯 Relación con el Módulo 2:</h5>
                                <ul className="text-sm text-slate-700 space-y-1 ml-4">
                                  <li>• <strong>LLMs y conciencia:</strong> ¿Puede una IA desarrollar verdadera conciencia?</li>
                                  <li>• <strong>Ética de la IA:</strong> Límites éticos en el desarrollo de IA avanzada</li>
                                  <li>• <strong>IA Generativa:</strong> ¿Hasta dónde puede llegar la generación de contenido y decisiones autónomas?</li>
                                  <li>• <strong>Debate en clase:</strong> Preparar argumentos sobre los riesgos y beneficios de la IA</li>
                                </ul>
                              </div>

                              <div className="flex gap-2 pt-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                                  onClick={() => window.open('https://www.filmaffinity.com/es/film787338.html', '_blank')}
                                >
                                  <Film className="h-3 w-3 mr-1" />
                                  Ver en Filmaffinity
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                                  onClick={() => window.open('https://www.youtube.com/results?search_query=transcendence+2014+trailer', '_blank')}
                                >
                                  <Film className="h-3 w-3 mr-1" />
                                  Ver Trailer
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Instrucciones para los alumnos */}
                          <div className="bg-indigo-100/50 border-t border-indigo-200 p-4">
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">📝</span>
                              </div>
                              <div className="space-y-2 flex-1">
                                <h5 className="text-sm font-bold text-indigo-900">Instrucciones para el Lunes:</h5>
                                <ol className="text-sm text-indigo-800 space-y-1 list-decimal list-inside">
                                  <li>Ver la película completa antes del lunes</li>
                                  <li>Tomar notas sobre los aspectos éticos que aparecen</li>
                                  <li>Preparar 2-3 preguntas para debatir en clase</li>
                                  <li>Pensar: ¿Es realista lo que muestra la película? ¿Por qué sí/no?</li>
                                </ol>
                                <p className="text-xs text-indigo-600 mt-2 italic">
                                  💡 El lunes dedicaremos los primeros 30 minutos a debatir sobre la película y su relación con los LLMs actuales.
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Próximamente más contenido */}
                      <Card className="border-dashed border-slate-300 bg-slate-50">
                        <CardContent className="p-6 text-center">
                          <Film className="h-10 w-10 mx-auto mb-3 text-slate-400 opacity-50" />
                          <p className="text-sm font-semibold text-slate-700">🚧 Más películas y documentales próximamente</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Cada fin de semana añadiremos nuevo contenido audiovisual relacionado con el módulo.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
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

        <TabsContent value="games" className="mt-4">
          <GamesSection moduleSlug={module.slug} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
