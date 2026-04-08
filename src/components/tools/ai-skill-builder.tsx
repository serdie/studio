'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Plus,
  X,
  Download,
  Copy,
  Trash2,
  Sparkles,
  Code2,
  Shield,
  Palette,
  TestTube,
  FileText,
  Zap,
  Layout,
  Search,
  Eye,
  Edit3,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Save,
  Upload,
  RefreshCw
} from 'lucide-react';

interface SkillRule {
  id: string;
  title: string;
  description: string;
  severity: 'suggest' | 'warn' | 'block';
  example: string;
  badExample: string;
}

interface AISkill {
  id: string;
  name: string;
  category: string;
  description: string;
  rules: SkillRule[];
  isActive: boolean;
  createdAt: string;
}

const CATEGORIES = [
  { id: 'design', name: 'Diseño UI/UX', icon: Palette, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
  { id: 'best-practices', name: 'Buenas Prácticas', icon: Code2, color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'error-review', name: 'Revisión de Errores', icon: Search, color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  { id: 'architecture', name: 'Arquitectura', icon: Layout, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { id: 'testing', name: 'Testing', icon: TestTube, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { id: 'documentation', name: 'Documentación', icon: FileText, color: 'from-amber-500 to-yellow-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  { id: 'security', name: 'Seguridad', icon: Shield, color: 'from-slate-600 to-slate-800', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
  { id: 'performance', name: 'Performance', icon: Zap, color: 'from-cyan-500 to-teal-500', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
];

const SEVERITY_OPTIONS = [
  { value: 'suggest' as const, label: '💡 Sugerir', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'warn' as const, label: '⚠️ Advertir', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'block' as const, label: '🚫 Bloquear', color: 'bg-red-100 text-red-700 border-red-200' },
];

const DEFAULT_RULE: SkillRule = {
  id: '',
  title: '',
  description: '',
  severity: 'suggest',
  example: '',
  badExample: '',
};

const EXAMPLE_SKILLS: AISkill[] = [
  {
    id: 'example-1',
    name: 'React Clean Code',
    category: 'best-practices',
    description: 'Reglas para escribir código React limpio y mantenible: componentes pequeños, hooks bien nombrados, sin props drilling excesivo.',
    rules: [
      {
        id: 'r1',
        title: 'Componentes de máximo 150 líneas',
        description: 'Si un componente supera 150 líneas, divídelo en subcomponentes más pequeños y reutilizables.',
        severity: 'warn',
        example: 'const UserCard = () => { return <div className="card">...</div>; };',
        badExample: 'const HugeComponent = () => { /* 300 líneas de código mezclado */ };',
      },
      {
        id: 'r2',
        title: 'Nombres descriptivos para hooks personalizados',
        description: 'Los hooks personalizados deben empezar con "use" y describir claramente su propósito.',
        severity: 'suggest',
        example: 'const { data, loading } = useFetchUser(id);',
        badExample: 'const { d, l } = useData(x);',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'example-2',
    name: 'Seguridad OWASP Top 10',
    category: 'security',
    description: 'Reglas de seguridad basadas en OWASP: sanitización de inputs, CSRF, XSS, autenticación segura.',
    rules: [
      {
        id: 'r3',
        title: 'Sanitizar todas las entradas de usuario',
        description: 'Nunca uses innerHTML o dangerouslySetInnerHTML sin sanitizar. Usa DOMPurify o equivalente.',
        severity: 'block',
        example: 'const safe = DOMPurify.sanitize(userInput); element.innerHTML = safe;',
        badExample: 'element.innerHTML = userInput; // Vulnerable a XSS',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'example-3',
    name: 'Diseño UI Accesible (WCAG 2.1)',
    category: 'design',
    description: 'Reglas de accesibilidad web: contraste de colores, atributos ARIA, navegación por teclado, textos alternativos.',
    rules: [
      {
        id: 'r4',
        title: 'Contraste mínimo 4.5:1 para texto normal',
        description: 'Todo texto debe tener un ratio de contraste de al menos 4.5:1 contra su fondo. Usa herramientas como WebAIM Contrast Checker.',
        severity: 'block',
        example: 'color: #1a1a1a; background-color: #ffffff; /* Ratio: 18.5:1 ✅ */',
        badExample: 'color: #999999; background-color: #ffffff; /* Ratio: 2.8:1 ❌ */',
      },
      {
        id: 'r5',
        title: 'Todas las imágenes deben tener alt descriptivo',
        description: 'Las imágenes informativas necesitan texto alternativo que describa su contenido. Las decorativas deben tener alt="" vacío.',
        severity: 'warn',
        example: '<img src="chart.png" alt="Gráfico de ventas Q3: aumento del 23%" />',
        badExample: '<img src="chart.png" /> // Sin alt',
      },
      {
        id: 'r6',
        title: 'Formularios con labels asociados',
        description: 'Cada input de formulario debe tener un label explícitamente asociado mediante htmlFor/id.',
        severity: 'block',
        example: '<label htmlFor="email">Email</label><input id="email" type="email" />',
        badExample: '<input type="email" placeholder="Email" /> // Sin label',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'example-4',
    name: 'Diseño Responsive First',
    category: 'design',
    description: 'Mobile-first approach: diseñar primero para móvil, luego escalar. Breakpoints consistentes, imágenes fluidas, touch targets adecuados.',
    rules: [
      {
        id: 'r7',
        title: 'Mobile-first: base styles para móvil',
        description: 'Escribe los estilos base para móvil y usa min-width media queries para pantallas más grandes.',
        severity: 'suggest',
        example: '.container { padding: 1rem; } @media (min-width: 768px) { .container { padding: 2rem; } }',
        badExample: '.container { padding: 2rem; } @media (max-width: 767px) { .container { padding: 1rem; } }',
      },
      {
        id: 'r8',
        title: 'Touch targets mínimo 44x44px',
        description: 'Todos los elementos interactivos (botones, links) deben tener un área táctil de al menos 44x44 píxeles.',
        severity: 'warn',
        example: '.btn { min-width: 44px; min-height: 44px; padding: 12px 16px; }',
        badExample: '.btn { width: 24px; height: 24px; } // Demasiado pequeño para móvil',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'example-5',
    name: 'Testing con Jest + RTL',
    category: 'testing',
    description: 'Reglas para tests efectivos: testear comportamiento no implementación, usar data-testid con moderación, mocks adecuados.',
    rules: [
      {
        id: 'r9',
        title: 'Testear comportamiento, no implementación',
        description: 'Los tests deben verificar lo que el usuario ve y hace, no los detalles internos del componente.',
        severity: 'warn',
        example: 'expect(screen.getByText(/bienvenido/i)).toBeInTheDocument();',
        badExample: 'expect(component.state.isLoggedIn).toBe(true);',
      },
      {
        id: 'r10',
        title: 'Un test por comportamiento',
        description: 'Cada test debe verificar un único comportamiento esperado. No combines múltiples assertions en un solo test.',
        severity: 'suggest',
        example: 'it("muestra error cuando el email es inválido", () => {...});',
        badExample: 'it("valida todo", () => { /* 15 assertions */ });',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'example-6',
    name: 'Performance Web Vitals',
    category: 'performance',
    description: 'Optimización de rendimiento: lazy loading, code splitting, imágenes optimizadas, minimizar re-renders.',
    rules: [
      {
        id: 'r11',
        title: 'Lazy loading para componentes pesados',
        description: 'Usa React.lazy() y Suspense para cargar componentes solo cuando se necesitan.',
        severity: 'suggest',
        example: 'const Chart = React.lazy(() => import("./Chart")); <Suspense fallback={<Spinner />}><Chart /></Suspense>;',
        badExample: 'import Chart from "./Chart"; // Se carga siempre aunque no se use',
      },
      {
        id: 'r12',
        title: 'Imágenes con width/height explícitos',
        description: 'Define width y height en imágenes para evitar CLS (Cumulative Layout Shift).',
        severity: 'warn',
        example: '<img src="hero.jpg" width="1200" height="600" alt="Hero" />',
        badExample: '<img src="hero.jpg" alt="Hero" /> // Sin dimensiones = CLS',
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export default function AISkillBuilder() {
  const [skills, setSkills] = useState<AISkill[]>(EXAMPLE_SKILLS);
  const [editingSkill, setEditingSkill] = useState<AISkill | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'editor'>('list');
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'markdown' | 'yaml'>('json');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const createNewSkill = () => {
    const newSkill: AISkill = {
      id: `skill-${Date.now()}`,
      name: '',
      category: 'best-practices',
      description: '',
      rules: [{ ...DEFAULT_RULE, id: `rule-${Date.now()}` }],
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setEditingSkill(newSkill);
    setActiveTab('editor');
  };

  const editSkill = (skill: AISkill) => {
    setEditingSkill({ ...skill, rules: skill.rules.map(r => ({ ...r })) });
    setActiveTab('editor');
  };

  const saveSkill = () => {
    if (!editingSkill || !editingSkill.name.trim()) return;
    setSkills(prev => {
      const existing = prev.findIndex(s => s.id === editingSkill.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = editingSkill;
        return updated;
      }
      return [...prev, editingSkill];
    });
    setEditingSkill(null);
    setActiveTab('list');
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const addRule = () => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      rules: [...editingSkill.rules, { ...DEFAULT_RULE, id: `rule-${Date.now()}` }],
    });
  };

  const removeRule = (ruleId: string) => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      rules: editingSkill.rules.filter(r => r.id !== ruleId),
    });
  };

  const updateRule = (ruleId: string, field: keyof SkillRule, value: string) => {
    if (!editingSkill) return;
    setEditingSkill({
      ...editingSkill,
      rules: editingSkill.rules.map(r => r.id === ruleId ? { ...r, [field]: value } : r),
    });
  };

  const exportSkill = (skill: AISkill) => {
    const cat = CATEGORIES.find(c => c.id === skill.category);
    let content = '';

    if (exportFormat === 'json') {
      content = JSON.stringify({
        name: skill.name,
        category: cat?.name || skill.category,
        description: skill.description,
        rules: skill.rules.map(r => ({
          title: r.title,
          description: r.description,
          severity: r.severity,
          good_example: r.example,
          bad_example: r.badExample,
        })),
      }, null, 2);
    } else if (exportFormat === 'markdown') {
      content = `# ${skill.name}\n\n**Categoría:** ${cat?.name}\n**Descripción:** ${skill.description}\n\n## Reglas\n\n${skill.rules.map((r, i) => `### ${i + 1}. ${r.title}\n\n**Nivel:** ${r.severity}\n\n${r.description}\n\n✅ **Bien:**\n\`\`\`\n${r.example}\n\`\`\`\n\n❌ **Mal:**\n\`\`\`\n${r.badExample}\n\`\`\``).join('\n\n')}`;
    } else {
      content = `name: ${skill.name}\ncategory: ${cat?.name}\ndescription: ${skill.description}\nrules:\n${skill.rules.map(r => `  - title: ${r.title}\n    severity: ${r.severity}\n    description: ${r.description}\n    good_example: |\n      ${r.example}\n    bad_example: |\n      ${r.badExample}`).join('\n')}`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}.${exportFormat === 'json' ? 'json' : exportFormat === 'markdown' ? 'md' : 'yaml'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySkillToClipboard = async (skill: AISkill) => {
    const content = JSON.stringify(skill, null, 2);
    try {
      await navigator.clipboard.writeText(content);
    } catch (e) {
      console.error('Error copying to clipboard:', e);
    }
  };

  // AI-powered skill generation
  const generateSkillWithAi = async () => {
    if (!aiPrompt.trim() || !editingSkill) return;
    setIsGenerating(true);

    const cat = CATEGORIES.find(c => c.id === editingSkill.category);
    const systemPrompt = `Eres un experto en desarrollo de software y creación de reglas para asistentes de IA de programación.

Genera un array de reglas JSON para un skill de IA.
Categoría del skill: ${cat?.name || editingSkill.category}
Tema solicitado: ${aiPrompt}

Cada regla debe tener EXACTAMENTE estos campos:
- "title": nombre corto y descriptivo de la regla (string)
- "description": qué debe hacer o evitar la IA, explicación clara (string)
- "severity": uno de "suggest", "warn", o "block" (string)
- "example": ejemplo de código CORRECTO que sigue la regla (string, una sola línea o con \\n)
- "badExample": ejemplo de código INCORRECTO que viola la regla (string, una sola línea o con \\n)

Genera entre 3 y 5 reglas bien documentadas con ejemplos de código realistas.
Devuelve SOLO el JSON array, sin explicaciones, sin markdown, sin texto adicional.
Formato: [{"title":"...","description":"...","severity":"...","example":"...","badExample":"..."}]`;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: systemPrompt }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          // Try to parse the AI response as JSON
          let rules: SkillRule[] = [];
          try {
            // Clean up the response - remove markdown code blocks if present
            let cleaned = data.text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            // Try to find JSON array in the response
            const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);
              if (Array.isArray(parsed)) {
                rules = parsed.map((r: any, i: number) => ({
                  id: `rule-ai-${Date.now()}-${i}`,
                  title: r.title || `Regla ${i + 1}`,
                  description: r.description || '',
                  severity: ['suggest', 'warn', 'block'].includes(r.severity) ? r.severity : 'suggest',
                  example: r.example || '',
                  badExample: r.badExample || r.bad_example || '',
                }));
              }
            }
          } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
          }

          if (rules.length > 0) {
            setEditingSkill({
              ...editingSkill,
              rules: [...editingSkill.rules, ...rules],
            });
            setAiPrompt('');
            setShowAiModal(false);
          }
        }
      }
    } catch (e) {
      console.error('Error generating skill with AI:', e);
    }
    setIsGenerating(false);
  };

  const getActiveCount = () => skills.filter(s => s.isActive).length;
  const getRulesCount = () => skills.reduce((total, s) => total + s.rules.length, 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI Skill Builder</h1>
            <p className="text-sm text-slate-600">Crea habilidades personalizadas para asistentes de IA de programación</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
            <Brain className="h-3 w-3 mr-1" />
            <strong>{skills.length}</strong> <span className="ml-1">skills creados</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            <strong>{getActiveCount()}</strong> <span className="ml-1">activos</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Code2 className="h-3 w-3 mr-1" />
            <strong>{getRulesCount()}</strong> <span className="ml-1">reglas totales</span>
          </Badge>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="space-y-6">
          {/* Tutorial Section */}
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-violet-900">📚 Tutorial: Cómo Crear e Instalar Skills para IA</h3>
                  <p className="text-sm text-violet-700">Guía paso a paso desde la creación hasta la instalación en tu asistente de IA</p>
                </div>
              </div>

              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-10">
                  <TabsTrigger value="create" className="text-xs">🛠️ Crear un Skill</TabsTrigger>
                  <TabsTrigger value="install" className="text-xs">📦 Instalar en tu IA</TabsTrigger>
                </TabsList>

                {/* Tab: Create */}
                <TabsContent value="create" className="mt-4 space-y-4">
                  <div className="grid gap-3">
                    {[
                      { step: 1, title: 'Elige una categoría', desc: 'Selecciona el área de conocimiento: Diseño, Buenas Prácticas, Seguridad, Testing, etc. Cada categoría tiene un color y icono identificativo.', icon: Layout },
                      { step: 2, title: 'Define el nombre y descripción', desc: 'Pon un nombre claro y descriptivo al skill. Ej: "React Clean Code", "Diseño UI Accesible". La descripción debe explicar qué hace el skill en 1-2 líneas.', icon: Edit3 },
                      { step: 3, title: 'Añade reglas con ejemplos', desc: 'Cada regla debe tener: título claro, descripción de qué debe hacer la IA, nivel de severidad (Sugerir/Advertir/Bloquear), ejemplo de código correcto y ejemplo incorrecto.', icon: Code2 },
                      { step: 4, title: 'Revisa y guarda', desc: 'Verifica que todas las reglas tienen ejemplos claros. Guarda el skill y aparecerá en tu lista. Puedes editarlo cuando quieras.', icon: Save },
                      { step: 5, title: 'Exporta tu skill', desc: 'Usa el botón de descarga para exportar en JSON, Markdown o YAML. Este archivo es el que instalarás en tu asistente de IA.', icon: Download },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <Card key={item.step} className="bg-white border-slate-200">
                          <CardContent className="p-3 flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">{item.step}</div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2"><Icon className="h-3.5 w-3.5 text-violet-500" /> {item.title}</h4>
                              <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Tab: Install */}
                <TabsContent value="install" className="mt-4 space-y-4">
                  <div className="grid gap-3">
                    {[
                      {
                        step: 1,
                        title: 'En Cursor (VS Code)',
                        desc: 'Ve a Settings → Rules → Añade tus reglas en el archivo .cursorrules en la raíz de tu proyecto. Pega el contenido JSON exportado formateado como instrucciones de texto.',
                        code: '# En la raíz de tu proyecto, crea:\n# .cursorrules\n\nEres un experto en desarrollo. Sigue estas reglas:\n\n1. [Pega aquí las reglas del skill]\n2. [Cada regla con su severidad]\n3. [Ejemplos de código correcto vs incorrecto]',
                        icon: Code2,
                      },
                      {
                        step: 2,
                        title: 'En GitHub Copilot (VS Code)',
                        desc: 'Crea un archivo .github/copilot-instructions.md en tu repositorio. Copia las reglas del skill exportado en formato Markdown.',
                        code: '# .github/copilot-instructions.md\n\n## Reglas de Código\n\n### [Nombre de la Regla]\n[Nivel: Sugerir/Advertir/Bloquear]\n[Descripción de la regla]\n\n✅ Bien:\n```[lenguaje]\n[código correcto]\n```\n\n❌ Mal:\n```[lenguaje]\n[código incorrecto]\n```',
                        icon: FileText,
                      },
                      {
                        step: 3,
                        title: 'En Localhost (Ollama + Custom System Prompt)',
                        desc: 'Al ejecutar un modelo local con Ollama, usa el parámetro --system para pasar tus reglas como system prompt. Exporta el skill en formato texto plano.',
                        code: '# Con Ollama:\nollama run llama3.2 --system "Eres un asistente de programación. Sigue estas reglas:\n\n1. [Regla 1 del skill]\n2. [Regla 2 del skill]\n3. [Regla N del skill]"',
                        icon: Zap,
                      },
                      {
                        step: 4,
                        title: 'En CLI (Aider / Open Interpreter)',
                        desc: 'Para Aider, usa el archivo .aider.conf.yml o pasa las reglas con --architect. Para Open Interpreter, crea un perfil personalizado en ~/.config/open-interpreter/profiles/.',
                        code: '# Aider: crear .aider.conf.yml\ninstructions:\n  - "[Regla 1 del skill]"\n  - "[Regla 2 del skill]"\n  - "[Regla N del skill]"\n\n# Ejecutar:\naider --architect --file .aider.conf.yml',
                        icon: Settings,
                      },
                      {
                        step: 5,
                        title: 'En Antigravity (Google)',
                        desc: 'Si Antigravity soporta configuración personalizada, busca la sección de "Custom Instructions" o "System Prompt" y pega las reglas exportadas en formato JSON o texto plano.',
                        code: '# En la configuración de Antigravity:\n# Settings → Custom Instructions → System Prompt\n\n# Pega el contenido del skill exportado\n# en formato JSON o texto plano:\n{\n  "name": "[Nombre del Skill]",\n  "rules": [\n    {\n      "title": "[Título]",\n      "severity": "[nivel]",\n      "description": "[descripción]"\n    }\n  ]\n}',
                        icon: Brain,
                      },
                      {
                        step: 6,
                        title: 'En Qwen (VS Code)',
                        desc: 'Abre la extensión de Qwen en VS Code. Ve a Settings → Custom Instructions o System Prompt. Pega las reglas del skill exportado. También puedes crear un archivo .qwen-skills.json en la raíz de tu proyecto.',
                        code: '# Opción A: En la extensión de Qwen (VS Code)\n# Settings → Custom Instructions → System Prompt\n# Pega las reglas del skill directamente\n\n# Opción B: Archivo de proyecto\n# Crea .qwen-skills.json en la raíz:\n{\n  "skills": [\n    {\n      "name": "[Nombre del Skill]",\n      "rules": [\n        {\n          "title": "[Regla 1]",\n          "severity": "[nivel]",\n          "description": "[descripción]",\n          "good_example": "[código correcto]",\n          "bad_example": "[código incorrecto]"\n        }\n      ]\n    }\n  ]\n}\n\n# Qwen leerá automáticamente este archivo\n# al abrir el proyecto en VS Code',
                        icon: Code2,
                      },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <Card key={item.step} className="bg-white border-slate-200">
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">{item.step}</div>
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2"><Icon className="h-3.5 w-3.5 text-blue-500" /> {item.title}</h4>
                                <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                            {item.code && (
                              <pre className="text-[10px] bg-slate-900 text-green-400 rounded-lg p-3 overflow-x-auto font-mono whitespace-pre-wrap break-all">{item.code}</pre>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Categories Grid */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <CardContent className="p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Categorías de Skills
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const count = skills.filter(s => s.category === cat.id).length;
                  return (
                    <Card key={cat.id} className={`${cat.bgColor} ${cat.borderColor} cursor-pointer hover:shadow-md transition-shadow`}>
                      <CardContent className="p-3 text-center space-y-2">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{cat.name}</p>
                          <p className="text-[10px] text-slate-500">{count} skill{count !== 1 ? 's' : ''}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Skills List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Mis Skills
              </h3>
              <Button onClick={createNewSkill} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full">
                <Plus className="h-4 w-4 mr-1.5" />
                Crear Skill
              </Button>
            </div>

            {skills.map(skill => {
              const cat = CATEGORIES.find(c => c.id === skill.category);
              const Icon = cat?.icon || Code2;
              const isExpanded = expandedSkill === skill.id;

              return (
                <Card key={skill.id} className={`${cat?.bgColor || 'bg-slate-50'} ${cat?.borderColor || 'border-slate-200'} hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${cat?.color || 'from-slate-500 to-slate-600'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-800">{skill.name || 'Sin nombre'}</h4>
                            <Badge variant="outline" className={`text-[9px] ${skill.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                              {skill.isActive ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{skill.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                            <span>{cat?.name}</span>
                            <span>·</span>
                            <span>{skill.rules.length} regla{skill.rules.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => setExpandedSkill(isExpanded ? null : skill.id)} className="h-7 w-7 p-0">
                          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => editSkill(skill)} className="h-7 w-7 p-0 text-blue-600">
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setShowExportModal(true); setEditingSkill(skill); }} className="h-7 w-7 p-0 text-green-600">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => copySkillToClipboard(skill)} className="h-7 w-7 p-0 text-slate-600">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => deleteSkill(skill.id)} className="h-7 w-7 p-0 text-red-600">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Rules */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                        {skill.rules.map((rule, i) => (
                          <Card key={rule.id} className="bg-white border-slate-200">
                            <CardContent className="p-3 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-700">Regla {i + 1}: {rule.title || 'Sin título'}</span>
                                <Badge variant="outline" className={`text-[9px] ${SEVERITY_OPTIONS.find(s => s.value === rule.severity)?.color || ''}`}>
                                  {SEVERITY_OPTIONS.find(s => s.value === rule.severity)?.label || rule.severity}
                                </Badge>
                              </div>
                              <p className="text-[11px] text-slate-600">{rule.description}</p>
                              {rule.example && (
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="p-2 rounded bg-green-50 border border-green-200">
                                    <p className="text-[9px] font-semibold text-green-700 mb-1">✅ Bien:</p>
                                    <pre className="text-[9px] text-green-800 font-mono whitespace-pre-wrap break-all">{rule.example}</pre>
                                  </div>
                                  <div className="p-2 rounded bg-red-50 border border-red-200">
                                    <p className="text-[9px] font-semibold text-red-700 mb-1">❌ Mal:</p>
                                    <pre className="text-[9px] text-red-800 font-mono whitespace-pre-wrap break-all">{rule.badExample}</pre>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        /* Editor */
        <div className="space-y-6">
          {/* Editor Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { setEditingSkill(null); setActiveTab('list'); }} className="border-slate-300">
                <ChevronRight className="h-3.5 w-3.5 mr-1 rotate-180" />
                Volver
              </Button>
              <h3 className="text-lg font-bold text-slate-800">
                {editingSkill?.name ? `Editando: ${editingSkill.name}` : 'Nuevo Skill'}
              </h3>
            </div>
            <Button onClick={saveSkill} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full">
              <Save className="h-4 w-4 mr-1.5" />
              Guardar Skill
            </Button>
          </div>

          {editingSkill && (
            <>
              {/* Basic Info */}
              <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-white to-purple-50">
                <CardContent className="p-5 space-y-4">
                  <h4 className="text-sm font-bold text-violet-900 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Información Básica
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-600">Nombre del Skill *</label>
                      <Input placeholder="Ej.: React Clean Code" className="text-xs bg-white" value={editingSkill.name} onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-600">Categoría</label>
                      <select className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs" value={editingSkill.category} onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">Descripción</label>
                    <Textarea placeholder="Describe qué hace este skill y para qué sirve..." className="text-xs bg-white min-h-[60px]" value={editingSkill.description} onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })} />
                  </div>
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={editingSkill.isActive} onChange={(e) => setEditingSkill({ ...editingSkill, isActive: e.target.checked })} className="accent-violet-500" />
                    Skill activo
                  </label>
                </CardContent>
              </Card>

              {/* Rules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Reglas ({editingSkill.rules.length})
                  </h4>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setShowAiModal(true)} className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full">
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      Generar con IA
                    </Button>
                    <Button size="sm" onClick={addRule} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Añadir Regla
                    </Button>
                  </div>
                </div>

                {editingSkill.rules.map((rule, i) => (
                  <Card key={rule.id} className="border-slate-200 bg-white">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Regla {i + 1}</span>
                        {editingSkill.rules.length > 1 && (
                          <Button size="sm" variant="ghost" onClick={() => removeRule(rule.id)} className="text-red-500 h-7 w-7 p-0">
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-slate-600">Título de la regla</label>
                          <Input placeholder="Ej.: Componentes de máximo 150 líneas" className="text-xs bg-white" value={rule.title} onChange={(e) => updateRule(rule.id, 'title', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-slate-600">Nivel de severidad</label>
                          <select className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs" value={rule.severity} onChange={(e) => updateRule(rule.id, 'severity', e.target.value as SkillRule['severity'])}>
                            {SEVERITY_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600">Descripción de la regla</label>
                        <Textarea placeholder="Explica qué debe hacer la IA cuando encuentre esta situación..." className="text-xs bg-white min-h-[60px]" value={rule.description} onChange={(e) => updateRule(rule.id, 'description', e.target.value)} />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-green-700 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Ejemplo correcto
                          </label>
                          <Textarea placeholder="Código que sigue la regla..." className="text-xs bg-green-50 border-green-200 min-h-[80px] font-mono" value={rule.example} onChange={(e) => updateRule(rule.id, 'example', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-red-700 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Ejemplo incorrecto
                          </label>
                          <Textarea placeholder="Código que viola la regla..." className="text-xs bg-red-50 border-red-200 min-h-[80px] font-mono" value={rule.badExample} onChange={(e) => updateRule(rule.id, 'badExample', e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && editingSkill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-slate-200 bg-white">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Exportar Skill</h4>
                <Button size="sm" variant="ghost" onClick={() => setShowExportModal(false)} className="h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Formato de exportación</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['json', 'markdown', 'yaml'] as const).map(fmt => (
                    <button key={fmt} onClick={() => setExportFormat(fmt)} className={`px-3 py-2 rounded-lg text-xs border-2 transition-all uppercase font-semibold ${exportFormat === fmt ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-600'}`}>
                      {fmt === 'json' ? 'JSON' : fmt === 'markdown' ? 'Markdown' : 'YAML'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => { exportSkill(editingSkill); setShowExportModal(false); }} className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full">
                  <Download className="h-4 w-4 mr-1.5" />
                  Descargar
                </Button>
                <Button variant="outline" onClick={() => setShowExportModal(false)} className="border-slate-300">Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Generation Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg border-violet-200 bg-white">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">✨ Generar Reglas con IA</h4>
                </div>
                <Button size="sm" variant="ghost" onClick={() => { setShowAiModal(false); setAiPrompt(''); }} className="h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>
              </div>

              <div className="p-3 rounded-lg bg-violet-50 border border-violet-200">
                <p className="text-xs text-violet-800">
                  <strong>Categoría actual:</strong> {CATEGORIES.find(c => c.id === editingSkill?.category)?.name || editingSkill?.category}
                </p>
                <p className="text-xs text-violet-700 mt-1">
                  Describe qué reglas quieres y la IA las generará automáticamente con ejemplos de código correcto e incorrecto.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Describe las reglas que quieres generar</label>
                <Textarea
                  placeholder="Ej.: Quiero reglas para React con hooks bien nombrados, componentes pequeños de máximo 150 líneas, y evitar props drilling excesivo pasando más de 3 niveles..."
                  className="text-xs bg-white min-h-[120px]"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={generateSkillWithAi}
                  disabled={!aiPrompt.trim() || isGenerating}
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-full"
                >
                  {isGenerating ? (
                    <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" /> Generando...</>
                  ) : (
                    <><Sparkles className="h-4 w-4 mr-1.5" /> Generar Reglas</>
                  )}
                </Button>
                <Button variant="outline" onClick={() => { setShowAiModal(false); setAiPrompt(''); }} className="border-slate-300">Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
