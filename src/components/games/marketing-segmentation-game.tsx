'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Users, Zap, TrendingUp } from 'lucide-react';

interface Segment {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  budget: number;
  channels: string[];
  expectedROI: number;
}

const segments: Segment[] = [
  {
    id: 'premium',
    name: 'Premium - Alto valor',
    description: 'Clientes de alto poder adquisitivo, dispuestos a pagar premium',
    characteristics: ['Edad 35-55', 'Profesionales liberales', 'Empresarios', 'Alto poder adquisitivo'],
    budget: 30000,
    channels: ['LinkedIn', 'Email premium', 'Webinars exclusivos'],
    expectedROI: 450
  },
  {
    id: 'growth',
    name: 'Growth - Potencial expansión',
    description: 'Empresas en crecimiento, presupuesto medio, muy receptivas',
    characteristics: ['Startups', 'Pymes en expansión', 'Presupuesto flexible', '5-50 empleados'],
    budget: 40000,
    channels: ['LinkedIn', 'Google Ads', 'Contenido educativo'],
    expectedROI: 300
  },
  {
    id: 'budget',
    name: 'Economía - Máximo volumen',
    description: 'Presupuesto reducido, alta sensibilidad al precio',
    characteristics: ['Autónomos', 'Pequeñas empresas', 'Presupuesto limitado'],
    budget: 25000,
    channels: ['Facebook Ads', 'Google Ads', 'Comunidades online'],
    expectedROI: 200
  },
  {
    id: 'enterprise',
    name: 'Enterprise - Soluciones complejas',
    description: 'Grandes corporaciones, decisiones complejas, ciclos largos',
    characteristics: ['Grandes empresas', '+500 empleados', 'Procesos complejos', 'Decisiones por comité'],
    budget: 50000,
    channels: ['LinkedIn', 'Eventos B2B', 'Account-based marketing'],
    expectedROI: 500
  }
];

