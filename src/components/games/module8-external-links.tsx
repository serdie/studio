'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ExtLink { title: string; url: string; description: string; tags: string[]; }

const links: ExtLink[] = [
  { title: 'Salesforce Einstein Analytics', url: 'https://www.salesforce.com/products/einstein-analytics/overview/', description: 'Plataforma líder de IA para CRM, ventas predictivas y análisis de clientes.', tags: ['Marketing', 'Ventas', 'CRM'] },
  { title: 'HubSpot - Marketing Hub con IA', url: 'https://www.hubspot.com/products/marketing', description: 'Suite de marketing con IA para automatización, email, SEO y análisis predictivo.', tags: ['Marketing', 'Automatización', 'Freemium'] },
  { title: 'Workday - People Analytics', url: 'https://www.workday.com/en-us/products/human-capital-management/people-analytics.html', description: 'Plataforma de RRHH con analytics avanzados, predicción de rotación y planificación de talento.', tags: ['RRHH', 'Analytics', 'Enterprise'] },
  { title: 'Gong - Revenue Intelligence', url: 'https://www.gong.io', description: 'IA que analiza llamadas y emails de ventas para identificar patrones de éxito y coaching.', tags: ['Ventas', 'IA Conversacional', 'Revenue'] },
  { title: 'UiPath - RPA + IA', url: 'https://www.uipath.com', description: 'Plataforma líder de automatización robótica de procesos con IA integrada para finanzas y operaciones.', tags: ['RPA', 'Finanzas', 'Automatización'] },
  { title: 'Blue Yonder - Supply Chain AI', url: 'https://blueyonder.com', description: 'IA para optimización de cadena de suministro, demand forecasting y gestión de inventario.', tags: ['Logística', 'Supply Chain', 'Predicción'] },
  { title: 'C3.ai - Enterprise AI', url: 'https://c3.ai', description: 'Plataforma de IA empresarial para mantenimiento predictivo, detección de fraude y optimización energética.', tags: ['Operaciones', 'IoT', 'Enterprise'] },
  { title: 'Drift - Conversational Marketing', url: 'https://www.salesloft.com/platform/drift/', description: 'Chatbots de IA para cualificación de leads y conversational marketing B2B.', tags: ['Marketing', 'Chatbot', 'B2B'] },
  { title: 'Harvard Business Review - AI & Business', url: 'https://hbr.org/topic/subject/ai-and-machine-learning', description: 'Artículos, casos de estudio e investigación sobre IA aplicada a la empresa.', tags: ['Casos', 'Investigación', 'Estrategia'] },
  { title: 'McKinsey - The State of AI', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai', description: 'Informe anual sobre adopción de IA en empresas globales con datos y tendencias.', tags: ['Informe', 'Tendencias', 'Global'] },
  { title: 'Landing AI - Visual Inspection', url: 'https://landing.ai', description: 'IA de visión artificial para control de calidad en manufactura (fundada por Andrew Ng).', tags: ['Operaciones', 'Visión IA', 'Calidad'] },
  { title: 'Featurespace - Fraud Detection', url: 'https://www.featurespace.com', description: 'IA especializada en detección de fraude financiero y prevención de delitos económicos en tiempo real.', tags: ['Finanzas', 'Fraude', 'Real-time'] },
];

export default function Module8ExternalLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white cursor-pointer" onClick={() => setOpen(!open)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center shadow-lg">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900">Enlaces Externos - Módulo 8</h3>
                <p className="text-sm text-indigo-700">{open ? '12 herramientas y recursos para IA en áreas funcionales' : 'Plataformas, casos de estudio e informes empresariales — Haz clic para ver'}</p>
              </div>
            </div>
            <ChevronDown className={`h-6 w-6 text-indigo-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-300">
          {links.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="group block p-4 rounded-xl bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-indigo-900 group-hover:text-indigo-600 text-sm">{link.title}</h4>
                <ExternalLink className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600 flex-shrink-0 ml-2" />
              </div>
              <p className="text-xs text-indigo-700 mb-2">{link.description}</p>
              <div className="flex flex-wrap gap-1">
                {link.tags.map(tag => (<Badge key={tag} variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">{tag}</Badge>))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
