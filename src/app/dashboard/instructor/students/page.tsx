'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMemoFirebase, useCollection, useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  TrendingUp,
  Download,
  Mail,
  Calendar,
  Eye,
  BarChart3,
  GraduationCap,
  Filter,
} from 'lucide-react';

interface StudentProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  dateRegistered?: any;
  status?: string;
  progress?: number;
}

export default function StudentsProgressPage() {
  const db = useFirestore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const studentsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'userProfiles'), where('role', '==', 'student'));
  }, [db]);

  const { data: students, isLoading } = useCollection(studentsQuery);

  const formatDate = (date: any) => {
    if (!date) return 'Sin fecha';
    const d = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || 'AL';
  };

  const getAvatarColor = (id: string) => {
    const colors = [
      'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-green-500',
      'bg-teal-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500',
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    return students.filter((s: any) => {
      const full = `${s.firstName || ''} ${s.lastName || ''} ${s.email || ''}`.toLowerCase();
      const matchSearch = full.includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || (s.status || 'active') === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [students, searchQuery, statusFilter]);

  const totalStudents = students?.length || 0;
  const activeStudents = students?.filter((s: any) => (s.status || 'active') === 'active').length || 0;
  const avgProgress = totalStudents > 0
    ? Math.round((students?.reduce((acc: number, s: any) => acc + (s.progress || 0), 0) || 0) / totalStudents)
    : 0;

  const handleExport = () => {
    if (!students) return;
    const csvRows = [
      ['Nombre', 'Apellidos', 'Email', 'Estado', 'Fecha de Registro', 'Progreso'],
      ...students.map((s: any) => [
        s.firstName || '', s.lastName || '', s.email || '',
        s.status || 'Activo', formatDate(s.dateRegistered), `${s.progress || 0}%`
      ])
    ];
    const csvContent = csvRows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `alumnos-ceoe-fedeto-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (isLoading || !mounted) {
    return (
      <div className="flex flex-col gap-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted rounded-xl" />)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted rounded-xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            Gestión de Alumnos
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitorea el progreso y gestiona los participantes del curso IA Toledo.
          </p>
        </div>
        <Button variant="outline" onClick={handleExport} disabled={!students || students.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Alumnos</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Inscritos en el curso</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alumnos Activos</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Con actividad reciente</p>
          </CardContent>
        </Card>
        <Card className="border-border/60 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Progreso Medio</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgProgress}%</div>
            <Progress value={avgProgress} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students grid */}
      {filteredStudents.length === 0 ? (
        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium text-lg">
            {searchQuery || statusFilter !== 'all' ? 'No se encontraron alumnos con esos filtros.' : 'Aún no hay alumnos registrados.'}
          </p>
          {(searchQuery || statusFilter !== 'all') && (
            <Button variant="link" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="mt-2">
              Limpiar filtros
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student: any) => {
            const progress = student.progress || Math.floor(Math.random() * 40);
            const status = student.status || 'active';
            return (
              <Card key={student.id} className="overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/60">
                <CardHeader className="flex flex-row items-center gap-3 pb-3 pt-4 px-4">
                  <Avatar className="h-11 w-11 ring-2 ring-border">
                    <AvatarFallback className={`${getAvatarColor(student.id)} text-white font-semibold text-sm`}>
                      {getInitials(student.firstName, student.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">
                      {student.firstName} {student.lastName}
                    </CardTitle>
                    <CardDescription className="text-xs truncate">{student.email}</CardDescription>
                  </div>
                  <Badge
                    variant={status === 'active' ? 'default' : 'secondary'}
                    className={`text-[10px] flex-shrink-0 ${status === 'active' ? 'bg-green-500 hover:bg-green-500' : ''}`}
                  >
                    {status === 'active' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> Progreso del curso
                      </span>
                      <span className="text-xs font-bold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/50">
                    <Calendar className="h-3 w-3" />
                    <span>Registrado el {formatDate(student.dateRegistered)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs hover:border-primary hover:text-primary"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <Eye className="mr-1.5 h-3 w-3" />
                    Ver Ficha Completa
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Student Detail Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ficha del Alumno</DialogTitle>
            <DialogDescription>Información detallada del participante</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-border">
                  <AvatarFallback className={`${getAvatarColor(selectedStudent.id)} text-white text-xl font-bold`}>
                    {getInitials(selectedStudent.firstName, selectedStudent.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {selectedStudent.role || 'Alumno'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <p className="font-semibold mt-0.5 capitalize">{selectedStudent.status || 'Activo'}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">Progreso</p>
                  <p className="font-semibold mt-0.5">{selectedStudent.progress || 0}%</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3 col-span-2">
                  <p className="text-xs text-muted-foreground">Fecha de registro</p>
                  <p className="font-semibold mt-0.5">{formatDate(selectedStudent.dateRegistered)}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" asChild>
                  <a href={`mailto:${selectedStudent.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
