import Link from 'next/link';
import type { Resource } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, File } from 'lucide-react';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos del Módulo</CardTitle>
        <CardDescription>Aquí encontrarás materiales de apoyo, presentaciones y datasets para descargar.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{resource.title}</span>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={resource.file} download>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
