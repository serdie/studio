# PROPUESTA DE CONTENIDO - MÓDULO 3: Avatares Virtuales

## 📋 RESUMEN EJECUTIVO

Esta propuesta detalla el contenido necesario para el **Módulo 3: Avatares Virtuales y Producción de Vídeo con IA**, siguiendo la misma estructura que el Módulo 2 pero adaptada al contenido específico de este módulo.

**Duración:** 30 horas (6 horas/día durante 5 días = 5 días lectivos)
**Destinatarios:** Alumnos que comienzan el módulo
**Objetivo:** Proporcionar contenido completo, interactivo y práctico para toda la duración del módulo

---

## 📁 1. ARCHIVOS PARA SUBIR A RECURSOS DEL MÓDULO 3

### 1.1 Desde `temas/tema 3/` → `/public/materiales/tema3/`

Los siguientes archivos deben copiarse a la carpeta pública de materiales:

| Archivo Original | Destino | Tipo | Para Alumnos |
|-----------------|---------|------|--------------|
| `01_guía_módulo_3_v01.pdf` | `/materiales/tema3/01_guia_modulo_3_v01.pdf` | Guía | ✅ SÍ |
| `02_enlaces_3_v01.pdf` | `/materiales/tema3/02_enlaces_3_v01.pdf` | Enlaces | ✅ SÍ |
| `03_ejercicios_3.pdf` | `/materiales/tema3/03_ejercicios_3.pdf` | Ejercicios | ✅ SÍ |
| `04_fichas_3.pdf` | `/materiales/tema3/04_fichas_3.pdf` | Fichas | ❌ NO (solo profesor) |
| `0x_Evaluación_parcial_3.pdf` | `/materiales/tema3/0x_Evaluación_parcial_3.pdf` | Evaluación | ❌ NO (solo profesor) |

---

## 🎯 2. ACTUALIZACIÓN DEL DATA.TS PARA MÓDULO 3

### 2.1 Recursos del Módulo 3

Actualizar el array `resources` en el módulo 3 de `data.ts`:

```typescript
resources: [
  { title: 'Guía del Módulo 3 (PDF)', file: '/materiales/tema3/01_guia_modulo_3_v01.pdf' },
  { title: 'Enlaces y Recursos (PDF)', file: '/materiales/tema3/02_enlaces_3_v01.pdf' },
  { title: 'Ejercicios Módulo 3 (PDF)', file: '/materiales/tema3/03_ejercicios_3.pdf' }
],
```

---

## 🎮 3. JUEGOS INTERACTIVOS PROPUESTOS

Basándome en los juegos existentes del Módulo 1 y 2, propongo crear los siguientes juegos específicos para el Módulo 3:

### 3.1 Juego 1: "Avatar Case Match" - Casos de Uso de Avatares 🎭

**Objetivo pedagógico:** Identificar cuándo usar avatares virtuales y cuándo NO

**Mecánica:**
- Se presentan situaciones empresariales reales
- El alumno debe decidir: ¿Avatar SÍ o Avatar NO?
- Explicación posterior con criterios de uso apropiado

**Ejemplo de preguntas:**
```
Situación: "Vídeo de onboarding para nuevos empleados explicando políticas de RRHH"

¿Usar avatar virtual?
→ SÍ ✓

Razones:
- Contenido repetitivo que se usa muchas veces
- No requiere interacción emocional profunda
- Permite actualización fácil del contenido
- Ahorro de costes vs grabar con persona real

Contra-indicaciones:
- Ninguna crítica en este caso
```

```
Situación: "Comunicación de despido o noticia sensible a empleado"

¿Usar avatar virtual?
→ NO ✓

Razones:
- Requiere empatía humana genuina
- La sensibilidad emocional es prioritaria
- El avatar parecería insensible/inapropiado
```

**Archivo propuesto:** `src/components/games/avatar-case-match.tsx`

---

### 3.2 Juego 2: "HeyGen Pipeline Simulator" - Flujo de Producción 🎬

**Objetivo pedagógico:** Entender el pipeline completo de producción de vídeo con avatar

