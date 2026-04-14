# 📘 SKILL PRINCIPAL — Curso IA CEOE-FEDETO (Módulo 5 completo)

> **Documento de referencia para recuperar contexto del proyecto.** Si pierdes el historial, lee este archivo para ponerte al día.

---

## 🎯 QUÉ ES ESTE PROYECTO

Plataforma educativa interactiva para el **Curso de Inteligencia Artificial de 336 horas** organizado por **CEOE y FEDETO** en Toledo. Dirigida a jóvenes de 16-29 años.

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS
- **UI Components:** ShadCN UI
- **Backend:** Firebase (Auth, Firestore, Storage)
- **IA:** Genkit (Google) para herramientas AI
- **Repo:** `https://github.com/serdie/studio`
- **User:** Diego Gómez Marín (serdie)

---

## 📁 ESTRUCTURA CLAVE DEL PROYECTO

```
src/
├── app/
│   ├── dashboard/
│   │   ├── modules/[slug]/page.tsx   ← Página de cada módulo
│   │   ├── instructor/               ← Panel del profesor
│   │   └── mi-zona/                  ← Zona del alumno
│   ├── login/
│   └── register/
├── components/
│   ├── modules/
│   │   └── module-content.tsx        ← CONTENIDO PRINCIPAL de cada módulo (pestañas, CollapsibleSection, MovieCard)
│   ├── games/
│   │   └── games-section.tsx         ← SECCIÓN "Juegos y Enlaces" de cada módulo
│   ├── tools/
│   │   ├── cv-builder.tsx            ← CV Builder & Analyzer Pro (Módulo 4 y 5)
│   │   ├── ai-skill-builder.tsx      ← AI Skill Builder (Módulo 4)
│   │   └── ai-agents.tsx             ← Agentes de IA (Módulo 5)
│   └── layout/
│       ├── app-sidebar.tsx           ← Sidebar de navegación
│       └── app-header.tsx            ← Header con breadcrumb
├── lib/
│   └── data.ts                       ← DATOS DE TODOS LOS MÓDULOS (título, recursos, contenido HTML)
└── firebase/                         ← Configuración Firebase

public/materiales/
├── tema1/  ← Recursos Módulo 1
├── tema2/  ← Recursos Módulo 2
├── tema3/  ← Recursos Módulo 3
├── tema4/  ← Recursos Módulo 4
└── tema5/  ← Recursos Módulo 5

docs/
├── module-1-objectives.json
├── module-2-objectives.json
├── module-3-objectives.json
└── module-4-objectives.json
```

---

## 📚 LOS 9 MÓDULOS DEL CURSO

| # | Slug | Título | Duración | Estado |
|---|------|--------|----------|--------|
| 1 | `introduccion-ia` | Introducción a la IA | 30h | ✅ Completo |
| 2 | `llms-generativa` | Modelos de Lenguaje (LLMs) | 60h | ✅ Completo |
| 3 | `avatares-virtuales` | Avatares Virtuales | 30h | ✅ Completo |
| 4 | `bots-asistentes` | Bots y Asistentes Virtuales | 42h | ✅ Completo |
| 5 | `low-code-no-code` | Low-Code e IA | 42h | ✅ Completo |
| 6 | `etica-regulacion` | Ética y Regulación | 12h | ⏳ Pendiente |
| 7 | `proyecto-final` | Proyecto Final | 90h | ⏳ Pendiente |
| 8 | `aplicaciones-funcionales` | Aplicaciones Funcionales | 12h | ⏳ Pendiente |
| 9 | `proyecto-final-2` | Proyecto Final (cont.) | 18h | ⏳ Pendiente |

---

## ✅ MÓDULO 4 — Bots y Asistentes Virtuales (COMPLETO)

### Recursos (`public/materiales/tema4/`)
- 7 archivos: PDFs, M4A, MP4, PNG

### Contenido (`src/lib/data.ts`)
- Secciones 4.1 a 4.5 con HTML completo
- Recursos actualizados en el array `resources`

### Juegos (`src/components/games/`)
1. `bot-vs-assistant-decision.tsx` — Bot vs Asistente
2. `bots-timeline-builder.tsx` — Timeline de bots
3. `intent-classifier.tsx` — Clasificador de intents
4. `flow-designer-challenge.tsx` — Diseño de flujos
5. `platform-selector-game.tsx` — Selector de plataformas
6. `multimodal-experience-builder.tsx` — Experiencia multimodal
7. `ethics-security-quiz.tsx` — Quiz de ética
8. `metrics-matcher-game.tsx` — Empareja métricas

### Prácticas (10 en `games-section.tsx`)
1. Brief Sanitas
2. KPIs Aena
3. Arquitectura Movistar
4. Backlog IKEA
5. Comparativa Telefónica
6. Intents SEUR
7. Flujo Correos Express
8. Excepciones IKEA
9. KB+RAG Telefónica
10. Dossier BBVA

### Herramientas especiales
- **CV Builder & Analyzer Pro** (`src/components/tools/cv-builder.tsx`) — Constructor de CV con IA, analizador, descarga PDF/Markdown, editor de diseño
- **AI Skill Builder** (`src/components/tools/ai-skill-builder.tsx`) — Crea habilidades para asistentes de IA con generación automática de reglas por IA
- **Business Model Canvas** (`src/components/games/business-model-canvas.tsx`) — Canvas interactivo con post-its arrastrables
- **Business Model DAFO** (`src/components/games/business-model-dafo.tsx`) — DAFO interactivo con post-its
- **Simulacro Examen** (`src/components/games/module4-exam-quiz.tsx`) — 10 preguntas tipo test