export default function MarketingSegmentationGame() {
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [totalBudget, setTotalBudget] = useState(100000);
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const toggleSegment = (segmentId: string) => {
    const newSelected = selectedSegments.includes(segmentId)
      ? selectedSegments.filter(id => id !== segmentId)
      : [...selectedSegments, segmentId];
    
    setSelectedSegments(newSelected);
    
    // Calcular presupuesto asignado
    const assigned = newSelected.reduce((total, id) => {
      const segment = segments.find(s => s.id === id);
      return total + (segment?.budget || 0);
    }, 0);
    
    setAllocatedBudget(assigned);
  };

  const calculateMetrics = () => {
    const selectedSegs = segments.filter(s => selectedSegments.includes(s.id));
    const avgROI = selectedSegs.length > 0
      ? selectedSegs.reduce((sum, s) => sum + s.expectedROI, 0) / selectedSegs.length
      : 0;
    
    const projectedRevenue = (allocatedBudget * avgROI) / 100;
    const efficiency = (allocatedBudget / totalBudget) * 100;

    return { avgROI: avgROI.toFixed(0), projectedRevenue, efficiency: efficiency.toFixed(0) };
  };

  const metrics = calculateMetrics();
  const budgetRemaining = totalBudget - allocatedBudget;
  const isOverBudget = allocatedBudget > totalBudget;

  const handleSubmit = () => {
    if (selectedSegments.length === 0) {
      alert('Selecciona al menos un segmento');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="bg-gradient-to-br from-green-50/80 via-emerald-50/50 to-teal-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-green-200 dark:border-green-900">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border-b border-green-200 dark:border-green-900">
          <CardTitle className="text-green-900 dark:text-green-100">¡Estrategia de segmentación creada!</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Segmentos seleccionados:</h4>
              <div className="space-y-2">
                {segments.filter(s => selectedSegments.includes(s.id)).map(seg => (
                  <div key={seg.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{seg.name}</span>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">${seg.budget.toLocaleString()}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
                <p className="text-xs text-purple-700 dark:text-purple-300">ROI promedio</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{metrics.avgROI}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg p-4">
                <p className="text-xs text-blue-700 dark:text-blue-300">Ingresos proyectados</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">${(metrics.projectedRevenue / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4">
                <p className="text-xs text-green-700 dark:text-green-300">Presupuesto usado</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{metrics.efficiency}%</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setSubmitted(false);
                setSelectedSegments([]);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Crear nueva estrategia
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-pink-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-indigo-200 dark:border-indigo-900">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 border-b border-indigo-200 dark:border-indigo-900">
        <CardTitle className="text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
          <Users className="h-6 w-6" />
          Juego: Estrategia de Segmentación
        </CardTitle>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-2">
          Asigna tu presupuesto de ${totalBudget.toLocaleString()} entre segmentos para maximizar ROI
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Segmentos disponibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segments.map(segment => (
              <button
                key={segment.id}
                onClick={() => toggleSegment(segment.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedSegments.includes(segment.id)
                    ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-500'
                    : 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{segment.name}</h4>
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900">${segment.budget.toLocaleString()}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{segment.description}</p>
                <div className="text-xs space-y-1 mb-2">
                  <p className="text-slate-600 dark:text-slate-400"><strong>Características:</strong></p>
                  <div className="flex flex-wrap gap-1">
                    {segment.characteristics.slice(0, 2).map((char, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{char}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-medium">Canales: {segment.channels.join(', ')}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">ROI: {segment.expectedROI}%</span>
                </div>
              </button>
            ))}
          </div>

          {/* Resumen de presupuesto */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-900 space-y-3">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">Presupuesto asignado:</span>
                <span className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'} dark:text-green-400`}>
                  ${allocatedBudget.toLocaleString()} / ${totalBudget.toLocaleString()}
                </span>
              </div>
              <Progress
                value={Math.min((allocatedBudget / totalBudget) * 100, 100)}
                className={`h-2 ${isOverBudget ? 'bg-red-200' : 'bg-indigo-200'}`}
              />
            </div>
            {isOverBudget && (
              <p className="text-xs text-red-600 dark:text-red-400">
                ⚠️ ¡Excedido por ${(allocatedBudget - totalBudget).toLocaleString()}!
              </p>
            )}
            {!isOverBudget && (
              <p className="text-xs text-green-600 dark:text-green-400">
                ✓ Presupuesto disponible: ${budgetRemaining.toLocaleString()}
              </p>
            )}
          </div>

          {/* Métricas proyectadas */}
          {selectedSegments.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-3 text-center">
                <Zap className="h-5 w-5 mx-auto mb-1 text-purple-600 dark:text-purple-300" />
                <p className="text-xs text-purple-700 dark:text-purple-300">ROI Avg</p>
                <p className="text-xl font-bold text-purple-900 dark:text-purple-100">{metrics.avgROI}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg p-3 text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-1 text-blue-600 dark:text-blue-300" />
                <p className="text-xs text-blue-700 dark:text-blue-300">Ingreso proyectado</p>
                <p className="text-xl font-bold text-blue-900 dark:text-blue-100">${(metrics.projectedRevenue / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-3 text-center">
                <Lightbulb className="h-5 w-5 mx-auto mb-1 text-green-600 dark:text-green-300" />
                <p className="text-xs text-green-700 dark:text-green-300">Eficiencia</p>
                <p className="text-xl font-bold text-green-900 dark:text-green-100">{metrics.efficiency}%</p>
              </div>
            </div>
          )}

          {/* Botón de envío */}
          <Button
            onClick={handleSubmit}
            disabled={selectedSegments.length === 0 || isOverBudget}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50"
          >
            {selectedSegments.length === 0
              ? 'Selecciona segmentos'
              : isOverBudget
              ? 'Presupuesto excedido'
              : 'Enviar estrategia'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
