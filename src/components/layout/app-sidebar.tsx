'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Settings, ClipboardList, Users, BookOpen, Star, User } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'userProfiles', user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);
  const isInstructor = profile?.role === 'instructor' || profile?.role === 'admin';
  const isStudent = !isInstructor;

  const instructorLinks = [
    { href: '/dashboard/instructor', icon: ClipboardList, label: 'Gestión de Contenidos' },
    { href: '/dashboard/instructor/students', icon: Users, label: 'Gestión de Alumnos' },
  ];

  const studentLinks = [
    { href: '/dashboard/mi-zona', icon: User, label: 'Mi Zona Personal', isNew: true },
  ];

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-0">
        {/* Logo */}
        <div className="flex h-16 items-center px-4 lg:px-6 border-b bg-primary">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1.5 shadow-sm">
              <Image
                src={logoUrl}
                alt="FEDETO Logo"
                width={90}
                height={30}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">Curso IA</span>
              <span className="text-xs text-white/70 leading-tight">CEOE-FEDETO</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid gap-0.5 px-3 text-sm font-medium">

            {/* Inicio */}
            <SidebarLink
              href="/dashboard"
              icon={Home}
              label="Inicio"
              isActive={pathname === '/dashboard'}
            />

            {/* Panel del Instructor */}
            {isInstructor && (
              <>
                <div className="mt-5 mb-2 px-2">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <ClipboardList className="h-3 w-3" /> Panel del Profesor
                  </p>
                </div>
                {instructorLinks.map(({ href, icon, label }) => (
                  <SidebarLink
                    key={href}
                    href={href}
                    icon={icon}
                    label={label}
                    isActive={pathname === href || pathname.startsWith(href + '/')}
                  />
                ))}
              </>
            )}

            {/* Zona del Alumno */}
            {isStudent && (
              <>
                <div className="mt-5 mb-2 px-2">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Star className="h-3 w-3" /> Mi Espacio
                  </p>
                </div>
                {studentLinks.map(({ href, icon, label, isNew }) => (
                  <SidebarLink
                    key={href}
                    href={href}
                    icon={icon}
                    label={label}
                    isActive={pathname === href || pathname.startsWith(href + '/')}
                    badge={isNew ? 'Nuevo' : undefined}
                  />
                ))}
              </>
            )}

            {/* Módulos */}
            <div className="mt-5 mb-2 px-2">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" /> Módulos del Curso
              </p>
            </div>
            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/dashboard/modules/${m.slug}`}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-primary/5 text-xs',
                  {
                    'bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-[10px]':
                      pathname.includes(m.slug),
                  }
                )}
              >
                <m.icon className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate leading-tight">{m.title.split(':')[0]}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Settings at bottom */}
        <div className="p-3 border-t bg-muted/20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted text-sm"
                >
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ajustes de la cuenta</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  isActive,
  badge,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-primary/5',
        {
          'bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-[10px]': isActive,
        }
      )}
    >
      <Icon className={cn('h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110')} />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <Badge variant="default" className="text-[9px] px-1.5 py-0 h-4 bg-amber-500 hover:bg-amber-500 text-white">
          {badge}
        </Badge>
      )}
    </Link>
  );
}
