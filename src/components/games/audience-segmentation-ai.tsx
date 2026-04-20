'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Target, TrendingUp, DollarSign, CheckCircle2, ArrowRight, Brain } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  age: string;
  income: string;
  interests: string[];
  onlineBehavior: string;
  purchaseHistory: string;
  painPoints: string[];
  motivations: string[];
}

interface CampaignElement {
  id: string;
  name: string;
  type: 'message' | 'channel' | 'offer' | 'timing';
  description: string;
  bestFor: string[];
}

const personas: Persona[] = [
  {
    id: 'tech-millennial',
    name: 'Ana Tech',
    age: '28 años',
    income: '€35,000-45,000',
    interests: ['Tecnología', 'Gadgets', 'Redes Sociales', 'Gaming'],
    onlineBehavior: 'Activa en Instagram y TikTok, compra online 2-3 veces al mes',
    purchaseHistory: 'Electrónica, moda, apps de productividad',
    painPoints: ['Falta de tiempo', 'Información abrumadora', 'Presupuesto limitado'],
    motivations: ['Innovación', 'Conveniencia', 'Status social']
  },
  {
    id: 'professional-genx',
    name: 'Carlos Profesional',
    age: '42 años',
    income: '€60,000-80,000',
    interests: ['Negocios', 'Finanzas', 'Deportes', 'Viajes'],
    onlineBehavior: 'LinkedIn y email, investiga productos antes de comprar',
    purchaseHistory: 'Servicios B2B, viajes de lujo, tecnología empresarial',
    painPoints: ['Calidad vs precio', 'Tiempo de investigación', 'Confianza en marcas'],
    motivations: ['Eficiencia', 'Calidad', 'Reputación profesional']
  },
  {
    id: 'young-mom',
    name: 'Laura Mamá Joven',
    age: '32 años',
    income: '€25,000-35,000',
    interests: ['Familia', 'Bienestar', 'Decoración', 'Recetas'],
    onlineBehavior: 'Facebook y Pinterest, busca recomendaciones de otros padres',
    purchaseHistory: 'Productos para bebé, hogar, ropa infantil',
    painPoints: ['Presupuesto ajustado', 'Seguridad de productos', 'Falta de tiempo'],
    motivations: ['Bienestar familiar', 'Ahorro', 'Comodidad']
  },
  {
    id: 'retiree-boomer',
    name: 'Miguel Jubilado',
    age: '67 años',
    income: '€20,000-30,000 (pensión)',
    interests: ['Jardinería', 'Salud', 'Viajes', 'Lectura'],
    onlineBehavior: 'Email y Facebook, prefiere tiendas físicas pero investiga online',
    purchaseHistory: 'Salud y bienestar, viajes, hobbies',
    painPoints: ['Tecnología complicada', 'Confianza en vendedores', 'Necesidad de atención personal'],
    motivations: ['Salud', 'Comodidad', 'Calidad de vida']
  }
];

const campaignElements: CampaignElement[] = [
  {
    id: 'social-media-ad',
    name: 'Anuncio en Redes Sociales',
    type: 'channel',
    description: 'Anuncios visuales en Instagram, Facebook o TikTok',
    bestFor: ['tech-millennial', 'young-mom']
  },
  {
    id: 'email-newsletter',
    name: 'Newsletter Personalizado',
    type: 'channel',
    description: 'Email con contenido relevante y ofertas exclusivas',
    bestFor: ['professional-genx', 'retiree-boomer']
  },
  {
    id: 'influencer-collab',
    name: 'Colaboración con Influencers',
    type: 'message',
    description: 'Marketing de influencers con autenticidad',
    bestFor: ['tech-millennial', 'young-mom']
  },
  {
    id: 'webinar-demo',
    name: 'Webinar o Demo Gratuita',
    type: 'message',
    description: 'Presentación en vivo del producto/servicio',
    bestFor: ['professional-genx']
  },
  {
    id: 'discount-offer',
    name: 'Oferta con Descuento',
    type: 'offer',
    description: 'Descuento por tiempo limitado',
    bestFor: ['young-mom', 'retiree-boomer']
  },
  {
    id: 'premium-package',
    name: 'Paquete Premium',
    type: 'offer',
    description: 'Servicio exclusivo con beneficios adicionales',
    bestFor: ['professional-genx', 'tech-millennial']
  },
  {
    id: 'weekend-launch',
    name: 'Lanzamiento de Fin de Semana',
    type: 'timing',
    description: 'Campaña enfocada en fines de semana',
    bestFor: ['tech-millennial', 'young-mom']
  },
  {
    id: 'business-hours',
    name: 'Horario Laboral',
    type: 'timing',
    description: 'Comunicación durante horario comercial',
    bestFor: ['professional-genx']
  }
];