### Sección Vibe Coding (solo Módulo 4)
- Vibe Prompt Studio
- AI Skill Builder
- Tutorial de instalación de skills en Cursor, Copilot, Ollama, Aider, Antigravity, Qwen

### Deberes de Fin de Semana (en `module-content.tsx`)
- Wall-E, TAU, Fringe, iBoy, Sin Piedad/Mercy (2026), Gladiator II

### Enlaces externos (en `games-section.tsx`)
- Dialogflow, Bot Framework, Watson, Rasa, Intercom, Drift, Zendesk, etc.

---

## ✅ MÓDULO 5 — Low-Code e IA (COMPLETO)

### Recursos (`public/materiales/tema5/`)
- 11 archivos: PDFs, PPTX, M4A, MP4, PNG

### Contenido (`src/lib/data.ts`)
- Secciones 5.1 a 5.3 con HTML completo
- Recursos actualizados en el array `resources`

### Juegos (`src/components/games/`)
1. `make-scenario-builder.tsx` — Construye flujos de automatización en MAKE (4 escenarios)
2. `platform-matcher-game.tsx` — Elige la plataforma No-Code correcta (8 preguntas)

### Simulacro Examen
- `module5-exam-quiz.tsx` — 10 preguntas tipo test sobre No-Code, MAKE e IA

### Enlaces Externos (8 en `games-section.tsx`)
- MAKE, Zapier, n8n, Bubble, Airtable, Webflow, OpenAI API, Google AI Studio

### Deberes de Fin de Semana (en `module-content.tsx`)
- M3GAN (2022), Minority Report (2002)

### Herramientas especiales
- **CV Builder & Analyzer Pro** — Compartido con Módulo 4
- **Agentes de IA** (`src/components/tools/ai-agents.tsx`) — 18 agentes organizados por tipo (Web, Desktop, Móvil)

### Pestañas del Módulo 5
1. Contenido
2. Recursos
3. Herramientas IA
4. Juegos y Enlaces
5. **Agentes IA** ← Nueva pestaña exclusiva del Módulo 5

---

## 🎨 PATRONES DE DISEÑO

### Colores y tema
- **Primario:** `#0F4A84` (azul corporativo)
- **Tipografías:** `Space Grotesk` (headlines), `Inter` (body)
- **Gradientes:** Se usan gradientes de 2-3 colores en cards y headers
- **Modo oscuro:** Soportado en `globals.css`

### Estructura de cada módulo en `module-content.tsx`
1. **CollapsibleSection** para "Deberes de Fin de Semana" (con MovieCard)
2. **Tabs** para: Contenido, Recursos, Herramientas IA, Juegos y Enlaces
3. **Pestañas condicionales** por módulo (ej: Vibe Coding solo en M4, Agentes IA solo en M5)

### Estructura de `games-section.tsx`
- Lista de juegos por módulo (`module4GamesList`, `module5GamesList`, etc.)
- Enlaces externos por módulo (`module4ExternalActivities`, `module5ExternalActivities`)
- Secciones desplegables para cada categoría
- **IMPORTANTE:** Cada módulo tiene su propia lista de juegos. NO usar `gamesList` (Módulo 1) para otros módulos.

### Componentes reutilizables
- `MovieCard` — Tarjeta de película (en `module-content.tsx`)
- `CollapsibleSection` — Sección desplegable (en `module-content.tsx`)
- `GameAccordionItem` — Item de juego desplegable (en `games-section.tsx`)

---

## ⚠️ REGLAS IMPORTANTES

1. **NO tocar módulos que no se indiquen explícitamente.** Si trabajas en el Módulo 5, NO toques el 1, 2, 3, 4, 6, 7, 8, 9.
2. **Cada módulo tiene su propia lista de juegos** en `games-section.tsx`. No mezclar.
3. **Los "Deberes de Fin de Semana" van en `module-content.tsx`**, NO en `games-section.tsx`.
4. **Los enlaces externos específicos de cada módulo** van en arrays separados (`module4ExternalActivities`, `module5ExternalActivities`, etc.)
5. **Commit messages:** Usar formato `feat(moduleX): descripción` o `fix(moduleX): descripción`
6. **No subir a GitHub** hasta que el usuario lo indique explícitamente.

---

## 📝 ARCHIVOS CLAVE A RECORDAR

| Archivo | Qué contiene |
|---------|-------------|
| `src/lib/data.ts` | TODOS los datos de los 9 módulos (título, slug, recursos, contenido HTML) |
| `src/components/modules/module-content.tsx` | Layout de pestañas + CollapsibleSections + MovieCards |
| `src/components/games/games-section.tsx` | Juegos, enlaces externos, secciones desplegables por módulo |
| `src/components/tools/cv-builder.tsx` | CV Builder & Analyzer Pro |
| `src/components/tools/ai-skill-builder.tsx` | AI Skill Builder |
| `src/components/tools/ai-agents.tsx` | Agentes de IA (Módulo 5) |

---

## 🚀 COMANDOS ÚTILES

```bash
npm run dev          # Servidor de desarrollo (puerto 9002)
npm run build        # Build de producción
npm run lint         # Linting
npx tsc --noEmit     # Verificar TypeScript
git status --short   # Ver cambios pendientes
git add . && git commit -m "..." && git push origin main  # Subir a GitHub
```

---

## 📊 ESTADO ACTUAL (última actualización)

- **Módulos 1-5:** ✅ Completos con contenido, juegos, prácticas, enlaces y deberes
- **Módulos 6-9:** ⏳ Pendientes (solo definidos en `data.ts` con contenido básico)
- **Último commit:** Módulo 5 completo + Agentes IA + CV Builder compartido

---

*Documento creado para recuperación de contexto. Si algo no coincide con el código actual, priorizar siempre el código.*
