'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  ShoppingCart
} from 'lucide-react';

interface BacklogItem {
  descripcion: string;
  prioridad: string;
  enfoque: string;
  valor: string;
  riesgo: string;
  datos: string;
}

export default function IkeaPractice4() {
  const [backlogItems, setBacklogItems] = useState<BacklogItem[]>(
    Array(12).fill({ descripcion: '', prioridad: '', enfoque: '', valor: '', riesgo: '', datos: '' })
  );
  const [happy, setHappy] = useState('');
  const [incompletos, setIncompletos] = useState('');
  const [limite, setLimite] = useState('');
  const [controles, setControles] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleBacklogChange = (index: number, field: keyof BacklogItem, value: string) => {
    const newItems = [...backlogItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setBacklogItems(newItems);
  };

  const getLines = (value: string) => {
    return value
      .split('\n')
      .map(l => l.replace(/^[-•]\s*/, '').trim())
      .filter(l => l.length > 0);
  };

  const generate = () => {
    const items = backlogItems.filter(item => 
      item.descripcion || item.prioridad || item.enfoque || item.valor || item.riesgo || item.datos
    );

    const happyLines = getLines(happy);
    const incompletosLines = getLines(incompletos);
    const limiteLines = getLines(limite);

    const missing: string[] = [];
    if (items.length < 12) missing.push('12 ítems de backlog rellenos (o al menos con descripción)');
    if (happyLines.length < 5) missing.push('5 pruebas happy path');
    if (incompletosLines.length < 5) missing.push('5 pruebas incompletas');
    if (limiteLines.length < 5) missing.push('5 pruebas límite');
    if (!controles.trim()) missing.push('controles de transparencia/seguridad/escalado');

    if (missing.length > 0) {
      setStatus({ 
        type: 'error', 
        message: 'Revisa: ' + missing.join(' · ') 
      });
    } else {
      setStatus({ 
        type: 'ok', 
        message: 'Backlog y checklist completos según los mínimos recomendados.' 
      });
    }

    const sb: string[] = [];
    sb.push('BACKLOG PRIORIZADO · ASISTENTE DEVOLUCIONES IKEA ESPAÑA');
    sb.push('');
    sb.push('1. Backlog de casos de uso (12 ítems)');
    sb.push('');
    sb.push('ID | Descripción | Prioridad | Valor para negocio | Riesgo | Datos mínimos | Enfoque recomendado');
    sb.push('---|-------------|-----------|--------------------|--------|---------------|--------------------');

    items.forEach((it, idx) => {
      sb.push(
        (idx + 1) +
        ' | ' + (it.descripcion || '(pendiente)') +
        ' | ' + (it.prioridad || '(sin priorizar)') +
        ' | ' + (it.valor || '') +
        ' | ' + (it.riesgo || '') +
        ' | ' + (it.datos || '') +
        ' | ' + (it.enfoque || '')
      );
    });

    sb.push('');
    sb.push('2. Checklist MVP · Pruebas mínimas (5/5/5)');
    sb.push('');
    sb.push('2.1 Casos happy path (5)');
    happyLines.forEach((c, idx) => sb.push('- HP' + (idx + 1) + ': ' + c));
    sb.push('');
    sb.push('2.2 Casos incompletos (5)');
    incompletosLines.forEach((c, idx) => sb.push('- INC' + (idx + 1) + ': ' + c));
    sb.push('');
    sb.push('2.3 Casos límite / riesgo (5)');
    limiteLines.forEach((c, idx) => sb.push('- LIM' + (idx + 1) + ': ' + c));
    sb.push('');

    sb.push('3. Controles de transparencia, seguridad y escalado');
    sb.push(controles || '- Definir mensajes de transparencia, validaciones de datos y reglas de escalado a humano para casos sensibles.');
    sb.push('');
    sb.push('Notas:');
    sb.push('- El asistente debe seguir siempre la política oficial de devoluciones de IKEA España y evitar prometer reembolsos o excepciones no contempladas en dicha política.');
    sb.push('- Cada ítem de backlog debe poder probarse con al menos un caso happy, uno incompleto y uno límite.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setBacklogItems(Array(12).fill({ descripcion: '', prioridad: '', enfoque: '', valor: '', riesgo: '', datos: '' }));
    setHappy('');
    setIncompletos('');
    setLimite('');
    setControles('');
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
      setStatus({ type: 'ok', message: 'Backlog + checklist copiados al portapapeles.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Selecciona y copia el texto manualmente.' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 via-green-400 to-blue-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">4</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 4 · Backlog y checklist MVP (IKEA devoluciones)</h1>
            <p className="text-sm text-slate-600">Crea un backlog de 12 casos de uso del asistente de devoluciones IKEA España y un checklist MVP con 15 pruebas</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Consultas sobre devoluciones, plazos, condiciones, productos montados, incidencias</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Objetivo</strong> <span className="ml-1">reducir dudas repetitivas sin inventar condiciones</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">Mínimo</strong> <span className="ml-1">12 ítems con prioridad + checklist con 15 pruebas (5/5/5)</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 via-amber-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-yellow-100 text-yellow-700 border-yellow-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            IKEA España recibe consultas constantes sobre devoluciones: plazos, condiciones, productos montados/abiertos, reembolsos, incidencias de transporte, etc.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>El asistente debe guiar al usuario según la política oficial, sin inventar condiciones.</li>
            <li>Priorizar casos de uso por valor y viabilidad (impacto vs. riesgo).</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            Recuerda: 365 días para la mayoría de devoluciones, con excepciones y condiciones específicas (ticket, estado del producto, canal).
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Backlog */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Backlog de casos de uso (12 ítems)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Para cada ítem: descripción corta, prioridad, valor/beneficio, riesgo, datos mínimos y enfoque (reglas/LLM/híbrido).
              </p>

              <div className="space-y-4">
                {backlogItems.map((item, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Ítem {index + 1}</span>
                        <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">caso de uso</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Input 
                          placeholder="Descripción breve"
                          className="text-xs bg-white"
                          value={item.descripcion}
                          onChange={(e) => handleBacklogChange(index, 'descripcion', e.target.value)}
                        />
                        <Select value={item.prioridad} onValueChange={(value) => handleBacklogChange(index, 'prioridad', value)}>
                          <SelectTrigger className="text-xs bg-white">
                            <SelectValue placeholder="Prioridad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alta">Alta</SelectItem>
                            <SelectItem value="Media">Media</SelectItem>
                            <SelectItem value="Baja">Baja</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Enfoque (Reglas/LLM/Híbrido)"
                          className="text-xs bg-white"
                          value={item.enfoque}
                          onChange={(e) => handleBacklogChange(index, 'enfoque', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          placeholder="Valor para negocio (¿por qué importa?)"
                          className="text-xs bg-white"
                          value={item.valor}
                          onChange={(e) => handleBacklogChange(index, 'valor', e.target.value)}
                        />
                        <Input 
                          placeholder="Riesgo (qué puede salir mal)"
                          className="text-xs bg-white"
                          value={item.riesgo}
                          onChange={(e) => handleBacklogChange(index, 'riesgo', e.target.value)}
                        />
                      </div>

                      <Input 
                        placeholder="Datos mínimos necesarios (ej.: ticket, fecha compra, estado producto, canal)"
                        className="text-xs bg-white"
                        value={item.datos}
                        onChange={(e) => handleBacklogChange(index, 'datos', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  onClick={generate} 
                  className="bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white font-semibold shadow-lg"
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Generar backlog + checklist
                </Button>
                <Button 
                  onClick={clearAll} 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar todo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Checklist + Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Checklist MVP (15 pruebas + controles)</h2>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define al menos 5 casos "happy path", 5 incompletos (faltan datos) y 5 límite (riesgo, enfado, ambigüedad), más controles de transparencia, seguridad y escalado.
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Happy path (5)</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">flujo ideal</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: "Cliente devuelve producto en plazo con ticket y buen estado → bot guía correctamente al canal".
                  </p>
                  <Textarea 
                    placeholder="- Caso 1
- Caso 2
- Caso 3
- Caso 4
- Caso 5" 
                    className="min-h-[100px] bg-white border-slate-200 focus:border-yellow-400 focus:ring-yellow-200 text-xs"
                    value={happy}
                    onChange={(e) => setHappy(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Incompletos (5)</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">falta info</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: falta ticket, no se indica canal de compra, no se sabe si está montado, etc.
                  </p>
                  <Textarea 
                    placeholder="- Caso incompleto 1
- Caso incompleto 2
- Caso incompleto 3
- Caso incompleto 4
- Caso incompleto 5" 
                    className="min-h-[100px] bg-white border-slate-200 focus:border-yellow-400 focus:ring-yellow-200 text-xs"
                    value={incompletos}
                    onChange={(e) => setIncompletos(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Límite / riesgo (5)</label>
                    <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">excepciones</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Ej.: fuera de plazo, producto dañado, promociones conjuntas, cliente enfadado, etc.
                  </p>
                  <Textarea 
                    placeholder="- Caso límite 1
- Caso límite 2
- Caso límite 3
- Caso límite 4
- Caso límite 5" 
                    className="min-h-[100px] bg-white border-slate-200 focus:border-yellow-400 focus:ring-yellow-200 text-xs"
                    value={limite}
                    onChange={(e) => setLimite(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-semibold text-slate-700">Controles de transparencia / seguridad / escalado</label>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Frases de transparencia, validaciones de datos y reglas de escalado a humano cuando el bot no debe prometer nada.
                  </p>
                  <Textarea 
                    placeholder="- Mensajes de transparencia sobre límites del asistente
- Validación de datos mínimos (ticket, fecha compra, estado del producto)
- Regla de escalado para casos sensibles (productos dañados, reclamaciones formales, fraude)
..." 
                    className="min-h-[100px] bg-white border-slate-200 focus:border-yellow-400 focus:ring-yellow-200 text-xs"
                    value={controles}
                    onChange={(e) => setControles(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800">Backlog priorizado + checklist MVP</h3>
                  <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600 border-slate-300">Texto para pegar</Badge>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                  <pre className="whitespace-pre-wrap">{summary || 'El backlog y checklist aparecerán aquí después de generar...'}</pre>
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
                    Pega el contenido en tu documento
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
                  ¿Has incluido 12 ítems con prioridad y razón + 15 pruebas (5/5/5) + controles de transparencia, seguridad y escalado?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