**Mecánica:**
- Juego de arrastrar y soltar en orden correcto
- Fases: Briefing → Guion → Voz → Avatar → Edición → QA → Publicación
- Cada fase tiene entregables específicos que hay que identificar

**Ejemplo de flujo:**
```
Orden correcto:
1. Briefing (objetivo, audiencia, mensaje clave)
2. Guion (texto completo, timing, pausas)
3. Storyboard (escenas, visuales, transiciones)
4. Voz/TTS (generar audio o seleccionar voz)
5. Avatar (seleccionar avatar, sincronizar labios)
6. Edición (añadir rótulos, música, B-roll)
7. QA (checklist de calidad)
8. Publicación (exportar, subir, medir)

Si el alumno pone una fase mal → Feedback explicativo
```

**Archivo propuesto:** `src/components/games/pipeline-simulator.tsx`

---

### 3.3 Juego 3: "Script Duration Calculator" - Calculadora de Duración de Guion ⏱️

**Objetivo pedagógico:** Aprender a calcular y ajustar la duración de un guion

**Mecánica:**
- Textarea donde el alumno pega su guion
- Calcula palabras y estima duración (150-160 palabras/min en español)
- Indica si está cerca de 30s, 60s, 90s, 120s
- Sugiere recortes o expansiones

**Ejemplo:**
```
Guion pegado: "Hola, bienvenidos a nuestra empresa. 
En este vídeo vamos a conocer los valores que nos definen..."

Resultado:
- Palabras: 145
- Duración estimada: 58 segundos
- Objetivo: 60 segundos
- Estado: ✅ Perfecto (margen: ±5 segundos)

Si fuera 90 palabras → "⚠️ Demasiado corto (36s). Añade 40-50 palabras más."
Si fuera 200 palabras → "⚠️ Demasiado largo (80s). Recorta 30-40 palabras."
```

**Archivo propuesto:** `src/components/games/script-duration-calculator.tsx`

---

### 3.4 Juego 4: "Localization Challenge" - Reto de Localización 🌍

**Objetivo pedagógico:** Entender diferencias entre traducción y localización

**Mecánica:**
- Se muestra un mensaje en español de España
- El alumno debe seleccionar la mejor versión localizada para México, Argentina, etc.
- Puntos por identificar adaptaciones culturales apropiadas

**Ejemplo:**
```
Mensaje original (España):
"Vale, vamos a echar un vistazo a las vacaciones de verano. 
Tenéis que pedir las vacaciones con antelación."

Localización para México:
A) "Vale, vamos a ver las vacaciones de verano..." ❌ (mantiene "vale")
B) "Bueno, vamos a revisar el periodo vacacional de verano. 
    Deben solicitar sus vacaciones con anticipación." ✓ CORRECTO
C) "Órale, vamos a checar las vacaciones..." ❌ (demasiado informal)

Explicación:
- "Vale" → "Bueno" (México no usa "vale")
- "Echar un vistazo" → "Revisar" (más profesional)
- "Tenéis" → "Deben" (ustedes vs vosotros)
- "Con antelación" → "Con anticipación" (variante regional)
```

**Archivo propuesto:** `src/components/games/localization-challenge.tsx`

---

### 3.5 Juego 5: "QA Checklist Game" - Control de Calidad de Vídeos ✅

**Objetivo pedagógico:** Aprender a revisar vídeos con avatar profesionalmente

**Mecánica:**
- Se muestra un vídeo simulado con errores intencionados
- El alumno debe identificar errores usando checklist interactivo
- Categorías: Audio, Lip-sync, Visuales, Subtítulos, Coherencia

**Ejemplo de errores a detectar:**
```
❌ Audio:
- Volumen demasiado bajo
- Ruido de fondo audible
- Pronunciación robótica

❌ Lip-sync:
- Desfase de 0.5s entre audio y labios
- Fonemas incorrectos en palabras clave

❌ Visuales:
- Texto demasiado pequeño para móvil
- Contraste insuficiente
- Avatar cortado en el encuadre

❌ Subtítulos:
- Errores ortográficos
- Demasiado largos (>42 caracteres por línea)
- Mal sincronizados

❌ Coherencia:
- Cambio de fondo entre escenas
- Tipografías inconsistentes
- Tono del mensaje variable
```

