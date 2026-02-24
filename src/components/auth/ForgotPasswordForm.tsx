'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { forgotPasswordSchema } from '@/lib/validations/auth.schemas';
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
import { Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { authService } from '@/lib/services/auth.service';
// import { APP_CONFIG } from '@/config/app.config'; // Removed as per instruction

export function ForgotPasswordForm() {
    const [step, setStep] = useState<1 | 2>(1);
    const [countdown, setCountdown] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const emailValue = form.watch('email');

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setIsSubmitting(true);
        try {
            await authService.forgotPassword(values.email);
            setStep(2);
            startCountdown();
        } catch (error) {
            toast.error('Error al enviar el enlace');
        } finally {
            setIsSubmitting(false);
        }
    }

    const startCountdown = () => {
        setCountdown(60);
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleResend = async () => {
        setIsSubmitting(true);
        try {
            await authService.forgotPassword(emailValue);
            startCountdown();
            toast.success('Enlace reenviado');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in relative overflow-hidden">

            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute invisible'}`}>
                <div className="space-y-2 mb-8">
                    <h2 className="text-3xl font-bold text-primary">Recuperar Contraseña</h2>
                    <p className="text-neutral-dark/60 text-sm">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                        <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90 text-on-primary active:scale-95 transition-all text-base h-12 rounded-full font-bold shadow-lg shadow-accent/20"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner size="sm" className="text-on-primary mr-2" /> : null}
                            Enviar enlace
                            {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
                        </Button>
                    </form>
                </Form>
            </div>

            <div className={`transition-all duration-300 ${step === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute invisible'}`}>
                <div className="flex flex-col items-center justify-center space-y-6 text-center">
                    <div className="w-20 h-20 bg-surface-light rounded-full flex items-center justify-center">
                        <Mail size={40} className="text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">Revisa tu correo</h2>
                    <p className="text-neutral-dark/60 text-sm">
                        Enviamos un enlace a <br /><span className="font-bold text-primary">{emailValue}</span>
                    </p>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full border-surface-soft text-neutral-dark hover:bg-surface-soft disabled:opacity-50 h-12 rounded-full font-bold mt-4"
                        onClick={handleResend}
                        disabled={countdown > 0 || isSubmitting}
                    >
                        {isSubmitting ? (
                            <Spinner size="sm" />
                        ) : countdown > 0 ? (
                            `Reenviar en ${countdown}s`
                        ) : (
                            'Reenviar código'
                        )}
                    </Button>
                </div>
            </div>

            <div className="pt-6 border-t border-surface-soft/30 text-center mt-6">
                <Link href="/login" className="text-sm text-accent hover:underline font-bold">
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    );
}
