'use client';

import { useEffect } from 'react';

export default function IberdrolaPractice2() {
  useEffect(() => {
    const guionEl = document.getElementById('guion') as HTMLTextAreaElement;
    const metricsGuionEl = document.getElementById('metricsGuion');
    
    if (guionEl && metricsGuionEl) {
      actualizarMetricasGuion(guionEl, metricsGuionEl);
      guionEl.addEventListener('input', () => actualizarMetricasGuion(guionEl, metricsGuionEl));
    }

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
      span.textContent = 'Escribid vuestro guion y aquí veréis nº de palabras y duración estimada.';
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

    if (palabras >= 225 && palabras <= 300) {
      pill('Dentro del rango recomendado (90–120s)', 'metric-ok');
    } else {
      pill('Fuera del rango recomendado (90–120s)', 'metric-warn');
    }
  }

  function limpiarTodo() {
    const fields = [
      'objetivo', 'publico', 'regla1', 'regla2', 'regla3', 'regla4', 'regla5',
      'ejemplo', 'claimSeguridad', 'guion', 'escena1', 'escena2', 'escena3',
      'escena4', 'escena5', 'escena6', 'avatarYEstilo', 'roles', 'herramientas',
      'duracionFinal', 'nombreEquipo'
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
      statusEl.textContent = 'He vaciado todos los campos del ejercicio. Podéis empezar de nuevo.';
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
        statusEl.textContent = 'Antes de descargar, escribid al menos vuestro guion en el Paso 3.';
      }
      return;
    }

    const contenido = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Práctica 2 - Iberdrola</title>
</head>
<body>
  <h1>Práctica 2 – Iberdrola: Mini-vídeo de seguridad</h1>
  <p><strong>Equipo:</strong> ${prepararHTMLSeguro(getVal('nombreEquipo'))}</p>

  <h2>1. Encargo y objetivo</h2>
  <p><strong>Objetivo del vídeo:</strong><br>${prepararHTMLSeguro(getVal('objetivo'))}</p>
  <p><strong>Público y canal:</strong><br>${prepararHTMLSeguro(getVal('publico'))}</p>

  <h2>2. Reglas de seguridad y ejemplo</h2>
  <ul>
    <li><strong>Regla 1:</strong> ${prepararHTMLSeguro(getVal('regla1'))}</li>
    <li><strong>Regla 2:</strong> ${prepararHTMLSeguro(getVal('regla2'))}</li>
    <li><strong>Regla 3:</strong> ${prepararHTMLSeguro(getVal('regla3'))}</li>
    <li><strong>Regla 4:</strong> ${prepararHTMLSeguro(getVal('regla4'))}</li>
    <li><strong>Regla 5:</strong> ${prepararHTMLSeguro(getVal('regla5'))}</li>
  </ul>
  <p><strong>Ejemplo práctico:</strong><br>${prepararHTMLSeguro(getVal('ejemplo'))}</p>
  <p><strong>Claim de seguridad:</strong><br>${prepararHTMLSeguro(getVal('claimSeguridad'))}</p>

  <h2>3. Guion completo (90–120s)</h2>
  <p>${prepararHTMLSeguro(getVal('guion'))}</p>

  <h2>4. Storyboard (escenas)</h2>
  <ol>
    <li><strong>Escena 1 – Apertura:</strong><br>${prepararHTMLSeguro(getVal('escena1'))}</li>
    <li><strong>Escena 2 – Reglas 1 y 2:</strong><br>${prepararHTMLSeguro(getVal('escena2'))}</li>
    <li><strong>Escena 3 – Reglas 3 y 4:</strong><br>${prepararHTMLSeguro(getVal('escena3'))}</li>
    <li><strong>Escena 4 – Regla 5:</strong><br>${prepararHTMLSeguro(getVal('escena4'))}</li>
    <li><strong>Escena 5 – Ejemplo práctico:</strong><br>${prepararHTMLSeguro(getVal('escena5'))}</li>
    <li><strong>Escena 6 – Claim + Checklist final:</strong><br>${prepararHTMLSeguro(getVal('escena6'))}</li>
  </ol>

  <h2>5. Hoja de producción (roles, herramientas, duración)</h2>
  <p><strong>Avatar, voz y estilo visual:</strong><br>${prepararHTMLSeguro(getVal('avatarYEstilo'))}</p>
  <p><strong>Roles del equipo:</strong><br>${prepararHTMLSeguro(getVal('roles'))}</p>
  <p><strong>Herramientas y decisiones técnicas:</strong><br>${prepararHTMLSeguro(getVal('herramientas'))}</p>
  <p><strong>Duración objetivo y versiones:</strong><br>${prepararHTMLSeguro(getVal('duracionFinal'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 2 – Módulo 3.</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica2_Iberdrola_Hoja_Produccion.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con vuestra hoja de producción completa.';
    }
  }

  return (
    <div className="space-y-4">
      <style>{`
        :root {
          --bg-light: #f0fdf4;
          --card-bg: #ffffff;
          --accent: #16a34a;
          --accent-light: #22c55e;
          --accent-soft: #dcfce7;
          --iberdrola-green: #16a34a;
          --iberdrola-blue: #0284c7;
          --iberdrola-yellow: #eab308;
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

        .iberdrola-app {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fefce8 100%);
          border-radius: 20px;
          border: 2px solid #86efac;
          box-shadow: var(--shadow-lg);
          padding: 24px 20px 28px;
          position: relative;
          overflow: hidden;
        }

        .iberdrola-app::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .iberdrola-app::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .iberdrola-app header,
        .iberdrola-app section,
        .iberdrola-app .btn-row,
        .iberdrola-app .status {
          position: relative;
          z-index: 1;
        }

        .iberdrola-app h1 {
          margin: 0 0 6px;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #eab308 100%);
          -webkit-background-clip: text;
          color: transparent;
          text-transform: uppercase;
        }

        .iberdrola-app .subtitle {
          margin: 0 0 12px;
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.5;
        }

        .iberdrola-app .intro-steps {
          margin: 0 0 16px;
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: var(--text-medium);
          background: var(--accent-soft);
          padding: 12px 12px 12px 20px;
          border-radius: 10px;
          border-left: 4px solid var(--accent);
        }

        .iberdrola-app .intro-steps li {
          margin-bottom: 6px;
          font-weight: 500;
        }

        .iberdrola-app .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .iberdrola-app .badge {
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #dcfce7 0%, #fef9c3 100%);
          border: 2px solid #86efac;
          color: #166534;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.15);
        }

        .iberdrola-app .steps-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 950px) {
          .iberdrola-app .steps-grid {
            grid-template-columns: 1fr;
          }
        }

        .iberdrola-app .left-col,
        .iberdrola-app .right-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .iberdrola-app .step-card {
          border-radius: var(--radius);
          border: 2px solid;
          padding: 16px;
          position: relative;
          overflow: hidden;
          background: var(--card-bg);
          box-shadow: var(--shadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .iberdrola-app .step-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .iberdrola-app .step-card:nth-child(1) {
          border-color: #22c55e;
        }
        .iberdrola-app .step-card:nth-child(2) {
          border-color: #0284c7;
        }
        .iberdrola-app .step-card:nth-child(3) {
          border-color: #eab308;
        }
        .iberdrola-app .step-card:nth-child(4) {
          border-color: #ef4444;
        }

        .iberdrola-app .step-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #22c55e, #0284c7, #eab308, #ef4444);
        }

        .iberdrola-app .step-card:nth-child(1)::before { background: linear-gradient(90deg, #22c55e, #4ade80); }
        .iberdrola-app .step-card:nth-child(2)::before { background: linear-gradient(90deg, #0284c7, #0ea5e9); }
        .iberdrola-app .step-card:nth-child(3)::before { background: linear-gradient(90deg, #eab308, #facc15); }
        .iberdrola-app .step-card:nth-child(4)::before { background: linear-gradient(90deg, #ef4444, #f87171); }

        .iberdrola-app .step-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .iberdrola-app .step-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .iberdrola-app .step-number {
          font-size: 0.78rem;
          padding: 4px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: var(--text-dark);
          font-weight: 700;
        }

        .iberdrola-app .step-text {
          position: relative;
          font-size: 0.88rem;
          color: var(--text-medium);
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .iberdrola-app .step-text strong {
          color: var(--iberdrola-green);
          font-weight: 700;
        }

        .iberdrola-app label {
          font-size: 0.82rem;
          color: var(--text-dark);
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .iberdrola-app textarea,
        .iberdrola-app input[type="text"] {
          width: 100%;
          border-radius: 10px;
          border: 2px solid var(--border-soft);
          background: #f8fafc;
          color: var(--text-dark);
          font-size: 0.88rem;
          padding: 10px 12px;
          resize: vertical;
          min-height: 60px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .iberdrola-app textarea:focus,
        .iberdrola-app input[type="text"]:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
          background: #ffffff;
          transform: translateY(-1px);
        }

        .iberdrola-app input[type="text"] {
          min-height: auto;
          padding: 9px 12px;
        }

        .iberdrola-app .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .iberdrola-app .row-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .iberdrola-app .small {
          font-size: 0.82rem;
          color: var(--text-light);
          margin-top: 5px;
          font-style: italic;
        }

        .iberdrola-app .metrics {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
        }

        .iberdrola-app .metric-pill {
          padding: 5px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: #f1f5f9;
          color: var(--text-medium);
          font-weight: 600;
        }

        .iberdrola-app .metric-ok {
          border-color: var(--success);
          background: var(--success-bg);
          color: #065f46;
        }

        .iberdrola-app .metric-warn {
          border-color: var(--warning);
          background: var(--warning-bg);
          color: #92400e;
        }

        .iberdrola-app .rules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }

        .iberdrola-app .rule-card {
          border-radius: 10px;
          border: 2px dashed var(--border);
          padding: 10px;
          background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%);
        }

        .iberdrola-app .rule-title {
          font-size: 0.82rem;
          color: #166534;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .iberdrola-app .rule-card textarea {
          min-height: 55px;
          font-size: 0.82rem;
        }

        .iberdrola-app .storyboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }

        .iberdrola-app .scene-card {
          border-radius: 10px;
          border: 2px dashed var(--border);
          padding: 10px;
          background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%);
        }

        .iberdrola-app .scene-title {
          font-size: 0.82rem;
          color: #a16207;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .iberdrola-app .scene-card textarea {
          min-height: 55px;
          font-size: 0.82rem;
        }

        .iberdrola-app .roles-list {
          font-size: 0.82rem;
          color: var(--text-medium);
          margin-top: 6px;
          padding-left: 1.2rem;
        }

        .iberdrola-app .roles-list li {
          margin-bottom: 4px;
          line-height: 1.5;
        }

        .iberdrola-app .roles-list strong {
          color: var(--iberdrola-green);
        }

        .iberdrola-app .btn-row {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .iberdrola-app .btn {
          border-radius: 999px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
          color: #ffffff;
          padding: 10px 22px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(34, 197, 94, 0.25);
        }

        .iberdrola-app .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(34, 197, 94, 0.35);
          background: linear-gradient(135deg, #15803d 0%, #16a34a 100%);
        }

        .iberdrola-app .btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
        }

        .iberdrola-app .btn.secondary {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px rgba(100, 116, 139, 0.2);
        }

        .iberdrola-app .btn.secondary:hover {
          background: linear-gradient(135deg, #475569 0%, #334155 100%);
        }

        .iberdrola-app .status {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #7c3aed;
          font-weight: 500;
          min-height: 1.2em;
        }

        @media (max-width: 700px) {
          .iberdrola-app .row-2,
          .iberdrola-app .row-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="iberdrola-app">
        <header>
          <h1>Práctica 2 – Iberdrola: Mini-vídeo de seguridad</h1>
          <p className="subtitle">
            Hola, soy tu profe. Aquí vais a crear, como equipo, un mini-vídeo de
            seguridad para Iberdrola: 5 reglas antes de iniciar una intervención.
            Sigamos los pasos en orden.
          </p>
          <ul className="intro-steps">
            <li>PASO 1: Entender el encargo de Iberdrola y definir el objetivo.</li>
            <li>PASO 2: Escribir las 5 reglas y el ejemplo práctico.</li>
            <li>PASO 3: Redactar el guion de 90–120s y revisar la duración.</li>
            <li>PASO 4: Diseñar storyboard y hoja de producción (roles, decisiones).</li>
            <li>PASO 5: Descargar la hoja de producción en .doc para entregar.</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Vídeo 90–120s</span>
            <span className="badge">5 reglas de seguridad</span>
            <span className="badge">Ejemplo práctico + checklist final</span>
            <span className="badge">Guion + Storyboard + Hoja de producción</span>
          </div>
        </header>

        <section className="steps-grid">
          <div className="left-col">
            {/* PASO 1 */}
            <article className="step-card">
              <div className="step-header">
                <div className="step-title">Paso 1. Entiende el encargo</div>
                <div className="step-number">1 / 5</div>
              </div>
              <p className="step-text">
                Iberdrola necesita una pieza breve para reforzar la seguridad en
                campo: <strong>"5 reglas antes de iniciar una intervención"</strong>.
                Debe ser un vídeo multicanal (pantallas internas y móvil) y fácil de
                actualizar.
                <br /><br />
                Vuestro objetivo es diseñar un vídeo claro, sin ambigüedades, que
                recuerde esas 5 reglas y se pueda entender sin audio (subtítulos).
              </p>
              <label htmlFor="objetivo">1.1 Objetivo del vídeo (1–2 frases, muy claras)</label>
              <textarea
                id="objetivo"
                placeholder="Ej.: Recordar a los técnicos las 5 comprobaciones básicas de seguridad antes de intervenir en campo, de forma rápida y sin lugar a dudas."
              />

              <label htmlFor="publico">1.2 Público y canal (¿quién lo ve y dónde?)</label>
              <textarea
                id="publico"
                placeholder="Ej.: Técnicos de campo de Iberdrola. Se verá en pantallas internas del centro y en el móvil (intranet/app)."
              />

              <p className="small">
                Cuando tengáis claro el objetivo y el público, será más fácil
                elegir el tono del avatar, el tipo de escenas y las reglas que
                incluimos.
              </p>
            </article>

            {/* PASO 2: Reglas y ejemplo */}
            <article className="step-card">
              <div className="step-header">
                <div className="step-title">Paso 2. Escribe las 5 reglas + ejemplo</div>
                <div className="step-number">2 / 5</div>
              </div>
              <p className="step-text">
                Ahora vamos a definir las 5 reglas de seguridad antes de intervenir,
                más un pequeño ejemplo práctico (mini-situación).
              </p>

              <div className="rules-grid">
                <div className="rule-card">
                  <div className="rule-title">Regla 1</div>
                  <textarea
                    id="regla1"
                    placeholder="Ej.: Verifica que tienes todos los EPI obligatorios (casco, guantes, calzado de seguridad, etc.)."
                  />
                </div>
                <div className="rule-card">
                  <div className="rule-title">Regla 2</div>
                  <textarea
                    id="regla2"
                    placeholder="Ej.: Confirma que la línea o equipo están desenergizados y bloqueados según el procedimiento."
                  />
                </div>
                <div className="rule-card">
                  <div className="rule-title">Regla 3</div>
                  <textarea
                    id="regla3"
                    placeholder="Ej.: Revisa el entorno y elimina obstáculos o riesgos visibles (charcos, cables sueltos, etc.)."
                  />
                </div>
                <div className="rule-card">
                  <div className="rule-title">Regla 4</div>
                  <textarea
                    id="regla4"
                    placeholder="Ej.: Confirma con tu equipo quién hace cada tarea y quién supervisa la intervención."
                  />
                </div>
                <div className="rule-card">
                  <div className="rule-title">Regla 5</div>
                  <textarea
                    id="regla5"
                    placeholder="Ej.: Si detectas cualquier condición insegura, detén la intervención y repórtalo antes de continuar."
                  />
                </div>
              </div>

              <label htmlFor="ejemplo">2.1 Ejemplo práctico (mini-situación de 2–3 frases)</label>
              <textarea
                id="ejemplo"
                placeholder="Ej.: Un técnico detecta un charco cerca de un cuadro eléctrico. Detiene la intervención, avisa a su responsable y no reanuda el trabajo hasta que el entorno es seguro."
              />

              <label htmlFor="claimSeguridad">2.2 Claim de seguridad (1 frase, sin ambigüedad)</label>
              <textarea
                id="claimSeguridad"
                placeholder="Ej.: Ninguna intervención vale más que tu seguridad: si no es seguro, no se hace."
              />

              <p className="small">
                Este claim es importante: debe ser claro, responsable y sin consejos
                peligrosos, como indica la hoja de la práctica.
              </p>
            </article>

            {/* PASO 3: Guion */}
            <article className="step-card">
              <div className="step-header">
                <div className="step-title">Paso 3. Guion 90–120s</div>
                <div className="step-number">3 / 5</div>
              </div>
              <p className="step-text">
                Con todo lo anterior, ahora escribís el guion completo del vídeo.
                Recordad que debe durar entre 90 y 120 segundos, con frases cortas
                y claras (pensando en una voz TTV como ElevenLabs).
              </p>

              <label htmlFor="guion">3.1 Guion completo (texto que dirá el avatar)</label>
              <textarea
                id="guion"
                placeholder="Escribid aquí vuestro guion de 90–120 segundos, incluyendo las 5 reglas, el ejemplo práctico y el claim final."
              />
              <p className="small">
                Consejo: si el guion se va de tiempo, recortad texto antes de
                grabar. Es mejor un vídeo corto y claro que uno largo e infinito.
              </p>

              <div className="metrics" id="metricsGuion"></div>
            </article>
          </div>

          <div className="right-col">
            {/* PASO 4: Storyboard + Hoja producción */}
            <article className="step-card">
              <div className="step-header">
                <div className="step-title">Paso 4. Storyboard + Hoja de producción</div>
                <div className="step-number">4 / 5</div>
              </div>
              <p className="step-text">
                Aquí vamos a bajar el guion a escenas y a documentar quién hace qué
                en el equipo (hoja de producción) tal y como pide la práctica.
              </p>

              <div className="storyboard-grid">
                <div className="scene-card">
                  <div className="scene-title">Escena 1 – Apertura</div>
                  <textarea
                    id="escena1"
                    placeholder="Ej.: Avatar en plano medio con fondo corporativo verde. Presenta el objetivo del vídeo y menciona a Iberdrola."
                  />
                </div>
                <div className="scene-card">
                  <div className="scene-title">Escena 2 – Reglas 1 y 2</div>
                  <textarea
                    id="escena2"
                    placeholder="Ej.: Avatar a un lado + iconos de EPI y bloqueo de línea. Texto en pantalla corto para cada regla."
                  />
                </div>
                <div className="scene-card">
                  <div className="scene-title">Escena 3 – Reglas 3 y 4</div>
                  <textarea
                    id="escena3"
                    placeholder="Ej.: Avatar explica revisión del entorno y coordinación con el equipo. Se muestran pictogramas sencillos."
                  />
                </div>
                <div className="scene-card">
                  <div className="scene-title">Escena 4 – Regla 5</div>
                  <textarea
                    id="escena4"
                    placeholder="Ej.: Se refuerza la idea de parar si no es seguro. Icono de STOP en pantalla."
                  />
                </div>
                <div className="scene-card">
                  <div className="scene-title">Escena 5 – Ejemplo práctico</div>
                  <textarea
                    id="escena5"
                    placeholder="Ej.: Mini-situación narrada por el avatar, con imágenes o iconos que representen el caso."
                  />
                </div>
                <div className="scene-card">
                  <div className="scene-title">Escena 6 – Claim + Checklist final</div>
                  <textarea
                    id="escena6"
                    placeholder="Ej.: Claim de seguridad en grande y checklist visual con las 5 reglas resumidas."
                  />
                </div>
              </div>

              <p className="small">
                Este storyboard os ayudará a montar el vídeo en Synthesia/HeyGen y a
                pensar títulos en pantalla, iconos y ritmo.
              </p>

              <label htmlFor="avatarYEstilo">4.1 Avatar, voz y estilo visual</label>
              <textarea
                id="avatarYEstilo"
                placeholder="Ej.: Avatar stock formal, voz TTV neutra en español, fondo con los colores de Iberdrola, iconos claros de seguridad."
              />

              <label htmlFor="roles">4.2 Roles del equipo (hoja de producción)</label>
              <textarea
                id="roles"
                placeholder="Ej.: Product Owner: Ana. Guion: Luis. Producer/Editor: Marta. QA & Compliance: Diego. Diseño: Sara."
              />

              <ul className="roles-list">
                <li><strong>Product Owner (Negocio):</strong> define objetivo y público, valida el mensaje.</li>
                <li><strong>Guionista:</strong> escribe guion final y pauta de pantallas.</li>
                <li><strong>Producer/Editor:</strong> monta el vídeo y sincroniza escenas.</li>
                <li><strong>QA &amp; Compliance:</strong> revisa claridad, riesgos, subtítulos y accesibilidad.</li>
                <li><strong>Diseño (opcional):</strong> iconografía y estilo visual.</li>
              </ul>

              <label htmlFor="herramientas">4.3 Herramientas y decisiones técnicas</label>
              <textarea
                id="herramientas"
                placeholder="Ej.: Avatar/vídeo: HeyGen. Voz: ElevenLabs. Edición ligera: CapCut. Formato final: MP4 16:9 + versión recortada 9:16."
              />

              <label htmlFor="duracionFinal">4.4 Duración objetivo y versiones</label>
              <textarea
                id="duracionFinal"
                placeholder="Ej.: Versión principal 100 s (16:9). Versión extra recortada 45 s (9:16) para pantallas verticales."
              />
            </article>

            {/* PASO 5: Descarga DOC */}
            <article className="step-card">
              <div className="step-header">
                <div className="step-title">Paso 5. Descarga tu hoja de producción en .doc</div>
                <div className="step-number">5 / 5</div>
              </div>
              <p className="step-text">
                Cuando tengáis completo el objetivo, las reglas, el guion, el
                storyboard y la hoja de producción, podéis descargar un documento
                .doc con todo. Será vuestra base para montar el vídeo real.
              </p>

              <label htmlFor="nombreEquipo">Nombre del equipo / grupo</label>
              <input
                type="text"
                id="nombreEquipo"
                placeholder="Ej.: Equipo Seguridad Campo A"
              />

              <p className="small">
                Importante: el vídeo final también debe incluir subtítulos
                incrustados o archivo .srt y una versión editable del proyecto, tal
                como pide la práctica.
              </p>
            </article>
          </div>
        </section>

        <div className="btn-row">
          <button className="btn secondary" id="btnLimpiar">🧹 Limpiar todo</button>
          <button className="btn" id="btnGenerarDoc">💾 Descargar hoja de producción en .doc</button>
        </div>
        <div className="status" id="status"></div>
      </div>
    </div>
  );
}
