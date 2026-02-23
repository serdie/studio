'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Module } from '@/lib/data';
import ResourceList from './resource-list';
import AISummarizer from './ai-summarizer';
import AIAssistant from './ai-assistant';
import AIImageGenerator from './ai-image-generator';
import AvatarCreator from './avatar-creator';
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ModuleContentProps {
  module: Omit<Module, 'icon'>;
}

export default function ModuleContent({ module }: ModuleContentProps) {
  const [isMarkedComplete, setIsMarkedComplete] = useState(module.progress === 100);

  return (
    <div className="space-y-4">
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

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
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
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card className="border-border/60">
            <CardContent className="p-6 module-prose max-w-none" dangerouslySetInnerHTML={{ __html: module.content }} />
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <ResourceList resources={module.resources} />
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
                    <AIAssistant courseContent={module.content} />
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
      </Tabs>
    </div>
  );
}
