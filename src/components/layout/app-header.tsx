import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';
import { modules } from '@/lib/data';
import UserNav from '@/components/layout/user-nav';

export default function AppHeader() {
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-lg font-semibold shadow-sm border"
            >
              <Image 
                src={logoUrl} 
                alt="FEDETO Logo" 
                width={100} 
                height={35} 
                className="h-8 w-auto object-contain transition-all group-hover:scale-105"
              />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <div className="px-2.5 py-2 text-xs font-bold text-primary uppercase tracking-wider border-b">
              Módulos IA
            </div>
            {modules.map(module => (
              <Link
                key={module.id}
                href={`/dashboard/modules/${module.slug}`}
                className="flex items-center gap-4 px-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                {module.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Can add breadcrumbs or search here later */}
      </div>
      <UserNav />
    </header>
  );
}
