'use client';

import { useEffect } from 'react';

export default function SeatCupraPractice3() {
  useEffect(() => {
    const guionESEl = document.getElementById('guionES') as HTMLTextAreaElement;
    const guionDestEl = document.getElementById('guionDest') as HTMLTextAreaElement;
    const metricsESEl = document.getElementById('metricsES');
    const metricsDestEl = document.getElementById('metricsDest');
    const idiomaDestinoEl = document.getElementById('idiomaDestino') as HTMLInputElement;
    
    if (guionESEl && metricsESEl) {
      actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl);
      guionESEl.addEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
    }
    if (guionDestEl) {
      guionDestEl.addEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
    }
    if (idiomaDestinoEl) {
      idiomaDestinoEl.addEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
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
      if (guionESEl) {
        guionESEl.removeEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
      }
      if (guionDestEl) {
        guionDestEl.removeEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
      }
      if (idiomaDestinoEl) {
        idiomaDestinoEl.removeEventListener('input', () => actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl));
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

  function actualizarMetricas(
    guionESEl: HTMLTextAreaElement,
    guionDestEl: HTMLTextAreaElement,
    metricsESEl: HTMLElement,
    metricsDestEl: HTMLElement,
    idiomaDestinoEl: HTMLInputElement
  ) {
    const textoES = guionESEl.value;
    const palabrasES = contarPalabras(textoES);
    const segundosES = estimarSegundos(textoES);

    metricsESEl.innerHTML = '';
    const pillES = (txt: string, extra = '') => {
      const s = document.createElement('span');
      s.className = `metric-pill ${extra}`;
      s.textContent = txt;
      metricsESEl.appendChild(s);
    };

    if (!textoES.trim()) {
      const span = document.createElement('span');
      span.className = 'metric-pill';
      span.textContent = 'Pegad vuestro guion ES y aquí veréis nº de palabras y duración estimada.';
      metricsESEl.appendChild(span);
    } else {
      pillES(`Palabras (ES): ${palabrasES}`, 'metric-ok');
      pillES(`Duración estimada (ES): ${segundosES} s`);
    }

    const textoDest = guionDestEl.value;
    const palabrasDest = contarPalabras(textoDest);
    const segundosDest = estimarSegundos(textoDest);

    metricsDestEl.innerHTML = '';
    const pillDest = (txt: string, extra = '') => {
      const s = document.createElement('span');
      s.className = `metric-pill ${extra}`;
      s.textContent = txt;
      metricsDestEl.appendChild(s);
    };

    const idiomaDest = idiomaDestinoEl?.value || 'dest';

    if (!textoDest.trim()) {
      const span = document.createElement('span');
      span.className = 'metric-pill';
      span.textContent = 'Escribid el guion PT/IT y aquí veréis nº de palabras y diferencia con ES.';
      metricsDestEl.appendChild(span);
    } else {
      pillDest(`Palabras (${idiomaDest}): ${palabrasDest}`, 'metric-ok');
      pillDest(`Duración estimada (${idiomaDest}): ${segundosDest} s`);

      if (palabrasES > 0) {
        const diff = ((palabrasDest - palabrasES) / palabrasES) * 100;
        const absDiff = Math.abs(diff).toFixed(1);
        const dentro = Math.abs(diff) <= 10;
        pillDest(
          `Diferencia vs ES: ${diff >= 0 ? '+' : ''}${absDiff}%`,
          dentro ? 'metric-ok' : 'metric-warn'
        );
      }
    }
  }

  function limpiarTodo() {
    const fields = [
      'tituloES', 'duracionES', 'resumenES', 'guionES', 'idiomaDestino',
      'notaEstilo', 'guionDest', 'notasPron', 'notasSubs', 'qaNombres',
      'qaCifras', 'qaClaims', 'qaTono', 'registroDecisiones', 'nombreEquipo'
    ];

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) {
        el.value = '';
      }
    });

    for (let i = 1; i <= 10; i++) {
      const es = document.getElementById(`termES${i}`);
      const dest = document.getElementById(`termDest${i}`);
      if (es) es.value = '';
      if (dest) dest.value = '';
    }

    const guionESEl = document.getElementById('guionES') as HTMLTextAreaElement;
    const guionDestEl = document.getElementById('guionDest') as HTMLTextAreaElement;
    const metricsESEl = document.getElementById('metricsES');
    const metricsDestEl = document.getElementById('metricsDest');
    const idiomaDestinoEl = document.getElementById('idiomaDestino') as HTMLInputElement;
    
    if (guionESEl && metricsESEl) {
      actualizarMetricas(guionESEl, guionDestEl, metricsESEl, metricsDestEl, idiomaDestinoEl);
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

    if (!getVal('guionES').trim() || !getVal('guionDest').trim()) {
      const statusEl = document.getElementById('status');
      if (statusEl) {
        statusEl.textContent = 'Antes de descargar, rellenad al menos el guion ES (Paso 1) y el guion PT/IT (Paso 3).';
      }
      return;
    }

    let glosarioHTML = '<ol>';
    for (let i = 1; i <= 10; i++) {
      const es = getVal(`termES${i}`);
      const dest = getVal(`termDest${i}`);
      if (es.trim() || dest.trim()) {
        glosarioHTML += `<li><strong>${prepararHTMLSeguro(es)}</strong> → ${prepararHTMLSeguro(dest)}</li>`;
      }
    }
    glosarioHTML += '</ol>';

    const contenido = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Práctica 3 - SEAT/CUPRA</title>
</head>
<body>
  <h1>Práctica 3 – SEAT/CUPRA: Localización y adaptación</h1>
  <p><strong>Equipo:</strong> ${prepararHTMLSeguro(getVal('nombreEquipo'))}</p>
  <p><strong>Idioma destino:</strong> ${prepararHTMLSeguro(getVal('idiomaDestino'))}</p>
  <p><strong>Nota de estilo:</strong> ${prepararHTMLSeguro(getVal('notaEstilo'))}</p>

  <h2>1. Versión ES original "limpia"</h2>
  <p><strong>Título ES:</strong> ${prepararHTMLSeguro(getVal('tituloES'))}</p>
  <p><strong>Duración original aprox. (s):</strong> ${prepararHTMLSeguro(getVal('duracionES'))}</p>
  <p><strong>Objetivo y público (ES):</strong><br>${prepararHTMLSeguro(getVal('resumenES'))}</p>
  <h3>Guion ES</h3>
  <p>${prepararHTMLSeguro(getVal('guionES'))}</p>

  <h2>2. Glosario de términos clave ES → ${prepararHTMLSeguro(getVal('idiomaDestino') || 'PT/IT')}</h2>
  ${glosarioHTML}

  <h2>3. Versión localizada (${prepararHTMLSeguro(getVal('idiomaDestino') || 'PT/IT')})</h2>
  <h3>Guion localizado</h3>
  <p>${prepararHTMLSeguro(getVal('guionDest'))}</p>
  <p><strong>Notas de pronunciación / doblaje:</strong><br>${prepararHTMLSeguro(getVal('notasPron'))}</p>
  <p><strong>Notas para subtítulos:</strong><br>${prepararHTMLSeguro(getVal('notasSubs'))}</p>

  <h2>4. Checklist de calidad y riesgos</h2>
  <p><strong>Nombres propios y marcas:</strong><br>${prepararHTMLSeguro(getVal('qaNombres'))}</p>
  <p><strong>Cifras, unidades y fechas:</strong><br>${prepararHTMLSeguro(getVal('qaCifras'))}</p>
  <p><strong>Claims comerciales y de seguridad:</strong><br>${prepararHTMLSeguro(getVal('qaClaims'))}</p>
  <p><strong>Tono y naturalidad cultural:</strong><br>${prepararHTMLSeguro(getVal('qaTono'))}</p>
  <p><strong>Registro de decisiones (qué se adaptó y por qué):</strong><br>${prepararHTMLSeguro(getVal('registroDecisiones'))}</p>

  <p><em>Generado desde la plantilla de la Práctica 3 – Módulo 3.</em></p>
</body>
</html>`;

    const blob = new Blob([contenido], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Practica3_SEAT_CUPRA_Localizacion.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = 'He generado un archivo .doc con la versión ES, la versión localizada, el glosario y el checklist QA.';
    }
  }

  return (
    <div className="space-y-4">
      <style>{`
        :root {
          --bg-light: #faf5ff;
          --card-bg: #ffffff;
          --accent: #a855f7;
          --accent-light: #c084fc;
          --accent-soft: #f3e8ff;
          --seat-purple: #a855f7;
          --seat-blue: #0284c7;
          --seat-orange: #f97316;
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

        .seat-app {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
          background: linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #fff7ed 100%);
          border-radius: 20px;
          border: 2px solid #e9d5ff;
          box-shadow: var(--shadow-lg);
          padding: 24px 20px 28px;
          position: relative;
          overflow: hidden;
        }

        .seat-app::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .seat-app::after {
          content: "";
          position: absolute;
          bottom: -30%;
          left: -5%;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .seat-app header,
        .seat-app section,
        .seat-app .btn-row,
        .seat-app .status {
          position: relative;
          z-index: 1;
        }

        .seat-app h1 {
          margin: 0 0 6px;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #a855f7 0%, #0ea5e9 50%, #f97316 100%);
          -webkit-background-clip: text;
          color: transparent;
          text-transform: uppercase;
        }

        .seat-app .subtitle {
          margin: 0 0 12px;
          font-size: 0.95rem;
          color: var(--text-medium);
          line-height: 1.5;
        }

        .seat-app .intro-steps {
          margin: 0 0 16px;
          padding-left: 1.2rem;
          font-size: 0.88rem;
          color: var(--text-medium);
          background: var(--accent-soft);
          padding: 12px 12px 12px 20px;
          border-radius: 10px;
          border-left: 4px solid var(--accent);
        }

        .seat-app .intro-steps li {
          margin-bottom: 6px;
          font-weight: 500;
        }

        .seat-app .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .seat-app .badge {
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #f3e8ff 0%, #ffedd5 100%);
          border: 2px solid #e9d5ff;
          color: #6b21a8;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(168, 85, 247, 0.15);
        }

        .seat-app .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 950px) {
          .seat-app .layout {
            grid-template-columns: 1fr;
          }
        }

        .seat-app .col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .seat-app .card {
          border-radius: var(--radius);
          border: 2px solid;
          padding: 16px;
          position: relative;
          overflow: hidden;
          background: var(--card-bg);
          box-shadow: var(--shadow);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .seat-app .card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .seat-app .card:nth-child(1) {
          border-color: #a855f7;
        }
        .seat-app .card:nth-child(2) {
          border-color: #0284c7;
        }
        .seat-app .card:nth-child(3) {
          border-color: #f97316;
        }

        .seat-app .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #a855f7, #0ea5e9, #f97316);
        }

        .seat-app .card:nth-child(1)::before { background: linear-gradient(90deg, #a855f7, #c084fc); }
        .seat-app .card:nth-child(2)::before { background: linear-gradient(90deg, #0284c7, #0ea5e9); }
        .seat-app .card:nth-child(3)::before { background: linear-gradient(90deg, #f97316, #fb923c); }

        .seat-app .card-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .seat-app .card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
        }

        .seat-app .card-number {
          font-size: 0.78rem;
          padding: 4px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: var(--text-dark);
          font-weight: 700;
        }

        .seat-app .card-text {
          position: relative;
          font-size: 0.88rem;
          color: var(--text-medium);
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .seat-app .card-text strong {
          color: var(--seat-purple);
          font-weight: 700;
        }

        .seat-app label {
          font-size: 0.82rem;
          color: var(--text-dark);
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .seat-app textarea,
        .seat-app input[type="text"] {
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

        .seat-app textarea:focus,
        .seat-app input[type="text"]:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
          background: #ffffff;
          transform: translateY(-1px);
        }

        .seat-app input[type="text"] {
          min-height: auto;
          padding: 9px 12px;
        }

        .seat-app .row-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .seat-app .small {
          font-size: 0.82rem;
          color: var(--text-light);
          margin-top: 5px;
          font-style: italic;
        }

        .seat-app .metrics {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
        }

        .seat-app .metric-pill {
          padding: 5px 10px;
          border-radius: 999px;
          border: 2px solid var(--border);
          background: #f1f5f9;
          color: var(--text-medium);
          font-weight: 600;
        }

        .seat-app .metric-ok {
          border-color: var(--success);
          background: var(--success-bg);
          color: #065f46;
        }

        .seat-app .metric-warn {
          border-color: var(--warning);
          background: var(--warning-bg);
          color: #92400e;
        }

        .seat-app .glossary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 6px;
        }

        .seat-app .glossary-item {
          border-radius: 10px;
          border: 2px dashed var(--border);
          padding: 10px;
          background: linear-gradient(135deg, #faf5ff 0%, #f8fafc 100%);
        }

        .seat-app .glossary-title {
          font-size: 0.82rem;
          color: #6b21a8;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .seat-app .glossary-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .seat-app .glossary-row input {
          font-size: 0.82rem;
          min-height: auto;
          padding: 7px 9px;
        }

        .seat-app .checklist {
          font-size: 0.82rem;
          color: var(--text-medium);
          margin-top: 8px;
          padding-left: 1.2rem;
        }

        .seat-app .checklist li {
          margin-bottom: 5px;
          line-height: 1.5;
        }

        .seat-app .checklist li::before {
          content: "✓ ";
          color: var(--success);
          font-weight: 700;
        }

        .seat-app .btn-row {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .seat-app .btn {
          border-radius: 999px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #a855f7 0%, #c084fc 100%);
          color: #ffffff;
          padding: 10px 22px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(168, 85, 247, 0.25);
        }

        .seat-app .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(168, 85, 247, 0.35);
          background: linear-gradient(135deg, #9333ea 0%, #a855f7 100%);
        }

        .seat-app .btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(168, 85, 247, 0.2);
        }

        .seat-app .btn.secondary {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          color: #ffffff;
          box-shadow: 0 4px 6px rgba(100, 116, 139, 0.2);
        }

        .seat-app .btn.secondary:hover {
          background: linear-gradient(135deg, #475569 0%, #334155 100%);
        }

        .seat-app .status {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #7c3aed;
          font-weight: 500;
          min-height: 1.2em;
        }

        @media (max-width: 700px) {
          .seat-app .row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="seat-app">
        <header>
          <h1>Práctica 3 – SEAT/CUPRA: Localización y adaptación</h1>
          <p className="subtitle">
            Hola, soy tu profe. En esta práctica vamos a tomar un vídeo de
            formación y adaptarlo a otro mercado (Portugal o Italia) sin perder
            sentido, tono de marca ni seguridad.
          </p>
          
          {/* Vídeo de referencia */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-purple-100 via-white to-orange-100 border-2 border-purple-300 shadow-lg">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-purple-900 text-lg">📹 Vídeo de Referencia</h3>
                <p className="text-purple-700 text-sm">Ejemplo de vídeo de formación para localizar</p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black mb-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/alja7-OUY38"
                title="Curso Básico de Vendedor de Automóviles en España"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-purple-200">
              <p className="text-sm text-purple-800">
                <strong>📌 Instrucciones:</strong> Este vídeo de formación sobre venta de automóviles en España es vuestro punto de partida. 
                Imaginad que SEAT/CUPRA necesita adaptar este contenido para los mercados de <strong>Portugal</strong> o <strong>Italia</strong>. 
                Deberéis localizar el guion, adaptar referencias culturales y crear un glosario de términos técnicos.
              </p>
            </div>
          </div>
          
          <ul className="intro-steps">
            <li>PASO 1: Documentamos el vídeo original en español (versión "limpia").</li>
            <li>PASO 2: Construimos el glosario de 10 términos y decidimos el idioma destino.</li>
            <li>PASO 3: Escribimos la versión localizada (PT/IT) y revisamos duración (±10%).</li>
            <li>PASO 4: Rellenamos el checklist de riesgos (nombres, cifras, claims, tono).</li>
            <li>PASO 5: Descargamos un .doc con todo (ES + PT/IT + glosario + checklist QA).</li>
          </ul>
          <div className="badge-row">
            <span className="badge">Versión ES "limpia"</span>
            <span className="badge">Versión PT/IT localizada</span>
            <span className="badge">Glosario 10 términos clave</span>
            <span className="badge">Checklist de calidad y riesgos</span>
          </div>
        </header>

        <section className="layout">
          <div className="col">
            {/* PASO 1: Versión ES original */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 1. Versión ES original "limpia"</div>
                <div className="card-number">1 / 5</div>
              </div>
              <p className="card-text">
                Partimos del vídeo del ejercicio 2 (Iberdrola) o de un ejemplo del
                docente. Aquí dejáis por escrito la versión ES revisada y limpia:
                sin errores, con tono correcto y lista para localizar.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="tituloES">Título del vídeo original (ES)</label>
                  <input
                    type="text"
                    id="tituloES"
                    placeholder="Ej.: Procedimiento de seguridad en campo – 5 reglas clave"
                  />
                </div>
                <div>
                  <label htmlFor="duracionES">Duración original aproximada (segundos)</label>
                  <input
                    type="text"
                    id="duracionES"
                    placeholder="Ej.: 100"
                  />
                </div>
              </div>

              <label htmlFor="resumenES">1.1 Resumen del objetivo y público (ES)</label>
              <textarea
                id="resumenES"
                placeholder="Ej.: Vídeo para técnicos de concesionarios de SEAT/CUPRA que explica el procedimiento de entrega segura de un vehículo al cliente."
              />

              <label htmlFor="guionES">1.2 Guion ES "limpio" (texto final aprobado)</label>
              <textarea
                id="guionES"
                placeholder="Pegad aquí el guion en español que queréis localizar, ya revisado (sin errores ni frases raras)."
              />

              <div className="metrics" id="metricsES"></div>
              <p className="small">
                Este texto ES será vuestra referencia: la versión PT/IT deberá
                mantener el sentido y una duración parecida (±10%).
              </p>
            </article>

            {/* PASO 2: Glosario y decisiones terminológicas */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 2. Glosario (10 términos) y idioma destino</div>
                <div className="card-number">2 / 5</div>
              </div>
              <p className="card-text">
                Antes de traducir, definimos un glosario de al menos 10 términos
                clave (marcas, piezas, conceptos técnicos, claims comerciales…) y
                elegimos si vamos a PT o IT.
              </p>

              <div className="row-2">
                <div>
                  <label htmlFor="idiomaDestino">Idioma destino (PT o IT)</label>
                  <input
                    type="text"
                    id="idiomaDestino"
                    placeholder="Ej.: PT (portugués) o IT (italiano)"
                  />
                </div>
                <div>
                  <label htmlFor="notaEstilo">Nota de estilo (registro y tono)</label>
                  <input
                    type="text"
                    id="notaEstilo"
                    placeholder="Ej.: Tono comercial cercano, sin exagerar promesas."
                  />
                </div>
              </div>

              <div className="glossary-grid" id="glossaryGrid">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                  <div key={i} className="glossary-item">
                    <div className="glossary-title">Término {i}</div>
                    <div className="glossary-row">
                      <input id={`termES${i}`} placeholder={`ES - término ${i}`} />
                      <input id={`termDest${i}`} placeholder={`PT/IT - término ${i}`} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="small">
                Este glosario se usa luego en la localización y en el checklist de
                riesgos (claims, cifras, nombres propios).
              </p>
            </article>
          </div>

          <div className="col">
            {/* PASO 3: Versión localizada */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 3. Versión localizada (PT/IT)</div>
                <div className="card-number">3 / 5</div>
              </div>
              <p className="card-text">
                Ahora escribimos la versión localizada del guion, aplicando el
                glosario y adaptando ejemplos culturales si hace falta. La duración
                debe mantenerse dentro de ±10% respecto a la ES original.
              </p>

              <label htmlFor="guionDest">3.1 Guion localizado (PT/IT)</label>
              <textarea
                id="guionDest"
                placeholder="Escribid aquí la versión localizada del guion (portugués o italiano), usando el glosario y adaptando el tono."
              />

              <div className="row-2">
                <div>
                  <label htmlFor="notasPron">3.2 Notas de pronunciación / doblaje</label>
                  <textarea
                    id="notasPron"
                    placeholder="Ej.: Cómo pronunciar correctamente nombres de modelos, siglas o cifras en el idioma destino."
                  />
                </div>
                <div>
                  <label htmlFor="notasSubs">3.3 Notas para subtítulos (segmentación, tiempos)</label>
                  <textarea
                    id="notasSubs"
                    placeholder="Ej.: Limitar la longitud de línea, evitar cortar frases, adaptar signos a PT/IT."
                  />
                </div>
              </div>

              <div className="metrics" id="metricsDest"></div>
              <p className="small">
                Si la versión destino se aleja demasiado en longitud, anotad por
                qué (por ejemplo, términos más largos o aclaraciones necesarias).
              </p>
            </article>

            {/* PASO 4: Checklist QA */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 4. Checklist de calidad y riesgos</div>
                <div className="card-number">4 / 5</div>
              </div>
              <p className="card-text">
                Aquí documentáis la revisión final: nombres propios, cifras, claims
                comerciales, tono y coherencia cultural. Es lo que pide la práctica
                como checklist QA.
              </p>

              <label htmlFor="qaNombres">4.1 Nombres propios y marcas (¿están bien escritos en PT/IT?)</label>
              <textarea
                id="qaNombres"
                placeholder="Ej.: Lista de nombres de modelos, empresas y lugares, con comprobación de su forma correcta en el idioma destino."
              />

              <label htmlFor="qaCifras">4.2 Cifras, unidades y fechas (¿son correctas y no engañosas?)</label>
              <textarea
                id="qaCifras"
                placeholder="Ej.: Verificación de precios, porcentajes, años de garantía y cualquier dato numérico."
              />

              <label htmlFor="qaClaims">4.3 Claims comerciales y de seguridad (¿son realistas y legales?)</label>
              <textarea
                id="qaClaims"
                placeholder="Ej.: Comprobar que no prometemos ahorros o garantías que la marca no ofrece realmente."
              />

              <label htmlFor="qaTono">4.4 Tono y naturalidad cultural</label>
              <textarea
                id="qaTono"
                placeholder="Ej.: ¿Suena como lo diría realmente un concesionario local? ¿Hay expresiones que chirrían?"
              />

              <label htmlFor="registroDecisiones">4.5 Registro de decisiones (qué se adaptó y por qué)</label>
              <textarea
                id="registroDecisiones"
                placeholder="Ej.: Cambiamos la referencia a ITV por una inspección equivalente en Portugal, para que tenga sentido allí."
              />

              <ul className="checklist">
                <li>Mantener duración ±10% respecto a ES.</li>
                <li>Subtítulos correctos: sin cortar frases, legibles.</li>
                <li>Glosario de 10 términos clave ES → PT/IT completado.</li>
                <li>Claims revisados por QA lingüístico y QA legal.</li>
              </ul>
            </article>

            {/* PASO 5: Descarga DOC */}
            <article className="card">
              <div className="card-header">
                <div className="card-title">Paso 5. Descargar paquete de localización en .doc</div>
                <div className="card-number">5 / 5</div>
              </div>
              <p className="card-text">
                Cuando tengáis todo rellenado, podéis descargar un .doc con la
                versión ES, la versión PT/IT, el glosario y el checklist QA. Será
                vuestra documentación entregable de la práctica.
              </p>

              <label htmlFor="nombreEquipo">Nombre del equipo / grupo</label>
              <input
                type="text"
                id="nombreEquipo"
                placeholder="Ej.: Equipo Localización SEAT/CUPRA"
              />

              <p className="small">
                Recordad que el resultado esperado es: vídeo localizado, archivo de
                subtítulos, glosario y checklist QA documentado.
              </p>
            </article>
          </div>
        </section>

        <div className="btn-row">
          <button className="btn secondary" id="btnLimpiar">🧹 Limpiar todo</button>
          <button className="btn" id="btnGenerarDoc">💾 Descargar paquete en .doc</button>
        </div>
        <div className="status" id="status"></div>
      </div>
    </div>
  );
}
