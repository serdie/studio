import Link from 'next/link';
import type { Module } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { icon: Icon } = module;
  const isCompleted = module.progress === 100;
  const isStarted = module.progress > 0;

  return (
    <Card className="group flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/60">
      {/* Gradient header */}
      <div className="relative p-5 pb-4 bg-gradient-to-br from-primary/8 to-primary/3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-transform group-hover:scale-110 duration-300">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="font-headline text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {module.title}
            </CardTitle>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <CardDescription className="text-xs">{module.duration}</CardDescription>
            </div>
          </div>
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          )}
        </div>
      </div>

      <CardContent className="flex-grow px-5 pt-3 pb-2">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{module.description}</p>
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Progreso</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">{module.progress}%</span>
              {isStarted && !isCompleted && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">En curso</Badge>
              )}
              {isCompleted && (
                <Badge className="text-[10px] px-1.5 py-0 h-4 bg-green-500 hover:bg-green-500">Completado</Badge>
              )}
            </div>
          </div>
          <Progress value={module.progress} className="h-1.5" aria-label={`${module.progress}% completado`} />
        </div>
      </CardContent>

      <CardFooter className="px-5 pt-2 pb-4">
        <Button asChild className="w-full group/btn" variant={isStarted ? 'default' : 'outline'}>
          <Link href={`/dashboard/modules/${module.slug}`}>
            {isCompleted ? 'Repasar Módulo' : isStarted ? 'Continuar' : 'Comenzar'}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
