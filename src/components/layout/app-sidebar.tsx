'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Settings, ClipboardList, Users } from 'lucide-react';
import { modules } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";

  // Obtener el rol del usuario desde Firestore
  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'userProfiles', user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);
  const isInstructor = profile?.role === 'instructor' || profile?.role === 'admin';

  const navLinks = [
    { href: '/dashboard', icon: Home, label: 'Inicio' },
    ...(isInstructor ? [
      { href: '/dashboard/instructor', icon: ClipboardList, label: 'Gestión de Contenidos' },
      { href: '/dashboard/instructor/students', icon: Users, label: 'Avance Alumnos' }
    ] : []),
  ];

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-3 font-headline font-semibold">
            <Image 
              src={logoUrl} 
              alt="FEDETO Logo" 
              width={100} 
              height={35} 
              className="h-7 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                  {
                    'bg-muted text-primary font-semibold': pathname === href,
                  }
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            
            <div className="my-4 px-3 text-xs font-bold text-primary uppercase tracking-wider">
              Módulos del Curso
            </div>

            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/dashboard/modules/${m.slug}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted text-xs',
                  {
                    'bg-muted text-primary font-semibold': pathname.includes(m.slug),
                  }
                )}
              >
                <m.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{m.title.split(':')[0]}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ajustes</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}
