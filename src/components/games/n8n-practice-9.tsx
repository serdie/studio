'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitBranch, CheckCircle2, AlertTriangle, BarChart3, Code2, Zap, Split } from 'lucide-react';

interface Equivalencia {
  concepto: string;
  make: string;
  n8n: string;
  riesgo: string;
}

export default function N8nPractice9() {
  const [equivalencias, setEquivalencias] = useState<Equivalencia[]>([
    { concepto: 'Bundle/Item', make: 'Bundle', n8n: 'Item', riesgo: 'Confusión en transformación de datos' },
    { concepto: 'Router', make: 'Router', n8n: 'IF/Switch', riesgo: 'Lógica condicional diferente' },
    { concepto: 'Lotes', make: 'Iterator', n8n: 'Split In Batches', riesgo: 'Control de concurrencia' },
  ]);

  const [rutaOK, setRutaOK] = useState('');
  const [rutaRevision, setRutaRevision] = useState('');
  const [rutaError, setRutaError] = useState('');
  const [migracionRiesgos, setMigracionRiesgos] = useState('');

  const updateEquivalencia = (index: number, field: keyof Equivalencia, value: string) => {
    const updated = [...equivalencias];
    updated[index] = { ...updated[index], [field]: value };
    setEquivalencias(updated);
  };

  return (
    <div className="space-y-6">
      {/* Encargo */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Práctica 9 — Cursor: Replicar el Caso en "Modo Equivalente" (Items, IF/Switch, Split in Batches)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-100 p-4 rounded-lg">
            <h4 className="font-bold text-purple-900 mb-2">🏢 Encargo (necesidad de empresa):</h4>
            <p className="text-sm text-purple-800">
              Una empresa quiere evitar "dependencia de herramienta": pide que el mismo flujo (triage de incidencias) sea traducible entre Make y n8n,
              manteniendo lógica y contrato de datos. Se necesita comparar conceptos: bundle vs item, router vs IF/Switch, y control por lotes.
            </p>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg">
            <h4 className="font-bold text-pink-900 mb-2">🔗 Enlaces (contexto de incidencias típico):</h4>
            <a href="https://www.correos.es/es/es/ayuda" target="_blank" rel="noopener noreferrer"
               className="text-pink-700 hover:text-pink-900 underline text-sm">
              Correos (seguimiento / ayuda, inspiración de casos)
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
              <p className="text-sm">Tomar el diseño del flujo de una práctica previa (p. ej., práctica 6) y traducirlo a Cursor</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Implementar IF/Switch y una estrategia de lotes (Split In Batches) para evitar picos</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Documentar equivalencias funcionales (terminología) y riesgos de migración</p>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">🛠️ Herramientas recomendadas:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Cursor</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Antigravity</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Windsurf</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">VS Code + Extensions</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equivalencias Make ↔ Cursor */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Split className="h-5 w-5" />
            Tabla de Equivalencias Make ↔ Cursor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {equivalencias.map((eq, index) => (
              <div key={eq.concepto} className="border border-green-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-900">Concepto:</label>
                    <Input
                      value={eq.concepto}
                      onChange={(e) => updateEquivalencia(index, 'concepto', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Make:</label>
                    <Input
                      value={eq.make}
                      onChange={(e) => updateEquivalencia(index, 'make', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Cursor:</label>
                    <Input
                      value={eq.n8n}
                      onChange={(e) => updateEquivalencia(index, 'n8n', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-900">Riesgo:</label>
                    <Input
                      value={eq.riesgo}
                      onChange={(e) => updateEquivalencia(index, 'riesgo', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rutas del Flujo */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Rutas del Flujo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-orange-900">Ruta OK:</label>
              <Textarea
                value={rutaOK}
                onChange={(e) => setRutaOK(e.target.value)}
                placeholder="Describe la ruta de procesamiento normal..."
                className="mt-1 min-h-20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-orange-900">Ruta Revisión:</label>
              <Textarea
                value={rutaRevision}
                onChange={(e) => setRutaRevision(e.target.value)}
                placeholder="Describe la ruta de revisión humana..."
                className="mt-1 min-h-20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-orange-900">Ruta Error Técnico:</label>
              <Textarea
                value={rutaError}
                onChange={(e) => setRutaError(e.target.value)}
                placeholder="Describe la ruta de error técnico..."
                className="mt-1 min-h-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riesgos de Migración */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Riesgos de Migración y Decisiones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={migracionRiesgos}
            onChange={(e) => setMigracionRiesgos(e.target.value)}
            placeholder="Documenta aquí los riesgos de migración, decisiones tomadas y equivalencias aplicadas..."
            className="min-h-32"
          />
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
              <strong>Workflow Cursor + documento "equivalencias y decisiones" (1–2 páginas).</strong>
            </p>
            <p className="text-sm text-cyan-800">
              Requerimientos mínimos: 1 ruta OK + 1 revisión + 1 error técnico, Tabla de equivalencias Make↔Cursor aplicada al flujo
            </p>
          </div>

          <Textarea
            placeholder="Describe aquí tu workflow, equivalencias y decisiones de migración..."
            className="min-h-32"
          />
        </CardContent>
      </Card>
    </div>
  );
}