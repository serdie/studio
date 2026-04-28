'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  DollarSign,
  Bot,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  Lightbulb,
  HelpCircle,
  Target,
} from 'lucide-react';

type Category = 'SEO' | 'SEM' | 'GEO';

interface ConceptCard {
  id: number;
  text: string;
  category: Category;
  explanation: string;
}

const CATEGORY_META: Record<
  Category,
  { label: string; icon: typeof Search; color: string; bg: string; border: string; tag: string; desc: string }
> = {
  SEO: {
    label: 'SEO',
    icon: Search,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    tag: 'bg-emerald-500',
    desc: 'Search Engine Optimization · Resultados orgánicos en buscadores (Google, Bing). Sin pagar por clic.',
  },
  SEM: {
    label: 'SEM',
    icon: DollarSign,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    tag: 'bg-blue-500',
    desc: 'Search Engine Marketing · Anuncios pagados (Google Ads, Bing Ads). Pagas por clic o impresión.',
  },
  GEO: {
    label: 'GEO',
    icon: Bot,
    color: 'text-fuchsia-700',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-300',
    tag: 'bg-fuchsia-500',
    desc: 'Generative Engine Optimization · Aparecer y ser citado en respuestas de IAs (ChatGPT, Perplexity, Gemini, Copilot).',
  },
};

const CARDS: ConceptCard[] = [
  {
    id: 1,
    text: 'Optimizar el title tag y la meta description para que Google muestre el resultado con mejor CTR.',
    category: 'SEO',
    explanation: 'El title y la meta description son elementos clásicos del SEO on-page; influyen en cómo aparece tu resultado en la SERP orgánica.',
  },
  {
    id: 2,
    text: 'Pagar por aparecer en la posición 1 cuando alguien busca "asesoría laboral Madrid".',
    category: 'SEM',
    explanation: 'Comprar clics mediante Google Ads (CPC) es la esencia de SEM: pujas por palabras clave para aparecer en los anuncios patrocinados.',
  },
  {
    id: 3,
    text: 'Estructurar la página con H1/H2 claros y respuestas directas al inicio para que ChatGPT pueda citar tu contenido.',
    category: 'GEO',
    explanation: 'Las IAs generativas extraen mejor las respuestas cortas y bien estructuradas. Optimizar para citas y bullets resumen es GEO puro.',
  },
  {
    id: 4,
    text: 'Construir backlinks de calidad desde medios y blogs del sector para mejorar la autoridad del dominio.',
    category: 'SEO',
    explanation: 'El link building sigue siendo una palanca clave del SEO off-page: la autoridad influye en posiciones orgánicas.',
  },
  {
    id: 5,
    text: 'Configurar palabras clave negativas (-gratis, -tutorial) para no gastar presupuesto en búsquedas que no convierten.',
    category: 'SEM',
    explanation: 'Las negativas son una palanca exclusiva de SEM (Google Ads): controlan en qué búsquedas NO quieres aparecer pagando.',
  },
  {
    id: 6,
    text: 'Conseguir que Perplexity cite tu web como fuente cuando alguien pregunta "mejores CRM para pymes".',
    category: 'GEO',
    explanation: 'El objetivo de GEO es ser una fuente que las IAs generativas usen y referencien al responder. Las respuestas de Perplexity incluyen enlaces a las fuentes citadas.',
  },
  {
    id: 7,
    text: 'Mejorar el Core Web Vitals (LCP, INP, CLS) para que Google posicione mejor la web.',
    category: 'SEO',
    explanation: 'Las métricas de Core Web Vitals son señal de UX para el ranking orgánico de Google: SEO técnico.',
  },
  {
    id: 8,
    text: 'Crear 3 grupos de anuncios distintos (uno por intención) y testar 3 copies por grupo.',
    category: 'SEM',
    explanation: 'La estructura campaña → grupos → ads + testing es SEM: optimizas Quality Score y CTR de tus anuncios.',
  },
  {
    id: 9,
    text: 'Publicar contenido con datos propios y estudios originales para que las IAs lo usen como fuente autoritativa.',
    category: 'GEO',
    explanation: 'Las IAs prefieren fuentes con datos originales y E-E-A-T (experiencia, expertise, autoridad, confianza). Tener data propia te hace citable.',
  },
  {
    id: 10,
    text: 'Trabajar la intención de búsqueda y el cluster de keywords (1 pilar + 6 clusters) para evitar canibalización.',
    category: 'SEO',
    explanation: 'Mapeo de keywords + topical clusters + arquitectura interna son el corazón de la estrategia SEO de contenidos.',
  },
  {
    id: 11,
    text: 'Pujar más alto en horario laboral porque tu CVR es 3× mayor de 9:00 a 18:00.',
    category: 'SEM',
    explanation: 'Las modificaciones por programación horaria (dayparting) son una palanca de optimización exclusiva de plataformas SEM.',
  },
  {
    id: 12,
    text: 'Incluir FAQs estructuradas con datos concretos y unidades para que ChatGPT extraiga respuestas precisas.',
    category: 'GEO',
    explanation: 'Las IAs extraen mejor info de bloques Q&A con respuestas autocontenidas. Es una técnica clave de GEO (parecida pero no igual a Schema FAQ).',
  },
  {
    id: 13,
    text: 'Generar contenido evergreen optimizado para "qué es" + "cómo hacer" + "comparativas" para ranquear orgánicamente.',
    category: 'SEO',
    explanation: 'Producir contenido informacional/comparativo + transaccional para cubrir el funnel desde TOFU es estrategia clásica de SEO de contenidos.',
  },
  {
    id: 14,
    text: 'Asegurar que la marca aparezca en Wikipedia, foros como Reddit y reviews especializadas que las IAs usan para entrenarse.',
    category: 'GEO',
    explanation: 'Las IAs se entrenan y consultan en tiempo real fuentes como Wikipedia, Reddit, G2, Capterra. Aparecer ahí aumenta la probabilidad de ser citado.',
  },
  {
    id: 15,
    text: 'Configurar conversiones en Google Ads (Lead, Compra, Demo) e importar audiencias remarketing.',
    category: 'SEM',
    explanation: 'Tracking de conversiones + audiencias de remarketing son palancas operativas dentro de plataformas SEM.',
  },
  {
    id: 16,
    text: 'Añadir Schema.org (Article, Product, FAQ) para que los buscadores entiendan mejor el contenido.',
    category: 'SEO',
    explanation: 'Datos estructurados (Schema) son SEO técnico: ayudan a Google a interpretar la página y mostrar rich results.',
  },
  {
    id: 17,
    text: 'Escribir respuestas concisas (40-80 palabras) con la conclusión al inicio porque así las IAs las citan textualmente.',
    category: 'GEO',
    explanation: 'Los modelos generativos premian respuestas auto-contenidas y bien resumidas: el formato "respuesta directa primero" multiplica las citas.',
  },
  {
    id: 18,
    text: 'Asignar presupuesto diario por campaña y revisar CPA/ROAS semanalmente para reasignar puja.',
    category: 'SEM',
    explanation: 'Gestión de presupuesto + ROAS son métricas y decisiones propias de SEM (medios pagados).',
  },
];

