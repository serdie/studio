'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function MarketingPlanStudio() {
  const [currentStep, setCurrentStep] = useState(0);
  const [editable, setEditable] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  
  const planOutputRef = useRef<HTMLDivElement>(null);
  const outputSectionRef = useRef<HTMLElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState<Record<string, string>>({
    empresa: '',
    producto: '',
    mercado: '',
    periodo: '',
    briefing: '',
    analisis_pestel: '',
    analisis_mercado: '',
    analisis_interno: '',
    dafo: '',
    segmentacion: '',
    publico_objetivo: '',
    buyer_persona: '',
    propuesta_valor: '',
    objetivos_cuantitativos: '',
    objetivos_cualitativos: '',
    objetivos_smart: '',
    estrategia_marketing: '',
    posicionamiento: '',
    ventaja_competitiva: '',
    producto_mix: '',
    precio_mix: '',
    distribucion_mix: '',
    comunicacion_mix: '',
    personas_procesos: '',
    evidencias_fisicas: '',
    acciones_clave: '',
    cronograma: '',
    responsables_recursos: '',
    presupuesto: '',
    kpis: '',
    control_seguimiento: '',
    riesgos: '',
    contingencias: '',
    resumen_ejecutivo: '',
  });

  const totalSteps = 9;

  const displayToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const goToStep = (index: number) => {
    if (index < 0 || index >= totalSteps) return;
    setCurrentStep(index);
    if (planGenerated && outputSectionRef.current) {
      outputSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buildPlan = () => {
    const {
      empresa, producto, mercado, periodo, briefing,
      analisis_pestel, analisis_mercado, analisis_interno, dafo,
      segmentacion, publico_objetivo, buyer_persona, propuesta_valor,
      objetivos_cuantitativos, objetivos_cualitativos, objetivos_smart,
      estrategia_marketing, posicionamiento, ventaja_competitiva,
      producto_mix, precio_mix, distribucion_mix, comunicacion_mix, personas_procesos, evidencias_fisicas,
      acciones_clave, cronograma, responsables_recursos,
      presupuesto, kpis, control_seguimiento,
      riesgos, contingencias, resumen_ejecutivo
    } = formData;

    const emp = empresa || "Nombre de la empresa / marca";

    let planHTML = `<h1>Plan de marketing de ${emp}</h1>\n`;

    planHTML += `<h2>1. Contexto y briefing</h2>\n`;
    planHTML += `<p><strong>Empresa / marca:</strong> ${emp}${producto ? " | Producto/servicio principal: " + producto : ""}${mercado ? " | Mercado/ámbito: " + mercado : ""}${periodo ? " | Horizonte del plan: " + periodo : ""}.</p>\n`;
    if (briefing) planHTML += `<p><strong>Resumen del reto de marketing:</strong> ${briefing}</p>\n`;

    planHTML += `<h2>2. Análisis de situación</h2>\n`;
    if (analisis_pestel) planHTML += `<p><strong>Entorno macro (PESTEL):</strong> ${analisis_pestel}</p>\n`;
    if (analisis_mercado) planHTML += `<p><strong>Mercado, clientes y competencia:</strong> ${analisis_mercado}</p>\n`;
    if (analisis_interno) planHTML += `<p><strong>Análisis interno:</strong> ${analisis_interno}</p>\n`;
    if (dafo) planHTML += `<h3>2.1. Síntesis DAFO</h3><p>${dafo}</p>\n`;

    planHTML += `<h2>3. Segmentación, público objetivo y propuesta de valor</h2>\n`;
    if (segmentacion) planHTML += `<p><strong>Segmentación del mercado:</strong> ${segmentacion}</p>\n`;
    if (publico_objetivo) planHTML += `<p><strong>Público objetivo prioritario:</strong> ${publico_objetivo}</p>\n`;
    if (buyer_persona) planHTML += `<p><strong>Buyer persona:</strong> ${buyer_persona}</p>\n`;
    if (propuesta_valor) planHTML += `<p><strong>Propuesta de valor:</strong> ${propuesta_valor}</p>\n`;

    planHTML += `<h2>4. Objetivos de marketing</h2>\n`;
    if (objetivos_cuantitativos) planHTML += `<p><strong>Objetivos cuantitativos:</strong> ${objetivos_cuantitativos}</p>\n`;
    if (objetivos_cualitativos) planHTML += `<p><strong>Objetivos cualitativos:</strong> ${objetivos_cualitativos}</p>\n`;
    if (objetivos_smart) planHTML += `<p><strong>Formulación SMART de los objetivos clave:</strong> ${objetivos_smart}</p>\n`;

    planHTML += `<h2>5. Estrategia de marketing y posicionamiento</h2>\n`;
    if (estrategia_marketing) planHTML += `<p><strong>Estrategia de marketing general:</strong> ${estrategia_marketing}</p>\n`;
    if (posicionamiento) planHTML += `<p><strong>Posicionamiento deseado:</strong> ${posicionamiento}</p>\n`;
    if (ventaja_competitiva) planHTML += `<p><strong>Ventaja competitiva y factores clave de éxito:</strong> ${ventaja_competitiva}</p>\n`;

    planHTML += `<h2>6. Marketing mix</h2>\n`;
    if (producto_mix) planHTML += `<p><strong>Producto / servicio:</strong> ${producto_mix}</p>\n`;
    if (precio_mix) planHTML += `<p><strong>Precio:</strong> ${precio_mix}</p>\n`;
    if (distribucion_mix) planHTML += `<p><strong>Distribución / place:</strong> ${distribucion_mix}</p>\n`;
    if (comunicacion_mix) planHTML += `<p><strong>Comunicación / promoción:</strong> ${comunicacion_mix}</p>\n`;
    if (personas_procesos) planHTML += `<p><strong>Personas y procesos:</strong> ${personas_procesos}</p>\n`;
    if (evidencias_fisicas) planHTML += `<p><strong>Evidencias físicas / experiencia de cliente:</strong> ${evidencias_fisicas}</p>\n`;

    planHTML += `<h2>7. Plan de acción</h2>\n`;
    if (acciones_clave) planHTML += `<p><strong>Acciones clave de marketing:</strong> ${acciones_clave}</p>\n`;
    if (cronograma) planHTML += `<p><strong>Cronograma:</strong> ${cronograma}</p>\n`;
    if (responsables_recursos) planHTML += `<p><strong>Responsables y recursos:</strong> ${responsables_recursos}</p>\n`;

    planHTML += `<h2>8. Presupuesto, KPIs y control</h2>\n`;
    if (presupuesto) planHTML += `<p><strong>Presupuesto de marketing:</strong> ${presupuesto}</p>\n`;
    if (kpis) planHTML += `<p><strong>KPIs y métricas clave:</strong> ${kpis}</p>\n`;
    if (control_seguimiento) planHTML += `<p><strong>Sistema de control y seguimiento:</strong> ${control_seguimiento}</p>\n`;

    planHTML += `<h2>9. Riesgos, contingencias y resumen ejecutivo</h2>\n`;
    if (riesgos) planHTML += `<p><strong>Riesgos y barreras principales:</strong> ${riesgos}</p>\n`;
    if (contingencias) planHTML += `<p><strong>Planes de contingencia:</strong> ${contingencias}</p>\n`;
    if (resumen_ejecutivo) planHTML += `<p><strong>Resumen ejecutivo:</strong> ${resumen_ejecutivo}</p>\n`;

    if (planOutputRef.current) {
      planOutputRef.current.innerHTML = planHTML;
    }
    setPlanGenerated(true);
    
    // Auto scroll after a tiny delay to ensure DOM update
    setTimeout(() => {
      if (outputSectionRef.current) {
        outputSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    displayToast("Plan de marketing generado. Puedes revisarlo y pulirlo.");
  };

  const copyPlan = () => {
    if (!planOutputRef.current) return;
    const text = planOutputRef.current.innerText || '';
    navigator.clipboard.writeText(text).then(
      () => displayToast('Texto del plan copiado al portapapeles'),
      () => displayToast('No se pudo copiar automáticamente, copia el texto manualmente')
    );
  };

  const toggleEditable = () => {
    const newEditable = !editable;
    setEditable(newEditable);
    displayToast(newEditable ? 'Edición directa activada. Modifica el texto a tu gusto.' : 'Edición directa desactivada.');
  };

  const printPlan = () => {
    if (!planOutputRef.current || planOutputRef.current.innerText.trim().length === 0) {
      displayToast('Genera primero el plan antes de imprimirlo.');
      return;
    }
    window.print();
  };

  const getStepClassNames = (index: number) => {
    if (currentStep === index) return "step-item active";
    if (currentStep > index) return "step-item completed";
    return "step-item";
  };

  const stepsList = [
    { label: 'Contexto y briefing', hint: 'Quiénes somos y hacia dónde vamos' },
    { label: 'Análisis de situación', hint: 'Entorno, mercado, competencia y DAFO' },
    { label: 'Segmentación y target', hint: 'Buyer persona y propuesta de valor' },
    { label: 'Objetivos SMART', hint: 'Cuantitativos y cualitativos' },
    { label: 'Estrategia y posicionamiento', hint: 'Eje estratégico y posicionamiento' },
    { label: 'Marketing mix', hint: 'Producto, precio, distribución y comunicación' },
    { label: 'Plan de acción', hint: 'Acciones, tiempos, recursos y responsables' },
    { label: 'Presupuesto y KPIs', hint: 'Inversión, métricas y control' },
    { label: 'Riesgos y resumen ejecutivo', hint: 'Planes de contingencia y cierre' }
  ];

  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

    .mps-container {
      --color-bg: #020617;
      --color-surface: #020617;
      --color-surface-elevated: #020617;
      --color-panel: #020617;
      --color-card: #0b1120;
      --color-card-soft: #020617;
      --color-border-subtle: rgba(148, 163, 184, 0.25);

      --color-primary: #38bdf8;
      --color-primary-soft: rgba(56, 189, 248, 0.12);
      --color-primary-strong: #0ea5e9;

      --color-text-main: #e5e7eb;
      --color-text-soft: #9ca3af;
      --color-text-muted: #6b7280;

      --radius-sm: 0.5rem;
      --radius-md: 0.75rem;
      --radius-lg: 1.25rem;
      --radius-full: 999px;

      --shadow-soft: 0 18px 60px rgba(15, 23, 42, 0.85);

      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-5: 1.25rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-10: 2.5rem;
      --space-12: 3rem;

      --text-xs: 0.75rem;
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.375rem;
      --text-2xl: 1.75rem;
      --text-3xl: 2.2rem;

      --transition-fast: 160ms cubic-bezier(0.16, 1, 0.3, 1);
      --transition-med: 220ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mps-wrapper {
      min-height: 80vh;
      font-family: "DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: var(--text-base);
      color: var(--color-text-main);
      background: radial-gradient(circle at top left, #0f172a 0, #020617 45%, #000000 100%);
      display: flex;
      justify-content: center;
      align-items: stretch;
      padding: var(--space-6);
      border-radius: 1.5rem;
    }

    @media (max-width: 1024px) {
      .mps-wrapper {
        padding: var(--space-3);
      }
    }

    @media (max-width: 640px) {
      .mps-wrapper {
        padding: var(--space-2);
      }
    }

    .mps-container * {
      box-sizing: border-box;
    }

    .app-shell {
      width: 100%;
      max-width: 1200px;
      background: radial-gradient(circle at top right, rgba(148, 163, 184, 0.12), transparent 55%) #020617;
      border-radius: 1.75rem;
      border: 1px solid rgba(148, 163, 184, 0.25);
      box-shadow: var(--shadow-soft);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .app-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.16), transparent 50%),
        radial-gradient(circle at 100% 0, rgba(129, 140, 248, 0.12), transparent 55%);
      opacity: 0.65;
      pointer-events: none;
      mix-blend-mode: screen;
    }

    .app-shell-inner {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      backdrop-filter: blur(24px);
    }

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) var(--space-6);
      border-bottom: 1px solid rgba(148, 163, 184, 0.3);
      position: relative;
      z-index: 2;
    }

    @media (max-width: 640px) {
      .app-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
        padding: var(--space-4);
      }
    }

    .brand {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 1.15rem;
      background: radial-gradient(circle at 30% 20%, #38bdf8, transparent 55%),
                  radial-gradient(circle at 70% 80%, #4f46e5, transparent 55%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(15, 23, 42, 0.9);
    }

    .brand-logo svg {
      width: 26px;
      height: 26px;
      color: #e5e7eb;
    }

    .brand-text h1 {
      font-family: "Playfair Display", "Times New Roman", serif;
      font-size: var(--text-2xl);
      letter-spacing: 0.04em;
    }

    .brand-text p {
      font-size: var(--text-sm);
      color: var(--color-text-soft);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .pill-badge {
      border-radius: var(--radius-full);
      padding: 0.4rem 0.9rem;
      font-size: var(--text-xs);
      border: 1px solid rgba(148, 163, 184, 0.45);
      color: var(--color-text-soft);
      backdrop-filter: blur(18px);
      background: linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.5));
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }

    .pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #22c55e, #16a34a);
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
    }

    .primary-ghost-btn {
      border-radius: var(--radius-full);
      border: 1px solid rgba(56, 189, 248, 0.6);
      padding: 0.55rem 1.1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--text-sm);
      font-weight: 500;
      color: var(--color-primary);
      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 45%),
                  rgba(15, 23, 42, 0.85);
      box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.9), 0 12px 35px rgba(15, 23, 42, 0.9);
      cursor: pointer;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast),
                  background var(--transition-fast), border-color var(--transition-fast);
    }

    .primary-ghost-btn svg {
      width: 16px;
      height: 16px;
    }

    .primary-ghost-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 20px 50px rgba(15, 23, 42, 1);
      border-color: rgba(56, 189, 248, 0.9);
    }

    .app-main {
      display: grid;
      grid-template-columns: minmax(230px, 270px) minmax(0, 1fr);
      gap: var(--space-6);
      padding: var(--space-4) var(--space-6) var(--space-6);
      position: relative;
      z-index: 1;
    }

    @media (max-width: 1024px) {
      .app-main {
        grid-template-columns: 1fr;
        padding: var(--space-4);
      }
    }

    .sidebar {
      border-radius: 1.25rem;
      padding: var(--space-4);
      background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.82));
      border: 1px solid rgba(148, 163, 184, 0.4);
      position: sticky;
      top: var(--space-4);
      align-self: flex-start;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.8);
    }

    @media (max-width: 1024px) {
      .sidebar {
        position: static;
        box-shadow: none;
      }
    }

    .sidebar-title {
      font-size: var(--text-sm);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--color-text-muted);
      margin-bottom: var(--space-3);
    }

    .sidebar-subtitle {
      font-size: var(--text-lg);
      font-weight: 600;
      margin-bottom: var(--space-4);
    }

    .sidebar-subtitle span {
      color: var(--color-primary);
    }

    .step-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: var(--space-4);
      padding: 0;
    }

    .step-item {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.75rem;
      align-items: center;
      padding: 0.4rem 0.55rem;
      border-radius: 999px;
      cursor: pointer;
      transition: background var(--transition-fast), transform var(--transition-fast), color var(--transition-fast);
      color: var(--color-text-soft);
    }

    .step-item:hover {
      background: rgba(30, 64, 175, 0.55);
      transform: translateY(-1px);
      color: var(--color-text-main);
    }

    .step-item.active {
      background: linear-gradient(to right, #38bdf8, #4f46e5);
      color: #f9fafb;
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.75);
    }

    .step-item.completed:not(.active) {
      background: radial-gradient(circle at 0 0, rgba(22, 163, 74, 0.55), transparent 60%);
      color: var(--color-text-main);
    }

    .step-index {
      width: 26px;
      height: 26px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-xs);
      position: relative;
      overflow: hidden;
    }

    .step-item.active .step-index {
      border-color: rgba(248, 250, 252, 0.85);
      background: rgba(15, 23, 42, 0.25);
    }

    .step-item.completed .step-index::after {
      content: "✓";
      font-size: 0.75rem;
    }

    .step-meta {
      display: flex;
      flex-direction: column;
      gap: 0.05rem;
    }

    .step-label {
      font-size: var(--text-sm);
      font-weight: 500;
    }

    .step-hint {
      font-size: var(--text-xs);
      color: var(--color-text-muted);
    }

    .sidebar-footer {
      margin-top: var(--space-4);
      padding-top: var(--space-4);
      border-top: 1px dashed rgba(148, 163, 184, 0.5);
      font-size: var(--text-xs);
      color: var(--color-text-soft);
    }

    .sidebar-footer strong {
      color: var(--color-primary);
      font-weight: 600;
    }

    .content-panel {
      border-radius: 1.5rem;
      background: radial-gradient(circle at top left, rgba(15, 118, 110, 0.12), transparent 55%),
                  radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.18), transparent 55%),
                  rgba(15, 23, 42, 0.96);
      border: 1px solid rgba(148, 163, 184, 0.45);
      padding: var(--space-5);
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      max-height: 80vh;
      overflow: hidden;
    }

    @media (max-width: 1024px) {
      .content-panel {
        max-height: none;
      }
    }

    .content-scroll {
      overflow-y: auto;
      padding-right: var(--space-1);
      margin-right: -var(--space-1);
      scrollbar-width: thin;
      scrollbar-color: rgba(148, 163, 184, 0.7) transparent;
    }

    .content-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .content-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .content-scroll::-webkit-scrollbar-thumb {
      background-color: rgba(148, 163, 184, 0.6);
      border-radius: 999px;
    }

    .step-header {
      margin-bottom: var(--space-4);
    }

    .step-kicker {
      font-size: var(--text-xs);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
    }

    .step-title-row {
      display: flex;
      justify-content: space-between;
      gap: var(--space-2);
      align-items: flex-end;
      margin-bottom: var(--space-2);
    }

    @media (max-width: 640px) {
      .step-title-row {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .step-title {
      font-size: var(--text-2xl);
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    .step-subtitle {
      font-size: var(--text-sm);
      color: var(--color-text-soft);
      max-width: 340px;
      text-align: right;
    }

    @media (max-width: 640px) {
      .step-subtitle {
        text-align: left;
      }
    }

    .step-summary {
      font-size: var(--text-sm);
      color: var(--color-text-soft);
      max-width: 720px;
    }

    .step-summary strong {
      color: var(--color-primary);
      font-weight: 600;
    }

    .step-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
      gap: var(--space-4);
      align-items: flex-start;
    }

    @media (max-width: 900px) {
      .step-layout {
        grid-template-columns: 1fr;
      }
    }

    .fields-column {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .field-group-title {
      font-size: var(--text-sm);
      font-weight: 600;
      margin-bottom: 0.3rem;
    }

    .field-row-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--space-3);
    }

    @media (max-width: 768px) {
      .field-row-grid {
        grid-template-columns: 1fr;
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    .field label {
      font-size: var(--text-xs);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--color-text-muted);
    }

    .field label span {
      color: var(--color-primary);
    }

    .field input,
    .field textarea {
      background: rgba(15, 23, 42, 0.95);
      border-radius: var(--radius-md);
      padding: 0.65rem 0.8rem;
      border: 1px solid rgba(148, 163, 184, 0.5);
      color: var(--color-text-main);
      font-size: var(--text-sm);
      resize: vertical;
      min-height: 44px;
      outline: none;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast),
                  background var(--transition-fast), transform var(--transition-fast);
    }

    .field textarea {
      min-height: 110px;
    }

    .field input::placeholder,
    .field textarea::placeholder {
      color: var(--color-text-muted);
    }

    .field input:focus,
    .field textarea:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.5), 0 0 0 10px rgba(15, 23, 42, 0.95);
      transform: translateY(-0.5px);
      background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.95));
    }

    .field-helper {
      font-size: var(--text-xs);
      color: var(--color-text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .field-helper strong {
      color: var(--color-primary);
      font-weight: 500;
    }

    .field-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.4);
      background: rgba(15, 23, 42, 0.9);
      padding: 0.25rem 0.65rem;
      font-size: var(--text-xs);
      color: var(--color-text-soft);
      margin-bottom: 0.35rem;
      width: max-content;
    }

    .field-badge span {
      color: var(--color-primary);
      font-weight: 600;
      font-size: 0.7rem;
    }

    .guidance-card {
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      background: linear-gradient(150deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.9));
      border: 1px solid rgba(148, 163, 184, 0.5);
      box-shadow: 0 14px 40px rgba(15, 23, 42, 0.9);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .guidance-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
    }

    .guidance-title {
      font-size: var(--text-sm);
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      margin: 0;
    }

    .guidance-chip {
      font-size: var(--text-xs);
      border-radius: 999px;
      padding: 0.2rem 0.65rem;
      border: 1px solid rgba(56, 189, 248, 0.6);
      color: var(--color-primary);
      background: rgba(8, 47, 73, 0.6);
    }

    .guidance-body {
      font-size: var(--text-xs);
      color: var(--color-text-soft);
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .guidance-body p {
      line-height: 1.6;
      margin: 0;
    }

    .guidance-body ul {
      padding-left: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0;
    }

    .guidance-body li {
      list-style: disc;
    }

    .guidance-highlight {
      color: var(--color-primary);
      font-weight: 500;
    }

    .nav-footer {
      margin-top: var(--space-4);
      border-radius: var(--radius-lg);
      padding: var(--space-3);
      background: radial-gradient(circle at left, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.8));
      border: 1px solid rgba(148, 163, 184, 0.5);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .progress-line {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: rgba(31, 41, 55, 0.95);
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: inherit;
      background: linear-gradient(to right, #38bdf8, #22c55e);
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.9);
      transition: width var(--transition-med);
    }

    .progress-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-xs);
      color: var(--color-text-soft);
    }

    .nav-buttons {
      display: flex;
      justify-content: space-between;
      gap: var(--space-3);
      align-items: center;
      flex-wrap: wrap;
    }

    .nav-left, .nav-right {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .btn {
      border-radius: var(--radius-full);
      padding: 0.6rem 1.1rem;
      font-size: var(--text-sm);
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      outline: none;
      transition: background var(--transition-fast), border-color var(--transition-fast),
                  color var(--transition-fast), transform var(--transition-fast),
                  box-shadow var(--transition-fast);
      white-space: nowrap;
    }

    .btn-ghost {
      border-color: rgba(148, 163, 184, 0.55);
      color: var(--color-text-soft);
      background: rgba(15, 23, 42, 0.92);
    }

    .btn-ghost:hover:not(:disabled) {
      color: var(--color-text-main);
      border-color: rgba(148, 163, 184, 0.9);
      background: rgba(15, 23, 42, 0.98);
      transform: translateY(-1px);
    }

    .btn-ghost:disabled {
      opacity: 0.45;
      cursor: default;
    }

    .btn-primary {
      border-color: transparent;
      color: #0f172a;
      background: linear-gradient(135deg, #38bdf8, #22c55e);
      box-shadow: 0 14px 35px rgba(56, 189, 248, 0.75);
      font-weight: 600;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #0ea5e9, #16a34a);
      transform: translateY(-1px);
      box-shadow: 0 18px 45px rgba(56, 189, 248, 0.9);
    }

    .btn-secondary {
      border-color: rgba(56, 189, 248, 0.6);
      color: var(--color-primary);
      background: rgba(15, 23, 42, 0.96);
    }

    .btn-secondary:hover {
      border-color: rgba(56, 189, 248, 0.95);
      background: rgba(15, 23, 42, 0.98);
      transform: translateY(-1px);
      box-shadow: 0 14px 38px rgba(15, 23, 42, 0.95);
    }

    .btn svg {
      width: 15px;
      height: 15px;
    }

    .output-section {
      border-radius: 1.25rem;
      padding: var(--space-4);
      background: radial-gradient(circle at 0 0, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.6);
      margin-top: var(--space-3);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .output-title {
      font-size: var(--text-lg);
      font-weight: 600;
      margin: 0;
    }

    .output-subtitle {
      font-size: var(--text-xs);
      color: var(--color-text-soft);
      max-width: 360px;
      margin: 0;
    }

    .output-actions {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
    }

    .output-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-3);
      flex-wrap: wrap;
    }

    .plan-output {
      border-radius: var(--radius-md);
      background: radial-gradient(circle at top left, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.55);
      padding: var(--space-4);
      font-size: var(--text-sm);
      color: var(--color-text-main);
      max-height: 300px;
      overflow-y: auto;
      line-height: 1.6;
      white-space: pre-wrap;
      outline: none;
    }

    .plan-output h1,
    .plan-output h2,
    .plan-output h3 {
      font-family: "Playfair Display", "Times New Roman", serif;
      margin-bottom: 0.35rem;
      color: #f9fafb;
    }

    .plan-output h1 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .plan-output h2 {
      font-size: 1.1rem;
      margin-top: 0.8rem;
    }

    .plan-output p {
      margin-bottom: 0.45rem;
    }

    .plan-output ul {
      padding-left: 1.1rem;
      margin-bottom: 0.35rem;
    }

    .plan-output li {
      margin-bottom: 0.2rem;
    }

    .output-note {
      font-size: var(--text-xs);
      color: var(--color-text-soft);
      margin: 0;
    }

    .pill-inline {
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.5);
      padding: 0.15rem 0.55rem;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--color-text-muted);
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    .toast-popup {
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      z-index: 40;
      border-radius: var(--radius-md);
      padding: 0.8rem 1rem;
      font-size: var(--text-sm);
      display: flex;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 18px 50px rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(56, 189, 248, 0.65);
      color: #e0f2fe;
      background: radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.45), rgba(15, 23, 42, 0.98));
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: opacity var(--transition-med), transform var(--transition-med);
    }

    .toast-popup.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .toast-popup svg {
      width: 18px;
      height: 18px;
    }

    .toast-popup span {
      font-weight: 500;
    }

    @media print {
      body * {
        visibility: hidden;
      }
      .output-section, .output-section * {
        visibility: visible;
      }
      .output-section {
        position: absolute;
        left: 0;
        top: 0;
        border: none;
        background: #ffffff;
      }
      .plan-output {
        border: none;
        background: #ffffff;
        max-height: none;
        overflow: visible;
        color: #000;
      }
      .plan-output h1,
      .plan-output h2,
      .plan-output h3 {
        color: #000000;
      }
      .app-header, .sidebar, .nav-footer, .toast-popup, .output-header {
        display: none !important;
      }
    }
  `;

  return (
    <div className="mps-container">
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div className="mps-wrapper">
        <div className="app-shell">
          <div className="app-shell-inner">
            <header className="app-header">
              <div className="brand">
                <div className="brand-logo" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="1.2" opacity="0.65" />
                    <path d="M10 20.5C11.3 18.2 13.4 16.8 16 16.8C18.6 16.8 20.7 18.2 22 20.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M11.25 13.2C11.95 11.4 13.78 10.2 15.98 10.2C18.18 10.2 20.01 11.4 20.71 13.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
                    <circle cx="12.4" cy="12.1" r="1" fill="currentColor" />
                    <circle cx="19.6" cy="12.1" r="1" fill="currentColor" />
                    <circle cx="16" cy="16" r="2.3" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </div>
                <div className="brand-text">
                  <h1>Marketing Plan Studio</h1>
                  <p>Asistente guiado para diseñar planes de marketing 360º sin fisuras.</p>
                </div>
              </div>
              <div className="header-actions">
                <span className="pill-badge">
                  <span className="pill-dot"></span>
                  Listo para impresionar a cualquier experto
                </span>
                <button className="primary-ghost-btn" type="button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M12 5l7 7-7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Guía completísima
                </button>
              </div>
            </header>

            <main className="app-main">
              <aside className="sidebar" aria-label="Pasos del plan de marketing">
                <p className="sidebar-title">Itinerario guiado</p>
                <h2 className="sidebar-subtitle">De <span>0</span> a plan de marketing profesional</h2>

                <ol className="step-list">
                  {stepsList.map((step, idx) => (
                    <li key={idx} className={getStepClassNames(idx)} onClick={() => goToStep(idx)}>
                      <div className="step-index">{idx + 1}</div>
                      <div className="step-meta">
                        <span className="step-label">{step.label}</span>
                        <span className="step-hint">{step.hint}</span>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="sidebar-footer">
                  Completa los <strong>9 pasos</strong> y genera automáticamente un plan de marketing listo para presentar, copiar, imprimir o convertir en PDF.
                </div>
              </aside>

              <section className="content-panel" aria-label="Contenido del paso">
                <div className="content-scroll">
                  {/* PASO 1: Contexto */}
                  {currentStep === 0 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 1</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Contexto, empresa y briefing</h2>
                          <p className="step-subtitle">Define en pocas líneas quién eres, qué ofreces y qué quieres lograr con este plan.</p>
                        </div>
                        <p className="step-summary">En este bloque fijamos la <strong>identidad del proyecto</strong>, su contexto y el encargo de marketing: punto de partida, retos y ambición.</p>
                      </header>

                      <div className="step-layout">
                        <div className="fields-column">
                          <div>
                            <p className="field-group-title">Datos básicos del proyecto</p>
                            <div className="field-row-grid">
                              <div className="field">
                                <label htmlFor="empresa">Nombre de la empresa o proyecto <span>*</span></label>
                                <input id="empresa" type="text" value={formData.empresa} onChange={(e) => handleInputChange('empresa', e.target.value)} placeholder="Ej. Cafés La Mancha, S.L." />
                                <p className="field-helper">Incluye la marca con la que va a trabajar el plan.</p>
                              </div>
                              <div className="field">
                                <label htmlFor="producto">Producto / servicio principal <span>*</span></label>
                                <input id="producto" type="text" value={formData.producto} onChange={(e) => handleInputChange('producto', e.target.value)} placeholder="Ej. Suscripción mensual de café de especialidad" />
                                <p className="field-helper">Describe en una frase clara qué se comercializa.</p>
                              </div>
                            </div>
                            <div className="field-row-grid mt-3">
                              <div className="field">
                                <label htmlFor="mercado">Mercado y ámbito geográfico</label>
                                <input id="mercado" type="text" value={formData.mercado} onChange={(e) => handleInputChange('mercado', e.target.value)} placeholder="Ej. B2C España, foco en Castilla-La Mancha" />
                                <p className="field-helper">Indica si es B2C, B2B, local, nacional, internacional, etc.</p>
                              </div>
                              <div className="field">
                                <label htmlFor="periodo">Horizonte temporal del plan</label>
                                <input id="periodo" type="text" value={formData.periodo} onChange={(e) => handleInputChange('periodo', e.target.value)} placeholder="Ej. Enero–diciembre 2026" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="field-group-title">Briefing de marketing</p>
                            <div className="field">
                              <div className="field-badge"><span>🎯</span> Enfoque</div>
                              <label htmlFor="briefing">Resumen del reto de marketing</label>
                              <textarea id="briefing" value={formData.briefing} onChange={(e) => handleInputChange('briefing', e.target.value)} placeholder="Describe brevemente qué problema u oportunidad de marketing se quiere abordar."></textarea>
                              <p className="field-helper">Piensa en cómo enunciarías el reto a un/a director/a de marketing en 4–6 líneas.</p>
                            </div>
                          </div>
                        </div>

                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Guía rápida del paso 1</p>
                            <span className="guidance-chip">Tip docente</span>
                          </div>
                          <div className="guidance-body">
                            <p>Un buen briefing debe ser <span className="guidance-highlight">concreto, accionable y realista</span>.</p>
                            <ul>
                              <li>¿Qué está pasando ahora?</li>
                              <li>¿Qué duele o preocupa al negocio?</li>
                              <li>¿Qué cambio se espera conseguir con el plan?</li>
                              <li>¿Hay restricciones claras de presupuesto o timing?</li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 2: Análisis */}
                  {currentStep === 1 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 2</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Análisis de situación y DAFO</h2>
                          <p className="step-subtitle">Comprende el entorno, el mercado, la competencia y la situación interna.</p>
                        </div>
                        <p className="step-summary">Aquí elaboras el <strong>diagnóstico</strong>: dónde estamos, fuerzas externas y puntos fuertes/débiles.</p>
                      </header>

                      <div className="step-layout">
                        <div className="fields-column">
                          <div>
                            <p className="field-group-title">Entorno y mercado</p>
                            <div className="field-row-grid">
                              <div className="field">
                                <label htmlFor="analisis_pestel">Análisis PESTEL</label>
                                <textarea id="analisis_pestel" value={formData.analisis_pestel} onChange={(e) => handleInputChange('analisis_pestel', e.target.value)} placeholder="Resume factores Políticos, Económicos, Sociales, Tecnológicos..."></textarea>
                              </div>
                              <div className="field">
                                <label htmlFor="analisis_mercado">Mercado, clientes y competencia</label>
                                <textarea id="analisis_mercado" value={formData.analisis_mercado} onChange={(e) => handleInputChange('analisis_mercado', e.target.value)} placeholder="Tamaño aproximado, tendencias, competidores..."></textarea>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="field-group-title">Análisis interno y DAFO</p>
                            <div className="field-row-grid">
                              <div className="field">
                                <label htmlFor="analisis_interno">Análisis interno</label>
                                <textarea id="analisis_interno" value={formData.analisis_interno} onChange={(e) => handleInputChange('analisis_interno', e.target.value)} placeholder="Recursos de la empresa, procesos, tecnología..."></textarea>
                              </div>
                              <div className="field">
                                <label htmlFor="dafo">DAFO</label>
                                <textarea id="dafo" value={formData.dafo} onChange={(e) => handleInputChange('dafo', e.target.value)} placeholder="Debilidades, Amenazas, Fortalezas, Oportunidades."></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Guía rápida del paso 2</p>
                            <span className="guidance-chip">Diagnóstico</span>
                          </div>
                          <div className="guidance-body">
                            <p>Llega a 2–3 <span className="guidance-highlight">conclusiones estratégicas</span> claras.</p>
                            <ul>
                              <li>Qué oportunidad principal aprovechar.</li>
                              <li>Qué amenaza vigilar.</li>
                              <li>Qué fortaleza nos hace únicos.</li>
                              <li>Qué debilidad compensar.</li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 3: Segmentación */}
                  {currentStep === 2 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 3</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Segmentación, público objetivo y propuesta de valor</h2>
                          <p className="step-subtitle">Decide a quién vas a dirigir el plan y qué propuesta de valor única.</p>
                        </div>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div>
                            <p className="field-group-title">Segmentación y target</p>
                            <div className="field-row-grid">
                              <div className="field">
                                <label htmlFor="segmentacion">Segmentación del mercado</label>
                                <textarea id="segmentacion" value={formData.segmentacion} onChange={(e) => handleInputChange('segmentacion', e.target.value)} placeholder="Explica cómo divides el mercado..."></textarea>
                              </div>
                              <div className="field">
                                <label htmlFor="publico_objetivo">Público objetivo prioritario</label>
                                <textarea id="publico_objetivo" value={formData.publico_objetivo} onChange={(e) => handleInputChange('publico_objetivo', e.target.value)} placeholder="Describe de forma precisa tu target principal..."></textarea>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="field-group-title">Buyer persona y propuesta de valor</p>
                            <div className="field">
                              <label htmlFor="buyer_persona">Buyer persona</label>
                              <textarea id="buyer_persona" value={formData.buyer_persona} onChange={(e) => handleInputChange('buyer_persona', e.target.value)} placeholder="Crea 1–2 perfiles de cliente ideal..."></textarea>
                            </div>
                            <div className="field mt-3">
                              <label htmlFor="propuesta_valor">Propuesta de valor</label>
                              <textarea id="propuesta_valor" value={formData.propuesta_valor} onChange={(e) => handleInputChange('propuesta_valor', e.target.value)} placeholder="Qué problema resuelves, qué beneficio clave aportas..."></textarea>
                            </div>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Guía del paso 3</p>
                            <span className="guidance-chip">Enfoque cliente</span>
                          </div>
                          <div className="guidance-body">
                            <p>Cuanto más <span className="guidance-highlight">preciso</span> sea el público, más afinada la estrategia.</p>
                            <ul>
                              <li>¿Qué necesidad concreta cubres?</li>
                              <li>¿Qué barreras tiene el target?</li>
                              <li>¿Dónde se informa?</li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 4: Objetivos */}
                  {currentStep === 3 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 4</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Objetivos de marketing SMART</h2>
                          <p className="step-subtitle">Concreta qué quieres conseguir en ventas, marca, clientes y plazos.</p>
                        </div>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field">
                            <label htmlFor="objetivos_cuantitativos">Objetivos cuantitativos</label>
                            <textarea id="objetivos_cuantitativos" value={formData.objetivos_cuantitativos} onChange={(e) => handleInputChange('objetivos_cuantitativos', e.target.value)} placeholder="Ejemplos: incrementar ventas un 15%, captar 500 clientes..."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="objetivos_cualitativos">Objetivos cualitativos</label>
                            <textarea id="objetivos_cualitativos" value={formData.objetivos_cualitativos} onChange={(e) => handleInputChange('objetivos_cualitativos', e.target.value)} placeholder="Ejemplos: mejorar posicionamiento, percepción visual..."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="objetivos_smart">Formulación SMART</label>
                            <textarea id="objetivos_smart" value={formData.objetivos_smart} onChange={(e) => handleInputChange('objetivos_smart', e.target.value)} placeholder="Redacta de forma SMART tus objetivos clave..."></textarea>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Guía rápida del paso 4</p>
                            <span className="guidance-chip">SMART</span>
                          </div>
                          <div className="guidance-body">
                            <ul>
                              <li><span className="guidance-highlight">S</span>pecific: concreto.</li>
                              <li><span className="guidance-highlight">M</span>easurable: con indicador.</li>
                              <li><span className="guidance-highlight">A</span>chievable: realista.</li>
                              <li><span className="guidance-highlight">R</span>elevant: aporta al negocio.</li>
                              <li><span className="guidance-highlight">T</span>ime-bound: con fecha.</li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 5: Estrategia */}
                  {currentStep === 4 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 5</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Estrategia de marketing y posicionamiento</h2>
                          <p className="step-subtitle">Conecta el análisis con los objetivos a través de una estrategia clara.</p>
                        </div>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field">
                            <label htmlFor="estrategia_marketing">Estrategia de marketing (visión general)</label>
                            <textarea id="estrategia_marketing" value={formData.estrategia_marketing} onChange={(e) => handleInputChange('estrategia_marketing', e.target.value)} placeholder="Define el enfoque principal: penetración, diversificación..."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="posicionamiento">Posicionamiento deseado</label>
                            <textarea id="posicionamiento" value={formData.posicionamiento} onChange={(e) => handleInputChange('posicionamiento', e.target.value)} placeholder="¿En qué dimensión quieres destacar? (precio, calidad, innovación...)."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="ventaja_competitiva">Ventaja competitiva</label>
                            <textarea id="ventaja_competitiva" value={formData.ventaja_competitiva} onChange={(e) => handleInputChange('ventaja_competitiva', e.target.value)} placeholder="Explica en qué te diferencias..."></textarea>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Guía del paso 5</p>
                            <span className="guidance-chip">Dirección</span>
                          </div>
                          <div className="guidance-body">
                            <p>La estrategia aprovecha <span className="guidance-highlight">oportunidades</span> con tus <span className="guidance-highlight">fortalezas</span>.</p>
                            <ul>
                              <li>¿Es coherente con presupuesto?</li>
                              <li>¿Sostenible en el tiempo?</li>
                              <li>¿Fácil de explicar en 2 frases?</li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 6: Mix */}
                  {currentStep === 5 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 6</p>
                        <div className="step-title-row">
                          <h2 className="step-title">Marketing mix: 4P (o 7P)</h2>
                        </div>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field-row-grid">
                            <div className="field">
                              <label htmlFor="producto_mix">Producto / servicio</label>
                              <textarea id="producto_mix" value={formData.producto_mix} onChange={(e) => handleInputChange('producto_mix', e.target.value)} placeholder="Características clave, packaging..."></textarea>
                            </div>
                            <div className="field">
                              <label htmlFor="precio_mix">Precio</label>
                              <textarea id="precio_mix" value={formData.precio_mix} onChange={(e) => handleInputChange('precio_mix', e.target.value)} placeholder="Estrategia de precios, promociones..."></textarea>
                            </div>
                          </div>
                          <div className="field-row-grid mt-3">
                            <div className="field">
                              <label htmlFor="distribucion_mix">Distribución / place</label>
                              <textarea id="distribucion_mix" value={formData.distribucion_mix} onChange={(e) => handleInputChange('distribucion_mix', e.target.value)} placeholder="Canales de venta, logística..."></textarea>
                            </div>
                            <div className="field">
                              <label htmlFor="comunicacion_mix">Comunicación / promoción</label>
                              <textarea id="comunicacion_mix" value={formData.comunicacion_mix} onChange={(e) => handleInputChange('comunicacion_mix', e.target.value)} placeholder="Estrategia de comunicación..."></textarea>
                            </div>
                          </div>
                          <div className="field-row-grid mt-3">
                            <div className="field">
                              <label htmlFor="personas_procesos">Personas y procesos (servicios)</label>
                              <textarea id="personas_procesos" value={formData.personas_procesos} onChange={(e) => handleInputChange('personas_procesos', e.target.value)} placeholder="Rol del personal, protocolos..."></textarea>
                            </div>
                            <div className="field">
                              <label htmlFor="evidencias_fisicas">Evidencias físicas / experiencia</label>
                              <textarea id="evidencias_fisicas" value={formData.evidencias_fisicas} onChange={(e) => handleInputChange('evidencias_fisicas', e.target.value)} placeholder="Elementos tangibles, tienda, app..."></textarea>
                            </div>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Mix</p>
                            <span className="guidance-chip">Coherencia</span>
                          </div>
                          <div className="guidance-body">
                            <p>Revisa que todas las P están <span className="guidance-highlight">alineadas</span> con el posicionamiento elegido.</p>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 7: Plan Acción */}
                  {currentStep === 6 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 7</p>
                        <h2 className="step-title">Plan de acción detallado</h2>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field">
                            <label htmlFor="acciones_clave">Acciones clave</label>
                            <textarea id="acciones_clave" value={formData.acciones_clave} onChange={(e) => handleInputChange('acciones_clave', e.target.value)} placeholder="Lista las principales acciones (campañas, promociones...)."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="cronograma">Cronograma</label>
                            <textarea id="cronograma" value={formData.cronograma} onChange={(e) => handleInputChange('cronograma', e.target.value)} placeholder="Organiza las acciones por meses o trimestres."></textarea>
                          </div>
                          <div className="field">
                            <label htmlFor="responsables_recursos">Responsables y recursos</label>
                            <textarea id="responsables_recursos" value={formData.responsables_recursos} onChange={(e) => handleInputChange('responsables_recursos', e.target.value)} placeholder="Quién es responsable, qué recursos necesita..."></textarea>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Operativa</p>
                            <span className="guidance-chip">Realismo</span>
                          </div>
                          <div className="guidance-body">
                            <p>El plan de acción debe ser <span className="guidance-highlight">realizable</span>.</p>
                            <ul><li>Cada acción debería tener objetivo, responsable y fecha.</li></ul>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 8: KPIs */}
                  {currentStep === 7 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 8</p>
                        <h2 className="step-title">Presupuesto y KPIs</h2>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field">
                            <label htmlFor="presupuesto">Presupuesto</label>
                            <textarea id="presupuesto" value={formData.presupuesto} onChange={(e) => handleInputChange('presupuesto', e.target.value)} placeholder="Resume la inversión estimada por grandes partidas."></textarea>
                          </div>
                          <div className="field-row-grid">
                            <div className="field">
                              <label htmlFor="kpis">KPIs y métricas</label>
                              <textarea id="kpis" value={formData.kpis} onChange={(e) => handleInputChange('kpis', e.target.value)} placeholder="Indicadores (ventas, leads, tráfico, NPS...)."></textarea>
                            </div>
                            <div className="field">
                              <label htmlFor="control_seguimiento">Control y seguimiento</label>
                              <textarea id="control_seguimiento" value={formData.control_seguimiento} onChange={(e) => handleInputChange('control_seguimiento', e.target.value)} placeholder="Cada cuánto se revisarán los resultados y quién lo hará."></textarea>
                            </div>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Medición</p>
                          </div>
                          <div className="guidance-body">
                            <p>Un buen sistema evita "ir a ciegas".</p>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* PASO 9: Cierre */}
                  {currentStep === 8 && (
                    <section className="animate-fade-in">
                      <header className="step-header">
                        <p className="step-kicker">Paso 9</p>
                        <h2 className="step-title">Riesgos y resumen ejecutivo</h2>
                      </header>
                      <div className="step-layout">
                        <div className="fields-column">
                          <div className="field-row-grid">
                            <div className="field">
                              <label htmlFor="riesgos">Riesgos principales</label>
                              <textarea id="riesgos" value={formData.riesgos} onChange={(e) => handleInputChange('riesgos', e.target.value)} placeholder="Cambios regulatorios, competidores..."></textarea>
                            </div>
                            <div className="field">
                              <label htmlFor="contingencias">Planes de contingencia</label>
                              <textarea id="contingencias" value={formData.contingencias} onChange={(e) => handleInputChange('contingencias', e.target.value)} placeholder="Qué harás si ocurre cada riesgo."></textarea>
                            </div>
                          </div>
                          <div className="field mt-3">
                            <label htmlFor="resumen_ejecutivo">Resumen ejecutivo</label>
                            <textarea id="resumen_ejecutivo" value={formData.resumen_ejecutivo} onChange={(e) => handleInputChange('resumen_ejecutivo', e.target.value)} placeholder="Redacta en 10–15 líneas un resumen ejecutivo de todo el plan para la dirección."></textarea>
                            <p className="field-helper">Intenta que alguien que no haya trabajado pueda entenderlo en 2 mins.</p>
                          </div>
                        </div>
                        <aside className="guidance-card">
                          <div className="guidance-header">
                            <p className="guidance-title">Cierre</p>
                          </div>
                          <div className="guidance-body">
                            <p>El resumen ejecutivo suele ser lo primero (y a veces único) que lee la dirección. Trabájalo con mimo.</p>
                          </div>
                        </aside>
                      </div>
                    </section>
                  )}

                  {/* OUTPUT SECTION */}
                  <section ref={outputSectionRef} className={`output-section ${planGenerated ? '' : 'hidden'}`}>
                    <div className="output-header">
                      <div>
                        <h3 className="output-title">Plan de marketing generado</h3>
                        <p className="output-subtitle">El contenido es editable. Puedes ajustar matices, copiarlo, imprimirlo.</p>
                      </div>
                      <div className="output-actions">
                        <button className="btn btn-secondary" onClick={copyPlan} type="button">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="1.7" />
                            <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="1.7" />
                          </svg>
                          Copiar
                        </button>
                        <button className="btn btn-ghost" onClick={toggleEditable} type="button">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 20h4l10-10-4-4L4 16v4z" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Alternar edición
                        </button>
                        <button className="btn btn-ghost" onClick={printPlan} type="button">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 9V4h12v5" strokeWidth="1.6" strokeLinecap="round" />
                            <rect x="6" y="13" width="12" height="7" rx="1" strokeWidth="1.6" />
                            <path d="M6 16h.01M18 16h.01" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Imprimir
                        </button>
                      </div>
                    </div>
                    <div ref={planOutputRef} className="plan-output" contentEditable={editable} suppressContentEditableWarning={true} />
                    <p className="output-note">
                      <span className="pill-inline">Consejo</span> Pásalo a tu plantilla de Docs o amplíalo.
                    </p>
                  </section>
                </div>

                <footer className="nav-footer">
                  <div className="progress-line" aria-hidden="true">
                    <div className="progress-fill" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
                  </div>
                  <div className="progress-meta">
                    <span>Paso {currentStep + 1} de {totalSteps}</span>
                    <span>Genera el plan al final.</span>
                  </div>
                  <div className="nav-buttons">
                    <div className="nav-left">
                      <button className="btn btn-ghost" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0} type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M15 5l-7 7 7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Anterior
                      </button>
                    </div>
                    <div className="nav-right">
                      <button className="btn btn-secondary" onClick={buildPlan} type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Generar ahora
                      </button>
                      <button className="btn btn-primary" onClick={() => goToStep(currentStep + 1)} disabled={currentStep === totalSteps - 1} type="button">
                        {currentStep === totalSteps - 1 ? "Ir al final" : "Siguiente"}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M9 5l7 7-7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </footer>
              </section>
            </main>

            <div className={`toast-popup ${showToast ? 'visible' : ''}`} role="status" aria-live="polite">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" strokeWidth="1.6" />
                <path d="M9.172 12.172L11 14l4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{toastMessage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
