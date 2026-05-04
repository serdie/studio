'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, ListChecks, Trophy, Presentation } from 'lucide-react';

import Module9ProjectPlanner from './module9-project-planner';
import Module9ExamQuiz from './module9-exam-quiz';
import Module9PitchSimulator from './module9-pitch-simulator';

export default function Module9ToolsAndGames() {
  const [activeTab, setActiveTab] = useState('planner');

  const tools = [
    { id: 'planner', name: 'Planificador CRISP-DM', description: 'Ordena las fases de un proyecto de IA', icon: ListChecks, badge: 'Juego' },
    { id: 'pitch', name: 'Simulador de Pitch', description: 'Vende tu proyecto de IA al CEO', icon: Presentation, badge: 'Juego' },
    { id: 'exam', name: 'Test del Módulo 9', description: '20 preguntas sobre proyectos de IA', icon: Trophy, badge: 'Test' },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-orange-900">Juegos y Herramientas - Módulo 9</CardTitle>
              <p className="text-sm text-orange-700">Proyectos Integradores de IA</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 h-auto bg-transparent">
              {tools.map(tool => (
                <TabsTrigger key={tool.id} value={tool.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 rounded-lg border border-orange-200">
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tool.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="planner" className="mt-4"><Module9ProjectPlanner /></TabsContent>
            <TabsContent value="pitch" className="mt-4"><Module9PitchSimulator /></TabsContent>
            <TabsContent value="exam" className="mt-4"><Module9ExamQuiz /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
