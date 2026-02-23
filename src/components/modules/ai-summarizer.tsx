'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { aiSummarize } from '@/ai/flows/ai-assisted-summaries';
import { useToast } from '@/hooks/use-toast';

interface AISummarizerProps {
  content: string;
}

export default function AISummarizer({ content }: AISummarizerProps) {
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = () => {
    startTransition(async () => {
      try {
        const result = await aiSummarize({ moduleContent: content });
        if (result.summary) {
          setSummary(result.summary);
        }
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error al generar el resumen',
          description: 'No se pudo generar el resumen. Por favor, inténtalo de nuevo.',
        });
      }
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h2 className="text-lg font-headline font-semibold mb-1 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Resumen con IA
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Genera un resumen conciso y estructurado de los puntos clave de este módulo using inteligencia artificial.
      </p>

      {!summary && !isPending && (
        <div className="flex flex-col items-center justify-center pt-4 gap-4 text-center">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-medium">¿Listo para resumir?</p>
            <p className="text-sm text-muted-foreground mt-1">La IA analizará el contenido y te dará un resumen en español.</p>
          </div>
          <Button onClick={handleSummarize} size="lg" className="mt-2">
            <Sparkles className="mr-2 h-4 w-4" />
            Generar Resumen con IA
          </Button>
        </div>
      )}

      {isPending && (
        <div className="space-y-3 p-4 border rounded-xl bg-muted/20 animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary animate-spin" />
            <span className="text-xs text-muted-foreground">Analizando el contenido...</span>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      )}

      {summary && !isPending && (
        <div className="space-y-3 animate-fade-in">
          <Card className="border-primary/20 bg-primary/3">
            <CardContent className="p-5">
              <p className="text-sm leading-relaxed whitespace-pre-line">{summary}</p>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
              {copied ? <Check className="mr-2 h-3.5 w-3.5 text-green-500" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
              {copied ? '¡Copiado!' : 'Copiar resumen'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSummarize} className="flex-1">
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Regenerar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
