'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Copy, Trash2, FileText, AlertCircle, CheckCircle2,
  Scale, Zap, BarChart3, Shield, HelpCircle, Lightbulb
} from 'lucide-react';

interface Criterion {
  name: string;
  weight: string;
  makeScore: string;
  n8nScore: string;
  implication: string;
}

export default function DomestikaPractice4() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { name: 'Conectores de datos/listas', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'HTTP/APIs personalizadas', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Observabilidad y logs', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Gobierno y control', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Coste/volumen de ejecuciones', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Seguridad y hosting', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Time-to-value (rapidez montaje)', weight: '', makeScore: '', n8nScore: '', implication: '' },
    { name: 'Escalabilidad futura', weight: '', makeScore: '', n8nScore: '', implication: '' },
  ]);
  const [tradeoffs, setTradeoffs] = useState('');
  const [argumentario, setArgumentario] = useState('');
  const [preguntasDificiles, setPreguntasDificiles] = useState('');
  const [riesgos, setRiesgos] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState<{ type: 'ok' | 'error' | ''; message: string }>({ type: '', message: '' });

  const updateCriterion = (index: number, field: keyof Criterion, value: string) => {
    const updated = [...criteria];
    updated[index] = { ...updated[index], [field]: value };
    setCriteria(updated);
  };

  const generate = () => {
    const missing: string[] = [];
    const filledCriteria = criteria.filter(c => c.weight && c.makeScore && c.n8nScore);
    if (filledCriteria.length < 8) missing.push('8 criterios con peso y puntuación');
    if (!tradeoffs) missing.push('3 trade-offs explícitos');
    if (!argumentario) missing.push('argumentario de defensa');

    if (missing.length > 0) {
      setStatus({ type: 'error', message: 'Revisa: ' + missing.join(' · ') });
    } else {
      setStatus({ type: 'ok', message: 'Matriz de decisión completa.' });
    }

    const sb: string[] = [];
    sb.push('PRÁCTICA 4 — MAKE vs n8n: MATRIZ DE DECISIÓN + DEFENSA (Domestika)');
    sb.push('');
    sb.push('1. Matriz de decisión (8 criterios)');
    sb.push('');
    sb.push('| Criterio | Peso | Make (1-5) | n8n (1-5) | Implicación |');
    sb.push('|----------|------|------------|-----------|-------------|');
    criteria.forEach(c => {
      if (c.weight && c.makeScore && c.n8nScore) {
        sb.push(`| ${c.name} | ${c.weight} | ${c.makeScore} | ${c.n8nScore} | ${c.implication || '-'} |`);
      }
    });
    sb.push('');
    sb.push('2. Trade-offs explícitos');
    sb.push(tradeoffs);
    sb.push('');
    sb.push('3. Argumentario de defensa (2 minutos)');
    sb.push(argumentario);
    sb.push('');
    sb.push('4. Respuestas a preguntas difíciles');
    sb.push(preguntasDificiles || '(pendiente)');
    sb.push('');
    sb.push('5. Hoja de riesgos y mitigaciones');
    sb.push(riesgos || '(pendiente)');
    sb.push('');
    sb.push('Herramientas Vibe Coding recomendadas:');
    sb.push('- VS Code + Qwen CLI: "Genera una tabla comparativa de Make vs n8n con 8 criterios: conectores, HTTP, observabilidad, gobierno, coste, seguridad, time-to-value, escalabilidad. Puntuación 1-5"');
    sb.push('- Gemini Pro (Antigravity): "Actúa como CTO. Defiende la elección de Make o n8n para automatizar lead→CRM→email en una empresa de formación online. Da 3 trade-offs y 3 riesgos con mitigación"');
    sb.push('- CLI Qwen: "Crea un argumentario de 2 minutos para convencer a dirección de elegir Make o n8n. Incluye respuestas a: ¿cuál es el coste real?, ¿qué pasa si falla?, ¿quién mantiene?"');
    sb.push('- Alternativa gratuita: Claude (claude.ai) o ChatGPT (chatgpt.com) para generar la matriz y el argumentario');

    setSummary(sb.join('\n'));
  };

  const clearAll = () => {
    setCriteria(criteria.map(c => ({ ...c, weight: '', makeScore: '', n8nScore: '', implication: '' })));
    setTradeoffs(''); setArgumentario(''); setPreguntasDificiles(''); setRiesgos('');
    setSummary(''); setStatus({ type: '', message: '' });
  };

  const copySummary = async () => {
    if (!summary.trim()) { setStatus({ type: 'error', message: 'Genera primero el entregable.' }); return; }
    try { await navigator.clipboard.writeText(summary); setStatus({ type: 'ok', message: 'Entregable copiado.' }); }
    catch { setStatus({ type: 'error', message: 'Copia manualmente.' }); }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-white">4</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Práctica 4 · Make vs n8n: Matriz de Decisión + Defensa (Domestika)</h1>
            <p className="text-sm text-slate-600">Matriz con 8 criterios ponderados + argumentario oral + hoja de riesgos</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Scale className="h-3 w-3 mr-1" /> Matriz 8 criterios</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Zap className="h-3 w-3 mr-1" /> 3 trade-offs</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><BarChart3 className="h-3 w-3 mr-1" /> Vibe Coding</Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Encargo de negocio</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-purple-100 text-purple-700 border-purple-300">Domestika · e-learning</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Una empresa de formación online quiere automatizar: <strong>lead web → clasificación → CRM → email de bienvenida → creación de tarea comercial</strong>. El equipo duda entre Make (rápido de montar) y n8n (flexible, auto-hospedable). Dirección pide una <strong>decisión defendible</strong> con criterios ponderados, trade-offs y plan de mitigación.
          </p>

          {/* Step-by-step help */}
          <div className="p-4 rounded-xl bg-violet-50 border border-violet-200 space-y-3">
            <h4 className="text-sm font-bold text-violet-900 flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Paso a paso para entender la práctica</h4>
            <div className="space-y-2 text-xs text-violet-800">
              <p><strong>Paso 1:</strong> Piensa en qué necesita la empresa: conectar formularios web, un CRM, enviar emails y crear tareas. ¿Qué herramienta lo hace mejor?</p>
              <p><strong>Paso 2:</strong> Para cada criterio (ej: "coste"), puntúa Make y n8n del 1 al 5. Asigna un peso (1-10) según lo importante que sea para la empresa.</p>
              <p><strong>Paso 3:</strong> Calcula: puntuación × peso para cada herramienta. La que tenga más puntos gana en ese criterio.</p>
              <p><strong>Paso 4:</strong> Identifica 3 trade-offs: "Acepto X para ganar Y". Ejemplo: "Acepto menos flexibilidad (Make) para ganar rapidez de montaje".</p>
              <p><strong>Paso 5:</strong> Prepara un argumentario de 2 minutos para "vender" tu decisión a dirección.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800">
            <strong>💡 Herramientas Vibe Coding:</strong> VS Code + Qwen CLI para generar la matriz. Gemini Pro (Antigravity) para el argumentario. CLI Qwen para respuestas a preguntas difíciles. Alternativas gratuitas: Claude (claude.ai), ChatGPT (chatgpt.com), Gemini (gemini.google.com).
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Matrix */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2"><Scale className="h-4 w-4" /> Matriz de decisión (8 criterios, puntuación 1-5 + peso)</h3>
              <div className="space-y-3">
                {criteria.map((c, i) => (
                  <Card key={i} className="border-slate-200 bg-white">
                    <CardContent className="p-3 space-y-2">
                      <span className="text-xs font-semibold text-slate-700">{c.name}</span>
                      <div className="grid grid-cols-4 gap-2">
                        <Input placeholder="Peso (1-10)" className="text-xs bg-white" value={c.weight} onChange={(e) => updateCriterion(i, 'weight', e.target.value)} />
                        <Input placeholder="Make (1-5)" className="text-xs bg-white" value={c.makeScore} onChange={(e) => updateCriterion(i, 'makeScore', e.target.value)} />
                        <Input placeholder="n8n (1-5)" className="text-xs bg-white" value={c.n8nScore} onChange={(e) => updateCriterion(i, 'n8nScore', e.target.value)} />
                        <Input placeholder="Implicación" className="text-xs bg-white" value={c.implication} onChange={(e) => updateCriterion(i, 'implication', e.target.value)} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trade-offs */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2"><Zap className="h-4 w-4" /> 3 Trade-offs explícitos ("acepto X para ganar Y")</h3>
              <Textarea placeholder={"1. Acepto menos flexibilidad técnica (Make) para ganar rapidez de montaje (time-to-value)\n2. Acepto dependencia de proveedor cloud (Make) para ganar conectores ya hechos\n3. Acepto mayor coste por ejecución (Make) para ganar en observabilidad y soporte"} className="text-xs bg-white min-h-[100px]" value={tradeoffs} onChange={(e) => setTradeoffs(e.target.value)} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Argumentario */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Argumentario de defensa (2 minutos)</h3>
              <Textarea placeholder="Ej.: Recomendamos Make porque el time-to-value es crítico para Domestika. En 2 semanas podemos tener el flujo lead→CRM→email funcionando. n8n requiere más setup inicial pero es mejor a largo plazo si el volumen crece mucho..." className="text-xs bg-white min-h-[100px]" value={argumentario} onChange={(e) => setArgumentario(e.target.value)} />
            </CardContent>
          </Card>

          {/* Preguntas difíciles */}
          <Card className="border-red-200 bg-gradient-to-br from-red-50 via-orange-50 to-white">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-red-900 flex items-center gap-2"><AlertCircle className="h-4 w-4" /> Respuestas a 3 preguntas difíciles</h3>
              <Textarea placeholder={"P1: ¿Cuál es el coste real a 12 meses?\nR: Make ~29€/mes × 12 = 348€. n8n self-hosted: servidor ~15€/mes + mantenimiento.\n\nP2: ¿Qué pasa si falla el flujo?\nR: Make tiene reintentos automáticos y alertas. n8n requiere configurar error handling manual.\n\nP3: ¿Quién mantiene esto?\nR: Make: cualquier persona con formación básica. n8n: necesita perfil técnico."} className="text-xs bg-white min-h-[150px]" value={preguntasDificiles} onChange={(e) => setPreguntasDificiles(e.target.value)} />
            </CardContent>
          </Card>

          {/* Riesgos */}
          <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Shield className="h-4 w-4" /> Hoja de riesgos y mitigaciones</h3>
              <Textarea placeholder={"Riesgo: Make sube precios → Mitigación: negociar plan anual\nRiesgo: n8n requiere mantenimiento técnico → Mitigación: documentar procedimientos\nRiesgo: volumen supera límite Make → Mitigación: plan de migración a n8n"} className="text-xs bg-white min-h-[80px]" value={riesgos} onChange={(e) => setRiesgos(e.target.value)} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={generate} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg">
              <FileText className="h-4 w-4 mr-2" />
              Generar entregable
            </Button>
            <Button onClick={clearAll} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar
            </Button>
          </div>

          {/* Summary */}
          {summary && (
            <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Entregable final</h3>
                  <Button onClick={copySummary} variant="outline" size="sm" className="border-slate-300"><Copy className="h-3.5 w-3.5 mr-1" /> Copiar</Button>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-3 max-h-[400px] overflow-auto font-mono text-xs leading-relaxed text-slate-800 shadow-inner">
                  <pre className="whitespace-pre-wrap">{summary}</pre>
                </div>
                {status.message && (
                  <div className={`flex items-center gap-2 text-sm p-2.5 rounded-lg ${status.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.type === 'ok' ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 flex-shrink-0" />}
                    {status.message}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
