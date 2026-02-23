'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, GraduationCap } from 'lucide-react';
import { modules } from '@/lib/data';
import UserNav from '@/components/layout/user-nav';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";
  const pathname = usePathname();
  const { user } = useUser();
  const db = useFirestore();

  const profileRef = useMemoFirebase(() => {
    if (!db || !user) return null;
    return doc(db, 'userProfiles', user.uid);
  }, [db, user]);

  const { data: profile } = useDoc(profileRef);

  // Build breadcrumb label from pathname
  const getBreadcrumb = () => {
    if (pathname === '/dashboard') return 'Inicio';
    if (pathname === '/dashboard/instructor') return 'Gestión de Contenidos';
    if (pathname === '/dashboard/instructor/students') return 'Gestión de Alumnos';
    if (pathname === '/dashboard/mi-zona') return 'Mi Zona Personal';
    if (pathname.includes('/dashboard/modules/')) {
      const slug = pathname.split('/').pop() || '';
      const mod = modules.find(m => m.slug === slug);
      return mod ? mod.title.split(':')[0] : 'Módulo';
    }
    return 'Panel';
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:px-6">
      {/* Mobile menu trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Abrir Menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          <div className="flex items-center gap-3 px-4 py-4 bg-primary">
            <div className="bg-white rounded-lg p-1.5">
              <Image
                src={logoUrl}
                alt="FEDETO Logo"
                width={80}
                height={28}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Curso IA CEOE-FEDETO</p>
            </div>
          </div>
          <nav className="grid gap-1 text-sm font-medium p-3">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:text-primary hover:bg-primary/5">
              Inicio
            </Link>
            <div className="px-3 py-2 text-[10px] font-bold text-primary uppercase tracking-widest mt-3">
              Módulos IA
            </div>
            {modules.map(module => (
              <Link
                key={module.id}
                href={`/dashboard/modules/${module.slug}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5",
                  pathname.includes(module.slug) && "text-primary font-semibold"
                )}
              >
                <module.icon className="h-3.5 w-3.5 flex-shrink-0" />
                {module.title.split(':')[0]}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <GraduationCap className="h-4 w-4 text-primary hidden sm:block" />
        <span className="text-muted-foreground hidden sm:block">CEOE-FEDETO</span>
        <span className="text-muted-foreground hidden sm:block">/</span>
        <span className="font-semibold text-foreground">{getBreadcrumb()}</span>
      </div>

      {/* Greeting — only show on md+ */}
      {profile?.firstName && (
        <div className="hidden lg:flex items-center gap-1.5 ml-2">
          <span className="text-xs text-muted-foreground">
            ¡Hola, <span className="font-semibold text-foreground">{profile.firstName}</span>!
          </span>
        </div>
      )}

      <div className="ml-auto">
        <UserNav />
      </div>
    </header>
  );
}
