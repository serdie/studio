'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ExtLink {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

const links: ExtLink[] = [
  {
    title: 'EUR-Lex: AI Act (Reglamento UE 2024/1689)',
    url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689',
    description: 'Texto oficial completo del Reglamento Europeo de Inteligencia Artificial en español.',
    tags: ['Legislación', 'AI Act', 'Oficial']
  },
  {
    title: 'AEPD - Agencia Española de Protección de Datos',
    url: 'https://www.aepd.es',
    description: 'Autoridad supervisora de protección de datos en España. Guías, resoluciones y herramientas para cumplimiento RGPD.',
    tags: ['GDPR', 'España', 'Oficial']
  },
  {
    title: 'GDPR.eu - Guía completa del RGPD',
    url: 'https://gdpr.eu',
    description: 'Portal con explicaciones claras de cada artículo del GDPR, plantillas y recursos prácticos de cumplimiento.',
    tags: ['GDPR', 'Guía', 'Práctico']
  },
  {
    title: 'AI Ethics Guidelines - Comisión Europea',
    url: 'https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai',
    description: 'Directrices éticas para una IA fiable del grupo de expertos de alto nivel de la UE.',
    tags: ['Ética', 'Guía', 'UE']
  },
  {
    title: 'Partnership on AI',
    url: 'https://partnershiponai.org',
    description: 'Organización global que reúne a investigadores, empresas y sociedad civil para prácticas responsables en IA.',
    tags: ['Ética', 'Comunidad', 'Global']
  },
  {
    title: 'Algorithm Watch',
    url: 'https://algorithmwatch.org',
    description: 'ONG de investigación que monitoriza y analiza sistemas de toma de decisiones automatizadas y su impacto social.',
    tags: ['Auditoría', 'Sesgos', 'Investigación']
  },
  {
    title: 'AI Fairness 360 (IBM)',
    url: 'https://aif360.mybluemix.net',
    description: 'Toolkit open source de IBM para examinar, reportar y mitigar sesgos en modelos de machine learning.',
    tags: ['Herramienta', 'Sesgos', 'Open Source']
  },
  {
    title: 'SHAP - Documentación oficial',
    url: 'https://shap.readthedocs.io',
    description: 'Librería de explicabilidad (XAI) basada en valores de Shapley para interpretar predicciones de modelos ML.',
    tags: ['XAI', 'Herramienta', 'Python']
  },
  {
    title: 'LIME - Explicabilidad Local',
    url: 'https://github.com/marcotcr/lime',
    description: 'Herramienta open source para generar explicaciones locales interpretables de cualquier modelo ML.',
    tags: ['XAI', 'Open Source', 'GitHub']
  },
  {
    title: 'NIST AI Risk Management Framework',
    url: 'https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence',
    description: 'Marco de gestión de riesgos de IA del Instituto Nacional de Estándares y Tecnología de EE.UU.',
    tags: ['Gobernanza', 'Framework', 'NIST']
  },
  {
    title: 'Responsible AI Practices - Google',
    url: 'https://ai.google/responsibility/responsible-ai-practices/',
    description: 'Prácticas y principios de IA responsable de Google para desarrolladores y equipos de producto.',
    tags: ['Ética', 'Guía', 'Google']
  },
  {
    title: 'Model Cards for Model Reporting',
    url: 'https://modelcards.withgoogle.com/about',
    description: 'Framework de documentación transparente de modelos ML que incluye rendimiento por subgrupos, limitaciones y sesgos conocidos.',
    tags: ['Transparencia', 'Framework', 'Google']
  },
];

export default function Module7ExternalLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card
        className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900">Enlaces Externos - Módulo 7</h3>
                <p className="text-sm text-emerald-700">
                  {open ? '12 recursos sobre ética, GDPR, AI Act y XAI' : 'Legislación, herramientas de auditoría y guías de IA responsable — Haz clic para ver'}
                </p>
              </div>
            </div>
            <ChevronDown className={`h-6 w-6 text-emerald-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-300">
          {links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-emerald-900 group-hover:text-emerald-600 text-sm">{link.title}</h4>
                <ExternalLink className="h-4 w-4 text-emerald-400 group-hover:text-emerald-600 flex-shrink-0 ml-2" />
              </div>
              <p className="text-xs text-emerald-700 mb-2">{link.description}</p>
              <div className="flex flex-wrap gap-1">
                {link.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">{tag}</Badge>
                ))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
