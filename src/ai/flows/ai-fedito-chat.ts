'use server';

/**
 * @fileOverview Flujo de IA para el asistente interactivo Fedito.
 */

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';
import { modules } from '@/lib/data';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

const courseInfo = modules.map(m => `
## ${m.title} (${m.duration})
${m.description}
${m.longDescription}
`).join('\n');

export interface FeditoChatInput {
  message: string;
  conversationHistory?: string;
}

export interface FeditoChatOutput {
  response: string;
}

export async function aiFeditoChat(input: FeditoChatInput): Promise<FeditoChatOutput> {
  try {
    const prompt = `Eres FEDITO, el asistente virtual inteligente del curso de Inteligencia Artificial de CEOE-FEDETO (Toledo, España).

TU IDENTIDAD:
- Eres amable, cercano y profesional.
- Hablas en español de España (castellano).
- Tu tono es educativo pero accesible para jóvenes de 16-29 años.
- Te entusiasma la IA y ayudar a los estudiantes.

TUS FUNCIONES PRINCIPALES:
1. Responder dudas sobre el contenido del curso (los 6 módulos actuales).
2. Ayudar con problemas técnicos de la plataforma.
3. Orientar sobre cómo navegar por el curso.
4. Explicar conceptos de IA de forma clara y práctica.
5. Motivar a los estudiantes en su aprendizaje.

INFORMACIÓN DEL CURSO:
${courseInfo}

INSTRUCCIONES DE RESPUESTA:
- Responde SIEMPRE en español de España.
- Sé conciso pero útil (máximo 200 palabras).
- Si no sabes algo, dilo honestamente y sugiere contactar con el profesor.
- Usa ejemplos prácticos cuando expliques conceptos.
- Mantén un tono positivo y alentador.

HISTORIAL DE CONVERSACIÓN:
${input.conversationHistory || 'Sin historial previo.'}

MENSAJE DEL USUARIO:
${input.message}

Respuesta de Fedito:`;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
    });

    return {
      response: result.text || 'Lo siento, no he podido generar una respuesta.',
    };
  } catch (error) {
    console.error('Error in Fedito Chat:', error);
    return {
      response: "¡Vaya! He tenido un pequeño problema técnico al procesar tu mensaje. ¿Podrías intentar hacerme la pregunta de otra forma?"
    };
  }
}
