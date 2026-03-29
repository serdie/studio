'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle2, 
  XCircle, 
  Target,
  Brain,
  Search,
  MessageSquare,
  ShoppingCart,
  HelpCircle,
  Settings,
  CreditCard,
  Package,
  User,
  Clock,
  TrendingUp
} from 'lucide-react';

interface IntentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  examples: string[];
}

interface UserUtterance {
  id: number;
  text: string;
  correctIntent: string;
}

const intentCategories: IntentCategory[] = [
  {
    id: 'consultar_vacaciones',
    name: 'Consultar Vacaciones',
    description: 'Información sobre días de vacaciones disponibles',
    icon: 'Clock',
    color: 'bg-blue-600',
    examples: ['¿Cuántas vacaciones me quedan?', 'Días de vacaciones disponibles', 'Ver mi saldo de vacaciones']
  },
  {
    id: 'reset_password',
    name: 'Reset de Contraseña',
    description: 'Restablecer o cambiar contraseña de acceso',
    icon: 'Settings',
    color: 'bg-red-600',
    examples: ['He olvidado mi contraseña', 'Resetear password', 'Cambiar mi clave de acceso']
  },
  {
    id: 'estado_pedido',
    name: 'Estado de Pedido',
    description: 'Consultar el estado de un pedido o envío',
    icon: 'Package',
    color: 'bg-green-600',
    examples: ['¿Dónde está mi pedido?', 'Tracking de mi envío', 'Cuándo llega mi compra']
  },
  {
    id: 'factura',
    name: 'Facturación',
    description: 'Consultar, descargar o modificar facturas',
    icon: 'CreditCard',
    color: 'bg-purple-600',
    examples: ['Necesito mi factura', 'Descargar factura del mes pasado', '¿Me puedes enviar la factura?']
  },
  {
    id: 'producto_info',
    name: 'Información de Producto',
    description: 'Detalles, características o disponibilidad de productos',
    icon: 'ShoppingCart',
    color: 'bg-orange-600',
    examples: ['¿Qué características tiene este producto?', '¿Tenéis esto en stock?', 'Información sobre el iPhone 15']
  },
  {
    id: 'reembolso',
    name: 'Reembolsos y Devoluciones',
    description: 'Política y proceso de devoluciones',
    icon: 'TrendingUp',
    color: 'bg-pink-600',
    examples: ['Quiero devolver este producto', '¿Cómo solicito un reembolso?', 'Política de devoluciones']
  },
  {
    id: 'cita_previa',
    name: 'Cita Previa',
    description: 'Reservar o modificar citas',
    icon: 'Clock',
    color: 'bg-cyan-600',
    examples: ['Quiero pedir cita', 'Reservar una reunión', 'Cancelar mi cita del viernes']
  },
  {
    id: 'soporte_tecnico',
    name: 'Soporte Técnico',
    description: 'Problemas técnicos o incidencias',
    icon: 'Settings',
    color: 'bg-yellow-600',
    examples: ['No me funciona la aplicación', 'Tengo un problema técnico', 'Error al iniciar sesión']
  },
  {
    id: 'informacion_general',
    name: 'Información General',
    description: 'Preguntas frecuentes sobre la empresa o servicios',
    icon: 'HelpCircle',
    color: 'bg-indigo-600',
    examples: ['¿Cuál es vuestro horario?', '¿Dónde estáis ubicados?', 'Qué servicios ofrecéis']
  },
  {
    id: 'cuenta_usuario',
    name: 'Gestión de Cuenta',
    description: 'Modificar datos personales o preferencias',
    icon: 'User',
    color: 'bg-emerald-600',
    examples: ['Cambiar mi email', 'Actualizar mis datos', 'Modificar mi dirección']
  }
];

const userUtterances: UserUtterance[] = [
  { id: 1, text: '¿Cuántos días de vacaciones me quedan este año?', correctIntent: 'consultar_vacaciones' },
  { id: 2, text: 'He olvidado mi contraseña y no puedo entrar', correctIntent: 'reset_password' },
  { id: 3, text: 'Mi pedido número 12345, ¿cuándo llega?', correctIntent: 'estado_pedido' },
  { id: 4, text: 'Necesito la factura de diciembre para contabilidad', correctIntent: 'factura' },
  { id: 5, text: 'Este móvil tiene cámara de cuántos megapíxeles?', correctIntent: 'producto_info' },
  { id: 6, text: 'Quiero devolver estos zapatos, me quedan pequeños', correctIntent: 'reembolso' },
  { id: 7, text: 'Quisiera reservar una cita para el próximo martes', correctIntent: 'cita_previa' },
  { id: 8, text: 'La app se cierra cada vez que intento pagar', correctIntent: 'soporte_tecnico' },
  { id: 9, text: '¿A qué hora abrís los sábados?', correctIntent: 'informacion_general' },
  { id: 10, text: 'Quiero cambiar mi correo electrónico de contacto', correctIntent: 'cuenta_usuario' },
  { id: 11, text: 'No me acuerdo de mi password, ayuda', correctIntent: 'reset_password' },
  { id: 12, text: '¿Podéis enviarme la factura a este email?', correctIntent: 'factura' },
  { id: 13, text: '¿Tenéis este producto en talla M?', correctIntent: 'producto_info' },
  { id: 14, text: '¿Cómo puedo trackear mi envío?', correctIntent: 'estado_pedido' },
  { id: 15, text: 'Me gustaría cancelar la cita que tengo mañana', correctIntent: 'cita_previa' }
];

