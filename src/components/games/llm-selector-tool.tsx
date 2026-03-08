'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Brain,
  Sparkles,
  Code2,
  FileText,
  Briefcase,
  Search,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Languages,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Calculator,
  Info,
} from 'lucide-react';

interface LLM {
  id: string;
  name: string;
  provider: string;
  family: string;
  accessType: string;
  freeTier: boolean;
  approxPrice: number;
  priceLabel: string;
  usageTags: string[];
  hasSpanish: boolean;
  isMultimodal: boolean;
  isCodeStrong: boolean;
  isEnterpriseSuite: boolean;
  isSuiteAddon: boolean;
  profileFit: Record<string, number>;
  scoreByUse: Record<string, number>;
  shortUses: string;
  mainTag: string;
  extraTags: string[];
  planKind: string;
}

const llms: LLM[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    family: 'GPT-4/5',
    accessType: 'Web, app, API',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'Plus ≈ 20 €/mes',
    usageTags: ['general', 'code', 'marketing', 'documents', 'vision', 'research'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.96, freelance: 0.92, smb: 0.9, enterprise: 0.86 },
    scoreByUse: {
      general: 0.98,
      code: 0.9,
      office: 0.6,
      marketing: 0.88,
      documents: 0.9,
      research: 0.85,
      vision: 0.84,
      enterprise: 0.78,
    },
    shortUses: 'Navaja suiza: redacción, estudio, código y creatividad.',
    mainTag: 'Generalista',
    extraTags: ['Estudio', 'Creatividad'],
    planKind: 'pro-consumer',
  },
  {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    family: 'Claude 3.x/4.x',
    accessType: 'Web, app, API',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'Pro ≈ 20 €/mes',
    usageTags: ['general', 'documents', 'research'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.9, freelance: 0.9, smb: 0.92, enterprise: 0.95 },
    scoreByUse: {
      general: 0.92,
      code: 0.83,
      office: 0.55,
      marketing: 0.8,
      documents: 0.98,
      research: 0.96,
      vision: 0.83,
      enterprise: 0.9,
    },
    shortUses: 'Excelente para documentos largos, análisis y tono profesional.',
    mainTag: 'Documentos',
    extraTags: ['Razonamiento', 'Largos textos'],
    planKind: 'pro-consumer',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    family: 'Gemini 2.5/3 Pro & Flash',
    accessType: 'Web, móvil, Workspace',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'AI Pro ≈ 20 €/mes',
    usageTags: ['general', 'vision', 'research', 'marketing'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: true,
    isSuiteAddon: false,
    profileFit: { student: 0.92, freelance: 0.9, smb: 0.9, enterprise: 0.93 },
    scoreByUse: {
      general: 0.92,
      code: 0.85,
      office: 0.82,
      marketing: 0.9,
      documents: 0.87,
      research: 0.9,
      vision: 0.95,
      enterprise: 0.9,
    },
    shortUses: 'Multimodal e integrado con Gmail, Docs y Drive.',
    mainTag: 'Multimodal',
    extraTags: ['Google', 'Productividad'],
    planKind: 'pro-consumer',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft/OpenAI',
    family: 'GPT-4/5 vía Copilot',
    accessType: 'Word, Excel, PowerPoint, Edge',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'Copilot Pro ≈ 20 €/mes',
    usageTags: ['office', 'enterprise', 'general'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: true,
    isSuiteAddon: true,
    profileFit: { student: 0.8, freelance: 0.82, smb: 0.96, enterprise: 0.98 },
    scoreByUse: {
      general: 0.83,
      code: 0.82,
      office: 0.98,
      marketing: 0.82,
      documents: 0.9,
      research: 0.8,
      vision: 0.83,
      enterprise: 0.97,
    },
    shortUses: 'Ideal si ya usas Word, Excel, PowerPoint y Outlook.',
    mainTag: 'Ofimática',
    extraTags: ['Microsoft 365', 'Empresas'],
    planKind: 'suite-addon',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    provider: 'Perplexity AI',
    family: 'Sonar / otros',
    accessType: 'Web, app',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'Pro ≈ 20 €/mes',
    usageTags: ['research', 'general', 'documents'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.96, freelance: 0.9, smb: 0.88, enterprise: 0.88 },
    scoreByUse: {
      general: 0.86,
      code: 0.78,
      office: 0.5,
      marketing: 0.8,
      documents: 0.9,
      research: 0.99,
      vision: 0.83,
      enterprise: 0.8,
    },
    shortUses: 'Búsqueda con fuentes, ideal para trabajos de investigación.',
    mainTag: 'Investigación',
    extraTags: ['Fuentes citadas', 'Navegación web'],
    planKind: 'pro-consumer',
  },
  {
    id: 'llama',
    name: 'LLaMA (Meta)',
    provider: 'Meta',
    family: 'LLaMA 3/4 (open)',
    accessType: 'Modelos open source',
    freeTier: true,
    approxPrice: 0,
    priceLabel: 'Open source (infra aparte)',
    usageTags: ['enterprise', 'code', 'general'],
    hasSpanish: true,
    isMultimodal: false,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.6, freelance: 0.7, smb: 0.82, enterprise: 0.94 },
    scoreByUse: {
      general: 0.78,
      code: 0.86,
      office: 0.5,
      marketing: 0.7,
      documents: 0.76,
      research: 0.7,
      vision: 0.4,
      enterprise: 0.9,
    },
    shortUses: 'Modelo abierto para chatbots propios y proyectos internos.',
    mainTag: 'Open source',
    extraTags: ['On-premise', 'Personalizable'],
    planKind: 'open',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    provider: 'Mistral AI',
    family: 'Mistral Large/Small',
    accessType: 'API, Le Chat',
    freeTier: true,
    approxPrice: 15,
    priceLabel: 'API, coste por uso bajo',
    usageTags: ['code', 'enterprise', 'general'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.7, freelance: 0.82, smb: 0.88, enterprise: 0.9 },
    scoreByUse: {
      general: 0.82,
      code: 0.9,
      office: 0.5,
      marketing: 0.78,
      documents: 0.8,
      research: 0.8,
      vision: 0.82,
      enterprise: 0.85,
    },
    shortUses: 'Muy eficiente vía API, ideal para proyectos técnicos.',
    mainTag: 'API eficiente',
    extraTags: ['Coste bajo', 'Developers'],
    planKind: 'api',
  },
  {
    id: 'grok',
    name: 'Grok',
    provider: 'xAI',
    family: 'Grok',
    accessType: 'Web, integrado en X',
    freeTier: true,
    approxPrice: 30,
    priceLabel: '≈ 30 €/mes (X Premium)',
    usageTags: ['research', 'general'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: false,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.75, freelance: 0.78, smb: 0.76, enterprise: 0.7 },
    scoreByUse: {
      general: 0.8,
      code: 0.6,
      office: 0.4,
      marketing: 0.7,
      documents: 0.72,
      research: 0.86,
      vision: 0.72,
      enterprise: 0.6,
    },
    shortUses: 'Bueno para contexto en tiempo real desde X (Twitter).',
    mainTag: 'Tiempo real',
    extraTags: ['Redes sociales'],
    planKind: 'pro-consumer',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek AI',
    family: 'DeepSeek',
    accessType: 'API, algunas webs',
    freeTier: true,
    approxPrice: 10,
    priceLabel: 'API muy competitiva',
    usageTags: ['code', 'enterprise'],
    hasSpanish: false,
    isMultimodal: false,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.66, freelance: 0.75, smb: 0.82, enterprise: 0.86 },
    scoreByUse: {
      general: 0.7,
      code: 0.9,
      office: 0.4,
      marketing: 0.66,
      documents: 0.72,
      research: 0.72,
      vision: 0.4,
      enterprise: 0.82,
    },
    shortUses: 'Especialmente interesante por coste para proyectos técnicos.',
    mainTag: 'Bajo coste',
    extraTags: ['Código', 'API'],
    planKind: 'api',
  },
  {
    id: 'qwen',
    name: 'Qwen',
    provider: 'Alibaba / Qwen',
    family: 'Qwen 2.5+',
    accessType: 'API, plataformas',
    freeTier: true,
    approxPrice: 15,
    priceLabel: 'API competitiva',
    usageTags: ['code', 'general', 'enterprise'],
    hasSpanish: true,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.7, freelance: 0.8, smb: 0.82, enterprise: 0.88 },
    scoreByUse: {
      general: 0.82,
      code: 0.9,
      office: 0.5,
      marketing: 0.78,
      documents: 0.8,
      research: 0.78,
      vision: 0.82,
      enterprise: 0.84,
    },
    shortUses: 'Modelo versátil con buen rendimiento y coste.',
    mainTag: 'Versátil',
    extraTags: ['Asia', 'API'],
    planKind: 'api',
  },
  {
    id: 'kimi',
    name: 'Kimi',
    provider: 'Moonshot AI',
    family: 'Kimi',
    accessType: 'Web, app',
    freeTier: true,
    approxPrice: 20,
    priceLabel: 'Pro ≈ 20 €/mes',
    usageTags: ['documents', 'general', 'research'],
    hasSpanish: false,
    isMultimodal: true,
    isCodeStrong: true,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.7, freelance: 0.78, smb: 0.8, enterprise: 0.82 },
    scoreByUse: {
      general: 0.8,
      code: 0.86,
      office: 0.5,
      marketing: 0.76,
      documents: 0.9,
      research: 0.86,
      vision: 0.8,
      enterprise: 0.8,
    },
    shortUses: 'Muy bueno en documentos largos y razonamiento técnico.',
    mainTag: 'Docs + código',
    extraTags: ['Asia', 'Razonamiento'],
    planKind: 'pro-consumer',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    provider: 'Notion',
    family: 'Integrado en Notion',
    accessType: 'Notion',
    freeTier: false,
    approxPrice: 10,
    priceLabel: '≈ 8–10 €/mes sobre Notion',
    usageTags: ['documents', 'general', 'office'],
    hasSpanish: true,
    isMultimodal: false,
    isCodeStrong: false,
    isEnterpriseSuite: false,
    isSuiteAddon: true,
    profileFit: { student: 0.86, freelance: 0.84, smb: 0.78, enterprise: 0.72 },
    scoreByUse: {
      general: 0.8,
      code: 0.35,
      office: 0.7,
      marketing: 0.72,
      documents: 0.88,
      research: 0.7,
      vision: 0.4,
      enterprise: 0.7,
    },
    shortUses: 'Resúmenes y organización de notas, tareas y proyectos.',
    mainTag: 'Productividad',
    extraTags: ['Notas', 'Proyectos'],
    planKind: 'suite-addon',
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    provider: 'Jasper',
    family: 'Combinación de LLMs',
    accessType: 'Web',
    freeTier: false,
    approxPrice: 45,
    priceLabel: 'Desde ≈ 45 €/mes',
    usageTags: ['marketing'],
    hasSpanish: true,
    isMultimodal: false,
    isCodeStrong: false,
    isEnterpriseSuite: false,
    isSuiteAddon: false,
    profileFit: { student: 0.5, freelance: 0.8, smb: 0.86, enterprise: 0.86 },
    scoreByUse: {
      general: 0.6,
      code: 0.3,
      office: 0.4,
      marketing: 0.96,
      documents: 0.7,
      research: 0.6,
      vision: 0.4,
      enterprise: 0.82,
    },
    shortUses: 'Pensado para equipos de marketing y copywriting.',
    mainTag: 'Marketing',
    extraTags: ['Campañas', 'Branding'],
    planKind: 'vertical-saas',
  },
];

