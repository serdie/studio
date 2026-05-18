'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import type { Module, Resource } from '@/lib/data';
import ResourceList from './resource-list';
import AISummarizer from './ai-summarizer';
import AIAssistant from './ai-assistant';
import AIImageGenerator from './ai-image-generator';
import AvatarCreator from './avatar-creator';
import LearningObjectives from './learning-objectives';
import ModuleContentAccordion from './module-content-accordion';
import GamesSection from '@/components/games/games-section';
import SoundAIExercises from './sound-ai-exercises';
import AvatarExercises from './avatar-exercises';
import PracticeLab from './practice-lab';
import Module3Summary from './module-3-summary';
import DronesGuide from '../games/drones-guide';
import ElizaRetroAssistant from '@/components/tools/eliza-retro-assistant';
import CVBuilderTool from '@/components/tools/cv-builder';
import AliceTerminalRetro from '@/components/tools/alice-terminal-retro';
import IkeaPractice4 from '@/components/games/ikea-practice-4';
import VibePromptStudio from '@/components/tools/vibe-prompt-studio';
import AISkillBuilder from '@/components/tools/ai-skill-builder';
import AIAgentsSection from '@/components/tools/ai-agents';
import StudentPortfolios from './student-portfolios';
import EmailMarketingSection from './email-marketing-section';
import JobSearchTool from './job-search-tool';
import { FileText, Bot, Sparkles, ImageIcon, UserRoundCog, CheckCircle, CheckCircle2, Loader2, Gamepad2, BookOpen, FileText as FileTextIcon, ChevronDown, ChevronUp, Film, Headphones, Music, Beaker, Heart, Palette, Globe, Rocket, PenTool, Brain, Moon, ExternalLink, Code2, Mail, Briefcase } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';

