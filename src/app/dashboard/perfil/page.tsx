'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useAuth } from '@/firebase/provider';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Trash2, Save, X, Lock, Camera } from 'lucide-react';

interface UserProfile {
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'alumno' | 'profesor';
  bio?: string;
  phone?: string;
  location?: string;
  company?: string;
  school?: string;
  skills?: string;
  interests?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export default function ProfilePage() {
  const { user } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Estados para el formulario
  const [formData, setFormData] = useState<UserProfile>({
    displayName: '',
    email: '',
    photoURL: '',
    role: 'alumno',
    bio: '',
    phone: '',
    location: '',
    company: '',
    school: '',
    skills: '',
    interests: '',
    website: '',
    socialLinks: {},
  });

  // Estados para cambiar contraseña
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del usuario al montar
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      // Primero intentar cargar desde Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setFormData({
          displayName: data.displayName || user.displayName || '',
          email: user.email || '',
          photoURL: data.photoURL || user.photoURL || '',
          role: data.role || 'alumno',
          bio: data.bio || '',
          phone: data.phone || '',
          location: data.location || '',
          company: data.company || '',
          school: data.school || '',
          skills: data.skills || '',
          interests: data.interests || '',
          website: data.website || '',
          socialLinks: data.socialLinks || {},
        });
      } else {
        // Si no existe, usar datos básicos de Firebase Auth
        setFormData({
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          role: 'alumno',
          bio: '',
          phone: '',
          location: '',
          company: '',
          school: '',
          skills: '',
          interests: '',
          website: '',
          socialLinks: {},
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error al cargar perfil',
        description: 'No se pudieron cargar los datos del perfil.',
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Actualizar Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, formData, { merge: true });

      // Actualizar Firebase Auth si cambió el nombre o foto
      if (formData.displayName !== user.displayName || formData.photoURL !== user.photoURL) {
        await updateProfile(user, {
          displayName: formData.displayName,
          photoURL: formData.photoURL,
        });
      }

      toast({
        title: 'Perfil actualizado',
        description: 'Los cambios se han guardado correctamente.',
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error al guardar',
        description: 'No se pudieron guardar los cambios.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) return;

    if (passwords.new !== passwords.confirm) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Las nuevas contraseñas no coinciden.',
      });
      return;
    }

    if (passwords.new.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Reautenticar usuario
      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.current
      );
      await reauthenticateWithCredential(user, credential);

      // Cambiar contraseña
      await updatePassword(user, passwords.new);

      toast({
        title: 'Contraseña actualizada',
        description: 'La contraseña se ha cambiado correctamente.',
      });

      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        variant: 'destructive',
        title: 'Error al cambiar contraseña',
        description: error.code === 'auth/wrong-password' 
          ? 'La contraseña actual es incorrecta.'
          : 'No se pudo cambiar la contraseña.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsDeleting(true);

    try {
      // Eliminar documento de Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { deleted: true, deletedAt: new Date().toISOString() });

      // Eliminar usuario de Firebase Auth
      await user.delete();

      toast({
        title: 'Cuenta eliminada',
        description: 'Tu cuenta ha sido eliminada correctamente.',
      });

      router.push('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      
      // Si el error es que necesita reautenticación
      if (error.code === 'auth/requires-recent-login') {
        toast({
          variant: 'destructive',
          title: 'Reautenticación requerida',
          description: 'Por seguridad, inicia sesión nuevamente antes de eliminar tu cuenta.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error al eliminar cuenta',
          description: 'No se pudo eliminar la cuenta.',
        });
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu información personal y configuración</p>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <>
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                loadUserProfile();
              }}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Avatar y nombre */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.photoURL} alt={formData.displayName} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {getInitials(formData.displayName || user.email || 'U')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{formData.displayName || 'Usuario'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  formData.role === 'profesor' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {formData.role === 'profesor' ? '👨‍🏫 Profesor' : '👨‍🎓 Alumno'}
                </span>
              </div>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs del perfil */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="danger">Zona de Peligro</TabsTrigger>
        </TabsList>

        {/* Información General */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
              <CardDescription>Actualiza tu información personal y profesional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Foto de perfil */}
              <div className="space-y-2">
                <Label htmlFor="photoURL">Foto de perfil (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="photoURL"
                    value={formData.photoURL || ''}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://ejemplo.com/foto.jpg"
                  />
                  <Camera className="h-5 w-5 text-muted-foreground self-center" />
                </div>
              </div>

              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email (solo lectura) */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="pl-10 bg-muted/50"
                  />
                </div>
                <p className="text-xs text-muted-foreground">El email no se puede modificar</p>
              </div>

              {/* Rol */}
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de cuenta</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: 'alumno' | 'profesor') => setFormData({ ...formData, role: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alumno">👨‍🎓 Alumno</SelectItem>
                    <SelectItem value="profesor">👨‍🏫 Profesor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Campos específicos por rol */}
              {formData.role === 'profesor' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Centro educativo / Empresa</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="Nombre del centro o empresa"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="school">Centro educativo</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="school"
                        value={formData.school || ''}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10"
                        placeholder="Nombre del centro educativo"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Biografía */}
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Cuéntanos algo sobre ti..."
                  rows={4}
                />
              </div>

              {/* Teléfono y Ubicación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>
              </div>

              {/* Skills e Intereses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Habilidades</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills || ''}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    disabled={!isEditing}
                    placeholder="IA, Python, Machine Learning..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interests">Intereses</Label>
                  <Textarea
                    id="interests"
                    value={formData.interests || ''}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Deep Learning, NLP, Computer Vision..."
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seguridad */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Cambiar Contraseña
              </CardTitle>
              <CardDescription>Actualiza tu contraseña de forma segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <Button 
                onClick={handleChangePassword} 
                disabled={isLoading || !passwords.current || !passwords.new || !passwords.confirm}
              >
                {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zona de Peligro */}
        <TabsContent value="danger" className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Trash2 className="h-5 w-5" />
                Eliminar Cuenta
              </CardTitle>
              <CardDescription className="text-red-600">
                Esta acción es permanente y no se puede deshacer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-red-700">
                <p className="font-semibold mb-2">Al eliminar tu cuenta:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Se eliminarán todos tus datos personales</li>
                  <li>Perderás acceso a todos los cursos</li>
                  <li>Se eliminará tu progreso</li>
                  <li>No podrás recuperar tu cuenta</li>
                </ul>
              </div>

              <Separator className="bg-red-200" />

              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? 'Eliminando...' : 'Eliminar mi cuenta'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmación para eliminar cuenta */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-700">¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta 
              y todos tus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Sí, eliminar mi cuenta'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
