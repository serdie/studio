import type { LucideIcon } from 'lucide-react';
import { BookCopy, BrainCircuit, BotMessageSquare } from 'lucide-react';

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
    title: 'Introducción a la IA',
    duration: '30 h',
    description: 'Fundamentos de la IA y su impacto en el mundo empresarial.',
    longDescription: 'Este módulo cubre los conceptos fundamentales de la Inteligencia Artificial, su historia, y cómo está transformando industrias. Los estudiantes aprenderán sobre los diferentes tipos de IA y su aplicación práctica en los negocios.',
    progress: 75,
    icon: BrainCircuit,
    resources: [
      { title: 'Presentación del Módulo 1', file: '/resources/modulo1.pdf' },
      { title: 'Glosario de Términos de IA', file: '/resources/glosario-ia.pdf' },
      { title: 'Dataset de Ejemplo: Ventas', file: '/resources/ventas.csv' },
    ],
    content: `
      <h2>Semana 1: Historia y Fundamentos de la IA</h2>
      <p>Exploraremos los orígenes de la inteligencia artificial, desde las ideas de Alan Turing hasta los sistemas expertos. Se introducirán los conceptos de machine learning, deep learning y redes neuronales.</p>
      <h2>Semana 2: IA en la Empresa</h2>
      <p>Análisis de casos de uso de la IA en diferentes sectores: finanzas, salud, retail y más. Discutiremos el impacto en la eficiencia operativa, la toma de decisiones y la creación de nuevos modelos de negocio.</p>
      <h2>Semana 3: Ética y Futuro de la IA</h2>
      <p>Debate sobre las implicaciones éticas de la inteligencia artificial, incluyendo el sesgo en los algoritmos y la privacidad de los datos. Visionaremos las tendencias futuras y el futuro del trabajo en la era de la IA.</p>
    `
  },
  {
    id: 2,
    slug: 'modelos-lenguaje-llm',
    title: 'Modelos de Lenguaje (LLMs)',
    duration: '60 h',
    description: 'Exploración profunda de los LLMs y la IA generativa.',
    longDescription: 'Los estudiantes se sumergirán en el mundo de los Modelos de Lenguaje Grandes (LLMs). Aprenderán sobre arquitecturas como los Transformers, técnicas de fine-tuning y cómo utilizar APIs de modelos como GPT y Gemini para crear aplicaciones.',
    progress: 45,
    icon: BookCopy,
    resources: [
      { title: 'Paper "Attention Is All You Need"', file: '/resources/attention.pdf' },
      { title: 'Guía de Prompt Engineering', file: '/resources/prompt-guide.pdf' },
      { title: 'Ejemplos de código Python', file: '/resources/code-examples.zip' },
    ],
    content: `
      <h2>Semana 1-2: Arquitectura de Transformers</h2>
      <p>Estudio detallado del paper "Attention Is All You Need". Descompondremos la arquitectura del Transformer, entendiendo los mecanismos de atención, codificadores y decodificadores.</p>
      <h2>Semana 3-4: IA Generativa y LLMs</h2>
      <p>Introducción a la IA generativa. Se analizarán los principales LLMs del mercado (GPT, Gemini, Llama). Los alumnos realizarán prácticas interactuando con estos modelos a través de sus APIs.</p>
      <h2>Semana 5-6: Fine-tuning y Aplicaciones</h2>
      <p>Aprenderemos a especializar un LLM para una tarea concreta mediante el fine-tuning. Desarrollaremos un proyecto práctico, como un chatbot de atención al cliente o un generador de contenido.</p>
    `
  },
  {
    id: 3,
    slug: 'creacion-avatares-virtuales',
    title: 'Creación de Avatares Virtuales',
    duration: '36 h',
    description: 'Diseño y aplicación de avatares virtuales con IA.',
    longDescription: 'Módulo práctico donde los estudiantes utilizarán herramientas de IA generativa para crear y personalizar avatares virtuales. Se explorarán las aplicaciones de estos avatares en marketing, educación y entretenimiento.',
    progress: 10,
    icon: BotMessageSquare,
    resources: [
      { title: 'Tutorial de Creación de Avatares', file: '/resources/avatar-tutorial.pdf' },
      { title: 'Herramientas de IA para Imágenes', file: '/resources/image-tools.pdf' },
      { title: 'Casos de Éxito: Avatares en Empresas', file: '/resources/avatar-cases.pdf' },
    ],
    content: `
      <h2>Semana 1: Diseño de Personajes con IA</h2>
      <p>Utilizaremos generadores de imágenes basados en texto (como Midjourney o Stable Diffusion) para conceptualizar y diseñar la apariencia de un avatar. Aprenderemos a escribir prompts efectivos para obtener el resultado deseado.</p>
      <h2>Semana 2: Generación y Personalización del Avatar</h2>
      <p>Introducción a plataformas que permiten crear avatares 3D a partir de imágenes o descripciones. Los estudiantes usarán la herramienta de la plataforma para generar su propio avatar personalizado.</p>
      <h2>Semana 3: Aplicaciones Prácticas</h2>
      <p>Integraremos los avatares creados en un pequeño proyecto. Por ejemplo, un video de presentación, un asistente virtual para una página web o un personaje para un prototipo de juego.</p>
    `
  }
];

export const getUser = () => ({
  name: 'Estudiante',
  email: 'estudiante@ailearninghub.com',
});
