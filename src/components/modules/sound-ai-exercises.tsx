'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Headphones, Music, Mic, Volume2, Play, CheckCircle2, 
  Circle, Award, TrendingUp, Clock, Star, ExternalLink,
  ChevronDown, ChevronUp, Copy, Sparkles, Zap, Target
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

export default function SoundAIExercises() {
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean[]>>({});

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "🎙️ Tu Primera Voz IA - Texto a Voz Básico",
      description: "Aprende a convertir texto en voz natural usando herramientas gratuitas. Perfecto para empezar sin complicaciones.",
      difficulty: 'principiante',
      duration: '10 min',
      aiTools: ['TTSMaker', 'NaturalReaders'],
      icon: '🎙️',
      color: 'from-green-500 to-emerald-600',
      steps: [
        {
          step: 1,
          title: "Abre TTSMaker",
          description: "Ve a https://ttsmaker.com - es completamente gratuito y no requiere registro para uso básico."
        },
        {
          step: 2,
          title: "Escribe tu texto",
          description: "En el cuadro de texto grande, escribe algo sencillo como: 'Hola, esta es mi primera voz generada por IA. ¡Es increíble!'"
        },
        {
          step: 3,
          title: "Elige idioma y voz",
          description: "Selecciona 'Español' y elige una voz que te guste. Te recomiendo empezar con 'Laura' o 'Carlos' que suenan muy naturales."
        },
        {
          step: 4,
          title: "Ajusta velocidad y tono",
          description: "Déjalo en 1.0x (normal) para tu primer intento. Luego puedes experimentar con velocidades diferentes."
        },
        {
          step: 5,
          title: "Genera y escucha",
          description: "Haz clic en 'Convertir' o 'Generate'. Escucha el resultado y si te gusta, descarga el MP3."
        },
        {
          step: 6,
          title: "¡Tu reto!",
          description: "Crea un audio de 30 segundos presentándote como si fueras un locutor de radio. ¡Diviértete!",
          tip: "💡 Consejo: Añade pausas usando comas y puntos para que suene más natural."
        }
      ]
    },
    {
      id: 2,
      title: "📚 Narrando un Cuento Corto",
      description: "Da vida a un cuento infantil usando diferentes voces y emociones. Ideal para profesores o creadores de contenido.",
      difficulty: 'principiante',
      duration: '20 min',
      aiTools: ['ElevenLabs (free tier)', 'PlayHT'],
      icon: '📚',
      color: 'from-blue-500 to-cyan-600',
      steps: [
        {
          step: 1,
          title: "Prepara el guion",
          description: "Elige un cuento corto (puede ser 'Los Tres Cerditos' o uno inventado). Separa el texto por personajes."
        },
        {
          step: 2,
          title: "Regístrate en ElevenLabs",
          description: "Ve a https://elevenlabs.io y crea una cuenta gratuita. Tienes 10,000 caracteres al mes gratis."
        },
        {
          step: 3,
          title: "Asigna voces a personajes",
          description: "Para el narrador usa una voz adulta calmada. Para el cerdito usa una voz más aguda. Para el lobo, una voz grave."
        },
        {
          step: 4,
          title: "Genera por secciones",
          description: "No generes todo de una vez. Hazlo por párrafos o diálogos para tener más control."
        },
        {
          step: 5,
          title: "Ajusta la 'Stability'",
          description: "En ElevenLabs, baja la estabilidad (30-40%) para más expresión emocional, súbela (70%+) para más consistencia."
        },
        {
          step: 6,
          title: "Une los audios",
          description: "Usa una herramienta gratuita como Audacity o https://mp3cut.net para unir todas las partes.",
          tip: "🎵 Añade música de fondo suave para darle más ambiente al cuento."
        },
        {
          step: 7,
          title: "¡Tu reto!",
          description: "Crea un cuento de 2-3 minutos con al menos 3 personajes diferentes. ¡Compártelo con la clase!"
        }
      ]
    },
    {
      id: 3,
      title: "🎵 Creando Música de Fondo con IA",
      description: "Genera tu primera pista musical desde cero usando solo texto. Sin saber música, ¡es magia pura!",
      difficulty: 'principiante',
      duration: '25 min',
      aiTools: ['Suno AI', 'Mubert'],
      icon: '🎵',
      color: 'from-purple-500 to-pink-600',
      steps: [
        {
          step: 1,
          title: "Entra en Suno AI",
          description: "Ve a https://suno.ai y regístrate (puedes usar tu cuenta de Google). Tienes créditos gratis diarios."
        },
        {
          step: 2,
          title: "Elige 'Create' → 'Custom Mode'",
          description: "El modo Custom te da más control sobre el resultado final."
        },
        {
          step: 3,
          title: "Escribe el prompt de estilo",
          description: "En 'Style of Music' pon algo como: 'lofi chill beats, piano suave, tempo relajado, sin letra, para estudiar'",
          tip: "💡 Sé específico: género + instrumentos + ambiente + tempo"
        },
        {
          step: 4,
          title: "Añade título y tags",
          description: "Pon un título creativo como 'Noches de Estudio' y tags como: lofi, chill, study, instrumental"
        },
        {
          step: 5,
          title: "Genera y elige",
          description: "Suno creará 2 versiones. Escúchalas ambas y guarda la que más te guste."
        },
        {
          step: 6,
          title: "Descarga y usa",
          description: "Descarga en MP3. Puedes usarla en tus videos, streams o presentaciones.",
          warning: "⚠️ Con la cuenta gratis, Suno es dueño de la música. Para uso comercial necesitas plan pago."
        },
        {
          step: 7,
          title: "¡Tu reto!",
          description: "Crea 3 pistas diferentes: una para estudiar, otra para entrenar y otra para relajarte. ¡Crea tu propia playlist!"
        }
      ]
    },
    {
      id: 4,
      title: "🎬 Música para Videos de YouTube",
      description: "Crea música original libre de derechos para tus videos. Olvídate del copyright para siempre.",
      difficulty: 'intermedio',
      duration: '30 min',
      aiTools: ['Soundraw', 'Stable Audio'],
      icon: '🎬',
      color: 'from-orange-500 to-red-600',
      steps: [
        {
          step: 1,
          title: "Abre Soundraw",
          description: "Ve a https://soundraw.io - tiene plan gratuito con descargas limitadas."
        },
        {
          step: 2,
          title: "Configura los parámetros",
          description: "Elige: Mood (ej: 'Happy'), Genre (ej: 'Pop'), Length (ej: 3:00 min), Tempo (ej: 120 BPM)"
        },
        {
          step: 3,
          title: "Genera opciones",
          description: "Haz clic en 'Create'. Soundraw generará múltiples variaciones del mismo estilo."
        },
        {
          step: 4,
          title: "Personaliza la estructura",
          description: "Selecciona una canción y usa el editor para: quitar la intro, alargar el chorus, suavizar el final."
        },
        {
          step: 5,
          title: "Ajusta instrumentos",
          description: "Puedes subir/bajar volumen de instrumentos individuales (batería, bajo, melodía, etc.)"
        },
        {
          step: 6,
          title: "Exporta en calidad",
          description: "Descarga en WAV para máxima calidad o MP3 para web. Con gratis tienes límite de descargas.",
          tip: "🎯 Para YouTube: usa MP3 320kbps. Es suficiente y ocupa menos."
        },
        {
          step: 7,
          title: "¡Tu reto!",
          description: "Crea la música de intro (15-30 segundos) para tu canal de YouTube o podcast. ¡Que sea pegadiza!"
        }
      ]
    },
    {
      id: 5,
      title: "🎭 Clonando Tu Voz (Éticamente)",
      description: "Crea un clon digital de tu propia voz. Úsalo para narraciones cuando no puedas grabar en persona.",
      difficulty: 'intermedio',
      duration: '40 min',
      aiTools: ['ElevenLabs', 'PlayHT'],
      icon: '🎭',
      color: 'from-indigo-500 to-purple-600',
      steps: [
        {
          step: 1,
          title: "Prepara la grabación de tu voz",
          description: "Grábate leyendo texto claro durante 5-10 minutos. Usa el móvil en un lugar silencioso. Formato: MP3 o WAV.",
          warning: "⚠️ SOLO clones tu propia voz o tengas permiso explícito. Clonar voces de otros sin consentimiento es ILEGAL."
        },
        {
          step: 2,
          title: "Limpia el audio (opcional)",
          description: "Usa https://vocalremover.org/voice-changer.html para quitar ruido de fondo si es necesario."
        },
        {
          step: 3,
          title: "Ve a ElevenLabs Voice Lab",
          description: "En https://elevenlabs.io ve a 'VoiceLab' → 'Add Generative or Cloned Voice' → 'Instant Voice Cloning'"
        },
        {
          step: 4,
          title: "Sube tu muestra de voz",
          description: "Sube tu archivo de audio. ElevenLabs analizará tu timbre, tono y patrones de habla."
        },
        {
          step: 5,
          title: "Nombra y describe tu voz",
          description: "Ponle un nombre (ej: 'Mi Voz Narrador') y describe características (ej: 'masculina, 30s, tono medio')"
        },
        {
          step: 6,
          title: "Confirma que es tu voz",
          description: "ElevenLabs te pedirá confirmar que es TU voz. Marca la casilla y acepta los términos."
        },
        {
          step: 7,
          title: "Prueba el clon",
          description: "Escribe texto y genera audio. Compara con tu voz real. ¿Suena natural? ¿Necesita ajustes?"
        },
        {
          step: 8,
          title: "¡Tu reto!",
          description: "Crea un mensaje de bienvenida de 30 segundos con tu voz clonada. Úsalo como saludo en tus videos.",
          tip: "🎙️ Para mejor calidad: graba en un armario con ropa (absorbe eco) y usa el modo 'airplane' para evitar notificaciones."
        }
      ]
    },
    {
      id: 6,
      title: "🎤 Creando un Cover con IA (RVC)",
      description: "Haz que cualquier canción suene como si la cantara otra persona. Técnica avanzada pero resultados increíbles.",
      difficulty: 'avanzado',
      duration: '60 min',
      aiTools: ['RVC WebUI', 'Google Colab'],
      icon: '🎤',
      color: 'from-pink-500 to-rose-600',
      steps: [
        {
          step: 1,
          title: "Consigue el audio original",
          description: "Necesitas la canción 'a capella' (solo voz). Usa https://vocalremover.org/ para separar voz de música."
        },
        {
          step: 2,
          title: "Abre RVC en Google Colab",
          description: "Busca 'RVC Google Colab' o usa https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI"
        },
        {
          step: 3,
          title: "Elige un modelo de voz",
          description: "Puedes descargar modelos de https://huggingface.co/spaces/RVC-Community o entrenar el tuyo propio."
        },
        {
          step: 4,
          title: "Sube el audio a capella",
          description: "Carga la voz original que separaste. RVC la convertirá usando el modelo elegido."
        },
        {
          step: 5,
          title: "Ajusta parámetros",
          description: "Pitch: 0 para mismo tono, +12 para subir una octava, -12 para bajar. Index rate: 0.7-0.8 para balance natural.",
          warning: "⚠️ Solo usa canciones que tengas derecho a modificar. No distribuyas covers con copyright sin permiso."
        },
        {
          step: 6,
          title: "Convierte y descarga",
          description: "Haz clic en 'Convert'. Escucha el resultado y descarga el audio convertido."
        },
        {
          step: 7,
          title: "Mezcla con la instrumental",
          description: "Usa Audacity o https://mp3cut.net para unir la voz convertida con la música instrumental."
        },
        {
          step: 8,
          title: "¡Tu reto!",
          description: "Crea un cover de una canción que te guste. Experimenta cambiando género (pop → rock, masculino → femenino).",
          tip: "🎵 Para resultados pro: ajusta ecualización y añade reverb suave en Audacity."
        }
      ]
    },
    {
      id: 7,
      title: "🤖 Creando un Agente de Voz con ElevenLabs",
      description: "Configura un asistente de voz que responde automáticamente. Perfecto para atención al cliente o proyectos interactivos.",
      difficulty: 'avanzado',
      duration: '45 min',
      aiTools: ['ElevenLabs Conversational AI', 'Voice Agent'],
      icon: '🤖',
      color: 'from-cyan-500 to-blue-600',
      steps: [
        {
          step: 1,
          title: "Accede a ElevenLabs Agents",
          description: "Ve a https://elevenlabs.io/app/agents - necesitas cuenta (tiene tier gratuito limitado)."
        },
        {
          step: 2,
          title: "Crea un nuevo agente",
          description: "Haz clic en 'Create Agent'. Ponle nombre (ej: 'Asistente de Clase') y descripción."
        },
        {
          step: 3,
          title: "Configura la voz",
          description: "Elige una voz predefinida o usa tu voz clonada. Ajusta estabilidad y claridad según necesites."
        },
        {
          step: 4,
          title: "Define el 'System Prompt'",
          description: "Escribe las instrucciones de comportamiento. Ejemplo: 'Eres un asistente amable que ayuda a estudiantes con dudas sobre IA. Responde de forma clara y concisa.'",
          tip: "💡 Sé específico: incluye qué DEBE hacer y qué NO debe hacer el agente."
        },
        {
          step: 5,
          title: "Añade conocimiento (opcional)",
          description: "Sube documentos PDF o texto con información que el agente debe conocer (temario, FAQs, etc.)"
        },
        {
          step: 6,
          title: "Configura la temperatura",
          description: "Baja (0.3-0.5) = respuestas más predecibles. Alta (0.7-0.9) = más creativo pero menos consistente."
        },
        {
          step: 7,
          title: "Prueba en el chat",
          description: "Usa el panel de prueba para hablar con tu agente. Haz preguntas variadas para ver cómo responde."
        },
        {
          step: 8,
          title: "Ajusta y refina",
          description: "Si el agente da respuestas raras, ajusta el system prompt o añade más ejemplos de lo que debe/debe no hacer."
        },
        {
          step: 9,
          title: "¡Tu reto!",
          description: "Crea un agente que sea un 'profesor de IA' que responda preguntas básicas. Pruébalo con 10 preguntas diferentes.",
          warning: "⚠️ Los agentes pueden 'alucinar' (inventar información). Siempre supervisa las respuestas en casos importantes."
        }
      ]
    },
    {
      id: 8,
      title: "🎧 Podcast Completo con IA",
      description: "Produce un episodio de podcast de 5 minutos usando solo IA: guion, voces, música y efectos.",
      difficulty: 'avanzado',
      duration: '90 min',
      aiTools: ['ChatGPT', 'ElevenLabs', 'Suno', 'Audacity'],
      icon: '🎧',
      color: 'from-amber-500 to-orange-600',
      steps: [
        {
          step: 1,
          title: "Genera el guion con ChatGPT",
          description: "Pide: 'Escribe un guion de podcast de 5 minutos sobre [tu tema]. Incluye intro, 3 segmentos principales, y cierre. Marca cuándo hay música y cuándo hablan los presentadores.'"
        },
        {
          step: 2,
          title: "Divide el guion por voces",
          description: "Separa el texto por presentador. Guarda cada parte en archivos separados para generarlas individualmente."
        },
        {
          step: 3,
          title: "Genera las voces en ElevenLabs",
          description: "Usa voces diferentes para cada presentador. Genera por párrafos para mejor control. Descarga cada segmento."
        },
        {
          step: 4,
          title: "Crea música de intro/outro con Suno",
          description: "Prompt: 'upbeat podcast intro music, 15 seconds, energetic, modern, no vocals'. Crea también un outro de 10 segundos."
        },
        {
          step: 5,
          title: "Añade música de fondo",
          description: "Genera en Suno: 'soft background music for podcast, lofi, very quiet, no vocals, 5 minutes'. Baja el volumen al 10-15%."
        },
        {
          step: 6,
          title: "Abre Audacity",
          description: "Descarga Audacity gratis en https://www.audacityteam.org/ - es el editor de audio más popular y gratuito."
        },
        {
          step: 7,
          title: "Importa todos los audios",
          description: "Arrastra a Audacity: intro, segmentos de voz, música de fondo, efectos, outro. Ordénalos en pistas separadas."
        },
        {
          step: 8,
          title: "Ajusta niveles y transiciones",
          description: "Baja la música cuando haya voz (ducking). Añade fade-in/fade-out en intro y outro. Asegúrate de que las voces se escuchen claras."
        },
        {
          step: 9,
          title: "Exporta el episodio",
          description: "File → Export → MP3. Calidad: 192kbps o 320kbps. Pon metadatos (título, artista, etc.)"
        },
        {
          step: 10,
          title: "¡Tu reto!",
          description: "Produce un podcast completo de 5 minutos con un compañero (cada uno hace una voz). ¡Publicadlo en SoundCloud o Spotify!",
          tip: "🎙️ Consejo pro: Normaliza el audio final a -16 LUFS para podcasts (usando Effect → Loudness Normalization en Audacity)."
        }
      ]
    },
    {
      id: 9,
      title: "🎼 Canción Completa con Letra (Suno v3)",
      description: "Crea una canción original de principio a fin: letra, melodía, voz y producción. ¡Como un productor real!",
      difficulty: 'avanzado',
      duration: '60 min',
      aiTools: ['Suno AI v3', 'ChatGPT'],
      icon: '🎼',
      color: 'from-violet-500 to-purple-600',
      steps: [
        {
          step: 1,
          title: "Define el concepto",
          description: "Decide: género (pop, rock, rap, etc.), tema (amor, superación, fiesta), y ambiente (alegre, melancólico, energético)"
        },
        {
          step: 2,
          title: "Escribe la letra con ChatGPT",
          description: "Prompt: 'Escribe letra de canción [género] sobre [tema]. Incluye: verso 1, pre-chorus, chorus, verso 2, chorus, bridge, chorus final. Marca cada sección claramente.'",
          tip: "💡 Una estructura clásica: V1 (4 líneas) → Pre-Chorus (2 líneas) → Chorus (4-6 líneas) → V2 → Chorus → Bridge → Chorus"
        },
        {
          step: 3,
          title: "Entra en Suno AI Custom Mode",
          description: "Ve a https://suno.ai → Create → Custom Mode. Activa 'Instrumental: OFF' para que haya voz."
        },
        {
          step: 4,
          title: "Pega la letra estructurada",
          description: "Copia la letra en el cuadro de 'Lyrics'. Asegúrate de que las secciones estén marcadas: [Verse], [Chorus], [Bridge], etc."
        },
        {
          step: 5,
          title: "Define el estilo musical",
          description: "En 'Style of Music' sé específico: 'pop rock energético, guitarra eléctrica, batería potente, voz masculina, tempo 120 BPM'"
        },
        {
          step: 6,
          title: "Genera múltiples versiones",
          description: "Haz clic en 'Create'. Suno creará 2 versiones. Genera varias veces hasta encontrar una que te guste."
        },
        {
          step: 7,
          title: "Usa 'Extend' para completar",
          description: "Si la canción se corta antes de terminar, usa 'Extend from this clip' para continuar desde donde se quedó."
        },
        {
          step: 8,
          title: "Descarga las partes",
          description: "Descarga la canción completa. Con plan gratis, Suno es dueño. Con plan pago ($10/mes), tú eres dueño de la música."
        },
        {
          step: 9,
          title: "¡Tu reto!",
          description: "Crea una canción completa de 3 minutos. Sube la letra y el audio a SoundCloud. ¡Comparte tu obra maestra!",
          warning: "⚠️ Con cuenta gratis NO puedes monetizar la música en Spotify/YouTube. Necesitas plan pago para derechos comerciales."
        }
      ]
    },
    {
      id: 10,
      title: "🎮 Efectos de Sonido para Videojuegos",
      description: "Diseña una paleta completa de SFX para un juego: pasos, impactos, UI, ambiente. ¡Como un sound designer pro!",
      difficulty: 'avanzado',
      duration: '75 min',
      aiTools: ['AudioLDM', 'Riffusion', 'BFXR', 'Audacity'],
      icon: '🎮',
      color: 'from-red-500 to-pink-600',
      steps: [
        {
          step: 1,
          title: "Define la paleta de sonidos",
          description: "Haz una lista: 5 efectos de UI (click, hover, success, error, notification), 3 efectos de ambiente, 5 efectos de acción (golpes, saltos, etc.)"
        },
        {
          step: 2,
          title: "Genera efectos de UI con BFXR",
          description: "Ve a https://www.bfxr.net/ - es gratuito y especializado en sonidos 8-bit/retro. Usa presets como 'Coin', 'Powerup', 'Hit'."
        },
        {
          step: 3,
          title: "Crea ambientes con AudioLDM",
          description: "En Hugging Face busca 'AudioLDM'. Prompt: 'forest ambience with birds and wind, no music, 30 seconds'. Descarga el resultado."
        },
        {
          step: 4,
          title: "Genera impactos con Riffusion",
          description: "Prompt: 'impact sound effect, explosion, video game, short, punchy'. Genera varias variaciones y elige la mejor."
        },
        {
          step: 5,
          title: "Edita y normaliza",
          description: "En Audacity, importa todos los SFX. Usa Effect → Normalize (-1dB) para que todos tengan volumen consistente."
        },
        {
          step: 6,
          title: "Crea variaciones",
          description: "Para no repetir sonidos, crea 2-3 variaciones de cada SFX. Cambia ligeramente el pitch (+/- 2-3 semitonos) para variedad."
        },
        {
          step: 7,
          title: "Organiza por carpetas",
          description: "Exporta y organiza: /UI/, /Ambience/, /Actions/, /Weapons/. Nombra claramente: 'ui_click_01.wav', 'amb_forest_day.wav'"
        },
        {
          step: 8,
          title: "Prueba en contexto",
          description: "Si tienes un juego o video, importa los SFX y pruébalos. Ajusta volumen según necesites."
        },
        {
          step: 9,
          title: "¡Tu reto!",
          description: "Crea una paleta completa de 20 SFX para un juego de plataformas: 5 UI, 5 personaje (saltos, golpes), 5 enemigos, 5 ambiente. ¡Compártelo!",
          tip: "🎯 Formato: Usa WAV sin compresión para juegos. MP3 solo para prototipos. Los SFX deben ser cortos (<2 segundos) para UI."
        }
      ]
    }
  ];

  const toggleStep = (exerciseId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const exerciseSteps = prev[exerciseId] || [];
      const newSteps = [...exerciseSteps];
      newSteps[stepIndex] = !newSteps[stepIndex];
      return { ...prev, [exerciseId]: newSteps };
    });
  };

  const getProgress = (exerciseId: number, totalSteps: number) => {
    const completed = completedSteps[exerciseId]?.filter(Boolean).length || 0;
    return Math.round((completed / totalSteps) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermedio': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'avanzado': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'principiante': return '🟢';
      case 'intermedio': return '🟡';
      case 'avanzado': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
          <Headphones className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white">🎧 Laboratorio de Sonido IA</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          ¡Bienvenido al estudio de sonido más completo! Aquí vas a aprender a crear <strong>música, voces y efectos</strong> usando Inteligencia Artificial. 
          Cada ejercicio está diseñado para que aprendas paso a paso, como si estuviera yo a tu lado guiándote.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <Award className="h-4 w-4 text-purple-600" />
            <span><strong>10 ejercicios</strong> prácticos</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>De <strong>10 a 90 minutos</strong> cada uno</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <Star className="h-4 w-4 text-green-600" />
            <span>De <strong>principiante a avanzado</strong></span>
          </div>
        </div>
      </div>

      {/* Lista de Ejercicios */}
      <div className="space-y-4">
        {exercises.map((exercise) => {
          const isExpanded = expandedExercise === exercise.id;
          const progress = getProgress(exercise.id, exercise.steps.length);
          const isCompleted = progress === 100;

          return (
            <Card key={exercise.id} className={`overflow-hidden border-2 transition-all ${isExpanded ? 'border-purple-300 shadow-xl' : 'border-gray-200 hover:border-purple-200'}`}>
              <CardContent className="p-0">
                {/* Header del Ejercicio */}
                <div 
                  className="p-6 cursor-pointer bg-gradient-to-r from-gray-50 to-white"
                  onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icono y Número */}
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${exercise.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                        {exercise.icon}
                      </div>
                      
                      {/* Info Principal */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900">{exercise.title}</h3>
                          <Badge className={`${getDifficultyColor(exercise.difficulty)} border`}>
                            {getDifficultyIcon(exercise.difficulty)} {exercise.difficulty}
                          </Badge>
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white border-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Completado
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600">{exercise.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{exercise.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>{exercise.steps.length} pasos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            <span>{exercise.aiTools.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botón Expandir */}
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  {/* Barra de Progreso */}
                  {isExpanded && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tu progreso</span>
                        <span className="font-semibold text-purple-600">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Pasos del Ejercicio */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="p-6 bg-gray-50/50">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Pasos a seguir
                      </h4>
                      
                      <div className="space-y-4">
                        {exercise.steps.map((step, index) => {
                          const isStepCompleted = completedSteps[exercise.id]?.[index] || false;
                          
                          return (
                            <div 
                              key={index}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                isStepCompleted 
                                  ? 'bg-green-50 border-green-300' 
                                  : 'bg-white border-gray-200 hover:border-purple-200'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                {/* Checkbox */}
                                <button
                                  onClick={() => toggleStep(exercise.id, index)}
                                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    isStepCompleted
                                      ? 'bg-green-500 border-green-600 text-white'
                                      : 'border-gray-300 hover:border-purple-400'
                                  }`}
                                >
                                  {isStepCompleted && <CheckCircle2 className="h-4 w-4" />}
                                </button>

                                {/* Contenido del Paso */}
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                                      isStepCompleted 
                                        ? 'bg-green-200 text-green-800' 
                                        : 'bg-purple-100 text-purple-800'
                                    }`}>
                                      Paso {step.step}
                                    </span>
                                    <h5 className="font-semibold text-gray-900">{step.title}</h5>
                                  </div>
                                  
                                  <p className="text-gray-600 text-sm">{step.description}</p>
                                  
                                  {step.tip && (
                                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                      <p className="text-sm text-blue-800">{step.tip}</p>
                                    </div>
                                  )}
                                  
                                  {step.warning && (
                                    <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                      <p className="text-sm text-amber-800">{step.warning}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Botón de Completar Ejercicio */}
                      <div className="mt-6 flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => setExpandedExercise(null)}
                        >
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Contraer ejercicio
                        </Button>
                        
                        {progress === 100 ? (
                          <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                            <Award className="h-4 w-4 mr-2" />
                            ¡Ejercicio completado! 🎉
                          </Badge>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Marca todos los pasos para completar el ejercicio
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Motivacional */}
      <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-0">
        <CardContent className="p-8 text-center text-white">
          <Zap className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">¡Tú puedes hacerlo! 💪</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            No te preocupes si algo no sale a la primera. La IA es una herramienta poderosa pero requiere práctica. 
            Cada ejercicio que completes te acerca más a dominar estas tecnologías. ¡Confío en ti!
          </p>
          <p className="mt-4 text-sm opacity-75">
            ¿Tienes dudas? Pregunta en clase o envíame un email. ¡Estoy aquí para ayudarte! 🎓
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
