'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw, FileText, AlertCircle, CheckCircle2, Globe, Shield, Clock, HelpCircle, Target } from 'lucide-react';

interface ErrorCase {
  errorCode: string;
  description: string;
  retryStrategy: string;
  backoffTime: string;
  maxRetries: number;
}

export default function HttpPractice8() {
  const [formData, setFormData] = useState({
    endpoint: '',
    authMethod: 'bearer',
    timeout: 30,
    retryEnabled: true,
    errorCases: [] as ErrorCase[],
    traceId: '',
    logs: '',
    implementacion: '',
    resultados: ''
  });

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [missing, setMissing] = useState<string[]>([]);

  const updateErrorCase = (index: number, field: keyof ErrorCase, value: string | number) => {
    const updated = [...formData.errorCases];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, errorCases: updated });
  };

  const addErrorCase = () => {
    setFormData({
      ...formData,
      errorCases: [...formData.errorCases, {
        errorCode: '',
        description: '',
        retryStrategy: 'exponential_backoff',
        backoffTime: '1s',
        maxRetries: 3
      }]
    });
  };

  const generate = () => {
    const required = ['endpoint', 'traceId', 'logs', 'implementacion', 'resultados'];
    const missingFields = required.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setMissing(missingFields);
      setStatus({ type: 'error', message: 'Faltan campos obligatorios' });
      return;
    }

    if (formData.errorCases.length < 3) {
      setStatus({ type: 'error', message: 'Se requieren al menos 3 casos de error' });
      return;
    }

    setMissing([]);
    setStatus({ type: 'success', message: 'Práctica generada correctamente' });

    const errorCasesSummary = formData.errorCases.map((error, i) =>
      `| ${i + 1} | ${error.errorCode} | ${error.description} | ${error.retryStrategy} | ${error.backoffTime} | ${error.maxRetries} |`
    ).join('\n');

    const summaryText = `# Práctica 8: Integración HTTP con Autenticación y Manejo de Errores

## 1. Configuración del Endpoint
- **URL Base:** ${formData.endpoint}
- **Método de Autenticación:** ${formData.authMethod}
- **Timeout:** ${formData.timeout}s
- **Reintentos Habilitados:** ${formData.retryEnabled ? 'Sí' : 'No'}

## 2. Casos de Error y Estrategias de Reintento (${formData.errorCases.length} casos)
| # | Código | Descripción | Estrategia | Backoff | Máx. Reintentos |
|---|--------|-------------|------------|---------|----------------|
${errorCasesSummary}

## 3. Trazabilidad
- **ID de Traza:** ${formData.traceId}

## 4. Logs de Ejecución
${formData.logs}

## 5. Implementación Técnica
${formData.implementacion}

## 6. Resultados de Pruebas
${formData.resultados}

## Herramientas Vibe Coding recomendadas:
- **Vibe Coding**: Diseña la integración HTTP con manejo de errores y reintentos automáticos
- **Cursor + AI**: "Implementa cliente HTTP con autenticación Bearer, manejo de errores 401/403/429/5xx y reintentos con backoff exponencial"
- **Antigravity**: "Genera casos de prueba para integración HTTP: autenticación fallida, rate limiting, timeouts, errores de servidor"
- **Qwen CLI**: "Crea un cliente HTTP que maneje reintentos automáticos con diferentes estrategias de backoff para cada código de error"
- **Alternativas gratuitas**: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)
- **Si no tienes código**: Describe la implementación en pseudocódigo con manejo completo de errores HTTP`;

    setSummary(summaryText);
  };

  const clearAll = () => {
    setFormData({
      endpoint: '',
      authMethod: 'bearer',
      timeout: 30,
      retryEnabled: true,
      errorCases: [],
      traceId: '',
      logs: '',
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">8</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 8 · Integración HTTP con Autenticación y Manejo de Errores</h1>
            <p className="text-sm text-slate-600">Implementa cliente HTTP con reintentos automáticos y estrategias de recuperación</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Globe className="h-3 w-3 mr-1" /> HTTP Client</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Shield className="h-3 w-3 mr-1" /> Error Handling</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Clock className="h-3 w-3 mr-1" /> Retry Logic</Badge>
        </div>
      </div>

      {/* Encargo de negocio */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-700 border-green-300">Empresa · integración</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una empresa necesita integrar un sistema de tickets poco conocido que no tiene conector oficial. Debes crear una integración HTTP robusta que maneje <strong>autenticación</strong>, <strong>reintentos automáticos</strong> con backoff y <strong>alertas</strong> cuando la integración falla persistentemente.
          </p>

          {/* Paso a paso */}
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-3">
            <h4 className="text-sm font-bold text-green-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para implementar integración HTTP</h4>
            <div className="space-y-2 text-xs text-green-800">
              <p><strong>Paso 1 — Cliente HTTP:</strong> Configura cliente con timeout, headers de autenticación y parsing de respuestas JSON. Ejemplo: fetch() con Bearer token o axios con interceptors</p>
              <p><strong>Paso 2 — Manejo de errores:</strong> Implementa catch para códigos 401/403/429/5xx con estrategias específicas. Ejemplo: 401 → refresh token, 429 → esperar, 5xx → reintentar</p>
              <p><strong>Paso 3 — Reintentos:</strong> Añade lógica de reintentos con backoff exponencial (1s, 2s, 4s...). Ejemplo: máximo 3 intentos, solo para errores recuperables</p>
              <p><strong>Paso 4 — Trazabilidad:</strong> Genera trace_id único por petición y registra logs detallados. Ejemplo: incluir timestamp, código error, estrategia aplicada</p>
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

          {/* Configuración del endpoint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Endpoint base *</label>
              <Input
                value={formData.endpoint}
                onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                placeholder="https://api.ticketsystem.com/v1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Método de autenticación</label>
              <Select
                value={formData.authMethod}
                onValueChange={(value) => setFormData({ ...formData, authMethod: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="apikey">API Key</SelectItem>
                  <SelectItem value="oauth">OAuth 2.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Casos de error */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Casos de error (mínimo 3)</label>
              <Button onClick={addErrorCase} size="sm" variant="outline">
                + Agregar Caso
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.errorCases.map((errorCase, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <label className="text-xs font-medium">Código HTTP:</label>
                      <Input
                        value={errorCase.errorCode}
                        onChange={(e) => updateErrorCase(index, 'errorCode', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="401"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Descripción:</label>
                      <Input
                        value={errorCase.description}
                        onChange={(e) => updateErrorCase(index, 'description', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Token expirado"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Estrategia:</label>
                      <Select
                        value={errorCase.retryStrategy}
                        onValueChange={(value) => updateErrorCase(index, 'retryStrategy', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exponential_backoff">Backoff Exponencial</SelectItem>
                          <SelectItem value="linear_backoff">Backoff Lineal</SelectItem>
                          <SelectItem value="fixed_delay">Retraso Fijo</SelectItem>
                          <SelectItem value="no_retry">Sin Reintento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium">Backoff:</label>
                      <Input
                        value={errorCase.backoffTime}
                        onChange={(e) => updateErrorCase(index, 'backoffTime', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="1s"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Máx. Reintentos:</label>
                      <Input
                        type="number"
                        value={errorCase.maxRetries}
                        onChange={(e) => updateErrorCase(index, 'maxRetries', parseInt(e.target.value) || 0)}
                        className="mt-1 text-xs"
                        placeholder="3"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trazabilidad */}
          <div className="space-y-2">
            <label className="text-sm font-medium">ID de traza *</label>
            <Input
              value={formData.traceId}
              onChange={(e) => setFormData({ ...formData, traceId: e.target.value })}
              placeholder="Ej: trace-12345-abcde"
            />
          </div>

          {/* Logs de ejecución */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Logs de ejecución *</label>
            <Textarea
              value={formData.logs}
              onChange={(e) => setFormData({ ...formData, logs: e.target.value })}
              placeholder="Describe los logs que se generarían durante la ejecución..."
              className="min-h-24"
            />
          </div>

          {/* Implementación técnica */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Implementación técnica *</label>
            <Textarea
              value={formData.implementacion}
              onChange={(e) => setFormData({ ...formData, implementacion: e.target.value })}
              placeholder="Describe cómo implementarías la integración HTTP..."
              className="min-h-32"
            />
          </div>

          {/* Resultados de pruebas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resultados de pruebas *</label>
            <Textarea
              value={formData.resultados}
              onChange={(e) => setFormData({ ...formData, resultados: e.target.value })}
              placeholder="Describe los resultados esperados de las pruebas..."
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