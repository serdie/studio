'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Brain, Target, AlertTriangle } from 'lucide-react';

interface Question {
  text: string;
  answer: string;
  explanation: string;
}

interface HypeQuestion {
  text: string;
  answer: 'Hype' | 'Realidad';
  exp: string;
}

export default function ProjectNeural() {
  const [score, setScore] = useState(0);
  const [currentModule, setCurrentModule] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  
  // Lab state
  const [dataVolume, setDataVolume] = useState(50);
  const [dataDiversity, setDataDiversity] = useState(50);
  const [labResults, setLabResults] = useState<string>('');

  // Module 1 Questions
  const m1Questions: Question[] = [
    { text: "Contar facturas y pasarlas de un Excel a un PDF automáticamente.", answer: "Automatización", explanation: "Sigue reglas fijas (Si A, entonces B). No hay aprendizaje." },
    { text: "Mostrar los picos de tráfico web del último mes en un dashboard interactivo.", answer: "Analítica", explanation: "Solo visualiza datos pasados, no predice ni aprende por sí solo." },
    { text: "Predecir qué clientes se darán de baja el próximo mes basándose en su historial de compras.", answer: "Machine Learning", explanation: "Usa datos pasados para encontrar patrones e inferir el futuro." },
    { text: "Enviar un email de bienvenida exactamente 5 minutos después de que un usuario se registre.", answer: "Automatización", explanation: "Es un flujo de trabajo programado (RPA), no requiere IA." },
    { text: "Un chatbot que redacta desde cero cláusulas legales adaptadas al tono de tu empresa.", answer: "IA Generativa", explanation: "Crea contenido nuevo y no estructurado a partir de patrones." },
    { text: "Clasificar automáticamente correos en 'Spam' o 'Importantes' habiendo analizado millones de ejemplos previos.", answer: "Machine Learning", explanation: "Modelo predictivo clásico basado en entrenamiento previo." }
  ];

  // Module 2 Questions
  const m2Questions: HypeQuestion[] = [
    { text: "Una IA que predice el éxito de tu empresa al 100% sin ningún margen de error.", answer: "Hype", exp: "Falso. La IA maneja probabilidades estadísticas, no certezas absolutas." },
    { text: "Un modelo de visión artificial que detecta micro-defectos en piezas de una cadena de montaje.", answer: "Realidad", exp: "Es una IA Estrecha (ANI) con un caso de uso clásico y comprobado." },
    { text: "IA con consciencia propia que liderará equipos de humanos y tomará decisiones corporativas por sí sola.", answer: "Hype", exp: "Eso es AGI (IA Fuerte), actualmente solo existe en ciencia ficción." },
    { text: "Un sistema experto de los años 80 basado en árboles de decisiones vendido como 'La IA moderna definitiva'.", answer: "Hype", exp: "Falso. Es una ola de IA antigua, la ola actual está liderada por el Machine/Deep Learning." },
    { text: "Asistente virtual especializado que agenda y modifica citas médicas 24/7 de forma autónoma.", answer: "Realidad", exp: "Automatización inteligente aplicable y muy común hoy en día." },
    { text: "Un coche con Nivel 5 de autonomía total (donde puedes dormir mientras conduce) disponible hoy en cualquier concesionario.", answer: "Hype", exp: "Falso. Aún estamos escalando los niveles de autonomía (mayormente Nivel 2 y 3 comercial)." },
    { text: "Usar Deep Learning para analizar miles de radiografías y ayudar al médico a detectar anomalías ocultas.", answer: "Realidad", exp: "Aplicación excelente: asiste al experto humano, no lo reemplaza." }
  ];

  const updateScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentModule(1);
    setCurrentQuestion(0);
    setScore(0);
  };

  const checkAnswer = (selected: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const correct = m1Questions[currentQuestion].answer;
    
    if (selected === correct) {
      updateScore(100);
      setFeedback({ 
        text: `¡Correcto! ${m1Questions[currentQuestion].explanation}`, 
        type: 'success' 
      });
    } else {
      updateScore(-50);
      setFeedback({ 
        text: `Error. La respuesta era ${correct}. ${m1Questions[currentQuestion].explanation}`, 
        type: 'error' 
      });
    }
    
    setTimeout(() => {
      setFeedback(null);
      setIsProcessing(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < m1Questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setCurrentModule(2);
        setCurrentQuestion(0);
      }
    }, 3000);
  };

  const checkHype = (selected: 'Hype' | 'Realidad') => {
    if (isProcessing) return;
    setIsProcessing(true);

    const correct = m2Questions[currentQuestion].answer;
    
    if (selected === correct) {
      updateScore(150);
      setFeedback({ 
        text: `¡Bien visto! ${m2Questions[currentQuestion].exp}`, 
        type: 'success' 
      });
    } else {
      updateScore(-50);
      setFeedback({ 
        text: `Caíste en la trampa. Era ${correct}. ${m2Questions[currentQuestion].exp}`, 
        type: 'error' 
      });
    }
    
    setTimeout(() => {
      setFeedback(null);
      setIsProcessing(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < m2Questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setCurrentModule(3);
      }
    }, 3500);
  };

  const deployModel = () => {
    setLabResults("> Compilando modelo...\n> Entrenando red neuronal...\n> Calculando inferencia...");

    setTimeout(() => {
      let resultText = '';
      if (dataVolume < 40) {
        resultText = "> ERROR CRÍTICO: Underfitting. Muy pocos datos. El modelo no puede aprender patrones reales.";
        updateScore(-150);
      } else if (dataDiversity < 40) {
        resultText = `> ALERTA ÉTICA: El modelo genera sesgo y discrimina usuarios porque la diversidad es solo del ${dataDiversity}%.`;
        updateScore(-150);
      } else if (dataVolume >= 75 && dataDiversity >= 75) {
        resultText = "> ÉXITO TOTAL: Modelo entrenado y generalizado correctamente. Resultados precisos sin sesgos evidentes.";
        updateScore(400);
      } else {
        resultText = "> OK: El modelo funciona en inferencia, pero hay margen de mejora en la limpieza de datos.";
        updateScore(150);
      }
      
      setLabResults(prev => prev + "\n" + resultText);
      
      setTimeout(() => {
        setGameState('finished');
      }, 4000);
    }, 1500);
  };

  const getFinalMessage = () => {
    if (score > 1500) {
      return { text: "¡Nivel Leyenda! Tienes el criterio perfecto para liderar la próxima revolución de la IA.", color: "text-green-500" };
    } else if (score > 800) {
      return { text: "¡Buen trabajo! Sabes distinguir el humo de la realidad, aunque tu laboratorio necesita ajustes.", color: "text-yellow-500" };
    } else {
      return { text: "La empresa ha quebrado. Te dejaste llevar por el Hype o tus modelos estaban llenos de sesgos. ¡Toca repasar la teoría!", color: "text-red-500" };
    }
  };

  // Intro Screen
  if (gameState === 'intro') {
    return (
      <Card className="border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <Brain className="h-16 w-16 mx-auto text-cyan-400" />
            <h2 className="text-3xl font-bold text-cyan-400">Project NEURAL</h2>
            <p className="text-slate-300 text-lg">AI Training Simulator</p>
          </div>
          
          <div className="space-y-4 text-slate-300">
            <p>Es el año 2030. Acabas de fundar tu startup tecnológica. Para sobrevivir, debes dominar los fundamentos de la Inteligencia Artificial, evitar el &quot;Hype&quot; comercial y crear modelos éticos.</p>
            <p>Tus clientes exigirán soluciones. Tus inversores buscarán la verdad. Tu laboratorio requerirá precisión.</p>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={startGame} 
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg"
            >
              Iniciar Simulación
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Finished Screen
  if (gameState === 'finished') {
    const finalMsg = getFinalMessage();
    return (
      <Card className="border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-4">
            <Trophy className="h-16 w-16 mx-auto text-cyan-400" />
            <h2 className="text-3xl font-bold text-cyan-400">Simulación Completada</h2>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-slate-300 text-lg">Has finalizado tu entrenamiento fundacional como CTO.</p>
            <div className="bg-slate-800 rounded-lg p-6">
              <p className="text-4xl font-bold text-cyan-400">{score} XP</p>
              <p className={`text-lg font-semibold mt-4 ${finalMsg.color}`}>{finalMsg.text}</p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={startGame} 
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg"
            >
              Reiniciar Simulación
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Game Screens
  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-800">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-cyan-400">
              Módulo {currentModule}: {currentModule === 1 ? 'El Diagnóstico' : currentModule === 2 ? 'Radar de Hype' : 'El Laboratorio'}
            </h3>
            <p className="text-sm text-slate-400">Pregunta {currentQuestion + 1}</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
            <Trophy className="h-5 w-5 text-purple-400" />
            <span className="text-lg font-bold text-purple-400">{score} XP</span>
          </div>
        </div>

        {/* Module 1: Sorter */}
        {currentModule === 1 && (
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-dashed border-slate-600 min-h-[120px] flex items-center justify-center text-center">
              <p className="text-lg text-slate-200">&quot;{m1Questions[currentQuestion].text}&quot;</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => checkAnswer('Automatización')}
                disabled={isProcessing}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                Automatización
              </Button>
              <Button 
                onClick={() => checkAnswer('Analítica')}
                disabled={isProcessing}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                Analítica
              </Button>
              <Button 
                onClick={() => checkAnswer('Machine Learning')}
                disabled={isProcessing}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                Machine Learning
              </Button>
              <Button 
                onClick={() => checkAnswer('IA Generativa')}
                disabled={isProcessing}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                IA Generativa
              </Button>
            </div>
          </div>
        )}

        {/* Module 2: Hype Detector */}
        {currentModule === 2 && (
          <div className="space-y-4">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-dashed border-slate-600 min-h-[120px] flex items-center justify-center text-center">
              <p className="text-lg text-slate-200">Pitch: &quot;{m2Questions[currentQuestion].text}&quot;</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => checkHype('Hype')}
                disabled={isProcessing}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
              >
                🔴 Es puro HYPE
              </Button>
              <Button 
                onClick={() => checkHype('Realidad')}
                disabled={isProcessing}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-600 hover:text-white"
              >
                🟢 Es REALIDAD
              </Button>
            </div>
          </div>
        )}

        {/* Module 3: Lab */}
        {currentModule === 3 && (
          <div className="space-y-4">
            <p className="text-slate-300">
              Ajusta los parámetros para entrenar tu modelo final de reconocimiento predictivo. 
              Cuidado con el <strong className="text-red-400">sesgo</strong> y busca una buena <strong className="text-green-400">generalización</strong>.
            </p>
            
            <div className="space-y-4 bg-slate-800 p-4 rounded-lg">
              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Volumen de Datos (Dataset Size)</span>
                  <span className="text-cyan-400 font-bold">{dataVolume}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dataVolume}
                  onChange={(e) => setDataVolume(parseInt(e.target.value))}
                  className="w-full mt-2 accent-cyan-500"
                />
              </div>
              
              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Diversidad de los Datos (Para evitar Sesgo)</span>
                  <span className="text-purple-400 font-bold">{dataDiversity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dataDiversity}
                  onChange={(e) => setDataDiversity(parseInt(e.target.value))}
                  className="w-full mt-2 accent-purple-500"
                />
              </div>
            </div>

            <Button 
              onClick={deployModel}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg"
            >
              Ejecutar Inferencia
            </Button>

            {labResults && (
              <div className="bg-black p-4 rounded-lg font-mono text-sm text-green-400 whitespace-pre-line">
                {labResults}
              </div>
            )}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-lg text-center font-semibold ${
            feedback.type === 'success' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
              : 'bg-red-500/20 text-red-400 border border-red-500/50'
          }`}>
            {feedback.text}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
