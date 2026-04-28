'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, GraduationCap, Target, FlaskConical } from 'lucide-react';

import Module6PrepQuiz from './module6-prep-quiz';
import SeoSemGeoGame from './seo-sem-geo-game';
import SeoSemGeoLab from './seo-sem-geo-lab';

export default function Module6QuizAndSeo() {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [openLab, setOpenLab] = useState(false);

  return (
    <div className="space-y-4">
      {/* Test de preparación del examen */}
      <Card
        className="border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-white cursor-pointer"
        onClick={() => setOpenQuiz(!openQuiz)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-violet-900">
                  📝 Test de preparación · Examen Módulo 6
                </h3>
                <p className="text-sm text-violet-700">
                  {openQuiz
                    ? '10 preguntas tipo test (similares al examen real, NO idénticas) con feedback y explicaciones para preparar la evaluación parcial.'
                    : '10 preguntas para preparar el examen parcial · Casos de IA en marketing, SEO, SEM, funnel y CRO — Haz clic para empezar'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-violet-700 transition-transform duration-300 ${openQuiz ? 'rotate-180' : ''}`}
            />
          </div>
        </CardContent>
      </Card>

      {openQuiz && (
        <div className="animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
          <Module6PrepQuiz />
        </div>
      )}

      {/* Juego SEO / SEM / GEO */}
      <Card
        className="border-fuchsia-200 bg-gradient-to-br from-emerald-50 via-blue-50 to-fuchsia-50 cursor-pointer"
        onClick={() => setOpenGame(!openGame)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-blue-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-fuchsia-900">
                  🎯 Juego · SEO vs SEM vs GEO (posicionamiento en IAs)
                </h3>
                <p className="text-sm text-fuchsia-700">
                  {openGame
                    ? 'Clasifica 18 situaciones reales en SEO (orgánico), SEM (pagado) o GEO (posicionamiento en IAs generativas tipo ChatGPT/Perplexity).'
                    : 'Aprende jugando las diferencias entre SEO, SEM y GEO · 18 cartas para clasificar — Haz clic para empezar'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-fuchsia-700 transition-transform duration-300 ${openGame ? 'rotate-180' : ''}`}
            />
          </div>
        </CardContent>
      </Card>

      {openGame && (
        <div className="animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
          <SeoSemGeoGame />
        </div>
      )}

      {/* Lab Interactivo SEO / SEM / GEO */}
      <Card
        className="border-indigo-200 bg-gradient-to-br from-emerald-50 via-indigo-50 to-fuchsia-50 cursor-pointer"
        onClick={() => setOpenLab(!openLab)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900">
                  🧪 Lab Interactivo · SEO / SEM / GEO (aprende haciendo)
                </h3>
                <p className="text-sm text-indigo-700">
                  {openLab
                    ? '3 estaciones interactivas: clasifica keywords por intención, construye un anuncio de Google Ads válido y reescribe un párrafo para que ChatGPT/Perplexity lo citen.'
                    : '3 misiones prácticas: keywords + intención (SEO) · construir anuncio (SEM) · párrafo citable por IAs (GEO) — Haz clic para empezar'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-indigo-700 transition-transform duration-300 ${openLab ? 'rotate-180' : ''}`}
            />
          </div>
        </CardContent>
      </Card>

      {openLab && (
        <div className="animate-in slide-in-from-top-2 duration-300" onClick={(e) => e.stopPropagation()}>
          <SeoSemGeoLab />
        </div>
      )}
    </div>
  );
}
