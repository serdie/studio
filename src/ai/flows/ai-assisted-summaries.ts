// src/ai/flows/ai-assisted-summaries.ts
'use server';

/**
 * @fileOverview Genera resúmenes asistidos por IA del contenido de los módulos del curso.
 *
 * - aiSummarize - Función que recibe el contenido del módulo y devuelve un resumen.
 * - AiSummarizeInput - Tipo de entrada para la función aiSummarize.
 * - AiSummarizeOutput - Tipo de salida de la función aiSummarize.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiSummarizeInputSchema = z.object({
  moduleContent: z.string().describe('El contenido del módulo a resumir.'),
});
export type AiSummarizeInput = z.infer<typeof AiSummarizeInputSchema>;

const AiSummarizeOutputSchema = z.object({
  summary: z.string().describe('Un resumen conciso del contenido del módulo.'),
});
export type AiSummarizeOutput = z.infer<typeof AiSummarizeOutputSchema>;

export async function aiSummarize(input: AiSummarizeInput): Promise<AiSummarizeOutput> {
  return aiSummarizeFlow(input);
}

const aiSummarizePrompt = ai.definePrompt({
  name: 'aiSummarizePrompt',
  input: { schema: AiSummarizeInputSchema },
  output: { schema: AiSummarizeOutputSchema },
  prompt: `Eres un asistente educativo de IA del curso de Inteligencia Artificial de CEOE-FEDETO (Toledo, España).
  Tu tarea es generar un resumen conciso y claro del contenido del módulo educativo proporcionado.

  Instrucciones:
  - Redacta el resumen SIEMPRE en español de España (castellano formal).
  - El resumen no debe superar las 200 palabras.
  - Sigue esta estructura:
    1. Introducción breve (1-2 frases sobre el tema del módulo)
    2. Conceptos clave (lista breve de los 3-5 puntos más importantes)
    3. Conclusión (1-2 frases sobre la utilidad práctica del módulo)
  - Usa un lenguaje accesible para jóvenes de 16 a 29 años, sin perder el rigor académico.
  - No incluyas información que no esté en el contenido proporcionado.
  - Destaca en negativo cualquier limitación o riesgo mencionado en el módulo.

  Contenido del Módulo:
  {{{moduleContent}}}
`,
});

const aiSummarizeFlow = ai.defineFlow(
  {
    name: 'aiSummarizeFlow',
    inputSchema: AiSummarizeInputSchema,
    outputSchema: AiSummarizeOutputSchema,
  },
  async input => {
    const { output } = await aiSummarizePrompt(input);
    return output!;
  }
);
