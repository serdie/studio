'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, RefreshCw, Factory, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Sensor {
  id: string;
  label: string;
}

interface Zone {
  id: string;
  title: string;
  icon: string;
  idealSensors: string[];
  explanation: string;
}

const sensors: Sensor[] = [
  { id: "temp-hotend", label: "Sensor de temperatura del hotend" },
  { id: "temp-cama", label: "Sensor de temperatura de la cama" },
  { id: "filamento", label: "Sensor de presencia/corte de filamento" },
  { id: "peso-bobina", label: "Sensor de peso de bobina de filamento" },
  { id: "camara", label: "Cámara para inspección visual de piezas" },
  { id: "vibracion", label: "Sensor de vibración de la impresora" },
  { id: "proximidad", label: "Sensor de proximidad (seguridad)" },
  { id: "humedad", label: "Sensor de humedad en almacén" },
  { id: "rfid", label: "Lector RFID para pedidos/material" }
];

const zones: Zone[] = [
  {
    id: "recepcion",
    title: "1. Recepción de Pedidos",
    icon: "📦",
    idealSensors: ["rfid"],
    explanation: "En recepción de pedidos tiene sentido usar lectores RFID para identificar pedidos o palés que entran en la planta."
  },
  {
    id: "almacen",
    title: "2. Almacén de Material (Filamento)",
    icon: "📚",
    idealSensors: ["peso-bobina", "humedad", "rfid"],
    explanation: "En el almacén de material interesan sensores de peso de bobina, humedad y RFID para controlar stock y condiciones del filamento."
  },
  {
    id: "impresion",
    title: "3. Impresión (Impresora 3D)",
    icon: "🖨️",
    idealSensors: ["temp-hotend", "temp-cama", "filamento", "vibracion", "proximidad"],
    explanation: "En la zona de impresión necesitamos controlar temperaturas (hotend y cama), presencia de filamento, vibración y seguridad (proximidad)."
  },
  {
    id: "calidad",
    title: "4. Control de Calidad (Salida de Piezas)",
    icon: "✅",
    idealSensors: ["camara"],
    explanation: "En control de calidad, una cámara es clave para inspección visual automática de las piezas impresas."
  }
];

