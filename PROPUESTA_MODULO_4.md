# PROPUESTA DE CONTENIDO - MÓDULO 4: Bots y Asistentes Virtuales

## 📋 RESUMEN EJECUTIVO

Esta propuesta detalla el contenido necesario para el **Módulo 4: Bots y Asistentes Virtuales**, siguiendo la misma estructura que los módulos anteriores pero adaptada al contenido específico de este módulo.

**Duración:** 42 horas (6 horas/día durante 7 días = 7 días lectivos)
**Destinatarios:** Alumnos que comienzan el módulo
**Objetivo:** Proporcionar contenido completo, interactivo y práctico para toda la duración del módulo

---

## 📁 1. ARCHIVOS PARA SUBIR A RECURSOS DEL MÓDULO 4

### 1.1 Desde `temas/tema4/` → `/public/materiales/tema4/`

Los siguientes archivos deben copiarse a la carpeta pública de materiales:

| Archivo Original | Destino | Tipo | Para Alumnos |
|-----------------|---------|------|--------------|
| `02_enlaces_4_v01.pdf` | `/materiales/tema4/02_enlaces_4_v01.pdf` | Enlaces | ✅ SÍ |
| `Enterprise_AI_Blueprint.pdf` | `/materiales/tema4/Enterprise_AI_Blueprint.pdf` | PDF | ✅ SÍ |
| `Guía Estratégica_ Bots y Asistentes Virtuales en el Entorno Empresarial.pdf` | `/materiales/tema4/Guia_Estrategica_Bots_y_Asistentes.pdf` | Guía | ✅ SÍ |
| `La_ingeniería_tras_los_asistentes_virtuales_corporativos.m4a` | `/materiales/tema4/La_ingenieria_tras_asistentes_virtuales.m4a` | Audio | ✅ SÍ |
| `Bots_vs.mp4` | `/materiales/tema4/Bots_vs_Asistentes.mp4` | Video | ✅ SÍ |
| `unnamed (1).png` | `/materiales/tema4/infografia-bots-vs-asistentes.png` | Imagen | ✅ SÍ |
| `user-gen-media-assets.s3.amazonaws.com.png` | `/materiales/tema4/linea-tiempo-bots.png` | Imagen | ✅ SÍ |

---

## 🎯 2. ACTUALIZACIÓN DEL DATA.TS PARA MÓDULO 4

### 2.1 Recursos del Módulo 4

Actualizar el array `resources` en el módulo 4 de `data.ts`:

```typescript
resources: [
  { title: 'Enlaces y Recursos (PDF)', file: '/materiales/tema4/02_enlaces_4_v01.pdf' },
  { title: 'Enterprise AI Blueprint (PDF)', file: '/materiales/tema4/Enterprise_AI_Blueprint.pdf' },
  { title: 'Guía Estratégica: Bots y Asistentes (PDF)', file: '/materiales/tema4/Guia_Estrategica_Bots_y_Asistentes.pdf' },
  { title: 'Audio: La Ingeniería tras los Asistentes Virtuales (M4A)', file: '/materiales/tema4/La_ingenieria_tras_asistentes_virtuales.m4a' },
  { title: 'Vídeo: Bots vs Asistentes (MP4)', file: '/materiales/tema4/Bots_vs_Asistentes.mp4' },
  { title: 'Infografía: Bots vs Asistentes (PNG)', file: '/materiales/tema4/infografia-bots-vs-asistentes.png' },
  { title: 'Línea de Tiempo: Evolución de Bots (PNG)', file: '/materiales/tema4/linea-tiempo-bots.png' }
],
```

---

## 🎮 3. JUEGOS INTERACTIVOS PROPUESTOS

Basándome en los juegos existentes de los módulos anteriores, propongo crear los siguientes juegos específicos para el Módulo 4:

### 3.1 Juego 1: "Bot vs. Asistente Decision Game" 🤖

**Objetivo pedagógico:** Saber cuándo usar un bot basado en reglas vs un asistente con IA

**Mecánica:**
- Se presentan situaciones empresariales reales
- El alumno debe elegir: BOT (reglas) o ASISTENTE (IA)
- Feedback basado en el criterio de riesgo de la infografía

**Ejemplo de preguntas:**
```
Situación: "Consulta de vacaciones disponibles en el portal del empleado"
→ BOT ✓ (alto control, baja flexibilidad, proceso predecible)

Situación: "Cliente quiere recomendación personalizada de producto"
→ ASISTENTE ✓ (alta flexibilidad, requiere contexto, redacción natural)
```

**Archivo propuesto:** `src/components/games/bot-vs-assistant-decision.tsx`

