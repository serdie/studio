'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Copy, Download } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  description: string;
  priority: 'alta' | 'media' | 'baja';
}

const checklistItems: ChecklistItem[] = [
  {
    id: '1',
    category: 'Estrategia',
    task: 'Definir objetivos SMART',
    description: 'Específicos, Medibles, Alcanzables, Relevantes y Temporal',
    priority: 'alta'
  },
  {
    id: '2',
    category: 'Estrategia',
    task: 'Análisis de competencia',
    description: 'Mapear fortalezas, debilidades, oportunidades de competidores',
    priority: 'alta'
  },
  {
    id: '3',
    category: 'Estrategia',
    task: 'Segmentación de mercado',
    description: 'Identificar y describir segmentos target',
    priority: 'alta'
  },
  {
    id: '4',
    category: 'Contenido',
    task: 'Crear calendar editorial',
    description: 'Planificar contenido por canal y fecha',
    priority: 'media'
  },
  {
    id: '5',
    category: 'Contenido',
    task: 'Desarrollar buyer personas',
    description: 'Crear perfiles detallados del cliente ideal',
    priority: 'media'
  },
  {
    id: '6',
    category: 'Canales',
    task: 'Optimizar perfiles en RRSS',
    description: 'Bio, foto, descripción, links en redes sociales',
    priority: 'alta'
  },
  {
    id: '7',
    category: 'Canales',
    task: 'Configurar Google Analytics',
    description: 'GA4, eventos, objetivos de conversión',
    priority: 'alta'
  },
  {
    id: '8',
    category: 'Canales',
    task: 'Setup automatización de email',
    description: 'Segmentación, secuencias, triggers',
    priority: 'media'
  },
  {
    id: '9',
    category: 'Publicidad',
    task: 'Crear campañas pagadas',
    description: 'Definir presupuesto, audiencias, creativas en cada plataforma',
    priority: 'media'
  },
  {
    id: '10',
    category: 'Publicidad',
    task: 'A/B Testing',
    description: 'Probar diferentes versiones de anuncios y contenido',
    priority: 'media'
  },
  {
    id: '11',
    category: 'Medición',
    task: 'Definir KPIs',
    description: 'Seleccionar métricas clave por objetivo',
    priority: 'alta'
  },
  {
    id: '12',
    category: 'Medición',
    task: 'Dashboard de seguimiento',
    description: 'Crear dashboards para monitorizar performance',
    priority: 'media'
  },
  {
    id: '13',
    category: 'Medición',
    task: 'Reportes mensuales',
    description: 'Analizar resultados y ajustar estrategia',
    priority: 'media'
  },
  {
    id: '14',
    category: 'Herramientas',
    task: 'Herramientas SEO',
    description: 'Semrush, Ahrefs, Ubersuggest para keyword research',
    priority: 'baja'
  },
  {
    id: '15',
    category: 'Herramientas',
    task: 'Programación de contenido',
    description: 'Buffer, Later, Hootsuite para gestionar RRSS',
    priority: 'baja'
  }
];

export default function MarketingChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setCompleted(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  const filteredItems = filter
    ? checklistItems.filter(item => item.category === filter)
    : checklistItems;

  const completionPercentage = Math.round((completed.length / checklistItems.length) * 100);

  const generateText = () => {
    let text = `# CHECKLIST DE MARKETING

`;
    categories.forEach(category => {
      text += `## ${category}
`;
      checklistItems
        .filter(item => item.category === category)
        .forEach(item => {
          const mark = completed.includes(item.id) ? '[✓]' : '[ ]';
          text += `${mark} ${item.task}
`;
          text += `   ${item.description}

`;
        });
    });
    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateText()).then(() => {
      alert('Checklist copiado al portapapeles');
    });
  };

  const downloadChecklist = () => {
    const text = generateText();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'marketing-checklist.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="bg-gradient-to-br from-green-50/80 via-emerald-50/50 to-teal-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-green-200 dark:border-green-900">
      <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950 border-b border-green-200 dark:border-green-900">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6" />
              Checklist de Marketing
            </CardTitle>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">
              Plan completo para ejecutar tu estrategia de marketing
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completionPercentage}%</p>
            <p className="text-xs text-green-700 dark:text-green-300">{completed.length}/{checklistItems.length}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Filtros por categoría */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilter(null)}
              variant={filter === null ? 'default' : 'outline'}
              className={filter === null ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              Todas ({checklistItems.length})
            </Button>
            {categories.map(category => {
              const count = checklistItems.filter(item => item.category === category).length;
              return (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? 'default' : 'outline'}
                  className={filter === category ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>

          {/* Items del checklist */}
          <div className="space-y-3">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  completed.includes(item.id)
                    ? 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600'
                    : 'bg-white dark:bg-slate-800 border-green-200 dark:border-green-900 hover:border-green-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={completed.includes(item.id)}
                    onCheckedChange={() => toggleTask(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-semibold ${
                        completed.includes(item.id)
                          ? 'text-green-700 dark:text-green-300 line-through'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {item.task}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.priority === 'alta'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : item.priority === 'media'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      completed.includes(item.id)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex gap-2 justify-end pt-4 border-t border-green-200 dark:border-green-900">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
            <Button
              onClick={downloadChecklist}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