**Archivo propuesto:** `src/components/games/qa-checklist-game.tsx`

---

### 3.6 Juego 6: "Subtitle Editor" - Editor de Subtítulos Interactivo 📝

**Objetivo pedagógico:** Crear y corregir subtítulos siguiendo estándares

**Mecánica:**
- Editor simulado de subtítulos (formato SRT/WebVTT)
- El alumno debe corregir subtítulos con errores comunes
- Validación en tiempo real de reglas de subtitulado

**Reglas que enseña:**
```
✅ Longitud máxima: 42 caracteres por línea
✅ Máximo 2 líneas por subtítulo
✅ Duración mínima: 1 segundo en pantalla
✅ Duración máxima: 6 segundos
✅ Sincronía: ±0.2s del audio
✅ No cortar palabras a mitad
✅ Respetar signos de puntuación
```

**Ejemplo de ejercicio:**
```
Subtítulo con errores:
"Este es un subtítulo demasiado largo que tiene más de cuarenta y dos caracteres y debería dividirse"

Corrección esperada:
"Este es un subtítulo demasiado largo
que tiene más de cuarenta y dos caracteres"
"y debería dividirse en dos líneas"
```

**Archivo propuesto:** `src/components/games/subtitle-editor.tsx`

---

### 3.7 Juego 7: "TTS Voice Selector" - Selector de Voz TTS 🎙️

**Objetivo pedagógico:** Seleccionar la voz apropiada para cada caso de uso

**Mecánica:**
- Catálogo de voces TTS simuladas (ElevenLabs, Google, Amazon)
- El alumno debe emparejar voz con caso de uso
- Criterios: tono, edad, género, estilo, industria

**Ejemplo de emparejamientos:**
```
Caso: "Vídeo corporativo para banco tradicional"
→ Voz: Masculina, 40-50 años, tono serio y confiable

Caso: "Onboarding para startup tecnológica"
→ Voz: Femenina o masculina, 25-35 años, tono cercano y dinámico

Caso: "Formación en seguridad industrial"
→ Voz: Masculina o femenina, 35-50 años, tono authoritative pero claro

Caso: "Atención al cliente en retail"
→ Voz: Femenina o masculina, 25-40 años, tono amable y paciente
```

**Archivo propuesto:** `src/components/games/tts-voice-selector.tsx`

---

### 3.8 Juego 8: "Avatar Style Guide Creator" - Guía de Estilo Visual 🎨

**Objetivo pedagógico:** Crear guías de estilo visual coherentes

**Mecánica:**
- Constructor interactivo de guía de estilo
- El alumno selecciona: fondo, tipografía, colores, encuadre
- Validación de accesibilidad (contraste, legibilidad)

**Elementos que incluye:**
```
✅ Fondo:
- Color sólido vs gradiente vs imagen
- Contraste con avatar
- Coherencia con marca

✅ Tipografía:
- Familia tipográfica (sans-serif recomendado)
- Tamaño mínimo (16px para móvil)
- Contraste con fondo

✅ Colores:
- Paleta de 2-3 colores máximo
- Accesibilidad (WCAG AA mínimo)
- Coherencia con identidad corporativa

✅ Encuadre:
- Posición del avatar (centro, regla de tercios)
- Espacio para rótulos
- Margen de seguridad
```

**Archivo propuesto:** `src/components/games/avatar-style-guide.tsx`

---

## 📺 4. VIDEOS RECOMENDADOS

### 4.1 Videos Incrustados (YouTube/Vimeo)

**Video 1: "HeyGen Tutorial for Beginners"**
- Duración: 15-20 minutos
- Tema: Introducción completa a HeyGen
- URL sugerida: Buscar en YouTube "HeyGen tutorial beginners"

