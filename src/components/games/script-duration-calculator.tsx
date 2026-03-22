'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Clock, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function ScriptDurationCalculator() {
  const [script, setScript] = useState('');
  const [targetDuration, setTargetDuration] = useState<'30' | '60' | '90' | '120'>('60');
  const [calculated, setCalculated] = useState(false);

  // Spanish speaking rate: ~150-160 words per minute
  const WORDS_PER_MINUTE = 155;

  const calculateDuration = () => {
    const words = script.trim().split(/\s+/).filter(word => word.length > 0).length;
    const durationSeconds = (words / WORDS_PER_MINUTE) * 60;
    return { words, durationSeconds };
  };

  const { words, durationSeconds } = calculateDuration();
  const targetSeconds = parseInt(targetDuration);
  const difference = durationSeconds - targetSeconds;
  const wordsPerSecond = WORDS_PER_MINUTE / 60;
  const wordsToAdjust = Math.abs(Math.round(difference * wordsPerSecond));

  const getStatus = () => {
    if (!calculated) return null;
    
    const tolerance = targetSeconds * 0.1; // 10% tolerance
    
    if (Math.abs(difference) <= tolerance) {
      return {
        status: 'perfect',
        label: '✅ Duración Perfecta',
        color: 'bg-green-100 border-green-300 text-green-900',
        message: `Tu guion está en el rango ideal (${Math.round(durationSeconds)}s)`
      };
    } else if (difference > 0) {
      return {
        status: 'too-long',
        label: '⚠️ Demasiado Largo',
        color: 'bg-orange-100 border-orange-300 text-orange-900',
        message: `Recorta aproximadamente ${wordsToAdjust} palabras`
      };
    } else {
      return {
        status: 'too-short',
        label: '⚠️ Demasiado Corto',
        color: 'bg-blue-100 border-blue-300 text-blue-900',
        message: `Añade aproximadamente ${wordsToAdjust} palabras`
      };
    }
  };

  const status = getStatus();

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setScript('');
    setCalculated(false);
  };

  const sampleScripts = {
    '30': 'Hola, bienvenidos a nuestra empresa. En este vídeo vamos a conocer los valores que nos definen y lo que nos hace únicos en el mercado. Somos más de quinientos profesionales comprometidos con la excelencia.',
    '60': 'Hola, bienvenidos a nuestra empresa. En este vídeo vamos a conocer los valores que nos definen y lo que nos hace únicos en el mercado. Somos más de quinientos profesionales comprometidos con la excelencia y la innovación constante. Desde nuestra fundación en mil novecientos noventa y cinco, hemos trabajado para ofrecer soluciones que realmente marcan la diferencia para nuestros clientes. Nuestra misión es clara: transformar desafíos complejos en oportunidades de crecimiento sostenible.',
    '90': 'Hola, bienvenidos a nuestra empresa. En este vídeo vamos a conocer los valores que nos definen y lo que nos hace únicos en el mercado. Somos más de quinientos profesionales comprometidos con la excelencia y la innovación constante. Desde nuestra fundación en mil novecientos noventa y cinco, hemos trabajado para ofrecer soluciones que realmente marcan la diferencia para nuestros clientes. Nuestra misión es clara: transformar desafíos complejos en oportunidades de crecimiento sostenible. Trabajamos en más de treinta países, adaptándonos a las necesidades específicas de cada mercado local.'
  };

  const loadSample = () => {
    setScript(sampleScripts[targetDuration]);
    setCalculated(false);
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-blue-900">
            ⏱️ Calculadora de Duración de Guion
          </h3>
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            <Clock className="h-3 w-3 mr-1" />
            {WORDS_PER_MINUTE} palabras/min
          </Badge>
        </div>
        <p className="text-blue-700 text-sm mt-2">
          Calcula la duración estimada de tu guion y ajústala al tiempo objetivo
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Target Duration Selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-blue-900">Duración Objetivo:</label>
          <div className="grid grid-cols-4 gap-2">
            {(['30', '60', '90', '120'] as const).map((duration) => (
              <Button
                key={duration}
                onClick={() => {
                  setTargetDuration(duration);
                  setCalculated(false);
                }}
                variant={targetDuration === duration ? 'default' : 'outline'}
                className={
                  targetDuration === duration
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'border-blue-300 hover:bg-blue-50'
                }
              >
                {duration}s
              </Button>
            ))}
          </div>
        </div>

        {/* Sample Script Button */}
        <div className="flex gap-2">
          <Button
            onClick={loadSample}
            variant="outline"
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Cargar ejemplo de {targetDuration}s
          </Button>
        </div>

        {/* Script Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-blue-900">Tu Guion:</label>
          <Textarea
            value={script}
            onChange={(e) => {
              setScript(e.target.value);
              setCalculated(false);
            }}
            placeholder="Pega aquí tu guion..."
            className="min-h-[200px] border-blue-200 focus:border-blue-400"
          />
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          disabled={!script.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <Clock className="h-4 w-4 mr-2" />
          Calcular Duración
        </Button>

        {/* Results */}
        {calculated && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-blue-200 bg-white">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-900">{words}</p>
                  <p className="text-xs text-blue-700">Palabras</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-white">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-900">{Math.round(durationSeconds)}s</p>
                  <p className="text-xs text-blue-700">Duración</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-white">
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-900">{targetSeconds}s</p>
                  <p className="text-xs text-blue-700">Objetivo</p>
                </CardContent>
              </Card>
            </div>

            {/* Status */}
            {status && (
              <div className={`p-4 rounded-lg border-2 ${status.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  {status.status === 'perfect' ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" />
                  )}
                  <p className="font-bold text-lg">{status.label}</p>
                </div>
                <p className="text-lg">{status.message}</p>
                {status.status === 'perfect' && (
                  <p className="text-sm mt-2 opacity-80">
                    Rango aceptable: {Math.round(targetSeconds * 0.9)}s - {Math.round(targetSeconds * 1.1)}s
                  </p>
                )}
              </div>
            )}

            {/* Tips */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-4 space-y-2">
                <p className="font-semibold text-blue-900 text-sm">💡 Consejos:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Lee tu guion en voz alta para verificar el ritmo</li>
                  <li>• Las pausas naturales añaden 5-10% al tiempo total</li>
                  <li>• Los números y siglas pueden tardar más en locución</li>
                  <li>• Deja 2-3 segundos al inicio y final del vídeo</li>
                </ul>
              </CardContent>
            </Card>

            <Button onClick={handleReset} variant="outline" className="w-full border-blue-300">
              Calcular Nuevo Guion
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
