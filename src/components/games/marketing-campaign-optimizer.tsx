'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Lightbulb, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

interface CampaignData {
  name: string;
  budget: number;
  targetAudience: string;
  channels: string[];
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const campaigns: CampaignData[] = [
  {
    name: 'Lanzamiento Producto Tech',
    budget: 50000,
    targetAudience: 'Millennials y Gen Z',
    channels: ['Instagram', 'TikTok', 'YouTube'],
    expectedROI: 250,
    riskLevel: 'medium'
  },
  {
    name: 'Campaña de Verano Retail',
    budget: 30000,
    targetAudience: 'Mujeres 25-45 años',
    channels: ['Facebook', 'Email', 'Google Ads'],
    expectedROI: 180,
    riskLevel: 'low'
  },
  {
    name: 'Expansión Mercado B2B',
    budget: 80000,
    targetAudience: 'Empresas tecnológicas',
    channels: ['LinkedIn', 'Webinars', 'Content Marketing'],
    expectedROI: 320,
    riskLevel: 'high'
  },
  {
    name: 'Programa Lealtad',
    budget: 25000,
    targetAudience: 'Clientes existentes',
    channels: ['Email', 'App', 'SMS'],
    expectedROI: 150,
    riskLevel: 'low'
  }
];

const aiRecommendations = [
  {
    factor: 'Segmentación predictiva',
    impact: '+35% conversión',
    description: 'Usa IA para identificar clientes con alta probabilidad de compra'
  },
  {
    factor: 'Personalización de contenido',
    impact: '+28% engagement',
    description: 'Adapta mensajes según comportamiento y preferencias'
  },
  {
    factor: 'Optimización automática',
    impact: '+22% ROI',
    description: 'Ajusta presupuestos dinámicamente según rendimiento'
  },
  {
    factor: 'Análisis predictivo',
    impact: '+18% retención',
    description: 'Predice churn y toma medidas preventivas'
  }
];

export default function MarketingCampaignOptimizer() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([]);
  const [optimizedROI, setOptimizedROI] = useState<number>(0);

  const handleCampaignSelect = (campaign: CampaignData) => {
    setSelectedCampaign(campaign);
    setAppliedRecommendations([]);
    setOptimizedROI(campaign.expectedROI);
  };

  const applyRecommendation = (factor: string) => {
    if (!selectedCampaign || appliedRecommendations.includes(factor)) return;
    
    const newRecommendations = [...appliedRecommendations, factor];
    setAppliedRecommendations(newRecommendations);
    
    // Calculate optimized ROI based on applied recommendations
    let bonusROI = 0;
    newRecommendations.forEach(rec => {
      const recommendation = aiRecommendations.find(r => r.factor === rec);
      if (recommendation) {
        const impactValue = parseInt(recommendation.impact.replace(/[^\d]/g, ''));
        bonusROI += impactValue;
      }
    });
    
    setOptimizedROI(selectedCampaign.expectedROI + bonusROI);
  };

  const resetOptimization = () => {
    setSelectedCampaign(null);
    setAppliedRecommendations([]);
    setOptimizedROI(0);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <TrendingUp className="h-6 w-6" />
            Optimizador de Campañas de Marketing con IA
          </CardTitle>
          <p className="text-purple-700">
            Selecciona una campaña y aplica recomendaciones de IA para maximizar el ROI
          </p>
        </CardHeader>
        <CardContent>
          {!selectedCampaign ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-800">Selecciona una Campaña</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-all border-purple-200 hover:border-purple-400"
                    onClick={() => handleCampaignSelect(campaign)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-purple-900">{campaign.name}</h4>
                          <Badge className={getRiskColor(campaign.riskLevel)}>
                            {campaign.riskLevel === 'low' ? 'Bajo' : 
                             campaign.riskLevel === 'medium' ? 'Medio' : 'Alto'} riesgo
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Presupuesto:</span>
                            <span className="font-medium">€{campaign.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">ROI esperado:</span>
                            <span className="font-medium text-green-600">{campaign.expectedROI}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Audiencia:</span>
                            <p className="font-medium">{campaign.targetAudience}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Canales:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {campaign.channels.map((channel, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                          Seleccionar Campaña
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
              {/* Campaign Summary */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">
                  {selectedCampaign.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Presupuesto:</span>
                    <p className="font-semibold">€{selectedCampaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">ROI Base:</span>
                    <p className="font-semibold">{selectedCampaign.expectedROI}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">ROI Optimizado:</span>
                    <p className="font-semibold text-green-600">{optimizedROI}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Mejora:</span>
                    <p className="font-semibold text-purple-600">
                      +{optimizedROI - selectedCampaign.expectedROI}%
                    </p>
                  </div>
                </div>
              </div>

              {/* ROI Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso de Optimización</span>
                  <span>{optimizedROI}% ROI</span>
                </div>
                <Progress value={Math.min((optimizedROI / selectedCampaign.expectedROI - 1) * 100, 200)} className="h-3" />
              </div>

              {/* AI Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Recomendaciones de IA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiRecommendations.map((recommendation, index) => {
                    const isApplied = appliedRecommendations.includes(recommendation.factor);
                    return (
                      <Card 
                        key={index}
                        className={`cursor-pointer transition-all border-2 ${
                          isApplied 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => applyRecommendation(recommendation.factor)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm">{recommendation.factor}</h4>
                              <div className="flex items-center gap-1">
                                {isApplied ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : null}
                                <Badge className="text-xs bg-green-100 text-green-800">
                                  {recommendation.impact}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{recommendation.description}</p>
                            {!isApplied && (
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                Aplicar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Results Summary */}
              {appliedRecommendations.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Resultados de la Optimización</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Recomendaciones aplicadas:</span>
                      <span className="font-medium">{appliedRecommendations.length}/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mejora total del ROI:</span>
                      <span className="font-medium text-green-600">
                        +{optimizedROI - selectedCampaign.expectedROI}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ingreso adicional estimado:</span>
                      <span className="font-medium text-green-600">
                        €{Math.round(selectedCampaign.budget * (optimizedROI - selectedCampaign.expectedROI) / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={resetOptimization} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Seleccionar Otra Campaña
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}