**Video 2: "ElevenLabs Text-to-Speech Guide"**
- Duración: 12-15 minutos
- Tema: Cómo usar ElevenLabs para voces profesionales
- URL sugerida: Canal oficial de ElevenLabs

**Video 3: "Avatar Best Practices for Business"**
- Duración: 18 minutos
- Tema: Casos de uso empresariales y mejores prácticas
- URL sugerida: Synthesia o D-ID canales oficiales

**Video 4: "Subtitling Best Practices"**
- Duración: 10 minutos
- Tema: Cómo crear subtítulos profesionales
- URL sugerida: Buscar "subtitling best practices Netflix"

### 4.2 Videos para Subir (producidos o curados)

| Título | Duración | Tema | Formato |
|--------|----------|------|---------|
| "Introducción a Avatares Virtuales" | 10 min | Qué son y tipos de avatares | MP4 |
| "Pipeline de Producción de Vídeo" | 12 min | Flujo completo guion→publicación | MP4 |
| "HeyGen Demo Guiada" | 20 min | Recorrido por interfaz y funciones | MP4 |
| "Localización y Versionado" | 15 min | Adaptación a mercados y canales | MP4 |
| "ElevenLabs y TTS Profesional" | 18 min | Voces neuronales y prosodia | MP4 |
| "QA y Control de Calidad" | 14 min | Checklist de revisión de vídeos | MP4 |

---

## 📚 5. GUÍA DEL PROFESOR - 5 DÍAS DE CLASE (6 horas/día)

### DÍA 1: Avatares + Pipeline y Roles (6 h)

**Objetivos del día:**
- Entender qué es un avatar virtual, tipos y usos en empresa
- Visualizar el pipeline completo
- Arrancar la Práctica 1 (MAPFRE)

**Horario:**
- **09:00-10:30** - Teoría: ¿Qué es un avatar virtual? Tipos y usos
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Actividad: Mapa de casos de uso (HTML/CSS)
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Pipeline y roles + inicio Práctica 1 (MAPFRE)

**Actividades:**
- Debate: "¿Dónde pondrías un avatar y dónde NO?"
- Juego: "Avatar Case Match" (20 min)
- Crear página HTML "Mapa de casos de uso"
- Juego: "Pipeline Simulator" (30 min)
- Inicio Práctica 1: Borrador de guion MAPFRE

**Material:**
- 01_guia_modulo_3_v01.pdf (secciones 3.1.1-3.1.2)
- Video: "Introducción a Avatares Virtuales" (10 min)

---

### DÍA 2: Guiones y Diseño Visual (6 h)

**Objetivos del día:**
- Escribir guiones claros y "locutables"
- Definir criterios visuales mínimos
- Terminar Práctica 1

**Horario:**
- **09:00-10:30** - Taller de guiones + calculadora de duración
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Guía visual de estilo en HTML/CSS
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Cerrar Práctica 1 + micro-presentaciones

**Actividades:**
- Juego: "Script Duration Calculator" (25 min)
- Ajustar guion MAPFRE a 60-90 segundos
- Crear "Guía visual del módulo" en HTML/CSS
- Juego: "Avatar Style Guide Creator" (30 min)
- Presentación de 3-4 storyboards
- Votación: ¿Qué vídeo te gustaría ver producido?

**Material:**
- 03_ejercicios_3.pdf (ejercicios de guion)
- Plantilla: "Anatomía de un guion para avatar"

---

### DÍA 3: HeyGen + Control de Calidad (6 h)

**Objetivos del día:**
- Producir el primer vídeo real con avatar en HeyGen
- Aprender a revisar calidad (QA)

**Horario:**
- **09:00-10:30** - Demo guiada de HeyGen
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Producción del primer vídeo (30-45s)
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Checklist de QA y versión 2

**Actividades:**
- Recorrido por interfaz de HeyGen
- Crear vídeo con avatar stock (guion recortado de MAPFRE)
- Página HTML: "Mi primer vídeo con avatar"
- Juego: "QA Checklist Game" (30 min)
- Revisión en parejas con checklist
- Generar v2 del vídeo aplicando mejoras

