'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles } from 'lucide-react';
import { aiSummarize } from '@/ai/flows/ai-assisted-summaries';
import { useToast } from '@/hooks/use-toast';

interface AISummarizerProps {
  content: string;
}

export default function AISummarizer({ content }: AISummarizerProps) {
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSummarize = () => {
    startTransition(async () => {
      const result = await aiSummarize({ moduleContent: content });
      if (result.summary) {
        setSummary(result.summary);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo generar el resumen.',
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-headline font-semibold mb-2">Resumen con IA</h2>
      <p className="text-muted-foreground mb-4">
        Obtén un resumen conciso de los puntos clave del módulo generado por nuestra IA.
      </p>
      
      {!summary && !isPending && (
        <Button onClick={handleSummarize} disabled={isPending}>
          <Sparkles className="mr-2 h-4 w-4" />
          Generar Resumen
        </Button>
      )}

      {isPending && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {summary && !isPending && (
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <p className="text-sm">{summary}</p>
            <Button onClick={() => setSummary('')} variant="link" className="p-0 h-auto mt-4">
              Generar otro resumen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
