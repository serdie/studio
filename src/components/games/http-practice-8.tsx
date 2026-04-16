'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, AlertCircle, CheckCircle2, Clock, Shield, Code2, Zap } from 'lucide-react';

interface ErrorHandling {
  code: string;
  description: string;
  action: string;
  reintentos: number;
  backoff: string;
  alerta: boolean;
}

export default function HttpPractice8() {
  const [errorHandlings, setErrorHandlings] = useState<ErrorHandling[]>([
    { code: '401', description: 'Unauthorized', action: 'Reautenticar', reintentos: 1, backoff: '5s', alerta: true },
    { code: '403', description: 'Forbidden', action: 'Revisar permisos', reintentos: 0, backoff: '0s', alerta: true },
    { code: '429', description: 'Too Many Requests', action: 'Esperar y reintentar', reintentos: 3, backoff: '10s', alerta: false },
    { code: '5xx', description: 'Server Error', action: 'Reintentar con backoff', reintentos: 2, backoff: '30s', alerta: true },
  ]);

  const [traceId, setTraceId] = useState('');
  const [logEntries, setLogEntries] = useState<string[]>([]);

  const updateErrorHandling = (index: number, field: keyof ErrorHandling, value: string | number | boolean) => {
    const updated = [...errorHandlings];
    updated[index] = { ...updated[index], [field]: value };
    setErrorHandlings(updated);
  };

  const addLogEntry = (entry: string) => {
    setLogEntries([...logEntries, `${new Date().toISOString()}: ${entry}`]);
  };

  return (
    <div className="space-y-6">
      {/* Encargo */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Práctica 8 — Integración Universal por HTTP: Autenticación y Manejo de Errores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <h4 className="font-bold text-red-900 mb-2">🏢 Encargo (necesidad de empresa):</h4>
            <p className="text-sm text-red-800">
              Una pyme usa un sistema de tickets poco conocido (sin conector). Necesita integrar: "crear ticket" y "consultar estado".
              La API devuelve errores típicos (401/403/429/5xx). Dirección exige: reintentos limitados, backoff y alertas cuando la integración falla.
            </p>
          </div>

          <div className="bg-orange-100 p-4 rounded-lg">
            <h4 className="font-bold text-orange-900 mb-2">🔗 Enlaces para analizar:</h4>
            <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noopener noreferrer"
               className="text-orange-700 hover:text-orange-900 underline text-sm block">
              JSONPlaceholder (API de pruebas para practicar GET/POST)
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Lo que se pide */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Lo que se pide:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Diseñar una llamada HTTP (GET y POST) con cabeceras y parsing de respuesta JSON</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Definir qué ocurre con 401/403/429/5xx (ruta error técnico separada)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Plan de reintentos + backoff + alerta</p>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">🛠️ Herramientas recomendadas:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">VS Code + REST Client</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Cursor</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Antigravity</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Windsurf</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tratamiento por código de error */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Tabla de Tratamiento por Código de Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {errorHandlings.map((error, index) => (
              <div key={error.code} className="border border-green-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-900">Código:</label>
                    <Input
                      value={error.code}
                      onChange={(e) => updateErrorHandling(index, 'code', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Descripción:</label>
                    <Input
                      value={error.description}
                      onChange={(e) => updateErrorHandling(index, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Acción:</label>
                    <Input
                      value={error.action}
                      onChange={(e) => updateErrorHandling(index, 'action', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Reintentos:</label>
                    <Input
                      type="number"
                      value={error.reintentos}
                      onChange={(e) => updateErrorHandling(index, 'reintentos', Number(e.target.value))}
                      className="mt-1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Backoff:</label>
                    <Input
                      value={error.backoff}
                      onChange={(e) => updateErrorHandling(index, 'backoff', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Alerta:</label>
                    <Select
                      value={error.alerta ? 'true' : 'false'}
                      onValueChange={(value) => updateErrorHandling(index, 'alerta', value === 'true')}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Sí</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trace ID y Logs */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Trace ID y Logs Mínimos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-purple-900">Trace ID único:</label>
            <Input
              value={traceId}
              onChange={(e) => setTraceId(e.target.value)}
              placeholder="Ej: req-2024-01-15-abc123"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-900">Entradas de log:</label>
            <Textarea
              value={logEntries.join('\n')}
              readOnly
              className="mt-1 min-h-32 font-mono text-xs"
              placeholder="Los logs se añadirán automáticamente..."
            />
          </div>

          <Button
            onClick={() => addLogEntry(`[${traceId}] HTTP Request started`)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Simular Log Entry
          </Button>
        </CardContent>
      </Card>

      {/* Resultado esperado */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <CardHeader>
          <CardTitle className="text-cyan-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resultado esperado:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-cyan-100 p-4 rounded-lg">
            <p className="text-sm text-cyan-800 mb-2">
              <strong>Especificación técnica breve (1–2 páginas) lista para implementar.</strong>
            </p>
            <p className="text-sm text-cyan-800">
              Requerimientos mínimos: Tabla de tratamiento por código de error (401/403/429/5xx), trace_id y log mínimo
            </p>
          </div>

          <Textarea
            placeholder="Describe aquí tu especificación técnica, plan de reintentos y estrategia de alertas..."
            className="min-h-32"
          />
        </CardContent>
      </Card>
    </div>
  );
}