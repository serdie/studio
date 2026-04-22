'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Sparkles, Code2, Palette, Rocket } from 'lucide-react';

interface StudentPortfolio {
  name: string;
  url: string;
  gradient: string;
  icon: 'code' | 'palette' | 'rocket';
}

const studentPortfolios: StudentPortfolio[] = [
  {
    name: 'Carlos',
    url: 'https://portfolio-ccm-2-0.vercel.app/',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    icon: 'code',
  },
  {
    name: 'Patri',
    url: 'https://miportfolio-jet.vercel.app/',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    icon: 'palette',
  },
  {
    name: 'Victor Santisteban',
    url: 'https://vsantisteban.es',
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    icon: 'rocket',
  },
  {
    name: 'Dario',
    url: 'https://portfolio-dario-munoz-ten.vercel.app/',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    icon: 'code',
  },
  {
    name: 'Laura Izquierdo',
    url: 'https://portfolio-chat-bot-laura-s-i-j.vercel.app/',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    icon: 'code',
  },
  {
    name: 'Iker Muñoz',
    url: 'https://portfolio-iker-mu-oz.vercel.app/',
    gradient: 'from-red-500 via-pink-500 to-rose-500',
    icon: 'palette',
  },
  {
    name: 'Laura Campillo',
    url: 'https://portfolio-lauracampgonza-ia.vercel.app/',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
    icon: 'rocket',
  },
  {
    name: 'Álvaro Fernández',
    url: 'https://portfolioafc.vercel.app/',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    icon: 'code',
  },
  {
    name: 'Ivan',
    url: 'https://ivanmunoz-cv.vercel.app/',
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    icon: 'palette',
  },
  {
    name: 'Nicolas Cabello',
    url: 'https://portfolio-nicolas-cabello-alonso.vercel.app',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    icon: 'rocket',
  },
  {
    name: 'Ari',
    url: 'https://portfolio-bueno-m7nr.vercel.app/',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    icon: 'palette',
  },
  {
    name: 'Iker Garcia',
    url: 'https://portfolioikerg.vercel.app/',
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    icon: 'code',
  },
  {
    name: 'Álvaro Alonso',
    url: 'https://alvaroaf.vercel.app/',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    icon: 'palette',
  },
  {
    name: 'Hector Martín',
    url: 'https://hectormartinportfoliopage.vercel.app/',
    gradient: 'from-orange-600 via-amber-600 to-yellow-600',
    icon: 'rocket',
  },
  {
    name: 'Dani',
    url: 'https://portfolio-profesional-blue.vercel.app/',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    icon: 'code',
  },
  {
    name: 'Adrian',
    url: 'https://portfoliopersonal-nu.vercel.app/',
    gradient: 'from-red-600 via-rose-600 to-pink-600',
    icon: 'rocket',
  },
];

function getIconComponent(icon: string) {
  switch (icon) {
    case 'code':
      return Code2;
    case 'palette':
      return Palette;
    case 'rocket':
      return Rocket;
    default:
      return Code2;
  }
}

function getPortfolioScreenshot(url: string) {
  // Usamos un servicio de screenshots automático
  // La API de screenshotlayer o similar genera una captura del sitio
  const encodedUrl = encodeURIComponent(url);
  return `https://image.thum.io/get/width/1200/crop/800/${url}`;
}

interface StudentPortfolioCardProps {
  student: StudentPortfolio;
}

function StudentPortfolioCard({ student }: StudentPortfolioCardProps) {
  const IconComponent = getIconComponent(student.icon);
  const screenshotUrl = getPortfolioScreenshot(student.url);

  return (
    <a
      href={student.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden border-2 border-slate-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 bg-white hover:scale-[1.02]">
        {/* Screenshot Container */}
        <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${student.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
          
          {/* Screenshot Image */}
          <img
            src={screenshotUrl}
            alt={`Portfolio de ${student.name}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback si la captura no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.classList.remove('hidden');
              }
            }}
          />
          
          {/* Fallback Gradient */}
          <div className={`hidden absolute inset-0 bg-gradient-to-br ${student.gradient} opacity-80 flex items-center justify-center`}>
            <IconComponent className="h-24 w-24 text-white/50" />
          </div>

          {/* Hover Overlay with CTA */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Badge className="bg-white text-slate-900 hover:bg-white/90 text-sm px-6 py-2 h-auto font-semibold">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visitar Portfolio
              </Badge>
            </div>
          </div>

          {/* Badge Icon */}
          <div className={`absolute top-4 right-4 h-12 w-12 rounded-full bg-gradient-to-br ${student.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 z-30`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>

          {/* Sparkle Effect on Hover */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Student Info */}
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500">
              {student.name}
            </h3>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors duration-300" />
          </div>
          <p className="text-sm text-slate-500 mt-1 group-hover:text-purple-600 transition-colors duration-300">
            Portfolio Profesional
          </p>
          
          {/* Animated Underline */}
          <div className="mt-3 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-700" />
        </CardContent>
      </Card>
    </a>
  );
}

export default function StudentPortfolios() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 border border-purple-200">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">Portfolios de Alumnos</span>
          <Sparkles className="h-4 w-4 text-purple-600" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          Descubre el Trabajo de Nuestros Alumnos
        </h2>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explora los portfolios profesionales creados por los alumnos del curso. 
          Cada portfolio refleja el aprendizaje, creatividad y habilidades desarrolladas durante la formación.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 pt-4">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {studentPortfolios.length}
            </div>
            <div className="text-sm text-slate-500">Portfolios</div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-sm text-slate-500">Profesionales</div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              ∞
            </div>
            <div className="text-sm text-slate-500">Talento</div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {studentPortfolios.map((student, index) => (
          <div
            key={student.name}
            className="animate-in fade-in slide-in-from-bottom-8"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
          >
            <StudentPortfolioCard student={student} />
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center py-8">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 border-2 border-purple-200">
          <p className="text-lg font-semibold text-purple-900 mb-2">
            🚀 ¿Quieres añadir tu portfolio?
          </p>
          <p className="text-sm text-purple-700">
            Contacta con el profesorado para incluir tu portfolio en esta galería.
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
