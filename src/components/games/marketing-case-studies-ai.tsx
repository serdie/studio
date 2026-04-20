'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, TrendingUp, DollarSign, CheckCircle2, ArrowRight, RefreshCw, Zap } from 'lucide-react';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  aiTools: string[];
  results: {
    metric: string;
    improvement: string;
    value: string;
  }[];
  implementationTime: string;
  investment: string;
  roi: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'starbucks-personalization',
    company: 'Starbucks',
    industry: 'Food & Beverage',
    challenge: 'Aumentar la frecuencia de visita y el ticket promedio en un mercado competitivo',
    solution: 'Implementación de sistema de IA para análisis de historial de compras, clima, hora del día y ubicación para ofrecer ofertas personalizadas en tiempo real',
    aiTools: ['Machine Learning', 'Predictive Analytics', 'Mobile App Integration', 'Real-time Processing'],
    results: [
      { metric: 'Transacciones con app', improvement: '+15%', value: 'De 2.1M a 2.4M mensuales' },
      { metric: 'Ingresos por cliente', improvement: '+6%', value: 'De €5.80 a €6.15' },
      { metric: 'Tasa de redención', improvement: '+25%', value: 'De 12% a 15%' },
      { metric: 'Satisfacción del cliente', improvement: '+18%', value: 'NPS de 45 a 53' }
    ],
    implementationTime: '6 meses',
    investment: '€2.5M',
    roi: '280%'
  },
  {
    id: 'sephora-virtual-assistant',
    company: 'Sephora',
    industry: 'Beauty & Cosmetics',
    challenge: 'Personalizar la experiencia de compra de productos de belleza y reducir tasas de devolución',
    solution: 'Chatbot con IA para análisis facial, recomendaciones de productos personalizadas y tutoriales virtuales de maquillaje',
    aiTools: ['Computer Vision', 'NLP Chatbot', 'Recommendation Engine', 'AR Technology'],
    results: [
      { metric: 'Tasa de conversión online', improvement: '+11%', value: 'De 3.2% a 3.6%' },
      { metric: 'Devoluciones de productos', improvement: '-30%', value: 'De 8% a 5.6%' },
      { metric: 'Satisfacción del cliente', improvement: '+45%', value: 'CSAT de 78 a 113' },
      { metric: 'Engagement en app', improvement: '+67%', value: 'De 4.2 a 7 min por sesión' }
    ],
    implementationTime: '4 meses',
    investment: '€1.8M',
    roi: '320%'
  },
  {
    id: 'nike-dynamic-pricing',
    company: 'Nike',
    industry: 'Sportswear & Fashion',
    challenge: 'Optimizar precios y promociones en tiempo real para maximizar ingresos y margen',
    solution: 'Sistema de precios dinámicos con IA que analiza demanda, competencia, inventario y comportamiento del usuario',
    aiTools: ['Dynamic Pricing AI', 'Demand Forecasting', 'Competitor Analysis', 'Inventory Optimization'],
    results: [
      { metric: 'Margen de productos', improvement: '+20%', value: 'De 45% a 54%' },
      { metric: 'Ingresos totales', improvement: '+14%', value: 'De €8.2B a €9.4B' },
      { metric: 'Rotación de inventario', improvement: '+35%', value: 'De 4.2 a 5.7 veces/año' },
      { metric: 'Precios óptimos', improvement: '+89%', value: '89% de productos con precio optimizado' }
    ],
    implementationTime: '8 meses',
    investment: '€4.2M',
    roi: '450%'
  },
  {
    id: 'amazon-recommendations',
    company: 'Amazon',
    industry: 'E-commerce & Retail',
    challenge: 'Aumentar el valor medio del pedido y mejorar la experiencia de compra personalizada',
    solution: 'Sistema de recomendación con deep learning que analiza comportamiento de navegación, historial de compras y patrones similares',
    aiTools: ['Deep Learning', 'Collaborative Filtering', 'Real-time Personalization', 'A/B Testing Automation'],
    results: [
      { metric: 'Ingresos por recomendaciones', improvement: '+35%', value: '35% del total de ventas' },
      { metric: 'Valor medio del pedido', improvement: '+22%', value: 'De €28.50 a €34.80' },
      { metric: 'Tasa de clics en productos', improvement: '+45%', value: 'CTR de 2.1% a 3.0%' },
      { metric: 'Retención de clientes', improvement: '+28%', value: 'De 68% a 87%' }
    ],
    implementationTime: '12 meses',
    investment: '€15M',
    roi: '680%'
  }
];

const implementationSteps = [
  {
    phase: 'Fase 1: Evaluación',
    duration: '4-6 semanas',
    activities: [
      'Auditoría de infraestructura tecnológica',
      'Análisis de fuentes de datos disponibles',
      'Evaluación de capacidades del equipo',
      'Definición de objetivos y KPIs'
    ]
  },
  {
    phase: 'Fase 2: Diseño',
    duration: '6-8 semanas',
    activities: [
      'Selección de tecnologías y proveedores',
      'Diseño de arquitectura de IA',
      'Plan de gobernanza de datos',
      'Definición de casos de uso prioritarios'
    ]
  },
  {
    phase: 'Fase 3: Implementación',
    duration: '12-16 semanas',
    activities: [
      'Integración de datos y sistemas',
      'Desarrollo y entrenamiento de modelos',
      'Configuración de herramientas de IA',
      'Pruebas piloto y validación'
    ]
  },
  {
    phase: 'Fase 4: Optimización',
    duration: 'Continuo',
    activities: [
      'Monitorización de rendimiento',
      'Ajuste fino de modelos',
      'Escalado a nuevos casos de uso',
      'Formación continua del equipo'
    ]
  }
];

