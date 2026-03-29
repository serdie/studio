'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Copy, 
  Save, 
  Trash2, 
  HelpCircle, 
  Info, 
  FileText, 
  X,
  Minus,
  Square
} from 'lucide-react';

export default function ElizaRetroAssistant() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('Listo');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  const reflections: Record<string, string> = {
    "yo": "tú",
    "mi": "tu",
    "mí": "ti",
    "mío": "tuyo",
    "mía": "tuya",
    "míos": "tuyos",
    "mías": "tuyas",
    "soy": "eres",
    "estoy": "estás",
    "era": "eras",
    "me": "te",
    "mí mismo": "ti mismo",
    "mismo": "mismo",
    "nosotros": "vosotros",
    "nos": "os"
  };

  const genericReplies = [
    "Cuéntame un poco más sobre eso.",
    "¿Por qué dices eso?",
    "Entiendo... ¿qué más pasa por tu mente?",
    "¿Cómo te hace sentir exactamente?",
    "¿Desde cuándo te sientes así?",
    "¿Crees que hay algo que puedas cambiar en esta situación?"
  ];

  const reflect = (sentence: string) => {
    return sentence
      .split(/(\s+)/)
      .map(token => {
        const lower = token.toLowerCase();
        if (reflections[lower]) {
          const refl = reflections[lower];
          return token[0] === token[0].toUpperCase()
            ? refl.charAt(0).toUpperCase() + refl.slice(1)
            : refl;
        }
        return token;
      })
      .join("");
  };

  const matchElizaRules = (text: string) => {
    const t = text.toLowerCase();

    if (t.includes("hola") || t.includes("buenas")) {
      return "Hola. ¿En qué estás pensando ahora mismo?";
    }
    if (t.includes("triste") || t.includes("deprimido")) {
      return "Siento que te sientas así. ¿Qué crees que te hace sentir tan triste?";
    }
    if (t.includes("feliz") || t.includes("contento") || t.includes("contenta")) {
      return "Me alegra que te sientas bien. ¿Qué ha pasado para que estés así?";
    }
    if (t.includes("miedo") || t.includes("ansioso") || t.includes("ansiedad")) {
      return "El miedo y la ansiedad son emociones muy humanas. ¿Puedes describirlas un poco más?";
    }
    if (t.includes("madre") || t.includes("padre") || t.includes("familia")) {
      return "Háblame de tu familia. ¿Qué papel juegan en cómo te sientes?";
    }
    if (t.includes("trabajo") || t.includes("estudios") || t.includes("clase")) {
      return "Parece que tu situación en el trabajo o los estudios te afecta. ¿Qué es lo que más te preocupa ahí?";
    }
    if (t.match(/yo (.*)/i)) {
      const after = text.replace(/.*yo /i, "");
      return "Dices que tú " + reflect(after) + ". ¿Por qué crees que es así?";
    }
    if (t.match(/no (puedo|consigo|soy capaz)/)) {
      return "¿Qué crees que te impide lograrlo?";
    }
    if (t.includes("adiós") || t.includes("chao") || t.includes("hasta luego")) {
      return "Ha sido interesante hablar contigo. Podemos seguir cuando quieras.";
    }

    const reflected = reflect(text);
    if (reflected !== text) {
      return "¿Por qué dices que " + reflected + "?";
    }

    return genericReplies[Math.floor(Math.random() * genericReplies.length)];
  };

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }]);
    setTimeout(() => {
      if (chatLogRef.current) {
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleUserInput = () => {
    const text = input.trim();
    if (!text) return;
    
    addMessage(text, true);
    setInput('');
    setStatus('Pensando...');

    setTimeout(() => {
      const reply = matchElizaRules(text);
      addMessage(reply, false);
      setStatus('Listo');
    }, 200);
  };

  const clearChat = (resetGreeting: boolean = true) => {
    setMessages([]);
    if (resetGreeting) {
      setTimeout(() => {
        addMessage("Hola, soy ELIZA versión retro. Cuéntame qué te preocupa o cómo te sientes hoy.", false);
      }, 100);
    }
  };

  const getConversationText = () => {
    return messages.map(m => (m.isUser ? "TÚ: " : "ELIZA: ") + m.text).join("\n");
  };

  const saveConversation = () => {
    const text = getConversationText();
    if (!text.trim()) {
      alert("No hay conversación que guardar.");
      return;
    }
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "conversacion-eliza.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus("Conversación guardada en archivo de texto.");
    setActiveMenu(null);
  };

  const copyConversation = () => {
    const text = getConversationText();
    if (!text.trim()) {
      alert("No hay conversación para copiar.");
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => {
        setStatus("Conversación copiada al portapapeles.");
        setActiveMenu(null);
      })
      .catch(() => {
        alert("No se pudo copiar al portapapeles.");
      });
  };

  const showHelp = () => {
    alert(
      "AYUDA DE ELIZA RETRO\n\n" +
      "- Escribe frases sobre cómo te sientes o qué te preocupa.\n" +
      "- ELIZA responderá con preguntas y reflexiones simples.\n" +
      "- Menú Archivo: nuevo chat, guardar.\n" +
      "- Menú Editar: copiar o limpiar.\n" +
      "- Menú Ayuda: ver esta ayuda o información sobre ELIZA."
    );
    setActiveMenu(null);
  };

  const showAbout = () => {
    alert(
      "Acerca de ELIZA\n\n" +
      "ELIZA fue uno de los primeros programas de conversación, creado entre 1964 y 1967 en el MIT por Joseph Weizenbaum.\n" +
      "Su script más famoso, DOCTOR, imitaba a una psicoterapeuta haciendo preguntas abiertas a partir de lo que escribía la persona.\n\n" +
      "Esta versión es una recreación educativa con un estilo gráfico inspirado en los programas de los años 90."
    );
    setActiveMenu(null);
  };

  const handleMenuCommand = (action: string) => {
    switch (action) {
      case "nuevo":
        if (confirm("¿Comenzar una nueva conversación? Se borrará el chat actual.")) {
          clearChat(true);
          setStatus("Nueva conversación iniciada.");
        }
        break;
      case "guardar":
        saveConversation();
        break;
      case "copiar":
        copyConversation();
        break;
      case "limpiarChat":
        if (confirm("¿Borrar toda la conversación actual?")) {
          clearChat(false);
          setStatus("Chat borrado.");
        }
        break;
      case "limpiarEntrada":
        setInput('');
        setStatus("Entrada limpiada.");
        break;
      case "ayuda":
        showHelp();
        break;
      case "acerca":
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
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Ventana estilo Windows 95 */}
      <div className="bg-[#c3c3c3] border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-sm">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#0000cd] px-2 py-1 flex items-center justify-between">
          <span className="text-white text-sm font-bold">Asistente Retro ELIZA</span>
          <div className="flex gap-0.5">
            <button className="w-4 h-3.5 bg-[#c3c3c3] border border-black flex items-center justify-center text-[10px] hover:bg-[#e0e0e0]">
              <Minus className="h-2 w-2" />
            </button>
            <button className="w-4 h-3.5 bg-[#c3c3c3] border border-black flex items-center justify-center text-[10px] hover:bg-[#e0e0e0]">
              <Square className="h-2 w-2" />
            </button>
            <button className="w-4 h-3.5 bg-[#c3c3c3] border border-black flex items-center justify-center text-[10px] hover:bg-red-600 hover:text-white">
              <X className="h-2 w-2" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#c3c3c3] border-b border-[#808080] px-1 py-0.5 text-[11px] relative">
          {/* Archivo */}
          <div className="inline-block relative mr-2">
            <span 
              className="px-2 py-0.5 cursor-default hover:bg-[#000080] hover:text-white rounded-sm"
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'archivo' ? null : 'archivo'); }}
            >
              <u>A</u>rchivo
            </span>
            {activeMenu === 'archivo' && (
              <div className="absolute top-full left-0 bg-[#c3c3c3] border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] min-w-[160px] z-50">
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('nuevo')}
                >
                  Nuevo
                </div>
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white flex justify-between"
                  onClick={() => handleMenuCommand('guardar')}
                >
                  Guardar conversación
                  <span className="text-[#333] ml-2">Ctrl+S</span>
                </div>
                <div className="border-t border-[#808080] my-0.5"></div>
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('salir')}
                >
                  Salir
                </div>
              </div>
            )}
          </div>

          {/* Editar */}
          <div className="inline-block relative mr-2">
            <span 
              className="px-2 py-0.5 cursor-default hover:bg-[#000080] hover:text-white rounded-sm"
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'editar' ? null : 'editar'); }}
            >
              <u>E</u>ditar
            </span>
            {activeMenu === 'editar' && (
              <div className="absolute top-full left-0 bg-[#c3c3c3] border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] min-w-[180px] z-50">
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white flex justify-between"
                  onClick={() => handleMenuCommand('copiar')}
                >
                  Copiar conversación
                  <span className="text-[#333] ml-2">Ctrl+C</span>
                </div>
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('limpiarChat')}
                >
                  Limpiar chat
                </div>
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('limpiarEntrada')}
                >
                  Limpiar entrada
                </div>
              </div>
            )}
          </div>

          {/* Ayuda */}
          <div className="inline-block relative">
            <span 
              className="px-2 py-0.5 cursor-default hover:bg-[#000080] hover:text-white rounded-sm"
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'ayuda' ? null : 'ayuda'); }}
            >
              <u>A</u>yuda
            </span>
            {activeMenu === 'ayuda' && (
              <div className="absolute top-full left-0 bg-[#c3c3c3] border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] min-w-[160px] z-50">
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('ayuda')}
                >
                  Ver ayuda
                </div>
                <div 
                  className="px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
                  onClick={() => handleMenuCommand('acerca')}
                >
                  Acerca de ELIZA...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex p-1.5 gap-1.5" style={{ height: '420px' }}>
          {/* Sidebar */}
          <div className="w-[140px] border-2 border-[#808080] p-1.5 bg-[#c3c3c3] text-[11px]">
            <h3 className="text-[12px] font-bold mb-1.5 border-b border-[#808080] pb-0.5">ELIZA 1.0</h3>
            <p className="mb-1">Asistente tipo terapeuta.</p>
            <p className="mb-1">Escribe cómo te sientes o qué te preocupa.</p>
            <p>Simula el estilo del programa ELIZA (1966).</p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col border-2 border-[#808080] bg-white">
            {/* Chat Log */}
            <div 
              ref={chatLogRef}
              className="flex-1 p-1.5 overflow-y-auto text-[12px]"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className="mb-1">
                  <span className="font-bold">{msg.isUser ? 'TÚ: ' : 'ELIZA: '}</span>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex border-t border-[#808080] bg-[#c3c3c3] p-1 gap-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                placeholder="Escribe aquí y pulsa ENVIAR o Enter..."
                className="flex-1 h-7 text-[12px] border-2 border-[#808080] bg-white focus:border-[#000080]"
              />
              <Button
                onClick={handleUserInput}
                className="min-w-[80px] h-7 text-[12px] bg-[#c3c3c3] border-2 border-[#808080] hover:bg-[#d0d0d0] shadow-[1px_1px_0_0_#ffffff,inset_-1px_-1px_0_0_#000000]"
              >
                Enviar
              </Button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-[18px] bg-[#c3c3c3] border-t border-[#808080] px-2 text-[11px] flex justify-between items-center">
          <span>{status}</span>
          <span>Modo: ELIZA clásico</span>
        </div>
      </div>
    </div>
  );
}
