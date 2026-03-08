# PROPUESTA DE CONTENIDO - MÓDULO 2: Modelos de Lenguaje (LLMs)

## 📋 RESUMEN EJECUTIVO

Esta propuesta detalla el contenido necesario para el **Módulo 2: Modelos de Lenguaje (LLMs) e IA Generativa**, siguiendo la misma estructura que el Módulo 1 pero adaptada al contenido específico de este módulo.

**Duración:** 60 horas (6 horas/día durante 2 semanas = 12 días lectivos)
**Destinatarios:** Alumnos que comienzan el módulo mañana
**Objetivo:** Proporcionar contenido completo, interactivo y práctico para toda la duración del módulo

---

## 📁 1. ARCHIVOS PARA SUBIR A RECURSOS DEL MÓDULO 2

### 1.1 Desde `temas/tema2/` → `/public/materiales/tema2/`

Los siguientes archivos deben copiarse a la carpeta pública de materiales:

| Archivo Original | Destino | Tipo | Para Alumnos |
|-----------------|---------|------|--------------|
| `Enterprise_AI_Manual.pdf` | `/materiales/tema2/Enterprise_AI_Manual.pdf` | PDF Manual | ✅ SÍ |
| `Enterprise_AI_Manual.pptx` | `/materiales/tema2/Enterprise_AI_Manual.pptx` | Presentación | ✅ SÍ |
| `Manual_de_IA__Casual_a_Pro.mp4` | `/materiales/tema2/Manual_de_IA__Casual_a_Pro.mp4` | Video | ✅ SÍ |
| `Manual_del_operador_profesional_de_IA.m4a` | `/materiales/tema2/Manual_del_operador_profesional_de_IA.m4a` | Audio | ✅ SÍ |
| `unnamed.png` | `/materiales/tema2/infografia-llms.png` | Imagen | ✅ SÍ |

### 1.2 Desde `temas/OneDrive_1_28-2-2026/onedrive_módulo2/` → `/public/materiales/tema2/`

| Archivo Original | Destino | Tipo | Para Alumnos | Para Profesor |
|-----------------|---------|------|--------------|---------------|
| `01_guia_modulo_2_v01.pdf` | `/materiales/tema2/01_guia_modulo_2_v01.pdf` | Guía | ✅ SÍ | ✅ SÍ |
| `02_guia_practicas_modulo_2_v01.pdf` | `/materiales/tema2/02_guia_practicas_modulo_2_v01.pdf` | Prácticas | ✅ SÍ | ✅ SÍ |
| `03_recursos_2_v01.pdf` | `/materiales/tema2/03_recursos_2_v01.pdf` | Recursos | ✅ SÍ | ✅ SÍ |
| `04_Fichas_2_v01.pdf` | `/materiales/tema2/04_Fichas_2_v01.pdf` | Fichas | ❌ NO | ✅ SÍ (profesor) |
| `05_ejercicios_2_v01.pdf` | `/materiales/tema2/05_ejercicios_2_v01.pdf` | Ejercicios | ✅ SÍ | ✅ SÍ |
| `0x_Evaluación_parcial_2_v20.docx` | `/materiales/tema2/0x_Evaluación_parcial_2_v20.docx` | Evaluación | ❌ NO | ✅ SÍ (profesor) |

---

## 🎯 2. ACTUALIZACIÓN DEL DATA.TS PARA MÓDULO 2

### 2.1 Recursos del Módulo 2

Actualizar el array `resources` en el módulo 2 de `data.ts`:

```typescript
resources: [
  { title: 'Guía del Módulo 2 (PDF)', file: '/materiales/tema2/01_guia_modulo_2_v01.pdf' },
  { title: 'Guía de Prácticas Módulo 2 (PDF)', file: '/materiales/tema2/02_guia_practicas_modulo_2_v01.pdf' },
  { title: 'Recursos Adicionales (PDF)', file: '/materiales/tema2/03_recursos_2_v01.pdf' },
  { title: 'Ejercicios Módulo 2 (PDF)', file: '/materiales/tema2/05_ejercicios_2_v01.pdf' },
  { title: 'Enterprise AI Manual (PDF)', file: '/materiales/tema2/Enterprise_AI_Manual.pdf' },
  { title: 'Presentación Enterprise AI (PPTX)', file: '/materiales/tema2/Enterprise_AI_Manual.pptx' },
  { title: 'Video: De Casual a Pro (MP4)', file: '/materiales/tema2/Manual_de_IA__Casual_a_Pro.mp4' },
  { title: 'Audio: Operador Profesional de IA (M4A)', file: '/materiales/tema2/Manual_del_operador_profesional_de_IA.m4a' },
  { title: 'Infografía de LLMs (PNG)', file: '/materiales/tema2/infografia-llms.png' }
],
```

