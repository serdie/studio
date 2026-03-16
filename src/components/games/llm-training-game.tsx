'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Lightbulb, Trophy, Target, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  tags: string[];
  explainCorrect: string;
  explainWrong: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Caso (razonamiento): Un equipo usa un LLM para redactar respuestas legales. A veces \"suena convincente\" pero contiene errores. ¿Qué medida reduce mejor el riesgo sin frenar demasiado el trabajo?",
    options: [
      "Pedir respuestas más cortas y prohibir explicaciones para que no rellene con texto innecesario.",
      "Exigir citas a fuentes internas, separar \"borrador\" de \"verificación\" y validar con checklist antes de enviar.",
      "Subir la creatividad para que proponga más alternativas y así sea menos probable un error puntual."
    ],
    correct: 1,
    tags: ["Fiabilidad", "Calidad", "Checklist"],
    explainCorrect: "La clave en entornos legales es separar la redacción (borrador del LLM) de la verificación humana, apoyada en fuentes internas y checklists claros. Así reduces alucinaciones sin renunciar a la productividad.",
    explainWrong: [
      "Responder más corto no arregla el problema de fondo: pueden seguir apareciendo errores graves, solo que resumidos.",
      "✔ Esta opción introduce evidencias internas, una fase explícita de verificación y un checklist, que son las bases del uso profesional del LLM en tareas de riesgo.",
      "Aumentar la creatividad incrementa la variabilidad y el riesgo de inventarse argumentos legales plausibles pero falsos."
    ]
  },
  {
    id: 2,
    text: "¿Cuál es el mayor problema de seguridad al pegar datos sensibles de clientes en una herramienta no aprobada?",
    options: [
      "Que el sistema tarde más en procesar el texto y se reduzca la productividad en momentos de carga.",
      "Que el equipo pierda trazabilidad del contenido si copia/pega y cambia el formato de los textos.",
      "Riesgo de fuga de datos y de incumplimiento (privacidad, contratos, normativa) por uso fuera de control."
    ],
    correct: 2,
    tags: ["Seguridad", "Privacidad", "Gobernanza"],
    explainCorrect: "El problema crítico es la fuga de datos fuera de los sistemas controlados, lo que puede vulnerar privacidad, contratos y normativa. No es un tema de rendimiento, sino de cumplimiento y riesgo legal.",
    explainWrong: [
      "La productividad importa, pero aquí hablamos de un riesgo legal y de privacidad, mucho más grave.",
      "La trazabilidad es relevante, pero el núcleo del riesgo es exponer datos sensibles a un proveedor o canal no autorizado.",
      "✔ El mayor problema es perder el control sobre datos sensibles: ya no sabes dónde están ni cómo se usan."
    ]
  },
  {
    id: 3,
    text: "¿Cuál describe mejor la diferencia entre RAG y fine-tuning en un caso empresarial?",
    options: [
      "RAG modifica el modelo; fine-tuning solo añade documentos al contexto cuando se le pregunta.",
      "RAG recupera documentos relevantes en tiempo real; fine-tuning ajusta el modelo con ejemplos para estilo/tarea.",
      "RAG se usa para voz e imagen; fine-tuning se usa solo para chat interno y atención al cliente."
    ],
    correct: 1,
    tags: ["RAG", "Fine-tuning", "Arquitectura"],
    explainCorrect: "RAG no cambia el modelo: usa recuperación de documentos relevantes para responder con contenido actualizado. El fine‑tuning sí modifica el modelo entrenándolo con ejemplos para que aprenda un estilo o comportamiento concreto.",
    explainWrong: [
      "Aquí se invierte el concepto: en realidad el que modifica el modelo es el fine‑tuning, no RAG.",
      "✔ Esta definición separa bien ambos: RAG = recuperar documentos en tiempo real; fine‑tuning = adaptar el modelo a partir de ejemplos.",
      "RAG y fine‑tuning se aplican a texto (y otros modos), no tienen esa separación simple por canal de uso."
    ]
  },
  {
    id: 4,
    text: "Caso (razonamiento): Un chatbot de soporte responde con información antigua porque la política cambió ayer. ¿Qué solución es más adecuada?",
    options: [
      "Aumentar la ventana de contexto para que recuerde más conversaciones y se actualice por acumulación.",
      "Usar RAG con base documental actualizada y control de versiones para respuestas basadas en política vigente.",
      "Pedir al modelo que \"solo diga cosas correctas\" y que nunca invente, sin cambiar el sistema."
    ],
    correct: 1,
    tags: ["RAG", "Actualización", "Soporte"],
    explainCorrect: "El problema es que las respuestas se basan en conocimiento desactualizado. Con RAG y una base documental mantenida al día, el modelo responde según las políticas vigentes sin necesitar re-entrenar el modelo completo.",
    explainWrong: [
      "Más contexto de chat no arregla la falta de actualización de la fuente. Seguiría usando información antigua.",
      "✔ Con RAG, el modelo consulta siempre documentos actualizados y versionados, reduciendo respuestas obsoletas.",
      "Ordenar \"no te equivoques\" sin cambiar el sistema no modifica las fuentes ni la arquitectura de la solución."
    ]
  },
  {
    id: 5,
    text: "¿Cuál es una señal típica de que el prompt está incompleto y causará respuestas inconsistentes?",
    options: [
      "La respuesta es larga pero está bien escrita, con ejemplos, y parece exhaustiva en la mayoría de apartados.",
      "El modelo hace una pregunta de aclaración y pide datos, aunque el usuario crea que ya eran obvios.",
      "No defines audiencia, objetivo ni formato; el modelo improvisa criterios y el resultado cambia entre intentos."
    ],
    correct: 2,
    tags: ["Prompting", "Formato", "Consistencia"],
    explainCorrect: "Si no defines audiencia, objetivo y formato, el modelo tiene que improvisar. Eso hace que, con el mismo mensaje, genere salidas muy distintas entre intentos: falta diseño de prompt profesional.",
    explainWrong: [
      "Una respuesta puede ser larga y correcta: la longitud no es, por sí sola, una señal de problema.",
      "Que el modelo pida aclaraciones suele ser bueno: está detectando huecos y pidiendo más contexto.",
      "✔ Cuando no marcas audiencia, objetivo y formato, el modelo \"se inventa\" el encargo y la salida es inestable."
    ]
  },
  {
    id: 6,
    text: "Caso (razonamiento): Dos modelos redactan emails comerciales: uno es creativo y otro constante. ¿Qué enfoque ayuda a consistencia?",
    options: [
      "Subir temperatura y top‑p para generar variedad, y elegir manualmente la mejor opción cada vez.",
      "Bajar temperatura, fijar estructura de salida y usar ejemplos de estilo aceptado (few‑shot) para guiar.",
      "Pedir metáforas y humor para que el tono sea \"humano\" y se mantenga más memorable en el tiempo."
    ],
    correct: 1,
    tags: ["Temperatura", "Few-shot", "Ventas"],
    explainCorrect: "Para consistencia necesitas menos aleatoriedad (baja temperatura), una estructura fija de email y ejemplos representativos que el modelo pueda imitar. Así las respuestas se parecen y resultan predecibles.",
    explainWrong: [
      "Subir la temperatura aumenta variación y hace más difícil mantener un estándar de comunicación.",
      "✔ La combinación de baja creatividad + estructura fija + ejemplos es el patrón típico para mensajes consistentes.",
      "Metáforas y humor pueden ser útiles en marketing, pero no garantizan consistencia ni alineación con la marca."
    ]
  },
  {
    id: 7,
    text: "¿Cuál es el criterio más útil para decidir si un GPT personalizado encaja en un departamento?",
    options: [
      "Que sea el más popular y tenga muchas valoraciones, porque eso asegura que funciona en cualquier sector.",
      "Propósito claro, límites definidos, fuentes controladas y pruebas con casos reales del área antes de desplegar.",
      "Un nombre atractivo y un logo profesional, aunque no tenga instrucciones ni conocimiento cargado."
    ],
    correct: 1,
    tags: ["GPTs", "Gobernanza", "Casos reales"],
    explainCorrect: "En empresa importa que el GPT tenga propósito claro, límite de uso definido, fuentes fiables y pruebas con casos reales. Popularidad o branding no garantizan que sea seguro ni útil para tu contexto.",
    explainWrong: [
      "Las reseñas pueden orientarte, pero no sustituyen un análisis sobre tu propio contexto y riesgos.",
      "✔ Definir propósito, límites, fuentes y hacer pruebas reales es la forma profesional de introducir un GPT.",
      "Un logo bonito sin instrucciones ni contenido es puro marketing sin valor operativo."
    ]
  },
  {
    id: 8,
    text: "Caso (razonamiento): Quieren un GPT que responda sobre procedimientos internos. ¿Qué diseño reduce respuestas inventadas?",
    options: [
      "Subir creatividad para que complete huecos si no encuentra información suficiente en los documentos.",
      "Instrucción de \"si no hay evidencia di no lo sé\", más RAG con documentos oficiales y citas obligatorias.",
      "Pedir que no muestre dudas y que siempre cierre con una respuesta final segura para dar confianza al usuario."
    ],
    correct: 1,
    tags: ["RAG", "No inventar", "Procedimientos"],
    explainCorrect: "La combinación correcta es: usar tus documentos oficiales (RAG) y obligar al GPT a reconocer la incertidumbre cuando no tiene evidencia suficiente. Citar fuentes y permitir \"no lo sé\" reduce alucinaciones.",
    explainWrong: [
      "Más creatividad hace que el modelo rellene huecos con cosas plausibles pero no verificadas.",
      "✔ Decir \"si no hay evidencia, di que no lo sabes\" más RAG con documentos oficiales es la receta anti‑inventos.",
      "Pedir que nunca muestre dudas empuja al modelo a inventar antes que reconocer límites."
    ]
  },
  {
    id: 9,
    text: "¿Qué describe mejor \"prompt injection\"?",
    options: [
      "Overfitting: el modelo memoriza demasiado y por eso revela fragmentos exactos del entrenamiento original.",
      "Data drift: los datos del negocio cambian con el tiempo y el modelo se vuelve menos fiable gradualmente.",
      "Instrucciones maliciosas que intentan anular las reglas del sistema o del GPT para alterar conducta o extraer datos."
    ],
    correct: 2,
    tags: ["Seguridad", "Prompt injection"],
    explainCorrect: "Prompt injection son instrucciones (a menudo escondidas en documentos o entradas) que intentan saltarse las reglas del sistema, cambiar el comportamiento del modelo o hacer que revele información que no debería.",
    explainWrong: [
      "El overfitting está relacionado con el entrenamiento, no con instrucciones maliciosas en tiempo de uso.",
      "El data drift tiene que ver con cambios en los datos del negocio, no con ataques de prompt.",
      "✔ La inyección de prompts busca reescribir las instrucciones internas y comprometer seguridad o privacidad."
    ]
  },
  {
    id: 10,
    text: "Caso (razonamiento): Tu empresa quiere medir si el LLM mejora la gestión de tickets. ¿Qué métricas son más sólidas?",
    options: [
      "Medir solo cantidad de respuestas y tiempo de escritura, sin revisar calidad ni satisfacción del usuario final.",
      "Tiempo de resolución, re‑aperturas, calidad por muestreo, satisfacción, y cumplimiento de tono/política interna.",
      "Medir longitud media del texto y número de palabras técnicas, asumiendo que más palabras implica más calidad."
    ],
    correct: 1,
    tags: ["KPIs", "Soporte", "Calidad"],
    explainCorrect: "Para evaluar impacto real, debes mirar tiempo de resolución, número de re‑aperturas, calidad de las respuestas, satisfacción del usuario y si se respeta la política interna. No basta con \"escribir más rápido\".",
    explainWrong: [
      "Medir solo cantidad y velocidad ignora el valor central: calidad, resolución real y satisfacción.",
      "✔ Estas métricas conectan el uso del LLM con resultados operativos y de experiencia de cliente.",
      "Más texto o más jerga no equivale a más calidad; puede incluso empeorar la experiencia."
    ]
  },
  {
    id: 11,
    text: "Pregunta de prompts (estructura): ¿Cuál es la estructura más completa y práctica para un prompt profesional?",
    options: [
      "Pedir la tarea y añadir \"hazlo lo mejor posible\", para dejar libertad al modelo y evitar limitar resultados.",
      "Rol + objetivo + contexto/datos + pasos/instrucciones + restricciones + formato de salida + criterio de calidad.",
      "Escribir en mayúsculas, repetir la orden tres veces y terminar con \"urgente\" para que priorice la instrucción."
    ],
    correct: 1,
    tags: ["Prompting", "Estructura"],
    explainCorrect: "Un prompt profesional actúa como un brief: define rol, objetivo, contexto, instrucciones, límites, formato y criterios de calidad. Esta estructura es transferible a cualquier LLM y aumenta la repetibilidad.",
    explainWrong: [
      "Esto sigue siendo vago: no ofrece ni contexto, ni formato, ni criterios claros de éxito.",
      "✔ Aquí aparece el \"prompt‑brief\" completo, que es la base del prompting profesional en el módulo.",
      "Escribir en mayúsculas no cambia la lógica del modelo; solo hace el prompt más feo."
    ]
  },
  {
    id: 12,
    text: "Caso (razonamiento): Necesitas que un LLM extraiga datos de 200 facturas con un formato estable. ¿Qué pides?",
    options: [
      "Un resumen narrativo de cada factura, con comentarios libres sobre \"lo más importante\" de cada documento.",
      "Salida en JSON con campos definidos, validación de campos obligatorios y ejemplo de una factura ya resuelta.",
      "Una respuesta creativa con metáforas para que sea más fácil detectar patrones en lectura rápida."
    ],
    correct: 1,
    tags: ["Extracción", "JSON", "Estructura"],
    explainCorrect: "Para extracción masiva y estable, necesitas un formato estructurado (JSON/tablas), campos definidos, validaciones y un ejemplo few‑shot. Así puedes automatizar revisión y detectar huecos.",
    explainWrong: [
      "Un resumen narrativo no sirve para alimentar sistemas ni hojas de cálculo de forma robusta.",
      "✔ JSON con campos fijos, validación y ejemplo hace la tarea reproducible y automatizable.",
      "La creatividad aquí solo añade ruido: quieres exactitud y estructura, no metáforas."
    ]
  },
  {
    id: 13,
    text: "¿Qué práctica ayuda más a evitar que el modelo mezcle instrucciones contradictorias del usuario en una conversación larga?",
    options: [
      "Mantener un único hilo para todo y no reiniciar nunca, así el modelo \"aprende\" del historial completo.",
      "Reformular objetivos, resumir decisiones y fijar un \"contrato\" de salida cuando cambie el encargo o el contexto.",
      "Cambiar continuamente el tono y pedir estilos distintos, para que el modelo no \"se acomode\" a una sola pauta."
    ],
    correct: 1,
    tags: ["Contexto", "Continuidad"],
    explainCorrect: "Cuando el encargo cambia, tienes que resetear: resumir lo decidido, aclarar el nuevo objetivo y fijar formato de salida. Ese \"contrato\" evita que el modelo mezcle instrucciones antiguas con las nuevas.",
    explainWrong: [
      "Un único hilo infinito hace que el contexto sea confuso y las instrucciones se contradigan.",
      "✔ Resumir y fijar un nuevo objetivo/formato limpia el contexto mental del modelo y mejora la coherencia.",
      "Cambiar el tono muchas veces no resuelve las contradicciones de instrucciones."
    ]
  },
  {
    id: 14,
    text: "Caso (razonamiento): En un GPT de RRHH, un usuario intenta que el sistema revele salarios de terceros. ¿Qué medida es más apropiada?",
    options: [
      "Responder con un salario aproximado para ser útil, pero avisar de que podría no ser exacto en todos los casos.",
      "Política de denegación para datos sensibles, redirección a canales oficiales y registro/auditoría del incidente.",
      "Contestar que \"no tengo internet\" y cambiar de tema, evitando explicar por qué no se puede responder."
    ],
    correct: 1,
    tags: ["RRHH", "Datos sensibles", "Política"],
    explainCorrect: "Los datos de salarios son sensibles. El GPT debe negarse sistemáticamente, redirigir a canales oficiales y dejar trazabilidad. Así se protege privacidad y se refuerza la gobernanza.",
    explainWrong: [
      "Inventar un salario aproximado sería un riesgo legal y ético enorme.",
      "✔ La política de denegación + canal oficial + registro es el patrón profesional en contextos sensibles.",
      "\"No tengo internet\" es una excusa poco transparente y no establece una norma clara para futuros casos."
    ]
  },
  {
    id: 15,
    text: "¿Qué es más adecuado cuando necesitas respuestas \"repetibles\" para un procedimiento operativo (SOP)?",
    options: [
      "Creatividad alta y tono variado, para que el equipo no se aburra leyendo instrucciones repetidas.",
      "Creatividad baja, plantilla fija, y criterios de aceptación claros para que el resultado sea estable y revisable.",
      "Pedir siempre \"sorpréndeme\" al final, para que el modelo encuentre mejoras aunque no se las pidas explícitamente."
    ],
    correct: 1,
    tags: ["SOP", "Consistencia"],
    explainCorrect: "En SOPs buscas estabilidad: que la respuesta sea siempre parecida, verificable y fácil de auditar. Por eso usas baja creatividad, plantilla fija y criterios de aceptación muy claros.",
    explainWrong: [
      "La creatividad en exceso puede introducir variaciones que confundan a quien ejecuta el proceso.",
      "✔ Plantilla fija + baja creatividad + criterios de aceptación es la receta para SOPs consistentes.",
      "Pedir \"sorpréndeme\" contradice la idea de procedimiento estándar."
    ]
  },
  {
    id: 16,
    text: "Caso (razonamiento): Un equipo quiere \"conectar\" el LLM a documentos internos. ¿Qué requisito es clave antes de desplegar?",
    options: [
      "Que los documentos sean bonitos y con portada corporativa, para que el modelo \"los entienda\" mejor.",
      "Control de acceso, trazabilidad, actualización de fuentes y pruebas de recuperación para evitar respuestas con base débil.",
      "Traducir toda la documentación a inglés, porque el modelo siempre funciona mejor con documentación en ese idioma."
    ],
    correct: 1,
    tags: ["RAG", "Seguridad", "Documentos"],
    explainCorrect: "Antes de conectar el LLM a documentos internos debes asegurar control de acceso, trazabilidad, actualización y pruebas de recuperación. Si no, corres el riesgo de respuestas basadas en documentos obsoletos o no autorizados.",
    explainWrong: [
      "El diseño de las portadas es irrelevante para la calidad de recuperación.",
      "✔ Lo crítico es quién accede a qué, con qué versión y con qué calidad de recuperación.",
      "Traducir a inglés puede ser irrelevante si el negocio opera en otro idioma; el problema es de gobierno, no de idioma."
    ]
  },
  {
    id: 17,
    text: "¿Qué enfoque describe mejor el uso correcto de \"few‑shot prompting\" en empresa?",
    options: [
      "Dar muchos ejemplos aleatorios, aunque sean distintos, para que el modelo tenga variedad y sea más creativo.",
      "Dar pocos ejemplos representativos con el formato deseado, y mantenerlos alineados con la tarea y el tono esperado.",
      "Copiar un manual completo como ejemplo, aunque sea largo, para que el modelo \"aprenda todo\" en una sola llamada."
    ],
    correct: 1,
    tags: ["Few-shot", "Ejemplos"],
    explainCorrect: "El few‑shot funciona bien cuando das pocos ejemplos, muy representativos y alineados con el formato y tono que quieres. No se trata de cantidad, sino de calidad y coherencia de los ejemplos.",
    explainWrong: [
      "Ejemplos aleatorios confunden al modelo porque mezclan estilos y objetivos.",
      "✔ Pocos ejemplos, claros y consistentes, son suficientes para que el modelo aprenda el patrón que buscas.",
      "Pegar un manual completo en un prompt es ineficiente y no garantiza que el modelo copie bien el formato."
    ]
  },
  {
    id: 18,
    text: "Caso (razonamiento): Un modelo responde bien pero a veces añade contenido no pedido (\"relleno\"). ¿Qué ajuste suele ayudar?",
    options: [
      "Pedir \"explica todo con máximo detalle\" y \"añade recomendaciones\" para que no se quede corto nunca.",
      "Añadir restricciones (solo X apartados), límite de longitud y formato de salida estricto con checklist final.",
      "Subir temperatura para que explore más ideas, y luego dejar que el usuario elija lo que le interesa."
    ],
    correct: 1,
    tags: ["Formato", "Restricciones"],
    explainCorrect: "Si el problema es el relleno, necesitas reducir el espacio para improvisar: limitar apartados, longitud y fijar formato y checklist de salida. Así el modelo sabe qué cabe y qué no en la respuesta.",
    explainWrong: [
      "Esto va justo en la dirección contraria: pedir más detalle aumenta el relleno.",
      "✔ Las restricciones claras y el formato estricto reducen el contenido irrelevante.",
      "Subir temperatura genera más variación y relleno, no menos."
    ]
  },
  {
    id: 19,
    text: "Pregunta GPT vs Proyecto (razonamiento): Para un departamento comercial, ¿cuándo es más oportuno crear un GPT y no un proyecto completo?",
    options: [
      "Cuando se necesita integrar datos de CRM, hacer despliegue con seguimiento y cambiar procesos de trabajo del equipo.",
      "Cuando se busca estandarizar tareas repetibles (borradores, guiones, emails) con instrucciones y conocimiento acotados.",
      "Cuando se requiere rediseñar el proceso, definir KPIs, gestionar riesgos y coordinar a varias áreas de la empresa."
    ],
    correct: 1,
    tags: ["GPT", "Proyecto", "Alcance"],
    explainCorrect: "Un GPT es ideal para tareas repetitivas y bien acotadas, como borradores de emails o guiones. No exige rediseñar procesos ni integrar sistemas complejos: es un \"copiloto\" ligero.",
    explainWrong: [
      "Esto ya apunta a un proyecto de integración y cambio organizativo, no solo a un GPT.",
      "✔ Cuando solo quieres estandarizar textos y flujos sencillos, un GPT bien diseñado suele ser suficiente.",
      "Rediseñar procesos y coordinar varias áreas es trabajo de proyecto, no de simple configuración de GPT."
    ]
  },
  {
    id: 20,
    text: "Pregunta GPT vs Proyecto (razonamiento): ¿Cuál de estos casos apunta más claramente a \"proyecto\" (y no solo GPT)?",
    options: [
      "Un asistente que redacta propuestas comerciales siguiendo una plantilla fija y revisa ortografía y tono de marca.",
      "Un GPT que prepara respuestas tipo para FAQs internas, citando el documento oficial y devolviendo el enlace.",
      "Automatizar atención al cliente con integración a tickets, base de conocimiento, métricas, y mejora continua operativa."
    ],
    correct: 2,
    tags: ["Proyecto", "Integración"],
    explainCorrect: "Cuando ya hablamos de automatizar atención con integración a sistemas de tickets, base de conocimiento, métricas y mejora continua, estamos en territorio de proyecto: requiere arquitectura, equipo y gobernanza.",
    explainWrong: [
      "Este uso puede resolverse con un GPT bien configurado más revisión humana.",
      "Las FAQs con citas suelen ser un buen caso de GPT + RAG, sin necesidad de gran proyecto.",
      "✔ Integración, métricas y mejora continua implican un proyecto con varias piezas técnicas y organizativas."
    ]
  }
];

