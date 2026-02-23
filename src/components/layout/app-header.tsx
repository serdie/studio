import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PanelLeft, Bot } from 'lucide-react';
import { modules } from '@/lib/data';
import UserNav from '@/components/layout/user-nav';

export default function AppHeader() {
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
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Bot className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Curso IA CEOE-FEDETO</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            {modules.map(module => (
              <Link
                key={module.id}
                href={`/dashboard/modules/${module.slug}`}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
