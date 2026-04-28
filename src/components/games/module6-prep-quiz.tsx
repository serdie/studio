'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: { letter: 'a' | 'b' | 'c'; text: string }[];
  correct: 'a' | 'b' | 'c';
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Rol de la IA en marketing',
    question:
      'Tu jefe te pide "que la IA se encargue del marketing del próximo trimestre". ¿Cuál es la respuesta más profesional?',
    options: [
      {
        letter: 'a',
        text: 'Acepto y delego la mayoría de campañas en la IA porque acelera mucho la producción; los KPIs los miro al final del trimestre.',
      },
      {
        letter: 'b',
        text: 'La IA acelera el ciclo (investigación, creación, distribución, optimización) pero necesita briefs claros, control de calidad y medición continua para aportar valor sostenible.',
      },
      {
        letter: 'c',
        text: 'Aprovecho que la IA produce mucho volumen de copys/anuncios y dejo que el rendimiento se ajuste por prueba y error en plataforma.',
      },
    ],
    correct: 'b',
    explanation:
      'La IA es un acelerador del ciclo de marketing, no un sustituto del criterio humano. Sin briefs, control y medición, el volumen no se traduce en valor.',
  },
  {
    id: 2,
    topic: 'Investigación con poca data',
    question:
      'Una tienda local quiere "hacer estudio de cliente con IA" pero solo tiene 50 reseñas y unos chats de WhatsApp. ¿Por dónde empiezas?',
    options: [
      {
        letter: 'a',
        text: 'Construyo primero un buyer persona con IA usando datos genéricos del sector y lo valido con 1-2 entrevistas al final.',
      },
      {
        letter: 'b',
        text: 'Salgo a tendencias externas (foros, reviews de competencia, Google Trends) y construyo hipótesis para contrastarlas después con la muestra interna pequeña.',
      },
      {
        letter: 'c',
        text: 'Parto de las señales internas que ya tienen (reseñas, chats, objeciones comerciales) y completo con fuentes externas para contrastar patrones y reducir sesgo.',
      },
    ],
    correct: 'c',
    explanation:
      'Cuando la data es escasa, el orden correcto es señales internas primero (lo más cercano al cliente real) y después fuentes externas para contrastar. Personas inventadas o tendencias externas sin contraste interno generan sesgo.',
  },
  {
    id: 3,
    topic: 'Insight accionable',
    question:
      'De las siguientes tres frases, ¿cuál SÍ es un insight accionable según el módulo?',
    options: [
      {
        letter: 'a',
        text: '"Hay quejas sobre los tiempos de envío en redes; el cliente está cada vez más exigente."',
      },
      {
        letter: 'b',
        text: '"En el 35% de las reseñas con 1-2 estrellas se menciona ‘envío lento’; se sugiere añadir estimación de entrega en ficha de producto para reducir devoluciones (KPI: tasa de devolución por logística)."',
      },
      {
        letter: 'c',
        text: '"Los clientes valoran mucho la rapidez; deberíamos comunicar más nuestros tiempos de envío en todas las redes."',
      },
    ],
    correct: 'b',
    explanation:
      'Un insight accionable describe un patrón con evidencia (35% de reseñas), explica por qué importa (vincula a devoluciones) y propone una acción concreta vinculada a un KPI medible. Las otras dos son observaciones u opiniones sin evidencia ni acción medible.',
  },
  {
    id: 4,
    topic: 'Refinar conclusiones de la IA',
    question:
      'Le pides a ChatGPT que analice 200 reseñas. Te devuelve un texto fluido con 5 conclusiones, pero sin citas ni recuentos. ¿Qué ajustas en el prompt?',
    options: [
      {
        letter: 'a',
        text: 'Le pido que añada citas textuales (3-5 por hallazgo), una frecuencia aproximada (n/total) y que separe explícitamente "observación" de "hipótesis" y "qué falta validar".',
      },
      {
        letter: 'b',
        text: 'Le pido que clasifique los hallazgos por emociones (frustración, satisfacción, sorpresa) para hacerlos más comprensibles para el equipo.',
      },
      {
        letter: 'c',
        text: 'Le pido que asigne un nivel de confianza (alto/medio/bajo) a cada conclusión y que proponga un plan de validación, sin necesidad de citar las reseñas.',
      },
    ],
    correct: 'a',
    explanation:
      'Sin evidencia (citas + frecuencia) las conclusiones son opiniones de la IA. Un buen prompt fuerza a separar observación / hipótesis / acción y a mostrar la evidencia, lo que permite auditarla.',
  },
  {
    id: 5,
    topic: 'Sistema de contenidos',
    question:
      'Vas a montar el sistema de contenidos del Q1 con IA. ¿Qué combinación es IMPRESCINDIBLE para que escale sin perder calidad?',
    options: [
      {
        letter: 'a',
        text: 'Una biblioteca de "ejemplos top" + permitir que cada equipo los adapte a su canal con margen creativo, así el sistema es flexible.',
      },
      {
        letter: 'b',
        text: 'Brand voice operativa + briefs claros + prompts reutilizables + checklist editorial + un mínimo de versionado/gestión de cambios.',
      },
      {
        letter: 'c',
        text: 'Calendario editorial con pilares temáticos + revisión ligera, dejando que la IA proponga variaciones creativas.',
      },
    ],
    correct: 'b',
    explanation:
      'Sin brand voice operativa (somos/no somos, vocabulario), prompts reutilizables, checklist editorial y versionado, el sistema produce contenido inconsistente. Calendario y biblioteca de ejemplos son útiles pero no suficientes.',
  },
  {
    id: 6,
    topic: 'Claims sin verificar',
    question:
      'En tu pack de 12 anuncios aparecen claims tipo "el más rápido del mercado" y "ahorra hasta un 70%" sin fuente. ¿Cómo lo gestionas antes de publicar?',
    options: [
      {
        letter: 'a',
        text: 'Listo cada claim, marco cuál exige evidencia, reescribo los no verificables a formulaciones neutras o con condiciones, y paso checklist legal/marca antes de publicar.',
      },
      {
        letter: 'b',
        text: 'Si son claims típicos del sector los mantengo pero suavizo el tono y evito cifras concretas para no comprometernos.',
      },
      {
        letter: 'c',
        text: 'Los sustituyo por beneficios genéricos ("mejora tu día a día") y publico, dejando que el rendimiento decida si vale la pena pedir evidencias.',
      },
    ],
    correct: 'a',
    explanation:
      'El proceso correcto es: listar → identificar evidencia requerida → reescribir lo no verificable → checklist antes de publicar. Suavizar o sustituir sin auditar deja claims sin trazabilidad.',
  },
  {
    id: 7,
    topic: 'Intención de búsqueda (SEO)',
    question:
      'Vas a publicar una página titulada "comparativa software RRHH 2026". Aparece en posición 1 pero la conversión es baja. ¿Cuál es el principio clave?',
    options: [
      {
        letter: 'a',
        text: 'La intención importa sobre todo en TOFU; en BOFU el problema suele ser técnico (Core Web Vitals, enlazado).',
      },
      {
        letter: 'b',
        text: 'La intención de búsqueda define el formato y el objetivo de la página; si no encajan intención y contenido, el tráfico llega pero no convierte.',
      },
      {
        letter: 'c',
        text: 'La intención puede compensarse con un contenido muy completo + muchas FAQs que cubran cualquier necesidad del usuario.',
      },
    ],
    correct: 'b',
    explanation:
      'Una "comparativa" es búsqueda comparativa/transaccional, no informacional. Si el contenido es informativo, atrae clics pero no leads. Encajar intención↔contenido↔CTA es lo primero.',
  },
  {
    id: 8,
    topic: 'Coherencia anuncio-landing (SEM)',
    question:
      'Un anuncio promete "primer mes gratis" pero la landing pide tarjeta y no menciona la oferta. CPA sube y CVR baja. ¿Diagnóstico y acción?',
    options: [
      {
        letter: 'a',
        text: 'Posiblemente el problema sea segmentación o puja; ajusto keywords negativas y la estrategia de puja sin tocar la landing.',
      },
      {
        letter: 'b',
        text: 'Pueda haber desalineación; pruebo nuevas variantes de anuncio y modifico la landing para sostener la promesa con condiciones claras.',
      },
      {
        letter: 'c',
        text: 'Hay incoherencia anuncio↔landing: alineo la promesa en hero de landing, añado evidencia/condiciones y CTA único; reviso CVR y CPA tras el ajuste.',
      },
    ],
    correct: 'c',
    explanation:
      'Cuando anuncio y landing no comparten promesa+prueba+CTA, el usuario abandona. La acción correcta es alinear primero el mensaje (no tocar puja) y medir el efecto.',
  },
  {
    id: 9,
    topic: 'Diagnóstico de funnel',
    question:
      'Llegan muchas visitas a la landing y hacen clic en "Solicita demo", pero solo el 10% completa el formulario. ¿Cómo investigas antes de decidir?',
    options: [
      {
        letter: 'a',
        text: 'Probablemente sea fricción en el formulario: revisaré campos y errores, además de segmentar por dispositivo y fuente.',
      },
      {
        letter: 'b',
        text: 'El problema parece estar en la fase de formulario: instrumento eventos (form_start / form_submit / form_error), reviso fricción y segmento por móvil/escritorio antes de tocar nada.',
      },
      {
        letter: 'c',
        text: 'El hero no transmite valor: cambiaré headline + prueba social y mediré si sube la tasa de envío.',
      },
    ],
    correct: 'b',
    explanation:
      'Antes de cambiar UX hay que medir. Instrumentar eventos (form_start vs form_submit) revela DÓNDE está el drop. Segmentar móvil/desktop confirma si es fricción técnica. Sin datos, las hipótesis son adivinanzas.',
  },
  {
    id: 10,
    topic: 'Priorización CRO',
    question:
      'Tu equipo lista 30 hipótesis CRO y todos defienden la suya con vehemencia. ¿Qué método propones?',
    options: [
      {
        letter: 'a',
        text: 'Empezar por los "quick wins" (esfuerzo bajo) y revisar impacto en una segunda iteración cuando tengamos datos del funnel.',
      },
      {
        letter: 'b',
        text: 'Aplicar ICE (Impact, Confidence, Ease 1-10), justificando la confianza con evidencia (heatmaps, encuestas, datos del funnel) y enfocándonos en las etapas críticas.',
      },
      {
        letter: 'c',
        text: 'Priorizar las hipótesis más visibles (hero, CTAs grandes) para acelerar el aprendizaje cualitativo del usuario.',
      },
    ],
    correct: 'b',
    explanation:
      'ICE evita que prioricemos por intuición. La clave es que la "Confidence" venga de evidencia (no opinión) y que el foco sea el cuello de botella del funnel, no el cambio más visible.',
  },
];

