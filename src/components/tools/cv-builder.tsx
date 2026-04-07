'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText, Upload, Sparkles, Download, CheckCircle2, AlertCircle,
  TrendingUp, Star, Award, Briefcase, GraduationCap, Languages, Wrench,
  User, ChevronRight, ChevronLeft, Plus, X, Eye, Edit3, Zap, Target,
  Lightbulb, BarChart3, RefreshCw, Copy, Trash2, Image as ImageIcon,
  Palette, Type, Layout, Camera, Printer, AlignLeft, AlignCenter,
  Maximize2, Minimize2, Columns, Rows
} from 'lucide-react';

// Types
interface WorkExperience {
  company: string; role: string; startDate: string; endDate: string;
  description: string; achievements: string;
}
interface Education {
  institution: string; degree: string; field: string;
  startDate: string; endDate: string; grade: string;
}
interface Skill { name: string; level: number; }
interface Language { name: string; level: string; }

interface CVData {
  fullName: string; title: string; email: string; phone: string;
  location: string; linkedin: string; summary: string;
  experience: WorkExperience[]; education: Education[];
  skills: Skill[]; languages: Language[];
}

interface AnalysisResult {
  overallScore: number;
  sections: { name: string; score: number; maxScore: number; feedback: string; suggestions: string[]; }[];
  strengths: string[]; improvements: string[];
  keywords: string[]; missingKeywords: string[];
  actionVerbs: string[]; quantifiableAchievements: number;
  readabilityScore: number; overallFeedback: string;
}

interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'modern' | 'classic' | 'minimal';
  photo: string | null;
  showPhoto: boolean;
  showSummary: boolean;
  showLanguages: boolean;
  headerAlignment: 'left' | 'center';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  showDividerLines: boolean;
  showSkillLevels: boolean;
  showDateRanges: boolean;
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  fontSize: 'small' | 'normal' | 'large';
  paperSize: 'a4' | 'letter';
}

const COLORS = [
  { name: 'Azul', value: '#1e40af' },
  { name: 'Violeta', value: '#7c3aed' },
  { name: 'Esmeralda', value: '#059669' },
  { name: 'Rojo', value: '#dc2626' },
  { name: 'Ámbar', value: '#d97706' },
  { name: 'Rosa', value: '#db2777' },
  { name: 'Cyan', value: '#0891b2' },
  { name: 'Slate', value: '#475569' },
];

const FONT_FAMILIES = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Space Grotesk', value: "'Space Grotesk', sans-serif" },
  { name: 'Georgia', value: "Georgia, serif" },
  { name: 'Monospace', value: "'Courier New', monospace" },
];

const defaultCV: CVData = {
  fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', summary: '',
  experience: [{ company: '', role: '', startDate: '', endDate: '', description: '', achievements: '' }],
  education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' }],
  skills: [{ name: '', level: 3 }],
  languages: [{ name: '', level: 'Nativo' }],
};

const defaultDesign: DesignSettings = {
  primaryColor: '#1e40af',
  secondaryColor: '#3b82f6',
  fontFamily: "'Inter', sans-serif",
  layout: 'modern',
  photo: null,
  showPhoto: false,
  showSummary: true,
  showLanguages: true,
  headerAlignment: 'left',
  sectionSpacing: 'normal',
  showDividerLines: true,
  showSkillLevels: false,
  showDateRanges: true,
  borderRadius: 'none',
  fontSize: 'normal',
  paperSize: 'a4',
};

const SKILL_LEVELS = ['Básico', 'Intermedio', 'Avanzado', 'Experto', 'Líder'];

