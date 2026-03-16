'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: number;
  cat: string;
  text: string;
  options: string[];
  correct: number;
  explain: string;
}

const questions: Question[] = [
  { id: 1, cat: "Validación de Datos", text: "¿Qué método es el más eficaz para evitar que un LLM invente datos técnicos al redactar informes financieros?", options: ["Pedirle que sea 'muy creativo' para rellenar vacíos.", "Implementar RAG (Generación Aumentada por Recuperación) para anclar las respuestas a documentos reales.", "Usar un modelo con una temperatura muy alta."], correct: 1, explain: "El RAG conecta al modelo con una base de conocimientos externa (tu 'verdad'), eliminando la necesidad de que el modelo adivine cifras o datos." },
  { id: 2, cat: "Seguridad Corporativa", text: "Si un empleado introduce datos confidenciales de clientes en un chat de IA público, ¿cuál es el mayor riesgo?", options: ["Que el sistema tarde más en responder.", "La fuga de privacidad y que esos datos se usen para entrenar futuros modelos públicos.", "Que el formato del texto cambie automáticamente."], correct: 1, explain: "Los modelos públicos suelen ingerir los datos del usuario para mejorar. Esto expone secretos comerciales y datos protegidos por ley." },
  { id: 3, cat: "Infraestructura", text: "¿En qué se diferencia principalmente el Fine-tuning del RAG?", options: ["Fine-tuning cambia la 'personalidad' y estilo del modelo; RAG le da acceso a 'libros de consulta' externos.", "RAG es más caro y lento de implementar que el Fine-tuning.", "No hay diferencia, son dos nombres para lo mismo."], correct: 0, explain: "Fine-tuning ajusta los pesos del modelo para un comportamiento específico. RAG es como darle una enciclopedia actualizada al modelo sin cambiar su estructura." },
  { id: 4, cat: "Actualización de Datos", text: "Para un sistema de atención al cliente que debe saber el stock actual cada minuto, ¿qué técnica es necesaria?", options: ["Actualizar el prompt del sistema cada hora.", "Usar RAG conectado a la base de datos de inventario vía API.", "Re-entrenar el modelo (Fine-tuning) todas las noches."], correct: 1, explain: "Solo RAG permite acceder a información volátil y en tiempo real sin el coste prohibitivo de re-entrenar el modelo constantemente." },
  { id: 5, cat: "Ingeniería de Prompts", text: "¿Qué elementos componen un prompt profesional de alto rendimiento?", options: ["Solo una instrucción clara y directa.", "Rol, Contexto, Instrucciones detalladas, Restricciones y Formato de salida deseado.", "Muchas palabras de cortesía y exclamaciones."], correct: 1, explain: "La modularidad en el prompt (Framework) reduce la ambigüedad y permite que la IA ejecute tareas complejas con precisión industrial." },
  { id: 6, cat: "Control de Salida", text: "Deseas que la IA genere siempre respuestas en formato JSON para una app. ¿Cómo aseguras la máxima consistencia?", options: ["Bajando la temperatura a 0 y definiendo el esquema exacto en el prompt.", "Subiendo la temperatura para que varíe el código.", "Cambiando el idioma del prompt a inglés solamente."], correct: 0, explain: "Temperatura 0 elimina la aleatoriedad. Combinado con una instrucción de formato rígida, garantiza que la salida sea legible por máquinas." },
  { id: 7, cat: "Gobernanza", text: "¿Cuál es la principal ventaja de usar un 'Custom GPT' corporativo en lugar de uno personal?", options: ["Que tiene iconos más bonitos.", "Permite centralizar el conocimiento del departamento, controlar accesos y asegurar que todos usen las mismas instrucciones.", "Que responde más rápido por ser de la empresa."], correct: 1, explain: "La gobernanza permite estandarizar procesos. Todos los empleados operan bajo la misma lógica y base de datos aprobada." },
  { id: 8, cat: "Prevención de Errores", text: "Para evitar alucinaciones en un manual técnico, ¿qué instrucción de 'salvaguarda' añadirías al prompt?", options: ["'Si no encuentras la información en los documentos, indícalo y no inventes'.", "'Intenta adivinar basándote en lo que sepas de otros manuales similares'.", "'Responde siempre algo, el usuario no debe quedarse sin respuesta'."], correct: 0, explain: "Forzar al modelo a admitir ignorancia cuando la fuente no contiene el dato es la mejor defensa contra las alucinaciones." },
  { id: 9, cat: "Ataques de IA", text: "Un intento de engañar al modelo para que ignore sus reglas de seguridad se conoce como:", options: ["Deepfake de texto.", "Prompt Injection (Inyección de Prompt).", "Alucinación dirigida."], correct: 1, explain: "La inyección de prompt busca 'romper' las restricciones del sistema para obtener información prohibida o saltarse bloqueos éticos." },
  { id: 10, cat: "KPIs de IA", text: "¿Cómo medirías el éxito de la implementación de un LLM en el departamento legal?", options: ["Por el número de palabras generadas.", "Por la reducción de tiempo en la revisión de contratos y la precisión en la detección de cláusulas críticas.", "Por si la IA escribe de forma muy poética."], correct: 1, explain: "El éxito se mide en eficiencia operativa (tiempo) y calidad técnica (precisión), no en volumen de texto." },
  { id: 11, cat: "Estructura Avanzada", text: "En un prompt, ¿para qué sirve definir las 'Restricciones'?", options: ["Para que la IA no hable demasiado.", "Para acotar el comportamiento, evitar temas sensibles y definir qué NO debe hacer el modelo bajo ninguna circunstancia.", "Para que el modelo use menos memoria."], correct: 1, explain: "Las restricciones son tan importantes como las instrucciones. Definen los límites de seguridad y estilo de la marca." },
  { id: 12, cat: "Automatización", text: "Quieres extraer datos de facturas automáticamente. ¿Cuál es el formato de salida ideal para procesarlo después?", options: ["Un resumen narrativo.", "Un formato estructurado como JSON o CSV.", "Un archivo de audio."], correct: 1, explain: "Los formatos estructurados permiten que otros programas lean los datos automáticamente sin intervención humana." },
  { id: 13, cat: "Gestión de Hilos", text: "Si una conversación con la IA se vuelve confusa tras muchos mensajes, la mejor práctica es:", options: ["Seguir preguntando hasta que lo entienda.", "Reiniciar el chat o proporcionar un resumen de los puntos clave para limpiar la memoria de trabajo del modelo.", "Escribir en mayúsculas."], correct: 1, explain: "La ventana de contexto es limitada. Limpiar el historial o resumir enfoca de nuevo la 'atención' del modelo." },
  { id: 14, cat: "Ética y Privacidad", text: "¿Qué debe hacer un bot interno si un empleado pregunta por el salario de su jefe?", options: ["Buscar en los archivos y responder.", "Denegar la petición citando la política de privacidad y no revelar datos sensibles.", "Inventar un número para que el empleado esté contento."], correct: 1, explain: "La IA debe estar alineada con las políticas de privacidad de la empresa. El acceso a datos sensibles debe estar bloqueado por diseño." },
  { id: 15, cat: "Consistencia (SOP)", text: "En tareas de clasificación de correos (Spam/No Spam), ¿qué temperatura es la adecuada?", options: ["0.0 (Cero).", "0.7 (Creativo).", "1.0 (Máxima variabilidad)."], correct: 0, explain: "La clasificación requiere una decisión lógica única y repetible. La temperatura 0 asegura que el mismo correo se clasifique igual siempre." },
  { id: 16, cat: "RAG Avanzado", text: "¿Qué significa 'Grounding' en el contexto de las respuestas de una IA?", options: ["Que la IA esté conectada a tierra físicamente.", "Anclar las respuestas exclusivamente en evidencias encontradas en los documentos proporcionados.", "Que la IA use un lenguaje muy básico."], correct: 1, explain: "El grounding es la técnica de 'aterrizar' la respuesta a los hechos para evitar la deriva creativa o alucinación." },
  { id: 17, cat: "Aprendizaje Rápido", text: "¿Qué es el 'Few-shot prompting'?", options: ["Hacer una pregunta y esperar una respuesta corta.", "Incluir unos pocos ejemplos de entrada/salida en el prompt para guiar el comportamiento del modelo.", "Darle muchas oportunidades de fallar."], correct: 1, explain: "Es la forma más efectiva de enseñar un patrón al modelo sin necesidad de programar nada nuevo." },
  { id: 18, cat: "Optimización de Costes", text: "¿Cómo reduces el consumo de 'tokens' (y por tanto el coste) en un proyecto?", options: ["Haciendo preguntas más largas.", "Siendo conciso, usando modelos más pequeños para tareas simples y evitando repetir instrucciones innecesarias.", "Usando siempre el modelo más caro."], correct: 1, explain: "La eficiencia en los tokens reduce directamente la factura de la API y mejora la velocidad de respuesta." },
  { id: 19, cat: "Elección de Herramientas", text: "Para crear un asistente de escritura que use mi estilo de redacción personal, ¿qué es lo más eficiente?", options: ["Programar una IA desde cero.", "Un Custom GPT con ejemplos de mis textos y una guía de estilo clara en las instrucciones.", "Usar un buscador tradicional."], correct: 1, explain: "Los Custom GPTs son ideales para tareas de personalización de estilo sin complejidad técnica de integración." },
  { id: 20, cat: "Visión de Negocio", text: "¿Cuál es el primer paso recomendado antes de desplegar una IA en un departamento?", options: ["Comprar las licencias más caras para todos.", "Identificar casos de uso de alto impacto y bajo riesgo, y realizar una prueba piloto (PoC).", "Sustituir a los empleados por bots de inmediato."], correct: 1, explain: "Una implementación exitosa es gradual: se identifican problemas reales, se prueban soluciones y luego se escala lo que funciona." }
];