---

## 🎮 3. JUEGOS INTERACTIVOS PROPUESTOS (como en Módulo 1)

Basándome en los juegos existentes del Módulo 1, propongo crear los siguientes juegos específicos para el Módulo 2:

### 3.1 Juego 1: "Prompt Engineering Challenge" 🎯

**Objetivo pedagógico:** Enseñar técnicas de prompt engineering mediante práctica guiada

**Mecánica:**
- Los alumnos reciben un prompt "malo" o "vago"
- Deben seleccionar entre varias opciones la mejor mejora
- Sistema de puntos por cercanía al prompt óptimo

**Ejemplo de preguntas:**
```
Prompt original: "Escribe sobre marketing"

Opciones de mejora:
A) "Escribe un artículo sobre marketing digital" 
B) "Escribe un artículo de 800 palabras sobre estrategias de marketing digital 
    para pymes del sector retail en España, incluyendo ejemplos de éxito y 
    tendencias para 2025" ✓ CORRECTA
C) "Haz un texto de marketing que sea muy bueno"
D) "Escribe algo relacionado con el marketing moderno"
```

**Archivo propuesto:** `src/components/games/prompt-engineering-challenge.tsx`

---

### 3.2 Juego 2: "LLM Match" - Empareja el Modelo con su Caso de Uso 🧩

**Objetivo pedagógico:** Conocer las fortalezas de cada LLM del mercado

**Mecánica:**
- Tarjetas con modelos (GPT-4, Claude, Gemini, LLaMA, Mistral)
- Tarjetas con casos de uso
- Emparejar correctamente

**Ejemplo de emparejamientos:**
```
GPT-4 → Asistente virtual multimodal avanzado
Claude → Análisis de documentos legales extensos (200K tokens)
Gemini → Investigación con búsqueda en tiempo real
LLaMA → Aplicación local que requiere privacidad
Mistral → Proyecto europeo con cumplimiento GDPR estricto
```

**Archivo propuesto:** `src/components/games/llm-match-game.tsx`

---

### 3.3 Juego 3: "¿Alucinación o Realidad?" - Detecta la Información Falsa 🔍

**Objetivo pedagógico:** Desarrollar pensamiento crítico sobre las salidas de LLMs

**Mecánica:**
- Se muestra una afirmación que podría ser generada por un LLM
- El alumno debe decidir si es probablemente cierta o una alucinación
- Explicación posterior con pistas para detectar alucinaciones

**Ejemplo:**
```
Afirmación: "Según un estudio de Harvard de 2023, el 87% de las empresas 
que usan IA aumentan su productividad un 40% en el primer año."

¿Realidad o Alucinación?
→ ALUCINACIÓN (estadísticas demasiado específicas sin fuente verificable)

Pistas para detectar:
- Cita estudios inexistentes o difíciles de verificar
- Estadísticas demasiado precisas (87%, 40%)
- No proporciona enlace o referencia comprobable
```

**Archivo propuesto:** `src/components/games/hallucination-detector.tsx`

---

### 3.4 Juego 4: "Tokenizador" - Visualiza Cómo los LLMs Procesan Texto 🔤

**Objetivo pedagógico:** Entender el concepto de tokenización

**Mecánica interactiva:**
- El alumno escribe una frase
- El juego muestra cómo se tokenizaría
- Puntos de aprendizaje sobre tokens raros, palabras compuestas, etc.

