'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Package,
  Tags
} from 'lucide-react';

interface Intent {
  nombre: string;
  objetivo: string;
  kpi: string;
  datos: string;
  riesgo: string;
}

export default function SeurPractice6() {
  const [intents, setIntents] = useState<Intent[]>([
    { nombre: '', objetivo: '', kpi: '', datos: '', riesgo: '' },
    { nombre: '', objetivo: '', kpi: '', datos: '', riesgo: '' },
    { nombre: '', objetivo: '', kpi: '', datos: '', riesgo: '' }
  ]);
  const [entidades, setEntidades] = useState<string[]>(Array(6).fill(''));
  const [frases, setFrases] = useState('');
  const [trampa, setTrampa] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleIntentChange = (index: number, field: keyof Intent, value: string) => {
    const newIntents = [...intents];
    newIntents[index] = { ...newIntents[index], [field]: value };
    setIntents(newIntents);
  };

  const handleEntidadChange = (index: number, value: string) => {
    const newEntidades = [...entidades];
    newEntidades[index] = value;
    setEntidades(newEntidades);
  };

  const lines = (text: string) => {
    return text
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);
  };

  const generate = () => {
    const missing: string[] = [];
    if (!intents[0].nombre || !intents[1].nombre || !intents[2].nombre)
      missing.push('3 intents con nombre');
    if (entidades.filter(e => e.trim()).length < 6)
      missing.push('6 entidades definidas');
    if (lines(frases).length < 40)
      missing.push('40 frases etiquetadas');
    if (lines(trampa).length < 10)
      missing.push('10 frases trampa');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Revisa: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Definición completa según los mínimos recomendados.' 
      });
    }

    const sb: string[] = [];

    sb.push('INTENTS, ENTIDADES Y DATASET · SEUR');
    sb.push('');

    sb.push('1. Intents principales (acción, no tema)');
    sb.push('');

    const printIntent = (ix: number, data: Intent) => {
      if (!data.nombre) return;
      sb.push(`1.${ix} Intent: ${data.nombre}`);
      sb.push(`   Objetivo: ${data.objetivo || '(pendiente)'}`);
      sb.push(`   Datos mínimos: ${data.datos || '(pendiente)'}`);
      sb.push(`   Riesgos y escalado: ${data.riesgo || '(pendiente)'}`);
      sb.push(`   KPI asociado: ${data.kpi || '(pendiente)'}`);
      sb.push('');
    };

    intents.forEach((intent, idx) => printIntent(idx + 1, intent));

    sb.push('2. Entidades (datos mínimos)');
    sb.push('');
    sb.push('Nombre | Tipo / ejemplo | Justificación como dato mínimo');
    sb.push('------ | -------------- | --------------------------------');

    entidades.filter(e => e.trim()).forEach(e => {
      const parts = e.split('|').map(p => p.trim());
      const nombre = parts[0] || '(nombre)';
      const tipoEj = parts[1] || '';
      const extra = parts.slice(2).join(' | ');
      sb.push(`${nombre} | ${tipoEj} | ${extra}`);
    });

    sb.push('');
    sb.push('3. Dataset de frases etiquetadas (40)');
    sb.push('');
    sb.push('Formato recomendado: texto | intent | entidades');
    sb.push('');

    lines(frases).forEach((f, idx) => {
      sb.push(`F${idx + 1}: ${f}`);
    });

    sb.push('');
    sb.push('4. Frases trampa (10) con comentario de riesgo');
    sb.push('');
    lines(trampa).forEach((f, idx) => {
      sb.push(`T${idx + 1}: ${f}`);
    });

    sb.push('');
    sb.push('Notas:');
    sb.push('- Las frases deben reflejar lenguaje real: errores ortográficos, abreviaturas y expresiones típicas de usuarios con problemas de entrega ("incidencia envío", "en reparto pero no llega", "no estaba en casa", etc.).');
    sb.push('- Cada intent debe tener variedad de formulaciones para que el modelo aprenda a generalizar y distinguirlo de los otros intents.');
    sb.push('- Las frases trampa sirven para probar enfado, ambigüedad y falta de datos, y para diseñar una buena estrategia de petición de datos mínimos y escalado a humano cuando sea necesario.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setIntents(Array(3).fill({ nombre: '', objetivo: '', kpi: '', datos: '', riesgo: '' }));
    setEntidades(Array(6).fill(''));
    setFrases('');
    setTrampa('');
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'No hay resumen generado todavía.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Fichas + dataset copiados al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">6</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 6 · Intents, entidades y dataset (SEUR)</h1>
            <p className="text-sm text-slate-600">Define 3 intents principales, 6 entidades y un dataset de 40 frases etiquetadas + 10 "frases trampa" para SEUR</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">SEUR · seguimiento, cambio de entrega, incidencias en envíos</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Objetivo</strong> <span className="ml-1">entender cómo habla el usuario real ("mi paquete no llega", "pone en reparto"...)</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Dataset</strong> <span className="ml-1">3 intents · 6 entidades · 40 frases + 10 trampa</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-700 border-green-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            SEUR atiende consultas repetitivas: seguimiento de envío, cambio de entrega, incidencias y reclamaciones, con usuarios que escriben de formas muy diversas ("mi paquete no llega", "pone en reparto", "no estaba en casa", "incidencia envío").
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El reto: detectar bien la intención aunque falte el localizador.</li>
            <li>Definir intents por acción (no por tema) y entidades como datos mínimos para operar.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            No inventes políticas de SEUR: céntrate en cómo se formula la consulta del usuario y qué datos son imprescindibles para atenderla.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Intents y Entidades */}
        <div className="space-y-6">
          {/* Intents */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-cyan-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">1. Intents principales (3)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Piensa en acciones: "Consultar estado envío", "Cambiar entrega", "Abrir incidencia/reclamación", no en temas genéricos.
              </p>

              <div className="space-y-4">
                {intents.map((intent, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Intent {index + 1}</span>
                        <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">acción principal</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Input 
                          placeholder="Nombre (ej.: Consultar_estado_envio)"
                          className="text-xs bg-white"
                          value={intent.nombre}
                          onChange={(e) => handleIntentChange(index, 'nombre', e.target.value)}
                        />
                        <Input 
                          placeholder="Objetivo (ej.: informar al usuario del estado actual)"
                          className="text-xs bg-white"
                          value={intent.objetivo}
                          onChange={(e) => handleIntentChange(index, 'objetivo', e.target.value)}
                        />
                        <Input 
                          placeholder="KPI (ej.: % consultas resueltas sin agente)"
                          className="text-xs bg-white"
                          value={intent.kpi}
                          onChange={(e) => handleIntentChange(index, 'kpi', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Textarea 
                          placeholder="Datos mínimos (ej.: localizador, código postal, email/teléfono)..."
                          className="text-xs bg-white min-h-[60px]"
                          value={intent.datos}
                          onChange={(e) => handleIntentChange(index, 'datos', e.target.value)}
                        />
                        <Textarea 
                          placeholder="Riesgos y escalado (ej.: paquete perdido, incidencia prolongada, enfado)..."
                          className="text-xs bg-white min-h-[60px]"
                          value={intent.riesgo}
                          onChange={(e) => handleIntentChange(index, 'riesgo', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg" />
                  <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Tags className="h-5 w-5" />
                    2. Entidades (6 datos mínimos)
                  </h2>
                </div>
                <p className="text-xs text-slate-600 -mt-2">
                  Define 6 entidades que el bot necesita para operar: localizador, código postal, fecha aproximada, tipo de incidencia, tipo de cambio, etc.
                </p>

                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Entidades</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">nombre · tipo · ejemplo · por qué mínima</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {entidades.map((entidad, index) => (
                      <Textarea
                        key={index}
                        placeholder={`Entidad ${index + 1} (ej.: localizador_envio | texto/código | Ej.: 1234ABC | Es el identificador principal)`}
                        className="text-xs bg-white min-h-[60px]"
                        value={entidad}
                        onChange={(e) => handleEntidadChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generate} 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold shadow-lg"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Generar fichas + dataset
                </Button>
                <Button 
                  onClick={clearAll} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar campos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Dataset + Summary */}
        <div className="space-y-6">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">3. Dataset de frases (40 + 10 trampa)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Escribe una frase por línea. Formato recomendado: <span className="font-mono bg-slate-200 px-1 rounded">texto | intent | entidades</span>
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">40 frases etiquetadas</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">utterances reales</Badge>
                  </div>
                  <Textarea 
                    placeholder={`Ejemplo:
mi paquete no llega y pone en reparto desde ayer | Consultar_estado_envio | fecha_aprox_envio=hoy-1; localizador_envio=?
quiero cambiar la entrega a un punto de recogida SEUR | Cambiar_entrega | tipo_cambio=punto_recogida
... (hasta 40 líneas)`} 
                    className="min-h-[150px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs font-mono"
                    value={frases}
                    onChange={(e) => setFrases(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">10 frases trampa</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">ambigüedad / enfado / sin datos</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Incluye comentario de riesgo: insultos, amenazas, ausencia total de datos, confusión con otra empresa, etc.
                  </p>
                  <Textarea 
                    placeholder={`Ejemplo:
esto es una vergüenza, nadie trae el paquete | ? | RIESGO: alto enfado, sin datos, posible escalado directo
no sé ni qué empresa trae el pedido, solo pone 'incidencia envío' | Consultar_estado_envio | RIESGO: falta total de datos, pedir número o remitente
... (10 líneas)`} 
                    className="min-h-[120px] bg-white border-slate-200 focus:border-green-400 focus:ring-green-200 text-xs font-mono"
                    value={trampa}
                    onChange={(e) => setTrampa(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">Fichas de intent + entidades + dataset</h3>
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Texto para pegar</Badge>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                  <pre className="whitespace-pre-wrap">{summary || 'Las fichas + dataset aparecerán aquí después de generar...'}</pre>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <Button 
                    onClick={copySummary} 
                    variant="outline" 
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar resumen
                  </Button>
                  <span className="text-xs text-slate-500">
                    Pega el contenido en tu documento y, si quieres, conviértelo en tablas (intents/entidades/dataset).
                  </span>
                </div>

                {status.message && (
                  <div className={`flex items-center gap-2 text-sm p-2 rounded ${
                    status.type === 'ok' ? 'bg-green-50 text-green-700' : 
                    status.type === 'error' ? 'bg-red-50 text-red-700' : ''
                  }`}>
                    {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4" /> : 
                     status.type === 'error' ? <AlertCircle className="h-4 w-4" /> : null}
                    {status.message}
                  </div>
                )}

                <div className="text-xs text-slate-600 mt-2">
                  <Badge className="bg-green-100 text-green-700 border-green-300 mr-2">Checklist rápido</Badge>
                  ¿Has definido 3 intents de acción, 6 entidades mínimas, 40 frases + 10 trampa con comentario de riesgo?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