**Material:**
- Video: "HeyGen Demo Guiada" (20 min)
- 02_enlaces_3_v01.pdf (enlaces a HeyGen)
- Checklist de QA imprimible

---

### DÍA 4: Localización, Versiones y Subtítulos (6 h)

**Objetivos del día:**
- Diferenciar traducción de localización
- Crear y revisar subtítulos de calidad

**Horario:**
- **09:00-10:30** - Localización: interno vs cliente
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Arquitectura de versiones y naming
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Subtítulos: creación y prueba

**Actividades:**
- Juego: "Localization Challenge" (25 min)
- Crear web "Doble versión de guion" (interno/cliente)
- Establecer estructura de carpetas y versionado
- Juego: "Subtitle Editor" (35 min)
- Generar subtítulos SRT/VTT para vídeo del Día 3
- Probar subtítulos en web con `<track>`

**Material:**
- Video: "Localización y Versionado" (15 min)
- Guía panhispánica de lenguaje claro (enlace)
- W3C WebVTT specification (enlace)

---

### DÍA 5: Texto a Voz, Atención al Cliente y Proyecto Final (6 h)

**Objetivos del día:**
- Entender prosodia y cómo controlarla desde el texto
- Usar ElevenLabs u otra TTS
- Integrar todo en paquete final + test parcial

**Horario:**
- **09:00-10:30** - Texto a voz + ElevenLabs
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Proyecto final + Prácticas 2 y 3
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Test parcial + cierre

**Actividades:**
- Juego: "TTS Voice Selector" (20 min)
- Demo de ElevenLabs y parámetros de voz
- Actividad: Reescribir guion para 2 estilos (corporativo vs cercano)
- Trabajo en equipos: Entregar Práctica 2 (Iberdrola)
- Inicio Práctica 3 (SEAT/CUPRA): Localización
- Test parcial del módulo (10 preguntas)
- Cierre: Votación "Premio del público"

**Material:**
- Video: "ElevenLabs y TTS Profesional" (18 min)
- 0x_Evaluación_parcial_3.pdf (solo profesor)
- Rúbrica de evaluación del proyecto final

---

## 📊 6. OBJETIVOS DE APRENDIZAJE PARA MÓDULO 3

Crear archivo `docs/module-3-objectives.json`:

```json
{
  "module": 3,
  "title": "Módulo 3: Avatares Virtuales y Producción de Vídeo",
  "total_hours": 30,
  "objectives": [
    {
      "section": "3.1. Fundamentos y Generación de Avatares",
      "items": [
        "Definir qué es un avatar virtual y diferenciarlo de vídeo tradicional.",
        "Identificar tipos de avatares (stock, personalizado, foto-a-vídeo) y sus usos.",
        "Comprender el pipeline completo: guion → voz → avatar → edición → publicación.",
        "Escribir guiones claros, locutables y con timing adecuado.",
        "Aplicar criterios de diseño visual (fondo, encuadre, tipografía, accesibilidad).",
        "Producir un vídeo con avatar usando HeyGen o herramienta similar."
      ]
    },
    {
      "section": "3.2. Localización y Adaptación de Contenidos",
      "items": [
        "Diferenciar traducción de localización y adaptar mensajes.",
        "Crear versiones diferenciadas para público interno vs cliente.",
        "Implementar convención de nombres y estructura de versionado.",
        "Generar y revisar subtítulos siguiendo estándares (SRT/WebVTT).",
        "Adaptar contenido a múltiples canales (web, pantallas, formación).",
        "Aplicar criterios de localización cultural y lingüística."
      ]
    },
    {
      "section": "3.3. Texto a Voz y Voz + Avatar",
      "items": [
        "Entender prosodia, pausas y énfasis en voz sintética.",
        "Usar ElevenLabs u otra TTS para generar locuciones profesionales.",
        "Controlar parámetros de voz (estabilidad, expresividad).",
        "Sincronizar audio TTS con avatar para lip-sync natural.",
        "Integrar todo en un paquete final listo para empresa.",
        "Evaluar calidad con checklist de QA profesional."
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
├── avatar-case-match.tsx           (nuevo)
├── pipeline-simulator.tsx           (nuevo)
├── script-duration-calculator.tsx   (nuevo)
├── localization-challenge.tsx       (nuevo)
├── qa-checklist-game.tsx            (nuevo)
├── subtitle-editor.tsx              (nuevo)
├── tts-voice-selector.tsx           (nuevo)
└── avatar-style-guide.tsx           (nuevo)
```

