'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Plus, X, Shuffle, Trash2, Sparkles, Download,
  CheckCircle2, AlertCircle, RotateCcw, ChevronRight,
  Zap, ArrowRight, GitBranch, Filter, Webhook
} from 'lucide-react';

interface ScenarioModule {
  id: string;
  type: 'trigger' | 'action' | 'filter' | 'router' | 'iterator' | 'aggregator' | 'ai' | 'error';
  name: string;
  icon: string;
  description: string;
}

interface PlacedModule {
  id: string;
  moduleId: string;
  step: number;
}

const AVAILABLE_MODULES: ScenarioModule[] = [
  { id: 'webhook', type: 'trigger', name: 'Webhook', icon: '🔗', description: 'Trigger instantáneo vía HTTP' },
  { id: 'email-trigger', type: 'trigger', name: 'Nuevo Email', icon: '📧', description: 'Trigger al recibir email' },
  { id: 'form-trigger', type: 'trigger', name: 'Formulario', icon: '📋', description: 'Trigger al enviar formulario' },
  { id: 'shopify-trigger', type: 'trigger', name: 'Nuevo Pedido', icon: '🛒', description: 'Trigger nuevo pedido Shopify' },
  { id: 'create-record', type: 'action', name: 'Crear Registro', icon: '➕', description: 'Crear registro en base de datos' },
  { id: 'send-email', type: 'action', name: 'Enviar Email', icon: '📤', description: 'Enviar email automático' },
  { id: 'slack-notify', type: 'action', name: 'Notificar Slack', icon: '💬', description: 'Enviar mensaje a Slack' },
  { id: 'create-crm', type: 'action', name: 'Crear en CRM', icon: '📊', description: 'Crear contacto en CRM' },
  { id: 'openai-analyze', type: 'ai', name: 'Analizar con IA', icon: '🧠', description: 'Analizar texto con OpenAI' },
  { id: 'openai-summarize', type: 'ai', name: 'Resumir con IA', icon: '📝', description: 'Resumir documento con IA' },
  { id: 'openai-classify', type: 'ai', name: 'Clasificar con IA', icon: '🏷️', description: 'Clasificar contenido con IA' },
  { id: 'filter', type: 'filter', name: 'Filtro', icon: '🔍', description: 'Condición para continuar' },
  { id: 'router', type: 'router', name: 'Router', icon: '🔀', description: 'Dividir en múltiples caminos' },
  { id: 'iterator', type: 'iterator', name: 'Iterator', icon: '🔄', description: 'Procesar elementos uno a uno' },
  { id: 'error-handler', type: 'error', name: 'Manejo de Error', icon: '⚠️', description: 'Directiva de manejo de errores' },
];

const SCENARIOS = [
  {
    id: 'leads',
    title: 'Automatización de Leads',
    description: 'Nuevo lead en Facebook Ads → Añadir a Google Sheets → Email bienvenida → Crear en CRM → Notificar equipo',
    correctOrder: ['form-trigger', 'create-record', 'send-email', 'create-crm', 'slack-notify'],
  },
  {
    id: 'tickets',
    title: 'Clasificación de Tickets con IA',
    description: 'Nuevo ticket → Analizar con IA → Router por categoría → Asignar equipo → Notificar',
    correctOrder: ['email-trigger', 'openai-classify', 'router', 'create-record', 'slack-notify'],
  },
  {
    id: 'orders',
    title: 'Procesamiento de Pedidos',
    description: 'Nuevo pedido Shopify → Verificar stock → Si hay stock crear envío → Confirmar cliente → Notificar',
    correctOrder: ['shopify-trigger', 'create-record', 'filter', 'send-email', 'slack-notify'],
  },
  {
    id: 'meetings',
    title: 'Resumen de Reuniones',
    description: 'Nueva grabación Zoom → Transcribir con Whisper → Resumir con IA → Enviar email → Crear tareas',
    correctOrder: ['webhook', 'openai-summarize', 'openai-analyze', 'send-email', 'create-record'],
  },
];

