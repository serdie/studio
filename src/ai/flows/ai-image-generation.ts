'use server';

/**
 * @fileOverview A flow for generating images related to the course material.
 *
 * - generateCourseImage - A function that generates an image based on a text prompt.
 * - ImageGenerationInput - The input type for the generateCourseImage function.
 * - ImageGenerationOutput - The return type for the generateCourseImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGenerationInputSchema = z.object({
  prompt: z.string().describe('A text prompt to generate an image from.'),
});
export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>;

const ImageGenerationOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;

export async function generateCourseImage(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
  return aiImageGenerationFlow(input);
}

const aiImageGenerationFlow = ai.defineFlow(
  {
    name: 'aiImageGenerationFlow',
    inputSchema: ImageGenerationInputSchema,
    outputSchema: ImageGenerationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [{ text: input.prompt }],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageUrl: media.url};
  }
);
