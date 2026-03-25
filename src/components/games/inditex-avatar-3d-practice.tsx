'use client';

import { useEffect } from 'react';

export default function InditexAvatar3DPractice() {
  useEffect(() => {
    // Inicializar métricas al cargar
    const guionAvatarEl = document.getElementById('guionAvatar') as HTMLTextAreaElement;
    const duracionObjetivoEl = document.getElementById('duracionObjetivo') as HTMLInputElement;
    const metricsGuionEl = document.getElementById('metricsGuion');

    if (guionAvatarEl && metricsGuionEl) {
      actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl);
      guionAvatarEl.addEventListener('input', () => actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl!));
    }
    if (duracionObjetivoEl) {
      duracionObjetivoEl.addEventListener('input', () => actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl!));
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
      if (guionAvatarEl) {
        guionAvatarEl.removeEventListener('input', () => actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl!));
      }
      if (duracionObjetivoEl) {
        duracionObjetivoEl.removeEventListener('input', () => actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl!));
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

  function actualizarMetricasGuion(
    guionAvatarEl: HTMLTextAreaElement,
    duracionObjetivoEl: HTMLInputElement,
    metricsEl: HTMLElement
  ) {
    const texto = guionAvatarEl.value;
    const palabras = contarPalabras(texto);
    const segundos = estimarSegundos(texto);
    const objetivo = parseInt(duracionObjetivoEl.value || '0', 10);

    metricsEl.innerHTML = '';

    const pill = (txt: string, extra = '') => {
      const span = document.createElement('span');
      span.className = `metric-pill ${extra}`;
      span.textContent = txt;
      metricsEl.appendChild(span);
    };

    if (!texto.trim()) {
      pill('Escribe el guion y aquí verás nº de palabras y duración estimada.');
      return;
    }

    pill(`Palabras guion: ${palabras}`, 'metric-ok');
    pill(`Duración estimada: ${segundos} s`);

    if (objetivo > 0) {
      const diff = segundos - objetivo;
      const textoDiff =
        diff === 0
          ? 'Coincide con la duración objetivo.'
          : diff > 0
          ? `≈ ${Math.abs(diff)} s más largo que el objetivo.`
          : `≈ ${Math.abs(diff)} s más corto que el objetivo.`;
      const dentro = Math.abs(diff) <= 5;
      pill(textoDiff, dentro ? 'metric-ok' : 'metric-warn');
    }
  }

  function limpiarTodo() {
    const fields = [
      'tituloPieza', 'duracionObjetivo', 'objetivoNegocio', 'publicoObjetivo',
      'prendaClave', 'canalUso', 'herramientas', 'descripcionAvatar',
      'linkHerramienta', 'formatoSalidaAvatar', 'guionAvatar', 'vozSeleccionada',
      'nombreVideo', 'escena1', 'escena2', 'escena3', 'escena4', 'detalleTecnico',
      'qaDiversidad', 'qaPromesas', 'qaAudio', 'qaAccesibilidad', 'qaRiesgos',
      'nombreAlumno'
    ];

    fields.forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = '';
      }
    });

    const guionAvatarEl = document.getElementById('guionAvatar') as HTMLTextAreaElement;
    const duracionObjetivoEl = document.getElementById('duracionObjetivo') as HTMLInputElement;
    const metricsGuionEl = document.getElementById('metricsGuion');
    if (guionAvatarEl && metricsGuionEl) {
      actualizarMetricasGuion(guionAvatarEl, duracionObjetivoEl, metricsGuionEl);
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
    const guionAvatarEl = document.getElementById('guionAvatar') as HTMLTextAreaElement;
    const statusEl = document.getElementById('status');

    if (!guionAvatarEl || !guionAvatarEl.value.trim()) {
      if (statusEl) {
        statusEl.textContent = 'Antes de descargar, rellena al menos el guion del avatar (Paso 3).';
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
  <title>Práctica 1 - Inditex/Zara: Avatar 3D probador virtual</title>
</head>
<body>
  <h1>Práctica 1 – Inditex/Zara: Avatar 3D probador virtual</h1>
  <p><strong>Alumno/a:</strong> ${prepararHTMLSeguro(getValue('nombreAlumno'))}</p>

  <h2>1. Encargo y contexto Zara</h2>
  <p><strong>Título de la pieza:</strong> ${prepararHTMLSeguro(getValue('tituloPieza'))}</p>
  <p><strong>Duración objetivo (s):</strong> ${prepararHTMLSeguro(getValue('duracionObjetivo'))}</p>
  <p><strong>Objetivo de negocio:</strong><br>${prepararHTMLSeguro(getValue('objetivoNegocio'))}</p>
  <p><strong>Público objetivo:</strong><br>${prepararHTMLSeguro(getValue('publicoObjetivo'))}</p>
  <p><strong>Prenda clave:</strong> ${prepararHTMLSeguro(getValue('prendaClave'))}</p>
  <p><strong>Canal principal de uso:</strong> ${prepararHTMLSeguro(getValue('canalUso'))}</p>

  <h2>2. Diseño del avatar 3D</h2>
  <p><strong>Herramientas:</strong> ${prepararHTMLSeguro(getValue('herramientas'))}</p>
  <p><strong>Descripción del avatar:</strong><br>${prepararHTMLSeguro(getValue('descripcionAvatar'))}</p>
  <p><strong>Enlace herramienta principal:</strong> ${prepararHTMLSeguro(getValue('linkHerramienta'))}</p>
  <p><strong>Formato de salida del avatar:</strong> ${prepararHTMLSeguro(getValue('formatoSalidaAvatar'))}</p>

  <h2>3. Guion del avatar (voz)</h2>
  <p><strong>Guion final:</strong><br>${prepararHTMLSeguro(getValue('guionAvatar'))}</p>
  <p><strong>Voz/idioma elegido:</strong> ${prepararHTMLSeguro(getValue('vozSeleccionada'))}</p>
  <p><strong>Nombre de archivo del vídeo:</strong> ${prepararHTMLSeguro(getValue('nombreVideo'))}</p>

  <h2>4. Storyboard 3D y plan técnico</h2>
  <p><strong>Escena 1 – Intro:</strong><br>${prepararHTMLSeguro(getValue('escena1'))}</p>
  <p><strong>Escena 2 – Giro 3D:</strong><br>${prepararHTMLSeguro(getValue('escena2'))}</p>
  <p><strong>Escena 3 – Detalle prenda:</strong><br>${prepararHTMLSeguro(getValue('escena3'))}</p>
  <p><strong>Escena 4 – Cierre y CTA:</strong><br>${prepararHTMLSeguro(getValue('escena4'))}</p>
  <p><strong>Detalles técnicos:</strong><br>${prepararHTMLSeguro(getValue('detalleTecnico'))}</p>

  <h2>5. Checklist de calidad Zara</h2>
  <p><strong>Diversidad e inclusión:</strong><br>${prepararHTMLSeguro(getValue('qaDiversidad'))}</p>
  <p><strong>Promesas sobre la prenda (claims):</strong><br>${prepararHTMLSeguro(getValue('qaPromesas'))}</p>
  <p><strong>Calidad de audio y lip-sync:</strong><br>${prepararHTMLSeguro(getValue('qaAudio'))}</p>
  <p><strong>Accesibilidad:</strong><br>${prepararHTMLSeguro(getValue('qaAccesibilidad'))}</p>
  <p><strong>Riesgos detectados y mitigación:</strong><br>${prepararHTMLSeguro(getValue('qaRiesgos'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 1 – Módulo 3 (avatar 3D).</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica1_Inditex_Avatar3D.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con el diseño del avatar, el guion, el storyboard y el checklist.';
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .app {
          width: 100%;
          max-width: 1150px;
          background: radial-gradient(circle at top, #020617 0, #020617 55%);
          border-radius: 22px;
          border: 1px solid rgba(148, 163, 184, 0.6);
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.95);
          padding: 20px 18px 24px;
          position: relative;
          overflow: hidden;
        }

        .app::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 5% 0%, rgba(168, 85, 247, 0.25), transparent 55%),
            radial-gradient(circle at 95% 0%, rgba(14, 165, 233, 0.18), transparent 55%);
          mix-blend-mode: screen;
          opacity: 0.9;
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
          margin: 0 0 4px;
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #a855f7, #0ea5e9, #f97316);
          -webkit-background-clip: text;
          color: transparent;
        }

        .subtitle {
          margin: 0 0 10px;
          font-size: 0.92rem;
          color: #cbd5f5;
        }

        .intro-steps {
          margin: 0 0 14px;
          padding-left: 1rem;
          font-size: 0.86rem;
          color: #cbd5f5;
        }

        .intro-steps li {
          margin-bottom: 4px;
        }

        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .badge {
          font-size: 0.72rem;
          padding: 4px 10px;
          border-radius: 999px;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.25),
            rgba(14, 165, 233, 0.25)
          );
          border: 1px solid rgba(148, 163, 184, 0.6);
          color: #e0f2fe;
          backdrop-filter: blur(6px);
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 12px;
          margin-bottom: 14px;
        }

        @media (max-width: 950px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .card {
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.5);
          padding: 11px 12px 10px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at top left, #1f2937 0, #020617 60%);
        }

        .card:nth-child(1) {
          border-color: rgba(168, 85, 247, 0.7);
          box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.25);
        }
        .card:nth-child(2) {
          border-color: rgba(14, 165, 233, 0.7);
          box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.25);
        }
        .card:nth-child(3) {
          border-color: rgba(248, 113, 113, 0.7);
          box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.25);
        }
        .card:nth-child(4) {
          border-color: rgba(52, 211, 153, 0.8);
          box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.3);
        }
        .card:nth-child(5) {
          border-color: rgba(251, 191, 36, 0.8);
          box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.3);
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.8;
          mix-blend-mode: screen;
          background:
            radial-gradient(circle at 0 0, rgba(168, 85, 247, 0.22), transparent 50%),
            radial-gradient(circle at 100% 0, rgba(14, 165, 233, 0.18), transparent 55%);
        }

        .card-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 0.97rem;
          font-weight: 600;
        }

        .card-number {
          font-size: 0.75rem;
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: radial-gradient(circle at top, #0f172a, #020617);
          color: #e0f2fe;
        }

        .card-text {
          position: relative;
          font-size: 0.84rem;
          color: #cbd5f5;
          margin-bottom: 6px;
        }

        label {
          font-size: 0.8rem;
          color: #cbd5f5;
          display: block;
          margin-bottom: 3px;
        }

        textarea,
        input[type='text'],
        input[type='number'] {
          width: 100%;
          border-radius: 9px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.95);
          color: #e5e7eb;
          font-size: 0.86rem;
          padding: 7px 9px;
          resize: vertical;
          min-height: 50px;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease,
            background 0.15s ease, transform 0.08s ease;
        }

        textarea:focus,
        input[type='text']:focus,
        input[type='number']:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.7);
          background: #020617;
          transform: translateY(-0.5px);
        }

        input[type='text'],
        input[type='number'] {
          min-height: auto;
        }

        .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 7px;
        }

        @media (max-width: 700px) {
          .row-2 {
            grid-template-columns: 1fr;
          }
        }

        .small {
          font-size: 0.8rem;
          color: #a5b4fc;
          margin-top: 3px;
        }

        .metrics {
          margin-top: 5px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 0.78rem;
        }

        .metric-pill {
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.98);
          color: #cbd5f5;
        }

        .metric-ok {
          border-color: rgba(34, 197, 94, 0.9);
          background: rgba(22, 163, 74, 0.25);
          color: #dcfce7;
        }

        .metric-warn {
          border-color: rgba(248, 113, 113, 0.9);
          background: rgba(127, 29, 29, 0.28);
          color: #fee2e2;
        }

        .checklist {
          font-size: 0.8rem;
          color: #cbd5f5;
          margin-top: 4px;
          padding-left: 1rem;
        }

        .checklist li {
          margin-bottom: 3px;
        }

        .btn-row {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: flex-end;
        }

        .btn {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.3),
            rgba(14, 165, 233, 0.3)
          );
          color: #e0f2fe;
          padding: 7px 18px;
          font-size: 0.82rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: background 0.15s ease, transform 0.1s ease,
            box-shadow 0.15s ease, border-color 0.15s ease;
          backdrop-filter: blur(6px);
        }

        .btn:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.9);
          border-color: #a855f7;
          background: linear-gradient(
            135deg,
            rgba(168, 85, 247, 0.45),
            rgba(14, 165, 233, 0.35)
          );
        }

        .btn:active {
          transform: scale(0.98);
          box-shadow: none;
        }

        .btn.secondary {
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.95),
            rgba(31, 41, 55, 0.95)
          );
          color: #cbd5f5;
        }

        .status {
          margin-top: 6px;
          font-size: 0.8rem;
          color: #c4b5fd;
          min-height: 1em;
        }
      `}</style>

      <div className="app">
        <header>
          <h1>Práctica 1 – Inditex/Zara: Avatar 3D probador virtual</h1>
          <p className="subtitle">
            Hola, soy tu profe. En esta práctica diseñamos un avatar 3D y un vídeo
            corto donde el avatar habla y muestra cómo le queda una prenda, como si
            fuera un probador virtual de Zara.
          </p>
          <ul className="intro-steps">
            <li>PASO 1: Definimos la necesidad de negocio (reducir devoluciones) y el público.</li>
            <li>PASO 2: Diseñamos el avatar 3D (Avaturn u otra herramienta) y elegimos la prenda.</li>
            <li>PASO 3: Escribimos el guion que dirá el avatar (15–20 s).</li>
            <li>PASO 4: Marcamos storyboard 3D (frontal, giro, detalle, CTA) y plan técnico de vídeo.</li>
            <li>PASO 5: Rellenamos checklist de calidad y descargamos un .doc con todo.</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Avatar 3D (cuerpo completo)</span>
            <span className="badge">Guion hablado 15–20 s</span>
            <span className="badge">Storyboard 4 escenas</span>
            <span className="badge">Hoja técnica de vídeo</span>
            <span className="badge">Checklist de calidad Zara</span>
          </div>
        </header>

        <section className="layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="col">
            {/* PASO 1 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 1. Encargo y contexto Zara</div>
                <div className="card-number">1 / 5</div>
              </div>
              <p className="card-text">
                Imagina que trabajas en el equipo digital de Zara. Quieren reducir
                devoluciones en compras online usando un avatar 3D que hable y
                muestre cómo queda una prenda clave (chaqueta, vestido, camisa).
                Aquí defines el encargo.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="tituloPieza">Título de la pieza de vídeo</label>
                  <input
                    type="text"
                    id="tituloPieza"
                    placeholder="Ej.: Probador virtual Zara – Chaqueta vaquera"
                  />
                </div>
                <div>
                  <label htmlFor="duracionObjetivo">Duración objetivo (segundos)</label>
                  <input
                    type="number"
                    id="duracionObjetivo"
                    placeholder="Ej.: 20"
                  />
                </div>
              </div>

              <label htmlFor="objetivoNegocio">
                1.1 Objetivo de negocio (una frase)
              </label>
              <textarea
                id="objetivoNegocio"
                placeholder="Ej.: Reducir devoluciones por talla en chaquetas vaqueras mostrando cómo sientan en un cuerpo realista."
              />

              <label htmlFor="publicoObjetivo">
                1.2 Público objetivo (quién lo verá)
              </label>
              <textarea
                id="publicoObjetivo"
                placeholder="Ej.: Clientes de 18–30 años que compran chaquetas vaqueras online en Zara.es."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="prendaClave">Prenda clave</label>
                  <input
                    type="text"
                    id="prendaClave"
                    placeholder="Ej.: Chaqueta vaquera cropped, ref. 1234/567"
                  />
                </div>
                <div>
                  <label htmlFor="canalUso">Canal principal de uso</label>
                  <input
                    type="text"
                    id="canalUso"
                    placeholder="Ej.: Web Zara / App móvil / RRSS"
                  />
                </div>
              </div>

              <p className="small">
                Cuanto más concreto seas aquí, más realista será el proyecto (como
                en las prácticas de Mapfre/Iberdrola/Cupra).
              </p>
            </article>

            {/* PASO 2 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 2. Diseño del avatar 3D</div>
                <div className="card-number">2 / 5</div>
              </div>
              <p className="card-text">
                Aquí describes cómo será el avatar 3D y con qué herramientas lo
                crearás. Puedes usar Avaturn (avatar 3D realista desde selfie) y/o
                Krikey (avatar 3D cartoon + animación desde texto).
              </p>

              <label htmlFor="herramientas">
                2.1 Herramientas para crear el avatar 3D
              </label>
              <input
                type="text"
                id="herramientas"
                placeholder="Ej.: Avaturn para avatar realista + Krikey.ai para animar y hacer hablar."
              />

              <label htmlFor="descripcionAvatar">
                2.2 Descripción del avatar (aspecto, cuerpo, tono)
              </label>
              <textarea
                id="descripcionAvatar"
                placeholder="Ej.: Avatar joven, género neutro, tono de piel medio, cuerpo talla M, peinado sencillo, estilo minimalista que encaje con Zara."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="linkHerramienta">
                    Enlace principal de la herramienta
                  </label>
                  <input
                    type="text"
                    id="linkHerramienta"
                    placeholder="Ej.: https://www.krikey.ai/create/free-ai-avatar-generator"
                  />
                </div>
                <div>
                  <label htmlFor="formatoSalidaAvatar">
                    Formato de salida del avatar
                  </label>
                  <input
                    type="text"
                    id="formatoSalidaAvatar"
                    placeholder="Ej.: Vídeo MP4 1080p con avatar hablando"
                  />
                </div>
              </div>

              <p className="small">
                No hace falta que pegues aquí el archivo; solo documenta cómo lo vas
                a crear y qué formato final vas a usar.
              </p>
            </article>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col">
            {/* PASO 3 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 3. Guion del avatar (voz)</div>
                <div className="card-number">3 / 5</div>
              </div>
              <p className="card-text">
                Escribe el texto exacto que va a decir el avatar cuando hable en el
                vídeo. Piensa en 3 bloques: saludo, explicación de la prenda y
                llamada a la acción. Lo pegarás luego en Krikey o herramienta similar
                para generar la voz y la animación labial.
              </p>

              <label htmlFor="guionAvatar">
                3.1 Guion final del avatar (15–20 segundos)
              </label>
              <textarea
                id="guionAvatar"
                placeholder='Ej.: "Hola, soy tu probador virtual de Zara. Esta chaqueta vaquera en talla M se ajusta a mis hombros y cintura sin arrugas. Gira conmigo para ver la espalda. Si tienes medidas parecidas, esta talla será una buena opción para ti."'
              />

              <div className="row-2">
                <div>
                  <label htmlFor="vozSeleccionada">
                    Voz/idioma elegido en la herramienta
                  </label>
                  <input
                    type="text"
                    id="vozSeleccionada"
                    placeholder="Ej.: Voz femenina joven, español (ES), velocidad media."
                  />
                </div>
                <div>
                  <label htmlFor="nombreVideo">
                    Nombre de archivo del vídeo final
                  </label>
                  <input
                    type="text"
                    id="nombreVideo"
                    placeholder="Ej.: zara_avatar3d_tuNombre.mp4"
                  />
                </div>
              </div>

              <div className="metrics" id="metricsGuion"></div>
              <p className="small">
                Aquí calculamos palabras y duración estimada para comprobar si
                encaja con tu objetivo de segundos.
              </p>
            </article>

            {/* PASO 4 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 4. Storyboard 3D y plan técnico</div>
                <div className="card-number">4 / 5</div>
              </div>
              <p className="card-text">
                Divide el vídeo en 4 escenas clave. No hace falta dibujar; basta con
                describir qué se ve en pantalla y qué dice el avatar en cada momento
                (frontal, giro, detalle, CTA).
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="escena1">
                    Escena 1 – Intro (frontal)
                  </label>
                  <textarea
                    id="escena1"
                    placeholder="Ej.: Avatar frontal saluda, aparece texto con nombre de prenda y talla."
                  />
                </div>
                <div>
                  <label htmlFor="escena2">
                    Escena 2 – Giro 3D
                  </label>
                  <textarea
                    id="escena2"
                    placeholder="Ej.: Avatar gira 360º mientras comenta el ajuste en hombros y cintura."
                  />
                </div>
              </div>

              <div className="row-2">
                <div>
                  <label htmlFor="escena3">
                    Escena 3 – Detalle prenda
                  </label>
                  <textarea
                    id="escena3"
                    placeholder="Ej.: Zoom en espalda o puños, texto flotante 'Sin arrugas / Buen largo'."
                  />
                </div>
                <div>
                  <label htmlFor="escena4">
                    Escena 4 – Cierre y CTA
                  </label>
                  <textarea
                    id="escena4"
                    placeholder="Ej.: Avatar vuelve a frontal y dice la frase final: 'Si tienes medidas parecidas, esta talla puede ser para ti'. Botón 'Añadir a la cesta'."
                  />
                </div>
              </div>

              <label htmlFor="detalleTecnico">
                4.1 Detalles técnicos (formato, resolución, plataforma)
              </label>
              <textarea
                id="detalleTecnico"
                placeholder="Ej.: Vídeo MP4, 1080p, 16:9. Preparado para incrustar en la ficha de producto de Zara.es y en redes sociales."
              />
            </article>

            {/* PASO 5 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 5. Checklist de calidad Zara</div>
                <div className="card-number">5 / 5</div>
              </div>
              <p className="card-text">
                Igual que en las otras prácticas, cerramos con un checklist rápido
                de riesgos y calidad: diversidad, promesas realistas, claridad del
                audio y accesibilidad.
              </p>

              <label htmlFor="qaDiversidad">
                5.1 Diversidad e inclusión (apariencia y lenguaje)
              </label>
              <textarea
                id="qaDiversidad"
                placeholder="Ej.: El avatar no refuerza estereotipos, el lenguaje es neutro e inclusivo."
              />

              <label htmlFor="qaPromesas">
                5.2 Promesas sobre la prenda (claims)
              </label>
              <textarea
                id="qaPromesas"
                placeholder="Ej.: No prometemos que 'siempre acertarás la talla'; hablamos de orientación, no de garantía."
              />

              <label htmlFor="qaAudio">
                5.3 Calidad de audio y lip-sync
              </label>
              <textarea
                id="qaAudio"
                placeholder="Ej.: Voz clara, sin ruidos, labios sincronizados de forma aceptable."
              />

              <label htmlFor="qaAccesibilidad">
                5.4 Accesibilidad (subtítulos, contraste, velocidad)
              </label>
              <textarea
                id="qaAccesibilidad"
                placeholder="Ej.: Incluimos subtítulos, tamaño de letra legible y velocidad no demasiado rápida."
              />

              <label htmlFor="qaRiesgos">
                5.5 Riesgos detectados y cómo se mitigan
              </label>
              <textarea
                id="qaRiesgos"
                placeholder="Ej.: Riesgo de que el avatar no represente todos los cuerpos; proponemos tener varias tallas/avatares."
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
                <li>✔ Guion alineado con la duración objetivo (15–20 s aprox.).</li>
                <li>✔ Avatar y lenguaje coherentes con marca Zara.</li>
                <li>✔ No se hacen promesas de talla imposibles o engañosas.</li>
                <li>✔ Pensado para web/app y accesibilidad básica.</li>
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