export default function AudienceSegmentationAI() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedElements, setSelectedElements] = useState<CampaignElement[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handlePersonaSelect = (persona: Persona) => {
    setSelectedPersona(persona);
    setSelectedElements([]);
    setShowResults(false);
  };

  const handleElementToggle = (element: CampaignElement) => {
    setSelectedElements(prev => {
      const exists = prev.find(e => e.id === element.id);
      if (exists) {
        return prev.filter(e => e.id !== element.id);
      } else {
        return [...prev, element];
      }
    });
  };

  const calculateMatch = () => {
    if (!selectedPersona || selectedElements.length === 0) return 0;
    
    let matchScore = 0;
    selectedElements.forEach(element => {
      if (element.bestFor.includes(selectedPersona.id)) {
        matchScore += 25;
      } else {
        matchScore += 10; // Partial match
      }
    });
    
    return Math.min(matchScore, 100);
  };

  const getRecommendations = () => {
    if (!selectedPersona) return [];
    
    const recommendations = campaignElements.filter(element => 
      element.bestFor.includes(selectedPersona.id) &&
      !selectedElements.find(e => e.id === element.id)
    );
    
    return recommendations.slice(0, 3);
  };

  const generateCampaign = () => {
    setShowResults(true);
  };

  const resetCampaign = () => {
    setSelectedPersona(null);
    setSelectedElements([]);
    setShowResults(false);
  };

  const matchScore = calculateMatch();
  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="h-6 w-6" />
            Segmentación de Audiencia con IA
          </CardTitle>
          <p className="text-purple-700">
            Selecciona un perfil de cliente y crea una campaña personalizada usando IA
          </p>
        </CardHeader>
        <CardContent>
          {!selectedPersona ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-800">
                <Users className="inline h-5 w-5 mr-2" />
                Selecciona un Perfil de Cliente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personas.map((persona) => (
                  <Card 
                    key={persona.id}
                    className="cursor-pointer hover:shadow-lg transition-all border-purple-200 hover:border-purple-400"
                    onClick={() => handlePersonaSelect(persona)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Users className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-900">{persona.name}</h4>
                            <p className="text-sm text-gray-600">{persona.age} • {persona.income}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-gray-700">Intereses:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {persona.interests.map((interest, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-xs font-medium text-gray-700">Comportamiento:</span>
                            <p className="text-xs text-gray-600 mt-1">{persona.onlineBehavior}</p>
                          </div>
                          
                          <div>
                            <span className="text-xs font-medium text-gray-700">Puntos de dolor:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {persona.painPoints.slice(0, 2).map((pain, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-red-50 text-red-700">
                                  {pain}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                          Seleccionar Perfil
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
              {/* Selected Persona Summary */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-900">{selectedPersona.name}</h3>
                    <p className="text-sm text-purple-700">{selectedPersona.age} • {selectedPersona.income}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Motivaciones:</span>
                    <ul className="mt-1 space-y-1">
                      {selectedPersona.motivations.map((motivation, idx) => (
                        <li key={idx} className="text-gray-600">• {motivation}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Comportamiento:</span>
                    <p className="mt-1 text-gray-600">{selectedPersona.onlineBehavior}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Historial:</span>
                    <p className="mt-1 text-gray-600">{selectedPersona.purchaseHistory}</p>
                  </div>
                </div>
              </div>

              {/* Campaign Elements Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-800">
                  <Target className="inline h-5 w-5 mr-2" />
                  Selecciona Elementos de Campaña
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {campaignElements.map((element) => {
                    const isSelected = selectedElements.find(e => e.id === element.id);
                    const isRecommended = element.bestFor.includes(selectedPersona.id);
                    
                    return (
                      <Card 
                        key={element.id}
                        className={`cursor-pointer transition-all border-2 ${
                          isSelected 
                            ? 'border-green-400 bg-green-50' 
                            : isRecommended
                            ? 'border-purple-300 bg-purple-50 hover:border-purple-400'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleElementToggle(element)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm">{element.name}</h4>
                              <div className="flex items-center gap-1">
                                {isSelected && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                                {isRecommended && !isSelected && (
                                  <Badge className="text-xs bg-purple-100 text-purple-800">
                                    Recomendado
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{element.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {element.type === 'channel' ? 'Canal' :
                               element.type === 'message' ? 'Mensaje' :
                               element.type === 'offer' ? 'Oferta' : 'Timing'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Match Score */}
              {selectedElements.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-purple-800">
                      <TrendingUp className="inline h-4 w-4 mr-2" />
                      Puntuación de Compatibilidad
                    </h4>
                    <span className="text-2xl font-bold text-purple-600">{matchScore}%</span>
                  </div>
                  <Progress value={matchScore} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {matchScore >= 75 ? 'Excelente compatibilidad con este perfil' :
                     matchScore >= 50 ? 'Buena compatibilidad, podría mejorar' :
                     'Compatibilidad moderada, considera otras opciones'}
                  </p>
                </div>
              )}

              {/* AI Recommendations */}
              {recommendations.length > 0 && !showResults && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    <Brain className="inline h-4 w-4 mr-2" />
                    Recomendaciones de IA
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Basado en el perfil de {selectedPersona.name}, considera agregar:
                  </p>
                  <div className="space-y-2">
                    {recommendations.map((element) => (
                      <div 
                        key={element.id}
                        className="flex justify-between items-center p-2 bg-white rounded border border-blue-200"
                      >
                        <span className="text-sm font-medium">{element.name}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleElementToggle(element)}
                          className="h-7 text-xs"
                        >
                          Agregar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Campaign Button */}
              {selectedElements.length > 0 && !showResults && (
                <Button 
                  onClick={generateCampaign}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Generar Campaña Optimizada
                </Button>
              )}

              {/* Campaign Results */}
              {showResults && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3">
                      <CheckCircle2 className="inline h-5 w-5 mr-2" />
                      Campaña Generada Exitosamente
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Perfil objetivo:</span>
                        <p className="text-sm text-gray-600">{selectedPersona.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Compatibilidad:</span>
                        <p className="text-sm font-semibold text-green-600">{matchScore}%</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Elementos seleccionados:</span>
                        <p className="text-sm text-gray-600">{selectedElements.length} elementos</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">ROI estimado:</span>
                        <p className="text-sm font-semibold text-green-600">
                          {Math.round(matchScore * 2.5)}%
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Resumen de campaña:</span>
                      <div className="mt-2 space-y-2">
                        {selectedElements.map((element) => (
                          <div key={element.id} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{element.name}: {element.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button onClick={resetCampaign} variant="outline" className="w-full">
                    Crear Nueva Campaña
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}