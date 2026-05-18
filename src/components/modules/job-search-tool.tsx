'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Map,
  Rocket,
  Send,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

type SectionId = 'dashboard' | 'profile' | 'market' | 'companies' | 'assets' | 'campaigns' | 'pipeline' | 'analytics' | 'playbook' | 'ethics';

interface Company {
  name: string;
  sector: string;
  location: string;
  contact: string;
  priority: 'A' | 'B' | 'C';
  stage: 'Investigada' | 'Lista para contacto' | 'Primer envío' | 'Seguimiento' | 'Entrevista';
}

const sections: { id: SectionId; title: string; description: string; icon: React.ElementType }[] = [
  { id: 'dashboard', title: 'Tablero', description: 'Centro de mando', icon: LayoutDashboard },
  { id: 'profile', title: 'Producto', description: 'Perfil como oferta', icon: GraduationCap },
  { id: 'market', title: 'Mercado', description: 'Sectores e ICP', icon: Map },
  { id: 'companies', title: 'CRM', description: 'Empresas objetivo', icon: Building2 },
  { id: 'assets', title: 'Activos', description: 'CV, landing y portfolio', icon: ClipboardList },
  { id: 'campaigns', title: 'Campañas', description: 'Mensajes y secuencia', icon: Send },
  { id: 'pipeline', title: 'Pipeline', description: 'Oportunidades', icon: Briefcase },
  { id: 'analytics', title: 'Analítica', description: 'Medición semanal', icon: BarChart3 },
  { id: 'playbook', title: 'Playbook', description: 'Uso docente', icon: Rocket },
  { id: 'ethics', title: 'Legal', description: 'Uso responsable', icon: CheckCircle2 },
];

const demoCompanies: Company[] = [
  { name: 'Nova Digital Studio', sector: 'Agencia', location: 'Toledo', contact: 'LinkedIn / RRHH', priority: 'A', stage: 'Lista para contacto' },
  { name: 'EcoCommerce Hub', sector: 'Ecommerce', location: 'Remoto', contact: 'empleo@empresa.com', priority: 'A', stage: 'Primer envío' },
  { name: 'Grupo Ágora', sector: 'Consultoría', location: 'Madrid', contact: 'Formulario corporativo', priority: 'B', stage: 'Investigada' },
  { name: 'Retail CLM', sector: 'Retail', location: 'Talavera', contact: 'Info corporativa', priority: 'B', stage: 'Seguimiento' },
  { name: 'Toledo Service Tech', sector: 'Servicios', location: 'Toledo', contact: 'Talent page', priority: 'A', stage: 'Entrevista' },
];

const stageColumns: Company['stage'][] = ['Investigada', 'Primer envío', 'Seguimiento', 'Entrevista'];

const priorityStyles = {
  A: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  B: 'bg-amber-100 text-amber-800 border-amber-200',
  C: 'bg-rose-100 text-rose-800 border-rose-200',
};

