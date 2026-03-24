'use server';

/**
 * @fileOverview Generación de imágenes con IA para el curso usando Pollinations.ai (gratuito, sin API key).
 */

export interface ImageGenerationInput {
  prompt: string;
}

export interface ImageGenerationOutput {
  imageUrl: string;
}

export async function generateCourseImage(input: ImageGenerationInput): Promise<ImageGenerationOutput> {
  try {
    console.log('Generando imagen con Pollinations.ai. Prompt:', input.prompt);

    // Pollinations.ai es gratuito y no requiere API key
    // URL directa para generar imagen
    const encodedPrompt = encodeURIComponent(input.prompt);
    const seed = Math.floor(Math.random() * 10000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;

    console.log('URL de imagen generada:', imageUrl);

    return { imageUrl };
  } catch (error) {
    console.error('=== ERROR EN GENERACIÓN DE IMÁGEN ===');
    console.error('Error completo:', error);
    console.error('Tipo de error:', error?.constructor?.name);
    console.error('Mensaje:', error instanceof Error ? error.message : 'Unknown');

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    // Error de filtro de contenido
    if (errorMessage.includes('filter') || errorMessage.includes('blocked') || errorMessage.includes('content') || errorMessage.includes('safety')) {
      throw new Error('La solicitud fue bloqueada por los filtros de contenido. Intenta con una descripción más simple.');
    }

    throw new Error(`Error al generar imagen: ${errorMessage}`);
  }
}
