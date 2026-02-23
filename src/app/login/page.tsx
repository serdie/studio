import Image from 'next/image';
import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const loginBg = PlaceHolderImages.find(p => p.id === 'login-background');

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Iniciar Sesión</h1>
            <p className="text-balance text-muted-foreground">
              Introduce tu correo para acceder a tu cuenta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="nombre@ejemplo.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/dashboard">Iniciar Sesión</Link>
            </Button>
            <Button variant="outline" className="w-full">
              Iniciar Sesión con Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link href="#" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginBg && (
          <Image
            src={loginBg.imageUrl}
            alt={loginBg.description}
            data-ai-hint={loginBg.imageHint}
            fill
            className="object-cover dark:brightness-[0.3]"
          />
        )}
        <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
          <Link href="/" className="flex items-center gap-2 text-lg font-medium font-headline">
            <Bot className="h-8 w-8 text-primary-foreground" />
            <span>Curso IA CEOE-FEDETO</span>
          </Link>
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Esta plataforma ha transformado mi manera de aprender sobre IA. Las herramientas interactivas son simplemente increíbles.&rdquo;
              </p>
              <footer className="text-sm">Sofia, Estudiante del curso</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
