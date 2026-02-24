'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerSchema } from '@/lib/validations/auth.schemas';
import { useAuth } from '@/store/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { APP_CONFIG } from '@/config/app.config';
import { cn } from '@/lib/utils';

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, isLoading } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    });

    const passwordValue = form.watch('password');

    // Evaluar fortaleza de la contraseña
    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (pass.length === 0) return 0;
        if (pass.length > 7) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) Math.min(score++, 3);
        return Math.min(score, 3);
    };

    const strength = getPasswordStrength(passwordValue);

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            await register(values);
            toast.success('¡Cuenta creada! Inicia sesión.');
            router.push('/login');
        } catch (error: any) {
            toast.error('Error al registrar la cuenta');
        }
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-primary">Crear Cuenta</h2>
                <p className="text-neutral-dark/60 text-sm">Regístrate para comenzar a usar la plataforma</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold text-sm">Nombre completo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ej. Frank López"
                                        className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold text-sm">Correo electrónico</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="nombre@empresa.com"
                                        className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold text-sm">Contraseña</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="bg-surface-light border-transparent focus:border-accent focus:ring-accent pr-10 text-neutral-dark h-11"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark/60 hover:text-neutral-dark"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>

                                {passwordValue.length > 0 && (
                                    <div className="flex space-x-1 mt-2">
                                        {[1, 2, 3].map((level) => (
                                            <div
                                                key={level}
                                                className={cn(
                                                    "h-1 w-full rounded-full transition-all flex-1",
                                                    strength >= level ? (
                                                        level === 1 ? "bg-red-500" :
                                                            level === 2 ? "bg-yellow-500" : "bg-accent"
                                                    ) : "bg-surface-soft/30"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}
                                <FormMessage className="text-red-500 font-medium text-xs mt-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary font-bold text-sm">Confirmar Contraseña</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            className="bg-surface-light border-transparent focus:border-accent focus:ring-accent pr-10 text-neutral-dark h-11"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark/60 hover:text-neutral-dark"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 font-medium text-xs" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-on-primary active:scale-95 transition-all text-base h-12 rounded-full font-bold shadow-lg shadow-accent/20 mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner size="sm" className="text-on-primary mr-2" /> : null}
                        Registrarse
                        {!isLoading && <ArrowRight size={18} className="ml-2" />}
                    </Button>

                    <div className="pt-6 border-t border-surface-soft/30 text-center">
                        <p className="text-sm text-neutral-dark/60">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-accent hover:underline font-bold">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
