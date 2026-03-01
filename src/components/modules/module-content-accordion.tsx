'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

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

  // Componente del Cuento para insertar en el tema 1.1
  const CuentoComponent = () => (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 my-4">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-amber-200 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-amber-700" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-amber-900">📚 Cuento: El Despertar del Código</h4>
            <p className="text-sm text-amber-700">Un Viaje por la Historia de la Inteligencia Artificial</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-amber-800 text-sm">
          Descubre la fascinante historia de la IA desde sus inicios hasta la actualidad en este cuento interactivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => window.open('https://gemini.google.com/share/258b15141250', '_blank')}
            className="bg-amber-600 hover:bg-amber-700 text-white flex-1"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Leer Cuento en Gemini
          </Button>
          <Button 
            onClick={() => window.open('/materiales/tema1/El Despertar del Código_ Un Viaje por la Historia de la IA_compressed.pdf', '_blank')}
            variant="outline"
            className="border-amber-400 text-amber-700 hover:bg-amber-100 flex-1"
          >
            <FileTextIcon className="mr-2 h-4 w-4" />
            Ver PDF
          </Button>
        </div>
        <p className="text-xs text-amber-600 text-center">
          💡 Consejo: El cuento en Gemini es interactivo. El PDF es mejor para imprimir o leer offline.
        </p>
      </CardContent>
    </Card>
  );

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
      
      // Para el tema 1.1, insertar el cuento antes de "Tipos de IA"
      if (number === '1.1') {
        while (nextSibling && nextSibling.tagName !== 'H2') {
          // Insertar el cuento antes de "Tipos de IA"
          if (nextSibling.tagName === 'H3' && nextSibling.textContent?.includes('Tipos de IA')) {
            // Crear un div temporal para renderizar el cuento
            const tempDiv = document.createElement('div');
            tempDiv.id = 'cuento-insert-point';
            content += tempDiv.outerHTML;
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
              <div className="module-prose max-w-none border-t pt-4 mt-2">
                {/* Insertar el cuento en el tema 1.1 antes de "Tipos de IA" */}
                {section.number === '1.1' && (
                  <div dangerouslySetInnerHTML={{ __html: section.content.replace('<div id="cuento-insert-point"></div>', '<div id="cuento-insert-point"></div>') }} />
                )}
                {section.number !== '1.1' && (
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                )}
                {/* Renderizar el cuento después del contenido parseado para 1.1 */}
                {section.number === '1.1' && (
                  <div className="mt-6">
                    <CuentoComponent />
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
