'use client';

import { useState } from 'react';

interface Platform {
  name: string;
  url: string;
  short: string;
  description: string;
  category: string;
  level: string;
  usedIn: 'ejercicio' | 'alternativa';
  usedInText: string;
  tags: string[];
}

const platforms: Platform[] = [
  // === PLATAFORMAS USADAS EN LOS EJERCICIOS ===
  {
    name: 'Avaturn',
    url: 'https://avaturn.me',
    short: 'Creador de avatares 3D realistas desde una foto',
    description:
      'Subes un selfie y genera un avatar 3D de cuerpo completo bastante realista, ideal como modelo para probadores virtuales o videojuegos. Puedes exportar el modelo para usarlo en otras herramientas.',
    category: 'Creación 3D',
    level: 'Fácil',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 1 – Inditex/Zara (avatar modelo probador virtual).',
    tags: ['probador virtual', 'avatar 3D', 'modelo realista', 'web'],
  },
  {
    name: 'Krikey AI',
    url: 'https://www.krikey.ai',
    short: '3D avatar + animación y vídeo desde texto',
    description:
      'Permite crear personajes 3D estilo cartoon y animarlos con movimientos, expresiones y voz generada desde texto. Ideal para vídeos cortos de producto o personajes tipo juego.',
    category: 'Animación 3D / Vídeo',
    level: 'Fácil',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 1 – Inditex/Zara (hacer hablar al modelo).',
    tags: ['vídeo IA', 'avatar 3D', 'texto a voz', 'animación'],
  },
  {
    name: 'Clipfly AI Talking Avatar',
    url: 'https://www.clipfly.ai/video-ai/ai-talking-avatar/',
    short: 'Talking avatars desde foto + texto a voz',
    description:
      'Subes una foto (avatar o persona), escribes un guion y genera un vídeo donde el personaje habla con sincronización de labios. Muy útil para soporte, explicaciones y demos rápidas.',
    category: 'Talking avatar',
    level: 'Fácil',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 2 – Telefónica (cliente + agente).',
    tags: ['soporte técnico', 'texto a voz', 'vídeo', 'browser'],
  },
  {
    name: 'EaseMate AI Talking Avatar',
    url: 'https://www.easemate.ai/talking-avatar-creator',
    short: 'Generador online de avatares parlantes',
    description:
      'Herramienta web para crear avatares que hablan a partir de texto o audio. Permite elegir voces, idiomas y estilos para vídeos explicativos o formación.',
    category: 'Talking avatar',
    level: 'Fácil',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 2 – Telefónica (como alternativa a Clipfly).',
    tags: ['servicio cliente', 'vídeo corto', 'texto a voz'],
  },
  {
    name: 'Typecast AI Talking Avatar',
    url: 'https://typecast.ai/talking-avatar',
    short: 'Actores digitales con voz y expresión',
    description:
      'Plataforma centrada en voces y personajes digitales para narrar textos. Combina voces sintéticas expresivas con personajes animados para vídeos educativos o de marketing.',
    category: 'Talking avatar',
    level: 'Medio',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 2 – Telefónica (otra alternativa de talking avatar).',
    tags: ['voz IA', 'narración', 'vídeo', 'guion'],
  },
  {
    name: 'Convai Avatar Studio',
    url: 'https://convai.com',
    short: 'Avatares 3D conversacionales en el navegador',
    description:
      'Permite crear personajes 3D que hablan y mantienen conversaciones en tiempo real dentro del navegador. Muy usado para NPCs inteligentes en juegos, mundos 3D y experiencias web.',
    category: 'Avatar conversacional 3D',
    level: 'Medio',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 3 – Turismo Toledo (guía turístico 3D conversacional).',
    tags: ['NPC', 'tiempo real', 'tres.js', 'turismo', 'chat'],
  },
  {
    name: 'DLP3D (Autonomous 3D Characters)',
    url: 'https://dlp3d.ai',
    short: 'Personajes 3D autónomos para la web',
    description:
      'Proyecto basado en Babylon.js para tener personajes 3D autónomos en la web, capaces de moverse y reaccionar. Sirve como referencia de lo que viene en NPCs y experiencias inmersivas.',
    category: 'Avatar conversacional 3D',
    level: 'Avanzado',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 3 – como referencia de personajes 3D autónomos.',
    tags: ['open source', 'autónomo', 'babylon.js', 'tres dimensiones'],
  },
  {
    name: 'AvatarSDK',
    url: 'https://avatarsdk.com',
    short: 'SDK para generar humanos 3D de alta calidad',
    description:
      'Servicio orientado a desarrolladores para generar avatares 3D de alta calidad a partir de fotos, integrables en juegos, VR/AR y metaversos.',
    category: 'Creación 3D (SDK)',
    level: 'Avanzado',
    usedIn: 'ejercicio',
    usedInText: 'Ejercicio 3 – como alternativa pro para humanos 3D.',
    tags: ['SDK', 'juegos', 'metaverso', 'VR', 'realista'],
  },
  // === ALTERNATIVAS Y EXTRAS ===
  {
    name: 'Synthesia',
    url: 'https://www.synthesia.io/tools/text-to-speech-avatar',
    short: 'Uno de los líderes en vídeo con avatar corporativo',
    description:
      'Plataforma muy popular para empresas: eliges un presentador virtual, pegas el texto y genera un vídeo profesional con avatar hablando, fondos, slides, etc.',
    category: 'Vídeo con avatar',
    level: 'Medio',
    usedIn: 'alternativa',
    usedInText: 'Buena referencia para ver el nivel enterprise.',
    tags: ['empresa', 'formación', 'onboarding', 'marketing'],
  },
  {
    name: 'HeyGen (AI Influencer / Avatares)',
    url: 'https://www.heygen.com/avatars',
    short: 'Avatares hiperrealistas y generador de influencers virtuales',
    description:
      'Ofrece una biblioteca muy grande de avatares y funciones para crear influencers virtuales, presentadores de marca y vídeos personalizados con IA.',
    category: 'Avatares e influencers',
    level: 'Medio',
    usedIn: 'alternativa',
    usedInText: 'Alternativa avanzada para vídeos e influencers virtuales.',
    tags: ['influencer', 'marca', 'vídeo IA', 'RRSS'],
  },
  {
    name: 'VEED Talking Avatar',
    url: 'https://www.veed.io/tools/text-to-speech-avatar/talking-avatar',
    short: 'Talking avatars integrados en editor de vídeo online',
    description:
      'Editor de vídeo web que incluye avatares parlantes, subtítulos automáticos y efectos. Ideal para crear piezas rápidas sin salir del navegador.',
    category: 'Talking avatar',
    level: 'Fácil',
    usedIn: 'alternativa',
    usedInText: 'Perfecto para vídeos cortos con avatar + textos.',
    tags: ['edición vídeo', 'subtítulos', 'contenido rápido'],
  },
  {
    name: 'Fotor AI Avatar',
    url: 'https://www.fotor.com/features/ai-avatar-generator/',
    short: 'Generador de avatares IA a partir de fotos o texto',
    description:
      'Permite crear estilos de avatar (realista, anime, cómic) que luego puedes usar como base para talking avatars o como imagen de perfil.',
    category: 'Avatares 2D/3D estilizados',
    level: 'Fácil',
    usedIn: 'alternativa',
    usedInText: 'Buen complemento visual a las herramientas de vídeo.',
    tags: ['estilos', 'anime', 'perfil', 'RRSS'],
  },
  {
    name: 'Creatify AI Influencer Generator',
    url: 'https://creatify.ai/features/ai-influencer-generator',
    short: 'Crea influencers virtuales y campañas con IA',
    description:
      'Herramienta para diseñar influencers virtuales completos (look + contenido) y generar creatividades para campañas de marketing y redes sociales.',
    category: 'Influencers virtuales',
    level: 'Medio',
    usedIn: 'alternativa',
    usedInText: 'Referencia para ver hacia dónde va la publicidad con avatares.',
    tags: ['publicidad', 'campañas', 'marcas', 'influencers'],
  },
  {
    name: 'Listas de mejores plataformas 2026',
    url: 'https://sozee.ai/resources/best-digital-avatar-platforms-2026/',
    short: 'Rankings y comparativas de herramientas de avatares',
    description:
      'Artículos que comparan varias plataformas de avatares (3D, talking, influencers) con pros y contras. Útil para investigar nuevas opciones.',
    category: 'Research / Rankings',
    level: 'Fácil',
    usedIn: 'alternativa',
    usedInText: 'Para ampliar más allá de las vistas en clase.',
    tags: ['comparativas', '2026', 'tendencias', 'research'],
  },
];

