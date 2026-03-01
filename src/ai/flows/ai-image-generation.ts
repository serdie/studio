'use server';

/**
 * @fileOverview Generación de imágenes con IA para el curso.
 */

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export interface ImageGenerationInput {
  prompt: string;
}

export interface ImageGenerationOutput {
  imageUrl: string;
}

export async function generateCourseImage(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
  try {
    console.log('Generando imagen con prompt:', input.prompt);
    
    const result = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: `Genera una imagen basada en esta descripción: ${input.prompt}`,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    console.log('Resultado recibido:', result);
    
    const media = result.media;
    if (!media || !media.url) {
      console.error('No se recibió media en el resultado:', result);
      throw new Error('No se recibió ninguna imagen del modelo. Gemini puede no soportar generación de imágenes en tu región.');
    }

    return { imageUrl: media.url };
  } catch (error) {
    console.error('=== ERROR EN GENERACIÓN DE IMÁGEN ===');
    console.error('Error completo:', error);
    console.error('Tipo de error:', error?.constructor?.name);
    console.error('Mensaje:', error instanceof Error ? error.message : 'Unknown');
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Error específico de región
    if (errorMessage.includes('not available in your country') || 
        errorMessage.includes('location')) {
      throw new Error('La generación de imágenes no está disponible en tu región.');
    }
    
    // Error de filtro de contenido
    if (errorMessage.includes('filter') || errorMessage.includes('blocked')) {
      throw new Error('La solicitud fue bloqueada por los filtros de contenido. Intenta con otra descripción.');
    }
    
    // Error de API key
    if (errorMessage.includes('API_KEY') || errorMessage.includes('api_key') || errorMessage.includes('401')) {
      throw new Error('Error de autenticación con la API de Google.');
    }
    
    throw new Error(`Error al generar imagen: ${errorMessage}`);
  }
}
