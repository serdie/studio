'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronDown,
  FileText,
  Map,
  MessageSquare,
  BookOpen,
  Search,
  Layers,
  Target,
  BarChart3,
  TrendingUp,
  Calendar,
  Shield,
} from 'lucide-react';

import CabifyPractice1 from './cabify-practice-1';
import WallapopPractice2 from './wallapop-practice-2';
import TooGoodToGoPractice3 from './toogoodtogo-practice-3';
import RitualsPractice4 from './rituals-practice-4';
import IberdrolaMarketingPractice5 from './iberdrola-marketing-practice-5';
import FactorialPractice6 from './factorial-practice-6';
import DoctoraliaPractice7 from './doctoralia-practice-7';
import PcComponentesPractice8 from './pccomponentes-practice-8';
import CruzRojaPractice9 from './cruzroja-practice-9';
import RenfePractice10 from './renfe-practice-10';

export default function Module6Practices() {
  const [open, setOpen] = useState(false);
  const [p1, setP1] = useState(false);
  const [p2, setP2] = useState(false);
  const [p3, setP3] = useState(false);
  const [p4, setP4] = useState(false);
  const [p5, setP5] = useState(false);
  const [p6, setP6] = useState(false);
  const [p7, setP7] = useState(false);
  const [p8, setP8] = useState(false);
  const [p9, setP9] = useState(false);
  const [p10, setP10] = useState(false);

  return (
    <div className="space-y-4">
      {/* Cabecera del bloque */}
      <Card
        className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-fuchsia-900">📋 Prácticas del Módulo 6</h3>
                <p className="text-sm text-fuchsia-700">
                  {open
                    ? '10 prácticas: Cabify Mapa IA, Wallapop VoC, Too Good To Go Sistema, Rituals SEO, Iberdrola EEAT, Factorial SEM, Doctoralia GA4, PcComponentes CRO, Cruz Roja Social, Renfe Community'
                    : 'Práctica 1: Cabify · Práctica 2: Wallapop · Práctica 3: Too Good To Go · Práctica 4: Rituals · Práctica 5: Iberdrola · Práctica 6: Factorial · Práctica 7: Doctoralia · Práctica 8: PcComponentes · Práctica 9: Cruz Roja · Práctica 10: Renfe — Haz clic para ver'}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-fuchsia-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </CardContent>
      </Card>

      {open && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          {/* Práctica 1 — Cabify */}
          <Card
            className="border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-purple-50 to-white cursor-pointer"
            onClick={() => setP1(!p1)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-fuchsia-200 flex items-center justify-center">
                    <Map className="h-4 w-4 text-fuchsia-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-fuchsia-900">
                      Práctica 1: Mapa de casos de uso + KPIs por fase (Cabify)
                    </h4>
                    <p className="text-sm text-fuchsia-700">
                      {p1
                        ? '12 casos de uso (mín. 2 por fase) con entrada → salida → riesgo → control → KPIs'
                        : '5 fases del ciclo · 12 casos · 6 KPIs rendimiento + 2 KPIs riesgo'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-fuchsia-700 transition-transform duration-300 ${p1 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p1 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <CabifyPractice1 />
            </div>
          )}

          {/* Práctica 2 — Wallapop */}
          <Card
            className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-white cursor-pointer"
            onClick={() => setP2(!p2)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-200 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">
                      Práctica 2: Voz del cliente (VoC) — de reseñas a insights accionables (Wallapop)
                    </h4>
                    <p className="text-sm text-emerald-700">
                      {p2
                        ? '8-12 clusters · top objeciones y drivers · 3 audiencias · 10 hipótesis priorizadas'
                        : 'Convertir reviews/RRSS/FAQs en backlog accionable con evidencias citadas'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-emerald-700 transition-transform duration-300 ${p2 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p2 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <WallapopPractice2 />
            </div>
          )}

          {/* Práctica 3 — Too Good To Go */}
          <Card
            className="border-lime-200 bg-gradient-to-br from-lime-50 via-green-50 to-white cursor-pointer"
            onClick={() => setP3(!p3)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-lime-200 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-lime-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lime-900">
                      Práctica 3: Sistema de contenidos con IA — brand voice + prompts + checklist (Too Good To Go)
                    </h4>
                    <p className="text-sm text-lime-700">
                      {p3
                        ? 'MVP del sistema: brand voice 1-2pp · 10 prompts · checklist editorial · versionado'
                        : 'Tipo grupal · escalar contenidos sin perder coherencia ni inventar claims'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-lime-700 transition-transform duration-300 ${p3 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p3 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <TooGoodToGoPractice3 />
            </div>
          )}

          {/* Práctica 4 — Rituals */}
          <Card
            className="border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white cursor-pointer"
            onClick={() => setP4(!p4)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-rose-200 flex items-center justify-center">
                    <Search className="h-4 w-4 text-rose-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-900">
                      Práctica 4: SEO con IA — keyword map + arquitectura pilar/cluster (Rituals)
                    </h4>
                    <p className="text-sm text-rose-700">
                      {p4
                        ? '20 filas keyword map (intención clasificada) · 1 pilar + 6 clusters · enlazado'
                        : 'Plan de orgánico sin canibalización ni artículos sueltos'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-rose-700 transition-transform duration-300 ${p4 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p4 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <RitualsPractice4 />
            </div>
          )}

          {/* Práctica 5 — Iberdrola */}
          <Card
            className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white cursor-pointer"
            onClick={() => setP5(!p5)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-200 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">
                      Práctica 5: Producción SEO asistida — brief + borrador + checklist EEAT (Iberdrola)
                    </h4>
                    <p className="text-sm text-emerald-700">
                      {p5
                        ? 'Brief SEO + 2 secciones borrador + checklists on-page/EEAT + plan de refresh'
                        : 'Artículo SEO con credibilidad EEAT y sin inventar cifras'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-emerald-700 transition-transform duration-300 ${p5 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p5 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <IberdrolaMarketingPractice5 />
            </div>
          )}

          {/* Práctica 6 — Factorial */}
          <Card
            className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white cursor-pointer"
            onClick={() => setP6(!p6)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-200 flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">
                      Práctica 6: SEM con IA — estructura campaña → grupos → anuncios + coherencia (Factorial)
                    </h4>
                    <p className="text-sm text-blue-700">
                      {p6
                        ? '3 grupos · 9 ads · 10 negativas · checklist coherencia anuncio↔landing'
                        : 'Diseñar mensajes coherentes para no romper la promesa en la landing'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-blue-700 transition-transform duration-300 ${p6 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p6 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <FactorialPractice6 />
            </div>
          )}

          {/* Práctica 7 — Doctoralia */}
          <Card
            className="border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-white cursor-pointer"
            onClick={() => setP7(!p7)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-cyan-200 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-cyan-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-900">
                      Práctica 7: Funnel + plan de medición GA4 (Doctoralia)
                    </h4>
                    <p className="text-sm text-cyan-700">
                      {p7
                        ? '8 eventos GA4 + 6 parámetros + naming + checklist QA + microconversiones'
                        : 'Diccionario de eventos para dejar de discutir conversión por opiniones'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-cyan-700 transition-transform duration-300 ${p7 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p7 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <DoctoraliaPractice7 />
            </div>
          )}

          {/* Práctica 8 — PcComponentes */}
          <Card
            className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white cursor-pointer"
            onClick={() => setP8(!p8)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-200 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-900">
                      Práctica 8: CRO — diagnóstico → 12 hipótesis → backlog ICE + 10 variantes (PcComponentes)
                    </h4>
                    <p className="text-sm text-orange-700">
                      {p8
                        ? 'Tasas + 5 insights · 12 hipótesis "si X entonces Y" · ICE · 10 variantes hero'
                        : 'Proceso CRO serio con mecanismo, priorización y variantes para test'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-orange-700 transition-transform duration-300 ${p8 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p8 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <PcComponentesPractice8 />
            </div>
          )}

          {/* Práctica 9 — Cruz Roja */}
          <Card
            className="border-red-200 bg-gradient-to-br from-red-50 via-rose-50 to-white cursor-pointer"
            onClick={() => setP9(!p9)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-red-200 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-red-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-900">
                      Práctica 9: Social — estrategia + calendario editorial 4 semanas (Cruz Roja)
                    </h4>
                    <p className="text-sm text-red-700">
                      {p9
                        ? 'Objetivos por canal · 4 pilares · 16 publicaciones · 6 KPIs · ritual semanal'
                        : 'Plan social equilibrado (awareness/comunidad/conversión) con rutina de revisión'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-red-700 transition-transform duration-300 ${p9 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p9 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <CruzRojaPractice9 />
            </div>
          )}

          {/* Práctica 10 — Renfe */}
          <Card
            className="border-slate-300 bg-gradient-to-br from-slate-50 via-zinc-50 to-white cursor-pointer"
            onClick={() => setP10(!p10)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center">
                    <Layers className="h-4 w-4 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Práctica 10: Community y "mini-crisis" — plantillas + protocolo de escalado (Renfe)
                    </h4>
                    <p className="text-sm text-slate-700">
                      {p10
                        ? '12 plantillas · matriz riesgo→acción · protocolo 30m/2h/24h · 10 casos test'
                        : 'Kit de community management listo para uso real, sin compensaciones no verificables'}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-700 transition-transform duration-300 ${p10 ? 'rotate-180' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
          {p10 && (
            <div className="pl-4 animate-in slide-in-from-top-2 duration-300">
              <RenfePractice10 />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
