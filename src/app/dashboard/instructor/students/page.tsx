'use client';

import { useState, useEffect } from 'react';
import { useMemoFirebase, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

export default function StudentsProgressPage() {
  const db = useFirestore();
  const [mounted, setMounted] = useState(false);

  // Handle mounting state to avoid hydration errors with date formatting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Query to get all profiles that are students
  const studentsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'userProfiles'), where('role', '==', 'student'));
  }, [db]);

  const { data: students, isLoading } = useCollection(studentsQuery);

  if (isLoading || !mounted) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full"></div>
      </div>
    );
  }

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    // Firestore timestamp has seconds and nanoseconds
    const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Avance de Alumnos</h1>
        <p className="text-muted-foreground">Monitorea el progreso de los participantes del curso IA Toledo.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students?.map((student) => (
          <Card key={student.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{student.firstName} {student.lastName}</CardTitle>
                <CardDescription className="text-xs truncate">{student.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estado del curso:</span>
                  <Badge variant="secondary">Activo</Badge>
                </div>
                <div className="pt-2 border-t text-xs text-muted-foreground">
                  <p>Registrado el: {formatDate(student.dateRegistered)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {students?.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl">
             <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
             <p className="text-muted-foreground font-medium">Aún no hay alumnos registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