**Ejemplo:**
```
Frase: "Prompt engineering es fascinante"

Tokenización mostrada:
["Prompt", " engineering", " es", " fascin", "ante"]
  1         2           3       4          5     = 5 tokens

💡 ¿Sabías que?
- "fascinante" se divide porque el modelo no tiene esa palabra completa
- Los espacios pueden ir al inicio o final del token
- Palabras raras o técnicas = más tokens
```

**Archivo propuesto:** `src/components/games/tokenizer-visualizer.tsx`

---

### 3.5 Juego 5: "Prompt Quiz" - Test de Técnicas de Prompt Engineering ❓

**Objetivo pedagógico:** Evaluar conocimiento de técnicas de prompt engineering

**Mecánica:** (similar al `ia-ml-dl-quiz.tsx` existente)

**Ejemplo de preguntas:**
```
Pregunta: ¿Qué técnica de prompt engineering se está usando aquí?

"Eres un abogado especializado en propiedad intelectual con 20 años de 
experiencia. Revisa este contrato y señala las cláusulas problemáticas..."

Opciones:
A) Few-Shot Prompting
B) Role Prompting ✓ CORRECTA
C) Chain of Thought
D) Tree of Thoughts

Explicación: Se asigna un rol específico y experto al modelo para obtener 
respuestas más especializadas.
```

**Archivo propuesto:** `src/components/games/prompt-quiz.tsx`

---

### 3.6 Juego 6: "Cost Calculator" - Calculadora de Tokens y Costes 💰

**Objetivo pedagógico:** Entender los costes reales de usar APIs de LLMs

**Mecánica:**
- Calculadora interactiva donde el alumno introduce:
  - Tokens de entrada (prompt)
  - Tokens de salida (respuesta estimada)
  - Modelo seleccionado
- Resultado: Coste estimado en USD/EUR

**Modelos con precios reales:**
```
GPT-4 Turbo: $0.01/1K input, $0.03/1K output
GPT-4o: $0.005/1K input, $0.015/1K output
Claude 3.5 Sonnet: $0.003/1K input, $0.015/1K output
Gemini Pro: $0.00025/1K input, $0.0005/1K output
```

**Archivo propuesto:** `src/components/games/token-cost-calculator.tsx`

---

## 📺 4. VIDEOS RECOMENDADOS (como en Módulo 1)

### 4.1 Videos Incrustados (YouTube/Vimeo)

**Video 1: "How GPT and LLMs Work" (3Blue1Brown o similar)**
- Duración: 15-20 minutos
- Tema: Explicación visual de transformers y atención
- Timestamp recomendado: Desde el minuto 2:30 (evitar intro larga)
- URL sugerida: Buscar en YouTube "3blue1brown transformer" o "statquest transformer"

**Video 2: "Prompt Engineering Guide" (Andrew Ng / DeepLearning.AI)**
- Duración: 25 minutos
- Tema: Técnicas fundamentales de prompt engineering
- URL sugerida: DeepLearning.AI short courses

**Video 3: "LLM Applications in Business" (casos reales)**
- Duración: 18 minutos
- Tema: Ejemplos empresariales de uso de LLMs
- URL sugerida: Buscar casos de JPMorgan COIN, Netflix, etc.

### 4.2 Videos para Subir (producidos o curados)

| Título | Duración | Tema | Formato |
|--------|----------|------|---------|
| "Introducción a los LLMs" | 12 min | Qué son y cómo funcionan | MP4 |
| "Prompt Engineering Básico" | 15 min | Técnicas esenciales | MP4 |
| "Prompt Engineering Avanzado" | 20 min | Chain of Thought, Tree of Thoughts | MP4 |
| "Comparativa GPT-4 vs Claude vs Gemini" | 18 min | Fortalezas y debilidades | MP4 |
| "Casos de Éxito Empresarial con LLMs" | 22 min | Ejemplos reales | MP4 |
| "Ética y Riesgos de los LLMs" | 16 min | Alucinaciones, sesgos, privacidad | MP4 |

---

## 📚 5. GUÍA DEL PROFESOR - 12 DÍAS DE CLASE (6 horas/día)

### DÍA 1: Introducción a los LLMs e IA Generativa

**Horario:**
- **09:00-10:30** - Teoría: ¿Qué es un LLM? Historia y evolución
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: ChatGPT, Claude, Gemini en vivo
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica guiada: Primeros prompts

