'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Copy,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Package,
  MessageSquare,
  Shield,
  ArrowRight,
  User,
  Bot,
  AlertTriangle,
  Zap,
  Database,
  Search,
  Link,
  Calendar,
  UserCheck,
  BookOpen
} from 'lucide-react';

interface Categoria {
  nombre: string;
  descripcion: string;
  documentos: string;
}

interface Documento {
  titulo: string;
  owner: string;
  vigencia: string;
  categoria: string;
}

interface PreguntaFrecuente {
  pregunta: string;
  docEsperado: string;
  categoria: string;
}

interface FormData {
  empresa: string;
  objetivo: string;
  reglaRag: string;
  politicaCaducidad: string;
  politicaQA: string;
  metricas: string;
  periodicidad: string;
  rolesMantenimiento: string;
}

const requiredFields: (keyof FormData)[] = [
  'empresa', 'objetivo', 'reglaRag',
  'politicaCaducidad', 'politicaQA', 'metricas',
  'periodicidad', 'rolesMantenimiento'
];

export default function TelefonicaPractice9() {
  const [formData, setFormData] = useState<FormData>({
    empresa: 'Telefónica Empresas',
    objetivo: '',
    reglaRag: '',
    politicaCaducidad: '',
    politicaQA: '',
    metricas: '',
    periodicidad: '',
    rolesMantenimiento: '',
  });

  const [categorias, setCategorias] = useState<Categoria[]>(
    Array(4).fill({ nombre: '', descripcion: '', documentos: '' })
  );

  const [documentos, setDocumentos] = useState<Documento[]>(
    Array(12).fill({ titulo: '', owner: '', vigencia: '', categoria: '' })
  );

  const [preguntas, setPreguntas] = useState<PreguntaFrecuente[]>(
    Array(10).fill({ pregunta: '', docEsperado: '', categoria: '' })
  );

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoriaChange = (index: number, field: keyof Categoria, value: string) => {
    const newCat = [...categorias];
    newCat[index] = { ...newCat[index], [field]: value };
    setCategorias(newCat);
  };

  const handleDocChange = (index: number, field: keyof Documento, value: string) => {
    const newDocs = [...documentos];
    newDocs[index] = { ...newDocs[index], [field]: value };
    setDocumentos(newDocs);
  };

  const handlePreguntaChange = (index: number, field: keyof PreguntaFrecuente, value: string) => {
    const newPreg = [...preguntas];
    newPreg[index] = { ...newPreg[index], [field]: value };
    setPreguntas(newPreg);
  };

  const completionPercentage = useMemo(() => {
    const filled = requiredFields.filter(f => formData[f].trim().length > 0).length;
    const catsRellenas = categorias.filter(c => c.nombre.trim() && c.descripcion.trim()).length;
    const docsRellenos = documentos.filter(d => d.titulo.trim() && d.owner.trim()).length;
    const pregRellenas = preguntas.filter(p => p.pregunta.trim() && p.docEsperado.trim()).length;
    const total = filled + catsRellenas + docsRellenos + pregRellenas;
    const max = requiredFields.length + 4 + 12 + 10;
    return Math.round((total / max) * 100);
  }, [formData, categorias, documentos, preguntas]);

  const categoriasCount = useMemo(() => {
    return categorias.filter(c => c.nombre.trim() && c.descripcion.trim()).length;
  }, [categorias]);

  const documentosCount = useMemo(() => {
    return documentos.filter(d => d.titulo.trim() && d.owner.trim()).length;
  }, [documentos]);

  const preguntasCount = useMemo(() => {
    return preguntas.filter(p => p.pregunta.trim() && p.docEsperado.trim()).length;
  }, [preguntas]);

  const generate = () => {
    const missing: string[] = [];
    if (!formData.empresa) missing.push('empresa');
    if (!formData.objetivo) missing.push('objetivo');
    if (!formData.reglaRag) missing.push('regla RAG');
    if (categoriasCount < 4) missing.push('4 categorías');
    if (documentosCount < 12) missing.push('12 documentos');
    if (preguntasCount < 10) missing.push('10 preguntas frecuentes');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'KB + RAG + política de mantenimiento completos según los mínimos.' });
    }

    const sb: string[] = [];

    sb.push('PRÁCTICA 9 · BASE DE CONOCIMIENTO + RAG CONCEPTUAL');
    sb.push('Empresa: ' + (formData.empresa || '(pendiente)'));
    sb.push('');
    sb.push('1. Contexto del caso');
    sb.push('Empresa / marca: ' + (formData.empresa || '(pendiente)'));
    sb.push('Objetivo: ' + (formData.objetivo || '(pendiente)'));
    sb.push('');
    sb.push('2. Regla RAG fundamental');
    sb.push(formData.reglaRag || '(pendiente)');
    sb.push('');
    sb.push('3. Árbol de Base de Conocimiento (4 categorías)');
    sb.push('');
    categorias.forEach((cat, idx) => {
      if (cat.nombre || cat.descripcion) {
        sb.push(`3.${idx + 1} ${cat.nombre || '(sin nombre)'}`);
        sb.push(`   Descripción: ${cat.descripcion || '(pendiente)'}`);
        sb.push(`   Documentos incluidos: ${cat.documentos || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('4. Documentos tipo (12)');
    sb.push('');
    sb.push('Título | Owner | Vigencia | Categoría');
    sb.push('------ | ----- | -------- | ---------');
    documentos.forEach((doc, idx) => {
      if (doc.titulo || doc.owner) {
        sb.push(`${idx + 1}. ${doc.titulo || '(sin título)'} | ${doc.owner || '(sin owner)'} | ${doc.vigencia || '(sin vigencia)'} | ${doc.categoria || '(sin categoría)'}`);
      }
    });
    sb.push('');
    sb.push('5. 10 Preguntas frecuentes con documento fuente esperado');
    sb.push('');
    preguntas.forEach((preg, idx) => {
      if (preg.pregunta || preg.docEsperado) {
        sb.push(`P${idx + 1}: ${preg.pregunta || '(sin pregunta)'}`);
        sb.push(`   Documento fuente esperado: ${preg.docEsperado || '(pendiente)'}`);
        sb.push(`   Categoría: ${preg.categoria || '(pendiente)'}`);
        sb.push('');
      }
    });
    sb.push('');
    sb.push('6. Política de mantenimiento de la KB');
    sb.push('Periodicidad de revisión: ' + (formData.periodicidad || '(pendiente)'));
    sb.push('Roles y responsables: ' + (formData.rolesMantenimiento || '(pendiente)'));
    sb.push('Control de caducidad: ' + (formData.politicaCaducidad || '(pendiente)'));
    sb.push('Proceso de QA: ' + (formData.politicaQA || '(pendiente)'));
    sb.push('Métricas de seguimiento: ' + (formData.metricas || '(pendiente)'));
    sb.push('');
    sb.push('7. Criterios de calidad');
    sb.push('- El asistente debe citar siempre la fuente y versión del documento.');
    sb.push('- Si no hay evidencia en la KB, debe decir "no encontrado" y NO inventar.');
    sb.push('- Los documentos obsoletos deben marcarse y retirarse automáticamente.');
    sb.push('- Cada documento debe tener un owner responsable de su actualización.');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setFormData({
      empresa: 'Telefónica Empresas', objetivo: '', reglaRag: '',
      politicaCaducidad: '', politicaQA: '', metricas: '',
      periodicidad: '', rolesMantenimiento: '',
    });
    setCategorias(Array(4).fill({ nombre: '', descripcion: '', documentos: '' }));
    setDocumentos(Array(12).fill({ titulo: '', owner: '', vigencia: '', categoria: '' }));
    setPreguntas(Array(10).fill({ pregunta: '', docEsperado: '', categoria: '' }));
    setSummary('');
    setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) {
      setStatus({ type: 'error', message: 'Primero genera el entregable antes de copiarlo.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setStatus({ type: 'ok', message: 'Entregable copiado al portapapeles.' });
    } catch {
      setStatus({ type: 'error', message: 'No se pudo copiar automáticamente. Copia el texto manualmente.' });
    }
  };

  // Mini diálogo de ejemplo con RAG
  const exampleDialog = useMemo(() => {
    return [
      { role: 'user' as const, text: '¿Cómo abro una avería de fibra para un cliente empresa?' },
      { role: 'bot' as const, text: 'He encontrado el procedimiento actualizado. Según el documento "Procedimiento Averías Fibra Empresas v3.2" (actualizado el 15/03/2026, owner: Equipo de Operaciones):' },
      { role: 'bot' as const, text: '1. Verificar que el cliente tiene contrato de mantenimiento activo.\n2. Comprobar estado de la línea en el panel de red.\n3. Si hay alarma activa, crear ticket automático.\n4. Si no hay alarma, solicitar diagnóstico remoto.' },
      { role: 'bot' as const, text: '📄 Fuente: Procedimiento Averías Fibra Empresas v3.2 · Vigente hasta: 15/09/2026' },
    ];
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">9</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 9 · Base de Conocimiento + RAG (Telefónica Empresas)</h1>
            <p className="text-sm text-slate-600">Diseña una KB con 4 categorías, 12 documentos, 10 preguntas FAQ y política de mantenimiento</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Contexto</strong> <span className="ml-1">Telefónica Empresas · documentación dispersa de procedimientos y guías</span>
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <strong className="font-semibold">Regla RAG</strong> <span className="ml-1">si no hay evidencia, NO inventar → decir "no encontrado" y escalar</span>
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">Entregable</strong> <span className="ml-1">4 categorías · 12 documentos · 10 FAQ + política mantenimiento</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-300">resumen del caso</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Telefónica Empresas tiene documentación dispersa: procedimientos de averías, guías técnicas, artículos de soporte, políticas comerciales. Quieren que el asistente <strong>responda citando siempre la fuente y versión</strong> del documento para evitar instrucciones obsoletas. Si no encuentra evidencia, debe decir <strong>"no encontrado"</strong> y escalar al agente humano.
          </p>
          <ul className="text-sm text-slate-700 space-y-1 ml-4 list-disc">
            <li>Diseñar un <strong>árbol de KB con 4 categorías</strong> y 12 documentos tipo (título, owner, vigencia).</li>
            <li>Crear <strong>10 preguntas frecuentes</strong> con el documento fuente esperado.</li>
            <li>Definir una <strong>política de mantenimiento</strong>: roles, periodicidad, QA, métricas.</li>
          </ul>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            Contexto de referencia: Averías - Telefónica Empresas (telefonicaempresas.es/atencion-cliente/averias)
          </p>
        </CardContent>
      </Card>

      {/* Barra de completitud */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-700">Progreso del formulario</span>
                <span className="text-sm font-bold text-slate-800">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            <div className="flex gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                {categoriasCount}/4 cats.
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                {documentosCount}/12 docs
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                {preguntasCount}/10 FAQ
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mapa del flujo RAG */}
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900">Cómo funciona RAG conceptualmente</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              { num: '1', title: 'Usuario pregunta', desc: 'Pregunta en lenguaje natural', color: 'from-blue-400 to-blue-600' },
              { num: '2', title: 'Buscar en KB', desc: 'Recuperar docs relevantes', color: 'from-indigo-400 to-indigo-600' },
              { num: '3', title: 'Verificar evidencia', desc: '¿Hay docs que respalden?', color: 'from-purple-400 to-purple-600' },
              { num: '4', title: '¿Evidencia?', desc: 'Sí → responder citando fuente', color: 'from-green-400 to-green-600' },
              { num: '5', title: 'Sin evidencia', desc: 'Decir "no encontrado" + escalar', color: 'from-red-400 to-red-600' },
            ].map((step) => (
              <div key={step.num} className="relative">
                <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-3 text-center space-y-1">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-sm`}>
                      <span className="text-sm font-bold text-white">{step.num}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-800">{step.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight">{step.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Formulario, Categorías, Documentos */}
        <div className="space-y-6">
          {/* Contexto base */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Contexto y regla RAG</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">base del proyecto</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Empresa / marca</label>
                  <Input
                    placeholder="Ej.: Telefónica Empresas"
                    className="text-xs bg-white"
                    value={formData.empresa}
                    onChange={(e) => updateField('empresa', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">Objetivo</label>
                  <Input
                    placeholder="Ej.: Centralizar documentación y evitar instrucciones obsoletas"
                    className="text-xs bg-white"
                    value={formData.objetivo}
                    onChange={(e) => updateField('objetivo', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Regla RAG fundamental
                </label>
                <Textarea
                  placeholder="Ej.: Si el asistente no encuentra evidencia clara en la KB, debe responder 'No he encontrado información sobre esto en la documentación actual' y ofrecer escalar a un agente. NUNCA debe inventar procedimientos o datos."
                  className="text-xs bg-white min-h-[80px]"
                  value={formData.reglaRag}
                  onChange={(e) => updateField('reglaRag', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Categorías */}
          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 via-purple-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">4 Categorías de la KB</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">árbol de conocimiento</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Define 4 categorías principales para organizar la documentación: Averías, Procedimientos, Guías Comerciales, Políticas, etc.
              </p>

              <div className="space-y-3">
                {categorias.map((cat, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Categoría {index + 1}</span>
                        <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-600 border-indigo-200">grupo de documentos</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Nombre (ej.: Averías y Red)"
                          className="text-xs bg-white"
                          value={cat.nombre}
                          onChange={(e) => handleCategoriaChange(index, 'nombre', e.target.value)}
                        />
                        <Input
                          placeholder="Documentos incluidos (ej.: 3 procedimientos, 2 guías)"
                          className="text-xs bg-white"
                          value={cat.documentos}
                          onChange={(e) => handleCategoriaChange(index, 'documentos', e.target.value)}
                        />
                      </div>

                      <Textarea
                        placeholder="Descripción (ej.: Todos los procedimientos relacionados con averías de fibra, ADSL, móvil y router)"
                        className="text-xs bg-white min-h-[50px]"
                        value={cat.descripcion}
                        onChange={(e) => handleCategoriaChange(index, 'descripcion', e.target.value)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">12 Documentos tipo</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">título + owner + vigencia</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Cada documento debe tener: título descriptivo, owner responsable, fecha de vigencia y categoría asignada.
              </p>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {documentos.map((doc, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">Documento {index + 1}</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span className="text-[10px] text-slate-500">vigencia</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Título (ej.: Procedimiento Averías Fibra v3.2)"
                          className="text-xs bg-white"
                          value={doc.titulo}
                          onChange={(e) => handleDocChange(index, 'titulo', e.target.value)}
                        />
                        <Input
                          placeholder="Owner (ej.: Equipo de Operaciones)"
                          className="text-xs bg-white"
                          value={doc.owner}
                          onChange={(e) => handleDocChange(index, 'owner', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Vigencia (ej.: 15/09/2026)"
                          className="text-xs bg-white"
                          value={doc.vigencia}
                          onChange={(e) => handleDocChange(index, 'vigencia', e.target.value)}
                        />
                        <Input
                          placeholder="Categoría (ej.: Averías y Red)"
                          className="text-xs bg-white"
                          value={doc.categoria}
                          onChange={(e) => handleDocChange(index, 'categoria', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preguntas frecuentes */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">10 Preguntas frecuentes</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">con doc fuente esperado</Badge>
              </div>
              <p className="text-xs text-slate-600 -mt-2">
                Para cada pregunta, indica qué documento debería responderla. Esto sirve para validar que la KB cubre las consultas reales.
              </p>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {preguntas.map((preg, index) => (
                  <Card key={index} className="border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">FAQ {index + 1}</span>
                        <MessageSquare className="h-3 w-3 text-slate-400" />
                      </div>

                      <Textarea
                        placeholder="Pregunta (ej.: ¿Cómo abro una avería de fibra para un cliente empresa?)"
                        className="text-xs bg-white min-h-[40px]"
                        value={preg.pregunta}
                        onChange={(e) => handlePreguntaChange(index, 'pregunta', e.target.value)}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Doc esperado (ej.: Procedimiento Averías Fibra v3.2)"
                          className="text-xs bg-white"
                          value={preg.docEsperado}
                          onChange={(e) => handlePreguntaChange(index, 'docEsperado', e.target.value)}
                        />
                        <Input
                          placeholder="Categoría (ej.: Averías y Red)"
                          className="text-xs bg-white"
                          value={preg.categoria}
                          onChange={(e) => handlePreguntaChange(index, 'categoria', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Política de mantenimiento */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Política de mantenimiento</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">gobernanza de la KB</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Periodicidad de revisión
                  </label>
                  <Textarea
                    placeholder="Ej.: Revisión trimestral de todos los documentos. Revisión inmediata cuando cambie un procedimiento."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.periodicidad}
                    onChange={(e) => updateField('periodicidad', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    Roles y responsables
                  </label>
                  <Textarea
                    placeholder="Ej.: Owner de cada documento responsable de actualización. Editor KB revisa coherencia global. QA valida respuestas del asistente."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.rolesMantenimiento}
                    onChange={(e) => updateField('rolesMantenimiento', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Control de caducidad
                  </label>
                  <Textarea
                    placeholder="Ej.: Documentos marcados como obsoletos se archivan automáticamente. Alerta 30 días antes de fecha de caducidad."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.politicaCaducidad}
                    onChange={(e) => updateField('politicaCaducidad', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Proceso de QA
                  </label>
                  <Textarea
                    placeholder="Ej.: Test mensual con 50 preguntas frecuentes. Validar que el asistente cita fuente correcta y no inventa."
                    className="text-xs bg-white min-h-[60px]"
                    value={formData.politicaQA}
                    onChange={(e) => updateField('politicaQA', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Métricas de seguimiento
                </label>
                <Textarea
                  placeholder="Ej.: % respuestas con fuente citada, % escalados por 'no encontrado', tasa de satisfacción, documentos obsoletos activos, tiempo medio de actualización tras cambio."
                  className="text-xs bg-white min-h-[60px]"
                  value={formData.metricas}
                  onChange={(e) => updateField('metricas', e.target.value)}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={generate}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Generar práctica 9
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar campos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview y Resumen */}
        <div className="space-y-6">
          {/* Mini diálogo de ejemplo */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Vista previa de respuesta RAG</h3>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">ejemplo con cita de fuente</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Así se vería una respuesta del asistente citando fuente y versión. El asistente SIEMPRE debe citar el documento fuente.
              </p>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {exampleDialog.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                          : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      }`}>
                        {msg.role === 'user'
                          ? <User className="h-3.5 w-3.5 text-white" />
                          : <Bot className="h-3.5 w-3.5 text-white" />
                        }
                      </div>
                      <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumen generado */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg" />
                <h2 className="text-lg font-semibold text-slate-800">Entregable final</h2>
                <Badge variant="outline" className="ml-auto text-xs bg-slate-100 text-slate-600 border-slate-300">texto para pegar</Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Categorías</span>
                  <strong className="text-lg text-blue-600 font-headline">{categoriasCount}/4</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Documentos</span>
                  <strong className="text-lg text-green-600 font-headline">{documentosCount}/12</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-sm">
                  <span className="text-[10px] text-slate-500 block">Completitud</span>
                  <strong className="text-lg text-amber-600 font-headline">{completionPercentage}%</strong>
                </div>
              </div>

              {/* Output */}
              <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[500px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap">{summary || 'El entregable aparecerá aquí después de generar...'}</pre>
              </div>

              {/* Botones */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={copySummary}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar entregable
                </Button>
                <span className="text-xs text-slate-500">
                  Pega el contenido en tu documento de entrega.
                </span>
              </div>

              {/* Status */}
              {status.message && (
                <div className={`flex items-center gap-2 text-sm p-2.5 rounded-lg ${
                  status.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-slate-50 text-slate-600 border border-slate-200'
                }`}>
                  {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> :
                   status.type === 'error' ? <AlertCircle className="h-4 w-4 flex-shrink-0" /> :
                   <Shield className="h-4 w-4 flex-shrink-0" />}
                  {status.message}
                </div>
              )}

              {/* Checklist */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-semibold text-slate-700">Qué evalúa esta práctica</h4>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 ml-4 list-disc">
                  <li>Si se han definido 4 categorías claras con descripción y documentos incluidos.</li>
                  <li>Si los 12 documentos tienen título, owner, vigencia y categoría asignada.</li>
                  <li>Si las 10 preguntas frecuentes tienen documento fuente esperado identificado.</li>
                  <li>Si la regla RAG de "no inventar" está claramente definida.</li>
                  <li>Si la política de mantenimiento incluye roles, periodicidad, QA y métricas.</li>
                </ul>
              </div>

              {/* Consejo */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  <strong>Consejo:</strong> El asistente NUNCA debe inventar procedimientos o datos. Si no encuentra evidencia en la KB, debe decirlo claramente y ofrecer escalar. Cada documento debe tener un owner responsable de mantenerlo actualizado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