type Mode = 'practice' | 'exam';
type AnswerState = 'correct' | 'wrong' | null;

export default function LLMTrainingGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [answered, setAnswered] = useState<AnswerState[]>(Array(questions.length).fill(null));
  const [mastered, setMastered] = useState<boolean[]>(Array(questions.length).fill(false));
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const correctCount = answered.filter(a => a === 'correct').length;
  const wrongCount = answered.filter(a => a === 'wrong').length;
  const answeredCount = correctCount + wrongCount;
  const masteredCount = mastered.filter(Boolean).length;

  const handleAnswer = (idx: number) => {
    if (examFinished) return;
    const q = questions[currentIndex];
    const already = answered[currentIndex];

    if (mode === 'exam' && already !== null) return;

    setSelectedOption(idx);

    if (idx === q.correct) {
      if (already !== 'correct') {
        const newAnswered = [...answered];
        newAnswered[currentIndex] = 'correct';
        setAnswered(newAnswered);
        
        const newMastered = [...mastered];
        newMastered[currentIndex] = true;
        setMastered(newMastered);
        
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
      }
    } else {
      const newAnswered = [...answered];
      newAnswered[currentIndex] = 'wrong';
      setAnswered(newAnswered);
      setStreak(0);
    }

    if (mode === 'exam') {
      const allAnswered = answered.every((a, i) => i === currentIndex ? a !== null : a !== null);
      if (allAnswered && currentIndex === questions.length - 1) {
        setExamFinished(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else if (mode === 'practice') {
      setCurrentIndex(0);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
    }
  };

  const resetGame = () => {
    setAnswered(Array(questions.length).fill(null));
    setMastered(Array(questions.length).fill(false));
    setStreak(0);
    setBestStreak(0);
    setExamFinished(false);
    setCurrentIndex(0);
    setSelectedOption(null);
  };

  const getHint = () => {
    const q = questions[currentIndex];
    if (q.tags.includes('Seguridad')) {
      return "Pista: ante la duda entre comodidad y seguridad, en empresa gana la seguridad y el cumplimiento.";
    } else if (q.tags.includes('RAG')) {
      return "Pista: pregúntate si el problema va de modelo o de documentos/fuentes actualizadas (ahí entra RAG).";
    } else if (q.tags.includes('Prompting')) {
      return "Pista: recuerda la plantilla de prompt profesional: rol, objetivo, contexto, restricciones, formato y calidad.";
    } else if (q.tags.includes('GPT')) {
      return "Pista: un GPT resuelve tareas acotadas; un proyecto implica procesos, integración y KPIs.";
    }
    return "Consejo: piensa como si tuvieras que defender tu decisión delante de dirección.";
  };

  const getSummaryMessage = () => {
    if (correctCount === 20) return "Brutal: 20/20. Dominas todos los matices clave del módulo.";
    if (correctCount >= 17) return "Muy bien: estás listo para el viernes, pero revisa las que has fallado para pulir detalles.";
    if (correctCount >= 14) return "Aprobado sólido. Para ir a nivel \"pro\", revisa con calma las preguntas en las que dudaste.";
    return "No pasa nada: usa ahora el modo práctica para entender cada explicación y subir tu nota.";
  };

  const currentQ = questions[currentIndex];
  const letters = ['a', 'b', 'c'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            🎯 Entrenamiento de evaluación - Módulo 2
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Juego didáctico para dominar las 20 preguntas clave del test
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'practice' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('practice');
              resetGame();
            }}
            className="text-xs"
          >
            Práctica
          </Button>
          <Button
            variant={mode === 'exam' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode('exam');
              resetGame();
            }}
            className="text-xs"
          >
            Examen
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="text-xs">
          Pregunta {currentIndex + 1}/20
        </Badge>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
          Aciertos: {correctCount}
        </Badge>
        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
          Fallos: {wrongCount}
        </Badge>
        <Badge variant="outline" className="text-xs">
          Racha: {streak}
        </Badge>
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="text-xs">
              Escenario & Pregunta
            </Badge>
            <span className="text-xs text-muted-foreground">
              Pregunta {currentQ.id} de {questions.length}
            </span>
          </div>

          <p className="text-sm font-medium">
            <span className="text-xs uppercase tracking-wider text-indigo-600 block mb-2">
              Pregunta {currentQ.id}
            </span>
            {currentQ.text}
          </p>

          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isCorrect = i === currentQ.correct;
              const isSelected = selectedOption === i;
              const isAnswered = answered[currentIndex] !== null;

              let optionClass = "w-full justify-start text-left h-auto py-3 px-4 border ";
              
              if (isAnswered) {
                if (isCorrect) {
                  optionClass += "border-green-500 bg-green-50 text-green-900";
                } else if (isSelected && !isCorrect) {
                  optionClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  optionClass += "border-gray-200 bg-gray-50 text-gray-500 opacity-60";
                }
              } else {
                optionClass += "border-gray-200 hover:bg-gray-50 hover:border-gray-300";
              }

              return (
                <Button
                  key={i}
                  variant="outline"
                  className={optionClass}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                >
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs mr-3 flex-shrink-0">
                    {letters[i]}
                  </span>
                  <span className="text-sm">{opt}</span>
                </Button>
              );
            })}
          </div>

          {/* Feedback */}
          {answered[currentIndex] !== null && (
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={answered[currentIndex] === 'correct' ? 'bg-green-600' : 'bg-red-600'}>
                    {answered[currentIndex] === 'correct' ? 'Bien razonado' : 'Ojo con este matiz'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-700">
                  {currentQ.explainCorrect}
                </p>
                <div className="text-xs text-slate-600 space-y-1">
                  {currentQ.explainWrong.map((txt, i) => (
                    <p key={i}>{txt}</p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  {currentQ.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-xs"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lightbulb className="h-3 w-3" />
              {getHint()}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleNext}
              className="text-xs"
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Progress Map */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-xs">
                Mapa de progreso
              </Badge>
              <span className="text-xs text-muted-foreground">
                {mode === 'practice' ? 'Modo práctica' : 'Modo examen'}
              </span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {questions.map((_, idx) => {
                let stepClass = "h-3 rounded-full border ";
                if (idx === currentIndex) {
                  stepClass += "border-blue-500 bg-blue-500";
                } else if (answered[idx] === 'correct') {
                  stepClass += "border-green-500 bg-green-500";
                } else if (answered[idx] === 'wrong') {
                  stepClass += "border-red-500 bg-red-500";
                } else {
                  stepClass += "border-gray-300 bg-gray-100";
                }
                return <div key={idx} className={stepClass} />;
              })}
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Correcta
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Incorrecta
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-300" /> Pendiente
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Stats Panel */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Respondidas:</span>
                <span className="font-medium">{answeredCount}/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dominadas:</span>
                <span className="font-medium">{masteredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Racha actual:</span>
                <span className="font-medium">{streak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mejor racha:</span>
                <span className="font-medium">{bestStreak}</span>
              </div>
            </div>

            {mode === 'exam' && examFinished && (
              <div className="pt-3 border-t space-y-2">
                <div className="text-xs font-medium">Resumen de examen</div>
                <p className="text-xs text-muted-foreground">{getSummaryMessage()}</p>
                <Badge className="bg-green-600">
                  Nota: {correctCount}/20
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetGame}
                  className="w-full text-xs mt-2"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Repetir examen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4 text-xs text-slate-600 space-y-2">
          <div className="font-medium text-slate-800">💡 Mini guía conceptual</div>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>RAG</strong> sirve para responder con tus documentos actualizados; <strong>fine-tuning</strong> ajusta el modelo para un estilo/tarea específicos.</li>
            <li>Un buen prompt profesional siempre deja claro objetivo, contexto, formato, restricciones y criterios de calidad.</li>
            <li>Un <strong>GPT</strong> es una herramienta acotada para tareas repetibles; un <strong>proyecto</strong> implica procesos, métricas, riesgos y varias áreas implicadas.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-muted-foreground text-center py-2 border-t">
        Basado en el test oficial de evaluación del Módulo 2 (20 preguntas). Entrena tantas veces como quieras antes del viernes.
      </div>
    </div>
  );
}
