'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, RefreshCw, Cpu, Zap, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Component {
  id: string;
  name: string;
  type: 'sensor' | 'actuator';
  domain: string;
}

interface Scenario {
  id: string;
  name: string;
  tag: string;
  desc: string;
  zones: string[];
  slots: string[];
}

const scenarios: Scenario[] = [
  {
    id: 'fabrica',
    name: '🏭 Fábrica Automatizada',
    tag: 'Robots, cintas y calidad',
    desc: 'Controla una planta de producción con robots, cintas transportadoras y control de calidad.',
    zones: ['Entrada de materias primas', 'Robots de soldadura', 'Horno / secado', 'Control de calidad', 'Salida de producto'],
    slots: ['Entrada', 'Cinta 1', 'Robot A', 'Robot B', 'Horno', 'Zona humos', 'Cámara calidad', 'Cinta 2', 'Salida', 'Almacén A', 'Almacén B', 'Cuadro eléctrico']
  },
  {
    id: 'cruce',
    name: '🚦 Cruce con Jardín Inteligente',
    tag: 'Tráfico, iluminación y riego',
    desc: 'Gestiona semáforos, farolas y riego del jardín en una intersección concurrida.',
    zones: ['Carril norte-sur', 'Carril este-oeste', 'Paso de peatones', 'Parque / jardín', 'Zona residencial'],
    slots: ['Semáforo N', 'Semáforo S', 'Semáforo E', 'Semáforo O', 'Paso peatones 1', 'Paso peatones 2', 'Jardín zona 1', 'Jardín zona 2', 'Farola 1', 'Farola 2', 'Farola 3', 'Cámara cruce']
  },
  {
    id: 'cadena',
    name: '⚙️ Cadena de Montaje',
    tag: 'Producción continua',
    desc: 'Una línea de montaje donde cada estación puede medir y actuar.',
    zones: ['Inicio de línea', 'Montaje mecánico', 'Montaje electrónico', 'Test final', 'Embalaje'],
    slots: ['Buffer entrada', 'Estación 1', 'Estación 2', 'Estación 3', 'Control peso', 'Control dimensiones', 'Test eléctrico', 'Test funcional', 'Rechazos', 'Embalaje', 'Pallets', 'Salida camión']
  },
  {
    id: 'almacen',
    name: '📦 Almacén Inteligente',
    tag: 'Logística y picking',
    desc: 'Gestiona estanterías, pasillos y robots de picking.',
    zones: ['Zona recepción', 'Pasillo A', 'Pasillo B', 'Zona alta rotación', 'Zona frío'],
    slots: ['Muelle 1', 'Muelle 2', 'Pasillo A1', 'Pasillo A2', 'Pasillo B1', 'Pasillo B2', 'Estantería alta', 'Zona picking', 'Zona frío', 'Sala servidores', 'Robot 1', 'Robot 2']
  },
  {
    id: 'casa',
    name: '🏠 Casa Domótica',
    tag: 'Confort y energía',
    desc: 'Automatiza luces, persianas, climatización y seguridad en una vivienda.',
    zones: ['Salón', 'Cocina', 'Dormitorio', 'Baño', 'Terraza'],
    slots: ['Puerta principal', 'Ventana salón', 'Ventana dormitorio', 'Pasillo', 'Techo salón', 'Techo dormitorio', 'Jardín', 'Garaje', 'Caldera', 'Termostato', 'Detector presencia', 'Cámara puerta']
  },
  {
    id: 'invernadero',
    name: '🌱 Invernadero / Huerto 4.0',
    tag: 'Agrotech',
    desc: 'Controla riego, clima y luz en un invernadero productivo.',
    zones: ['Zona tomates', 'Zona lechugas', 'Zona flores', 'Depósito agua', 'Sala de control'],
    slots: ['Suelo zona 1', 'Suelo zona 2', 'Suelo zona 3', 'Techo 1', 'Techo 2', 'Lateral 1', 'Lateral 2', 'Depósito', 'Entrada aire', 'Salida aire', 'Panel solar', 'Cuadro bombas']
  }
];

