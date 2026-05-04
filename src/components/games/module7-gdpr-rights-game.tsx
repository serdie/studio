'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';

interface GDPRCase {
  id: string;
  situation: string;
  rightAnswer: string;
  rights: string[];
  explanation: string;
  article: string;
}

const cases: GDPRCase[] = [
  {
    id: 'c1',
    situation: 'María descubre que una empresa tiene datos personales suyos que nunca proporcionó. Quiere saber exactamente qué datos tienen.',
    rightAnswer: 'Derecho de acceso',
    rights: ['Derecho de acceso', 'Derecho al olvido', 'Derecho de portabilidad', 'Derecho de oposición'],
    explanation: 'El derecho de acceso (Art. 15 GDPR) permite al interesado obtener confirmación de si se tratan sus datos y acceder a ellos.',
    article: 'Art. 15 GDPR'
  },
  {
    id: 'c2',
    situation: 'Carlos quiere que Google elimine resultados de búsqueda antiguos con información personal negativa sobre él de hace 15 años.',
    rightAnswer: 'Derecho al olvido',
    rights: ['Derecho de rectificación', 'Derecho al olvido', 'Derecho de limitación', 'Derecho de acceso'],
    explanation: 'El derecho al olvido (Art. 17 GDPR) permite solicitar la supresión de datos personales cuando ya no son necesarios o se retira el consentimiento.',
    article: 'Art. 17 GDPR'
  },
  {
    id: 'c3',
    situation: 'Laura quiere cambiar de banco y llevarse todo su historial de transacciones en formato digital a la nueva entidad.',
    rightAnswer: 'Derecho de portabilidad',
    rights: ['Derecho de portabilidad', 'Derecho de acceso', 'Derecho al olvido', 'Derecho de rectificación'],
    explanation: 'El derecho de portabilidad (Art. 20 GDPR) permite recibir los datos en formato estructurado y transmitirlos a otro responsable.',
    article: 'Art. 20 GDPR'
  },
  {
    id: 'c4',
    situation: 'Pedro descubre que su fecha de nacimiento está mal en la base de datos de su aseguradora, lo que le genera cobros incorrectos.',
    rightAnswer: 'Derecho de rectificación',
    rights: ['Derecho de oposición', 'Derecho de rectificación', 'Derecho al olvido', 'Derecho de limitación'],
    explanation: 'El derecho de rectificación (Art. 16 GDPR) permite corregir datos personales inexactos sin dilación indebida.',
    article: 'Art. 16 GDPR'
  },
  {
    id: 'c5',
    situation: 'Ana recibe emails publicitarios de una empresa a la que nunca dio su consentimiento y quiere que dejen de usar sus datos para marketing.',
    rightAnswer: 'Derecho de oposición',
    rights: ['Derecho de acceso', 'Derecho de portabilidad', 'Derecho de oposición', 'Derecho de limitación'],
    explanation: 'El derecho de oposición (Art. 21 GDPR) permite oponerse al tratamiento de datos para marketing directo en cualquier momento.',
    article: 'Art. 21 GDPR'
  },
  {
    id: 'c6',
    situation: 'Un banco rechaza el préstamo de Juan automáticamente sin intervención humana. Juan quiere que un humano revise su caso.',
    rightAnswer: 'Derecho a no ser objeto de decisiones automatizadas',
    rights: ['Derecho a no ser objeto de decisiones automatizadas', 'Derecho de acceso', 'Derecho de oposición', 'Derecho de rectificación'],
    explanation: 'El Art. 22 GDPR da derecho a no ser objeto de una decisión basada únicamente en tratamiento automatizado que produzca efectos jurídicos significativos.',
    article: 'Art. 22 GDPR'
  },
  {
    id: 'c7',
    situation: 'Sofía impugna que una empresa está usando sus datos incorrectamente. Mientras se verifica la exactitud, quiere que dejen de usar sus datos.',
    rightAnswer: 'Derecho de limitación',
    rights: ['Derecho de limitación', 'Derecho al olvido', 'Derecho de oposición', 'Derecho de portabilidad'],
    explanation: 'El derecho de limitación (Art. 18 GDPR) permite solicitar que se limite el tratamiento de datos mientras se resuelve una disputa sobre su exactitud.',
    article: 'Art. 18 GDPR'
  },
  {
    id: 'c8',
    situation: 'Diego quiere saber si una IA de recursos humanos usó sus datos de redes sociales para evaluarle en un proceso de selección.',
    rightAnswer: 'Derecho de acceso',
    rights: ['Derecho de portabilidad', 'Derecho de acceso', 'Derecho de limitación', 'Derecho al olvido'],
    explanation: 'El derecho de acceso incluye saber qué datos se procesan, con qué finalidad, y si se toman decisiones automatizadas.',
    article: 'Art. 15 GDPR'
  }
];

