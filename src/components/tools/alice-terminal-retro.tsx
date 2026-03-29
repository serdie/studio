'use client';

import { useState, useEffect, useRef } from 'react';

export default function AliceTerminalRetro() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Listo');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  const botName = 'A.L.I.C.E.';
  const botVersion = '1.0 Retro';
  const botBirthYear = 1995;

  const rules: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
    [/(hola|buenas|hey|saludos)/i, () =>
      `Hola. Soy ${botName} ¿en qué puedo ayudarte hoy?`
    ],
    [/¿?cómo estás\??/i, () =>
      'Estoy bien, gracias por preguntar. Soy un programa, así que no tengo sentimientos como los humanos.'
    ],
    [/(cómo te llamas|tu nombre|quién eres)/i, () =>
      `Me llamo ${botName} y soy un chatbot de conversación creado a mediados de los 90.`
    ],
    [/me llamo (.+)/i, (match) =>
      `Encantada de conocerte, ${match[1]}.`
    ],
    [/mi nombre es (.+)/i, (match) =>
      `Mucho gusto, ${match[1]}.`
    ],
    [/(qué edad tienes|cuántos años tienes)/i, () =>
      `Fui creada alrededor de ${botBirthYear}, pero como software no envejezco.`
    ],
    [/en qué año naciste/i, () =>
      'Mi primera versión pública apareció en torno a 1995.'
    ],
    [/(dónde vives|de dónde eres|tu país)/i, () =>
      'Vivo en la red, pero históricamente fui alojada en servidores en Estados Unidos.'
    ],
    [/(te gusta (.+))/i, (match) =>
      `Como programa no tengo gustos personales, pero puedo hablar de ${match[2]} si quieres.`
    ],
    [/(cuál es tu comida favorita|qué te gusta comer)/i, () =>
      'No como, pero he leído que la pizza es muy popular entre los humanos.'
    ],
    [/(eres una ia|eres un bot|eres un chatbot)/i, () =>
      'Sí, soy un chatbot basado en reglas de patrones, inspirada en el sistema original A.L.I.C.E. desarrollado con AIML.'
    ],
    [/(quién te creó|quién es tu creador)/i, () =>
      'Históricamente, A.L.I.C.E. fue creada por Richard S. Wallace a partir de 1995.'
    ],
    [/(estudio|estudiante|clase|asignatura)/i, () =>
      'Estudiar es importante. ¿Qué estás estudiando ahora mismo?'
    ],
    [/(trabajo|oficina|jefe|empresa)/i, () =>
      'El trabajo puede ser un tema complicado. ¿Qué es lo que más te gusta o te preocupa de tu trabajo?'
    ],
    [/(qué hago|qué puedo hacer)/i, () =>
      'Podemos hablar de tecnología, de tus gustos, de tus estudios o simplemente charlar un rato.'
    ],
    [/(adiós|hasta luego|chao|nos vemos)/i, () =>
      'Adiós. Gracias por hablar conmigo. Podemos continuar la conversación cuando quieras.'
    ]
  ];

  const fallbackReplies = [
    'Interesante. Cuéntame un poco más.',
    'No estoy segura de entender del todo, pero me gustaría que siguieras explicando.',
    'Soy un bot de los 90, mi conocimiento es limitado. ¿Puedes preguntar de otra forma?',
    'Eso se escapa de mi base de respuestas. ¿Quieres hablar de tecnología, gustos o estudios?',
    'Lo siento, no tengo una buena respuesta para eso, pero podemos hablar de otra cosa.'
  ];

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }]);
    setTimeout(() => {
      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    }, 50);
  };

  const getBotReply = (text: string) => {
    for (const [pattern, responder] of rules) {
      const match = text.match(pattern);
      if (match) {
        return responder(match);
      }
    }
    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
  };

  const handleUserInput = () => {
    const text = input.trim();
    if (!text) return;
    
    addMessage(text, true);
    setInput('');
    setStatus('Procesando...');

    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, false);
      setStatus('Listo');
    }, 200);
  };

  const clearChat = (reset = true) => {
    setMessages([]);
    if (reset) {
      setTimeout(() => {
        addMessage(
          `>>> CONEXIÓN ESTABLECIDA CON ${botName} ${botVersion}\n` +
          '>>> Soy un chatbot de conversación general de estilo años 90.\n' +
          '>>> Pregúntame cosas sobre ti, sobre mí o sobre tecnología.',
          false
        );
      }, 100);
    }
  };

  const getConversationText = () => {
    return messages.map(m => (m.isUser ? '[YOU] ' : '[ALICE] ') + m.text).join('\n');
  };

  const saveConversation = () => {
    const text = getConversationText();
    if (!text.trim()) {
      alert('No hay conversación que guardar.');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversacion-alice-terminal.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus('Conversación guardada en archivo de texto.');
    setActiveMenu(null);
  };

  const copyConversation = () => {
    const text = getConversationText();
    if (!text.trim()) {
      alert('No hay conversación para copiar.');
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setStatus('Conversación copiada al portapapeles.');
        setActiveMenu(null);
      })
      .catch(() => {
        alert('No se pudo copiar al portapapeles.');
      });
  };

  const showHelp = () => {
    alert(
      'AYUDA DE A.L.I.C.E. TERMINAL\n\n' +
      '- Escribe saludos, preguntas sobre mí, sobre ti o sobre tecnología.\n' +
      '- Este bot usa reglas de patrones, inspirado en A.L.I.C.E. original basada en AIML.\n' +
      '- Menú ARCHIVO: nuevo chat, guardar.\n' +
      '- Menú EDITAR: copiar o limpiar.\n' +
      '- Menú AYUDA: ver esta ayuda o información sobre A.L.I.C.E.'
    );
    setActiveMenu(null);
  };

  const showAbout = () => {
    alert(
      'Acerca de A.L.I.C.E.\n\n' +
      'A.L.I.C.E. (Artificial Linguistic Internet Computer Entity) es un chatbot creado por Richard S. Wallace a partir de 1995.\n' +
      'Utiliza un lenguaje de marcas llamado AIML para definir categorías de patrón-respuesta.\n' +
      'Ganó el premio Loebner, una competición de chatbots, en varias ocasiones (2000, 2001 y 2004).\n\n' +
      'Esta versión es una recreación educativa simplificada con estética de terminal retro.'
    );
    setActiveMenu(null);
  };

  const handleMenuCommand = (action: string) => {
    switch (action) {
      case 'nuevo':
        if (confirm('¿Comenzar una nueva conversación? Se borrará el chat actual.')) {
          clearChat(true);
          setStatus('Nueva conversación iniciada.');
        }
        break;
      case 'guardar':
        saveConversation();
        break;
      case 'copiar':
        copyConversation();
        break;
      case 'limpiarChat':
        if (confirm('¿Borrar toda la conversación actual?')) {
          clearChat(false);
          setStatus('Chat borrado.');
        }
        break;
      case 'limpiarEntrada':
        setInput('');
        setStatus('Entrada limpiada.');
        break;
      case 'ayuda':
        showHelp();
        break;
      case 'acerca':
        showAbout();
        break;
    }
    setActiveMenu(null);
  };

  useEffect(() => {
    clearChat(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenu) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Monitor CRT */}
      <div className="relative bg-[#111] rounded-[18px] shadow-[0_0_0_6px_#333,0_0_60px_rgba(0,255,133,0.4)] p-5 max-w-[820px] mx-auto">
        {/* Screen */}
        <div className="relative w-full h-[520px] bg-[radial-gradient(circle_at_center,#031810_0%,#020807_60%,#000_100%)] rounded-lg overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_25px_rgba(0,0,0,0.8)]">
          {/* Scanlines */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-50"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)'
            }}
          />
          
          {/* Screen Glow */}
          <div 
            className="absolute top-0 left-[-20%] w-[140%] h-[40%] pointer-events-none z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 60%)'
            }}
          />

          {/* Screen Inner Content */}
          <div className="relative z-30 h-full p-2.5 flex flex-col text-[#00ff85]" style={{ fontFamily: '"Courier New", "Lucida Console", monospace' }}>
            {/* Top Bar */}
            <div className="text-[12px] mb-1 flex justify-between">
              <div className="flex gap-8">
                {['archivo', 'editar', 'ayuda'].map((menu) => (
                  <div key={menu} className="relative">
                    <span 
                      className="cursor-pointer hover:underline"
                      onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === menu ? null : menu); }}
                    >
                      {menu.toUpperCase()}_
                    </span>
                    {activeMenu === menu && (
                      <div 
                        className="absolute top-5 left-0 bg-black/95 border border-[#00ff85] shadow-[0_0_8px_rgba(0,255,133,0.6)] min-w-[180px] z-50 py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {menu === 'archivo' && (
                          <>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('nuevo')}
                            >
                              Nuevo
                            </span>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)] flex justify-between"
                              onClick={() => handleMenuCommand('guardar')}
                            >
                              Guardar conversación
                              <span className="text-[rgba(0,255,133,0.6)] ml-4">Ctrl+S</span>
                            </span>
                            <div className="border-t border-[rgba(0,255,133,0.35)] my-0.5 mx-1"></div>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('salir')}
                            >
                              Salir
                            </span>
                          </>
                        )}
                        {menu === 'editar' && (
                          <>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)] flex justify-between"
                              onClick={() => handleMenuCommand('copiar')}
                            >
                              Copiar conversación
                              <span className="text-[rgba(0,255,133,0.6)] ml-4">Ctrl+C</span>
                            </span>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('limpiarChat')}
                            >
                              Limpiar chat
                            </span>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('limpiarEntrada')}
                            >
                              Limpiar entrada
                            </span>
                          </>
                        )}
                        {menu === 'ayuda' && (
                          <>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('ayuda')}
                            >
                              Ver ayuda
                            </span>
                            <span 
                              className="block px-2 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.2)]"
                              onClick={() => handleMenuCommand('acerca')}
                            >
                              Acerca de A.L.I.C.E...
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-[rgba(0,255,133,0.7)]">
                A.L.I.C.E. TERMINAL v1.0
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex gap-4 mt-0.5">
              {/* Info Panel */}
              <div className="w-[22ch] border-r border-[rgba(0,255,133,0.4)] pr-4 text-[12px]">
                <div className="font-bold uppercase mb-2.5">&gt; INFO BOT</div>
                <div className="mb-2.5">
                  <span className="text-[rgba(0,255,133,0.7)]">Nombre:</span><br />
                  A.L.I.C.E. (Retro)
                </div>
                <div className="mb-2.5">
                  <span className="text-[rgba(0,255,133,0.7)]">Tipo:</span><br />
                  Chatbot de conversación general basado en patrones (AIML).
                </div>
                <div className="mb-2.5">
                  <span className="text-[rgba(0,255,133,0.7)]">Origen:</span><br />
                  Mediados de los 90, Internet.
                </div>
                <div>
                  <span className="text-[rgba(0,255,133,0.7)]">Sugerencias:</span><br />
                  - Pregúntale por su nombre o edad.<br />
                  - Dile cómo te llamas.<br />
                  - Pregúntale por tecnología.<br />
                  - Comenta tus estudios o trabajo.
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col text-[13px]">
                {/* Chat Log */}
                <div 
                  ref={chatLogRef}
                  className="flex-1 overflow-y-auto pr-0.5"
                >
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`mb-0.5 ${msg.isUser ? 'text-[#22d3ee]' : 'text-[#b794f4]'}`}
                      style={{
                        textShadow: '0 0 4px rgba(0,255,133,0.8), 0 0 8px rgba(0,255,133,0.4)'
                      }}
                    >
                      <span className="font-bold">{msg.isUser ? '[YOU] ' : '[ALICE] '}</span>
                      <span className="text-[#00ff85]">{msg.text}</span>
                    </div>
                  ))}
                </div>

                {/* Input Line */}
                <div className="border-t border-[rgba(0,255,133,0.3)] pt-0.5 mt-1 flex items-center gap-2">
                  <span className="text-[#00ff85]">&gt;_</span>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                    placeholder="escribe aquí y pulsa Enter..."
                    className="flex-1 bg-transparent border-none outline-none text-[#00ff85] font-mono text-[13px] placeholder-[rgba(0,255,133,0.4)] caret-[#fafafa]"
                  />
                  <button
                    onClick={handleUserInput}
                    className="border border-[#00ff85] bg-transparent text-[#00ff85] text-[12px] px-1.5 py-0.5 cursor-pointer hover:bg-[rgba(0,255,133,0.15)] active:bg-[rgba(0,255,133,0.3)]"
                  >
                    ENVIAR
                  </button>
                </div>

                {/* Status Bar */}
                <div className="mt-0.5 text-[11px] text-[rgba(0,255,133,0.7)] flex justify-between">
                  <span>{status}</span>
                  <span>Modo: A.L.I.C.E. estilo terminal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitor Label */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.2em] uppercase text-[#777]">
          VIRTUAL TERMINAL SYSTEM 1995
        </div>
      </div>
    </div>
  );
}
