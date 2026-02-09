'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import type { Module } from '@/lib/data';
import ResourceList from './resource-list';
import AISummarizer from './ai-summarizer';
import AIAssistant from './ai-assistant';
import AIImageGenerator from './ai-image-generator';
import AvatarCreator from './avatar-creator';
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog } from 'lucide-react';

interface ModuleContentProps {
  module: Module;
}

export default function ModuleContent({ module }: ModuleContentProps) {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
        <TabsTrigger value="content">
          <FileText className="mr-2 h-4 w-4" /> Contenido del Módulo
        </TabsTrigger>
        <TabsTrigger value="resources">
          <Sparkles className="mr-2 h-4 w-4" /> Recursos y Descargas
        </TabsTrigger>
        <TabsTrigger value="ai-tools">
          <Bot className="mr-2 h-4 w-4" /> Herramientas de IA
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="content">
        <Card>
          <CardContent className="p-6 prose-sm prose-p:text-muted-foreground prose-h2:font-headline dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: module.content }} />
        </Card>
      </TabsContent>
      
      <TabsContent value="resources">
        <ResourceList resources={module.resources} />
      </TabsContent>

      <TabsContent value="ai-tools">
        <Card>
          <CardContent className="p-0">
             <Tabs defaultValue="summarizer" orientation="vertical" className="flex flex-col md:flex-row">
                <TabsList className="w-full md:w-64 h-auto flex-col items-stretch justify-start rounded-r-none border-r">
                    <TabsTrigger value="summarizer" className="justify-start px-4 py-3">
                        <Sparkles className="mr-2 h-4 w-4"/> Resumen con IA
                    </TabsTrigger>
                    <TabsTrigger value="assistant" className="justify-start px-4 py-3">
                        <Bot className="mr-2 h-4 w-4"/> Asistente de Contenido
                    </TabsTrigger>
                     <TabsTrigger value="image-generator" className="justify-start px-4 py-3">
                        <ImageIcon className="mr-2 h-4 w-4"/> Generador de Imágenes
                    </TabsTrigger>
                    {module.slug === 'creacion-avatares-virtuales' && (
                        <TabsTrigger value="avatar-creator" className="justify-start px-4 py-3 text-primary">
                           <UserRoundCog className="mr-2 h-4 w-4"/> Creador de Avatares
                        </TabsTrigger>
                    )}
                </TabsList>
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
  );
}
