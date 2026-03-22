'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, Trash2, Save, Download, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface Draft {
  title: string;
  template: string;
  tone: string;
  apertura: string;
  idea1: string;
  idea2: string;
  idea3: string;
  cierre: string;
}

const TEMPLATES = {
  corporativo_60: {
    apertura: "En este vídeo vas a ver, en menos de un minuto, cómo presentamos nuestro servicio de forma clara y consistente.",
    ideas: "Primero, explicamos quiénes somos y qué problema resolvemos en una frase sencilla. Después, mostramos el beneficio principal para la persona que nos escucha. Por último, indicamos el siguiente paso: dónde puede encontrar más información o cómo contactar.",
    cierre: "Recuerda: un mensaje claro y breve genera más confianza que un catálogo interminable."
  },
  servicio_30: {
    apertura: "Bienvenido, estás a punto de ver cómo atendemos una consulta de forma rápida y respetuosa.",
    ideas: "Primero, saludamos y confirmamos que hemos entendido la consulta. Después, explicamos qué vamos a hacer y en cuánto tiempo.",
    cierre: "Si la situación lo requiere, derivamos a una persona del equipo y lo explicamos con claridad, sin prometer plazos que no podamos cumplir."
  },
  procedimiento_60: {
    apertura: "En este vídeo verás los tres pasos clave para aplicar correctamente este procedimiento.",
    ideas: "Paso uno, comprobar siempre los datos antes de empezar. Paso dos, seguir el orden indicado en la herramienta, sin saltarse campos. Paso tres, registrar cualquier incidencia o duda para que el equipo pueda revisarla.",
    cierre: "Aplicar estos tres pasos reduce errores y hace que todos trabajemos con la misma información."
  },
  recordatorio_20: {
    apertura: "Antes de empezar, recuerda estas reglas básicas de seguridad.",
    ideas: "Comprueba el entorno, utiliza los equipos de protección y nunca fuerces una situación que no controlas.",
    cierre: "Si detectas un riesgo, páralo y comunícalo: es la mejor forma de evitar incidentes."
  }
};

const STORAGE_KEY = "guionesAvatarV1";

