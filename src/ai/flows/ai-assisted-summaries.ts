'use server';

/**
 * @fileOverview Genera resúmenes asistidos por IA del contenido de los módulos del curso.
 */

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export interface AiSummarizeInput {
  moduleContent: string;
}

export interface AiSummarizeOutput {
  summary: string;
}

export async function aiSummarize(input: AiSummarizeInput): Promise<AiSummarizeOutput> {
  try {
    const prompt = `Eres un asistente educativo de IA del curso de Inteligencia Artificial de CEOE-FEDETO (Toledo, España).
Tu tarea es generar un resumen conciso y claro del contenido del módulo educativo proporcionado.

Instrucciones:
- Redacta el resumen SIEMPRE en español de España (castellano formal).
- El resumen no debe superar las 200 palabras.
- Sigue esta estructura:
  1. Introducción breve (1-2 frases sobre el tema del módulo)
  2. Conceptos clave (lista breve de los 3-5 puntos más importantes)
  3. Conclusión (1-2 frases sobre la utilidad práctica del módulo)
- Usa un lenguaje accesible para jóvenes de 16 a 29 años.

Contenido del Módulo:
${input.moduleContent}

Resumen:`;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
    });

    return { summary: result.text || 'No se pudo generar el resumen.' };
  } catch (error) {
    console.error('Error in aiSummarize:', error);
    throw new Error('No se pudo generar el resumen. Por favor, inténtalo de nuevo.');
  }
}