---

### 3.2 Juego 2: "Timeline Builder" - Línea de Tiempo de Bots 📅

**Objetivo pedagógico:** Aprender la evolución histórica de bots y asistentes

**Mecánica:**
- Arrastrar hitos históricos a la línea de tiempo correcta
- ELIZA (1966), PARRY (1972), A.L.I.C.E (1995), SmarterChild (2001), Siri (2011), Alexa (2014), etc.

**Archivo propuesto:** `src/components/games/bots-timeline-builder.tsx`

---

### 3.3 Juego 3: "Intent Classifier" - Clasificador de Intents 🎯

**Objetivo pedagógico:** Entender cómo funciona la clasificación de intents en NLP

**Mecánica:**
- Se muestran frases de usuarios
- El alumno debe clasificarlas en el intent correcto
- Ejemplo: "¿Cuántas vacaciones me quedan?" → `consultar_vacaciones`

**Archivo propuesto:** `src/components/games/intent-classifier.tsx`

---

### 3.4 Juego 4: "Flow Designer Challenge" - Diseña Flujos Conversacionales 🗺️

**Objetivo pedagógico:** Diseñar flujos conversacionales efectivos

**Mecánica:**
- Se presenta un caso de uso (ej: reset de contraseña)
- El alumno debe ordenar los pasos del flujo correctamente
- Incluir manejo de errores y transferencia a humano

**Archivo propuesto:** `src/components/games/flow-designer-challenge.tsx`

---

### 3.5 Juego 5: "Platform Selector" - Selector de Plataformas 🛠️

**Objetivo pedagógico:** Conocer las principales plataformas de bots y sus casos de uso

**Mecánica:**
- Emparejar plataforma con caso de uso ideal
- Dialogflow, Bot Framework, Intercom, Drift, Rasa, Zendesk, etc.

**Archivo propuesto:** `src/components/games/platform-selector-game.tsx`

---

### 3.6 Juego 6: "Multimodal Experience Builder" 🎨

**Objetivo pedagógico:** Diseñar experiencias multimodales (avatar + chat + voz)

**Mecánica:**
- Constructor interactivo de experiencia multimodal
- Seleccionar: tipo de avatar, canal, tono, elementos visuales
- Validación de principios: redundancia, complementariedad, consistencia

**Archivo propuesto:** `src/components/games/multimodal-experience-builder.tsx`

---

### 3.7 Juego 7: "Ethics & Security Quiz" 🔒

**Objetivo pedagógico:** Aprender consideraciones éticas y de seguridad

**Mecánica:**
- Test tipo quiz con situaciones éticas
- Ejemplo: "¿Debería el bot revelar que es IA?" → SÍ (transparencia)
- Preguntas sobre GDPR, transparencia, sesgo, manipulación

**Archivo propuesto:** `src/components/games/ethics-security-quiz.tsx`

---

### 3.8 Juego 8: "Metrics Matcher" - Empareja Métricas 📊

**Objetivo pedagógico:** Conocer las métricas clave para bots internos vs externos

**Mecánica:**
- Emparejar métrica con tipo de asistente
- Internos: eNPS, reducción de tickets, tiempo ahorrado
- Externos: CSAT, resolución en primer contacto, conversión

**Archivo propuesto:** `src/components/games/metrics-matcher-game.tsx`

---

## 🔗 4. ENLACES EXTERNOS RECOMENDADOS

### 4.1 Plataformas de Bots y Asistentes

| Plataforma | Vendor | Caso de Uso |
|------------|--------|-------------|
| **Dialogflow** | Google | Asistentes multicanal con NLP avanzado |
| **Microsoft Bot Framework** | Microsoft | Empresas con Azure/Teams |
| **IBM Watson Assistant** | IBM | Grandes empresas, on-premise |
| **Rasa** | Open Source | Control total, sin licensing |
| **Intercom Fin** | Intercom | Ecommerce, customer support |
| **Drift** | Drift | Conversational marketing, ventas B2B |
| **Zendesk Answer Bot** | Zendesk | Soporte con base de conocimientos |
| **Landbot** | Landbot | No-code, marketing rápido |
| **Voiceflow** | Voiceflow | Diseño de asistentes de voz |
| **Botpress** | Botpress | Open source con interfaz visual |

---

## 🎬 5. VIDEOS RECOMENDADOS

### 5.1 Videos Incrustados (YouTube)

**Video 1: "Cómo funcionan los Chatbots"**
- Duración: 15-20 minutos
- Tema: Explicación técnica de NLP y NLU
- URL sugerida: Buscar en YouTube "how chatbots work NLP"

