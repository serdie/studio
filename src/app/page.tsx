import Image from 'next/image';
import Link from 'next/link';
import { Bot, BrainCircuit, BotMessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-card border-b">
        <Link href="/" className="flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 font-semibold font-headline">AI Learning Hub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Registrarse</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Desbloquea el Poder de la Inteligencia Artificial
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nuestra plataforma interactiva te guía a través de los conceptos más avanzados de IA, desde los fundamentos hasta la creación de tus propios modelos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                   <Button size="lg" asChild>
                     <Link href="/dashboard">
                        Empieza a Aprender
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                   </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/ai-hero/600/400"
                width={600}
                height={400}
                alt="Hero"
                data-ai-hint="artificial intelligence technology"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Características Principales</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Una nueva forma de aprender IA</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma está diseñada para ser práctica e interactiva, con herramientas de IA que te asistirán en cada paso de tu aprendizaje.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <BrainCircuit className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="font-headline">Módulos Interactivos</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-0">
                  Aprende a tu propio ritmo con contenido estructurado, desde conceptos básicos hasta temas avanzados.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Sparkles className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="font-headline">Asistentes de IA</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-0">
                  Obtén resúmenes, respuestas a tus preguntas y genera contenido visual con nuestras herramientas de IA integradas.
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <BotMessageSquare className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="font-headline">Creación de Proyectos</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-6 pt-0">
                  Aplica lo que aprendes creando tus propios avatares virtuales y otros proyectos prácticos.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                ¿Listo para comenzar tu viaje en la IA?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Regístrate ahora y obtén acceso inmediato a todos nuestros cursos y herramientas.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button size="lg" asChild>
                 <Link href="/login">
                    Comienza gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
               </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AI Learning Hub. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Términos de Servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}