'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Film, UserRoundCog, CheckCircle2,
  Circle, Award, TrendingUp, Clock, Star, ExternalLink,
  ChevronDown, ChevronUp, Sparkles, Zap, Target, Mic, Globe, FileText
} from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  duration: string;
  aiTools: string[];
  steps: ExerciseStep[];
  icon: string;
  color: string;
}

interface ExerciseStep {
  step: number;
  title: string;
  description: string;
  tip?: string;
  warning?: string;
}

export default function AvatarExercises() {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean[]>>({});

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "🎬 Tu Primer Vídeo con Avatar - HeyGen Básico",
      description: "Crea tu primer vídeo profesional con avatar virtual usando HeyGen. Perfecto para empezar sin complicaciones.",
      difficulty: 'principiante',
      duration: '15 min',
      aiTools: ['HeyGen', 'Canva'],
      icon: '🎬',
      color: 'from-blue-500 to-cyan-600',
      steps: [
        {
          step: 1,
          title: "Crea tu cuenta en HeyGen",
          description: "Ve a https://www.heygen.com y regístrate con tu email. El plan gratuito te da créditos suficientes para practicar."
        },
        {
          step: 2,
          title: "Elige un avatar",
          description: "En la biblioteca de avatares, selecciona uno que encaje con tu mensaje. Para empezar, elige un avatar 'stock' profesional."
        },
        {
          step: 3,
          title: "Escribe tu guion",
          description: "En el cuadro de texto, escribe algo sencillo: 'Hola, bienvenidos a nuestra empresa. Soy tu asistente virtual y estoy aquí para ayudarte.'"
        },
        {
          step: 4,
          title: "Selecciona la voz",
          description: "Elige una voz en español. Prueba diferentes opciones hasta encontrar la que más te guste."
        },
        {
          step: 5,
          title: "Genera el vídeo",
          description: "Haz clic en 'Submit' o 'Generate'. Espera 2-5 minutos mientras se procesa tu vídeo."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Crea un vídeo de 30 segundos presentando tu producto o servicio ideal.",
          tip: "💡 Consejo: Mantén el guion corto y claro. 60-90 palabras = ~30 segundos."
        }
      ]
    },
    {
      id: 2,
      title: "📝 Guion Perfecto para Avatar",
      description: "Aprende a escribir guiones que suenen naturales cuando los locute un avatar virtual.",
      difficulty: 'principiante',
      duration: '20 min',
      aiTools: ['ChatGPT', 'Claude'],
      icon: '📝',
      color: 'from-green-500 to-emerald-600',
      steps: [
        {
          step: 1,
          title: "Entiende el ritmo",
          description: "Los avatares leen a ~155 palabras/minuto en español. Para 60 segundos: escribe 150-160 palabras máximo."
        },
        {
          step: 2,
          title: "Usa frases cortas",
          description: "Evita oraciones de más de 20 palabras. Las frases cortas suenan más naturales y son más fáciles de entender."
        },
        {
          step: 3,
          title: "Añade pausas estratégicas",
          description: "Usa comas (,) para pausas cortas y puntos (.) para pausas más largas. Esto da ritmo al mensaje."
        },
        {
          step: 4,
          title: "Evita palabras complejas",
          description: "Sustituye tecnicismos por palabras sencillas. Ej: 'utilizar' → 'usar', 'finalizar' → 'terminar'."
        },
        {
          step: 5,
          title: "Lee en voz alta",
          description: "Lee tu guion en voz alta. Si te quedas sin aire o tropiezas, simplifica esa parte."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Escribe un guion de 90 segundos para un vídeo de onboarding. Debe tener: gancho inicial, 3 ideas clave, y llamada a la acción.",
          tip: "💡 Consejo: Usa la estructura: Problema → Solución → Beneficio → Llamada a la acción."
        }
      ]
    },
    {
      id: 3,
      title: "🎙️ Voz Profesional con ElevenLabs",
      description: "Genera voces ultra-realistas para tus vídeos de avatar usando ElevenLabs.",
      difficulty: 'intermedio',
      duration: '25 min',
      aiTools: ['ElevenLabs', 'Audacity'],
      icon: '🎙️',
      color: 'from-purple-500 to-pink-600',
      steps: [
        {
          step: 1,
          title: "Regístrate en ElevenLabs",
          description: "Ve a https://elevenlabs.io y crea una cuenta gratuita. Tienes 10,000 caracteres/mes gratis."
        },
        {
          step: 2,
          title: "Explora las voces",
          description: "En 'Voice Library', escucha diferentes voces. Para corporativo: busca voces graves y serias. Para cercano: voces más agudas."
        },
        {
          step: 3,
          title: "Ajusta estabilidad y expresividad",
          description: "Stability: 50-70% para consistente. Similarity: 75-85% para natural. Style: 10-20% para profesional."
        },
        {
          step: 4,
          title: "Escribe con SSML básico",
          description: "Usa <break time='0.5s'/> para pausas. Usa mayúsculas para énfasis. Evita exclamaciones excesivas."
        },
        {
          step: 5,
          title: "Genera y descarga",
          description: "Haz clic en 'Generate'. Si te gusta, descarga el MP3. Si no, ajusta parámetros y reintenta."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Crea 2 versiones del mismo guion: una corporativa (seria) y otra cercana (amable). Compara cuál funciona mejor.",
          tip: "💡 Consejo: Para atención al cliente, usa tono cercano. Para formación corporativa, usa tono profesional."
        }
      ]
    },
    {
      id: 4,
      title: "🌍 Localización de Vídeo - Multi-idioma",
      description: "Traduce y adapta tu vídeo a otros idiomas manteniendo la coherencia de marca.",
      difficulty: 'intermedio',
      duration: '30 min',
      aiTools: ['HeyGen', 'Rask AI', 'DeepL'],
      icon: '🌍',
      color: 'from-orange-500 to-red-600',
      steps: [
        {
          step: 1,
          title: "Prepara el vídeo original",
          description: "Ten listo tu vídeo en español. Asegúrate de que el audio sea claro y los subtítulos correctos."
        },
        {
          step: 2,
          title: "Traduce el guion con DeepL",
          description: "Ve a https://deepl.com y traduce tu guion. Revisa que la traducción mantenga el tono de marca."
        },
        {
          step: 3,
          title: "Adapta culturalmente",
          description: "Cambia referencias locales. Ej: 'vale' (España) → 'bueno' (México). Ajusta ejemplos y monedas."
        },
        {
          step: 4,
          title: "Usa HeyGen Translate",
          description: "En HeyGen, usa la función 'Video Translate'. Sube tu vídeo y selecciona el idioma destino."
        },
        {
          step: 5,
          title: "Revisa lip-sync",
          description: "Comprueba que la sincronización labial sea correcta. Si no, ajusta manualmente en el editor."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Localiza un vídeo de 60s al portugués o italiano. Crea un glosario de 10 términos clave de tu sector.",
          tip: "💡 Consejo: Mantén una hoja de estilo con términos que NO se traducen (nombres de producto, slogans)."
        }
      ]
    },
    {
      id: 5,
      title: "✅ Control de Calidad (QA) Profesional",
      description: "Aprende a revisar vídeos con avatar como un profesional. Detecta y corrige errores antes de publicar.",
      difficulty: 'avanzado',
      duration: '25 min',
      aiTools: ['HeyGen', 'VLC', 'Subtitle Edit'],
      icon: '✅',
      color: 'from-indigo-500 to-purple-600',
      steps: [
        {
          step: 1,
          title: "Revisa el audio",
          description: "Volumen consistente, sin ruido de fondo, pronunciación clara. Usa auriculares para detectar problemas."
        },
        {
          step: 2,
          title: "Comprueba lip-sync",
          description: "El movimiento de labios debe coincidir con el audio. Desfase máximo aceptable: 0.2 segundos."
        },
        {
          step: 3,
          title: "Verifica subtítulos",
          description: "Máximo 42 caracteres por línea. 2 líneas máximo. Duración: 1-6 segundos. Sin faltas de ortografía."
        },
        {
          step: 4,
          title: "Revisa visuales",
          description: "Contraste suficiente, tipografía legible (mínimo 16px), avatar bien encuadrado, sin elementos cortados."
        },
        {
          step: 5,
          title: "Coherencia de marca",
          description: "Colores corporativos, tipografías consistentes, tono del mensaje alineado con la identidad de marca."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Revisa un vídeo de un compañero con el checklist. Encuentra al menos 3 áreas de mejora y sugiere correcciones.",
          warning: "⚠️ Atención: Un solo error ortográfico puede dañar la credibilidad de toda la producción."
        }
      ]
    },
    {
      id: 6,
      title: "🎨 Guía de Estilo Visual para Avatares",
      description: "Crea una guía de estilo coherente para todos tus vídeos con avatar. Profesionalidad y consistencia.",
      difficulty: 'avanzado',
      duration: '35 min',
      aiTools: ['Canva', 'Figma', 'HeyGen'],
      icon: '🎨',
      color: 'from-pink-500 to-rose-600',
      steps: [
        {
          step: 1,
          title: "Define la paleta de colores",
          description: "Elige 2-3 colores corporativos. Asegúrate de que tengan contraste suficiente (WCAG AA mínimo)."
        },
        {
          step: 2,
          title: "Selecciona tipografías",
          description: "Sans-serif para pantallas (Arial, Helvetica, Roboto). Mínimo 16px para móvil, 24px para escritorio."
        },
        {
          step: 3,
          title: "Establece el encuadre",
          description: "Avatar: centro o regla de tercios. Deja espacio para rótulos. Margen de seguridad: 10% del borde."
        },
        {
          step: 4,
          title: "Define el fondo",
          description: "Color sólido o gradiente suave. Evita fondos muy cargados que distraigan del avatar."
        },
        {
          step: 5,
          title: "Crea plantillas",
          description: "Diseña 3-5 plantillas reutilizables: intro, contenido, cierre, CTA, créditos. Ahorrarás horas."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Crea una guía de estilo de 2 páginas con: colores (códigos HEX), tipografías, ejemplos de rótulos, y plantilla de fondo.",
          tip: "💡 Consejo: Guarda las plantillas en una carpeta compartida. Todo el equipo debe usar las mismas versiones."
        }
      ]
    }
  ];

  const toggleStep = (exerciseId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const exerciseSteps = prev[exerciseId] || [];
      const newSteps = [...exerciseSteps];
      
      if (newSteps[stepIndex]) {
        newSteps[stepIndex] = false;
      } else {
        newSteps[stepIndex] = true;
      }
      
      return { ...prev, [exerciseId]: newSteps };
    });
  };

  const getProgress = (exerciseId: number, totalSteps: number) => {
    const completed = completedSteps[exerciseId] || [];
    const completedCount = completed.filter(Boolean).length;
    return (completedCount / totalSteps) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermedio': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'avanzado': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-200 flex items-center justify-center">
              <Film className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-900">🎬 Ejercicios de Avatares</h2>
              <p className="text-blue-700">Prácticas guiadas para dominar la creación de vídeos con avatar</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Exercises List */}
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const isExpanded = expandedExercise === exercise.id;
          const progress = getProgress(exercise.id, exercise.steps.length);
          const isCompleted = progress === 100;

          return (
            <Card key={exercise.id} className={`border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50/30' : 'border-slate-200'}`}>
              <CardHeader className="cursor-pointer" onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${exercise.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {exercise.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{exercise.title}</h3>
                        {isCompleted && (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completado
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-600 mb-3">{exercise.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                          {exercise.difficulty === 'principiante' && '🟢'}
                          {exercise.difficulty === 'intermedio' && '🟡'}
                          {exercise.difficulty === 'avanzado' && '🔴'}
                          {' '}{exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="border-slate-300">
                          <Clock className="h-3 w-3 mr-1" />
                          {exercise.duration}
                        </Badge>
                        {exercise.aiTools.map(tool => (
                          <Badge key={tool} variant="secondary" className="bg-slate-100">
                            <Zap className="h-3 w-3 mr-1" />
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 rotate-180" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 animate-in fade-in duration-300">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">Progreso:</span>
                      <span className="font-bold text-slate-900">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Steps */}
                  <div className="space-y-3">
                    {exercise.steps.map((step, idx) => {
                      const isCompleted = (completedSteps[exercise.id] || [])[idx];
                      
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCompleted
                              ? 'border-green-300 bg-green-50'
                              : 'border-slate-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleStep(exercise.id, idx)}
                              className="flex-shrink-0 mt-0.5"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                              ) : (
                                <Circle className="h-6 w-6 text-slate-400 hover:text-slate-600" />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Paso {step.step}
                                </Badge>
                                <h4 className="font-bold text-slate-900">{step.title}</h4>
                              </div>
                              <p className="text-slate-700">{step.description}</p>
                              
                              {step.tip && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <p className="text-sm text-blue-800">{step.tip}</p>
                                </div>
                              )}
                              
                              {step.warning && (
                                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                  <p className="text-sm text-amber-800">{step.warning}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* External Links */}
                  <div className="pt-4 border-t border-slate-200">
                    <p className="font-semibold text-slate-700 mb-3">🔗 Enlaces útiles:</p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.aiTools.map(tool => {
                        let url = '';
                        switch (tool) {
                          case 'HeyGen': url = 'https://www.heygen.com'; break;
                          case 'ElevenLabs': url = 'https://elevenlabs.io'; break;
                          case 'DeepL': url = 'https://deepl.com'; break;
                          case 'Rask AI': url = 'https://www.rask.ai'; break;
                          case 'Canva': url = 'https://canva.com'; break;
                          case 'Figma': url = 'https://figma.com'; break;
                          case 'ChatGPT': url = 'https://chat.openai.com'; break;
                          case 'Claude': url = 'https://claude.ai'; break;
                          default: url = '#';
                        }
                        
                        return (
                          <Button
                            key={tool}
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {tool}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-purple-700" />
            <h3 className="text-lg font-bold text-purple-900">📊 Tu Progreso</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-900">
                {Object.values(completedSteps).flat().filter(Boolean).length}
              </p>
              <p className="text-sm text-purple-700">Pasos Completados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-900">
                {exercises.filter((_, idx) => 
                  (completedSteps[exercises[idx].id] || []).length === exercises[idx].steps.length
                ).length}
              </p>
              <p className="text-sm text-purple-700">Ejercicios Terminados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-900">{exercises.length}</p>
              <p className="text-sm text-purple-700">Total Ejercicios</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
