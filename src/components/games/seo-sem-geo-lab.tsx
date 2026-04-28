'use client';

import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  DollarSign,
  Bot,
  CheckCircle2,
  XCircle,
  Sparkles,
  Lightbulb,
  RotateCcw,
  Trophy,
  FlaskConical,
  Wand2,
  Type,
  AlertTriangle,
} from 'lucide-react';

/* ---------------------------------------------------------------------------
 * STATION 1 · SEO KEYWORD WORKSHOP
 * -------------------------------------------------------------------------*/

type Intent = 'informacional' | 'comparativa' | 'transaccional' | 'navegacional';

interface SeedKeyword {
  text: string;
  intent: Intent;
}

interface Sector {
  id: string;
  name: string;
  emoji: string;
  pillarHint: string;
  keywords: SeedKeyword[];
}

const SECTORS: Sector[] = [
  {
    id: 'asesoria',
    name: 'Asesoría laboral / fiscal',
    emoji: '⚖️',
    pillarHint: 'Guía completa: cómo elegir asesoría laboral para tu pyme',
    keywords: [
      { text: 'qué es una asesoría laboral', intent: 'informacional' },
      { text: 'mejor asesoría laboral Madrid', intent: 'comparativa' },
      { text: 'contratar asesoría laboral online', intent: 'transaccional' },
      { text: 'asesoría laboral Velasco', intent: 'navegacional' },
      { text: 'cómo calcular finiquito', intent: 'informacional' },
      { text: 'asesoría laboral vs gestoría', intent: 'comparativa' },
      { text: 'precio asesoría laboral pyme', intent: 'transaccional' },
      { text: 'asesoría laboral cerca de mí', intent: 'navegacional' },
    ],
  },
  {
    id: 'moda',
    name: 'Moda / Tienda online',
    emoji: '👗',
    pillarHint: 'Guía de tallas y devoluciones para comprar moda online sin equivocarte',
    keywords: [
      { text: 'cómo combinar abrigo de pelo', intent: 'informacional' },
      { text: 'mejor tienda online ropa mujer', intent: 'comparativa' },
      { text: 'comprar vestido fiesta talla 44', intent: 'transaccional' },
      { text: 'Zara online España', intent: 'navegacional' },
      { text: 'qué es la moda sostenible', intent: 'informacional' },
      { text: 'Massimo Dutti vs Mango calidad', intent: 'comparativa' },
      { text: 'rebajas zapatillas Nike mujer', intent: 'transaccional' },
      { text: 'tienda Shein madrid', intent: 'navegacional' },
    ],
  },
  {
    id: 'crm',
    name: 'Software CRM / SaaS B2B',
    emoji: '💻',
    pillarHint: 'Cómo elegir un CRM para pymes: funcionalidades, precio y errores comunes',
    keywords: [
      { text: 'qué es un CRM y para qué sirve', intent: 'informacional' },
      { text: 'mejor CRM para pymes 2026', intent: 'comparativa' },
      { text: 'comprar HubSpot Starter', intent: 'transaccional' },
      { text: 'login Pipedrive', intent: 'navegacional' },
      { text: 'cómo migrar contactos a un CRM', intent: 'informacional' },
      { text: 'HubSpot vs Salesforce precio', intent: 'comparativa' },
      { text: 'demo gratis Salesforce', intent: 'transaccional' },
      { text: 'Zoho CRM España', intent: 'navegacional' },
    ],
  },
];

const INTENT_META: Record<Intent, { label: string; color: string; bg: string; border: string; description: string }> = {
  informacional: {
    label: 'Informacional',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    description: 'El usuario quiere aprender (qué es, cómo, por qué). Página tipo guía/blog.',
  },
  comparativa: {
    label: 'Comparativa',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    description: 'Está evaluando opciones (mejor, vs, alternativas, ranking). Página tipo comparativa/listado.',
  },
  transaccional: {
    label: 'Transaccional',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    description: 'Quiere comprar/contratar/probar. Página tipo producto/landing con CTA fuerte.',
  },
  navegacional: {
    label: 'Navegacional',
    color: 'text-fuchsia-700',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-300',
    description: 'Busca una marca/dominio concreto. Página tipo home/branded.',
  },
};

