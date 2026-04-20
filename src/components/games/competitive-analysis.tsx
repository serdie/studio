'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingDown, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Competitor {
  id: string;
  name: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  targetMarket: string;
  uniqueValue: string;
}

export default function CompetitiveAnalysisTool() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'Hubspot',
      strengths: ['Líder en market', 'Documentación excelente', 'Integraciones', 'Soporte premium'],
      weaknesses: ['Precio elevado', 'Curva de aprendizaje', 'Complejidad'],
      pricing: '$450-3200/mes',
      targetMarket: 'Empresas medianas y grandes',
      uniqueValue: 'All-in-one CRM + Marketing + Sales'
    },
    {
      id: '2',
      name: 'Mailchimp',
      strengths: ['Versión gratuita', 'Fácil de usar', 'Email marketing fuerte', 'Automatización básica'],
      weaknesses: ['Limitaciones en CRM', 'No enterprise-ready', 'Features avanzadas limitadas'],
      pricing: 'Gratuito - $1500/mes',
      targetMarket: 'Pequeñas empresas y freelancers',
      uniqueValue: 'Sencillez + versión gratuita generosa'
    }
  ]);

  const [newCompetitor, setNewCompetitor] = useState<Partial<Competitor>>({
    strengths: [],
    weaknesses: []
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addCompetitor = () => {
    if (!newCompetitor.name) {
      alert('Por favor ingresa el nombre del competidor');
      return;
    }
    
    const competitor: Competitor = {
      id: Date.now().toString(),
      name: newCompetitor.name || '',
      strengths: newCompetitor.strengths || [],
      weaknesses: newCompetitor.weaknesses || [],
      pricing: newCompetitor.pricing || 'N/A',
      targetMarket: newCompetitor.targetMarket || 'N/A',
      uniqueValue: newCompetitor.uniqueValue || 'N/A'
    };

    setCompetitors([...competitors, competitor]);
    setNewCompetitor({ strengths: [], weaknesses: [] });
    setShowAddForm(false);
  };

  const deleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
  };

  const deleteCompetitorFromAdd = (index: number, field: 'strengths' | 'weaknesses') => {
    const updated = [...(newCompetitor[field] || [])];
    updated.splice(index, 1);
    setNewCompetitor({ ...newCompetitor, [field]: updated });
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-50/80 via-orange-50/50 to-red-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-yellow-200 dark:border-yellow-900">
      <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-950 dark:to-orange-950 border-b border-yellow-200 dark:border-yellow-900">
        <CardTitle className="text-yellow-900 dark:text-yellow-100 flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Análisis Competitivo
        </CardTitle>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
          Mapea fortalezas, debilidades y oportunidades de tus competidores
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Competidores existentes */}
          <div className="space-y-4">
            {competitors.map(comp => (
              <div
                key={comp.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-yellow-200 dark:border-yellow-900 p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                      {comp.name}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {comp.uniqueValue}
                    </p>
                  </div>
                  <Button
                    onClick={() => deleteCompetitor(comp.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Precio:</p>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900">{comp.pricing}</Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Target:</p>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900">{comp.targetMarket}</Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Fortalezas</p>
                    </div>
                    <ul className="space-y-1">
                      {comp.strengths.map((strength, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex gap-2">
                          <span className="text-green-600 dark:text-green-400">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Debilidades</p>
                    </div>
                    <ul className="space-y-1">
                      {comp.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex gap-2">
                          <span className="text-red-600 dark:text-red-400">✗</span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario para agregar */}
          {showAddForm && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700 p-4 space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Añadir competidor</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Nombre del competidor
                  </label>
                  <Input
                    placeholder="Ej. Mailchimp"
                    value={newCompetitor.name || ''}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                    className="bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Propuesta de valor
                  </label>
                  <Input
                    placeholder="Ej. Sencillez + versión gratuita"
                    value={newCompetitor.uniqueValue || ''}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, uniqueValue: e.target.value })}
                    className="bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Precio
                  </label>
                  <Input
                    placeholder="Ej. Gratuito - $1500/mes"
                    value={newCompetitor.pricing || ''}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, pricing: e.target.value })}
                    className="bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Mercado objetivo
                  </label>
                  <Input
                    placeholder="Ej. Pequeñas empresas"
                    value={newCompetitor.targetMarket || ''}
                    onChange={(e) => setNewCompetitor({ ...newCompetitor, targetMarket: e.target.value })}
                    className="bg-white dark:bg-slate-800 border-yellow-200 dark:border-yellow-800"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-yellow-300 dark:border-yellow-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={addCompetitor}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Guardar
                </Button>
              </div>
            </div>
          )}

          {/* Botón para agregar */}
          {!showAddForm && (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full border-2 border-dashed border-yellow-400 dark:border-yellow-700 bg-transparent text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir competidor
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
