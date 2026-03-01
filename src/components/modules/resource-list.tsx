import Link from 'next/link';
import type { Resource } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Link as LinkIcon, Image, Video, BookOpen, Sparkles, FolderOpen, Eye, Music, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ResourceListProps {
  resources: Resource[];
}

function getResourceIcon(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['pdf', 'doc', 'docx', 'ppt', 'pptx'].includes(ext || '')) return { icon: FileText, color: 'text-red-500', bg: 'bg-red-50', label: 'Documento', ext };
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) return { icon: Image, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Imagen', ext };
  if (['mp4', 'avi', 'mov', 'webm'].includes(ext || '')) return { icon: Video, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Vídeo', ext };
  if (['mp3', 'm4a', 'wav'].includes(ext || '')) return { icon: Music, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Audio', ext };
  if (filename.startsWith('http')) return { icon: LinkIcon, color: 'text-green-500', bg: 'bg-green-50', label: 'Enlace', ext: 'link' };
  return { icon: FileText, color: 'text-primary', bg: 'bg-primary/10', label: 'Recurso', ext: 'unknown' };
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [selectedAudio, setSelectedAudio] = useState<{ title: string, url: string } | null>(null);

  const handleViewOnline = (resource: Resource) => {
    const { ext } = getResourceIcon(resource.file);
    const fullUrl = resource.file.startsWith('http') ? resource.file : `${window.location.origin}${resource.file}`;

    if (ext === 'pdf' || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
      // Abrir PDF e imágenes en nueva pestaña
      window.open(fullUrl, '_blank');
    } else if (['ppt', 'pptx', 'doc', 'docx'].includes(ext || '')) {
      // Usar el visor de Microsoft Office Online
      const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fullUrl)}`;
      window.open(officeViewerUrl, '_blank');
    } else if (['mp3', 'm4a', 'wav'].includes(ext || '')) {
      // Abrir reproductor de audio integrado
      setSelectedAudio({ title: resource.title, url: fullUrl });
    } else {
      // Por defecto intentar abrir en pestaña nueva
      window.open(fullUrl, '_blank');
    }
  };

  if (resources.length === 0) {
    return (
      <Card className="border-border/60">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Sin recursos aún</h3>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">
              El profesor aún no ha publicado materiales de apoyo para este módulo. ¡Vuelve pronto!
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
            <Sparkles className="h-3 w-3 text-primary" />
            Mientras tanto, prueba las <strong className="text-primary ml-1">Herramientas de IA</strong>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Recursos del Módulo
          </CardTitle>
          <CardDescription>Materiales de apoyo, presentaciones y datasets para descargar y consultar.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {resources.map((resource, index) => {
              const { icon: Icon, color, bg, label } = getResourceIcon(resource.file);
              return (
                <li key={index} className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-border/60 p-3.5 hover:border-primary/30 hover:bg-primary/3 transition-all gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{resource.title}</p>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 mt-0.5">{label}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewOnline(resource)}
                      className="h-8 text-xs font-medium hover:text-primary hover:bg-primary/10"
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Ver Online
                    </Button>
                    <Button asChild size="sm" variant="outline" className="h-8 text-xs font-medium group-hover:border-primary group-hover:text-primary transition-colors">
                      <Link href={resource.file} download>
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Descargar
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {/* Audio Player Dialog */}
      <Dialog open={!!selectedAudio} onOpenChange={(open) => !open && setSelectedAudio(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              {selectedAudio?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Music className="h-10 w-10 text-primary" />
            </div>
            <audio 
              controls 
              className="w-full" 
              autoPlay 
              src={selectedAudio?.url}
            >
              Tu navegador no soporta el elemento de audio.
            </audio>
            <p className="text-xs text-muted-foreground text-center">
              Puedes escuchar este recurso mientras sigues navegando por el curso.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
