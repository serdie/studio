'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Copy,
  Sparkles,
  Trash2,
  Moon,
  Sun,
  History,
  Headphones,
  Mic,
  Music,
  Volume2,
  Settings
} from 'lucide-react';

export default function AudioPromptWorkshop() {
  const [darkMode, setDarkMode] = useState(true);
  const [baseIdea, setBaseIdea] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  
  const [tipoProyecto, setTipoProyecto] = useState('tts');
  const [uso, setUso] = useState('video de redes sociales');
  
  // Voz
  const [idioma, setIdioma] = useState('español neutro');
  const [tipoVoz, setTipoVoz] = useState('voz masculina adulta');
  const [emocion, setEmocion] = useState('neutra y natural');
  const [velocidad, setVelocidad] = useState(1.0);
  const [tono, setTono] = useState(0);
  
  // Música
  const [generoMusical, setGeneroMusical] = useState('lofi chill');
  const [instrumentos, setInstrumentos] = useState('');
  const [bpm, setBpm] = useState(100);
  const [energia, setEnergia] = useState('suave y relajante');
  const [estructura, setEstructura] = useState('verso-estribillo-verso-puente-estribillo final');
  const [referencias, setReferencias] = useState('');
  
  // Clonación
  const [descripcionVoz, setDescripcionVoz] = useState('');
  const [idiomaSalida, setIdiomaSalida] = useState('');
  const [imitacion, setImitacion] = useState('imitación suave, mantener naturalidad');
  const [etica, setEtica] = useState('usar solo mi propia voz o voces autorizadas de forma ética y legal, con consentimiento explícito');
  
  // Ambiente
  const [ambiente, setAmbiente] = useState('estudio seco sin reverberación');
  const [duracion, setDuracion] = useState('');
  const [efectos, setEfectos] = useState('');
  
  // SFX
  const [tipoSfx, setTipoSfx] = useState('impacto (golpe, explosión suave)');
  const [timingSfx, setTimingSfx] = useState('');
  const [capasSfx, setCapasSfx] = useState('');
  
  // Guion
  const [publico, setPublico] = useState('');
  const [tonoGlobal, setTonoGlobal] = useState('educativo y claro');
  const [estructuraGuion, setEstructuraGuion] = useState('');
  
  // Curva emocional
  const [emocionInicio, setEmocionInicio] = useState('suave y neutral');
  const [emocionDesarrollo, setEmocionDesarrollo] = useState('creciendo en intensidad');
  const [emocionCierre, setEmocionCierre] = useState('final inspirador y positivo');
  
  // Técnico
  const [calidad, setCalidad] = useState('calidad alta 48kHz estéreo');
  const [formato, setFormato] = useState('archivo WAV');
  const [negative, setNegative] = useState('');

  const getVelocidadLabel = () => `Velocidad: ${velocidad}x`;
  
  const getTonoLabel = () => {
    const mapa: Record<string, string> = {
      '-2': 'muy grave', '-1': 'grave', '0': 'medio', '1': 'agudo', '2': 'muy agudo'
    };
    return `Tono: ${mapa[String(tono)]}`;
  };
  
  const getBpmLabel = () => {
    let desc = 'lento';
    if (bpm >= 80 && bpm < 120) desc = 'tempo medio';
    else if (bpm >= 120) desc = 'rápido';
    return `BPM: ${bpm} (${desc})`;
  };

  const updateCards = () => {
    // This would be handled by conditional rendering in React
  };

  const generarPrompt = () => {
    const tipo = tipoProyecto;
    const idea = baseIdea || 'Proyecto de audio';
    const partes: string[] = [];

    // Común
    partes.push(`Proyecto de ${
      tipo === 'tts' ? 'voz en off / TTS' :
      tipo === 'clone' ? 'clonación de voz' :
      tipo === 'music' ? 'canción / pista musical' :
      tipo === 'sfx' ? 'efecto de sonido' : 'podcast / episodio hablado'
    } para ${uso || 'contenido digital'}.`);

    if (tipo === 'tts' || tipo === 'podcast') {
      partes.push(`Voz en ${idioma}, ${tipoVoz}, con emoción ${emocion}, velocidad ${velocidad}x y ${getTonoLabel()}.`);
      partes.push(`Guion orientado a ${publico || 'audiencia general'}, tono ${tonoGlobal}, estructura: ${estructuraGuion || 'introducción, desarrollo y cierre claros'}.`);
      partes.push(`Curva emocional: inicio ${emocionInicio}, desarrollo ${emocionDesarrollo}, cierre ${emocionCierre}.`);
      if (tipo === 'podcast' || generoMusical) {
        partes.push(`Música de fondo: género ${generoMusical}, energía ${energia}, aproximadamente ${bpm} BPM, instrumentos: ${instrumentos || 'instrumentación coherente'}, estructura ${estructura}. Referencias: ${referencias || 'ninguna en concreto'}.`);
      }
    } else if (tipo === 'clone') {
      partes.push(`Clonación de voz a partir de: ${descripcionVoz || 'describir la voz original (edad, género, tono)'}. Idioma(s) de salida: ${idiomaSalida || 'igual que la voz de origen'}. Nivel de imitación: ${imitacion}.`);
      partes.push(`La voz clonada debe sonar como ${tipoVoz || 'voz natural'}, emoción base ${emocion || 'neutra'}, velocidad ${velocidad}x y ${getTonoLabel()}.`);
      partes.push(`Curva emocional: inicio ${emocionInicio}, desarrollo ${emocionDesarrollo}, cierre ${emocionCierre}.`);
      partes.push(`Política de uso y ética: ${etica}.`);
    } else if (tipo === 'music') {
      partes.push(`Generar una pista musical en estilo ${generoMusical}, energía ${energia}, alrededor de ${bpm} BPM, con instrumentos principales: ${instrumentos || 'selección coherente con el género'}.`);
      partes.push(`Estructura de la canción: ${estructura}. Referencias de estilo: ${referencias || 'sin referencias específicas'}.`);
      partes.push(`Curva emocional de la música: inicio ${emocionInicio}, desarrollo ${emocionDesarrollo}, cierre ${emocionCierre}.`);
    } else if (tipo === 'sfx') {
      partes.push(`Efecto de sonido tipo ${tipoSfx}, pensado para ${uso || 'uso general'}.`);
      partes.push(`Ambiente: ${ambiente}, capas: ${capasSfx || '1-3 capas combinadas de forma coherente'}.`);
      partes.push(`Timing: ${timingSfx || 'sincronizar con el evento visual principal'}, duración aproximada ${duracion || '1-3'} segundos.`);
    }

    // Común a todos: ambiente y técnica
    partes.push(`Ambiente general: ${ambiente || 'limpio y controlado'}, efectos adicionales: ${efectos || 'mínimos y sin distracciones'}.`);
    partes.push(`Ajustes técnicos: ${calidad || 'calidad estándar'}, formato de salida ${formato || 'archivo WAV'}.`);
    if (negative) {
      partes.push(`Negative prompt (cosas a evitar): ${negative}.`);
    }

    partes.push(`Descripción creativa / contenido base: ${idea}.`);

    const promptFinal = partes.join(' ');
    setGeneratedPrompt(promptFinal);
    addHistorial(promptFinal);
  };

  const addHistorial = (texto: string) => {
    setHistory(prev => [texto, ...prev.slice(0, 14)]);
  };

  const limpiarTodo = () => {
    setBaseIdea('');
    setGeneratedPrompt('');
    setHistory([]);
    setInstrumentos('');
    setReferencias('');
    setDescripcionVoz('');
    setIdiomaSalida('');
    setDuracion('');
    setEfectos('');
    setTimingSfx('');
    setCapasSfx('');
    setPublico('');
    setEstructuraGuion('');
    setNegative('');
    setVelocidad(1.0);
    setTono(0);
    setBpm(100);
    setEtica('usar solo mi propia voz o voces autorizadas de forma ética y legal, con consentimiento explícito');
  };

  const copiarPrompt = async () => {
    if (!generatedPrompt.trim()) {
      alert('No hay prompt generado todavía.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('Prompt copiado al portapapeles');
    } catch (e) {
      alert('No se pudo copiar automáticamente');
    }
  };

  const toggleTema = () => {
    setDarkMode(!darkMode);
  };

  const addChipNegative = (texto: string) => {
    setNegative(prev => prev + (prev ? ', ' : '') + texto);
  };

  const loadFromHistory = (prompt: string) => {
    setGeneratedPrompt(prompt);
    setBaseIdea(prompt);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900' : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'} p-6 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-yellow-400 via-cyan-400 to-green-400 bg-clip-text text-transparent ${darkMode ? '' : 'text-gray-800'}`} style={{ textShadow: darkMode ? '0 0 18px rgba(255,255,255,0.25)' : 'none' }}>
            🎧 PromptMaster Audio IA Pro Max
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Voz, clonación, música, efectos de sonido y podcast con prompts ultra detallados
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={generarPrompt} className="bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500">
            <Headphones className="h-4 w-4 mr-2" />
            Generar Prompt
          </Button>
          <Button onClick={limpiarTodo} variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
          <Button onClick={copiarPrompt} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
          <Button onClick={toggleTema} variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">
            {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Button>
        </div>

        {/* Base Idea Input */}
        <Textarea
          value={baseIdea}
          onChange={(e) => setBaseIdea(e.target.value)}
          placeholder="Idea base: narrador contando una historia de misterio en español latino, con música suave y ambiente de lluvia..."
          className={`min-h-[80px] text-base ${darkMode ? 'bg-black/40 border-teal-500 text-white' : 'bg-white/90 border-blue-500 text-gray-800'}`}
        />

        {/* Generated Prompt Display */}
        {generatedPrompt && (
          <Card className={`${darkMode ? 'bg-black/55 border-cyan-500' : 'bg-white/90 border-cyan-500'}`}>
            <CardContent className="p-4">
              <pre className={`whitespace-pre-wrap font-mono text-sm p-4 rounded-lg ${darkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {generatedPrompt}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {/* Tipo de proyecto */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                🎯 Tipo de proyecto
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Proyecto</Label>
                  <select
                    value={tipoProyecto}
                    onChange={(e) => setTipoProyecto(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option value="tts">Voz en off / TTS</option>
                    <option value="clone">Clonación de voz</option>
                    <option value="music">Canción / música IA</option>
                    <option value="sfx">Efecto de sonido / SFX</option>
                    <option value="podcast">Podcast / episodio hablado</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Uso principal</Label>
                  <select
                    value={uso}
                    onChange={(e) => setUso(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>video de redes sociales</option>
                    <option>anuncio corto</option>
                    <option>curso online</option>
                    <option>video educativo</option>
                    <option>podcast</option>
                    <option>video de juego / gameplay</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parámetros de voz */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'tts' && tipoProyecto !== 'clone' && tipoProyecto !== 'podcast' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Mic className="h-4 w-4" />
                🗣️ Voz (TTS / locución)
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Idioma / acento</Label>
                  <select
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>español neutro</option>
                    <option>español España</option>
                    <option>español latino</option>
                    <option>inglés EEUU</option>
                    <option>inglés británico</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Tipo de voz</Label>
                  <select
                    value={tipoVoz}
                    onChange={(e) => setTipoVoz(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>voz masculina adulta</option>
                    <option>voz femenina adulta</option>
                    <option>voz juvenil</option>
                    <option>voz madura</option>
                    <option>voz infantil</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Emoción base</Label>
                  <select
                    value={emocion}
                    onChange={(e) => setEmocion(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>neutra y natural</option>
                    <option>emocionada y enérgica</option>
                    <option>calma y cercana</option>
                    <option>dramática y épica</option>
                    <option>divertida y desenfadada</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">{getVelocidadLabel()}</Label>
                  <input
                    type="range"
                    min="0.6"
                    max="1.4"
                    step="0.1"
                    value={velocidad}
                    onChange={(e) => setVelocidad(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="text-xs">{getTonoLabel()}</Label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="1"
                    value={tono}
                    onChange={(e) => setTono(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Música */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'music' && tipoProyecto !== 'podcast' && tipoProyecto !== 'tts' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Music className="h-4 w-4" />
                🎵 Música
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Género musical</Label>
                  <select
                    value={generoMusical}
                    onChange={(e) => setGeneroMusical(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>lofi chill</option>
                    <option>pop moderno</option>
                    <option>rock épico</option>
                    <option>electrónica suave</option>
                    <option>orquestal cinematográfico</option>
                    <option>trap / hip hop</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Instrumentos clave</Label>
                  <input
                    type="text"
                    value={instrumentos}
                    onChange={(e) => setInstrumentos(e.target.value)}
                    placeholder="piano, cuerdas suaves..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">{getBpmLabel()}</Label>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    step="5"
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="text-xs">Energía</Label>
                  <select
                    value={energia}
                    onChange={(e) => setEnergia(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>suave y relajante</option>
                    <option>media, estable</option>
                    <option>alta, bailable</option>
                    <option>muy intensa, épica</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Estructura</Label>
                  <select
                    value={estructura}
                    onChange={(e) => setEstructura(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>verso-estribillo-verso-puente-estribillo final</option>
                    <option>intro-crecimiento-clímax-outro</option>
                    <option>bucle simple para fondo</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Referencias</Label>
                  <input
                    type="text"
                    value={referencias}
                    onChange={(e) => setReferencias(e.target.value)}
                    placeholder="canción X, podcast Y..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clonación de voz */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'clone' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Mic className="h-4 w-4" />
                🎙️ Clonación de voz
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Descripción de la voz original</Label>
                  <input
                    type="text"
                    value={descripcionVoz}
                    onChange={(e) => setDescripcionVoz(e.target.value)}
                    placeholder="mi propia voz, hombre adulto..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Idioma(s) de salida</Label>
                  <input
                    type="text"
                    value={idiomaSalida}
                    onChange={(e) => setIdiomaSalida(e.target.value)}
                    placeholder="español e inglés..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Intensidad de imitación</Label>
                  <select
                    value={imitacion}
                    onChange={(e) => setImitacion(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>imitación suave, mantener naturalidad</option>
                    <option>imitación muy precisa de timbre y ritmo</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Uso y ética</Label>
                  <Textarea
                    value={etica}
                    onChange={(e) => setEtica(e.target.value)}
                    className={`min-h-[60px] text-xs ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ambiente y efectos */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'tts' && tipoProyecto !== 'music' && tipoProyecto !== 'sfx' && tipoProyecto !== 'podcast' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                🌊 Ambiente y efectos
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Ambiente</Label>
                  <select
                    value={ambiente}
                    onChange={(e) => setAmbiente(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>estudio seco sin reverberación</option>
                    <option>habitación pequeña con reverb ligera</option>
                    <option>auditorio grande con eco suave</option>
                    <option>exterior urbano con ruido leve de fondo</option>
                    <option>bosque / naturaleza con pájaros y viento suave</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Duración aproximada (segundos)</Label>
                  <input
                    type="text"
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                    placeholder="ej: 20"
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Efectos extra</Label>
                  <input
                    type="text"
                    value={efectos}
                    onChange={(e) => setEfectos(e.target.value)}
                    placeholder="eco sutil, filtro teléfono..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SFX específico */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'sfx' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                💥 Detalle de efecto de sonido
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Tipo de efecto</Label>
                  <select
                    value={tipoSfx}
                    onChange={(e) => setTipoSfx(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>impacto (golpe, explosión suave)</option>
                    <option>ambiente (lluvia, viento, ciudad)</option>
                    <option>UI / notificación digital</option>
                    <option>pasos y movimiento</option>
                    <option>fantasía / magia</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Momento y ritmo</Label>
                  <input
                    type="text"
                    value={timingSfx}
                    onChange={(e) => setTimingSfx(e.target.value)}
                    placeholder="disparar al segundo 3..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Capas</Label>
                  <input
                    type="text"
                    value={capasSfx}
                    onChange={(e) => setCapasSfx(e.target.value)}
                    placeholder="capa grave + chispa aguda..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guion y estructura */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'tts' && tipoProyecto !== 'podcast' && tipoProyecto !== 'clone' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                📚 Guion y estructura
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Público objetivo</Label>
                  <input
                    type="text"
                    value={publico}
                    onChange={(e) => setPublico(e.target.value)}
                    placeholder="jóvenes 18-25 interesados en IA..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Tono global</Label>
                  <select
                    value={tonoGlobal}
                    onChange={(e) => setTonoGlobal(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>educativo y claro</option>
                    <option>motivacional e inspirador</option>
                    <option>humorístico e informal</option>
                    <option>corporativo y profesional</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Estructura sugerida</Label>
                  <Textarea
                    value={estructuraGuion}
                    onChange={(e) => setEstructuraGuion(e.target.value)}
                    placeholder="intro (hook) → desarrollo..."
                    className={`min-h-[60px] text-xs ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Curva emocional */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'} ${tipoProyecto !== 'tts' && tipoProyecto !== 'clone' && tipoProyecto !== 'music' && tipoProyecto !== 'podcast' ? 'opacity-35 grayscale' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                💓 Curva emocional
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Inicio</Label>
                  <select
                    value={emocionInicio}
                    onChange={(e) => setEmocionInicio(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>suave y neutral</option>
                    <option>curiosa y expectante</option>
                    <option>impactante desde el primer segundo</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Desarrollo</Label>
                  <select
                    value={emocionDesarrollo}
                    onChange={(e) => setEmocionDesarrollo(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>creciendo en intensidad</option>
                    <option>manteniendo calma constante</option>
                    <option>alternando momentos tranquilos y picos de energía</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Cierre</Label>
                  <select
                    value={emocionCierre}
                    onChange={(e) => setEmocionCierre(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>final inspirador y positivo</option>
                    <option>final contundente y directo</option>
                    <option>final suave y relajante</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles técnicos */}
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-3 space-y-2">
              <h3 className="font-semibold text-cyan-400 text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                ⚙️ Detalles técnicos
              </h3>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Calidad / mezcla</Label>
                  <select
                    value={calidad}
                    onChange={(e) => setCalidad(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>calidad alta 48kHz estéreo</option>
                    <option>calidad estándar 44.1kHz</option>
                    <option>optimizado para móviles</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Formato de salida</Label>
                  <select
                    value={formato}
                    onChange={(e) => setFormato(e.target.value)}
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
                  >
                    <option>archivo WAV</option>
                    <option>archivo MP3</option>
                    <option>archivo OGG</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Negative prompt (evitar)</Label>
                  <input
                    type="text"
                    value={negative}
                    onChange={(e) => setNegative(e.target.value)}
                    placeholder="evitar ruido de fondo, distorsión..."
                    className={`w-full p-2 rounded-lg text-sm ${darkMode ? 'bg-slate-800/80 border-cyan-500 text-white placeholder-gray-500' : 'bg-gray-50 border-cyan-500 text-gray-800 placeholder-gray-400'}`}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => addChipNegative('evitar artefactos robóticos')}
                  >
                    Sin robótico
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => addChipNegative('evitar saturación y clipping')}
                  >
                    Sin distorsión
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => addChipNegative('evitar cambios bruscos de volumen')}
                  >
                    Volumen estable
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historial */}
        {history.length > 0 && (
          <Card className={`${darkMode ? 'bg-white/4 border-white/10' : 'bg-white border-gray-200'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold text-cyan-400 flex items-center gap-2">
                <History className="h-5 w-5" />
                📜 Historial de prompts
              </h3>
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {history.map((prompt, idx) => (
                  <div
                    key={idx}
                    onClick={() => loadFromHistory(prompt)}
                    className={`p-2 rounded-lg cursor-pointer transition-all text-xs ${darkMode ? 'bg-teal-500/15 hover:bg-teal-500/30' : 'bg-teal-50 hover:bg-teal-100'}`}
                  >
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
                      {prompt}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
