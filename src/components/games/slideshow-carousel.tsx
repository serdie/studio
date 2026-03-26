'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

// Lista de diapositivas (26 imágenes)
// Los nombres de archivo siguen el patrón: Captura de pantalla 2026-03-26 210XXX.png
// donde XXX son los segundos: 008, 014, 020, 039, 046, 052, 058, 107, 113, 119, 124, 128, 133, 138, 142, 146, 151, 155, 159, 203, 208, 212, 217, 221, 225, 230
const SLIDE_FILES = [
  '008', '014', '020', '039', '046', '052', '058',
  '107', '113', '119', '124', '128', '133', '138', '142', '146', '151', '155', '159',
  '203', '208', '212', '217', '221', '225', '230'
];

const SLIDES = SLIDE_FILES.map((seconds, i) => ({
  id: i + 1,
  src: encodeURI(`/materiales/tema3/diapositivas-drone/Captura de pantalla 2026-03-26 210${seconds}.png`),
  alt: `Diapositiva ${i + 1} de Drones e IA`,
}));

export default function SlideshowCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const toggleFullscreen = () => {
    const carouselElement = document.getElementById('carousel-container');
    
    if (!carouselElement) return;

    if (!document.fullscreenElement) {
      carouselElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error al activar pantalla completa:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Navegación con teclado
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-2">
          📽️ Presentación: Drones e IA
        </h2>
        <p className="text-indigo-700">
          Sigue las diapositivas mientras el profesor explica
        </p>
      </div>

      {/* Carrusel */}
      <div id="carousel-container" className="relative bg-white rounded-3xl border-4 border-indigo-300 shadow-2xl overflow-hidden">
        {/* Contenedor de diapositivas */}
        <div className="relative aspect-video bg-gradient-to-br from-indigo-50 to-purple-50">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-contain p-4"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Controles de navegación */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          {/* Botones de navegación */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-indigo-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="bg-white/90 hover:bg-white text-indigo-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Pantalla completa"
            >
              {isFullscreen ? (
                <Minimize2 className="w-6 h-6" />
              ) : (
                <Maximize2 className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-indigo-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Siguiente diapositiva"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Indicador de progreso */}
          <div className="flex items-center justify-center gap-2 mb-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-indigo-500'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="text-center text-white font-bold text-sm">
            Diapositiva {currentSlide + 1} de {SLIDES.length}
          </div>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <kbd className="bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 font-bold text-indigo-700">
              ←
            </kbd>
            <kbd className="bg-white border-2 border-indigo-300 rounded-lg px-3 py-2 font-bold text-indigo-700">
              →
            </kbd>
            <span className="text-indigo-700 text-sm">Flechas del teclado</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-indigo-700 text-sm">Toca los puntos</span>
            <span className="text-indigo-700 text-sm">para navegar</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Maximize2 className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-700 text-sm">Pantalla completa disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
