'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Building2, Trophy } from 'lucide-react';

import Module8DepartmentMatcher from './module8-department-matcher';
import Module8ExamQuiz from './module8-exam-quiz';
import Module8UseCasePrioritizer from './module8-use-case-prioritizer';

export default function Module8ToolsAndGames() {
  const [activeTab, setActiveTab] = useState('matcher');

  const tools = [
    { id: 'matcher', name: '¿Qué Departamento?', description: 'Asigna casos de uso al área correcta', icon: Building2, badge: 'Juego' },
    { id: 'prioritizer', name: 'Priorizador de IA', description: 'Matriz de Impacto vs Esfuerzo', icon: Layers, badge: 'Juego' },
    { id: 'exam', name: 'Test del Módulo 8', description: '20 preguntas sobre IA en áreas funcionales', icon: Trophy, badge: 'Test' },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-indigo-900">Juegos y Herramientas - Módulo 8</CardTitle>
              <p className="text-sm text-indigo-700">IA en las Áreas Funcionales de la Empresa</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 h-auto bg-transparent">
              {tools.map(tool => (
                <TabsTrigger key={tool.id} value={tool.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-900 rounded-lg border border-indigo-200">
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tool.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="matcher" className="mt-4"><Module8DepartmentMatcher /></TabsContent>
            <TabsContent value="prioritizer" className="mt-4"><Module8UseCasePrioritizer /></TabsContent>
            <TabsContent value="exam" className="mt-4"><Module8ExamQuiz /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