**Actividades:**
- Presentación del módulo
- Juego: "Tokenizador" (15 min)
- Discusión: Expectativas vs realidad de los LLMs

**Material:** 
- Diapositivas: Enterprise_AI_Manual.pptx (slides 1-20)
- Video: "Introducción a los LLMs" (12 min)

---

### DÍA 2: Arquitectura y Funcionamiento Técnico

**Horario:**
- **09:00-10:30** - Teoría: Transformers, atención, embeddings
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Visualización interactiva de tokenización
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Laboratorio: Experimentos con tokens

**Actividades:**
- Juego: "Tokenizador" (30 min)
- Ejercicio: Calcular tokens de prompts reales
- Quiz rápido: Conceptos técnicos (10 preguntas)

**Material:**
- Enterprise_AI_Manual.pdf (capítulos 1-3)
- Herramienta: Tokenizador visual interactivo

---

### DÍA 3: Modelos Principales del Mercado

**Horario:**
- **09:00-10:30** - Teoría: GPT-4, Claude, Gemini, LLaMA, Mistral
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo comparativa en vivo
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Crear cuentas y probar cada modelo

**Actividades:**
- Juego: "LLM Match" (20 min)
- Tabla comparativa: Cada alumno crea la suya
- Discusión: ¿Cuál usar para cada caso?

**Material:**
- Video: "Comparativa GPT-4 vs Claude vs Gemini" (18 min)
- 03_recursos_2_v01.pdf (lista de modelos y acceso)

---

### DÍA 4: Fundamentos de Prompt Engineering

**Horario:**
- **09:00-10:30** - Teoría: Técnicas esenciales de prompting
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Práctica guiada: Prompts básicos
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Laboratorio: Iteración y mejora de prompts

**Actividades:**
- Juego: "Prompt Engineering Challenge" (30 min)
- Ejercicio: Transformar 10 prompts vagos en específicos
- Peer review: Intercambiar y evaluar prompts

**Material:**
- 02_guia_practicas_modulo_2_v01.pdf (ejercicios 1-5)
- Plantilla: "Anatomía de un buen prompt"

---

### DÍA 5: Técnicas Avanzadas de Prompt Engineering

**Horario:**
- **09:00-10:30** - Teoría: Few-Shot, Chain of Thought, Role Prompting
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Antes/después de técnicas avanzadas
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Casos complejos empresariales

**Actividades:**
- Juego: "Prompt Quiz" (25 min)
- Ejercicio: Resolver 5 casos con técnicas diferentes
- Competición: Mejor prompt para caso dado

**Material:**
- Video: "Prompt Engineering Avanzado" (20 min)
- Enterprise_AI_Manual.pdf (capítulos 4-6)

---

### DÍA 6: Casos de Uso Empresariales (Parte 1)

**Horario:**
- **09:00-10:30** - Teoría: Análisis de documentos y extracción
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Análisis de informe financiero
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Extraer insights de documentos

**Actividades:**
- Ejercicio: Analizar 3 tipos de documentos (PDF, email, informe)
- Juego: "¿Alucinación o Realidad?" (20 min)
- Presentación: Resultados del análisis

**Material:**
- 05_ejercicios_2_v01.pdf (ejercicios de análisis)
- Documentos de ejemplo para analizar

---

### DÍA 7: Casos de Uso Empresariales (Parte 2)

**Horario:**
- **09:00-10:30** - Teoría: Generación de contenido y marketing
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Crear campaña de marketing completa
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Crear contenido multi-canál

**Actividades:**
- Ejercicio: Crear hilo Twitter + blog post + email
- Revisión por pares: Calidad y coherencia
- Discusión: Ética en generación de contenido

**Material:**
- Video: "Casos de Éxito Empresarial con LLMs" (22 min)
- Plantillas: Brief de marketing, calendario editorial

---

### DÍA 8: Automatización y Flujos de Trabajo

**Horario:**
- **09:00-10:30** - Teoría: APIs, function calling, automatización
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Conectar LLM con herramientas externas
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Laboratorio: Crear flujo automatizado simple