export default function JobSearchTool() {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');
  const [profile, setProfile] = useState({
    name: '',
    headline: '',
    valueProp: '',
    sectors: '',
    roles: '',
    skills: '',
  });
  const [companyDraft, setCompanyDraft] = useState<Company>({
    name: '',
    sector: '',
    location: '',
    contact: '',
    priority: 'A',
    stage: 'Investigada',
  });
  const [companies, setCompanies] = useState<Company[]>(demoCompanies);
  const [mailDraft, setMailDraft] = useState({ company: '', role: '', value: '' });
  const [generatedProfile, setGeneratedProfile] = useState('');
  const [generatedMail, setGeneratedMail] = useState('');

  const completion = useMemo(() => {
    const profileFields = Object.values(profile).filter(Boolean).length;
    const companyScore = Math.min(companies.length, 10);
    return Math.min(100, Math.round((profileFields / 6) * 45 + (companyScore / 10) * 35 + (generatedMail ? 20 : 0)));
  }, [companies.length, generatedMail, profile]);

  const stats = useMemo(() => ({
    priorityA: companies.filter((company) => company.priority === 'A').length,
    interviews: companies.filter((company) => company.stage === 'Entrevista').length,
    followups: companies.filter((company) => company.stage === 'Seguimiento').length,
  }), [companies]);

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateCompanyDraft = (field: keyof Company, value: string) => {
    setCompanyDraft((current) => ({ ...current, [field]: value } as Company));
  };

  const loadDemo = () => {
    setProfile({
      name: 'Lucía Martín',
      headline: 'Perfil junior en marketing digital, automatización e IA aplicada',
      valueProp: 'Ayudo a pequeñas y medianas empresas a mejorar su visibilidad, organización comercial y procesos digitales con herramientas accesibles, capacidad de aprendizaje rápido y orientación práctica.',
      sectors: 'agencias, ecommerce, formación, servicios digitales',
      roles: 'marketing junior, soporte digital, operaciones, contenido',
      skills: 'ChatGPT, Canva, Excel, redacción, atención al cliente, organización, seguimiento comercial, aprendizaje rápido',
    });
    setCompanies(demoCompanies);
    setMailDraft({
      company: 'Nova Digital Studio',
      role: 'marketing y contenido junior',
      value: 'puedo apoyar en contenido, campañas, soporte de marketing y organización operativa con enfoque práctico y digital',
    });
    setGeneratedProfile('Lucía Martín se presenta como un perfil junior orientado a marketing digital, automatización e IA aplicada. Su propuesta combina comunicación, herramientas digitales y capacidad de ejecución para pymes, agencias y ecommerce que necesitan apoyo operativo con mentalidad práctica.');
    setGeneratedMail('Hola, he estado revisando Nova Digital Studio y creo que mi perfil puede encajar en marketing y contenido junior. Me interesa vuestro enfoque y considero que puedo apoyar en contenido, campañas, soporte de marketing y organización operativa con enfoque práctico y digital. He preparado una presentación breve con mi CV y una página personal para que podáis valorar mejor mi encaje. Si lo veis oportuno, me encantará conversar unos minutos.');
  };

  const buildProfile = () => {
    const name = profile.name || 'El alumno';
    const headline = profile.headline || 'perfil junior con alto potencial';
    const value = profile.valueProp || 'aporta capacidad de aprendizaje, herramientas digitales y orientación a resultados';
    const sectors = profile.sectors || 'servicios, ecommerce y agencias';
    const roles = profile.roles || 'soporte, marketing y operaciones';
    setGeneratedProfile(`${name} se presenta como ${headline}. Su propuesta de valor: ${value}. Encaja especialmente en ${sectors}, para funciones de ${roles}. La comunicación debe vender valor concreto, no solo disponibilidad.`);
  };

  const addCompany = () => {
    if (!companyDraft.name.trim()) return;
    setCompanies((current) => [...current, companyDraft]);
    setCompanyDraft({ name: '', sector: '', location: '', contact: '', priority: 'A', stage: 'Investigada' });
  };

  const generateMail = () => {
    const company = mailDraft.company || 'la empresa';
    const role = mailDraft.role || 'una posición junior';
    const value = mailDraft.value || 'puedo aportar iniciativa, aprendizaje rápido y capacidad de ejecución';
    setGeneratedMail(`Hola, he estado revisando ${company} y creo que mi perfil puede encajar en ${role}. Me interesa especialmente vuestro enfoque y considero que ${value}. He preparado una presentación breve con mi CV y una página personal para que podáis valorar mejor mi encaje. Si lo veis oportuno, me encantará conversar unos minutos y explicaros cómo podría aportar desde el primer día.`);
  };

  const exportPlan = () => {
    const text = [
      'PLAN DE PROSPECCIÓN LABORAL',
      '',
      `Alumno: ${profile.name || '-'}`,
      `Titular: ${profile.headline || '-'}`,
      `Propuesta de valor: ${profile.valueProp || '-'}`,
      `Sectores: ${profile.sectors || '-'}`,
      `Roles: ${profile.roles || '-'}`,
      `Competencias: ${profile.skills || '-'}`,
      '',
      `Empresas objetivo registradas: ${companies.length}`,
      ...companies.map((company) => `- ${company.name} | ${company.sector} | ${company.priority} | ${company.stage}`),
      '',
      `Mensaje base: ${generatedMail || '-'}`,
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'plan-prospeccion-laboral.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <PastelPanel>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Centro de mando</h3>
                  <p className="text-sm text-slate-600">Visión global del sistema comercial de inserción profesional.</p>
                </div>
                <div className="grid gap-3 md:grid-cols-4">
                  <Metric label="Encaje profesional" value={`${completion}%`} tone="mint" />
                  <Metric label="Empresas objetivo" value={String(companies.length)} tone="sky" />
                  <Metric label="Prioridad A" value={String(stats.priorityA)} tone="peach" />
                  <Metric label="Entrevistas" value={String(stats.interviews)} tone="lavender" />
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Estado del alumno</Badge>
                      <h4 className="mt-3 text-lg font-bold text-slate-900">Producto profesional preparado para mercado</h4>
                      <p className="mt-1 text-sm text-slate-600">Mide definición del perfil, foco sectorial, activos, volumen de prospección y ritmo de seguimiento.</p>
                    </div>
                    <Gauge className="h-10 w-10 text-emerald-500" />
                  </div>
                  <Progress value={completion} className="mt-4 h-2" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['CV sectorial', 'Landing personal', 'Pipeline comercial', 'Secuencia de contacto', 'Analítica semanal'].map((chip) => (
                      <span key={chip} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Ruta maestra</h3>
              <p className="mb-4 text-sm text-slate-600">El alumno avanza como si dirigiera su propio proceso comercial.</p>
              <div className="space-y-3">
                {[
                  ['Definir producto', 'Quién soy, qué resuelvo, para quién encajo y por qué me contratarían.'],
                  ['Mapear mercado', 'Sectores, empresas, señales de oportunidad y prioridades A/B/C.'],
                  ['Activar campaña', 'CV, landing, mensajes, seguimiento y medición de respuesta.'],
                  ['Convertir', 'Conversación, entrevista, prueba, propuesta y cierre.'],
                ].map(([title, text], index) => (
                  <div key={title} className="flex gap-3 rounded-2xl bg-white/75 p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-200 to-sky-200 text-sm font-black text-slate-800">{index + 1}</div>
                    <div>
                      <p className="font-bold text-slate-900">{title}</p>
                      <p className="text-xs text-slate-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PastelPanel>
          </div>
        );
      case 'profile':
        return (
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Diseño del producto profesional</h3>
              <p className="mb-4 text-sm text-slate-600">Construye la propuesta de valor del alumno como si fuese una oferta comercial.</p>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Nombre del alumno"><Input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} placeholder="Ej. Lucía Martín" /></Field>
                <Field label="Titular profesional"><Input value={profile.headline} onChange={(e) => updateProfile('headline', e.target.value)} placeholder="Ej. Marketing digital e IA aplicada" /></Field>
                <Field label="Propuesta de valor" full><Textarea value={profile.valueProp} onChange={(e) => updateProfile('valueProp', e.target.value)} placeholder="Qué problema ayuda a resolver, para quién y con qué fortalezas." /></Field>
                <Field label="Sectores prioritarios"><Input value={profile.sectors} onChange={(e) => updateProfile('sectors', e.target.value)} placeholder="Agencias, ecommerce, retail" /></Field>
                <Field label="Puestos objetivo"><Input value={profile.roles} onChange={(e) => updateProfile('roles', e.target.value)} placeholder="Marketing junior, soporte digital" /></Field>
                <Field label="Competencias vendibles" full><Textarea value={profile.skills} onChange={(e) => updateProfile('skills', e.target.value)} placeholder="Herramientas, idiomas, soft skills, certificaciones." /></Field>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={buildProfile} className="bg-slate-900 text-white hover:bg-slate-800"><Sparkles className="mr-2 h-4 w-4" /> Generar ficha comercial</Button>
                <Button onClick={loadDemo} variant="outline">Cargar demo</Button>
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Ficha comercial</h3>
              <p className="mb-4 text-sm text-slate-600">Narrativa breve para CV, LinkedIn, portfolio y mensajes.</p>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm leading-relaxed text-emerald-950">
                {generatedProfile || 'Genera la ficha para ver una versión sintetizada del perfil profesional.'}
              </div>
              <div className="mt-4 grid gap-3">
                {['Valor actual: lo que puede ofrecer desde el día 1.', 'Aprendizaje rápido: lo que puede adquirir en semanas.', 'Fuera de foco: lo que no conviene vender todavía.'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/75 p-3 text-sm text-slate-700">{item}</div>
                ))}
              </div>
            </PastelPanel>
          </div>
        );
      case 'market':
        return (
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Mapa de mercado</h3>
              <p className="mb-4 text-sm text-slate-600">Selecciona sectores y empresas con mayor probabilidad de encaje.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ['PYMES locales', 'Rápidas para entrar, trato cercano y necesidad de perfiles polivalentes.'],
                  ['Agencias y servicios', 'Valoran iniciativa, ritmo comercial, herramientas digitales y comunicación.'],
                  ['Ecommerce y retail', 'Buen encaje para soporte, marketing, operaciones y atención cliente.'],
                  ['Consultoras y startups', 'Necesitan perfiles adaptables, aprendizaje rápido y mentalidad digital.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/70 bg-white/75 p-4">
                    <Target className="mb-2 h-5 w-5 text-sky-500" />
                    <p className="font-bold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Prioridad sectorial</h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/80 bg-white/70">
                {[
                  ['Agencias', 'Alta', 'Alta', 'A'],
                  ['Ecommerce', 'Alta', 'Alta', 'A'],
                  ['Industria local', 'Media', 'Media', 'B'],
                  ['Consultoría', 'Media', 'Baja', 'B'],
                  ['Gran corporación', 'Variable', 'Baja', 'C'],
                ].map(([sector, fit, entry, priority]) => (
                  <div key={sector} className="grid grid-cols-4 gap-2 border-b border-slate-100 p-3 text-sm last:border-b-0">
                    <span className="font-semibold text-slate-900">{sector}</span>
                    <span className="text-slate-600">{fit}</span>
                    <span className="text-slate-600">{entry}</span>
                    <Badge variant="outline" className={priorityStyles[priority as 'A' | 'B' | 'C']}>{priority}</Badge>
                  </div>
                ))}
              </div>
            </PastelPanel>
          </div>
        );
      case 'companies':
        return (
          <PastelPanel>
            <h3 className="text-xl font-bold text-slate-900">CRM de empresas objetivo</h3>
            <p className="mb-4 text-sm text-slate-600">Base comercial para investigar, clasificar y seguir contactos de forma ordenada.</p>
            <div className="grid gap-3 md:grid-cols-3">
              <Field label="Empresa"><Input value={companyDraft.name} onChange={(e) => updateCompanyDraft('name', e.target.value)} placeholder="Nova Digital Studio" /></Field>
              <Field label="Sector"><Input value={companyDraft.sector} onChange={(e) => updateCompanyDraft('sector', e.target.value)} placeholder="Agencia / Ecommerce" /></Field>
              <Field label="Ubicación"><Input value={companyDraft.location} onChange={(e) => updateCompanyDraft('location', e.target.value)} placeholder="Toledo / Remoto" /></Field>
              <Field label="Contacto"><Input value={companyDraft.contact} onChange={(e) => updateCompanyDraft('contact', e.target.value)} placeholder="LinkedIn / email" /></Field>
              <Field label="Prioridad"><SelectLike value={companyDraft.priority} onChange={(value) => updateCompanyDraft('priority', value)} options={['A', 'B', 'C']} /></Field>
              <Field label="Estado"><SelectLike value={companyDraft.stage} onChange={(value) => updateCompanyDraft('stage', value)} options={['Investigada', 'Lista para contacto', 'Primer envío', 'Seguimiento', 'Entrevista']} /></Field>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={addCompany} className="bg-slate-900 text-white hover:bg-slate-800">Añadir empresa</Button>
              <Button onClick={() => setCompanies(demoCompanies)} variant="outline">Cargar cartera demo</Button>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/80 bg-white/75">
              <div className="grid grid-cols-6 gap-2 bg-slate-50 p-3 text-xs font-bold uppercase text-slate-500">
                <span>Empresa</span><span>Sector</span><span>Ubicación</span><span>Contacto</span><span>Prioridad</span><span>Estado</span>
              </div>
              {companies.map((company, index) => (
                <div key={`${company.name}-${index}`} className="grid grid-cols-1 gap-2 border-t border-slate-100 p-3 text-sm md:grid-cols-6">
                  <span className="font-semibold text-slate-900">{company.name}</span>
                  <span className="text-slate-600">{company.sector}</span>
                  <span className="text-slate-600">{company.location}</span>
                  <span className="text-slate-600">{company.contact}</span>
                  <Badge variant="outline" className={priorityStyles[company.priority]}>{company.priority}</Badge>
                  <span className="text-slate-600">{company.stage}</span>
                </div>
              ))}
            </div>
          </PastelPanel>
        );
      case 'assets':
        return (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Kit comercial del alumno</h3>
              <p className="mb-4 text-sm text-slate-600">Todo lo que necesita para vender valor, no solo enviar un CV.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {['CV maestro', 'CV sectorial', 'Landing personal', 'Mensaje de primer contacto', 'Mini caso o portfolio', 'LinkedIn optimizado'].map((asset, index) => (
                  <div key={asset} className="rounded-2xl border border-white/80 bg-white/75 p-4">
                    <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-100">Activo {index + 1}</Badge>
                    <p className="mt-3 font-bold text-slate-900">{asset}</p>
                    <p className="text-sm text-slate-600">Control de calidad, adaptación al sector y prueba de valor antes de enviar.</p>
                  </div>
                ))}
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Checklist de calidad</h3>
              <div className="mt-4 space-y-3">
                {['El titular profesional explica claramente el valor.', 'El CV está adaptado al sector.', 'La landing tiene CTA, proyectos y prueba de competencias.', 'El mensaje aporta contexto real.', 'Hay coherencia entre CV, web y LinkedIn.', 'Lo esencial se entiende en menos de 90 segundos.'].map((item) => (
                  <div key={item} className="flex gap-2 rounded-2xl bg-white/75 p-3 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </PastelPanel>
          </div>
        );
      case 'campaigns':
        return (
          <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Secuencia de contacto</h3>
              <div className="mt-4 space-y-3">
                {[
                  ['Impacto 1', 'Presentación: quién soy, por qué encajo y qué valor puedo aportar.'],
                  ['Impacto 2', 'Seguimiento corto: mensaje breve y elegante para reactivar.'],
                  ['Impacto 3', 'Aportación de valor: mini idea o sugerencia para demostrar iniciativa.'],
                  ['Impacto 4', 'Cierre inteligente: pedir derivación o dejar puerta abierta.'],
                ].map(([badge, text]) => (
                  <div key={badge} className="rounded-2xl bg-white/75 p-4">
                    <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">{badge}</Badge>
                    <p className="mt-2 text-sm text-slate-700">{text}</p>
                  </div>
                ))}
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Generador de mensaje</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Field label="Empresa"><Input value={mailDraft.company} onChange={(e) => setMailDraft((current) => ({ ...current, company: e.target.value }))} placeholder="Empresa objetivo" /></Field>
                <Field label="Rol"><Input value={mailDraft.role} onChange={(e) => setMailDraft((current) => ({ ...current, role: e.target.value }))} placeholder="Puesto o área" /></Field>
                <Field label="Valor que ofrezco" full><Textarea value={mailDraft.value} onChange={(e) => setMailDraft((current) => ({ ...current, value: e.target.value }))} placeholder="Qué puede aportar el alumno a esa empresa." /></Field>
              </div>
              <Button onClick={generateMail} className="mt-4 bg-slate-900 text-white hover:bg-slate-800"><Mail className="mr-2 h-4 w-4" /> Generar borrador</Button>
              <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm leading-relaxed text-sky-950">
                {generatedMail || 'Aquí aparecerá un mensaje de contacto inicial con tono profesional y comercial.'}
              </div>
            </PastelPanel>
          </div>
        );
      case 'pipeline':
        return (
          <PastelPanel>
            <h3 className="text-xl font-bold text-slate-900">Pipeline de oportunidades</h3>
            <p className="mb-4 text-sm text-slate-600">Embudo visual para gestionar la búsqueda como un proceso comercial.</p>
            <div className="grid gap-3 lg:grid-cols-4">
              {stageColumns.map((stage) => (
                <div key={stage} className="min-h-72 rounded-2xl border border-white/80 bg-white/60 p-3">
                  <p className="mb-3 font-bold text-slate-900">{stage}</p>
                  {companies.filter((company) => company.stage === stage || (stage === 'Primer envío' && company.stage === 'Lista para contacto')).map((company) => (
                    <div key={`${stage}-${company.name}`} className="mb-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                      <p className="font-semibold text-slate-900">{company.name}</p>
                      <p className="text-xs text-slate-500">{company.sector} · {company.location}</p>
                      <Badge variant="outline" className={`mt-2 ${priorityStyles[company.priority]}`}>{company.priority}</Badge>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </PastelPanel>
        );
      case 'analytics':
        return (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Panel de medición</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Metric label="Mensajes enviados" value="24" tone="sky" />
                <Metric label="Respuestas obtenidas" value="7" tone="mint" />
                <Metric label="Entrevistas" value={String(stats.interviews)} tone="lavender" />
              </div>
              <div className="mt-4 rounded-2xl bg-white/75 p-4 text-sm text-slate-700">
                Usa enlaces con parámetros UTM para saber qué campaña, mensaje o canal lleva tráfico a la web profesional del alumno.
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Interpretación docente</h3>
              {['Tasa de respuesta baja: mensaje genérico, mala selección de empresas o propuesta poco concreta.', 'Visitas a la landing sin respuesta: el activo no convierte o no transmite valor diferencial.', 'Entrevistas sin cierre: mejorar argumentario, ejemplos o prueba de encaje.'].map((item) => (
                <div key={item} className="mt-3 rounded-2xl bg-white/75 p-4 text-sm text-slate-700">{item}</div>
              ))}
            </PastelPanel>
          </div>
        );
      case 'playbook':
        return (
          <div className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Playbook docente</h3>
              <div className="mt-4 space-y-3">
                {[
                  ['Semana 1', 'Perfil profesional, titular, propuesta de valor y sectores.'],
                  ['Semana 2', 'Base de 30-50 empresas por alumno y clasificación A/B/C.'],
                  ['Semana 3', 'Construcción de activos: CV, landing, mensajes y portfolio.'],
                  ['Semana 4', 'Campañas, seguimiento, analítica, optimización y simulación de entrevistas.'],
                ].map(([title, text], index) => (
                  <div key={title} className="flex gap-3 rounded-2xl bg-white/75 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-rose-200 font-black text-slate-800">{index + 1}</div>
                    <div><p className="font-bold text-slate-900">{title}</p><p className="text-sm text-slate-600">{text}</p></div>
                  </div>
                ))}
              </div>
            </PastelPanel>
            <PastelPanel>
              <h3 className="text-xl font-bold text-slate-900">Modo juego</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {['+5 empresa bien investigada', '+10 contacto validado', '+15 landing publicada', '+20 respuesta real', '+30 entrevista', '+50 oferta o proceso abierto'].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/75 p-4 font-semibold text-slate-800">{item}</div>
                ))}
              </div>
            </PastelPanel>
          </div>
        );
      case 'ethics':
        return (
          <PastelPanel>
            <h3 className="text-xl font-bold text-slate-900">Uso responsable</h3>
            <p className="mb-4 text-sm text-slate-600">La prospección se plantea con enfoque comercial, pero debe hacerse con criterios legales y éticos.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ['Recomendado', 'Usar webs corporativas, canales oficiales, formularios de empleo, páginas de empresa y fuentes públicas.'],
                ['No recomendado', 'Recolectar datos personales indiscriminadamente o lanzar campañas masivas sin segmentación.'],
                ['Buena práctica', 'Documentar la fuente del contacto, la fecha y la finalidad del acercamiento.'],
                ['Medición responsable', 'Usar analítica para medir campañas y activos, no para identificar personas concretas.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-white/75 p-4">
                  <p className="font-bold text-slate-900">{title}</p>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </PastelPanel>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 via-sky-50 to-emerald-50 p-4 shadow-sm md:p-6">
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-white/80 bg-white/65 p-4 shadow-sm backdrop-blur">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200 via-sky-200 to-emerald-200">
              <Briefcase className="h-6 w-6 text-slate-800" />
            </div>
            <div>
              <h3 className="text-base font-black leading-tight text-slate-950">Máquina de Prospección Laboral</h3>
              <p className="text-xs text-slate-500">Módulo 9 · Empleabilidad comercial</p>
            </div>
          </div>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition-all ${
                  activeSection === section.id
                    ? 'border-slate-200 bg-slate-900 text-white shadow-md'
                    : 'border-transparent text-slate-600 hover:border-white hover:bg-white/80'
                }`}
              >
                <section.icon className={`mt-0.5 h-4 w-4 ${activeSection === section.id ? 'text-emerald-200' : 'text-slate-400'}`} />
                <span>
                  <span className="block text-sm font-bold">{section.title}</span>
                  <span className={`block text-xs ${activeSection === section.id ? 'text-slate-300' : 'text-slate-400'}`}>{section.description}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 p-4 text-xs text-slate-700">
            Diseñada para que cada alumno se comporte como una microempresa que vende valor profesional.
          </div>
        </aside>

        <main className="space-y-5">
          <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm md:p-7">
            <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="absolute bottom-0 right-24 h-28 w-28 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="relative grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              <div>
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Herramienta premium · prospección activa</Badge>
                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-slate-950 md:text-5xl">
                  Convierte a cada alumno en un producto que sabe venderse
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                  Plataforma visual e interactiva para definir perfil profesional, mapear sectores, seleccionar empresas objetivo,
                  construir una base comercial, diseñar activos, lanzar campañas, medir resultados y convertir oportunidades en entrevistas.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button onClick={() => setActiveSection('dashboard')} className="bg-slate-900 text-white hover:bg-slate-800">Entrar al tablero</Button>
                  <Button onClick={loadDemo} variant="outline" className="bg-white/80">Cargar demo espectacular</Button>
                  <Button onClick={exportPlan} variant="outline" className="bg-white/80"><Download className="mr-2 h-4 w-4" /> Exportar plan</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <HeroMini value="10" label="módulos internos" />
                <HeroMini value="1 CRM" label="empresas y contactos" />
                <HeroMini value="3 capas" label="estrategia, acción y medición" />
                <HeroMini value="18" label="alumnos con plan propio" />
              </div>
            </div>
          </section>

          {renderSection()}
        </main>
      </div>
    </div>
  );
}

function PastelPanel({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur">
      {children}
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? 'md:col-span-2' : ''}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: 'mint' | 'sky' | 'peach' | 'lavender' }) {
  const tones = {
    mint: 'from-emerald-100 to-teal-100',
    sky: 'from-sky-100 to-blue-100',
    peach: 'from-amber-100 to-orange-100',
    lavender: 'from-violet-100 to-fuchsia-100',
  };
  return (
    <div className={`rounded-2xl border border-white/80 bg-gradient-to-br ${tones[tone]} p-4`}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}

function HeroMini({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/80 bg-white/70 p-4">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function SelectLike({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
