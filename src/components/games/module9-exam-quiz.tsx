'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, RefreshCw, Trophy, Zap, Rocket } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  category: 'metodologia' | 'datos' | 'modelado' | 'despliegue' | 'evaluacion';
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

const questions: Question[] = [
  {
    id: 'q1', question: '¿Qué metodología es la más usada en proyectos de ciencia de datos?',
    options: [
      { id: 'a', text: 'Waterfall', isCorrect: false, explanation: 'Waterfall es demasiado rígida para proyectos de IA iterativos' },
      { id: 'b', text: 'CRISP-DM', isCorrect: true, explanation: 'Correcto. CRISP-DM (Cross-Industry Standard Process for Data Mining) es el estándar de la industria con 6 fases iterativas' },
      { id: 'c', text: 'Prince2', isCorrect: false, explanation: 'Prince2 es para gestión de proyectos general, no específica de datos' },
      { id: 'd', text: 'Six Sigma', isCorrect: false, explanation: 'Six Sigma es para calidad de procesos, no proyectos de IA' }
    ], category: 'metodologia', difficulty: 'basic'
  },
  {
    id: 'q2', question: '¿Qué porcentaje del tiempo de un proyecto de IA se dedica típicamente a la preparación de datos?',
    options: [
      { id: 'a', text: '5-10%', isCorrect: false, explanation: 'Es mucho más que eso' },
      { id: 'b', text: '15-20%', isCorrect: false, explanation: 'Todavía es bajo' },
      { id: 'c', text: '30% (el mayor bloque de tiempo)', isCorrect: true, explanation: 'Correcto. La preparación de datos consume ~30% del tiempo: limpieza, transformación, feature engineering' },
      { id: 'd', text: '50-60%', isCorrect: false, explanation: 'Aunque a veces se acerca, el estándar es ~30%' }
    ], category: 'datos', difficulty: 'basic'
  },
  {
    id: 'q3', question: '¿Qué es el "feature engineering"?',
    options: [
      { id: 'a', text: 'Diseñar la interfaz de usuario', isCorrect: false, explanation: 'Feature engineering no tiene relación con UI/UX' },
      { id: 'b', text: 'Crear nuevas variables a partir de datos existentes para mejorar el modelo', isCorrect: true, explanation: 'Correcto. Feature engineering transforma datos brutos en variables significativas que mejoran la capacidad predictiva del modelo' },
      { id: 'c', text: 'Programar funcionalidades del software', isCorrect: false, explanation: 'No se refiere a desarrollo de software' },
      { id: 'd', text: 'Seleccionar el hardware adecuado', isCorrect: false, explanation: 'No tiene relación con hardware' }
    ], category: 'datos', difficulty: 'intermediate'
  },
  {
    id: 'q4', question: '¿Qué es la validación cruzada (cross-validation)?',
    options: [
      { id: 'a', text: 'Validar datos entre dos empresas', isCorrect: false, explanation: 'No se refiere a validación entre empresas' },
      { id: 'b', text: 'Dividir datos en K pliegues y entrenar/evaluar K veces para obtener una estimación robusta del rendimiento', isCorrect: true, explanation: 'Correcto. K-fold cross-validation evita sobreajuste y da una estimación más fiable del rendimiento del modelo' },
      { id: 'c', text: 'Comprobar que los datos están en formato correcto', isCorrect: false, explanation: 'Eso es validación de formato, no cross-validation' },
      { id: 'd', text: 'Pedir a dos personas que revisen el modelo', isCorrect: false, explanation: 'No es una revisión humana' }
    ], category: 'modelado', difficulty: 'intermediate'
  },
  {
    id: 'q5', question: '¿Qué es el "data drift" en un modelo en producción?',
    options: [
      { id: 'a', text: 'Que los datos se corrompen en el servidor', isCorrect: false, explanation: 'No es corrupción de datos' },
      { id: 'b', text: 'Que la distribución de los datos de entrada cambia con el tiempo respecto a los datos de entrenamiento', isCorrect: true, explanation: 'Correcto. El data drift hace que el modelo pierda precisión porque los datos reales ya no se parecen a los de entrenamiento' },
      { id: 'c', text: 'Que el modelo se entrena con datos antiguos', isCorrect: false, explanation: 'Es más bien que los datos nuevos son diferentes' },
      { id: 'd', text: 'Un error de conexión a la base de datos', isCorrect: false, explanation: 'No es un problema de conectividad' }
    ], category: 'despliegue', difficulty: 'intermediate'
  },
  {
    id: 'q6', question: '¿Cuáles son las 6 fases de CRISP-DM en orden?',
    options: [
      { id: 'a', text: 'Diseño, Desarrollo, Testing, Despliegue, Mantenimiento, Retiro', isCorrect: false, explanation: 'Esas son fases de desarrollo de software general' },
      { id: 'b', text: 'Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, Deployment', isCorrect: true, explanation: 'Correcto. CRISP-DM sigue estas 6 fases de forma iterativa, pudiendo volver a fases anteriores' },
      { id: 'c', text: 'Planificar, Hacer, Verificar, Actuar, Medir, Mejorar', isCorrect: false, explanation: 'Eso es una variación del ciclo PDCA, no CRISP-DM' },
      { id: 'd', text: 'Investigar, Prototipar, Validar, Lanzar, Escalar, Optimizar', isCorrect: false, explanation: 'Esas no son las fases oficiales de CRISP-DM' }
    ], category: 'metodologia', difficulty: 'basic'
  },
  {
    id: 'q7', question: '¿Qué métrica se usa para evaluar un modelo de clasificación binaria?',
    options: [
      { id: 'a', text: 'RMSE (Root Mean Square Error)', isCorrect: false, explanation: 'RMSE es para modelos de regresión, no clasificación' },
      { id: 'b', text: 'F1-Score (media armónica de precisión y recall)', isCorrect: true, explanation: 'Correcto. F1-Score combina precisión y recall, ideal para datasets desbalanceados en clasificación binaria' },
      { id: 'c', text: 'PIB per cápita', isCorrect: false, explanation: 'Eso es una métrica económica, no de ML' },
      { id: 'd', text: 'Velocidad de procesamiento', isCorrect: false, explanation: 'La velocidad no evalúa la calidad de predicciones' }
    ], category: 'evaluacion', difficulty: 'intermediate'
  },
  {
    id: 'q8', question: '¿Qué es un MVP (Minimum Viable Product) en un proyecto de IA?',
    options: [
      { id: 'a', text: 'El modelo más complejo posible', isCorrect: false, explanation: 'Es lo opuesto: el más simple que funcione' },
      { id: 'b', text: 'La versión más básica del producto que demuestra valor y permite validar hipótesis', isCorrect: true, explanation: 'Correcto. El MVP permite probar la idea con mínimo esfuerzo, aprender rápido y iterar antes de invertir más recursos' },
      { id: 'c', text: 'El producto final listo para vender', isCorrect: false, explanation: 'El MVP no es el producto final' },
      { id: 'd', text: 'Un documento de 100 páginas con el plan del proyecto', isCorrect: false, explanation: 'Un MVP es funcional, no es solo documentación' }
    ], category: 'metodologia', difficulty: 'basic'
  },
  {
    id: 'q9', question: '¿Qué es el "rollout gradual" en despliegue de IA?',
    options: [
      { id: 'a', text: 'Lanzar el modelo para todos los usuarios a la vez', isCorrect: false, explanation: 'Eso es un big-bang release, no gradual' },
      { id: 'b', text: 'Desplegar progresivamente a un % de usuarios, monitorizando métricas antes de escalar', isCorrect: true, explanation: 'Correcto. El rollout gradual (canary deployment) minimiza riesgo probando con un subgrupo antes del despliegue completo' },
      { id: 'c', text: 'Desarrollar el modelo gradualmente', isCorrect: false, explanation: 'Se refiere al despliegue, no al desarrollo' },
      { id: 'd', text: 'Entregar el código por partes al cliente', isCorrect: false, explanation: 'No se refiere a entrega de código' }
    ], category: 'despliegue', difficulty: 'intermediate'
  },
  {
    id: 'q10', question: '¿Qué es el overfitting (sobreajuste)?',
    options: [
      { id: 'a', text: 'El modelo no aprende nada de los datos', isCorrect: false, explanation: 'Eso sería underfitting (subajuste)' },
      { id: 'b', text: 'El modelo memoriza los datos de entrenamiento pero no generaliza a datos nuevos', isCorrect: true, explanation: 'Correcto. El overfitting ocurre cuando el modelo es demasiado complejo y aprende ruido en lugar de patrones reales' },
      { id: 'c', text: 'El modelo tarda mucho en entrenar', isCorrect: false, explanation: 'El tiempo de entrenamiento no define el overfitting' },
      { id: 'd', text: 'Los datos tienen demasiadas columnas', isCorrect: false, explanation: 'Tener muchas features puede contribuir pero no define el overfitting' }
    ], category: 'modelado', difficulty: 'basic'
  },
  {
    id: 'q11', question: '¿Qué documento es esencial para presentar un proyecto de IA a stakeholders?',
    options: [
      { id: 'a', text: 'El código fuente completo', isCorrect: false, explanation: 'Los stakeholders no quieren ver código' },
      { id: 'b', text: 'Un business case con ROI estimado, riesgos, timeline y recursos necesarios', isCorrect: true, explanation: 'Correcto. Los stakeholders necesitan entender el valor de negocio, no los detalles técnicos' },
      { id: 'c', text: 'Los logs del servidor', isCorrect: false, explanation: 'Los logs son técnicos, no para stakeholders' },
      { id: 'd', text: 'Una lista de algoritmos posibles', isCorrect: false, explanation: 'Los stakeholders no evalúan algoritmos' }
    ], category: 'metodologia', difficulty: 'basic'
  },
  {
    id: 'q12', question: '¿Qué split de datos es estándar para entrenamiento/validación/test?',
    options: [
      { id: 'a', text: '50/25/25', isCorrect: false, explanation: 'Dar solo 50% al entrenamiento suele ser insuficiente' },
      { id: 'b', text: '70/15/15 o 80/10/10', isCorrect: true, explanation: 'Correcto. La mayoría de datos se usan para entrenamiento, reservando porciones para validación y test final' },
      { id: 'c', text: '33/33/33', isCorrect: false, explanation: 'Dar un tercio a cada uno desperdicia datos de entrenamiento' },
      { id: 'd', text: '100/0/0', isCorrect: false, explanation: 'Sin datos de validación/test no puedes evaluar el modelo' }
    ], category: 'datos', difficulty: 'intermediate'
  },
  {
    id: 'q13', question: '¿Qué es un "pipeline" de ML?',
    options: [
      { id: 'a', text: 'Una tubería física para transportar datos', isCorrect: false, explanation: 'No es una tubería física' },
      { id: 'b', text: 'Una secuencia automatizada de pasos: ingesta, preprocesamiento, entrenamiento, evaluación y despliegue', isCorrect: true, explanation: 'Correcto. El pipeline automatiza todo el flujo desde datos crudos hasta modelo en producción, garantizando reproducibilidad' },
      { id: 'c', text: 'Un tipo de red neuronal', isCorrect: false, explanation: 'No es una arquitectura de red neuronal' },
      { id: 'd', text: 'Un documento de requisitos', isCorrect: false, explanation: 'No es documentación' }
    ], category: 'despliegue', difficulty: 'intermediate'
  },
  {
    id: 'q14', question: '¿Qué métricas de negocio son importantes para evaluar un proyecto de IA?',
    options: [
      { id: 'a', text: 'Solo la accuracy del modelo', isCorrect: false, explanation: 'La accuracy técnica no es suficiente sin contexto de negocio' },
      { id: 'b', text: 'ROI, tiempo ahorrado, reducción de errores, satisfacción del usuario y KPIs de negocio', isCorrect: true, explanation: 'Correcto. Un proyecto de IA exitoso se mide por su impacto real en el negocio, no solo por métricas técnicas' },
      { id: 'c', text: 'Líneas de código escritas', isCorrect: false, explanation: 'Las líneas de código no miden valor' },
      { id: 'd', text: 'Número de reuniones realizadas', isCorrect: false, explanation: 'Las reuniones no miden resultados' }
    ], category: 'evaluacion', difficulty: 'basic'
  },
  {
    id: 'q15', question: '¿Qué es el "retraining" de un modelo en producción?',
    options: [
      { id: 'a', text: 'Volver a programar el modelo desde cero', isCorrect: false, explanation: 'No es reprogramar, es re-entrenar con nuevos datos' },
      { id: 'b', text: 'Re-entrenar periódicamente el modelo con datos nuevos para mantener su rendimiento', isCorrect: true, explanation: 'Correcto. Los modelos en producción degradan su rendimiento con el tiempo (model decay) y necesitan ser re-entrenados' },
      { id: 'c', text: 'Dar formación a los empleados', isCorrect: false, explanation: 'Training de personas es diferente a retraining de modelos' },
      { id: 'd', text: 'Cambiar de proveedor de cloud', isCorrect: false, explanation: 'No tiene relación con migración de cloud' }
    ], category: 'despliegue', difficulty: 'intermediate'
  },
  {
    id: 'q16', question: '¿Qué herramienta se usa para tracking de experimentos de ML?',
    options: [
      { id: 'a', text: 'Excel', isCorrect: false, explanation: 'Excel no está diseñado para tracking de experimentos ML' },
      { id: 'b', text: 'MLflow / Weights & Biases', isCorrect: true, explanation: 'Correcto. MLflow y W&B permiten registrar parámetros, métricas, artefactos y comparar experimentos de forma reproducible' },
      { id: 'c', text: 'PowerPoint', isCorrect: false, explanation: 'PowerPoint es para presentaciones' },
      { id: 'd', text: 'Slack', isCorrect: false, explanation: 'Slack es para comunicación' }
    ], category: 'modelado', difficulty: 'advanced'
  },
  {
    id: 'q17', question: '¿Qué es la "explicabilidad" en el contexto de un proyecto de IA para un banco?',
    options: [
      { id: 'a', text: 'Que el código esté bien comentado', isCorrect: false, explanation: 'Código comentado es buena práctica pero no es explicabilidad del modelo' },
      { id: 'b', text: 'Poder explicar por qué el modelo tomó una decisión específica (ej: rechazar un préstamo)', isCorrect: true, explanation: 'Correcto. En sectores regulados, es obligatorio explicar las decisiones automatizadas que afectan a las personas (GDPR Art. 22)' },
      { id: 'c', text: 'Hacer una presentación bonita', isCorrect: false, explanation: 'La explicabilidad va más allá de la presentación' },
      { id: 'd', text: 'Publicar el modelo como open source', isCorrect: false, explanation: 'Open source no implica explicabilidad' }
    ], category: 'evaluacion', difficulty: 'advanced'
  },
  {
    id: 'q18', question: '¿Qué es el "A/B testing" aplicado a modelos de IA?',
    options: [
      { id: 'a', text: 'Probar el modelo en los servidores A y B', isCorrect: false, explanation: 'No se refiere a servidores' },
      { id: 'b', text: 'Comparar dos versiones del modelo con usuarios reales para ver cuál funciona mejor', isCorrect: true, explanation: 'Correcto. El A/B test divide el tráfico entre el modelo actual (control) y el nuevo (variante) para medir diferencias de rendimiento' },
      { id: 'c', text: 'Usar dos lenguajes de programación', isCorrect: false, explanation: 'No se refiere a lenguajes de programación' },
      { id: 'd', text: 'Tener dos copias de seguridad', isCorrect: false, explanation: 'No es sobre backups' }
    ], category: 'despliegue', difficulty: 'intermediate'
  },
  {
    id: 'q19', question: '¿Qué es un "baseline model"?',
    options: [
      { id: 'a', text: 'El modelo más avanzado posible', isCorrect: false, explanation: 'Es lo opuesto: el modelo más simple' },
      { id: 'b', text: 'Un modelo simple de referencia contra el cual comparar modelos más complejos', isCorrect: true, explanation: 'Correcto. El baseline (ej: regresión logística, media) establece el mínimo rendimiento que un modelo complejo debe superar para justificar su uso' },
      { id: 'c', text: 'La primera línea del código', isCorrect: false, explanation: 'No se refiere a código' },
      { id: 'd', text: 'El modelo que usa el competidor', isCorrect: false, explanation: 'No es el modelo del competidor' }
    ], category: 'modelado', difficulty: 'basic'
  },
  {
    id: 'q20', question: '¿Qué debe incluir la documentación final de un proyecto de IA?',
    options: [
      { id: 'a', text: 'Solo el código fuente', isCorrect: false, explanation: 'La documentación debe ser mucho más completa' },
      { id: 'b', text: 'Problema, datos, modelo, métricas, limitaciones, plan de monitorización, lecciones aprendidas y guía de mantenimiento', isCorrect: true, explanation: 'Correcto. La documentación completa permite que otros equipos mantengan, mejoren y auditen el sistema' },
      { id: 'c', text: 'Solo el informe de resultados', isCorrect: false, explanation: 'Faltarían datos, metodología, limitaciones y mantenimiento' },
      { id: 'd', text: 'Un email resumen al jefe', isCorrect: false, explanation: 'Un email no es documentación suficiente' }
    ], category: 'evaluacion', difficulty: 'basic'
  }
];

