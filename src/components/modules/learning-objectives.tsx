'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ObjectiveSection {
  section: string;
  items: string[];
}

interface LearningObjectivesProps {
  objectives: ObjectiveSection[];
}

export default function LearningObjectives({ objectives }: LearningObjectivesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Objetivos de Aprendizaje
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:bg-primary/10"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Ocultar
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Ver objetivos
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid gap-6 md:grid-cols-2">
            {objectives.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-semibold text-sm text-primary uppercase tracking-wider">{section.section}</h4>
                <ul className="space-y-1.5">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-xs flex gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