const usageOptions = [
  { value: 'general', label: 'Redacción general y estudio', icon: FileText },
  { value: 'code', label: 'Programación y debugging', icon: Code2 },
  { value: 'office', label: 'Ofimática (Word/Excel/Presentaciones)', icon: Briefcase },
  { value: 'marketing', label: 'Marketing, copy y contenidos', icon: Sparkles },
  { value: 'documents', label: 'Informes largos y documentos', icon: FileText },
  { value: 'research', label: 'Investigación y búsqueda con fuentes', icon: Search },
  { value: 'vision', label: 'Texto + imagen / multimodal', icon: ImageIcon },
  { value: 'enterprise', label: 'Uso empresarial (equipos y seguridad)', icon: Briefcase },
];

const profileOptions = [
  { value: 'student', label: 'Estudiante / formación' },
  { value: 'freelance', label: 'Freelance / autónomo' },
  { value: 'smb', label: 'Pyme (equipos pequeños)' },
  { value: 'enterprise', label: 'Empresa / corporativo' },
];

// Precios de APIs para calculadora de tokens (por 1K tokens)
const tokenPrices: Record<string, { input: number; output: number }> = {
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-4-turbo': { input: 0.01, output: 0.03 },
  'gpt-4o': { input: 0.005, output: 0.015 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'claude-3-haiku': { input: 0.00025, output: 0.00125 },
  'gemini-pro': { input: 0.00025, output: 0.0005 },
  'gemini-ultra': { input: 0.007, output: 0.021 },
  'mistral-large': { input: 0.004, output: 0.012 },
  'mistral-medium': { input: 0.0027, output: 0.0081 },
  'llama-3-70b': { input: 0.0008, output: 0.0008 },
  'llama-3-8b': { input: 0.0002, output: 0.0002 },
};

export default function LLMSelectorTool() {
  const [activeTab, setActiveTab] = useState<'selector' | 'calculator'>('selector');
  
  // Selector state
  const [usageKey, setUsageKey] = useState<string>('general');
  const [activeProfile, setActiveProfile] = useState<string>('student');
  const [variantFilter, setVariantFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    freeOnly: false,
    spanish: false,
    multimodal: false,
    code: false,
  });

  // Calculator state
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(500);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(100);

  const computeScore = (model: LLM, useKey: string, profileKey: string) => {
    const usageScore = model.scoreByUse[useKey] ?? 0.5;
    const profileScore = model.profileFit[profileKey] ?? 0.5;

    const isFree = model.freeTier;
    const isCheap = model.approxPrice > 0 && model.approxPrice <= 22;
    const isSuite = model.isSuiteAddon || model.isEnterpriseSuite;

    let priceBonus = 0;
    if (isFree) priceBonus = 0.13;
    else if (isCheap) priceBonus = 0.06;

    let suiteBonus = 0;
    if (useKey === 'office' || useKey === 'enterprise') {
      suiteBonus = isSuite ? 0.09 : 0;
    }

    const rawScore = usageScore * 0.6 + profileScore * 0.25 + priceBonus + suiteBonus;
    return Math.min(1, rawScore);
  };

  const filteredAndScoredLLMs = useMemo(() => {
    let result = [...llms];

    // Apply filters
    if (filters.freeOnly) result = result.filter((m) => m.freeTier);
    if (filters.spanish) result = result.filter((m) => m.hasSpanish);
    if (filters.multimodal) result = result.filter((m) => m.isMultimodal);
    if (filters.code) result = result.filter((m) => m.isCodeStrong);

    // Apply variant filter
    if (variantFilter === 'free') {
      result = result.filter((m) => m.freeTier);
    } else if (variantFilter === 'cheap') {
      result = result.filter((m) => m.approxPrice > 0 && m.approxPrice <= 22);
    } else if (variantFilter === 'enterprise') {
      result = result.filter((m) => m.isEnterpriseSuite || m.planKind === 'api');
    } else if (variantFilter === 'latest') {
      const latestIds = new Set([
        'chatgpt',
        'claude',
        'gemini',
        'copilot',
        'perplexity',
        'mistral',
        'qwen',
        'kimi',
      ]);
      result = result.filter((m) => latestIds.has(m.id));
    }

    // Apply search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.provider.toLowerCase().includes(term) ||
          m.family.toLowerCase().includes(term) ||
          m.mainTag.toLowerCase().includes(term)
      );
    }

    // Score and sort
    const scored = result
      .map((m) => ({
        ...m,
        _score: computeScore(m, usageKey, activeProfile),
      }))
      .sort((a, b) => b._score - a._score);

    return scored;
  }, [usageKey, activeProfile, variantFilter, searchTerm, filters]);

  const stats = useMemo(() => {
    if (!filteredAndScoredLLMs.length) {
      return {
        topName: '—',
        topScore: 0,
        topTag: 'Sin resultados',
        freeCount: 0,
        freeTotal: 0,
        avgPrice: 0,
      };
    }

    const top = filteredAndScoredLLMs[0];
    const freeCount = filteredAndScoredLLMs.filter((m) => m.freeTier).length;
    const prices = filteredAndScoredLLMs.map((m) => m.approxPrice || 0);
    const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length || 0;

    return {
      topName: top.name,
      topScore: top._score,
      topTag: top.mainTag,
      freeCount,
      freeTotal: filteredAndScoredLLMs.length,
      avgPrice: avg,
    };
  }, [filteredAndScoredLLMs]);

  const resetFilters = () => {
    setUsageKey('general');
    setActiveProfile('student');
    setVariantFilter('all');
    setSearchTerm('');
    setFilters({
      freeOnly: false,
      spanish: false,
      multimodal: false,
      code: false,
    });
  };

  // Calculator computations
  const calculatorResult = useMemo(() => {
    const prices = tokenPrices[selectedModel] || { input: 0, output: 0 };
    const costPerRequest = (inputTokens * prices.input + outputTokens * prices.output) / 1000;
    const dailyCost = costPerRequest * requestsPerDay;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = monthlyCost * 12;

    return {
      costPerRequest,
      dailyCost,
      monthlyCost,
      yearlyCost,
      prices,
    };
  }, [selectedModel, inputTokens, outputTokens, requestsPerDay]);

  const getScoreBadge = (score: number) => {
    if (score >= 0.88)
      return { label: 'Excelente ajuste', className: 'bg-green-500/20 text-green-400 border-green-500/50' };
    if (score >= 0.75)
      return { label: 'Buen ajuste', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' };
    return { label: 'Uso posible', className: 'bg-red-500/20 text-red-400 border-red-500/50' };
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-green-400 to-emerald-500 text-black';
    if (index === 1) return 'bg-gradient-to-r from-slate-300 to-slate-400 text-black';
    if (index === 2) return 'bg-gradient-to-r from-amber-400 to-amber-500 text-black';
    return 'bg-slate-700 text-slate-300';
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <CardHeader className="pb-3 border-b border-purple-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                🧠 Selector Inteligente de IAs (LLM)
              </h3>
              <p className="text-sm text-purple-700">
                Encuentra el modelo perfecto para cada caso de uso
              </p>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-100/50">
            <Sparkles className="h-3 w-3 mr-1" />
            Módulo 2
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'selector' | 'calculator')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 border border-purple-200">
            <TabsTrigger value="selector" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Brain className="h-4 w-4 mr-2" />
              Selector de Modelos
            </TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Calculator className="h-4 w-4 mr-2" />
              Calculadora de Tokens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="selector" className="mt-4 space-y-4">
            {/* Filters Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Caso de uso */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Caso de uso
                </Label>
                <Select value={usageKey} onValueChange={setUsageKey}>
                  <SelectTrigger className="border-purple-300 bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {usageOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <opt.icon className="h-4 w-4" />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Variante */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Variante / Familia
                </Label>
                <Select value={variantFilter} onValueChange={setVariantFilter}>
                  <SelectTrigger className="border-purple-300 bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las variantes</SelectItem>
                    <SelectItem value="latest">Solo modelos más recientes</SelectItem>
                    <SelectItem value="free">Solo versión gratuita</SelectItem>
                    <SelectItem value="cheap">Solo ≈20 €/mes</SelectItem>
                    <SelectItem value="enterprise">Enfoque enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Búsqueda */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                  Buscar por nombre
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ChatGPT, Claude, Gemini..."
                    className="pl-9 border-purple-300 bg-white/80"
                  />
                </div>
              </div>
            </div>

            {/* Profile Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                Tu perfil
              </Label>
              <div className="flex flex-wrap gap-2">
                {profileOptions.map((profile) => (
                  <Button
                    key={profile.value}
                    variant={activeProfile === profile.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveProfile(profile.value)}
                    className={
                      activeProfile === profile.value
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                    }
                  >
                    {activeProfile === profile.value && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {profile.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-purple-900 uppercase tracking-wide">
                Filtros rápidos
              </Label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="freeOnly"
                    checked={filters.freeOnly}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, freeOnly: v }))}
                  />
                  <Label htmlFor="freeOnly" className="text-sm cursor-pointer">
                    Solo gratuito
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="spanish"
                    checked={filters.spanish}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, spanish: v }))}
                  />
                  <Label htmlFor="spanish" className="text-sm cursor-pointer">
                    <Languages className="h-3 w-3 inline mr-1" />
                    Español
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="multimodal"
                    checked={filters.multimodal}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, multimodal: v }))}
                  />
                  <Label htmlFor="multimodal" className="text-sm cursor-pointer">
                    <ImageIcon className="h-3 w-3 inline mr-1" />
                    Multimodal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="code"
                    checked={filters.code}
                    onCheckedChange={(v) => setFilters((f) => ({ ...f, code: v }))}
                  />
                  <Label htmlFor="code" className="text-sm cursor-pointer">
                    <Code2 className="h-3 w-3 inline mr-1" />
                    Código
                  </Label>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid gap-3 md:grid-cols-3">
              <Card className="border-purple-200 bg-gradient-to-br from-purple-100/50 to-indigo-100/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-purple-600 uppercase font-semibold">Top recomendado</p>
                      <p className="text-lg font-bold text-purple-900">{stats.topName}</p>
                      <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.max(40, stats.topScore * 100)}%` }}
                        />
                      </div>
                    </div>
                    <Badge className="bg-purple-500 text-white">{stats.topTag}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-100/50 to-emerald-100/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-green-600 uppercase font-semibold">Con plan gratis</p>
                      <p className="text-lg font-bold text-green-900">
                        {stats.freeCount} de {stats.freeTotal}
                      </p>
                      <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.max(25, (stats.freeCount / stats.freeTotal) * 100 || 0)}%` }}
                        />
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-br from-amber-100/50 to-orange-100/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-600 uppercase font-semibold">Coste medio</p>
                      <p className="text-lg font-bold text-amber-900">≈ {Math.round(stats.avgPrice)} €/mes</p>
                      <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.max(30, Math.min(100, (stats.avgPrice / 50) * 100))}%` }}
                        />
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-purple-900 uppercase tracking-wide">
                  Ranking de modelos
                </h4>
                <div className="flex gap-2">
                  <Button onClick={resetFilters} variant="outline" size="sm" className="border-purple-300">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reiniciar
                  </Button>
                </div>
              </div>

              {filteredAndScoredLLMs.length === 0 ? (
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-8 text-center text-purple-600">
                    <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No hay modelos que coincidan con los filtros actuales.</p>
                    <p className="text-sm mt-1">Ajusta los filtros o limpia la búsqueda.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {filteredAndScoredLLMs.map((model, index) => {
                    const scoreBadge = getScoreBadge(model._score);
                    return (
                      <Card
                        key={model.id}
                        className="border-purple-200/50 bg-white/60 hover:bg-white/90 hover:shadow-md transition-all duration-200"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Rank */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${getRankBadge(index)}`}>
                              {index + 1}
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="font-bold text-purple-900">{model.name}</h5>
                                <Badge variant="outline" className="text-xs border-purple-300">
                                  {model.provider}
                                </Badge>
                                {model.freeTier && (
                                  <Badge className="bg-green-500/20 text-green-700 border-green-500/50 text-xs">
                                    Gratis disponible
                                  </Badge>
                                )}
                              </div>

                              <p className="text-xs text-purple-600 mt-1">{model.family}</p>

                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge className={scoreBadge.className}>{scoreBadge.label}</Badge>
                                <span className="text-xs text-purple-500">
                                  ({(model._score * 100).toFixed(0)}/100)
                                </span>
                              </div>

                              <p className="text-sm text-purple-700 mt-2">{model.shortUses}</p>

                              <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge variant="outline" className="border-purple-300 text-xs">
                                  {model.mainTag}
                                </Badge>
                                {model.extraTags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-slate-300 text-xs text-slate-600">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right flex-shrink-0">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                model.freeTier
                                  ? 'bg-green-100 text-green-700 border border-green-300'
                                  : model.approxPrice <= 22
                                  ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                  : 'bg-red-100 text-red-700 border border-red-300'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  model.freeTier ? 'bg-green-500' : model.approxPrice <= 22 ? 'bg-amber-500' : 'bg-red-500'
                                }`} />
                                {model.priceLabel}
                              </div>
                              <p className="text-xs text-purple-500 mt-2">{model.accessType}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="mt-4">
            <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-200 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-indigo-900">💰 Calculadora de Costes por Tokens</h4>
                    <p className="text-sm text-indigo-700">
                      Estima el coste de usar APIs de LLMs según tu consumo
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-indigo-900">Modelo</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="border-indigo-300 bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
                      <SelectItem value="mistral-large">Mistral Large</SelectItem>
                      <SelectItem value="mistral-medium">Mistral Medium</SelectItem>
                      <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
                      <SelectItem value="llama-3-8b">Llama 3 8B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Token Inputs */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-indigo-900">
                      Tokens de entrada (prompt)
                    </Label>
                    <Slider
                      value={[inputTokens]}
                      min={100}
                      max={100000}
                      step={100}
                      onValueChange={([v]) => setInputTokens(v)}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={inputTokens}
                        onChange={(e) => setInputTokens(Number(e.target.value))}
                        className="w-32 border-indigo-300"
                      />
                      <span className="text-sm text-indigo-600">tokens</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-indigo-900">
                      Tokens de salida (respuesta)
                    </Label>
                    <Slider
                      value={[outputTokens]}
                      min={100}
                      max={50000}
                      step={100}
                      onValueChange={([v]) => setOutputTokens(v)}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={outputTokens}
                        onChange={(e) => setOutputTokens(Number(e.target.value))}
                        className="w-32 border-indigo-300"
                      />
                      <span className="text-sm text-indigo-600">tokens</span>
                    </div>
                  </div>
                </div>

                {/* Requests per day */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-indigo-900">
                    Solicitudes por día
                  </Label>
                  <Slider
                    value={[requestsPerDay]}
                    min={1}
                    max={10000}
                    step={1}
                    onValueChange={([v]) => setRequestsPerDay(v)}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={requestsPerDay}
                      onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                      className="w-32 border-indigo-300"
                    />
                    <span className="text-sm text-indigo-600">solicitudes/día</span>
                  </div>
                </div>

                {/* Results */}
                <div className="grid gap-3 md:grid-cols-4">
                  <Card className="border-indigo-200 bg-white/80">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-indigo-600 uppercase font-semibold">Por solicitud</p>
                      <p className="text-2xl font-bold text-indigo-900 mt-1">
                        ${calculatorResult.costPerRequest.toFixed(4)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-white/80">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-green-600 uppercase font-semibold">Diario</p>
                      <p className="text-2xl font-bold text-green-900 mt-1">
                        ${calculatorResult.dailyCost.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-white/80">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-purple-600 uppercase font-semibold">Mensual</p>
                      <p className="text-2xl font-bold text-purple-900 mt-1">
                        ${calculatorResult.monthlyCost.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200 bg-white/80">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-amber-600 uppercase font-semibold">Anual</p>
                      <p className="text-2xl font-bold text-amber-900 mt-1">
                        ${calculatorResult.yearlyCost.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Info */}
                <div className="flex items-start gap-2 p-3 bg-indigo-100/50 rounded-lg border border-indigo-200">
                  <Info className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-indigo-700">
                    <p className="font-semibold mb-1">Precios actuales (por 1K tokens):</p>
                    <p>
                      Entrada: <strong>${calculatorResult.prices.input}</strong> | 
                      Salida: <strong>${calculatorResult.prices.output}</strong>
                    </p>
                    <p className="mt-1 text-indigo-600">
                      💡 Los precios pueden variar. Consulta la documentación oficial de cada proveedor.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
