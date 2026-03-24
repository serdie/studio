'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  UserRoundCog,
  Sparkles,
  Mic,
  FileText,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Download,
  Volume2,
  BrainCircuit,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { generateCourseImage } from '@/ai/flows/ai-image-generation';
import { useToast } from '@/hooks/use-toast';

const VOICE_OPTIONS = [
  { id: 'corp', name: 'Corporativa Madura', tone: 'Serio y Profesional', description: 'Ideal para banca y seguros.', icon: '👔' },
  { id: 'tech', name: 'Cercana y Dinámica', tone: 'Amigable y Entusiasta', description: 'Ideal para startups y tecnología.', icon: '🚀' },
  { id: 'luxury', name: 'Sofisticada Elegante', tone: 'Refinado y Exclusivo', description: 'Ideal para productos de lujo.', icon: '💎' },
  { id: 'friendly', name: 'Amable y Paciente', tone: 'Cálido y Servicial', description: 'Ideal para atención al cliente.', icon: '🤝' },
];

export default function PracticeLab() {
  const [step, setStep] = useState(1);
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0]);
  const [script, setScript] = useState('');
  const [isGenerating, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerateImage = async () => {
    if (!avatarPrompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Campo requerido',
        description: 'Por favor, describe cómo quieres que sea tu avatar.'
      });
      return;
    }

    // Limpiar el prompt para evitar filtros de contenido
    const cleanPrompt = avatarPrompt
      .replace(/[^\w\sáéíóúñÁÉÍÓÚÑüÜ,.-]/g, '')
      .substring(0, 500);

    startTransition(async () => {
      try {
        const result = await generateCourseImage({ 
          prompt: `Professional corporate headshot portrait, business professional attire, neutral background, studio lighting, high quality, photorealistic, ${cleanPrompt}` 
        });
        if (result.imageUrl) {
          setGeneratedImageUrl(result.imageUrl);
          toast({ 
            title: '¡Imagen generada!', 
            description: 'Tu avatar visual está listo. Haz clic en "Siguiente Fase" para continuar.' 
          });
        }
      } catch (error) {
        console.error('Error generando imagen:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        toast({
          variant: 'destructive',
          title: 'Error al generar imagen',
          description: errorMessage
        });
      }
    });
  };

  const resetLab = () => {
    setStep(1);
    setAvatarPrompt('');
    setGeneratedImageUrl('');
    setSelectedVoice(VOICE_OPTIONS[0]);
    setScript('');
  };

  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="flex justify-between items-center mb-8 bg-muted/30 p-4 rounded-xl border border-border/50">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`
              h-10 w-10 rounded-full flex items-center justify-center font-bold transition-all
              ${step === s ? 'bg-primary text-primary-foreground scale-110 shadow-lg' : 
                step > s ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}
            `}>
              {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
            </div>
            {s < 4 && (
              <div className={`h-1 w-12 mx-2 rounded ${step > s ? 'bg-green-500' : 'bg-muted'}`} />
            )}
          </div>
        ))}
        <div className="ml-4 flex-1 text-right">
          <Badge variant="outline" className="text-primary border-primary/30">
            {step === 1 && "Fase 1: Identidad Visual"}
            {step === 2 && "Fase 2: Personalidad de Voz"}
            {step === 3 && "Fase 3: Guion de Mensaje"}
            {step === 4 && "Fase 4: Resultado Final"}
          </Badge>
        </div>
      </div>

      {/* Step 1: Visual Identity */}
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Diseña el Rostro
              </CardTitle>
              <CardDescription>
                Describe cómo quieres que sea el embajador visual de tu marca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Descripción detallada</Label>
                <Textarea 
                  id="prompt"
                  placeholder="Ej: Mujer de unos 30 años, rasgos mediterráneos, vestimenta ejecutiva azul marino, fondo de oficina moderna difuminado, expresión amable y profesional."
                  value={avatarPrompt}
                  onChange={(e) => setAvatarPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <Button 
                onClick={handleGenerateImage} 
                disabled={isGenerating || !avatarPrompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando con IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Visual de Avatar
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-muted/10 min-h-[300px] relative overflow-hidden group">
            {generatedImageUrl ? (
              <>
                <img
                  src={generatedImageUrl}
                  alt="Avatar generado"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button size="sm" onClick={() => setStep(2)} className="shadow-lg">
                    Siguiente Fase
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserRoundCog className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground italic">
                  Tu creación visual aparecerá aquí una vez que la generes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Voice Personality */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VOICE_OPTIONS.map((voice) => (
              <Card 
                key={voice.id}
                className={`cursor-pointer transition-all border-2 ${selectedVoice.id === voice.id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                onClick={() => setSelectedVoice(voice)}
              >
                <CardHeader className="p-4">
                  <div className="text-3xl mb-2">{voice.icon}</div>
                  <CardTitle className="text-base">{voice.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-2">{voice.description}</p>
                  <Badge variant="secondary" className="text-[10px]">
                    {voice.tone}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center bg-primary/5 p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white">
                <Volume2 className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-primary">Personalidad Seleccionada: {selectedVoice.name}</p>
                <p className="text-sm text-muted-foreground">Configuración TTS: {selectedVoice.tone}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Anterior</Button>
              <Button onClick={() => setStep(3)}>
                Configurar Guion
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Script Configuration */}
      {step === 3 && (
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Escribe el Guion
                </CardTitle>
                <CardDescription>
                  Este es el mensaje que tu avatar locutará. Máximo 500 caracteres para esta práctica.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Hola, soy tu nuevo asistente virtual..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px] text-lg leading-relaxed"
                />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{script.length} / 500 caracteres</span>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)}>Anterior</Button>
                    <Button onClick={() => setStep(4)} disabled={!script.trim()}>
                      Finalizar Diseño
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-primary">
              <BrainCircuit className="h-4 w-4" />
              Tips de Locución
            </h4>
            <ul className="space-y-3">
              {[
                "Usa comas para pausas breves.",
                "Escribe números en letras para evitar errores.",
                "Evita abreviaturas complejas.",
                "Divide frases largas en dos cortas."
              ].map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm bg-muted/30 p-3 rounded-lg border border-border/50">
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] flex-shrink-0">{i+1}</div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Step 4: Final Result */}
      {step === 4 && (
        <div className="flex justify-center animate-in zoom-in duration-500">
          <Card className="max-w-2xl w-full border-4 border-primary/20 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            
            <CardHeader className="text-center border-b bg-muted/5">
              <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Ficha de Identidad del Avatar</CardTitle>
              <CardDescription>Configuración final generada en el AI Learning Hub</CardDescription>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="h-48 w-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white relative flex-shrink-0">
                  <img src={generatedImageUrl} alt="Avatar final" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Voz</p>
                      <p className="font-bold">{selectedVoice.name}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-xl">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Tono</p>
                      <p className="font-bold">{selectedVoice.tone}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-2">Mensaje Programado</p>
                    <p className="text-sm italic leading-relaxed">"{script}"</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <Button onClick={resetLab} variant="outline" className="flex-1">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Empezar de Nuevo
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  Guardar Configuración
                </Button>
              </div>
            </CardContent>
            
            <div className="p-4 bg-muted/10 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              AI Learning Hub - CEOE-FEDETO - Módulo 3: Avatares Virtuales
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