export default function CVBuilderTool() {
  const [activeTab, setActiveTab] = useState<'builder' | 'analyzer'>('builder');
  const [cv, setCv] = useState<CVData>({ ...defaultCV });
  const [currentStep, setCurrentStep] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cvText, setCvText] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [design, setDesign] = useState<DesignSettings>(defaultDesign);
  const [showDesignPanel, setShowDesignPanel] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [importStatus, setImportStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const cvPrintRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: 'Datos', icon: User },
    { title: 'Experiencia', icon: Briefcase },
    { title: 'Educación', icon: GraduationCap },
    { title: 'Habilidades', icon: Wrench },
    { title: 'Idiomas', icon: Languages },
    { title: 'Resumen', icon: FileText },
  ];

  const updateCV = (field: keyof CVData, value: any) => setCv(prev => ({ ...prev, [field]: value }));

  const updateDesign = (field: keyof DesignSettings, value: any) => setDesign(prev => ({ ...prev, [field]: value }));

  // Experience
  const addExperience = () => setCv(prev => ({ ...prev, experience: [...prev.experience, { company: '', role: '', startDate: '', endDate: '', description: '', achievements: '' }] }));
  const removeExperience = (i: number) => setCv(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }));
  const updateExperience = (i: number, field: keyof WorkExperience, value: string) => setCv(prev => { const exp = [...prev.experience]; exp[i] = { ...exp[i], [field]: value }; return { ...prev, experience: exp }; });

  // Education
  const addEducation = () => setCv(prev => ({ ...prev, education: [...prev.education, { institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' }] }));
  const removeEducation = (i: number) => setCv(prev => ({ ...prev, education: prev.education.filter((_, idx) => idx !== i) }));
  const updateEducation = (i: number, field: keyof Education, value: string) => setCv(prev => { const edu = [...prev.education]; edu[i] = { ...edu[i], [field]: value }; return { ...prev, education: edu }; });

  // Skills
  const addSkill = () => setCv(prev => ({ ...prev, skills: [...prev.skills, { name: '', level: 3 }] }));
  const removeSkill = (i: number) => setCv(prev => ({ ...prev, skills: prev.skills.filter((_, idx) => idx !== i) }));
  const updateSkill = (i: number, field: keyof Skill, value: string | number) => setCv(prev => { const sk = [...prev.skills]; sk[i] = { ...sk[i], [field]: value }; return { ...prev, skills: sk }; });

  // Languages
  const addLanguage = () => setCv(prev => ({ ...prev, languages: [...prev.languages, { name: '', level: 'Nativo' }] }));
  const removeLanguage = (i: number) => setCv(prev => ({ ...prev, languages: prev.languages.filter((_, idx) => idx !== i) }));
  const updateLanguage = (i: number, field: keyof Language, value: string) => setCv(prev => { const lang = [...prev.languages]; lang[i] = { ...lang[i], [field]: value }; return { ...prev, languages: lang }; });

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { updateDesign('photo', ev.target?.result as string); updateDesign('showPhoto', true); };
    reader.readAsDataURL(file);
  };

  // AI Summary generation
  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const expText = cv.experience.map(e => `${e.role} en ${e.company}: ${e.description}`).join('. ');
      const prompt = `Genera un resumen profesional de CV (máximo 4 líneas) para: ${expText || 'Profesional'}. Título: ${cv.title || ''}. En primera persona, orientado a resultados. SOLO el texto.`;
      const response = await fetch('/api/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) });
      if (response.ok) { const data = await response.json(); if (data.text) updateCV('summary', data.text); }
    } catch (e) { console.error(e); }
    setIsGeneratingSummary(false);
  };

  // Parse imported CV text and auto-fill all fields
  const parseAndImportCV = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const fullText = text;

    // Extract email
    const emailMatch = fullText.match(/[\w.-]+@[\w.-]+\.\w{2,}/);
    const email = emailMatch ? emailMatch[0] : '';

    // Extract phone
    const phoneMatch = fullText.match(/(?:\+?\d{1,3}[\s.-]?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{3,4}/);
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Extract LinkedIn
    const linkedinMatch = fullText.match(/linkedin\.com\/in\/[\w-]+/i);
    const linkedin = linkedinMatch ? linkedinMatch[0] : '';

    // Extract location
    const locationMatch = fullText.match(/(?:Madrid|Barcelona|Valencia|Sevilla|Bilbao|Málaga|Zaragoza|Toledo|Alicante|Murcia|Palma|España|Spain|México|Colombia|Argentina|Chile|Perú|Ecuador|Uruguay|Paraguay|Bolivia|Venezuela|Costa Rica|Panamá|Guatemala|Honduras|El Salvador|Nicaragua|República Dominicana|Puerto Rico|Cuba)/i);
    const location = locationMatch ? locationMatch[0] : '';

    // Extract name (first non-empty line that's not an email/phone)
    let fullName = '';
    let title = '';
    for (const line of lines.slice(0, 5)) {
      if (line.length > 3 && !line.includes('@') && !line.match(/^\d/) && !line.toLowerCase().includes('email') && !line.toLowerCase().includes('tel') && !line.toLowerCase().includes('linkedin')) {
        if (!fullName) {
          fullName = line.replace(/^#+\s*/, '').trim();
        } else if (!title && line.length < 60) {
          title = line.replace(/^#+\s*/, '').trim();
          break;
        }
      }
    }

    // Parse sections
    const sections: { name: string; content: string; startIndex: number; endIndex: number }[] = [];
    const sectionPatterns = [
      { name: 'experience', pattern: /(?:experiencia|experience|trabajo|work history|laboral|profesional)/i },
      { name: 'education', pattern: /(?:educación|education|formación|academic|estudios|académica)/i },
      { name: 'skills', pattern: /(?:habilidades|skills|competencias|herramientas|technologies|tecnologías|conocimientos)/i },
      { name: 'languages', pattern: /(?:idiomas|languages|lenguas|lingüístico)/i },
      { name: 'summary', pattern: /(?:perfil|resumen|summary|objetivo|about me|sobre mí|acerca de|presentación)/i },
      { name: 'certifications', pattern: /(?:certificación|certificaciones|certificates|cursos|courses|formación complementaria)/i },
      { name: 'projects', pattern: /(?:proyecto|proyectos|projects|portfolio)/i },
    ];

    for (const sec of sectionPatterns) {
      const match = fullText.match(sec.pattern);
      if (match) {
        const startIndex = match.index!;
        let endIndex = fullText.length;
        for (const otherSec of sectionPatterns) {
          if (otherSec.name === sec.name) continue;
          const otherMatch = fullText.slice(startIndex + 1).match(otherSec.pattern);
          if (otherMatch) {
            const absIndex = startIndex + 1 + otherMatch.index!;
            if (absIndex < endIndex) endIndex = absIndex;
          }
        }
        sections.push({ name: sec.name, content: fullText.slice(startIndex, endIndex), startIndex, endIndex });
      }
    }
    sections.sort((a, b) => a.startIndex - b.startIndex);

    // Parse experience
    const experience: WorkExperience[] = [];
    const expSection = sections.find(s => s.name === 'experience');
    if (expSection) {
      const expLines = expSection.content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      let currentExp: Partial<WorkExperience> = {};
      let descLines: string[] = [];
      for (const line of expLines.slice(1)) {
        const isNewEntry = line.match(/(?:ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*\d{4}|(?:20\d{2}|19\d{2})\s*[-–—]\s*(?:actual|present|20\d{2})/i) ||
          (line.length > 2 && line.length < 80 && !line.startsWith('•') && !line.startsWith('-') && descLines.length > 0);
        if (isNewEntry && currentExp.company) {
          currentExp.description = descLines.join(' ').trim();
          experience.push(currentExp as WorkExperience);
          currentExp = {};
          descLines = [];
        }
        if (!currentExp.company && line.length > 2 && line.length < 80) {
          currentExp.company = line;
        } else if (!currentExp.role && line.length > 2 && line.length < 100) {
          currentExp.role = line;
        } else {
          descLines.push(line);
        }
      }
      if (currentExp.company) {
        currentExp.description = descLines.join(' ').trim();
        experience.push(currentExp as WorkExperience);
      }
    }

    // Parse education
    const education: Education[] = [];
    const eduSection = sections.find(s => s.name === 'education');
    if (eduSection) {
      const eduLines = eduSection.content.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      let currentEdu: Partial<Education> = {};
      for (const line of eduLines.slice(1)) {
        if (line.match(/(?:20\d{2}|19\d{2})\s*[-–—]/) || (line.length > 2 && line.length < 80 && currentEdu.institution)) {
          if (currentEdu.institution) { education.push(currentEdu as Education); currentEdu = {}; }
        }
        if (!currentEdu.degree && line.length > 2 && line.length < 100) {
          currentEdu.degree = line;
        } else if (!currentEdu.institution && line.length > 2 && line.length < 100) {
          currentEdu.institution = line;
        }
      }
      if (currentEdu.institution) education.push(currentEdu as Education);
    }

    // Parse skills
    const skills: Skill[] = [];
    const skillsSection = sections.find(s => s.name === 'skills');
    if (skillsSection) {
      const skillText = skillsSection.content.split('\n').slice(1).join(' ');
      const skillItems = skillText.split(/[,;•·\-\n]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40);
      skillItems.forEach(s => skills.push({ name: s, level: 3 }));
    }

    // Parse languages
    const languages: Language[] = [];
    const langSection = sections.find(s => s.name === 'languages');
    if (langSection) {
      const langLines = langSection.content.split('\n').slice(1).map(l => l.trim()).filter(l => l.length > 0);
      for (const line of langLines) {
        const langMatch = line.match(/([\wáéíóúñ]+)\s*[-:–—]?\s*(?:nivel\s*)?(nativo|básico|intermedio|avanzado|fluido|c1|c2|b1|b2|a1|a2|maestría|alto)/i);
        if (langMatch) {
          const levelMap: Record<string, string> = { 'nativo': 'Nativo', 'básico': 'A2 - Básico', 'intermedio': 'B1 - Intermedio', 'avanzado': 'C1 - Avanzado', 'fluido': 'C1 - Avanzado', 'c1': 'C1 - Avanzado', 'c2': 'C2 - Maestría', 'b1': 'B1 - Intermedio', 'b2': 'B2 - Intermedio Alto', 'a1': 'A1 - Principiante', 'a2': 'A2 - Básico', 'maestría': 'C2 - Maestría', 'alto': 'B2 - Intermedio Alto' };
          languages.push({ name: langMatch[1], level: levelMap[langMatch[2].toLowerCase()] || 'Intermedio' });
        } else if (line.length > 1 && line.length < 40) {
          languages.push({ name: line, level: 'Intermedio' });
        }
      }
    }

    // Parse summary
    let summary = '';
    const summarySection = sections.find(s => s.name === 'summary');
    if (summarySection) {
      summary = summarySection.content.split('\n').slice(1).map(l => l.trim()).filter(l => l.length > 0).join(' ');
    }

    const importedCV: CVData = {
      fullName: fullName || '',
      title: title || '',
      email, phone, location, linkedin, summary,
      experience: experience.length > 0 ? experience : [{ company: '', role: '', startDate: '', endDate: '', description: '', achievements: '' }],
      education: education.length > 0 ? education : [{ institution: '', degree: '', field: '', startDate: '', endDate: '', grade: '' }],
      skills: skills.length > 0 ? skills : [{ name: '', level: 3 }],
      languages: languages.length > 0 ? languages : [{ name: '', level: 'Nativo' }],
    };

    setCv(importedCV);
    const fieldsFilled = [fullName, title, email, phone, summary].filter(Boolean).length;
    setImportStatus({ type: 'ok', message: `✅ CV importado: ${fieldsFilled}/5 datos personales, ${experience.length} experiencias, ${education.length} estudios, ${skills.length} habilidades, ${languages.length} idiomas detectados. Revisa y completa los campos vacíos.` });
  };

  // Handle CV file import
  const handleCVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && text.trim().length > 10) {
        parseAndImportCV(text);
      } else {
        setImportStatus({ type: 'error', message: '❌ No se pudo extraer texto del archivo. Intenta copiar y pegar el texto directamente.' });
      }
    };
    reader.onerror = () => setImportStatus({ type: 'error', message: '❌ Error al leer el archivo.' });
    reader.readAsText(file);
    e.target.value = '';
  };

  // Download CV as PDF using browser print
  const downloadCV = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const d = design;
    const expHTML = cv.experience.filter(e => e.company).map(e => `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="font-size:13px;color:#1e293b;">${e.role}</strong>
          <span style="font-size:10px;color:#64748b;">${e.startDate} - ${e.endDate}</span>
        </div>
        <div style="font-size:11px;color:${d.primaryColor};font-weight:500;">${e.company}</div>
        ${e.description ? `<div style="font-size:10px;color:#475569;margin-top:2px;">${e.description}</div>` : ''}
        ${e.achievements ? `<div style="font-size:10px;color:#059669;margin-top:2px;">${e.achievements}</div>` : ''}
      </div>
    `).join('');

    const eduHTML = cv.education.filter(e => e.institution).map(e => `
      <div style="margin-bottom:6px;">
        <strong style="font-size:12px;color:#1e293b;">${e.degree}</strong>
        <span style="font-size:10px;color:#64748b;"> · ${e.institution}</span>
        ${e.field ? `<span style="font-size:10px;color:#64748b;"> · ${e.field}</span>` : ''}
      </div>
    `).join('');

    const skillsHTML = cv.skills.filter(s => s.name).map(s =>
      `<span style="font-size:9px;background:${d.primaryColor}15;color:${d.primaryColor};padding:2px 8px;border-radius:999px;margin:1px 3px;display:inline-block;">${s.name}</span>`
    ).join('');

    const langHTML = cv.languages.filter(l => l.name).map(l =>
      `<span style="font-size:9px;background:${d.primaryColor}10;color:${d.primaryColor};padding:2px 8px;border-radius:999px;margin:1px 3px;display:inline-block;">${l.name} (${l.level})</span>`
    ).join('');

    printWindow.document.write(`<!DOCTYPE html><html><head><title>CV - ${cv.fullName}</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:${d.fontFamily};max-width:800px;margin:0 auto;padding:40px;color:#1e293b;}
        .cv-header{display:flex;gap:20px;align-items:center;border-bottom:3px solid ${d.primaryColor};padding-bottom:20px;margin-bottom:20px;}
        .cv-photo{width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid ${d.primaryColor};}
        .cv-name{font-size:24px;font-weight:700;color:${d.primaryColor};}
        .cv-title{font-size:14px;color:${d.secondaryColor};font-weight:500;}
        .cv-contact{font-size:10px;color:#64748b;margin-top:4px;display:flex;flex-wrap:wrap;gap:8px;}
        .section-title{font-size:11px;font-weight:700;color:${d.primaryColor};text-transform:uppercase;letter-spacing:1px;margin:16px 0 8px;padding-bottom:4px;border-bottom:1px solid ${d.primaryColor}30;}
        .summary-text{font-size:11px;color:#475569;line-height:1.6;margin-bottom:12px;}
        @media print{body{padding:20px;}}
      </style></head><body>
      <div class="cv-header">
        ${d.showPhoto && d.photo ? `<img src="${d.photo}" class="cv-photo" />` : ''}
        <div>
          <div class="cv-name">${cv.fullName || 'Tu Nombre'}</div>
          <div class="cv-title">${cv.title || 'Tu Título'}</div>
          <div class="cv-contact">
            ${cv.email ? `<span>${cv.email}</span>` : ''}
            ${cv.phone ? `<span>· ${cv.phone}</span>` : ''}
            ${cv.location ? `<span>· ${cv.location}</span>` : ''}
            ${cv.linkedin ? `<span>· ${cv.linkedin}</span>` : ''}
          </div>
        </div>
      </div>
      ${d.showSummary && cv.summary ? `<div class="section-title">Perfil Profesional</div><div class="summary-text">${cv.summary}</div>` : ''}
      ${expHTML ? `<div class="section-title">Experiencia Laboral</div>${expHTML}` : ''}
      ${eduHTML ? `<div class="section-title">Educación</div>${eduHTML}` : ''}
      ${skillsHTML ? `<div class="section-title">Habilidades</div><div>${skillsHTML}</div>` : ''}
      ${d.showLanguages && langHTML ? `<div class="section-title">Idiomas</div><div>${langHTML}</div>` : ''}
      <script>window.onload=function(){window.print();}</script>
    </body></html>`);
    printWindow.document.close();
  };

  // Download CV as Markdown
  const downloadMarkdown = () => {
    const lines: string[] = [];
    lines.push(`# ${cv.fullName || 'Tu Nombre'}`);
    if (cv.title) lines.push(`## ${cv.title}`);
    lines.push('');

    // Contact
    const contactParts: string[] = [];
    if (cv.email) contactParts.push(`📧 ${cv.email}`);
    if (cv.phone) contactParts.push(`📱 ${cv.phone}`);
    if (cv.location) contactParts.push(`📍 ${cv.location}`);
    if (cv.linkedin) contactParts.push(`🔗 ${cv.linkedin}`);
    if (contactParts.length) { lines.push(contactParts.join(' | ')); lines.push(''); }

    // Summary
    if (cv.summary) {
      lines.push('## Perfil Profesional');
      lines.push('');
      lines.push(cv.summary);
      lines.push('');
    }

    // Experience
    const exps = cv.experience.filter(e => e.company);
    if (exps.length) {
      lines.push('## Experiencia Laboral');
      lines.push('');
      exps.forEach(e => {
        lines.push(`### ${e.role}`);
        lines.push(`**${e.company}**${e.startDate || e.endDate ? ` · ${e.startDate} — ${e.endDate}` : ''}`);
        lines.push('');
        if (e.description) lines.push(e.description);
        if (e.achievements) lines.push(`\n**Logros:** ${e.achievements}`);
        lines.push('');
      });
    }

    // Education
    const edus = cv.education.filter(e => e.institution);
    if (edus.length) {
      lines.push('## Educación');
      lines.push('');
      edus.forEach(e => {
        lines.push(`### ${e.degree}${e.field ? ` en ${e.field}` : ''}`);
        lines.push(`**${e.institution}**${e.startDate || e.endDate ? ` · ${e.startDate} — ${e.endDate}` : ''}`);
        if (e.grade) lines.push(`Nota: ${e.grade}`);
        lines.push('');
      });
    }

    // Skills
    const skills = cv.skills.filter(s => s.name);
    if (skills.length) {
      lines.push('## Habilidades');
      lines.push('');
      skills.forEach(s => {
        const dots = '●'.repeat(s.level) + '○'.repeat(5 - s.level);
        lines.push(`- **${s.name}** ${dots}`);
      });
      lines.push('');
    }

    // Languages
    const langs = cv.languages.filter(l => l.name);
    if (langs.length) {
      lines.push('## Idiomas');
      lines.push('');
      langs.forEach(l => {
        lines.push(`- **${l.name}**: ${l.level}`);
      });
      lines.push('');
    }

    const md = lines.join('\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV-${(cv.fullName || 'mi-curriculum').replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CV Analysis
  const analyzeCV = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const text = cvText.toLowerCase();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    const hasContact = /email|teléfono|phone|dirección|location|linkedin/.test(text);
    const hasSummary = /resumen|perfil|objetivo|summary|about me|sobre mí/.test(text);
    const hasExperience = /experiencia|experience|trabajo|puesto|empresa/.test(text);
    const hasEducation = /educación|education|formación|grado|universidad|máster/.test(text);
    const hasSkills = /habilidades|skills|competencias|herramientas|tecnologías/.test(text);
    const hasLanguages = /idiomas|languages|inglés|español|francés|alemán/.test(text);
    const hasCertifications = /certificación|certificado|curso|formación complementaria/.test(text);
    const hasProjects = /proyecto|project|portfolio/.test(text);

    const actionVerbs = ['lideré', 'desarrollé', 'implementé', 'gestioné', 'creé', 'diseñé', 'optimicé', 'mejoré', 'aumenté', 'reduje', 'coordiné', 'supervisé', 'analicé', 'resolví', 'logré', 'conseguí', 'dirigí', 'transformé', 'innové', 'negocié', 'led', 'developed', 'implemented', 'managed', 'created', 'designed', 'optimized', 'improved', 'increased', 'reduced', 'coordinated', 'supervised', 'analyzed', 'resolved', 'achieved', 'directed'];
    const foundVerbs = actionVerbs.filter(v => text.includes(v));
    const numbers = text.match(/\d+%|\d+\+|\d+x|\$\d+|\d+\.?\d*\s*(mil|millones|k|m|€|\$)/gi) || [];
    const techKeywords = ['python', 'javascript', 'react', 'node', 'sql', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum', 'machine learning', 'ia', 'ai', 'data', 'análisis', 'marketing', 'ventas', 'gestión', 'proyecto', 'liderazgo', 'comunicación', 'estrategia'];
    const foundKeywords = techKeywords.filter(k => text.includes(k));

    let sectionScore = 0, sectionMax = 0;
    const sections: AnalysisResult['sections'] = [];
    const addSection = (name: string, has: boolean, max: number, feedback: string, suggestions: string[]) => {
      sectionMax += max; if (has) sectionScore += max;
      sections.push({ name, score: has ? max : 0, maxScore: max, feedback, suggestions });
    };
    addSection('Datos de contacto', hasContact, 15, hasContact ? 'Sección de contacto presente' : 'Faltan datos de contacto', hasContact ? [] : ['Añade email, teléfono y ubicación', 'Incluye enlace a LinkedIn']);
    addSection('Resumen profesional', hasSummary, 10, hasSummary ? 'Resumen/perfil profesional detectado' : 'No se detectó resumen profesional', hasSummary ? [] : ['Añade un resumen de 3-4 líneas destacando tu valor']);
    addSection('Experiencia laboral', hasExperience, 25, hasExperience ? 'Sección de experiencia presente' : 'No se detectó experiencia laboral', hasExperience ? [] : ['Añade al menos 2 experiencias con empresa, rol y fechas']);
    addSection('Educación', hasEducation, 15, hasEducation ? 'Formación académica detectada' : 'No se detectó educación', hasEducation ? [] : ['Añade tu formación: título, institución y fechas']);
    addSection('Habilidades', hasSkills, 10, hasSkills ? 'Habilidades detectadas' : 'No se detectaron habilidades', hasSkills ? [] : ['Lista tus habilidades técnicas y blandas']);
    addSection('Idiomas', hasLanguages, 5, hasLanguages ? 'Idiomas detectados' : 'No se detectaron idiomas', hasLanguages ? [] : ['Incluye idiomas con nivel']);
    addSection('Certificaciones', hasCertifications, 5, hasCertifications ? 'Certificaciones detectadas' : 'Sin certificaciones', hasCertifications ? [] : ['Añade certificaciones relevantes']);
    addSection('Proyectos', hasProjects, 5, hasProjects ? 'Proyectos detectados' : 'Sin proyectos', hasProjects ? [] : ['Incluye proyectos destacados']);

    const verbScore = Math.min(foundVerbs.length * 3, 15);
    sections.push({ name: 'Verbos de acción', score: verbScore, maxScore: 15, feedback: `${foundVerbs.length} verbos de acción detectados`, suggestions: foundVerbs.length < 5 ? ['Usa más verbos de acción: lideré, desarrollé, implementé, optimicé'] : [] });
    const quantScore = Math.min(numbers.length * 5, 10);
    sections.push({ name: 'Logros cuantificables', score: quantScore, maxScore: 10, feedback: `${numbers.length} métricas detectadas`, suggestions: numbers.length < 3 ? ['Añade números: %, €, cantidades, tiempos de mejora'] : [] });

    const totalScore = Math.round(((sectionScore + verbScore + quantScore) / (sectionMax + 15 + 10)) * 100);
    const strengths: string[] = [];
    if (hasContact) strengths.push('Datos de contacto completos');
    if (hasSummary) strengths.push('Incluye resumen profesional');
    if (foundVerbs.length >= 5) strengths.push(`Buen uso de verbos de acción (${foundVerbs.length})`);
    if (numbers.length >= 3) strengths.push(`Logros cuantificables (${numbers.length} métricas)`);
    if (foundKeywords.length >= 3) strengths.push(`Palabras clave del sector (${foundKeywords.length})`);
    if (words.length >= 200) strengths.push('CV con contenido sustancial');

    const improvements: string[] = [];
    if (!hasSummary) improvements.push('Añade un resumen profesional de 3-4 líneas');
    if (foundVerbs.length < 5) improvements.push('Usa más verbos de acción al inicio de cada logro');
    if (numbers.length < 3) improvements.push('Cuantifica tus logros con números y porcentajes');
    if (!hasCertifications) improvements.push('Añade certificaciones o cursos relevantes');
    if (words.length < 150) improvements.push('Amplía el contenido de tu CV');

    setAnalysis({
      overallScore: totalScore, sections, strengths, improvements,
      keywords: foundKeywords, missingKeywords: techKeywords.filter(k => !foundKeywords.includes(k)).slice(0, 8),
      actionVerbs: foundVerbs, quantifiableAchievements: numbers.length,
      readabilityScore: Math.min(Math.round((sentences.length / Math.max(words.length, 1)) * 100), 100),
      overallFeedback: totalScore >= 80 ? '¡Excelente CV! Está bien estructurado y completo.' : totalScore >= 60 ? 'Buen CV, pero hay áreas de mejora significativas.' : totalScore >= 40 ? 'CV básico. Necesita más contenido y estructura.' : 'CV muy incompleto. Requiere trabajo significativo.',
    });
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => { setCvText(event.target?.result as string); };
    reader.readAsText(file);
  };

  const completionPercentage = Math.round(
    ([cv.fullName, cv.email, cv.title, cv.summary].filter(Boolean).length / 4 * 40) +
    (cv.experience.filter(e => e.company && e.role).length / Math.max(cv.experience.length, 1) * 30) +
    (cv.education.filter(e => e.institution && e.degree).length / Math.max(cv.education.length, 1) * 20) +
    (cv.skills.filter(s => s.name).length / Math.max(cv.skills.length, 1) * 10)
  );

  const getScoreColor = (score: number) => score >= 80 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : score >= 40 ? 'text-amber-600' : 'text-red-600';

  // CV Preview Component
  const CVPreview = () => {
    const d = design;
    const radiusMap = { none: '0px', small: '4px', medium: '8px', large: '16px' };
    const spacingMap = { compact: '8px', normal: '16px', spacious: '24px' };
    const fontSizeMap = { small: '10px', normal: '11px', large: '12px' };
    const headerClass = d.headerAlignment === 'center' ? 'text-center' : '';
    const headerFlex = d.headerAlignment === 'center' ? 'flex-col items-center' : 'items-center';

    return (
      <div ref={cvPrintRef} className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ fontFamily: d.fontFamily }}>
        {/* Header */}
        <div className={`p-6 pb-4 ${headerClass}`} style={{ borderBottom: `3px solid ${d.primaryColor}` }}>
          <div className={`flex gap-5 ${headerFlex}`}>
            {d.showPhoto && d.photo && (
              <img src={d.photo} alt="Foto CV" className="w-20 h-20 rounded-full object-cover border-4 flex-shrink-0" style={{ borderColor: d.primaryColor, borderRadius: radiusMap[d.borderRadius] === '0px' ? '50%' : radiusMap[d.borderRadius] }} />
            )}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold" style={{ color: d.primaryColor }}>{cv.fullName || 'Tu Nombre Completo'}</h2>
              <p className="text-sm font-medium" style={{ color: d.secondaryColor }}>{cv.title || 'Tu Título Profesional'}</p>
              <div className={`flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-slate-500 ${headerClass}`}>
                {cv.email && <span>{cv.email}</span>}
                {cv.phone && <span>· {cv.phone}</span>}
                {cv.location && <span>· {cv.location}</span>}
                {cv.linkedin && <span>· {cv.linkedin}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4" style={{ gap: spacingMap[d.sectionSpacing] }}>
          {/* Summary */}
          {d.showSummary && cv.summary && (
            <div style={{ marginBottom: spacingMap[d.sectionSpacing] }}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: d.primaryColor, borderBottom: d.showDividerLines ? `1px solid ${d.primaryColor}30` : 'none', paddingBottom: d.showDividerLines ? '4px' : '0' }}>Perfil Profesional</h4>
              <p className="text-slate-600 leading-relaxed" style={{ fontSize: fontSizeMap[d.fontSize] }}>{cv.summary}</p>
            </div>
          )}

          {/* Experience */}
          {cv.experience.filter(e => e.company).length > 0 && (
            <div style={{ marginBottom: spacingMap[d.sectionSpacing] }}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: d.primaryColor, borderBottom: d.showDividerLines ? `1px solid ${d.primaryColor}30` : 'none', paddingBottom: d.showDividerLines ? '4px' : '0' }}>Experiencia Laboral</h4>
              {cv.experience.filter(e => e.company).map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800" style={{ fontSize: fontSizeMap[d.fontSize] }}>{exp.role}</span>
                    {d.showDateRanges && <span className="text-[9px] text-slate-400">{exp.startDate} - {exp.endDate}</span>}
                  </div>
                  <p className="font-medium" style={{ fontSize: '10px', color: d.primaryColor }}>{exp.company}</p>
                  {exp.description && <p className="text-slate-600 mt-0.5" style={{ fontSize: '10px' }}>{exp.description}</p>}
                  {exp.achievements && <p className="text-emerald-600 mt-0.5 font-medium" style={{ fontSize: '10px' }}>{exp.achievements}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cv.education.filter(e => e.institution).length > 0 && (
            <div style={{ marginBottom: spacingMap[d.sectionSpacing] }}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: d.primaryColor, borderBottom: d.showDividerLines ? `1px solid ${d.primaryColor}30` : 'none', paddingBottom: d.showDividerLines ? '4px' : '0' }}>Educación</h4>
              {cv.education.filter(e => e.institution).map((edu, i) => (
                <div key={i} className="mb-1">
                  <span className="font-semibold text-slate-800" style={{ fontSize: fontSizeMap[d.fontSize] }}>{edu.degree}</span>
                  <span className="text-slate-500" style={{ fontSize: '10px' }}> · {edu.institution}</span>
                  {edu.field && <span className="text-slate-500" style={{ fontSize: '10px' }}> · {edu.field}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cv.skills.filter(s => s.name).length > 0 && (
            <div style={{ marginBottom: spacingMap[d.sectionSpacing] }}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: d.primaryColor, borderBottom: d.showDividerLines ? `1px solid ${d.primaryColor}30` : 'none', paddingBottom: d.showDividerLines ? '4px' : '0' }}>Habilidades</h4>
              <div className="flex flex-wrap gap-1">
                {cv.skills.filter(s => s.name).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full" style={{ fontSize: '9px', backgroundColor: `${d.primaryColor}15`, color: d.primaryColor }}>
                    {s.name}{d.showSkillLevels && ` ${'●'.repeat(s.level)}${'○'.repeat(5 - s.level)}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {d.showLanguages && cv.languages.filter(l => l.name).length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: d.primaryColor, borderBottom: d.showDividerLines ? `1px solid ${d.primaryColor}30` : 'none', paddingBottom: d.showDividerLines ? '4px' : '0' }}>Idiomas</h4>
              <div className="flex flex-wrap gap-1">
                {cv.languages.filter(l => l.name).map((l, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full" style={{ fontSize: '9px', backgroundColor: `${d.primaryColor}10`, color: d.primaryColor }}>{l.name} ({l.level})</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">CV Builder & Analyzer Pro</h1>
            <p className="text-sm text-slate-600">Crea tu currículum perfecto con diseño profesional o analiza el que ya tienes</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200"><Sparkles className="h-3 w-3 mr-1" /><strong>IA integrada</strong></Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Palette className="h-3 w-3 mr-1" /><strong>Editor de diseño</strong></Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Printer className="h-3 w-3 mr-1" /><strong>PDF + Markdown</strong></Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><BarChart3 className="h-3 w-3 mr-1" /><strong>Análisis con nota</strong></Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'builder' | 'analyzer')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="builder" className="flex items-center gap-2 text-sm"><Edit3 className="h-4 w-4" /> Constructor de CV</TabsTrigger>
          <TabsTrigger value="analyzer" className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4" /> Analizador de CV</TabsTrigger>
        </TabsList>

        {/* BUILDER TAB */}
        <TabsContent value="builder" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Form + Design */}
            <div className="lg:col-span-3 space-y-6">
              {/* Step indicator */}
              <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    {steps.map((step, i) => {
                      const Icon = step.icon;
                      const isActive = i === currentStep;
                      const isCompleted = i < currentStep;
                      return (
                        <div key={i} className="flex items-center">
                          <button onClick={() => setCurrentStep(i)} className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-violet-500 text-white shadow-md' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">{step.title}</span>
                          </button>
                          {i < steps.length - 1 && <div className={`w-3 sm:w-6 h-0.5 mx-0.5 sm:mx-1 ${isCompleted ? 'bg-green-300' : 'bg-slate-200'}`} />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Import CV Button */}
              <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white cursor-pointer hover:shadow-md transition-shadow" onClick={() => importInputRef.current?.click()}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center"><Upload className="h-4 w-4 text-white" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-900">Importar CV existente</h4>
                        <p className="text-xs text-emerald-600">Sube tu CV (.txt, .md) y se auto-rellenarán todos los campos</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>
              <input ref={importInputRef} type="file" accept=".txt,.text,.md" className="hidden" onChange={handleCVImport} />

              {/* Import Status */}
              {importStatus.message && (
                <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${importStatus.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {importStatus.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                  {importStatus.message}
                  {importStatus.type === 'ok' && <Button size="sm" variant="ghost" onClick={() => setImportStatus({ type: '', message: '' })} className="ml-auto text-green-600 h-5 w-5 p-0"><X className="h-3 w-3" /></Button>}
                </div>
              )}

              {/* Step forms */}
              {currentStep === 0 && (
                <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-white to-purple-50">
                  <CardContent className="p-5 space-y-4">
                    <h3 className="text-lg font-bold text-violet-900 flex items-center gap-2"><User className="h-5 w-5" /> Datos Personales</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">Nombre completo *</label><Input placeholder="María García López" className="text-xs bg-white" value={cv.fullName || ''} onChange={(e) => updateCV('fullName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">Título profesional *</label><Input placeholder="Desarrolladora Full Stack Senior" className="text-xs bg-white" value={cv.title || ''} onChange={(e) => updateCV('title', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">Email *</label><Input placeholder="maria@email.com" className="text-xs bg-white" value={cv.email || ''} onChange={(e) => updateCV('email', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">Teléfono</label><Input placeholder="+34 612 345 678" className="text-xs bg-white" value={cv.phone || ''} onChange={(e) => updateCV('phone', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">Ubicación</label><Input placeholder="Madrid, España" className="text-xs bg-white" value={cv.location || ''} onChange={(e) => updateCV('location', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-xs font-medium text-slate-600">LinkedIn</label><Input placeholder="linkedin.com/in/maria" className="text-xs bg-white" value={cv.linkedin || ''} onChange={(e) => updateCV('linkedin', e.target.value)} /></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 1 && (
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2"><Briefcase className="h-5 w-5" /> Experiencia Laboral</h3>
                      <Button size="sm" onClick={addExperience} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"><Plus className="h-3.5 w-3.5 mr-1" /> Añadir</Button>
                    </div>
                    {cv.experience.map((exp, i) => (
                      <Card key={i} className="border-slate-200 bg-white">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">Experiencia {i + 1}</span>{cv.experience.length > 1 && <Button size="sm" variant="ghost" onClick={() => removeExperience(i)} className="text-red-500 h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Empresa" className="text-xs bg-white" value={exp.company || ''} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                            <Input placeholder="Rol / Puesto" className="text-xs bg-white" value={exp.role || ''} onChange={(e) => updateExperience(i, 'role', e.target.value)} />
                            <Input placeholder="Fecha inicio" className="text-xs bg-white" value={exp.startDate || ''} onChange={(e) => updateExperience(i, 'startDate', e.target.value)} />
                            <Input placeholder="Fecha fin" className="text-xs bg-white" value={exp.endDate || ''} onChange={(e) => updateExperience(i, 'endDate', e.target.value)} />
                          </div>
                          <Textarea placeholder="Descripción de responsabilidades..." className="text-xs bg-white min-h-[60px]" value={exp.description || ''} onChange={(e) => updateExperience(i, 'description', e.target.value)} />
                          <Textarea placeholder="Logros cuantificables (Ej.: Aumenté ventas un 25%...)" className="text-xs bg-white min-h-[60px]" value={exp.achievements || ''} onChange={(e) => updateExperience(i, 'achievements', e.target.value)} />
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-green-50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Educación</h3>
                      <Button size="sm" onClick={addEducation} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full"><Plus className="h-3.5 w-3.5 mr-1" /> Añadir</Button>
                    </div>
                    {cv.education.map((edu, i) => (
                      <Card key={i} className="border-slate-200 bg-white">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">Educación {i + 1}</span>{cv.education.length > 1 && <Button size="sm" variant="ghost" onClick={() => removeEducation(i)} className="text-red-500 h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Institución" className="text-xs bg-white" value={edu.institution || ''} onChange={(e) => updateEducation(i, 'institution', e.target.value)} />
                            <Input placeholder="Título" className="text-xs bg-white" value={edu.degree || ''} onChange={(e) => updateEducation(i, 'degree', e.target.value)} />
                            <Input placeholder="Campo de estudio" className="text-xs bg-white" value={edu.field || ''} onChange={(e) => updateEducation(i, 'field', e.target.value)} />
                            <Input placeholder="Nota media (opcional)" className="text-xs bg-white" value={edu.grade || ''} onChange={(e) => updateEducation(i, 'grade', e.target.value)} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2"><Wrench className="h-5 w-5" /> Habilidades</h3>
                      <Button size="sm" onClick={addSkill} className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"><Plus className="h-3.5 w-3.5 mr-1" /> Añadir</Button>
                    </div>
                    {cv.skills.map((skill, i) => (
                      <Card key={i} className="border-slate-200 bg-white">
                        <CardContent className="p-3 flex items-center gap-3">
                          <Input placeholder="Habilidad" className="text-xs bg-white flex-1" value={skill.name || ''} onChange={(e) => updateSkill(i, 'name', e.target.value)} />
                          <div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map(level => (<button key={level} onClick={() => updateSkill(i, 'level', level)} className={`w-6 h-6 rounded-full text-[9px] font-bold transition-all ${level <= skill.level ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`} title={SKILL_LEVELS[level - 1]}>{level}</button>))}</div>
                          <span className="text-[10px] text-slate-500 w-16 text-right">{SKILL_LEVELS[skill.level - 1]}</span>
                          {cv.skills.length > 1 && <Button size="sm" variant="ghost" onClick={() => removeSkill(i)} className="text-red-500 h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>}
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-cyan-900 flex items-center gap-2"><Languages className="h-5 w-5" /> Idiomas</h3>
                      <Button size="sm" onClick={addLanguage} className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"><Plus className="h-3.5 w-3.5 mr-1" /> Añadir</Button>
                    </div>
                    {cv.languages.map((lang, i) => (
                      <Card key={i} className="border-slate-200 bg-white">
                        <CardContent className="p-3 flex items-center gap-3">
                          <Input placeholder="Idioma" className="text-xs bg-white flex-1" value={lang.name || ''} onChange={(e) => updateLanguage(i, 'name', e.target.value)} />
                          <select className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2" value={lang.level || 'Nativo'} onChange={(e) => updateLanguage(i, 'level', e.target.value)}>
                            {['Nativo', 'C2 - Maestría', 'C1 - Avanzado', 'B2 - Intermedio Alto', 'B1 - Intermedio', 'A2 - Básico'].map(l => (<option key={l} value={l}>{l}</option>))}
                          </select>
                          {cv.languages.length > 1 && <Button size="sm" variant="ghost" onClick={() => removeLanguage(i)} className="text-red-500 h-7 w-7 p-0"><X className="h-3.5 w-3.5" /></Button>}
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}

              {currentStep === 5 && (
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2"><FileText className="h-5 w-5" /> Resumen Profesional</h3>
                      <Button size="sm" onClick={generateSummary} disabled={isGeneratingSummary} className="bg-purple-500 hover:bg-purple-600 text-white rounded-full">{isGeneratingSummary ? <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1" />}{isGeneratingSummary ? 'Generando...' : 'Generar con IA'}</Button>
                    </div>
                    <Textarea placeholder="Profesional con X años de experiencia en... Especializado en... He logrado..." className="text-xs bg-white min-h-[150px]" value={cv.summary || ''} onChange={(e) => updateCV('summary', e.target.value)} />
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="border-slate-300"><ChevronLeft className="h-4 w-4 mr-1" /> Anterior</Button>
                <div className="text-sm text-slate-500 self-center">Paso {currentStep + 1} de {steps.length} · {completionPercentage}%</div>
                <Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="bg-violet-500 hover:bg-violet-600 text-white">Siguiente <ChevronRight className="h-4 w-4 ml-1" /></Button>
              </div>

              {/* Design Panel Toggle */}
              <Card className="border-slate-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowDesignPanel(!showDesignPanel)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center"><Palette className="h-4 w-4 text-white" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Editor de Diseño del CV</h4>
                        <p className="text-xs text-slate-500">Colores, tipografía, foto y opciones de visualización</p>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${showDesignPanel ? 'rotate-90' : ''}`} />
                  </div>
                </CardContent>
              </Card>

              {/* Design Panel */}
              {showDesignPanel && (
                <Card className="border-pink-200 bg-gradient-to-br from-pink-50 via-violet-50 to-white">
                  <CardContent className="p-5 space-y-5">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Palette className="h-4 w-4" /> Personalizar Diseño</h3>

                    {/* Photo */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Camera className="h-3 w-3" /> Foto del CV</label>
                      <div className="flex items-center gap-3">
                        <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                        <Button size="sm" variant="outline" onClick={() => photoInputRef.current?.click()} className="border-slate-300"><ImageIcon className="h-3.5 w-3.5 mr-1" /> Subir foto</Button>
                        {design.photo && <img src={design.photo} alt="Foto" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: design.primaryColor }} />}
                        {design.photo && <Button size="sm" variant="ghost" onClick={() => { updateDesign('photo', null); updateDesign('showPhoto', false); }} className="text-red-500"><X className="h-3.5 w-3.5" /></Button>}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Palette className="h-3 w-3" /> Color principal</label>
                      <div className="flex flex-wrap gap-2">
                        {COLORS.map(c => (
                          <button key={c.value} onClick={() => { updateDesign('primaryColor', c.value); updateDesign('secondaryColor', c.value); }} className={`w-8 h-8 rounded-full border-2 transition-all ${design.primaryColor === c.value ? 'border-slate-800 scale-110 shadow-md' : 'border-slate-200'}`} style={{ backgroundColor: c.value }} title={c.name} />
                        ))}
                      </div>
                    </div>

                    {/* Font */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Type className="h-3 w-3" /> Tipografía</label>
                      <div className="grid grid-cols-2 gap-2">
                        {FONT_FAMILIES.map(f => (
                          <button key={f.value} onClick={() => updateDesign('fontFamily', f.value)} className={`px-3 py-2 rounded-lg text-xs border-2 transition-all ${design.fontFamily === f.value ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-slate-200 bg-white text-slate-600'}`} style={{ fontFamily: f.value }}>{f.name}</button>
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Maximize2 className="h-3 w-3" /> Tamaño de fuente</label>
                      <div className="grid grid-cols-3 gap-2">
                        {([['small', 'Pequeña'], ['normal', 'Normal'], ['large', 'Grande']] as const).map(([val, label]) => (
                          <button key={val} onClick={() => updateDesign('fontSize', val)} className={`px-3 py-1.5 rounded-lg text-xs border-2 transition-all ${design.fontSize === val ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-slate-200 bg-white text-slate-600'}`}>{label}</button>
                        ))}
                      </div>
                    </div>

                    {/* Header Alignment */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><AlignCenter className="h-3 w-3" /> Alineación del encabezado</label>
                      <div className="grid grid-cols-2 gap-2">
                        {([['left', <><AlignLeft className="h-3 w-3 mr-1" /> Izquierda</>], ['center', <><AlignCenter className="h-3 w-3 mr-1" /> Centro</>]] as const).map(([val, label]) => (
                          <button key={val} onClick={() => updateDesign('headerAlignment', val)} className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-xs border-2 transition-all ${design.headerAlignment === val ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-slate-200 bg-white text-slate-600'}`}>{label}</button>
                        ))}
                      </div>
                    </div>

                    {/* Section Spacing */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Rows className="h-3 w-3" /> Espaciado entre secciones</label>
                      <div className="grid grid-cols-3 gap-2">
                        {([['compact', 'Compacto'], ['normal', 'Normal'], ['spacious', 'Amplio']] as const).map(([val, label]) => (
                          <button key={val} onClick={() => updateDesign('sectionSpacing', val)} className={`px-3 py-1.5 rounded-lg text-xs border-2 transition-all ${design.sectionSpacing === val ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-slate-200 bg-white text-slate-600'}`}>{label}</button>
                        ))}
                      </div>
                    </div>

                    {/* Border Radius */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Layout className="h-3 w-3" /> Bordes redondeados</label>
                      <div className="grid grid-cols-4 gap-2">
                        {([['none', 'Ninguno'], ['small', 'Suave'], ['medium', 'Medio'], ['large', 'Grande']] as const).map(([val, label]) => (
                          <button key={val} onClick={() => updateDesign('borderRadius', val)} className={`px-2 py-1.5 rounded-lg text-[10px] border-2 transition-all ${design.borderRadius === val ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold' : 'border-slate-200 bg-white text-slate-600'}`}>{label}</button>
                        ))}
                      </div>
                    </div>

                    {/* Toggles Grid */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 flex items-center gap-1"><Layout className="h-3 w-3" /> Opciones de visualización</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showPhoto} onChange={(e) => updateDesign('showPhoto', e.target.checked)} className="accent-violet-500" /> Foto
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showSummary} onChange={(e) => updateDesign('showSummary', e.target.checked)} className="accent-violet-500" /> Resumen
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showLanguages} onChange={(e) => updateDesign('showLanguages', e.target.checked)} className="accent-violet-500" /> Idiomas
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showDividerLines} onChange={(e) => updateDesign('showDividerLines', e.target.checked)} className="accent-violet-500" /> Líneas divisoras
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showSkillLevels} onChange={(e) => updateDesign('showSkillLevels', e.target.checked)} className="accent-violet-500" /> Nivel de habilidades
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" checked={design.showDateRanges} onChange={(e) => updateDesign('showDateRanges', e.target.checked)} className="accent-violet-500" /> Fechas
                        </label>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div className="flex gap-2">
                      <Button onClick={downloadCV} className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-full">
                        <Printer className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button onClick={downloadMarkdown} className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold rounded-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Markdown
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right: Live Preview */}
            <div className="lg:col-span-2">
              <Card className="border-slate-200 sticky top-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2"><Eye className="h-4 w-4" /> Vista Previa</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{completionPercentage}%</Badge>
                      <Button size="sm" variant="ghost" onClick={downloadCV} className="h-7 w-7 p-0 text-violet-600" title="Descargar PDF"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                  <Progress value={completionPercentage} className="h-1.5 mb-4" />
                  <div className="max-h-[700px] overflow-y-auto">
                    <CVPreview />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ANALYZER TAB */}
        <TabsContent value="analyzer" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-2"><Zap className="h-5 w-5 text-amber-600" /><h3 className="text-lg font-bold text-amber-900">Analizador de CV con IA</h3></div>
                  <p className="text-sm text-slate-600">Pega el texto de tu CV o sube un archivo. La IA lo analizará y te dará una puntuación con recomendaciones.</p>
                  <div className="space-y-3">
                    <Textarea placeholder="Pega aquí el texto completo de tu currículum vitae..." className="text-xs bg-white min-h-[200px]" value={cvText} onChange={(e) => setCvText(e.target.value)} />
                    <div className="flex items-center gap-3">
                      <input ref={fileInputRef} type="file" accept=".txt,.text,.pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="border-slate-300"><Upload className="h-3.5 w-3.5 mr-1.5" /> Subir archivo</Button>
                      <Button size="sm" onClick={analyzeCV} disabled={!cvText.trim() || isAnalyzing} className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">{isAnalyzing ? <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1.5" />}{isAnalyzing ? 'Analizando...' : 'Analizar CV'}</Button>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      💡 <strong>Consejo:</strong> Para PDFs, el texto se extrae automáticamente. Si el resultado no es correcto, copia y pega el texto directamente para mejor precisión.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            {analysis && (
              <div className="space-y-4">
                <Card className={`border-2 ${analysis.overallScore >= 80 ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' : analysis.overallScore >= 60 ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50' : analysis.overallScore >= 40 ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50' : 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'}`}>
                  <CardContent className="p-5 text-center">
                    <div className={`text-5xl font-bold ${getScoreColor(analysis.overallScore)} mb-2`}>{analysis.overallScore}/100</div>
                    <p className="text-sm font-medium text-slate-700">{analysis.overallFeedback}</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-5 space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Puntuación por Secciones</h4>
                    {analysis.sections.map((section, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between items-center"><span className="text-xs font-medium text-slate-700">{section.name}</span><span className={`text-xs font-bold ${getScoreColor(Math.round((section.score / section.maxScore) * 100))}`}>{section.score}/{section.maxScore}</span></div>
                        <Progress value={Math.round((section.score / section.maxScore) * 100)} className="h-1.5" />
                        {section.suggestions.length > 0 && <p className="text-[10px] text-amber-700">💡 {section.suggestions.join('. ')}</p>}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {analysis.strengths.length > 0 && (
                  <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-bold text-green-800 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Puntos Fuertes</h4>
                      {analysis.strengths.map((s, i) => (<div key={i} className="flex items-start gap-2 text-xs text-green-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" /><span>{s}</span></div>))}
                    </CardContent>
                  </Card>
                )}

                {analysis.improvements.length > 0 && (
                  <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-bold text-amber-800 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Áreas de Mejora</h4>
                      {analysis.improvements.map((imp, i) => (<div key={i} className="flex items-start gap-2 text-xs text-amber-700"><AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" /><span>{imp}</span></div>))}
                    </CardContent>
                  </Card>
                )}

                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="font-bold text-blue-800 flex items-center gap-2"><Target className="h-4 w-4" /> Palabras Clave</h4>
                    {analysis.keywords.length > 0 && <div><p className="text-[10px] font-medium text-blue-600 mb-1">Detectadas:</p><div className="flex flex-wrap gap-1">{analysis.keywords.map((kw, i) => (<Badge key={i} variant="outline" className="text-[9px] bg-blue-100 text-blue-700 border-blue-200">{kw}</Badge>))}</div></div>}
                    {analysis.missingKeywords.length > 0 && <div><p className="text-[10px] font-medium text-amber-600 mb-1">Sugeridas:</p><div className="flex flex-wrap gap-1">{analysis.missingKeywords.slice(0, 6).map((kw, i) => (<Badge key={i} variant="outline" className="text-[9px] bg-amber-100 text-amber-700 border-amber-200">{kw}</Badge>))}</div></div>}
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div><div className="text-lg font-bold text-violet-600">{analysis.actionVerbs.length}</div><div className="text-[10px] text-slate-500">Verbos de acción</div></div>
                      <div><div className="text-lg font-bold text-green-600">{analysis.quantifiableAchievements}</div><div className="text-[10px] text-slate-500">Métricas</div></div>
                      <div><div className="text-lg font-bold text-blue-600">{analysis.readabilityScore}%</div><div className="text-[10px] text-slate-500">Legibilidad</div></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
