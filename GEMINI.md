# AI Learning Hub - Proyecto CEOE-FEDETO

## Descripción General
Esta aplicación es una plataforma de aprendizaje sobre Inteligencia Artificial diseñada para jóvenes (16-29 años). El sistema integra herramientas de IA generativa directamente en el flujo de aprendizaje, permitiendo a los usuarios resumir contenidos, realizar consultas sobre el temario y experimentar con la creación de avatares e imágenes.

## Arquitectura Técnica
- **Framework**: Next.js 15 (App Router, TypeScript).
- **Estilos**: Tailwind CSS + Shadcn UI.
- **Backend/Base de Datos**: Firebase (Auth, Firestore).
- **IA/Orquestación**: Genkit + Google Gemini (gemini-2.0-flash-exp).
- **Flujos de IA**: Definidos en `src/ai/flows` utilizando Genkit Flows.

## Estado Actual del Proyecto
- [x] Autenticación con Firebase.
- [x] Estructura de Dashboard y navegación por módulos.
- [x] Contenido de los 6 módulos cargado en `src/lib/data.ts`.
- [x] Integración de resúmenes asistidos por IA.
- [x] Chat de soporte sobre contenido del curso (QA).
- [x] Generación de imágenes e integración de avatares.
- [x] Implementación de "Fedito Chat" (asistente interactivo general).
- [x] Sistema dinámico de objetivos de aprendizaje desde JSON.

## Documentación de Temas
La carpeta `temas/` contiene las guías oficiales en PDF.
- `01_guia_modulo_1_v01.pdf`: Módulo 1 (30h). Objetivos extraídos en `docs/module-1-objectives.json`.

## Mejoras y Próximos Pasos (Propuestas)
1. **RAG para Documentación**: Implementar búsqueda semántica sobre los PDFs de la carpeta `temas` para mejorar las respuestas del asistente.
2. **Cuestionarios de Evaluación con IA**: Generar tests automáticos al finalizar cada módulo.
3. **Accesibilidad Audio (TTS)**: Generar versiones de audio de las lecciones utilizando ElevenLabs o Google TTS.
4. **Dashboard del Instructor**: Panel para ver el progreso de los estudiantes y sus interacciones con la IA.

## Guía para otras IAs
- Los flujos de Genkit están en `src/ai/flows`.
- El contenido de las lecciones es estático por ahora en `src/lib/data.ts`.
- Para añadir una nueva funcionalidad de IA, define un nuevo flow en `src/ai/flows`, regístralo si es necesario en un `route.ts` de la API y crea el componente de UI correspondiente en `src/components/modules`.
