'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerSchema } from '@/lib/validations/auth.schemas';
import { useAuth } from '@/store/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { APP_CONFIG } from '@/config/app.config';
import { cn } from '@/lib/utils';

export function RegisterForm() {
    const [step, setStep] = useState(1);
    const [phonePrefix, setPhonePrefix] = useState('0412');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, isLoading } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAccepted: false,
        },
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

    const onNextStep = async () => {
        const isValid = await form.trigger(['email', 'password', 'confirmPassword']);
        if (isValid) {
            setStep(2);
        }
    };

    const onPrevStep = () => {
        setStep(1);
    };

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        if (step !== 2) return;
        try {
            await register(values);
            toast.success('Te hemos enviado un enlace de activación a tu correo electrónico.');
            router.push('/login');
        } catch (error) {
            toast.error('Error al registrar la cuenta');
        }
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-primary">
                        {step === 1 ? 'Crea tu cuenta' : 'Completa tus datos'}
                    </h2>
                    <p className="text-neutral-dark/60 text-sm">Por favor introduce tus datos para continuar.</p>
                </div>

                <div className="flex justify-center items-center space-x-12">
                    <div className="flex flex-col items-center space-y-2">
                        <div
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300',
                                step === 1
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-surface-soft/20 text-neutral-dark/40'
                            )}
                        >
                            1
                        </div>
                        <span
                            className={cn(
                                'text-sm transition-colors',
                                step === 1 ? 'text-primary font-bold' : 'text-neutral-dark/40 font-medium'
                            )}
                        >
                            Credenciales
                        </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300',
                                step === 2
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'bg-surface-soft/20 text-neutral-dark/40'
                            )}
                        >
                            2
                        </div>
                        <span
                            className={cn(
                                'text-sm transition-colors',
                                step === 2 ? 'text-primary font-bold' : 'text-neutral-dark/40 font-medium'
                            )}
                        >
                            Datos personales
                        </span>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {step === 1 && (
                        <div className="space-y-5 animate-fade-in">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm">
                                            Correo electrónico
                                        </FormLabel>
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
                                                            'h-1 w-full rounded-full transition-all flex-1',
                                                            strength >= level
                                                                ? level === 1
                                                                    ? 'bg-red-500'
                                                                    : level === 2
                                                                      ? 'bg-yellow-500'
                                                                      : 'bg-accent'
                                                                : 'bg-surface-soft/30'
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
                                        <FormLabel className="text-primary font-bold text-sm">
                                            Confirmar contraseña
                                        </FormLabel>
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
                                type="button"
                                onClick={onNextStep}
                                className="w-full bg-accent hover:bg-accent/90 text-on-primary active:scale-95 transition-all text-base h-12 rounded-full font-bold shadow-lg shadow-accent/20 mt-4"
                            >
                                Siguiente
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-5 animate-fade-in">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm">Nombre</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej. Frank"
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
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm">Apellido</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ej. Paez"
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-primary font-bold text-sm">Teléfono</FormLabel>
                                        <FormControl>
                                            <div className="flex space-x-2">
                                                <div className="bg-surface-light rounded-md flex items-center relative pr-2">
                                                    <select
                                                        value={phonePrefix}
                                                        onChange={(e) => {
                                                            const newPrefix = e.target.value;
                                                            setPhonePrefix(newPrefix);
                                                            field.onChange(`${newPrefix}${phoneNumber}`);
                                                        }}
                                                        className="w-24 bg-transparent border-transparent focus:outline-none focus:ring-0 text-neutral-dark h-11 pl-3 appearance-none cursor-pointer relative z-10"
                                                    >
                                                        {['0412', '0414', '0416', '0424', '0426', '0422'].map((p) => (
                                                            <option key={p} value={p}>
                                                                {p}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-3 pointer-events-none text-neutral-dark/50">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <Input
                                                    placeholder="1234567"
                                                    value={phoneNumber}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '').slice(0, 7);
                                                        setPhoneNumber(val);
                                                        field.onChange(`${phonePrefix}${val}`);
                                                    }}
                                                    className="flex-1 bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 font-medium text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="termsAccepted"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 border border-surface-soft/40 rounded-lg mt-2 relative">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-medium text-neutral-dark/80 cursor-pointer !block leading-normal mt-0">
                                                He leído y acepto los{' '}
                                                <span className="text-accent font-bold cursor-pointer hover:underline">
                                                    Términos y condiciones
                                                </span>{' '}
                                                y la{' '}
                                                <span className="text-accent font-bold cursor-pointer hover:underline">
                                                    Política de privacidad
                                                </span>
                                                .
                                            </FormLabel>
                                            <FormMessage className="text-red-500 font-medium text-xs mt-1 absolute -bottom-5 left-0" />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-3 mt-6 pt-2">
                                <Button
                                    type="button"
                                    onClick={onPrevStep}
                                    variant="outline"
                                    className="w-12 h-12 rounded-full border border-surface-soft/60 text-neutral-dark hover:bg-surface-soft/20 flex-shrink-0"
                                >
                                    <ChevronLeft size={20} />
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-accent hover:bg-accent/90 text-on-primary active:scale-95 transition-all text-base h-12 rounded-full font-bold shadow-lg shadow-accent/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Spinner size="sm" className="text-on-primary mr-2" /> : null}
                                    Crear cuenta
                                    {!isLoading && <ArrowRight size={18} className="ml-2" />}
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-surface-soft/30 text-center">
                        <p className="text-sm text-neutral-dark/60">
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" className="text-accent hover:underline font-bold">
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
