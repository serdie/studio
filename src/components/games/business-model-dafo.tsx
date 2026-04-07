'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  X,
  Shuffle,
  Trash2,
  Moon,
  Sun,
  Sparkles,
  Palette,
  Download,
  Shield,
  Sword,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const COLORS = [
  { name: 'Amarillo', value: '#f8ee8e' },
  { name: 'Rosa', value: '#ffb3cd' },
  { name: 'Azul', value: '#9edbf5' },
  { name: 'Verde', value: '#bce7a3' },
  { name: 'Naranja', value: '#ffc58b' },
  { name: 'Lila', value: '#d6b8ff' },
];

const ZONES = [
  { id: 'fortalezas', title: 'Fortalezas', subtitle: 'Interno · Positivo', icon: '💪', hint: '¿Qué hacemos mejor que nadie? ¿Qué recursos únicos tenemos?', color: 'green' },
  { id: 'debilidades', title: 'Debilidades', subtitle: 'Interno · Negativo', icon: '⚠️', hint: '¿Qué nos falta? ¿Qué podemos mejorar?', color: 'red' },
  { id: 'oportunidades', title: 'Oportunidades', subtitle: 'Externo · Positivo', icon: '🚀', hint: '¿Qué tendencias del mercado podemos aprovechar?', color: 'blue' },
  { id: 'amenazas', title: 'Amenazas', subtitle: 'Externo · Negativo', icon: '🔥', hint: '¿Qué factores externos nos ponen en riesgo?', color: 'orange' },
];

const EXAMPLES = [
  { text: 'Equipo técnico altamente cualificado', color: '#bce7a3', zone: 'fortalezas' },
  { text: 'Marca reconocida en el sector', color: '#bce7a3', zone: 'fortalezas' },
  { text: 'Falta de presencia digital', color: '#ffb3cd', zone: 'debilidades' },
  { text: 'Procesos internos lentos', color: '#ffb3cd', zone: 'debilidades' },
  { text: 'Crecimiento del mercado online', color: '#9edbf5', zone: 'oportunidades' },
  { text: 'Nuevas regulaciones favorables', color: '#9edbf5', zone: 'oportunidades' },
  { text: 'Competencia con precios agresivos', color: '#ffc58b', zone: 'amenazas' },
  { text: 'Cambios tecnológicos disruptivos', color: '#ffc58b', zone: 'amenazas' },
];

interface StickyNote {
  id: string;
  text: string;
  color: string;
  zone: string;
  x: number;
  y: number;
  rotation: number;
}

