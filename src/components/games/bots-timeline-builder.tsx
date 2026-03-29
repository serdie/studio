'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  XCircle, 
  Trophy,
  Clock,
  Bot,
  MessageSquare,
  Mic,
  Brain,
  Sparkles
} from 'lucide-react';

interface TimelineEvent {
  year: string;
  event: string;
  description: string;
  icon: 'bot' | 'message' | 'mic' | 'brain' | 'sparkles';
  era: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1966',
    event: 'ELIZA',
    description: 'Primer chatbot, simulaba ser una terapeuta con reglas simples',
    icon: 'bot',
    era: 'Era de los primeros chatbots'
  },
  {
    year: '1972',
    event: 'PARRY',
    description: 'Simulaba un paciente con paranoia',
    icon: 'bot',
    era: 'Era de los primeros chatbots'
  },
  {
    year: '1995',
    event: 'A.L.I.C.E',
    description: 'Chatbot con reglas y AIML (Artificial Intelligence Markup Language)',
    icon: 'message',
    era: 'Bots en web y mensajería'
  },
  {
    year: '2001',
    event: 'SmarterChild',
    description: 'Bot muy popular en Messenger',
    icon: 'message',
    era: 'Bots en web y mensajería'
  },
  {
    year: '2011',
    event: 'Siri',
    description: 'Primer asistente de voz mainstream en smartphones (iPhone 4S)',
    icon: 'mic',
    era: 'Asistentes de voz'
  },
  {
    year: '2014',
    event: 'Alexa',
    description: 'Google Assistant y boom de bots empresariales en mensajería',
    icon: 'mic',
    era: 'Asistentes de voz'
  },
  {
    year: '2016',
    event: 'Chatbots Empresariales',
    description: 'Boom de bots empresariales en mensajería corporativa',
    icon: 'message',
    era: 'Asistentes de voz'
  },
  {
    year: '2017',
    event: 'Replika',
    description: 'Chatbot compañero emocional',
    icon: 'brain',
    era: 'IA generativa'
  },
  {
    year: '2020',
    event: 'GPT-3',
    description: 'Modelo de lenguaje avanzado con 175B parámetros',
    icon: 'brain',
    era: 'IA generativa'
  },
  {
    year: '2022',
    event: 'ChatGPT',
    description: 'IA conversacional para el gran público. 100M usuarios en 2 meses',
    icon: 'brain',
    era: 'IA generativa'
  },
  {
    year: '2023+',
    event: 'GPT-4 y Asistentes',
    description: 'Capacidades casi humanas, multimodalidad y agentes autónomos',
    icon: 'sparkles',
    era: 'IA generativa'
  }
];

const shuffledEvents = [...timelineEvents].sort(() => Math.random() - 0.5);

