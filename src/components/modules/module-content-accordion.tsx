'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, BookOpen, FileText } from 'lucide-react';

interface ModuleSection {
  number: string;
  title: string;
  content: string;
}

interface ModuleContentAccordionProps {
  htmlContent: string;
  moduleSlug: string;
}

export default function ModuleContentAccordion({ htmlContent, moduleSlug }: ModuleContentAccordionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  // Solo usar acordeón para el módulo 1 (introduccion-ia)
  if (moduleSlug !== 'introduccion-ia') {
    return <div className="module-prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  // HTML del cuento para insertar en el tema 1.1 (después de Historia de la IA)
  const cuentoHTML = `
    <div class="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 my-4 rounded-lg border-2">
      <div class="p-4 md:p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-12 w-12 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-amber-700"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
          </div>
          <div>
            <h4 class="text-xl font-bold text-amber-900">📚 Cuento: El Despertar del Código</h4>
            <p class="text-sm text-amber-700">Un Viaje por la Historia de la Inteligencia Artificial</p>
          </div>
        </div>
        <p class="text-amber-800 text-sm mb-4">
          Descubre la fascinante historia de la IA desde sus inicios hasta la actualidad en este cuento interactivo.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="window.open('https://gemini.google.com/share/258b15141250', '_blank')" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
            Leer Cuento en Gemini
          </button>
          <button onclick="window.open('/materiales/tema1/El Despertar del Código_ Un Viaje por la Historia de la IA_compressed.pdf', '_blank')" class="flex-1 border-2 border-amber-400 text-amber-700 hover:bg-amber-100 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
            Ver PDF
          </button>
        </div>
        <p class="text-xs text-amber-600 text-center mt-4">
          💡 Consejo: El cuento en Gemini es interactivo. El PDF es mejor para imprimir o leer offline.
        </p>
      </div>
    </div>
  `;

  // HTML del segundo cuento para añadir al final del tema 1.1
  const segundoCuentoHTML = `
    <div class="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 my-4 rounded-lg border-2">
      <div class="p-4 md:p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="h-12 w-12 rounded-xl bg-blue-200 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-blue-700"><path d="M12 5a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M12 5.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><path d="M12 19a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M12 19.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><path d="M12 12a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M12 12.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><path d="M17.997 5.5a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M17.997 5.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><path d="M17.997 12.5a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M17.997 12.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><path d="M17.997 19a3 3 0 1 0-5.997.1 3 3 0 0 0 5.997 0Z"/><path d="M17.997 19.5a3 3 0 1 1 0 6.001 3 3 0 0 1 0-6.001Z"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div>
            <h4 class="text-xl font-bold text-blue-900">🧠 Cuento: El Mapa de la Mente Artificial</h4>
            <p class="text-sm text-blue-700">Capacidades y Despertares de la IA</p>
          </div>
        </div>
        <p class="text-blue-800 text-sm mb-4">
          Explora las capacidades de la Inteligencia Artificial y descubre cómo está transformando nuestro mundo.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <button onclick="window.open('https://gemini.google.com/share/bafd8df4ee03', '_blank')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/></svg>
            Leer Cuento en Gemini
          </button>
          <button onclick="window.open('/materiales/tema1/El Mapa de la Mente Artificial_ Capacidades y Despertares_compressed.pdf', '_blank')" class="flex-1 border-2 border-blue-400 text-blue-700 hover:bg-blue-100 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
            Ver PDF
          </button>
        </div>
        <p class="text-xs text-blue-600 text-center mt-4">
          💡 Consejo: El cuento en Gemini es interactivo. El PDF es mejor para imprimir o leer offline.
        </p>
      </div>
    </div>
  `;

  // Parsear el contenido HTML para extraer las secciones h2
  const parseSections = (): ModuleSection[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const h2Elements = Array.from(doc.querySelectorAll('h2'));
    const sections: ModuleSection[] = [];

    h2Elements.forEach((h2, index) => {
      const number = h2.textContent?.match(/^(\d+\.\d+)/)?.[1] || `${index + 1}`;
      const title = h2.textContent?.replace(/^\d+\.\d+\.\s*/, '') || `Tema ${index + 1}`;
      
      // Obtener el contenido hasta el siguiente h2
      let content = '';
      let nextSibling = h2.nextElementSibling;
      
      // Para el tema 1.1, necesitamos insertar el cuento después de "Historia de la IA" y antes de "Tipos de IA"
      if (number === '1.1') {
        while (nextSibling && nextSibling.tagName !== 'H2') {
          // Insertar el cuento después de "Historia de la IA" y antes de "Tipos de IA"
          if (nextSibling.tagName === 'H3' && nextSibling.textContent?.includes('Tipos de IA')) {
            // Insertar marcador para el cuento justo antes de este elemento
            const cuentoPlaceholder = document.createElement('div');
            cuentoPlaceholder.id = 'cuento-insert-point';
            cuentoPlaceholder.className = 'cuento-placeholder';
            content += cuentoPlaceholder.outerHTML;
          }
          content += nextSibling.outerHTML;
          nextSibling = nextSibling.nextElementSibling;
        }
      } else {
        while (nextSibling && nextSibling.tagName !== 'H2') {
          content += nextSibling.outerHTML;
          nextSibling = nextSibling.nextElementSibling;
        }
      }

      sections.push({
        number,
        title,
        content,
      });
    });

    return sections;
  };

  const sections = parseSections();

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    sections.forEach((_, index) => {
      allExpanded[index] = true;
    });
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    setExpandedSections({});
  };

  return (
    <div className="space-y-4">
      {/* Controles superiores */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Temas del Módulo
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="text-xs"
          >
            <ChevronDown className="h-3 w-3 mr-1" />
            Expandir todos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="text-xs"
          >
            <ChevronUp className="h-3 w-3 mr-1" />
            Contraer todos
          </Button>
        </div>
      </div>

      {/* Secciones del módulo */}
      {sections.map((section, index) => (
        <Card 
          key={index} 
          className={`border transition-all duration-300 ${
            expandedSections[index] 
              ? 'border-primary/50 shadow-md' 
              : 'border-border/60 hover:border-primary/30'
          }`}
        >
          <CardHeader className="p-4 cursor-pointer" onClick={() => toggleSection(index)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                  expandedSections[index]
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {section.number}
                </div>
                <h4 className="font-semibold text-base md:text-lg">{section.title}</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection(index);
                }}
              >
                {expandedSections[index] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardHeader>
          
          {expandedSections[index] && (
            <CardContent className="pt-0 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Renderizar el contenido con el cuento insertado para 1.1 */}
              {section.number === '1.1' ? (
                <div>
                  <div 
                    className="module-prose max-w-none border-t pt-4 mt-2"
                    dangerouslySetInnerHTML={{ 
                      __html: section.content.replace(
                        '<div id="cuento-insert-point" class="cuento-placeholder"></div>',
                        cuentoHTML
                      )
                    }} 
                  />
                  {/* Añadir el segundo cuento al final del tema 1.1 */}
                  <div className="mt-6" dangerouslySetInnerHTML={{ __html: segundoCuentoHTML }} />
                </div>
              ) : (
                <div 
                  className="module-prose max-w-none border-t pt-4 mt-2"
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                />
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
