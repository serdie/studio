'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, CheckCircle2, AlertTriangle, BarChart3, Code2, Zap, Shield, FileText } from 'lucide-react';

interface TestCase {
  id: string;
  entrada: string;
  salidaEsperada: string;
  resultado: 'ok' | 'incompleto' | 'limite' | 'error';
  revision: boolean;
}

interface KPI {
  nombre: string;
  valor: number;
  descripcion: string;
}

export default function AenaPractice10() {
  const [inputContract, setInputContract] = useState(`{
  "mensaje": "string",
  "canal": "email|formulario|redes",
  "urgencia": "alta|media|baja"
}`);
  const [outputContract, setOutputContract] = useState(`{
  "motivo": "equipaje|accesibilidad|informacion|queja",
  "datos_extraidos": {
    "aeropuerto": "string or null",
    "fecha": "string or null",
    "vuelo": "string or null"
  },
  "urgencia_clasificada": "alta|media|baja",
  "borrador_respuesta": "string",
  "flags": {
    "sensibilidad": boolean,
    "datos_faltantes": boolean
  }
}`);
  const [prompt, setPrompt] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>(Array(20).fill({ id: '', entrada: '', salidaEsperada: '', resultado: 'ok' as const, revision: false }));
  const [kpis, setKpis] = useState<KPI[]>([
    { nombre: 'Tiempo ciclo', valor: 0, descripcion: 'Tiempo promedio de procesamiento' },
    { nombre: '% Revisión', valor: 0, descripcion: 'Porcentaje de casos que requieren revisión' },
    { nombre: '% Error técnico', valor: 0, descripcion: 'Porcentaje de fallos técnicos' },
    { nombre: 'Retrabajo', valor: 0, descripcion: 'Casos que requieren corrección' },
    { nombre: 'Volumen', valor: 0, descripcion: 'Número total de casos procesados' },
    { nombre: 'Precisión IA', valor: 0, descripcion: 'Porcentaje de clasificaciones correctas' },
  ]);

  const [checklist, setChecklist] = useState({
    credenciales: false,
    logs: false,
    alertas: false,
    cambios: false,
  });

  const updateTestCase = (index: number, field: keyof TestCase, value: string | boolean) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const updateKPI = (index: number, field: keyof KPI, value: string | number) => {
    const updated = [...kpis];
    updated[index] = { ...updated[index], [field]: value };
    setKpis(updated);
  };

  const updateChecklist = (field: keyof typeof checklist, value: boolean) => {
    setChecklist({ ...checklist, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Encargo */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Práctica 10 — IA "Operable" en el Flujo: Contrato de Salida + Validación + Fallback + Demo Final
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-bold text-green-900 mb-2">🏢 Encargo (necesidad de empresa):</h4>
            <p className="text-sm text-green-800">
              Aena recibe mensajes de pasajeros (email/formulario/redes) con incidencias y preguntas. Quieren un flujo que:
              Clasifique motivo, extraiga datos, genere borrador de respuesta, derive a revisión si falta dato o hay señal sensible.
              La prioridad es que la IA sea un paso dentro del proceso, con contrato de salida estricto y validación.
            </p>
          </div>

          <div className="bg-emerald-100 p-4 rounded-lg">
            <h4 className="font-bold text-emerald-900 mb-2">🔗 Enlaces para analizar:</h4>
            <a href="https://www.aena.es/es/contacto.html" target="_blank" rel="noopener noreferrer"
               className="text-emerald-700 hover:text-emerald-900 underline text-sm">
              Contacto Aena
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
              <p className="text-sm">Definir entrada JSON y salida JSON del paso de IA (campos obligatorios, valores permitidos)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Redactar prompt operativo para clasificación/extracción/sugerencia de borrador</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Validación post-IA (reintento 1 vez; si vuelve a fallar: revisión)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Checklist de producción: credenciales, logs, alertas, control de cambios/export</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <p className="text-sm">Demo obligatoria: 1 ejecución OK + 1 fallo tratado</p>
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2">🛠️ Herramientas recomendadas:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Vibe Coding + IA</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Cursor + AI</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Antigravity</Badge>
              <Badge variant="secondary" className="bg-blue-200 text-blue-800">Windsurf</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contrato JSON */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contrato JSON de Entrada y Salida
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-purple-900">Entrada JSON:</label>
              <Textarea
                value={inputContract}
                onChange={(e) => setInputContract(e.target.value)}
                className="mt-1 min-h-32 font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-purple-900">Salida JSON:</label>
              <Textarea
                value={outputContract}
                onChange={(e) => setOutputContract(e.target.value)}
                className="mt-1 min-h-32 font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Operativo */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Prompt Operativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Redacta aquí el prompt que usarás para la IA, incluyendo instrucciones claras de formato JSON..."
            className="min-h-40"
          />
        </CardContent>
      </Card>

      {/* Casos de Prueba */}
      <Card className="border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Casos de Prueba (20 casos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testCases.slice(0, 10).map((testCase, index) => (
              <div key={index} className="border border-red-200 rounded-lg p-3 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs font-medium text-red-900">Entrada:</label>
                    <Input
                      value={testCase.entrada}
                      onChange={(e) => updateTestCase(index, 'entrada', e.target.value)}
                      className="mt-1 text-xs"
                      placeholder="Mensaje de pasajero..."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-red-900">Salida Esperada:</label>
                    <Input
                      value={testCase.salidaEsperada}
                      onChange={(e) => updateTestCase(index, 'salidaEsperada', e.target.value)}
                      className="mt-1 text-xs"
                      placeholder="JSON esperado..."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-red-900">Resultado:</label>
                    <Select
                      value={testCase.resultado}
                      onValueChange={(value: 'ok' | 'incompleto' | 'limite' | 'error') => updateTestCase(index, 'resultado', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ok">OK</SelectItem>
                        <SelectItem value="incompleto">Incompleto</SelectItem>
                        <SelectItem value="limite">Límite</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-red-900">Revisión:</label>
                    <Select
                      value={testCase.revision ? 'true' : 'false'}
                      onValueChange={(value) => updateTestCase(index, 'revision', value === 'true')}
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
                  <div className="flex items-center">
                    <Badge className={`${
                      testCase.resultado === 'ok' ? 'bg-green-100 text-green-800' :
                      testCase.resultado === 'incompleto' ? 'bg-yellow-100 text-yellow-800' :
                      testCase.resultado === 'limite' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {testCase.resultado === 'ok' ? 'OK' :
                       testCase.resultado === 'incompleto' ? 'Incompleto' :
                       testCase.resultado === 'limite' ? 'Límite' : 'Error'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <CardHeader>
          <CardTitle className="text-cyan-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            KPIs de Producción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi, index) => (
              <div key={kpi.nombre} className="border border-cyan-200 rounded-lg p-4 bg-white">
                <div>
                  <label className="text-sm font-medium text-cyan-900">{kpi.nombre}:</label>
                  <Input
                    type="number"
                    value={kpi.valor}
                    onChange={(e) => updateKPI(index, 'valor', Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <Textarea
                  value={kpi.descripcion}
                  onChange={(e) => updateKPI(index, 'descripcion', e.target.value)}
                  className="mt-2 text-xs"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checklist de Producción */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Checklist de Producción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(checklist).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateChecklist(key as keyof typeof checklist, e.target.checked)}
                  className="rounded"
                />
                <label className="text-sm text-green-900 capitalize">
                  {key === 'credenciales' ? 'Credenciales configuradas' :
                   key === 'logs' ? 'Sistema de logs operativo' :
                   key === 'alertas' ? 'Alertas configuradas' :
                   'Control de cambios y export'}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resultado esperado */}
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <CardHeader>
          <CardTitle className="text-indigo-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resultado esperado:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-sm text-indigo-800 mb-2">
              <strong>"Paquete de entrega" del mini-proyecto: diagrama del flujo + contrato JSON + prompt + validación/fallback.</strong>
            </p>
            <p className="text-sm text-indigo-800">
              Requerimientos mínimos: 20 casos de prueba (8 OK, 6 incompletos, 6 límite/sensibles), 4–6 KPIs, evidencias de demo (OK y fallo tratado)
            </p>
          </div>

          <Textarea
            placeholder="Describe aquí tu paquete de entrega, evidencias de demo y métricas finales..."
            className="min-h-32"
          />
        </CardContent>
      </Card>
    </div>
  );
}