'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw, FileText, AlertCircle, CheckCircle2, Zap, Code, ArrowRight, Target, HelpCircle } from 'lucide-react';

interface Equivalencia {
  n8nNode: string;
  cursorEquivalent: string;
  descripcion: string;
  complejidad: 'baja' | 'media' | 'alta';
}

export default function N8nPractice9() {
  const [formData, setFormData] = useState({
    flujoOrigen: '',
    flujoEquivalente: '',
    equivalencias: [] as Equivalencia[],
    ventajasCursor: '',
    desventajasCursor: '',
    implementacion: '',
    resultados: ''
  });

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [missing, setMissing] = useState<string[]>([]);

  const updateEquivalencia = (index: number, field: keyof Equivalencia, value: string) => {
    const updated = [...formData.equivalencias];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, equivalencias: updated });
  };

  const addEquivalencia = () => {
    setFormData({
      ...formData,
      equivalencias: [...formData.equivalencias, {
        n8nNode: '',
        cursorEquivalent: '',
        descripcion: '',
        complejidad: 'media'
      }]
    });
  };

  const generate = () => {
    const required = ['flujoOrigen', 'flujoEquivalente', 'ventajasCursor', 'desventajasCursor', 'implementacion', 'resultados'];
    const missingFields = required.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setMissing(missingFields);
      setStatus({ type: 'error', message: 'Faltan campos obligatorios' });
      return;
    }

    if (formData.equivalencias.length < 3) {
      setStatus({ type: 'error', message: 'Se requieren al menos 3 equivalencias' });
      return;
    }

    setMissing([]);
    setStatus({ type: 'success', message: 'Práctica generada correctamente' });

    const equivalenciasSummary = formData.equivalencias.map((eq, i) =>
      `| ${i + 1} | ${eq.n8nNode} | ${eq.cursorEquivalent} | ${eq.descripcion} | ${eq.complejidad} |`
    ).join('\n');

    const summaryText = `# Práctica 9: Equivalencias n8n vs Cursor

## 1. Flujo de Origen (n8n)
${formData.flujoOrigen}

## 2. Flujo Equivalente (Cursor)
${formData.flujoEquivalente}

## 3. Equivalencias de Nodos (${formData.equivalencias.length} equivalencias)
| # | Nodo n8n | Equivalente Cursor | Descripción | Complejidad |
|---|----------|-------------------|-------------|-------------|
${equivalenciasSummary}

## 4. Ventajas de Cursor sobre n8n
${formData.ventajasCursor}

## 5. Desventajas de Cursor sobre n8n
${formData.desventajasCursor}

## 6. Implementación Técnica
${formData.implementacion}

## 7. Resultados de Pruebas
${formData.resultados}

## Herramientas Vibe Coding recomendadas:
- **Vibe Coding**: Diseña el flujo de automatización equivalente en Cursor
- **Cursor + AI**: "Convierte este flujo n8n a código Python/JavaScript ejecutable en Cursor con manejo de errores y logging"
- **Antigravity**: "Genera equivalencias entre nodos n8n y funciones de código: HTTP Request → fetch(), Schedule → cron, Webhook → express route"
- **Qwen CLI**: "Crea un script que replique la lógica de un workflow n8n usando solo código nativo con las mismas funcionalidades"
- **Alternativas gratuitas**: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)
- **Si no tienes código**: Describe la conversión paso a paso de cada nodo n8n a su equivalente en código`;

    setSummary(summaryText);
  };

  const clearAll = () => {
    setFormData({
      flujoOrigen: '',
      flujoEquivalente: '',
      equivalencias: [],
      ventajasCursor: '',
      desventajasCursor: '',
      implementacion: '',
      resultados: ''
    });
    setSummary('');
    setStatus({ type: '', message: '' });
    setMissing([]);
  };

  const copySummary = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'success', message: 'Resumen copiado al portapapeles' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">9</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 9 · Equivalencias n8n vs Cursor</h1>
            <p className="text-sm text-slate-600">Convierte workflows visuales de n8n a código ejecutable en Cursor</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Zap className="h-3 w-3 mr-1" /> Automatización</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Code className="h-3 w-3 mr-1" /> Code Conversion</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><ArrowRight className="h-3 w-3 mr-1" /> Migration</Badge>
        </div>
      </div>

      {/* Encargo de negocio */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-purple-100 text-purple-700 border-purple-300">Empresa · migración</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una empresa usa n8n para automatizaciones pero quiere migrar a código nativo en Cursor por <strong>mayor control</strong>, <strong>mejor performance</strong> y <strong>menor dependencia</strong> de herramientas visuales. Debes convertir un workflow n8n a código ejecutable manteniendo toda la funcionalidad.
          </p>

          {/* Paso a paso */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-3">
            <h4 className="text-sm font-bold text-purple-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para migrar n8n a Cursor</h4>
            <div className="space-y-2 text-xs text-purple-800">
              <p><strong>Paso 1 — Análisis del flujo:</strong> Documenta cada nodo n8n y su función específica. Ejemplo: HTTP Request → llamada API, Schedule → trigger temporal, Function → lógica personalizada</p>
              <p><strong>Paso 2 — Equivalencias técnicas:</strong> Encuentra el equivalente en código para cada nodo. Ejemplo: Webhook → endpoint Express, Email → nodemailer, Database → mongoose/Prisma</p>
              <p><strong>Paso 3 — Manejo de datos:</strong> Convierte el flujo de datos JSON entre nodos a variables/objetos. Ejemplo: output de un nodo se convierte en input del siguiente mediante asignación</p>
              <p><strong>Paso 4 — Manejo de errores:</strong> Implementa try/catch equivalentes a los de n8n. Ejemplo: nodos de error → bloques catch, reintentos → loops con delay</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos de práctica */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Campos de práctica</h3>
          </div>

          {/* Flujos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Flujo de origen (n8n) *</label>
              <Textarea
                value={formData.flujoOrigen}
                onChange={(e) => setFormData({ ...formData, flujoOrigen: e.target.value })}
                placeholder="Describe el workflow n8n original..."
                className="min-h-32"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Flujo equivalente (Cursor) *</label>
              <Textarea
                value={formData.flujoEquivalente}
                onChange={(e) => setFormData({ ...formData, flujoEquivalente: e.target.value })}
                placeholder="Describe cómo sería en código Cursor..."
                className="min-h-32"
              />
            </div>
          </div>

          {/* Equivalencias */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Equivalencias de nodos (mínimo 3)</label>
              <Button onClick={addEquivalencia} size="sm" variant="outline">
                + Agregar Equivalencia
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.equivalencias.map((eq, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-medium">Nodo n8n:</label>
                      <Input
                        value={eq.n8nNode}
                        onChange={(e) => updateEquivalencia(index, 'n8nNode', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="HTTP Request"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Equivalente Cursor:</label>
                      <Input
                        value={eq.cursorEquivalent}
                        onChange={(e) => updateEquivalencia(index, 'cursorEquivalent', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="fetch() / axios"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Descripción:</label>
                      <Input
                        value={eq.descripcion}
                        onChange={(e) => updateEquivalencia(index, 'descripcion', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Llamada HTTP con headers"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Complejidad:</label>
                      <Select
                        value={eq.complejidad}
                        onValueChange={(value: 'baja' | 'media' | 'alta') => updateEquivalencia(index, 'complejidad', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baja">Baja</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="alta">Alta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ventajas y desventajas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ventajas de Cursor *</label>
              <Textarea
                value={formData.ventajasCursor}
                onChange={(e) => setFormData({ ...formData, ventajasCursor: e.target.value })}
                placeholder="Mejor performance, mayor control, etc..."
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Desventajas de Cursor *</label>
              <Textarea
                value={formData.desventajasCursor}
                onChange={(e) => setFormData({ ...formData, desventajasCursor: e.target.value })}
                placeholder="Mayor complejidad, tiempo de desarrollo, etc..."
                className="min-h-24"
              />
            </div>
          </div>

          {/* Implementación técnica */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Implementación técnica *</label>
            <Textarea
              value={formData.implementacion}
              onChange={(e) => setFormData({ ...formData, implementacion: e.target.value })}
              placeholder="Describe cómo implementarías la conversión..."
              className="min-h-32"
            />
          </div>

          {/* Resultados de pruebas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resultados de pruebas *</label>
            <Textarea
              value={formData.resultados}
              onChange={(e) => setFormData({ ...formData, resultados: e.target.value })}
              placeholder="Describe los resultados esperados..."
              className="min-h-24"
            />
          </div>
        </CardContent>
      </Card>

      {/* Estado y mensajes */}
      {status.message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {status.type === 'error' ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
          {status.message}
        </div>
      )}

      {/* Campos obligatorios faltantes */}
      {missing.length > 0 && (
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-yellow-800 font-medium mb-2">Campos obligatorios faltantes:</p>
          <ul className="text-yellow-700 text-sm">
            {missing.map(field => <li key={field}>• ${field}</li>)}
          </ul>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Generar Práctica
        </Button>
        <Button onClick={clearAll} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
        {summary && (
          <Button onClick={copySummary} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
        )}
      </div>

      {/* Resumen generado */}
      {summary && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Resumen Generado:</label>
          <Textarea
            value={summary}
            readOnly
            className="min-h-96 font-mono text-xs"
          />
        </div>
      )}
    </div>
  );
}