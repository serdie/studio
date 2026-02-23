'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear el perfil en Firestore
      await setDoc(doc(db, 'userProfiles', user.uid), {
        id: user.uid,
        firstName,
        lastName,
        email,
        role,
        dateRegistered: serverTimestamp(),
      });

      toast({
        title: "Cuenta creada",
        description: `Bienvenido al curso, ${firstName}.`,
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Error al registrarse",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
      <div className="mx-auto grid w-[400px] gap-6">
        <div className="flex flex-col gap-2 text-center">
          <div className="flex justify-center mb-2">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-headline">Crear Cuenta</h1>
          <p className="text-muted-foreground">Únete al curso de IA de CEOE y FEDETO</p>
        </div>
        
        <form onSubmit={handleRegister} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Nombre</Label>
              <Input 
                id="first-name" 
                placeholder="Juan" 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Apellidos</Label>
              <Input 
                id="last-name" 
                placeholder="García" 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          
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
            <Label htmlFor="password">Contraseña</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Tipo de Perfil</Label>
            <RadioGroup 
              defaultValue="student" 
              onValueChange={(value) => setRole(value as 'student' | 'instructor')}
              className="flex gap-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="font-normal">Alumno</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instructor" id="instructor" />
                <Label htmlFor="instructor" className="font-normal">Profesor</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
