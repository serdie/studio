'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle2, 
  XCircle, 
  Eye,
  MessageSquare,
  Mic,
  Image,
  Sparkles,
  Palette,
  Monitor,
  Accessibility
} from 'lucide-react';

interface DesignChallenge {
  id: number;
  scenario: string;
  context: string;
  options: {
    avatar: { type: string; appropriate: boolean };
    channel: { type: string; appropriate: boolean };
    tone: { type: string; appropriate: boolean };
    features: { feature: string; appropriate: boolean }[];
  };
}

const challenges: DesignChallenge[] = [
  {
    id: 1,
    scenario: 'Onboarding de Empleados - Empresa Tecnológica',
    context: 'Startup de 50 empleados que quiere automatizar el onboarding',
    options: {
      avatar: { type: 'Profesional joven 30-35 años', appropriate: true },
      channel: { type: 'Slack + Intranet', appropriate: true },
      tone: { type: 'Cercano pero profesional', appropriate: true },
      features: [
        { feature: 'Texto + imágenes explicativas', appropriate: true },
        { feature: 'Videos cortos con avatar', appropriate: true },
        { feature: 'Quiz interactivo final', appropriate: true },
        { feature: 'Solo audio sin texto', appropriate: false }
      ]
    }
  },
  {
    id: 2,
    scenario: 'Atención al Cliente - Banco Tradicional',
    context: 'Banco con clientela de 45-70 años, productos complejos',
    options: {
      avatar: { type: 'Profesional senior 50+ años, traje', appropriate: true },
      channel: { type: 'Web + App móvil', appropriate: true },
      tone: { type: 'Formal y respetuoso', appropriate: true },
      features: [
        { feature: 'Texto grande, alto contraste', appropriate: true },
        { feature: 'Opción de voz para leer contenido', appropriate: true },
        { feature: 'Animaciones rápidas y dinámicas', appropriate: false },
        { feature: 'Transferencia rápida a humano', appropriate: true }
      ]
    }
  },
  {
    id: 3,
    scenario: 'Ecommerce de Moda - Público Joven (16-25)',
    context: 'Tienda online de ropa trendy, Instagram-first',
    options: {
      avatar: { type: 'Joven dinámico 20-25 años, casual', appropriate: true },
      channel: { type: 'Instagram + TikTok + Web', appropriate: true },
      tone: { type: 'Divertido, uso de emojis', appropriate: true },
      features: [
        { feature: 'Videos verticales cortos', appropriate: true },
        { feature: 'GIFs y animaciones', appropriate: true },
        { feature: 'Texto formal sin emojis', appropriate: false },
        { feature: 'Integración con WhatsApp', appropriate: true }
      ]
    }
  },
  {
    id: 4,
    scenario: 'Hospital - Información a Pacientes',
    context: 'Centro médico que explica procedimientos a pacientes',
    options: {
      avatar: { type: 'Personal sanitario (bata blanca)', appropriate: true },
      channel: { type: 'Tablets en sala de espera + Web', appropriate: true },
      tone: { type: 'Empático, calmado, claro', appropriate: true },
      features: [
        { feature: 'Lenguaje sencillo, sin tecnicismos', appropriate: true },
        { feature: 'Imágenes explicativas suaves', appropriate: true },
        { feature: 'Música relajante de fondo', appropriate: true },
        { feature: 'Colores neón muy llamativos', appropriate: false }
      ]
    }
  }
];