const components: Component[] = [
  { id: 'temp', name: '🌡️ Sensor de temperatura', type: 'sensor', domain: 'clima' },
  { id: 'hum', name: '💧 Sensor de humedad', type: 'sensor', domain: 'clima' },
  { id: 'light', name: '☀️ Sensor de luz', type: 'sensor', domain: 'luz' },
  { id: 'presence', name: '👤 Sensor de presencia', type: 'sensor', domain: 'personas' },
  { id: 'weight', name: '⚖️ Celda de carga / peso', type: 'sensor', domain: 'proceso' },
  { id: 'flow', name: '🌊 Sensor de caudal', type: 'sensor', domain: 'flujo' },
  { id: 'camera', name: '📷 Cámara con visión', type: 'sensor', domain: 'visión' },
  { id: 'vibration', name: '〰️ Sensor de vibración', type: 'sensor', domain: 'mantenimiento' },
  { id: 'relay', name: '🔌 Relé de potencia', type: 'actuator', domain: 'control' },
  { id: 'valve', name: '🚰 Válvula de riego', type: 'actuator', domain: 'agua' },
  { id: 'motor', name: '⚙️ Motor / cinta', type: 'actuator', domain: 'movimiento' },
  { id: 'lightAct', name: '💡 Control de iluminación', type: 'actuator', domain: 'luz' },
  { id: 'hvac', name: '🌡️ Climatización (HVAC)', type: 'actuator', domain: 'clima' },
  { id: 'alarm', name: '🚨 Alarma / sirena', type: 'actuator', domain: 'seguridad' }
];

