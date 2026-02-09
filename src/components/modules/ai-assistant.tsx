'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, User } from 'lucide-react';
import { aiContentQASupport } from '@/ai/flows/ai-content-qa-support';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  courseContent: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ courseContent }: AIAssistantProps) {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAskQuestion = () => {
    if (!question.trim()) return;

    const userMessage: Message = { role: 'user', content: question };
    setConversation(prev => [...prev, userMessage]);
    setQuestion('');

    startTransition(async () => {
      const result = await aiContentQASupport({ courseContent, studentQuestion: question });
      if (result.answer) {
        const assistantMessage: Message = { role: 'assistant', content: result.answer };
        setConversation(prev => [...prev, assistantMessage]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo obtener una respuesta.',
        });
        setConversation(prev => prev.slice(0, -1));
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-headline font-semibold mb-2">Asistente de Contenido</h2>
      <p className="text-muted-foreground mb-4">
        ¿Tienes alguna duda sobre el material? Pregúntale a nuestro asistente de IA.
      </p>

      <div className="space-y-4 mb-4 h-64 overflow-y-auto p-4 border rounded-md bg-muted/20">
        {conversation.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>}
            <div className={`rounded-lg p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            {msg.role === 'user' && <AvatarIcon><User className="h-5 w-5"/></AvatarIcon>}
          </div>
        ))}
         {isPending && (
          <div className="flex items-start gap-3">
            <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>
            <div className="rounded-lg p-3 bg-card">
                <Skeleton className="h-4 w-10 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe tu pregunta aquí..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAskQuestion();
            }
          }}
          disabled={isPending}
        />
        <Button onClick={handleAskQuestion} disabled={isPending || !question.trim()}>
          Enviar
        </Button>
      </div>
    </div>
  );
}


function AvatarIcon({children}: {children: React.ReactNode}) {
    return <div className="flex-shrink-0 h-8 w-8 rounded-full bg-border flex items-center justify-center">{children}</div>
}
