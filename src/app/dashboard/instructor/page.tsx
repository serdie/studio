'use client';

import { useState, useRef, useMemo } from 'react';
import { modules } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Link as LinkIcon, Image as ImageIcon, FileUp, Send, Loader2, FileText, Video, Music, AlertTriangle, Users, MessageSquare } from 'lucide-react';
import { useFirestore, useStorage, useUser, useMemoFirebase } from '@/firebase/provider';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Badge } from '@/components/ui/badge';

export default function InstructorPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const db = useFirestore();
  const storage = useStorage();

  // Fetch AI Analytics for predictive dashboard
  const analyticsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'ai_analytics'), orderBy('timestamp', 'desc'), limit(50));
  }, [db]);

  const { data: analyticsData, isLoading: isLoadingAnalytics } = useCollection<any>(analyticsQuery as any);

  // Simple Predictive Logic: Students with many questions in short time
  const atRiskStudents = useMemo(() => {
    if (!analyticsData) return [];
    const counts: Record<string, { name: string, count: number, module: string }> = {};
    analyticsData.forEach(item => {
      const key = `${item.userId}_${item.moduleSlug}`;
      if (!counts[key]) counts[key] = { name: item.userName, count: 0, module: item.moduleSlug };
      counts[key].count++;
    });
    return Object.values(counts).filter(c => c.count >= 3); // More than 3 questions = attention
  }, [analyticsData]);
  
  const [selectedModule, setSelectedModule] = useState<string>('');
// ... (mantenemos el resto del componente igual pero añadiremos la UI al final)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('link');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedModule || !title) {
      toast({
        variant: 'destructive',
        title: 'Faltan datos',
        description: 'Por favor, selecciona un módulo e indica un título.',
      });
      return;
    }

    if (type !== 'link' && !selectedFile) {
      toast({
        variant: 'destructive',
        title: 'Archivo no seleccionado',
        description: 'Por favor, selecciona un archivo para subir.',
      });
      return;
    }

    setIsUploading(true);

    try {
      let finalUrl = url;

      if (type !== 'link' && selectedFile) {
        const fileRef = ref(storage, `resources/${Date.now()}_${selectedFile.name}`);
        const uploadResult = await uploadBytes(fileRef, selectedFile);
        finalUrl = await getDownloadURL(uploadResult.ref);
      }

      await addDoc(collection(db, 'resources'), {
        title,
        description,
        url: finalUrl,
        type,
        moduleSlug: modules.find(m => m.title === selectedModule)?.slug || '',
        moduleTitle: selectedModule,
        uploadedBy: user?.uid,
        uploadedAt: serverTimestamp(),
        fileName: selectedFile?.name || null,
        fileSize: selectedFile?.size || null,
      });

      toast({
        title: 'Contenido añadido',
        description: `Se ha añadido "${title}" correctamente.`,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setUrl('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        variant: 'destructive',
        title: 'Error al subir',
        description: 'Ha ocurrido un problema al procesar la subida.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold">Gestión de Contenidos (Panel del Profesor)</h1>
        <p className="text-muted-foreground">Sube recursos, documentos y materiales multimedia para los alumnos.</p>
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
                  <SelectItem value="pdf">Documento PDF</SelectItem>
                  <SelectItem value="doc">PowerPoint / Word</SelectItem>
                  <SelectItem value="video">Video (MP4)</SelectItem>
                  <SelectItem value="audio">Audio (MP3)</SelectItem>
                  <SelectItem value="image">Imagen / Infografía</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Título del Recurso</Label>
            <Input 
              placeholder="Ej: Manual de Prompt Engineering v1.0" 
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUploading}
            />
          </div>

          {type === 'link' ? (
            <div className="space-y-2" key="link-input">
              <Label>URL o Enlace</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="https://..." 
                  value={url || ''}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isUploading}
                />
                <Button variant="outline" size="icon">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2" key="file-input">
              <Label>Archivo</Label>
              <div className="flex items-center gap-4 p-4 border-2 border-dashed rounded-lg bg-muted/50">
                <Input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={
                    type === 'pdf' ? '.pdf' :
                    type === 'doc' ? '.doc,.docx,.ppt,.pptx' :
                    type === 'video' ? '.mp4,.mov' :
                    type === 'audio' ? '.mp3,.wav' :
                    type === 'image' ? 'image/*' : '*'
                  }
                  disabled={isUploading}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full"
                >
                  {selectedFile ? (
                    <span className="flex items-center gap-2">
                      <FileUp className="h-4 w-4" /> {selectedFile.name}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      {type === 'pdf' && <FileText className="h-4 w-4" />}
                      {type === 'video' && <Video className="h-4 w-4" />}
                      {type === 'audio' && <Music className="h-4 w-4" />}
                      {(type === 'doc' || type === 'image') && <FileUp className="h-4 w-4" />}
                      Haz clic para seleccionar el archivo
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Descripción / Instrucciones</Label>
            <Textarea 
              placeholder="Explica brevemente de qué trata este recurso..." 
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isUploading}
            />
          </div>

          <Button className="w-full" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</>
            ) : (
              <><Send className="mr-2 h-4 w-4" /> Publicar Contenido</>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-amber-200/50 bg-amber-50/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Atención Requerida (IA Predictiva)
            </CardTitle>
            <CardDescription>Alumnos con mayor número de dudas sin resolver en las últimas 24h.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin opacity-20" /></div>
            ) : atRiskStudents.length > 0 ? (
              <ul className="space-y-3">
                {atRiskStudents.map((risk, i) => (
                  <li key={i} className="flex items-center justify-between p-2 rounded-lg bg-background border border-amber-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{risk.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{risk.module.replace(/-/g, ' ')}</span>
                    </div>
                    <Badge variant="destructive" className="text-[10px] bg-amber-500 hover:bg-amber-600">
                      {risk.count} dudas IA
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4 italic">No se han detectado alumnos bloqueados.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Últimas Consultas a la IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingAnalytics ? (
              <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin opacity-20" /></div>
            ) : analyticsData && analyticsData.length > 0 ? (
              <ul className="space-y-3">
                {analyticsData.slice(0, 5).map((log, i) => (
                  <li key={i} className="text-xs p-2 rounded-lg border border-border/50">
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-primary">{log.userName}</span>
                      <span className="text-[10px] opacity-60">
                        {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleTimeString() : 'Recién ahora'}
                      </span>
                    </div>
                    <p className="italic text-muted-foreground line-clamp-1">"{log.question}"</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4 italic">Aún no hay actividad de consultas.</p>
            )}
          </CardContent>
        </Card>
      </div>

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
