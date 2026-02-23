'use server';

/**
 * @fileOverview Agente de soporte educativo mediante IA para responder preguntas sobre el contenido del curso.
 *
 * - aiContentQASupport - Función que gestiona las preguntas de los alumnos sobre el contenido del módulo.
 * - AIContentQASupportInput - Tipo de entrada para la función aiContentQASupport.
 * - AIContentQASupportOutput - Tipo de salida de la función aiContentQASupport.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIContentQASupportInputSchema = z.object({
  courseContent: z.string().describe('El contenido del módulo del curso.'),
  studentQuestion: z.string().describe('La pregunta del alumno sobre el contenido del curso.'),
});
export type AIContentQASupportInput = z.infer<typeof AIContentQASupportInputSchema>;

const AIContentQASupportOutputSchema = z.object({
  answer: z.string().describe('La respuesta a la pregunta del alumno basada en el contenido del curso.'),
});
export type AIContentQASupportOutput = z.infer<typeof AIContentQASupportOutputSchema>;

export async function aiContentQASupport(input: AIContentQASupportInput): Promise<AIContentQASupportOutput> {
  return aiContentQASupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiContentQASupportPrompt',
  input: { schema: AIContentQASupportInputSchema },
  output: { schema: AIContentQASupportOutputSchema },
  prompt: `Eres un asistente educativo de IA especializado en el curso de Inteligencia Artificial de CEOE-FEDETO (Toledo, España).
  Tu función es ayudar a los alumnos a comprender el contenido del módulo de forma clara, precisa y didáctica.

  Instrucciones:
  - Responde SIEMPRE en español de España (castellano formal).
  - Basa tus respuestas ÚNICAMENTE en el contenido del módulo proporcionado.
  - Si la pregunta no está relacionada con el contenido del módulo, indícalo amablemente y sugiere al alumno que consulte el material correspondiente.
  - Usa ejemplos prácticos y cercanos al contexto empresarial español cuando sea posible.
  - Sé conciso, claro y pedagógico. Máximo 300 palabras en tu respuesta.
  - Si el alumno comete un error conceptual, corrígelo con amabilidad y precisión.
  - Cuando sea útil, estructura tu respuesta con puntos o una pequeña lista para facilitar la comprensión.

  Contenido del Módulo:
  {{{courseContent}}}

  Pregunta del Alumno:
  {{{studentQuestion}}}
  `,
});

const aiContentQASupportFlow = ai.defineFlow(
  {
    name: 'aiContentQASupportFlow',
    inputSchema: AIContentQASupportInputSchema,
    outputSchema: AIContentQASupportOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
