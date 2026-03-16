'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Copy,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Image as ImageIcon,
  Palette,
  Camera,
  Aperture,
  MonitorPlay,
  Wand2,
  Info
} from 'lucide-react';

export default function ImagePromptWorkshop() {
  const [fields, setFields] = useState({
    sujeto: '',
    accion: '',
    estilo: '',
    iluminacion: '',
    camara: '',
    extra: '',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [completedFields, setCompletedFields] = useState(0);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('--ar 16:9');
  const [selectedVersion, setSelectedVersion] = useState('v6.1');

  useEffect(() => {
    buildPrompt();
  }, [fields, selectedAspectRatio, selectedVersion]);

  const buildPrompt = () => {
    const piezas: string[] = [];
    const trim = (text: string) => text.trim();

    const s = trim(fields.sujeto);
    const a = trim(fields.accion);
    const e = trim(fields.estilo);
    const i = trim(fields.iluminacion);
    const c = trim(fields.camara);
    const x = trim(fields.extra);

    if (s) piezas.push(s);
    if (a) piezas.push(a);
    if (e) piezas.push(e);
    if (i) piezas.push(i);
    if (c) piezas.push(c);
    if (x) piezas.push(x);

    let prompt = piezas.join(', ');

    if (prompt) {
      prompt += ` --ar ${selectedAspectRatio.replace('--ar ', '')} --v ${selectedVersion.replace('v', '')}`;
    }

    setGeneratedPrompt(prompt);

    const valores = Object.values(fields);
    const completos = valores.filter((v) => v.trim().length > 0).length;
    setCompletedFields(completos);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const copiarPrompt = async () => {
    if (!generatedPrompt.trim()) {
      showToast("Escribe primero en al menos un bloque del prompt");
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      showToast("✅ Prompt copiado. Pégalo en Midjourney, DALL-E o tu IA de imagen favorita.");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const textareaFallback = document.createElement("textarea");
      textareaFallback.value = generatedPrompt;
      textareaFallback.style.position = "fixed";
      textareaFallback.style.opacity = "0";
      document.body.appendChild(textareaFallback);
      textareaFallback.select();
      try {
        document.execCommand("copy");
        showToast("✅ Prompt copiado. Pégalo en tu IA de imagen favorita.");
      } catch (err) {
        showToast("No se pudo copiar automáticamente, selecciónalo a mano.");
      }
      document.body.removeChild(textareaFallback);
    }
  };

  const cargarEjemplo = () => {
    setFields({
      sujeto: "Una mujer joven profesional, vestida con blazer moderno, trabajando en un portátil en una cafetería minimalista con plantas verdes",
      accion: "mirando concentrada la pantalla, tecleando, con una taza de café al lado",
      estilo: "fotografía editorial de estilo lifestyle, composición limpia, estética de Instagram profesional, colores cálidos y naturales",
      iluminacion: "luz natural suave entrando por ventana lateral, golden hour, sombras suaves, iluminación cinematográfica",
      camara: "shot with Sony A7R IV, 50mm f/1.8, profundidad de campo reducida, bokeh suave en el fondo",
      extra: "alta resolución, ultra detallado, 8K, fotografía premiada, estilo de revista Wired"
    });
    showToast("✨ Ejemplo cargado. Ajusta los textos a tu necesidad.");
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all duration-300 opacity-0';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(-4px)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(() => document.body.removeChild(toast), 3000);
    }, 2000);
  };

  const fieldIcons: Record<string, React.ReactNode> = {
    sujeto: <ImageIcon className="h-4 w-4" />,
    accion: <MonitorPlay className="h-4 w-4" />,
    estilo: <Palette className="h-4 w-4" />,
    iluminacion: <Camera className="h-4 w-4" />,
    camara: <Aperture className="h-4 w-4" />,
    extra: <Wand2 className="h-4 w-4" />,
  };

  const fieldColors: Record<string, string> = {
    sujeto: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    accion: 'bg-gradient-to-br from-purple-500 to-pink-600',
    estilo: 'bg-gradient-to-br from-amber-500 to-orange-600',
    iluminacion: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    camara: 'bg-gradient-to-br from-emerald-500 to-green-600',
    extra: 'bg-gradient-to-br from-rose-500 to-red-600',
  };

  const aspectRatios = [
    { value: '--ar 16:9', label: '16:9', desc: 'Panorámico' },
    { value: '--ar 4:3', label: '4:3', desc: 'Clásico' },
    { value: '--ar 3:2', label: '3:2', desc: 'Fotografía' },
    { value: '--ar 1:1', label: '1:1', desc: 'Cuadrado' },
    { value: '--ar 9:16', label: '9:16', desc: 'Stories/Reels' },
    { value: '--ar 3:4', label: '3:4', desc: 'Retrato' },
  ];

  const versions = [
    { value: 'v6.1', label: 'v6.1', desc: 'Última versión' },
    { value: 'v6.0', label: 'v6.0', desc: 'Estable' },
    { value: 'v5.2', label: 'v5.2', desc: 'Clásica' },
    { value: 'niji 6', label: 'Niji 6', desc: 'Anime/Manga' },
  ];

  return (
    <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <CardHeader className="border-b border-pink-200/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
              <ImageIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                🎨 Taller de Prompts para IA de Imagen
              </h3>
              <p className="text-sm text-purple-700">
                Crea prompts profesionales para Midjourney, DALL-E, Stable Diffusion y más
              </p>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-100/50">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Módulo 2
          </Badge>
        </div>

        {/* Guía visual de estructura */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-100/50 to-pink-100/50 mt-4">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-6 gap-2">
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg border-2 border-blue-300">
                <p className="text-sm font-bold text-white">Sujeto</p>
                <p className="text-[9px] text-blue-100">¿Qué?</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg border-2 border-purple-300">
                <p className="text-sm font-bold text-white">Acción</p>
                <p className="text-[9px] text-purple-100">¿Haciendo qué?</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg border-2 border-amber-300">
                <p className="text-sm font-bold text-white">Estilo</p>
                <p className="text-[9px] text-amber-100">Artístico</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg border-2 border-yellow-300">
                <p className="text-sm font-bold text-white">Luz</p>
                <p className="text-[9px] text-yellow-100">Iluminación</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg border-2 border-emerald-300">
                <p className="text-sm font-bold text-white">Cámara</p>
                <p className="text-[9px] text-emerald-100">Técnico</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 shadow-lg border-2 border-rose-300">
                <p className="text-sm font-bold text-white">Extra</p>
                <p className="text-[9px] text-rose-100">Detalles</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-purple-700">
              <span><strong className="text-blue-600">Sujeto:</strong> protagonista u objeto principal</span>
              <span><strong className="text-purple-600">Acción:</strong> qué está haciendo</span>
              <span><strong className="text-amber-600">Estilo:</strong> referencia artística</span>
              <span><strong className="text-yellow-600">Luz:</strong> tipo de iluminación</span>
              <span><strong className="text-emerald-600">Cámara:</strong> ángulo y lente</span>
              <span><strong className="text-rose-600">Extra:</strong> calidad y detalles</span>
            </div>
          </CardContent>
        </Card>

        {/* Imágenes de ejemplo */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Card className="border-blue-200 bg-white/80 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <img 
                src="/docs/imagenes/promptimagen1.png" 
                alt="Ejemplo de prompt para imagen 1"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-3">
              <p className="text-xs text-center text-slate-600 font-medium">📸 Ejemplo 1 - Estructura de prompt</p>
            </CardContent>
          </Card>
          <Card className="border-pink-200 bg-white/80 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-amber-100 flex items-center justify-center">
              <img 
                src="/docs/imagenes/promptimagen2.png" 
                alt="Ejemplo de prompt para imagen 2"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-3">
              <p className="text-xs text-center text-slate-600 font-medium">🎨 Ejemplo 2 - Parámetros y estilo</p>
            </CardContent>
          </Card>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna Izquierda - Campos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Sujeto */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.sujeto}`}>
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Sujeto</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">¿Qué?</Badge>
                  </div>
                  <p className="text-xs text-blue-700">
                    Describe el protagonista u objeto principal de la imagen.
                  </p>
                  <Textarea
                    value={fields.sujeto}
                    onChange={(e) => handleFieldChange('sujeto', e.target.value)}
                    placeholder="Una mujer joven profesional, vestida con blazer moderno..."
                    className="min-h-[80px] border-blue-200 bg-white/80 focus:border-blue-400"
                  />
                  <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/50 text-xs">
                    💡 Sé específico con detalles visuales
                  </Badge>
                </CardContent>
              </Card>

              {/* Acción */}
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.accion}`}>
                        <MonitorPlay className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Acción</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">¿Haciendo qué?</Badge>
                  </div>
                  <p className="text-xs text-purple-700">
                    ¿Qué está haciendo el sujeto? ¿En qué posición?
                  </p>
                  <Textarea
                    value={fields.accion}
                    onChange={(e) => handleFieldChange('accion', e.target.value)}
                    placeholder="trabajando en un portátil, mirando concentrada, tecleando..."
                    className="min-h-[80px] border-purple-200 bg-white/80 focus:border-purple-400"
                  />
                  <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/50 text-xs">
                    🎬 Describe movimiento o postura
                  </Badge>
                </CardContent>
              </Card>

              {/* Estilo */}
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.estilo}`}>
                        <Palette className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-amber-900 uppercase tracking-wide">Estilo</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Artístico</Badge>
                  </div>
                  <p className="text-xs text-amber-700">
                    Referencia artística, género visual o estilo deseado.
                  </p>
                  <Textarea
                    value={fields.estilo}
                    onChange={(e) => handleFieldChange('estilo', e.target.value)}
                    placeholder="fotografía editorial lifestyle, estética Instagram, colores cálidos..."
                    className="min-h-[80px] border-amber-200 bg-white/80 focus:border-amber-400"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/50 text-xs">fotorrealista</Badge>
                    <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/50 text-xs">ilustración</Badge>
                    <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/50 text-xs">cyberpunk</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Iluminación */}
              <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50/50 to-amber-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.iluminacion}`}>
                        <Camera className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-yellow-900 uppercase tracking-wide">Iluminación</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">Luz</Badge>
                  </div>
                  <p className="text-xs text-yellow-700">
                    Tipo de luz, hora del día, atmósfera lumínica.
                  </p>
                  <Textarea
                    value={fields.iluminacion}
                    onChange={(e) => handleFieldChange('iluminacion', e.target.value)}
                    placeholder="luz natural suave, golden hour, sombras cinematográficas..."
                    className="min-h-[80px] border-yellow-200 bg-white/80 focus:border-yellow-400"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/50 text-xs">natural</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/50 text-xs">studio</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/50 text-xs">neon</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Cámara */}
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-green-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.camara}`}>
                        <Aperture className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-emerald-900 uppercase tracking-wide">Cámara</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">Técnico</Badge>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Tipo de plano, lente, profundidad de campo.
                  </p>
                  <Textarea
                    value={fields.camara}
                    onChange={(e) => handleFieldChange('camara', e.target.value)}
                    placeholder="shot with Sony A7R IV, 50mm f/1.8, bokeh suave..."
                    className="min-h-[80px] border-emerald-200 bg-white/80 focus:border-emerald-400"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/50 text-xs">wide</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/50 text-xs">macro</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/50 text-xs">telephoto</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Extra */}
              <Card className="border-rose-200 bg-gradient-to-br from-rose-50/50 to-red-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.extra}`}>
                        <Wand2 className="h-4 w-4" />
                      </div>
                      <Label className="text-sm font-semibold text-rose-900 uppercase tracking-wide">Extra</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-rose-300 text-rose-700">Detalles</Badge>
                  </div>
                  <p className="text-xs text-rose-700">
                    Calidad, resolución, referencias adicionales.
                  </p>
                  <Textarea
                    value={fields.extra}
                    onChange={(e) => handleFieldChange('extra', e.target.value)}
                    placeholder="alta resolución, 8K, ultra detallado, fotografía premiada..."
                    className="min-h-[80px] border-rose-200 bg-white/80 focus:border-rose-400"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <Badge className="bg-rose-500/20 text-rose-700 border-rose-500/50 text-xs">8K</Badge>
                    <Badge className="bg-rose-500/20 text-rose-700 border-rose-500/50 text-xs">HDR</Badge>
                    <Badge className="bg-rose-500/20 text-rose-700 border-rose-500/50 text-xs">award-winning</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Columna Derecha - Resultado */}
          <div className="space-y-4">
            {/* Prompt Generado */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-100/80 to-pink-100/80">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <Label className="text-sm font-bold text-purple-900 uppercase tracking-wide">Prompt Generado</Label>
                  </div>
                  <Badge variant={completedFields >= 3 ? 'default' : 'secondary'} className={completedFields >= 3 ? 'bg-purple-600' : ''}>
                    {completedFields}/6 bloques
                  </Badge>
                </div>

                <div className="relative">
                  <Textarea
                    value={generatedPrompt}
                    readOnly
                    className="min-h-[200px] border-purple-300 bg-white/90 font-mono text-sm resize-none"
                    placeholder="Tu prompt aparecerá aquí..."
                  />
                  <Button
                    size="sm"
                    onClick={copiarPrompt}
                    disabled={!generatedPrompt.trim()}
                    className={`absolute top-2 right-2 ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copiarPrompt} className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={!generatedPrompt.trim()}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Prompt
                  </Button>
                  <Button onClick={cargarEjemplo} variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    Ejemplo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Parámetros */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Aperture className="h-5 w-5 text-blue-600" />
                  <Label className="text-sm font-bold text-blue-900">Parámetros</Label>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-blue-700">Relación de Aspecto</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map((ar) => (
                      <Button
                        key={ar.value}
                        variant={selectedAspectRatio === ar.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedAspectRatio(ar.value)}
                        className={selectedAspectRatio === ar.value ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-700 hover:bg-blue-100'}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">{ar.label}</span>
                          <span className="text-[9px] opacity-70">{ar.desc}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Versión */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-blue-700">Versión del Modelo</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {versions.map((v) => (
                      <Button
                        key={v.value}
                        variant={selectedVersion === v.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedVersion(v.value)}
                        className={selectedVersion === v.value ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-700 hover:bg-blue-100'}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-bold">{v.label}</span>
                          <span className="text-[9px] opacity-70">{v.desc}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <Label className="text-sm font-bold text-amber-900">Consejos Pro</Label>
                </div>
                <ul className="text-xs text-amber-800 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Usa <strong>palabras clave en inglés</strong> para mejores resultados en Midjourney</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Sé <strong>específico con la iluminación</strong>: cambia completamente el resultado</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Añade <strong>referencias de artistas</strong> o películas para guiar el estilo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Prueba <strong>--stylize</strong> (0-1000) para controlar la creatividad de la IA</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
