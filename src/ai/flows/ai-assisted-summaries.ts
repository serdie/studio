// src/ai/flows/ai-assisted-summaries.ts
'use server';

/**
 * @fileOverview Provides AI-assisted summaries of module content.
 *
 * - aiSummarize - A function that takes module content and returns a summary.
 * - AiSummarizeInput - The input type for the aiSummarize function.
 * - AiSummarizeOutput - The return type for the aiSummarize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSummarizeInputSchema = z.object({
  moduleContent: z.string().describe('The content of the module to be summarized.'),
});
export type AiSummarizeInput = z.infer<typeof AiSummarizeInputSchema>;

const AiSummarizeOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the module content.'),
});
export type AiSummarizeOutput = z.infer<typeof AiSummarizeOutputSchema>;

export async function aiSummarize(input: AiSummarizeInput): Promise<AiSummarizeOutput> {
  return aiSummarizeFlow(input);
}

const aiSummarizePrompt = ai.definePrompt({
  name: 'aiSummarizePrompt',
  input: {schema: AiSummarizeInputSchema},
  output: {schema: AiSummarizeOutputSchema},
  prompt: `You are an AI assistant designed to provide concise summaries of educational content.

  Please summarize the following module content:

  {{{moduleContent}}}

  Focus on the key concepts and main ideas, and provide a summary that is easy to understand.
  The summary should be no more than 200 words.
`,
});

const aiSummarizeFlow = ai.defineFlow(
  {
    name: 'aiSummarizeFlow',
    inputSchema: AiSummarizeInputSchema,
    outputSchema: AiSummarizeOutputSchema,
  },
  async input => {
    const {output} = await aiSummarizePrompt(input);
    return output!;
  }
);
