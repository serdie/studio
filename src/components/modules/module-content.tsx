'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Module, Resource } from '@/lib/data';
import ResourceList from './resource-list';
import AISummarizer from './ai-summarizer';
import AIAssistant from './ai-assistant';
import AIImageGenerator from './ai-image-generator';
import AvatarCreator from './avatar-creator';
import LearningObjectives from './learning-objectives';
import GamesSection from '@/components/games/games-section';
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog, CheckCircle, Loader2, Gamepad2, BookOpen, FileText as FileTextIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';

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
            <span className="hidden sm:inline">Juegos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          {/* Cuento para No Olvidar - Solo en Módulo 1 */}
          {module.slug === 'introduccion-ia' && (
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-amber-200 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-amber-900">📚 Cuento: El Despertar del Código</CardTitle>
                    <p className="text-sm text-amber-700">Un Viaje por la Historia de la Inteligencia Artificial</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-amber-800 text-sm">
                  Descubre la fascinante historia de la IA desde sus inicios hasta la actualidad en este cuento interactivo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => window.open('https://gemini.google.com/share/258b15141250', '_blank')}
                    className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Leer Cuento en Gemini
                  </Button>
                  <Button 
                    onClick={() => window.open('/materiales/tema1/El Despertar del Código_ Un Viaje por la Historia de la IA.pdf', '_blank')}
                    variant="outline"
                    className="border-amber-400 text-amber-700 hover:bg-amber-100 flex-1"
                  >
                    <FileTextIcon className="mr-2 h-4 w-4" />
                    Ver PDF
                  </Button>
                </div>
                <p className="text-xs text-amber-600 text-center">
                  💡 Consejo: El cuento en Gemini es interactivo. El PDF es mejor para imprimir o leer offline.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="border-border/60">
            <CardContent className="p-6 module-prose max-w-none" dangerouslySetInnerHTML={{ __html: module.content }} />
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          {isLoadingResources ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            </div>
          ) : (
            <ResourceList resources={allResources} />
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
          <GamesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
