import Link from 'next/link';
import type { Module } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { icon: Icon } = module;
  
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        <div>
          <CardTitle className="font-headline text-xl">{module.title}</CardTitle>
          <CardDescription>{module.duration}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{module.description}</p>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-muted-foreground">Progreso</span>
            <span className="text-xs font-semibold">{module.progress}%</span>
          </div>
          <Progress value={module.progress} aria-label={`${module.progress}% completado`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/dashboard/modules/${module.slug}`}>
            Ver Módulo <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