export default function Module7GDPRRightsGame() {
  const [currentCase, setCurrentCase] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const handleSelect = (right: string) => {
    if (answered) return;
    setSelected(right);
    setAnswered(true);
    if (right === cases[currentCase].rightAnswer) setScore(s => s + 1);
  };

  const next = () => {
    if (currentCase + 1 < cases.length) {
      setCurrentCase(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentCase(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setShowResult(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-900">Derechos GDPR en Acción</CardTitle>
              <p className="text-sm text-blue-700">¿Qué derecho aplica en cada situación?</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-800">
            Eres un Delegado de Protección de Datos (DPO). Ciudadanos acuden a ti con problemas relacionados con sus datos personales. Tu misión: identificar qué derecho GDPR aplica en cada caso.
          </p>
          <Button onClick={() => setStarted(true)} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
            <Lock className="h-4 w-4 mr-2" /> Comenzar como DPO
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const pct = Math.round((score / cases.length) * 100);
    return (
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <CardContent className="p-8 text-center space-y-4">
          <Trophy className={`h-16 w-16 mx-auto ${pct >= 70 ? 'text-yellow-500' : 'text-slate-400'}`} />
          <h3 className="text-2xl font-bold text-blue-900">
            {pct >= 80 ? '¡DPO experto!' : pct >= 60 ? '¡Buen conocimiento!' : 'Repasa los derechos GDPR'}
          </h3>
          <p className="text-4xl font-bold text-blue-600">{score}/{cases.length}</p>
          <Progress value={pct} className="w-64 mx-auto" />
          <Button onClick={reset} variant="outline" className="border-blue-300">
            <RefreshCw className="h-4 w-4 mr-2" /> Jugar de nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const c = cases[currentCase];

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Caso {currentCase + 1}/{cases.length}</Badge>
          <span className="text-sm text-blue-600 font-medium">Puntos: {score}</span>
        </div>
        <Progress value={((currentCase + 1) / cases.length) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900 font-medium">{c.situation}</p>
        </div>
        <p className="text-sm font-semibold text-blue-800">¿Qué derecho GDPR debe ejercer?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {c.rights.map(right => (
            <button
              key={right}
              onClick={() => handleSelect(right)}
              disabled={answered}
              className={`p-3 rounded-lg border-2 text-left text-sm transition-all ${
                !answered
                  ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
                  : right === c.rightAnswer
                    ? 'border-green-500 bg-green-50'
                    : selected === right
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 opacity-60'
              }`}
            >
              <span className="flex items-center gap-2">
                {answered && right === c.rightAnswer && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                {answered && selected === right && right !== c.rightAnswer && <XCircle className="h-4 w-4 text-red-500" />}
                {right}
              </span>
            </button>
          ))}
        </div>
        {answered && (
          <div className="space-y-3">
            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
              <p className="text-xs font-bold text-indigo-800">{c.article}</p>
              <p className="text-xs text-indigo-700 mt-1">{c.explanation}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={next} className="bg-blue-500 hover:bg-blue-600">
                {currentCase + 1 < cases.length ? (
                  <><ArrowRight className="h-4 w-4 mr-1" /> Siguiente caso</>
                ) : 'Ver resultados'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