export default function Module6PrepQuiz() {
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c'>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);
  const correctCount = QUESTIONS.filter((q) => answers[q.id] === q.correct).length;
  const score = Math.round((correctCount / QUESTIONS.length) * 100);

  const handleSelect = (qid: number, letter: 'a' | 'b' | 'c') => {
    if (submitted) return;
    setAnswers({ ...answers, [qid]: letter });
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Test de preparación · Módulo 6</h1>
            <p className="text-sm text-slate-600">10 preguntas tipo test para preparar la evaluación parcial · Marca tu respuesta y al final pulsa &quot;Corregir&quot;</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
            <Sparkles className="h-3 w-3 mr-1" /> 10 preguntas
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Lightbulb className="h-3 w-3 mr-1" /> Feedback con explicación
          </Badge>
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200">
            <Trophy className="h-3 w-3 mr-1" /> Puntuación final
          </Badge>
        </div>
      </div>

      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white shadow-md">
        <CardContent className="p-5 text-sm text-slate-700">
          <p>
            <strong>Cómo funciona:</strong> Lee cada caso, elige la opción que te parezca más correcta y pulsa
            <strong> Corregir test</strong> al terminar. Verás aciertos, fallos y la explicación de cada respuesta correcta.
            Las preguntas son <strong>similares pero NO idénticas</strong> a las del examen real: están pensadas para que
            asimiles los conceptos clave.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {QUESTIONS.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correct;
          const isWrong = submitted && userAnswer && userAnswer !== q.correct;

          return (
            <Card
              key={q.id}
              className={`border-2 transition-colors ${
                submitted
                  ? isCorrect
                    ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                    : isWrong
                      ? 'border-red-300 bg-gradient-to-br from-red-50 to-white'
                      : 'border-slate-200 bg-white'
                  : 'border-slate-200 bg-white hover:border-violet-300'
              }`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold ${
                      submitted
                        ? isCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-300 text-white'
                        : 'bg-violet-200 text-violet-800'
                    }`}
                  >
                    {q.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                        {q.topic}
                      </Badge>
                      {submitted && isCorrect && (
                        <Badge variant="outline" className="text-[10px] bg-green-100 text-green-700 border-green-300">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Correcto
                        </Badge>
                      )}
                      {submitted && isWrong && (
                        <Badge variant="outline" className="text-[10px] bg-red-100 text-red-700 border-red-300">
                          <XCircle className="h-3 w-3 mr-1" /> Incorrecto
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-slate-800 leading-relaxed">{q.question}</p>
                  </div>
                </div>

                <div className="space-y-2 pl-11">
                  {q.options.map((opt) => {
                    const isSelected = userAnswer === opt.letter;
                    const isCorrectOption = submitted && opt.letter === q.correct;
                    const showAsWrong = submitted && isSelected && opt.letter !== q.correct;

                    return (
                      <button
                        key={opt.letter}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.letter)}
                        disabled={submitted}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm leading-relaxed ${
                          isCorrectOption
                            ? 'border-green-400 bg-green-50 text-green-900'
                            : showAsWrong
                              ? 'border-red-400 bg-red-50 text-red-900'
                              : isSelected
                                ? 'border-violet-400 bg-violet-50 text-violet-900'
                                : 'border-slate-200 bg-white hover:border-violet-300 text-slate-700'
                        } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <span className="font-bold mr-2">{opt.letter})</span>
                        {opt.text}
                        {isCorrectOption && (
                          <span className="ml-2 inline-flex items-center text-green-700 font-semibold">
                            <CheckCircle2 className="h-4 w-4 ml-1" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="ml-11 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Explicación:</strong> {q.explanation}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!submitted && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 border border-violet-200">
          <div className="text-sm text-violet-900">
            Has respondido <strong>{Object.keys(answers).length}/{QUESTIONS.length}</strong> preguntas.
          </div>
          <Button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white font-semibold shadow-md"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" /> Corregir test
          </Button>
        </div>
      )}

      {submitted && (
        <Card
          className={`border-2 ${
            score >= 80
              ? 'border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-white'
              : score >= 50
                ? 'border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50 to-white'
                : 'border-red-300 bg-gradient-to-br from-red-50 via-rose-50 to-white'
          }`}
        >
          <CardContent className="p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Trophy
                  className={`h-10 w-10 ${
                    score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}
                />
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{correctCount}/10 aciertos</h3>
                  <p className="text-sm text-slate-700">
                    {score >= 80
                      ? '¡Excelente! Tienes los conceptos del Módulo 6 muy claros.'
                      : score >= 50
                        ? 'Bien, pero conviene repasar las preguntas falladas y leer las explicaciones.'
                        : 'Repasa los apuntes y vuelve a intentarlo: las explicaciones marcan los conceptos clave.'}
                  </p>
                </div>
              </div>
              <Button onClick={reset} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
                <RotateCcw className="h-4 w-4 mr-2" /> Reintentar
              </Button>
            </div>
            <div className="text-xs text-slate-600 italic">
              Recuerda: este test es una preparación. El examen real puede formular las mismas ideas con casos distintos.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
