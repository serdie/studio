import Image from 'next/image';
import Link from 'next/link';
import { BrainCircuit, BotMessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-md sticky top-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image 
            src={logoUrl} 
            alt="FEDETO Logo" 
            width={120} 
            height={40} 
            className="h-8 w-auto object-contain"
          />
          <span className="text-xl font-bold font-headline tracking-tight text-primary">Curso IA CEOE-FEDETO</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Acceder</Link>
          </Button>
          <Button asChild className="hidden sm:flex">
            <Link href="/register">Registrarse</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-6xl xl:text-7xl/none">
                    Lidera el Futuro con <span className="text-primary">Inteligencia Artificial</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                    Plataforma educativa interactiva diseñada para jóvenes en Toledo (16-29 años). Aprende, crea y domina las herramientas que están cambiando el mundo con el respaldo de CEOE y FEDETO.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                   <Button size="lg" className="h-12 px-8 text-lg" asChild>
                     <Link href="/login">
                        Comenzar Ahora
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                   <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                     <Link href="#features">Saber Más</Link>
                   </Button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <Image
                  src="https://picsum.photos/seed/ai-hero/600/400"
                  width={600}
                  height={400}
                  alt="IA Hero"
                  data-ai-hint="artificial intelligence"
                  className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-2">Innovación Educativa</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Tu viaje hacia la maestría en IA</h2>
                <p className="max-w-[800px] text-muted-foreground text-lg">
                  Hemos diseñado una experiencia de aprendizaje práctica de 336 horas donde la teoría se encuentra con la creación real mediante herramientas de IA.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-3">
              <Card className="relative overflow-hidden border-none shadow-md bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center text-center pb-2 pt-8">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                    <BrainCircuit className="h-10 w-10" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Módulos Dinámicos</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-2">
                  9 módulos estructurados que evolucionan contigo, desde los fundamentos lógicos hasta el desarrollo de proyectos reales.
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none shadow-md bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center text-center pb-2 pt-8">
                  <div className="p-3 rounded-2xl bg-accent/10 text-accent mb-4">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Asistencia con IA</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-2">
                  Resuelve tus dudas al instante, genera resúmenes automáticos y crea contenido visual con nuestros agentes integrados.
                </CardContent>
              </Card>
               <Card className="relative overflow-hidden border-none shadow-md bg-card transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center text-center pb-2 pt-8">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                    <BotMessageSquare className="h-10 w-10" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Proyectos Reales</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-2">
                  No solo aprendes, construyes. El curso culmina con 90 horas dedicadas al desarrollo de proyectos prácticos integradores.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground shadow-2xl">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
              
              <div className="relative flex flex-col items-center justify-center gap-6 text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-5xl lg:text-6xl">
                  ¿Preparado para el desafío?
                </h2>
                <p className="max-w-[700px] text-primary-foreground/80 text-lg md:text-xl">
                  Únete a la comunidad de jóvenes creadores en Toledo y empieza a construir el futuro hoy mismo con CEOE y FEDETO.
                </p>
                <div className="mt-4">
                   <Button size="lg" variant="secondary" className="h-14 px-10 text-xl font-semibold shadow-lg hover:scale-105 transition-transform" asChild>
                     <Link href="/register">
                        Registrarme Gratis
                        <ArrowRight className="ml-2 h-6 w-6" />
                     </Link>
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-10 border-t bg-card/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Image 
                src={logoUrl} 
                alt="FEDETO Logo" 
                width={100} 
                height={35} 
                className="h-6 w-auto object-contain brightness-0 dark:brightness-100"
              />
              <span className="font-bold font-headline">Curso IA CEOE-FEDETO</span>
            </div>
            <p className="text-sm text-muted-foreground order-last md:order-none">
              &copy; {new Date().getFullYear()} Curso de IA Toledo. Impulsado por CEOE y FEDETO.
            </p>
            <nav className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Términos</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidad</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