**Actividades:**
- Juego: "Cost Calculator" (20 min)
- Ejercicio: Diseñar automatización para tarea repetitiva
- Presentación: Flujos creados por alumnos

**Material:**
- 02_guia_practicas_modulo_2_v01.pdf (sección automatización)
- Documentación: APIs de OpenAI, Anthropic, Google

---

### DÍA 9: Ética, Riesgos y Limitaciones

**Horario:**
- **09:00-10:30** - Teoría: Alucinaciones, sesgos, privacidad
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Debate: Casos reales de problemas éticos
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Taller: Mitigación de riesgos

**Actividades:**
- Juego: "¿Alucinación o Realidad?" (30 min)
- Debate estructurado: "¿Deberíamos regular los LLMs?"
- Ejercicio: Crear política de uso responsable

**Material:**
- Video: "Ética y Riesgos de los LLMs" (16 min)
- Enterprise_AI_Manual.pdf (capítulo de ética)
- 04_Fichas_2_v01.pdf (fichas de riesgos - solo profesor)

---

### DÍA 10: Proyecto Práctico (Día de Trabajo Autónomo)

**Horario:**
- **09:00-10:30** - Briefing: Enunciado del proyecto
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Trabajo en proyecto (profesor disponible)
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Trabajo en proyecto + checkpoint

**Actividades:**
- Proyecto: Crear solución completa con LLM para caso real
- Opciones: Análisis documental, chatbot, generación de contenido, etc.
- Entrega: Documento + demo funcional

**Material:**
- 05_ejercicios_2_v01.pdf (proyecto final)
- Rúbrica de evaluación

---

### DÍA 11: Presentación de Proyectos (Parte 1)

**Horario:**
- **09:00-10:30** - Presentaciones: Grupo 1 y 2
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Presentaciones: Grupo 3 y 4
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Feedback y evaluación entre pares

**Actividades:**
- Presentaciones de 20 min + 10 min preguntas
- Evaluación por rúbrica
- Votación: Mejor proyecto

---

### DÍA 12: Presentación de Proyectos (Parte 2) + Evaluación

**Horario:**
- **09:00-10:30** - Presentaciones: Grupo 5 y 6
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Evaluación parcial del módulo
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Cierre: Conclusiones y siguiente módulo

**Actividades:**
- Presentaciones restantes
- Evaluación parcial (0x_Evaluación_parcial_2_v20.docx)
- Encuesta de satisfacción del módulo
- Preparación transición al Módulo 3

---

## 📊 6. OBJETIVOS DE APRENDIZAJE PARA MÓDULO 2

Crear archivo `docs/module-2-objectives.json`:

