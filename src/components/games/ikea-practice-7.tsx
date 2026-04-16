'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RotateCcw, FileText, AlertCircle, CheckCircle2, Calculator, TrendingUp, DollarSign, HelpCircle, Target } from 'lucide-react';

interface CostItem {
  concepto: string;
  costoUnitario: string;
  cantidad: string;
  total: string;
}

interface Aggregator {
  nombre: string;
  descripcion: string;
  costo: string;
}

export default function IkeaPractice7() {
  const [formData, setFormData] = useState({
    listaProductos: '',
    criterioAgrupacion: '',
    costoBaseEnvio: '',
    costoPorKm: '',
    costoPorKg: '',
    limiteKm: '',
    limiteKg: '',
    aggregators: [] as Aggregator[],
    costItems: [] as CostItem[],
    algoritmo: '',
    casosPrueba: '',
    resultado: ''
  });

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [missing, setMissing] = useState<string[]>([]);

  const updateAggregator = (index: number, field: keyof Aggregator, value: string) => {
    const updated = [...formData.aggregators];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, aggregators: updated });
  };

  const addAggregator = () => {
    setFormData({
      ...formData,
      aggregators: [...formData.aggregators, {
        nombre: '',
        descripcion: '',
        costo: ''
      }]
    });
  };

  const updateCostItem = (index: number, field: keyof CostItem, value: string) => {
    const updated = [...formData.costItems];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, costItems: updated });
  };

  const addCostItem = () => {
    setFormData({
      ...formData,
      costItems: [...formData.costItems, {
        concepto: '',
        costoUnitario: '',
        cantidad: '',
        total: ''
      }]
    });
  };

  const generate = () => {
    const required = ['listaProductos', 'criterioAgrupacion', 'costoBaseEnvio', 'algoritmo'];
    const missingFields = required.filter(field => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      setMissing(missingFields);
      setStatus({ type: 'error', message: 'Faltan campos obligatorios' });
      return;
    }

    if (formData.aggregators.length < 3) {
      setStatus({ type: 'error', message: 'Se requieren al menos 3 aggregators' });
      return;
    }

    setMissing([]);
    setStatus({ type: 'success', message: 'Práctica generada correctamente' });

    const aggregatorsSummary = formData.aggregators.map((agg, i) =>
      `| ${i + 1} | ${agg.nombre} | ${agg.descripcion} | ${agg.costo} |`
    ).join('\n');

    const costItemsSummary = formData.costItems.map((item, i) =>
      `| ${i + 1} | ${item.concepto} | ${item.costoUnitario} | ${item.cantidad} | ${item.total} |`
    ).join('\n');

    const summaryText = `# Práctica 7: Listas Iterator/Aggregator con Control de Coste

## 1. Lista de Productos IKEA
${formData.listaProductos}

## 2. Criterio de Agrupación
${formData.criterioAgrupacion}

## 3. Costes Base de Envío
- Coste base: ${formData.costoBaseEnvio}€
- Coste por km adicional: ${formData.costoPorKm}€
- Coste por kg adicional: ${formData.costoPorKg}€
- Límite km: ${formData.limiteKm}km
- Límite kg: ${formData.limiteKg}kg

## 4. Aggregators Disponibles (${formData.aggregators.length})
| # | Nombre | Descripción | Coste |
|---|--------|-------------|--------|
${aggregatorsSummary}

## 5. Items de Coste Adicionales (${formData.costItems.length})
| # | Concepto | Coste Unitario | Cantidad | Total |
|---|----------|----------------|----------|--------|
${costItemsSummary}

## 6. Algoritmo de Optimización
${formData.algoritmo}

## 7. Casos de Prueba
${formData.casosPrueba}

## 8. Resultado Final
${formData.resultado}

## Herramientas Vibe Coding recomendadas:
- **Vibe Coding**: Diseña el algoritmo de optimización de costes con Iterator para productos y Aggregator para calcular totales
- **Cursor + AI**: "Implementa un algoritmo que agrupe productos IKEA por envío óptimo, calculando costes con Iterator/Aggregator patterns"
- **Antigravity**: "Genera casos de prueba para optimización de envíos IKEA: productos grandes vs pequeños, distancias variables, límites de peso"
- **Qwen CLI**: "Crea un Iterator que recorra productos y un Aggregator que calcule costes totales de envío con límites"
- **Alternativas gratuitas**: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com)
- **Si no tienes código**: Describe el algoritmo en pseudocódigo con Iterator y Aggregator patterns`;

    setSummary(summaryText);
  };

  const clearAll = () => {
    setFormData({
      listaProductos: '',
      criterioAgrupacion: '',
      costoBaseEnvio: '',
      costoPorKm: '',
      costoPorKg: '',
      limiteKm: '',
      limiteKg: '',
      aggregators: [],
      costItems: [],
      algoritmo: '',
      casosPrueba: '',
      resultado: ''
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">7</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 7 · Listas Iterator/Aggregator con Control de Coste (IKEA)</h1>
            <p className="text-sm text-slate-600">Implementa Iterator para recorrer productos y Aggregator para calcular costes de envío óptimos</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Calculator className="h-3 w-3 mr-1" /> Iterator Pattern</Badge>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200"><TrendingUp className="h-3 w-3 mr-1" /> Aggregator Pattern</Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><DollarSign className="h-3 w-3 mr-1" /> Control de Costes</Badge>
        </div>
      </div>

      {/* Encargo de negocio */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">IKEA · logística</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            IKEA necesita optimizar sus envíos agrupando productos de manera inteligente. El sistema debe usar <strong>Iterator</strong> para recorrer productos y <strong>Aggregator</strong> para calcular costes totales, respetando límites de peso/distancia y minimizando gastos de envío.
          </p>

          {/* Paso a paso */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
            <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para implementar Iterator/Aggregator</h4>
            <div className="space-y-2 text-xs text-blue-800">
              <p><strong>Paso 1 — Iterator:</strong> Crea un Iterator que recorra la lista de productos IKEA, permitiendo navegación forward/backward y acceso por índice. Ejemplo: productos = ["Mesa MALM", "Silla UTÅKER", "Lámpara FLEKKE"]</p>
              <p><strong>Paso 2 — Aggregator:</strong> Implementa Aggregator que agrupe productos por envío óptimo, calculando costes totales. Ejemplo: envío1 = [mesa, silla] (coste: 25€), envío2 = [lámpara] (coste: 15€)</p>
              <p><strong>Paso 3 — Control de costes:</strong> Añade límites de peso (max 30kg) y distancia (max 100km), con costes adicionales por exceso. Ejemplo: +2€ por km extra, +1€ por kg extra</p>
              <p><strong>Paso 4 — Optimización:</strong> El algoritmo debe encontrar la combinación que minimice costes totales. Ejemplo: 3 productos → 2 envíos vs 1 envío grande</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campos de práctica */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Campos de práctica</h3>
          </div>

          {/* Lista de productos */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Lista de productos IKEA *</label>
            <Textarea
              value={formData.listaProductos}
              onChange={(e) => setFormData({ ...formData, listaProductos: e.target.value })}
              placeholder="Ej: Mesa MALM (20kg, 100x60x75cm), Silla UTÅKER (5kg, 40x40x80cm), Lámpara FLEKKE (2kg, 30x30x150cm)..."
              className="min-h-20"
            />
          </div>

          {/* Criterio de agrupación */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Criterio de agrupación *</label>
            <Textarea
              value={formData.criterioAgrupacion}
              onChange={(e) => setFormData({ ...formData, criterioAgrupacion: e.target.value })}
              placeholder="Ej: Agrupar por peso máximo 30kg y volumen máximo 2m³ por envío..."
              className="min-h-16"
            />
          </div>

          {/* Costes base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Coste base envío (€) *</label>
              <Input
                value={formData.costoBaseEnvio}
                onChange={(e) => setFormData({ ...formData, costoBaseEnvio: e.target.value })}
                placeholder="15.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Coste por km adicional (€)</label>
              <Input
                value={formData.costoPorKm}
                onChange={(e) => setFormData({ ...formData, costoPorKm: e.target.value })}
                placeholder="0.50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Coste por kg adicional (€)</label>
              <Input
                value={formData.costoPorKg}
                onChange={(e) => setFormData({ ...formData, costoPorKg: e.target.value })}
                placeholder="1.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Límite km</label>
              <Input
                value={formData.limiteKm}
                onChange={(e) => setFormData({ ...formData, limiteKm: e.target.value })}
                placeholder="100"
              />
            </div>
          </div>

          {/* Aggregators */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Aggregators disponibles (mínimo 3)</label>
              <Button onClick={addAggregator} size="sm" variant="outline">
                + Agregar Aggregator
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {formData.aggregators.map((aggregator, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium">Nombre:</label>
                      <Input
                        value={aggregator.nombre}
                        onChange={(e) => updateAggregator(index, 'nombre', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Ej: SumCostAggregator"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Descripción:</label>
                      <Input
                        value={aggregator.descripcion}
                        onChange={(e) => updateAggregator(index, 'descripcion', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Suma costes totales"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Coste base:</label>
                      <Input
                        value={aggregator.costo}
                        onChange={(e) => updateAggregator(index, 'costo', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="15.00€"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items de coste adicionales */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Items de coste adicionales</label>
              <Button onClick={addCostItem} size="sm" variant="outline">
                + Agregar Item
              </Button>
            </div>

            <div className="space-y-3">
              {formData.costItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-medium">Concepto:</label>
                      <Input
                        value={item.concepto}
                        onChange={(e) => updateCostItem(index, 'concepto', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="Ej: Seguro envío"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Coste unitario:</label>
                      <Input
                        value={item.costoUnitario}
                        onChange={(e) => updateCostItem(index, 'costoUnitario', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="5.00€"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Cantidad:</label>
                      <Input
                        value={item.cantidad}
                        onChange={(e) => updateCostItem(index, 'cantidad', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Total:</label>
                      <Input
                        value={item.total}
                        onChange={(e) => updateCostItem(index, 'total', e.target.value)}
                        className="mt-1 text-xs"
                        placeholder="5.00€"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Algoritmo */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Algoritmo de optimización *</label>
            <Textarea
              value={formData.algoritmo}
              onChange={(e) => setFormData({ ...formData, algoritmo: e.target.value })}
              placeholder="Describe el algoritmo que usa Iterator para recorrer productos y Aggregator para calcular costes..."
              className="min-h-24"
            />
          </div>

          {/* Casos de prueba */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Casos de prueba</label>
            <Textarea
              value={formData.casosPrueba}
              onChange={(e) => setFormData({ ...formData, casosPrueba: e.target.value })}
              placeholder="Ej: Caso 1: 3 productos pequeños → 1 envío. Caso 2: 1 grande + 2 pequeños → 2 envíos..."
              className="min-h-20"
            />
          </div>

          {/* Resultado */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resultado final</label>
            <Textarea
              value={formData.resultado}
              onChange={(e) => setFormData({ ...formData, resultado: e.target.value })}
              placeholder="Describe el resultado de aplicar el algoritmo a los casos de prueba..."
              className="min-h-20"
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