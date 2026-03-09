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
  Info,
  BookOpen,
  UserRound,
  MessageSquare,
  Languages,
  ListOrdered,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

export default function CUMPLEPromptWorkshop() {
  const [fields, setFields] = useState({
    contexto: '',
    manda: '',
    pregunta: '',
    lenguaje: '',
    estructura: '',
    extra: '',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);
  const [completedFields, setCompletedFields] = useState(0);

  const cierrePregunta = 
    "Antes de responder, dime si necesitas que aclare algo del contexto o de la tarea con una o dos preguntas breves.";

  useEffect(() => {
    buildPrompt();
  }, [fields]);

  const buildPrompt = () => {
    const piezas: string[] = [];
    const trim = (text: string) => text.trim();

    const c = trim(fields.contexto);
    const m = trim(fields.manda);
    const p = trim(fields.pregunta);
    const l = trim(fields.lenguaje);
    const e = trim(fields.estructura);
    const u = trim(fields.extra);

    if (c) piezas.push("Contexto:\n" + c);
    if (u) piezas.push("Condiciones extra:\n" + u);
    if (m) piezas.push("Rol de la IA:\n" + m);
    if (p) piezas.push("Tarea / petición:\n" + p);
    if (l) piezas.push("Lengua, tono y nivel:\n" + l);
    if (e) piezas.push("Estructura deseada de la respuesta:\n" + e);

    let prompt = piezas.join("\n\n");

    if (prompt) {
      prompt += "\n\nCierra esta conversación siguiendo esta instrucción:\n" + cierrePregunta;
    }

    setGeneratedPrompt(prompt);

    // Count completed fields
    const valores = Object.values(fields);
    const completos = valores.filter((v) => v.trim().length > 0).length;
    setCompletedFields(completos);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const copiarPrompt = async () => {
    if (!generatedPrompt.trim()) {
      showToast("Escribe primero en al menos un bloque del C.U.M.P.L.E?");
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      showToast("✅ Prompt copiado. Pégalo en tu IA favorita.");
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
        showToast("✅ Prompt copiado. Pégalo en tu IA favorita.");
      } catch (err) {
        showToast("No se pudo copiar automáticamente, selecciónalo a mano.");
      }
      document.body.removeChild(textareaFallback);
    }
  };

  const cargarEjemplo = () => {
    setFields({
      contexto: "Soy profesor de FP de Informática en un instituto público. Mis alumnos están en 1º curso y tienen una base muy básica de programación. Quiero ayudarles a entender cómo escribir prompts claros para trabajar con modelos de IA generativa durante el curso.",
      manda: "Actúa como un profesor experto en programación y en uso educativo de la IA, con experiencia explicando a principiantes adolescentes, paciente y muy pedagógico.",
      pregunta: "Diseña 4 actividades prácticas para que mis alumnos aprendan a escribir mejores prompts cuando pidan ejercicios de programación. Cada actividad debe incluir: objetivo, instrucciones para el alumno, un ejemplo de prompt bueno y uno mejorable, y preguntas para reflexionar sobre el resultado de la IA.",
      lenguaje: "Responde en español claro, con tono cercano pero respetuoso, evitando jerga técnica innecesaria y usando ejemplos sencillos relacionados con programación básica (variables, condicionales, bucles).",
      estructura: "Organiza la respuesta en secciones numeradas: 1) Resumen general, 2) Actividad 1, 3) Actividad 2, 4) Actividad 3, 5) Actividad 4. Dentro de cada actividad, usa viñetas para objetivos, instrucciones, ejemplos de prompt y preguntas de reflexión.",
      extra: "Ten en cuenta que las actividades deben poder completarse en sesiones de 30-40 minutos y sin necesidad de instalar software, solo con acceso a un modelo de IA por navegador.",
    });
    showToast("✨ Ejemplo cargado. Ajusta los textos a tu realidad.");
  };

  const showToast = (message: string) => {
    // Simple toast notification using browser alert for now
    // In production, you'd use a proper toast library
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
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const fieldIcons: Record<string, React.ReactNode> = {
    contexto: <BookOpen className="h-4 w-4" />,
    manda: <UserRound className="h-4 w-4" />,
    pregunta: <MessageSquare className="h-4 w-4" />,
    lenguaje: <Languages className="h-4 w-4" />,
    estructura: <ListOrdered className="h-4 w-4" />,
    extra: <PlusCircle className="h-4 w-4" />,
  };

  const fieldColors: Record<string, string> = {
    contexto: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    manda: 'bg-gradient-to-br from-pink-500 to-rose-600',
    pregunta: 'bg-gradient-to-br from-amber-500 to-orange-600',
    lenguaje: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    estructura: 'bg-gradient-to-br from-emerald-500 to-green-600',
    extra: 'bg-gradient-to-br from-slate-500 to-gray-600',
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      <CardHeader className="border-b border-purple-200/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                C.U.M.P.L.E? – Taller de Prompts IA
              </h3>
              <p className="text-sm text-purple-700">
                Rellena cada bloque y genera un prompt completo y listo para pegar en la IA
              </p>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-100/50">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Módulo 2
          </Badge>
        </div>

        {/* Acrónimo C.U.M.P.L.E? */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-100/50 to-indigo-100/50 mt-4">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg border-2 border-indigo-300">
                <p className="text-lg font-bold text-white">C</p>
                <p className="text-[10px] text-indigo-100">Contexto</p>
              </div>
              <div className="text-center p-2 rounded-full border-2 border-dashed border-purple-300 bg-purple-100/50">
                <p className="text-lg font-bold text-purple-600">U</p>
                <p className="text-[10px] text-purple-500">Extra</p>
              </div>
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg border-2 border-pink-300">
                <p className="text-lg font-bold text-white">M</p>
                <p className="text-[10px] text-pink-100">Manda</p>
              </div>
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg border-2 border-amber-300">
                <p className="text-lg font-bold text-white">P</p>
                <p className="text-[10px] text-amber-100">Pregunta</p>
              </div>
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg border-2 border-cyan-300">
                <p className="text-lg font-bold text-white">L</p>
                <p className="text-[10px] text-cyan-100">Lengua</p>
              </div>
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg border-2 border-emerald-300">
                <p className="text-lg font-bold text-white">E</p>
                <p className="text-[10px] text-emerald-100">Estructura</p>
              </div>
              <div className="text-center p-2 rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg border-2 border-red-300">
                <p className="text-lg font-bold text-white">?</p>
                <p className="text-[10px] text-red-100">¿Dudas?</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-purple-700">
              <span><strong>C</strong> define el contexto.</span>
              <span><strong>M</strong> indica el rol de la IA.</span>
              <span><strong>P</strong> concreta lo que quieres.</span>
              <span><strong>L</strong> fija idioma y tono.</span>
              <span><strong>E</strong> marca el formato de salida.</span>
            </div>
          </CardContent>
        </Card>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna Izquierda - Campos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Contexto */}
              <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.contexto}`}>
                        C
                      </div>
                      <Label className="text-sm font-semibold text-indigo-900 uppercase tracking-wide">Contexto</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700">Cuenta la situación</Badge>
                  </div>
                  <p className="text-xs text-indigo-700">
                    Explica quién eres, para qué es el ejercicio, nivel de tus alumnos, asignatura, etc.
                  </p>
                  <Textarea
                    value={fields.contexto}
                    onChange={(e) => handleFieldChange('contexto', e.target.value)}
                    placeholder="Soy profesor de FP de informática en 1º curso…"
                    className="min-h-[80px] border-indigo-200 bg-white/80 focus:border-indigo-400"
                  />
                  <Badge className="bg-indigo-500/20 text-indigo-700 border-indigo-500/50 text-xs">
                    💡 Cuanto más contexto, mejor resultado
                  </Badge>
                </CardContent>
              </Card>

              {/* Manda */}
              <Card className="border-pink-200 bg-gradient-to-br from-pink-50/50 to-rose-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.manda}`}>
                        M
                      </div>
                      <Label className="text-sm font-semibold text-pink-900 uppercase tracking-wide">Manda / Actúa como</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-pink-300 text-pink-700">Dale un rol</Badge>
                  </div>
                  <p className="text-xs text-pink-700">
                    Indica el papel de la IA. Ejemplo: Actúa como profesor experto…
                  </p>
                  <Textarea
                    value={fields.manda}
                    onChange={(e) => handleFieldChange('manda', e.target.value)}
                    placeholder="Actúa como… (mentor, profesor, corrector, coach, etc.)"
                    className="min-h-[80px] border-pink-200 bg-white/80 focus:border-pink-400"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="bg-pink-500/20 text-pink-700 border-pink-500/50 text-xs">Define 1 rol principal</Badge>
                    <Badge className="bg-pink-500/20 text-pink-700 border-pink-500/50 text-xs">Añade experiencia</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pregunta */}
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.pregunta}`}>
                        P
                      </div>
                      <Label className="text-sm font-semibold text-amber-900 uppercase tracking-wide">Pregunta / Petición</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Sé concreto</Badge>
                  </div>
                  <p className="text-xs text-amber-700">
                    Explica qué necesitas exactamente. Ejemplo: Diseña 3 ejercicios prácticos…
                  </p>
                  <Textarea
                    value={fields.pregunta}
                    onChange={(e) => handleFieldChange('pregunta', e.target.value)}
                    placeholder="Qué quieres que haga exactamente la IA (tareas, pasos, ejemplos…)"
                    className="min-h-[80px] border-amber-200 bg-white/80 focus:border-amber-400"
                  />
                  <Badge className="bg-amber-500/20 text-amber-700 border-amber-500/50 text-xs">
                    🎯 Usa verbos de acción: diseña, explica, corrige, compara…
                  </Badge>
                </CardContent>
              </Card>

              {/* Lenguaje */}
              <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.lenguaje}`}>
                        L
                      </div>
                      <Label className="text-sm font-semibold text-cyan-900 uppercase tracking-wide">Lengua / Estilo</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-cyan-300 text-cyan-700">Cómo hablar</Badge>
                  </div>
                  <p className="text-xs text-cyan-700">
                    Indica idioma, tono, extensión, nivel y formato. Ejemplo: Responde en español, con tono cercano…
                  </p>
                  <Textarea
                    value={fields.lenguaje}
                    onChange={(e) => handleFieldChange('lenguaje', e.target.value)}
                    placeholder="Idioma, tono (formal, cercano…), extensión, ejemplos, nivel…"
                    className="min-h-[80px] border-cyan-200 bg-white/80 focus:border-cyan-400"
                  />
                  <Badge className="bg-cyan-500/20 text-cyan-700 border-cyan-500/50 text-xs">
                    📝 Idioma + tono + longitud aproximada
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Estructura y Extra en otra fila */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Estructura */}
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-green-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.estructura}`}>
                        E
                      </div>
                      <Label className="text-sm font-semibold text-emerald-900 uppercase tracking-wide">Estructura</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">Formato respuesta</Badge>
                  </div>
                  <p className="text-xs text-emerald-700">
                    Especifica el formato final: listas, pasos, tabla, rúbrica, etc.
                  </p>
                  <Textarea
                    value={fields.estructura}
                    onChange={(e) => handleFieldChange('estructura', e.target.value)}
                    placeholder="Cómo quieres ver la respuesta (secciones, pasos numerados, tabla, checklist…)"
                    className="min-h-[80px] border-emerald-200 bg-white/80 focus:border-emerald-400"
                  />
                  <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/50 text-xs">
                    📋 Piensa en el formato que más ayude al alumno
                  </Badge>
                </CardContent>
              </Card>

              {/* Extra */}
              <Card className="border-slate-200 bg-gradient-to-br from-slate-50/50 to-gray-50/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${fieldColors.extra}`}>
                        U
                      </div>
                      <Label className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Tu Toque (Extra)</Label>
                    </div>
                    <Badge variant="outline" className="text-xs border-slate-300 text-slate-700">Opcional</Badge>
                  </div>
                  <p className="text-xs text-slate-700">
                    Puedes usar U para "Un extra": límites, criterios, tiempo disponible, herramientas permitidas, etc.
                  </p>
                  <Textarea
                    value={fields.extra}
                    onChange={(e) => handleFieldChange('extra', e.target.value)}
                    placeholder="Condiciones, límites, criterios de evaluación, herramientas permitidas/prohibidas, etc."
                    className="min-h-[80px] border-slate-200 bg-white/80 focus:border-slate-400"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Cierre con ? */}
            <Card className="border-red-200 bg-gradient-to-br from-red-50/50 to-pink-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <HelpCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-red-900 uppercase tracking-wide">Cierra el Prompt</Label>
                    <p className="text-xs text-red-700 mt-1">
                      La aplicación añadirá automáticamente: <code className="bg-red-100 px-2 py-0.5 rounded text-red-800 text-[11px]">"Antes de responder, dime si necesitas aclarar algo."</code>
                    </p>
                  </div>
                  <Badge className="ml-auto bg-red-500/20 text-red-700 border-red-500/50 text-xs">
                    ⚠️ Siempre dejar la puerta a que la IA pregunte dudas
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Vista Previa */}
          <div className="space-y-4">
            {/* Preview Card */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-100/50 via-indigo-100/50 to-pink-100/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-purple-900">Prompt Generado</h4>
                      <p className="text-xs text-purple-700">Listo para copiar y pegar</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={cargarEjemplo} 
                      variant="outline" 
                      size="sm"
                      className="border-purple-300 text-purple-700 hover:bg-purple-100"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Ejemplo
                    </Button>
                    <Button 
                      onClick={copiarPrompt} 
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <Copy className="h-3 w-3 mr-1" />
                      )}
                      {copied ? 'Copiado' : 'Copiar'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-900 rounded-xl p-4 min-h-[200px] max-h-[300px] overflow-y-auto font-mono text-sm text-slate-100 leading-relaxed shadow-inner">
                  {generatedPrompt || (
                    <p className="text-slate-400 italic text-center py-8">
                      Aquí verás tu prompt C.U.M.P.L.E? a medida que vayas escribiendo en los campos.
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-purple-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></div>
                    <span>{completedFields} bloque{completedFields !== 1 ? 's' : ''} completado{completedFields !== 1 ? 's' : ''}</span>
                  </div>
                  <span>{generatedPrompt.length} caracteres</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Hints Card */}
            <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="text-sm font-bold text-cyan-900">Consejos Rápidos</h4>
                  </div>
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    IA
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-cyan-800">
                  <li className="flex gap-2">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600 flex-shrink-0 mt-0.5"></div>
                    <span><strong>Empieza por C y P</strong>: si contexto y petición son claros, el resto es mucho más fácil.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600 flex-shrink-0 mt-0.5"></div>
                    <span><strong>Piensa en tu alumno ideal</strong>: describe su nivel y lo que ya sabe dentro del contexto.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600 flex-shrink-0 mt-0.5"></div>
                    <span><strong>Habla a la IA como a una persona</strong>: usa frases completas, evita "telegráfico".</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600 flex-shrink-0 mt-0.5"></div>
                    <span><strong>Itera</strong>: puedes copiar el prompt, probarlo, detectar fallos y volver a mejorarlo.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <p className="font-semibold mb-1">¿Qué es C.U.M.P.L.E?</p>
                    <p>
                      Es un acrónimo mnemotécnico para crear prompts efectivos. Cada letra representa un elemento clave que la IA necesita para darte la mejor respuesta posible.
                    </p>
                    <p className="mt-2">
                      <strong>Úsalo en:</strong> preparación de clases, diseño de ejercicios, rúbricas, correcciones, material didáctico, y cualquier tarea educativa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