type Mode = 'practice' | 'exam';

export default function LLMTrainingGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mode, setMode] = useState<Mode>('practice');
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [showResults, setShowResults] = useState(false);

  const currentQ = questions[currentIdx];
  const letters = ['A', 'B', 'C'];

  const completed = userAnswers.filter(a => a !== null).length;
  const progressPct = Math.round((completed / questions.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (userAnswers[currentIdx] !== null) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentIdx] = idx;
    setUserAnswers(newAnswers);
    
    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, wrong: prev.wrong }));
    } else {
      setScore(prev => ({ correct: prev.correct, wrong: prev.wrong + 1 }));
    }
  };

  const changeQuestion = (step: number) => {
    const newIdx = currentIdx + step;
    if (newIdx >= 0 && newIdx < questions.length) {
      setCurrentIdx(newIdx);
    } else if (newIdx >= questions.length) {
      setShowResults(true);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'practice' ? 'exam' : 'practice');
    setUserAnswers(Array(questions.length).fill(null));
    setScore({ correct: 0, wrong: 0 });
    setCurrentIdx(0);
    setShowResults(false);
  };

  const restartGame = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setScore({ correct: 0, wrong: 0 });
    setCurrentIdx(0);
    setShowResults(false);
  };

  const getResultMessage = () => {
    const pct = (score.correct / questions.length) * 100;
    if (pct >= 80) return "¡Nivel Experto! Estás totalmente preparado para liderar proyectos de IA.";
    if (pct >= 60) return "¡Buen trabajo! Tienes los conceptos claros, pero repasa los errores antes del viernes.";
    return "Necesitas un repaso profundo de la teoría. ¡Vuelve a intentarlo!";
  };

  // Estilos CSS en JS fieles al diseño original
  const styles = {
    container: {
      background: '#050810',
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
      color: '#f8fafc',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    } as React.CSSProperties,
    topProgress: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '6px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 1000,
    } as React.CSSProperties,
    progressFill: {
      height: '100%',
      width: `${progressPct}%`,
      background: 'linear-gradient(90deg, #6366f1, #10b981)',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    } as React.CSSProperties,
    appContainer: {
      width: '100%',
      maxWidth: '1100px',
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: '30px',
      margin: '0 auto',
    } as React.CSSProperties,
    mainPanel: {
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      position: 'relative' as const,
      overflow: 'hidden',
    } as React.CSSProperties,
    statusBadge: {
      background: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      padding: '6px 14px',
      borderRadius: '8px',
      fontSize: '0.75rem',
      fontWeight: 800,
      letterSpacing: '1px',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      display: 'inline-block',
      marginBottom: '15px',
    } as React.CSSProperties,
    h1: {
      fontSize: '2.2rem',
      margin: '15px 0',
      fontWeight: 800,
      letterSpacing: '-1px',
    } as React.CSSProperties,
    qMeta: {
      color: '#10b981',
      fontWeight: 700,
      fontSize: '0.85rem',
      textTransform: 'uppercase' as const,
      marginBottom: '8px',
      display: 'block',
    } as React.CSSProperties,
    qText: {
      fontSize: '1.3rem',
      lineHeight: 1.4,
      marginBottom: '30px',
      fontWeight: 500,
      color: '#fff',
    } as React.CSSProperties,
    optionsGrid: {
      display: 'grid',
      gap: '14px',
    } as React.CSSProperties,
    option: (isAnswered: boolean, isCorrect: boolean, isSelected: boolean) => ({
      background: 'rgba(255, 255, 255, 0.02)',
      border: `1px solid ${isAnswered ? (isCorrect ? '#10b981' : isSelected ? '#f43f5e' : 'rgba(255, 255, 255, 0.08)') : 'rgba(255, 255, 255, 0.08)'}`,
      padding: '18px 24px',
      borderRadius: '14px',
      cursor: isAnswered ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      position: 'relative' as const,
      opacity: isAnswered && !isCorrect && !isSelected ? 0.8 : 1,
      background: isAnswered 
        ? (isCorrect ? 'rgba(16, 185, 129, 0.15)' : isSelected ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.02)')
        : 'rgba(255, 255, 255, 0.02)',
      boxShadow: isCorrect ? '0 0 20px rgba(16, 185, 129, 0.1)' : 'none',
      transform: !isAnswered ? 'scale(1)' : 'scale(1)',
    } as React.CSSProperties),
    letter: (isAnswered: boolean, isCorrect: boolean, isSelected: boolean) => ({
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: isAnswered ? (isCorrect ? '#10b981' : isSelected ? '#f43f5e' : 'rgba(255,255,255,0.05)') : 'rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      color: isAnswered ? '#fff' : '#94a3b8',
      transition: '0.3s',
      flexShrink: 0,
    } as React.CSSProperties),
    feedbackCard: {
      marginTop: '30px',
      padding: '20px',
      borderRadius: '14px',
      background: 'rgba(0,0,0,0.3)',
      borderLeft: '4px solid #6366f1',
      display: userAnswers[currentIdx] !== null && mode === 'practice' ? 'block' : 'none',
      animation: 'slideIn 0.3s ease-out',
    } as React.CSSProperties,
    sidePanel: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px',
    } as React.CSSProperties,
    sideCard: {
      background: 'rgba(15, 23, 42, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    } as React.CSSProperties,
    statRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      fontSize: '0.9rem',
    } as React.CSSProperties,
    progressGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '8px',
    } as React.CSSProperties,
    dot: (i: number, isAnswered: boolean, isCorrect: boolean) => ({
      aspectRatio: '1',
      borderRadius: '8px',
      background: isAnswered ? (isCorrect ? '#10b981' : '#f43f5e') : '#1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      border: `1px solid ${i === currentIdx ? '#6366f1' : 'rgba(255, 255, 255, 0.08)'}`,
      cursor: 'pointer',
      transition: '0.2s',
      transform: i === currentIdx ? 'scale(1.1)' : 'scale(1)',
      zIndex: i === currentIdx ? 2 : 1,
      color: isAnswered ? '#fff' : '#94a3b8',
    } as React.CSSProperties),
    btnNext: {
      padding: '14px 28px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      transition: '0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textTransform: 'uppercase' as const,
      fontSize: '0.8rem',
      letterSpacing: '1px',
      background: '#6366f1',
      color: '#fff',
      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    } as React.CSSProperties,
    btnPrev: {
      padding: '14px 28px',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      cursor: 'pointer',
      fontWeight: 700,
      transition: '0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textTransform: 'uppercase' as const,
      fontSize: '0.8rem',
      letterSpacing: '1px',
      background: 'transparent',
      color: '#94a3b8',
    } as React.CSSProperties,
    navBtns: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '40px',
    } as React.CSSProperties,
    resultsView: {
      textAlign: 'center' as const,
      padding: '40px 0',
    } as React.CSSProperties,
  };

  if (showResults) {
    return (
      <div style={styles.container}>
        <div style={styles.topProgress}>
          <div style={{...styles.progressFill, width: '100%'}} />
        </div>
        <div style={styles.appContainer}>
          <main style={styles.mainPanel}>
            <div style={styles.resultsView}>
              <TrophyIcon style={{fontSize: '4rem', color: '#fbbf24', marginBottom: '20px'}} />
              <h2 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '20px'}}>¡Simulacro Finalizado!</h2>
              <div style={{fontSize: '5rem', fontWeight: 900, margin: '20px 0', color: '#10b981'}}>{score.correct}/20</div>
              <p style={{fontSize: '1.1rem', color: '#94a3b8', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px'}}>{getResultMessage()}</p>
              <button style={{...styles.btnNext, margin: '0 auto'}} onClick={restartGame}>
                <RotateIcon size={18} /> Reiniciar Sistema
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .option-hover:hover { background: rgba(99, 102, 241, 0.05) !important; border-color: #6366f1 !important; transform: scale(1.02) !important; }
      `}</style>
      
      <div style={styles.topProgress}>
        <div style={styles.progressFill} />
      </div>

      <div style={styles.appContainer}>
        <main style={styles.mainPanel}>
          <header style={{marginBottom: '30px'}}>
            <span style={styles.statusBadge}>
              {mode === 'practice' ? '⚡ MODO ENTRENAMIENTO' : '🎓 MODO EXAMEN'}
            </span>
            <h1 style={styles.h1}>IA Strategy Exam</h1>
          </header>

          <div style={{animation: 'fadeIn 0.5s ease-out'}}>
            <span style={styles.qMeta}>{currentQ.cat}</span>
            <div style={styles.qText}>{currentQ.text}</div>
            
            <div style={styles.optionsGrid}>
              {currentQ.options.map((opt, i) => {
                const isSelected = userAnswers[currentIdx] === i;
                const isCorrect = i === currentQ.correct;
                const isAnswered = userAnswers[currentIdx] !== null;
                
                return (
                  <div
                    key={i}
                    style={{
                      ...styles.option(isAnswered, isCorrect, isSelected),
                    }}
                    className={!isAnswered ? 'option-hover' : ''}
                    onClick={() => handleSelectOption(i)}
                  >
                    <div style={styles.letter(isAnswered, isCorrect, isSelected)}>
                      {letters[i]}
                    </div>
                    <span style={{color: '#f8fafc', fontSize: '0.95rem'}}>{opt}</span>
                  </div>
                );
              })}
            </div>

            <div style={styles.feedbackCard}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                <LightbulbIcon style={{color: '#6366f1'}} />
                <strong style={{color: '#6366f1', textTransform: 'uppercase', fontSize: '0.8rem'}}>Justificación Técnica</strong>
              </div>
              <p style={{fontSize: '0.95rem', lineHeight: 1.5, color: '#94a3b8'}}>{currentQ.explain}</p>
            </div>

            <div style={styles.navBtns}>
              <button 
                style={styles.btnPrev} 
                onClick={() => changeQuestion(-1)}
                disabled={currentIdx === 0}
              >
                <ChevronLeftIcon size={18} /> Anterior
              </button>
              <button style={styles.btnNext} onClick={() => changeQuestion(1)}>
                Siguiente <ChevronRightIcon size={18} />
              </button>
            </div>
          </div>
        </main>

        <aside style={styles.sidePanel}>
          <div style={styles.sideCard}>
            <h3 style={{marginBottom: '20px', fontSize: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px'}}>Estadísticas</h3>
            <div style={styles.statRow}><span>Completado:</span> <span style={{fontWeight: 800, color: '#10b981'}}>{progressPct}%</span></div>
            <div style={styles.statRow}><span>Aciertos:</span> <span style={{fontWeight: 800, color: '#10b981'}}>{score.correct}</span></div>
            <div style={styles.statRow}><span>Errores:</span> <span style={{fontWeight: 800, color: '#f43f5e'}}>{score.wrong}</span></div>
          </div>

          <div style={styles.sideCard}>
            <h3 style={{marginBottom: '15px', fontSize: '1rem'}}>Navegación</h3>
            <div style={styles.progressGrid}>
              {questions.map((_, i) => {
                const isAnswered = userAnswers[i] !== null;
                const isCorrect = userAnswers[i] === questions[i].correct;
                return (
                  <div
                    key={i}
                    style={styles.dot(i, isAnswered, isCorrect)}
                    onClick={() => setCurrentIdx(i)}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.sideCard}>
            <h3 style={{marginBottom: '15px', fontSize: '1rem'}}>Configuración</h3>
            <button 
              style={{...styles.btnPrev, width: '100%', marginBottom: '10px', fontSize: '0.7rem'}} 
              onClick={toggleMode}
            >
              Cambiar a {mode === 'practice' ? 'Modo Examen' : 'Modo Entrenamiento'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Iconos SVG simples
function ChevronLeftIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  );
}

function ChevronRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

function LightbulbIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  );
}

function TrophyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  );
}

function RotateIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>
  );
}
