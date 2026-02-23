# Curso IA Toledo - CEOE & FEDETO

Este proyecto es la plataforma interactiva para el curso de Inteligencia Artificial (336 horas) organizado por CEOE y FEDETO para jóvenes de entre 16 y 29 años.

## Requisitos Previos

- **Node.js**: Asegúrate de tener instalada la versión 18 o superior.
- **Firebase Project**: Necesitas un proyecto en Firebase con Authentication y Firestore habilitados.

## Instalación Local

1. **Descarga y Extrae**: Descarga el proyecto desde Firebase Studio y extrae el contenido en una carpeta.
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Configuración de Variables de Entorno**:
   - Crea un archivo `.env.local` en la raíz del proyecto.
   - Añade tus credenciales de Firebase y la API Key de Google Generative AI (Genkit):
     ```env
     GOOGLE_GENAI_API_KEY=tu_api_key_aqui
     ```
4. **Configuración de Firebase**:
   - Asegúrate de que los valores en `src/firebase/config.ts` coincidan con los de tu consola de Firebase.

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique la consola).

## Estructura del Proyecto

- `src/app`: Rutas y páginas de la aplicación (Next.js App Router).
- `src/components`: Componentes de UI reutilizables (ShadCN).
- `src/ai`: Flujos de Genkit para las herramientas de IA.
- `src/firebase`: Configuración y hooks de Firebase.
- `src/lib`: Datos estáticos del curso y utilidades.

## Créditos

Creado por **Diego Gómez Marín** para el curso de IA de Toledo.
Impulsado por **CEOE** y **FEDETO**.