export default function MultimodalExperienceBuilder() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = challenges[currentChallenge];

  const toggleFeature = (index: number) => {
    if (showResult) return;
    
    if (selectedFeatures.includes(index)) {
      setSelectedFeatures(selectedFeatures.filter(i => i !== index));
    } else {
      setSelectedFeatures([...selectedFeatures, index]);
    }
  };

  const checkDesign = () => {
    const allCorrect = challenge.options.features.every((feature, index) => {
      const isSelected = selectedFeatures.includes(index);
      return isSelected === feature.appropriate;
    });

    setIsCorrect(allCorrect);
    setShowResult(true);
    
    if (allCorrect) {
      setScore(score + 1);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setSelectedFeatures([]);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const restartGame = () => {
    setCurrentChallenge(0);
    setSelectedFeatures([]);
    setScore(0);
    setShowResult(false);
    setIsCorrect(false);
  };

  if (showResult && currentChallenge === challenges.length - 1) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Sparkles className="h-16 w-16 text-pink-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Diseño Multimodal Completado!
          </CardTitle>
          <CardDescription className="text-slate-300">
            Has diseñado {challenges.length} experiencias multimodales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-pink-400 mb-2">
              {score}/{challenges.length}
            </div>
            <p className="text-slate-300">
              {score === challenges.length ? '🏆 ¡Perfecto! Eres un experto en UX multimodal' :
               score >= challenges.length - 1 ? '✅ ¡Muy bien! Dominas el diseño multimodal' :
               '📚 Repasa los principios de diseño multimodal'}
            </p>
          </div>
          <Button onClick={restartGame} className="w-full bg-pink-600 hover:bg-pink-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-pink-400" />
            <CardTitle className="text-white">Diseña Experiencia Multimodal</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
            Puntos: {score}/{challenges.length}
          </Badge>
        </div>
        <CardDescription className="text-slate-300">
          Selecciona las características apropiadas para este caso
        </CardDescription>
        <Progress value={(currentChallenge / challenges.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-lg text-white">{challenge.scenario}</CardTitle>
            <CardDescription className="text-slate-300">{challenge.context}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Avatar</p>
                <p className="text-sm font-semibold text-white">{challenge.options.avatar.type}</p>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <Monitor className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Canal</p>
                <p className="text-sm font-semibold text-white">{challenge.options.channel.type}</p>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Tono</p>
                <p className="text-sm font-semibold text-white">{challenge.options.tone.type}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Características a Incluir (selecciona las apropiadas):
          </h3>
          <div className="space-y-3">
            {challenge.options.features.map((feature, index) => {
              const isSelected = selectedFeatures.includes(index);
              const isAppropriate = feature.appropriate;
              
              return (
                <Card
                  key={index}
                  className={`transition-all ${
                    showResult
                      ? isSelected === isAppropriate
                        ? 'bg-green-900/30 border-green-700'
                        : 'bg-red-900/30 border-red-700'
                      : isSelected
                      ? 'bg-pink-900/30 border-pink-700'
                      : 'bg-slate-800/50 border-slate-600'
                  }`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isAppropriate ? (
                        <Accessibility className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-slate-500" />
                      )}
                      <span className="text-white">{feature.feature}</span>
                    </div>
                    <Switch
                      checked={isSelected}
                      onCheckedChange={() => toggleFeature(index)}
                      disabled={showResult}
                      className={isSelected ? 'bg-pink-600' : ''}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {showResult && (
          <Card className={`${isCorrect ? 'bg-green-900/30 border-green-700' : 'bg-amber-900/30 border-amber-700'}`}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-amber-500" />
                )}
                <div>
                  <p className="text-xl font-bold text-white">
                    {isCorrect ? '¡Diseño Apropiado!' : 'Diseño Aceptable'}
                  </p>
                  <p className="text-slate-300">
                    {isCorrect 
                      ? 'Has seleccionado todas las características correctas.'
                      : 'Algunas características no son óptimas para este caso.'}
                  </p>
                </div>
              </div>
              <Button onClick={nextChallenge} className="bg-pink-600 hover:bg-pink-700">
                {currentChallenge < challenges.length - 1 ? 'Siguiente Caso' : 'Ver Resultados'}
              </Button>
            </CardContent>
          </Card>
        )}

        {!showResult && (
          <Button onClick={checkDesign} className="w-full bg-pink-600 hover:bg-pink-700">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Verificar Diseño
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
