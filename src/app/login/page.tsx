'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const loginBg = PlaceHolderImages.find(p => p.id === 'login-background');
  const logoUrl = "https://www.fedeto.es/wp-content/uploads/2020/10/logotipo-web-fedeto.png";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Error de acceso",
        description: "Credenciales incorrectas o usuario no encontrado.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: "No se pudo iniciar sesión con Google.",
      });
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Iniciar Sesión</h1>
            <p className="text-balance text-muted-foreground">
              Accede a tu cuenta de formación en IA
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nombre@ejemplo.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Accediendo...' : 'Iniciar Sesión'}
            </Button>
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleLogin}>
              Iniciar Sesión con Google
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="underline">
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
          <Link href="/" className="flex items-center gap-3 text-lg font-medium font-headline bg-white/90 p-3 rounded-lg w-fit">
            <Image 
              src={logoUrl} 
              alt="FEDETO Logo" 
              width={140} 
              height={45} 
              className="h-10 w-auto object-contain"
            />
            <span className="text-primary font-bold">Curso IA CEOE-FEDETO</span>
          </Link>
          <div className="mt-auto">
            <blockquote className="space-y-2 bg-black/40 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-lg italic">
                &ldquo;Esta plataforma ha transformado mi manera de aprender sobre IA. Las herramientas interactivas y el apoyo de CEOE y FEDETO son simplemente increíbles.&rdquo;
              </p>
              <footer className="text-sm font-semibold">— Sofia, Estudiante del curso</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
