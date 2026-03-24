'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  BrainCircuit, 
  Mic, 
  Languages, 
  Video, 
  Sparkles,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  Target
} from 'lucide-react';

export default function Module3Summary() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">📚 Resumen Ejecutivo - Módulo 3</CardTitle>
              <CardDescription>
                Avatares Virtuales y Producción de Vídeo con IA - Conceptos clave para repaso rápido
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="glosario" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="glosario" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Glosario Técnico</span>
            <span className="sm:hidden">Glosario</span>
          </TabsTrigger>
          <TabsTrigger value="conceptos" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span className="hidden sm:inline">Conceptos Clave</span>
            <span className="sm:hidden">Conceptos</span>
          </TabsTrigger>
          <TabsTrigger value="herramientas" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Herramientas</span>
          </TabsTrigger>
          <TabsTrigger value="mejores-practicas" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Mejores Prácticas</span>
            <span className="sm:hidden">Prácticas</span>
          </TabsTrigger>
        </TabsList>

        {/* Glosario Técnico */}
        <TabsContent value="glosario" className="mt-4">
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Glosario de Términos Técnicos
              </CardTitle>
              <CardDescription>
                Definiciones concisas de los conceptos más importantes del módulo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  <GlossaryTerm 
                    term="Avatar Virtual" 
                    definition="Representación digital de una persona o entidad que puede ser estática o dinámica, 2D o 3D, utilizada para interactuar en entornos digitales."
                    category="Fundamentos"
                  />
                  <GlossaryTerm 
                    term="Lip-Sync (Sincronización Labial)" 
                    definition="Técnica que sincroniza el movimiento de la boca del avatar con el audio generado, creando la ilusión de que está hablando realmente."
                    category="Producción"
                  />
                  <GlossaryTerm 
                    term="TTS (Text-to-Speech)" 
                    definition="Tecnología que convierte texto escrito en audio hablado utilizando IA para generar voces naturales y expresivas."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="Localización" 
                    definition="Proceso de adaptación de contenido al contexto cultural, lingüístico y social de cada mercado objetivo, va más allá de la simple traducción."
                    category="Localización"
                  />
                  <GlossaryTerm 
                    term="NMT (Neural Machine Translation)" 
                    definition="Traducción automática neuronal que utiliza redes neuronales profundas para producir traducciones más precisas y naturales."
                    category="Localización"
                  />
                  <GlossaryTerm 
                    term="Clonación de Voz" 
                    definition="Creación de una réplica digital de una voz específica a partir de 1-5 minutos de audio de muestra."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="Prosodia" 
                    definition="Conjunto de características del habla como ritmo, tono, velocidad y énfasis que dan naturalidad y expresión a la voz."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="SSML (Speech Synthesis Markup Language)" 
                    definition="Lenguaje de marcado que permite control fino sobre la síntesis de voz: pausas, énfasis, pronunciación, velocidad."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="Pipeline de Producción" 
                    definition="Flujo completo de trabajo para crear un vídeo con avatar: Briefing → Guion → Voz → Avatar → Edición → QA → Publicación."
                    category="Producción"
                  />
                  <GlossaryTerm 
                    term="QA (Quality Assurance)" 
                    definition="Proceso de control de calidad para revisar vídeos con avatar: audio, lip-sync, visuales, subtítulos, coherencia."
                    category="Producción"
                  />
                  <GlossaryTerm 
                    term="Avatar Stock" 
                    definition="Avatar predefinido de una biblioteca, listo para usar sin personalización."
                    category="Fundamentos"
                  />
                  <GlossaryTerm 
                    term="Avatar Personalizado" 
                    definition="Avatar creado específicamente para representar a una persona o marca concreta."
                    category="Fundamentos"
                  />
                  <GlossaryTerm 
                    term="Foto-a-Vídeo" 
                    definition="Técnica que anima una fotografía estática para crear un avatar que habla con sincronización labial."
                    category="Fundamentos"
                  />
                  <GlossaryTerm 
                    term="Voz Neuronal" 
                    definition="Voz generada por IA utilizando redes neuronales profundas, indistinguible de una voz humana real."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="Deepfake" 
                    definition="Técnica de síntesis de medios que crea representaciones falsas pero realistas de personas. Uso ético requiere transparencia."
                    category="Ética"
                  />
                  <GlossaryTerm 
                    term="RTL (Right-to-Left)" 
                    definition="Idiomas que se escriben de derecha a izquierda como árabe y hebreo, requieren consideraciones especiales en localización."
                    category="Localización"
                  />
                  <GlossaryTerm 
                    term="WaveNet" 
                    definition="Tecnología de Google que utiliza redes neuronales para generar voces TTS de alta calidad."
                    category="Voz"
                  />
                  <GlossaryTerm 
                    term="Timing del Guion" 
                    definition="Cálculo de la duración de un guion basado en palabras. Español: 150-160 palabras/minuto."
                    category="Producción"
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conceptos Clave */}
        <TabsContent value="conceptos" className="mt-4">
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                Conceptos Clave por Área
              </CardTitle>
              <CardDescription>
                Los puntos más importantes que debes recordar de cada sección
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-6">
                  {/* Avatares */}
                  <ConceptSection
                    icon={<Video className="h-5 w-5 text-pink-400" />}
                    title="Avatares Virtuales"
                    concepts={[
                      "Un avatar NO es lo mismo que un vídeo tradicional: es una representación digital generada por IA",
                      "Tipos principales: 2D (imágenes), 3D (modelos), Fotorrealistas (réplicas), Estilizados (artísticos)",
                      "El pipeline completo tiene 8 fases: Briefing → Guion → Storyboard → Voz → Avatar → Edición → QA → Publicación",
                      "Casos de uso ideales: formación repetitiva, onboarding, vídeos de producto, comunicación interna",
                      "NO usar avatares para: noticias sensibles, situaciones que requieren empatía humana profunda",
                      "La transparencia es ética: siempre indicar que es un avatar, no una persona real"
                    ]}
                  />

                  {/* Guiones */}
                  <ConceptSection
                    icon={<BookOpen className="h-5 w-5 text-blue-400" />}
                    title="Guiones para Avatar"
                    concepts={[
                      "Duración objetivo: 60-90 segundos para vídeos corporativos (máximo 150 palabras)",
                      "Cálculo: 150-160 palabras/minuto en español para ritmo natural",
                      "Estructura recomendada: Gancho (5s) → Introducción (10s) → Cuerpo (40-60s) → CTA (15s)",
                      "Escribir para ser 'locutado': frases cortas, comas para pausas, evitar abreviaturas",
                      "El guion determina el 80% de la calidad final: invertir tiempo en iterar y refinar"
                    ]}
                  />

                  {/* Localización */}
                  <ConceptSection
                    icon={<Languages className="h-5 w-5 text-green-400" />}
                    title="Localización y Adaptación"
                    concepts={[
                      "Localización ≠ Traducción: adapta contexto cultural, no solo palabras",
                      "Componentes clave: traducción lingüística, adaptación cultural, formato, cumplimiento legal",
                      "Herramientas IA: DeepL (texto), HeyGen/Rask AI (video), ElevenLabs (voz)",
                      "Considerar: RTL (árabe/hebreo), formatos de fecha, monedas, colores culturales",
                      "Crear contenido 'localizable': evitar juegos de palabras, referencias muy locales"
                    ]}
                  />

                  {/* TTS */}
                  <ConceptSection
                    icon={<Mic className="h-5 w-5 text-purple-400" />}
                    title="Texto a Voz (TTS)"
                    concepts={[
                      "3 generaciones: Robótica (80s) → Concatenativa (2000s) → Neuronal (2018-presente)",
                      "Plataformas líderes: ElevenLabs (calidad), Google WaveNet, Amazon Polly, Azure Speech",
                      "Clonación de voz: requiere 1-5 min de muestra, consentimiento ESENCIAL",
                      "Prosodia controlable: velocidad, pausas, énfasis, emociones vía SSML",
                      "Casos de uso: accesibilidad, e-learning, marketing, IVR, podcasts, localización"
                    ]}
                  />

                  {/* QA */}
                  <ConceptSection
                    icon={<CheckCircle2 className="h-5 w-5 text-amber-400" />}
                    title="Control de Calidad (QA)"
                    concepts={[
                      "Checklist esencial: Audio (volumen, ruido), Lip-sync (desfase <0.2s), Visuales, Subtítulos",
                      "Subtítulos: máx 42 caracteres/línea, máx 2 líneas, mín 1s en pantalla",
                      "Errores comunes: desfase audio-labios, texto pequeño, contraste insuficiente",
                      "Revisar en parejas: segunda perspectiva detecta errores pasados por alto",
                      "Iterar hasta satisfacer: generar v2 aplicando feedback del QA"
                    ]}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Herramientas */}
        <TabsContent value="herramientas" className="mt-4">
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Herramientas y Plataformas
              </CardTitle>
              <CardDescription>
                Comparativa rápida de las principales herramientas del módulo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-4">
                  {/* Avatares */}
                  <ToolCategory
                    title="🎬 Avatares de Vídeo"
                    tools={[
                      { name: 'HeyGen', description: '+140 avatares, 40+ idiomas, lip-sync perfecto, clonación de voz', bestFor: 'Uso general corporativo' },
                      { name: 'Synthesia', description: '+140 avatares, 120+ idiomas, enfocado en formación', bestFor: 'E-learning corporativo' },
                      { name: 'D-ID', description: 'Anima fotos estáticas con sincronización labial', bestFor: 'Avatares personalizados' },
                      { name: 'Colossyan', description: 'Avatares conversacionales para formación', bestFor: 'E-learning interactivo' }
                    ]}
                  />

                  {/* TTS */}
                  <ToolCategory
                    title="🎙️ Texto a Voz (TTS)"
                    tools={[
                      { name: 'ElevenLabs', description: 'Voces más naturales, clonación con 1 min, 40+ idiomas', bestFor: 'Máxima calidad' },
                      { name: 'Google Cloud TTS', description: 'WaveNet voices, 220+ voces, integración Google', bestFor: 'Ecosistema Google' },
                      { name: 'Amazon Polly', description: '60+ voces, integración AWS, voces personalizadas', bestFor: 'Infraestructura AWS' },
                      { name: 'Murf.ai', description: '120+ voces, editor integrado, sync con vídeo', bestFor: 'Contenido profesional' }
                    ]}
                  />

                  {/* Localización */}
                  <ToolCategory
                    title="🌍 Localización"
                    tools={[
                      { name: 'DeepL Pro', description: 'Traducción neuronal de alta calidad, 30+ idiomas', bestFor: 'Texto y documentos' },
                      { name: 'Rask AI', description: 'Doblaje de vídeo con clonación de voz, 130+ idiomas', bestFor: 'Localización de vídeo' },
                      { name: 'Smartcat', description: 'Plataforma colaborativa, 280+ idiomas, memoria de traducción', bestFor: 'Proyectos grandes' },
                      { name: 'HeyGen Translate', description: 'Traduce vídeo manteniendo voz y lip-sync', bestFor: 'Vídeos con avatar' }
                    ]}
                  />

                  {/* 3D/Metaverso */}
                  <ToolCategory
                    title="🎮 Avatares 3D y Metaverso"
                    tools={[
                      { name: 'Ready Player Me', description: 'Avatares 3D para múltiples plataformas', bestFor: 'Metaverso/VR' },
                      { name: 'MetaHuman (Epic)', description: 'Avatares fotorrealistas para Unreal Engine', bestFor: 'Producción AAA' },
                      { name: 'VRoid Studio', description: 'Avatares estilo anime para VRChat', bestFor: 'Comunidad anime' }
                    ]}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mejores Prácticas */}
        <TabsContent value="mejores-practicas" className="mt-4">
          <Card className="border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Mejores Prácticas y Consejos
              </CardTitle>
              <CardDescription>
                Recomendaciones clave para aplicar en tus proyectos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[650px] pr-4">
                <div className="space-y-6">
                  <PracticeSection
                    icon={<Lightbulb className="h-5 w-5 text-yellow-400" />}
                    title="💡 Para Guiones"
                    practices={[
                      "Escribe para ser escuchado, no leído: frases cortas, puntuación clara",
                      "Usa comas para pausas breves, puntos para pausas largas",
                      "Escribe números en letras: 'cincuenta' no '50'",
                      "Evita abreviaturas complejas: el TTS puede pronunciarlas mal",
                      "Divide frases largas (>25 palabras) en dos frases más cortas",
                      "Lee el guion en voz alta antes de generar: si tropiezas, el TTS también"
                    ]}
                  />

                  <PracticeSection
                    icon={<Video className="h-5 w-5 text-pink-400" />}
                    title="🎬 Para Producción de Vídeo"
                    practices={[
                      "Define el propósito ANTES de crear el avatar: ¿informar, vender, formar?",
                      "Selecciona avatar que represente a tu audiencia objetivo (edad, género, estilo)",
                      "Usa fondo limpio y profesional: evita distracciones del mensaje",
                      "Iluminación frontal: el avatar debe estar bien iluminado",
                      "Encuadre: regla de tercios, espacio para rótulos, margen de seguridad",
                      "Exporta en 1080p mínimo: 4K si es para pantallas grandes"
                    ]}
                  />

                  <PracticeSection
                    icon={<Languages className="h-5 w-5 text-green-400" />}
                    title="🌍 Para Localización"
                    practices={[
                      "Crea contenido 'localizable' desde el inicio: evita referencias muy locales",
                      "Usa contexto visual: imágenes que trasciendan barreras lingüísticas",
                      "Considera colores: blanco=luto en Asia, rojo=prosperidad en China",
                      "Adapta formatos: DD/MM (Europa) vs MM/DD (EEUU), coma vs punto decimal",
                      "Revisa con nativos: siempre, sin excepción, para cada mercado",
                      "Versiona correctamente: ES-ES, ES-MX, ES-AR son diferentes"
                    ]}
                  />

                  <PracticeSection
                    icon={<Mic className="h-5 w-5 text-purple-400" />}
                    title="🎙️ Para TTS"
                    practices={[
                      "Prueba 3-5 voces diferentes antes de seleccionar la definitiva",
                      "Ajusta velocidad: 0.9x-1.0x para contenido serio, 1.0x-1.1x para dinámico",
                      "Usa SSML para control fino: pausas, énfasis, pronunciación específica",
                      "Previsualiza siempre antes de generar en producción",
                      "Varía entonación para evitar monotonía en contenido largo",
                      "Considera clonación si necesitas consistencia de marca"
                    ]}
                  />

                  <PracticeSection
                    icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
                    title="⚠️ Consideraciones Éticas"
                    practices={[
                      "Transparencia: indica siempre que es un avatar, no una persona real",
                      "Consentimiento: nunca uses likeness de personas sin permiso explícito",
                      "Evita deepfakes engañosos: no crear contenido falso que parezca real",
                      "Diversidad: representa adecuadamente a tu audiencia objetivo",
                      "Accesibilidad: incluye subtítulos en todos los vídeos",
                      "Privacidad: no revelar datos sensibles en vídeos generados"
                    ]}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer con consejos de estudio */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">📖 Consejos para el Repaso</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>15 min antes del test:</strong> Repasa el Glosario Técnico</li>
                <li>• <strong>Para prácticas:</strong> Revisa Conceptos Clave y Herramientas</li>
                <li>• <strong>Para proyecto final:</strong> Estudia Mejores Prácticas de cada área</li>
                <li>• <strong>Para producción real:</strong> Usa las herramientas como checklist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente para términos del glosario
