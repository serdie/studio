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
  Wand2,
  Film,
  Camera,
  Palette,
  Mic,
  Settings
} from 'lucide-react';

export default function VideoPromptWorkshop() {
  const [darkMode, setDarkMode] = useState(true);
  const [baseIdea, setBaseIdea] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  
  // Campos del prompt
  const [fields, setFields] = useState({
    subject: '',
    subjectDesc: 'detallado hiperrealista',
    action: 'corriendo velozmente',
    background: '',
    environment: 'exterior montaña nevada',
    lighting: 'golden hour cálida dramática',
    shadows: 'sombras largas profundas',
    camera: 'slow motion tracking shot lateral',
    style: 'cinematográfico Hollywood 35mm',
    colors: '',
    mood: 'épico intenso dramático',
    weather: 'lluvia torrencial charcos reflectantes',
    audio: 'música orquestal épica intensa',
    props: '',
    duration: 15,
    transition: 'fade suave transiciones fluidas',
    resolution: '8k ultra HD detallado',
    quality: 9,
  });

  useEffect(() => {
    const sliders = ['duration', 'quality'];
    sliders.forEach(id => {
      const slider = document.getElementById(id) as HTMLInputElement;
      if (slider) {
        slider.addEventListener('input', handleSliderChange);
      }
    });
    return () => {
      sliders.forEach(id => {
        const slider = document.getElementById(id) as HTMLInputElement;
        if (slider) {
          slider.removeEventListener('input', handleSliderChange);
        }
      });
    };
  }, [fields]);

  const handleSliderChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'duration') {
      setFields(prev => ({ ...prev, duration: parseInt(target.value) }));
    } else if (target.id === 'quality') {
      setFields(prev => ({ ...prev, quality: parseInt(target.value) }));
    }
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setFields(prev => ({ ...prev, [field]: value }));
  };

  const generatePrompt = () => {
    const input = baseIdea || 'Escena épica';
    let prompt = `${fields.subject || 'Sujeto principal'}, ${fields.subjectDesc}, `;
    prompt += `${fields.action}, `;
    prompt += `en ${fields.background || 'escenario detallado'} ${fields.environment}, `;
    prompt += `${fields.lighting} ${fields.shadows}, `;
    prompt += `${fields.camera}, `;
    prompt += `${fields.style}, `;
    prompt += `colores ${fields.colors}, mood ${fields.mood}, `;
    prompt += `${fields.weather}, `;
    prompt += `${fields.audio}, `;
    prompt += `props ${fields.props}, `;
    prompt += `${fields.transition}, duración ${fields.duration}s, `;
    prompt += `${fields.resolution}, calidad ${getQualityLabel()}, ${input}`;
    
    setGeneratedPrompt(prompt);
    addToHistory(prompt);
  };

  const getQualityLabel = () => {
    const labels = ['Baja', 'Media', 'Alta', 'Pro', 'Ultra'];
    return labels[Math.floor(fields.quality / 3)] || 'Ultra';
  };

  const addToHistory = (prompt: string) => {
    setHistory(prev => [prompt, ...prev.slice(0, 9)]);
  };

  const clearAll = () => {
    setBaseIdea('');
    setGeneratedPrompt('');
    setHistory([]);
    setFields({
      subject: '',
      subjectDesc: 'detallado hiperrealista',
      action: 'corriendo velozmente',
      background: '',
      environment: 'exterior montaña nevada',
      lighting: 'golden hour cálida dramática',
      shadows: 'sombras largas profundas',
      camera: 'slow motion tracking shot lateral',
      style: 'cinematográfico Hollywood 35mm',
      colors: '',
      mood: 'épico intenso dramático',
      weather: 'lluvia torrencial charcos reflectantes',
      audio: 'música orquestal épica intensa',
      props: '',
      duration: 15,
      transition: 'fade suave transiciones fluidas',
      resolution: '8k ultra HD detallado',
      quality: 9,
    });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const copyPrompt = async () => {
    if (!generatedPrompt.trim()) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert('✅ Prompt copiado!');
    } catch (e) {
      alert('No se pudo copiar automáticamente');
    }
  };

  const addTemplate = (template: string) => {
    setBaseIdea(prev => prev + ' ' + template);
  };

  const loadFromHistory = (prompt: string) => {
    setGeneratedPrompt(prompt);
    setBaseIdea(prompt);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'} p-6 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className={`text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-teal-400 to-blue-500 bg-clip-text text-transparent ${darkMode ? '' : 'text-gray-800'}`}>
            🚀 PromptMaster Video IA Pro Max
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            12 secciones para prompts ULTRA completos • Usa en Runway, Kling, Sora, Luma...
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={generatePrompt} className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500">
            <Sparkles className="h-4 w-4 mr-2" />
            Generar Prompt Épico
          </Button>
          <Button onClick={clearAll} variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar Todo
          </Button>
          <Button onClick={toggleTheme} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
            {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Button>
        </div>

        {/* Base Idea Input */}
        <Textarea
          value={baseIdea}
          onChange={(e) => setBaseIdea(e.target.value)}
          placeholder="Idea base: 'Un guerrero en un bosque encantado luchando contra sombras...'"
          className={`min-h-[120px] text-lg ${darkMode ? 'bg-slate-800/50 border-teal-500 text-white' : 'bg-white border-teal-500 text-gray-800'}`}
        />

        {/* Generated Prompt Display */}
        {generatedPrompt && (
          <Card className={`${darkMode ? 'bg-slate-900/50 border-blue-500' : 'bg-white border-blue-500'}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Film className="h-5 w-5 text-blue-500" />
                  Prompt Generado
                </h3>
                <Button onClick={copyPrompt} size="sm" variant="outline" className="border-blue-500 text-blue-500">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className={`whitespace-pre-wrap font-mono text-sm p-4 rounded-lg ${darkMode ? 'bg-black/50 text-green-400' : 'bg-gray-100 text-gray-800'}`}>
                {generatedPrompt}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* 12 Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* 1. Personaje Principal */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-teal-500/50' : 'bg-white border-teal-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-teal-400 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                👤 Personaje
              </h3>
              <input
                type="text"
                value={fields.subject}
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                placeholder="e.g. guerrero musculoso"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-teal-500 text-white' : 'bg-gray-50 border-teal-500 text-gray-800'}`}
              />
              <select
                value={fields.subjectDesc}
                onChange={(e) => handleFieldChange('subjectDesc', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-teal-500 text-white' : 'bg-gray-50 border-teal-500 text-gray-800'}`}
              >
                <option value="detallado hiperrealista">Hiperrealista</option>
                <option value="estilizado cartoon">Cartoon</option>
                <option value="épico fantasy">Fantasy</option>
              </select>
            </CardContent>
          </Card>

          {/* 2. Acción / Movimiento */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-red-500/50' : 'bg-white border-red-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-red-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ⚡ Acción
              </h3>
              <select
                value={fields.action}
                onChange={(e) => handleFieldChange('action', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-red-500 text-white' : 'bg-gray-50 border-red-500 text-gray-800'}`}
              >
                <option value="corriendo velozmente">Corriendo</option>
                <option value="luchando ferozmente espada en mano">Luchando</option>
                <option value="volando grácilmente">Volando</option>
                <option value="saltando ágilmente">Saltando</option>
                <option value="caminando lentamente">Caminando</option>
              </select>
            </CardContent>
          </Card>

          {/* 3. Escenario / Fondo */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-green-500/50' : 'bg-white border-green-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-green-400 flex items-center gap-2">
                <Tree className="h-5 w-5" />
                🌲 Escenario
              </h3>
              <input
                type="text"
                value={fields.background}
                onChange={(e) => handleFieldChange('background', e.target.value)}
                placeholder="e.g. bosque encantado"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-green-500 text-white' : 'bg-gray-50 border-green-500 text-gray-800'}`}
              />
              <select
                value={fields.environment}
                onChange={(e) => handleFieldChange('environment', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-green-500 text-white' : 'bg-gray-50 border-green-500 text-gray-800'}`}
              >
                <option value="interior castillo gótico">Interior</option>
                <option value="exterior montaña nevada">Exterior</option>
                <option value="ciudad futurista nocturna">Ciudad</option>
                <option value="desierto post-apocalíptico">Desierto</option>
              </select>
            </CardContent>
          </Card>

          {/* 4. Iluminación */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-yellow-500/50' : 'bg-white border-yellow-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-yellow-400 flex items-center gap-2">
                <Sun className="h-5 w-5" />
                💡 Iluminación
              </h3>
              <select
                value={fields.lighting}
                onChange={(e) => handleFieldChange('lighting', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-yellow-500 text-white' : 'bg-gray-50 border-yellow-500 text-gray-800'}`}
              >
                <option value="golden hour cálida dramática">Golden Hour</option>
                <option value="neón cyberpunk vibrante">Neón</option>
                <option value="luz suave difusa natural">Suave Natural</option>
                <option value="luz lunar azulada fría">Luz Lunar</option>
              </select>
              <select
                value={fields.shadows}
                onChange={(e) => handleFieldChange('shadows', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-yellow-500 text-white' : 'bg-gray-50 border-yellow-500 text-gray-800'}`}
              >
                <option value="sombras largas profundas">Sombras Largas</option>
                <option value="sin sombras planas">Sin Sombras</option>
                <option value="sombras suaves difusas">Sombras Suaves</option>
              </select>
            </CardContent>
          </Card>

          {/* 5. Cámara */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-purple-500/50' : 'bg-white border-purple-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-purple-400 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                📹 Cámara
              </h3>
              <select
                value={fields.camera}
                onChange={(e) => handleFieldChange('camera', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-purple-500 text-white' : 'bg-gray-50 border-purple-500 text-gray-800'}`}
              >
                <option value="slow motion tracking shot lateral">Tracking Lento</option>
                <option value="drone aerial panorámico descendente">Drone</option>
                <option value="close-up dramático zoom in">Close-up</option>
                <option value="wide shot estático panorámico">Wide Shot</option>
              </select>
            </CardContent>
          </Card>

          {/* 6. Estilo Visual */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-pink-500/50' : 'bg-white border-pink-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-pink-400 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                🎨 Estilo
              </h3>
              <select
                value={fields.style}
                onChange={(e) => handleFieldChange('style', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-pink-500 text-white' : 'bg-gray-50 border-pink-500 text-gray-800'}`}
              >
                <option value="cinematográfico Hollywood 35mm">Cinemático</option>
                <option value="anime Studio Ghibli">Anime</option>
                <option value="cyberpunk Blade Runner">Cyberpunk</option>
                <option value="documental BBC naturaleza">Documental</option>
              </select>
            </CardContent>
          </Card>

          {/* 7. Colores / Mood */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-cyan-500/50' : 'bg-white border-cyan-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                🌈 Colores / Mood
              </h3>
              <input
                type="text"
                value={fields.colors}
                onChange={(e) => handleFieldChange('colors', e.target.value)}
                placeholder="e.g. tonos azules fríos"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
              />
              <select
                value={fields.mood}
                onChange={(e) => handleFieldChange('mood', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-cyan-500 text-white' : 'bg-gray-50 border-cyan-500 text-gray-800'}`}
              >
                <option value="épico intenso dramático">Épico</option>
                <option value="tranquilo sereno pacífico">Tranquilo</option>
                <option value="terrorífico oscuro siniestro">Terror</option>
                <option value="alegre vibrante energético">Alegre</option>
              </select>
            </CardContent>
          </Card>

          {/* 8. Clima / Efectos */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-blue-500/50' : 'bg-white border-blue-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-blue-400 flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                ☔ Clima
              </h3>
              <select
                value={fields.weather}
                onChange={(e) => handleFieldChange('weather', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-blue-500 text-white' : 'bg-gray-50 border-blue-500 text-gray-800'}`}
              >
                <option value="lluvia torrencial charcos reflectantes">Lluvia</option>
                <option value="niebla densa misteriosa">Niebla</option>
                <option value="partículas polvo flotando">Partículas</option>
                <option value="nieve cayendo suavemente">Nieve</option>
              </select>
            </CardContent>
          </Card>

          {/* 9. Audio / Sonido */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-orange-500/50' : 'bg-white border-orange-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-orange-400 flex items-center gap-2">
                <Mic className="h-5 w-5" />
                🔊 Audio
              </h3>
              <select
                value={fields.audio}
                onChange={(e) => handleFieldChange('audio', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-orange-500 text-white' : 'bg-gray-50 border-orange-500 text-gray-800'}`}
              >
                <option value="música orquestal épica intensa">Orquestal</option>
                <option value="soundtrack electrónico futurista">Electrónica</option>
                <option value="sin audio ambiental natural">Ambiental</option>
                <option value="música suspense terror">Suspense</option>
              </select>
            </CardContent>
          </Card>

          {/* 10. Props / Objetos */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-indigo-500/50' : 'bg-white border-indigo-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                🛡️ Props
              </h3>
              <input
                type="text"
                value={fields.props}
                onChange={(e) => handleFieldChange('props', e.target.value)}
                placeholder="e.g. espada brillante"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-indigo-500 text-white' : 'bg-gray-50 border-indigo-500 text-gray-800'}`}
              />
            </CardContent>
          </Card>

          {/* 11. Duración / Transiciones */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-emerald-500/50' : 'bg-white border-emerald-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                ⏱️ Duración
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  id="duration"
                  min="5"
                  max="60"
                  value={fields.duration}
                  onChange={(e) => handleFieldChange('duration', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-emerald-400 text-sm">{fields.duration}s</span>
              </div>
              <select
                value={fields.transition}
                onChange={(e) => handleFieldChange('transition', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-emerald-500 text-white' : 'bg-gray-50 border-emerald-500 text-gray-800'}`}
              >
                <option value="fade suave transiciones fluidas">Fade Suave</option>
                <option value="cortes rápidos dinámicos">Cortes Rápidos</option>
              </select>
            </CardContent>
          </Card>

          {/* 12. Técnico */}
          <Card className={`${darkMode ? 'bg-slate-800/50 border-rose-500/50' : 'bg-white border-rose-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-rose-400 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                ⚙️ Técnico
              </h3>
              <select
                value={fields.resolution}
                onChange={(e) => handleFieldChange('resolution', e.target.value)}
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-slate-700/50 border-rose-500 text-white' : 'bg-gray-50 border-rose-500 text-gray-800'}`}
              >
                <option value="8k ultra HD detallado">8K</option>
                <option value="4k cinematic">4K</option>
                <option value="1080p full HD">1080p</option>
              </select>
              <div className="space-y-2">
                <input
                  type="range"
                  id="quality"
                  min="1"
                  max="10"
                  value={fields.quality}
                  onChange={(e) => handleFieldChange('quality', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-rose-400 text-sm">{getQualityLabel()}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-rose-500 hover:text-white"
                  onClick={() => addTemplate('hiperdetallado texturas realistas')}
                >
                  Hiperdetalle
                </Badge>
                <Badge 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-rose-500 hover:text-white"
                  onClick={() => addTemplate('negative: blur deformed ugly')}
                >
                  Negative
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        {history.length > 0 && (
          <Card className={`${darkMode ? 'bg-slate-800/50 border-purple-500/50' : 'bg-white border-purple-500'}`}>
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-purple-400 flex items-center gap-2">
                <History className="h-5 w-5" />
                📜 Historial Prompts
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {history.map((prompt, idx) => (
                  <div
                    key={idx}
                    onClick={() => loadFromHistory(prompt)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${darkMode ? 'bg-teal-500/20 hover:bg-teal-500/40' : 'bg-teal-50 hover:bg-teal-100'}`}
                  >
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
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

// Iconos adicionales
function Zap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function Tree({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V6M5 12l7-7 7 7M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
    </svg>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/>
      <path d="M19 19a3 3 0 00.5-5.963A4 4 0 0012 8.038a4 4 0 00-7.5 0A3 3 0 005 19"/>
    </svg>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