```json
{
  "module": 2,
  "title": "Módulo 2: Modelos de Lenguaje (LLMs) e IA Generativa",
  "total_hours": 60,
  "objectives": [
    {
      "section": "2.1. Introducción a los LLMs e IA Generativa",
      "items": [
        "Explicar qué es un LLM y cómo funciona a nivel conceptual.",
        "Diferenciar entre IA tradicional, Machine Learning, Deep Learning y LLMs.",
        "Identificar las capacidades y limitaciones actuales de los LLMs.",
        "Reconocer los principales tipos de IA Generativa (texto, imagen, audio, video, código).",
        "Comprender el concepto de tokenización y su impacto en costes.",
        "Evaluar críticamente las expectativas vs realidad de los LLMs."
      ]
    },
    {
      "section": "2.2. Modelos Principales del Mercado",
      "items": [
        "Comparar GPT-4, Claude, Gemini, LLaMA y Mistral en fortalezas y debilidades.",
        "Seleccionar el modelo adecuado para cada caso de uso empresarial.",
        "Configurar acceso a las principales plataformas de LLMs.",
        "Calcular costes estimados de uso de APIs según modelo y volumen.",
        "Identificar modelos especializados por sector (código, legal, medicina).",
        "Evaluar criterios de privacidad y cumplimiento normativo."
      ]
    },
    {
      "section": "2.3. Prompt Engineering Esencial",
      "items": [
        "Aplicar técnicas básicas: ser específico, proporcionar contexto, estructurar salida.",
        "Diseñar prompts efectivos usando ejemplos (Few-Shot Prompting).",
        "Implementar Chain of Thought para razonamiento complejo.",
        "Utilizar Role Prompting para obtener respuestas especializadas.",
        "Iterar y refinar prompts progresivamente.",
        "Evitar errores comunes en la formulación de prompts."
      ]
    },
    {
      "section": "2.4. Técnicas Avanzadas de Prompt Engineering",
      "items": [
        "Aplicar Tree of Thoughts para explorar múltiples soluciones.",
        "Utilizar Self-Consistency para mejorar precisión.",
        "Diseñar flujos de Iterative Refinement.",
        "Crear prompts para análisis de documentos complejos.",
        "Generar contenido multi-formato y multi-canál.",
        "Optimizar prompts para casos empresariales específicos."
      ]
    },
    {
      "section": "2.5. Casos de Uso Empresariales",
      "items": [
        "Analizar documentos y extraer información estructurada.",
        "Generar contenido de marketing y comunicación.",
        "Automatizar tareas repetitivas de procesamiento de texto.",
        "Crear asistentes virtuales y chatbots básicos.",
        "Implementar flujos de trabajo con LLMs integrados.",
        "Evaluar ROI de implementación de LLMs en procesos."
      ]
    },
    {
      "section": "2.6. Ética, Riesgos y Limitaciones",
      "items": [
        "Detectar y mitigar alucinaciones en salidas de LLMs.",
        "Identificar sesgos potenciales en respuestas generadas.",
        "Aplicar principios de uso responsable y ético.",
        "Comprender implicaciones de privacidad y protección de datos.",
        "Establecer políticas de uso de IA en la organización.",
        "Evaluar riesgos legales y reputacionales."
      ]
    }
  ]
}
```

---

## 🛠️ 7. IMPLEMENTACIÓN TÉCNICA NECESARIA

### 7.1 Archivos de Juegos a Crear

```
src/components/games/
├── prompt-engineering-challenge.tsx    (nuevo)
├── llm-match-game.tsx                  (nuevo)
├── hallucination-detector.tsx          (nuevo)
├── tokenizer-visualizer.tsx            (nuevo)
├── prompt-quiz.tsx                     (nuevo)
└── token-cost-calculator.tsx           (nuevo)
```

### 7.2 Actualización de `games-section.tsx`

Añadir la lista de juegos para el módulo 2:

```typescript
const module2GamesList: GameItem[] = [
  {
    id: 'prompt-engineering-challenge',
    title: 'Prompt Engineering Challenge',
    description: 'Mejora prompts vagos convirtiéndolos en específicos y efectivos',
    type: 'internal',
    category: 'juego',
    // component: <PromptEngineeringChallenge />,
  },
  {
    id: 'llm-match-game',
    title: 'LLM Match',
    description: 'Empareja cada modelo de lenguaje con su caso de uso ideal',
    type: 'internal',
    category: 'juego',
    // component: <LLMMatchGame />,
  },
  // ... resto de juegos
];
```

### 7.3 Actualización de `module-content.tsx`

Modificar la condición para mostrar juegos y videos también en módulo 2:

```typescript
// Actualmente solo muestra para módulo 1:
{module.slug === 'introduccion-ia' && (
  <TabsContent value="videos">...</TabsContent>
)}

// Cambiar a:
{(module.slug === 'introduccion-ia' || module.slug === 'llms-generativa') && (
  <TabsContent value="videos">...</TabsContent>
)}
```

---

## 📋 8. CHECKLIST DE TAREAS

### Prioridad 1 (Para mañana - inicio del módulo):

- [ ] Copiar archivos de `temas/tema2/` a `/public/materiales/tema2/`
- [ ] Copiar archivos de `onedrive_módulo2/` (solo los de alumnos) a `/public/materiales/tema2/`
- [ ] Actualizar `data.ts` con los recursos del módulo 2
- [ ] Crear `docs/module-2-objectives.json`
- [ ] Verificar que los PDFs son legibles desde la aplicación

### Prioridad 2 (Durante la primera semana):