**Video 2: "Dialogflow Tutorial for Beginners"**
- Duración: 25 minutos
- Tema: Demo completa de la plataforma
- URL sugerida: Canal oficial de Dialogflow

**Video 3: "Diseño de Conversaciones para Chatbots"**
- Duración: 18 minutos
- Tema: Principios de diseño conversacional
- URL sugerida: Buscar "conversational design principles"

**Video 4: "Ética en IA Conversacional"**
- Duración: 16 minutos
- Tema: Consideraciones éticas y de privacidad
- URL sugerida: Buscar "AI ethics chatbots"

---

## 📚 6. GUÍA DEL PROFESOR - 7 DÍAS DE CLASE (6 horas/día)

### DÍA 1: Introducción a Bots y Asistentes Virtuales

**Horario:**
- **09:00-10:30** - Teoría: ¿Qué es un bot? Historia y evolución
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: ELIZA, A.L.I.C.E., chatbots modernos
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica guiada: Primeros conceptos

**Actividades:**
- Juego: "Timeline Builder" (30 min)
- Discusión: Expectativas vs realidad de los bots
- Introducción a la diferencia bot vs asistente

**Material:**
- Infografía: Bots vs Asistentes
- Video: Evolución de bots

---

### DÍA 2: Estrategia - Internos vs Externos

**Horario:**
- **09:00-10:30** - Teoría: Casos de uso internos y externos
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo comparativa en vivo
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Identificar casos de uso

**Actividades:**
- Juego: "Bot vs. Asistente Decision Game" (30 min)
- Ejercicio: Clasificar 20 casos reales
- Discusión: ¿Cuál usar para cada caso?

**Material:**
- Guía Estratégica: Bots y Asistentes
- Tabla comparativa: Interno vs Externo

---

### DÍA 3: Diseño Conversacional y NLP

**Horario:**
- **09:00-10:30** - Teoría: Intents, entidades, utterances
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Práctica: Clasificación de intents
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Laboratorio: Diseño de flujos

**Actividades:**
- Juego: "Intent Classifier" (30 min)
- Ejercicio: Crear 20 utterances por intent
- Peer review: Evaluar flujos de compañeros

**Material:**
- 02_enlaces_4_v01.pdf (sección de NLP)
- Plantilla: Diseño de intents

---

### DÍA 4: Plataformas y Herramientas

**Horario:**
- **09:00-10:30** - Teoría: Principales plataformas del mercado
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Dialogflow, Bot Framework, Rasa
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Configurar un bot básico

**Actividades:**
- Juego: "Platform Selector" (30 min)
- Ejercicio: Crear cuenta y explorar plataforma
- Presentación: Primeros bots creados

**Material:**
- Enterprise AI Blueprint
- Enlaces a plataformas (Dialogflow, etc.)

---

### DÍA 5: Experiencia Multimodal

**Horario:**
- **09:00-10:30** - Teoría: Avatar + chat + voz
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Demo: Experiencias multimodales
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Práctica: Diseñar experiencia multimodal

**Actividades:**
- Juego: "Multimodal Experience Builder" (30 min)
- Ejercicio: Diseñar experiencia completa
- Revisión por pares: Calidad y coherencia

**Material:**
- Video: Experiencias multimodales
- Ejemplos: Asistentes con avatar

---

### DÍA 6: Ética, Seguridad y Métricas

**Horario:**
- **09:00-10:30** - Teoría: Ética, GDPR, seguridad
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Debate: Casos reales de problemas éticos
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Taller: Métricas y KPIs

**Actividades:**
- Juego: "Ethics & Security Quiz" (30 min)
- Juego: "Metrics Matcher" (20 min)
- Debate estructurado: "¿Deberíamos regular los bots?"

**Material:**
- Video: Ética en IA Conversacional
- Guía: Métricas para bots

---

### DÍA 7: Proyecto Final y Evaluación

**Horario:**
- **09:00-10:30** - Briefing: Enunciado del proyecto
- **10:30-10:45** - ☕ Descanso
- **10:45-12:15** - Trabajo en proyecto (profesor disponible)
- **12:15-12:30** - ☕ Descanso
- **12:30-14:00** - Presentaciones + evaluación

**Actividades:**
- Proyecto: Diseñar bot completo para caso real
- Presentaciones de 15 min + 5 min preguntas
- Evaluación por rúbrica
- Cierre del módulo

**Material:**
- Rúbrica de evaluación
- Plantilla de proyecto final

---

## 📊 7. OBJETIVOS DE APRENDIZAJE PARA MÓDULO 4

