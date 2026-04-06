'use client';

import { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  X,
  Image as ImageIcon,
  Palette,
  LayoutGrid,
  Download,
  Trash2,
  Sparkles,
  Upload,
  Eye,
  Edit3
} from 'lucide-react';

interface PostIt {
  id: string;
  text: string;
  color: string;
  image?: string;
}

interface CanvasSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  postIts: PostIt[];
  gridArea: string;
  borderColor: string;
  bgColor: string;
}

const POST_IT_COLORS = [
  { name: 'Amarillo', value: '#fef08a' },
  { name: 'Rosa', value: '#fecdd3' },
  { name: 'Azul', value: '#bfdbfe' },
  { name: 'Verde', value: '#bbf7d0' },
  { name: 'Naranja', value: '#fed7aa' },
  { name: 'Morado', value: '#e9d5ff' },
  { name: 'Cyan', value: '#cffafe' },
  { name: 'Rojo', value: '#fecaca' },
];

const initialSections: CanvasSection[] = [
  {
    id: 'partners',
    title: 'Socios Clave',
    subtitle: 'Key Partners',
    description: '¿Quiénes son nuestros socios y proveedores clave? ¿Qué recursos obtenemos de ellos?',
    postIts: [],
    gridArea: '1 / 1 / 3 / 2',
    borderColor: 'border-purple-300',
    bgColor: 'from-purple-50 to-purple-100/50',
  },
  {
    id: 'activities',
    title: 'Actividades Clave',
    subtitle: 'Key Activities',
    description: '¿Qué actividades debe realizar nuestro negocio para funcionar?',
    postIts: [],
    gridArea: '1 / 2 / 2 / 3',
    borderColor: 'border-blue-300',
    bgColor: 'from-blue-50 to-blue-100/50',
  },
  {
    id: 'resources',
    title: 'Recursos Clave',
    subtitle: 'Key Resources',
    description: '¿Qué recursos indispensables necesitamos para crear valor?',
    postIts: [],
    gridArea: '2 / 2 / 3 / 3',
    borderColor: 'border-cyan-300',
    bgColor: 'from-cyan-50 to-cyan-100/50',
  },
  {
    id: 'value',
    title: 'Propuestas de Valor',
    subtitle: 'Value Propositions',
    description: '¿Qué valor ofrecemos al cliente? ¿Qué problema resolvemos?',
    postIts: [],
    gridArea: '1 / 3 / 3 / 4',
    borderColor: 'border-green-300',
    bgColor: 'from-green-50 to-green-100/50',
  },
  {
    id: 'relationships',
    title: 'Relaciones con Clientes',
    subtitle: 'Customer Relationships',
    description: '¿Qué tipo de relación espera cada segmento de clientes?',
    postIts: [],
    gridArea: '1 / 4 / 3 / 5',
    borderColor: 'border-amber-300',
    bgColor: 'from-amber-50 to-amber-100/50',
  },
  {
    id: 'channels',
    title: 'Canales',
    subtitle: 'Channels',
    description: '¿Cómo llegan nuestras propuestas de valor a los clientes?',
    postIts: [],
    gridArea: '1 / 5 / 3 / 6',
    borderColor: 'border-orange-300',
    bgColor: 'from-orange-50 to-orange-100/50',
  },
  {
    id: 'segments',
    title: 'Segmentos de Clientes',
    subtitle: 'Customer Segments',
    description: '¿Para quién creamos valor? ¿Quiénes son nuestros clientes más importantes?',
    postIts: [],
    gridArea: '1 / 6 / 3 / 7',
    borderColor: 'border-red-300',
    bgColor: 'from-red-50 to-red-100/50',
  },
  {
    id: 'costs',
    title: 'Estructura de Costes',
    subtitle: 'Cost Structure',
    description: '¿Cuáles son los costes más importantes de nuestro modelo de negocio?',
    postIts: [],
    gridArea: '3 / 1 / 4 / 4',
    borderColor: 'border-slate-300',
    bgColor: 'from-slate-50 to-slate-100/50',
  },
  {
    id: 'revenue',
    title: 'Fuentes de Ingresos',
    subtitle: 'Revenue Streams',
    description: '¿Por qué valor están dispuestos a pagar nuestros clientes? ¿Cómo pagan?',
    postIts: [],
    gridArea: '3 / 4 / 4 / 7',
    borderColor: 'border-emerald-300',
    bgColor: 'from-emerald-50 to-emerald-100/50',
  },
];

