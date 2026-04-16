'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw, FileText, AlertCircle, CheckCircle2, Bot, Brain, Target, HelpCircle, Zap } from 'lucide-react';

interface TestCase {
  nombre: string;
  input: string;
  expectedOutput: string;
  resultado: 'pass' | 'fail' | 'pending';
}

interface KPI {
  nombre: string;
  valor: string;
  unidad: string;
  descripcion: string;
}

export default function AenaPractice10() {
  const [formData, setFormData] = useState({
    inputContract: '',
    outputContract: '',
    prompt: '',
    testCases: [] as TestCase[],
    kpis: [] as KPI[],
    implementacion: '',
    resultados: ''
  });

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [missing, setMissing] = useState<string[]>([]);

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    const updated = [...formData.testCases];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, testCases: updated });
  };

  const updateKPI = (index: number, field: keyof KPI, value: string) => {
    const updated = [...formData.kpis];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, kpis: updated });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, {
        nombre: '',
        input: '',
        expectedOutput: '',
        resultado: 'pending'
      }]
    });
  };

  const addKPI = () => {
    setFormData({
      ...formData,
      kpis: [...formData.kpis, {
        nombre: '',
        valor: '',
        unidad: '',
        descripcion: ''
      }]
    });
  };

  const generate = () => {
    const required = ['inputContract', 'outputContract', 'prompt', 'implementacion', 'resultados'];
    const missingFields = required.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setMissing(missingFields);
      setStatus({ type: 'error', message: 'Faltan campos obligatorios' });
      return;
    }

    if (formData.testCases.length < 2) {
      setStatus({ type: 'error', message: 'Se requieren al menos 2 casos de prueba' });
      return;
    }

    if (formData.kpis.length < 2) {
      setStatus({ type: 'error', message: 'Se requieren al menos 2 KPIs' });
      return;
    }

    setMissing([]);
    setStatus({ type: 'success', message: 'Práctica generada correctamente' });

    const testCasesSummary = formData.testCases.map((test, i) =>
      `| ${i + 1} | ${test.nombre} | ${test.input} | ${test.expectedOutput} | ${test.resultado} |`
    ).join('\n');

    const kpisSummary = formData.kpis.map((kpi, i) =>
      `| ${i + 1} | ${kpi.nombre} | ${kpi.valor} | ${kpi.unidad} | ${kpi.descripcion} |`
    ).join('\n');

    const summaryText = `# Práctica 10: IA Operable con Contratos JSON

## 1. Contrato de Input (JSON Schema)
${formData.inputContract}

## 2. Contrato de Output (JSON Schema)
${formData.outputContract}

## 3. Prompt del Sistema
${formData.prompt}

## 4. Casos de Prueba (${formData.testCases.length} casos)
| # | Nombre | Input | Output Esperado | Resultado |
|---|--------|-------|----------------|-----------|
${testCasesSummary}

## 5. KPIs de Rendimiento (${formData.kpis.length} métricas)
| # | KPI | Valor | Unidad | Descripción |
|---|-----|-------|--------|-------------|
${kpisSummary}

## 6. Implementación Técnica
${formData.implementacion}

## 7. Resultados de Pruebas
${formData.resultados}

## Herramientas Vibe Coding recomendadas:
- **Vibe Coding**: Diseña el sistema de IA operable con contratos JSON estrictos
- **Cursor + AI**: "Implementa un agente IA que valide inputs/outputs contra schemas JSON y ejecute acciones basadas en contratos"
- **Antigravity**: "Genera casos de prueba para contratos JSON: validación de schemas, transformación de datos, manejo de errores de formato"
- **Qwen CLI**: "Crea un validador de contratos JSON que garantice que la IA solo ejecute acciones permitidas por el schema definido"
- **Alternativas gratuitas**: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)
- **Si no tienes código**: Describe la implementación con schemas JSON detallados y validación estricta de contratos`;

    setSummary(summaryText);
  };

  const clearAll = () => {
    setFormData({
      inputContract: '',
      outputContract: '',
      prompt: '',
      testCases: [],
      kpis: [],
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">10</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 10 · IA Operable con Contratos JSON</h1>
            <p className="text-sm text-slate-600">Implementa IA que ejecuta acciones basadas en contratos JSON estrictos</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200"><Bot className="h-3 w-3 mr-1" /> AI Agent</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Brain className="h-3 w-3 mr-1" /> JSON Contracts</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Target className="h-3 w-3 mr-1" /> Operable AI</Badge>
        </div>
      </div>

      {/* Encargo de negocio */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-cyan-600" />
            <h3 className="font-semibold text-cyan-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-cyan-100 text-cyan-700 border-cyan-300">Empresa · IA operable</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una empresa necesita una IA que pueda <strong>ejecutar acciones reales</strong> en su sistema pero con <strong>controles estrictos</strong> para evitar comportamientos no deseados. Debes diseñar contratos JSON que definan exactamente qué puede hacer la IA y cómo validar todas las interacciones.
          </p>

          {/* Paso a paso */}
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200 space-y-3">
            <h4 className="text-sm font-bold text-cyan-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para implementar IA operable</h4>
            <div className="space-y-2 text-xs text-cyan-800">
              <p><strong>Paso 1 — Contratos JSON:</strong> Define schemas estrictos para inputs y outputs. Ejemplo: input contract especifica campos requeridos, tipos de datos, rangos válidos</p>
              <p><strong>Paso 2 — Validación de contratos:</strong> Implementa validación antes/después de cada acción. Ejemplo: rechaza inputs que no cumplan el schema, valida outputs antes de ejecutar</p>
              <p><strong>Paso 3 — Prompt engineering:</strong> Crea prompts que incluyan los contratos como instrucciones. Ejemplo: "Solo ejecuta acciones que cumplan este schema JSON..."</p>
              <p><strong>Paso 4 — Manejo de errores:</strong> Define comportamiento para contratos inválidos. Ejemplo: rechaza con mensaje específico, no intenta "arreglar" datos automáticamente</p>
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

          {/* Contratos JSON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contrato de Input (JSON Schema) *</label>
              <Textarea
                value={formData.inputContract}
                onChange={(e) => setFormData({ ...formData, inputContract: e.target.value })}
                placeholder="Define el schema JSON para inputs válidos..."
                className="min-h-32 font-mono text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contrato de Output (JSON Schema) *</label>
              <Textarea
                value={formData.outputContract}
                onChange={(e) => setFormData({ ...formData, outputContract: e.target.value })}
                placeholder="Define el schema JSON para outputs válidos..."
                className="min-h-32 font-mono text-xs"
              />
            </div>
          </div>

          {/* Prompt del sistema */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt del sistema *</label>
            <Textarea
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              placeholder="Describe el prompt que guiará a la IA..."
              className="min-h-24"
            />
          </div>

          {/* Casos de prueba */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Casos de prueba (mínimo 2)</label>
              <Button onClick={addTestCase} size="sm" variant="outline">
                + Agregar Caso
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.testCases.map((test, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-medium">Nombre:</label>
                      <Input
                        value={test.nombre}
                        onChange={(e) => updateTestCase(index, 'nombre', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Test válido"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Input:</label>
                      <Input
                        value={test.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="JSON input"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Output esperado:</label>
                      <Input
                        value={test.expectedOutput}
                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="JSON output"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Resultado:</label>
                      <Select
                        value={test.resultado}
                        onValueChange={(value: 'pass' | 'fail' | 'pending') => updateTestCase(index, 'resultado', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="pass">Pasa</SelectItem>
                          <SelectItem value="fail">Falla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">KPIs de rendimiento (mínimo 2)</label>
              <Button onClick={addKPI} size="sm" variant="outline">
                + Agregar KPI
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.kpis.map((kpi, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-medium">Nombre KPI:</label>
                      <Input
                        value={kpi.nombre}
                        onChange={(e) => updateKPI(index, 'nombre', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Tasa de éxito"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Valor:</label>
                      <Input
                        value={kpi.valor}
                        onChange={(e) => updateKPI(index, 'valor', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="95.2"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Unidad:</label>
                      <Input
                        value={kpi.unidad}
                        onChange={(e) => updateKPI(index, 'unidad', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="%"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Descripción:</label>
                      <Input
                        value={kpi.descripcion}
                        onChange={(e) => updateKPI(index, 'descripcion', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Porcentaje de contratos válidos"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Implementación técnica */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Implementación técnica *</label>
            <Textarea
              value={formData.implementacion}
              onChange={(e) => setFormData({ ...formData, implementacion: e.target.value })}
              placeholder="Describe cómo implementarías la IA operable..."
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