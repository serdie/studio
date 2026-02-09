'use client';

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRoundCog, Sparkles, Upload } from 'lucide-react';
import { aiCustomAvatarCreation } from '@/ai/flows/ai-custom-avatar-creation';
import { useToast } from '@/hooks/use-toast';

export default function AvatarCreator() {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedAvatarUrl, setGeneratedAvatarUrl] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });

  const handleGenerateAvatar = async () => {
    if (!prompt.trim()) return;

    startTransition(async () => {
      try {
        let imageBase64: string | undefined = undefined;
        if (imageFile) {
          imageBase64 = await toBase64(imageFile);
        }

        const result = await aiCustomAvatarCreation({ prompt, image: imageBase64 });
        if (result.avatarImageUrl) {
          setGeneratedAvatarUrl(result.avatarImageUrl);
        } else {
          throw new Error('No se recibió la URL del avatar.');
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error de generación',
          description: 'No se pudo crear el avatar. Inténtalo de nuevo.',
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-headline font-semibold mb-2">Creador de Avatares Virtuales</h2>
      <p className="text-muted-foreground mb-4">
        Diseña tu propio avatar. Describe cómo quieres que sea y, opcionalmente, sube una imagen de referencia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="avatar-prompt">Descripción del avatar</Label>
          <Textarea
            id="avatar-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: 'Un astronauta de estilo anime con un casco de cristal, flotando en el espacio.'"
            className="min-h-[120px] mb-4"
            disabled={isPending}
          />

          <Label htmlFor="avatar-image">Imagen de referencia (opcional)</Label>
          <div 
            className="mt-1 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              {imagePreview ? (
                <Image src={imagePreview} alt="Previsualización" width={100} height={100} className="mx-auto rounded-md" />
              ) : (
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              )}
              <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                <p className="pl-1">{imageFile ? imageFile.name : 'Sube un archivo o arrástralo aquí'}</p>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF hasta 10MB</p>
            </div>
            <Input 
              id="avatar-image" 
              type="file" 
              className="sr-only" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/gif"
              disabled={isPending}
            />
          </div>

          <Button onClick={handleGenerateAvatar} disabled={isPending || !prompt.trim()} className="w-full mt-4">
            <Sparkles className="mr-2 h-4 w-4" />
            Crear Avatar
          </Button>
        </div>
        
        <div className="aspect-square w-full border rounded-lg bg-muted/20 flex items-center justify-center overflow-hidden">
          {isPending && <Skeleton className="w-full h-full" />}
          {!isPending && generatedAvatarUrl && (
            <Image
              src={generatedAvatarUrl}
              alt={`Avatar generado para: ${prompt}`}
              width={512}
              height={512}
              className="object-contain"
            />
          )}
          {!isPending && !generatedAvatarUrl && (
            <div className="text-center text-muted-foreground">
              <UserRoundCog className="mx-auto h-12 w-12" />
              <p>Tu avatar personalizado aparecerá aquí.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