### 7.2 Actualización de `games-section.tsx`

Añadir la lista de juegos para el módulo 3:

```typescript
const module3GamesList: GameItem[] = [
  {
    id: 'avatar-case-match',
    title: '🎭 Avatar Case Match',
    description: 'Decide cuándo usar avatares virtuales y cuándo no en situaciones empresariales reales.',
    type: 'internal',
    category: 'juego',
    icon: <UserRoundCog className="h-5 w-5 text-pink-400" />,
    component: <AvatarCaseMatch />,
  },
  {
    id: 'pipeline-simulator',
    title: '🎬 HeyGen Pipeline Simulator',
    description: 'Ordena las fases del pipeline de producción de vídeo con avatar.',
    type: 'internal',
    category: 'juego',
    icon: <Film className="h-5 w-5 text-red-400" />,
    component: <PipelineSimulator />,
  },
  {
    id: 'script-duration-calculator',
    title: '⏱️ Calculadora de Duración de Guion',
    description: 'Calcula palabras y estima duración de tu guion (150-160 palabras/min).',
    type: 'internal',
    category: 'juego',
    icon: <Clock className="h-5 w-5 text-blue-400" />,
    component: <ScriptDurationCalculator />,
  },
  {
    id: 'localization-challenge',
    title: '🌍 Reto de Localización',
    description: 'Adapta mensajes a diferentes mercados hispanohablantes.',
    type: 'internal',
    category: 'juego',
    icon: <Globe className="h-5 w-5 text-green-400" />,
    component: <LocalizationChallenge />,
  },
  {
    id: 'qa-checklist-game',
    title: '✅ QA Checklist Game',
    description: 'Detecta errores en vídeos con avatar usando checklist profesional.',
    type: 'internal',
    category: 'juego',
    icon: <CheckCircle className="h-5 w-5 text-amber-400" />,
    component: <QAChecklistGame />,
  },
  {
    id: 'subtitle-editor',
    title: '📝 Editor de Subtítulos',
    description: 'Crea y corrige subtítulos siguiendo estándares de subtitulado.',
    type: 'internal',
    category: 'juego',
    icon: <FileText className="h-5 w-5 text-purple-400" />,
    component: <SubtitleEditor />,
  },
  {
    id: 'tts-voice-selector',
    title: '🎙️ Selector de Voz TTS',
    description: 'Selecciona la voz apropiada para cada caso de uso empresarial.',
    type: 'internal',
    category: 'juego',
    icon: <Headphones className="h-5 w-5 text-cyan-400" />,
    component: <TTSVoiceSelector />,
  },
  {
    id: 'avatar-style-guide',
    title: '🎨 Guía de Estilo Visual',
    description: 'Crea guías de estilo coherentes para vídeos con avatar.',
    type: 'internal',
    category: 'juego',
    icon: <Palette className="h-5 w-5 text-pink-400" />,
    component: <AvatarStyleGuide />,
  },
];
```

### 7.3 Enlaces externos específicos para Módulo 3

