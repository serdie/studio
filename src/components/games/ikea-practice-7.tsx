'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, CheckCircle2, AlertTriangle, BarChart3, Code2, Zap } from 'lucide-react';

interface Scenario {
  id: string;
  adjuntos: number;
  decision: 'iterator' | 'aggregator' | 'revision';
  operaciones: number;
}

export default function IkeaPractice7() {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: '1', adjuntos: 0, decision: 'iterator', operaciones: 0 },
    { id: '2', adjuntos: 3, decision: 'iterator', operaciones: 3 },
    { id: '3', adjuntos: 12, decision: 'aggregator', operaciones: 1 },
  ]);

  const [umbral, setUmbral] = useState(5);
  const [costoEstimado, setCostoEstimado] = useState(0);

  const updateScenario = (index: number, field: keyof Scenario, value: string | number) => {
    const updated = [...scenarios];
    updated[index] = { ...updated[index], [field]: value };
    setScenarios(updated);
    calculateCosto();
  };

  const calculateCosto = () => {
    const total = scenarios.reduce((acc, s) => acc + s.operaciones, 0);
    setCostoEstimado(total);
  };

  return (
    <div className="space-y-6">
      {/* Encargo */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Práctica 7 — Vibe Coding: Listas, Iterator/Aggregator y Control de Coste (IKEA)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">🏢 Encargo (necesidad de empresa):</h4>
            <p className="text-sm text-blue-800">
              IKEA gestiona incidencias donde un mismo caso puede traer varios artículos y varios adjuntos (fotos, tickets).
              Quieren automatizar el registro sin "explotar" operaciones: si un caso trae 30 fotos, no quieren disparar 30 acciones sin control.
              El objetivo es aprender a tratar listas y a decidir: iterar, agregar o pasar a revisión.
            </p>
          </div>

          <div className="bg-cyan-100 p-4 rounded-lg">
            <h4 className="font-bold text-cyan-900 mb-2">🔗 Enlaces:</h4>
            <a href="https://www.ikea.com/es/es/customer-service/returns-claims/" target="_blank" rel="noopener noreferrer"
               className="text-cyan-700 hover:text-cyan-900 underline text-sm">
              IKEA - devoluciones y reclamaciones
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Lo que se pide */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Lo que se pide:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-sm">Diseñar/implementar un flujo que detecta arrays (items[], attachments[])</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-sm">Si attachments ≤ {umbral}: procesa (Iterator)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-sm">Si attachments &gt; {umbral}: agrega resumen (Aggregator) + deriva a revisión</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <p className="text-sm">Registra en log cuántos elementos había (KPI de volumen)</p>
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">🛠️ Herramientas recomendadas:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-200 text-green-800">Vibe Coding</Badge>
              <Badge variant="secondary" className="bg-green-200 text-green-800">VS Code</Badge>
              <Badge variant="secondary" className="bg-green-200 text-green-800">Cursor</Badge>
              <Badge variant="secondary" className="bg-green-200 text-green-800">Antigravity</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Configuración del Flujo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-purple-900">Umbral de adjuntos para revisión:</label>
              <Input
                type="number"
                value={umbral}
                onChange={(e) => setUmbral(Number(e.target.value))}
                className="mt-1"
                min="1"
                max="20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-purple-900">Costo estimado total de operaciones:</label>
              <div className="mt-1 p-2 bg-purple-100 rounded text-purple-900 font-bold">
                {costoEstimado} operaciones
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Escenarios de Prueba */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Escenarios de Prueba
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scenarios.map((scenario, index) => (
              <div key={scenario.id} className="border border-orange-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-orange-900">Adjuntos:</label>
                    <Input
                      type="number"
                      value={scenario.adjuntos}
                      onChange={(e) => updateScenario(index, 'adjuntos', Number(e.target.value))}
                      className="mt-1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-orange-900">Decisión:</label>
                    <Select
                      value={scenario.decision}
                      onValueChange={(value: 'iterator' | 'aggregator' | 'revision') => updateScenario(index, 'decision', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iterator">Iterator</SelectItem>
                        <SelectItem value="aggregator">Aggregator</SelectItem>
                        <SelectItem value="revision">Revisión</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-orange-900">Operaciones:</label>
                    <Input
                      type="number"
                      value={scenario.operaciones}
                      onChange={(e) => updateScenario(index, 'operaciones', Number(e.target.value))}
                      className="mt-1"
                      min="0"
                    />
                  </div>
                  <div className="flex items-center">
                    {scenario.adjuntos <= umbral ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Procesable
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-100 text-orange-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Revisión
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resultado esperado */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resultado esperado:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-800 mb-2">
              <strong>Diagrama + capturas de ejecución + tabla de "coste estimado" (nº de operaciones evitadas).</strong>
            </p>
            <p className="text-sm text-red-800">
              Requerimientos mínimos: Regla "si lista supera X → revisión", Evidencia de 3 escenarios: 0 adjuntos / 3 adjuntos / 12 adjuntos
            </p>
          </div>

          <Textarea
            placeholder="Describe aquí tu implementación, diagrama y resultados..."
            className="min-h-32"
          />
        </CardContent>
      </Card>
    </div>
  );
}