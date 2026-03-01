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
      while (nextSibling && nextSibling.tagName !== 'H2') {
        content += nextSibling.outerHTML;
        nextSibling = nextSibling.nextElementSibling;
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
              <div 
                className="module-prose max-w-none border-t pt-4 mt-2"
                dangerouslySetInnerHTML={{ __html: section.content }} 
              />
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