```typescript
const module3ExternalActivities: GameItem[] = [
  {
    id: 'heygen',
    title: 'HeyGen - Avatares de Vídeo con IA',
    description: 'Plataforma líder para crear vídeos con avatares. +100 avatares, 40+ idiomas, lip-sync perfecto.',
    type: 'external',
    url: 'https://www.heygen.com',
    category: 'actividad',
    icon: <Film className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'synthesia',
    title: 'Synthesia - Plataforma de Avatares AI',
    description: 'Crea vídeos profesionales con avatares AI. +140 avatares, ideal para formación corporativa.',
    type: 'external',
    url: 'https://www.synthesia.io',
    category: 'actividad',
    icon: <UserRoundCog className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'elevenlabs',
    title: 'ElevenLabs - Texto a Voz con IA',
    description: 'Voces neuronales más naturales del mercado. Clonación de voz, 40+ idiomas, control emocional.',
    type: 'external',
    url: 'https://elevenlabs.io',
    category: 'actividad',
    icon: <Headphones className="h-5 w-5 text-cyan-400" />,
  },
  {
    id: 'd-id',
    title: 'D-ID - Animación de Fotos con IA',
    description: 'Anima fotos estáticas con sincronización labial. Ideal para avatares personalizados.',
    type: 'external',
    url: 'https://www.d-id.com',
    category: 'actividad',
    icon: <ImageIcon className="h-5 w-5 text-pink-400" />,
  },
  {
    id: 'colossyan',
    title: 'Colossyan - Avatares para Formación',
    description: 'Enfocado en e-learning y formación corporativa. Avatares conversacionales.',
    type: 'external',
    url: 'https://www.colossyan.com',
    category: 'actividad',
    icon: <BookOpen className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'rask-ai',
    title: 'Rask AI - Doblaje y Localización',
    description: 'Traduce y dobla vídeos manteniendo la voz original. 130+ idiomas.',
    type: 'external',
    url: 'https://www.rask.ai',
    category: 'actividad',
    icon: <Globe className="h-5 w-5 text-amber-400" />,
  },
  {
    id: 'murf-ai',
    title: 'Murf.ai - Estudio de Voz AI',
    description: '120+ voces profesionales. Editor de audio integrado, sincronización con vídeo.',
    type: 'external',
    url: 'https://murf.ai',
    category: 'actividad',
    icon: <Headphones className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: 'ready-player-me',
    title: 'Ready Player Me - Avatares 3D',
    description: 'Crea avatares 3D para múltiples plataformas. Ideal para metaverso y VR.',
    type: 'external',
    url: 'https://readyplayer.me',
    category: 'actividad',
    icon: <UserRoundCog className="h-5 w-5 text-emerald-400" />,
  },
];
```

### 7.4 Actualización de `module-content.tsx`

Modificar la condición para mostrar juegos y videos también en módulo 3:

```typescript
// Actualmente solo muestra para módulo 1 y 2:
{(module.slug === 'introduccion-ia' || module.slug === 'llms-generativa') && (
  <TabsContent value="videos">...</TabsContent>
)}

// Cambiar a:
{(module.slug === 'introduccion-ia' || module.slug === 'llms-generativa' || module.slug === 'avatares-virtuales') && (
  <TabsContent value="videos">...</TabsContent>
)}
```

---

## 📋 8. CHECKLIST DE TAREAS

### Prioridad 1 (Para inicio del módulo):

- [ ] Copiar archivos de `temas/tema 3/` a `/public/materiales/tema3/`
- [ ] Actualizar `data.ts` con los recursos del módulo 3
- [ ] Actualizar `data.ts` con el contenido HTML de las 5 secciones (3.1, 3.2, 3.3)
- [ ] Crear `docs/module-3-objectives.json`
- [ ] Verificar que los PDFs son legibles desde la aplicación

### Prioridad 2 (Durante la primera semana):

- [ ] Crear juego "Avatar Case Match" (el más sencillo)
- [ ] Crear juego "Script Duration Calculator" (utilidad práctica)
- [ ] Crear juego "QA Checklist Game" (esencial para el día 3)
- [ ] Actualizar `games-section.tsx` para incluir juegos del módulo 3
- [ ] Actualizar `module-content.tsx` para mostrar videos en módulo 3
- [ ] Seleccionar y enlazar videos de YouTube recomendados

### Prioridad 3 (Para completar el módulo):

- [ ] Crear juego "Pipeline Simulator"
- [ ] Crear juego "Localization Challenge"
- [ ] Crear juego "Subtitle Editor"
- [ ] Crear juego "TTS Voice Selector"
- [ ] Crear juego "Avatar Style Guide Creator"
- [ ] Añadir enlaces externos a HeyGen, ElevenLabs, Synthesia, etc.
- [ ] Producir/subir videos propios si es necesario

