import { notFound } from 'next/navigation';
import { modules } from '@/lib/data';
import type { Module } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import ModuleContent from '@/components/modules/module-content';

async function getModule(slug: string): Promise<Module | undefined> {
  return modules.find(m => m.slug === slug);
}

export default async function ModulePage({ params }: { params: { slug: string } }) {
  const module = await getModule(params.slug);

  if (!module) {
    notFound();
  }

  const { icon: Icon, ...serializableModule } = module;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-3xl font-headline">{module.title}</CardTitle>
            <CardDescription className="mt-2">{module.longDescription}</CardDescription>
          </div>
          <div className="w-full md:w-48 mt-4 md:mt-0">
            <p className="text-sm font-medium text-muted-foreground mb-2">Progreso</p>
            <Progress value={module.progress} aria-label={`${module.progress}% completado`} />
            <p className="text-xs text-center mt-1 text-muted-foreground">{module.progress}%</p>
          </div>
        </CardHeader>
      </Card>

      <Separator />

      <ModuleContent module={serializableModule} />
    </div>
  );
}

export async function generateStaticParams() {
  return modules.map(module => ({
    slug: module.slug,
  }));
}
