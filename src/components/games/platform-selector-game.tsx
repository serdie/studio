'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  Bot,
  Building2,
  ShoppingCart,
  Headphones,
  MessageSquare,
  Globe,
  Code,
  LifeBuoy,
  TrendingUp
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  description: string;
  bestFor: string[];
  icon: string;
  color: string;
  vendor: string;
}

interface UseCase {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  correctPlatform: string;
}

const platforms: Platform[] = [
  {
    id: 'dialogflow',
    name: 'Dialogflow',
    description: 'Plataforma de Google para crear asistentes conversacionales',
    bestFor: ['Asistentes multicanal', 'Integración con Google', 'NLP avanzado'],
    icon: 'Globe',
    color: 'bg-blue-600',
    vendor: 'Google'
  },
  {
    id: 'bot-framework',
    name: 'Microsoft Bot Framework',
    description: 'Framework completo para bots empresariales',
    bestFor: ['Empresas Microsoft', 'Teams/Azure', 'Enterprise'],
    icon: 'Building2',
    color: 'bg-indigo-600',
    vendor: 'Microsoft'
  },
  {
    id: 'watson',
    name: 'IBM Watson Assistant',
    description: 'Asistente con IA empresarial de IBM',
    bestFor: ['Grandes empresas', 'Datos sensibles', 'On-premise'],
    icon: 'Bot',
    color: 'bg-sky-600',
    vendor: 'IBM'
  },
  {
    id: 'rasa',
    name: 'Rasa',
    description: 'Plataforma open source para asistentes',
    bestFor: ['Control total', 'Personalización', 'Sin costes license'],
    icon: 'Code',
    color: 'bg-emerald-600',
    vendor: 'Open Source'
  },
  {
    id: 'intercom',
    name: 'Intercom Fin',
    description: 'Chatbot de IA para atención al cliente',
    bestFor: ['Ecommerce', 'SaaS', 'Customer Support'],
    icon: 'Headphones',
    color: 'bg-teal-600',
    vendor: 'Intercom'
  },
  {
    id: 'drift',
    name: 'Drift',
    description: 'Plataforma de conversational marketing',
    bestFor: ['Ventas', 'Lead generation', 'B2B'],
    icon: 'TrendingUp',
    color: 'bg-violet-600',
    vendor: 'Drift'
  },
  {
    id: 'zendesk',
    name: 'Zendesk Answer Bot',
    description: 'Bot integrado con sistema de tickets',
    bestFor: ['Soporte existente', 'Base de conocimientos', 'SMB'],
    icon: 'LifeBuoy',
    color: 'bg-orange-600',
    vendor: 'Zendesk'
  },
  {
    id: 'landbot',
    name: 'Landbot',
    description: 'Constructor visual de chatbots sin código',
    bestFor: ['Marketing', 'Sin desarrolladores', 'Rápido deployment'],
    icon: 'MessageSquare',
    color: 'bg-yellow-600',
    vendor: 'Landbot'
  }
];

const useCases: UseCase[] = [
  {
    id: 1,
    title: 'Asistente para Ecommerce',
    description: 'Chatbot para tienda online que ayude con pedidos, devoluciones y FAQs',
    requirements: ['Integración con Shopify', 'Multicanal (web, WhatsApp)', 'Gestión de pedidos'],
    correctPlatform: 'intercom'
  },
  {
    id: 2,
    title: 'Soporte IT Interno',
    description: 'Asistente para empleados que resuelva dudas de IT y RRHH',
    requirements: ['Active Directory', 'Teams/Slack', 'Datos internos seguros'],
    correctPlatform: 'bot-framework'
  },
  {
    id: 3,
    title: 'Generación de Leads B2B',
    description: 'Bot cualificador de leads para equipo de ventas',
    requirements: ['Integración con Salesforce', 'Calificación automática', 'Agendar reuniones'],
    correctPlatform: 'drift'
  },
  {
    id: 4,
    title: 'Asistente Multilingüe Global',
    description: 'Chatbot para multinacional que atienda en 15 idiomas',
    requirements: ['15+ idiomas', 'NLP avanzado', 'Escalabilidad global'],
    correctPlatform: 'dialogflow'
  },
  {
    id: 5,
    title: 'Soporte con Base de Conocimientos',
    description: 'Bot que responda usando artículos de help center existente',
    requirements: ['Zendesk existente', 'Base de conocimientos', 'Tickets'],
    correctPlatform: 'zendesk'
  },
  {
    id: 6,
    title: 'Prototipo Rápido sin Devs',
    description: 'Chatbot marketing para campaña, sin equipo técnico',
    requirements: ['Sin código', 'Visual', 'Rápido (1-2 días)'],
    correctPlatform: 'landbot'
  },
  {
    id: 7,
    title: 'Banca con Datos Sensibles',
    description: 'Asistente para banco con requisitos de seguridad extrema',
    requirements: ['On-premise', 'Compliance bancario', 'Máxima seguridad'],
    correctPlatform: 'watson'
  },
  {
    id: 8,
    title: 'Startup con Presupuesto Limitado',
    description: 'MVP de asistente con control total y sin costes de licencia',
    requirements: ['Open source', 'Personalizable', 'Sin licensing'],
    correctPlatform: 'rasa'
  }
];

