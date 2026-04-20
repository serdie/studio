'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, ExternalLink, Sparkles, BrainCircuit, PenTool, BarChart, Image as ImageIcon, Video, Megaphone, Target, CornerDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MarketingAIToolsLinks() {
  const [expanded, setExpanded] = useState(false);

  const tools = [
    {
      category: 'Copywriting y Texto con IA',
      icon: PenTool,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900',
      items: [
        {
          name: 'ChatGPT / Claude',
          url: 'https://chat.openai.com',
          description: 'Asistentes universales para ideación, redacción de copys y estrategias de campaña.',
          ai: true,
        },
        {
          name: 'Jasper',
          url: 'https://www.jasper.ai',
          description: 'Plataforma líder para generar artículos, posts para RRSS y copywriting publicitario de alta conversión.',
          ai: true,
        },
        {
          name: 'Copy.ai',
          url: 'https://www.copy.ai',
          description: 'Generador de textos enfocado a equipos de ventas y marketing. Ideal para secuencias de email.',
          ai: true,
        }
      ]
    },
    {
      category: 'Generación Gráfica y Diseño',
      icon: ImageIcon,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900',
      items: [
        {
          name: 'Canva & Magic Studio',
          url: 'https://www.canva.com',
          description: 'Diseño accesible para no-diseñadores. Incluye magia IA para generar recursos y quitar fondos al instante.',
          ai: true,
        },
        {
          name: 'Midjourney',
          url: 'https://www.midjourney.com',
          description: 'La herramienta más avanzada para crear fotografías artísticas e imágenes de recursos para campañas publicitarias.',
          ai: true,
        },
        {
          name: 'DALL-E 3',
          url: 'https://openai.com/dall-e-3',
          description: 'Generador de imágenes que interpreta increíblemente bien el contexto para creatividades comerciales.',
          ai: true,
        }
      ]
    },
    {
      category: 'Video y Contenido Multimedia',
      icon: Video,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
      items: [
        {
          name: 'Synthesia',
          url: 'https://www.synthesia.io',
          description: 'Creación de videos con avatares hiperrealistas mediante texto. Ideal para formación y tutoriales.',
          ai: true,
        },
        {
          name: 'Runway ML',
          url: 'https://runwayml.com',
          description: 'La suite de IA creativa. Edición mágica de videos y generación de video a partir de texto o imágenes.',
          ai: true,
        },
        {
          name: 'HeyGen',
          url: 'https://www.heygen.com',
          description: 'Fantástico para generar avatares y doblaje de videos usando IA de forma muy realista y natural.',
          ai: true,
        }
      ]
    },
    {
      category: 'Automatización, CRM y Gestión',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900',
      items: [
        {
          name: 'HubSpot',
          url: 'https://www.hubspot.es',
          description: 'CRM líder "All-in-one" para inbound marketing, ventas y servicio. Incluye ahora herramientas de IA integradas.',
          ai: false,
        },
        {
          name: 'Mailchimp',
          url: 'https://mailchimp.com/es',
          description: 'Automatización intuitiva de email marketing y newsletters. Usa IA para optimizar el contenido de tus campañas.',
          ai: true,
        },
        {
          name: 'Hootsuite',
          url: 'https://www.hootsuite.com/es',
          description: 'Programación y gestión centralizada de redes sociales con IA integrada (OwlyWriter) para facilitar el calendario.',
          ai: true,
        }
      ]
    },
    {
      category: 'SEO y Analítica Avanzada',
      icon: BarChart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      items: [
        {
          name: 'Google Analytics 4',
          url: 'https://analytics.google.com',
          description: 'Analítica web indispensable para entender el ciclo de vida del usuario con insights predictivos.',
          ai: true,
        },
        {
          name: 'Semrush',
          url: 'https://es.semrush.com',
          description: 'Herramienta vital de SEO, análisis y espionaje de competencia en palabras clave y pauta digital.',
          ai: false,
        },
        {
          name: 'Ahrefs',
          url: 'https://ahrefs.com/es',
          description: 'Kit de herramientas todo en uno de SEO enfocado en auditorías, construcción de enlaces e investigación de contenido.',
          ai: false,
        }
      ]
    }
  ];

  if (!expanded) {
    return (
      <Card className="bg-gradient-to-br from-cyan-50/80 via-blue-50/50 to-indigo-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-cyan-200 dark:border-cyan-900 shadow-lg mt-6">
        <CardHeader 
          className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 border-b border-cyan-200 dark:border-cyan-900 cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => setExpanded(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-900 dark:text-cyan-100 flex items-center gap-2">
                <Link className="h-6 w-6" />
                Directorio de Herramientas de Marketing e IA
              </CardTitle>
              <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-2">
                Selección curada de los mejores softwares para acelerar tus estrategias digitales
              </p>
            </div>
            <CornerDownRight className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-cyan-50/80 via-blue-50/50 to-indigo-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-cyan-200 dark:border-cyan-900 shadow-lg mt-6">
      <CardHeader className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-950 dark:to-blue-950 border-b border-cyan-200 dark:border-cyan-900 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-cyan-900 dark:text-cyan-100 flex items-center gap-2">
            <Link className="h-6 w-6" />
            Directorio de Herramientas de Marketing e IA
          </CardTitle>
          <p className="text-sm text-cyan-700 dark:text-cyan-300 mt-2">
            Selección curada de los mejores softwares para acelerar tus estrategias digitales
          </p>
        </div>
        <Button
          onClick={() => setExpanded(false)}
          variant="ghost"
          size="sm"
          className="text-cyan-600 hover:bg-cyan-200 dark:text-cyan-400 dark:hover:bg-cyan-900"
        >
          ✕
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-cyan-100 dark:border-slate-700 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <Icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, iDx) => (
                    <div key={iDx} className="group">
                      <div className="flex items-start justify-between">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                        >
                          {item.name}
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        {item.ai && (
                          <Badge variant="secondary" className="px-1.5 py-0 text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 border-none">
                            <Sparkles className="h-3 w-3 mr-0.5" /> IA
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
