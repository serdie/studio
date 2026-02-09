'use server';

/**
 * @fileOverview A flow for AI-powered custom avatar creation.
 *
 * - aiCustomAvatarCreation - A function that handles the avatar creation process.
 * - AICustomAvatarCreationInput - The input type for the aiCustomAvatarCreation function.
 * - AICustomAvatarCreationOutput - The return type for the aiCustomAvatarCreation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICustomAvatarCreationInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired avatar.'),
  image: z
    .string()
    .optional()
    .describe(
      'Optional: A reference image for the avatar, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // per instructions, include format guidance
    ),
});
export type AICustomAvatarCreationInput = z.infer<typeof AICustomAvatarCreationInputSchema>;

const AICustomAvatarCreationOutputSchema = z.object({
  avatarImageUrl: z.string().describe('The URL of the generated avatar image.'),
});
export type AICustomAvatarCreationOutput = z.infer<typeof AICustomAvatarCreationOutputSchema>;

export async function aiCustomAvatarCreation(input: AICustomAvatarCreationInput): Promise<AICustomAvatarCreationOutput> {
  return aiCustomAvatarCreationFlow(input);
}

const aiCustomAvatarCreationPrompt = ai.definePrompt({
  name: 'aiCustomAvatarCreationPrompt',
  input: {schema: AICustomAvatarCreationInputSchema},
  output: {schema: AICustomAvatarCreationOutputSchema},
  prompt: `You are an AI avatar generator. Based on the following description, create a virtual avatar. If an image is provided, use it as a reference. Return the URL of the generated avatar image.

Description: {{{prompt}}}
{{#if image}}
Reference Image: {{media url=image}}
{{/if}}`,
});

const aiCustomAvatarCreationFlow = ai.defineFlow(
  {
    name: 'aiCustomAvatarCreationFlow',
    inputSchema: AICustomAvatarCreationInputSchema,
    outputSchema: AICustomAvatarCreationOutputSchema,
  },
  async input => {
    let generateArgs: Parameters<typeof ai.generate>[0];
    if (input.image) {
      generateArgs = {
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: input.image}},
          {text: input.prompt},
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      };
    } else {
      generateArgs = {
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: input.prompt,
      };
    }

    const {media} = await ai.generate(generateArgs);

    if (!media || !media.url) {
      throw new Error('Failed to generate avatar image.');
    }

    return {avatarImageUrl: media.url};
  }
);