export default function BusinessModelCanvas() {
  const [sections, setSections] = useState<CanvasSection[]>(initialSections);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const [selectedColor, setSelectedColor] = useState(POST_IT_COLORS[0].value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSection, setUploadingSection] = useState<string | null>(null);

  const addPostIt = (sectionId: string) => {
    if (!newText.trim()) return;

    const postIt: PostIt = {
      id: `${sectionId}-${Date.now()}`,
      text: newText.trim(),
      color: selectedColor,
    };

    setSections(prev =>
      prev.map(s =>
        s.id === sectionId ? { ...s, postIts: [...s.postIts, postIt] } : s
      )
    );
    setNewText('');
  };

  const removePostIt = (sectionId: string, postItId: string) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, postIts: s.postIts.filter(p => p.id !== postItId) }
          : s
      )
    );
  };

  const startEditing = (postItId: string, currentText: string) => {
    setEditingId(postItId);
    setEditText(currentText);
  };

  const saveEdit = (sectionId: string, postItId: string) => {
    if (!editText.trim()) return;
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? {
              ...s,
              postIts: s.postIts.map(p =>
                p.id === postItId ? { ...p, text: editText.trim() } : p
              ),
            }
          : s
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const handleImageUpload = useCallback((sectionId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingSection(sectionId);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      const postIt: PostIt = {
        id: `${sectionId}-img-${Date.now()}`,
        text: `📷 ${file.name}`,
        color: POST_IT_COLORS[0].value,
        image: imageData,
      };
      setSections(prev =>
        prev.map(s =>
          s.id === sectionId ? { ...s, postIts: [...s.postIts, postIt] } : s
        )
      );
      setUploadingSection(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const clearAll = () => {
    setSections(initialSections.map(s => ({ ...s, postIts: [] })));
    setActiveSection(null);
    setNewText('');
  };

  const getTotalPostIts = () => {
    return sections.reduce((total, s) => total + s.postIts.length, 0);
  };

  const getSectionPostIts = (sectionId: string) => {
    return sections.find(s => s.id === sectionId)?.postIts || [];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Modelo Canvas Interactivo</h1>
            <p className="text-sm text-slate-600">Diseña tu modelo de negocio con post-its interactivos, colores e imágenes</p>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <strong className="font-semibold">9 secciones</strong> <span className="ml-1">del Business Model Canvas</span>
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <strong className="font-semibold">Post-its</strong> <span className="ml-1">con colores personalizables</span>
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <strong className="font-semibold">{getTotalPostIts()} post-its</strong> <span className="ml-1">creados</span>
          </Badge>
        </div>
      </div>

      {/* Scenario Card */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-white shadow-md">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">¿Qué es el Modelo Canvas?</h3>
            <Badge variant="outline" className="ml-auto text-xs bg-purple-100 text-purple-700 border-purple-300">herramienta estratégica</Badge>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            El <strong>Business Model Canvas</strong> es una herramienta visual que te permite describir, diseñar y analizar tu modelo de negocio en una sola página. Se divide en <strong>9 bloques</strong> que cubren desde tus clientes hasta tus costes e ingresos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-purple-200">
              <strong className="text-purple-800">🎯 Front-stage (derecha)</strong>
              <p className="text-slate-600 mt-1">Clientes, canales, relaciones y propuestas de valor</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-blue-200">
              <strong className="text-blue-800">⚙️ Back-stage (izquierda)</strong>
              <p className="text-slate-600 mt-1">Socios, actividades y recursos clave</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-emerald-200">
              <strong className="text-emerald-800">💰 Finanzas (abajo)</strong>
              <p className="text-slate-600 mt-1">Estructura de costes y fuentes de ingresos</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic bg-slate-100 p-2 rounded">
            💡 <strong>Cómo usar:</strong> Haz clic en cualquier sección para añadir post-its. Puedes elegir colores, subir imágenes y editar el texto. ¡Sé creativo!
          </p>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Color del post-it:</span>
              <div className="flex gap-1.5">
                {POST_IT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === color.value ? 'border-slate-800 scale-110 shadow-sm' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Limpiar todo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Grid */}
      <div className="relative">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(3, minmax(200px, auto))',
          }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            const sectionPostIts = getSectionPostIts(section.id);

            return (
              <Card
                key={section.id}
                className={`relative border-2 ${section.borderColor} bg-gradient-to-br ${section.bgColor} shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden`}
                style={{
                  gridColumn: section.gridArea.split(' / ')[0],
                  gridRow: section.gridArea.split(' / ')[2],
                }}
                onClick={() => setActiveSection(isActive ? null : section.id)}
              >
                <CardContent className="p-3 h-full flex flex-col">
                  {/* Section Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 leading-tight">{section.title}</h3>
                      <p className="text-[10px] text-slate-500 italic">{section.subtitle}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-white/80">
                      {sectionPostIts.length}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 mb-2 leading-tight">{section.description}</p>

                  {/* Post-its Area */}
                  <div className="flex-1 overflow-y-auto space-y-1.5 min-h-[80px]">
                    {sectionPostIts.map((postIt) => (
                      <div
                        key={postIt.id}
                        className="relative rounded-lg p-2 shadow-sm border border-slate-200/50 group"
                        style={{ backgroundColor: postIt.color }}
                      >
                        {editingId === postIt.id ? (
                          <div className="space-y-1">
                            <Textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="text-xs bg-white min-h-[50px] resize-none"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  saveEdit(section.id, postIt.id);
                                }
                              }}
                            />
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-5 px-1.5 text-[10px]"
                                onClick={() => saveEdit(section.id, postIt.id)}
                              >
                                ✓ Guardar
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-5 px-1.5 text-[10px]"
                                onClick={() => setEditingId(null)}
                              >
                                ✕ Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="pr-5">
                            {postIt.image && (
                              <img
                                src={postIt.image}
                                alt={postIt.text}
                                className="w-full h-16 object-cover rounded mb-1"
                              />
                            )}
                            <p className="text-xs text-slate-800 leading-tight whitespace-pre-wrap">{postIt.text}</p>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(postIt.id, postIt.text);
                            }}
                            className="h-4 w-4 rounded bg-white/80 hover:bg-white flex items-center justify-center"
                          >
                            <Edit3 className="h-2.5 w-2.5 text-slate-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removePostIt(section.id, postIt.id);
                            }}
                            className="h-4 w-4 rounded bg-white/80 hover:bg-red-100 flex items-center justify-center"
                          >
                            <X className="h-2.5 w-2.5 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Post-it (when section is active) */}
                  {isActive && (
                    <div className="mt-2 pt-2 border-t border-slate-200/50 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1.5">
                        <Input
                          placeholder="Escribe tu idea..."
                          className="text-xs bg-white h-8"
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addPostIt(section.id);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600"
                          onClick={() => addPostIt(section.id)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-[10px] px-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Imagen
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(section.id, e)}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-white shadow-sm">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-amber-500" />
            <h3 className="font-semibold text-amber-900">Consejos para tu Modelo Canvas</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-amber-200">
              <strong className="text-amber-800">1. Empieza por el cliente</strong>
              <p className="text-slate-600 mt-1">Define primero tus segmentos de clientes y sus necesidades antes de pensar en el producto.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-200">
              <strong className="text-amber-800">2. Sé específico</strong>
              <p className="text-slate-600 mt-1">Evita generalidades. En lugar de "mejorar la vida", escribe "ahorrar 2 horas diarias a padres trabajadores".</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-200">
              <strong className="text-amber-800">3. Usa post-its reales</strong>
              <p className="text-slate-600 mt-1">Cada idea debe caber en un post-it. Si no cabe, es demasiado compleja para este nivel.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-200">
              <strong className="text-amber-800">4. Itera y valida</strong>
              <p className="text-slate-600 mt-1">El Canvas nunca está terminado. Revísalo cada semana con nuevos datos del mercado.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
