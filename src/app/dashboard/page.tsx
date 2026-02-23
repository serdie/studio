import { modules, getUser } from '@/lib/data';
import ModuleCard from '@/components/dashboard/module-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, MapPin, Users } from 'lucide-react';

export default function DashboardPage() {
  const user = getUser();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          ¡Hola, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">Bienvenido al Portal de Formación en IA de CEOE y FEDETO.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">336 h</div>
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ubicación</CardTitle>
            <MapPin className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Toledo</div>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Edad Objetivo</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16-29 años</div>
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificación</CardTitle>
            <GraduationCap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CEOE-FEDETO</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-6">Módulos del Itinerario</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
