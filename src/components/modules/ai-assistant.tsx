'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, User, Send, Trash2 } from 'lucide-react';
import { aiContentQASupport } from '@/ai/flows/ai-content-qa-support';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AIAssistantProps {
  courseContent: string;
  moduleSlug?: string;
  additionalContext?: string; // Content from uploaded files
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant({ courseContent, moduleSlug, additionalContext }: AIAssistantProps) {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useUser();
  const db = useFirestore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const maxChars = 500;

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, isPending]);

  const handleAskQuestion = () => {
    if (!question.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: question };
    setConversation(prev => [...prev, userMessage]);
    const currentQuestion = question;
    setQuestion('');

    startTransition(async () => {
      try {
        // Log interaction for predictive analytics
        if (user && db) {
          await addDoc(collection(db, 'ai_analytics'), {
            userId: user.uid,
            userName: user.displayName || 'Alumno',
            moduleSlug: moduleSlug || 'unknown',
            question: currentQuestion,
            timestamp: serverTimestamp(),
            type: 'content_qa'
          });
        }

        const fullContext = additionalContext 
          ? `${courseContent}\n\nRECURSOS ADICIONALES DEL PROFESOR:\n${additionalContext}`
          : courseContent;

        const result = await aiContentQASupport({ 
          courseContent: fullContext, 
          studentQuestion: currentQuestion 
        });
        
        if (result.answer) {
          const assistantMessage: Message = { role: 'assistant', content: result.answer };
          setConversation(prev => [...prev, assistantMessage]);
        }
      } catch (error) {
        console.error('Error in AIAssistant:', error);
        toast({
          variant: 'destructive',
          title: 'Error del asistente',
          description: 'No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.',
        });
        setConversation(prev => prev.slice(0, -1));
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Asistente de Contenido
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Resuelve tus dudas sobre el contenido de este módulo.
          </p>
        </div>
        {conversation.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConversation([])}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 space-y-3 mb-4 h-64 overflow-y-auto p-4 border rounded-xl bg-muted/10">
        {conversation.length === 0 && !isPending && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">¡Hola! Soy tu asistente de IA</p>
              <p className="text-xs text-muted-foreground mt-1">Pregúntame cualquier cosa sobre el contenido de este módulo</p>
            </div>
          </div>
        )}
        {conversation.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 animate-slide-up ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
            <div className={`rounded-2xl px-3.5 py-2.5 max-w-[80%] ${msg.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-sm'
                : 'bg-card border border-border/60 rounded-bl-sm'
              }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-muted border flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {isPending && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-card border rounded-2xl rounded-bl-sm px-3.5 py-3">
              <div className="flex gap-1 items-center">
                <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Textarea
            value={question}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) setQuestion(e.target.value);
            }}
            placeholder="Escribe tu pregunta aquí... (pulsa Enter para enviar)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            disabled={isPending}
            className="resize-none min-h-[70px]"
          />
          <Button
            onClick={handleAskQuestion}
            disabled={isPending || !question.trim()}
            size="icon"
            className="h-auto w-12 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>Shift+Enter para nueva línea</span>
          <span className={question.length > maxChars * 0.9 ? 'text-amber-500' : ''}>{question.length}/{maxChars}</span>
        </div>
      </div>
    </div>
  );
}
