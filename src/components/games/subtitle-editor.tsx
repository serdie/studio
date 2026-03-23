'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, RotateCcw, Award, FileText } from 'lucide-react';

interface SubtitleExercise {
  id: number;
  original: string;
  issues: string[];
  correctMaxLength: number;
  hint: string;
}

const exercises: SubtitleExercise[] = [
  {
    id: 1,
    original: 'Este es un subtítulo demasiado largo que tiene más de cuarenta y dos caracteres y debería dividirse en dos líneas para que sea legible',
    issues: ['Más de 42 caracteres por línea', 'Demasiadas palabras en una línea'],
    correctMaxLength: 42,
    hint: 'Divide en 2 líneas de máximo 42 caracteres cada una'
  },
  {
    id: 2,
    original: 'La reunión es mañana a las nueve',
    issues: [],
    correctMaxLength: 42,
    hint: 'Este subtítulo está bien. Longitud correcta.'
  },
  {
    id: 3,
    original: 'Bienvenidos a nuestra empresa, hoy vamos a conocer los valores que nos definen y lo que nos hace únicos en el mercado actual tan competitivo',
    issues: ['Más de 42 caracteres', 'Más de 2 líneas', 'Demasiada información'],
    correctMaxLength: 42,
    hint: 'Divide en 2-3 subtítulos más cortos'
  },
  {
    id: 4,
    original: 'Pulsa el botón rojo',
    issues: [],
    correctMaxLength: 42,
    hint: 'Subtítulo correcto. Corto y claro.'
  },
  {
    id: 5,
    original: 'Para proceder con la instalación del software es necesario que acepte los términos y condiciones del contrato de licencia de usuario final que se muestra a continuación en la pantalla',
    issues: ['Extremadamente largo', 'Más de 80 caracteres', 'Ilegible'],
    correctMaxLength: 42,
    hint: 'Divide en 4-5 subtítulos cortos'
  }
];

export default function SubtitleEditor() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const startGame = () => {
    setGameState('playing');
    setCurrentExercise(0);
    setUserInput('');
    setShowFeedback(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const checkSubtitle = () => {
    const exercise = exercises[currentExercise];
    const lines = userInput.split('\n').filter(l => l.trim());
    const allLinesValid = lines.every(line => line.length <= exercise.correctMaxLength);
    const hasCorrectLines = exercise.issues.length === 0 && userInput.trim() === exercise.original.trim();
    const hasFixedIssues = exercise.issues.length > 0 && allLinesValid && lines.length <= 2;

    setShowFeedback(true);
    
    if (hasCorrectLines || hasFixedIssues) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setUserInput('');
      setShowFeedback(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentExercise(0);
    setUserInput('');
    setShowFeedback(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader className="text-center">
          <div className="h-20 w-20 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">📝 Subtitle Editor</h3>
          <p className="text-purple-700 mt-2">
            Corrige subtítulos siguiendo estándares profesionales
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white/70 p-4 rounded-lg border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3">📋 Reglas de Subtitulado:</h4>
            <ul className="space-y-2 text-purple-800 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                Máximo 42 caracteres por línea
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                Máximo 2 líneas por subtítulo
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                Duración: 1-6 segundos en pantalla
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                Sin faltas de ortografía
              </li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full bg-purple-600 hover:bg-purple-700 h-14 text-lg">
            <FileText className="h-5 w-5 mr-2" />
            Comenzar Editor de Subtítulos
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Completed Screen
  if (gameState === 'completed') {
    const percentage = (score.correct / exercises.length) * 100;
    const passed = percentage >= 70;

    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <CardHeader className="text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
            <Award className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-purple-900">
            {passed ? '🎉 ¡Subtitulador Experto!' : '📚 Sigue Practicando'}
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{passed ? '🌟' : '📖'}</div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-purple-900">
                Aciertos: {score.correct} / {exercises.length}
              </p>
              <p className="text-lg text-purple-700">
                {percentage.toFixed(0)}% de precisión
              </p>
            </div>
          </div>

          <Button onClick={resetGame} className="w-full bg-purple-600 hover:bg-purple-700">
            <RotateCcw className="h-4 w-4 mr-2" />
            Volver a Empezar
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Playing Screen
  const exercise = exercises[currentExercise];
  const charCount = userInput.length;
  const lineCount = userInput.split('\n').filter(l => l.trim()).length;
  const isTooLong = charCount > exercise.correctMaxLength;
  const isTooManyLines = lineCount > 2;

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-purple-500">
            <FileText className="h-3 w-3 mr-1" />
            Ejercicio {currentExercise + 1} de {exercises.length}
          </Badge>
          <div className="flex gap-2">
            <Badge className="bg-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {score.correct}
            </Badge>
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              {score.incorrect}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-purple-200">
          <h4 className="font-bold text-purple-900 mb-2">Subtítulo Original:</h4>
          <p className="text-purple-800 italic mb-3">"{exercise.original}"</p>
          
          {exercise.issues.length > 0 ? (
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <p className="font-semibold text-red-900 mb-2">⚠️ Problemas detectados:</p>
              <ul className="text-sm text-red-800 space-y-1">
                {exercise.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="font-semibold text-green-900">✅ Este subtítulo está correcto</p>
            </div>
          )}
        </div>

        {!showFeedback ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-purple-900 mb-2 block">
                Corrige el subtítulo (máx 42 caracteres, 2 líneas):
              </label>
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escribe aquí el subtítulo corregido..."
                className="min-h-[100px] border-purple-200"
              />
              <div className="flex gap-4 mt-2 text-sm">
                <span className={isTooLong ? 'text-red-600 font-semibold' : 'text-green-600'}>
                  Caracteres: {charCount}/{exercise.correctMaxLength}
                </span>
                <span className={isTooManyLines ? 'text-red-600 font-semibold' : 'text-green-600'}>
                  Líneas: {lineCount}/2
                </span>
              </div>
            </div>

            <Button onClick={checkSubtitle} disabled={!userInput.trim()} className="w-full bg-purple-600 hover:bg-purple-700">
              Verificar Subtítulo
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`p-4 rounded-lg border-2 ${
              score.correct > score.incorrect ? 'bg-green-100 border-green-300' : 'bg-amber-100 border-amber-300'
            }`}>
              <p className="text-sm text-purple-800">
                <strong>Pista:</strong> {exercise.hint}
              </p>
            </div>

            <Button onClick={nextExercise} className="w-full bg-purple-600 hover:bg-purple-700">
              {currentExercise < exercises.length - 1
                ? 'Siguiente Ejercicio →'
                : 'Ver Resultados Finales'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
