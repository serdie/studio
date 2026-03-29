import type { LucideIcon } from 'lucide-react';
import {
  BookCopy,
  BrainCircuit,
  BotMessageSquare,
  Settings2,
  Cpu,
  Megaphone,
  ShieldCheck,
  Layers,
  Rocket
} from 'lucide-react';

export interface Resource {
  title: string;
  file: string;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  duration: string;
  description: string;
  longDescription: string;
  progress: number;
  icon: LucideIcon;
  resources: Resource[];
  content: string;
}

export const modules: Module[] = [
  {
    id: 1,
    slug: 'introduccion-ia',
    title: 'Módulo 1: Introducción a la IA',
    duration: '30 h',
    description: 'Impacto en el mundo empresarial y fundamentos básicos.',
    longDescription: 'Fundamentos de la IA, evolución, tendencias y estrategia empresarial. Incluye sesiones sobre optimización de procesos y debates socioeconómicos.',
    progress: 0,
    icon: BrainCircuit,
    resources: [
      { title: 'Guía del Módulo 1 (PDF)', file: '/materiales/tema1/01_guia_modulo_1_v01.pdf' },
      { title: 'AI Business Strategy and Impact (PDF)', file: '/materiales/tema1/AI_Business_Strategy_and_Impact.pdf' },
      { title: 'Manual de trinchera para la IA (Audio M4A)', file: '/materiales/tema1/Manual_de_trinchera_para_la_IA_empresarial.m4a' },
      { title: 'Infografía del Módulo 1 (Imagen PNG)', file: '/materiales/tema1/modulo1-infografía.png' },
      { title: 'Programa Superior del Curso (PDF)', file: '/materiales/tema1/Programa-Superior.pdf' },
      { title: 'Presentación del Programa (PPTX)', file: '/materiales/tema1/Programa-Superior.pptx' }
    ],
    content: `
      <h2>1.1. Fundamentos de la IA: Definición, historia, tipos de IA</h2>
      <h3>¿Qué es la Inteligencia Artificial?</h3>
      <p>La Inteligencia Artificial (IA) es la disciplina que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana. Estas tareas incluyen el razonamiento, el aprendizaje, la percepción, la comprensión del lenguaje natural y la resolución de problemas.</p>
      
      <h3>Historia de la IA</h3>
      <p><strong>1950-1956: Los inicios</strong> - Alan Turing publica "Computing Machinery and Intelligence" proponiendo el famoso Test de Turing. En 1956, John McCarthy acuña el término "Inteligencia Artificial" en la Conferencia de Dartmouth.</p>
      <p><strong>1956-1974: La edad de oro</strong> - Se desarrollan los primeros programas de IA como ELIZA (1966), el primer chatbot. Se crean las primeras redes neuronales (perceptrón de Rosenblatt, 1958).</p>
      <p><strong>1974-1980: El primer invierno de la IA</strong> - La falta de resultados prácticos y las limitaciones computacionales reducen la financiación.</p>
      <p><strong>1980-1987: El boom de los sistemas expertos</strong> - Las empresas adoptan sistemas expertos para la toma de decisiones.</p>
      <p><strong>1987-1993: El segundo invierno</strong> - Los sistemas expertos muestran limitaciones y la IA entra en declive nuevamente.</p>
      <p><strong>1993-2011: El renacimiento</strong> - IBM Deep Blue vence al campeón mundial de ajedrez (1997). Google utiliza IA para mejorar sus búsquedas.</p>
      <p><strong>2012-presente: La era del Deep Learning</strong> - AlexNet revoluciona la visión por computadora. GPT, transformers y modelos de lenguaje masivos cambian el panorama.</p>
      
      <h3>Tipos de IA</h3>
      <p><strong>IA Débil o Estrecha (ANI)</strong> - Diseñada para una tarea específica (Siri, Alexa, sistemas de recomendación).</p>
      <p><strong>IA General o Fuerte (AGI)</strong> - Hipotética IA con capacidades cognitivas humanas completas (aún no existe).</p>
      <p><strong>Superinteligencia Artificial (ASI)</strong> - IA que superaría ampliamente las capacidades humanas (concepto teórico).</p>
      <p><strong>IA Reactiva</strong> - Responde a estímulos sin memoria (Deep Blue).</p>
      <p><strong>IA con Memoria Limitada</strong> - Utiliza datos históricos para tomar decisiones (vehículos autónomos).</p>
      <p><strong>Teoría de la Mente</strong> - Capacidad de entender emociones y pensamientos ajenos (en desarrollo).</p>
      <p><strong>IA Autoconsciente</strong> - Conciencia de sí misma (teórica).</p>

      <hr/>

      <h2>1.2. Evolución y tendencias: Machine Learning, Deep Learning, PLN, Visión por Computadora, Robótica</h2>
      <h3>Machine Learning (Aprendizaje Automático)</h3>
      <p>El Machine Learning es un subconjunto de la IA que permite a los sistemas aprender y mejorar a partir de datos sin ser programados explícitamente.</p>
      <p><strong>Tipos de aprendizaje:</strong></p>
      <ul>
        <li><strong>Aprendizaje Supervisado:</strong> El modelo se entrena con datos etiquetados (clasificación, regresión).</li>
        <li><strong>Aprendizaje No Supervisado:</strong> El modelo encuentra patrones en datos sin etiquetar (clustering, reducción de dimensionalidad).</li>
        <li><strong>Aprendizaje por Refuerzo:</strong> El modelo aprende mediante recompensas y castigos (AlphaGo, robots).</li>
      </ul>
      
      <h3>Deep Learning (Aprendizaje Profundo)</h3>
      <p>El Deep Learning utiliza redes neuronales artificiales con múltiples capas intermedias ("ocultas") para modelar abstracciones complejas.</p>
      <p><strong>Arquitecturas principales:</strong></p>
      <ul>
        <li><strong>Redes Neuronales Convolucionales (CNN):</strong> Especializadas en procesamiento de imágenes.</li>
        <li><strong>Redes Neuronales Recurrentes (RNN):</strong> Diseñadas para datos secuenciales (texto, series temporales).</li>
        <li><strong>Transformers:</strong> Arquitectura basada en atención que revolucionó el PLN (GPT, BERT).</li>
        <li><strong>Redes Generativas Antagónicas (GAN):</strong> Generan contenido nuevo (imágenes, texto, audio).</li>
      </ul>
      
      <h3>Procesamiento del Lenguaje Natural (PLN)</h3>
      <p>El PLN permite a las máquinas entender, interpretar y generar lenguaje humano.</p>
      <p><strong>Aplicaciones:</strong> Traducción automática, análisis de sentimientos, chatbots, resumen automático, generación de texto.</p>
      <p><strong>Modelos destacados:</strong> GPT-4, Claude, Gemini, LLaMA, BERT.</p>
      
      <h3>Visión por Computadora</h3>
      <p>La visión por computadora permite a las máquinas "ver" e interpretar imágenes y videos.</p>
      <p><strong>Aplicaciones:</strong> Reconocimiento facial, vehículos autónomos, diagnóstico médico, control de calidad industrial, realidad aumentada.</p>
      
      <h3>Robótica con IA</h3>
      <p>La integración de IA en robótica permite crear máquinas autónomas capaces de aprender y adaptarse.</p>
      <p><strong>Aplicaciones:</strong> Robots industriales colaborativos, robots de servicio, drones autónomos, robots quirúrgicos.</p>

      <hr/>

      <h2>1.3. Impacto de la IA en la empresa: Optimización de procesos, toma de decisiones, personalización, nuevos modelos de negocio</h2>
      <h3>Optimización de Procesos</h3>
      <p>La IA permite automatizar tareas repetitivas, reducir errores y aumentar la eficiencia operativa.</p>
      <p><strong>Ejemplos:</strong> Automatización de facturación, procesamiento de pedidos, gestión de inventarios, atención al cliente mediante chatbots.</p>
      
      <h3>Toma de Decisiones</h3>
      <p>Los sistemas de IA analizan grandes volúmenes de datos para proporcionar insights accionables.</p>
      <p><strong>Aplicaciones:</strong> Predicción de demanda, análisis de riesgo crediticio, optimización de precios, detección de fraude.</p>
      
      <h3>Personalización</h3>
      <p>La IA permite ofrecer experiencias personalizadas a escala.</p>
      <p><strong>Ejemplos:</strong> Recomendaciones de productos (Amazon, Netflix), marketing personalizado, rutas de aprendizaje adaptativas.</p>
      
      <h3>Nuevos Modelos de Negocio</h3>
      <p>La IA está creando oportunidades para modelos de negocio innovadores.</p>
      <p><strong>Ejemplos:</strong> Plataformas bajo demanda (Uber), suscripciones personalizadas, mercados de datos, IA como servicio (AIaaS).</p>

      <hr/>

      <h2>1.4. Casos de éxito y fracaso: Ejemplos reales de aplicación de IA en diversos sectores</h2>
      <h3>Casos de Éxito</h3>
      <p><strong>Netflix:</strong> Sistema de recomendación que genera el 80% del contenido visualizado. Ahorro estimado de $1.000 millones anuales en retención de clientes.</p>
      <p><strong>Amazon:</strong> Optimización de logística con robots Kiva, predicción de demanda y envíos anticipados.</p>
      <p><strong>Google Health:</strong> Detección de retinopatía diabética con mayor precisión que oftalmólogos humanos.</p>
      <p><strong>JPMorgan Chase:</strong> COIN (Contract Intelligence) analiza documentos legales en segundos, ahorrando 360.000 horas de trabajo anual.</p>
      <p><strong>Tesla:</strong> Vehículos autónomos con más de 5 mil millones de millas de datos de conducción real.</p>
      <p><strong>Zara (Inditex):</strong> IA para predicción de tendencias y optimización de inventario en tiempo real.</p>
      
      <h3>Casos de Fracaso</h3>
      <p><strong>IBM Watson Health:</strong> Prometió revolucionar el diagnóstico médico pero fue vendido por fracaso comercial. Problemas: datos insuficientes, expectativas irreales.</p>
      <p><strong>Amazon Hiring AI:</strong> Sistema de contratación descartado por sesgo sexista. Aprendió de datos históricos que favorecían candidatos masculinos.</p>
      <p><strong>Microsoft Tay:</strong> Chatbot que tuvo que ser retirado en 24 horas tras aprender lenguaje ofensivo de usuarios de Twitter.</p>
      <p><strong>Google Flu Trends:</strong> Sobreestimó brotes de gripe por no considerar cambios en comportamiento de búsqueda.</p>
      
      <h3>Lecciones Aprendidas</h3>
      <ul>
        <li>La calidad de los datos es fundamental</li>
        <li>Las expectativas deben ser realistas</li>
        <li>El sesgo algorítmico debe monitorizarse</li>
        <li>La IA complementa, no reemplaza, el juicio humano</li>
        <li>La transparencia y explicabilidad son cruciales</li>
      </ul>

      <hr/>

      <h2>1.5. Estrategia de IA en la empresa: Cómo identificar oportunidades, diseñar una hoja de ruta e integrar la IA en la cultura corporativa</h2>
      <h3>Identificación de Oportunidades</h3>
      <p><strong>1. Mapeo de procesos:</strong> Identificar tareas repetitivas, intensivas en datos o que requieran predicción.</p>
      <p><strong>2. Análisis de dolor:</strong> Detectar cuellos de botella, errores frecuentes y áreas de insatisfacción del cliente.</p>
      <p><strong>3. Evaluación de datos:</strong> Auditar la disponibilidad, calidad y accesibilidad de los datos.</p>
      <p><strong>4. Benchmarking:</strong> Analizar cómo la competencia y empresas líderes utilizan IA.</p>
      
      <h3>Diseño de la Hoja de Ruta</h3>
      <p><strong>Fase 1: Fundamentos (0-6 meses)</strong></p>
      <ul>
        <li>Establecer gobernanza de datos</li>
        <li>Formar equipo de IA</li>
        <li>Identificar proyectos piloto de bajo riesgo</li>
        <li>Seleccionar tecnologías y partners</li>
      </ul>
      
      <p><strong>Fase 2: Pilotos (6-12 meses)</strong></p>
      <ul>
        <li>Ejecutar 2-3 proyectos piloto</li>
        <li>Medir resultados y aprender</li>
        <li>Desarrollar capacidades internas</li>
        <li>Comunicar éxitos internamente</li>
      </ul>
      
      <p><strong>Fase 3: Escalado (12-24 meses)</strong></p>
      <ul>
        <li>Escalar proyectos exitosos</li>
        <li>Integrar IA en procesos core</li>
        <li>Automatizar despliegue de modelos (MLOps)</li>
        <li>Expandir a nuevas áreas de negocio</li>
      </ul>
      
      <p><strong>Fase 4: Transformación (24+ meses)</strong></p>
      <ul>
        <li>IA como ventaja competitiva</li>
        <li>Nuevos modelos de negocio basados en IA</li>
        <li>Cultura data-driven consolidada</li>
      </ul>
      
      <h3>Integración en la Cultura Corporativa</h3>
      <p><strong>Liderazgo:</strong> El compromiso debe venir desde la dirección general.</p>
      <p><strong>Formación:</strong> Programas de upskilling y reskilling para todos los niveles.</p>
      <p><strong>Comunicación:</strong> Transparencia sobre objetivos, éxitos y fracasos.</p>
      <p><strong>Incentivos:</strong> Recompensar la innovación y el uso de IA.</p>
      <p><strong>Ética:</strong> Establecer principios claros de uso responsable de IA.</p>

      <hr/>

      <h2>1.6. Sesiones interactivas: Debates sobre el futuro de la IA y su impacto socioeconómico</h2>
      <h3>Temas para Debate</h3>
      <p><strong>1. El futuro del trabajo:</strong> ¿La IA destruirá o creará empleos? ¿Qué habilidades serán relevantes?</p>
      <p><strong>2. Desigualdad económica:</strong> ¿La IA concentrará la riqueza o la democratizará?</p>
      <p><strong>3. Privacidad vs. Personalización:</strong> ¿Cuántos datos estamos dispuestos a ceder por conveniencia?</p>
      <p><strong>4. Sesgo algorítmico:</strong> ¿Cómo evitar que la IA perpetúe discriminaciones?</p>
      <p><strong>5. Autonomía y control:</strong> ¿Deberíamos permitir que la IA tome decisiones críticas?</p>
      <p><strong>6. Regulación:</strong> ¿Cómo regular la IA sin frenar la innovación?</p>
      <p><strong>7. Superinteligencia:</strong> ¿Es un riesgo existencial real o ciencia ficción?</p>
      
      <h3>Actividades Propuestas</h3>
      <ul>
        <li><strong>Debate estructurado:</strong> Dividir la clase en posturas a favor y en contra</li>
        <li><strong>Análisis de casos:</strong> Estudiar dilemas éticos reales</li>
        <li><strong>Role-playing:</strong> Simular comités éticos empresariales</li>
        <li><strong>Prospección:</strong> Ejercicios de pensamiento sobre escenarios futuros</li>
      </ul>
    `
  },
  {
    id: 2,
    slug: 'llms-generativa',
    title: 'Módulo 2: Modelos de Lenguaje (LLMs)',
    duration: '60 h',
    description: 'IA Generativa, ChatGPT y Prompt Engineering avanzado.',
    longDescription: 'Exploración profunda de los LLMs, uso avanzado de ChatGPT y técnicas de ingeniería de prompts para aplicaciones empresariales.',
    progress: 0,
    icon: BookCopy,
    resources: [
      { title: 'Guía del Módulo 2 (PDF)', file: '/materiales/tema2/01_guia_modulo_2_v01.pdf' },
      { title: 'Guía de Prácticas Módulo 2 (PDF)', file: '/materiales/tema2/02_guia_practicas_modulo_2_v01.pdf' },
      { title: 'Recursos Adicionales (PDF)', file: '/materiales/tema2/03_recursos_2_v01.pdf' },
      { title: 'Ejercicios Módulo 2 (PDF)', file: '/materiales/tema2/05_ejercicios_2_v01.pdf' },
      { title: 'Enterprise AI Manual (PDF)', file: '/materiales/tema2/Enterprise_AI_Manual.pdf' },
      { title: 'Presentación Enterprise AI (PPTX)', file: '/materiales/tema2/Enterprise_AI_Manual.pptx' },
      { title: 'Video: De Casual a Pro (MP4)', file: '/materiales/tema2/Manual_de_IA__Casual_a_Pro.mp4' },
      { title: 'Audio: Operador Profesional de IA (M4A)', file: '/materiales/tema2/Manual_del_operador_profesional_de_IA.m4a' },
      { title: 'Infografía de LLMs (PNG)', file: '/materiales/tema2/unnamed.png' }
    ],
    content: `
      <h2>2.1. Introducción a los Modelos de Lenguaje (LLMs) y la IA Generativa</h2>
      <h3>¿Qué es un Modelo de Lenguaje?</h3>
      <p>Un Modelo de Lenguaje de Gran Escala (LLM) es un sistema de IA entrenado con cantidades masivas de texto para predecir y generar lenguaje humano coherente.</p>
      
      <h3>¿Cómo funcionan los LLMs?</h3>
      <p><strong>1. Tokenización:</strong> El texto se divide en unidades más pequeñas llamadas tokens (palabras o subpalabras).</p>
      <p><strong>2. Embeddings:</strong> Cada token se convierte en un vector numérico que captura su significado.</p>
      <p><strong>3. Arquitectura Transformer:</strong> Utiliza mecanismos de atención para procesar secuencias completas de texto simultáneamente.</p>
      <p><strong>4. Entrenamiento:</strong> El modelo aprende patrones lingüísticos prediciendo la siguiente palabra en millones de textos.</p>
      <p><strong>5. Fine-tuning:</strong> Ajuste adicional para tareas específicas o alineación con valores humanos.</p>
      
      <h3>IA Generativa</h3>
      <p>La IA Generativa crea contenido nuevo (texto, imágenes, audio, código) en lugar de solo analizar datos existentes.</p>
      <p><strong>Tipos de IA Generativa:</strong></p>
      <ul>
        <li><strong>Texto:</strong> GPT-4, Claude, Gemini</li>
        <li><strong>Imágenes:</strong> DALL-E 3, Midjourney, Stable Diffusion</li>
        <li><strong>Audio:</strong> ElevenLabs, Whisper, MusicLM</li>
        <li><strong>Video:</strong> Sora, Runway, Pika</li>
        <li><strong>Código:</strong> GitHub Copilot, Cursor, Codeium</li>
      </ul>
      
      <h3>Capacidades de los LLMs actuales</h3>
      <ul>
        <li>Generación de texto coherente y contextualizado</li>
        <li>Traducción entre idiomas</li>
        <li>Resumen y síntesis de información</li>
        <li>Razonamiento lógico y matemático básico</li>
        <li>Generación y depuración de código</li>
        <li>Análisis de sentimientos y tono</li>
        <li>Extracción de información estructurada</li>
        <li>Conversación natural y contextual</li>
      </ul>
      
      <h3>Limitaciones importantes</h3>
      <ul>
        <li><strong>Alucinaciones:</strong> Pueden generar información falsa con confianza</li>
        <li><strong>Conocimiento limitado:</strong> Fecha de corte en el entrenamiento</li>
        <li><strong>Falta de razonamiento profundo:</strong> Patrones estadísticos, no comprensión real</li>
        <li><strong>Sesgos:</strong> Reflejan sesgos presentes en los datos de entrenamiento</li>
        <li><strong>Contexto limitado:</strong> Ventana de contexto finita (aunque creciente)</li>
      </ul>

      <hr/>

      <h2>2.2. Explorando los Modelos de Lenguaje Principales</h2>
      <h3>GPT-4 y GPT-4o (OpenAI)</h3>
      <p><strong>Características:</strong> Modelo multimodal, capacidad de razonamiento avanzado, soporte para visión y voz.</p>
      <p><strong>Fortalezas:</strong> Versatilidad, ecosistema maduro, amplia adopción empresarial.</p>
      <p><strong>Casos de uso:</strong> Asistentes virtuales, generación de contenido, análisis de documentos, codificación.</p>
      <p><strong>Acceso:</strong> ChatGPT Plus, API de OpenAI, Azure OpenAI Service.</p>
      
      <h3>Claude (Anthropic)</h3>
      <p><strong>Características:</strong> Enfoque en seguridad y alineación, ventana de contexto extensa (200K tokens).</p>
      <p><strong>Fortalezas:</strong> Calidad de escritura, análisis de documentos largos, menor tendencia a alucinaciones.</p>
      <p><strong>Casos de uso:</strong> Redacción profesional, análisis legal, resumen de documentos extensos.</p>
      <p><strong>Acceso:</strong> claude.ai, API de Anthropic, Amazon Bedrock.</p>
      
      <h3>Gemini (Google)</h3>
      <p><strong>Características:</strong> Nativamente multimodal, integración con ecosistema Google.</p>
      <p><strong>Fortalezas:</strong> Búsqueda en tiempo real, integración con Google Workspace, capacidades multimodales.</p>
      <p><strong>Casos de uso:</strong> Investigación, productividad empresarial, aplicaciones móviles.</p>
      <p><strong>Acceso:</strong> gemini.google.com, Google AI Studio, Vertex AI.</p>
      
      <h3>LLaMA (Meta)</h3>
      <p><strong>Características:</strong> Modelo abierto, múltiples tamaños (8B a 70B+ parámetros).</p>
      <p><strong>Fortalezas:</strong> Ejecución local, personalización, sin coste de API.</p>
      <p><strong>Casos de uso:</strong> Aplicaciones que requieren privacidad, fine-tuning específico, investigación.</p>
      <p><strong>Acceso:</strong> Hugging Face, proveedores de cloud, ejecución local.</p>
      
      <h3>Mistral AI</h3>
      <p><strong>Características:</strong> Modelos eficientes de alto rendimiento, enfoque europeo.</p>
      <p><strong>Fortalezas:</strong> Relación calidad-eficiencia, privacidad de datos, cumplimiento GDPR.</p>
      <p><strong>Modelos:</strong> Mistral 7B, Mixtral 8x7B, Mistral Large.</p>
      
      <h3>Modelos Especializados</h3>
      <p><strong>Para código:</strong> GitHub Copilot (basado en GPT), Cursor, Codeium, StarCoder.</p>
      <p><strong>Para investigación:</strong> Elicit, Consensus, Scite.</p>
      <p><strong>Para legal:</strong> Harvey AI, Casetext.</p>
      <p><strong>Para medicina:</strong> Med-PaLM, Hippocratic AI.</p>
      
      <h3>Criterios de Selección</h3>
      <ul>
        <li><strong>Calidad de salida:</strong> Precisión, coherencia, relevancia</li>
        <li><strong>Coste:</strong> Precio por token o suscripción</li>
        <li><strong>Latencia:</strong> Tiempo de respuesta</li>
        <li><strong>Privacidad:</strong> Política de retención de datos</li>
        <li><strong>Integración:</strong> APIs, SDKs, compatibilidad</li>
        <li><strong>Cumplimiento:</strong> GDPR, regulaciones sectoriales</li>
      </ul>

      <hr/>

      <h2>2.3. Uso Avanzado de ChatGPT y Técnicas de Ingeniería de Prompts</h2>
      <h3>Fundamentos del Prompt Engineering</h3>
      <p>El Prompt Engineering es el arte de diseñar instrucciones efectivas para obtener los mejores resultados de los LLMs.</p>
      
      <h3>Técnicas Esenciales</h3>
      <p><strong>1. Ser específico y claro:</strong></p>
      <pre>❌ "Escribe sobre marketing"
✅ "Escribe un artículo de 800 palabras sobre estrategias de marketing digital para pymes del sector retail en España, incluyendo ejemplos de éxito y tendencias para 2025"</pre>
      
      <p><strong>2. Proporcionar contexto:</strong></p>
      <pre>"Eres un consultor senior de marketing con 15 años de experiencia trabajando con empresas del IBEX 35. Tu cliente es una cadena de tiendas de moda que quiere expandir su presencia online..."</pre>
      
      <p><strong>3. Usar ejemplos (Few-Shot Prompting):</strong></p>
      <pre>"Clasifica el sentimiento de estos comentarios:
'El producto es excelente, superó mis expectativas' → Positivo
'La entrega tardó mucho pero el producto está bien' → Neutral
'Pésima experiencia, no lo recomiendo' → Negativo

Ahora clasifica: 'Calidad aceptable por el precio pagado'</pre>
      
      <p><strong>4. Estructurar la salida:</strong></p>
      <pre>"Genera una tabla con las siguientes columnas: Estrategia, Descripción, Coste Estimado, ROI Esperado, Tiempo de Implementación. Incluye 5 estrategias de marketing digital."</pre>
      
      <p><strong>5. Chain of Thought (Cadena de Pensamiento):</strong></p>
      <pre>"Resuelve este problema paso a paso, explicando tu razonamiento en cada etapa antes de dar la respuesta final."</pre>
      
      <h3>Técnicas Avanzadas</h3>
      <p><strong>1. Role Prompting:</strong> Asignar un rol específico al modelo.</p>
      <pre>"Actúa como un abogado especializado en propiedad intelectual. Revisa este contrato y señala las cláusulas potencialmente problemáticas..."</pre>
      
      <p><strong>2. Tree of Thoughts:</strong> Explorar múltiples caminos de razonamiento.</p>
      <pre>"Genera 3 enfoques diferentes para resolver este problema. Para cada enfoque, analiza pros, contras y viabilidad. Luego recomienda el mejor con justificación."</pre>
      
      <p><strong>3. Self-Consistency:</strong> Pedir múltiples respuestas y seleccionar la más coherente.</p>
      <pre>"Responde esta pregunta de 5 formas diferentes. Luego compara las respuestas y selecciona la más precisa con explicación."</pre>
      
      <p><strong>4. Iterative Refinement:</strong> Refinar progresivamente.</p>
      <pre>"Primero genera un borrador. Luego revísalo y mejora la claridad. Finalmente, optimiza para SEO."</pre>
      
      <h3>Prompts para Casos de Uso Empresariales</h3>
      <p><strong>Análisis de documentos:</strong></p>
      <pre>"Analiza este informe financiero y extrae: (1) Los 5 KPIs más importantes, (2) Tendencias clave, (3) Riesgos identificados, (4) Recomendaciones implícitas. Presenta en formato de tabla ejecutiva."</pre>
      
      <p><strong>Generación de contenido:</strong></p>
      <pre>"Escribe un hilo de Twitter de 8 tweets sobre [tema]. Cada tweet debe tener máximo 280 caracteres, incluir emojis relevantes y terminar con un gancho para el siguiente tweet. El tono debe ser profesional pero accesible."</pre>
      
      <p><strong>Brainstorming:</strong></p>
      <pre>"Genera 20 ideas innovadoras para [problema]. Clasifícalas en: (1) Implementación rápida/bajo coste, (2) Alto impacto/medio plazo, (3) Disruptivas/largo plazo. Para las 5 mejores, desarrolla un plan de acción básico."</pre>
      
      <p><strong>Análisis de datos:</strong></p>
      <pre>"Dado este conjunto de datos de ventas [datos], identifica: patrones estacionales, correlaciones entre variables, outliers significativos y 3 recomendaciones accionables para mejorar resultados."</pre>
      
      <h3>Errores Comunes y Cómo Evitarlos</h3>
      <ul>
        <li><strong>Prompts vagos:</strong> Sé específico en objetivos, formato y contexto</li>
        <li><strong>Sobrecarga de información:</strong> Divide tareas complejas en pasos</li>
        <li><strong>No verificar resultados:</strong> Siempre valida información crítica</li>
        <li><strong>Ignorar limitaciones:</strong> Conoce qué puede y no puede hacer el modelo</li>
        <li><strong>No iterar:</strong> El primer prompt raramente es el óptimo</li>
      </ul>

      <hr/>

      <h2>2.4. Aplicaciones Avanzadas y Futuro de los LLMs</h2>
      <h3>Aplicaciones Avanzadas Actuales</h3>
      <p><strong>1. Agentes Autónomos:</strong> Sistemas que planifican y ejecutan tareas complejas de forma autónoma.</p>
      <ul>
        <li>AutoGPT, LangChain, CrewAI</li>
        <li>Capacidades: navegación web, uso de herramientas, ejecución de código</li>
        <li>Casos: investigación de mercado automatizada, gestión de campañas</li>
      </ul>
      
      <p><strong>2. RAG (Retrieval-Augmented Generation):</strong> Combinar LLMs con bases de conocimiento externas.</p>
      <ul>
        <li>Permite acceso a información actualizada y específica</li>
        <li>Reduce alucinaciones al basarse en fuentes verificables</li>
        <li>Aplicaciones: asistentes internos, soporte técnico, investigación</li>
      </ul>
      
      <p><strong>3. Fine-tuning Especializado:</strong> Adaptar modelos a dominios específicos.</p>
      <ul>
        <li>Entrenamiento con datos sectoriales (legal, médico, financiero)</li>
        <li>Mejora precisión y reduce alucinaciones en el dominio</li>
        <li>Plataformas: OpenAI Fine-tuning, Hugging Face, Azure ML</li>
      </ul>
      
      <p><strong>4. Multimodalidad:</strong> Procesamiento combinado de texto, imagen, audio y video.</p>
      <ul>
        <li>GPT-4V, Gemini Pro Vision, Claude con visión</li>
        <li>Aplicaciones: análisis de documentos escaneados, descripción de imágenes, transcripción inteligente</li>
      </ul>
      
      <p><strong>5. Function Calling:</strong> LLMs que invocan funciones y APIs externas.</p>
      <ul>
        <li>Permite acciones reales (consultar BBDD, enviar emails, crear tickets)</li>
        <li>Base para agentes y automatizaciones complejas</li>
      </ul>
      
      <h3>Tendencias y Futuro</h3>
      <p><strong>1. Modelos más eficientes:</strong></p>
      <ul>
        <li>Reducción de tamaño manteniendo capacidades (SLMs - Small Language Models)</li>
        <li>Ejecución local en dispositivos edge</li>
        <li>Menor coste computacional y energético</li>
      </ul>
      
      <p><strong>2. Razonamiento mejorado:</strong></p>
      <ul>
        <li>Mejoras en lógica, matemáticas y planificación</li>
        <li>Sistemas híbridos (neuro-simbólicos)</li>
        <li>Capacidades de verificación y autocorrección</li>
      </ul>
      
      <p><strong>3. Personalización:</strong></p>
      <ul>
        <li>Modelos que aprenden de interacciones individuales</li>
        <li>Asistentes que conocen contexto y preferencias del usuario</li>
        <li>Memoria a largo plazo</li>
      </ul>
      
      <p><strong>4. Agentes multi-LLM:</strong></p>
      <ul>
        <li>Sistemas donde múltiples agentes especializados colaboran</li>
        <li>Cada agente usa el modelo óptimo para su tarea</li>
        <li>Orquestación automática de flujos complejos</li>
      </ul>
      
      <p><strong>5. Regulación y gobernanza:</strong></p>
      <ul>
        <li>AI Act europeo y regulaciones globales</li>
        <li>Estándares de transparencia y auditabilidad</li>
        <li>Mecanismos de seguridad y control</li>
      </ul>
      
      <p><strong>6. AGI (Inteligencia Artificial General):</strong></p>
      <ul>
        <li>Debate sobre viabilidad y plazos</li>
        <li>Implicaciones económicas y sociales</li>
        <li>Consideraciones de seguridad existencial</li>
      </ul>
      
      <h3>Preparándose para el Futuro</h3>
      <ul>
        <li>Mantenerse actualizado con avances rápidos del sector</li>
        <li>Desarrollar habilidades de prompt engineering y evaluación</li>
        <li>Entender limitaciones y casos de uso apropiados</li>
        <li>Considerar implicaciones éticas y de privacidad</li>
        <li>Experimentar activamente con nuevas herramientas</li>
      </ul>
    `
  },
  {
    id: 3,
    slug: 'avatares-virtuales',
    title: 'Módulo 3: Avatares Virtuales',
    duration: '30 h',
    description: 'Creación y aplicación de avatares con IA.',
    longDescription: 'Generación de avatares, adaptación de contenidos y tecnologías de Texto a Voz (TTS).',
    progress: 0,
    icon: BotMessageSquare,
    resources: [
      { title: 'Guía del Módulo 3 (PDF)', file: '/materiales/tema3/01_guia_modulo_3_v01.pdf' },
      { title: 'Enlaces y Recursos (PDF)', file: '/materiales/tema3/02_enlaces_3_v01.pdf' },
      { title: 'Ejercicios Módulo 3 (PDF)', file: '/materiales/tema3/03_ejercicios_3.pdf' },
      { title: 'AI Avatar Production Playbook (PDF)', file: '/materiales/tema3/AI_Avatar_Production_Playbook.pdf' },
      { title: 'AI Avatar Production Playbook (PPTX)', file: '/materiales/tema3/AI_Avatar_Production_Playbook.pptx' },
      { title: 'Vídeo: Avatares con IA para Empresas (MP4)', file: '/materiales/tema3/Avatares_con_IA_para_Empresas.mp4' },
      { title: 'Audio: Avatares de IA en comunicación corporativa (M4A)', file: '/materiales/tema3/Avatares_de_IA_en_la_comunicación_corporativa.m4a' },
      { title: 'Informe: Avatares Virtuales en Empresa (DOCX)', file: '/materiales/tema3/Informe sobre Creación y Aplicación de Avatares Virtuales en el Entorno Empresarial.docx' },
      { title: 'Infografía del Módulo 3 (PNG)', file: '/materiales/tema3/unnamed (1).png' }
    ],
    content: `
      <h2>3.1. Fundamentos y Generación de Avatares Virtuales</h2>
      <h3>¿Qué es un Avatar Virtual?</h3>
      <p>Un avatar virtual es una representación digital de una persona o entidad, que puede ser estática o dinámica, 2D o 3D, y que se utiliza para interactuar en entornos digitales.</p>
      
      <h3>Tipos de Avatares</h3>
      <p><strong>1. Avatares 2D:</strong> Imágenes planas o ilustraciones (perfil de redes sociales, iconos).</p>
      <p><strong>2. Avatares 3D:</strong> Modelos tridimensionales animables (videojuegos, metaverso).</p>
      <p><strong>3. Avatares Fotorrealistas:</strong> Réplicas digitales de personas reales.</p>
      <p><strong>4. Avatares Estilizados:</strong> Representaciones artísticas o cartoon.</p>
      <p><strong>5. Avatares Animados con IA:</strong> Capaces de hablar y expresar emociones mediante IA.</p>
      
      <h3>Herramientas de Generación de Avatares</h3>
      <p><strong>Para avatares profesionales (presentaciones, videos):</strong></p>
      <ul>
        <li><strong>Synthesia:</strong> Avatares AI para videos corporativos. +140 avatares, 120+ idiomas.</li>
        <li><strong>HeyGen:</strong> Avatares personalizables con clonación de voz.</li>
        <li><strong>D-ID:</strong> Animación de fotos estáticas con sincronización labial.</li>
        <li><strong>Colossyan:</strong> Enfocado en formación corporativa.</li>
      </ul>
      
      <p><strong>Para avatares 3D y metaverso:</strong></p>
      <ul>
        <li><strong>Ready Player Me:</strong> Avatares 3D para múltiples plataformas.</li>
        <li><strong>MetaHuman (Epic Games):</strong> Avatares fotorrealistas para Unreal Engine.</li>
        <li><strong>VRoid Studio:</strong> Avatares estilo anime para VRChat.</li>
      </ul>
      
      <p><strong>Para avatares personalizados con IA:</strong></p>
      <ul>
        <li><strong>Midjourney / DALL-E 3:</strong> Generación de imágenes de avatares desde texto.</li>
        <li><strong>Artflow.ai:</strong> Creación de personajes con consistencia.</li>
        <li><strong>Generated Photos:</strong> Banco de caras generadas por IA.</li>
      </ul>
      
      <h3>Proceso de Creación de un Avatar Profesional</h3>
      <p><strong>Paso 1: Definir el propósito</strong></p>
      <ul>
        <li>¿Para qué se usará? (videos, presentaciones, atención al cliente)</li>
        <li>¿Qué mensaje debe transmitir? (profesionalismo, cercanía, innovación)</li>
        <li>¿Quién es la audiencia objetivo?</li>
      </ul>
      
      <p><strong>Paso 2: Seleccionar o crear el avatar</strong></p>
      <ul>
        <li>Elegir de biblioteca existente o crear personalizado</li>
        <li>Definir apariencia: edad, género, etnia, vestimenta</li>
        <li>Considerar diversidad e inclusión</li>
      </ul>
      
      <p><strong>Paso 3: Configurar voz y lenguaje</strong></p>
      <ul>
        <li>Seleccionar voz de biblioteca o clonar voz propia</li>
        <li>Configurar idioma y acento</li>
        <li>Ajustar tono, velocidad y entonación</li>
      </ul>
      
      <p><strong>Paso 4: Crear el contenido</strong></p>
      <ul>
        <li>Escribir el guion del mensaje</li>
        <li>Definir gestos y expresiones</li>
        <li>Añadir elementos visuales de apoyo</li>
      </ul>
      
      <p><strong>Paso 5: Generar y revisar</strong></p>
      <ul>
        <li>Renderizar el video con el avatar</li>
        <li>Revisar sincronización labial y naturalidad</li>
        <li>Iterar hasta obtener resultado satisfactorio</li>
      </ul>
      
      <h3>Casos de Uso Empresariales</h3>
      <ul>
        <li><strong>Formación:</strong> Videos de onboarding, cursos e-learning</li>
        <li><strong>Marketing:</strong> Presentaciones de producto, testimonios</li>
        <li><strong>Atención al cliente:</strong> Videos de respuesta personalizada</li>
        <li><strong>Comunicación interna:</strong> Mensajes de dirección, actualizaciones</li>
        <li><strong>Ventas:</strong> Pitches personalizados a escala</li>
      </ul>
      
      <h3>Consideraciones Éticas</h3>
      <ul>
        <li>Transparencia: indicar que es un avatar, no una persona real</li>
        <li>Consentimiento: no usar likeness de personas sin permiso</li>
        <li>Deepfakes: evitar usos engañosos o maliciosos</li>
        <li>Diversidad: representar adecuadamente a la audiencia</li>
      </ul>

      <hr/>

      <h2>3.2. Localización y Adaptación de Contenidos</h2>
      <h3>Importancia de la Localización</h3>
      <p>La localización va más allá de la traducción: adapta el contenido al contexto cultural, lingüístico y social de cada mercado objetivo.</p>
      
      <h3>Componentes de la Localización</h3>
      <p><strong>1. Traducción lingüística:</strong> Conversión precisa del texto al idioma objetivo.</p>
      <p><strong>2. Adaptación cultural:</strong> Ajuste de referencias, ejemplos y metáforas.</p>
      <p><strong>3. Formato y diseño:</strong> Adaptación de fechas, monedas, unidades de medida.</p>
      <p><strong>4. Cumplimiento legal:</strong> Respeto a normativas locales.</p>
      <p><strong>5. Sensibilidad cultural:</strong> Evitar ofensas o malentendidos.</p>
      
      <h3>IA en la Localización de Contenidos</h3>
      <p><strong>Traducción Automática Neuronal (NMT):</strong></p>
      <ul>
        <li><strong>DeepL:</strong> Calidad superior para idiomas europeos</li>
        <li><strong>Google Translate API:</strong> Amplia cobertura de idiomas</li>
        <li><strong>ModernMT:</strong> Aprendizaje contextual</li>
        <li><strong>Smartcat:</strong> Plataforma colaborativa con IA</li>
      </ul>
      
      <p><strong>Localización de Video con Avatares:</strong></p>
      <ul>
        <li><strong>HeyGen:</strong> Traduce videos manteniendo voz original y sincronización labial</li>
        <li><strong>Rask AI:</strong> Doblaje automático con clonación de voz</li>
        <li><strong>ElevenLabs:</strong> Traducción de audio preservando características vocales</li>
        <li><strong>Synthesia:</strong> Genera el mismo contenido en múltiples idiomas</li>
      </ul>
      
      <h3>Proceso de Localización con IA</h3>
      <p><strong>Paso 1: Preparación del contenido original</strong></p>
      <ul>
        <li>Asegurar calidad del contenido fuente</li>
        <li>Identificar elementos culturalmente específicos</li>
        <li>Documentar contexto y tono deseado</li>
      </ul>
      
      <p><strong>Paso 2: Traducción inicial con IA</strong></p>
      <ul>
        <li>Usar herramientas de traducción neuronal</li>
        <li>Proporcionar glosarios y memoria de traducción</li>
        <li>Configurar tono y estilo formal/informal</li>
      </ul>
      
      <p><strong>Paso 3: Revisión y adaptación</strong></p>
      <ul>
        <li>Revisar traducciones con hablantes nativos</li>
        <li>Adaptar referencias culturales</li>
        <li>Verificar coherencia de terminología</li>
      </ul>
      
      <p><strong>Paso 4: Localización multimedia</strong></p>
      <ul>
        <li>Sincronización labial para videos</li>
        <li>Adaptación de gráficos y texto en pantalla</li>
        <li>Ajuste de duración y ritmo</li>
      </ul>
      
      <p><strong>Paso 5: Control de calidad</strong></p>
      <ul>
        <li>Pruebas con audiencia local</li>
        <li>Verificación de funcionalidad</li>
        <li>Corrección de errores identificados</li>
      </ul>
      
      <h3>Mejores Prácticas</h3>
      <ul>
        <li><strong>Crear contenido "localizable":</strong> Evitar idiomas, juegos de palabras y referencias muy locales</li>
        <li><strong>Usar contexto visual:</strong> Imágenes y gráficos que trasciendan barreras lingüísticas</li>
        <li><strong>Considerar RTL:</strong> Idiomas de derecha a izquierda (árabe, hebreo)</li>
        <li><strong>Adaptar colores:</strong> Algunos colores tienen significados diferentes por cultura</li>
        <li><strong>Respetar formatos:</strong> Fechas (DD/MM vs MM/DD), números (coma vs punto decimal)</li>
      </ul>
      
      <h3>Herramientas Recomendadas</h3>
      <table>
        <tr><th>Herramienta</th><th>Uso</th><th>Idiomas</th></tr>
        <tr><td>DeepL Pro</td><td>Traducción de texto</td><td>30+</td></tr>
        <tr><td>HeyGen</td><td>Video avatar multilingüe</td><td>40+</td></tr>
        <tr><td>Rask AI</td><td>Doblaje de video</td><td>130+</td></tr>
        <tr><td>Smartcat</td><td>Plataforma de localización</td><td>280+</td></tr>
        <tr><td>Phrase</td><td>Gestión de localización</td><td>Múltiples</td></tr>
      </table>
      
      <h3>Ejemplo Práctico: Localización de un Video Corporativo</h3>
      <p><strong>Contenido original:</strong> Video de 3 minutos presentando un producto, en español de España.</p>
      <p><strong>Mercados objetivo:</strong> México, Alemania, Japón, Emiratos Árabes.</p>
      <p><strong>Proceso:</strong></p>
      <ol>
        <li>Transcribir audio original con Whisper</li>
        <li>Traducir guion con DeepL (revisión nativa)</li>
        <li>Adaptar referencias culturales (ejemplos, moneda)</li>
        <li>Generar versiones con HeyGen en cada idioma</li>
        <li>Clonar voz del presentador para consistencia</li>
        <li>Revisar sincronización y naturalidad</li>
        <li>Exportar versiones finales</li>
      </ol>

      <hr/>

      <h2>3.3. Tecnologías de Texto a Voz (Text-to-Voice) e Implementación</h2>
      <h3>¿Qué es Text-to-Speech (TTS)?</h3>
      <p>La tecnología TTS convierte texto escrito en audio hablado, utilizando IA para generar voces naturales y expresivas.</p>
      
      <h3>Evolución del TTS</h3>
      <p><strong>1ª Generación (1980s-1990s):</strong> Voces robóticas, síntesis por formantes.</p>
      <p><strong>2ª Generación (2000s-2010s):</strong> Síntesis concatenativa, más natural pero limitada.</p>
      <p><strong>3ª Generación (2018-presente):</strong> TTS neuronal, voces indistinguibles de humanas.</p>
      
      <h3>Principales Plataformas TTS</h3>
      <p><strong>ElevenLabs:</strong></p>
      <ul>
        <li>Voces más naturales del mercado</li>
        <li>Clonación de voz con pocos minutos de muestra</li>
        <li>Control de emociones y entonación</li>
        <li>40+ idiomas</li>
        <li>API para integración</li>
      </ul>
      
      <p><strong>Google Cloud Text-to-Speech:</strong></p>
      <ul>
        <li>WaveNet voices de alta calidad</li>
        <li>220+ voces en 40+ idiomas</li>
        <li>Integración con ecosistema Google</li>
        <li>Precio competitivo</li>
      </ul>
      
      <p><strong>Amazon Polly:</strong></p>
      <ul>
        <li>Voces neuronales y estándar</li>
        <li>60+ voces en 30+ idiomas</li>
        <li>Integración con AWS</li>
        <li>Opción de voces personalizadas</li>
      </ul>
      
      <p><strong>Azure Cognitive Services (Speech):</strong></p>
      <ul>
        <li>100+ voces en 50+ idiomas</li>
        <li>Voces neuronales personalizadas</li>
        <li>Integración con Microsoft</li>
        <li>Control de prosodia avanzado</li>
      </ul>
      
      <p><strong>Murf.ai:</strong></p>
      <ul>
        <li>Enfoque en contenido profesional</li>
        <li>120+ voces en 20+ idiomas</li>
        <li>Editor de audio integrado</li>
        <li>Sincronización con video</li>
      </ul>
      
      <h3>Características Avanzadas</h3>
      <p><strong>Clonación de Voz:</strong></p>
      <ul>
        <li>Crear réplica digital de una voz específica</li>
        <li>Requiere 1-5 minutos de audio de muestra</li>
        <li>Aplicaciones: consistencia de marca, accesibilidad</li>
        <li>Consideraciones éticas: consentimiento esencial</li>
      </ul>
      
      <p><strong>Control Emocional:</strong></p>
      <ul>
        <li>Ajustar tono para expresar emociones</li>
        <li>Configurar intensidad (alegre, triste, enfadado, neutral)</li>
        <li>Útil para narrativas y contenido persuasivo</li>
      </ul>
      
      <p><strong>Prosodia Personalizada:</strong></p>
      <ul>
        <li>Control de velocidad, pausas, énfasis</li>
        <li>SSML (Speech Synthesis Markup Language)</li>
        <li>Permite naturalidad y expresión</li>
      </ul>
      
      <h3>Casos de Uso Empresariales</h3>
      <ul>
        <li><strong>Accesibilidad:</strong> Lectura de contenido para personas con discapacidad visual</li>
        <li><strong>E-learning:</strong> Narración de cursos online</li>
        <li><strong>Marketing:</strong> Videos promocionales sin locutor</li>
        <li><strong>Atención al cliente:</strong> IVR y respuestas de voz automatizadas</li>
        <li><strong>Podcasts:</strong> Generación de contenido audio escalable</li>
        <li><strong>Localización:</strong> Doblar contenido a múltiples idiomas</li>
      </ul>
      
      <h3>Implementación Práctica</h3>
      <p><strong>Ejemplo con ElevenLabs API:</strong></p>
      <pre>
1. Crear cuenta en elevenlabs.io
2. Obtener API Key
3. Seleccionar voz de la biblioteca
4. Enviar texto vía API
5. Recibir archivo de audio MP3
6. Integrar en aplicación o sitio web
      </pre>
      
      <h3>Mejores Prácticas</h3>
      <ul>
        <li>Escribir texto optimizado para audio (frases cortas, puntuación clara)</li>
        <li>Usar SSML para control fino de la pronunciación</li>
        <li>Previsualizar antes de generar en producción</li>
        <li>Considerar variaciones para evitar monotonía</li>
        <li>Probar con diferentes voces para encontrar la óptima</li>
      </ul>
      
      <h3>Futuro del TTS</h3>
      <ul>
        <li>Voces indistinguibles de humanas en tiempo real</li>
        <li>Clonación instantánea con menos datos</li>
        <li>Expresividad y emociones más matizadas</li>
        <li>Integración con avatares para sincronización perfecta</li>
        <li>Voces personalizadas como commodity</li>
      </ul>
    `
  },
  {
    id: 4,
    slug: 'bots-asistentes',
    title: 'Módulo 4: Bots y Asistentes Virtuales',
    duration: '42 h',
    description: 'Creación, implementación y estrategia multimodal.',
    longDescription: 'Estrategia de asistentes internos vs externos, proceso de creación y ética en la automatización.',
    progress: 0,
    icon: Cpu,
    resources: [
      { title: 'Enlaces y Recursos (PDF)', file: '/materiales/tema4/02_enlaces_4_v01.pdf' },
      { title: 'Enterprise AI Blueprint (PDF)', file: '/materiales/tema4/Enterprise_AI_Blueprint.pdf' },
      { title: 'Guía Estratégica: Bots y Asistentes (PDF)', file: '/materiales/tema4/Guia_Estrategica_Bots_y_Asistentes.pdf' },
      { title: 'Audio: La Ingeniería tras los Asistentes Virtuales (M4A)', file: '/materiales/tema4/La_ingenieria_tras_asistentes_virtuales.m4a' },
      { title: 'Vídeo: Bots vs Asistentes (MP4)', file: '/materiales/tema4/Bots_vs_Asistentes.mp4' },
      { title: 'Infografía: Bots vs Asistentes (PNG)', file: '/materiales/tema4/infografia-bots-vs-asistentes.png' },
      { title: 'Línea de Tiempo: Evolución de Bots (PNG)', file: '/materiales/tema4/linea-tiempo-bots.png' }
    ],
    content: `
      <h2>4.1. Introducción y Contexto Actual</h2>
      <h3>Evolución de los Bots y Asistentes</h3>
      <p><strong>1966 - ELIZA:</strong> Primer chatbot, simulaba ser un terapeuta.</p>
      <p><strong>1995 - A.L.I.C.E:</strong> Usaba reglas pattern-matching.</p>
      <p><strong>2011 - Siri:</strong> Primer asistente de voz mainstream en smartphones.</p>
      <p><strong>2014 - Alexa:</strong> Asistentes de voz en el hogar.</p>
      <p><strong>2016 - Chatbots empresariales:</strong> Boom de bots en mensajería.</p>
      <p><strong>2020 - GPT-3:</strong> Chatbots con lenguaje natural avanzado.</p>
      <p><strong>2023 - GPT-4 y asistentes de IA:</strong> Capacidades casi humanas.</p>
      
      <h3>Tipos de Bots y Asistentes</h3>
      <p><strong>Por funcionalidad:</strong></p>
      <ul>
        <li><strong>Chatbots:</strong> Interacción por texto (web, apps de mensajería)</li>
        <li><strong>Voicebots:</strong> Interacción por voz (teléfono, altavoces)</li>
        <li><strong>Asistentes virtuales:</strong> Multifuncionales (Siri, Google Assistant)</li>
        <li><strong>Agentes conversacionales:</strong> IA avanzada con contexto y memoria</li>
      </ul>
      
      <p><strong>Por tecnología:</strong></p>
      <ul>
        <li><strong>Basados en reglas:</strong> Flujos predefinidos, limitados pero predecibles</li>
        <li><strong>Basados en IA:</strong> NLP/ML, más flexibles pero menos controlables</li>
        <li><strong>Híbridos:</strong> Combinan reglas para control e IA para flexibilidad</li>
      </ul>
      
      <h3>Estado Actual del Mercado</h3>
      <p><strong>Adopción empresarial:</strong></p>
      <ul>
        <li>67% de empresas usan o planean usar chatbots (2024)</li>
        <li>Ahorro medio: $8 mil millones anuales a nivel global</li>
        <li>ROI promedio: 2-3 años para implementación completa</li>
      </ul>
      
      <p><strong>Sectores líderes:</strong></p>
      <ul>
        <li>Banca y seguros (consultas, reclamaciones)</li>
        <li>Retail (atención al cliente, ventas)</li>
        <li>Salud (triage, citas, información)</li>
        <li>Telecomunicaciones (soporte técnico)</li>
        <li>Viajes y hostelería (reservas, información)</li>
      </ul>
      
      <p><strong>Expectativas del usuario:</strong></p>
      <ul>
        <li>Respuesta inmediata 24/7</li>
        <li>Resolución en primera interacción</li>
        <li>Experiencia personalizada</li>
        <li>Transición fluida a humano si es necesario</li>
      </ul>
      
      <h3>Beneficios Clave</h3>
      <ul>
        <li><strong>Disponibilidad:</strong> 24/7/365 sin interrupciones</li>
        <li><strong>Escalabilidad:</strong> Atender miles de conversaciones simultáneas</li>
        <li><strong>Consistencia:</strong> Respuestas uniformes y precisas</li>
        <li><strong>Eficiencia:</strong> Reducción de costes operativos 30-50%</li>
        <li><strong>Data-driven:</strong> Insights de interacciones para mejora continua</li>
      </ul>
      
      <h3>Desafíos Actuales</h3>
      <ul>
        <li>Gestión de expectativas del usuario</li>
        <li>Manejo de consultas complejas o ambiguas</li>
        <li>Integración con sistemas legacy</li>
        <li>Privacidad y seguridad de datos</li>
        <li>Mantenimiento y mejora continua</li>
      </ul>

      <hr/>

      <h2>4.2. Estrategia y Comparación: Internos vs. Externos</h2>
      <h3>Asistentes Internos (Empleados)</h3>
      <p><strong>Casos de uso típicos:</strong></p>
      <ul>
        <li>Onboarding de nuevos empleados</li>
        <li>Soporte de IT (reset de contraseñas, incidencias)</li>
        <li>Consultas de RRHH (vacaciones, nóminas, políticas)</li>
        <li>Búsqueda de información interna</li>
        <li>Reserva de salas y recursos</li>
        <li>Formación y desarrollo</li>
      </ul>
      
      <p><strong>Requisitos específicos:</strong></p>
      <ul>
        <li>Integración con sistemas internos (HRIS, ITSM, intranet)</li>
        <li>Control de acceso y permisos</li>
        <li>Lenguaje y cultura corporativa</li>
        <li>Alta precisión (errores impactan productividad)</li>
      </ul>
      
      <p><strong>Plataformas recomendadas:</strong></p>
      <ul>
        <li>Microsoft Copilot for Microsoft 365</li>
        <li>Google Duet AI</li>
        <li>ServiceNow Virtual Agent</li>
        <li>Slack AI</li>
        <li>Desarrollo custom con Azure Bot Service</li>
      </ul>
      
      <p><strong>Métricas de éxito:</strong></p>
      <ul>
        <li>Reducción de tickets a IT/RRHH</li>
        <li>Tiempo ahorrado por empleado</li>
        <li>Satisfacción interna (eNPS)</li>
        <li>Tasa de adopción</li>
      </ul>
      
      <h3>Asistentes Externos (Clientes)</h3>
      <p><strong>Casos de uso típicos:</strong></p>
      <ul>
        <li>Atención al cliente (FAQs, pedidos, devoluciones)</li>
        <li>Ventas y recomendaciones de producto</li>
        <li>Reservas y citas</li>
        <li>Soporte técnico básico</li>
        <li>Recogida de feedback</li>
        <li>Prospección y cualificación de leads</li>
      </ul>
      
      <p><strong>Requisitos específicos:</strong></p>
      <ul>
        <li>Integración con CRM, ecommerce, sistemas de pedidos</li>
        <li>Múltiples canales (web, WhatsApp, redes sociales)</li>
        <li>Personalización basada en historial del cliente</li>
        <li>Escalado a agente humano fluido</li>
      </ul>
      
      <p><strong>Plataformas recomendadas:</strong></p>
      <ul>
        <li>Intercom Fin</li>
        <li>Zendesk Answer Bot</li>
        <li>Drift</li>
        <li>LivePerson</li>
        <li>Custom con Dialogflow + canales</li>
      </ul>
      
      <p><strong>Métricas de éxito:</strong></p>
      <ul>
        <li>Tasa de resolución en primer contacto</li>
        <li>Tiempo medio de respuesta</li>
        <li>CSAT (satisfacción del cliente)</li>
        <li>Reducción de costes de atención</li>
        <li>Impacto en ventas/conversión</li>
      </ul>
      
      <h3>Comparativa Directa</h3>
      <table>
        <tr><th>Aspecto</th><th>Interno</th><th>Externo</th></tr>
        <tr><td>Audiencia</td><td>Empleados (conocedores)</td><td>Clientes (diversos)</td></tr>
        <tr><td>Tono</td><td>Corporativo, directo</td><td>Amable, paciente</td></tr>
        <tr><td>Integraciones</td><td>Sistemas internos</td><td>CRM, ecommerce</td></tr>
        <tr><td>Seguridad</td><td>Alta (datos sensibles)</td><td>Media-Alta</td></tr>
        <tr><td>Errores tolerables</td><td>Bajos (impacto interno)</td><td>Muy bajos (impacto reputación)</td></tr>
        <tr><td>Canales</td><td>Intranet, Teams, Slack</td><td>Web, WhatsApp, redes</td></tr>
      </table>
      
      <h3>Estrategia Híbrida</h3>
      <p>Muchas organizaciones implementan ambos tipos compartiendo:</p>
      <ul>
        <li>Infraestructura tecnológica común</li>
        <li>Equipo de mantenimiento y mejora</li>
        <li>Políticas de gobernanza y ética</li>
        <li>Plataforma de analítica unificada</li>
      </ul>

      <hr/>

      <h2>4.3. Proceso de Creación de un Asistente Virtual</h2>
      <h3>Fase 1: Descubrimiento y Definición</h3>
      <p><strong>1. Identificar caso de uso:</strong></p>
      <ul>
        <li>¿Qué problema resuelve?</li>
        <li>¿Quiénes son los usuarios?</li>
        <li>¿Cuál es el éxito esperado?</li>
      </ul>
      
      <p><strong>2. Definir alcance:</strong></p>
      <ul>
        <li>Funcionalidades incluidas (MVP)</li>
        <li>Funcionalidades futuras (roadmap)</li>
        <li>Limitaciones explícitas</li>
      </ul>
      
      <p><strong>3. Analizar datos existentes:</strong></p>
      <ul>
        <li>Histórico de consultas (tickets, chats, emails)</li>
        <li>FAQs actuales</li>
        <li>Grabaciones de llamadas (para voicebots)</li>
      </ul>
      
      <h3>Fase 2: Diseño Conversacional</h3>
      <p><strong>1. Definir personalidad:</strong></p>
      <ul>
        <li>Tono (formal, cercano, profesional)</li>
        <li>Estilo de comunicación</li>
        <li>Nombre y presentación</li>
      </ul>
      
      <p><strong>2. Mapear flujos de conversación:</strong></p>
      <ul>
        <li>Intenciones principales (intents)</li>
        <li>Entidades y parámetros</li>
        <li>Flujos de diálogo para cada caso</li>
        <li>Manejo de errores y malentendidos</li>
      </ul>
      
      <p><strong>3. Diseñar mensajes:</strong></p>
      <ul>
        <li>Saludos y onboarding</li>
        <li>Respuestas tipo</li>
        <li>Mensajes de error</li>
        <li>Transferencia a humano</li>
      </ul>
      
      <h3>Fase 3: Desarrollo Técnico</h3>
      <p><strong>1. Seleccionar plataforma:</strong></p>
      <ul>
        <li>Dialogflow (Google)</li>
        <li>Microsoft Bot Framework</li>
        <li>IBM Watson Assistant</li>
        <li>Amazon Lex</li>
        <li>Rasa (open source)</li>
        <li>Plataformas low-code (Landbot, Chatfuel)</li>
      </ul>
      
      <p><strong>2. Configurar NLP:</strong></p>
      <ul>
        <li>Definir intents y utterances</li>
        <li>Entrenar modelo con ejemplos</li>
        <li>Configurar entidades</li>
        <li>Ajustar umbrales de confianza</li>
      </ul>
      
      <p><strong>3. Integrar sistemas:</strong></p>
      <ul>
        <li>APIs backend</li>
        <li>Bases de datos</li>
        <li>CRM, ERP, otros sistemas</li>
        <li>Canales de comunicación</li>
      </ul>
      
      <p><strong>4. Implementar lógica:</strong></p>
      <ul>
        <li>Webhooks para procesamiento</li>
        <li>Gestión de contexto y memoria</li>
        <li>Manejo de sesiones</li>
      </ul>
      
      <h3>Fase 4: Testing y QA</h3>
      <p><strong>1. Testing funcional:</strong></p>
      <ul>
        <li>Probar todos los flujos</li>
        <li>Verificar integraciones</li>
        <li>Comprobar manejo de errores</li>
      </ul>
      
      <p><strong>2. Testing de conversación:</strong></p>
      <ul>
        <li>Variedad de formulaciones</li>
        <li>Consultas ambiguas</li>
        <li>Cambios de tema</li>
      </ul>
      
      <p><strong>3. User Acceptance Testing:</strong></p>
      <ul>
        <li>Pruebas con usuarios reales</li>
        <li>Recogida de feedback</li>
        <li>Iteración y mejora</li>
      </ul>
      
      <h3>Fase 5: Despliegue</h3>
      <p><strong>1. Lanzamiento gradual:</strong></p>
      <ul>
        <li>Beta con grupo limitado</li>
        <li>Monitorización intensiva</li>
        <li>Ajustes basados en datos</li>
      </ul>
      
      <p><strong>2. Lanzamiento completo:</strong></p>
      <ul>
        <li>Comunicación a usuarios</li>
        <li>Documentación y FAQs</li>
        <li>Soporte disponible</li>
      </ul>
      
      <h3>Fase 6: Operación y Mejora</h3>
      <p><strong>1. Monitorización continua:</strong></p>
      <ul>
        <li>Métricas de rendimiento</li>
        <li>Analítica de conversaciones</li>
        <li>Detección de problemas</li>
      </ul>
      
      <p><strong>2. Mejora iterativa:</strong></p>
      <ul>
        <li>Añadir nuevos intents</li>
        <li>Refinar respuestas</li>
        <li>Optimizar flujos</li>
      </ul>
      
      <p><strong>3. Expansión:</strong></p>
      <ul>
        <li>Nuevos casos de uso</li>
        <li>Nuevos canales</li>
        <li>Nuevos idiomas</li>
      </ul>

      <hr/>

      <h2>4.4. Avatares Virtuales y la Experiencia Multimodal</h2>
      <h3>¿Qué es una Experiencia Multimodal?</h3>
      <p>Una experiencia multimodal combina múltiples formas de interacción: texto, voz, imagen, video y gestos, para crear interacciones más naturales y efectivas.</p>
      
      <h3>Combinando Avatares con Chatbots</h3>
      <p><strong>Ventajas:</strong></p>
      <ul>
        <li>Mayor engagement visual</li>
        <li>Comunicación no verbal (expresiones, gestos)</li>
        <li>Percepción de mayor humanidad</li>
        <li>Mejor retención de información</li>
      </ul>
      
      <p><strong>Casos de uso:</strong></p>
      <ul>
        <li>Atención al cliente premium</li>
        <li>Formación y onboarding</li>
        <li>Presentaciones de producto</li>
        <li>Asistentes de salud mental</li>
        <li>Guías virtuales (museos, turismo)</li>
      </ul>
      
      <h3>Tecnologías Habilitadoras</h3>
      <p><strong>1. Avatares en tiempo real:</strong></p>
      <ul>
        <li>Unity + NVIDIA Audio2Face</li>
        <li>Unreal Engine MetaHuman</li>
        <li>Soul Machines Digital People</li>
      </ul>
      
      <p><strong>2. Sincronización labial:</strong></p>
      <ul>
        <li>Rhubarb Lip Sync</li>
        <li>Oculus OVR LipSync</li>
        <li>Soluciones cloud (D-ID, HeyGen API)</li>
      </ul>
      
      <p><strong>3. Expresiones faciales:</strong></p>
      <ul>
        <li>Blendshapes y morph targets</li>
        <li>IA para generar expresiones contextuales</li>
        <li>Emotion AI para detectar estado del usuario</li>
      </ul>
      
      <p><strong>4. Gestos y lenguaje corporal:</strong></p>
      <ul>
        <li>Animaciones predefinidas</li>
        <li>Generación procedural de gestos</li>
        <li>Coordinación con contenido del habla</li>
      </ul>
      
      <h3>Diseño de Experiencias Multimodales</h3>
      <p><strong>Principios clave:</strong></p>
      <ul>
        <li><strong>Redundancia:</strong> Información presentada en múltiples modalidades</li>
        <li><strong>Complementariedad:</strong> Cada modalidad aporta valor único</li>
        <li><strong>Consistencia:</strong> Mensaje coherente across modalidades</li>
        <li><strong>Opcionalidad:</strong> Usuario puede elegir modalidad preferida</li>
      </ul>
      
      <p><strong>Ejemplo de flujo multimodal:</strong></p>
      <ol>
        <li>Usuario escribe pregunta por chat</li>
        <li>Avatar aparece en video respondiendo</li>
        <li>Audio sincronizado con gestos apropiados</li>
        <li>Elementos visuales apoyan la explicación</li>
        <li>Transcripción texto disponible</li>
        <li>Opción de continuar por voz o texto</li>
      </ol>
      
      <h3>Plataformas Integradas</h3>
      <ul>
        <li><strong>Synthesia + chatbot:</strong> Videos generados dinámicamente</li>
        <li><strong>HeyGen API:</strong> Avatares en aplicaciones web</li>
        <li><strong>D-ID Streaming:</strong> Avatares interactivos en tiempo real</li>
        <li><strong>Virtual Beings (Soul Machines):</strong> Avatares cognitivos completos</li>
      </ul>
      
      <h3>Consideraciones Técnicas</h3>
      <ul>
        <li>Latencia: equilibrio entre calidad y tiempo de respuesta</li>
        <li>Ancho de banda: streaming de video vs. animación local</li>
        <li>Dispositivos: adaptar a capacidades del endpoint</li>
        <li>Accesibilidad: alternativas para usuarios con discapacidad</li>
      </ul>

      <hr/>

      <h2>4.5. Ética, Seguridad y Futuro de los Asistentes Virtuales</h2>
      <h3>Consideraciones Éticas</h3>
      <p><strong>1. Transparencia:</strong></p>
      <ul>
        <li>Los usuarios deben saber que interactúan con un bot</li>
        <li>Evitar engaño sobre capacidades reales</li>
        <li>Clarificar limitaciones del sistema</li>
      </ul>
      
      <p><strong>2. Privacidad:</strong></p>
      <ul>
        <li>Minimizar recogida de datos personales</li>
        <li>Informar sobre uso de datos</li>
        <li>Permitir opt-out y eliminación</li>
        <li>Cumplir GDPR y regulaciones locales</li>
      </ul>
      
      <p><strong>3. Sesgo y equidad:</strong></p>
      <ul>
        <li>Auditar respuestas por sesgos discriminatorios</li>
        <li>Entrenar con datos diversos</li>
        <li>Monitorizar trato diferencial por grupo</li>
      </ul>
      
      <p><strong>4. Manipulación:</strong></p>
      <ul>
        <li>Evitar patrones oscuros (dark patterns)</li>
        <li>No explotar vulnerabilidades psicológicas</li>
        <li>Respetar autonomía del usuario</li>
      </ul>
      
      <p><strong>5. Dependencia:</strong></p>
      <ul>
        <li>Considerar impacto en habilidades humanas</li>
        <li>Diseñar para aumentar, no reemplazar</li>
        <li>Permitir desconexión</li>
      </ul>
      
      <h3>Seguridad</h3>
      <p><strong>1. Protección de datos:</strong></p>
      <ul>
        <li>Encriptación en tránsito y en reposo</li>
        <li>Control de acceso y autenticación</li>
        <li>Logs de auditoría</li>
      </ul>
      
      <p><strong>2. Prevención de abusos:</strong></p>
      <ul>
        <li>Rate limiting para evitar scraping</li>
        <li>Detección de intentos de jailbreak</li>
        <li>Filtrado de contenido malicioso</li>
      </ul>
      
      <p><strong>3. Seguridad en integraciones:</strong></p>
      <ul>
        <li>APIs seguras (OAuth, API keys)</li>
        <li>Validación de inputs</li>
        <li>Principio de mínimo privilegio</li>
      </ul>
      
      <p><strong>4. Continuidad del servicio:</strong></p>
      <ul>
        <li>Plan de fallback a agentes humanos</li>
        <li>Redundancia y alta disponibilidad</li>
        <li>Plan de recuperación ante desastres</li>
      </ul>
      
      <h3>Regulación Emergente</h3>
      <p><strong>EU AI Act:</strong></p>
      <ul>
        <li>Clasificación por nivel de riesgo</li>
        <li>Requisitos de transparencia para chatbots</li>
        <li>Prohibición de manipulación subliminal</li>
      </ul>
      
      <p><strong>Otras regulaciones:</strong></p>
      <ul>
        <li>GDPR para datos personales</li>
        <li>Sectoriales (banca, salud)</li>
        <li>Legislación nacional específica</li>
      </ul>
      
      <h3>Futuro de los Asistentes Virtuales</h3>
      <p><strong>Tendencias a corto plazo (1-2 años):</strong></p>
      <ul>
        <li>Asistentes más proactivos y contextuales</li>
        <li>Integración nativa en todas las aplicaciones</li>
        <li>Voz como interfaz principal</li>
        <li>Personalización extrema</li>
      </ul>
      
      <p><strong>Tendencias a medio plazo (3-5 años):</strong></p>
      <ul>
        <li>Agentes autónomos que ejecutan tareas</li>
        <li>Memoria a largo plazo entre sesiones</li>
        <li>Asistentes emocionalmente inteligentes</li>
        <li>Colaboración humano-IA fluida</li>
      </ul>
      
      <p><strong>Tendencias a largo plazo (5+ años):</strong></p>
      <ul>
        <li>Asistentes como extensiones cognitivas</li>
        <li>Interfaces cerebro-computadora</li>
        <li>Relaciones parasociales significativas</li>
        <li>Cuestiones de derechos y estatus moral</li>
      </ul>

      <hr/>

      <h2>4.6. Casos de Éxito</h2>
      <h3>1. Bank of America - Erica</h3>
      <p><strong>Descripción:</strong> Asistente virtual bancario lanzado en 2018.</p>
      <p><strong>Funcionalidades:</strong> Consultas de saldo, transferencias, consejos financieros, detección de fraude.</p>
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>1.5 mil millones de interacciones (2023)</li>
        <li>32+ millones de usuarios únicos</li>
        <li>Reducción del 30% en llamadas a call center</li>
        <li>CSAT de 4.5/5</li>
      </ul>
      <p><strong>Claves del éxito:</strong> Integración profunda con sistemas bancarios, utilidad real, mejora continua.</p>
      
      <h3>2. Domino's - Dom</h3>
      <p><strong>Descripción:</strong> Bot para pedidos de pizza a través de múltiples canales.</p>
      <p><strong>Funcionalidades:</strong> Pedidos por voz/texto, seguimiento, recompra rápida.</p>
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>60%+ de pedidos digitales</li>
        <li>Reducción de abandono de carrito</li>
        <li>Mayor frecuencia de compra</li>
      </ul>
      <p><strong>Claves del éxito:</strong> Fricción mínima, omnicanalidad, gamificación.</p>
      
      <h3>3. KLM - BlueBot (BB)</h3>
      <p><strong>Descripción:</strong> Asistente de atención al cliente en WhatsApp y Messenger.</p>
      <p><strong>Funcionalidades:</strong> Check-in, información de vuelos, cambios de reserva, FAQs.</p>
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>1.7+ millones de mensajes mensuales</li>
        <li>40% de resolución automática</li>
        <li>Reducción de tiempo de espera</li>
      </ul>
      <p><strong>Claves del éxito:</strong> Canal preferido del cliente, escalado fluido a humano, tono amigable.</p>
      
      <h3>4. Sephora - Virtual Artist</h3>
      <p><strong>Descripción:</strong> Asistente de belleza con realidad aumentada.</p>
      <p><strong>Funcionalidades:</strong> Prueba virtual de maquillaje, recomendaciones, tutoriales.</p>
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>200+ millones de pruebas virtuales</li>
        <li>11% más de conversión</li>
        <li>Mayor engagement en app</li>
      </ul>
      <p><strong>Claves del éxito:</strong> Tecnología diferenciadora, experiencia divertida, utilidad de compra.</p>
      
      <h3>5. Ada (Plataforma SaaS)</h3>
      <p><strong>Descripción:</strong> Plataforma de automatización de atención al cliente.</p>
      <p><strong>Clientes:</strong> Shopify, Zoom, Square, Slack.</p>
      <p><strong>Resultados típicos:</strong></p>
      <ul>
        <li>70%+ de tickets resueltos automáticamente</li>
        <li>ROI de 300%+ en primer año</li>
        <li>Reducción de costes del 40%</li>
      </ul>
      
      <h3>Lecciones Comunes</h3>
      <ul>
        <li>Empezar con caso de uso claro y acotado</li>
        <li>Integrar profundamente con sistemas existentes</li>
        <li>Diseñar para el usuario, no para la tecnología</li>
        <li>Medir y optimizar continuamente</li>
        <li>Mantener opción humana siempre disponible</li>
        <li>Comunicar claramente capacidades y limitaciones</li>
      </ul>
    `
  },
  {
    id: 5,
    slug: 'low-code-no-code',
    title: 'Módulo 5: Low-Code e IA',
    duration: '42 h',
    description: 'Automatización de procesos con MAKE e IA integrada.',
    longDescription: 'Introducción al movimiento No-Code y automatización avanzada de flujos de trabajo utilizando MAKE.',
    progress: 0,
    icon: Settings2,
    resources: [],
    content: `
      <h2>5.1. Introducción a Low-Code, No-Code e IA</h2>
      <h3>Definiciones</h3>
      <p><strong>No-Code:</strong> Plataformas que permiten crear aplicaciones y automatizaciones sin escribir código, usando interfaces visuales.</p>
      <p><strong>Low-Code:</strong> Entornos de desarrollo que requieren mínima programación, combinando componentes visuales con código personalizado.</p>
      <p><strong>IA en automatización:</strong> Uso de inteligencia artificial para potenciar flujos de trabajo (procesamiento de texto, imágenes, decisiones).</p>
      
      <h3>Historia y Evolución</h3>
      <p><strong>1980s-1990s:</strong> Primeras herramientas de desarrollo rápido (Visual Basic, Delphi).</p>
      <p><strong>2000s:</strong> Plataformas de formularios y workflows (SharePoint, Salesforce).</p>
      <p><strong>2010s:</strong> Boom del No-Code (Zapier, Airtable, Webflow).</p>
      <p><strong>2020s:</strong> Integración de IA en plataformas No-Code.</p>
      
      <h3>Beneficios del Enfoque No-Code/Low-Code</h3>
      <ul>
        <li><strong>Velocidad:</strong> Desarrollo 10x más rápido que código tradicional</li>
        <li><strong>Accesibilidad:</strong> Ciudadanos desarrolladores (no programadores)</li>
        <li><strong>Coste:</strong> Reducción de 50-80% en costes de desarrollo</li>
        <li><strong>Flexibilidad:</strong> Iteración y cambios rápidos</li>
        <li><strong>Integración:</strong> Conectores prebuilt a servicios populares</li>
      </ul>
      
      <h3>Casos de Uso Típicos</h3>
      <ul>
        <li>Automatización de procesos repetitivos</li>
        <li>Integración entre aplicaciones SaaS</li>
        <li>Prototipado rápido de aplicaciones</li>
        <li>Workflows de aprobación y notificación</li>
        <li>Recogida y procesamiento de datos</li>
        <li>Reportes y dashboards automáticos</li>
      </ul>
      
      <h3>Principales Plataformas</h3>
      <p><strong>Automatización:</strong></p>
      <ul>
        <li>MAKE (antes Integromat)</li>
        <li>Zapier</li>
        <li>n8n</li>
        <li>Microsoft Power Automate</li>
      </ul>
      
      <p><strong>Desarrollo de Apps:</strong></p>
      <ul>
        <li>Bubble</li>
        <li>Glide</li>
        <li>Softr</li>
        <li>Adalo</li>
      </ul>
      
      <p><strong>Bases de Datos:</strong></p>
      <ul>
        <li>Airtable</li>
        <li>Notion</li>
        <li>Coda</li>
      </ul>
      
      <p><strong>Websites:</strong></p>
      <ul>
        <li>Webflow</li>
        <li>Framer</li>
        <li>Wix</li>
      </ul>
      
      <h3>IA en Plataformas No-Code</h3>
      <p><strong>Capacidades disponibles:</strong></p>
      <ul>
        <li>Procesamiento de lenguaje natural</li>
        <li>Generación de texto y contenido</li>
        <li>Análisis de sentimientos</li>
        <li>Clasificación y etiquetado automático</li>
        <li>Extracción de datos de documentos</li>
        <li>Generación y análisis de imágenes</li>
        <li>Transcripción de audio</li>
      </ul>
      
      <h3>Cuándo Usar No-Code vs. Código Tradicional</h3>
      <p><strong>No-Code es ideal para:</strong></p>
      <ul>
        <li>Prototipos y MVPs</li>
        <li>Automatizaciones internas</li>
        <li>Integraciones entre SaaS</li>
        <li>Procesos con requisitos estables</li>
      </ul>
      
      <p><strong>Código tradicional es necesario para:</strong></p>
      <ul>
        <li>Alta escalabilidad (millones de usuarios)</li>
        <li>Requisitos de seguridad críticos</li>
        <li>Algoritmos complejos personalizados</li>
        <li>Integraciones con sistemas legacy</li>
      </ul>

      <hr/>

      <h2>5.2. Automatización de Procesos con MAKE</h2>
      <h3>¿Qué es MAKE?</h3>
      <p>MAKE (antes Integromat) es una plataforma de automatización visual que conecta aplicaciones y servicios para crear flujos de trabajo automatizados.</p>
      
      <h3>Conceptos Fundamentales</h3>
      <p><strong>Scenario:</strong> Un flujo de trabajo automatizado completo.</p>
      <p><strong>Module:</strong> Un paso individual en el escenario (trigger o action).</p>
      <p><strong>Trigger:</strong> Evento que inicia el escenario (ej: nuevo email, formulario enviado).</p>
      <p><strong>Action:</strong> Operación que ejecuta el escenario (ej: crear fila, enviar mensaje).</p>
      <p><strong>Connection:</strong> Autenticación con una aplicación externa.</p>
      <p><strong>Operation:</strong> Cada ejecución individual de un módulo.</p>
      
      <h3>Tipos de Módulos</h3>
      <p><strong>1. Triggers:</strong></p>
      <ul>
        <li>Instantáneos (webhooks)</li>
        <li>Programados (polling cada X tiempo)</li>
        <li>Manuales (ejecución bajo demanda)</li>
      </ul>
      
      <p><strong>2. Actions:</strong></p>
      <ul>
        <li>Crear registros</li>
        <li>Actualizar registros</li>
        <li>Eliminar registros</li>
        <li>Buscar datos</li>
      </ul>
      
      <p><strong>3. Search:</strong></p>
      <ul>
        <li>Buscar registros existentes</li>
        <li>Verificar existencia</li>
      </ul>
      
      <p><strong>4. Aggregator:</strong></p>
      <ul>
        <li>Agrupar múltiples resultados</li>
        <li>Crear arrays de datos</li>
      </ul>
      
      <p><strong>5. Iterator:</strong></p>
      <ul>
        <li>Procesar elementos individualmente</li>
        <li>Bucles sobre arrays</li>
      </ul>
      
      <h3>Funciones y Fórmulas</h3>
      <p><strong>Manipulación de texto:</strong></p>
      <pre>
concat(text1; text2)
lowercase(text)
uppercase(text)
length(text)
substring(text; start; length)
replace(text; search; replace)
      </pre>
      
      <p><strong>Manipulación de fechas:</strong></p>
      <pre>
now()
today()
addDays(date; days)
formatDate(date; format)
parseDate(text; format)
      </pre>
      
      <p><strong>Lógica:</strong></p>
      <pre>
if(condition; then; else)
and(condition1; condition2)
or(condition1; condition2)
not(condition)
      </pre>
      
      <p><strong>Matemáticas:</strong></p>
      <pre>
round(number; decimals)
sum(array)
average(array)
min(array)
max(array)
      </pre>
      
      <h3>Filtros y Routers</h3>
      <p><strong>Filtros:</strong> Condicionales que determinan si un módulo se ejecuta.</p>
      <pre>Ejemplo: Solo continuar si "Estado" = "Aprobado"</pre>
      
      <p><strong>Router:</strong> Divide el flujo en múltiples caminos.</p>
      <ul>
        <li>Router automático (todos los caminos)</li>
        <li>Router con filtros (caminos condicionales)</li>
      </ul>
      
      <h3>Manejo de Errores</h3>
      <p><strong>Directivas de error:</strong></p>
      <ul>
        <li>Break: Detener escenario</li>
        <li>Ignore: Continuar sin hacer nada</li>
        <li>Resume: Continuar con valores por defecto</li>
        <li>Rollback: Revertir operaciones anteriores</li>
      </ul>
      
      <p><strong>Mejores prácticas:</strong></p>
      <ul>
        <li>Configurar notificaciones de error</li>
        <li>Implementar reintentos automáticos</li>
        <li>Loggear errores para debugging</li>
        <li>Tener escenarios de fallback</li>
      </ul>
      
      <h3>Escenarios de Ejemplo</h3>
      <p><strong>1. Automatización de leads:</strong></p>
      <ol>
        <li>Trigger: Nuevo lead en Facebook Ads</li>
        <li>Añadir lead en Google Sheets</li>
        <li>Enviar email de bienvenida (Gmail)</li>
        <li>Crear contacto en CRM (HubSpot)</li>
        <li>Notificar al equipo (Slack)</li>
      </ol>
      
      <p><strong>2. Procesamiento de pedidos:</strong></p>
      <ol>
        <li>Trigger: Nuevo pedido en Shopify</li>
        <li>Verificar stock en inventario</li>
        <li>Si hay stock → crear envío</li>
        <li>Enviar confirmación al cliente</li>
        <li>Actualizar contabilidad</li>
      </ol>
      
      <p><strong>3. Gestión de contenido:</strong></p>
      <ol>
        <li>Trigger: Nuevo artículo en WordPress</li>
        <li>Generar resumen con IA</li>
        <li>Crear post en redes sociales</li>
        <li>Enviar newsletter a suscriptores</li>
        <li>Actualizar base de datos de contenidos</li>
      </ol>
      
      <h3>Optimización y Mejores Prácticas</h3>
      <ul>
        <li>Usar webhooks en lugar de polling cuando sea posible</li>
        <li>Agrupar operaciones para reducir operations count</li>
        <li>Implementar deduplicación de datos</li>
        <li>Documentar escenarios con notas</li>
        <li>Usar nombres descriptivos en módulos</li>
        <li>Versionar escenarios críticos</li>
        <li>Monitorizar consumo de operations</li>
      </ul>

      <hr/>

      <h2>5.3. Integración de IA en MAKE</h2>
      <h3>Conectores de IA Disponibles</h3>
      <p><strong>OpenAI:</strong></p>
      <ul>
        <li>Completions (GPT-3.5, GPT-4)</li>
        <li>DALL-E (generación de imágenes)</li>
        <li>Whisper (transcripción de audio)</li>
        <li>Moderation (filtrado de contenido)</li>
      </ul>
      
      <p><strong>Google AI:</strong></p>
      <ul>
        <li>Gemini Pro (texto)</li>
        <li>Gemini Pro Vision (imágenes)</li>
        <li>Traducción</li>
      </ul>
      
      <p><strong>Anthropic:</strong></p>
      <ul>
        <li>Claude (texto)</li>
      </ul>
      
      <p><strong>Otras plataformas:</strong></p>
      <ul>
        <li>Midjourney (imágenes) - vía API no oficial</li>
        <li>Stability AI (imágenes)</li>
        <li>ElevenLabs (texto a voz)</li>
        <li>Azure Cognitive Services</li>
      </ul>
      
      <h3>Casos de Uso de IA en Automatizaciones</h3>
      <p><strong>1. Procesamiento de texto:</strong></p>
      <ul>
        <li>Resumir documentos largos</li>
        <li>Extraer información clave</li>
        <li>Clasificar emails por categoría</li>
        <li>Generar respuestas automáticas</li>
        <li>Traducir contenido</li>
      </ul>
      
      <p><strong>2. Generación de contenido:</strong></p>
      <ul>
        <li>Escribir posts de blog</li>
        <li>Crear descripciones de producto</li>
        <li>Generar emails de marketing</li>
        <li>Producir contenido para redes sociales</li>
      </ul>
      
      <p><strong>3. Análisis de datos:</strong></p>
      <ul>
        <li>Analizar sentimientos de reviews</li>
        <li>Extraer insights de encuestas</li>
        <li>Identificar patrones en datos</li>
        <li>Generar reportes narrativos</li>
      </ul>
      
      <p><strong>4. Procesamiento de imágenes:</strong></p>
      <ul>
        <li>Generar imágenes para contenido</li>
        <li>Analizar contenido de imágenes</li>
        <li>Crear variaciones de diseños</li>
      </ul>
      
      <p><strong>5. Automatización de código:</strong></p>
      <ul>
        <li>Generar código a partir de especificaciones</li>
        <li>Documentar código existente</li>
        <li>Depurar y sugerir mejoras</li>
      </ul>
      
      <h3>Ejemplos Prácticos</h3>
      <p><strong>Ejemplo 1: Clasificación automática de tickets de soporte</strong></p>
      <ol>
        <li>Trigger: Nuevo ticket en Zendesk</li>
        <li>Módulo OpenAI: Analizar texto del ticket</li>
        <li>Prompt: "Clasifica este ticket en: Técnico, Ventas, Facturación, Otro. Responde solo con la categoría."</li>
        <li>Router: Diferentes caminos según categoría</li>
        <li>Asignar al equipo correspondiente</li>
        <li>Enviar notificación</li>
      </ol>
      
      <p><strong>Ejemplo 2: Generación de contenido para redes sociales</strong></p>
      <ol>
        <li>Trigger: Nuevo producto en Shopify</li>
        <li>Módulo OpenAI: Generar post para Instagram</li>
        <li>Prompt: "Crea un post atractivo para Instagram sobre [producto]. Incluye emojis y 5 hashtags relevantes."</li>
        <li>Módulo DALL-E: Generar imagen del producto</li>
        <li>Guardar en Google Drive</li>
        <li>Programar post en Buffer</li>
      </ol>
      
      <p><strong>Ejemplo 3: Resumen de reuniones</strong></p>
      <ol>
        <li>Trigger: Nueva grabación en Zoom</li>
        <li>Módulo Whisper: Transcribir audio a texto</li>
        <li>Módulo OpenAI: Resumir transcripción</li>
        <li>Prompt: "Resume esta reunión en 5 puntos clave y lista de acciones con responsables."</li>
        <li>Enviar resumen por email a participantes</li>
        <li>Crear tareas en Asana/Trello</li>
      </ol>
      
      <p><strong>Ejemplo 4: Procesamiento de facturas</strong></p>
      <ol>
        <li>Trigger: Nuevo email con adjunto en Gmail</li>
        <li>Módulo OpenAI Vision: Analizar factura (PDF/imagen)</li>
        <li>Extraer: proveedor, fecha, importe, IVA</li>
        <li>Crear registro en contabilidad</li>
        <li>Guardar en carpeta de proveedores</li>
        <li>Notificar si importe > umbral</li>
      </ol>
      
      <h3>Prompt Engineering para Automatizaciones</h3>
      <p><strong>Mejores prácticas específicas:</strong></p>
      <ul>
        <li>Ser extremadamente específico en el formato de salida</li>
        <li>Usar ejemplos en el prompt (few-shot)</li>
        <li>Validar salida antes de continuar el flujo</li>
        <li>Manejar casos edge explícitamente</li>
        <li>Limitar longitud de respuesta para ahorrar tokens</li>
      </ul>
      
      <p><strong>Ejemplo de prompt robusto:</strong></p>
      <pre>
"Analiza el siguiente email de cliente y extrae:
1. Sentimiento (Positivo/Neutral/Negativo)
2. Categoría (Consulta/Reclamación/Felicitación)
3. Urgencia (Baja/Media/Alta)
4. Resumen en 1 frase

Responde EXACTAMENTE en este formato JSON:
{
  "sentimiento": "...",
  "categoria": "...",
  "urgencia": "...",
  "resumen": "..."
}

Email: {{email_text}}
      </pre>
      
      <h3>Gestión de Costes</h3>
      <ul>
        <li>Monitorizar uso de tokens</li>
        <li>Usar modelos más económicos cuando sea posible (GPT-3.5 vs GPT-4)</li>
        <li>Implementar caching de respuestas comunes</li>
        <li>Limitar longitud de prompts y respuestas</li>
        <li>Configurar alertas de gasto</li>
      </ul>

      <hr/>

      <h2>5.4. Proyectos Avanzados y Casos de Uso</h2>
      <h3>Proyecto 1: Sistema Completo de Onboarding de Empleados</h3>
      <p><strong>Objetivo:</strong> Automatizar todo el proceso de incorporación de nuevos empleados.</p>
      
      <p><strong>Flujo completo:</strong></p>
      <ol>
        <li>Trigger: Nuevo empleado en sistema de RRHH</li>
        <li>Crear cuenta de correo (Google Workspace)</li>
        <li>Crear usuario en sistemas internos</li>
        <li>Asignar licencias de software</li>
        <li>Enviar email de bienvenida personalizado con IA</li>
        <li>Agendar reuniones de onboarding (Calendly)</li>
        <li>Asignar cursos en plataforma de formación</li>
        <li>Crear tareas para manager y buddy</li>
        <li>Programar check-ins automáticos (día 1, semana 1, mes 1)</li>
        <li>Recoger feedback y ajustar proceso</li>
      </ol>
      
      <p><strong>IA integrada:</strong></p>
      <ul>
        <li>Generar email personalizado basado en rol y departamento</li>
        <li>Crear plan de onboarding adaptado</li>
        <li>Responder preguntas frecuentes del nuevo empleado</li>
      </ul>
      
      <h3>Proyecto 2: Pipeline de Marketing de Contenidos</h3>
      <p><strong>Objetivo:</strong> Automatizar creación y distribución de contenido.</p>
      
      <p><strong>Flujo completo:</strong></p>
      <ol>
        <li>Trigger: Tema aprobado en Airtable</li>
        <li>IA genera outline del artículo</li>
        <li>Redactor revisa y completa</li>
        <li>IA optimiza para SEO</li>
        <li>Publicar en WordPress</li>
        <li>IA genera resumen para newsletter</li>
        <li>IA crea posts para cada red social</li>
        <li>IA genera imágenes para cada post</li>
        <li>Programar publicación en buffers</li>
        <li>Monitorizar engagement y reportar</li>
      </ol>
      
      <h3>Proyecto 3: Sistema de Soporte al Cliente Inteligente</h3>
      <p><strong>Objetivo:</strong> Maximizar resolución automática de tickets.</p>
      
      <p><strong>Flujo completo:</strong></p>
      <ol>
        <li>Trigger: Nuevo ticket (email, web, chat)</li>
        <li>IA clasifica categoría y urgencia</li>
        <li>IA intenta resolver automáticamente</li>
        <li>Si resuelto → enviar respuesta y cerrar</li>
        <li>Si no resuelto → asignar al agente adecuado</li>
        <li>IA sugiere respuesta al agente</li>
        <li>Agente revisa y envía</li>
        <li>IA analiza satisfacción post-resolución</li>
        <li>Actualizar base de conocimiento</li>
      </ol>
      
      <h3>Proyecto 4: Monitorización Competitiva Automatizada</h3>
      <p><strong>Objetivo:</strong> Seguir actividad de competidores automáticamente.</p>
      
      <p><strong>Flujo completo:</strong></p>
      <ol>
        <li>Trigger programado: Diario/semanal</li>
        <li>Scraping de webs de competidores</li>
        <li>Monitorizar redes sociales</li>
        <li>IA resume cambios y novedades</li>
        <li>IA analiza sentimiento de reviews</li>
        <li>Identificar tendencias emergentes</li>
        <li>Generar reporte ejecutivo</li>
        <li>Enviar al equipo de estrategia</li>
        <li>Actualizar dashboard competitivo</li>
      </ol>
      
      <h3>Proyecto 5: Gestión Inteligente de Inventarios</h3>
      <p><strong>Objetivo:</strong> Optimizar stock con predicción de demanda.</p>
      
      <p><strong>Flujo completo:</strong></p>
      <ol>
        <li>Trigger: Diario</li>
        <li>Recoger datos de ventas históricas</li>
        <li>IA predice demanda próxima semana/mes</li>
        <li>Comparar con stock actual</li>
        <li>Generar órdenes de compra sugeridas</li>
        <li>Enviar para aprobación</li>
        <li>Si aprobado → crear orden en sistema proveedor</li>
        <li>Monitorizar entrega</li>
        <li>Ajustar predicciones con datos reales</li>
      </ol>
      
      <h3>Consideraciones para Proyectos Avanzados</h3>
      <p><strong>Escalabilidad:</strong></p>
      <ul>
        <li>Diseñar para volumen creciente</li>
        <li>Implementar colas y procesamiento asíncrono</li>
        <li>Monitorizar límites de API</li>
      </ul>
      
      <p><strong>Fiabilidad:</strong></p>
      <ul>
        <li>Implementar retries con backoff exponencial</li>
        <li>Tener circuit breakers</li>
        <li>Alertas proactivas de fallos</li>
      </ul>
      
      <p><strong>Mantenibilidad:</strong></p>
      <ul>
        <li>Documentar todos los escenarios</li>
        <li>Usar naming conventions</li>
        <li>Versionar cambios importantes</li>
        <li>Tener entornos de testing</li>
      </ul>
      
      <p><strong>Seguridad:</strong></p>
      <ul>
        <li>Minimizar permisos de conexiones</li>
        <li>Encriptar datos sensibles</li>
        <li>Auditar accesos regularmente</li>
      </ul>
    `
  },
  {
    id: 6,
    slug: 'marketing-ia',
    title: 'Módulo 6: Marketing con IA',
    duration: '24 h',
    description: 'SEO, SEM, Funnels y Redes Sociales con IA.',
    longDescription: 'Aplicación de la inteligencia artificial para optimizar el posicionamiento, la conversión y la gestión de comunidades.',
    progress: 0,
    icon: Megaphone,
    resources: [],
    content: `
      <h2>6.1. Fundamentos de la Inteligencia Artificial en Marketing</h2>
      <h3>¿Por qué IA en Marketing?</h3>
      <p>El marketing genera cantidades masivas de datos que la IA puede analizar y optimizar mejor que humanos:</p>
      <ul>
        <li>Comportamiento de usuarios en tiempo real</li>
        <li>Múltiples canales y touchpoints</li>
        <li>Personalización a escala</li>
        <li>Predicción de tendencias y conversión</li>
      </ul>
      
      <h3>Áreas de Aplicación</h3>
      <p><strong>1. Concienciación (Awareness):</strong></p>
      <ul>
        <li>Generación de contenido</li>
        <li>SEO y posicionamiento</li>
        <li>Publicidad programática</li>
        <li>Influencer matching</li>
      </ul>
      
      <p><strong>2. Consideración:</strong></p>
      <ul>
        <li>Personalización de mensajes</li>
        <li>Recomendaciones de producto</li>
        <li>Chatbots de ventas</li>
        <li>Lead scoring</li>
      </ul>
      
      <p><strong>3. Conversión:</strong></p>
      <ul>
        <li>Optimización de precios</li>
        <li>Predicción de abandono de carrito</li>
        <li>Ofertas personalizadas</li>
        <li>Optimización de checkout</li>
      </ul>
      
      <p><strong>4. Retención:</strong></p>
      <ul>
        <li>Predicción de churn</li>
        <li>Campañas de re-engagement</li>
        <li>Programas de fidelización</li>
        <li>Soporte automatizado</li>
      </ul>
      
      <h3>Herramientas Principales</h3>
      <p><strong>Generación de contenido:</strong> Jasper, Copy.ai, Writesonic, Claude, GPT-4.</p>
      <p><strong>SEO:</strong> Surfer SEO, Frase, MarketMuse, Clearscope.</p>
      <p><strong>Publicidad:</strong> Google Ads Smart Bidding, Meta Advantage+, Albert.ai.</p>
      <p><strong>Email marketing:</strong> Seventh Sense, Phrasee, Persado.</p>
      <p><strong>Analítica:</strong> Google Analytics 4, Adobe Sensei, Mixpanel.</p>
      <p><strong>Personalización:</strong> Dynamic Yield, Optimizely, Evergage.</p>
      
      <h3>Beneficios Cuantificables</h3>
      <ul>
        <li>40% más de engagement en contenidos generados con IA</li>
        <li>30% reducción en coste de adquisición (CAC)</li>
        <li>50% más de eficiencia en creación de contenido</li>
        <li>20% aumento en tasas de conversión</li>
        <li>60% reducción en tiempo de campaña</li>
      </ul>
      
      <h3>Desafíos y Consideraciones</h3>
      <ul>
        <li>Calidad y autenticidad del contenido</li>
        <li>Privacidad y uso de datos</li>
        <li>Sesgo en segmentación</li>
        <li>Transparencia con la audiencia</li>
        <li>Equilibrio entre automatización y toque humano</li>
      </ul>

      <hr/>

      <h2>6.2. IA para SEO y SEM</h2>
      <h3>IA en SEO (Search Engine Optimization)</h3>
      <p><strong>1. Investigación de Keywords:</strong></p>
      <ul>
        <li>Herramientas: Ahrefs, SEMrush, Moz con IA</li>
        <li>Descubrimiento de long-tail keywords</li>
        <li>Análisis de intención de búsqueda</li>
        <li>Predicción de dificultad y oportunidad</li>
      </ul>
      
      <p><strong>2. Optimización de Contenido:</strong></p>
      <ul>
        <li><strong>Surfer SEO:</strong> Analiza top 10 resultados y sugiere optimizaciones</li>
        <li><strong>Frase:</strong> Genera briefs y optimiza contenido existente</li>
        <li><strong>MarketMuse:</strong> Identifica gaps de contenido</li>
        <li><strong>Clearscope:</strong> Sugiere términos relacionados</li>
      </ul>
      
      <p><strong>3. Generación de Contenido:</strong></p>
      <ul>
        <li>IA escribe borradores optimizados</li>
        <li>Generación de meta titles y descriptions</li>
        <li>Creación de FAQs estructuradas</li>
        <li>Escalado de contenido para landing pages</li>
      </ul>
      
      <p><strong>4. SEO Técnico:</strong></p>
      <ul>
        <li>Detección automática de errores</li>
        <li>Optimización de velocidad</li>
        <li>Generación de schema markup</li>
        <li>Monitorización de rankings</li>
      </ul>
      
      <p><strong>5. Link Building:</strong></p>
      <ul>
        <li>Identificación de oportunidades</li>
        <li>Outreach personalizado con IA</li>
        <li>Análisis de calidad de backlinks</li>
      </ul>
      
      <h3>Workflow de SEO con IA</h3>
      <ol>
        <li>Investigación de keywords con IA</li>
        <li>Análisis de competencia automatizado</li>
        <li>Generación de brief de contenido</li>
        <li>Redacción asistida por IA</li>
        <li>Optimización on-page con herramientas IA</li>
        <li>Publicación y indexación</li>
        <li>Monitorización de rankings</li>
        <li>Optimización iterativa basada en datos</li>
      </ol>
      
      <h3>IA en SEM (Search Engine Marketing)</h3>
      <p><strong>1. Smart Bidding de Google Ads:</strong></p>
      <ul>
        <li>Target CPA (coste por adquisición)</li>
        <li>Target ROAS (retorno de inversión)</li>
        <li>Maximize conversions</li>
        <li>Enhanced CPC (coste por clic)</li>
      </ul>
      
      <p><strong>2. Optimización de Anuncios:</strong></p>
      <ul>
        <li>Generación automática de headlines</li>
        <li>Responsive search ads</li>
        <li>Adaptación de mensajes por audiencia</li>
        <li>Testing multivariante automatizado</li>
      </ul>
      
      <p><strong>3. Segmentación:</strong></p>
      <ul>
        <li>Audiencias similares (lookalikes)</li>
        <li>In-market audiences</li>
        <li>Custom intent audiences</li>
        <li>Predictive audiences</li>
      </ul>
      
      <p><strong>4. Meta Advantage+:</strong></p>
      <ul>
        <li>Optimización automática de placement</li>
        <li>Targeting automatizado</li>
        <li>Creative optimization</li>
        <li>Budget optimization entre audiencias</li>
      </ul>
      
      <h3>Mejores Prácticas SEM con IA</h3>
      <ul>
        <li>Dar suficiente data al algoritmo (50+ conversiones/mes)</li>
        <li>No sobre-optimizar manualmente</li>
        <li>Usar broad match con smart bidding</li>
        <li>Implementar conversion tracking preciso</li>
        <li>Testear diferentes estrategias de bidding</li>
        <li>Monitorizar search terms regularmente</li>
      </ul>

      <hr/>

      <h2>6.3. Embudos de Conversión (Funnels) y CRO con IA</h2>
      <h3>Optimización de Embudos con IA</h3>
      <p><strong>1. Análisis del Funnel:</strong></p>
      <ul>
        <li>Identificación de puntos de fuga</li>
        <li>Segmentación de usuarios por comportamiento</li>
        <li>Predicción de probabilidad de conversión</li>
        <li>Atribución multicanal</li>
      </ul>
      
      <p><strong>2. Personalización del Journey:</strong></p>
      <ul>
        <li>Contenido dinámico según etapa del funnel</li>
        <li>Mensajes adaptados a perfil del usuario</li>
        <li>Ofertas personalizadas en tiempo real</li>
        <li>Timing óptimo de comunicaciones</li>
      </ul>
      
      <p><strong>3. Lead Scoring:</strong></p>
      <ul>
        <li>IA predice probabilidad de conversión</li>
        <li>Priorización de leads para ventas</li>
        <li>Identificación de señales de compra</li>
        <li>Trigger de acciones automatizadas</li>
      </ul>
      
      <h3>CRO (Conversion Rate Optimization) con IA</h3>
      <p><strong>1. Testing Automatizado:</strong></p>
      <ul>
        <li><strong>Optimizely:</strong> Testing multivariante con IA</li>
        <li><strong>Google Optimize:</strong> Experimentos automatizados</li>
        <li><strong>VWO:</strong> SmartStats con probabilidad bayesiana</li>
      </ul>
      
      <p><strong>2. Heatmaps y Session Recording:</strong></p>
      <ul>
        <li><strong>Hotjar:</strong> Análisis de comportamiento</li>
        <li><strong>Crazy Egg:</strong> Mapas de calor con IA</li>
        <li><strong>Microsoft Clarity:</strong> Detección automática de problemas</li>
      </ul>
      
      <p><strong>3. Optimización de Landing Pages:</strong></p>
      <ul>
        <li>IA genera variaciones de copy</li>
        <li>Testing automático de layouts</li>
        <li>Personalización dinámica de elementos</li>
        <li>Optimización de formularios</li>
      </ul>
      
      <p><strong>4. Recuperación de Carrito:</strong></p>
      <ul>
        <li>Predicción de abandono</li>
        <li>Trigger de emails/SMS en momento óptimo</li>
        <li>Ofertas personalizadas de recuperación</li>
        <li>Chatbots de asistencia en checkout</li>
      </ul>
      
      <h3>Herramientas de CRO con IA</h3>
      <table>
        <tr><th>Herramienta</th><th>Función</th><th>IA aplicada</th></tr>
        <tr><td>Optimizely</td><td>Testing</td><td>Auto-segmentación</td></tr>
        <tr><td>Dynamic Yield</td><td>Personalización</td><td>Recomendaciones</td></tr>
        <tr><td>Hotjar</td><td>Analytics</td><td>Detección de patrones</td></tr>
        <tr><td>Unbounce</td><td>Landing pages</td><td>Smart Traffic</td></tr>
        <tr><td>Convertflow</td><td>Popups</td><td>Targeting inteligente</td></tr>
      </table>
      
      <h3>Métricas Clave a Monitorizar</h3>
      <ul>
        <li>Tasa de conversión por etapa</li>
        <li>Tiempo en cada etapa</li>
        <li>Drop-off rate</li>
        <li>Customer Lifetime Value (CLV)</li>
        <li>Coste de Adquisición (CAC)</li>
        <li>ROI por canal</li>
      </ul>

      <hr/>

      <h2>6.4. Redes Sociales e IA</h2>
      <h3>Generación de Contenido para Redes</h3>
      <p><strong>1. Copywriting:</strong></p>
      <ul>
        <li>IA genera posts completos</li>
        <li>Adaptación de tono por plataforma</li>
        <li>Generación de variaciones para testing</li>
        <li>Optimización de hashtags</li>
      </ul>
      
      <p><strong>2. Imágenes y Video:</strong></p>
      <ul>
        <li>DALL-E 3, Midjourney para gráficos</li>
        <li>Canva AI para diseños</li>
        <li>Runway, Pika para videos</li>
        <li>CapCut AI para edición</li>
      </ul>
      
      <h3>Gestión y Programación</h3>
      <p><strong>1. Herramientas con IA:</strong></p>
      <ul>
        <li><strong>Buffer:</strong> Optimización de timing</li>
        <li><strong>Hootsuite:</strong> Sugerencias de contenido</li>
        <li><strong>Later:</strong> Best time to post</li>
        <li><strong>Sprout Social:</strong> Análisis de sentimiento</li>
      </ul>
      
      <p><strong>2. Optimización de Posting:</strong></p>
      <ul>
        <li>IA analiza cuándo tu audiencia está activa</li>
        <li>Programación automática en momentos óptimos</li>
        <li>Frecuencia ideal por plataforma</li>
        <li>A/B testing de horarios</li>
      </ul>
      
      <h3>Community Management con IA</h3>
      <p><strong>1. Moderación:</strong></p>
      <ul>
        <li>Detección automática de spam</li>
        <li>Filtrado de comentarios ofensivos</li>
        <li>Identificación de trolls</li>
        <li>Alertas de crisis de reputación</li>
      </ul>
      
      <p><strong>2. Respuestas:</strong></p>
      <ul>
        <li>Chatbots para preguntas frecuentes</li>
        <li>Sugerencias de respuesta para CM</li>
        <li>Clasificación de mensajes por urgencia</li>
        <li>Escalado automático a humano</li>
      </ul>
      
      <p><strong>3. Engagement:</strong></p>
      <ul>
        <li>Identificación de super-fans</li>
        <li>Detección de oportunidades de interacción</li>
        <li>Segmentación de audiencia</li>
        <li>Personalización de respuestas</li>
      </ul>
      
      <h3>Análisis y Reporting</h3>
      <p><strong>1. Métricas automatizadas:</strong></p>
      <ul>
        <li>Reach e impresiones</li>
        <li>Engagement rate</li>
        <li>Crecimiento de seguidores</li>
        <li>Click-through rate</li>
        <li>Conversiones atribuidas</li>
      </ul>
      
      <p><strong>2. Insights con IA:</strong></p>
      <ul>
        <li>Tendencias emergentes</li>
        <li>Contenido de mayor rendimiento</li>
        <li>Mejores prácticas por industria</li>
        <li>Benchmarking competitivo</li>
      </ul>
      
      <h3>Publicidad en Redes Sociales</h3>
      <p><strong>1. Meta Ads (Facebook/Instagram):</strong></p>
      <ul>
        <li>Advantage+ shopping campaigns</li>
        <li>Automated app events</li>
        <li>Dynamic ads</li>
        <li>Creative hub con IA</li>
      </ul>
      
      <p><strong>2. TikTok Ads:</strong></p>
      <ul>
        <li>Smart Performance Campaign</li>
        <li>Automated creative optimization</li>
        <li>Auto-targeting</li>
      </ul>
      
      <p><strong>3. LinkedIn Ads:</strong></p>
      <ul>
        <li>Audience expansion</li>
        <li>Automated bidding</li>
        <li>Content suggestions</li>
      </ul>
      
      <h3>Tendencias 2025</h3>
      <ul>
        <li>Contenido generado por IA más auténtico</li>
        <li>Influencers virtuales</li>
        <li>Personalización hiper-granular</li>
        <li>Social commerce con IA</li>
        <li>Video short-form dominante</li>
        <li>Integración de AR/VR</li>
      </ul>
    `
  },
  {
    id: 7,
    slug: 'etica-privacidad',
    title: 'Módulo 7: Ética y Privacidad',
    duration: '24 h',
    description: 'Legislación, GDPR y el nuevo reglamento europeo.',
    longDescription: 'Análisis de sesgos, protección de datos y el marco legal de la IA en la Unión Europea.',
    progress: 0,
    icon: ShieldCheck,
    resources: [],
    content: `
      <h2>7.1. Ética en la IA: Sesgos algorítmicos, discriminación, transparencia, explicabilidad (XAI)</h2>
      <h3>Sesgos Algorítmicos</h3>
      <p><strong>¿Qué es el sesgo algorítmico?</strong></p>
      <p>El sesgo algorítmico ocurre cuando un sistema de IA produce resultados sistemáticamente prejudiciales para ciertos grupos de personas.</p>
      
      <p><strong>Fuentes de sesgo:</strong></p>
      <ul>
        <li><strong>Datos de entrenamiento:</strong> Datos históricos que reflejan desigualdades pasadas</li>
        <li><strong>Diseño del algoritmo:</strong> Decisiones técnicas que priorizan ciertas métricas</li>
        <li><strong>Definición del problema:</strong> Cómo se enmarca el objetivo a optimizar</li>
        <li><strong>Equipo de desarrollo:</strong> Falta de diversidad en perspectivas</li>
      </ul>
      
      <p><strong>Ejemplos reales:</strong></p>
      <ul>
        <li><strong>Amazon Hiring:</strong> Sistema descartaba CVs de mujeres para roles técnicos</li>
        <li><strong>COMPAS:</strong> Algoritmo de riesgo criminal más severo con personas negras</li>
        <li><strong>Apple Card:</strong> Límites de crédito más bajos para mujeres</li>
        <li><strong>Reconocimiento facial:</strong> Mayor tasa de error con personas de color</li>
      </ul>
      
      <p><strong>Tipos de sesgo:</strong></p>
      <ul>
        <li><strong>Sesgo de representación:</strong> Datos no representan a toda la población</li>
        <li><strong>Sesgo de medición:</strong> Variables proxy imperfectas</li>
        <li><strong>Sesgo de evaluación:</strong> Métricas que no consideran equidad</li>
        <li><strong>Sesgo de despliegue:</strong> Uso en contexto diferente al diseñado</li>
      </ul>
      
      <h3>Discriminación</h3>
      <p><strong>Formas de discriminación algorítmica:</strong></p>
      <ul>
        <li><strong>Discriminación directa:</strong> Uso explícito de atributos protegidos</li>
        <li><strong>Discriminación indirecta:</strong> Variables proxy correlacionadas</li>
        <li><strong>Discriminación por impacto:</strong> Resultados desproporcionados</li>
      </ul>
      
      <p><strong>Atributos protegidos:</strong></p>
      <ul>
        <li>Raza, etnia, origen nacional</li>
        <li>Género, orientación sexual</li>
        <li>Edad</li>
        <li>Religión</li>
        <li>Discapacidad</li>
        <li>Estado socioeconómico</li>
      </ul>
      
      <h3>Transparencia</h3>
      <p><strong>Principios de transparencia:</strong></p>
      <ul>
        <li>Informar que se usa IA</li>
        <li>Explicar propósito del sistema</li>
        <li>Divulgar datos utilizados</li>
        <li>Comunicar limitaciones y riesgos</li>
        <li>Proporcionar mecanismos de recurso</li>
      </ul>
      
      <p><strong>Niveles de transparencia:</strong></p>
      <ul>
        <li><strong>Transparencia hacia usuarios:</strong> Qué hace el sistema</li>
        <li><strong>Transparencia hacia reguladores:</strong> Cómo funciona el sistema</li>
        <li><strong>Transparencia hacia auditores:</strong> Acceso completo a algoritmo y datos</li>
      </ul>
      
      <h3>Explicabilidad (XAI - Explainable AI)</h3>
      <p><strong>¿Por qué es importante?</strong></p>
      <ul>
        <li>Derecho a entender decisiones que nos afectan</li>
        <li>Posibilidad de impugnar decisiones</li>
        <li>Confianza en el sistema</li>
        <li>Cumplimiento legal (GDPR)</li>
        <li>Mejora y debugging del sistema</li>
      </ul>
      
      <p><strong>Técnicas de XAI:</strong></p>
      <ul>
        <li><strong>LIME:</strong> Explicaciones locales aproximadas</li>
        <li><strong>SHAP:</strong> Valores de Shapley para importancia de features</li>
        <li><strong>Contrafactuales:</strong> "¿Qué cambiaría la decisión?"</li>
        <li><strong>Attention visualization:</strong> Qué partes del input son importantes</li>
      </ul>
      
      <p><strong>Trade-off precisión-explicabilidad:</strong></p>
      <ul>
        <li>Modelos simples (árboles, regresión) = más explicables, menos precisos</li>
        <li>Modelos complejos (deep learning) = menos explicables, más precisos</li>
        <li>Soluciones: modelos sustitutos, explicaciones post-hoc</li>
      </ul>

      <hr/>

      <h2>7.2. Privacidad de datos: Protección de datos personales, anonimización, pseudoanonimización</h2>
      <h3>Protección de Datos Personales</h3>
      <p><strong>¿Qué son datos personales?</strong></p>
      <p>Cualquier información relacionada con una persona física identificada o identificable.</p>
      <ul>
        <li>Nombre, DNI, dirección</li>
        <li>Email, teléfono</li>
        <li>Datos de localización</li>
        <li>Identificadores online (IP, cookies)</li>
        <li>Datos biométricos</li>
        <li>Datos de salud</li>
        <li>Opiniones políticas, religiosas</li>
      </ul>
      
      <p><strong>Principios de protección de datos:</strong></p>
      <ul>
        <li>Licitud, lealtad y transparencia</li>
        <li>Limitación de la finalidad</li>
        <li>Minimización de datos</li>
        <li>Exactitud</li>
        <li>Limitación del plazo de conservación</li>
        <li>Integridad y confidencialidad</li>
        <li>Responsabilidad proactiva</li>
      </ul>
      
      <p><strong>Derechos de los interesados:</strong></p>
      <ul>
        <li>Derecho de acceso</li>
        <li>Derecho de rectificación</li>
        <li>Derecho de supresión ("derecho al olvido")</li>
        <li>Derecho de limitación del tratamiento</li>
        <li>Derecho de portabilidad</li>
        <li>Derecho de oposición</li>
        <li>Derechos relativos a decisiones automatizadas</li>
      </ul>
      
      <h3>Anonimización</h3>
      <p><strong>Definición:</strong> Proceso irreversible que imposibilita la identificación de una persona.</p>
      
      <p><strong>Técnicas de anonimización:</strong></p>
      <ul>
        <li><strong>Supresión:</strong> Eliminar identificadores directos</li>
        <li><strong>Generalización:</strong> Reducir precisión (edad → rango de edad)</li>
        <li><strong>Perturbación:</strong> Añadir ruido aleatorio a datos</li>
        <li><strong>Seudonimización avanzada:</strong> Reemplazar con códigos irreversibles</li>
        <li><strong>Agregación:</strong> Presentar solo datos agrupados</li>
        <li><strong>k-anonimidad:</strong> Cada registro es indistinguible de al menos k-1 otros</li>
        <li><strong>l-diversidad:</strong> Variedad en valores sensibles dentro de grupos</li>
        <li><strong>t-cercanía:</strong> Distribución similar a la población general</li>
      </ul>
      
      <p><strong>Test de motivación razonable:</strong></p>
      <p>Los datos están anonimizados si identificar a una persona requiere esfuerzo desproporcionado (tiempo, coste, tecnología disponible).</p>
      
      <h3>Pseudoanonimización</h3>
      <p><strong>Definición:</strong> Reemplazar datos identificativos por pseudónimos, manteniendo la posibilidad de re-identificación con información adicional.</p>
      
      <p><strong>Diferencias clave:</strong></p>
      <table>
        <tr><th>Aspecto</th><th>Anonimización</th><th>Pseudoanonimización</th></tr>
        <tr><td>Reversible</td><td>No</td><td>Sí (con clave)</td></tr>
        <tr><td>Aplica GDPR</td><td>No</td><td>Sí</td></tr>
        <tr><td>Utilidad de datos</td><td>Menor</td><td>Mayor</td></tr>
        <tr><td>Riesgo</td><td>Bajo</td><td>Medio</td></tr>
      </table>
      
      <p><strong>Casos de uso:</strong></p>
      <ul>
        <li>Investigación médica</li>
        <li>Análisis estadístico</li>
        <li>Testing de sistemas</li>
        <li>Compartir datos entre organizaciones</li>
      </ul>
      
      <h3>Privacidad en IA</h3>
      <p><strong>Desafíos específicos:</strong></p>
      <ul>
        <li>Entrenamiento con datos personales</li>
        <li>Memorización de datos en modelos</li>
        <li>Inferencia de información sensible</li>
        <li>Re-identificación a partir de outputs</li>
      </ul>
      
      <p><strong>Técnicas de privacidad para IA:</strong></p>
      <ul>
        <li><strong>Privacidad diferencial:</strong> Añadir ruido controlado</li>
        <li><strong>Federated learning:</strong> Entrenar sin centralizar datos</li>
        <li><strong>Homomorphic encryption:</strong> Computar sobre datos encriptados</li>
        <li><strong>Machine learning seguro:</strong> Protocolos criptográficos</li>
      </ul>

      <hr/>

      <h2>7.3. Marco legal de la IA: GDPR y Reglamento Europeo de IA</h2>
      <h3>GDPR (Reglamento General de Protección de Datos)</h3>
      <p><strong>Aplicación:</strong> Desde mayo 2018, aplica a todo tratamiento de datos de residentes en UE.</p>
      
      <p><strong>Artículos relevantes para IA:</strong></p>
      <ul>
        <li><strong>Art. 4:</strong> Definiciones (datos personales, tratamiento, perfilado)</li>
        <li><strong>Art. 5:</strong> Principios de tratamiento de datos</li>
        <li><strong>Art. 6:</strong> Bases legales para el tratamiento</li>
        <li><strong>Art. 9:</strong> Categorías especiales de datos (prohibición con excepciones)</li>
        <li><strong>Art. 13-14:</strong> Información al interesado</li>
        <li><strong>Art. 15:</strong> Derecho de acceso</li>
        <li><strong>Art. 16:</strong> Derecho de rectificación</li>
        <li><strong>Art. 17:</strong> Derecho de supresión</li>
        <li><strong>Art. 20:</strong> Derecho a la portabilidad</li>
        <li><strong>Art. 21:</strong> Derecho de oposición</li>
        <li><strong>Art. 22:</strong> Decisiones individuales automatizadas (incluido perfilado)</li>
      </ul>
      
      <p><strong>Artículo 22 - Decisiones automatizadas:</strong></p>
      <ul>
        <li>Derecho a no ser objeto de decisión basada únicamente en tratamiento automatizado</li>
        <li>Excepciones: contrato, autorización legal, consentimiento explícito</li>
        <li>Garantías: derecho a intervención humana, a expresar punto de vista, a impugnar</li>
      </ul>
      
      <p><strong>Sanciones:</strong></p>
      <ul>
        <li>Hasta 20 millones de euros o 4% del volumen de negocio global anual</li>
        <li>Lo que sea mayor</li>
      </ul>
      
      <h3>Reglamento Europeo de IA (AI Act)</h3>
      <p><strong>Aprobación:</strong> Marzo 2024, aplicación gradual desde 2025.</p>
      
      <p><strong>Enfoque basado en riesgo:</strong></p>
      
      <p><strong>1. Riesgo inaceptable (prohibido):</strong></p>
      <ul>
        <li>Sistemas de puntuación social por gobiernos</li>
        <li>Identificación biométrica en tiempo real en espacios públicos (con excepciones)</li>
        <li>Clasificación biométrica por características protegidas</li>
        <li>Reconocimiento de emociones en trabajo/educación</li>
        <li>Vigilancia masiva no dirigida</li>
      </ul>
      
      <p><strong>2. Alto riesgo (requerimientos estrictos):</strong></p>
      <ul>
        <li>IA en productos de seguridad (juguetes, vehículos, dispositivos médicos)</li>
        <li>Biometría y categorización</li>
        <li>Gestión de infraestructuras críticas</li>
        <li>Educación y formación</li>
        <li>Empleo y gestión de trabajadores</li>
        <li>Servicios esenciales (crédito, seguros, beneficios)</li>
        <li>Aplicación de la ley</li>
        <li>Migración y control de fronteras</li>
        <li>Justicia y procesos democráticos</li>
      </ul>
      
      <p><strong>Requerimientos para alto riesgo:</strong></p>
      <ul>
        <li>Sistema de gestión de riesgos</li>
        <li>Gobernanza de datos</li>
        <li>Documentación técnica</li>
        <li>Registro de logs</li>
        <li>Transparencia e información al usuario</li>
        <li>Supervisión humana</li>
        <li>Robustez, seguridad y precisión</li>
        <li>Evaluación de conformidad</li>
      </ul>
      
      <p><strong>3. Riesgo limitado (obligaciones de transparencia):</strong></p>
      <ul>
        <li>Chatbots: informar que es IA</li>
        <li>Deepfakes: etiquetar como contenido generado artificialmente</li>
        <li>Reconocimiento de emociones: informar y obtener consentimiento</li>
        <li>Biometría remota: informar</li>
      </ul>
      
      <p><strong>4. Riesgo mínimo (sin obligaciones):</strong></p>
      <ul>
        <li>Juegos, filtros de spam, IA creativa</li>
        <li>La mayoría de aplicaciones actuales</li>
      </ul>
      
      <p><strong>Sanciones AI Act:</strong></p>
      <ul>
        <li>Prohibiciones: hasta 35M€ o 7% volumen de negocio</li>
        <li>Otros incumplimientos: hasta 15M€ o 3%</li>
        <li>Información incorrecta: hasta 7.5M€ o 1%</li>
      </ul>
      
      <h3>Otras Regulaciones Relevantes</h3>
      <ul>
        <li><strong>DSA (Digital Services Act):</strong> Transparencia de algoritmos de recomendación</li>
        <li><strong>DMA (Digital Markets Act):</strong> Competencia en plataformas digitales</li>
        <li><strong>Data Act:</strong> Compartir datos entre empresas y usuarios</li>
        <li><strong>AI Liability Directive:</strong> Responsabilidad por daños de IA</li>
      </ul>

      <hr/>

      <h2>7.4. Seguridad en la IA: Ataques adversarios, robustez de los modelos</h2>
      <h3>Ataques Adversarios</h3>
      <p><strong>¿Qué son?</strong> Inputs diseñados intencionalmente para engañar a modelos de IA.</p>
      
      <p><strong>Tipos de ataques:</strong></p>
      
      <p><strong>1. Ataques de evasión (inference time):</strong></p>
      <ul>
        <li>Modificar input para evitar detección</li>
        <li>Ejemplo: Spam con palabras insertadas para evitar filtros</li>
        <li>Ejemplo: Señal de tráfico modificada que el coche autónomo interpreta mal</li>
      </ul>
      
      <p><strong>2. Ataques de envenenamiento (training time):</strong></p>
      <ul>
        <li>Corromper datos de entrenamiento</li>
        <li>Crear backdoors en el modelo</li>
        <li>Ejemplo: Imágenes etiquetadas incorrectamente para sesgar clasificación</li>
      </ul>
      
      <p><strong>3. Ataques de extracción:</strong></p>
      <ul>
        <li>Robar el modelo mediante queries</li>
        <li>Reconstruir arquitectura y parámetros</li>
        <li>Viola propiedad intelectual</li>
      </ul>
      
      <p><strong>4. Ataques de inferencia:</strong></p>
      <ul>
        <li>Deducir datos de entrenamiento</li>
        <li>Membership inference: saber si un dato estuvo en entrenamiento</li>
        <li>Model inversion: reconstruir datos sensibles</li>
      </ul>
      
      <p><strong>5. Prompt injection (LLMs):</strong></p>
      <ul>
        <li>Manipular modelo para ignorar instrucciones</li>
        <li>Jailbreaking para contenido prohibido</li>
        <li>Exfiltración de datos del sistema</li>
      </ul>
      
      <h3>Defensas y Robustez</h3>
      <p><strong>1. Adversarial training:</strong></p>
      <ul>
        <li>Entrenar con ejemplos adversarios</li>
        <li>Mejora robustez pero reduce precisión</li>
      </ul>
      
      <p><strong>2. Defensive distillation:</strong></p>
      <ul>
        <li>Entrenar modelo para suavizar probabilidades</li>
        <li>Hace más difícil encontrar ejemplos adversarios</li>
      </ul>
      
      <p><strong>3. Detección de anomalías:</strong></p>
      <ul>
        <li>Identificar inputs fuera de distribución</li>
        <li>Rechazar o flaggear para revisión</li>
      </ul>
      
      <p><strong>4. Certificación de robustez:</strong></p>
      <ul>
        <li>Garantías matemáticas de comportamiento</li>
        <li>Límites en perturbaciones tolerables</li>
      </ul>
      
      <p><strong>5. Seguridad en LLMs:</strong></p>
      <ul>
        <li>Input sanitization</li>
        <li>Output filtering</li>
        <li>Instruction hierarchy</li>
        <li>Monitoring de patrones de ataque</li>
      </ul>
      
      <h3>Mejores Prácticas de Seguridad</h3>
      <ul>
        <li>Threat modeling específico para IA</li>
        <li>Red teaming de sistemas de IA</li>
        <li>Monitoreo continuo de comportamiento</li>
        <li>Plan de respuesta a incidentes</li>
        <li>Actualización regular de defensas</li>
        <li>Principio de mínimo privilegio en accesos</li>
      </ul>

      <hr/>

      <h2>7.5. Responsabilidad en el uso de la IA: Quién es responsable ante errores o daños</h2>
      <h3>Marco de Responsabilidad</h3>
      <p><strong>Actores en el ecosistema de IA:</strong></p>
      <ul>
        <li><strong>Desarrollador:</strong> Crea el modelo/algoritmo</li>
        <li><strong>Proveedor:</strong> Comercializa el sistema</li>
        <li><strong>Desplegador:</strong> Implementa en contexto específico</li>
        <li><strong>Usuario:</strong> Interactúa con el sistema</li>
        <li><strong>Afectado:</strong> Persona impactada por decisión</li>
      </ul>
      
      <h3>Tipos de Responsabilidad</h3>
      <p><strong>1. Responsabilidad civil:</strong></p>
      <ul>
        <li>Compensación por daños causados</li>
        <li>Contractual (incumplimiento de contrato)</li>
        <li>Extracontractual (negligencia, responsabilidad objetiva)</li>
      </ul>
      
      <p><strong>2. Responsabilidad penal:</strong></p>
      <ul>
        <li>Delitos cometidos mediante IA</li>
        <li>¿Puede una IA ser sujeto penal? (actualmente no)</li>
        <li>Responsabilidad de personas físicas/jurídicas</li>
      </ul>
      
      <p><strong>3. Responsabilidad administrativa:</strong></p>
      <ul>
        <li>Infracciones regulatorias</li>
        <li>Sanciones de autoridades</li>
        <li>GDPR, AI Act</li>
      </ul>
      
      <h3>Desafíos Legales</h3>
      <p><strong>1. Caja negra:</strong></p>
      <ul>
        <li>Dificultad para determinar causa de error</li>
        <li>Complejidad de atribuir negligencia</li>
      </ul>
      
      <p><strong>2. Autonomía:</strong></p>
      <ul>
        <li>Sistemas que aprenden y cambian después del despliegue</li>
        <li>¿Responsabilidad por comportamiento no previsto?</li>
      </ul>
      
      <p><strong>3. Múltiples actores:</strong></p>
      <ul>
        <li>Cadena de valor compleja</li>
        <li>Dificultad para asignar responsabilidad</li>
      </ul>
      
      <p><strong>4. Daños difusos:</strong></p>
      <ul>
        <li>Sesgo sistémico afecta a muchos</li>
        <li>Daño individual pequeño pero colectivo grande</li>
      </ul>
      
      <h3>Propuestas Regulatorias</h3>
      <p><strong>AI Liability Directive (UE):</strong></p>
      <ul>
        <li>Presunción de causalidad para IA de alto riesgo</li>
        <li>Derecho de acceso a evidencia</li>
        <li>Inversión de carga de la prueba</li>
      </ul>
      
      <p><strong>Enfoques nacionales:</strong></p>
      <ul>
        <li><strong>Alemania:</strong> Responsabilidad objetiva para sistemas autónomos</li>
        <li><strong>Reino Unido:</strong> Enfoque sectorial, sin legislación específica</li>
        <li><strong>EE.UU.:</strong> Patchwork estatal, énfasis en autorregulación</li>
      </ul>
      
      <h3>Seguros de IA</h3>
      <ul>
        <li>Cobertura por errores de IA</li>
        <li>Responsabilidad civil profesional</li>
        <li>Ciberseguridad y privacidad</li>
        <li>Producto emergente en mercado asegurador</li>
      </ul>
      
      <h3>Mejores Prácticas para Organizaciones</h3>
      <ul>
        <li>Documentar decisiones de diseño</li>
        <li>Implementar gobernanza de IA</li>
        <li>Realizar evaluaciones de impacto</li>
        <li>Mantener supervisión humana significativa</li>
        <li>Tener protocolos de escalado</li>
        <li>Contratar seguros apropiados</li>
        <li>Establecer términos de uso claros</li>
      </ul>

      <hr/>

      <h2>7.6. Debates y análisis de dilemas éticos: Estudio de casos controvertidos</h2>
      <h3>Caso 1: Clearview AI</h3>
      <p><strong>Descripción:</strong> Empresa que scrappeó 30 mil millones de imágenes de redes sociales para crear base de datos de reconocimiento facial.</p>
      
      <p><strong>Dilemas:</strong></p>
      <ul>
        <li>Privacidad vs. seguridad pública</li>
        <li>Consentimiento para uso de imágenes</li>
        <li>Vigilancia masiva vs. libertades civiles</li>
        <li>Tecnología dual-use (policía vs. represión)</li>
      </ul>
      
      <p><strong>Impacto:</strong></p>
      <ul>
        <li>Multas millonarias en UE</li>
        <li>Prohibición en varias ciudades</li>
        <li>Debate sobre regulación de biometría</li>
      </ul>
      
      <h3>Caso 2: Cambridge Analytica</h3>
      <p><strong>Descripción:</strong> Uso de datos de 87 millones de Facebook users para micro-targeting político en elecciones.</p>
      
      <p><strong>Dilemas:</strong></p>
      <ul>
        <li>Consentimiento informado</li>
        <li>Manipulación democrática</li>
        <li>Propiedad de datos</li>
        <li>Responsabilidad de plataformas</li>
      </ul>
      
      <p><strong>Consecuencias:</strong></p>
      <ul>
        <li>Multa de $5B a Facebook</li>
        <li>Mayor escrutinio regulatorio</li>
        <li>Concienciación pública sobre privacidad</li>
      </ul>
      
      <h3>Caso 3: Vehículos Autónomos y el Problema del Tranvía</h3>
      <p><strong>Descripción:</strong> ¿Cómo debe programarse un coche autónomo ante dilemas morales inevitables?</p>
      
      <p><strong>Dilemas:</strong></p>
      <ul>
        <li>¿Salvar ocupantes o peatones?</li>
        <li>¿Considerar edad, número de personas?</li>
        <li>¿Quién decide la ética del algoritmo?</li>
        <li>¿Transparencia de reglas de decisión?</li>
      </ul>
      
      <p><strong>MIT Moral Machine:</strong></p>
      <ul>
        <li>Estudio global de preferencias morales</li>
        <li>Variaciones culturales significativas</li>
        <li>Imposibilidad de solución universal</li>
      </ul>
      
      <h3>Caso 4: LLMs y Derechos de Autor</h3>
      <p><strong>Descripción:</strong> Demanda de autores y artistas contra empresas de IA por uso de obras protegidas en entrenamiento.</p>
      
      <p><strong>Dilemas:</strong></p>
      <ul>
        <li>Fair use vs. infracción de copyright</li>
        <li>Compensación a creadores originales</li>
        <li>Progreso tecnológico vs. derechos de propiedad</li>
        <li>Naturaleza del aprendizaje humano vs. IA</li>
      </ul>
      
      <p><strong>Casos en curso:</strong></p>
      <ul>
        <li>Authors Guild vs. OpenAI</li>
        <li>Artistas visuales vs. Stability AI</li>
        <li>NY Times vs. Microsoft/OpenAI</li>
      </ul>
      
      <h3>Caso 5: Sesgo en Contratación de Amazon</h3>
      <p><strong>Descripción:</strong> Sistema de IA para screening de CVs discriminaba contra mujeres.</p>
      
      <p><strong>Dilemas:</strong></p>
      <ul>
        <li>Sesgo histórico en datos</li>
        <li>Responsabilidad por discriminación algorítmica</li>
        <li>Transparencia vs. secreto comercial</li>
        <li>Auditoría de sistemas de IA</li>
      </ul>
      
      <p><strong>Lecciones:</strong></p>
      <ul>
        <li>Importancia de datos diversos</li>
        <li>Necesidad de testing de equidad</li>
        <li>Supervisión humana esencial</li>
      </ul>
      
      <h3>Actividades de Debate</h3>
      <p><strong>Formato sugerido:</strong></p>
      <ol>
        <li>Presentar caso de estudio</li>
        <li>Dividir en grupos con perspectivas diferentes</li>
        <li>Identificar stakeholders y sus intereses</li>
        <li>Analizar desde marcos éticos (utilitarismo, deontología, ética de virtudes)</li>
        <li>Proponer soluciones y compromisos</li>
        <li>Debate plenario y conclusiones</li>
      </ol>
      
      <h3>Marco para Análisis Ético</h3>
      <ol>
        <li>Identificar el problema ético</li>
        <li>Recopilar hechos relevantes</li>
        <li>Identificar stakeholders</li>
        <li>Considerar alternativas</li>
        <li>Evaluar consecuencias</li>
        <li>Aplicar principios éticos</li>
        <li>Tomar decisión y justificar</li>
        <li>Reflexionar y aprender</li>
      </ol>
    `
  },
  {
    id: 8,
    slug: 'areas-funcionales',
    title: 'Módulo 8: Aplicaciones Funcionales',
    duration: '12 h',
    description: 'IA en Logística, RRHH, Finanzas y Operaciones.',
    longDescription: 'Casos prácticos de IA aplicada a la cadena de suministro, contratación y gestión financiera.',
    progress: 0,
    icon: Layers,
    resources: [],
    content: `
      <h2>8.1. IA en Marketing y Ventas: Personalización de la experiencia del cliente, chatbots, sistemas de recomendación, análisis predictivo de ventas</h2>
      <h3>Personalización de la Experiencia del Cliente</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Recomendaciones de producto en tiempo real</li>
        <li>Emails personalizados basados en comportamiento</li>
        <li>Precios dinámicos individualizados</li>
        <li>Contenido web adaptado al perfil</li>
        <li>Ofertas y promociones targetizadas</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Dynamic Yield (Mastercard)</li>
        <li>Optimizely</li>
        <li>Adobe Target</li>
        <li>Salesforce Einstein</li>
      </ul>
      
      <p><strong>Ejemplo práctico:</strong> Amazon genera 35% de sus ventas con recomendaciones personalizadas.</p>
      
      <h3>Chatbots de Ventas</h3>
      <p><strong>Funcionalidades:</strong></p>
      <ul>
        <li>Cualificación de leads</li>
        <li>Recomendación de productos</li>
        <li>Asistencia en compra</li>
        <li>Recuperación de carritos</li>
        <li>Upselling y cross-selling</li>
      </ul>
      
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>Drift</li>
        <li>Intercom</li>
        <li>LivePerson</li>
        <li>Ada</li>
      </ul>
      
      <p><strong>Resultados típicos:</strong></p>
      <ul>
        <li>40% de leads cualificados automáticamente</li>
        <li>20% aumento en conversión</li>
        <li>Respuesta en &lt;1 minuto vs. horas</li>
      </ul>
      
      <h3>Sistemas de Recomendación</h3>
      <p><strong>Tipos:</strong></p>
      <ul>
        <li><strong>Colaborativo:</strong> "Usuarios como tú compraron..."</li>
        <li><strong>Basado en contenido:</strong> "Similar a lo que viste..."</li>
        <li><strong>Híbrido:</strong> Combina ambos enfoques</li>
        <li><strong>Basado en ML:</strong> Modelos profundos de preferencias</li>
      </ul>
      
      <p><strong>Implementación:</strong></p>
      <ul>
        <li>Amazon Personalize</li>
        <li>Google Recommendations AI</li>
        <li>Microsoft Azure Personalizer</li>
      </ul>
      
      <h3>Análisis Predictivo de Ventas</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Forecast de demanda</li>
        <li>Probabilidad de cierre de oportunidades</li>
        <li>Identificación de leads más prometedores</li>
        <li>Detección de riesgo de churn</li>
        <li>Optimización de territorios y cuotas</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Salesforce Einstein Analytics</li>
        <li>HubSpot Predictive Lead Scoring</li>
        <li>Gong (análisis de llamadas)</li>
        <li>Clari (forecasting)</li>
      </ul>
      
      <p><strong>Métricas mejoradas:</strong></p>
      <ul>
        <li>Precisión de forecast: +25%</li>
        <li>Productividad de ventas: +30%</li>
        <li>Tasa de cierre: +15%</li>
      </ul>

      <hr/>

      <h2>8.2. IA en Logística y Cadena de Suministro: Optimización de rutas, gestión de inventarios, predicción de la demanda, mantenimiento predictivo</h2>
      <h3>Optimización de Rutas</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Planificación de rutas de entrega</li>
        <li>Optimización de flotas</li>
        <li>Re-ruteo en tiempo real por tráfico</li>
        <li>Consolidación de envíos</li>
        <li>Última milla eficiente</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Route4Me</li>
        <li>OptimoRoute</li>
        <li>Google Routes</li>
        <li>HERE Technologies</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Reducción de combustible: 15-25%</li>
        <li>Más entregas por vehículo: 20-30%</li>
        <li>Menos emisiones de CO2</li>
        <li>Mejor satisfacción del cliente</li>
      </ul>
      
      <h3>Gestión de Inventarios</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Stock óptimo por ubicación</li>
        <li>Reordenamiento automático</li>
        <li>Detección de obsolescencia</li>
        <li>Balanceo de inventario entre almacenes</li>
        <li>Reducción de stock de seguridad</li>
      </ul>
      
      <p><strong>IA aplicada:</strong></p>
      <ul>
        <li>Previsión de demanda por SKU</li>
        <li>Análisis de estacionalidad</li>
        <li>Detección de anomalías en consumo</li>
        <li>Optimización de punto de reorden</li>
      </ul>
      
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>Reducción de inventario: 20-30%</li>
        <li>Mejora en servicio: 10-15%</li>
        <li>Menos roturas de stock</li>
        <li>Menos capital inmovilizado</li>
      </ul>
      
      <h3>Predicción de la Demanda</h3>
      <p><strong>Factores considerados:</strong></p>
      <ul>
        <li>Historial de ventas</li>
        <li>Estacionalidad</li>
        <li>Tendencias de mercado</li>
        <li>Promociones y marketing</li>
        <li>Factores externos (clima, economía)</li>
        <li>Eventos especiales</li>
      </ul>
      
      <p><strong>Técnicas:</strong></p>
      <ul>
        <li>Series temporales (ARIMA, Prophet)</li>
        <li>Machine Learning (XGBoost, Random Forest)</li>
        <li>Deep Learning (LSTM, Transformers)</li>
        <li>Ensemble methods</li>
      </ul>
      
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>Blue Yonder</li>
        <li>Kinaxis</li>
        <li>o9 Solutions</li>
        <li>ToolsGroup</li>
      </ul>
      
      <h3>Mantenimiento Predictivo</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Monitorización de flota de vehículos</li>
        <li>Equipos de almacén</li>
        <li>Cintas transportadoras</li>
        <li>Robots y automatización</li>
      </ul>
      
      <p><strong>Datos utilizados:</strong></p>
      <ul>
        <li>Sensores IoT (vibración, temperatura)</li>
        <li>Historial de mantenimiento</li>
        <li>Patrones de uso</li>
        <li>Códigos de error</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Reducción de downtime: 30-50%</li>
        <li>Extensión de vida útil de equipos</li>
        <li>Mantenimiento justo a tiempo</li>
        <li>Reducción de costes de reparación</li>
      </ul>

      <hr/>

      <h2>8.3. IA en Recursos Humanos: Contratación inteligente, análisis de sentimiento de empleados, predicción de rotación, personalización de la formación</h2>
      <h3>Contratación Inteligente</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Screening automático de CVs</li>
        <li>Matching candidato-puesto</li>
        <li>Chatbots para candidatos</li>
        <li>Entrevistas por video analizadas con IA</li>
        <li>Verificación de referencias</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Eightfold AI</li>
        <li>Paradox Olivia</li>
        <li>HireVue</li>
        <li>Pymetrics</li>
        <li>LinkedIn Recruiter con IA</li>
      </ul>
      
      <p><strong>Precauciones:</strong></p>
      <ul>
        <li>Auditar sesgos algorítmicos</li>
        <li>Mantener supervisión humana</li>
        <li>Transparencia con candidatos</li>
        <li>Cumplir regulaciones locales</li>
      </ul>
      
      <h3>Análisis de Sentimiento de Empleados</h3>
      <p><strong>Fuentes de datos:</strong></p>
      <ul>
        <li>Encuestas de engagement</li>
        <li>Feedback anónimo</li>
        <li>Comunicaciones internas</li>
        <li>Reviews en Glassdoor</li>
      </ul>
      
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Detección temprana de problemas</li>
        <li>Identificación de drivers de satisfacción</li>
        <li>Segmentación por departamento/equipo</li>
        <li>Tracking de tendencias</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Qualtrics EmployeeXM</li>
        <li>Microsoft Viva Insights</li>
        <li>Peakon (Workday)</li>
        <li>Glint (LinkedIn)</li>
      </ul>
      
      <h3>Predicción de Rotación</h3>
      <p><strong>Factores predictivos:</strong></p>
      <ul>
        <li>Tiempo desde último ascenso</li>
        <li>Comparación salarial con mercado</li>
        <li>Patrones de absentismo</li>
        <li>Cambios en comportamiento</li>
        <li>Engagement scores</li>
        <li>Historial de la empresa</li>
      </ul>
      
      <p><strong>Acciones preventivas:</strong></p>
      <ul>
        <li>Alertas tempranas a managers</li>
        <li>Recomendaciones de retención</li>
        <li>Planes de desarrollo personalizados</li>
        <li>Ajustes de compensación</li>
      </ul>
      
      <p><strong>Impacto:</strong></p>
      <ul>
        <li>Reducción de rotación: 15-25%</li>
        <li>Ahorro en costes de reemplazo</li>
        <li>Mejor planificación de sucesión</li>
      </ul>
      
      <h3>Personalización de la Formación</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Recomendación de cursos</li>
        <li>Rutas de aprendizaje adaptativas</li>
        <li>Contenido generado dinámicamente</li>
        <li>Evaluación de habilidades</li>
        <li>Detección de gaps de skills</li>
      </ul>
      
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>Degreed</li>
        <li>EdCast</li>
        <li>Cornerstone with AI</li>
        <li>360Learning</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Mayor completion rate</li>
        <li>Mejor retención de conocimiento</li>
        <li>Desarrollo más rápido de competencias</li>
      </ul>

      <hr/>

      <h2>8.4. IA en Finanzas: Detección de fraude, scoring de crédito, trading algorítmico, análisis de riesgo</h2>
      <h3>Detección de Fraude</h3>
      <p><strong>Tipos de fraude detectables:</strong></p>
      <ul>
        <li>Fraude con tarjetas de crédito</li>
        <li>Lavado de dinero (AML)</li>
        <li>Fraude de seguros</li>
        <li>Identidad falsa</li>
        <li>Fraude interno</li>
      </ul>
      
      <p><strong>Técnicas:</strong></p>
      <ul>
        <li>Detección de anomalías</li>
        <li>Pattern recognition</li>
        <li>Network analysis</li>
        <li>Real-time scoring</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>SAS Fraud Framework</li>
        <li>IBM Safer Payments</li>
        <li>Feedzai</li>
        <li>Darktrace</li>
      </ul>
      
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>Detección en tiempo real (&lt;100ms)</li>
        <li>Reducción de falsos positivos: 40-60%</li>
        <li>Ahorros millonarios anuales</li>
      </ul>
      
      <h3>Scoring de Crédito</h3>
      <p><strong>Factores tradicionales:</strong></p>
      <ul>
        <li>Historial crediticio</li>
        <li>Ingresos</li>
        <li>Deuda existente</li>
        <li>Empleo</li>
      </ul>
      
      <p><strong>Factores alternativos con IA:</strong></p>
      <ul>
        <li>Comportamiento de navegación</li>
        <li>Actividad en redes sociales</li>
        <li>Patrones de gasto</li>
        <li>Datos de telco</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Inclusión financiera (thin-file customers)</li>
        <li>Mayor precisión predictiva</li>
        <li>Decisiones en segundos</li>
        <li>Reducción de morosidad</li>
      </ul>
      
      <p><strong>Consideraciones:</strong></p>
      <ul>
        <li>Sesgo algorítmico</li>
        <li>Transparencia y explicabilidad</li>
        <li>Cumplimiento regulatorio</li>
        <li>Privacidad de datos</li>
      </ul>
      
      <h3>Trading Algorítmico</h3>
      <p><strong>Estrategias:</strong></p>
      <ul>
        <li>High-frequency trading</li>
        <li>Statistical arbitrage</li>
        <li>Market making</li>
        <li>Trend following</li>
        <li>Mean reversion</li>
      </ul>
      
      <p><strong>IA aplicada:</strong></p>
      <ul>
        <li>Reconocimiento de patrones</li>
        <li>Predicción de precios</li>
        <li>Sentiment analysis de noticias</li>
        <li>Optimización de ejecución</li>
        <li>Portfolio optimization</li>
      </ul>
      
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>Kavout</li>
        <li>Aidyia</li>
        <li>Renaissance Technologies</li>
        <li>Two Sigma</li>
      </ul>
      
      <h3>Análisis de Riesgo</h3>
      <p><strong>Tipos de riesgo:</strong></p>
      <ul>
        <li>Riesgo de mercado</li>
        <li>Riesgo crediticio</li>
        <li>Riesgo operacional</li>
        <li>Riesgo de liquidez</li>
      </ul>
      
      <p><strong>Aplicaciones de IA:</strong></p>
      <ul>
        <li>Stress testing</li>
        <li>Scenario analysis</li>
        <li>Early warning systems</li>
        <li>Regulatory reporting</li>
        <li>Capital optimization</li>
      </ul>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Moody's Analytics</li>
        <li>SAS Risk Management</li>
        <li>Oracle Financial Services</li>
        <li>Palantir Foundry</li>
      </ul>

      <hr/>

      <h2>8.5. IA en Operaciones y Producción: Control de calidad, optimización de procesos productivos, robótica colaborativa</h2>
      <h3>Control de Calidad</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Inspección visual automatizada</li>
        <li>Detección de defectos</li>
        <li>Medición de dimensiones</li>
        <li>Clasificación de productos</li>
        <li>Verificación de ensamblaje</li>
      </ul>
      
      <p><strong>Tecnologías:</strong></p>
      <ul>
        <li>Visión por computadora</li>
        <li>Deep learning (CNNs)</li>
        <li>Sensores avanzados</li>
        <li>Robots con visión</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Detección 24/7 sin fatiga</li>
        <li>Precisión &gt;99%</li>
        <li>Reducción de scrap: 30-50%</li>
        <li>Trazabilidad completa</li>
      </ul>
      
      <p><strong>Ejemplos:</strong></p>
      <ul>
        <li>Automoción: detección de defectos en pintura</li>
        <li>Electrónica: inspección de PCBs</li>
        <li>Farmacia: control de empaquetado</li>
        <li>Alimentación: clasificación por calidad</li>
      </ul>
      
      <h3>Optimización de Procesos Productivos</h3>
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Programación de producción</li>
        <li>Balanceo de líneas</li>
        <li>Optimización de parámetros</li>
        <li>Reducción de desperdicios</li>
        <li>Mejora de OEE (Overall Equipment Effectiveness)</li>
      </ul>
      
      <p><strong>Técnicas:</strong></p>
      <ul>
        <li>Optimización con restricciones</li>
        <li>Algoritmos genéticos</li>
        <li>Reinforcement learning</li>
        <li>Simulación digital twin</li>
      </ul>
      
      <p><strong>Resultados:</strong></p>
      <ul>
        <li>Aumento de throughput: 10-20%</li>
        <li>Reducción de setup time: 30-50%</li>
        <li>Menos paradas no planificadas</li>
        <li>Optimización de energía</li>
      </ul>
      
      <h3>Robótica Colaborativa</h3>
      <p><strong>¿Qué son cobots?</strong></p>
      <ul>
        <li>Robots diseñados para trabajar junto a humanos</li>
        <li>Sensores de seguridad avanzados</li>
        <li>Fáciles de programar</li>
        <li>Flexibles y reconfigurables</li>
      </ul>
      
      <p><strong>Aplicaciones:</strong></p>
      <ul>
        <li>Ensamblaje asistido</li>
        <li>Pick and place</li>
        <li>Embalaje y paletizado</li>
        <li>Control de calidad</li>
        <li>Logística interna</li>
      </ul>
      
      <p><strong>Fabricantes:</strong></p>
      <ul>
        <li>Universal Robots</li>
        <li>Fanuc</li>
        <li>ABB</li>
        <li>Kuka</li>
        <li>Techman</li>
      </ul>
      
      <p><strong>IA en cobots:</strong></p>
      <ul>
        <li>Visión para guiado</li>
        <li>Aprendizaje por demostración</li>
        <li>Adaptación a variaciones</li>
        <li>Predicción de movimientos humanos</li>
      </ul>
      
      <h3>Industria 4.0 y Fábricas Inteligentes</h3>
      <p><strong>Componentes:</strong></p>
      <ul>
        <li>IoT industrial (IIoT)</li>
        <li>Big data y analytics</li>
        <li>Cloud computing</li>
        <li>Ciberseguridad</li>
        <li>Realidad aumentada</li>
        <li>Digital twins</li>
      </ul>
      
      <p><strong>Beneficios:</strong></p>
      <ul>
        <li>Producción más flexible</li>
        <li>Mass customization</li>
        <li>Menos tiempo de mercado</li>
        <li>Sostenibilidad mejorada</li>
      </ul>
    `
  },
  {
    id: 9,
    slug: 'proyectos-integradores',
    title: 'Módulo 9: Proyectos Integradores',
    duration: '90 h',
    description: 'Desarrollo, defensa y despliegue de proyectos reales.',
    longDescription: 'Fase final del curso dedicada a la creación de un proyecto práctico completo con monitorización real.',
    progress: 0,
    icon: Rocket,
    resources: [],
    content: `
      <h2>9.1. Metodología de proyectos de IA: Desde la definición del problema hasta la implementación y monitorización</h2>
      <h3>Fases del Proyecto de IA</h3>
      <p><strong>Fase 1: Definición del Problema (10% del tiempo)</strong></p>
      <ul>
        <li>Identificar oportunidad de negocio</li>
        <li>Definir objetivos medibles (KPIs)</li>
        <li>Evaluar viabilidad técnica</li>
        <li>Estimar ROI y recursos necesarios</li>
        <li>Obtener stakeholder buy-in</li>
      </ul>
      
      <p><strong>Fase 2: Recolección de Datos (20% del tiempo)</strong></p>
      <ul>
        <li>Identificar fuentes de datos</li>
        <li>Negociar accesos</li>
        <li>Extraer y consolidar datos</li>
        <li>Evaluar calidad y completitud</li>
        <li>Documentar metadatos</li>
      </ul>
      
      <p><strong>Fase 3: Preparación de Datos (30% del tiempo)</strong></p>
      <ul>
        <li>Limpieza de datos (missing values, outliers)</li>
        <li>Transformación y normalización</li>
        <li>Feature engineering</li>
        <li>Split train/validation/test</li>
        <li>Data augmentation si es necesario</li>
      </ul>
      
      <p><strong>Fase 4: Modelado (20% del tiempo)</strong></p>
      <ul>
        <li>Seleccionar algoritmos candidatos</li>
        <li>Entrenar modelos iniciales</li>
        <li>Hyperparameter tuning</li>
        <li>Validación cruzada</li>
        <li>Ensemble methods</li>
      </ul>
      
      <p><strong>Fase 5: Evaluación (10% del tiempo)</strong></p>
      <ul>
        <li>Métricas de rendimiento</li>
        <li>Testing en datos no vistos</li>
        <li>Análisis de errores</li>
        <li>Evaluación de equidad y sesgo</li>
        <li>Validación con stakeholders</li>
      </ul>
      
      <p><strong>Fase 6: Despliegue (5% del tiempo)</strong></p>
      <ul>
        <li>Integración con sistemas existentes</li>
        <li>APIs y endpoints</li>
        <li>Testing en producción</li>
        <li>Rollout gradual</li>
        <li>Documentación</li>
      </ul>
      
      <p><strong>Fase 7: Monitorización (5% del tiempo, continuo)</strong></p>
      <ul>
        <li>Tracking de métricas en producción</li>
        <li>Detección de data drift</li>
        <li>Model performance decay</li>
        <li>Retraining programado</li>
        <li>Feedback loop</li>
      </ul>
      
      <h3>Metodologías Ágiles para IA</h3>
      <p><strong>CRISP-DM:</strong></p>
      <ul>
        <li>Business Understanding</li>
        <li>Data Understanding</li>
        <li>Data Preparation</li>
        <li>Modeling</li>
        <li>Evaluation</li>
        <li>Deployment</li>
      </ul>
      
      <p><strong>Microsoft Team Data Science Process:</strong></p>
      <ul>
        <li>Define strategy</li>
        <li>Understand data</li>
        <li>Prepare data</li>
        <li>Build models</li>
        <li>Deploy</li>
        <li>Operationalize</li>
      </ul>
      
      <h3>Herramientas de Gestión</h3>
      <ul>
        <li><strong>Experiment tracking:</strong> MLflow, Weights & Biases, Neptune</li>
        <li><strong>Project management:</strong> Jira, Trello, Asana</li>
        <li><strong>Documentation:</strong> Confluence, Notion</li>
        <li><strong>Version control:</strong> Git, DVC (Data Version Control)</li>
      </ul>

      <hr/>

      <h2>9.2. Selección y definición del proyecto: Temática libre o sugerida, con aplicación real a la empresa</h2>
      <h3>Criterios de Selección</h3>
      <p><strong>1. Relevancia empresarial:</strong></p>
      <ul>
        <li>Resuelve problema real</li>
        <li>Impacto medible en negocio</li>
        <li>Alineado con estrategia organizacional</li>
      </ul>
      
      <p><strong>2. Viabilidad técnica:</strong></p>
      <ul>
        <li>Datos disponibles y accesibles</li>
        <li>Tecnología al alcance</li>
        <li>Tiempo y recursos adecuados</li>
      </ul>
      
      <p><strong>3. Complejidad apropiada:</strong></p>
      <ul>
        <li>Desafiante pero alcanzable</li>
        <li>Demostrable en 90 horas</li>
        <li>Escalable posteriormente</li>
      </ul>
      
      <h3>Proyectos Sugeridos por Área</h3>
      <p><strong>Marketing y Ventas:</strong></p>
      <ul>
        <li>Sistema de recomendación de productos</li>
        <li>Predictor de churn de clientes</li>
        <li>Chatbot de ventas para ecommerce</li>
        <li>Optimizador de campañas de email marketing</li>
        <li>Analizador de sentimiento de reviews</li>
      </ul>
      
      <p><strong>Operaciones y Logística:</strong></p>
      <ul>
        <li>Predictor de demanda de productos</li>
        <li>Optimizador de rutas de reparto</li>
        <li>Sistema de control de calidad visual</li>
        <li>Predictor de fallos de maquinaria</li>
        <li>Optimizador de niveles de inventario</li>
      </ul>
      
      <p><strong>Recursos Humanos:</strong></p>
      <ul>
        <li>Matcher de CVs a ofertas de empleo</li>
        <li>Predictor de rotación de empleados</li>
        <li>Chatbot de onboarding</li>
        <li>Analizador de engagement de equipos</li>
        <li>Recomendador de formación personalizada</li>
      </ul>
      
      <p><strong>Finanzas:</strong></p>
      <ul>
        <li>Detector de fraude en transacciones</li>
        <li>Scoring crediticio alternativo</li>
        <li>Predictor de impagos</li>
        <li>Clasificador automático de gastos</li>
        <li>Analizador de riesgos de cartera</li>
      </ul>
      
      <p><strong>Atención al Cliente:</strong></p>
      <ul>
        <li>Chatbot multicanal de soporte</li>
        <li>Clasificador automático de tickets</li>
        <li>Sistema de routing inteligente</li>
        <li>Analizador de satisfacción post-interacción</li>
        <li>Generador de respuestas sugeridas</li>
      </ul>
      
      <h3>Template de Definición de Proyecto</h3>
      <pre>
**Título del Proyecto:** [Nombre descriptivo]

**Problema a Resolver:**
[Descripción clara del problema de negocio]

**Objetivos:**
- Objetivo principal: [KPI medible]
- Objetivos secundarios: [Lista]

**Stakeholders:**
- Sponsor: [Nombre/rol]
- Usuarios finales: [Descripción]
- Equipo del proyecto: [Roles]

**Datos Disponibles:**
- Fuentes: [Lista]
- Volumen estimado: [Cantidad]
- Calidad conocida: [Notas]

**Alcance:**
- Incluido: [Qué sí se hará]
- Excluido: [Qué no se hará]

**Criterios de Éxito:**
- [KPI 1] &gt; [valor]
- [KPI 2] &lt; [valor]

**Riesgos Identificados:**
- [Riesgo 1] - Mitigación: [acción]
- [Riesgo 2] - Mitigación: [acción]

**Timeline:**
- Semana 1-2: [Fase]
- Semana 3-6: [Fase]
- Semana 7-10: [Fase]
- Semana 11-12: [Fase]
      </pre>

      <hr/>

      <h2>9.3. Fases del proyecto: Recolección y preparación de datos, entrenamiento del modelo, evaluación, despliegue</h2>
      <h3>Fase 1: Recolección de Datos</h3>
      <p><strong>Actividades:</strong></p>
      <ol>
        <li>Identificar todas las fuentes potenciales</li>
        <li>Negociar permisos y accesos</li>
        <li>Extraer datos de cada fuente</li>
        <li>Documentar procedencia y características</li>
        <li>Almacenar en repositorio seguro</li>
      </ol>
      
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>SQL queries para bases de datos</li>
        <li>APIs para servicios web</li>
        <li>Web scraping (si es legal y ético)</li>
        <li>Exportaciones manuales</li>
      </ul>
      
      <p><strong>Checklist de calidad:</strong></p>
      <ul>
        <li>✓ Datos representativos del problema</li>
        <li>✓ Volumen suficiente para el modelo</li>
        <li>✓ Variables relevantes incluidas</li>
        <li>✓ Período de tiempo apropiado</li>
        <li>✓ Sin sesgos evidentes</li>
      </ul>
      
      <h3>Fase 2: Preparación de Datos</h3>
      <p><strong>Limpieza:</strong></p>
      <ul>
        <li>Manejar valores missing (imputación o eliminación)</li>
        <li>Tratar outliers (cap, transformar, eliminar)</li>
        <li>Corregir errores e inconsistencias</li>
        <li>Estandarizar formatos (fechas, monedas)</li>
      </ul>
      
      <p><strong>Transformación:</strong></p>
      <ul>
        <li>Normalización/estandarización de variables</li>
        <li>Codificación de categóricas (one-hot, label)</li>
        <li>Creación de features derivados</li>
        <li>Reducción de dimensionalidad (PCA)</li>
      </ul>
      
      <p><strong>Split de datos:</strong></p>
      <ul>
        <li>Train: 60-80% (entrenamiento)</li>
        <li>Validation: 10-20% (tuning)</li>
        <li>Test: 10-20% (evaluación final)</li>
        <li>Estratificar si clases desbalanceadas</li>
      </ul>
      
      <h3>Fase 3: Entrenamiento del Modelo</h3>
      <p><strong>Selección de algoritmo:</strong></p>
      <ul>
        <li>Problema supervisado → Regresión/Clasificación</li>
        <li>Problema no supervisado → Clustering/Reducción dimensional</li>
        <li>Series temporales → ARIMA, Prophet, LSTM</li>
        <li>Texto → Transformers, LLMs</li>
        <li>Imágenes → CNNs, Vision Transformers</li>
      </ul>
      
      <p><strong>Entrenamiento:</strong></p>
      <ol>
        <li>Implementar modelo baseline</li>
        <li>Entrenar modelos candidatos</li>
        <li>Comparar métricas en validación</li>
        <li>Seleccionar mejor modelo</li>
        <li>Hyperparameter tuning (Grid Search, Random Search, Bayesian)</li>
        <li>Validación cruzada para robustez</li>
      </ol>
      
      <p><strong>Mejoras:</strong></p>
      <ul>
        <li>Feature selection</li>
        <li>Ensemble methods (Random Forest, XGBoost)</li>
        <li>Transfer learning</li>
        <li>Data augmentation</li>
      </ul>
      
      <h3>Fase 4: Evaluación</h3>
      <p><strong>Métricas por tipo de problema:</strong></p>
      <ul>
        <li><strong>Clasificación:</strong> Accuracy, Precision, Recall, F1, ROC-AUC</li>
        <li><strong>Regresión:</strong> MAE, MSE, RMSE, R²</li>
        <li><strong>Clustering:</strong> Silhouette, Davies-Bouldin</li>
        <li><strong>Ranking:</strong> NDCG, MAP</li>
      </ul>
      
      <p><strong>Evaluación cualitativa:</strong></p>
      <ul>
        <li>Análisis de errores (confusion matrix)</li>
        <li>Casos donde el modelo falla</li>
        <li>Sesgos por subgrupos</li>
        <li>Explicabilidad (SHAP, LIME)</li>
      </ul>
      
      <p><strong>Validación con stakeholders:</strong></p>
      <ul>
        <li>Demostrar resultados</li>
        <li>Recoger feedback</li>
        <li>Ajustar si es necesario</li>
        <li>Obtener aprobación para despliegue</li>
      </ul>
      
      <h3>Fase 5: Despliegue</h3>
      <p><strong>Opciones de despliegue:</strong></p>
      <ul>
        <li><strong>API REST:</strong> Flask, FastAPI, Django</li>
        <li><strong>Cloud:</strong> AWS SageMaker, Azure ML, GCP Vertex AI</li>
        <li><strong>Edge:</strong> TensorFlow Lite, ONNX</li>
        <li><strong>Batch:</strong> Jobs programados</li>
        <li><strong>Streaming:</strong> Kafka, Spark Streaming</li>
      </ul>
      
      <p><strong>Consideraciones:</strong></p>
      <ul>
        <li>Latencia requerida</li>
        <li>Volumen de predicciones</li>
        <li>Disponibilidad (SLA)</li>
        <li>Seguridad y autenticación</li>
        <li>Costes de infraestructura</li>
      </ul>
      
      <p><strong>CI/CD para ML:</strong></p>
      <ul>
        <li>Automated testing</li>
        <li>Automated retraining</li>
        <li>Canary deployment</li>
        <li>Rollback automático</li>
      </ul>

      <hr/>

      <h2>9.4. Presentación y defensa de proyectos: Evaluación por parte de los instructores y compañeros</h2>
      <h3>Estructura de la Presentación</h3>
      <p><strong>Duración total:</strong> 20-30 minutos (15-20 min presentación + 10 min preguntas)</p>
      
      <p><strong>1. Contexto y Problema (3 min)</strong></p>
      <ul>
        <li>Presentación del equipo</li>
        <li>Empresa/organización contexto</li>
        <li>Problema de negocio identificado</li>
        <li>¿Por qué es importante?</li>
        <li>Objetivos del proyecto</li>
      </ul>
      
      <p><strong>2. Solución Propuesta (3 min)</strong></p>
      <ul>
        <li>Descripción de la solución de IA</li>
        <li>¿Por qué IA es apropiada?</li>
        <li>Alternativas consideradas</li>
        <li>Arquitectura general</li>
      </ul>
      
      <p><strong>3. Datos y Metodología (4 min)</strong></p>
      <ul>
        <li>Fuentes de datos utilizadas</li>
        <li>Proceso de preparación</li>
        <li>Metodología seguida</li>
        <li>Herramientas y tecnologías</li>
      </ul>
      
      <p><strong>4. Resultados (5 min)</strong></p>
      <ul>
        <li>Métricas de rendimiento del modelo</li>
        <li>Comparación con baseline</li>
        <li>Demo en vivo o grabada</li>
        <li>Impacto empresarial estimado</li>
        <li>ROI proyectado</li>
      </ul>
      
      <p><strong>5. Desafíos y Aprendizajes (3 min)</strong></p>
      <ul>
        <li>Principales obstáculos encontrados</li>
        <li>Cómo se superaron</li>
        <li>Lecciones aprendidas</li>
        <li>Qué se haría diferente</li>
      </ul>
      
      <p><strong>6. Conclusiones y Futuro (2 min)</strong></p>
      <ul>
        <li>Conclusiones principales</li>
        <li>Limitaciones actuales</li>
        <li>Próximos pasos</li>
        <li>Potencial de escalado</li>
      </ul>
      
      <h3>Materiales a Entregar</h3>
      <ul>
        <li><strong>Presentación:</strong> PowerPoint o Google Slides</li>
        <li><strong>Código:</strong> Repositorio Git completo</li>
        <li><strong>Documentación:</strong> README, arquitectura, decisiones</li>
        <li><strong>Video demo:</strong> 3-5 minutos mostrando funcionalidad</li>
        <li><strong>Informe ejecutivo:</strong> 2-3 páginas para no técnicos</li>
      </ul>
      
      <h3>Criterios de Evaluación</h3>
      <table>
        <tr><th>Criterio</th><th>Peso</th><th>Descripción</th></tr>
        <tr><td>Relevancia del problema</td><td>15%</td><td>Importancia para el negocio</td></tr>
        <tr><td>Calidad técnica</td><td>25%</td><td>Rigor metodológico, mejores prácticas</td></tr>
        <tr><td>Resultados</td><td>25%</td><td>Rendimiento del modelo, impacto</td></tr>
        <tr><td>Innovación</td><td>15%</td><td>Creatividad en la solución</td></tr>
        <tr><td>Presentación</td><td>10%</td><td>Claridad, estructura, comunicación</td></tr>
        <tr><td>Defensa</td><td>10%</td><td>Respuesta a preguntas, profundidad</td></tr>
      </table>
      
      <h3>Consejos para una Buena Defensa</h3>
      <ul>
        <li>Conoce a tu audiencia (técnica vs. no técnica)</li>
        <li>Practica múltiples veces</li>
        <li>Prepara demo robusta (plan B si falla)</li>
        <li>Anticipa preguntas difíciles</li>
        <li>Sé honesto sobre limitaciones</li>
        <li>Enfatiza impacto de negocio, no solo técnica</li>
        <li>Mantén contacto visual</li>
        <li>Gestiona bien el tiempo</li>
      </ul>

      <hr/>

      <h2>9.5. Retos y consideraciones en proyectos reales: Escalabilidad, mantenimiento, interpretabilidad</h2>
      <h3>Escalabilidad</h3>
      <p><strong>Desafíos:</strong></p>
      <ul>
        <li>Modelo funciona en pequeño pero no en grande</li>
        <li>Latencia aumenta con volumen</li>
        <li>Costes de infraestructura se disparan</li>
        <li>Cuellos de botella en procesamiento</li>
      </ul>
      
      <p><strong>Soluciones:</strong></p>
      <ul>
        <li><strong>Arquitectura:</strong> Microservicios, load balancing</li>
        <li><strong>Optimización:</strong> Model compression, quantization</li>
        <li><strong>Caching:</strong> Resultados frecuentes en cache</li>
        <li><strong>Async processing:</strong> Colas para tareas no críticas</li>
        <li><strong>Auto-scaling:</strong> Cloud elasticity</li>
      </ul>
      
      <p><strong>Consideraciones de diseño:</strong></p>
      <ul>
        <li>Planear para 10x el volumen esperado</li>
        <li>Testear bajo carga antes de producción</li>
        <li>Monitorizar métricas de rendimiento</li>
        <li>Tener plan de escalado horizontal</li>
      </ul>
      
      <h3>Mantenimiento</h3>
      <p><strong>Desafíos:</strong></p>
      <ul>
        <li>Data drift: distribución de datos cambia</li>
        <li>Concept drift: relaciones subyacentes cambian</li>
        <li>Model decay: rendimiento degrada con tiempo</li>
        <li>Dependencias externas cambian</li>
        <li>Personal clave se va</li>
      </ul>
      
      <p><strong>Estrategias de mantenimiento:</strong></p>
      <ul>
        <li><strong>Monitorización continua:</strong>
          <ul>
            <li>Tracking de métricas de rendimiento</li>
            <li>Alertas de anomalías</li>
            <li>Dashboards en tiempo real</li>
          </ul>
        </li>
        <li><strong>Retraining programado:</strong>
          <ul>
            <li>Automático (trigger por threshold)</li>
            <li>Periódico (semanal, mensual)</li>
            <li>On-demand (cuando rendimiento cae)</li>
          </ul>
        </li>
        <li><strong>Documentación:</strong>
          <ul>
            <li>Decisiones de diseño</li>
            <li>Dependencias y versiones</li>
            <li>Runbooks de operaciones</li>
            <li>FAQs y troubleshooting</li>
          </ul>
        </li>
        <li><strong>Gobernanza:</strong>
          <ul>
            <li>Owner claro del modelo</li>
            <li>Proceso de cambio definido</li>
            <li>Versionado de modelos</li>
            <li>Auditorías periódicas</li>
          </ul>
        </li>
      </ul>
      
      <h3>Interpretabilidad</h3>
      <p><strong>¿Por qué es importante?</strong></p>
      <ul>
        <li>Confianza de stakeholders</li>
        <li>Cumplimiento regulatorio (GDPR, AI Act)</li>
        <li>Debugging y mejora del modelo</li>
        <li>Detección de sesgos</li>
        <li>Adopción por usuarios finales</li>
      </ul>
      
      <p><strong>Técnicas:</strong></p>
      <ul>
        <li><strong>Global interpretability:</strong>
          <ul>
            <li>Feature importance</li>
            <li>Partial dependence plots</li>
            <li>SHAP values</li>
          </ul>
        </li>
        <li><strong>Local interpretability:</strong>
          <ul>
            <li>LIME</li>
            <li>Contrafactuales</li>
            <li>Attention visualization</li>
          </ul>
        </li>
        <li><strong>Model-agnostic:</strong>
          <ul>
            <li>Funciona con cualquier modelo</li>
            <li>Post-hoc explanations</li>
          </ul>
        </li>
        <li><strong>Inherently interpretable:</strong>
          <ul>
            <li>Modelos simples (regresión, árboles)</li>
            <li>Rule-based systems</li>
            <li>Trade-off con precisión</li>
          </ul>
        </li>
      </ul>
      
      <h3>Otros Retos Comunes</h3>
      <p><strong>1. Calidad de datos:</strong></p>
      <ul>
        <li>Datos incompletos o inconsistentes</li>
        <li>Sesgos no detectados</li>
        <li>Cambios en fuentes de datos</li>
      </ul>
      
      <p><strong>2. Integración con sistemas legacy:</strong></p>
      <ul>
        <li>APIs obsoletas o inexistentes</li>
        <li>Formatos de datos incompatibles</li>
        <li>Restricciones de seguridad</li>
      </ul>
      
      <p><strong>3. Resistencia al cambio:</strong></p>
      <ul>
        <li>Usuarios no confían en IA</li>
        <li>Miedo a reemplazo</li>
        <li>Falta de formación</li>
      </ul>
      
      <p><strong>4. Ética y cumplimiento:</strong></p>
      <ul>
        <li>Privacidad de datos</li>
        <li>Sesgo algorítmico</li>
        <li>Transparencia y explicabilidad</li>
        <li>Cumplimiento de regulaciones</li>
      </ul>
      
      <h3>Lecciones de Proyectos Reales</h3>
      <p><strong>1. Empezar pequeño:</strong></p>
      <ul>
        <li>Proyectos piloto de bajo riesgo</li>
        <li>Demostrar valor rápidamente</li>
        <li>Escalar gradualmente</li>
      </ul>
      
      <p><strong>2. Involucrar stakeholders desde el inicio:</strong></p>
      <ul>
        <li>Entender necesidades reales</li>
        <li>Gestionar expectativas</li>
        <li>Obtener feedback continuo</li>
      </ul>
      
      <p><strong>3. Invertir en datos:</strong></p>
      <ul>
        <li>Calidad sobre cantidad</li>
        <li>Gobernanza desde el inicio</li>
        <li>Documentación exhaustiva</li>
      </ul>
      
      <p><strong>4. Planear el despliegue desde el día 1:</strong></p>
      <ul>
        <li>Considerar restricciones de producción</li>
        <li>Diseñar para escalabilidad</li>
        <li>Automatizar procesos</li>
      </ul>
      
      <p><strong>5. Monitorizar y mantener:</strong></p>
      <ul>
        <li>El trabajo comienza en producción</li>
        <li>Presupuestar mantenimiento</li>
        <li>Planear evolución del modelo</li>
      </ul>
      
      <h3>Checklist Final de Proyecto</h3>
      <p><strong>Antes del despliegue:</strong></p>
      <ul>
        <li>✓ Modelo evaluado en datos no vistos</li>
        <li>✓ Métricas de rendimiento aceptables</li>
        <li>✓ Análisis de sesgo completado</li>
        <li>✓ Documentación técnica completa</li>
        <li>✓ Plan de monitorización definido</li>
        <li>✓ Stakeholders aprobadores identificados</li>
        <li>✓ Plan de rollback preparado</li>
      </ul>
      
      <p><strong>Después del despliegue:</strong></p>
      <ul>
        <li>✓ Monitorización activa configurada</li>
        <li>✓ Alertas de anomalías establecidas</li>
        <li>✓ Schedule de retraining definido</li>
        <li>✓ Owner del modelo asignado</li>
        <li>✓ Documentación de operaciones disponible</li>
        <li>✓ Proceso de feedback de usuarios establecido</li>
      </ul>
    `
  },
  {
    id: 10,
    slug: 'recursos-adicionales',
    title: 'Recursos Adicionales',
    duration: 'Continuo',
    description: 'Enlaces, herramientas y materiales complementarios.',
    longDescription: 'Recursos actualizados constantemente para profundizar en cada área del curso.',
    progress: 0,
    icon: BookCopy,
    resources: [],
    content: `
      <h2>Recursos por Módulo</h2>
      
      <h3>Módulo 1: Introducción a la IA</h3>
      <p><strong>Lecturas recomendadas:</strong></p>
      <ul>
        <li>"Life 3.0" - Max Tegmark</li>
        <li>"Superintelligence" - Nick Bostrom</li>
        <li>"The AI Advantage" - Thomas Davenport</li>
      </ul>
      <p><strong>Cursos online:</strong></p>
      <ul>
        <li>AI For Everyone (Coursera - Andrew Ng)</li>
        <li>Elements of AI (Universidad de Helsinki)</li>
      </ul>
      
      <h3>Módulo 2: LLMs</h3>
      <p><strong>Documentación oficial:</strong></p>
      <ul>
        <li>OpenAI API Documentation</li>
        <li>Anthropic Claude Documentation</li>
        <li>Google AI Studio</li>
      </ul>
      <p><strong>Herramientas prácticas:</strong></p>
      <ul>
        <li>ChatGPT Plus</li>
        <li>Claude.ai</li>
        <li>Perplexity AI</li>
        <li>Prompt engineering guides</li>
      </ul>
      
      <h3>Módulo 3: Avatares Virtuales</h3>
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>Synthesia.io</li>
        <li>HeyGen</li>
        <li>D-ID</li>
        <li>ElevenLabs</li>
      </ul>
      
      <h3>Módulo 4: Bots y Asistentes</h3>
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Dialogflow (Google)</li>
        <li>Microsoft Bot Framework</li>
        <li>Landbot</li>
        <li>Voiceflow</li>
      </ul>
      
      <h3>Módulo 5: Low-Code e IA</h3>
      <p><strong>Plataformas:</strong></p>
      <ul>
        <li>MAKE.com</li>
        <li>Zapier</li>
        <li>n8n</li>
        <li>Bubble</li>
      </ul>
      
      <h3>Módulo 6: Marketing con IA</h3>
      <p><strong>Herramientas:</strong></p>
      <ul>
        <li>Jasper.ai</li>
        <li>Surfer SEO</li>
        <li>Copy.ai</li>
        <li>Midjourney</li>
      </ul>
      
      <h3>Módulo 7: Ética y Privacidad</h3>
      <p><strong>Recursos legales:</strong></p>
      <ul>
        <li>EUR-Lex AI Act</li>
        <li>AEPD (Agencia Española de Protección de Datos)</li>
        <li>Partnership on AI</li>
      </ul>
      
      <h3>Módulo 8: Aplicaciones Funcionales</h3>
      <p><strong>Casos de estudio:</strong></p>
      <ul>
        <li>Harvard Business Review AI cases</li>
        <li>MIT Sloan AI examples</li>
        <li>McKinsey AI insights</li>
      </ul>
      
      <h3>Módulo 9: Proyectos</h3>
      <p><strong>Repositorios de referencia:</strong></p>
      <ul>
        <li>GitHub Awesome AI</li>
        <li>Kaggle Learn</li>
        <li>Hugging Face Courses</li>
      </ul>
      
      <h2>Comunidades y Foros</h2>
      <ul>
        <li>r/MachineLearning (Reddit)</li>
        <li>r/artificial (Reddit)</li>
        <li>AI Discord servers</li>
        <li>LinkedIn AI groups</li>
        <li>Meetups locales de IA</li>
      </ul>
      
      <h2>Newsletters Recomendadas</h2>
      <ul>
        <li>The Batch (DeepLearning.AI)</li>
        <li>Import AI (Jack Clark)</li>
        <li>AI Weekly</li>
        <li>Ben's Bites</li>
      </ul>
    `
  }
];

export const getUser = () => ({
  name: 'Profesor/Estudiante',
  email: 'usuario@ceoe-fedeto.com',
  role: 'instructor' // Simulado para el prototipo
});