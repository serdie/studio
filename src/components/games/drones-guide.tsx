'use client';

import { useState } from 'react';
import SlideshowCarousel from './slideshow-carousel';

export default function DronesGuide() {
  const [activeTab, setActiveTab] = useState('presentacion');
  const [openCollapsibles, setOpenCollapsibles] = useState<Record<string, boolean>>({});

  const toggleCollapsible = (id: string) => {
    setOpenCollapsibles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: 'presentacion', label: '📽️ Presentación', icon: '📽️' },
    { id: 'licencias', label: '📜 Licencias', icon: '📜' },
    { id: 'trabajos', label: '💼 Trabajos', icon: '💼' },
    { id: 'fotogrametria', label: '🗺️ Fotogrametría', icon: '🗺️' },
    { id: 'ia', label: '🤖 IA y Autónomos', icon: '🤖' },
    { id: 'recursos', label: '🔗 Recursos', icon: '🔗' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header integrado */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">🛸 Drones e IA en Vehículos Autónomos</h1>
          <p className="text-lg text-blue-100 font-medium">Fotogrametría, Licencias AESA e Inteligencia Artificial</p>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 p-2 sticky top-0 z-40 shadow-lg">
        <div className="flex flex-wrap gap-2 overflow-x-auto justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all border-b-4 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-600 shadow-md scale-105'
                  : 'bg-blue-50 text-blue-700 border-transparent hover:bg-blue-100 hover:scale-105'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 0: PRESENTACIÓN */}
      {activeTab === 'presentacion' && (
        <div className="animate-in fade-in">
          <SlideshowCarousel />
        </div>
      )}

      {/* TAB 1: LICENCIAS */}
      {activeTab === 'licencias' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Tabla Comparativa */}
          <div className="bg-white rounded-2xl border-4 border-green-300 p-6 shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-extrabold text-green-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">📜</span> Tabla Comparativa de Licencias
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-100 to-green-200">
                  <th className="p-4 text-left font-bold text-green-900 border-2 border-green-300 rounded-tl-lg">Licencia</th>
                  <th className="p-4 text-left font-bold text-green-900 border-2 border-green-300">Categoría</th>
                  <th className="p-4 text-left font-bold text-green-900 border-2 border-green-300">Para Quién</th>
                  <th className="p-4 text-left font-bold text-green-900 border-2 border-green-300">Coste</th>
                  <th className="p-4 text-left font-bold text-green-900 border-2 border-green-300 rounded-tr-lg">Qué Permite</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="p-4 border-2 border-green-200 font-bold text-green-600">A1/A3</td>
                  <td className="p-4 border-2 border-green-200">Abierta</td>
                  <td className="p-4 border-2 border-green-200">Principiantes</td>
                  <td className="p-4 border-2 border-green-200"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">🟢 GRATUITO</span></td>
                  <td className="p-4 border-2 border-green-200">Volar en A1 (sobre personas a distancia) y A3 (lejos de personas) hasta 120m</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="p-4 border-2 border-green-200 font-bold text-yellow-600">A2</td>
                  <td className="p-4 border-2 border-green-200">Abierta</td>
                  <td className="p-4 border-2 border-green-200">Pilotos urbanos</td>
                  <td className="p-4 border-2 border-green-200"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">🟢 GRATUITO</span></td>
                  <td className="p-4 border-2 border-green-200">Volar más cerca de personas (5m mínimo) con drones C2 (≤4kg)</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="p-4 border-2 border-green-200 font-bold text-red-600">STS</td>
                  <td className="p-4 border-2 border-green-200">Específica</td>
                  <td className="p-4 border-2 border-green-200">Profesionales</td>
                  <td className="p-4 border-2 border-green-200"><span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">🔴 DE PAGO</span></td>
                  <td className="p-4 border-2 border-green-200">Operaciones en ciudad, BVLOS, escenarios estándar europeos</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Collapsibles */}
          <div className="space-y-3">
            {/* A1/A3 */}
            <div>
              <button
                onClick={() => toggleCollapsible('a1a3')}
                className={`w-full p-5 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-all shadow-md ${
                  openCollapsibles['a1a3'] ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-500 scale-102' : 'bg-white border-green-300 hover:bg-green-50 hover:scale-102'
                }`}
              >
                <span className="text-green-900 flex items-center gap-3">
                  <span className="text-2xl">🟢</span> Certificado A1/A3 (Nivel Básico)
                </span>
                <span className={`text-green-700 transition-transform text-2xl ${openCollapsibles['a1a3'] ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openCollapsibles['a1a3'] && (
                <div className="mt-3 p-5 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                      <p className="text-xs font-bold text-blue-900 mb-1">Para qué sirve</p>
                      <p className="text-sm text-blue-700">Volar drones de clase C1, C3, C4 o legacy (&gt;250g) en categoría abierta. Subcategorías A1 (sobre personas) y A3 (lejos de aglomeraciones).</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                      <p className="text-xs font-bold text-blue-900 mb-1">Requisitos</p>
                      <p className="text-sm text-blue-700">Edad mínima 16 años. Formación online + examen de 40 preguntas en 40 minutos.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 md:col-span-2">
                      <p className="text-xs font-bold text-green-900 mb-1">Coste</p>
                      <p className="text-sm text-green-700 font-bold">✅ TOTALMENTE GRATUITO</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 md:col-span-2">
                      <p className="text-xs font-bold text-blue-900 mb-1">Temario</p>
                      <p className="text-sm text-blue-700">9 módulos: regulación, tipos de drones, física del vuelo, meteorología, procedimientos, seguridad, mantenimiento, comunicaciones, casos de estudio.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* A2 */}
            <div>
              <button
                onClick={() => toggleCollapsible('a2')}
                className={`w-full p-5 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-all shadow-md ${
                  openCollapsibles['a2'] ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-500 scale-102' : 'bg-white border-yellow-300 hover:bg-yellow-50 hover:scale-102'
                }`}
              >
                <span className="text-yellow-900 flex items-center gap-3">
                  <span className="text-2xl">🟡</span> Certificado A2 (Nivel Intermedio)
                </span>
                <span className={`text-yellow-700 transition-transform text-2xl ${openCollapsibles['a2'] ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openCollapsibles['a2'] && (
                <div className="mt-3 p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-2xl shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                      <p className="text-xs font-bold text-yellow-900 mb-1">Para qué sirve</p>
                      <p className="text-sm text-yellow-700">Volar más cerca de personas (5m mínimo) con drones clase C2 (hasta 4kg). Mayor flexibilidad en entorno urbano.</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                      <p className="text-xs font-bold text-yellow-900 mb-1">Requisitos</p>
                      <p className="text-sm text-yellow-700">Tener A1/A3 previamente. Autoprácticas supervisadas. Examen teórico adicional.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 md:col-span-2">
                      <p className="text-xs font-bold text-green-900 mb-1">Coste</p>
                      <p className="text-sm text-green-700 font-bold">✅ EXAMEN GRATUITO (actualmente)</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500 md:col-span-2">
                      <p className="text-xs font-bold text-yellow-900 mb-1">Tiempo</p>
                      <p className="text-sm text-yellow-700">6-8 semanas de preparación + autoprácticas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STS */}
            <div>
              <button
                onClick={() => toggleCollapsible('sts')}
                className={`w-full p-5 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-all shadow-md ${
                  openCollapsibles['sts'] ? 'bg-gradient-to-r from-red-100 to-red-200 border-red-500 scale-102' : 'bg-white border-red-300 hover:bg-red-50 hover:scale-102'
                }`}
              >
                <span className="text-red-900 flex items-center gap-3">
                  <span className="text-2xl">🔴</span> Certificación STS (Nivel Avanzado)
                </span>
                <span className={`text-red-700 transition-transform text-2xl ${openCollapsibles['sts'] ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openCollapsibles['sts'] && (
                <div className="mt-3 p-5 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                      <p className="text-xs font-bold text-red-900 mb-1">Para qué sirve</p>
                      <p className="text-sm text-red-700">Operaciones en escenarios estándar europeos (STS-01: ciudad; STS-02: BVLOS). Operaciones profesionales de mayor riesgo.</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                      <p className="text-xs font-bold text-red-900 mb-1">Tipos</p>
                      <p className="text-sm text-red-700">STS-01 (zonas urbanas/semiurbanas) y STS-02 (BVLOS sobre zonas poco pobladas).</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 md:col-span-2">
                      <p className="text-xs font-bold text-red-900 mb-1">Requisitos</p>
                      <p className="text-sm text-red-700">Formación teórica y práctica avanzada. Examen Nivel 3. Dron clase C5 o C6.</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 md:col-span-2">
                      <p className="text-xs font-bold text-red-900 mb-1">Coste</p>
                      <p className="text-sm text-red-700 font-bold">💰 DE PAGO (formación + examen más caros)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Árbol de Decisión */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
              <span className="text-3xl">🌳</span> Árbol de Decisión: ¿Qué Licencia Necesito?
            </h2>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-gray-800">
              <p className="font-bold text-purple-900 mb-4 text-lg">¿Qué quiero hacer?</p>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900 mb-2">Volar recreativamente o aprender</p>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• En campo abierto, lejos de personas → <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">A1/A3 (GRATUITO)</span></li>
                    <li>• Cerca de personas en ciudad → <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">A2 (después de A1/A3)</span></li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                  <p className="font-bold text-purple-900 mb-2">Trabajar profesionalmente</p>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>• Fotogrametría, inspecciones en zonas abiertas → <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">A1/A3 + A2</span></li>
                    <li>• Operaciones en ciudad o BVLOS → <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">STS-01 o STS-02</span></li>
                  </ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 border-l-4 border-pink-500">
                  <p className="font-bold text-pink-900 mb-2">Drones menores de 250g</p>
                  <ul className="space-y-1 text-sm text-pink-800">
                    <li>• Regulación simplificada (certificado recomendado)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cómo Sacar Licencias */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
              <span className="text-3xl">✅</span> Cómo Sacar las Licencias Gratis en AESA
            </h2>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="font-bold text-green-900 mb-4 text-lg">Ruta Rápida A1/A3 (Paso a Paso)</h3>
              <ol className="space-y-3 text-sm text-green-800">
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <span>Ir a <a href="https://sede.seguridadaerea.gob.es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">sede.seguridadaerea.gob.es</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <span>Buscar "Formación de pilotos UAS – categoría abierta A1/A3"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <span>Registrarse (certificado digital, Cl@ve PIN o usuario/contraseña)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <span>Completar 9 módulos de formación online</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
                  <span>Realizar examen: 40 preguntas en 40 minutos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</span>
                  <span>Descargar certificado en PDF ✅</span>
                </li>
              </ol>
              <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border-l-4 border-green-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-green-900">⏱️ Tiempo estimado:</p>
                    <p className="text-sm text-green-700">8-12 horas de estudio + 1 hora de examen</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-900">💰 Coste:</p>
                    <p className="text-sm text-green-700 font-bold">TOTALMENTE GRATUITO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRABAJOS */}
      {activeTab === 'trabajos' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">💼</span> Trabajos Emergentes con Drones
            </h2>
            <p className="text-purple-100 mt-1">Sectores con mayor demanda laboral en 2024-2026</p>
          </div>

          {/* Trabajos Collapsibles */}
          <div className="space-y-3">
            {[
              { id: 'topo', icon: '🗺️', title: 'Topografía y Fotogrametría', rating: '⭐⭐⭐⭐⭐', salary: '€30,000 - €50,000', desc: 'Levantamientos topográficos, modelos digitales del terreno, ortofotos de alta resolución.', beneficios: ['Más datos en menos tiempo', 'Menor coste operativo', 'Mayor seguridad', 'Precisión centimétrica'], profesiones: ['Topógrafos', 'Ingenieros civiles', 'Arquitectos', 'Técnicos GIS'] },
              { id: 'agri', icon: '🌾', title: 'Agricultura de Precisión', rating: '⭐⭐⭐⭐', salary: '€28,000 - €45,000', desc: 'Análisis de cultivos, detección de estrés hídrico, plagas, fertilización selectiva con IA.', beneficios: ['Detección automática de plagas', 'Recomendaciones de riego', 'Predicción de rendimiento', 'Ahorro de recursos'], profesiones: ['Ingenieros agrónomos', 'Técnicos agrícolas', 'Especialistas en análisis de datos'] },
              { id: 'insp', icon: '🔍', title: 'Inspecciones Técnicas', rating: '⭐⭐⭐⭐⭐', salary: '€32,000 - €55,000', desc: 'Inspección de líneas eléctricas, aerogeneradores, placas solares, puentes, fachadas con IA.', beneficios: ['Detección automática de grietas', 'Mantenimiento predictivo', 'Reducción de tiempos 70-80%', 'Seguridad mejorada'], profesiones: ['Ingenieros industriales', 'Ingenieros eléctricos', 'Técnicos de mantenimiento'] },
              { id: 'seg', icon: '🚨', title: 'Seguridad y Emergencias', rating: '⭐⭐⭐⭐', salary: '€28,000 - €50,000', desc: 'Vigilancia perimetral, búsqueda y rescate con cámaras térmicas, detección de personas.', beneficios: ['Vigilancia 24/7', 'Búsqueda en zonas difíciles', 'Análisis de riesgos en tiempo real', 'Respuesta rápida'], profesiones: ['Operadores de seguridad', 'Coordinadores de emergencias', 'Especialistas en rescate'] },
              { id: 'audio', icon: '🎬', title: 'Audiovisual y Cine', rating: '⭐⭐⭐', salary: '€25,000 - €60,000', desc: 'Vídeos corporativos, bodas, cine, televisión con drones FPV e IA de seguimiento.', beneficios: ['Tomas cinematográficas', 'Seguimiento automático', 'Contenido viral', 'Nuevas perspectivas'], profesiones: ['Operadores aéreos', 'Realizadores', 'Productoras audiovisuales'] },
              { id: 'log', icon: '📦', title: 'Logística y Reparto', rating: '⭐⭐⭐', salary: '€26,000 - €48,000', desc: 'Reparto de paquetes, material sanitario en zonas remotas, coordinación con vehículos autónomos.', beneficios: ['Entrega rápida', 'Zonas remotas accesibles', 'Coordinación automática', 'Futuro muy prometedor'], profesiones: ['Operadores de flotas', 'Ingenieros de logística', 'Especialistas en rutas'] },
            ].map((trabajo) => (
              <div key={trabajo.id}>
                <button
                  onClick={() => toggleCollapsible(trabajo.id)}
                  className={`w-full p-5 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-all shadow-md ${
                    openCollapsibles[trabajo.id] ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-500 scale-102' : 'bg-white border-purple-300 hover:bg-purple-50 hover:scale-102'
                  }`}
                >
                  <span className="text-purple-900 flex items-center gap-3">
                    <span className="text-2xl">{trabajo.icon}</span> {trabajo.title}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-purple-700 font-bold">{trabajo.rating}</p>
                    <p className="text-xs text-purple-600">{trabajo.salary}</p>
                  </div>
                </button>
                {openCollapsibles[trabajo.id] && (
                  <div className="mt-3 p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl shadow-lg">
                    <p className="text-sm font-bold text-purple-900 mb-2">Descripción:</p>
                    <p className="text-sm text-purple-700 mb-3">{trabajo.desc}</p>
                    <p className="text-sm font-bold text-purple-900 mb-2">Beneficios:</p>
                    <ul className="text-sm text-purple-700 list-disc list-inside mb-3 space-y-1">
                      {trabajo.beneficios.map((b, i) => <li key={i}>✓ {b}</li>)}
                    </ul>
                    <p className="text-sm font-bold text-purple-900 mb-2">Profesiones:</p>
                    <p className="text-sm text-purple-700">{trabajo.profesiones.join(', ')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tabla Resumen */}
          <div className="bg-white rounded-2xl border-4 border-purple-300 p-6 shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-extrabold text-purple-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">📊</span> Tabla Resumen: Oportunidades 2024-2026
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300 rounded-tl-lg">Sector</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300">Demanda</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300">Licencia</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300 rounded-tr-lg">Salario</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sector: 'Topografía', demanda: '⭐⭐⭐⭐⭐', licencia: 'A1/A3 + A2', salario: '€30-50k' },
                  { sector: 'Agricultura', demanda: '⭐⭐⭐⭐', licencia: 'A1/A3 + A2', salario: '€28-45k' },
                  { sector: 'Inspecciones', demanda: '⭐⭐⭐⭐⭐', licencia: 'A1/A3 + STS', salario: '€32-55k' },
                  { sector: 'Seguridad', demanda: '⭐⭐⭐⭐', licencia: 'A1/A3 + STS', salario: '€28-50k' },
                  { sector: 'Audiovisual', demanda: '⭐⭐⭐', licencia: 'A1/A3 + A2', salario: '€25-60k' },
                  { sector: 'Logística', demanda: '⭐⭐⭐', licencia: 'A1/A3 + STS', salario: '€26-48k' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-purple-50 transition-colors border-b border-purple-200 last:border-0">
                    <td className="p-4 font-bold text-purple-900">{row.sector}</td>
                    <td className="p-4 text-purple-700">{row.demanda}</td>
                    <td className="p-4 text-purple-700">{row.licencia}</td>
                    <td className="p-4 text-purple-700 font-bold">{row.salario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: FOTOGRAMETRÍA */}
      {activeTab === 'fotogrametria' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">🗺️</span> Fotogrametría con Drones
            </h2>
            <p className="text-orange-100 mt-1">Convertir fotos aéreas en mapas 3D precisos</p>
          </div>

          {/* Qué es */}
          <div className="bg-white rounded-2xl border-4 border-orange-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-orange-900 mb-4">¿Qué es la Fotogrametría?</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              La <strong className="text-orange-600">fotogrametría con drones</strong> es una técnica que convierte muchas fotos aéreas solapadas en mapas 2D muy precisos y modelos 3D del terreno y de edificios. El dron vuela tomando fotos desde arriba y un programa de ordenador reconstruye el relieve y las formas a partir de esas imágenes, identificando puntos comunes entre fotos.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border-l-4 border-blue-500">
              <p className="text-sm font-bold text-blue-900">💡 Idea Clave:</p>
              <p className="text-sm text-blue-700">El software busca millones de puntos comunes entre fotos para calcular coordenadas 3D precisas.</p>
            </div>
          </div>

          {/* Productos */}
          <div className="bg-white rounded-2xl border-4 border-green-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-green-900 mb-4">📊 Productos que se Obtienen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-1">Ortofotos</p>
                <p className="text-xs text-green-700 mb-2">Vistas de satélite de alta resolución (5-10 cm/píxel)</p>
                <p className="text-xs text-green-600"><strong>Aplicación:</strong> Análisis de cultivos, urbanismo, catastro</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-1">Modelos Digitales de Superficie (MDS)</p>
                <p className="text-xs text-green-700 mb-2">Representación 3D del terreno incluyendo vegetación y edificios</p>
                <p className="text-xs text-green-600"><strong>Aplicación:</strong> Cálculo de volúmenes, análisis de pendientes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-1">Modelos Digitales de Terreno (MDT)</p>
                <p className="text-xs text-green-700 mb-2">Representación 3D del terreno sin vegetación ni edificios</p>
                <p className="text-xs text-green-600"><strong>Aplicación:</strong> Ingeniería civil, hidrología</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-1">Nubes de Puntos 3D</p>
                <p className="text-xs text-green-700 mb-2">Millones de puntos XYZ con coordenadas precisas</p>
                <p className="text-xs text-green-600"><strong>Aplicación:</strong> Base para modelos 3D, análisis detallado</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 md:col-span-2">
                <p className="font-bold text-green-900 mb-1">Modelos 3D Texturizados</p>
                <p className="text-xs text-green-700 mb-2">Reconstrucción 3D completa de edificios, canteras, taludes</p>
                <p className="text-xs text-green-600"><strong>Aplicación:</strong> Visualización, análisis de cambios, documentación</p>
              </div>
            </div>
          </div>

          {/* Pasos */}
          <div className="bg-white rounded-2xl border-4 border-blue-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-4">🔄 Pasos Básicos de un Proyecto</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <p className="font-bold text-blue-900 mb-1">Planificación del Vuelo</p>
                  <p className="text-sm text-blue-700">Delimitar área de interés • Altura de vuelo: 50-150m • Superposición: 70% frontal, 60% lateral • Resolución deseada: 2-5 cm/píxel</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <p className="font-bold text-green-900 mb-1">Captura de Imágenes</p>
                  <p className="text-sm text-green-700">Vuelo automático (mejor que manual) • Trayectorias paralelas • ISO bajo (100-400) • Obturación rápida (1/500 - 1/1000) • Condiciones de luz: mediodía ideal</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <p className="font-bold text-purple-900 mb-1">Procesamiento de Datos</p>
                  <p className="text-sm text-purple-700">Importar fotos al software • Alineación: buscar puntos comunes • Generación de nube de puntos • Generación de malla • Texturización • Generación de ortomosaico</p>
                </div>
              </div>
              <div className="flex gap-4 items-start bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <p className="font-bold text-orange-900 mb-1">Análisis y Uso</p>
                  <p className="text-sm text-orange-700">Mediciones lineales • Cálculo de superficies (m²) • Cálculo de volúmenes (m³) • Perfiles de terreno • Exportar a GIS, CAD, formatos 3D</p>
                </div>
              </div>
            </div>
          </div>

          {/* Software */}
          <div className="bg-white rounded-2xl border-4 border-purple-300 p-6 shadow-lg overflow-x-auto">
            <h2 className="text-2xl font-extrabold text-purple-900 mb-4">💻 Software de Fotogrametría: Comparativa</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300 rounded-tl-lg">Software</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300">Coste</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300">Facilidad</th>
                  <th className="p-4 text-left font-bold text-purple-900 border-2 border-purple-300 rounded-tr-lg">Mejor Para</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="p-4 border-2 border-purple-200 font-bold text-purple-900">Agisoft Metashape</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">€3,500/año</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Media</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Proyectos profesionales</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="p-4 border-2 border-purple-200 font-bold text-purple-900">Pix4D</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">€5,000+/año</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Media</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Agricultura, inspecciones</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors bg-green-50">
                  <td className="p-4 border-2 border-purple-200 font-bold text-green-900">DroneDeploy</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700">$99-299/mes</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700 font-bold">Alta ✅</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700">Principiantes</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors bg-green-50">
                  <td className="p-4 border-2 border-purple-200 font-bold text-green-900">WebODM</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700 font-bold">Gratuito ✅</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700">Media</td>
                  <td className="p-4 border-2 border-purple-200 text-green-700">Aprendizaje, proyectos pequeños</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="p-4 border-2 border-purple-200 font-bold text-purple-900">RealityCapture</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">€6,000+/año</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Baja</td>
                  <td className="p-4 border-2 border-purple-200 text-purple-700">Procesamiento rápido</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm text-purple-700 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <strong className="text-purple-900">💡 Recomendación para iniciación:</strong> WebODM (gratuito) o DroneDeploy (interfaz amigable)
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: IA Y AUTÓNOMOS */}
      {activeTab === 'ia' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">🤖</span> Drones + IA + Vehículos Autónomos
            </h2>
            <p className="text-pink-100 mt-1">La convergencia de tecnologías disruptivas</p>
          </div>

          {/* Funciones de IA */}
          <div className="bg-white rounded-2xl border-4 border-blue-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-4">🧠 Funciones Típicas de IA en Drones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-1">Detección y Evitación de Obstáculos</p>
                <p className="text-xs text-blue-700 mb-2">Sensores + algoritmos de visión computacional</p>
                <p className="text-xs text-blue-600"><strong>Ejemplo:</strong> Phantom 4 evita colisiones automáticamente</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-1">Vuelo Autónomo</p>
                <p className="text-xs text-blue-700 mb-2">Planificación de rutas optimizada sin intervención</p>
                <p className="text-xs text-blue-600"><strong>Ejemplo:</strong> Dron vuela ruta preplanificada de forma autónoma</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-1">Análisis Automático de Imágenes</p>
                <p className="text-xs text-blue-700 mb-2">Detección de personas, vehículos, fallos estructurales</p>
                <p className="text-xs text-blue-600"><strong>Ejemplo:</strong> Detectar grietas en un puente automáticamente</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-1">Seguimiento Automático</p>
                <p className="text-xs text-blue-700 mb-2">Algoritmo de visión que sigue a persona u objeto</p>
                <p className="text-xs text-blue-600"><strong>Ejemplo:</strong> ActiveTrack en Phantom 4</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500 md:col-span-2">
                <p className="font-bold text-blue-900 mb-1">Aprendizaje Continuo</p>
                <p className="text-xs text-blue-700 mb-2">Optimización de consumo y seguridad</p>
                <p className="text-xs text-blue-600"><strong>Ejemplo:</strong> El dron aprende a volar de forma más eficiente</p>
              </div>
            </div>
          </div>

          {/* Ejemplos IA en Fotogrametría */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold mb-4">📊 Ejemplos de IA Aplicada a Fotogrametría</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-blue-900 mb-1">1. Segmentación Semántica</p>
                <p className="text-sm text-blue-700">Distinguir automáticamente edificios, carreteras, vegetación, agua en un modelo 3D</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-blue-900 mb-1">2. Detección de Cambios</p>
                <p className="text-sm text-blue-700">Comparar dos vuelos (antes/después) e identificar cambios automáticamente</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-blue-900 mb-1">3. Clasificación de Cultivos</p>
                <p className="text-sm text-blue-700">Detectar qué tipo de cultivo hay en cada parcela usando redes neuronales</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-blue-900 mb-1">4. Detección de Plagas</p>
                <p className="text-sm text-blue-700">Identificar zonas afectadas por plagas antes de que sean visibles al ojo humano</p>
              </div>
            </div>
          </div>

          {/* Paralelismos con Coches Autónomos */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
              <span className="text-3xl">🚗</span> Paralelismos con Coches Autónomos y Robots
            </h2>
            <p className="text-purple-100 mb-4">
              Los coches autónomos utilizan sensores (cámaras, radar, LiDAR) y algoritmos de IA muy similares a los que se usan en drones avanzados. Tanto en drones como en vehículos autónomos, la IA procesa en tiempo real el entorno para:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-purple-900">Tomar decisiones de navegación</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-purple-900">Evitar colisiones</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-purple-900">Optimizar rutas</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-purple-900">Comunicarse entre vehículos</p>
              </div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
              <p className="font-bold text-purple-900 mb-2">📌 Ejemplos Reales:</p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>✓ <strong>Waymo y Tesla:</strong> Coches autónomos con visión por computador y fusión de sensores</li>
                <li>✓ <strong>Robots de Reparto (Starship, Amazon Scout):</strong> Vehículos terrestres que comparten lógicas con drones</li>
                <li>✓ <strong>Enjambres de Drones:</strong> Múltiples drones comunicándose entre sí para tareas coordinadas</li>
              </ul>
            </div>
          </div>

          {/* Collapsibles Técnicos */}
          <div className="space-y-3">
            {[
              { id: 'vision', icon: '👁️', title: 'Visión por Computador', desc: 'Algoritmos que permiten a las máquinas "ver" y entender imágenes', apps: ['Detección de obstáculos', 'Reconocimiento de objetos', 'Seguimiento de sujetos', 'Análisis de daños'], ejemplo: 'Phantom 4 usa visión por computador para detectar y evitar obstáculos' },
              { id: 'slam', icon: '🗺️', title: 'SLAM (Simultaneous Localization and Mapping)', desc: 'Tecnología que permite mapear un entorno mientras se localiza, sin GPS', apps: ['Vuelo en interiores', 'Vuelo sin cobertura GPS', 'Mapeo de espacios complejos'], ejemplo: 'Dron mapea una cueva mientras vuela sin necesidad de GPS' },
              { id: 'edge', icon: '⚡', title: 'Edge Computing', desc: 'Procesar datos en el propio dron (chips como NVIDIA Jetson)', apps: ['Toma de decisiones en milisegundos', 'Sin dependencia de internet', 'Mayor privacidad', 'Menor latencia'], ejemplo: 'Dron detecta obstáculos y reacciona en milisegundos sin conectarse a servidor' },
              { id: 'cnn', icon: '🧠', title: 'Redes Neuronales Convolucionales (CNN)', desc: 'Algoritmos de aprendizaje profundo especializados en procesar imágenes', apps: ['Clasificación de cultivos', 'Detección de plagas', 'Identificación de anomalías', 'Reconocimiento de personas'], ejemplo: 'Red neuronal detecta plagas en cultivos con 95% de precisión' },
            ].map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => toggleCollapsible(item.id)}
                  className={`w-full p-5 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-all shadow-md ${
                    openCollapsibles[item.id] ? 'bg-gradient-to-r from-pink-100 to-rose-100 border-pink-500 scale-102' : 'bg-white border-pink-300 hover:bg-pink-50 hover:scale-102'
                  }`}
                >
                  <span className="text-pink-900 flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span> {item.title}
                  </span>
                  <span className={`text-pink-700 transition-transform text-2xl ${openCollapsibles[item.id] ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openCollapsibles[item.id] && (
                  <div className="mt-3 p-5 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-300 rounded-2xl shadow-lg">
                    <p className="text-sm font-bold text-pink-900 mb-2">{item.desc}</p>
                    <p className="text-sm font-bold text-pink-900 mb-2">Aplicaciones:</p>
                    <ul className="text-sm text-pink-700 list-disc list-inside mb-3 space-y-1">
                      {item.apps.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                    <div className="bg-pink-100 p-3 rounded-lg border-l-4 border-pink-500">
                      <p className="text-xs font-bold text-pink-900">Ejemplo:</p>
                      <p className="text-xs text-pink-700">{item.ejemplo}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Casos Reales */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
              <span className="text-3xl">✨</span> Casos Reales Inspiradores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-green-900 mb-2">Inspección de Aerogeneradores con IA</p>
                <p className="text-sm text-green-700 mb-2">Drones con cámaras térmicas e IA detectan puntos calientes que indican fallos.</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <p className="text-xs text-green-800"><strong>Resultado:</strong> Reducción de tiempos de inspección 75% | Detección de fallos 2 semanas antes</p>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-green-900 mb-2">Agricultura de Precisión en La Mancha</p>
                <p className="text-sm text-green-700 mb-2">Drones con cámaras multiespectrales e IA detectan estrés hídrico en viñedos.</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <p className="text-xs text-green-800"><strong>Resultado:</strong> Ahorro de agua 20-30% | Aumento de rendimiento 10-15%</p>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-green-900 mb-2">Búsqueda y Rescate en Montaña</p>
                <p className="text-sm text-green-700 mb-2">Drones con cámaras térmicas e IA identifican siluetas humanas en tiempo real.</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <p className="text-xs text-green-800"><strong>Resultado:</strong> Tasa de éxito 95% en búsquedas nocturnas</p>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                <p className="font-bold text-green-900 mb-2">Vehículos Autónomos Guiados por Drones</p>
                <p className="text-sm text-green-700 mb-2">Drones actúan como 'exploradores aéreos' para guiar vehículos terrestres.</p>
                <div className="bg-green-100 p-2 rounded-lg">
                  <p className="text-xs text-green-800"><strong>Resultado:</strong> Navegación más segura en terrenos complejos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RECURSOS */}
      {activeTab === 'recursos' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-6 shadow-xl text-white">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">🔗</span> Recursos Clave para la Clase
            </h2>
            <p className="text-cyan-100 mt-1">Enlaces, vídeos y artículos esenciales</p>
          </div>

          {/* Enlaces Oficiales */}
          <div className="bg-white rounded-2xl border-4 border-blue-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🏛️</span> Enlaces Oficiales (AESA)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.seguridadaerea.gob.es" target="_blank" rel="noopener noreferrer" className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border-2 border-blue-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-blue-900 group-hover:text-blue-700">Portal General de Drones</p>
                <p className="text-sm text-blue-700 mt-1">Apartado 'Drones' con toda la información oficial</p>
              </a>
              <a href="https://sede.seguridadaerea.gob.es/sede-aesa/catalogo-de-procedimientos/curso-de-formacion-y-examen-de-piloto-distancia-en-categoria-abierta" target="_blank" rel="noopener noreferrer" className="block bg-green-50 hover:bg-green-100 p-4 rounded-xl border-2 border-green-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-green-900 group-hover:text-green-700">Formación A1/A3 (Curso + Examen Gratuito)</p>
                <p className="text-sm text-green-700 mt-1">Acceso directo a la plataforma de formación online</p>
              </a>
              <a href="https://www.oneair.es/normativa-drones-espana-aesa/" target="_blank" rel="noopener noreferrer" className="block bg-purple-50 hover:bg-purple-100 p-4 rounded-xl border-2 border-purple-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-purple-900 group-hover:text-purple-700">Normativa de Drones en España</p>
                <p className="text-sm text-purple-700 mt-1">Guía completa y actualizada de la normativa</p>
              </a>
              <a href="https://drones.enaire.es/" target="_blank" rel="noopener noreferrer" className="block bg-orange-50 hover:bg-orange-100 p-4 rounded-xl border-2 border-orange-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-orange-900 group-hover:text-orange-700">Mapa de Zonas de Vuelo (Enaire)</p>
                <p className="text-sm text-orange-700 mt-1">Consultar zonas permitidas para vuelo de drones</p>
              </a>
            </div>
          </div>

          {/* Vídeos Clave */}
          <div className="bg-white rounded-2xl border-4 border-red-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-red-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎥</span> Vídeos Clave (YouTube)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://www.youtube.com/watch?v=xCAcnlnp2BA" target="_blank" rel="noopener noreferrer" className="block bg-red-50 hover:bg-red-100 p-4 rounded-xl border-2 border-red-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-red-900 group-hover:text-red-700">Videoguía Oficial AESA - Inscripción y Examen A1/A3</p>
                <p className="text-xs text-red-600 mt-2 font-bold">⏱️ ~10 min</p>
              </a>
              <a href="https://www.youtube.com/watch?v=f_UFHWm1FtU" target="_blank" rel="noopener noreferrer" className="block bg-red-50 hover:bg-red-100 p-4 rounded-xl border-2 border-red-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-red-900 group-hover:text-red-700">Examen A1/A3 2025 - APPbera</p>
                <p className="text-xs text-red-600 mt-2 font-bold">⏱️ ~30 min</p>
              </a>
              <a href="https://www.youtube.com/watch?v=1HPyd5S_BRY" target="_blank" rel="noopener noreferrer" className="block bg-red-50 hover:bg-red-100 p-4 rounded-xl border-2 border-red-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-red-900 group-hover:text-red-700">Fotogrametría con Drones - Guía Completa</p>
                <p className="text-xs text-red-600 mt-2 font-bold">⏱️ ~20 min</p>
              </a>
              <a href="https://www.youtube.com/watch?v=Vj4scrMetPE" target="_blank" rel="noopener noreferrer" className="block bg-red-50 hover:bg-red-100 p-4 rounded-xl border-2 border-red-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-red-900 group-hover:text-red-700">Curso Fotogrametría - De Cero a Experto</p>
                <p className="text-xs text-red-600 mt-2 font-bold">⏱️ ~40 min</p>
              </a>
              <a href="https://www.youtube.com/watch?v=S93ZOtBMvLw" target="_blank" rel="noopener noreferrer" className="block bg-red-50 hover:bg-red-100 p-4 rounded-xl border-2 border-red-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-red-900 group-hover:text-red-700">Drones e IA en la Industria (DJI Enterprise)</p>
                <p className="text-xs text-red-600 mt-2 font-bold">⏱️ ~15 min</p>
              </a>
            </div>
          </div>

          {/* Artículos y Guías */}
          <div className="bg-white rounded-2xl border-4 border-purple-300 p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold text-purple-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">📚</span> Artículos y Guías Técnicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.puntovisado.com/fotogrametria-con-drones-principiantes/" target="_blank" rel="noopener noreferrer" className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border-2 border-blue-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-blue-900 group-hover:text-blue-700">Guía de Fotogrametría para Principiantes</p>
              </a>
              <a href="https://aerolaser.es/fotogrametria-con-drones-tecnologia-aplicaciones-y-beneficios/" target="_blank" rel="noopener noreferrer" className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border-2 border-blue-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-blue-900 group-hover:text-blue-700">Fotogrametría: Tecnología, Aplicaciones y Beneficios</p>
              </a>
              <a href="https://ingeodrone.es/fotogrametria-con-drones-que-es/" target="_blank" rel="noopener noreferrer" className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-xl border-2 border-blue-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-blue-900 group-hover:text-blue-700">Guía Detallada de Levantamientos Fotogramétricos</p>
              </a>
              <a href="https://grupo-uas.com/drones-e-inteligencia-artificial-la-revolucion-del-vuelo-autonomo/" target="_blank" rel="noopener noreferrer" className="block bg-purple-50 hover:bg-purple-100 p-4 rounded-xl border-2 border-purple-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-purple-900 group-hover:text-purple-700">Drones e IA: La Revolución del Vuelo Autónomo</p>
              </a>
              <a href="https://www.zeruandron.com/drones-inteligencia-artificial/" target="_blank" rel="noopener noreferrer" className="block bg-purple-50 hover:bg-purple-100 p-4 rounded-xl border-2 border-purple-200 transition-all hover:scale-105 hover:shadow-lg group">
                <p className="font-bold text-purple-900 group-hover:text-purple-700">Drones e Inteligencia Artificial (Zeruan Dron)</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