interface CardState {
  picked?: Category;
  correct: boolean | null;
}

export default function SeoSemGeoGame() {
  const [states, setStates] = useState<Record<number, CardState>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});

  const handleClassify = (cardId: number, category: Category, correctCategory: Category) => {
    if (states[cardId]?.correct === true) return;
    const isCorrect = category === correctCategory;
    setStates({ ...states, [cardId]: { picked: category, correct: isCorrect } });
    setRevealedExplanations({ ...revealedExplanations, [cardId]: true });
  };

  const reset = () => {
    setStates({});
    setRevealedExplanations({});
  };

  const stats = useMemo(() => {
    const answered = Object.values(states).filter((s) => s.picked);
    const correctOnFirst = Object.values(states).filter((s) => s.correct === true).length;
    return {
      answered: answered.length,
      total: CARDS.length,
      score: Math.round((correctOnFirst / CARDS.length) * 100),
      finished: correctOnFirst === CARDS.length,
    };
  }, [states]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-blue-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Juego · SEO vs SEM vs GEO</h1>
            <p className="text-sm text-slate-600">
              Aprende posicionamiento orgánico, anuncios pagados y posicionamiento en IAs generativas clasificando situaciones reales.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <Search className="h-3 w-3 mr-1" /> SEO orgánico
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <DollarSign className="h-3 w-3 mr-1" /> SEM pagado
          </Badge>
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200">
            <Bot className="h-3 w-3 mr-1" /> GEO en IAs
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Sparkles className="h-3 w-3 mr-1" /> {CARDS.length} situaciones
          </Badge>
        </div>
      </div>

      {/* Mini-cheatsheet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          const Icon = meta.icon;
          return (
            <Card key={cat} className={`border-2 ${meta.border} ${meta.bg}`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg ${meta.tag} flex items-center justify-center text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className={`font-bold text-lg ${meta.color}`}>{meta.label}</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{meta.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
        <CardContent className="p-4 text-sm text-slate-700 flex gap-3 items-start">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Cómo se juega:</strong> Lee cada situación y pulsa el botón de la categoría que crees correcta
            (<span className="font-semibold text-emerald-700">SEO</span>,{' '}
            <span className="font-semibold text-blue-700">SEM</span> o{' '}
            <span className="font-semibold text-fuchsia-700">GEO</span>). Si fallas, podrás reintentarlo. Cada respuesta
            correcta desbloquea una explicación corta. Tu objetivo: clasificar las {CARDS.length} a la primera.
          </div>
        </CardContent>
      </Card>

      {/* Score bar */}
      <Card className="border-slate-200 bg-white">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Trophy className={`h-6 w-6 ${stats.finished ? 'text-amber-500' : 'text-slate-400'}`} />
            <div>
              <div className="text-sm text-slate-600">Aciertos a la primera</div>
              <div className="text-xl font-bold text-slate-800">
                {Object.values(states).filter((s) => s.correct === true).length} / {CARDS.length}
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-blue-500 to-fuchsia-500 transition-all"
                style={{ width: `${stats.score}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1 text-right">{stats.score}%</div>
          </div>
          <Button variant="outline" onClick={reset} className="border-slate-300 text-slate-700 hover:bg-slate-100">
            <RotateCcw className="h-4 w-4 mr-2" /> Reiniciar
          </Button>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CARDS.map((card) => {
          const state = states[card.id];
          const meta = CATEGORY_META[card.category];
          const showExplanation = revealedExplanations[card.id];
          const correct = state?.correct === true;
          const wrong = state && state.correct === false;

          return (
            <Card
              key={card.id}
              className={`border-2 transition-all ${
                correct
                  ? `${meta.border} ${meta.bg}`
                  : wrong
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <div
                    className={`h-7 w-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      correct ? `${meta.tag} text-white` : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {card.id}
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{card.text}</p>
                </div>

                {!correct && (
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
                      const m = CATEGORY_META[cat];
                      const Icon = m.icon;
                      const isPickedWrong = state?.picked === cat && state.correct === false;
                      return (
                        <Button
                          key={cat}
                          variant="outline"
                          size="sm"
                          onClick={() => handleClassify(card.id, cat, card.category)}
                          className={`border-2 transition-all ${
                            isPickedWrong
                              ? 'border-red-400 bg-red-100 text-red-700'
                              : `${m.border} hover:${m.bg} ${m.color}`
                          }`}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {m.label}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {correct && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`h-4 w-4 ${meta.color}`} />
                    <span className={`font-semibold ${meta.color}`}>Correcto · {meta.label}</span>
                  </div>
                )}

                {wrong && (
                  <div className="flex items-center gap-2 text-sm text-red-700">
                    <XCircle className="h-4 w-4" />
                    <span className="font-semibold">No es {state?.picked} · prueba otra</span>
                  </div>
                )}

                {showExplanation && (
                  <div className={`p-2 rounded-md text-xs ${meta.bg} border ${meta.border}`}>
                    <div className="flex gap-2 items-start">
                      <HelpCircle className={`h-3 w-3 flex-shrink-0 mt-0.5 ${meta.color}`} />
                      <div className="text-slate-700 leading-relaxed">
                        <span className={`font-semibold ${meta.color}`}>Por qué es {card.category}: </span>
                        {card.explanation}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {stats.finished && (
        <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
          <CardContent className="p-6 text-center space-y-3">
            <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-800">¡Has clasificado todas las situaciones!</h3>
            <p className="text-sm text-slate-700 max-w-2xl mx-auto">
              Diferenciar SEO, SEM y GEO te permite elegir la palanca correcta para cada objetivo: visibilidad orgánica,
              tráfico inmediato pagado, o presencia en respuestas de IA generativa. La estrategia ganadora suele combinar
              las tres.
            </p>
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-emerald-500 via-blue-500 to-fuchsia-500 text-white hover:opacity-90"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Volver a jugar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