Crear archivo `docs/module-4-objectives.json`:

```json
{
  "module": 4,
  "title": "Módulo 4: Bots y Asistentes Virtuales",
  "total_hours": 42,
  "objectives": [
    {
      "section": "4.1. Introducción y Contexto Actual",
      "items": [
        "Explicar la evolución histórica de bots y asistentes virtuales desde ELIZA hasta GPT-4.",
        "Diferenciar entre chatbots, voicebots, asistentes virtuales y agentes conversacionales.",
        "Clasificar bots por tecnología: basados en reglas, basados en IA e híbridos.",
        "Identificar sectores líderes en adopción de bots y casos de uso principales.",
        "Evaluar beneficios clave: disponibilidad, escalabilidad, consistencia, eficiencia.",
        "Reconocer desafíos actuales: expectativas, complejidad, integración, seguridad."
      ]
    },
    {
      "section": "4.2. Estrategia y Comparación: Internos vs. Externos",
      "items": [
        "Diferenciar asistentes internos (empleados) de externos (clientes) en objetivos y requisitos.",
        "Identificar casos de uso típicos para asistentes internos: IT, RRHH, onboarding, formación.",
        "Identificar casos de uso típicos para asistentes externos: atención al cliente, ventas, soporte.",
        "Seleccionar plataformas adecuadas para cada tipo (Microsoft Copilot, Intercom, Dialogflow, etc.).",
        "Definir métricas de éxito diferenciadas: eNPS vs CSAT, reducción de tickets vs conversión.",
        "Diseñar estrategia híbrida que comparta infraestructura y gobernanza."
      ]
    },
    {
      "section": "4.3. Proceso de Creación de un Asistente Virtual",
      "items": [
        "Aplicar fase de descubrimiento: identificar caso de uso, definir alcance, analizar datos.",
        "Diseñar conversacionalmente: personalidad, flujos, intents, entidades, manejo de errores.",
        "Seleccionar plataforma técnica: Dialogflow, Bot Framework, Watson, Rasa, Landbot.",
        "Configurar NLP: entrenar modelo, ajustar umbrales, definir entidades.",
        "Implementar testing: funcional, conversacional, user acceptance testing.",
        "Planificar despliegue gradual y operación con mejora continua."
      ]
    },
    {
      "section": "4.4. Avatares Virtuales y Experiencia Multimodal",
      "items": [
        "Definir experiencia multimodal y sus ventajas frente a interacción solo texto.",
        "Combinar avatares virtuales con chatbots para mayor engagement.",
        "Identificar tecnologías habilitadoras: Unity, Unreal Engine, D-ID, HeyGen.",
        "Aplicar principios de diseño multimodal: redundancia, complementariedad, consistencia.",
        "Evaluar consideraciones técnicas: latencia, ancho de banda, accesibilidad.",
        "Seleccionar plataformas integradas: Synthesia, HeyGen API, Soul Machines."
      ]
    },
    {
      "section": "4.5. Ética, Seguridad y Futuro de los Asistentes",
      "items": [
        "Aplicar principios éticos: transparencia, privacidad, equidad, no manipulación.",
        "Implementar medidas de seguridad: encriptación, autenticación, rate limiting.",
        "Comprender regulación emergente: EU AI Act, GDPR, legislaciones sectoriales.",
        "Identificar tendencias futuras: agentes autónomos, hiperpersonalización, multimodalidad.",
        "Diseñar con enfoque humano-centrado: aumentar capacidades, no reemplazar.",
        "Evaluar impacto social y laboral de la automatización conversacional."
      ]
    }
  ]
}
```

---

## 🛠️ 8. IMPLEMENTACIÓN TÉCNICA NECESARIA

### 8.1 Archivos de Juegos a Crear

```
src/components/games/
├── bot-vs-assistant-decision.tsx    (nuevo)
├── bots-timeline-builder.tsx         (nuevo)
├── intent-classifier.tsx             (nuevo)
├── flow-designer-challenge.tsx       (nuevo)
├── platform-selector-game.tsx        (nuevo)
├── multimodal-experience-builder.tsx (nuevo)
├── ethics-security-quiz.tsx          (nuevo)
└── metrics-matcher-game.tsx          (nuevo)
```

### 8.2 Actualización de `games-section.tsx`

Añadir la lista de juegos para el módulo 4:

```typescript
const module4GamesList: GameItem[] = [
  {
    id: 'bot-vs-assistant-decision',
    title: '🤖 Bot vs. Asistente Decision Game',
    description: 'Decide cuándo usar un bot basado en reglas vs un asistente con IA.',
    type: 'internal',
    category: 'juego',
    component: <BotVsAssistantDecision />,
  },
  // ... resto de juegos
];
```