interface GlossaryTermProps {
  term: string;
  definition: string;
  category: string;
}

function GlossaryTerm({ term, definition, category }: GlossaryTermProps) {
  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-bold text-primary text-base">{term}</h4>
        <Badge variant="outline" className="text-xs border-slate-600 flex-shrink-0">
          {category}
        </Badge>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{definition}</p>
    </div>
  );
}

// Componente para secciones de conceptos
interface ConceptSectionProps {
  icon: React.ReactNode;
  title: string;
  concepts: string[];
}

function ConceptSection({ icon, title, concepts }: ConceptSectionProps) {
  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-bold text-slate-200">{title}</h4>
      </div>
      <ul className="space-y-2">
        {concepts.map((concept, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
            <span>{concept}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente para categorías de herramientas
interface ToolCategoryProps {
  title: string;
  tools: Array<{ name: string; description: string; bestFor: string }>;
}

function ToolCategory({ title, tools }: ToolCategoryProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-bold text-slate-200 text-base border-b border-slate-700 pb-2">{title}</h4>
      <div className="grid gap-3">
        {tools.map((tool, i) => (
          <div key={i} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-bold text-primary">{tool.name}</h5>
              <Badge className="text-xs bg-green-600/20 text-green-400 border-green-600/30">
                {tool.bestFor}
              </Badge>
            </div>
            <p className="text-sm text-slate-300">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para secciones de prácticas
interface PracticeSectionProps {
  icon: React.ReactNode;
  title: string;
  practices: string[];
}

function PracticeSection({ icon, title, practices }: PracticeSectionProps) {
  return (
    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="font-bold text-slate-200">{title}</h4>
      </div>
      <ul className="space-y-2">
        {practices.map((practice, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-primary font-bold flex-shrink-0">{practice.split(':')[0]}:</span>
            <span>{practice.split(':')[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
