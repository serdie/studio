'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { FeditoAvatar } from './fedito-avatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * FeditoChat Component
 * Componente principal del chat con el asistente Fedito
 */
export function FeditoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<'idle' | 'thinking' | 'talking' | 'happy'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setAvatarState('thinking');

    // Simular respuesta de la IA (aquí iría la llamada real a la API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '¡Hola! Soy Fedito, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setAvatarState('happy');
      
      // Volver a idle después de un momento
      setTimeout(() => setAvatarState('idle'), 1500);
    }, 1500);
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
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <FeditoAvatar state="idle" size="lg" className="mb-4 opacity-50" />
                <p className="text-sm">¡Hola! Soy Fedito</p>
                <p className="text-xs">Pregúntame lo que necesites</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
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
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