### 8.3 Actualización de `module-content.tsx`

Añadir sección de videos recomendados para el módulo 4:

```typescript
{module.slug === 'bots-asistentes' && (
  <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
    <CardHeader>
      <CardTitle>🎬 Videos Recomendados - Bots y Asistentes</CardTitle>
    </CardHeader>
    <CardContent>
      {/* 4 videos de YouTube */}
    </CardContent>
  </Card>
)}
```

---

## 📋 9. CHECKLIST DE TAREAS

### Prioridad 1 (Para inicio del módulo):

- [ ] Copiar archivos de `temas/tema4/` a `/public/materiales/tema4/`
- [ ] Actualizar `data.ts` con los recursos del módulo 4
- [ ] Actualizar `data.ts` con el contenido HTML de las 5 secciones (4.1 - 4.5)
- [ ] Crear `docs/module-4-objectives.json`
- [ ] Verificar que los PDFs son legibles desde la aplicación

### Prioridad 2 (Durante la primera semana):

- [ ] Crear juego "Bot vs. Asistente Decision Game"
- [ ] Crear juego "Timeline Builder"
- [ ] Crear juego "Intent Classifier"
- [ ] Actualizar `games-section.tsx` para incluir juegos del módulo 4
- [ ] Actualizar `module-content.tsx` para mostrar videos en módulo 4
- [ ] Seleccionar y enlazar videos de YouTube recomendados

### Prioridad 3 (Para completar el módulo):

- [ ] Crear juego "Flow Designer Challenge"
- [ ] Crear juego "Platform Selector"
- [ ] Crear juego "Multimodal Experience Builder"
- [ ] Crear juego "Ethics & Security Quiz"
- [ ] Crear juego "Metrics Matcher"
- [ ] Añadir enlaces externos a plataformas de bots
- [ ] Producir/subir videos propios si es necesario

---

## 💡 10. RECOMENDACIONES ADICIONALES

### 10.1 Para el Profesor

1. **Documentos exclusivos para profesor**:
   - Guardar en carpeta separada no accesible a alumnos
   - Usar para preparar clases y evaluaciones
   - No subir al repositorio público

2. **Guía de ritmo**:
   - Días 1-2: Fundamentos y estrategia
   - Días 3-4: Diseño conversacional y plataformas
   - Días 5-6: Multimodalidad y ética
   - Día 7: Proyecto y evaluación

3. **Puntos de atención**:
   - Verificar que todos tienen acceso a las plataformas de bots
   - Alternar teoría (mañana) con práctica (tarde)
   - Usar juegos como "rompehielos" después de descansos

### 10.2 Para los Alumnos

1. **Recursos esenciales**:
   - Crear cuentas gratuitas en: Dialogflow, Bot Framework, etc.
   - Seguir la guía de prácticas día a día
   - Explorar las 10 plataformas recomendadas

2. **Consejos de estudio**:
   - Practicar diseño de flujos diariamente (mínimo 30 min)
   - Guardar intents y flujos en biblioteca personal
   - Experimentar con múltiples plataformas

3. **Evaluación**:
   - Participación en juegos y actividades: 20%
   - Ejercicios prácticos diarios: 30%
   - Proyecto final: 40%
   - Test parcial: 10%

---

## 📄 RESUMEN FINAL

### Contenido Mínimo para Empezar (Día 1):

✅ **Recursos en la aplicación:**
- [ ] 7 archivos en `/materiales/tema4/`
- [ ] Array `resources` actualizado en `data.ts`
- [ ] Archivo `module-4-objectives.json` en `docs/`

✅ **Contenido teórico:**
- [ ] Contenido HTML en `data.ts` para secciones 4.1 a 4.5
- [ ] Guía del profesor con horario de 7 días

✅ **Actividades:**
- [ ] Al menos 2 juegos funcionales (Timeline, Bot vs Assistant)
- [ ] 4 videos enlazados de YouTube
- [ ] Ejercicios prácticos definidos

### Contenido Ideal (Semana 1 completa):

✅ **Recursos adicionales:**
- [ ] Infografía de Bots vs Asistentes
- [ ] 8 juegos interactivos
- [ ] Videos propios subidos
- [ ] Plantillas descargables

✅ **Evaluación:**
- [ ] Test parcial preparado
- [ ] Rúbrica de proyecto final
- [ ] Sistema de seguimiento de progreso

---

**Documento creado:** 2026-03-29
**Próxima revisión:** Después del Día 1 de clase
**Responsable:** Diego Gómez Marín