export default function FactorySensorsGame() {
  const [pool, setPool] = useState<Sensor[]>(sensors);
  const [zoneSensors, setZoneSensors] = useState<Record<string, Sensor[]>>({
    recepcion: [],
    almacen: [],
    impresion: [],
    calidad: []
  });
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Sensor | null>(null);

  const handleDragStart = (e: React.DragEvent, item: Sensor, source: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.setData('text/label', item.label);
    e.dataTransfer.setData('text/source', source);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain');
    const label = e.dataTransfer.getData('text/label');
    const source = e.dataTransfer.getData('text/source');
    
    if (!id) return;

    const sensor = { id, label };
    
    // Check if sensor already in target zone
    if (zoneSensors[zoneId].find(s => s.id === id)) return;

    // Add to target zone
    setZoneSensors(prev => ({
      ...prev,
      [zoneId]: [...prev[zoneId], sensor]
    }));

    // Remove from source
    if (source === 'pool') {
      setPool(pool.filter(s => s.id !== id));
    } else {
      setZoneSensors(prev => ({
        ...prev,
        [source]: prev[source].filter(s => s.id !== id)
      }));
    }

    setDraggedItem(null);
    
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleReturnToPool = (sensorId: string, zoneId: string) => {
    if (showResults) return;
    
    const sensor = zoneSensors[zoneId].find(s => s.id === sensorId);
    if (!sensor) return;

    setPool([...pool, sensor]);
    setZoneSensors(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter(s => s.id !== sensorId)
    }));
  };

  const checkConfig = () => {
    setShowResults(true);
  };

  const resetGame = () => {
    setPool(sensors);
    setZoneSensors({
      recepcion: [],
      almacen: [],
      impresion: [],
      calidad: []
    });
    setShowResults(false);
  };

  const isCorrectSensor = (sensorId: string, zoneId: string) => {
    if (!showResults) return false;
    const zone = zones.find(z => z.id === zoneId);
    return zone?.idealSensors.includes(sensorId);
  };

  const allPlaced = pool.length === 0;

  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-emerald-200 flex items-center justify-center">
            <Factory className="h-6 w-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900">🏭 Fábrica con Impresora 3D: ¿Qué Sensores Pondrías?</h3>
            <p className="text-sm text-emerald-700">Arrastra los sensores a la zona donde aporten más valor</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>Instrucciones:</strong> Arrastra cada tipo de sensor a la parte de la fábrica donde creas que aporta más valor. 
            Luego pulsa &quot;Corregir&quot; para ver si tu elección tiene sentido.
          </p>
        </div>

        {/* Classification Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {zones.map((zone) => (
            <Card 
              key={zone.id}
              className={cn(
                'transition-all',
                'bg-white',
                'border-2',
                zoneSensors[zone.id].length > 0 ? 'border-slate-300' : 'border-slate-400'
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
            >
              <CardHeader className="py-2 px-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{zone.icon}</span>
                  <h4 className="font-semibold text-sm text-slate-800">{zone.title}</h4>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div 
                  className={cn(
                    'min-h-[80px] rounded-lg p-2 transition-all',
                    'border-2 border-dashed',
                    zoneSensors[zone.id].length > 0 
                      ? 'border-slate-300 bg-slate-50' 
                      : 'border-slate-400 bg-white'
                  )}
                >
                  {zoneSensors[zone.id].length === 0 ? (
                    <div className="flex items-center justify-center h-16 text-slate-400 text-sm">
                      <Settings className="h-5 w-5 mr-2" />
                      Arrastra sensores aquí
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {zoneSensors[zone.id].map((sensor) => (
                        <div
                          key={sensor.id}
                          className={cn(
                            'inline-block mr-2 mb-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all',
                            'border-2',
                            showResults
                              ? isCorrectSensor(sensor.id, zone.id)
                                ? 'bg-green-100 border-green-400'
                                : 'bg-red-100 border-red-400'
                              : 'bg-blue-50 border-blue-300 hover:shadow-md hover:bg-blue-100'
                          )}
                          onClick={() => handleReturnToPool(sensor.id, zone.id)}
                          title={showResults ? (isCorrectSensor(sensor.id, zone.id) ? 'Correcto ✅' : 'Incorrecto ❌') : 'Click para devolver al pool'}
                        >
                          {sensor.label}
                          {showResults && (
                            <span className="ml-1">
                              {isCorrectSensor(sensor.id, zone.id) ? '✅' : '❌'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Explanation after correction */}
                {showResults && (
                  <div className="mt-3 p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded text-xs">
                    <p className="text-slate-700">
                      {zoneSensors[zone.id].length === 0 
                        ? `No has puesto ningún sensor aquí. ${zone.explanation}`
                        : zone.explanation
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sensors Pool */}
        {pool.length > 0 && (
          <Card className="border-slate-300 bg-white">
            <CardHeader className="py-2 px-3">
              <h4 className="font-semibold text-sm text-slate-700">
                🔧 Sensores Disponibles ({pool.length})
              </h4>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <ScrollArea className="h-[150px]">
                <div className="flex flex-wrap gap-2">
                  {pool.map((sensor) => (
                    <div
                      key={sensor.id}
                      draggable={!showResults}
                      onDragStart={(e) => handleDragStart(e, sensor, 'pool')}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs cursor-grab active:cursor-grabbing transition-all',
                        'bg-amber-50 border-2 border-amber-300 hover:shadow-md hover:bg-amber-100'
                      )}
                    >
                      {sensor.label}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={checkConfig}
            disabled={!allPlaced}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Corregir
          </Button>
          <Button
            onClick={resetGame}
            variant="outline"
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-slate-600">
          <p>
            Sensores colocados: <strong>{Object.values(zoneSensors).flat().length}</strong> de <strong>{sensors.length}</strong>
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${(Object.values(zoneSensors).flat().length / sensors.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Results Summary */}
        {showResults && (
          <Card className="border-green-300 bg-green-50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-900 mb-2">📊 Resumen de tu Configuración:</h4>
              <div className="text-xs text-slate-700 space-y-2">
                {zones.map(zone => {
                  const placed = zoneSensors[zone.id];
                  const correct = placed.filter(s => zone.idealSensors.includes(s.id));
                  const incorrect = placed.filter(s => !zone.idealSensors.includes(s.id));
                  
                  return (
                    <div key={zone.id} className="p-2 bg-white rounded">
                      <p className="font-medium">{zone.icon} {zone.title}</p>
                      <div className="flex gap-3 mt-1">
                        {correct.length > 0 && (
                          <span className="text-green-600">✅ Correctos: {correct.length}</span>
                        )}
                        {incorrect.length > 0 && (
                          <span className="text-red-600">❌ Incorrectos: {incorrect.length}</span>
                        )}
                        {placed.length === 0 && (
                          <span className="text-slate-500">⚠️ Sin sensores</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
