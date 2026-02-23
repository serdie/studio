'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, BookCopy, User, Settings } from 'lucide-react';
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
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    ...modules.map(m => ({
      href: `/dashboard/modules/${m.slug}`,
      icon: m.icon,
      label: m.title,
    })),
  ];

  return (
    <aside className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-headline font-semibold">
            <Bot className="h-6 w-6 text-primary" />
            <span className="">Curso IA CEOE-FEDETO</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
          </nav>
        </div>
        <div className="mt-auto p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                  <Settings className="h-4 w-4" />
                  <span>Ajustes</span>
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