export default function AutomationLabGame() {
  const [currentScenario, setCurrentScenario] = useState('fabrica');
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<number, string>>({});

  const handleSlotClick = (index: number) => {
    if (!currentTool) {
      // Si no hay herramienta seleccionada, quitar componente
      const newPlaced = { ...placed };
      delete newPlaced[index];
      setPlaced(newPlaced);
      return;
    }

    setPlaced(prev => ({ ...prev, [index]: currentTool }));
  };

  const clearScenario = () => {
    setPlaced({});
    setCurrentTool(null);
  };

  const currentScenarioData = scenarios.find(s => s.id === currentScenario)!;
  const placedEntries = Object.entries(placed);
  
  // Calcular métricas
  const actuators = placedEntries.filter(([, compId]) => {
    const comp = components.find(c => c.id === compId);
    return comp?.type === 'actuator';
  }).length;

  const sensors = placedEntries.filter(([, compId]) => {
    const comp = components.find(c => c.id === compId);
    return comp?.type === 'sensor';
  }).length;

  const domains = new Set(placedEntries.map(([, compId]) => {
    const comp = components.find(c => c.id === compId);
    return comp?.domain;
  })).size;

  const autoScore = Math.min(10, Math.round(actuators * 2 + placedEntries.length * 0.4));
  const mlScore = Math.min(10, Math.round(sensors * 1.2 + domains * 1.2));

  return (
    <Card className="border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CardHeader className="pb-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Cpu className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400">🔬 Laboratorio de Automatización e IA</h3>
              <p className="text-sm text-slate-400">Diseña sensores, actuadores y escenarios para machine learning físico</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
              IA • Machine Learning • IoT
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Escenarios */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            Elige el mundo a automatizar
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {scenarios.map(scenario => (
              <Button
                key={scenario.id}
                onClick={() => {
                  setCurrentScenario(scenario.id);
                  setPlaced({});
                  setCurrentTool(null);
                }}
                variant={currentScenario === scenario.id ? 'default' : 'outline'}
                className={cn(
                  'flex flex-col items-start gap-1 h-auto py-2 px-3 text-xs',
                  currentScenario === scenario.id
                    ? 'bg-cyan-600 hover:bg-cyan-700'
                    : 'border-slate-600 hover:bg-slate-800'
                )}
              >
                <span className="font-semibold">{scenario.name}</span>
                <span className="text-xs text-slate-400">{scenario.tag}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Componentes */}
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-green-400" />
            Sensores y Actuadores - Pulsa uno y colócalo en el mapa
          </h4>
          <ScrollArea className="h-[180px] border border-slate-700 rounded-lg p-3 bg-slate-800/50">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {components.map(comp => (
                <Button
                  key={comp.id}
                  onClick={() => setCurrentTool(comp.id)}
                  variant={currentTool === comp.id ? 'default' : 'outline'}
                  className={cn(
                    'flex flex-col items-start gap-0.5 h-auto py-2 px-2 text-xs',
                    currentTool === comp.id
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'border-slate-600 hover:bg-slate-800'
                  )}
                >
                  <span className="font-medium text-xs">{comp.name}</span>
                  <div className="flex gap-2 text-xs text-slate-400">
                    <span>{comp.type === 'sensor' ? '🔍' : '⚙️'} {comp.type === 'sensor' ? 'Sensor' : 'Actuador'}</span>
                    <span>•</span>
                    <span>{comp.domain}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Mapa del escenario */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Escenario Grid */}
          <Card className="lg:col-span-2 border-slate-700 bg-slate-800/50">
            <CardHeader className="py-2 px-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-slate-200">{currentScenarioData.name}</h4>
                  <p className="text-xs text-slate-400">{currentScenarioData.desc}</p>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  {currentScenarioData.tag}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              {/* Zonas */}
              <div className="flex flex-wrap gap-1 mb-3">
                {currentScenarioData.zones.map((zone, idx) => (
                  <Badge key={idx} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {zone}
                  </Badge>
                ))}
              </div>
              
              {/* Grid de slots */}
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {currentScenarioData.slots.map((label, index) => {
                  const compId = placed[index];
                  const comp = compId ? components.find(c => c.id === compId) : null;
                  
                  return (
                    <Button
                      key={index}
                      onClick={() => handleSlotClick(index)}
                      variant="outline"
                      className={cn(
                        'flex flex-col items-start gap-1 h-20 p-2 text-xs justify-start',
                        comp
                          ? comp.type === 'sensor'
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-green-500 bg-green-500/10'
                          : 'border-slate-600 hover:bg-slate-800'
                      )}
                    >
                      <span className="font-medium text-xs text-left">{label}</span>
                      {comp ? (
                        <>
                          <span className="text-xs text-slate-400 truncate w-full">
                            {comp.type === 'sensor' ? '🔍' : '⚙️'} {comp.name}
                          </span>
                          <Badge className="text-xs bg-slate-700">
                            {comp.type === 'sensor' ? 'Sensor' : 'Actuador'}
                          </Badge>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500">Slot {index + 1}</span>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Instrucciones */}
              <div className="mt-3 p-3 bg-slate-900/50 border border-slate-700 rounded-lg text-xs text-slate-400">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                1. Elige un sensor/actuador arriba • 2. Haz clic en un slot para colocarlo • 3. Observa cómo cambia el nivel de automatización y ML
              </div>
            </CardContent>
          </Card>

          {/* Panel de métricas */}
          <Card className="border-slate-700 bg-slate-800/50">
            <CardHeader className="py-2 px-3">
              <h4 className="font-semibold text-slate-200 text-sm flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400" />
                Inteligencia del Sistema
              </h4>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-3">
              {/* Nivel de automatización */}
              <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Nivel de automatización</span>
                  <span className="text-lg font-bold text-cyan-400">{autoScore} / 10</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${autoScore * 10}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {autoScore <= 3 ? 'Poca automatización' : autoScore <= 7 ? 'Automatización media' : 'Alta automatización'}
                </p>
              </div>

              {/* Potencial de ML */}
              <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Potencial de ML/DL</span>
                  <span className="text-lg font-bold text-green-400">{mlScore} / 10</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${mlScore * 10}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {mlScore <= 3 ? 'Poco potencial de ML' : mlScore <= 7 ? 'Buen punto de partida' : 'Alto potencial de ML/DL'}
                </p>
              </div>

              {/* Componentes colocados */}
              <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg max-h-[150px] overflow-auto">
                <h5 className="text-xs font-semibold text-slate-400 mb-2">Mapa de sensores y actuadores</h5>
                {placedEntries.length === 0 ? (
                  <p className="text-xs text-slate-500">Aún no hay componentes colocados</p>
                ) : (
                  <div className="space-y-1">
                    {placedEntries.map(([idx, compId]) => {
                      const comp = components.find(c => c.id === compId);
                      const slotLabel = currentScenarioData.slots[parseInt(idx)];
                      return (
                        <div key={idx} className="text-xs flex justify-between items-center">
                          <span className="text-slate-300">{comp?.name}</span>
                          <Badge variant="outline" className="text-xs border-slate-600">
                            {slotLabel}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2">
                <Button
                  onClick={clearScenario}
                  variant="outline"
                  className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-700">
          Creado por <strong className="text-cyan-400">Diego Gómez Marín</strong>
        </div>
      </CardContent>
    </Card>
  );
}