export default function PlatformSelectorGame() {
  const [currentCase, setCurrentCase] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    const isCorrect = platformId === useCases[currentCase].correctPlatform;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const nextCase = () => {
    if (currentCase < useCases.length - 1) {
      setCurrentCase(currentCase + 1);
      setSelectedPlatform(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentCase(0);
    setScore(0);
    setSelectedPlatform(null);
    setShowExplanation(false);
    setGameFinished(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="h-6 w-6" />;
      case 'Building2': return <Building2 className="h-6 w-6" />;
      case 'Bot': return <Bot className="h-6 w-6" />;
      case 'Code': return <Code className="h-6 w-6" />;
      case 'Headphones': return <Headphones className="h-6 w-6" />;
      case 'TrendingUp': return <TrendingUp className="h-6 w-6" />;
      case 'LifeBuoy': return <LifeBuoy className="h-6 w-6" />;
      case 'MessageSquare': return <MessageSquare className="h-6 w-6" />;
      default: return <Bot className="h-6 w-6" />;
    }
  };

  const correctPlatformData = platforms.find(p => p.id === useCases[currentCase].correctPlatform);

  if (gameFinished) {
    const percentage = (score / useCases.length) * 100;
    
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Bot className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Selección de Plataformas Completada!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has emparejado {useCases.length} casos de uso con sus plataformas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-purple-400 mb-2">
              {score}/{useCases.length}
            </div>
            <p className="text-slate-300">
              {percentage === 100 ? '🏆 ¡Perfecto! Conoces todas las plataformas' :
               percentage >= 75 ? '✅ ¡Excelente! Dominas el ecosistema' :
               percentage >= 50 ? '👍 Bien, conoces las principales' :
               '📚 Repasa las plataformas y sus casos de uso'}
            </p>
          </div>

          <Progress value={percentage} className="h-3 bg-slate-700" />

          <Button onClick={restartGame} className="w-full bg-purple-600 hover:bg-purple-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const useCase = useCases[currentCase];

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-white">Selector de Plataforma</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
              Aciertos: {score}
            </Badge>
            <Badge variant="outline" className="bg-purple-900/50 text-purple-300 border-purple-700">
              {currentCase + 1}/{useCases.length}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-300">
          Selecciona la plataforma más adecuada para este caso de uso
        </CardDescription>
        <Progress value={(currentCase / useCases.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-lg text-white">{useCase.title}</CardTitle>
            <CardDescription className="text-slate-300">{useCase.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {useCase.requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                  {req}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {platforms.map((platform) => {
            const isSelected = selectedPlatform === platform.id;
            const isCorrect = platform.id === useCase.correctPlatform;
            
            return (
              <Card
                key={platform.id}
                onClick={() => !showExplanation && handleSelect(platform.id)}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  showExplanation && isCorrect
                    ? 'bg-green-900/50 border-green-500 ring-2 ring-green-500'
                    : showExplanation && isSelected && !isCorrect
                    ? 'bg-red-900/50 border-red-500 ring-2 ring-red-500'
                    : 'bg-slate-800/50 border-slate-600 hover:border-purple-500'
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${platform.color} text-white`}>
                    {getIcon(platform.icon)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{platform.name}</p>
                    <p className="text-xs text-slate-400">{platform.vendor}</p>
                  </div>
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {showExplanation && (
          <Card className="bg-slate-800/50 border-slate-600 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {selectedPlatform === useCase.correctPlatform ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Explicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-200">
                <span className="font-semibold">Plataforma correcta:</span> {correctPlatformData?.name} ({correctPlatformData?.vendor})
              </p>
              
              <div>
                <p className="text-sm text-slate-400 mb-2">Ideal para:</p>
                <div className="flex flex-wrap gap-2">
                  {correctPlatformData?.bestFor.map((use, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-700 text-slate-200 border-slate-600">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-300">{correctPlatformData?.description}</p>

              <Button onClick={nextCase} className="w-full bg-purple-600 hover:bg-purple-700">
                {currentCase < useCases.length - 1 ? 'Siguiente Caso' : 'Ver Resultados'}
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