export default function MakeScenarioBuilder() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [placedModules, setPlacedModules] = useState<PlacedModule[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const scenario = SCENARIOS[currentScenario];
  const totalSteps = scenario.correctOrder.length;
  const progressPercent = (placedModules.length / totalSteps) * 100;

  const addModule = useCallback((moduleId: string) => {
    if (placedModules.length >= totalSteps) return;
    setPlacedModules(prev => [...prev, { id: `placed-${Date.now()}`, moduleId, step: prev.length }]);
    setSelectedModule(null);
  }, [placedModules.length, totalSteps]);

  const removeModule = useCallback((index: number) => {
    setPlacedModules(prev => prev.filter((_, i) => i !== index));
  }, []);

  const checkSolution = useCallback(() => {
    if (placedModules.length !== totalSteps) return;
    const isCorrect = placedModules.every((pm, i) => pm.moduleId === scenario.correctOrder[i]);
    if (isCorrect) setScore(prev => prev + 25);
    setShowResult(true);
  }, [placedModules, totalSteps, scenario]);

  const nextScenario = useCallback(() => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setPlacedModules([]);
      setShowResult(false);
      setSelectedModule(null);
    }
  }, [currentScenario]);

  const resetScenario = useCallback(() => {
    setPlacedModules([]);
    setShowResult(false);
    setSelectedModule(null);
  }, []);

  const getModuleInfo = (moduleId: string) => AVAILABLE_MODULES.find(m => m.id === moduleId);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-lg">
            <GitBranch className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Make Scenario Builder</h1>
            <p className="text-sm text-slate-600">Construye flujos de automatización arrastrando los módulos correctos en orden</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200"><Zap className="h-3 w-3 mr-1" /><strong>{score}</strong> <span className="ml-1">puntos</span></Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Escenario {currentScenario + 1} de {SCENARIOS.length}</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-orange-900">{scenario.title}</h3>
              <p className="text-sm text-orange-700">{scenario.description}</p>
            </div>
            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 border-orange-200">{totalSteps} módulos</Badge>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Módulos colocados: {placedModules.length}/{totalSteps}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Placed Modules Flow */}
          <div className="flex flex-wrap items-center gap-2 min-h-[60px] p-3 rounded-xl bg-white border-2 border-dashed border-orange-200">
            {placedModules.length === 0 ? (
              <p className="text-xs text-slate-400 w-full text-center">Selecciona módulos de abajo para construir el escenario...</p>
            ) : (
              placedModules.map((pm, i) => {
                const mod = getModuleInfo(pm.moduleId);
                return (
                  <div key={pm.id} className="flex items-center gap-1">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-200 text-xs">
                      <span className="text-lg">{mod?.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{mod?.name}</p>
                        <p className="text-[9px] text-slate-500">{mod?.description}</p>
                      </div>
                      <button onClick={() => removeModule(i)} className="text-red-400 hover:text-red-600 ml-1"><X className="h-3 w-3" /></button>
                    </div>
                    {i < placedModules.length - 1 && <ArrowRight className="h-4 w-4 text-orange-400" />}
                  </div>
                );
              })
            )}
          </div>

          {/* Available Modules */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Webhook className="h-4 w-4" /> Módulos disponibles</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {AVAILABLE_MODULES.map(mod => {
                const isUsed = placedModules.some(pm => pm.moduleId === mod.id);
                const typeColors: Record<string, string> = {
                  trigger: 'bg-green-50 border-green-200 text-green-800',
                  action: 'bg-blue-50 border-blue-200 text-blue-800',
                  ai: 'bg-purple-50 border-purple-200 text-purple-800',
                  filter: 'bg-amber-50 border-amber-200 text-amber-800',
                  router: 'bg-cyan-50 border-cyan-200 text-cyan-800',
                  iterator: 'bg-pink-50 border-pink-200 text-pink-800',
                  error: 'bg-red-50 border-red-200 text-red-800',
                };
                return (
                  <button
                    key={mod.id}
                    onClick={() => !isUsed && addModule(mod.id)}
                    disabled={isUsed || placedModules.length >= totalSteps}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      isUsed ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200' :
                      placedModules.length >= totalSteps ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200' :
                      `${typeColors[mod.type]} hover:shadow-md hover:scale-105 cursor-pointer`
                    }`}
                  >
                    <span className="text-lg block">{mod.icon}</span>
                    <span className="font-semibold block mt-1">{mod.name}</span>
                    <span className="text-[9px] block mt-0.5 opacity-70">{mod.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetScenario} className="border-slate-300 text-xs"><RotateCcw className="h-3.5 w-3.5 mr-1" /> Reiniciar</Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={checkSolution} disabled={placedModules.length !== totalSteps || showResult}
                className={`rounded-full text-xs ${placedModules.length === totalSteps && !showResult ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Verificar
              </Button>
              {showResult && currentScenario < SCENARIOS.length - 1 && (
                <Button size="sm" onClick={nextScenario} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs">
                  Siguiente Escenario <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Result */}
          {showResult && (
            <div className={`p-3 rounded-xl border text-xs ${
              placedModules.every((pm, i) => pm.moduleId === scenario.correctOrder[i])
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}>
              <div className="flex items-start gap-2">
                {placedModules.every((pm, i) => pm.moduleId === scenario.correctOrder[i]) ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <strong>{placedModules.every((pm, i) => pm.moduleId === scenario.correctOrder[i]) ? '✅ ¡Perfecto!' : '❌ No es el orden correcto.'}</strong>
                  {!placedModules.every((pm, i) => pm.moduleId === scenario.correctOrder[i]) && (
                    <p className="mt-1">Orden correcto: {scenario.correctOrder.map(id => getModuleInfo(id)?.name).join(' → ')}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
