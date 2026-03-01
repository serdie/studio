'use server';

/**
 * @fileOverview Creación de avatares personalizados con IA.
 */

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';
import { z } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

const AICustomAvatarCreationInputSchema = z.object({
  prompt: z.string().describe('Descripción de texto del avatar deseado.'),
});
export type AICustomAvatarCreationInput = z.infer<typeof AICustomAvatarCreationInputSchema>;

const AICustomAvatarCreationOutputSchema = z.object({
  avatarImageUrl: z.string().describe('URL de la imagen del avatar generado.'),
});
export type AICustomAvatarCreationOutput = z.infer<typeof AICustomAvatarCreationOutputSchema>;

export async function aiCustomAvatarCreation(input: AICustomAvatarCreationInput): Promise<AICustomAvatarCreationOutput> {
  try {
    const systemPrefix = `Eres un generador de avatares digitales para la plataforma educativa CEOE-FEDETO de Toledo (España).
Crea un avatar digital profesional y atractivo basado en la siguiente descripción.
El avatar debe tener un estilo moderno, tecnológico y positivo, adecuado para una plataforma de formación en Inteligencia Artificial.
Descripción del alumno: `;

    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: systemPrefix + input.prompt,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    const media = result.media;
    if (!media || !media.url) {
      throw new Error('No se pudo generar el avatar.');
    }

    return { avatarImageUrl: media.url };
  } catch (error) {
    console.error('Error in aiCustomAvatarCreation:', error);
    throw new Error('No se pudo generar el avatar. Inténtalo de nuevo.');
  }
}
