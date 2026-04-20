'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, DollarSign, Users, Eye, MousePointer, ShoppingCart, Target, CheckCircle2, RefreshCw } from 'lucide-react';

interface MetricData {
  name: string;
  current: number;
  projected: number;
  unit: string;
  icon: React.ReactNode;
  description: string;
}

interface OptimizationAction {
  id: string;
  name: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  category: 'acquisition' | 'conversion' | 'retention';
  description: string;
}

const initialMetrics: MetricData[] = [
  {
    name: 'Tráfico Web',
    current: 15000,
    projected: 15000,
    unit: 'visitas/mes',
    icon: <Eye className="h-5 w-5" />,
    description: 'Visitantes únicos en el sitio web'
  },
  {
    name: 'Tasa de Conversión',
    current: 2.5,
    projected: 2.5,
    unit: '%',
    icon: <MousePointer className="h-5 w-5" />,
    description: 'Porcentaje de visitantes que convierten'
  },
  {
    name: 'Valor Medio de Pedido',
    current: 85,
    projected: 85,
    unit: '€',
    icon: <ShoppingCart className="h-5 w-5" />,
    description: 'Importe medio por transacción'
  },
  {
    name: 'Coste de Adquisición',
    current: 25,
    projected: 25,
    unit: '€',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Coste medio para adquirir un cliente'
  },
  {
    name: 'Tasa de Retención',
    current: 65,
    projected: 65,
    unit: '%',
    icon: <Users className="h-5 w-5" />,
    description: 'Porcentaje de clientes recurrentes'
  },
  {
    name: 'ROI Marketing',
    current: 220,
    projected: 220,
    unit: '%',
    icon: <TrendingUp className="h-5 w-5" />,
    description: 'Retorno de inversión en marketing'
  }
];

const optimizationActions: OptimizationAction[] = [
  {
    id: 'seo-optimization',
    name: 'Optimización SEO con IA',
    impact: '+35% tráfico orgánico',
    effort: 'medium',
    category: 'acquisition',
    description: 'Usar IA para analizar palabras clave y optimizar contenido'
  },
  {
    id: 'personalization',
    name: 'Personalización de Contenido',
    impact: '+28% tasa de conversión',
    effort: 'high',
    category: 'conversion',
    description: 'Implementar recomendaciones personalizadas basadas en comportamiento'
  },
  {
    id: 'email-automation',
    name: 'Automatización de Email Marketing',
    impact: '+22% retención',
    effort: 'low',
    category: 'retention',
    description: 'Configurar flujos de email automatizados con segmentación predictiva'
  },
  {
    id: 'ad-optimization',
    name: 'Optimización de Anuncios con IA',
    impact: '+30% ROI',
    effort: 'medium',
    category: 'acquisition',
    description: 'Usar machine learning para optimizar pujas y segmentación'
  },
  {
    id: 'chatbot-implementation',
    name: 'Implementación de Chatbot IA',
    impact: '+18% conversión',
    effort: 'high',
    category: 'conversion',
    description: 'Chatbot para cualificar leads y responder preguntas 24/7'
  },
  {
    id: 'predictive-analytics',
    name: 'Análisis Predictivo',
    impact: '+25% retención',
    effort: 'high',
    category: 'retention',
    description: 'Predecir churn y tomar medidas preventivas automáticas'
  },
  {
    id: 'dynamic-pricing',
    name: 'Precios Dinámicos',
    impact: '+15% valor medio',
    effort: 'medium',
    category: 'conversion',
    description: 'Ajustar precios automáticamente según demanda y competencia'
  },
  {
    id: 'social-media-ai',
    name: 'Gestión de Redes Sociales con IA',
    impact: '+40% engagement',
    effort: 'low',
    category: 'acquisition',
    description: 'Generar y optimizar contenido automáticamente para redes sociales'
  }
];

