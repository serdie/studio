'use client';

import { useEffect } from 'react';

export default function TurismoToledoAvatar3DPractice() {
  useEffect(() => {
    // Inicializar métricas al cargar
    const promptSistemaEl = document.getElementById('promptSistema') as HTMLTextAreaElement;
    const temasPermitidosEl = document.getElementById('temasPermitidos') as HTMLTextAreaElement;
    const temasProhibidosEl = document.getElementById('temasProhibidos') as HTMLTextAreaElement;
    const ejemplosQAEl = document.getElementById('ejemplosQA') as HTMLTextAreaElement;
    const metricsPromptEl = document.getElementById('metricsPrompt');

    if (promptSistemaEl && metricsPromptEl) {
      actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl);
      promptSistemaEl.addEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
    }
    if (temasPermitidosEl) {
      temasPermitidosEl.addEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
    }
    if (temasProhibidosEl) {
      temasProhibidosEl.addEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
    }
    if (ejemplosQAEl) {
      ejemplosQAEl.addEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
    }

    // Event listeners para botones
    const btnLimpiar = document.getElementById('btnLimpiar');
    const btnGenerarDoc = document.getElementById('btnGenerarDoc');
    const statusEl = document.getElementById('status');

    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', limpiarTodo);
    }
    if (btnGenerarDoc) {
      btnGenerarDoc.addEventListener('click', generarDoc);
    }

    return () => {
      if (promptSistemaEl) {
        promptSistemaEl.removeEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
      }
      if (temasPermitidosEl) {
        temasPermitidosEl.removeEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
      }
      if (temasProhibidosEl) {
        temasProhibidosEl.removeEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
      }
      if (ejemplosQAEl) {
        ejemplosQAEl.removeEventListener('input', () => actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl!));
      }
      if (btnLimpiar) {
        btnLimpiar.removeEventListener('click', limpiarTodo);
      }
      if (btnGenerarDoc) {
        btnGenerarDoc.removeEventListener('click', generarDoc);
      }
    };
  }, []);

  function contarPalabras(texto: string): number {
    if (!texto || !texto.trim()) return 0;
    return texto.trim().split(/\s+/).filter(Boolean).length;
  }

  function actualizarMetricasPrompt(
    promptSistemaEl: HTMLTextAreaElement,
    temasPermitidosEl: HTMLTextAreaElement,
    temasProhibidosEl: HTMLTextAreaElement,
    ejemplosQAEl: HTMLTextAreaElement,
    metricsEl: HTMLElement
  ) {
    const totalTexto =
      (promptSistemaEl.value || '') +
      ' ' +
      (temasPermitidosEl.value || '') +
      ' ' +
      (temasProhibidosEl.value || '') +
      ' ' +
      (ejemplosQAEl.value || '');

    const palabras = contarPalabras(totalTexto);
    metricsEl.innerHTML = '';

    const pill = (txt: string, extra = '') => {
      const span = document.createElement('span');
      span.className = `metric-pill ${extra}`;
      span.textContent = txt;
      metricsEl.appendChild(span);
    };

    if (!totalTexto.trim()) {
      pill('Escribe el cerebro del avatar (prompt + temas + ejemplos) para ver cuántas palabras ocupa.');
      return;
    }

    pill(`Total palabras en el "cerebro" del avatar: ${palabras}`, 'metric-ok');

    if (palabras < 80) {
      pill('Demasiado corto: quizá el avatar se quede sin contexto.', 'metric-warn');
    } else if (palabras > 400) {
      pill('Muy largo: podría ser difícil de mantener. Valora simplificar.', 'metric-warn');
    } else {
      pill('Buen equilibrio de tamaño para un avatar práctico.', 'metric-ok');
    }
  }

  function limpiarTodo() {
    const fields = [
      'zonaCiudad', 'duracionInteraccion', 'objetivoTurismo', 'publicoTurismo',
      'descripcionAvatar', 'escenario3D', 'plataformaAvatar', 'formatoSalida',
      'promptSistema', 'temasPermitidos', 'temasProhibidos', 'ejemplosQA',
      'flujoInicio', 'flujoRecomendacion', 'flujoDudas', 'flujoCierre',
      'momentoWow', 'pasosPlataforma', 'testingPlan', 'planCaidas',
      'riesgosIA', 'nombreAlumno'
    ];

    fields.forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = '';
      }
    });

    const promptSistemaEl = document.getElementById('promptSistema') as HTMLTextAreaElement;
    const temasPermitidosEl = document.getElementById('temasPermitidos') as HTMLTextAreaElement;
    const temasProhibidosEl = document.getElementById('temasProhibidos') as HTMLTextAreaElement;
    const ejemplosQAEl = document.getElementById('ejemplosQA') as HTMLTextAreaElement;
    const metricsPromptEl = document.getElementById('metricsPrompt');
    if (promptSistemaEl && metricsPromptEl) {
      actualizarMetricasPrompt(promptSistemaEl, temasPermitidosEl, temasProhibidosEl, ejemplosQAEl, metricsPromptEl);
    }

    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = 'He vaciado todos los campos del ejercicio. Puedes empezar de nuevo.';
    }
  }

  function prepararHTMLSeguro(texto: string): string {
    if (!texto) return '';
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }

  function generarDoc() {
    const promptSistemaEl = document.getElementById('promptSistema') as HTMLTextAreaElement;
    const statusEl = document.getElementById('status');

    if (!promptSistemaEl || !promptSistemaEl.value.trim()) {
      if (statusEl) {
        statusEl.textContent = 'Antes de descargar, rellena al menos el prompt/cerebro del avatar (Paso 3).';
      }
      return;
    }

    const getValue = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
      return el ? el.value : '';
    };

    const contenido = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Práctica 3 - Turismo Toledo: Guía 3D conversacional con IA</title>
