'use client';

import { useEffect } from 'react';

export default function MapfrePractice1() {
  useEffect(() => {
    // Inicializar métricas al cargar
    const guionEl = document.getElementById('guion') as HTMLTextAreaElement;
    const metricsGuionEl = document.getElementById('metricsGuion');
    
    if (guionEl && metricsGuionEl) {
      actualizarMetricasGuion(guionEl, metricsGuionEl);
      guionEl.addEventListener('input', () => actualizarMetricasGuion(guionEl, metricsGuionEl));
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
      if (guionEl) {
        guionEl.removeEventListener('input', () => actualizarMetricasGuion(guionEl, metricsGuionEl));
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

  function estimarSegundos(texto: string): number {
    const palabras = contarPalabras(texto);
    const wpm = 150;
    return Math.round((palabras / wpm) * 60);
  }

  function actualizarMetricasGuion(guionEl: HTMLTextAreaElement, metricsEl: HTMLElement) {
    const texto = guionEl.value;
    const palabras = contarPalabras(texto);
    const segundos = estimarSegundos(texto);

    metricsEl.innerHTML = '';

    if (!texto.trim()) {
      const span = document.createElement('span');
      span.className = 'metric-pill';
      span.textContent = 'Escribe tu guion y aquí verás el nº de palabras y la duración estimada.';
      metricsEl.appendChild(span);
      return;
    }

    const pill = (txt: string, extra = '') => {
      const s = document.createElement('span');
      s.className = `metric-pill ${extra}`;
      s.textContent = txt;
      metricsEl.appendChild(s);
    };

    pill(`Palabras: ${palabras}`, 'metric-ok');
    pill(`Duración estimada: ${segundos} s`);

    if (palabras >= 100 && palabras <= 180) {
      pill('Dentro del rango recomendado (60–90s)', 'metric-ok');
    } else {
      pill('Fuera del rango recomendado (60–90s)', 'metric-warn');
    }
  }

  function limpiarTodo() {
    const fields = [
      'mensajePrincipal', 'paso1', 'paso2', 'paso3', 'errores', 'queHacer',
      'guion', 'escena1', 'escena2', 'escena3', 'escena4', 'escena5', 'escena6',
      'titulo', 'briefAvatar', 'briefFondo', 'briefDuracion'
    ];

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = '';
      }
    });

    const guionEl = document.getElementById('guion') as HTMLTextAreaElement;
    const metricsGuionEl = document.getElementById('metricsGuion');
    if (guionEl && metricsGuionEl) {
      actualizarMetricasGuion(guionEl, metricsGuionEl);
    }

    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = 'He vaciado todos los campos. Puedes empezar de nuevo.';
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
    const getVal = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement)?.value || '';

    if (!getVal('guion').trim()) {
      const statusEl = document.getElementById('status');
      if (statusEl) {
        statusEl.textContent = 'Antes de descargar, escribe al menos tu guion en el Paso 3.';
      }
      return;
    }

    const contenido = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Práctica 1 - MAPFRE</title>
</head>
<body>
  <h1>Práctica 1 – MAPFRE: Guion + Storyboard + Brief</h1>
  <p><strong>Título interno:</strong> ${prepararHTMLSeguro(getVal('titulo'))}</p>

  <h2>1. Mensaje principal y pasos operativos</h2>
  <p><strong>Mensaje principal:</strong><br>${prepararHTMLSeguro(getVal('mensajePrincipal'))}</p>
  <p><strong>Paso 1:</strong><br>${prepararHTMLSeguro(getVal('paso1'))}</p>
  <p><strong>Paso 2:</strong><br>${prepararHTMLSeguro(getVal('paso2'))}</p>
  <p><strong>Paso 3 (opcional):</strong><br>${prepararHTMLSeguro(getVal('paso3'))}</p>
  <p><strong>Errores comunes:</strong><br>${prepararHTMLSeguro(getVal('errores'))}</p>
  <p><strong>"Qué hacer si…" (escalado):</strong><br>${prepararHTMLSeguro(getVal('queHacer'))}</p>

  <h2>2. Guion completo (60–90s)</h2>
  <p>${prepararHTMLSeguro(getVal('guion'))}</p>

  <h2>3. Storyboard (escenas)</h2>
  <ol>
    <li><strong>Escena 1 – Apertura:</strong><br>${prepararHTMLSeguro(getVal('escena1'))}</li>
    <li><strong>Escena 2 – Paso 1:</strong><br>${prepararHTMLSeguro(getVal('escena2'))}</li>
    <li><strong>Escena 3 – Paso 2:</strong><br>${prepararHTMLSeguro(getVal('escena3'))}</li>
    <li><strong>Escena 4 – Paso 3 / Escalado:</strong><br>${prepararHTMLSeguro(getVal('escena4'))}</li>
    <li><strong>Escena 5 – Errores comunes:</strong><br>${prepararHTMLSeguro(getVal('escena5'))}</li>
    <li><strong>Escena 6 – Cierre y CTA:</strong><br>${prepararHTMLSeguro(getVal('escena6'))}</li>
  </ol>

  <h2>4. Brief / Prompt para producción del vídeo</h2>
  <p><strong>Avatar y tono:</strong><br>${prepararHTMLSeguro(getVal('briefAvatar'))}</p>
  <p><strong>Fondo y estilo visual:</strong><br>${prepararHTMLSeguro(getVal('briefFondo'))}</p>
  <p><strong>Duración y ritmo:</strong><br>${prepararHTMLSeguro(getVal('briefDuracion'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 1 – Módulo 3.</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica1_MAPFRE.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con tu ejercicio. Ábrelo en Word o similar para revisarlo o entregarlo.';
    }
  }

  return (
    <div className="space-y-4">
      <style>{`
        :root {
          --bg-light: #f8fafc;
          --card-bg: #ffffff;
          --accent: #0284c7;
          --accent-light: #0ea5e9;
          --accent-soft: #e0f2fe;
          --mapfre-blue: #0066b3;
          --mapfre-amber: #f59e0b;
          --text-dark: #1e293b;
          --text-medium: #475569;
          --text-light: #64748b;
          --border: #cbd5e1;
          --border-soft: #e2e8f0;
          --success: #10b981;
          --success-bg: #d1fae5;
          --warning: #f59e0b;
          --warning-bg: #fef3c7;
          --radius: 12px;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .mapfre-app {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fffbeb 100%);
          border-radius: 20px;
          border: 2px solid #bae6fd;
          box-shadow: var(--shadow-lg);
          padding: 24px 20px 28px;
          position: relative;
          overflow: hidden;
        }

        .mapfre-app::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .mapfre-app::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .mapfre-app header,
        .mapfre-app section,
        .mapfre-app .btn-row,
        .mapfre-app .status {
          position: relative;
          z-index: 1;
        }

        .mapfre-app h1 {
          margin: 0 0 6px;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          color: transparent;
          text-transform: uppercase;
        }

        .mapfre-app .subtitle {
          margin: 0 0 12px;
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.5;
        }

        .mapfre-app .intro-steps {
          margin: 0 0 16px;
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: var(--text-medium);
          background: var(--accent-soft);
          padding: 12px 12px 12px 20px;
          border-radius: 10px;
          border-left: 4px solid var(--accent);
        }

        .mapfre-app .intro-steps li {
          margin-bottom: 6px;
          font-weight: 500;
        }

        .mapfre-app .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .mapfre-app .badge {
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #e0f2fe 0%, #fef3c7 100%);
          border: 2px solid #bae6fd;
          color: #0369a1;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(14, 165, 233, 0.15);
        }

        .mapfre-app .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .mapfre-app .step-card {
          border-radius: var(--radius);
          border: 2px solid;
          padding: 16px;
          position: relative;
          overflow: hidden;
          background: var(--card-bg);
          box-shadow: var(--shadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .mapfre-app .step-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .mapfre-app .step-card:nth-child(1) {
          border-color: #0ea5e9;
        }
        .mapfre-app .step-card:nth-child(2) {
          border-color: #f97316;
        }
        .mapfre-app .step-card:nth-child(3) {
          border-color: #a855f7;
        }
        .mapfre-app .step-card:nth-child(4) {
          border-color: #22c55e;
        }
        .mapfre-app .step-card:nth-child(5) {
          border-color: #ec4899;
        }

        .mapfre-app .step-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0ea5e9, #f97316, #a855f7, #22c55e, #ec4899);
        }

        .mapfre-app .step-card:nth-child(1)::before { background: linear-gradient(90deg, #0ea5e9, #0284c7); }
        .mapfre-app .step-card:nth-child(2)::before { background: linear-gradient(90deg, #f97316, #fb923c); }
        .mapfre-app .step-card:nth-child(3)::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
        .mapfre-app .step-card:nth-child(4)::before { background: linear-gradient(90deg, #22c55e, #4ade80); }
        .mapfre-app .step-card:nth-child(5)::before { background: linear-gradient(90deg, #ec4899, #f472b6); }

        .mapfre-app .step-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .mapfre-app .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .mapfre-app .step-number {
          font-size: 0.78rem;
          padding: 4px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: var(--text-dark);
          font-weight: 700;
        }

        .mapfre-app .step-text {
          position: relative;
          font-size: 0.88rem;
          color: var(--text-medium);
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .mapfre-app .step-text strong {
          color: var(--mapfre-blue);
          font-weight: 700;
        }

        .mapfre-app label {
          font-size: 0.82rem;
          color: var(--text-dark);
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .mapfre-app textarea,
        .mapfre-app input[type="text"] {
          width: 100%;
          border-radius: 10px;
          border: 2px solid var(--border-soft);
          background: #f8fafc;
          color: var(--text-dark);
          font-size: 0.88rem;
          padding: 10px 12px;
          resize: vertical;
          min-height: 70px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .mapfre-app textarea:focus,
        .mapfre-app input[type="text"]:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
          background: #ffffff;
          transform: translateY(-1px);
        }

        .mapfre-app input[type="text"] {
          min-height: auto;
          padding: 9px 12px;
        }

        .mapfre-app .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .mapfre-app .row-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .mapfre-app .small {
          font-size: 0.82rem;
          color: var(--text-light);
          margin-top: 5px;
          font-style: italic;
        }

        .mapfre-app .metrics {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
        }

        .mapfre-app .metric-pill {
          padding: 5px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: #f1f5f9;
          color: var(--text-medium);
          font-weight: 600;
        }

        .mapfre-app .metric-ok {
          border-color: var(--success);
          background: var(--success-bg);
          color: #065f46;
        }

        .mapfre-app .metric-warn {
          border-color: var(--warning);
          background: var(--warning-bg);
          color: #92400e;
        }

        .mapfre-app .storyboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }

        .mapfre-app .scene-card {
          border-radius: 10px;
          border: 2px dashed var(--border);
          padding: 10px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .mapfre-app .scene-title {
          font-size: 0.82rem;
          color: var(--mapfre-blue);
          margin-bottom: 5px;
          font-weight: 700;
        }

        .mapfre-app .scene-card textarea {
          min-height: 60px;
          font-size: 0.82rem;
        }

        .mapfre-app .btn-row {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .mapfre-app .btn {
          border-radius: 999px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          color: #ffffff;
          padding: 10px 22px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(14, 165, 233, 0.25);
        }

        .mapfre-app .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(14, 165, 233, 0.35);
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
        }

        .mapfre-app .btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(14, 165, 233, 0.2);
        }

        .mapfre-app .btn.secondary {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px rgba(100, 116, 139, 0.2);
        }

        .mapfre-app .btn.secondary:hover {
          background: linear-gradient(135deg, #475569 0%, #334155 100%);
        }

        .mapfre-app .status {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #7c3aed;
          font-weight: 500;
          min-height: 1.2em;
        }

        @media (max-width: 700px) {
          .mapfre-app .row-2,
          .mapfre-app .row-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="mapfre-app">
        <header>
          <h1>Práctica 1 – MAPFRE: Guion + Storyboard</h1>
          <p className="subtitle">
            Hola, soy tu profe. En este juego vamos a construir, paso a paso, tu
            entrega individual para MAPFRE: guion de 60–90s, storyboard y brief.
          </p>
          <ul className="intro-steps">
            <li>PASO 1: Leemos juntos el encargo de MAPFRE.</li>
            <li>PASO 2: Definimos mensaje principal y 3 pasos operativos.</li>
            <li>PASO 3: Escribes el guion completo y revisas la duración.</li>
            <li>PASO 4: Diseñas un storyboard sencillo de 6–8 escenas.</li>
            <li>PASO 5: Rellenas el brief y descargas tu entrega en .doc.</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Micro-vídeo 60–90s</span>
            <span className="badge">1 mensaje principal + 3 pasos</span>
            <span className="badge">Errores comunes + "qué hacer si…"</span>
            <span className="badge">Guion + Storyboard + Brief</span>
          </div>
        </header>

        <section className="steps-grid">
          {/* PASO 1 */}
          <article className="step-card">
            <div className="step-header">
              <div className="step-title">Paso 1. Lee el encargo</div>
              <div className="step-number">1 / 5</div>
            </div>
            <p className="step-text">
              MAPFRE quiere reducir el tiempo de onboarding de nuevos agentes y
              administrativos. Te pide un micro-vídeo de 60–90 segundos con avatar
              para explicar: <strong>"Cómo tramitar una consulta de cliente y
              escalar incidencias correctamente"</strong>.<br /><br />
              Tu objetivo aquí es entender qué te están pidiendo: un guion claro,
              en tono corporativo, con llamadas a la acción y que sea grabable.
            </p>
            <p className="small">
              Cuando lo tengas claro, pasa al Paso 2 y escribe el mensaje principal
              y los 3 pasos operativos.
            </p>
          </article>

          {/* PASO 2 */}
          <article className="step-card">
            <div className="step-header">
              <div className="step-title">Paso 2. Mensaje principal + 3 pasos</div>
              <div className="step-number">2 / 5</div>
            </div>
            <p className="step-text">
              Ahora vamos a condensar el contenido en un mensaje principal y hasta
              3 pasos operativos. También añadiremos un bloque de "Errores comunes"
              y una frase final de "qué hacer si…".
            </p>

            <label htmlFor="mensajePrincipal">2.1 Mensaje principal (1–2 frases, muy claro)</label>
            <textarea
              id="mensajePrincipal"
              placeholder="Ej.: En este vídeo verás cómo atender una consulta, registrarla correctamente y saber cuándo debes escalarla a otra persona del equipo."
            />

            <div className="row-3">
              <div>
                <label htmlFor="paso1">Paso 1 operativo</label>
                <textarea
                  id="paso1"
                  placeholder="Ej.: Registrar siempre la consulta en el sistema antes de hacer nada más."
                />
              </div>
              <div>
                <label htmlFor="paso2">Paso 2 operativo</label>
                <textarea
                  id="paso2"
                  placeholder="Ej.: Verificar los datos del cliente y aclarar qué necesita exactamente."
                />
              </div>
              <div>
                <label htmlFor="paso3">Paso 3 operativo (opcional)</label>
                <textarea
                  id="paso3"
                  placeholder="Ej.: Decidir si se resuelve en el momento o se escala siguiendo el protocolo."
                />
              </div>
            </div>

            <label htmlFor="errores">2.2 Bloque "Errores comunes" (1 frase)</label>
            <textarea
              id="errores"
              placeholder="Ej.: Un error típico es prometer soluciones o plazos sin haber revisado la incidencia ni el procedimiento."
            />

            <label htmlFor="queHacer">2.3 Frase de cierre con "qué hacer si…" (escalado)</label>
            <textarea
              id="queHacer"
              placeholder="Ej.: Si la consulta se complica o no tienes claro el siguiente paso, detente y escala la incidencia a tu responsable siguiendo el protocolo."
            />
            <p className="small">
              Cuando tengas este bloque, ya tienes la base del contenido. En el
              Paso 3 lo convertiremos en un guion completo de 60–90 segundos.
            </p>
          </article>

          {/* PASO 3 */}
          <article className="step-card">
            <div className="step-header">
              <div className="step-title">Paso 3. Escribe el guion (60–90s)</div>
              <div className="step-number">3 / 5</div>
            </div>
            <p className="step-text">
              Ahora transforma todo lo anterior en un guion locutable: frases
              cortas, lenguaje claro y tono corporativo. Aquí abajo puedes pegarlo
              o escribirlo desde cero. Yo te calculo la duración aproximada.
            </p>

            <label htmlFor="guion">3.1 Guion completo (texto que dirá el avatar)</label>
            <textarea
              id="guion"
              placeholder="Escribe aquí tu guion de 60–90 segundos. Piensa en cómo lo leería una voz sintética: frases cortas, pocas siglas y ejemplos claros."
            />
            <p className="small">
              Consejo: si te sale muy largo, divide el contenido en dos vídeos
              distintos. Mejor dos piezas claras que una interminable.
            </p>

            <div className="metrics" id="metricsGuion"></div>
          </article>

          {/* PASO 4 */}
          <article className="step-card">
            <div className="step-header">
              <div className="step-title">Paso 4. Diseña tu storyboard (6–8 escenas)</div>
              <div className="step-number">4 / 5</div>
            </div>
            <p className="step-text">
              Ahora bajamos tu guion a pantalla. Cada escena debe indicar qué se
              ve y qué hace el avatar. Puedes usar entre 6 y 8 escenas; aquí tienes
              6 huecos iniciales.
            </p>

            <div className="storyboard-grid">
              <div className="scene-card">
                <div className="scene-title">Escena 1 – Apertura</div>
                <textarea
                  id="escena1"
                  placeholder='Ej.: Avatar en plano medio con fondo corporativo. Texto en pantalla: "Bienvenido a MAPFRE". El avatar presenta el objetivo del vídeo.'
                />
              </div>
              <div className="scene-card">
                <div className="scene-title">Escena 2 – Paso 1</div>
                <textarea
                  id="escena2"
                  placeholder="Ej.: Pantalla de sistema + avatar pequeño a un lado. Texto en pantalla sobre registrar la consulta."
                />
              </div>
              <div className="scene-card">
                <div className="scene-title">Escena 3 – Paso 2</div>
                <textarea
                  id="escena3"
                  placeholder="Ej.: Zoom en datos del cliente. El avatar recuerda verificar y aclarar qué necesita."
                />
              </div>
              <div className="scene-card">
                <div className="scene-title">Escena 4 – Paso 3 / Escalado</div>
                <textarea
                  id="escena4"
                  placeholder="Ej.: El avatar explica cuándo escalar una incidencia y muestra un icono de alerta."
                />
              </div>
              <div className="scene-card">
                <div className="scene-title">Escena 5 – Errores comunes</div>
                <textarea
                  id="escena5"
                  placeholder="Ej.: Lista corta en pantalla con 2–3 errores que NO debemos cometer."
                />
              </div>
              <div className="scene-card">
                <div className="scene-title">Escena 6 – Cierre y CTA</div>
                <textarea
                  id="escena6"
                  placeholder="Ej.: El avatar resume los pasos y dice qué hacer si hay duda (escalar). Pantalla final con CTA."
                />
              </div>
            </div>
            <p className="small">
              Si necesitas más escenas, puedes duplicar este bloque de HTML más
              adelante. Para la práctica, con 6 bien pensadas suele ser suficiente.
            </p>
          </article>

          {/* PASO 5 */}
          <article className="step-card">
            <div className="step-header">
              <div className="step-title">Paso 5. Brief / Prompt + descarga en .doc</div>
              <div className="step-number">5 / 5</div>
            </div>
            <p className="step-text">
              Para terminar, deja por escrito cómo quieres que sea el vídeo: avatar,
              fondo, estilo, duración y ritmo. Esto es lo que luego me entregarás
              junto al guion y el storyboard.
            </p>

            <label htmlFor="titulo">5.1 Título interno de tu pieza (para identificarla)</label>
            <input
              type="text"
              id="titulo"
              placeholder="Ej.: MAPFRE – Onboarding: consulta de cliente y escalado"
            />

            <label htmlFor="briefAvatar">5.2 ¿Qué avatar y qué tono quieres usar?</label>
            <textarea
              id="briefAvatar"
              placeholder="Ej.: Avatar stock formal, en castellano neutro, tono corporativo pero cercano."
            />

            <div className="row-2">
              <div>
                <label htmlFor="briefFondo">5.3 Fondo y estilo visual</label>
                <textarea
                  id="briefFondo"
                  placeholder="Ej.: Fondo corporativo sencillo con colores de MAPFRE, texto muy legible."
                />
              </div>
              <div>
                <label htmlFor="briefDuracion">5.4 Duración y ritmo</label>
                <textarea
                  id="briefDuracion"
                  placeholder="Ej.: Duración entre 60 y 90 segundos, ritmo tranquilo, con pausas claras entre cada paso."
                />
              </div>
            </div>

            <p className="small">
              Cuando lo tengas todo, pulsa en "Descargar mi ejercicio en .doc".
              Se generará un archivo de Word con tu guion, storyboard y brief.
            </p>
          </article>
        </section>

        <div className="btn-row">
          <button className="btn secondary" id="btnLimpiar">🧹 Limpiar todo</button>
          <button className="btn" id="btnGenerarDoc">💾 Descargar mi ejercicio en .doc</button>
        </div>
        <div className="status" id="status"></div>
      </div>
    </div>
  );
}
