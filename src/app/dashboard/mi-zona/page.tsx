'use client';

import { useState, useEffect, useTransition } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase, useDoc, useCollection } from '@/firebase';
import { doc, collection, addDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import {
    User,
    FileText,
    Target,
    Star,
    Plus,
    Trash2,
    CheckCircle,
    Circle,
    BookOpen,
    Pencil,
    Save,
    X,
    Calendar,
    Mail,
    Award,
    TrendingUp,
    Heart,
} from 'lucide-react';
import { modules } from '@/lib/data';

// ─── NOTAS ────────────────────────────────────────────────────────────────────
function NotasTab() {
    const { user } = useUser();
    const db = useFirestore();
    const { toast } = useToast();
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [isPending, startTransition] = useTransition();

    const notesQuery = useMemoFirebase(() => {
        if (!db || !user) return null;
        return query(collection(db, 'userNotes'), where('uid', '==', user.uid));
    }, [db, user]);

    const { data: notes, isLoading } = useCollection(notesQuery);

    const handleAddNote = () => {
        if (!newTitle.trim() || !db || !user) return;
        startTransition(async () => {
            await addDoc(collection(db, 'userNotes'), {
                uid: user.uid,
                title: newTitle.trim(),
                content: newContent.trim(),
                createdAt: serverTimestamp(),
            });
            setNewTitle('');
            setNewContent('');
            toast({ title: 'Nota guardada', description: 'Tu nota se ha guardado correctamente.' });
        });
    };

    const handleDeleteNote = (noteId: string) => {
        if (!db) return;
        startTransition(async () => {
            await deleteDoc(doc(db, 'userNotes', noteId));
            toast({ title: 'Nota eliminada' });
        });
    };

    const handleEditNote = (noteId: string) => {
        if (!db) return;
        startTransition(async () => {
            await updateDoc(doc(db, 'userNotes', noteId), { content: editContent });
            setEditingId(null);
            toast({ title: 'Nota actualizada' });
        });
    };

    const formatDate = (ts: any) => {
        if (!ts) return '';
        const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-5">
            {/* New note form */}
            <Card className="border-primary/20 bg-primary/3">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Plus className="h-4 w-4 text-primary" />
                        Nueva Nota
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Título de la nota..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Escribe aquí tus apuntes, reflexiones o conceptos clave..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                    <Button onClick={handleAddNote} disabled={!newTitle.trim() || isPending} size="sm" className="w-full sm:w-auto">
                        <Save className="mr-2 h-3.5 w-3.5" />
                        Guardar Nota
                    </Button>
                </CardContent>
            </Card>

            {/* Notes list */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />)}
                </div>
            ) : notes?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p>Aún no tienes notas. ¡Empieza a apuntar lo que aprendes!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notes?.map((note: any) => (
                        <Card key={note.id} className="border-border/60">
                            <CardHeader className="pb-2 flex flex-row items-start justify-between">
                                <div>
                                    <CardTitle className="text-sm font-semibold">{note.title}</CardTitle>
                                    <CardDescription className="text-xs flex items-center gap-1 mt-0.5">
                                        <Calendar className="h-3 w-3" /> {formatDate(note.createdAt)}
                                    </CardDescription>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditingId(note.id); setEditContent(note.content); }}>
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-destructive" onClick={() => handleDeleteNote(note.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {editingId === note.id ? (
                                    <div className="space-y-2">
                                        <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="min-h-[80px] resize-none text-sm" />
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={() => handleEditNote(note.id)} disabled={isPending}><Save className="mr-1 h-3 w-3" />Guardar</Button>
                                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="mr-1 h-3 w-3" />Cancelar</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{note.content}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── OBJETIVOS ────────────────────────────────────────────────────────────────
function ObjetivosTab() {
    const { user } = useUser();
    const db = useFirestore();
    const { toast } = useToast();
    const [newGoal, setNewGoal] = useState('');
    const [isPending, startTransition] = useTransition();

    const goalsQuery = useMemoFirebase(() => {
        if (!db || !user) return null;
        return query(collection(db, 'userGoals'), where('uid', '==', user.uid));
    }, [db, user]);

    const { data: goals, isLoading } = useCollection(goalsQuery);

    const handleAddGoal = () => {
        if (!newGoal.trim() || !db || !user) return;
        startTransition(async () => {
            await addDoc(collection(db, 'userGoals'), {
                uid: user.uid,
                text: newGoal.trim(),
                completed: false,
                createdAt: serverTimestamp(),
            });
            setNewGoal('');
            toast({ title: 'Objetivo añadido', description: 'Tu objetivo ha sido guardado.' });
        });
    };

    const handleToggleGoal = (goalId: string, current: boolean) => {
        if (!db) return;
        startTransition(async () => {
            await updateDoc(doc(db, 'userGoals', goalId), { completed: !current });
        });
    };

    const handleDeleteGoal = (goalId: string) => {
        if (!db) return;
        startTransition(async () => {
            await deleteDoc(doc(db, 'userGoals', goalId));
        });
    };

    const completed = goals?.filter((g: any) => g.completed).length || 0;
    const total = goals?.length || 0;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="space-y-5">
            {/* Progress overview */}
            {total > 0 && (
                <Card className="border-border/60">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progreso de objetivos</span>
                            <span className="text-sm font-bold">{completed}/{total} completados</span>
                        </div>
                        <Progress value={pct} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{pct}% de tus objetivos alcanzados</p>
                    </CardContent>
                </Card>
            )}

            {/* Add goal */}
            <div className="flex gap-2">
                <Input
                    placeholder="Añade un nuevo objetivo personal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
                    className="flex-1"
                />
                <Button onClick={handleAddGoal} disabled={!newGoal.trim() || isPending}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            {/* Goals list */}
            {isLoading ? (
                <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />)}</div>
            ) : goals?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <Target className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p>Aún no tienes objetivos. ¡Define tus metas de aprendizaje!</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {goals?.map((goal: any) => (
                        <div
                            key={goal.id}
                            className={`group flex items-center gap-3 rounded-xl border p-3.5 transition-all ${goal.completed ? 'bg-green-50 border-green-200' : 'border-border/60 hover:border-primary/30'}`}
                        >
                            <button onClick={() => handleToggleGoal(goal.id, goal.completed)} className="flex-shrink-0">
                                {goal.completed
                                    ? <CheckCircle className="h-5 w-5 text-green-500" />
                                    : <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                                }
                            </button>
                            <span className={`flex-1 text-sm ${goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {goal.text}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                                onClick={() => handleDeleteGoal(goal.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── PERFIL ───────────────────────────────────────────────────────────────────
function PerfilTab() {
    const { user } = useUser();
    const db = useFirestore();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [isPending, startTransition] = useTransition();

    const profileRef = useMemoFirebase(() => {
        if (!db || !user) return null;
        return doc(db, 'userProfiles', user.uid);
    }, [db, user]);

    const { data: profile } = useDoc(profileRef);

    const formatDate = (ts: any) => {
        if (!ts) return 'Sin fecha';
        const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const initials = `${profile?.firstName?.charAt(0) || ''}${profile?.lastName?.charAt(0) || ''}`.toUpperCase() || '??';

    const handleSaveName = () => {
        if (!db || !user || !editName.trim()) return;
        startTransition(async () => {
            await updateDoc(doc(db, 'userProfiles', user.uid), { firstName: editName.trim() });
            setIsEditing(false);
            toast({ title: 'Perfil actualizado', description: 'Tu nombre se ha guardado correctamente.' });
        });
    };

    return (
        <div className="space-y-5 max-w-lg mx-auto">
            <Card className="border-border/60 overflow-hidden">
                <div className="h-20 bg-gradient-to-r from-primary to-primary/70" />
                <CardContent className="pt-0 pb-5 px-5">
                    <div className="-mt-8 flex items-end gap-4 mb-4">
                        <Avatar className="h-16 w-16 ring-4 ring-background">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="mb-1">
                            <Badge variant="secondary" className="text-xs capitalize">
                                <Award className="mr-1 h-3 w-3" />
                                {profile?.role || 'Alumno'}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nombre</Label>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Tu nombre..." />
                                    <Button size="sm" onClick={handleSaveName} disabled={isPending}><Save className="h-3.5 w-3.5" /></Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}><X className="h-3.5 w-3.5" /></Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{profile?.firstName} {profile?.lastName}</p>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setIsEditing(true); setEditName(profile?.firstName || ''); }}>
                                        <Pencil className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Correo Electrónico</Label>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{user?.email || profile?.email || 'Sin email'}</span>
                            </div>
                        </div>

                        {/* Member since */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Miembro desde</Label>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{formatDate(profile?.dateRegistered)}</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5">
                            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Progreso global en el curso</Label>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Módulos completados</span>
                                    <span className="font-bold">0 de 9</span>
                                </div>
                                <Progress value={0} className="h-2" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ─── FAVORITOS ────────────────────────────────────────────────────────────────
function FavoritosTab() {
    const { user } = useUser();
    const db = useFirestore();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

    const favsRef = useMemoFirebase(() => {
        if (!db || !user) return null;
        return doc(db, 'userFavorites', user.uid);
    }, [db, user]);

    const { data: favsDoc } = useDoc(favsRef);

    useEffect(() => {
        if (favsDoc?.modules) {
            setFavoriteIds(new Set(favsDoc.modules));
        }
    }, [favsDoc]);

    const toggleFavorite = (slug: string) => {
        if (!db || !user) return;
        startTransition(async () => {
            const newFavs = new Set(favoriteIds);
            if (newFavs.has(slug)) {
                newFavs.delete(slug);
                toast({ title: 'Eliminado de favoritos' });
            } else {
                newFavs.add(slug);
                toast({ title: 'Añadido a favoritos', description: 'Módulo guardado en Mis Favoritos.' });
            }
            setFavoriteIds(newFavs);
            await updateDoc(doc(db, 'userFavorites', user.uid), { modules: Array.from(newFavs) }).catch(async () => {
                const { setDoc } = await import('firebase/firestore');
                await setDoc(doc(db, 'userFavorites', user.uid), { modules: Array.from(newFavs) });
            });
        });
    };

    const favoriteModules = modules.filter(m => favoriteIds.has(m.slug));

    return (
        <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
                Marca los módulos que más te interesan para acceder rápidamente a ellos.
            </p>

            {/* All modules - toggle favorites */}
            <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Todos los módulos</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                    {modules.map((m) => {
                        const isFav = favoriteIds.has(m.slug);
                        return (
                            <div
                                key={m.slug}
                                className={`group flex items-center gap-3 rounded-xl border p-3 transition-all ${isFav ? 'border-amber-300 bg-amber-50' : 'border-border/60 hover:border-primary/30'}`}
                            >
                                <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isFav ? 'bg-amber-100' : 'bg-primary/10'}`}>
                                    <m.icon className={`h-4 w-4 ${isFav ? 'text-amber-600' : 'text-primary'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{m.title.split(':')[0]}</p>
                                    <p className="text-[10px] text-muted-foreground">{m.duration}</p>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(m.slug)}
                                    disabled={isPending}
                                    className="flex-shrink-0 transition-transform hover:scale-110"
                                >
                                    <Heart
                                        className={`h-4 w-4 transition-colors ${isFav ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground group-hover:text-amber-400'}`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Favorites quick access */}
            {favoriteModules.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <Star className="h-4 w-4 text-amber-500" /> Mis Favoritos
                    </h3>
                    <div className="space-y-2">
                        {favoriteModules.map((m) => (
                            <a
                                key={m.slug}
                                href={`/dashboard/modules/${m.slug}`}
                                className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 hover:bg-amber-100 transition-colors"
                            >
                                <m.icon className="h-4 w-4 text-amber-600 flex-shrink-0" />
                                <span className="text-sm font-medium text-amber-800">{m.title.split(':')[0]}</span>
                                <BookOpen className="ml-auto h-4 w-4 text-amber-500" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MiZonaPage() {
    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                    <User className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-headline font-bold tracking-tight">Mi Zona Personal</h1>
                    <p className="text-muted-foreground text-sm">Tu espacio privado de aprendizaje · Notas, objetivos, perfil y favoritos.</p>
                </div>
            </div>

            <Tabs defaultValue="notas" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto p-1">
                    <TabsTrigger value="notas" className="flex items-center gap-2 py-2.5 text-xs sm:text-sm">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Mis Notas</span>
                    </TabsTrigger>
                    <TabsTrigger value="objetivos" className="flex items-center gap-2 py-2.5 text-xs sm:text-sm">
                        <Target className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Objetivos</span>
                    </TabsTrigger>
                    <TabsTrigger value="perfil" className="flex items-center gap-2 py-2.5 text-xs sm:text-sm">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Mi Perfil</span>
                    </TabsTrigger>
                    <TabsTrigger value="favoritos" className="flex items-center gap-2 py-2.5 text-xs sm:text-sm">
                        <Star className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden sm:inline">Favoritos</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="notas" className="mt-5">
                    <NotasTab />
                </TabsContent>
                <TabsContent value="objetivos" className="mt-5">
                    <ObjetivosTab />
                </TabsContent>
                <TabsContent value="perfil" className="mt-5">
                    <PerfilTab />
                </TabsContent>
                <TabsContent value="favoritos" className="mt-5">
                    <FavoritosTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