</head>
<body>
  <h1>Práctica 3 – Turismo Toledo: Guía 3D conversacional con IA</h1>
  <p><strong>Alumno/a:</strong> ${prepararHTMLSeguro(getValue('nombreAlumno'))}</p>

  <h2>1. Encargo de Turismo Toledo</h2>
  <p><strong>Zona principal:</strong> ${prepararHTMLSeguro(getValue('zonaCiudad'))}</p>
  <p><strong>Duración típica de interacción (s):</strong> ${prepararHTMLSeguro(getValue('duracionInteraccion'))}</p>
  <p><strong>Objetivo para Turismo Toledo:</strong><br>${prepararHTMLSeguro(getValue('objetivoTurismo'))}</p>
  <p><strong>Público objetivo:</strong><br>${prepararHTMLSeguro(getValue('publicoTurismo'))}</p>

  <h2>2. Diseño visual del avatar 3D y entorno</h2>
  <p><strong>Descripción del avatar:</strong><br>${prepararHTMLSeguro(getValue('descripcionAvatar'))}</p>
  <p><strong>Escenario 3D:</strong><br>${prepararHTMLSeguro(getValue('escenario3D'))}</p>
  <p><strong>Plataforma/avatar:</strong> ${prepararHTMLSeguro(getValue('plataformaAvatar'))}</p>
  <p><strong>Formato de salida:</strong> ${prepararHTMLSeguro(getValue('formatoSalida'))}</p>

  <h2>3. El "cerebro" del avatar</h2>
  <p><strong>Prompt de sistema:</strong><br>${prepararHTMLSeguro(getValue('promptSistema'))}</p>
  <p><strong>Temas permitidos:</strong><br>${prepararHTMLSeguro(getValue('temasPermitidos'))}</p>
  <p><strong>Temas prohibidos / a derivar:</strong><br>${prepararHTMLSeguro(getValue('temasProhibidos'))}</p>
  <p><strong>Ejemplos de preguntas y respuestas:</strong><br>${prepararHTMLSeguro(getValue('ejemplosQA'))}</p>

  <h2>4. Flujo de conversación y experiencia</h2>
  <p><strong>Inicio de la conversación:</strong><br>${prepararHTMLSeguro(getValue('flujoInicio'))}</p>
  <p><strong>Recomendación principal:</strong><br>${prepararHTMLSeguro(getValue('flujoRecomendacion'))}</p>
  <p><strong>Gestión de dudas:</strong><br>${prepararHTMLSeguro(getValue('flujoDudas'))}</p>
  <p><strong>Cierre de la interacción:</strong><br>${prepararHTMLSeguro(getValue('flujoCierre'))}</p>
  <p><strong>Momento WOW:</strong><br>${prepararHTMLSeguro(getValue('momentoWow'))}</p>

  <h2>5. Implementación y checklist IA responsable</h2>
  <p><strong>Pasos en la plataforma:</strong><br>${prepararHTMLSeguro(getValue('pasosPlataforma'))}</p>
  <p><strong>Plan de pruebas:</strong><br>${prepararHTMLSeguro(getValue('testingPlan'))}</p>
  <p><strong>Qué pasa si la IA falla/no sabe:</strong><br>${prepararHTMLSeguro(getValue('planCaidas'))}</p>
  <p><strong>Riesgos detectados y mitigación:</strong><br>${prepararHTMLSeguro(getValue('riesgosIA'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 3 – Módulo 3 (guía 3D conversacional para Turismo Toledo).</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica3_TurismoToledo_Avatar3D.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con el diseño completo del guía 3D: encargo, avatar, cerebro, flujo y riesgos.';
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .app {
          width: 100%;
          max-width: 1150px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #fcd34d 70%, #fbbf24 100%);
          border-radius: 24px;
          border: 3px solid #f59e0b;
          box-shadow: 0 15px 50px rgba(245, 158, 11, 0.25);
          padding: 26px 22px 30px;
          position: relative;
          overflow: hidden;
        }

        .app::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 0%, rgba(251, 191, 36, 0.15), transparent 40%),
            radial-gradient(circle at 85% 0%, rgba(245, 158, 11, 0.12), transparent 40%),
            radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.1), transparent 40%);
          pointer-events: none;
        }

        header,
        section,
        .btn-row,
        .status {
          position: relative;
          z-index: 1;
        }

        h1 {
          margin: 0 0 8px;
          font-size: 1.6rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ea580c, #f59e0b, #eab308, #16a34a);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 800;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
          margin: 0 0 14px;
          font-size: 0.97rem;
          color: #78350f;
          line-height: 1.6;
          font-weight: 500;
        }

        .intro-steps {
          margin: 0 0 18px;
          padding-left: 1.3rem;
          font-size: 0.9rem;
          color: #92400e;
        }

        .intro-steps li {
          margin-bottom: 6px;
        }

        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .badge {
          font-size: 0.76rem;
          padding: 5px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(245, 158, 11, 0.2));
          border: 2px solid #fbbf24;
          color: #b45309;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 16px;
          margin-bottom: 18px;
        }

        @media (max-width: 950px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .card {
          border-radius: 18px;
          border: 3px solid;
          padding: 14px 15px 13px;
          position: relative;
          overflow: hidden;
          background: white;
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        .card:nth-child(1) {
          border-color: #fb923c;
          box-shadow: 0 6px 16px rgba(251, 146, 60, 0.3);
        }
        .card:nth-child(2) {
          border-color: #fbbf24;
          box-shadow: 0 6px 16px rgba(251, 191, 36, 0.3);
        }
        .card:nth-child(3) {
          border-color: #eab308;
          box-shadow: 0 6px 16px rgba(234, 179, 8, 0.3);
        }
        .card:nth-child(4) {
          border-color: #84cc16;
          box-shadow: 0 6px 16px rgba(132, 204, 22, 0.3);
        }
        .card:nth-child(5) {
          border-color: #16a34a;
          box-shadow: 0 6px 16px rgba(22, 163, 74, 0.3);
        }

        .card-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #78350f;
        }

        .card-number {
          font-size: 0.78rem;
          padding: 4px 9px;
          border-radius: 999px;
          border: 2px solid #fbbf24;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #b45309;
          font-weight: 700;
        }

        .card-text {
          position: relative;
          font-size: 0.88rem;
          color: #78350f;
          margin-bottom: 8px;
          line-height: 1.6;
        }

        label {
          font-size: 0.84rem;
          color: #92400e;
          display: block;
          margin-bottom: 5px;
          font-weight: 700;
        }

        textarea,
        input[type='text'],
        input[type='number'] {
          width: 100%;
          border-radius: 12px;
          border: 2px solid #fcd34d;
          background: white;
          color: #1e293b;
          font-size: 0.88rem;
          padding: 9px 11px;
          resize: vertical;
          min-height: 54px;
          outline: none;
          transition: all 0.2s ease;
        }

        textarea:focus,
        input[type='text']:focus,
        input[type='number']:focus {
          border-color: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.25);
          transform: translateY(-1px);
        }

        input[type='text'],
        input[type='number'] {
          min-height: auto;
        }

        .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }

        @media (max-width: 700px) {
          .row-2 {
            grid-template-columns: 1fr;
          }
        }

        .small {
          font-size: 0.82rem;
          color: #b45309;
          margin-top: 5px;
          font-style: italic;
        }

        .metrics {
          margin-top: 7px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
        }

        .metric-pill {
          padding: 4px 9px;
          border-radius: 999px;
          border: 2px solid #fbbf24;
          background: white;
          color: #b45309;
          font-weight: 600;
        }

        .metric-ok {
          border-color: #22c55e;
          background: #f0fdf4;
          color: #166534;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
        }

        .metric-warn {
          border-color: #ef4444;
          background: #fef2f2;
          color: #991b1b;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
        }

        .checklist {
          font-size: 0.83rem;
          color: #78350f;
          margin-top: 6px;
          padding-left: 1.2rem;
        }

        .checklist li {
          margin-bottom: 5px;
        }

        .btn-row {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .btn {
          border-radius: 999px;
          border: 2px solid #fbbf24;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: white;
          padding: 9px 20px;
          font-size: 0.84rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
          font-weight: 700;
          box-shadow: 0 6px 16px rgba(245, 158, 11, 0.3);
        }

        .btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
          border-color: #f59e0b;
        }

        .btn:active {
          transform: scale(0.98);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
        }

        .btn.secondary {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #b45309;
          border-color: #fbbf24;
          box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);
        }

        .btn.secondary:hover {
          background: linear-gradient(135deg, #fde68a, #fcd34d);
          border-color: #f59e0b;
        }

        .status {
          margin-top: 8px;
          font-size: 0.83rem;
          color: #b45309;
          min-height: 1em;
          font-weight: 600;
        }
      `}</style>

      <div className="app">
        <header>
          <h1>Práctica 3 – Turismo Toledo: Guía 3D conversacional con IA</h1>
          <p className="subtitle">
            Cierre épico del módulo: vais a diseñar un guía turístico 3D que vive en la web
            y con el que se puede hablar en tiempo real, como si fuera un NPC inteligente
            de videojuego… pero al servicio de Turismo Toledo.
          </p>
          <ul className="intro-steps">
            <li>PASO 1: Definimos el encargo realista para Turismo Toledo.</li>
            <li>PASO 2: Diseñamos el avatar 3D (aspecto, estilo, entorno).</li>
            <li>PASO 3: Diseñamos el "cerebro" del avatar (prompt, tono, conocimientos, límites).</li>
            <li>PASO 4: Dibujamos el flujo de conversación y la experiencia del visitante.</li>
            <li>PASO 5: Plan de implementación en una plataforma tipo Convai Avatar Studio y checklist de riesgos.</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Avatar 3D conversacional</span>
            <span className="badge">Turismo inteligente</span>
            <span className="badge">Convai Avatar Studio (web, no-code)</span>
            <span className="badge">Flujos de conversación</span>
            <span className="badge">Checklist IA responsable</span>
          </div>
        </header>

        <section className="layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="col">
            {/* PASO 1 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 1. Encargo de Turismo Toledo</div>
                <div className="card-number">1 / 5</div>
              </div>
              <p className="card-text">
                El Ayuntamiento de Toledo quiere un guía turístico 3D en su web y en un
                kiosko interactivo en Zocodover: la gente podrá hablarle por voz y el avatar
                responderá en tiempo real sobre rutas, monumentos y horarios.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="zonaCiudad">
                    1.1 Zona principal que cubrirá el guía
                  </label>
                  <input
                    type="text"
                    id="zonaCiudad"
                    placeholder="Ej.: Casco histórico (Catedral, Alcázar, San Juan de los Reyes)."
                  />
                </div>
                <div>
                  <label htmlFor="duracionInteraccion">
                    Duración típica de interacción (segundos)
                  </label>
                  <input
                    type="number"
                    id="duracionInteraccion"
                    placeholder="Ej.: 120"
                  />
                </div>
              </div>

              <label htmlFor="objetivoTurismo">
                1.2 Objetivo principal para Turismo Toledo
              </label>
              <textarea
                id="objetivoTurismo"
                placeholder="Ej.: Ayudar a los visitantes a planificar en 2 minutos una ruta básica sin tener que hacer cola en la oficina de turismo."
              />

              <label htmlFor="publicoTurismo">
                1.3 Tipo de visitante al que va dirigido
              </label>
              <textarea
                id="publicoTurismo"
                placeholder="Ej.: Turistas nacionales que vienen 1 día, no conocen bien la ciudad y usan el móvil para orientarse."
              />

              <p className="small">
                Piensa que este guía 3D podría estar incrustado en la web oficial de turismo
                o en una pantalla en la oficina de información de Toledo.
              </p>
            </article>

            {/* PASO 2 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 2. Diseño visual del avatar 3D y entorno</div>
                <div className="card-number">2 / 5</div>
              </div>
              <p className="card-text">
                Ahora diseña la apariencia del guía 3D y del fondo donde "vive".
                Plataformas como Convai Avatar Studio permiten crear y personalizar
                avatares 3D directamente en el navegador, sin descargas ni GPU.
              </p>

              <label htmlFor="descripcionAvatar">
                2.1 ¿Cómo es tu guía 3D? (edad, estilo, vestimenta, rasgos…)
              </label>
              <textarea
                id="descripcionAvatar"
                placeholder="Ej.: Guía joven, aspecto cercano, chaleco con logo de Turismo Toledo, tablet en la mano, sonrisa amable."
              />

              <label htmlFor="escenario3D">
                2.2 Escenario 3D de fondo
              </label>
              <textarea
                id="escenario3D"
                placeholder="Ej.: Vista estilizada de la Plaza de Zocodover al atardecer, con silueta del Alcázar al fondo."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="plataformaAvatar">
                    Plataforma principal para crear/usar el avatar
                  </label>
                  <input
                    type="text"
                    id="plataformaAvatar"
                    placeholder="Ej.: Convai Avatar Studio (https://convai.com) o demo DLP3D (https://dlp3d.ai)."
                  />
                </div>
                <div>
                  <label htmlFor="formatoSalida">
                    Formato de salida
                  </label>
                  <input
                    type="text"
                    id="formatoSalida"
                    placeholder="Ej.: Avatar 3D interactivo incrustado en web, con chat y voz."
                  />
                </div>
              </div>

              <p className="small">
                Convai Avatar Studio permite crear avatares 3D conversacionales,
                configurando aspecto, voz, entorno y comportamiento, todo desde el
                navegador y sin programar.
              </p>
            </article>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col">
            {/* PASO 3 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 3. El "cerebro" del avatar (prompt y conocimiento)</div>
                <div className="card-number">3 / 5</div>
              </div>
              <p className="card-text">
                Aquí defines cómo piensa y habla el guía: qué sabe, cómo responde, qué NO
                puede hacer. Es como escribir el "cerebro IA" que luego pegarías en
                Convai Avatar Studio o plataforma similar.
              </p>

              <label htmlFor="promptSistema">
                3.1 Prompt de sistema / instrucciones internas
              </label>
              <textarea
                id="promptSistema"
                placeholder="Ej.: Eres un guía turístico oficial del Ayuntamiento de Toledo. Hablas un español claro y cercano..."
              />

              <label htmlFor="temasPermitidos">
                3.2 Temas que SÍ puede tratar
              </label>
              <textarea
                id="temasPermitidos"
                placeholder="Ej.: Rutas básicas, horarios de museos, recomendaciones de seguridad, cómo moverse por la ciudad…"
              />

              <label htmlFor="temasProhibidos">
                3.3 Temas que NO debe tratar o debe derivar
              </label>
              <textarea
                id="temasProhibidos"
                placeholder="Ej.: Opiniones políticas, temas religiosos sensibles, diagnósticos médicos, información personal de ciudadanos."
              />

              <label htmlFor="ejemplosQA">
                3.4 3 ejemplos de pregunta real + respuesta ideal del guía
              </label>
              <textarea
                id="ejemplosQA"
                placeholder='Ej.: P: "Solo tengo 3 horas, ¿qué me recomiendas ver?" R: ... (respuesta breve, clara y accionable).'
              />

              <div className="metrics" id="metricsPrompt"></div>
              <p className="small">
                Aquí verás cuántas palabras tiene tu "cerebro" de avatar para que no
                sea ni demasiado pobre ni un tocho imposible de mantener.
              </p>
            </article>

            {/* PASO 4 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 4. Flujo de conversación y experiencia</div>
                <div className="card-number">4 / 5</div>
              </div>
              <p className="card-text">
                Diseña cómo será la primera experiencia de un turista que se acerca al
                avatar (o abre la web) y habla con él: saludo, detección de intención,
                propuesta de ruta y cierre.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="flujoInicio">
                    4.1 Inicio de la conversación
                  </label>
                  <textarea
                    id="flujoInicio"
                    placeholder="Ej.: El avatar se presenta, pregunta cuánto tiempo tiene el visitante y si viene solo, en pareja o en familia."
                  />
                </div>
                <div>
                  <label htmlFor="flujoRecomendacion">
                    4.2 Recomendación principal
                  </label>
                  <textarea
                    id="flujoRecomendacion"
                    placeholder="Ej.: A partir del tiempo, propone ruta corta/media/larga con 3–5 puntos clave."
                  />
                </div>
              </div>

              <div className="row-2">
                <div>
                  <label htmlFor="flujoDudas">
                    4.3 Gestión de dudas y repreguntas
                  </label>
                  <textarea
                    id="flujoDudas"
                    placeholder="Ej.: Si el turista pregunta por accesibilidad, el avatar adapta la ruta a movilidad reducida."
                  />
                </div>
                <div>
                  <label htmlFor="flujoCierre">
                    4.4 Cierre de la interacción
                  </label>
                  <textarea
                    id="flujoCierre"
                    placeholder="Ej.: El avatar resume la ruta y ofrece enviar un QR/enlace con el mapa a su móvil."
                  />
                </div>
              </div>

              <label htmlFor="momentoWow">
                4.5 Momento "WOW" que quieres que recuerden
              </label>
              <textarea
                id="momentoWow"
                placeholder="Ej.: El avatar reconoce (por voz) si el turista viene con niños y propone un mini-juego / reto durante la ruta."
              />
            </article>

            {/* PASO 5 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 5. Implementación en plataforma y checklist IA responsable</div>
                <div className="card-number">5 / 5</div>
              </div>
              <p className="card-text">
                Por último, describes cómo lo montarías en una plataforma real (por
                ejemplo Convai Avatar Studio, DLP3D o similar) y revisas los riesgos
                de IA: precisión, sesgos, seguridad, caídas del servicio.
              </p>

              <label htmlFor="pasosPlataforma">
                5.1 Pasos en la plataforma (versión no técnica)
              </label>
              <textarea
                id="pasosPlataforma"
                placeholder="Ej.: 1) Creo avatar y entorno en Convai Avatar Studio. 2) Pego el prompt de sistema. 3) Creo ejemplos de diálogos. 4) Pruebo en el navegador hablando por micrófono. 5) Genero un enlace para incrustar en la web de Turismo."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="testingPlan">
                    5.2 Plan de pruebas (qué probarías antes de lanzar)
                  </label>
                  <textarea
                    id="testingPlan"
                    placeholder="Ej.: Test con 5 turistas distintos, simulando preguntas fáciles, raras y fuera de ámbito."
                  />
                </div>
                <div>
                  <label htmlFor="planCaidas">
                    5.3 ¿Qué pasa si la IA falla o no sabe?
                  </label>
                  <textarea
                    id="planCaidas"
                    placeholder="Ej.: El avatar admite que no sabe algo y ofrece un enlace a la web oficial o un teléfono."
                  />
                </div>
              </div>

              <label htmlFor="riesgosIA">
                5.4 Riesgos detectados y cómo se mitigan
              </label>
              <textarea
                id="riesgosIA"
                placeholder="Ej.: Riesgo de dar horarios desactualizados → se conecta a una página oficial de horarios o se limita a explicar cómo consultarlos."
              />

              <label htmlFor="nombreAlumno">
                Nombre del alumno/a
              </label>
              <input
                type="text"
                id="nombreAlumno"
                placeholder="Escribe aquí tu nombre y apellidos"
              />

              <ul className="checklist">
                <li>✔ Avatar 3D y entorno descritos con detalle.</li>
                <li>✔ Prompt/cerebro IA bien definido (qué sabe y qué no).</li>
                <li>✔ Flujo de conversación pensado de inicio a fin.</li>
                <li>✔ Plan de uso en plataforma realista (Convai / similar).</li>
                <li>✔ Checklist de riesgos y plan B cuando la IA no sabe.</li>
              </ul>
            </article>
          </div>
        </section>

        <div className="btn-row">
          <button className="btn secondary" id="btnLimpiar">
            🧹 Limpiar todo
          </button>
          <button className="btn" id="btnGenerarDoc">
            💾 Descargar paquete en .doc
          </button>
        </div>
        <div className="status" id="status"></div>
      </div>
    </div>
  );
}
