'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon, Sparkles } from 'lucide-react';
import { generateCourseImage } from '@/ai/flows/ai-image-generation';
import { useToast } from '@/hooks/use-toast';

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;

    startTransition(async () => {
      try {
        const result = await generateCourseImage({ prompt });
        if (result.imageUrl) {
          setImageUrl(result.imageUrl);
        } else {
          throw new Error('No se recibió ninguna URL de imagen.');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error de generación',
          description: 'No se pudo generar la imagen. Inténtalo de nuevo.',
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-headline font-semibold mb-2">Generador de Imágenes con IA</h2>
      <p className="text-muted-foreground mb-4">
        Crea imágenes relacionadas con el curso a partir de una descripción de texto.
      </p>

      <div className="flex gap-2 mb-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: 'Un cerebro hecho de circuitos brillantes'"
          disabled={isPending}
        />
        <Button onClick={handleGenerateImage} disabled={isPending || !prompt.trim()}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generar
        </Button>
      </div>

      <div className="aspect-video w-full border rounded-lg bg-muted/20 flex items-center justify-center overflow-hidden">
        {isPending && <Skeleton className="w-full h-full" />}
        {!isPending && imageUrl && (
          <Image
            src={imageUrl}
            alt={`Imagen generada para: ${prompt}`}
            width={512}
            height={288}
            className="object-contain"
          />
        )}
        {!isPending && !imageUrl && (
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto h-12 w-12" />
            <p>La imagen generada aparecerá aquí.</p>
          </div>
        )}
      </div>
       {imageUrl && !isPending && (
          <Button onClick={() => setImageUrl('')} variant="link" className="p-0 h-auto mt-2">
            Crear otra imagen
          </Button>
        )}
    </div>
  );
}
