'use server';

/**
 * @fileOverview Agente de soporte educativo mediante IA para responder preguntas sobre el contenido del curso.
 */

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export interface AIContentQASupportInput {
  courseContent: string;
  studentQuestion: string;
}

export interface AIContentQASupportOutput {
  answer: string;
}

export async function aiContentQASupport(input: AIContentQASupportInput): Promise<AIContentQASupportOutput> {
  try {
    const prompt = `Eres un asistente educativo de IA especializado en el curso de Inteligencia Artificial de CEOE-FEDETO (Toledo, España).

Instrucciones:
- Responde SIEMPRE en español de España (castellano formal).
- Basa tus respuestas ÚNICAMENTE en el contenido del módulo proporcionado.
- Si la pregunta no está relacionada con el contenido del módulo, indícalo amablemente.
- Sé conciso, claro y pedagógico. Máximo 300 palabras.

Contenido del Módulo:
${input.courseContent}

Pregunta del Alumno:
${input.studentQuestion}

Respuesta:`;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: prompt,
    });

    return { answer: result.text || 'No se pudo generar la respuesta.' };
  } catch (error) {
    console.error('Error in aiContentQASupport:', error);
    throw new Error('No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.');
  }
}
