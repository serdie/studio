'use client';

import { useState } from 'react';
import { modules } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Link as LinkIcon, Image as ImageIcon, FileUp, Send } from 'lucide-react';

export default function InstructorPage() {
  const { toast } = useToast();
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('link');

  const handleUpload = () => {
    if (!selectedModule || !title) {
      toast({
        variant: 'destructive',
        title: 'Faltan datos',
        description: 'Por favor, selecciona un módulo e indica un título.',
      });
      return;
    }

    // Aquí iría la lógica para guardar en Firestore
    toast({
      title: 'Contenido añadido',
      description: `Se ha añadido "${title}" al ${selectedModule}.`,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Gestión de Contenidos (Panel del Profesor)</h1>
        <p className="text-muted-foreground">Sube recursos, enlaces y materiales para los alumnos del curso IA CEOE-FEDETO.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Subir Nuevo Recurso
          </CardTitle>
          <CardDescription>Selecciona el módulo y el tipo de contenido que deseas compartir.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Módulo de Destino</Label>
              <Select onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar módulo..." />
                </SelectTrigger>
                <SelectContent>
                  {modules.map(m => (
                    <SelectItem key={m.slug} value={m.title}>{m.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Recurso</Label>
              <Select defaultValue="link" onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link">Enlace Externo</SelectItem>
                  <SelectItem value="image">Imagen / Infografía</SelectItem>
                  <SelectItem value="file">Documento (PDF/Doc)</SelectItem>
                  <SelectItem value="video">Video Tutorial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Título del Recurso</Label>
            <Input 
              placeholder="Ej: Dataset para práctica de Machine Learning" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>URL o Enlace</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="https://..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button variant="outline" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descripción / Instrucciones</Label>
            <Textarea 
              placeholder="Explica brevemente de qué trata este recurso..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleUpload}>
            <Send className="mr-2 h-4 w-4" /> Publicar Contenido
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estadísticas del Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Horas Totales:</span>
                <span className="font-bold">336 h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Alumnos Inscritos:</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Proyectos en Curso:</span>
                <span className="font-bold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start">
              <ImageIcon className="mr-2 h-4 w-4" /> Gestionar Galería
            </Button>
            <Button variant="outline" className="justify-start">
              <FileUp className="mr-2 h-4 w-4" /> Exportar Calificaciones
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