- [ ] Crear juego "Prompt Quiz" (el más sencillo, similar al existente)
- [ ] Crear juego "Token Cost Calculator" (utilidad práctica)
- [ ] Actualizar `games-section.tsx` para incluir juegos del módulo 2
- [ ] Actualizar `module-content.tsx` para mostrar videos en módulo 2
- [ ] Seleccionar y enlazar videos de YouTube recomendados

### Prioridad 3 (Para completar el módulo):

- [ ] Crear juego "Prompt Engineering Challenge"
- [ ] Crear juego "LLM Match"
- [ ] Crear juego "Hallucination Detector"
- [ ] Crear juego "Tokenizer Visualizer"
- [ ] Producir/subir videos propios si es necesario
- [ ] Crear infografía específica de LLMs (similar a la del módulo 1)

---

## 💡 9. RECOMENDACIONES ADICIONALES

### 9.1 Para el Profesor

1. **Documentos exclusivos para profesor** (`04_Fichas_2_v01.pdf` y `0x_Evaluación_parcial_2_v20.docx`):
   - Guardar en carpeta separada no accesible a alumnos
   - Usar para preparar clases y evaluaciones
   - No subir al repositorio público

2. **Guía de ritmo**:
   - Días 1-3: Fundamentos técnicos
   - Días 4-7: Prompt engineering y casos de uso
   - Días 8-9: Automatización y ética
   - Días 10-12: Proyecto y evaluación

3. **Puntos de atención**:
   - Verificar que todos tienen acceso a las plataformas de LLMs
   - Alternar teoría (mañana) con práctica (tarde)
   - Usar juegos como "rompehielos" después de descansos

### 9.2 Para los Alumnos

1. **Recursos esenciales**:
   - Crear cuentas gratuitas en: ChatGPT, Claude, Gemini
   - Instalar extensiones útiles (ej: AIPRM para ChatGPT)
   - Seguir la guía de prácticas día a día

2. **Consejos de estudio**:
   - Practicar prompts diariamente (mínimo 30 min)
   - Guardar prompts exitosos en biblioteca personal
   - Experimentar con múltiples modelos

3. **Evaluación**:
   - Participación en juegos y actividades: 20%
   - Ejercicios prácticos diarios: 30%
   - Proyecto final: 40%
   - Test parcial: 10%

---

## 📞 10. SOPORTE Y MANTENIMIENTO

### Durante las 2 semanas del módulo:

1. **Revisión diaria**:
   - Verificar que los enlaces a recursos funcionan
   - Comprobar que los juegos cargan correctamente
   - Recoger feedback de alumnos sobre dificultades

2. **Ajustes en tiempo real**:
   - Si un juego es muy difícil/fácil, ajustar parámetros
   - Si un recurso no es claro, proporcionar explicación adicional
   - Si el ritmo es muy rápido/lento, redistribuir contenido

3. **Soporte técnico**:
   - Problemas de acceso a plataformas externas → Tener alternativas
   - Problemas con juegos interactivos → Versión en papel disponible
   - Problemas con videos → Transcripción o resumen escrito

---

## 📄 RESUMEN FINAL

### Contenido Mínimo para Empezar (Día 1):

✅ **Recursos en la aplicación:**
- [ ] 9 archivos PDF/PPTX/MP4/M4A en `/materiales/tema2/`
- [ ] Array `resources` actualizado en `data.ts`
- [ ] Archivo `module-2-objectives.json` en `docs/`

✅ **Contenido teórico:**
- [ ] Contenido HTML en `data.ts` para secciones 2.1 a 2.4
- [ ] Guía del profesor con horario de 12 días

✅ **Actividades:**
- [ ] Al menos 1 juego funcional (Prompt Quiz)
- [ ] 2-3 videos enlazados de YouTube
- [ ] Ejercicios prácticos definidos

### Contenido Ideal (Semana 1 completa):

✅ **Recursos adicionales:**
- [ ] Infografía de LLMs
- [ ] 3-4 juegos interactivos
- [ ] Videos propios subidos
- [ ] Plantillas descargables

✅ **Evaluación:**
- [ ] Test parcial preparado
- [ ] Rúbrica de proyecto final
- [ ] Sistema de seguimiento de progreso

---

**Documento creado:** 2026-03-08
**Próxima revisión:** Después del Día 1 de clase
**Responsable:** Equipo docente
