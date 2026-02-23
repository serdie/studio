import { modules, getUser } from '@/lib/data';
import ModuleCard from '@/components/dashboard/module-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Clock, MapPin, Users, TrendingUp, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const user = getUser();

  const statsCards = [
    {
      title: 'Horas Totales',
      value: '336 h',
      icon: Clock,
      color: 'text-primary',
      bg: 'bg-primary/8',
      ring: 'ring-primary/20',
    },
    {
      title: 'Ubicación',
      value: 'Toledo',
      icon: MapPin,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      ring: 'ring-blue-200',
    },
    {
      title: 'Módulos del Curso',
      value: '9 módulos',
      icon: BookOpen,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      ring: 'ring-indigo-200',
    },
    {
      title: 'Certificación',
      value: 'CEOE-FEDETO',
      icon: GraduationCap,
      color: 'text-green-600',
      bg: 'bg-green-50',
      ring: 'ring-green-200',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-16 -mb-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">
              ¡Hola, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-foreground/80 mt-1 text-sm sm:text-base">
              Bienvenido al Portal de Formación en IA de CEOE y FEDETO · Toledo
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <TrendingUp className="h-5 w-5" />
            <div>
              <p className="text-xs text-primary-foreground/70">Tu progreso</p>
              <p className="font-bold text-lg">0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map(({ title, value, icon: Icon, color, bg, ring }) => (
          <Card key={title} className="border-border/60 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${bg} ${color} flex items-center justify-center ring-1 ${ring}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-headline font-bold tracking-tight">Módulos del Itinerario</h2>
            <p className="text-muted-foreground text-sm mt-0.5">9 módulos · 336 horas de formación práctica en IA</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}
