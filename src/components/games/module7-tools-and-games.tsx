'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, Search, Lock, Scale, Trophy, ExternalLink, BookOpen, Brain } from 'lucide-react';

import Module7BiasDetective from './module7-bias-detective';
import Module7GDPRRightsGame from './module7-gdpr-rights-game';
import Module7AIActClassifier from './module7-ai-act-classifier';
import Module7ExamQuiz from './module7-exam-quiz';
import Module7EthicalDilemmas from './module7-ethical-dilemmas';

export default function Module7ToolsAndGames() {
  const [activeTab, setActiveTab] = useState('bias');

  const tools = [
    { id: 'bias', name: 'Detective de Sesgos', description: 'Analiza escenarios reales de sesgo algorítmico', icon: Search, badge: 'Juego' },
    { id: 'gdpr', name: 'Derechos GDPR', description: 'Identifica qué derecho aplica en cada caso', icon: Lock, badge: 'Juego' },
    { id: 'ai-act', name: 'Clasificador AI Act', description: 'Clasifica sistemas IA por nivel de riesgo', icon: Scale, badge: 'Juego' },
    { id: 'dilemmas', name: 'Dilemas Éticos', description: 'Toma decisiones éticas en casos de negocio', icon: ShieldCheck, badge: 'Juego' },
    { id: 'exam', name: 'Test del Módulo 7', description: '20 preguntas sobre ética, GDPR y AI Act', icon: Trophy, badge: 'Test' },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-emerald-900">Juegos y Herramientas - Módulo 7</CardTitle>
              <p className="text-sm text-emerald-700">Ética, Privacidad y Legislación en IA</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-transparent">
              {tools.map(tool => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900 rounded-lg border border-emerald-200"
                >
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tool.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="bias" className="mt-4">
              <Module7BiasDetective />
            </TabsContent>
            <TabsContent value="gdpr" className="mt-4">
              <Module7GDPRRightsGame />
            </TabsContent>
            <TabsContent value="ai-act" className="mt-4">
              <Module7AIActClassifier />
            </TabsContent>
            <TabsContent value="dilemmas" className="mt-4">
              <Module7EthicalDilemmas />
            </TabsContent>
            <TabsContent value="exam" className="mt-4">
              <Module7ExamQuiz />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
