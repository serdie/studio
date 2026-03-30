'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Copy,
  Sparkles,
  Code2,
  Palette,
  Save,
  Download,
  History,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Bug,
  RefreshCcw,
  FileText,
  Wand2,
  Star,
  TrendingUp,
  Eye,
  PenTool,
  Box,
  Moon
} from 'lucide-react';

interface PromptHistory {
  id: string;
  name: string;
  task: string;
  prompt: string;
  date: string;
}

interface DesignPreset {
  id: string;
  name: string;
  description: string;
  keywords: string;
  icon: string;
}

export default function VibePromptStudio() {
  const [selectedTask, setSelectedTask] = useState('web');
  const [projectName, setProjectName] = useState('');
  const [contexto, setContexto] = useState('');
  const [rol, setRol] = useState('');
  const [stack, setStack] = useState('');
  const [peticion, setPeticion] = useState('');
  const [alcance, setAlcance] = useState('');
  const [restricciones, setRestricciones] = useState('');
  const [formatoSalida, setFormatoSalida] = useState('codigo');
  const [idioma, setIdioma] = useState('es');
  const [chkTests, setChkTests] = useState(false);
  const [chkExplicacion, setChkExplicacion] = useState(false);
  const [chkRevisarRiesgos, setChkRevisarRiesgos] = useState(false);
  
  // Nuevos campos de diseño
  const [designPreset, setDesignPreset] = useState('modern-dark');
  const [designCustom, setDesignCustom] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [complexity, setComplexity] = useState('medium');
  const [responsive, setResponsive] = useState(true);
  const [accessibility, setAccessibility] = useState(true);
  const [animations, setAnimations] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });
  const [promptHistory, setPromptHistory] = useState<PromptHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [qualityScore, setQualityScore] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const designPresets: DesignPreset[] = [
    { id: 'modern-dark', name: 'Modern Dark', description: 'Oscuro, gradientes, glassmorphism', keywords: 'dark, gradient, glass, modern, sleek', icon: '🌙' },
    { id: 'clean-light', name: 'Clean Light', description: 'Claro, minimalista, mucho espacio', keywords: 'light, clean, minimal, whitespace, airy', icon: '☀️' },
    { id: 'neubrutalism', name: 'Neo-Brutalism', description: 'Bordes gruesos, sombras duras, colores vibrantes', keywords: 'brutalist, bold, borders, shadows, vibrant', icon: '🎨' },
    { id: 'glassmorphism', name: 'Glassmorphism', description: 'Transparencias, blur, capas flotantes', keywords: 'glass, transparent, blur, floating, layers', icon: '🪟' },
    { id: 'retro', name: 'Retro/Vintage', description: 'Estilo años 80-90, pixel art, neon', keywords: 'retro, vintage, 80s, 90s, pixel, neon', icon: '📼' },
    { id: 'corporate', name: 'Corporate', description: 'Profesional, sobrio, empresarial', keywords: 'corporate, professional, business, clean, trust', icon: '🏢' },
    { id: 'playful', name: 'Playful', description: 'Divertido, colores vivos, animaciones', keywords: 'playful, fun, colorful, animations, friendly', icon: '🎪' },
    { id: 'luxury', name: 'Luxury', description: 'Elegante, premium, sofisticado', keywords: 'luxury, premium, elegant, sophisticated, gold', icon: '✨' },
    { id: 'tech', name: 'Tech/Futuristic', description: 'Tecnológico, cyberpunk, neon, grids', keywords: 'tech, futuristic, cyberpunk, neon, grid', icon: '🤖' },
    { id: 'natural', name: 'Natural/Organic', description: 'Tonos tierra, formas orgánicas, sostenible', keywords: 'natural, organic, earth, sustainable, green', icon: '🌿' },
    { id: 'custom', name: 'Personalizado', description: 'Define tu propio estilo', keywords: 'custom, manual, specific', icon: '✏️' }
  ];

  const taskIcons: Record<string, any> = {
    web: Globe,
    ecommerce: ShoppingCart,
    app: LayoutDashboard,
    debug: Bug,
    refactor: RefreshCcw,
    review: Eye,
    github: FileText,
    custom: Wand2
  };

  const taskTags: Record<string, string> = {
    web: 'UI + front',
    ecommerce: 'flows + checkout',
    app: 'full-stack opcional',
    debug: 'logs + bugfix',
    refactor: 'clean code',
    review: 'QA + seguridad',
    github: 'documentación',
    custom: 'avanzado'
  };

  const taskDescriptions: Record<string, string> = {
    web: 'Páginas de marketing, portfolios, landings con HTML/CSS/JS o framework.',
    ecommerce: 'Catálogo, carrito, filtros, pagos (simulados o integrados).',
    app: 'Dashboards, CRUD, apps con autenticación, APIs, etc.',
    debug: 'Analizar errores, logs, stack traces y proponer soluciones.',
    refactor: 'Mejorar legibilidad, rendimiento o arquitectura respetando el comportamiento.',
    review: 'Revisar calidad, estilos, seguridad, test coverage, etc.',
    github: 'Generar README, descripción de repo, instrucciones de despliegue.',
    custom: 'Cualquier otro caso: scripts, migraciones, tests, etc.'
  };

  useEffect(() => {
    const saved = localStorage.getItem('vibe-prompt-history');
    if (saved) {
      setPromptHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    calculateQualityScore();
  }, [contexto, rol, stack, peticion, designPreset, designCustom, responsive, accessibility]);

  useEffect(() => {
    setCharacterCount(output.length);
  }, [output]);

  const calculateQualityScore = () => {
    let score = 0;
    if (contexto.length > 50) score += 15;
    if (rol.length > 30) score += 15;
    if (stack.length > 20) score += 15;
    if (peticion.length > 50) score += 20;
    if (designPreset || designCustom) score += 10;
    if (responsive) score += 5;
    if (accessibility) score += 5;
    if (alcance.length > 30) score += 10;
    if (restricciones.length > 30) score += 5;
    setQualityScore(Math.min(score, 100));
  };

  const buildPrompt = () => {
    const missing: string[] = [];
    if (!peticion) missing.push('petición principal');
    if (!contexto) missing.push('contexto del proyecto');
    if (!rol) missing.push('rol/"actúa como"');
    if (!stack) missing.push('stack/tecnologías');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Te falta completar: ' + missing.join(' · ') + '. Aun así, he generado un prompt base.' 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: '✨ Prompt generado. ¡Listo para copiar y usar en Vibe Coding!' 
      });
    }

    // Texto para "tipo de tarea"
    let tareaTexto = '';
    switch (selectedTask) {
      case 'web':
        tareaTexto = 'Tu tarea principal es diseñar y generar código para una nueva web/landing page centrada en una buena experiencia de usuario y buenas prácticas front-end.';
        break;
      case 'ecommerce':
        tareaTexto = 'Tu tarea principal es diseñar y generar el código de una experiencia de tienda online (flujo de catálogo → detalle → carrito → checkout o equivalente), cuidando la claridad de los pasos y la gestión de estados.';
        break;
      case 'app':
        tareaTexto = 'Tu tarea principal es diseñar y generar una aplicación web con estructura de componentes y vistas (estilo panel/dash), con gestión de estado coherente y pensada para evolucionar.';
        break;
      case 'debug':
        tareaTexto = 'Tu tarea principal es actuar como depurador de código: analizar errores, logs y comportamiento inesperado, explicar el problema y proponer correcciones claras.';
        break;
      case 'refactor':
        tareaTexto = 'Tu tarea principal es refactorizar y mejorar código existente, manteniendo el comportamiento pero mejorando legibilidad, estructura y, cuando proceda, rendimiento.';
        break;
      case 'review':
        tareaTexto = 'Tu tarea principal es revisar código como si fueras un revisor senior: detectar problemas, malas prácticas, riesgos de seguridad y oportunidades de mejora.';
        break;
      case 'github':
        tareaTexto = 'Tu tarea principal es generar documentación clara (por ejemplo README.md, instrucciones de despliegue o descripción de repositorio) a partir de la información proporcionada.';
        break;
      case 'custom':
        tareaTexto = 'Tu tarea principal es ayudar en una tarea de desarrollo personalizada, siguiendo al máximo las instrucciones y el contexto que te doy.';
        break;
    }

    // Diseño
    let designTexto = '';
    const preset = designPresets.find(p => p.id === designPreset);
    if (designPreset === 'custom' && designCustom) {
      designTexto = `### Estilo de diseño personalizado\n${designCustom}\n\n`;
    } else if (preset) {
      designTexto = `### Estilo de diseño\nAplica el estilo "${preset.name}": ${preset.description}. Palabras clave: ${preset.keywords}.\n\n`;
    }

    // Responsive y accesibilidad
    let responsiveTexto = '';
    if (responsive) {
      responsiveTexto += '- **Responsive**: El diseño debe funcionar perfectamente en móvil, tablet y escritorio (mobile-first).\n';
    }
    if (accessibility) {
      responsiveTexto += '- **Accesibilidad**: Sigue WCAG 2.1 AA, usa semántica HTML correcta, contrastes adecuados, labels en formularios.\n';
    }
    if (animations) {
      responsiveTexto += '- **Animaciones**: Incluye micro-interacciones y animaciones sutiles para mejorar la UX.\n';
    }
    if (darkMode) {
      responsiveTexto += '- **Dark Mode**: Implementa modo oscuro con toggle.\n';
    }

    // Formato salida
    let formatoTexto = '';
    if (formatoSalida === 'codigo') {
      formatoTexto = 'Entrega directamente el código final listo para pegar, sin explicaciones largas, salvo comentarios breves en el propio código cuando aporten valor.';
    } else if (formatoSalida === 'codigo_explicado') {
      formatoTexto = 'Primero explica brevemente la solución (3–6 frases) y después entrega el código completo, bien formateado.';
    } else if (formatoSalida === 'pasos') {
      formatoTexto = 'Primero lista los pasos o plan de acción, y después proporciona el código resultante siguiendo ese plan.';
    } else if (formatoSalida === 'revision') {
      formatoTexto = 'Organiza la salida como un informe de revisión: sección de problemas detectados, recomendaciones, y ejemplos de código cuando sean necesarios.';
    }

    // Idioma
    let idiomaTexto = '';
    if (idioma === 'es') {
      idiomaTexto = 'Redacta toda la explicación en español y, cuando añadas comentarios en el código, hazlos también en español claro.';
    } else if (idioma === 'en') {
      idiomaTexto = 'Write all explanations and code comments in clear, professional English.';
    } else if (idioma === 'es_codigo_en') {
      idiomaTexto = 'Redacta la explicación en español, pero escribe los comentarios dentro del código en inglés técnico claro.';
    }

    // Controles de calidad
    const controles: string[] = [];
    if (chkTests) {
      controles.push('Sugiere, cuando tenga sentido, ideas de tests o casos de prueba básicos para validar la solución.');
    }
    if (chkExplicacion) {
      controles.push('Incluye una breve explicación de las decisiones clave de diseño o arquitectura que tomes.');
    }
    if (chkRevisarRiesgos) {
      controles.push('Al final, menciona posibles riesgos, limitaciones o supuestos que has hecho al generar esta solución.');
    }

    // Construcción final del prompt
    const partes: string[] = [];

    if (projectName) {
      partes.push(`# 🚀 Proyecto: ${projectName}`);
      partes.push('');
    }

    partes.push('## 🎯 Rol');
    partes.push(rol || 'Actúa como un desarrollador/a senior especializado en el stack indicado.');
    partes.push('');

    partes.push('## 📋 Tipo de tarea');
    partes.push(tareaTexto);
    partes.push('');

    partes.push('## 🌍 Contexto del proyecto');
    partes.push(contexto || '(añadir descripción del proyecto, público objetivo y propósito).');
    if (targetAudience) {
      partes.push(`\n**Público objetivo:** ${targetAudience}`);
    }
    if (complexity) {
      partes.push(`\n**Nivel de complejidad:** ${complexity === 'low' ? 'Bajo (MVP/simple)' : complexity === 'medium' ? 'Medio (estándar)' : 'Alto (avanzado/enterprise)'}`);
    }
    partes.push('');

    partes.push('## 🛠️ Stack y entorno');
    partes.push(stack || 'Stack no especificado todavía. Pide al usuario que lo defina (framework, lenguaje, librerías, etc.).');
    partes.push('');

    if (designPreset || designCustom) {
      partes.push('## 🎨 ' + designTexto);
    }

    if (responsiveTexto) {
      partes.push('## 📱 Requisitos de diseño');
      partes.push(responsiveTexto);
      partes.push('');
    }

    partes.push('## ⚡ Petición principal');
    partes.push(peticion || 'Describe de forma concreta la funcionalidad o código que necesitas que genere o revise la IA.');
    partes.push('');

    if (alcance) {
      partes.push('## 🎯 Alcance y fuera de alcance');
      partes.push(alcance);
      partes.push('');
    }

    if (restricciones) {
      partes.push('## 📏 Restricciones, estándares y preferencias');
      partes.push(restricciones);
      partes.push('');
    }

    partes.push('## 📦 Formato de salida deseado');
    partes.push(formatoTexto);
    partes.push('');
    
    partes.push('## 🌐 Idioma');
    partes.push(idiomaTexto);
    partes.push('');

    if (controles.length > 0) {
      partes.push('## ✅ Controles de calidad');
      controles.forEach(c => partes.push('- ' + c));
      partes.push('');
    }

    partes.push('## 💡 Instrucciones finales');
    partes.push('Si detectas que falta información importante (por ejemplo, stack, versión de librerías, límites de rendimiento, requisitos de seguridad), pide primero esas aclaraciones al usuario en 2–4 preguntas breves antes de escribir el código principal.');

    return partes.join('\n');
  };

  const handleGenerate = () => {
    const prompt = buildPrompt();
    setOutput(prompt);
  };

  const handleCopy = async () => {
    if (!output.trim()) {
      setStatus({ type: 'error', message: 'Todavía no hay prompt generado. Pulsa antes en "Generar".' });
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      setStatus({ type: 'ok', message: '✅ Prompt copiado al portapapeles. ¡Pégalo en Vibe Coding!' });
      
      // Guardar en historial
      const newEntry: PromptHistory = {
        id: Date.now().toString(),
        name: projectName || 'Sin nombre',
        task: selectedTask,
        prompt: output,
        date: new Date().toLocaleDateString('es-ES')
      };
      const updated = [newEntry, ...promptHistory].slice(0, 10);
      setPromptHistory(updated);
      localStorage.setItem('vibe-prompt-history', JSON.stringify(updated));
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar. Selecciona y copia manualmente.' });
    }
  };

  const handleSave = () => {
    if (!output.trim()) return;
    const name = prompt('Nombre del template:', projectName || 'Mi template');
    if (!name) return;
    const templates = JSON.parse(localStorage.getItem('vibe-prompt-templates') || '[]');
    templates.push({ name, prompt: output, date: new Date().toLocaleDateString('es-ES') });
    localStorage.setItem('vibe-prompt-templates', JSON.stringify(templates));
    setStatus({ type: 'ok', message: `✅ Template "${name}" guardado.` });
  };

  const handleDownload = () => {
    if (!output.trim()) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibe-prompt-${projectName || 'prompt'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus({ type: 'ok', message: '📥 Prompt descargado.' });
  };

  const loadPreset = () => {
    setSelectedTask('web');
    setProjectName('Curso IA - Landing');
    setContexto('Estoy creando una landing page para un curso online de introducción a la IA para jóvenes. Quiero una estética moderna, oscura pero legible, con secciones de hero, beneficios, temario, testimonios y llamada a la acción.');
    setRol('Actúa como un desarrollador front-end senior experto en HTML5, Tailwind CSS y diseño responsive, con foco en accesibilidad y buenas prácticas.');
    setStack('HTML5, Tailwind CSS, JavaScript ES202x. La landing se montará en un proyecto Vite + React más adelante.');
    setPeticion('Diseña la estructura y genera el código HTML con clases de Tailwind para todas las secciones (hero, beneficios, temario, testimonios, FAQ y CTA final).');
    setAlcance('Solo necesitamos el front estático. No incluyas lógica de frameworks ni dependencias externas aparte de Tailwind.');
    setRestricciones('Usa solo clases de Tailwind. Asegúrate de que se vea bien en móvil, tablet y escritorio. Sigue buenas prácticas de accesibilidad.');
    setDesignPreset('modern-dark');
    setResponsive(true);
    setAccessibility(true);
    setAnimations(true);
    setDarkMode(true);
    setFormatoSalida('codigo_explicado');
    setIdioma('es');
    setChkExplicacion(true);
    setChkRevisarRiesgos(true);
    setStatus({ type: '', message: 'Ejemplo cargado. Ajusta y genera.' });
  };

  const loadFromHistory = (entry: PromptHistory) => {
    setOutput(entry.prompt);
    setShowHistory(false);
    setStatus({ type: 'ok', message: `Template "${entry.name}" cargado.` });
  };

  const clearHistory = () => {
    setPromptHistory([]);
    localStorage.removeItem('vibe-prompt-history');
    setStatus({ type: 'ok', message: 'Historial limpiado.' });
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getQualityMessage = (score: number) => {
    if (score >= 80) return '¡Excelente! Prompt muy completo';
    if (score >= 60) return 'Bien, pero puedes mejorar algunos campos';
    return 'Completa más campos para un prompt óptimo';
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 via-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  Vibe Prompt Studio
                  <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-white border-0">PRO</Badge>
                </h1>
                <p className="text-sm text-slate-400">Generador de prompts profesionales para Vibe Coding</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-[800px]">
              Crea prompts de nivel senior para Vibe Coding, Lovable, Readdy y otros asistentes de código. 
              Define rol, contexto, diseño, stack y restricciones para obtener resultados increíbles.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700">
                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                Role → Task → Context → Constraints → Output
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Star className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <p className="text-xs text-slate-500">💡 Tip: Cuanto más específico seas, mejores resultados obtendrás</p>
          </div>
        </div>

        {/* Quality Score Bar */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className={`h-4 w-4 ${getQualityColor(qualityScore)}`} />
                    <span className="text-sm font-medium text-slate-300">Quality Score</span>
                  </div>
                  <span className={`text-sm font-bold ${getQualityColor(qualityScore)}`}>
                    {qualityScore}/100
                  </span>
                </div>
                <Progress value={qualityScore} className="h-2" />
                <p className="text-xs text-slate-500">{getQualityMessage(qualityScore)}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Code2 className="h-3 w-3" />
                  <span>{characterCount} chars</span>
                </div>
                <div className="flex items-center gap-1">
                  <History className="h-3 w-3" />
                  <span>{promptHistory.length} templates</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Configuration */}
          <div className="space-y-6">
            {/* Task Type */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg shadow-green-500/50" />
                  <h2 className="text-lg font-semibold text-white">1. Tipo de tarea para Vibe Coding</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(taskIcons).map(([key, Icon]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedTask === key
                          ? 'bg-gradient-to-br from-green-900/50 to-cyan-900/50 border-green-500/50 shadow-lg shadow-green-500/20'
                          : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                      }`}
                      onClick={() => setSelectedTask(key)}
                    >
                      <CardContent className="p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${selectedTask === key ? 'text-green-400' : 'text-slate-400'}`} />
                            <span className={`text-sm font-semibold capitalize ${selectedTask === key ? 'text-white' : 'text-slate-300'}`}>
                              {key}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-[10px] bg-slate-800 text-slate-400 border-slate-700">
                            {taskTags[key]}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{taskDescriptions[key]}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50" />
                  <h2 className="text-lg font-semibold text-white">2. Información del proyecto</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 text-sm">Nombre del proyecto (opcional)</Label>
                    <Input
                      placeholder="Ej.: Landing Curso IA, Dashboard Ventas..."
                      className="bg-slate-900/50 border-slate-700 text-white mt-1"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-slate-300 text-sm">Descripción del contexto</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="h-4 w-4 text-slate-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Qué estás construyendo, para quién y con qué propósito</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea
                      placeholder="Ej.: Estoy desarrollando una aplicación web de gestión de tareas para estudiantes, centrada en simplicidad y vista semanal..."
                      className="bg-slate-900/50 border-slate-700 text-white min-h-[80px]"
                      value={contexto}
                      onChange={(e) => setContexto(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300 text-sm">Actúa como... (rol)</Label>
                      <Input
                        placeholder="Ej.: Senior full-stack en React"
                        className="bg-slate-900/50 border-slate-700 text-white mt-1"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm">Público objetivo</Label>
                      <Input
                        placeholder="Ej.: Jóvenes 16-25 años"
                        className="bg-slate-900/50 border-slate-700 text-white mt-1"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300 text-sm">Stack / tecnologías</Label>
                    <Input
                      placeholder="Ej.: HTML5, Tailwind CSS, React, Next.js, Node.js..."
                      className="bg-slate-900/50 border-slate-700 text-white mt-1"
                      value={stack}
                      onChange={(e) => setStack(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300 text-sm">Nivel de complejidad</Label>
                      <Select value={complexity} onValueChange={setComplexity}>
                        <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="low">🟢 Bajo (MVP/simple)</SelectItem>
                          <SelectItem value="medium">🟡 Medio (estándar)</SelectItem>
                          <SelectItem value="high">🔴 Alto (avanzado/enterprise)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm">Idioma de respuesta</Label>
                      <Select value={idioma} onValueChange={setIdioma}>
                        <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="es">🇪🇸 Español</SelectItem>
                          <SelectItem value="en">🇬 English</SelectItem>
                          <SelectItem value="es_codigo_en">🇪🇸 ES + 🇬🇧 EN (código)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Section - NEW */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg shadow-pink-500/50" />
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    3. Estilo de diseño
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 text-xs">NUEVO</Badge>
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 text-sm mb-2 block">Selecciona un preset de diseño</Label>
                    <Select value={designPreset} onValueChange={setDesignPreset}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                        <ScrollArea className="h-[300px]">
                          {designPresets.map((preset) => (
                            <SelectItem key={preset.id} value={preset.id} className="text-white hover:bg-slate-700">
                              <div className="flex items-center gap-2">
                                <span>{preset.icon}</span>
                                <div>
                                  <div className="font-medium">{preset.name}</div>
                                  <div className="text-xs text-slate-400">{preset.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>

                  {designPreset === 'custom' && (
                    <div>
                      <Label className="text-slate-300 text-sm">Describe tu estilo personalizado</Label>
                      <Textarea
                        placeholder="Ej.: Quiero un diseño con colores pastel, tipografía serif, mucho espacio en blanco, estilo editorial minimalista..."
                        className="bg-slate-900/50 border-slate-700 text-white mt-1 min-h-[80px]"
                        value={designCustom}
                        onChange={(e) => setDesignCustom(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">Responsive</span>
                      </div>
                      <Switch checked={responsive} onCheckedChange={setResponsive} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">Accesibilidad</span>
                      </div>
                      <Switch checked={accessibility} onCheckedChange={setAccessibility} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">Animaciones</span>
                      </div>
                      <Switch checked={animations} onCheckedChange={setAnimations} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">Dark Mode</span>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Request */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50" />
                  <h2 className="text-lg font-semibold text-white">4. Petición principal y formato</h2>
                </div>

                <div>
                  <Label className="text-slate-300 text-sm">¿Qué quieres que haga el asistente?</Label>
                  <Textarea
                    placeholder="Ej.: Diseña y genera el código completo del front de la landing, con secciones de hero, features, pricing y contacto..."
                    className="bg-slate-900/50 border-slate-700 text-white mt-1 min-h-[80px]"
                    value={peticion}
                    onChange={(e) => setPeticion(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300 text-sm">Formato de salida</Label>
                    <Select value={formatoSalida} onValueChange={setFormatoSalida}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="codigo">💻 Solo código</SelectItem>
                        <SelectItem value="codigo_explicado">📝 Código + explicación</SelectItem>
                        <SelectItem value="pasos">📋 Pasos + código</SelectItem>
                        <SelectItem value="revision">🔍 Informe de revisión</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 text-sm">Alcance / fuera de alcance</Label>
                  <Textarea
                    placeholder="Ej.: En esta iteración solo quiero el front, sin backend real. No inventes endpoints..."
                    className="bg-slate-900/50 border-slate-700 text-white mt-1 min-h-[60px]"
                    value={alcance}
                    onChange={(e) => setAlcance(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-slate-300 text-sm">Restricciones y estándares</Label>
                  <Textarea
                    placeholder="Ej.: Sigue buenas prácticas de accesibilidad, usa nombres descriptivos, evita lógica duplicada..."
                    className="bg-slate-900/50 border-slate-700 text-white mt-1 min-h-[60px]"
                    value={restricciones}
                    onChange={(e) => setRestricciones(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-slate-300 text-sm mb-2 block">Controles de calidad</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch checked={chkTests} onCheckedChange={setChkTests} id="chkTests" />
                      <Label htmlFor="chkTests" className="text-sm text-slate-300 cursor-pointer">
                        Incluir ideas de tests / casos de prueba
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={chkExplicacion} onCheckedChange={setChkExplicacion} id="chkExplicacion" />
                      <Label htmlFor="chkExplicacion" className="text-sm text-slate-300 cursor-pointer">
                        Explicar decisiones clave de diseño
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={chkRevisarRiesgos} onCheckedChange={setChkRevisarRiesgos} id="chkRevisarRiesgos" />
                      <Label htmlFor="chkRevisarRiesgos" className="text-sm text-slate-300 cursor-pointer">
                        Mencionar riesgos / limitaciones
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-6">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/50" />
                    <h2 className="text-lg font-semibold text-white">Prompt generado</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={loadPreset} className="text-slate-400 hover:text-white">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Rellenar ejemplo
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerate} 
                    className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generar prompt
                  </Button>
                  <Button 
                    onClick={handleCopy} 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleDownload} 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => setShowHistory(!showHistory)} 
                    variant="outline" 
                    className={`border-slate-600 ${showHistory ? 'bg-slate-700 text-white' : 'text-slate-300'} hover:bg-slate-700`}
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </div>

                {showHistory && promptHistory.length > 0 && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">Historial reciente</span>
                        <Button variant="ghost" size="sm" onClick={clearHistory} className="h-6 text-red-400 hover:text-red-300">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <ScrollArea className="h-[200px]">
                        {promptHistory.map((entry) => (
                          <div
                            key={entry.id}
                            className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer transition-colors"
                            onClick={() => loadFromHistory(entry)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-300">{entry.name}</span>
                              </div>
                              <span className="text-xs text-slate-500">{entry.date}</span>
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                <div className="relative">
                  <ScrollArea className="h-[500px] rounded-lg border border-slate-700 bg-slate-900">
                    <pre className="p-4 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {output || 'El prompt generado aparecerá aquí...'}
                    </pre>
                  </ScrollArea>
                </div>

                {status.message && (
                  <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
                    status.type === 'ok' ? 'bg-green-900/30 text-green-400 border border-green-800' : 
                    status.type === 'error' ? 'bg-red-900/30 text-red-400 border border-red-800' : ''
                  }`}>
                    {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4" /> : 
                     status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : null}
                    {status.message}
                  </div>
                )}

                <Separator className="bg-slate-700" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Layers className="h-3 w-3" />
                    <span>Estructura: Rol · Tarea · Contexto · Diseño · Restricciones · Formato</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                      🎯 Role-based
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                      🎨 Design-aware
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                      ♿ Accessible
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                      📱 Responsive
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