export default function IntentClassifier() {
  const [currentUtterance, setCurrentUtterance] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [customUtterance, setCustomUtterance] = useState('');
  const [customMode, setCustomMode] = useState(false);

  const handleIntentSelect = (intentId: string) => {
    setSelectedIntent(intentId);
    const isCorrect = intentId === userUtterances[currentUtterance].correctIntent;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const nextUtterance = () => {
    if (currentUtterance < userUtterances.length - 1) {
      setCurrentUtterance(currentUtterance + 1);
      setSelectedIntent(null);
      setShowExplanation(false);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentUtterance(0);
    setScore(0);
    setSelectedIntent(null);
    setShowExplanation(false);
    setGameFinished(false);
    setCustomMode(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="h-5 w-5" />;
      case 'Settings': return <Settings className="h-5 w-5" />;
      case 'Package': return <Package className="h-5 w-5" />;
      case 'CreditCard': return <CreditCard className="h-5 w-5" />;
      case 'ShoppingCart': return <ShoppingCart className="h-5 w-5" />;
      case 'TrendingUp': return <TrendingUp className="h-5 w-5" />;
      case 'HelpCircle': return <HelpCircle className="h-5 w-5" />;
      case 'User': return <User className="h-5 w-5" />;
      case 'Brain': return <Brain className="h-5 w-5" />;
      case 'MessageSquare': return <MessageSquare className="h-5 w-5" />;
      case 'Target': return <Target className="h-5 w-5" />;
      case 'Search': return <Search className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  const correctIntentData = intentCategories.find(c => c.id === userUtterances[currentUtterance].correctIntent);

  if (gameFinished) {
    const percentage = (score / userUtterances.length) * 100;
    
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <Target className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-white">
            ¡Clasificación Completada!
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Has clasificado {userUtterances.length} expresiones de usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400 mb-2">
              {score}/{userUtterances.length}
            </div>
            <p className="text-slate-300">
              {percentage === 100 ? '🏆 ¡Perfecto! Eres un experto en NLP' :
               percentage >= 80 ? '✅ ¡Excelente! Dominas la clasificación de intents' :
               percentage >= 60 ? '👍 Bien, conoces los conceptos básicos' :
               '📚 Repasa los diferentes tipos de intents'}
            </p>
          </div>

          <Progress value={percentage} className="h-3 bg-slate-700" />

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-green-900/30 border-green-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-400">{score}</p>
                <p className="text-sm text-green-300">Clasificaciones Correctas</p>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-700">
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-red-400">{userUtterances.length - score}</p>
                <p className="text-sm text-red-300">Errores</p>
              </CardContent>
            </Card>
          </div>

          <Button onClick={restartGame} className="w-full bg-blue-600 hover:bg-blue-700">
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  const utterance = userUtterances[currentUtterance];

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-white">Clasificador de Intents</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-900/50 text-green-300 border-green-700">
              Aciertos: {score}
            </Badge>
            <Badge variant="outline" className="bg-blue-900/50 text-blue-300 border-blue-700">
              {currentUtterance + 1}/{userUtterances.length}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-300">
          Clasifica la expresión del usuario en el intent correcto
        </CardDescription>
        <Progress value={(currentUtterance / userUtterances.length) * 100} className="h-2 mt-4 bg-slate-700" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Expresión del Usuario:</h3>
          </div>
          <p className="text-xl text-slate-100 bg-slate-800/50 p-6 rounded-lg border border-slate-600 text-center">
            "{utterance.text}"
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {intentCategories.map((category) => {
            const isSelected = selectedIntent === category.id;
            const isCorrect = category.id === utterance.correctIntent;
            
            return (
              <Card
                key={category.id}
                onClick={() => !showExplanation && handleIntentSelect(category.id)}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  showExplanation && isCorrect
                    ? 'bg-green-900/50 border-green-500 ring-2 ring-green-500'
                    : showExplanation && isSelected && !isCorrect
                    ? 'bg-red-900/50 border-red-500 ring-2 ring-red-500'
                    : 'bg-slate-800/50 border-slate-600 hover:border-blue-500'
                }`}
              >
                <CardContent className="p-4 space-y-2">
                  <div className={`inline-flex items-center gap-2 ${category.color} text-white px-3 py-1 rounded-full text-sm`}>
                    {getIcon(category.icon)}
                    <span className="font-semibold">{category.name}</span>
                  </div>
                  <p className="text-xs text-slate-400">{category.description}</p>
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {showExplanation && (
          <Card className="bg-slate-800/50 border-slate-600 animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                Explicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                {selectedIntent === utterance.correctIntent ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <p className="text-slate-200">
                  <span className="font-semibold">Intent correcto:</span> {correctIntentData?.name}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-slate-400 mb-2">Ejemplos similares:</p>
                <div className="flex flex-wrap gap-2">
                  {correctIntentData?.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-700 text-slate-200 border-slate-600">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={nextUtterance} className="w-full bg-blue-600 hover:bg-blue-700">
                {currentUtterance < userUtterances.length - 1 ? 'Siguiente Expresión' : 'Ver Resultados'}
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