export default function AvatarScriptCreator() {
  const [template, setTemplate] = useState('corporativo_60');
  const [tone, setTone] = useState('corporativo');
  const [title, setTitle] = useState('');
  const [apertura, setApertura] = useState('');
  const [idea1, setIdea1] = useState('');
  const [idea2, setIdea2] = useState('');
  const [idea3, setIdea3] = useState('');
  const [cierre, setCierre] = useState('');
  const [outputGuion, setOutputGuion] = useState('');
  const [metrics, setMetrics] = useState({ words: 0, seconds: 0, inRange: false, range: '' });
  const [savedDrafts, setSavedDrafts] = useState<Draft[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadSavedDrafts();
  }, []);

  const wordsCount = (text: string) => {
    return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  };

  const estimateSeconds = (text: string) => {
    const w = wordsCount(text);
    const wpm = 150;
    return Math.round((w / wpm) * 60);
  };

  const buildScript = () => {
    const sections = [apertura, idea1, idea2, idea3, cierre].filter(s => s.trim());

    if (!sections.length) {
      setOutputGuion('Añade al menos una sección (apertura, ideas o cierre) para generar el guion.');
      setMetrics({ words: 0, seconds: 0, inRange: false, range: '' });
      return;
    }

    let script = sections.join(' ');

    // Ajuste por tono
    if (tone === 'corporativo' && cierre) {
      script += ' Gracias por tu atención. Sigamos el procedimiento para garantizar calidad y consistencia.';
    } else if (tone === 'cercano' && cierre) {
      script += ' Si te queda alguna duda, estamos aquí para ayudarte en el siguiente paso.';
    } else if (tone === 'didactico' && cierre) {
      script += ' Recuerda: practicar estos pasos te ayudará a interiorizar el procedimiento.';
    }

    setOutputGuion(script);

    const totalWords = wordsCount(script);
    const secs = estimateSeconds(script);

    // Rango recomendado según plantilla
    let min = 40, max = 60, label = '20–30s';
    if (template === 'corporativo_60' || template === 'procedimiento_60') {
      min = 100;
      max = 180;
      label = '60–90s';
    }

    setMetrics({
      words: totalWords,
      seconds: secs,
      inRange: totalWords >= min && totalWords <= max,
      range: label
    });
  };

  const handleClear = () => {
    setApertura('');
    setIdea1('');
    setIdea2('');
    setIdea3('');
    setCierre('');
    setOutputGuion('');
    setMetrics({ words: 0, seconds: 0, inRange: false, range: '' });
  };

  const handleCopy = async () => {
    if (!outputGuion.trim()) return;
    try {
      await navigator.clipboard.writeText(outputGuion);
      setStatus('✅ Guion copiado al portapapeles.');
      setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('❌ No se pudo copiar. Copia manualmente.');
    }
  };

  const handleSave = () => {
    const draft: Draft = {
      title: title.trim() || 'Sin título',
      template,
      tone,
      apertura,
      idea1,
      idea2,
      idea3,
      cierre
    };
    const list = [...savedDrafts, draft];
    setSavedDrafts(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setStatus('✅ Borrador guardado en este navegador.');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleDeleteAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedDrafts([]);
    setStatus('🗑️ Se han borrado todos los borradores.');
    setTimeout(() => setStatus(''), 2000);
  };

  const loadSavedDrafts = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedDrafts(JSON.parse(raw));
      }
    } catch {
      setSavedDrafts([]);
    }
  };

  const loadDraft = (index: number) => {
    const d = savedDrafts[index];
    if (!d) return;
    setTitle(d.title);
    setTemplate(d.template);
    setTone(d.tone);
    setApertura(d.apertura);
    setIdea1(d.idea1);
    setIdea2(d.idea2);
    setIdea3(d.idea3);
    setCierre(d.cierre);
    setStatus('📄 Borrador cargado.');
    setTimeout(() => setStatus(''), 2000);
  };

  const handleQuickFill = (type: 'apertura' | 'ideas' | 'cierre') => {
    const data = TEMPLATES[template as keyof typeof TEMPLATES] || TEMPLATES.corporativo_60;

    if (type === 'apertura') {
      setApertura(data.apertura);
    } else if (type === 'ideas') {
      const parts = data.ideas.split('. ');
      setIdea1(parts[0] || '');
      setIdea2(parts[1] || '');
      setIdea3(parts.slice(2).join('. '));
    } else if (type === 'cierre') {
      setCierre(data.cierre);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          🎬 Creador de Guiones para Avatar
        </h1>
        <p className="text-muted-foreground">
          Usa plantillas rápidas (60–90s o 20–30s) y genera un guion locutable: apertura, 3 ideas y cierre/CTA.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Gancho + 3 ideas + Cierre</Badge>
          <Badge variant="outline">Duración controlada</Badge>
          <Badge variant="outline">Pensado para TTV y avatar</Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna izquierda: configuración y campos */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Plantilla y tono */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold">1. Plantilla y tono</h3>
                <p className="text-sm text-muted-foreground">Elige tipo de pieza y estilo de voz</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plantilla de guion</label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporativo_60">Corporativo 60–90s</SelectItem>
                      <SelectItem value="servicio_30">Atención cliente 20–30s</SelectItem>
                      <SelectItem value="procedimiento_60">Procedimiento 60–90s</SelectItem>
                      <SelectItem value="recordatorio_20">Recordatorio 20–30s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tono</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporativo">Corporativo</SelectItem>
                      <SelectItem value="cercano">Cercano / servicio</SelectItem>
                      <SelectItem value="didactico">Didáctico / formación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickFill('apertura')}
                  className="border-blue-300 hover:bg-blue-50"
                >
                  ✨ Autollenar apertura
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickFill('ideas')}
                  className="border-blue-300 hover:bg-blue-50"
                >
                  ✨ Autollenar ideas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickFill('cierre')}
                  className="border-blue-300 hover:bg-blue-50"
                >
                  ✨ Autollenar cierre/CTA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 2. Contenido del guion */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold">2. Contenido del guion</h3>
                <p className="text-sm text-muted-foreground">Escribe en estilo oral: frases cortas, lenguaje claro</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título interno / nombre del guion</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej.: Onboarding agentes MAPFRE – consulta de cliente"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Apertura (10–15s – gancho + qué va a aprender)</label>
                <Textarea
                  value={apertura}
                  onChange={(e) => setApertura(e.target.value)}
                  placeholder="Ej.: Hoy vas a ver, en menos de un minuto, cómo tramitar una consulta y cuándo debes escalar una incidencia."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idea 1 (1ª idea clave)</label>
                  <Textarea
                    value={idea1}
                    onChange={(e) => setIdea1(e.target.value)}
                    placeholder="Ej.: Primero, registra siempre la consulta en el sistema, aunque parezca sencilla."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idea 2 (2ª idea clave)</label>
                  <Textarea
                    value={idea2}
                    onChange={(e) => setIdea2(e.target.value)}
                    placeholder="Ej.: Después, verifica los datos del cliente y confirma qué espera exactamente."
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Idea 3 (opcional – ejemplo o errores frecuentes)</label>
                <Textarea
                  value={idea3}
                  onChange={(e) => setIdea3(e.target.value)}
                  placeholder="Ej.: Si detectas un posible error o reclamación, no prometas soluciones inmediatas: explica el siguiente paso."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cierre y CTA (10–15s – resumen + qué hacer ahora)</label>
                <Textarea
                  value={cierre}
                  onChange={(e) => setCierre(e.target.value)}
                  placeholder="Ej.: Recuerda: registra, verifica y, si dudas, escala. Si necesitas ayuda, consulta siempre el procedimiento actualizado."
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={buildScript} className="bg-blue-600 hover:bg-blue-700">
                  ⚙️ Generar guion combinado
                </Button>
                <Button onClick={handleClear} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" /> Vaciar campos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 3. Guardar borradores */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold">3. Guardar borradores</h3>
                <p className="text-sm text-muted-foreground">Guarda versiones en este navegador (no se envía a ningún servidor)</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="default" className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" /> Guardar borrador
                </Button>
                <Button onClick={handleDeleteAll} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" /> Borrar todos
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Haz clic en un borrador para cargarlo.</p>
              <div className="flex flex-wrap gap-2">
                {savedDrafts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay borradores guardados todavía.</p>
                ) : (
                  savedDrafts.map((draft, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => loadDraft(idx)}
                      className="border-blue-300 hover:bg-blue-50"
                    >
                      📄 {draft.title} ({draft.template})
                    </Button>
                  ))
                )}
              </div>
              {status && (
                <p className="text-sm text-muted-foreground">{status}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: guion generado y métricas */}
        <div className="space-y-6">
          {/* Guion generado */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Guion generado</h3>
                  <p className="text-sm text-muted-foreground">Revisa antes de pasarlo a TTV o avatar</p>
                </div>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {outputGuion || 'Escribe tu apertura, ideas y cierre, y pulsa "Generar guion combinado".'}
              </div>

              {metrics.words > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                    Palabras: {metrics.words}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                    Duración: {metrics.seconds}s
                  </Badge>
                  {metrics.inRange ? (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Dentro del rango ({metrics.range})
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Fuera de rango ({metrics.range})
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sugerencias rápidas */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardHeader className="pb-3">
              <div>
                <h3 className="text-lg font-semibold">Sugerencias rápidas</h3>
                <p className="text-sm text-muted-foreground">Basadas en las guías del módulo</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⏱️ 20–30s ≈ 40–60 palabras. 60–90s ≈ 100–180 palabras (aprox.)</li>
                <li>📝 Evita frases largas; una idea por frase y pocos tecnicismos sin explicar</li>
                <li>🔢 Escribe números como se pronuncian (veintidós, no 22) y separa siglas</li>
                <li>✂️ Si el texto sale demasiado largo, divide el contenido en dos microvídeos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