export default function Module9ExamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [mode, setMode] = useState<'practice' | 'exam' | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startQuiz = (m: 'practice' | 'exam') => {
    setMode(m);
    const s = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(m === 'exam' ? s.slice(0, 10) : s);
    setCurrentQuestion(0); setScore(0); setShowResult(false); setSelectedAnswer(null); setAnswered(false);
  };

  const handleAnswer = (id: string) => {
    if (answered) return;
    setSelectedAnswer(id); setAnswered(true);
    if (shuffledQuestions[currentQuestion].options.find(o => o.id === id)?.isCorrect) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < shuffledQuestions.length) { setCurrentQuestion(q => q + 1); setSelectedAnswer(null); setAnswered(false); }
    else setShowResult(true);
  };

  const resetQuiz = () => { setMode(null); setCurrentQuestion(0); setScore(0); setShowResult(false); setSelectedAnswer(null); setAnswered(false); };

  if (!mode) {
    return (
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-orange-900">Test de Proyectos Integradores de IA</CardTitle>
              <p className="text-sm text-orange-700">20 preguntas sobre metodología, datos, modelado, evaluación y despliegue</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button onClick={() => startQuiz('practice')} className="h-20 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
              <div className="text-center"><Brain className="h-6 w-6 mx-auto mb-1" /><div className="font-bold">Modo Práctica</div><div className="text-xs opacity-80">20 preguntas con explicaciones</div></div>
            </Button>
            <Button onClick={() => startQuiz('exam')} className="h-20 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600">
              <div className="text-center"><Trophy className="h-6 w-6 mx-auto mb-1" /><div className="font-bold">Modo Examen</div><div className="text-xs opacity-80">10 preguntas aleatorias</div></div>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Metodología</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Datos</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Modelado</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Evaluación</Badge>
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Despliegue</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / shuffledQuestions.length) * 100);
    return (
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-orange-900">
            {pct >= 90 ? '¡Project Manager de IA experto!' : pct >= 70 ? '¡Buen dominio!' : pct >= 50 ? 'Vas por buen camino' : 'Repasa la metodología'}
          </h3>
          <p className="text-4xl font-bold text-orange-600">{score}/{shuffledQuestions.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <div className="flex gap-3 justify-center">
            <Button onClick={resetQuiz} variant="outline" className="border-orange-300"><RefreshCw className="h-4 w-4 mr-2" /> Volver</Button>
            <Button onClick={() => startQuiz(mode)} className="bg-orange-500 hover:bg-orange-600"><Zap className="h-4 w-4 mr-2" /> Repetir</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const q = shuffledQuestions[currentQuestion];

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
          </Badge>
          <span className="text-sm text-orange-600 font-medium">Pregunta {currentQuestion + 1}/{shuffledQuestions.length}</span>
        </div>
        <Progress value={((currentQuestion + 1) / shuffledQuestions.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold text-orange-900">{q.question}</h3>
        <div className="space-y-2">
          {q.options.map(opt => (
            <button key={opt.id} onClick={() => handleAnswer(opt.id)} disabled={answered}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${!answered ? 'border-orange-200 hover:border-orange-400 hover:bg-orange-50 cursor-pointer' : opt.isCorrect ? 'border-green-500 bg-green-50' : selectedAnswer === opt.id ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-60'}`}>
              <div className="flex items-start gap-2">
                <span className="font-bold text-orange-600">{opt.id.toUpperCase()})</span>
                <span className="text-sm">{opt.text}</span>
              </div>
              {answered && (selectedAnswer === opt.id || opt.isCorrect) && (
                <p className="text-xs mt-1 ml-6 text-slate-600 italic">{opt.explanation}</p>
              )}
            </button>
          ))}
        </div>
        {answered && (
          <div className="flex justify-end">
            <Button onClick={nextQuestion} className="bg-orange-500 hover:bg-orange-600">
              {currentQuestion + 1 < shuffledQuestions.length ? 'Siguiente' : 'Ver resultados'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
