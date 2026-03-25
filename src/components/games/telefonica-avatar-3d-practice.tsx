'use client';

import { useEffect } from 'react';

export default function TelefonicaAvatar3DPractice() {
  useEffect(() => {
    // Inicializar métricas al cargar
    const dialogoClienteEl = document.getElementById('dialogoCliente') as HTMLTextAreaElement;
    const dialogoAgenteEl = document.getElementById('dialogoAgente') as HTMLTextAreaElement;
    const duracionObjetivoEl = document.getElementById('duracionObjetivo') as HTMLInputElement;
    const metricsDialogoEl = document.getElementById('metricsDialogo');

    if (dialogoClienteEl && metricsDialogoEl) {
      actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl);
      dialogoClienteEl.addEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
    }
    if (dialogoAgenteEl) {
      dialogoAgenteEl.addEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
    }
    if (duracionObjetivoEl) {
      duracionObjetivoEl.addEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
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
      if (dialogoClienteEl) {
        dialogoClienteEl.removeEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
      }
      if (dialogoAgenteEl) {
        dialogoAgenteEl.removeEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
      }
      if (duracionObjetivoEl) {
        duracionObjetivoEl.removeEventListener('input', () => actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl!));
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

  function actualizarMetricasDialogo(
    dialogoClienteEl: HTMLTextAreaElement,
    dialogoAgenteEl: HTMLTextAreaElement,
    duracionObjetivoEl: HTMLInputElement,
    metricsEl: HTMLElement
  ) {
    const textoCliente = dialogoClienteEl.value;
    const textoAgente = dialogoAgenteEl.value;
    const totalTexto = (textoCliente || '') + ' ' + (textoAgente || '');
    const palabrasCliente = contarPalabras(textoCliente);
    const palabrasAgente = contarPalabras(textoAgente);
    const segundosEst = estimarSegundos(totalTexto);
    const objetivo = parseInt(duracionObjetivoEl.value || '0', 10);

    metricsEl.innerHTML = '';

    const pill = (txt: string, extra = '') => {
      const span = document.createElement('span');
      span.className = `metric-pill ${extra}`;
      span.textContent = txt;
      metricsEl.appendChild(span);
    };

    if (!totalTexto.trim()) {
      pill('Escribe las líneas de cliente y agente para ver nº de palabras y duración estimada.');
      return;
    }

    pill(`Palabras cliente: ${palabrasCliente}`, 'metric-ok');
    pill(`Palabras agente: ${palabrasAgente}`, 'metric-ok');
    pill(`Duración estimada total: ${segundosEst} s`);

    if (objetivo > 0) {
      const diff = segundosEst - objetivo;
      const textoDiff =
        diff === 0
          ? 'Coincide con la duración objetivo.'
          : diff > 0
          ? `≈ ${Math.abs(diff)} s más largo que el objetivo.`
          : `≈ ${Math.abs(diff)} s más corto que el objetivo.`;
      const dentro = Math.abs(diff) <= 10;
      pill(textoDiff, dentro ? 'metric-ok' : 'metric-warn');
    }
  }

  function limpiarTodo() {
    const fields = [
      'casoUso', 'duracionObjetivo', 'impactoNegocio', 'publicoMovistar',
      'avatarCliente', 'avatarAgente', 'toolTalking', 'linkTool',
      'dialogoCliente', 'dialogoAgente', 'pasosTool', 'formatoVideo',
      'canalesPublicacion', 'notasTecnicas', 'qaClaridad', 'qaPromesas',
      'qaPrivacidad', 'qaAcceso', 'nombreAlumno'
    ];

    fields.forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = '';
      }
    });

    const dialogoClienteEl = document.getElementById('dialogoCliente') as HTMLTextAreaElement;
    const dialogoAgenteEl = document.getElementById('dialogoAgente') as HTMLTextAreaElement;
    const duracionObjetivoEl = document.getElementById('duracionObjetivo') as HTMLInputElement;
    const metricsDialogoEl = document.getElementById('metricsDialogo');
    if (dialogoClienteEl && dialogoAgenteEl && metricsDialogoEl) {
      actualizarMetricasDialogo(dialogoClienteEl, dialogoAgenteEl, duracionObjetivoEl, metricsDialogoEl);
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
    const dialogoClienteEl = document.getElementById('dialogoCliente') as HTMLTextAreaElement;
    const dialogoAgenteEl = document.getElementById('dialogoAgente') as HTMLTextAreaElement;
    const statusEl = document.getElementById('status');

    if (!dialogoClienteEl || !dialogoClienteEl.value.trim() || !dialogoAgenteEl || !dialogoAgenteEl.value.trim()) {
      if (statusEl) {
        statusEl.textContent = 'Antes de descargar, rellena al menos el diálogo de cliente y agente (Paso 3).';
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
  <title>Práctica 2 - Telefónica/Movistar: Dúo de avatares 3D</title>
</head>
<body>
  <h1>Práctica 2 – Telefónica/Movistar: Dúo de avatares 3D para soporte técnico</h1>
  <p><strong>Alumno/a:</strong> ${prepararHTMLSeguro(getValue('nombreAlumno'))}</p>

  <h2>1. Encargo de Telefónica</h2>
  <p><strong>Caso de uso:</strong> ${prepararHTMLSeguro(getValue('casoUso'))}</p>
  <p><strong>Duración objetivo (s):</strong> ${prepararHTMLSeguro(getValue('duracionObjetivo'))}</p>
  <p><strong>Impacto de negocio:</strong><br>${prepararHTMLSeguro(getValue('impactoNegocio'))}</p>
  <p><strong>Público objetivo:</strong><br>${prepararHTMLSeguro(getValue('publicoMovistar'))}</p>

  <h2>2. Diseño de los dos avatares</h2>
  <p><strong>Avatar Cliente:</strong><br>${prepararHTMLSeguro(getValue('avatarCliente'))}</p>
  <p><strong>Avatar Agente Movistar:</strong><br>${prepararHTMLSeguro(getValue('avatarAgente'))}</p>
  <p><strong>Herramienta talking avatar:</strong> ${prepararHTMLSeguro(getValue('toolTalking'))}</p>
  <p><strong>Enlace herramienta:</strong> ${prepararHTMLSeguro(getValue('linkTool'))}</p>

  <h2>3. Guion dialogado</h2>
  <h3>Líneas del Cliente</h3>
  <p>${prepararHTMLSeguro(getValue('dialogoCliente'))}</p>
  <h3>Líneas del Agente Movistar</h3>
  <p>${prepararHTMLSeguro(getValue('dialogoAgente'))}</p>

  <h2>4. Plan de producción en la herramienta</h2>
  <p><strong>Pasos en la herramienta:</strong><br>${prepararHTMLSeguro(getValue('pasosTool'))}</p>
  <p><strong>Formato de vídeo final:</strong> ${prepararHTMLSeguro(getValue('formatoVideo'))}</p>
  <p><strong>Canales de publicación:</strong> ${prepararHTMLSeguro(getValue('canalesPublicacion'))}</p>
  <p><strong>Notas técnicas:</strong><br>${prepararHTMLSeguro(getValue('notasTecnicas'))}</p>

  <h2>5. Checklist de calidad y riesgos</h2>
  <p><strong>Claridad del procedimiento:</strong><br>${prepararHTMLSeguro(getValue('qaClaridad'))}</p>
  <p><strong>Promesas y límites:</strong><br>${prepararHTMLSeguro(getValue('qaPromesas'))}</p>
  <p><strong>Privacidad y datos personales:</strong><br>${prepararHTMLSeguro(getValue('qaPrivacidad'))}</p>
  <p><strong>Accesibilidad:</strong><br>${prepararHTMLSeguro(getValue('qaAcceso'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 2 – Módulo 3 (dúo de avatares 3D para soporte técnico).</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica2_Telefonica_Avatar3D.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con el caso de uso, los dos avatares, el diálogo, el plan de producción y el checklist.';
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        .app {
          width: 100%;
          max-width: 1150px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
          border-radius: 22px;
          border: 2px solid #bae6fd;
          box-shadow: 0 10px 40px rgba(14, 165, 233, 0.15);
          padding: 24px 20px 28px;
          position: relative;
          overflow: hidden;
        }

        .app::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 10% 0%, rgba(56, 189, 248, 0.08), transparent 40%),
            radial-gradient(circle at 90% 0%, rgba(14, 165, 233, 0.06), transparent 40%);
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
          margin: 0 0 6px;
          font-size: 1.55rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #0284c7, #0ea5e9, #38bdf8);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 700;
        }

        .subtitle {
          margin: 0 0 12px;
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.5;
        }

        .intro-steps {
          margin: 0 0 16px;
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: #475569;
        }

        .intro-steps li {
          margin-bottom: 5px;
        }

        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 14px;
        }

        .badge {
          font-size: 0.74rem;
          padding: 5px 11px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.15));
          border: 1px solid #7dd3fc;
          color: #0369a1;
          font-weight: 500;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 14px;
          margin-bottom: 16px;
        }

        @media (max-width: 950px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        .col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card {
          border-radius: 16px;
          border: 2px solid;
          padding: 13px 14px 12px;
          position: relative;
          overflow: hidden;
          background: white;
        }

        .card:nth-child(1) {
          border-color: #7dd3fc;
          box-shadow: 0 4px 12px rgba(125, 211, 252, 0.3);
        }
        .card:nth-child(2) {
          border-color: #38bdf8;
          box-shadow: 0 4px 12px rgba(56, 189, 248, 0.25);
        }
        .card:nth-child(3) {
          border-color: #0ea5e9;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
        }
        .card:nth-child(4) {
          border-color: #0284c7;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
        }
        .card:nth-child(5) {
          border-color: #0c4a6e;
          box-shadow: 0 4px 12px rgba(12, 74, 110, 0.2);
        }

        .card-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
          margin-bottom: 9px;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0c4a6e;
        }

        .card-number {
          font-size: 0.76rem;
          padding: 3px 8px;
          border-radius: 999px;
          border: 2px solid #7dd3fc;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          color: #0369a1;
          font-weight: 600;
        }

        .card-text {
          position: relative;
          font-size: 0.86rem;
          color: #475569;
          margin-bottom: 7px;
          line-height: 1.5;
        }

        label {
          font-size: 0.82rem;
          color: #334155;
          display: block;
          margin-bottom: 4px;
          font-weight: 600;
        }

        textarea,
        input[type='text'],
        input[type='number'] {
          width: 100%;
          border-radius: 10px;
          border: 2px solid #bae6fd;
          background: white;
          color: #1e293b;
          font-size: 0.87rem;
          padding: 8px 10px;
          resize: vertical;
          min-height: 52px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;
        }

        textarea:focus,
        input[type='text']:focus,
        input[type='number']:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
          transform: translateY(-1px);
        }

        input[type='text'],
        input[type='number'] {
          min-height: auto;
        }

        .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        @media (max-width: 700px) {
          .row-2 {
            grid-template-columns: 1fr;
          }
        }

        .small {
          font-size: 0.81rem;
          color: #64748b;
          margin-top: 4px;
          font-style: italic;
        }

        .metrics {
          margin-top: 6px;
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          font-size: 0.79rem;
        }

        .metric-pill {
          padding: 4px 8px;
          border-radius: 999px;
          border: 2px solid #7dd3fc;
          background: white;
          color: #0369a1;
          font-weight: 500;
        }

        .metric-ok {
          border-color: #4ade80;
          background: #f0fdf4;
          color: #166534;
        }

        .metric-warn {
          border-color: #f87171;
          background: #fef2f2;
          color: #991b1b;
        }

        .checklist {
          font-size: 0.82rem;
          color: #475569;
          margin-top: 5px;
          padding-left: 1.1rem;
        }

        .checklist li {
          margin-bottom: 4px;
        }

        .btn-row {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          justify-content: flex-end;
        }

        .btn {
          border-radius: 999px;
          border: 2px solid #7dd3fc;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: white;
          padding: 8px 19px;
          font-size: 0.83rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.2s ease;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
        }

        .btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(14, 165, 233, 0.35);
          border-color: #0ea5e9;
        }

        .btn:active {
          transform: scale(0.98);
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
        }

        .btn.secondary {
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          color: #0369a1;
          border-color: #7dd3fc;
          box-shadow: 0 2px 8px rgba(125, 211, 252, 0.2);
        }

        .btn.secondary:hover {
          background: linear-gradient(135deg, #e0f2fe, #bae6fd);
          border-color: #38bdf8;
        }

        .status {
          margin-top: 7px;
          font-size: 0.82rem;
          color: #0369a1;
          min-height: 1em;
          font-weight: 500;
        }
      `}</style>

      <div className="app">
        <header>
          <h1>Práctica 2 – Telefónica/Movistar: Dúo de avatares 3D para soporte técnico</h1>
          <p className="subtitle">
            En esta práctica trabajamos con dos avatares (cliente + agente) para simular
            una llamada al 1002. Usaremos una herramienta online de talking avatars
            (Clipfly, EaseMate, Typecast…) que a partir de fotos y texto genera un vídeo
            con ambos personajes hablando.
          </p>
          <ul className="intro-steps">
            <li>PASO 1: Definimos el caso de uso real de Telefónica (incidencia típica).</li>
            <li>PASO 2: Diseñamos los dos avatares (cliente + agente) y sus estilos.</li>
            <li>PASO 3: Escribimos el diálogo completo entre ambos (45–60 s).</li>
            <li>PASO 4: Planificamos cómo montarlo en una herramienta online de talking avatars.</li>
            <li>PASO 5: Checklist de calidad (claridad, tono, privacidad) y descarga de .doc final.</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Dos avatares 3D/2.5D</span>
            <span className="badge">Diálogo cliente–agente</span>
            <span className="badge">Soporte técnico Movistar</span>
            <span className="badge">Herramienta online (Clipfly / EaseMate / Typecast)</span>
            <span className="badge">Checklist de riesgos</span>
          </div>
        </header>

        <section className="layout">
          {/* COLUMNA IZQUIERDA */}
          <div className="col">
            {/* PASO 1 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 1. Encargo de Telefónica</div>
                <div className="card-number">1 / 5</div>
              </div>
              <p className="card-text">
                Telefónica quiere reducir llamadas repetidas al 1002 creando vídeos
                breves donde dos avatares explican cómo resolver incidencias simples
                (sin enviar técnico). Tú diseñas uno de esos vídeos.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="casoUso">
                    1.1 Caso de uso elegido
                  </label>
                  <input
                    type="text"
                    id="casoUso"
                    placeholder="Ej.: Cliente sin Internet en casa (router con luz roja)."
                  />
                </div>
                <div>
                  <label htmlFor="duracionObjetivo">
                    Duración objetivo del vídeo (segundos)
                  </label>
                  <input
                    type="number"
                    id="duracionObjetivo"
                    placeholder="Ej.: 60"
                  />
                </div>
              </div>

              <label htmlFor="impactoNegocio">
                1.2 Impacto que busca Telefónica
              </label>
              <textarea
                id="impactoNegocio"
                placeholder="Ej.: Reducir un 15% las llamadas repetidas sobre el mismo problema si el cliente ve el vídeo primero."
              />

              <label htmlFor="publicoMovistar">
                1.3 Público objetivo (perfil de cliente)
              </label>
              <textarea
                id="publicoMovistar"
                placeholder="Ej.: Clientes residenciales con poca experiencia técnica que llaman al 1002 por problemas de Wi-Fi."
              />

              <p className="small">
                Este ejercicio está pensado para que el vídeo se use en la web de
                ayuda de Movistar y en la app Mi Movistar.
              </p>
            </article>

            {/* PASO 2 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 2. Diseño de los dos avatares</div>
                <div className="card-number">2 / 5</div>
              </div>
              <p className="card-text">
                Describe los dos personajes: el cliente que tiene el problema y el
                agente/experto de Movistar que le ayuda. Puedes usar fotos reales
                (retocadas) o avatares IA generados con otra herramienta, y luego
                subirlos a Clipfly/EaseMate/Typecast para animarlos.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="avatarCliente">
                    2.1 Avatar Cliente (aspecto y tono)
                  </label>
                  <textarea
                    id="avatarCliente"
                    placeholder="Ej.: Persona de 40 años, aspecto cotidiano, algo preocupada por no tener Internet; tono educado y con dudas."
                  />
                </div>
                <div>
                  <label htmlFor="avatarAgente">
                    2.2 Avatar Agente Movistar (aspecto y tono)
                  </label>
                  <textarea
                    id="avatarAgente"
                    placeholder="Ej.: Agente joven con polo Movistar, gesto tranquilo, tono empático y claro."
                  />
                </div>
              </div>

              <div className="row-2">
                <div>
                  <label htmlFor="toolTalking">
                    Herramienta online para animarlos
                  </label>
                  <input
                    type="text"
                    id="toolTalking"
                    placeholder="Ej.: Clipfly AI Talking Avatar (o EaseMate / Typecast)."
                  />
                </div>
                <div>
                  <label htmlFor="linkTool">
                    Enlace de la herramienta
                  </label>
                  <input
                    type="text"
                    id="linkTool"
                    placeholder="Ej.: https://www.clipfly.ai/video-ai/ai-talking-avatar/"
                  />
                </div>
              </div>

              <p className="small">
                Estas herramientas permiten subir una foto, escribir un texto y
                generar un vídeo con el avatar hablando (texto→voz + lip-sync).
              </p>
            </article>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col">
            {/* PASO 3 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 3. Guion dialogado (cliente + agente)</div>
                <div className="card-number">3 / 5</div>
              </div>
              <p className="card-text">
                Escribe el diálogo completo: el cliente explica el problema y el
                agente guía paso a paso hasta la solución. Piensa en máximo 4–5
                turnos por personaje para que dure 45–60 segundos.
              </p>

              <label htmlFor="dialogoCliente">
                3.1 Líneas del Cliente
              </label>
              <textarea
                id="dialogoCliente"
                placeholder='Ej.: "Hola, soy cliente de Movistar y desde esta mañana no tengo Internet. En el router veo una luz roja fija…"'
              />

              <label htmlFor="dialogoAgente">
                3.2 Líneas del Agente Movistar
              </label>
              <textarea
                id="dialogoAgente"
                placeholder='Ej.: "Gracias por contactar con nosotros. Vamos a revisar tu router paso a paso. Primero, mira si el cable de alimentación está bien conectado…"'
              />

              <div className="metrics" id="metricsDialogo"></div>
              <p className="small">
                Aquí calculamos palabras y duración estimada para ver si tu diálogo
                cabe en el tiempo objetivo (45–60 s).
              </p>
            </article>

            {/* PASO 4 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 4. Plan de producción en la herramienta</div>
                <div className="card-number">4 / 5</div>
              </div>
              <p className="card-text">
                Describe cómo vas a montar el vídeo en la herramienta elegida
                (Clipfly/EaseMate/Typecast): qué fotos subirás, qué voces usarás y
                cómo alternarán los avatares en pantalla.
              </p>

              <label htmlFor="pasosTool">
                4.1 Pasos en la herramienta (resumen)
              </label>
              <textarea
                id="pasosTool"
                placeholder="Ej.: Subo foto del cliente → añado su texto → genero clip 1. Subo foto del agente → añado sus líneas → genero clip 2. Luego uno ambos clips en un solo vídeo dentro de la herramienta."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="formatoVideo">
                    Formato de vídeo final
                  </label>
                  <input
                    type="text"
                    id="formatoVideo"
                    placeholder="Ej.: MP4, 1080p, 16:9"
                  />
                </div>
                <div>
                  <label htmlFor="canalesPublicacion">
                    Canales donde se publicará
                  </label>
                  <input
                    type="text"
                    id="canalesPublicacion"
                    placeholder="Ej.: Centro de ayuda web + app Mi Movistar."
                  />
                </div>
              </div>

              <label htmlFor="notasTecnicas">
                4.2 Notas técnicas (voz, idioma, subtítulos, etc.)
              </label>
              <textarea
                id="notasTecnicas"
                placeholder="Ej.: Voces en español neutro, subtítulos incrustados, ritmo de habla medio, se exporta sin marca de agua."
              />
            </article>

            {/* PASO 5 */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 5. Checklist de calidad y riesgos</div>
                <div className="card-number">5 / 5</div>
              </div>
              <p className="card-text">
                Cerramos con un checklist rápido: ¿el vídeo es claro?, ¿no hace
                promesas falsas?, ¿respeta la privacidad?, ¿es accesible? Igual que
                en Mapfre/Iberdrola/Cupra documentamos los riesgos.
              </p>

              <label htmlFor="qaClaridad">
                5.1 Claridad del procedimiento (pasos)
              </label>
              <textarea
                id="qaClaridad"
                placeholder="Ej.: Se entiende con 1 sola visualización qué tiene que hacer el cliente para reiniciar el router."
              />

              <label htmlFor="qaPromesas">
                5.2 Promesas y límites (no "milagros")
              </label>
              <textarea
                id="qaPromesas"
                placeholder="Ej.: Solo prometemos que el vídeo ayuda a diagnosticar, no que resolverá el 100% de los casos."
              />

              <label htmlFor="qaPrivacidad">
                5.3 Privacidad y datos personales
              </label>
              <textarea
                id="qaPrivacidad"
                placeholder="Ej.: El avatar no menciona datos sensibles (DNI, dirección exacta, etc.)."
              />

              <label htmlFor="qaAcceso">
                5.4 Accesibilidad (subtítulos, lenguaje sencillo)
              </label>
              <textarea
                id="qaAcceso"
                placeholder="Ej.: Incluimos subtítulos, evitamos tecnicismos sin explicar y usamos frases cortas."
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
                <li>✔ Diálogo de 45–60s entre cliente y agente.</li>
                <li>✔ Herramienta online documentada (Clipfly/EaseMate/Typecast…).</li>
                <li>✔ Pasos claros y sin promesas imposibles.</li>
                <li>✔ Pensado para app/web de ayuda Movistar.</li>
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
