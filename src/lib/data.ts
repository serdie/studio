import type { LucideIcon } from 'lucide-react';
import { 
  BookCopy, 
  BrainCircuit, 
  BotMessageSquare, 
  Settings2, 
  Cpu, 
  Megaphone, 
  ShieldCheck, 
  Layers, 
  Rocket 
} from 'lucide-react';

export interface Resource {
  title: string;
  file: string;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  duration: string;
  description: string;
  longDescription: string;
  progress: number;
  icon: LucideIcon;
  resources: Resource[];
  content: string;
}

export const modules: Module[] = [
  {
    id: 1,
    slug: 'introduccion-ia',
    title: 'Módulo 1: Introducción a la IA',
    duration: '30 h',
    description: 'Impacto en el mundo empresarial y fundamentos básicos.',
    longDescription: 'Fundamentos de la IA, evolución, tendencias y estrategia empresarial. Incluye sesiones sobre optimización de procesos y debates socioeconómicos.',
    progress: 0,
    icon: BrainCircuit,
    resources: [],
    content: `
      <h2>1.1. Fundamentos de la IA</h2><p>Definición, historia y tipos de IA.</p>
      <h2>1.2. Evolución y tendencias</h2><p>Machine Learning, Deep Learning, PLN, Visión por Computadora y Robótica.</p>
      <h2>1.3. Impacto en la empresa</h2><p>Optimización de procesos y nuevos modelos de negocio.</p>
    `
  },
  {
    id: 2,
    slug: 'llms-generativa',
    title: 'Módulo 2: Modelos de Lenguaje (LLMs)',
    duration: '60 h',
    description: 'IA Generativa, ChatGPT y Prompt Engineering avanzado.',
    longDescription: 'Exploración profunda de los LLMs, uso avanzado de ChatGPT y técnicas de ingeniería de prompts para aplicaciones empresariales.',
    progress: 0,
    icon: BookCopy,
    resources: [],
    content: `
      <h2>2.1. Introducción a LLMs</h2><p>Conceptos de IA Generativa y funcionamiento de modelos masivos.</p>
      <h2>2.3. Ingeniería de Prompts</h2><p>Técnicas avanzadas para maximizar el rendimiento de ChatGPT y Gemini.</p>
    `
  },
  {
    id: 3,
    slug: 'avatares-virtuales',
    title: 'Módulo 3: Avatares Virtuales',
    duration: '36 h',
    description: 'Creación y aplicación de avatares con IA.',
    longDescription: 'Generación de avatares, adaptación de contenidos y tecnologías de Texto a Voz (TTS).',
    progress: 0,
    icon: BotMessageSquare,
    resources: [],
    content: `
      <h2>3.1. Generación de Avatares</h2><p>Herramientas para crear representaciones digitales realistas.</p>
      <h2>3.3. Tecnologías Text-to-Voice</h2><p>Implementación de voces sintéticas naturales.</p>
    `
  },
  {
    id: 4,
    slug: 'bots-asistentes',
    title: 'Módulo 4: Bots y Asistentes',
    duration: '42 h',
    description: 'Creación, implementación y estrategia multimodal.',
    longDescription: 'Estrategia de asistentes internos vs externos, proceso de creación y ética en la automatización.',
    progress: 0,
    icon: Cpu,
    resources: [],
    content: `
      <h2>4.3. Proceso de Creación</h2><p>Fases desde el diseño de flujo hasta la implementación técnica.</p>
    `
  },
  {
    id: 5,
    slug: 'low-code-no-code',
    title: 'Módulo 5: Low-Code e IA',
    duration: '42 h',
    description: 'Automatización de procesos con MAKE e IA integrada.',
    longDescription: 'Introducción al movimiento No-Code y automatización avanzada de flujos de trabajo utilizando MAKE.',
    progress: 0,
    icon: Settings2,
    resources: [],
    content: `
      <h2>5.2. Automatización con MAKE</h2><p>Creación de escenarios y conexión de aplicaciones sin código.</p>
    `
  },
  {
    id: 6,
    slug: 'marketing-ia',
    title: 'Módulo 6: Marketing con IA',
    duration: '24 h',
    description: 'SEO, SEM, Funnels y Redes Sociales con IA.',
    longDescription: 'Aplicación de la inteligencia artificial para optimizar el posicionamiento, la conversión y la gestión de comunidades.',
    progress: 0,
    icon: Megaphone,
    resources: [],
    content: `
      <h2>6.2. IA para SEO y SEM</h2><p>Optimización de contenidos y campañas publicitarias.</p>
    `
  },
  {
    id: 7,
    slug: 'etica-privacidad',
    title: 'Módulo 7: Ética y Privacidad',
    duration: '24 h',
    description: 'Legislación, GDPR y el nuevo reglamento europeo.',
    longDescription: 'Análisis de sesgos, protección de datos y el marco legal de la IA en la Unión Europea.',
    progress: 0,
    icon: ShieldCheck,
    resources: [],
    content: `
      <h2>7.3. Marco legal</h2><p>Reglamento europeo de IA y GDPR aplicado.</p>
    `
  },
  {
    id: 8,
    slug: 'areas-funcionales',
    title: 'Módulo 8: Aplicaciones Funcionales',
    duration: '12 h',
    description: 'IA en Logística, RRHH, Finanzas y Operaciones.',
    longDescription: 'Casos prácticos de IA aplicada a la cadena de suministro, contratación y gestión financiera.',
    progress: 0,
    icon: Layers,
    resources: [],
    content: `
      <h2>8.1. IA en Ventas y RRHH</h2><p>Personalización de la experiencia y contratación inteligente.</p>
    `
  },
  {
    id: 9,
    slug: 'proyectos-integradores',
    title: 'Módulo 9: Proyectos Integradores',
    duration: '90 h',
    description: 'Desarrollo, defensa y despliegue de proyectos reales.',
    longDescription: 'Fase final del curso dedicada a la creación de un proyecto práctico completo con monitorización real.',
    progress: 0,
    icon: Rocket,
    resources: [],
    content: `
      <h2>9.2. Selección de Proyecto</h2><p>Definición de retos reales con aplicación a la empresa.</p>
    `
  }
];

export const getUser = () => ({
  name: 'Profesor/Estudiante',
  email: 'usuario@ceoe-fedeto.com',
  role: 'instructor' // Simulado para el prototipo
});
