'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Filter } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  url: string;
  source: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Cómo HubSpot duplicó su base de usuarios con marketing automatizado',
    company: 'HubSpot',
    industry: 'SaaS / Marketing',
    challenge: 'Escalar adquisición de clientes manteniendo eficiencia de costes',
    solution: 'Marketing automation, email nurturing personalizado, content marketing estratégico',
    results: ['200% aumento en leads', '40% reducción en CAC', 'IPO exitosa'],
    url: 'https://blog.hubspot.com',
    source: 'HubSpot Blog',
    difficulty: 'intermedio'
  },
  {
    id: '2',
    title: 'Estrategia de segmentación de Spotify',
    company: 'Spotify',
    industry: 'Streaming / Música',
    challenge: 'Retener usuarios en mercado altamente competitivo',
    solution: 'Personalization a escala, curación por IA, social playlists',
    results: ['75% reducción en churn', 'User engagement +300%', 'Premium conversión +50%'],
    url: 'https://spotify.com/case-studies',
    source: 'Spotify Case Studies',
    difficulty: 'avanzado'
  },
  {
    id: '3',
    title: 'Slack: de startup a $1B en valuación con Product Marketing',
    company: 'Slack',
    industry: 'SaaS / Colaboración',
    challenge: 'Penetrar mercado dominado por competitors establecidos',
    solution: 'Estrategia freemium, integración con otros tools, community building',
    results: ['Rápida adopción empresarial', '$1B valuation pre-IPO', 'Market leader'],
    url: 'https://slack.com/resources',
    source: 'Slack Resources',
    difficulty: 'avanzado'
  },
  {
    id: '4',
    title: 'Cómo Nike optimizó campañas con IA y marketing predictivo',
    company: 'Nike',
    industry: 'E-commerce / Deportes',
    challenge: 'Mejorar relevancia de anuncios y conversión',
    solution: 'Machine learning, real-time bidding, personalization engine',
    results: ['ROAS +45%', 'Conversión +28%', 'Customer lifetime value +60%'],
    url: 'https://business.nike.com/insights',
    source: 'Nike Business Insights',
    difficulty: 'avanzado'
  },
  {
    id: '5',
    title: 'Mailchimp: crecimiento de 0 a unicornio con content marketing',
    company: 'Mailchimp',
    industry: 'SaaS / Email Marketing',
    challenge: 'Competir contra players multimillonarios',
    solution: 'Content strategy, community, brand humanizado, resources gratuitos',
    results: ['12M+ usuarios activos', '$12B valuación', 'Adquisición por Intuit'],
    url: 'https://mailchimp.com/resources',
    source: 'Mailchimp Resources',
    difficulty: 'intermedio'
  },
  {
    id: '6',
    title: 'Amazon: estrategia de marketing data-driven',
    company: 'Amazon',
    industry: 'E-commerce / Tech',
    challenge: 'Optimizar experiencia de comprador a escala masiva',
    solution: 'Big data, recomendaciones IA, behavioral targeting, dynamic pricing',
    results: ['Conversión líder industria', 'Retención 85%', 'AOV optimization'],
    url: 'https://amazon.com/business',
    source: 'Amazon for Business',
    difficulty: 'avanzado'
  },
  {
    id: '7',
    title: 'Airbnb: cómo transformó viajes con community-driven marketing',
    company: 'Airbnb',
    industry: 'Travel / Marketplace',
    challenge: 'Generar confianza en nuevos usuarios y hosts',
    solution: 'User-generated content, storytelling, social proof, referral programs',
    results: ['Global presence en 200+ países', 'IPO exitosa', '7M+ listings'],
    url: 'https://press.airbnb.com',
    source: 'Airbnb Press',
    difficulty: 'intermedio'
  },
  {
    id: '8',
    title: 'Notion: marketing viral con producto excelente',
    company: 'Notion',
    industry: 'SaaS / Productividad',
    challenge: 'Crecimiento sin presupuesto de marketing masivo',
    solution: 'Product-led growth, community templates, creator program, freemium',
    results: ['10M+ usuarios', 'Crecimiento 100x', 'Valuación $10B'],
    url: 'https://notion.so/blog',
    source: 'Notion Blog',
    difficulty: 'intermedio'
  }
];

export default function MarketingCaseStudies() {
  const [filter, setFilter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const industries = Array.from(new Set(caseStudies.map(cs => cs.industry)));
  const difficulties = ['básico', 'intermedio', 'avanzado'];

  const filteredStudies = caseStudies.filter(cs => {
    if (filter && !cs.industry.includes(filter)) return false;
    if (difficulty && cs.difficulty !== difficulty) return false;
    return true;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'básico':
        return 'bg-green-100 text-green-800 dark:bg-green-900';
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900';
      case 'avanzado':
        return 'bg-red-100 text-red-800 dark:bg-red-900';
      default:
        return '';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-purple-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border-indigo-200 dark:border-indigo-900">
      <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-950 dark:to-blue-950 border-b border-indigo-200 dark:border-indigo-900">
        <CardTitle className="text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Casos de Estudio & Recursos
        </CardTitle>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-2">
          Aprende de empresas líderes: estrategias reales de marketing con IA
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Filtros */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Filtrar por industria:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setFilter(null)}
                  variant={filter === null ? 'default' : 'outline'}
                  className={filter === null ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
                >
                  Todas
                </Button>
                {industries.map(ind => (
                  <Button
                    key={ind}
                    onClick={() => setFilter(ind)}
                    variant={filter === ind ? 'default' : 'outline'}
                    size="sm"
                    className={filter === ind ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
                  >
                    {ind}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Filtrar por dificultad:</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setDifficulty(null)}
                  variant={difficulty === null ? 'default' : 'outline'}
                  className={difficulty === null ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
                >
                  Todas
                </Button>
                {difficulties.map(diff => (
                  <Button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    variant={difficulty === diff ? 'default' : 'outline'}
                    size="sm"
                    className={difficulty === diff ? 'bg-indigo-500 hover:bg-indigo-600' : ''}
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Casos de estudio */}
          <div className="space-y-4">
            {filteredStudies.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                No hay casos disponibles con estos filtros
              </p>
            ) : (
              filteredStudies.map(cs => (
                <div
                  key={cs.id}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-900 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {cs.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {cs.company} • {cs.industry}
                        </p>
                      </div>
                      <Badge className={getDifficultyColor(cs.difficulty)}>
                        {cs.difficulty}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Desafío:</p>
                        <p className="text-slate-700 dark:text-slate-300">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Solución:</p>
                        <p className="text-slate-700 dark:text-slate-300">{cs.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Resultados:</p>
                        <ul className="space-y-1">
                          {cs.results.slice(0, 2).map((result, idx) => (
                            <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                              <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                              <span className="text-xs">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Fuente: {cs.source}
                      </p>
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 text-sm font-medium"
                      >
                        Leer más
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
