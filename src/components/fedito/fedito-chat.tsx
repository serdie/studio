'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { FeditoAvatar } from './fedito-avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface FeditoChatProps {
  initialQuestion?: string;
}

/**
 * FeditoChat Component
 * Componente principal del chat con el asistente Fedito
 * Conectado a la API de IA para responder preguntas reales
 */
export function FeditoChat({ initialQuestion }: FeditoChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'thinking' | 'talking' | 'happy'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<{role: string, content: string}[]>([]);

  // Mensaje de bienvenida cuando se abre el chat por primera vez
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: '¡Hola! 👋 Soy Fedito, tu asistente virtual del curso de IA de CEOE-FEDETO.\n\nPregúntame sobre:\n• Los módulos del curso\n• Conceptos de inteligencia artificial\n• Cómo usar la plataforma\n• Dudas técnicas\n\n¿En qué puedo ayudarte hoy?',
      }]);
    }
  }, [isOpen]);

  // Scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simular estado de talking cuando hay mensajes del asistente
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setAvatarState('talking');
      const timer = setTimeout(() => setAvatarState('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  // Manejar pregunta inicial opcional
  useEffect(() => {
    if (initialQuestion && !messages.some(m => m.content === initialQuestion)) {
      handleSendMessage(null, initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (e: React.FormEvent | null, customMessage?: string) => {
    if (e) e.preventDefault();
    
    const messageToSend = customMessage || inputValue.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setAvatarState('thinking');

    // Actualizar historial
    setConversationHistory(prev => [
      ...prev,
      { role: 'user', content: messageToSend }
    ]);

    try {
      // Llamar a la API de Fedito
      const response = await fetch('/api/fedito-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: conversationHistory,
        }),
      });

      // Verificar si la respuesta es JSON antes de parsear
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Respuesta no es JSON (probablemente error del servidor)
        const textError = await response.text();
        console.error('Error en API Fedito (no JSON):', textError);
        throw new Error('Error en el servidor');
      }

      if (response.ok) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
        };
        setMessages(prev => [...prev, assistantMessage]);
        setAvatarState('happy');

        // Actualizar historial con respuesta
        setConversationHistory(prev => [
          ...prev,
          { role: 'assistant', content: data.response }
        ]);
      } else {
        // Error en la API
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.error || 'Lo siento, he tenido un problema. ¿Puedes repetir la pregunta?',
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Vaya, parece que hay un problema de conexión. ¿Puedes intentarlo de nuevo?',
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);

      // Volver a idle después de un momento
      setTimeout(() => setAvatarState('idle'), 1500);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Ventana del chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-background border rounded-xl shadow-2xl overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-primary to-accent">
            <div className="flex items-center gap-3">
              <FeditoAvatar state={avatarState} size="sm" />
              <div>
                <h3 className="font-semibold text-primary-foreground">Asistente Fedito</h3>
                <p className="text-sm text-primary-foreground/80">
                  {avatarState === 'thinking' && 'Pensando...'}
                  {avatarState === 'talking' && 'Hablando...'}
                  {avatarState === 'happy' && '¡Feliz de ayudarte!'}
                  {avatarState === 'idle' && '¿En qué puedo ayudarte?'}
                </p>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className="h-80 p-4 overflow-y-auto bg-muted/30">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-background border px-3 py-2 rounded-lg text-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Botón flotante para abrir/cerrar chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300',
          isOpen ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
        )}
      >
        <FeditoAvatar state={isOpen ? avatarState : 'idle'} size="sm" />
        <span className="font-medium">{isOpen ? 'Cerrar' : 'Fedito'}</span>
      </button>
    </div>
  );
}