export default function MarketingMetricsOptimizer() {
  const [metrics, setMetrics] = useState<MetricData[]>(initialMetrics);
  const [appliedActions, setAppliedActions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const applyAction = (actionId: string) => {
    if (appliedActions.includes(actionId)) return;

    const action = optimizationActions.find(a => a.id === actionId);
    if (!action) return;

    setAppliedActions(prev => [...prev, actionId]);

    // Apply metric improvements based on action
    setMetrics(prev => prev.map(metric => {
      let improvement = 0;
      
      switch (action.id) {
        case 'seo-optimization':
          if (metric.name === 'Tráfico Web') improvement = 35;
          break;
        case 'personalization':
          if (metric.name === 'Tasa de Conversión') improvement = 28;
          break;
        case 'email-automation':
          if (metric.name === 'Tasa de Retención') improvement = 22;
          break;
        case 'ad-optimization':
          if (metric.name === 'ROI Marketing') improvement = 30;
          if (metric.name === 'Coste de Adquisición') improvement = -20;
          break;
        case 'chatbot-implementation':
          if (metric.name === 'Tasa de Conversión') improvement = 18;
          break;
        case 'predictive-analytics':
          if (metric.name === 'Tasa de Retención') improvement = 25;
          break;
        case 'dynamic-pricing':
          if (metric.name === 'Valor Medio de Pedido') improvement = 15;
          break;
        case 'social-media-ai':
          if (metric.name === 'Tráfico Web') improvement = 40;
          break;
      }

      const currentValue = metric.current;
      let projectedValue = currentValue;

      if (improvement > 0) {
        projectedValue = currentValue * (1 + improvement / 100);
      } else if (improvement < 0) {
        projectedValue = currentValue * (1 + improvement / 100);
      }

      return {
        ...metric,
        projected: Math.round(projectedValue * 100) / 100
      };
    }));
  };

  const calculateOverallImprovement = () => {
    const currentRevenue = metrics[0].current * metrics[1].current / 100 * metrics[2].current;
    const projectedRevenue = metrics[0].projected * metrics[1].projected / 100 * metrics[2].projected;
    return ((projectedRevenue - currentRevenue) / currentRevenue * 100).toFixed(1);
  };

  const resetOptimizer = () => {
    setMetrics(initialMetrics);
    setAppliedActions([]);
    setShowResults(false);
  };

  const generateReport = () => {
    setShowResults(true);
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'acquisition': return <Users className="h-4 w-4" />;
      case 'conversion': return <MousePointer className="h-4 w-4" />;
      case 'retention': return <Target className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const overallImprovement = calculateOverallImprovement();

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <BarChart3 className="h-6 w-6" />
            Optimizador de Métricas de Marketing con IA
          </CardTitle>
          <p className="text-purple-700">
            Aplica acciones de optimización para mejorar tus KPIs de marketing
          </p>
        </CardHeader>
        <CardContent>
          {/* Current Metrics */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-800">Métricas Actuales vs Proyectadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric, index) => {
                const improvement = ((metric.projected - metric.current) / metric.current * 100).toFixed(1);
                const hasImprovement = parseFloat(improvement) !== 0;
                
                return (
                  <Card key={index} className="border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          {metric.icon}
                        </div>
                        <h4 className="font-semibold text-sm text-purple-900">{metric.name}</h4>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Actual:</span>
                          <span className="font-medium">{metric.current}{metric.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Proyectado:</span>
                          <span className={`font-medium ${hasImprovement ? 'text-green-600' : ''}`}>
                            {metric.projected}{metric.unit}
                          </span>
                        </div>
                        {hasImprovement && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mejora:</span>
                            <span className={`font-medium ${parseFloat(improvement) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {parseFloat(improvement) > 0 ? '+' : ''}{improvement}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Progress 
                        value={Math.min(Math.abs(parseFloat(improvement)) * 2, 100)} 
                        className="mt-2 h-2" 
                      />
                      
                      <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Optimization Actions */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-800">Acciones de Optimización con IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {optimizationActions.map((action) => {
                const isApplied = appliedActions.includes(action.id);
                
                return (
                  <Card 
                    key={action.id}
                    className={`cursor-pointer transition-all border-2 ${
                      isApplied 
                        ? 'border-green-400 bg-green-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => !isApplied && applyAction(action.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm">{action.name}</h4>
                          <div className="flex items-center gap-2">
                            {isApplied && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                            <Badge className="text-xs bg-green-100 text-green-800">
                              {action.impact}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-600">{action.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(action.category)}
                            <Badge variant="outline" className="text-xs">
                              {action.category === 'acquisition' ? 'Adquisición' :
                               action.category === 'conversion' ? 'Conversión' : 'Retención'}
                            </Badge>
                          </div>
                          <Badge className={`text-xs ${getEffortColor(action.effort)}`}>
                            {action.effort === 'low' ? 'Bajo' :
                             action.effort === 'medium' ? 'Medio' : 'Alto'} esfuerzo
                          </Badge>
                        </div>
                        
                        {!isApplied && (
                          <Button size="sm" variant="outline" className="w-full mt-2">
                            Aplicar Acción
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Overall Improvement */}
          {appliedActions.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mb-6">
              <h4 className="font-semibold text-green-900 mb-3">Resumen de Optimización</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Acciones aplicadas:</span>
                  <p className="font-semibold text-lg">{appliedActions.length}</p>
                </div>
                <div>
                  <span className="text-gray-600">Mejora general estimada:</span>
                  <p className="font-semibold text-lg text-green-600">+{overallImprovement}%</p>
                </div>
                <div>
                  <span className="text-gray-600">ROI optimizado:</span>
                  <p className="font-semibold text-lg text-green-600">{metrics[5].projected}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {appliedActions.length > 0 && !showResults && (
              <Button 
                onClick={generateReport}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Generar Informe Completo
              </Button>
            )}
            <Button onClick={resetOptimizer} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reiniciar Optimización
            </Button>
          </div>

          {/* Detailed Results */}
          {showResults && (
            <div className="mt-6 space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900">Informe de Optimización de Marketing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-green-800 mb-2">Acciones Implementadas:</h5>
                      <ul className="space-y-1">
                        {appliedActions.map(actionId => {
                          const action = optimizationActions.find(a => a.id === actionId);
                          return action ? (
                            <li key={actionId} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              <span>{action.name} - {action.impact}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-green-800 mb-2">Proyección de Resultados:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Incremento de ingresos:</span>
                          <p className="font-semibold text-green-600">+{overallImprovement}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Nuevo ROI de Marketing:</span>
                          <p className="font-semibold text-green-600">{metrics[5].projected}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Reducción de CAC:</span>
                          <p className="font-semibold text-green-600">
                            -{((metrics[3].current - metrics[3].projected) / metrics[3].current * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Mejora en retención:</span>
                          <p className="font-semibold text-green-600">
                            +{metrics[4].projected - metrics[4].current}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-200">
                      <p className="text-xs text-green-800">
                        <strong>Recomendación:</strong> Implementa estas acciones gradualmente y monitorea los resultados 
                        cada 30 días para ajustar la estrategia según el rendimiento real.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}