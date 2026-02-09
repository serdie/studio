import { modules, getUser } from '@/lib/data';
import ModuleCard from '@/components/dashboard/module-card';

export default function DashboardPage() {
  const user = getUser();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold tracking-tight">Bienvenido de nuevo, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de tu progreso. ¡Sigue así!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-card rounded-lg border">
        <h2 className="text-xl font-headline font-semibold mb-2">Información del Curso</h2>
        <p className="text-muted-foreground">
          Curso de Inteligencia Artificial de la CEOE en Toledo.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><strong>Fechas:</strong> 02/03/2026 - 30/03/2026</li>
            <li className="flex items-center gap-2"><strong>Participantes:</strong> Jóvenes de 16 a 29 años</li>
            <li className="flex items-center gap-2"><strong>Ubicación:</strong> Toledo, España</li>
        </ul>
      </div>
    </div>
  );
}