export default function BotsTimelineBuilder() {
  const [draggedItems, setDraggedItems] = useState<TimelineEvent[]>([]);
  const [availableItems, setAvailableItems] = useState<TimelineEvent[]>(shuffledEvents);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TimelineEvent | null>(null);

  const handleAddToTimeline = (event: TimelineEvent) => {
    if (draggedItems.length === 0 || event.year >= draggedItems[draggedItems.length - 1].year) {
      setDraggedItems([...draggedItems, event]);
      setAvailableItems(availableItems.filter(e => e.year !== event.year));
      setSelectedItem(null);
      checkPosition(event, draggedItems.length);
    } else {
      setFeedback({
        correct: false,
        message: `⚠️ ${event.event} (${event.year}) no puede ir después de ${draggedItems[draggedItems.length - 1].event} (${draggedItems[draggedItems.length - 1].year}). El orden cronológico es importante.`
      });
    }
  };

  const handleRemoveFromTimeline = (index: number) => {
    const item = draggedItems[index];
    setDraggedItems(draggedItems.filter((_, i) => i !== index));
    setAvailableItems([...availableItems, item]);
    setFeedback(null);
  };

  const checkPosition = (event: TimelineEvent, position: number) => {
    const correctPosition = timelineEvents.findIndex(e => e.year === event.year);
    
    if (position === correctPosition) {
      setFeedback({
        correct: true,
        message: `✅ ¡Correcto! ${event.event} va en la posición ${position + 1}`
      });
      setScore(score + 1);
    } else {
      setFeedback({
        correct: false,
        message: `❌ ${event.event} debería ir en otra posición. Pista: es de ${event.era}`
      });
    }
    
    setAttempts(attempts + 1);

    if (draggedItems.length + 1 === timelineEvents.length) {
      setTimeout(() => setGameComplete(true), 500);
    }
  };

  const resetGame = () => {
    setDraggedItems([]);
    setAvailableItems([...timelineEvents].sort(() => Math.random() - 0.5));
    setFeedback(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setSelectedItem(null);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'bot': return <Bot className="h-5 w-5" />;
      case 'message': return <MessageSquare className="h-5 w-5" />;
      case 'mic': return <Mic className="h-5 w-5" />;
      case 'brain': return <Brain className="h-5 w-5" />;
      case 'sparkles': return <Sparkles className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const getEraColor = (era: string) => {
    switch (era) {
      case 'Era de los primeros chatbots': return 'bg-blue-900/50 border-blue-700 text-blue-300';
      case 'Bots en web y mensajería': return 'bg-purple-900/50 border-purple-700 text-purple-300';
      case 'Asistentes de voz': return 'bg-cyan-900/50 border-cyan-700 text-cyan-300';
      case 'IA generativa': return 'bg-pink-900/50 border-pink-700 text-pink-300';
      default: return 'bg-slate-900/50 border-slate-700 text-slate-300';
    }
  };

  if (gameComplete) {
    const accuracy = Math.round((score / attempts) * 100);
    
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Línea de Tiempo Completada!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has reconstruido la historia de los bots y asistentes virtuales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-green-900/30 border-green-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-green-300">Posiciones Correctas</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-blue-400">{attempts}</p>
                <p className="text-sm text-blue-300">Intentos Totales</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 border-purple-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-purple-400">{accuracy}%</p>
                <p className="text-sm text-purple-300">Precisión</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Línea de Tiempo Completa:</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-center gap-4 pl-12 py-3">
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-4 border-slate-900 ${getEraColor(event.era).split(' ')[0]}`} />
                  <Card className={`flex-1 ${getEraColor(event.era)}`}>
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getIcon(event.icon)}
                        <div>
                          <p className="font-semibold text-white">{event.year} - {event.event}</p>
                          <p className="text-xs text-slate-300">{event.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{event.era}</Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-blue-400" />
            <CardTitle className="text-white">Construye la Línea de Tiempo</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
              Aciertos: {score}
            </Badge>
            <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-700">
              Intentos: {attempts}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-300">
          Ordena cronológicamente los hitos en la historia de bots y asistentes virtuales
        </CardDescription>
        <Progress value={(draggedItems.length / timelineEvents.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        {feedback && (
          <Card className={`${feedback.correct ? 'bg-green-900/30 border-green-700' : 'bg-red-900/30 border-red-700'}`}>
            <CardContent className="p-4 flex items-center gap-3">
              {feedback.correct ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <XCircle className="h-6 w-6 text-red-500" />}
              <p className="text-white font-medium">{feedback.message}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Eventos Disponibles:</h3>
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {availableItems.map((event, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedItem?.year === event.year 
                      ? 'bg-blue-900/50 border-blue-500' 
                      : 'bg-slate-800/50 border-slate-600 hover:border-blue-500'
                  }`}
                  onClick={() => setSelectedItem(event)}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="text-blue-400">{getIcon(event.icon)}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{event.year} - {event.event}</p>
                      <p className="text-xs text-slate-400">{event.era}</p>
                    </div>
                    {selectedItem?.year === event.year && (
                      <Button 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleAddToTimeline(event); }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Añadir
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tu Línea de Tiempo:</h3>
            <div className="relative space-y-2 max-h-96 overflow-y-auto">
              {draggedItems.length === 0 && (
                <p className="text-slate-400 text-center py-8">
                  Selecciona eventos de la izquierda y añádelos en orden cronológico
                </p>
              )}
              {draggedItems.map((event, index) => (
                <Card key={index} className={`${getEraColor(event.era)} relative`}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="text-white">{getIcon(event.icon)}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{event.year} - {event.event}</p>
                      <p className="text-xs text-slate-300">{event.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveFromTimeline(index)}
                      className="border-red-500 text-red-400 hover:bg-red-900/50"
                    >
                      Eliminar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {draggedItems.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm">
              {timelineEvents.length - draggedItems.length} eventos restantes
            </p>
            {draggedItems.length === timelineEvents.length && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Trophy className="mr-2 h-4 w-4" />
                ¡Completado!
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