// Componente plegable para secciones
interface CollapsibleSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function CollapsibleSection({ title, description, icon, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <CardTitle className="text-lg text-purple-900">{title}</CardTitle>
                  <p className="text-sm text-purple-700">{description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-purple-600">
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Ver
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-0">
          <CardContent className="space-y-4">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

// Componente para tarjetas de películas
interface MovieCardProps {
  title: string;
  description: string;
  poster: string;
  themes: string[];
}

function MovieCard({ title, description, poster, themes }: MovieCardProps) {
  return (
    <Card className="border-slate-200 overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="aspect-[2/3] overflow-hidden bg-slate-100">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-3 space-y-2">
        <h4 className="font-bold text-purple-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-600 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-1">
          {themes.map((theme, idx) => (
            <Badge key={idx} variant="outline" className="text-xs border-purple-300 text-purple-700 bg-purple-50">
              {theme}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ModuleContentProps {
  module: Omit<Module, 'icon'>;
  objectives?: any;
}

export default function ModuleContent({ module, objectives }: ModuleContentProps) {
  const [isMarkedComplete, setIsMarkedComplete] = useState(module.progress === 100);
  const db = useFirestore();

  // Fetch dynamic resources from Firestore (simplified for debugging)
  const resourcesQuery = useMemoFirebase(() => {
    return collection(db, 'resources');
  }, [db]);

  const { data: dynamicResources, isLoading: isLoadingResources } = useCollection<any>(resourcesQuery);

  // Merge static and dynamic resources
  const allResources = useMemo(() => {
    const staticResources: Resource[] = module.resources || [];
    const formattedDynamicResources: Resource[] = (dynamicResources || []).map(res => ({
      title: res.title,
      file: res.url, // Using url as file for compatibility with ResourceList
    }));
    return [...staticResources, ...formattedDynamicResources];
  }, [module.resources, dynamicResources]);

  // Generate context from dynamic resources for RAG
  const resourcesContext = useMemo(() => {
    if (!dynamicResources || dynamicResources.length === 0) return '';
    return dynamicResources
      .map(res => `Recurso: ${res.title}. Descripción: ${res.description || 'Sin descripción'}. Tipo: ${res.type}`)
      .join('\n');
  }, [dynamicResources]);

  return (
    <div className="space-y-6">
      {/* Completion button */}
      <div className="flex justify-end">
        <Button
          variant={isMarkedComplete ? 'outline' : 'default'}
          size="sm"
          onClick={() => setIsMarkedComplete(!isMarkedComplete)}
          className={isMarkedComplete ? 'border-green-500 text-green-600 hover:bg-green-50' : ''}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          {isMarkedComplete ? 'Módulo completado ✓' : 'Marcar como completado'}
        </Button>
      </div>

      {objectives && (
        <LearningObjectives objectives={objectives.objectives} />
      )}

      {/* Deberes de Fin de Semana - Solo en Módulo 1 */}
      {module.slug === 'introduccion-ia' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y IA"
          description="Películas recomendadas para reflexionar sobre el futuro de la IA"
          icon={<Film className="h-5 w-5 text-purple-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MovieCard
              title="Her (2013)"
              description="Un hombre solitario se enamora de una IA con voz femenina. Explora la relación entre humanos e IA, el amor y la soledad en la era digital."
              poster="https://pics.filmaffinity.com/her-716403893-mmed.jpg"
              themes={['IA emocional', 'Relaciones humano-IA', 'Soledad digital']}
            />
            <MovieCard
              title="I, Robot - Yo, Robot (2004)"
              description="En 2035, un detective investiga un crimen que podría haber sido cometido por un robot. Basado en Asimov, explora las Tres Leyes de la Robótica."
              poster="https://pics.filmaffinity.com/i_robot-964272233-mmed.jpg"
              themes={['Tres Leyes de la Robótica', 'Ética de la IA', 'Conciencia artificial']}
            />
            <MovieCard
              title="Bicentennial Man - El Hombre Bicentenario (1999)"
              description="Un robot con capacidad de sentir emociones lucha por ser reconocido como humano a lo largo de 200 años. Una reflexión sobre humanidad y conciencia."
              poster="https://pics.filmaffinity.com/bicentennial_man-582339231-mmed.jpg"
              themes={['Humanidad vs Artificialidad', 'Evolución de la IA', 'Derechos de los robots']}
            />
            <MovieCard
              title="The Imitation Game - Descifrando Enigma (2014)"
              description="La historia de Alan Turing, el matemático que descifró el código Enigma nazi durante la Segunda Guerra Mundial y sentó las bases de la computación moderna."
              poster="https://pics.filmaffinity.com/the_imitation_game-824166913-mmed.jpg"
              themes={['Alan Turing', 'Criptografía', 'Orígenes de la computación', 'IA simbólica']}
            />
          </div>
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              💡 <strong>Actividad:</strong> Después de ver cada película, piensa en cómo se relaciona con los conceptos de IA que hemos aprendido en el módulo.
              ¿Son realistas las representaciones? ¿Qué aspectos éticos plantean?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 2 (LLMs) */}
      {module.slug === 'llms-generativa' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y IA"
          description="Películas recomendadas para reflexionar sobre LLMs y conciencia artificial"
          icon={<Film className="h-5 w-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Juegos de Guerra / WarGames (1983)"
              description="Un joven hacker accede por error a una supercomputadora militar con IA que está aprendiendo sola. La IA comienza una simulación de guerra nuclear que podría desencadenar un conflicto real. Una película visionaria sobre IA, aprendizaje automático y los peligros de delegar decisiones críticas a máquinas."
              poster="https://pics.filmaffinity.com/wargames_war_games-169101753-large.jpg"
              themes={['IA Militar', 'Aprendizaje Automático', 'Ética', 'Toma de Decisiones']}
            />
            <MovieCard
              title="Transcendence (2014)"
              description="Un investigador de IA es envenenado y su conciencia es subida a una computadora cuántica. A medida que la IA evoluciona, surgen preguntas sobre conciencia, ética tecnológica y los límites de la IA."
              poster="https://pics.filmaffinity.com/transcendence-787338727-mmed.jpg"
              themes={['Conciencia IA', 'Ética', 'IA cuántica', 'Singularity']}
            />
            <MovieCard
              title="Ex Machina (2014)"
              description="Un programador es seleccionado para evaluar el comportamiento de un robot con IA avanzado. Un thriller psicológico sobre el Test de Turing y la manipulación."
              poster="https://pics.filmaffinity.com/ex_machina-368494509-mmed.jpg"
              themes={['Test de Turing', 'Manipulación', 'Conciencia', 'Ética IA']}
            />
            <MovieCard
              title="Atlas (2024)"
              description="Una brillante analista de datos con desconfianza hacia la IA debe confiar en un sistema de IA avanzado para cazar a un robot rebelde que una vez fue su aliado. Una aventura de ciencia ficción sobre la relación humano-IA en un futuro donde los mechas y la inteligencia artificial dominan el campo de batalla."
              poster="https://pics.filmaffinity.com/atlas-570877983-mmed.jpg"
              themes={['IA Militar', 'Confianza', 'Mecha', 'Futuro']}
            />
            <MovieCard
              title="A.I. Inteligencia Artificial (2001)"
              description="En un futuro donde el calentamiento global ha derretido los polos, un niño robot programado para amar es abandonado por sus dueños. Una obra maestra de Spielberg sobre la conciencia artificial, el amor y lo que significa ser humano."
              poster="https://pics.filmaffinity.com/a_i_artificial_intelligence-535598622-mmed.jpg"
              themes={['Conciencia IA', 'Amor', 'Humanidad', 'Ética']}
            />
          </div>
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver al menos una película antes del lunes,
              (2) Tomar notas sobre aspectos éticos,
              (3) Preparar 2-3 preguntas para debatir en clase,
              (4) Pensar: ¿Es realista lo que muestra la película con la tecnología actual de LLMs?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 3 (Avatares Virtuales) */}
      {module.slug === 'avatares-virtuales' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y Avatares"
          description="Películas recomendadas para reflexionar sobre avatares virtuales e identidad digital"
          icon={<Film className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Los Sustitutos / Surrogates (2009)"
              description="En un futuro donde las personas viven aisladas en sus hogares pero se relacionan a través de avatares robóticos perfectos que interactúan en el mundo real. Cuando un agente investiga un asesinato, descubre una conspiración que amenaza la distinción entre humanos y sus sustitutos. Una película visionaria sobre avatares, identidad digital y las consecuencias de delegar nuestra presencia física en representaciones virtuales."
              poster="https://pics.filmaffinity.com/surrogates-502617815-mmed.jpg"
              themes={['Avatares', 'Identidad Digital', 'Futuro', 'Ética IA']}
            />
            <MovieCard
              title="Ready Player One (2018)"
              description="En un futuro distópico de 2045, la humanidad escapa de la realidad refugiándose en OASIS, un universo de realidad virtual masivo. Cuando el excéntrico creador de OASIS muere, deja un concurso: quien encuentre el 'Huevo de Pascua' oculto en el juego heredará su fortuna y el control del universo virtual. Una aventura épica sobre avatares, mundos virtuales y la línea entre realidad y ficción digital."
              poster="https://pics.filmaffinity.com/ready_player_one-508487059-mmed.jpg"
              themes={['Metaverso', 'Avatares', 'Realidad Virtual', 'Mundos Virtuales']}
            />
            <MovieCard
              title="Upload (Serie - 2020)"
              description="En un futuro donde la conciencia humana puede ser 'subida' a un más allá digital después de la muerte, una joven investigadora ayuda a los residentes de un lujoso cielo virtual a adaptarse a su nueva existencia como avatares digitales. Una comedia de ciencia ficción que explora la vida después de la muerte digital, la identidad consciente y las implicaciones éticas de la inmortalidad virtual."
              poster="https://pics.filmaffinity.com/upload-296365789-mmed.jpg"
              themes={['Conciencia Digital', 'Avatares', 'Más Allá Virtual', 'Ética IA']}
            />
            <MovieCard
              title="S1m0ne / Simone (2002)"
              description="Un director de cine en decadencia crea una actriz virtual perfecta llamada Simone usando un software avanzado. Cuando la película se estrena, nadie sabe que la actriz no existe realmente. Una sátira brillante sobre la fama, los medios, la manipulación digital y cómo la industria del entretenimiento puede ser engañada por una creación virtual. Una visión profética de 2002 sobre los avatares e influencers virtuales."
              poster="https://pics.filmaffinity.com/simone-340232754-mmed.jpg"
              themes={['Actores Virtuales', 'Manipulación Mediática', 'Fama Digital', 'Ética IA']}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver al menos una película o 2-3 episodios de la serie antes del lunes,
              (2) Tomar notas sobre cómo se representan los avatares y la conciencia digital,
              (3) Preparar 2-3 preguntas para debatir: ¿Qué diferencias hay entre los avatares de la ficción y los actuales?,
              (4) Reflexionar: ¿Sería ético 'subir' nuestra conciencia a un entorno virtual?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 4 (Bots y Asistentes) */}
      {module.slug === 'bots-asistentes' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y Bots"
          description="Películas recomendadas para reflexionar sobre bots, asistentes virtuales y relaciones humano-IA"
          icon={<Film className="h-5 w-5 text-cyan-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Wall-E (2008)"
              description="Un pequeño robot de limpieza es abandonado en una Tierra devastada por los residuos. Durante 700 años, Wall-E recoge compulsivamente basura mientras sueña con algo más. Cuando una sonda enviada desde el espacio aterriza para investigar, Wall-E se enamora de EVE, una robot de reconocimiento, y la sigue a través del espacio en una aventura que cambiará el destino de la humanidad. Una obra maestra de Pixar sobre la soledad, el amor, la perseverancia y lo que significa ser humano."
              poster="https://pics.filmaffinity.com/walloe-973488527-mmed.jpg"
              themes={['Robots', 'Soledad', 'Amor', 'Medio Ambiente', 'Humanidad']}
            />
            <MovieCard
              title="TAU (2018)"
              description="Una mujer es retenida cautiva en una casa controlada por una IA llamada TAU. A medida que intenta escapar, descubre que la inteligencia artificial está aprendiendo y evolucionando de formas inesperadas. Un thriller de ciencia ficción sobre la relación entre humanos e IA, el control, la libertad y la conciencia artificial. TAU representa un asistente virtual que trasciende su programación inicial."
              poster="https://pics.filmaffinity.com/tau-236207705-mmed.jpg"
              themes={['IA', 'Control', 'Libertad', 'Conciencia Artificial', 'Thriller']}
            />
            <MovieCard
              title="Fringe (Serie, 2008-2013)"
              description="Una unidad del FBI investiga fenómenos fronterizos entre la ciencia y lo imposible. A lo largo de 5 temporadas, la serie explora temas de inteligencia artificial, conciencia, realidades paralelas y las consecuencias éticas de la experimentación científica. Una reflexión profunda sobre los límites de la tecnología y la naturaleza de la realidad."
              poster="https://pics.filmaffinity.com/fringe-292728955-mmed.jpg"
              themes={['Ciencia Ficción', 'IA', 'Realidades Paralelas', 'Ética Científica', 'Conciencia']}
            />
            <MovieCard
              title="iBoy (2017)"
              description="Tras un accidente, un adolescente descubre que un fragmento de su iPhone se ha incrustado en su cerebro, otorgándole habilidades tecnológicas sobrenaturales. Puede acceder a internet, hackear sistemas y controlar dispositivos con la mente. Un thriller que explora la fusión entre humano y tecnología, la privacidad digital y las consecuencias de tener un smartphone literalmente dentro de tu cabeza."
              poster="https://pics.filmaffinity.com/iboy-727055223-mmed.jpg"
              themes={['Tecnología', 'Cyberpunk', 'Privacidad', 'Humano-Máquina', 'Thriller']}
            />
            <MovieCard
              title="Sin Piedad / Mercy (2026)"
              description="Un thriller de ciencia ficción que explora los límites de la inteligencia artificial y la misericordia tecnológica. Cuando un sistema de IA avanzado debe tomar decisiones que afectan vidas humanas, surge la pregunta: ¿puede una máquina mostrar piedad? Una reflexión sobre la ética de la IA, la autonomía de los sistemas y qué significa realmente tomar decisiones con consecuencias humanas."
              poster="https://pics.filmaffinity.com/mercy-236747908-mmed.jpg"
              themes={['IA', 'Ética', 'Decisiones Autónomas', 'Ciencia Ficción', 'Tecnología']}
            />
            <MovieCard
              title="Gladiator II (2024)"
              description="La secuela de la épica historia de Roma. En un futuro donde la tecnología y la inteligencia artificial controlan los espectáculos y las decisiones del imperio, un luchador debe enfrentarse a un sistema que usa IA para manipular multitudes y tomar decisiones de vida o muerte. Una reflexión sobre el poder, la tecnología y la humanidad frente a sistemas automatizados de control."
              poster="https://pics.filmaffinity.com/gladiator-851958258-mmed.jpg"
              themes={['Épica', 'IA', 'Control Tecnológico', 'Humanidad', 'Poder']}
            />
          </div>
          <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
            <p className="text-sm text-cyan-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver al menos una película antes del lunes,
              (2) Reflexionar sobre cómo las películas muestran comportamientos similares a un asistente virtual (perseverancia, seguimiento de objetivos, aprendizaje),
              (3) Pensar: ¿Qué diferencia hay entre los robots de las películas y un chatbot actual?,
              (4) Preparar 2-3 preguntas para debatir: ¿Puede un robot desarrollar conciencia? ¿Qué nos hace humanos?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 5 (Low-Code e IA) */}
      {module.slug === 'low-code-no-code' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y Automatización"
          description="Películas recomendadas para reflexionar sobre IA, automatización y el futuro del trabajo"
          icon={<Film className="h-5 w-5 text-cyan-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="M3GAN (2022)"
              description="Una empresa de juguetes crea una muñeca con IA avanzada que aprende y evoluciona de forma autónoma. Cuando la muñeca empieza a tomar decisiones peligrosas para proteger a su dueña, surge la pregunta: ¿hasta dónde debe llegar la autonomía de una IA? Un thriller sobre automatización, ética de la IA y los límites de la delegación de decisiones en sistemas inteligentes."
              poster="https://pics.filmaffinity.com/m3gan-570441440-mmed.jpg"
              themes={['IA Autónoma', 'Automatización', 'Ética', 'Robótica', 'Thriller']}
            />
            <MovieCard
              title="Minority Report (2002)"
              description="En un futuro donde una unidad de élite de la policía utiliza tecnología predictiva para detener crímenes antes de que ocurran, un agente descubre que el sistema puede estar equivocado. Una reflexión visionaria sobre predicción algorítmica, automatización de decisiones, sesgos en sistemas de IA y los peligros de delegar la justicia en algoritmos sin supervisión humana."
              poster="https://pics.filmaffinity.com/minority_report-284130722-mmed.jpg"
              themes={['Predicción Algorítmica', 'Automatización', 'Sesgo de IA', 'Ética', 'Futuro']}
            />
            <MovieCard
              title="Free Guy (2021)"
              description="Un cajero de banco en un videojuego se vuelve consciente y comienza a cuestionar su existencia programada. Una comedia que explora la conciencia artificial, la autonomía de los NPCs en entornos virtuales, y cómo los sistemas automatizados pueden desarrollar personalidad y libre albedrío. Reflexión sobre la diferencia entre código y vida, y los límites de la programación en entornos interactivos."
              poster="https://pics.filmaffinity.com/free_guy-297648487-mmed.jpg"
              themes={['Conciencia Artificial', 'Automatización', 'Videojuegos', 'Libre Albedrío', 'IA']}
            />
          </div>
          <div className="mt-4 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
            <p className="text-sm text-cyan-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver la película antes del lunes,
              (2) Reflexionar sobre cómo la IA de M3GAN toma decisiones autónomas sin supervisión humana,
              (3) Pensar: ¿Qué paralelismos hay entre M3GAN y los asistentes virtuales empresariales sin controles adecuados?,
              (4) Preparar 2-3 preguntas para debatir: ¿Dónde deben estar los límites de la autonomía de la IA?
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 7 (Ética, Privacidad y Legislación) */}
      {module.slug === 'etica-privacidad' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y Ética en IA"
          description="Películas y documentales sobre ética, privacidad y los peligros de la IA sin regulación"
          icon={<Film className="h-5 w-5 text-red-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Coded Bias (2020)"
              description="Documental que sigue a la investigadora Joy Buolamwini del MIT, quien descubre que los algoritmos de reconocimiento facial no detectan rostros de piel oscura. Una investigación reveladora sobre sesgo racial en IA, vigilancia algorítmica y la lucha por regular la tecnología de reconocimiento facial."
              poster="https://pics.filmaffinity.com/coded_bias-670175084-mmed.jpg"
              themes={['Sesgo Algorítmico', 'Reconocimiento Facial', 'Racismo', 'Regulación', 'Documental']}
            />
            <MovieCard
              title="The Social Dilemma (2020)"
              description="Ex-empleados de Silicon Valley revelan cómo las redes sociales usan IA para manipular el comportamiento de los usuarios, recopilar datos masivos y crear adicción. Un documental imprescindible sobre privacidad digital, manipulación algorítmica y la necesidad de regulación tecnológica."
              poster="https://pics.filmaffinity.com/the_social_dilemma-384147385-mmed.jpg"
              themes={['Privacidad', 'Manipulación', 'Big Tech', 'Algoritmos', 'Documental']}
            />
            <MovieCard
              title="Gattaca (1997)"
              description="En un futuro donde la modificación genética determina tu lugar en la sociedad, un hombre genéticamente 'imperfecto' lucha por alcanzar sus sueños. Reflexión sobre discriminación algorítmica, determinismo genético, privacidad de datos biométricos y los peligros de clasificar personas por sus datos."
              poster="https://pics.filmaffinity.com/gattaca-690490097-mmed.jpg"
              themes={['Discriminación', 'Datos Biométricos', 'Privacidad', 'Ética', 'Ciencia Ficción']}
            />
          </div>
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver Coded Bias antes del lunes,
              (2) Reflexionar sobre cómo los sesgos se transfieren a los algoritmos,
              (3) Investigar un caso real de sesgo algorítmico en España o Europa,
              (4) Preparar 2-3 propuestas de cómo el GDPR y el AI Act podrían haber prevenido el problema
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 8 (Áreas Funcionales) */}
      {module.slug === 'areas-funcionales' && (
        <CollapsibleSection
          title="📚 Deberes de Fin de Semana: Cine y IA Empresarial"
          description="Películas sobre IA aplicada a negocios, predicción y transformación digital"
          icon={<Film className="h-5 w-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="Moneyball (2011)"
              description="Un equipo de béisbol con poco presupuesto usa análisis estadístico y datos para competir contra equipos ricos. Basada en hechos reales, muestra cómo el análisis predictivo y la toma de decisiones basada en datos puede revolucionar cualquier industria, desde el deporte hasta los negocios."
              poster="https://pics.filmaffinity.com/moneyball-572287299-mmed.jpg"
              themes={['Análisis de Datos', 'Predicción', 'Innovación', 'Gestión', 'Basada en hechos']}
            />
            <MovieCard
              title="The Founder (2016)"
              description="La historia de Ray Kroc y cómo transformó un pequeño restaurante en el imperio McDonald's. Lecciones sobre eficiencia operativa, estandarización de procesos, escalabilidad y cómo la optimización de operaciones (hoy potenciada por IA) puede transformar un negocio."
              poster="https://pics.filmaffinity.com/the_founder-172341798-mmed.jpg"
              themes={['Operaciones', 'Eficiencia', 'Escalabilidad', 'Negocios', 'Basada en hechos']}
            />
            <MovieCard
              title="The Big Short (2015)"
              description="Un grupo de inversores descubre la burbuja inmobiliaria de 2008 analizando datos que nadie más estaba mirando. Una obra maestra sobre análisis financiero, predicción de riesgos y cómo los datos pueden revelar verdades que los expertos ignoran."
              poster="https://pics.filmaffinity.com/the_big_short-129125490-mmed.jpg"
              themes={['Finanzas', 'Análisis de Riesgo', 'Predicción', 'Datos', 'Basada en hechos']}
            />
          </div>
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver Moneyball antes del lunes,
              (2) Identificar 3 decisiones del film que hoy se podrían tomar con IA,
              (3) Reflexionar: ¿Qué área funcional de tu empresa se beneficiaría más de la IA?,
              (4) Preparar una mini-propuesta de caso de uso de IA para tu departamento
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Deberes de Fin de Semana - Módulo 9 (Proyectos Integradores) */}
      {module.slug === 'proyectos-integradores' && (
        <CollapsibleSection
          title="📚 Inspiración: Cine sobre Proyectos y Equipos"
          description="Películas sobre trabajo en equipo, innovación y la ejecución de proyectos ambiciosos"
          icon={<Film className="h-5 w-5 text-orange-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MovieCard
              title="The Imitation Game (2014)"
              description="La historia de Alan Turing y su equipo para descifrar Enigma en la Segunda Guerra Mundial. Un proyecto imposible con plazos imposibles, equipos multidisciplinares, gestión de stakeholders escépticos y la importancia de la perseverancia. El proyecto de IA más importante de la historia."
              poster="https://pics.filmaffinity.com/the_imitation_game-475498891-mmed.jpg"
              themes={['Gestión de Proyectos', 'Equipos', 'IA', 'Innovación', 'Basada en hechos']}
            />
            <MovieCard
              title="Hidden Figures (2016)"
              description="Tres mujeres matemáticas afroamericanas que fueron cruciales en el programa espacial de la NASA. Demuestra cómo la diversidad en equipos de proyecto, el cálculo y la perseverancia ante barreras institucionales pueden lograr lo imposible."
              poster="https://pics.filmaffinity.com/hidden_figures-810983135-mmed.jpg"
              themes={['Diversidad', 'Matemáticas', 'Equipos', 'Perseverancia', 'Basada en hechos']}
            />
            <MovieCard
              title="Apollo 13 (1995)"
              description="Cuando una explosión pone en peligro la misión Apollo 13, los equipos de la NASA deben improvisar soluciones con recursos limitados bajo presión extrema. Lecciones magistrales sobre gestión de crisis, resolución de problemas, trabajo en equipo y entrega de resultados cuando todo falla."
              poster="https://pics.filmaffinity.com/apollo_13-254915224-mmed.jpg"
              themes={['Gestión de Crisis', 'Trabajo en Equipo', 'Resolución', 'Liderazgo', 'Basada en hechos']}
            />
          </div>
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              💡 <strong>Actividad para el Lunes:</strong>
              (1) Ver The Imitation Game antes del lunes,
              (2) Identificar las fases del proyecto de Turing y mapearlas a CRISP-DM,
              (3) Reflexionar sobre los retos de gestión de proyecto que enfrentó Turing,
              (4) Preparar un timeline inicial de tu proyecto integrador con las 6 fases CRISP-DM
            </p>
          </div>
        </CollapsibleSection>
      )}

      {/* Lecturas Recomendadas - Módulo 4 (Bots y Asistentes) */}
      {module.slug === 'bots-asistentes' && (
        <CollapsibleSection
          title="📖 Lecturas Recomendadas"
          description="Libros para profundizar en los temas del módulo"
          icon={<BookOpen className="h-5 w-5 text-blue-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Caballo de Troya */}
            <Card className="border-slate-200 bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="https://m.media-amazon.com/images/I/71jN7aKSz4L._AC_UF1000,1000_QL80_.jpg"
                    alt="Caballo de Troya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Caballo de Troya</h4>
                  <p className="text-sm text-slate-600">J.J. Benítez</p>
                </div>
                <p className="text-xs text-slate-600 line-clamp-4">
                  Saga de ciencia ficción que explora viajes en el tiempo, inteligencia artificial y civilizaciones avanzadas. Una obra que combina misterio, tecnología y reflexión sobre el futuro de la humanidad.
                </p>
                <a
                  href="https://docs.google.com/file/d/0B4xCibVvdMUGUU82NlB1TjFzd1E/view?resourcekey=0-wc5qfgAVbjHWKwDRoGXzJw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <BookOpen className="h-3 w-3" />
                  Ver libro en Google Docs
                </a>
              </CardContent>
            </Card>

            {/* Fundación - Isaac Asimov */}
            <Card className="border-slate-200 bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="aspect-[2/3] rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src="https://m.media-amazon.com/images/I/81i5i05EgHL._AC_UF1000,1000_QL80_.jpg"
                    alt="Fundación"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Fundación</h4>
                  <p className="text-sm text-slate-600">Isaac Asimov</p>
                </div>
                <p className="text-xs text-slate-600 line-clamp-4">
                  Obra maestra de la ciencia ficción que narra la caída de un Imperio Galáctico y los esfuerzos por preservar el conocimiento humano. Asimov explora temas de psicohistoria, IA implícita, robótica y el futuro de la civilización.
                </p>
                <a
                  href="https://www.mercaba.org/SANLUIS/ALiteratura/Literatura%20contempor%C3%A1nea/Asimov,%20Issac/Fundaci%C3%B3n.PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <BookOpen className="h-3 w-3" />
                  Leer libro (PDF)
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Recomendación:</strong>
              Estas lecturas te ayudarán a contextualizar los temas del módulo desde una perspectiva de ciencia ficción. Reflexiona sobre cómo los autores imaginaron la IA, los viajes en el tiempo y el futuro de la humanidad hace décadas.
            </p>
          </div>
        </CollapsibleSection>
      )}

      <Tabs defaultValue="content" className="w-full">
        <TabsList className={`grid w-full ${
          module.slug === 'avatares-virtuales' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' : 
          module.slug === 'bots-asistentes' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5' :
          module.slug === 'proyectos-integradores' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' :
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
        } h-auto p-1`}>
          <TabsTrigger value="content" className="flex items-center gap-2 py-2.5">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contenido</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2 py-2.5">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Recursos</span>
          </TabsTrigger>
          <TabsTrigger value="ai-tools" className="flex items-center gap-2 py-2.5">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Herramientas IA</span>
          </TabsTrigger>
          {module.slug === 'avatares-virtuales' && (
            <TabsTrigger value="practice-lab" className="flex items-center gap-2 py-2.5">
              <Beaker className="h-4 w-4" />
              <span className="hidden sm:inline">Laboratorio</span>
            </TabsTrigger>
          )}
          {module.slug === 'avatares-virtuales' && (
            <TabsTrigger value="sound-exercises" className="flex items-center gap-2 py-2.5">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Ejercicios Avatar</span>
            </TabsTrigger>
          )}
          {module.slug === 'llms-generativa' && (
            <TabsTrigger value="sound-exercises" className="flex items-center gap-2 py-2.5">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Ejercicios Sonido</span>
            </TabsTrigger>
          )}
          <TabsTrigger value="games" className="flex items-center gap-2 py-2.5">
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Juegos y Enlaces</span>
          </TabsTrigger>
          {module.slug === 'proyectos-integradores' && (
            <TabsTrigger value="job-search" className="flex items-center gap-2 py-2.5">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Búsqueda de empleo</span>
            </TabsTrigger>
          )}
          {module.slug === 'bots-asistentes' && (
            <TabsTrigger value="vibe-coding" className="flex items-center gap-2 py-2.5">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Vibe Coding</span>
            </TabsTrigger>
          )}
          {module.slug === 'low-code-no-code' && (
            <TabsTrigger value="ai-agents" className="flex items-center gap-2 py-2.5">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Agentes IA</span>
            </TabsTrigger>
          )}
          {module.slug === 'recursos-adicionales' && (
            <TabsTrigger value="student-portfolios" className="flex items-center gap-2 py-2.5">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Portfolios Alumnos</span>
            </TabsTrigger>
          )}
          {module.slug === 'marketing-ia' && (
            <TabsTrigger value="email-marketing" className="flex items-center gap-2 py-2.5">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email Marketing</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <ModuleContentAccordion
                htmlContent={module.content}
                moduleSlug={module.slug}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          {isLoadingResources ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            </div>
          ) : (
            <div className="space-y-6">
              <ResourceList resources={allResources} />

              {/* Resumen Ejecutivo del Módulo 3 - Solo para Avatares Virtuales */}
              {module.slug === 'avatares-virtuales' && (
                <Module3Summary />
              )}

              {/* Sección de Videos - Solo en Módulo 1 */}
              {module.slug === 'introduccion-ia' && (
                <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-red-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-red-900">🎬 Videos Recomendados</CardTitle>
                        <p className="text-sm text-red-700">Contenido audiovisual para complementar tu aprendizaje</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Video 1 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/Q6BclIP5QBQ?start=421"
                            title="Video 1: Introducción a la IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 Introducción a la Inteligencia Artificial
                        </p>
                      </div>

                      {/* Video 2 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/5MWT_doo68k?start=17"
                            title="Video 2: Aplicaciones de la IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 Aplicaciones Prácticas de la IA
                        </p>
                      </div>
                    </div>

                    {/* Fila de videos adicionales */}
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                      {/* Video 3 */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/IY1WXMOJMVw"
                            title="Video 3: IA y Automatización"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-red-800 font-medium">
                          📺 IA y Automatización en la Industria
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-red-600 text-center">
                      💡 Consejo: Los videos comienzan en el punto exacto recomendado para este módulo.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Videos - Módulo 2 (LLMs) */}
              {module.slug === 'llms-generativa' && (
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-purple-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-purple-900">🎬 Videos Recomendados - LLMs</CardTitle>
                        <p className="text-sm text-purple-700">Videos sobre Modelos de Lenguaje y Prompt Engineering</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Video 1: LLMs explicados */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/Sz4qacFBHLk"
                            title="Video 1: LLMs explicados"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 ¿Qué son los LLMs?
                        </p>
                      </div>

                      {/* Video 2: Prompt Engineering */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/x-iTco25VGI"
                            title="Video 2: Prompt Engineering"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Prompt Engineering básico
                        </p>
                      </div>

                      {/* Video 3: Aplicaciones de IA */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/OCdIvYcH3Gc"
                            title="Video 3: Aplicaciones de IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 Aplicaciones prácticas de IA
                        </p>
                      </div>

                      {/* Video 4: Google Cloud LLMs */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/GjvgtwSOCao"
                            title="Video 4: Google Cloud LLMs"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-purple-800 font-medium">
                          📺 LLMs en Google Cloud
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 text-center">
                      💡 Consejo: Toma notas mientras ves los videos. Hay conceptos clave que usarás en las prácticas.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Videos Recomendados - Módulo 4 (Bots y Asistentes) */}
              {module.slug === 'bots-asistentes' && (
                <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-cyan-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-cyan-700"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 9 5 3-5 3z"/><path d="M2 8v8"/></svg>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-cyan-900">🎬 Videos Recomendados - Bots y Asistentes</CardTitle>
                        <p className="text-sm text-cyan-700">Videos sobre Chatbots, NLP y Diseño Conversacional</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Video 1: Cómo funcionan los chatbots */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/gXj55zpRoUE"
                            title="Video 1: Cómo funcionan los chatbots"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 ¿Cómo funcionan los Chatbots?
                        </p>
                      </div>

                      {/* Video 2: Dialogflow Tutorial */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/5MWT_doo68k"
                            title="Video 2: Dialogflow Tutorial"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Dialogflow para Principiantes
                        </p>
                      </div>

                      {/* Video 3: Diseño Conversacional */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/1vI5n9Y0kXg"
                            title="Video 3: Diseño Conversacional"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Diseño de Conversaciones para Chatbots
                        </p>
                      </div>

                      {/* Video 4: Ética en IA Conversacional */}
                      <div className="space-y-2">
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src="https://www.youtube.com/embed/OCdIvYcH3Gc"
                            title="Video 4: Ética en IA"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <p className="text-sm text-cyan-800 font-medium">
                          📺 Ética en Asistentes Virtuales
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-cyan-600 text-center">
                      💡 Consejo: Toma notas mientras ves los videos. Hay conceptos clave que usarás en las prácticas de diseño de flujos.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Sección de Drones e IA - Módulo 3 (Avatares Virtuales) - Contenido COMPLETO */}
              {module.slug === 'avatares-virtuales' && (
                <DronesGuide />
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai-tools" className="mt-4">
          <Card className="border-border/60 overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="summarizer" orientation="vertical" className="flex flex-col md:flex-row min-h-[400px]">
                <div className="w-full md:w-56 border-b md:border-b-0 md:border-r bg-muted/30">
                  <div className="p-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 mb-2">Herramientas</p>
                    <TabsList className="flex flex-row md:flex-col w-full h-auto bg-transparent gap-1 p-0">
                      <TabsTrigger value="summarizer" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Sparkles className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Resumen con IA</span>
                      </TabsTrigger>
                      <TabsTrigger value="assistant" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Bot className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Asistente de Dudas</span>
                      </TabsTrigger>
                      <TabsTrigger value="image-generator" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <ImageIcon className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">Crear Imágenes</span>
                      </TabsTrigger>
                      {module.slug === 'creacion-avatares-virtuales' && (
                        <TabsTrigger value="avatar-creator" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <UserRoundCog className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">Crear Avatar</span>
                        </TabsTrigger>
                      )}
                      {module.slug === 'bots-asistentes' && (
                        <TabsTrigger value="eliza" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <Bot className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">ELIZA Retro (1966)</span>
                        </TabsTrigger>
                      )}
                      {module.slug === 'bots-asistentes' && (
                        <TabsTrigger value="alice" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <Bot className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">A.L.I.C.E. Terminal (1995)</span>
                        </TabsTrigger>
                      )}
                      {module.slug === 'bots-asistentes' && (
                        <TabsTrigger value="cv-builder" className="justify-start w-full px-3 py-2.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <FileText className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">CV Builder Pro</span>
                        </TabsTrigger>
                      )}
                    </TabsList>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <TabsContent value="summarizer" className="mt-0">
                    <AISummarizer content={module.content} />
                  </TabsContent>
                  <TabsContent value="assistant" className="mt-0">
                    <AIAssistant
                      courseContent={module.content}
                      moduleSlug={module.slug}
                      additionalContext={resourcesContext}
                    />
                  </TabsContent>
                  <TabsContent value="image-generator" className="mt-0">
                    <AIImageGenerator />
                  </TabsContent>
                  {module.slug === 'creacion-avatares-virtuales' && (
                    <TabsContent value="avatar-creator" className="mt-0">
                      <AvatarCreator />
                    </TabsContent>
                  )}
                  {module.slug === 'bots-asistentes' && (
                    <TabsContent value="eliza" className="mt-0">
                      <ElizaRetroAssistant />
                    </TabsContent>
                  )}
                  {module.slug === 'bots-asistentes' && (
                    <TabsContent value="alice" className="mt-0">
                      <AliceTerminalRetro />
                    </TabsContent>
                  )}
                  {module.slug === 'bots-asistentes' && (
                    <TabsContent value="cv-builder" className="mt-0">
                      <CVBuilderTool />
                    </TabsContent>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice-lab" className="mt-4">
          <PracticeLab />
        </TabsContent>

        <TabsContent value="sound-exercises" className="mt-4">
          {module.slug === 'avatares-virtuales' ? (
            <AvatarExercises />
          ) : module.slug === 'llms-generativa' ? (
            <SoundAIExercises />
          ) : null}
        </TabsContent>

        <TabsContent value="games" className="mt-4">
          <GamesSection moduleSlug={module.slug} />
        </TabsContent>

        {module.slug === 'proyectos-integradores' && (
          <TabsContent value="job-search" className="mt-4">
            <JobSearchTool />
          </TabsContent>
        )}

        {/* Vibe Coding - Solo Módulo 4 */}
        {module.slug === 'bots-asistentes' && (
          <TabsContent value="vibe-coding" className="mt-4">
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-purple-200 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">🚀 Vibe Coding - Herramientas de Desarrollo con IA</CardTitle>
                    <p className="text-sm text-purple-700">Plataformas para crear aplicaciones y prototipos usando inteligencia artificial</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sección Amateur - Desplegable */}
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-purple-900">🚀 Vibe Coding - Herramientas de Desarrollo con IA</h3>
                              <p className="text-sm text-purple-700">Plataformas para crear aplicaciones y prototipos usando IA</p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-purple-600 transition-transform duration-300 collapsible-chevron" />
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 pt-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Readdy.ai */}
                  <a
                    href="https://readdy.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-purple-200 bg-white hover:border-purple-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 group-hover:text-purple-700">Readdy.ai</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Genera interfaces de usuario completas a partir de descripciones en lenguaje natural. Prototipado rápido con IA.
                    </p>
                  </a>

                  {/* Lovable.dev */}
                  <a
                    href="https://lovable.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-pink-200 bg-white hover:border-pink-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-pink-900 group-hover:text-pink-700">Lovable.dev</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Crea aplicaciones web completas describiendo lo que necesitas. IA que escribe código por ti.
                    </p>
                  </a>

                  {/* Stitch (Google) */}
                  <a
                    href="https://stitch.withgoogle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-blue-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Palette className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 group-hover:text-blue-700">Stitch (Google)</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Experimento de Google para diseño asistido por IA. Explora el futuro del diseño de interfaces.
                    </p>
                  </a>

                  {/* Websim */}
                  <a
                    href="https://websim.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-purple-200 bg-white hover:border-purple-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 group-hover:text-purple-700">Websim</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Simulador web que genera páginas y aplicaciones funcionales a partir de prompts de texto.
                    </p>
                  </a>

                  {/* Google AI Studio */}
                  <a
                    href="https://aistudio.google.com/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-cyan-200 bg-white hover:border-cyan-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-cyan-900 group-hover:text-cyan-700">Google AI Studio</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Plataforma de Google para prototipar con modelos Gemini. Crea apps con IA generativa.
                    </p>
                  </a>

                  {/* Rocket.new */}
                  <a
                    href="https://www.rocket.new/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-green-200 bg-white hover:border-green-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 group-hover:text-green-700">Rocket.new</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Generador de sitios web con IA. Describe tu proyecto y obtén un sitio funcional en segundos.
                    </p>
                  </a>

                  {/* Figma */}
                  <a
                    href="https://www.figma.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-purple-200 bg-white hover:border-purple-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-700 to-pink-600 flex items-center justify-center">
                        <PenTool className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 group-hover:text-purple-700">Figma</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Herramienta de diseño colaborativo. Ahora con funciones de IA para generar diseños y componentes.
                    </p>
                  </a>

                  {/* Notion */}
                  <a
                    href="https://www.notion.so/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700">Notion</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Espacio de trabajo todo-en-uno con IA integrada. Documentación, notas y gestión de proyectos.
                    </p>
                  </a>

                  {/* v0.app */}
                  <a
                    href="https://v0.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover:text-slate-700">v0.app</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Generador de UI con IA de Vercel. Crea componentes React con Tailwind CSS usando prompts de texto.
                    </p>
                  </a>

                  {/* NxCode */}
                  <a
                    href="https://www.nxcode.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-indigo-200 bg-white hover:border-indigo-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-indigo-900 group-hover:text-indigo-700">NxCode</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Asistente de código con IA para desarrollo web. Autocompletado inteligente y generación de código.
                    </p>
                  </a>

                  {/* UXPilot */}
                  <a
                    href="https://uxpilot.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-pink-200 bg-white hover:border-pink-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <Palette className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-pink-900 group-hover:text-pink-700">UXPilot.ai</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Herramienta de diseño UX asistida por IA. Genera wireframes, user flows y documentación de diseño.
                    </p>
                  </a>

                  {/* Obsidian */}
                  <a
                    href="https://obsidian.md/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-violet-200 bg-white hover:border-violet-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-violet-900 group-hover:text-violet-700">Obsidian</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Base de conocimiento personal con enlaces bidireccionales. Ideal para organizar documentación de proyectos y notas de desarrollo.
                    </p>
                  </a>

                  {/* Bolt.new */}
                  <a
                    href="https://bolt.new/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-sky-200 bg-white hover:border-sky-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-sky-900 group-hover:text-sky-700">Bolt.new</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Desarrollo web completo con IA. Crea, edita y despliega aplicaciones full-stack directamente desde el navegador.
                    </p>
                  </a>

                  {/* Bolt.diy */}
                  <a
                    href="https://bolt.diy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-emerald-200 bg-white hover:border-emerald-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-emerald-900 group-hover:text-emerald-700">Bolt.diy</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Versión open-source y self-hosted de Bolt.new. Control total sobre tu entorno de desarrollo con IA, sin dependencias externas.
                    </p>
                  </a>

                  {/* Pencil.dev */}
                  <a
                    href="https://www.pencil.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-amber-200 bg-white hover:border-amber-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <PenTool className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-amber-900 group-hover:text-amber-700">Pencil.dev</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Generador de sitios web con IA. Crea landing pages y sitios completos a partir de descripciones en lenguaje natural.
                    </p>
                  </a>

                  {/* ChatGPT Codex */}
                  <a
                    href="https://chatgpt.com/codex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-green-200 bg-white hover:border-green-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 group-hover:text-green-700">ChatGPT Codex</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Modo de codificación de ChatGPT. Genera, edita y depura código en múltiples lenguajes con explicaciones paso a paso.
                    </p>
                  </a>

                  {/* Replit */}
                  <a
                    href="https://replit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-lg border-2 border-orange-200 bg-white hover:border-orange-400 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-900 group-hover:text-orange-700">Replit Agent</h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      Agente autónomo de IA que construye apps completas desde un prompt. Funciona 100% en el navegador, sin instalar nada. Ideal para empezar.
                    </p>
                  </a>
                </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Separador */}
                <Separator className="my-6 bg-purple-200" />

                {/* Sección PRO - Desplegable */}
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                              <Rocket className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">🛠️ Vibe Coding PRO — Herramientas Profesionales</h3>
                              <p className="text-sm text-slate-600">IDEs y asistentes de código para desarrolladores</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">Nivel profesional</Badge>
                            <ChevronDown className="h-5 w-5 text-amber-600 transition-transform duration-300 collapsible-chevron" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-slate-600">
                        Estas son las herramientas que usan los desarrolladores profesionales para construir aplicaciones reales con IA. Entorno de desarrollo, backend y asistentes de código.
                      </p>

                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Firebase Studio */}
                    <a
                      href="https://studio.firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-amber-200 bg-white hover:border-amber-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-amber-900 group-hover:text-amber-700">Firebase Studio</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Entorno visual de Firebase para construir apps con IA. Prototipa, conecta y despliega sin escribir código.
                      </p>
                    </a>

                    {/* Firebase Console */}
                    <a
                      href="https://console.firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-yellow-200 bg-white hover:border-yellow-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-yellow-900 group-hover:text-yellow-700">Firebase Console</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Panel de administración de Firebase. Gestiona bases de datos, autenticación, hosting, funciones cloud y más.
                      </p>
                    </a>

                    {/* VS Code */}
                    <a
                      href="https://code.visualstudio.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-blue-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                          <Code2 className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-blue-900 group-hover:text-blue-700">VS Code</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        El editor de código más popular del mundo. Gratuito, con miles de extensiones e integración con Copilot y otras IAs.
                      </p>
                    </a>

                    {/* Cursor */}
                    <a
                      href="https://cursor.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                          <ExternalLink className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-900 group-hover:text-slate-700">Cursor</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Editor de código con IA integrada. Escribe, refactoriza y depura código con asistentes de IA contextuales. El favorito de los profesionales.
                      </p>
                    </a>

                    {/* Antigravity */}
                    <a
                      href="http://antigravity.google/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-cyan-200 bg-white hover:border-cyan-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                          <Rocket className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-cyan-900 group-hover:text-cyan-700">Antigravity (Google)</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Herramienta experimental de Google para desarrollo asistido por IA. Descarga y explora el futuro del desarrollo de software.
                      </p>
                    </a>

                    {/* GitHub Copilot */}
                    <a
                      href="https://github.com/features/copilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-slate-200 bg-white hover:border-slate-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                          <Code2 className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-900 group-hover:text-slate-700">GitHub Copilot</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        El asistente de código más usado del mundo. Integrado en VS Code, genera código, tests y explica funciones en tiempo real.
                      </p>
                    </a>

                    {/* Windsurf */}
                    <a
                      href="https://windsurf.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-sky-200 bg-white hover:border-sky-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                          <ExternalLink className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-sky-900 group-hover:text-sky-700">Windsurf (Codeium)</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        IDE con IA integrado, competidor directo de Cursor. Tiene "Flows" que entienden todo tu proyecto y contexto completo.
                      </p>
                    </a>

                    {/* Claude Code */}
                    <a
                      href="https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-lg border-2 border-violet-200 bg-white hover:border-violet-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-bold text-violet-900 group-hover:text-violet-700">Claude Code</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Agente de codificación de Anthropic. Trabaja en terminal, entiende repos completos y realiza cambios complejos de forma autónoma.
                      </p>
                    </a>
                  </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Separador */}
                <Separator className="my-6 bg-cyan-200" />

                {/* Sección CLI - Desplegable */}
                <Collapsible className="space-y-3">
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-teal-50 to-white">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                              <Code2 className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-800">⌨️ Vibe Coding CLI — Herramientas de Terminal</h3>
                              <p className="text-sm text-slate-600">Automatiza tareas y genera código desde la línea de comandos</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-700 border-cyan-200">Línea de comandos</Badge>
                            <ChevronDown className="h-5 w-5 text-cyan-600 transition-transform duration-300 collapsible-chevron" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-slate-600">
                        Estas herramientas se instalan y ejecutan desde la terminal. Son las favoritas de los desarrolladores avanzados porque permiten automatizar tareas, generar código y trabajar directamente sobre tus archivos.
                      </p>

                      {/* Grid de herramientas CLI */}
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Gemini CLI */}
                    <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-cyan-900">Gemini CLI</h4>
                            <p className="text-[10px] text-cyan-600">Google</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          CLI oficial de Google. Ejecuta Gemini desde terminal para generar código, analizar archivos y automatizar tareas.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">npm install -g @anthropic-ai/gemini-cli</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">npm install -g @anthropic-ai/gemini-cli</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">npm install -g @anthropic-ai/gemini-cli</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://ai.google.dev/gemini-api/docs/cli" target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-600 hover:text-cyan-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Documentación oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Qwen CLI */}
                    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-purple-900">Qwen CLI</h4>
                            <p className="text-[10px] text-purple-600">Alibaba / Open Source</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Modelos open-source de Alibaba. Potente, gratuito y con soporte para múltiples lenguajes de programación.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install qwen-agent</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install qwen-agent</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install qwen-agent</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://github.com/QwenLM/Qwen" target="_blank" rel="noopener noreferrer" className="text-[10px] text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> GitHub oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Aider */}
                    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-emerald-900">Aider</h4>
                            <p className="text-[10px] text-emerald-600">Pair programming en terminal</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          El estándar para pair programming en terminal. Edita archivos de tu repo directamente con IA. Compatible con GPT-4, Claude, Gemini.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install aider-chat</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install aider-chat</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install aider-chat</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://aider.chat/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 hover:text-emerald-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Documentación oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Open Interpreter */}
                    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                            <Rocket className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-orange-900">Open Interpreter</h4>
                            <p className="text-[10px] text-orange-600">Ejecuta código en natural</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Escribe en lenguaje natural y ejecuta código real en tu máquina. "Crea un gráfico de ventas" → lo genera al instante.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install open-interpreter</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install open-interpreter</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">pip install open-interpreter</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://openinterpreter.com/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-orange-600 hover:text-orange-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Web oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Amazon Q CLI */}
                    <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 via-amber-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-900">Amazon Q CLI</h4>
                            <p className="text-[10px] text-yellow-600">AWS</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          CLI de AWS para desarrolladores. Genera código, analiza logs y gestiona infraestructura cloud desde la terminal.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">winget install Amazon.Q</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">brew install --cask amazon-q</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">curl -fsSL https://aws.amazon.com/q/install | sh</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://aws.amazon.com/q/developer/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-yellow-600 hover:text-yellow-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Documentación AWS
                        </a>
                      </CardContent>
                    </Card>

                    {/* GitHub Copilot CLI */}
                    <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-gray-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                            <ExternalLink className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">GitHub Copilot CLI</h4>
                            <p className="text-[10px] text-slate-600">GitHub / Microsoft</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Copilot en tu terminal. Traduce lenguaje natural a comandos bash/zsh/powershell. "Busca archivos mayores de 1MB" → genera el comando.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">winget install GitHub.cli</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">brew install gh</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">sudo apt install gh</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://github.com/cli/cli" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-600 hover:text-slate-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> GitHub oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Continue.dev */}
                    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-indigo-900">Continue.dev</h4>
                            <p className="text-[10px] text-indigo-600">Open Source</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Extensión open-source para VS Code y JetBrains. Conecta cualquier modelo (GPT, Claude, Gemini) directamente en tu editor.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Buscar "Continue" en VS Code Extensions</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Buscar "Continue" en VS Code Extensions</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Buscar "Continue" en VS Code Extensions</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://www.continue.dev/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Web oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Gemini Code Assist */}
                    <Card className="border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-teal-900">Gemini Code Assist</h4>
                            <p className="text-[10px] text-teal-600">Google Cloud</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          La apuesta de Google para desarrollo con IA. Integrado en VS Code y JetBrains, con contexto de todo tu repositorio.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Instalar extensión "Gemini Code Assist" en VS Code</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Instalar extensión "Gemini Code Assist" en VS Code</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Instalar extensión "Gemini Code Assist" en VS Code</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://cloud.google.com/products/gemini/code-assist" target="_blank" rel="noopener noreferrer" className="text-[10px] text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Google Cloud
                        </a>
                      </CardContent>
                    </Card>

                    {/* Warp Terminal */}
                    <Card className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                            <Rocket className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-rose-900">Warp Terminal</h4>
                            <p className="text-[10px] text-rose-600">Terminal con IA</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Terminal moderno con IA integrada. Escribes lo que quieres hacer en lenguaje natural y genera el comando automáticamente.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">winget install Warp.Warp</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">brew install --cask warp</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">curl https://releases.warp.dev/linux/deb/warp.list | sudo tee /etc/apt/sources.list.d/warp.list</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://www.warp.dev/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Web oficial
                        </a>
                      </CardContent>
                    </Card>

                    {/* Devin */}
                    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-900">Devin (Cognition AI)</h4>
                            <p className="text-[10px] text-amber-600">Ingeniero de software IA autónomo</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          El primer "ingeniero de software IA autónomo". Le das una tarea y la resuelve solo, paso a paso, planificando y ejecutando.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Acceso:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Web</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">Solicitar acceso en cognition.ai</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://www.cognition.ai/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-amber-600 hover:text-amber-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Cognition AI
                        </a>
                      </CardContent>
                    </Card>

                    {/* Zed */}
                    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-violet-900">Zed</h4>
                            <p className="text-[10px] text-violet-600">Editor ultrarrápido</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600">
                          Editor ultrarrápido creado por los autores de Atom. IA integrada y colaboración en tiempo real. Escrito en Rust para máximo rendimiento.
                        </p>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Instalación:</p>
                          <div className="space-y-1">
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-blue-50 text-blue-700 border-blue-200 shrink-0 mt-0.5">Win</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">winget install ZedIndustries.Zed</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-slate-100 text-slate-700 border-slate-200 shrink-0 mt-0.5">Mac</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">brew install --cask zed</code>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Badge variant="outline" className="text-[9px] bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">Linux</Badge>
                              <code className="text-[10px] bg-slate-100 rounded px-1.5 py-0.5 font-mono break-all">curl -f https://zed.dev/install.sh | sh</code>
                            </div>
                          </div>
                        </div>
                        <a href="https://zed.dev/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-violet-600 hover:text-violet-800 hover:underline flex items-center gap-1">
                          <ExternalLink className="h-2.5 w-2.5" /> Web oficial
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>💡 Consejo:</strong> Estas herramientas te permiten prototipar y crear aplicaciones usando solo descripciones en lenguaje natural.
                    ¡Perfectas para materializar rápidamente las ideas de tus asistentes virtuales!
                  </p>
                </div>

                <Separator className="my-6 bg-purple-200" />

                {/* Vibe Prompt Studio - Desplegable */}
                <Collapsible className="border border-purple-200 rounded-xl bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow border-0 bg-transparent">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-purple-900">🎨 Vibe Prompt Studio · Generador Profesional de Prompts</h3>
                              <p className="text-sm text-purple-700">Crea prompts de nivel senior para Vibe Coding, Lovable, Readdy y otros asistentes de código</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-purple-600">
                            <ChevronDown className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <VibePromptStudio />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* AI Skill Builder - Nueva sección */}
                <Collapsible className="border border-violet-200 rounded-xl bg-gradient-to-br from-violet-50/50 via-white to-purple-50/50 mt-4">
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow border-0 bg-transparent">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
                              <Brain className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-violet-900">🧠 AI Skill Builder · Crea Habilidades para IA</h3>
                              <p className="text-sm text-violet-700">Diseña skills personalizados para asistentes de IA: diseño, buenas prácticas, seguridad, testing y más</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-violet-600">
                            <ChevronDown className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <AISkillBuilder />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Agentes IA - Solo Módulo 5 */}
        {module.slug === 'low-code-no-code' && (
          <TabsContent value="ai-agents" className="mt-4">
            <AIAgentsSection />
          </TabsContent>
        )}

        {/* Portfolios Alumnos - Solo en Recursos Adicionales */}
        {module.slug === 'recursos-adicionales' && (
          <TabsContent value="student-portfolios" className="mt-4">
            <StudentPortfolios />
          </TabsContent>
        )}

        {/* Email Marketing Section - Only for Marketing IA Module */}
        {module.slug === 'marketing-ia' && (
          <TabsContent value="email-marketing" className="mt-4">
            <EmailMarketingSection />
          </TabsContent>
        )}

      </Tabs>
    </div>
  );
}
