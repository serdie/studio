'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Settings, GraduationCap, ClipboardList } from 'lucide-react';
import { modules } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AppSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', icon: Home, label: 'Inicio' },
    { href: '/dashboard/instructor', icon: ClipboardList, label: 'Gestión del Curso', instructorOnly: true },
  ];

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-headline font-semibold">
            <Bot className="h-6 w-6 text-primary" />
            <span className="text-sm">Curso IA CEOE-FEDETO</span>
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
                    'bg-muted text-primary': pathname === href,
                  }
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            
            <div className="my-4 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Módulos del Curso
            </div>

            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/dashboard/modules/${m.slug}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted text-xs',
                  {
                    'bg-muted text-primary': pathname.includes(m.slug),
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