export default function MarketingCaseStudiesAI() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showImplementation, setShowImplementation] = useState(false);

  const handleCaseSelect = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setCurrentStep(0);
    setShowImplementation(false);
  };

  const nextStep = () => {
    if (currentStep < implementationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetCaseStudies = () => {
    setSelectedCase(null);
    setCurrentStep(0);
    setShowImplementation(false);
  };

  const getROIColor = (roi: string) => {
    const roiValue = parseInt(roi.replace('%', ''));
    if (roiValue >= 300) return 'text-green-600';
    if (roiValue >= 200) return 'text-blue-600';
    return 'text-purple-600';
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="h-6 w-6" />
            Casos de Éxito: Marketing con IA
          </CardTitle>
          <p className="text-purple-700">
            Explora casos reales de empresas que han transformado su marketing con inteligencia artificial
          </p>
        </CardHeader>
        <CardContent>
          {!selectedCase ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-800">Selecciona un Caso de Estudio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudies.map((caseStudy) => (
                  <Card 
                    key={caseStudy.id}
                    className="cursor-pointer hover:shadow-lg transition-all border-purple-200 hover:border-purple-400"
                    onClick={() => handleCaseSelect(caseStudy)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-purple-900">{caseStudy.company}</h4>
                            <p className="text-sm text-gray-600">{caseStudy.industry}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            ROI {caseStudy.roi}
                          </Badge>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-gray-700">Desafío:</span>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{caseStudy.challenge}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-gray-700">Solución IA:</span>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{caseStudy.solution}</p>
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-gray-700">Herramientas IA:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {caseStudy.aiTools.slice(0, 3).map((tool, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                            {caseStudy.aiTools.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{caseStudy.aiTools.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Implementación:</span>
                            <p className="font-medium">{caseStudy.implementationTime}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Inversión:</span>
                            <p className="font-medium">{caseStudy.investment}</p>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                          Ver Caso Completo
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Case Study Header */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-purple-900">{selectedCase.company}</h3>
                    <p className="text-sm text-purple-700">{selectedCase.industry}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 text-sm">
                      ROI {selectedCase.roi}
                    </Badge>
                    <p className="text-xs text-gray-600 mt-1">
                      Inversión: {selectedCase.investment}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Tiempo de implementación:</span>
                    <p className="font-semibold">{selectedCase.implementationTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Herramientas IA utilizadas:</span>
                    <p className="font-semibold">{selectedCase.aiTools.length} tecnologías</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Retorno de inversión:</span>
                    <p className={`font-semibold ${getROIColor(selectedCase.roi)}`}>{selectedCase.roi}</p>
                  </div>
                </div>
              </div>

              {/* Challenge and Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-900 text-lg">🎯 Desafío</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-800">{selectedCase.challenge}</p>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-900 text-lg">💡 Solución con IA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-800">{selectedCase.solution}</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Tools */}
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-800">🤖 Herramientas de IA Utilizadas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedCase.aiTools.map((tool, index) => (
                    <Badge key={index} className="bg-purple-100 text-purple-800 justify-center py-2">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-800">📈 Resultados Obtenidos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCase.results.map((result, index) => (
                    <Card key={index} className="border-green-200">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-700">{result.metric}</p>
                            <p className="text-xs text-gray-500">{result.value}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">{result.improvement}</p>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min(parseInt(result.improvement.replace(/[^\d]/g, '')), 100)} 
                          className="mt-2 h-2" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Implementation Steps */}
              {!showImplementation ? (
                <div className="text-center">
                  <Button 
                    onClick={() => setShowImplementation(true)}
                    className="bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Ver Plan de Implementación
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-4">📋 Plan de Implementación</h4>
                    
                    <div className="space-y-4">
                      {implementationSteps.map((step, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border-2 ${
                            index === currentStep 
                              ? 'border-blue-400 bg-blue-100' 
                              : index < currentStep
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-sm">{step.phase}</h5>
                            <span className="text-xs text-gray-600">{step.duration}</span>
                          </div>
                          <ul className="text-xs space-y-1">
                            {step.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-blue-500">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        onClick={prevStep} 
                        disabled={currentStep === 0}
                        variant="outline"
                        size="sm"
                      >
                        Anterior
                      </Button>
                      <span className="text-sm text-gray-600">
                        Paso {currentStep + 1} de {implementationSteps.length}
                      </span>
                      <Button 
                        onClick={nextStep} 
                        disabled={currentStep === implementationSteps.length - 1}
                        size="sm"
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button onClick={resetCaseStudies} variant="outline" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Explorar Otros Casos
                </Button>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Target className="mr-2 h-4 w-4" />
                  Aplicar a Mi Empresa
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}