export default function BusinessModelDAFO() {
  const [stickies, setStickies] = useState<StickyNote[]>([
    { id: 'note-1', text: 'Escribe tu primera fortaleza aquí', color: '#bce7a3', zone: 'fortalezas', x: 40, y: 50, rotation: -1.5 },
  ]);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [selectedZone, setSelectedZone] = useState('fortalezas');
  const [isDark, setIsDark] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const randomPos = useCallback((zoneId: string) => {
    const zoneEl = document.querySelector(`[data-zone="${zoneId}"] .notes-layer`);
    if (!zoneEl) return { x: 10, y: 10 };
    const w = Math.max(zoneEl.clientWidth - 160, 10);
    const h = Math.max(zoneEl.clientHeight - 120, 10);
    return { x: Math.round(Math.random() * w), y: Math.round(Math.random() * h) };
  }, []);

  const addSticky = () => {
    const pos = randomPos(selectedZone);
    const newSticky: StickyNote = {
      id: `note-${nextId.current++}`,
      text: noteText.trim() || 'Nueva idea',
      color: selectedColor,
      zone: selectedZone,
      x: pos.x,
      y: pos.y,
      rotation: Math.round((Math.random() * 5 - 2.5) * 100) / 100,
    };
    setStickies(prev => [...prev, newSticky]);
    setNoteText('');
  };

  const removeSticky = (id: string) => {
    setStickies(prev => prev.filter(s => s.id !== id));
  };

  const cycleColor = (id: string) => {
    setStickies(prev => prev.map(s => {
      if (s.id !== id) return s;
      const idx = COLORS.findIndex(c => c.value === s.color);
      const next = COLORS[(idx + 1) % COLORS.length];
      return { ...s, color: next.value };
    }));
  };

  const clearBoard = () => setStickies([]);

  const shufflePositions = () => {
    setStickies(prev => prev.map(s => {
      const pos = randomPos(s.zone);
      return { ...s, x: pos.x, y: pos.y, rotation: Math.round((Math.random() * 5 - 2.5) * 100) / 100 };
    }));
  };

  const loadExamples = () => {
    const newStickies: StickyNote[] = EXAMPLES.map((ex, i) => ({
      id: `note-${nextId.current++}`,
      text: ex.text,
      color: ex.color,
      zone: ex.zone,
      ...randomPos(ex.zone),
      rotation: Math.round((Math.random() * 5 - 2.5) * 100) / 100,
    }));
    setStickies(prev => [...prev, ...newStickies]);
  };

  // Download DAFO as image
  const downloadCanvas = () => {
    const board = boardRef.current;
    if (!board) return;

    const canvas = document.createElement('canvas');
    const scale = 2;
    const width = board.scrollWidth;
    const height = board.scrollHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);
    ctx.fillStyle = isDark ? '#111216' : '#f3f3f2';
    ctx.fillRect(0, 0, width, height);

    // Draw title
    ctx.fillStyle = isDark ? '#cfd8ff' : '#1e1a5f';
    ctx.font = 'bold 28px "General Sans", "Satoshi", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Análisis DAFO', width / 2, 40);

    // Draw 4 quadrants
    const zones = board.querySelectorAll('.zone');
    zones.forEach((zoneEl) => {
      const zoneId = zoneEl.getAttribute('data-zone');
      if (!zoneId) return;

      const zoneRect = zoneEl.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();
      const zx = zoneRect.left - boardRect.left;
      const zy = zoneRect.top - boardRect.top;
      const zw = zoneRect.width;
      const zh = zoneRect.height;

      // Zone background
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.32)';
      ctx.fillRect(zx, zy, zw, zh);

      // Zone border
      ctx.strokeStyle = isDark ? '#d7dcef' : '#1d1b34';
      ctx.lineWidth = 2;
      ctx.strokeRect(zx, zy, zw, zh);

      // Zone title
      const zoneTitle = zoneEl.querySelector('.zone-title')?.textContent || '';
      ctx.fillStyle = isDark ? '#cfd8ff' : '#1e1a5f';
      ctx.font = 'bold 16px "General Sans", "Satoshi", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(zoneTitle, zx + 12, zy + 24);

      // Draw stickies
      const zoneStickies = stickies.filter(s => s.zone === zoneId);
      zoneStickies.forEach((sticky) => {
        const sx = zx + sticky.x;
        const sy = zy + sticky.y;
        const sw = 150;
        const sh = 110;

        ctx.fillStyle = sticky.color;
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, sh, 10);
        ctx.fill();

        ctx.shadowColor = 'rgba(0,0,0,0.14)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, sh, 10);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#232323';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'left';
        const words = sticky.text.split(' ');
        let line = '';
        let ly = sy + 20;
        words.forEach((word) => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > sw - 24) {
            ctx.fillText(line.trim(), sx + 12, ly);
            line = word + ' ';
            ly += 18;
          } else {
            line = testLine;
          }
        });
        ctx.fillText(line.trim(), sx + 12, ly);
      });
    });

    const link = document.createElement('a');
    link.download = `analisis-dafo-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent, sticky: StickyNote) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
    setDraggingId(sticky.id);
    const el = document.getElementById(sticky.id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    el.setPointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    if (!draggingId) return;

    const onMove = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const hit = el?.closest('.zone') as HTMLElement | null;
      setHoverZone(hit?.dataset?.zone || null);

      setStickies(prev => prev.map(s => {
        if (s.id !== draggingId) return s;
        const layer = document.querySelector(`[data-zone="${s.zone}"] .notes-layer`);
        if (!layer) return s;
        const parent = layer.getBoundingClientRect();
        return {
          ...s,
          x: Math.max(0, e.clientX - parent.left - dragOffset.x),
          y: Math.max(0, e.clientY - parent.top - dragOffset.y),
        };
      }));
    };

    const onUp = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const hit = el?.closest('.zone') as HTMLElement | null;
      setHoverZone(null);

      if (hit) {
        const newZone = hit.dataset?.zone || '';
        const layer = hit.querySelector('.notes-layer');
        if (layer) {
          const zoneRect = layer.getBoundingClientRect();
          const x = Math.max(0, Math.min(layer.clientWidth - 150, e.clientX - zoneRect.left - dragOffset.x));
          const y = Math.max(0, Math.min(layer.clientHeight - 110, e.clientY - zoneRect.top - dragOffset.y));
          setStickies(prev => prev.map(s =>
            s.id === draggingId ? { ...s, zone: newZone, x, y } : s
          ));
        }
      }

      setDraggingId(null);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
  }, [draggingId, dragOffset]);

  const bgClass = isDark ? 'bg-[#111216]' : 'bg-[#f3f3f2]';
  const sidebarBg = isDark ? 'bg-[#171920]' : 'bg-white';
  const boardBg = isDark ? 'bg-[#171920]' : 'bg-white';
  const textColor = isDark ? 'text-[#f3f5f9]' : 'text-[#1d1b34]';
  const mutedText = isDark ? 'text-[#a5afbc]' : 'text-[#6f6f7d]';
  const borderColor = isDark ? 'border-[#d7dcef]' : 'border-[#1d1b34]';
  const surfaceColor = isDark ? 'bg-[#20232b]' : 'bg-[#f8f8f7]';
  const inputBg = isDark ? 'bg-[#171920] border-[#d7dcef]' : 'bg-white border-[#1d1b34]/14';
  const primaryBtn = isDark ? 'bg-[#cfd8ff] text-[#111216]' : 'bg-[#1e1a5f] text-white';
  const secondaryBtn = isDark ? 'bg-[#33556b] text-[#f3f5f9]' : 'bg-[#d9eef5] text-[#143642]';
  const ghostBtn = isDark ? 'border-[#d7dcef] text-[#f3f5f9]' : 'border-[#1d1b34]/16 text-[#1d1b34]';

  const zoneBorderColors: Record<string, string> = {
    fortalezas: isDark ? '#4ade80' : '#22c55e',
    debilidades: isDark ? '#f87171' : '#ef4444',
    oportunidades: isDark ? '#60a5fa' : '#3b82f6',
    amenazas: isDark ? '#fb923c' : '#f97316',
  };

  return (
    <div className={`w-full min-h-screen ${bgClass} font-sans`}>
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-screen">
        {/* Sidebar */}
        <aside className={`${sidebarBg} border-r-2 ${isDark ? 'border-[#d7dcef]/12' : 'border-[#1d1b34]/12'} p-5 flex flex-col gap-5 shadow-lg z-10`}>
          <div>
            <div className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest ${mutedText}`}>
              <span className="w-2 h-2 rounded-full bg-[#7fd3e8]" />
              Juego didáctico
            </div>
            <h1 className={`font-bold text-3xl tracking-tight mt-1 mb-2 ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif" }}>
              Análisis DAFO con post-it
            </h1>
            <p className={`text-sm ${mutedText}`}>
              Identifica Fortalezas, Debilidades, Oportunidades y Amenazas con post-its arrastrables. Igual que una dinámica presencial pero digital.
            </p>
          </div>

          {/* Create sticky */}
          <Card className={`${surfaceColor} border ${isDark ? 'border-[#d7dcef]/10' : 'border-[#1d1b34]/8'} rounded-2xl`}>
            <CardContent className="p-4 space-y-3">
              <div>
                <h2 className={`font-bold text-lg tracking-tight ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif" }}>Crear post-it</h2>
                <p className={`text-xs ${mutedText}`}>Escribe una idea, elige color y bloque, y añádela al tablero.</p>
              </div>

              <div className="space-y-1">
                <label className={`text-xs ${mutedText}`}>Texto del post-it</label>
                <Textarea
                  placeholder="Ej.: Equipo técnico altamente cualificado"
                  className={`text-xs ${inputBg} rounded-xl min-h-[88px]`}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs ${mutedText}`}>Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className="w-8 h-8 rounded-full border-2 cursor-pointer relative transition-all"
                      style={{
                        backgroundColor: color.value,
                        borderColor: isDark ? 'rgba(215,220,239,0.18)' : 'rgba(29,27,52,0.18)',
                      }}
                      title={color.name}
                    >
                      {selectedColor === color.value && (
                        <span className="absolute inset-[7px] rounded-full border-2" style={{ borderColor: isDark ? 'rgba(215,220,239,0.72)' : 'rgba(29,27,52,0.72)' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs ${mutedText}`}>Bloque DAFO</label>
                <select
                  className={`w-full rounded-xl ${inputBg} px-3 py-2 text-xs`}
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                >
                  {ZONES.map(z => (
                    <option key={z.id} value={z.id}>{z.title} ({z.subtitle})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={addSticky}
                  className={`rounded-full font-bold text-sm min-h-[46px] ${primaryBtn}`}
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Añadir post-it
                </Button>
                <Button
                  onClick={loadExamples}
                  className={`rounded-full font-bold text-sm min-h-[46px] ${secondaryBtn}`}
                >
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Cargar ejemplos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card className={`${surfaceColor} border ${isDark ? 'border-[#d7dcef]/10' : 'border-[#1d1b34]/8'} rounded-2xl`}>
            <CardContent className="p-4 space-y-3">
              <h2 className={`font-bold text-lg tracking-tight ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif" }}>Herramientas</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearBoard}
                  className={`rounded-full text-sm ${ghostBtn}`}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Vaciar tablero
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={shufflePositions}
                  className={`rounded-full text-sm ${ghostBtn}`}
                >
                  <Shuffle className="h-3.5 w-3.5 mr-1" />
                  Reordenar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDark(!isDark)}
                  className={`rounded-full text-sm ${ghostBtn}`}
                >
                  {isDark ? <Sun className="h-3.5 w-3.5 mr-1" /> : <Moon className="h-3.5 w-3.5 mr-1" />}
                  {isDark ? 'Tema claro' : 'Tema oscuro'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCanvas}
                  className={`rounded-full text-sm font-semibold ${isDark ? 'border-[#cfd8ff] text-[#cfd8ff]' : 'border-[#1e1a5f] text-[#1e1a5f]'}`}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Descargar
                </Button>
              </div>
              <p className={`text-[11px] ${mutedText}`}>
                Consejo: cada bloque admite varios post-its. Haz doble clic sobre un post-it para editar con comodidad.
              </p>
            </CardContent>
          </Card>

          {/* How to play */}
          <Card className={`${surfaceColor} border ${isDark ? 'border-[#d7dcef]/10' : 'border-[#1d1b34]/8'} rounded-2xl`}>
            <CardContent className="p-4 space-y-2">
              <h2 className={`font-bold text-lg tracking-tight ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif" }}>Cómo se juega</h2>
              <p className={`text-sm ${mutedText}`}>
                1. Identificar factores internos (fortalezas/debilidades) y externos (oportunidades/amenazas), 2. arrastrar al bloque correcto, 3. debatir estrategias, 4. refinar el análisis.
              </p>
            </CardContent>
          </Card>
        </aside>

        {/* Board */}
        <main className="p-5 overflow-auto">
          {/* Toolbar */}
          <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
            <div>
              <div className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest ${mutedText}`}>
                <span className="w-2 h-2 rounded-full bg-[#7fd3e8]" />
                Tablero
              </div>
              <h2 className={`font-bold text-xl tracking-tight ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif" }}>
                Análisis DAFO interactivo
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className={`rounded-full text-xs ${isDark ? 'bg-[#171920] border-[#d7dcef]/12 text-[#a5afbc]' : 'bg-white border-[#1d1b34]/12 text-[#6f6f7d]'}`}>
                Arrastrar y soltar
              </Badge>
              <Badge variant="outline" className={`rounded-full text-xs ${isDark ? 'bg-[#171920] border-[#d7dcef]/12 text-[#a5afbc]' : 'bg-white border-[#1d1b34]/12 text-[#6f6f7d]'}`}>
                Editar texto
              </Badge>
              <Badge variant="outline" className={`rounded-full text-xs ${isDark ? 'bg-[#171920] border-[#d7dcef]/12 text-[#a5afbc]' : 'bg-white border-[#1d1b34]/12 text-[#6f6f7d]'}`}>
                Cambiar color
              </Badge>
              <Badge variant="outline" className={`rounded-full text-xs ${isDark ? 'bg-[#171920] border-[#d7dcef]/12 text-[#a5afbc]' : 'bg-white border-[#1d1b34]/12 text-[#6f6f7d]'}`}>
                Dinámica en clase
              </Badge>
            </div>
          </div>

          {/* DAFO Board */}
          <div ref={boardRef} className={`${boardBg} rounded-[28px] p-6 border ${isDark ? 'border-[#d7dcef]/12' : 'border-[#1d1b34]/12'} shadow-lg overflow-x-auto`}>
            <div className={`text-center font-bold mb-5 ${textColor}`} style={{ fontFamily: "'General Sans', 'Satoshi', sans-serif", fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)' }}>
              Análisis DAFO
            </div>

            {/* 2x2 Grid */}
            <div
              className="grid grid-cols-2 gap-0"
              style={{
                border: `2px solid ${isDark ? '#d7dcef' : '#1d1b34'}`,
                minWidth: '900px',
              }}
            >
              {ZONES.map((zone) => {
                const zoneStickies = stickies.filter(s => s.zone === zone.id);
                const isHovered = hoverZone === zone.id;

                return (
                  <div
                    key={zone.id}
                    data-zone={zone.id}
                    className={`zone relative p-4 overflow-hidden min-h-[350px] ${isHovered ? 'bg-[rgba(127,211,232,0.18)]' : isDark ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-[rgba(255,255,255,0.32)]'}`}
                    style={{
                      borderRight: zone.id === 'fortalezas' || zone.id === 'oportunidades' ? `2px solid ${isDark ? '#d7dcef' : '#1d1b34'}` : 'none',
                      borderBottom: zone.id === 'fortalezas' || zone.id === 'debilidades' ? `2px solid ${isDark ? '#d7dcef' : '#1d1b34'}` : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl`} style={{ backgroundColor: zoneBorderColors[zone.id] + '33' }}>
                        {zone.icon}
                      </div>
                      <div>
                        <div className={`font-extrabold leading-tight ${textColor}`} style={{ fontSize: 'clamp(1.1rem, 1rem + .4vw, 1.5rem)' }}>
                          {zone.title}
                        </div>
                        <div className={`text-[11px] ${mutedText}`}>{zone.subtitle}</div>
                      </div>
                    </div>

                    {/* Notes Layer */}
                    <div className="notes-layer absolute inset-[80px_8px_8px_8px]">
                      {zoneStickies.map((sticky) => (
                        <article
                          key={sticky.id}
                          id={sticky.id}
                          className="absolute w-[150px] min-h-[110px] p-3 pb-8 rounded-[10px] shadow-lg cursor-grab select-none touch-none border border-black/8 flex flex-col gap-2"
                          style={{
                            left: sticky.x,
                            top: sticky.y,
                            background: sticky.color,
                            transform: `rotate(${sticky.rotation}deg)`,
                            zIndex: draggingId === sticky.id ? 999 : 10,
                            boxShadow: draggingId === sticky.id ? '0 18px 34px rgba(0,0,0,0.22)' : '0 8px 18px rgba(0,0,0,0.14)',
                            transition: draggingId === sticky.id ? 'box-shadow 0.18s ease, transform 0.18s ease' : 'box-shadow 0.18s ease',
                          }}
                          onPointerDown={(e) => handlePointerDown(e, sticky)}
                          onDoubleClick={() => {
                            const ta = document.querySelector(`#${sticky.id} textarea`) as HTMLTextAreaElement;
                            ta?.focus();
                          }}
                        >
                          <textarea
                            className="bg-transparent border-none resize-none outline-none min-h-[54px] text-[14px] leading-tight text-[#232323] w-full"
                            value={sticky.text}
                            onChange={(e) => {
                              setStickies(prev => prev.map(s => s.id === sticky.id ? { ...s, text: e.target.value } : s));
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                          />
                          <div className="absolute left-2 right-2 bottom-2 flex justify-between items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-72">post-it</span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={(e) => { e.stopPropagation(); cycleColor(sticky.id); }}
                                className="w-[26px] h-[26px] border-none rounded-full bg-white/45 backdrop-blur-sm cursor-pointer text-[13px] flex items-center justify-center"
                                title="Cambiar color"
                              >
                                <Palette className="h-3 w-3" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); removeSticky(sticky.id); }}
                                className="w-[26px] h-[26px] border-none rounded-full bg-white/45 backdrop-blur-sm cursor-pointer text-[13px] flex items-center justify-center hover:bg-red-100"
                                title="Eliminar"
                              >
                                <X className="h-3 w-3 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Empty hint */}
                    {zone.hint && zoneStickies.length === 0 && (
                      <div className={`absolute left-4 bottom-3 text-[11px] ${mutedText} opacity-80 max-w-[80%]`}>
                        {zone.hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className={`mt-4 text-xs ${mutedText}`}>
            Consejo: cada bloque admite varios post-its. Haz doble clic sobre un post-it para editar con comodidad en el propio tablero.
          </p>
        </main>
      </div>
    </div>
  );
}
