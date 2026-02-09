'use server';

/**
 * @fileOverview An AI content question answering support agent.
 *
 * - aiContentQASupport - A function that handles question answering about course content.
 * - AIContentQASupportInput - The input type for the aiContentQASupport function.
 * - AIContentQASupportOutput - The return type for the aiContentQASupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIContentQASupportInputSchema = z.object({
  courseContent: z.string().describe('The content of the course module.'),
  studentQuestion: z.string().describe('The question from the student about the course content.'),
});
export type AIContentQASupportInput = z.infer<typeof AIContentQASupportInputSchema>;

const AIContentQASupportOutputSchema = z.object({
  answer: z.string().describe('The answer to the student question based on the course content.'),
});
export type AIContentQASupportOutput = z.infer<typeof AIContentQASupportOutputSchema>;

export async function aiContentQASupport(input: AIContentQASupportInput): Promise<AIContentQASupportOutput> {
  return aiContentQASupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiContentQASupportPrompt',
  input: {schema: AIContentQASupportInputSchema},
  output: {schema: AIContentQASupportOutputSchema},
  prompt: `You are an AI assistant helping students understand course content.

  You will be provided with the course content and a question from the student.
  Your goal is to answer the question accurately and helpfully using the course content.

  Course Content: {{{courseContent}}}

  Student Question: {{{studentQuestion}}}
  `,
});

const aiContentQASupportFlow = ai.defineFlow(
  {
    name: 'aiContentQASupportFlow',
    inputSchema: AIContentQASupportInputSchema,
    outputSchema: AIContentQASupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