function SeoKeywordStation() {
  const [sectorId, setSectorId] = useState<string>(SECTORS[0].id);
  const [classifications, setClassifications] = useState<Record<string, Intent>>({});
  const [submitted, setSubmitted] = useState(false);

  const sector = SECTORS.find((s) => s.id === sectorId)!;
  const allClassified = sector.keywords.every((k) => classifications[k.text]);
  const correctCount = sector.keywords.filter((k) => classifications[k.text] === k.intent).length;

  const handleClassify = (kw: string, intent: Intent) => {
    if (submitted) return;
    setClassifications({ ...classifications, [kw]: intent });
  };

  const reset = () => {
    setClassifications({});
    setSubmitted(false);
  };

  const switchSector = (id: string) => {
    setSectorId(id);
    setClassifications({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
              <Wand2 className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900">Misión SEO · Clasifica las keywords por intención de búsqueda</h3>
              <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                Elige un sector. Recibirás 8 keywords semilla. Clasifica cada una en{' '}
                <strong>Informacional</strong>, <strong>Comparativa</strong>, <strong>Transaccional</strong> o{' '}
                <strong>Navegacional</strong>. Al final verás aciertos, fallos y un <strong>cluster sugerido</strong>{' '}
                para tu sector.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <Button
                key={s.id}
                variant={s.id === sectorId ? 'default' : 'outline'}
                size="sm"
                onClick={() => switchSector(s.id)}
                className={s.id === sectorId ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {(Object.keys(INTENT_META) as Intent[]).map((i) => {
          const meta = INTENT_META[i];
          return (
            <div key={i} className={`p-2 rounded-lg border ${meta.border} ${meta.bg}`}>
              <div className={`text-xs font-bold ${meta.color}`}>{meta.label}</div>
              <div className="text-[10px] text-slate-700 leading-snug">{meta.description}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {sector.keywords.map((k) => {
          const userIntent = classifications[k.text];
          const correct = submitted && userIntent === k.intent;
          const wrong = submitted && userIntent && userIntent !== k.intent;
          const correctMeta = INTENT_META[k.intent];

          return (
            <Card
              key={k.text}
              className={`border-2 transition-colors ${
                correct
                  ? 'border-green-300 bg-green-50'
                  : wrong
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <CardContent className="p-3 flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 flex items-center gap-2">
                  <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="font-mono text-sm text-slate-800">{k.text}</span>
                  {submitted && correct && (
                    <Badge variant="outline" className="text-[10px] bg-green-100 text-green-700 border-green-300">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> OK
                    </Badge>
                  )}
                  {submitted && wrong && (
                    <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-300">
                      <XCircle className="h-3 w-3 mr-1" /> Era {correctMeta.label}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {(Object.keys(INTENT_META) as Intent[]).map((i) => {
                    const meta = INTENT_META[i];
                    const isPicked = userIntent === i;
                    return (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        onClick={() => handleClassify(k.text, i)}
                        disabled={submitted}
                        className={`text-xs h-7 px-2 ${
                          isPicked && !submitted ? `${meta.border} ${meta.bg} ${meta.color}` : ''
                        } ${submitted && i === k.intent ? `${meta.border} ${meta.bg} ${meta.color} font-bold` : ''}`}
                      >
                        {meta.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex items-center justify-between p-3 bg-emerald-100 border border-emerald-200 rounded-lg">
          <span className="text-sm text-emerald-900">
            {Object.keys(classifications).length}/{sector.keywords.length} clasificadas
          </span>
          <Button
            disabled={!allClassified}
            onClick={() => setSubmitted(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" /> Validar mapa
          </Button>
        </div>
      )}

      {submitted && (
        <Card
          className={`border-2 ${
            correctCount >= 7
              ? 'border-green-300 bg-green-50'
              : correctCount >= 5
                ? 'border-amber-300 bg-amber-50'
                : 'border-red-300 bg-red-50'
          }`}
        >
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Trophy className={`h-8 w-8 ${correctCount >= 7 ? 'text-green-600' : 'text-amber-600'}`} />
              <div>
                <div className="font-bold text-slate-800">
                  {correctCount}/{sector.keywords.length} clasificaciones correctas
                </div>
                <div className="text-xs text-slate-700">
                  {correctCount >= 7
                    ? 'Dominas el mapa de intenciones — clave para evitar canibalización SEO.'
                    : correctCount >= 5
                      ? 'Buen camino: revisa las pistas (mejor/vs/comprar/marca) para discriminar mejor.'
                      : 'Revisa las pistas: "qué/cómo" → informacional, "mejor/vs" → comparativa, "comprar/precio" → transaccional, "marca/login" → navegacional.'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-emerald-200 text-xs">
              <div className="font-semibold text-emerald-900 mb-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Cluster sugerido para {sector.name}
              </div>
              <div className="text-slate-700 leading-relaxed">
                <strong>Pilar (informacional):</strong> {sector.pillarHint}
                <br />
                <strong>Satélites:</strong>{' '}
                {sector.keywords
                  .filter((k) => k.intent !== 'navegacional')
                  .slice(0, 4)
                  .map((k) => k.text)
                  .join(' · ')}
              </div>
            </div>

            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-3 w-3 mr-1" /> Reintentar / cambiar sector
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * STATION 2 · SEM AD BUILDER
 * -------------------------------------------------------------------------*/

interface AdBrief {
  id: string;
  product: string;
  keyword: string;
  promise: string;
  cta: string;
  forbidden: string[];
  required: string[];
}

const AD_BRIEFS: AdBrief[] = [
  {
    id: 'asesoria-online',
    product: 'Asesoría laboral online para autónomos',
    keyword: 'asesoría laboral online',
    promise: 'Primer mes gratis · Sin permanencia',
    cta: 'Pruébalo gratis',
    forbidden: ['gratis para siempre', 'la mejor asesoría', 'número 1', '100% garantizado'],
    required: ['asesoría', 'gratis'],
  },
  {
    id: 'crm-pyme',
    product: 'CRM para pymes con plan desde 19 € / mes',
    keyword: 'CRM para pymes',
    promise: 'Setup en 24h · Soporte en español',
    cta: 'Empieza una prueba',
    forbidden: ['el mejor CRM del mundo', 'sin coste para siempre', 'ranking #1'],
    required: ['CRM', 'pymes'],
  },
];

const FORBIDDEN_GENERIC = [
  'el mejor',
  'mejor del mundo',
  'número 1',
  'numero 1',
  'líder mundial',
  'lider mundial',
  '100% garantizado',
  'garantía total',
  'gratis para siempre',
];

function SemAdStation() {
  const [briefId, setBriefId] = useState(AD_BRIEFS[0].id);
  const [h1, setH1] = useState('');
  const [h2, setH2] = useState('');
  const [desc, setDesc] = useState('');

  const brief = AD_BRIEFS.find((b) => b.id === briefId)!;

  const switchBrief = (id: string) => {
    setBriefId(id);
    setH1('');
    setH2('');
    setDesc('');
  };

  const checks = useMemo(() => {
    const lc = `${h1} ${h2} ${desc}`.toLowerCase();
    const requiredOk = brief.required.every((r) => lc.includes(r.toLowerCase()));
    const forbiddenHits = [...brief.forbidden, ...FORBIDDEN_GENERIC].filter((f) => lc.includes(f.toLowerCase()));
    const ctaOk = lc.includes('prueba') || lc.includes('empieza') || lc.includes('contrata') || lc.includes('descubre') || lc.includes('reserva');
    const promiseOk = brief.promise
      .split('·')
      .map((p) => p.trim().toLowerCase().split(/\s+/)[0])
      .filter(Boolean)
      .some((token) => lc.includes(token));

    return {
      h1Length: h1.length,
      h1Ok: h1.length > 0 && h1.length <= 30,
      h2Length: h2.length,
      h2Ok: h2.length > 0 && h2.length <= 30,
      descLength: desc.length,
      descOk: desc.length > 0 && desc.length <= 90,
      requiredOk,
      forbiddenHits,
      ctaOk,
      promiseOk,
    };
  }, [h1, h2, desc, brief]);

  const allLengthsOk = checks.h1Ok && checks.h2Ok && checks.descOk;
  const score = useMemo(() => {
    let s = 0;
    if (checks.h1Ok) s += 15;
    if (checks.h2Ok) s += 15;
    if (checks.descOk) s += 15;
    if (checks.requiredOk) s += 20;
    if (checks.forbiddenHits.length === 0 && (h1 || h2 || desc)) s += 15;
    if (checks.ctaOk) s += 10;
    if (checks.promiseOk) s += 10;
    return s;
  }, [checks, h1, h2, desc]);

  return (
    <div className="space-y-5">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-white">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
              <Type className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900">Misión SEM · Construye un anuncio de Google Ads</h3>
              <p className="text-xs text-blue-800 leading-relaxed mt-1">
                Tienes un brief con keyword, promesa y CTA. Escribe <strong>2 titulares (≤30 caracteres)</strong> y una{' '}
                <strong>descripción (≤90 caracteres)</strong>. El validador puntúa en directo: longitud, keyword, claims
                prohibidos, CTA y coherencia con la promesa.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {AD_BRIEFS.map((b) => (
              <Button
                key={b.id}
                size="sm"
                variant={b.id === briefId ? 'default' : 'outline'}
                onClick={() => switchBrief(b.id)}
                className={b.id === briefId ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              >
                {b.product}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white">
        <CardContent className="p-4 text-xs text-slate-700 space-y-1">
          <div>
            <strong>Producto:</strong> {brief.product}
          </div>
          <div>
            <strong>Keyword principal:</strong>{' '}
            <span className="font-mono bg-slate-100 px-1 rounded">{brief.keyword}</span>
          </div>
          <div>
            <strong>Promesa:</strong> {brief.promise}
          </div>
          <div>
            <strong>CTA sugerido:</strong> {brief.cta}
          </div>
          <div>
            <strong>Claims prohibidos para este brief:</strong>{' '}
            <span className="text-red-700">{brief.forbidden.join(' · ')}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700">
              Headline 1 ({checks.h1Length}/30)
              {checks.h1Length > 30 && <span className="text-red-600 ml-1">¡pasado!</span>}
            </label>
            <Input
              value={h1}
              onChange={(e) => setH1(e.target.value)}
              maxLength={45}
              placeholder="Asesoría laboral online · 1er mes gratis"
              className={checks.h1Length > 30 ? 'border-red-400' : ''}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">
              Headline 2 ({checks.h2Length}/30)
              {checks.h2Length > 30 && <span className="text-red-600 ml-1">¡pasado!</span>}
            </label>
            <Input
              value={h2}
              onChange={(e) => setH2(e.target.value)}
              maxLength={45}
              placeholder="Sin permanencia · Pruébalo gratis"
              className={checks.h2Length > 30 ? 'border-red-400' : ''}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700">
              Descripción ({checks.descLength}/90)
              {checks.descLength > 90 && <span className="text-red-600 ml-1">¡pasado!</span>}
            </label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={120}
              rows={3}
              placeholder="Asesoría laboral 100% online para autónomos. Primer mes gratis. Pruébalo sin permanencia."
              className={checks.descLength > 90 ? 'border-red-400' : ''}
            />
          </div>
        </div>

        <div className="space-y-3">
          {/* Live preview */}
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-3 text-xs">
              <div className="text-[10px] text-slate-500 mb-1">Vista previa SERP (anuncio)</div>
              <div className="border border-slate-200 rounded p-2 bg-slate-50">
                <div className="text-[10px] font-bold text-slate-600">Patrocinado · ejemplo.com</div>
                <div className="text-blue-700 font-semibold leading-tight truncate">
                  {h1 || 'Headline 1'} | {h2 || 'Headline 2'}
                </div>
                <div className="text-slate-700 leading-tight">{desc || 'Descripción del anuncio…'}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-3 space-y-1 text-xs">
              <CheckRow ok={checks.h1Ok} label={`Headline 1 entre 1 y 30 caracteres (${checks.h1Length})`} />
              <CheckRow ok={checks.h2Ok} label={`Headline 2 entre 1 y 30 caracteres (${checks.h2Length})`} />
              <CheckRow ok={checks.descOk} label={`Descripción entre 1 y 90 caracteres (${checks.descLength})`} />
              <CheckRow ok={checks.requiredOk} label={`Incluye keyword obligatoria: "${brief.required.join(' + ')}"`} />
              <CheckRow ok={checks.ctaOk} label="Hay CTA (prueba / empieza / contrata / descubre / reserva)" />
              <CheckRow ok={checks.promiseOk} label="Refleja la promesa del brief" />
              <CheckRow
                ok={checks.forbiddenHits.length === 0 && (h1 || h2 || desc).length > 0}
                label={
                  checks.forbiddenHits.length === 0
                    ? 'Sin claims prohibidos'
                    : `Evita: "${checks.forbiddenHits.join('", "')}"`
                }
                isError={checks.forbiddenHits.length > 0}
              />
            </CardContent>
          </Card>

          <Card
            className={`border-2 ${
              score >= 80
                ? 'border-green-300 bg-green-50'
                : score >= 50
                  ? 'border-amber-300 bg-amber-50'
                  : 'border-slate-200 bg-white'
            }`}
          >
            <CardContent className="p-3">
              <div className="text-xs text-slate-700 font-semibold mb-1">Quality Score simulado</div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-emerald-500 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="text-right text-xs text-slate-600 mt-1">{score}/100</div>
              {!allLengthsOk && (
                <div className="text-[10px] text-amber-700 mt-1">
                  Google Ads rechaza textos más largos de los límites — corrige longitudes para activar el resto.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckRow({ ok, label, isError }: { ok: boolean; label: string; isError?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${ok ? 'text-green-700' : isError ? 'text-red-700' : 'text-slate-500'}`}>
      {ok ? <CheckCircle2 className="h-3 w-3" /> : isError ? <XCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
      <span>{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * STATION 3 · GEO CITABILITY LAB
 * -------------------------------------------------------------------------*/

interface GeoBrief {
  id: string;
  topic: string;
  question: string;
  raw: string;
  hints: string[];
}

const GEO_BRIEFS: GeoBrief[] = [
  {
    id: 'crm',
    topic: 'CRM para pymes',
    question: '¿Cuáles son los CRM más usados por pymes en España en 2026?',
    raw: 'Hay muchísimos CRM en el mercado y casi todos son geniales. Nosotros llevamos años trabajando con varios y al final lo importante es que el equipo lo use, así que cualquiera vale si te organizas bien. La verdad es que depende mucho de la empresa.',
    hints: [
      'Empieza con la respuesta directa en la PRIMERA frase.',
      'Incluye al menos un dato con unidad (%, €, número de empresas...).',
      'Cita una fuente o estudio (según, fuente, estudio, informe).',
      'Mantén el texto entre 40 y 80 palabras.',
    ],
  },
  {
    id: 'finiquito',
    topic: 'Cálculo de finiquito',
    question: '¿Cómo se calcula un finiquito en España?',
    raw: 'El finiquito es lo que te dan al final de un contrato. Hay que calcular varias cosas y depende mucho de la situación. Lo mejor es preguntar a un asesor laboral porque cada caso es un mundo y la verdad es que la ley puede cambiar de un año a otro.',
    hints: [
      'Da una respuesta directa al inicio (qué incluye y cómo se calcula).',
      'Incluye al menos un dato con unidad o fórmula.',
      'Cita la norma o fuente legal de referencia.',
      'Texto entre 40 y 80 palabras.',
    ],
  },
];

interface GeoChecks {
  wordCount: number;
  lengthOk: boolean;
  directAnswer: boolean;
  hasNumber: boolean;
  hasUnit: boolean;
  hasSource: boolean;
  hasQA: boolean;
  conciseStart: boolean;
}

function checkGeo(text: string): GeoChecks {
  const t = text.trim();
  const words = t.split(/\s+/).filter(Boolean);
  const lc = t.toLowerCase();
  const firstSentence = t.split(/[.!?]/)[0] ?? '';
  const numberPattern = /\d/;
  const unitPattern = /\d+\s?(%|€|euros?|usuarios?|empresas?|días?|horas?|meses?|años?|veces|x|millones?|miles)/i;
  const sourcePattern = /(según|fuente|estudio|informe|encuesta|datos? de|estadística|reglamento|ley|art\.|según el|según la|según)/i;
  const qaPattern = /\?/;

  return {
    wordCount: words.length,
    lengthOk: words.length >= 40 && words.length <= 80,
    directAnswer:
      firstSentence.length > 20 &&
      !/depende|hay muchos|hay varios|cualquiera|hola|bueno/i.test(firstSentence),
    hasNumber: numberPattern.test(t),
    hasUnit: unitPattern.test(t),
    hasSource: sourcePattern.test(lc),
    hasQA: qaPattern.test(t),
    conciseStart: firstSentence.split(/\s+/).length <= 25,
  };
}

function GeoCitabilityStation() {
  const [briefId, setBriefId] = useState(GEO_BRIEFS[0].id);
  const [text, setText] = useState('');

  const brief = GEO_BRIEFS.find((b) => b.id === briefId)!;
  const checks = checkGeo(text);

  const score = useMemo(() => {
    let s = 0;
    if (checks.lengthOk) s += 15;
    if (checks.directAnswer) s += 25;
    if (checks.hasNumber) s += 10;
    if (checks.hasUnit) s += 15;
    if (checks.hasSource) s += 20;
    if (checks.conciseStart) s += 10;
    if (checks.hasQA) s += 5;
    return s;
  }, [checks]);

  const reset = () => setText('');
  const switchBrief = (id: string) => {
    setBriefId(id);
    setText('');
  };

  return (
    <div className="space-y-5">
      <Card className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-white">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-fuchsia-500 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-fuchsia-900">Misión GEO · Reescribe un párrafo para que ChatGPT/Perplexity te citen</h3>
              <p className="text-xs text-fuchsia-800 leading-relaxed mt-1">
                Las IAs generativas prefieren respuestas <strong>directas, con datos, con fuente y autocontenidas</strong>.
                Reescribe el párrafo de partida cumpliendo el checklist. El validador puntúa tu &quot;GEO citability&quot; en directo.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {GEO_BRIEFS.map((b) => (
              <Button
                key={b.id}
                size="sm"
                variant={b.id === briefId ? 'default' : 'outline'}
                onClick={() => switchBrief(b.id)}
                className={b.id === briefId ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white' : ''}
              >
                {b.topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Card className="border-slate-200 bg-white">
            <CardContent className="p-3 text-xs space-y-2">
              <div>
                <strong>Pregunta del usuario en ChatGPT/Perplexity:</strong>
                <div className="font-mono bg-slate-50 px-2 py-1 rounded mt-1 text-slate-700">&quot;{brief.question}&quot;</div>
              </div>
              <div>
                <strong>Párrafo original (poco citable):</strong>
                <div className="bg-red-50 border border-red-200 p-2 rounded mt-1 italic text-red-900 leading-relaxed">
                  {brief.raw}
                </div>
              </div>
              <div>
                <strong>Tu reescritura:</strong>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                  placeholder="Reescribe aquí: empieza con respuesta directa, añade un dato con unidad, cita la fuente y mantén entre 40 y 80 palabras."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-3 text-xs space-y-1">
              <div className="font-semibold text-amber-900 flex items-center gap-1 mb-1">
                <Lightbulb className="h-3 w-3" /> Pistas para esta tarea
              </div>
              {brief.hints.map((h, i) => (
                <div key={i} className="text-amber-900 leading-relaxed">
                  · {h}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardContent className="p-3 space-y-1 text-xs">
              <div className="font-semibold text-slate-800 mb-1">Checklist GEO citability</div>
              <CheckRow
                ok={checks.lengthOk}
                label={`Longitud entre 40 y 80 palabras (${checks.wordCount})`}
              />
              <CheckRow ok={checks.directAnswer} label='Respuesta directa al inicio (sin "depende", "hay muchos", saludos)' />
              <CheckRow ok={checks.conciseStart} label="Primera frase con ≤25 palabras (concisa)" />
              <CheckRow ok={checks.hasNumber} label="Incluye al menos un número/cifra" />
              <CheckRow ok={checks.hasUnit} label="El número va con unidad (%, €, días, empresas, etc.)" />
              <CheckRow ok={checks.hasSource} label='Cita fuente ("según", "fuente:", estudio, informe, ley, art.)' />
              <CheckRow ok={checks.hasQA} label="Incluye al menos un signo de interrogación (formato Q&A) — opcional" />
            </CardContent>
          </Card>

          <Card
            className={`border-2 ${
              score >= 80
                ? 'border-green-300 bg-green-50'
                : score >= 50
                  ? 'border-amber-300 bg-amber-50'
                  : 'border-slate-200 bg-white'
            }`}
          >
            <CardContent className="p-3">
              <div className="text-xs text-slate-700 font-semibold mb-1">GEO citability score</div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
              <div className="text-right text-xs text-slate-600 mt-1">{score}/100</div>
              {score >= 80 && (
                <div className="text-[10px] text-green-700 mt-1">
                  Excelente: este párrafo tiene muy alta probabilidad de ser citado por IAs generativas.
                </div>
              )}
              {score >= 50 && score < 80 && (
                <div className="text-[10px] text-amber-700 mt-1">Vas bien, te falta 1-2 criterios para hacerlo plenamente citable.</div>
              )}
              {score < 50 && text.length > 0 && (
                <div className="text-[10px] text-slate-600 mt-1">Aún flojo: empieza por la respuesta directa, añade dato + unidad y fuente.</div>
              )}
            </CardContent>
          </Card>

          <Button onClick={reset} variant="outline" size="sm">
            <RotateCcw className="h-3 w-3 mr-1" /> Limpiar reescritura
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * MAIN COMPONENT WITH TABS
 * -------------------------------------------------------------------------*/

export default function SeoSemGeoLab() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-5">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-blue-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Lab Interactivo · SEO / SEM / GEO</h1>
            <p className="text-sm text-slate-600">
              Tres misiones prácticas para que aprendas haciendo: clasificar keywords, construir un anuncio y hacer un párrafo citable por IAs.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="seo" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="seo" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900">
            <Search className="h-4 w-4 mr-1 hidden sm:inline" /> 1 · SEO Keywords
          </TabsTrigger>
          <TabsTrigger value="sem" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
            <DollarSign className="h-4 w-4 mr-1 hidden sm:inline" /> 2 · SEM Anuncio
          </TabsTrigger>
          <TabsTrigger value="geo" className="data-[state=active]:bg-fuchsia-100 data-[state=active]:text-fuchsia-900">
            <Bot className="h-4 w-4 mr-1 hidden sm:inline" /> 3 · GEO Citability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="mt-4">
          <SeoKeywordStation />
        </TabsContent>
        <TabsContent value="sem" className="mt-4">
          <SemAdStation />
        </TabsContent>
        <TabsContent value="geo" className="mt-4">
          <GeoCitabilityStation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
