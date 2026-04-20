'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BarChart3, DollarSign, TrendingUp, Target } from 'lucide-react';

export default function MarketingROISimulator() {
  const [investment, setInvestment] = useState(50000);
  const [conversions, setConversions] = useState(500);
  const [avgOrderValue, setAvgOrderValue] = useState(150);
  const [marketingCost, setMarketingCost] = useState(20000);
  const [existingRevenue, setExistingRevenue] = useState(100000);

  const revenue = conversions * avgOrderValue;
  const totalRevenue = revenue + existingRevenue;
  const profit = totalRevenue - investment - marketingCost;
  const roi = ((profit / (investment + marketingCost)) * 100).toFixed(2);
  const cac = ((investment + marketingCost) / conversions).toFixed(2);
  const clv = (avgOrderValue * 1.5).toFixed(2);
  const paybackPeriod = (parseFloat(cac) > 0 ? (parseFloat(cac) / avgOrderValue * 30).toFixed(0) : '0');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-blue-50/80 via-cyan-50/50 to-purple-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-blue-200 dark:border-blue-900">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 border-b border-blue-200 dark:border-blue-900">
          <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Simulador de ROI - Marketing
          </CardTitle>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            Ajusta los parámetros y observa cómo impactan en tu ROI en tiempo real
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Parámetros
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Inversión inicial: <span className="font-bold text-blue-600 dark:text-blue-400">${investment.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={investment}
                    onChange={(e) => setInvestment(parseFloat(e.target.value))}
                    className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Conversiones esperadas: <span className="font-bold text-cyan-600 dark:text-cyan-400">{conversions}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="50"
                    value={conversions}
                    onChange={(e) => setConversions(parseFloat(e.target.value))}
                    className="w-full h-2 bg-cyan-200 dark:bg-cyan-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    AOV (Valor promedio pedido): <span className="font-bold text-purple-600 dark:text-purple-400">${avgOrderValue}</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(parseFloat(e.target.value))}
                    className="w-full h-2 bg-purple-200 dark:bg-purple-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Gasto en marketing: <span className="font-bold text-pink-600 dark:text-pink-400">${marketingCost.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={marketingCost}
                    onChange={(e) => setMarketingCost(parseFloat(e.target.value))}
                    className="w-full h-2 bg-pink-200 dark:bg-pink-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Ingresos actuales: <span className="font-bold text-teal-600 dark:text-teal-400">${existingRevenue.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="50000"
                    value={existingRevenue}
                    onChange={(e) => setExistingRevenue(parseFloat(e.target.value))}
                    className="w-full h-2 bg-teal-200 dark:bg-teal-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Resultados
              </h3>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Ingresos nuevos:</span>
                  <span className="font-bold text-green-600 dark:text-green-400 text-lg">${revenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Ingresos totales:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">${totalRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 ${profit > 0 ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Ganancia neta:</span>
                  <span className={`font-bold text-lg ${profit > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${profit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold text-sm">ROI (%):</span>
                  <Badge className={`text-lg px-3 py-1 ${roi >= 50 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : roi >= 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
                    {roi}%
                  </Badge>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Coste por adquisición (CAC):</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">${cac}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-cyan-500">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Lifetime Value (est):</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">${clv}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-indigo-500">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300 text-sm">Período de retorno (días):</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">~{paybackPeriod}</span>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300">
                <strong>Consejo:</strong> Un ROI saludable está entre 200-400%. CAC debe ser 25-30% del CLV para viabilidad.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