export default function AvatarPlatformsMap() {
  const [filter, setFilter] = useState<'all' | 'ejercicio' | 'alternativa'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isYellowOpen, setIsYellowOpen] = useState(true);
  const [isPinkOpen, setIsPinkOpen] = useState(true);

  const filteredPlatforms = platforms.filter((p) => {
    const matchesFilter = filter === 'all' ? true : p.usedIn === filter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.short.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.tags.some((t) => t.toLowerCase().includes(term)) ||
      p.usedInText.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  const exercisePlatforms = filteredPlatforms.filter((p) => p.usedIn === 'ejercicio');
  const alternativePlatforms = filteredPlatforms.filter((p) => p.usedIn === 'alternativa');

  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('talk')) return 'bg-blue-100 border-blue-300 text-blue-700';
    if (cat.includes('conversacional')) return 'bg-blue-100 border-blue-300 text-blue-700';
    if (cat.includes('creación') || cat.includes('3d')) return 'bg-purple-100 border-purple-300 text-purple-700';
    if (cat.includes('animación')) return 'bg-pink-100 border-pink-300 text-pink-700';
    if (cat.includes('influencer')) return 'bg-rose-100 border-rose-300 text-rose-700';
    if (cat.includes('vídeo')) return 'bg-amber-100 border-amber-300 text-amber-700';
    if (cat.includes('research')) return 'bg-slate-100 border-slate-300 text-slate-700';
    return 'bg-gray-100 border-gray-300 text-gray-700';
  };

  const getLevelColor = (level: string) => {
    if (level === 'Fácil') return 'bg-green-100 text-green-700 border-green-300';
    if (level === 'Medio') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const PlatformCard = ({ platform }: { platform: Platform }) => (
    <div className="bg-white rounded-xl border-2 border-purple-200 p-4 hover:shadow-lg hover:border-purple-300 transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-purple-900 mb-1">{platform.name}</h3>
          <p className="text-sm text-purple-700 font-medium">{platform.short}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className={`text-xs px-2 py-1 rounded-full border-2 font-semibold ${platform.usedIn === 'ejercicio' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-orange-100 text-orange-700 border-orange-300'}`}>
            {platform.usedIn === 'ejercicio' ? '✅ Ejercicio' : '🌟 Alternativa'}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border-2 font-semibold ${getCategoryColor(platform.category)}`}>
            {platform.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{platform.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {platform.tags.slice(0, 4).map((tag, idx) => (
          <span key={idx} className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md border border-purple-200">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t-2 border-purple-100">
        <a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-purple-600 hover:text-purple-800 hover:underline flex items-center gap-1"
        >
          🔗 Visitar plataforma
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <span className={`text-xs px-3 py-1 rounded-full border-2 font-bold ${getLevelColor(platform.level)}`}>
          {platform.level}
        </span>
      </div>

      <div className="mt-2 text-xs text-purple-600 bg-purple-50 p-2 rounded-lg border border-purple-200">
        💡 {platform.usedInText}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Cabecera */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          🗺️ Mapa de Plataformas de Avatares 3D – Módulo 3
        </h1>
        <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
          Guía rápida de todas las herramientas que hemos usado en los ejercicios (y otras alternativas potentes) para crear, animar y conversar con avatares 3D en la web.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 bg-white rounded-2xl border-2 border-purple-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'bg-purple-50 text-purple-700 border-2 border-purple-200 hover:bg-purple-100'}`}
          >
            🎯 Todas
          </button>
          <button
            onClick={() => setFilter('ejercicio')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'ejercicio' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md' : 'bg-green-50 text-green-700 border-2 border-green-200 hover:bg-green-100'}`}
          >
            ✅ Ejercicios
          </button>
          <button
            onClick={() => setFilter('alternativa')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'alternativa' ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' : 'bg-orange-50 text-orange-700 border-2 border-orange-200 hover:bg-orange-100'}`}
          >
            🌟 Alternativas
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Buscar por nombre, tipo o uso (ej.: Zara, turismo, influencer, soporte)…"
          className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-800 bg-purple-50"
        />
      </div>

      {/* Sección Amarilla - Enlaces Externos */}
      <div className="mb-6">
        <button
          onClick={() => setIsYellowOpen(!isYellowOpen)}
          className="w-full bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-50 rounded-2xl border-4 border-yellow-300 p-4 mb-3 hover:shadow-lg transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎨</span>
            <div className="text-left">
              <h2 className="text-xl font-extrabold text-yellow-900">Enlaces Externos - Avatares y TTS</h2>
              <p className="text-sm text-yellow-700">Plataformas usadas en los ejercicios + alternativas recomendadas</p>
            </div>
          </div>
          <span className={`text-3xl font-bold text-yellow-700 transition-transform ${isYellowOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {isYellowOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in">
            {exercisePlatforms.length > 0 && (
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                  ✅ <span className="px-3 py-1 bg-green-100 rounded-full border-2 border-green-300">Usadas en los Ejercicios</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {exercisePlatforms.map((p, idx) => (
                    <PlatformCard key={idx} platform={p} />
                  ))}
                </div>
              </div>
            )}

            {alternativePlatforms.length > 0 && (
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-bold text-orange-700 mb-3 flex items-center gap-2">
                  🌟 <span className="px-3 py-1 bg-orange-100 rounded-full border-2 border-orange-300">Alternativas y Extras</span>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {alternativePlatforms.map((p, idx) => (
                    <PlatformCard key={idx} platform={p} />
                  ))}
                </div>
              </div>
            )}

            {filteredPlatforms.length === 0 && (
              <div className="col-span-full text-center py-12 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <p className="text-yellow-800 text-lg">😕 No se encontraron plataformas para esa búsqueda</p>
                <p className="text-yellow-600 text-sm mt-2">Prueba con otros términos o quita los filtros</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sección Rosa - Herramientas de Creación */}
      <div>
        <button
          onClick={() => setIsPinkOpen(!isPinkOpen)}
          className="w-full bg-gradient-to-r from-pink-100 via-rose-100 to-pink-50 rounded-2xl border-4 border-pink-300 p-4 mb-3 hover:shadow-lg transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛠️</span>
            <div className="text-left">
              <h2 className="text-xl font-extrabold text-pink-900">Herramientas de Creación de Avatares</h2>
              <p className="text-sm text-pink-700">Todas las plataformas disponibles para crear tus avatares 3D</p>
            </div>
          </div>
          <span className={`text-3xl font-bold text-pink-700 transition-transform ${isPinkOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {isPinkOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((p, idx) => (
              <PlatformCard key={idx} platform={p} />
            ))}
          </div>
        )}
      </div>

      {/* Estado */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 bg-gray-50 inline-block px-4 py-2 rounded-full border-2 border-gray-200">
          📊 Mostrando {filteredPlatforms.length} de {platforms.length} plataformas
        </p>
      </div>
    </div>
  );
}
