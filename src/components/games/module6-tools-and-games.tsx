'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Users,
  CheckCircle2,
  BookOpen,
  CornerDownRight,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';

// Import all components
import MarketingPlanStudio from './marketing-plan-studio';
import Module6MarketingQuiz from './module6-marketing-quiz';
import MarketingROISimulator from './marketing-roi-simulator';
import MarketingSegmentationGame from './marketing-segmentation-game';
import MarketingChecklist from './marketing-checklist';
import MarketingCaseStudies from './marketing-case-studies';
import CompetitiveAnalysis from './competitive-analysis';

export default function Module6ToolsAndGames() {
  const [activeTab, setActiveTab] = useState('plan');
  const [expanded, setExpanded] = useState(false);

  const tools = [
    {
      id: 'plan',
      name: 'Marketing Plan Studio',
      description: 'Crea planes de marketing profesionales 360º',
      icon: Target,
      badge: 'Herramienta'
    },
    {
      id: 'quiz',
      name: 'Quiz Interactivo',
      description: 'Evalúa tus conocimientos sobre IA y marketing',
      icon: Zap,
      badge: 'Test'
    },
    {
      id: 'roi',
      name: 'Simulador de ROI',
      description: 'Calcula ROI y métricas de marketing',
      icon: TrendingUp,
      badge: 'Simulador'
    },
    {
      id: 'segmentation',
      name: 'Juego de Segmentación',
      description: 'Aprende estrategia de segmentación de mercado',
      icon: Users,
      badge: 'Juego'
    },
    {
      id: 'checklist',
      name: 'Checklist de Marketing',
      description: 'Plan ejecutivo para tu estrategia',
      icon: CheckCircle2,
      badge: 'Herramienta'
    },
    {
      id: 'cases',
      name: 'Casos de Estudio',
      description: 'Aprende de empresas líderes en marketing IA',
      icon: BookOpen,
      badge: 'Recursos'
    },
    {
      id: 'competitive',
      name: 'Análisis Competitivo',
      description: 'Mapea fortalezas y debilidades de competidores',
      icon: BarChart3,
      badge: 'Herramienta'
    }
  ];

  if (!expanded) {
    return (
      <Card className="bg-gradient-to-br from-purple-50/80 via-pink-50/50 to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-purple-200 dark:border-purple-900 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border-b border-purple-200 dark:border-purple-900 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpanded(true)}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Herramientas y Juegos del Módulo 6
              </CardTitle>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                7 herramientas interactivas para dominar Marketing con IA
              </p>
            </div>
            <CornerDownRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTab(tool.id);
                    setExpanded(true);
                  }}
                  className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-700 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{tool.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{tool.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 whitespace-nowrap">
                      {tool.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50/80 via-pink-50/50 to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-purple-200 dark:border-purple-900 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border-b border-purple-200 dark:border-purple-900 flex flex-row items-center justify-between">
        <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
          <Zap className="h-6 w-6" />
          Herramientas y Juegos del Módulo 6
        </CardTitle>
        <Button
          onClick={() => setExpanded(false)}
          variant="ghost"
          size="sm"
          className="text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900"
        >
          ✕
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6 bg-slate-200 dark:bg-slate-700 rounded-lg p-1">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs">{tool.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="plan" className="focus-visible:outline-none">
              <MarketingPlanStudio />
            </TabsContent>
            <TabsContent value="quiz" className="focus-visible:outline-none">
              <Module6MarketingQuiz />
            </TabsContent>
            <TabsContent value="roi" className="focus-visible:outline-none">
              <MarketingROISimulator />
            </TabsContent>
            <TabsContent value="segmentation" className="focus-visible:outline-none">
              <MarketingSegmentationGame />
            </TabsContent>
            <TabsContent value="checklist" className="focus-visible:outline-none">
              <MarketingChecklist />
            </TabsContent>
            <TabsContent value="cases" className="focus-visible:outline-none">
              <MarketingCaseStudies />
            </TabsContent>
            <TabsContent value="competitive" className="focus-visible:outline-none">
              <CompetitiveAnalysis />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