---

## 💡 9. RECOMENDACIONES ADICIONALES

### 9.1 Para el Profesor

1. **Documentos exclusivos para profesor** (`04_fichas_3.pdf` y `0x_Evaluación_parcial_3.pdf`):
   - Guardar en carpeta separada no accesible a alumnos
   - Usar para preparar clases y evaluaciones
   - No subir al repositorio público

2. **Guía de ritmo**:
   - Día 1: Fundamentos + inicio Práctica 1
   - Día 2: Guiones + diseño + cierre Práctica 1
   - Día 3: HeyGen + QA + primer vídeo real
   - Día 4: Localización + subtítulos
   - Día 5: TTS + proyecto final + test

3. **Puntos de atención**:
   - Verificar que todos tienen acceso a HeyGen (plan gratuito)
   - Alternar teoría (mañana) con práctica (tarde)
   - Usar juegos como "rompehielos" después de descansos
   - Las prácticas MAPFRE, Iberdrola, SEAT/CUPRA son acumulativas

### 9.2 Para los Alumnos

1. **Recursos esenciales**:
   - Crear cuenta gratuita en: HeyGen, ElevenLabs
   - Tener preparados los guiones de Práctica 1 antes del Día 3
   - Seguir la guía de prácticas día a día

2. **Consejos de estudio**:
   - Practicar con HeyGen diariamente (mínimo 30 min)
   - Guardar versiones de vídeos con naming consistente
   - Revisar checklist de QA antes de cada entrega

3. **Evaluación**:
   - Participación en juegos y actividades: 20%
   - Prácticas (MAPFRE, Iberdrola, SEAT/CUPRA): 40%
   - Proyecto final: 30%
   - Test parcial: 10%

---

## 📞 10. SOPORTE Y MANTENIMIENTO

### Durante los 5 días del módulo:

1. **Revisión diaria**:
   - Verificar que los enlaces a recursos funcionan
   - Comprobar que los juegos cargan correctamente
   - Recoger feedback de alumnos sobre dificultades

2. **Ajustes en tiempo real**:
   - Si HeyGen da problemas → tener alternativa (D-ID, Synthesia)
   - Si un juego es muy difícil/fácil → ajustar parámetros
   - Si el ritmo es muy rápido/lento → redistribuir contenido

3. **Soporte técnico**:
   - Problemas de acceso a plataformas externas → tener alternativas
   - Problemas con juegos interactivos → versión en papel disponible
   - Problemas con videos → transcripción o resumen escrito

---

## 📄 RESUMEN FINAL

### Contenido Mínimo para Empezar (Día 1):

✅ **Recursos en la aplicación:**
- [ ] 5 archivos PDF en `/materiales/tema3/`
- [ ] Array `resources` actualizado en `data.ts`
- [ ] Archivo `module-3-objectives.json` en `docs/`

✅ **Contenido teórico:**
- [ ] Contenido HTML en `data.ts` para secciones 3.1 a 3.3
- [ ] Guía del profesor con horario de 5 días

✅ **Actividades:**
- [ ] Al menos 2 juegos funcionales (Avatar Case Match, Script Duration Calculator)
- [ ] 2-3 videos enlazados de YouTube
- [ ] Prácticas definidas (MAPFRE, Iberdrola, SEAT/CUPRA)

### Contenido Ideal (Semana completa):

✅ **Recursos adicionales:**
- [ ] 8 juegos interactivos completos
- [ ] Videos propios subidos
- [ ] Enlaces externos a HeyGen, ElevenLabs, Synthesia, etc.
- [ ] Plantillas descargables (guiones, storyboards, checklists)

✅ **Evaluación:**
- [ ] Test parcial preparado
- [ ] Rúbrica de proyecto final
- [ ] Sistema de seguimiento de progreso

---

**Documento creado:** 2026-03-22
**Próxima revisión:** Después del Día 1 de clase
**Responsable:** Equipo docente
