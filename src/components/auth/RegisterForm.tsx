'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerSchema } from '@/lib/validations/auth.schemas';
import { useAuth } from '@/store/auth.context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, ArrowRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { UniversitasAPI, type Estado, type Municipio } from '@universitas/sdk-global';

const api = new UniversitasAPI(process.env.NEXT_PUBLIC_UNIVERSITAS_SDK_URL);

import { Checkbox } from '@/components/ui/checkbox';

export function RegisterForm() {
    const [step, setStep] = useState(1);
    const [phonePrefix, setPhonePrefix] = useState('0412');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [selectedEstadoId, setSelectedEstadoId] = useState<number | null>(null);
    const [isLoadingEstados, setIsLoadingEstados] = useState(false);
    const [isLoadingMunicipios, setIsLoadingMunicipios] = useState(false);
    const [showEnteFields, setShowEnteFields] = useState(false);
    const [showCargoNormativa, setShowCargoNormativa] = useState(false);
    const { register, isLoading } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            lastName: '',
            phone: '',
            estado: '',
            municipio: '',
            tipo_usuario: '',
            nombre_ente: '',
            cargo: '',
            estatus_normativa_girs: '',
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

    useEffect(() => {
        const loadEstados = async () => {
            setIsLoadingEstados(true);
            try {
                const response = await api.territorio.getEstados();
                const data = response.data;
                setEstados(data);
            } catch (error) {
                console.error('Error loading estados:', error);
            } finally {
                setIsLoadingEstados(false);
            }
        };
        loadEstados();
    }, []);

    useEffect(() => {
        const loadMunicipios = async () => {
            if (!selectedEstadoId) {
                setMunicipios([]);
                return;
            }
            setIsLoadingMunicipios(true);
            try {
                const response = await api.territorio.getMunicipios(selectedEstadoId);
                const data = response.data;
                setMunicipios(data);
            } catch (error) {
                console.error('Error loading municipios:', error);
            } finally {
                setIsLoadingMunicipios(false);
            }
        };
        loadMunicipios();
    }, [selectedEstadoId]);

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
            const payload = {
                nombre: values.name,
                apellido: values.lastName,
                telefono: values.phone,
                estado: values.estado,
                municipio: values.municipio,
                tipo_usuario: values.tipo_usuario,
                nombre_ente: values.nombre_ente,
                cargo: values.cargo,
                estatus_normativa_girs: values.estatus_normativa_girs,
                email: values.email,
                password: values.password,
            };
            await register(payload);
            toast.success('Te hemos enviado un enlace de activación a tu correo electrónico.');
            router.push('/login');
        } catch {
            toast.error('Error al registrar la cuenta');
        }
    }

    return (
        <>
            <div className="w-full animate-fade-in">
                <div className="flex justify-center mb-3 sm:mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/asset/LOGO UNIVERSITAS LEGAL.png"
                        alt="Universitas Legal Logo"
                        className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm"
                    />
                </div>
                <div className="space-y-4 mb-4">
                    <div className="space-y-1 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                            {step === 1 ? 'Crea tu cuenta' : 'Completa tus datos'}
                        </h2>
                        <p className="text-neutral-dark/60 text-sm">Por favor introduce tus datos para continuar.</p>
                    </div>

                    <div className="flex justify-center items-center space-x-8 sm:space-x-12">
                        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                            <div
                                className={cn(
                                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300',
                                    step === 1
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'bg-surface-soft/20 text-neutral-dark/40'
                                )}
                            >
                                1
                            </div>
                            <span
                                className={cn(
                                    'text-xs sm:text-sm transition-colors',
                                    step === 1 ? 'text-primary font-bold' : 'text-neutral-dark/40 font-medium'
                                )}
                            >
                                Credenciales
                            </span>
                        </div>
                        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                            <div
                                className={cn(
                                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all duration-300',
                                    step === 2
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'bg-surface-soft/20 text-neutral-dark/40'
                                )}
                            >
                                2
                            </div>
                            <span
                                className={cn(
                                    'text-xs sm:text-sm transition-colors',
                                    step === 2 ? 'text-primary font-bold' : 'text-neutral-dark/40 font-medium'
                                )}
                            >
                                Datos personales
                            </span>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {step === 1 && (
                            <div className="space-y-4 animate-fade-in">
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
                                                    placeholder="Ejemplo: Juan"
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
                                                    placeholder="Ejemplo: Pérez"
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
                                                            {['0412', '0414', '0416', '0424', '0426', '0422'].map(
                                                                (p) => (
                                                                    <option key={p} value={p}>
                                                                        {p}
                                                                    </option>
                                                                )
                                                            )}
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

                                <div className="flex gap-3">
                                    <FormField
                                        control={form.control}
                                        name="estado"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-primary font-bold text-sm">
                                                    Ubicación
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        const estadoId = parseInt(value);
                                                        const estadoNombre =
                                                            estados.find((e) => e.id === estadoId)?.nombre ?? value;
                                                        field.onChange(estadoNombre);
                                                        setSelectedEstadoId(estadoId);
                                                        form.setValue('municipio', '');
                                                        setMunicipios([]);
                                                    }}
                                                    defaultValue={selectedEstadoId?.toString() ?? ''}
                                                    value={selectedEstadoId?.toString() ?? ''}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11"
                                                            disabled={isLoadingEstados}
                                                        >
                                                            <SelectValue
                                                                placeholder={
                                                                    isLoadingEstados
                                                                        ? 'Cargando...'
                                                                        : 'Selecciona un estado'
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="z-50">
                                                        {estados.map((estado) => (
                                                            <SelectItem key={estado.id} value={estado.id.toString()}>
                                                                {estado.nombre}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="municipio"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-primary font-bold text-sm">&nbsp;</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    value={field.value}
                                                    disabled={!selectedEstadoId || isLoadingMunicipios}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11">
                                                            <SelectValue
                                                                placeholder={
                                                                    isLoadingMunicipios
                                                                        ? 'Cargando...'
                                                                        : 'Selecciona un municipio'
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="z-50">
                                                        {municipios.map((municipio) => (
                                                            <SelectItem key={municipio.id} value={municipio.nombre}>
                                                                {municipio.nombre}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 font-medium text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="tipo_usuario"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex gap-40">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id="servidor-publico"
                                                            className="cursor-pointer"
                                                            checked={field.value === 'SERVIDOR_PUBLICO'}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange('SERVIDOR_PUBLICO');
                                                                    setShowEnteFields(true);
                                                                    setShowCargoNormativa(true);
                                                                } else {
                                                                    field.onChange('');
                                                                    setShowEnteFields(false);
                                                                    setShowCargoNormativa(false);
                                                                    form.setValue('nombre_ente', '');
                                                                    form.setValue('cargo', '');
                                                                    form.setValue('estatus_normativa_girs', '');
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="servidor-publico"
                                                            className="text-primary font-bold text-sm"
                                                        >
                                                            Servidor público
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id="asesor-privado"
                                                            className="cursor-pointer"
                                                            checked={field.value === 'ASESOR_PRIVADO'}
                                                            onCheckedChange={(checked) => {
                                                                if (checked) {
                                                                    field.onChange('ASESOR_PRIVADO');
                                                                    setShowEnteFields(true);
                                                                    setShowCargoNormativa(false);
                                                                    form.setValue('cargo', '');
                                                                    form.setValue('estatus_normativa_girs', '');
                                                                } else {
                                                                    field.onChange('');
                                                                    setShowEnteFields(false);
                                                                    setShowCargoNormativa(false);
                                                                    form.setValue('nombre_ente', '');
                                                                    form.setValue('cargo', '');
                                                                    form.setValue('estatus_normativa_girs', '');
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            htmlFor="asesor-privado"
                                                            className="text-primary font-bold text-sm"
                                                        >
                                                            Asesor privado
                                                        </label>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 font-medium text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {showEnteFields && (
                                    <div className="space-y-4 animate-fade-in">
                                        <FormField
                                            control={form.control}
                                            name="nombre_ente"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-primary font-bold text-sm">
                                                        Ente/Institución
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ej. Ministerio del Poder Popular..."
                                                            className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 font-medium text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        {showCargoNormativa && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="cargo"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-primary font-bold text-sm">
                                                                Cargo
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ej. Director de..."
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
                                                    name="estatus_normativa_girs"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-primary font-bold text-sm">
                                                                ¿Posee tu ente normativa GIRS actualmente?
                                                            </FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger className="bg-surface-light border-transparent focus:border-accent focus:ring-accent text-neutral-dark h-11">
                                                                        <SelectValue placeholder="Selecciona una opción" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="VIGENTE">
                                                                        Sí está vigente
                                                                    </SelectItem>
                                                                    <SelectItem value="EN_MORA">
                                                                        No posee / En mora
                                                                    </SelectItem>
                                                                    <SelectItem value="EN_REVISION">
                                                                        En revisión técnica
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage className="text-red-500 font-medium text-xs" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )}
                                    </div>
                                )}

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
                                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <div className="text-sm font-medium text-neutral-dark/80 !block leading-normal mt-0">
                                                    He leído y acepto los{' '}
                                                    <span
                                                        className="text-accent font-bold cursor-pointer hover:underline"
                                                        onClick={() => setIsTermsOpen(true)}
                                                    >
                                                        Términos y condiciones
                                                    </span>{' '}
                                                    y la{' '}
                                                    <span
                                                        className="text-accent font-bold cursor-pointer hover:underline"
                                                        onClick={() => setIsPrivacyOpen(true)}
                                                    >
                                                        Política de privacidad
                                                    </span>
                                                    .
                                                </div>
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

            {/* Terms and Conditions Modal */}
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8 bg-white border-none rounded-3xl shadow-2xl">
                    <DialogHeader className="shrink-0 mb-4">
                        <DialogTitle className="text-2xl font-bold text-neutral-dark">
                            Términos y Condiciones
                        </DialogTitle>
                        <DialogDescription className="text-[14px] font-semibold text-neutral-dark/70 pt-1">
                            Última actualización: 04 de marzo de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">
                                Sección I: Identificación y aceptación de las partes.
                            </h4>
                            <p>
                                El presente instrumento regula la relación contractual entre Universitas Services C.A.
                                (en adelante, &quot;La Empresa&quot;) y el Usuario. Al registrarse y marcar la casilla
                                de &quot;Acepto&quot;, el Usuario manifiesta su consentimiento previo, libre e
                                informado, admitiendo haber leído, comprendido y aceptado la vinculación jurídica total
                                con este contrato, de conformidad con la Ley sobre Mensajes de Datos y Firmas
                                Electrónicas.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección II: Naturaleza del software y soporte IA
                            </h4>
                            <p>
                                El Consultor IA - GIRS es un sistema de asistencia basado en procesamiento de lenguaje
                                natural (NLP). Se define como una herramienta de soporte a la gestión documental y no
                                como un prestador de servicios jurídicos autónomos. Integra componentes de Google
                                Dialogflow y Vertex AI bajo una arquitectura propietaria.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección III: Licencia de uso y restricciones
                            </h4>
                            <p>
                                La Empresa otorga una licencia de uso no exclusiva e intransferible. Queda estrictamente
                                prohibido:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>El uso de la plataforma para fines ilícitos.</li>
                                <li>La compartición de credenciales de acceso.</li>
                                <li>Cualquier intento de extracción de la lógica de negocio alojada en el backend.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección IV: Propiedad intelectual</h4>
                            <p>
                                Toda la propiedad intelectual, incluyendo el código fuente, las bibliotecas de
                                componentes y la base de datos documental, son propiedad exclusiva de La Empresa. El
                                Usuario no adquiere ningún derecho de propiedad sobre los algoritmos.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección V: Responsabilidad legal</h4>
                            <p>
                                La Empresa realiza sus mejores esfuerzos técnicos para el funcionamiento del sistema;
                                sin embargo, no puede garantizar la infalibilidad absoluta de las respuestas generadas
                                por la IA. El Usuario reconoce que el Consultor IA no sustituye la asesoría legal
                                profesional. La Empresa responderá únicamente por aquellos daños directos que sean
                                consecuencia de dolo o culpa grave comprobada en la prestación del servicio técnico, no
                                haciéndose responsable por las decisiones administrativas, financieras o legales que el
                                Usuario tome basándose exclusivamente en los resultados de la plataforma.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección VI: Derecho de retracto</h4>
                            <p>
                                Al tratarse de un servicio contratado por medios electrónicos, el Usuario tendrá derecho
                                a retractarse del presente contrato por justa causa dentro de un plazo de siete (7) días
                                contados desde su aceptación o desde la recepción del servicio, siempre que no haya
                                hecho un uso efectivo y sustancial del mismo, garantizándose el reintegro de los montos
                                pagados si fuere el caso.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VII: Disponibilidad y soporte técnico
                            </h4>
                            <p>
                                La Empresa se reserva el derecho de interrumpir temporalmente el servicio para labores
                                de mantenimiento. La Empresa no será responsable por fallas imputables a fuerza mayor,
                                caso fortuito, o caídas masivas en los proveedores de infraestructura de terceros (ej.
                                Google Cloud, AWS), siempre que dichas fallas escapen de su control razonable.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección VIII: Suspensión y resolución</h4>
                            <p>
                                La Empresa podrá suspender el acceso de forma inmediata ante usos abusivos debidamente
                                comprobados, intentos de inyección de código o manipulación de tokens, notificando al
                                Usuario sobre los motivos de la suspensión.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección IX: Actualización de los documentos
                            </h4>
                            <p>
                                Universitas Services C.A. podrá modificar los presentes Términos y Condiciones. En caso
                                de contratos con vigencia temporal de mediano o largo plazo, cualquier modificación
                                unilateral de las condiciones que justifique cambios en la facturación o el servicio
                                será notificada al Usuario con una antelación mínima de un (1) mes. Si el Usuario no
                                acepta las nuevas condiciones, tendrá el derecho de rescindir el contrato sin
                                penalización alguna, lo cual procederá operativamente mediante la cancelación y
                                eliminación definitiva de su cuenta en la plataforma.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección X: Jurisdicción y Ley aplicable
                            </h4>
                            <p>
                                Para todos los efectos legales, este contrato se regirá por la legislación venezolana.
                                Toda controversia será sometida a la jurisdicción de los tribunales competentes según el
                                domicilio del Usuario, considerándose nula cualquier cláusula que fije un domicilio
                                especial distinto que cause indefensión.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección XI: Canales de contacto oficial
                            </h4>
                            <p>
                                Para dudas, soporte técnico o reclamaciones, el Usuario deberá comunicarse a través de:{' '}
                                <strong>contacto@universitas.legal</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 pt-6 mt-2 border-t border-surface-soft/20">
                        <Button
                            variant="secondary"
                            className="w-full h-12 rounded-xl bg-surface-soft/20 hover:bg-surface-soft/40 text-neutral-dark font-bold text-base transition-colors"
                            onClick={() => setIsTermsOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Privacy Policy Modal */}
            <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
                <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8 bg-white border-none rounded-3xl shadow-2xl">
                    <DialogHeader className="shrink-0 mb-4">
                        <DialogTitle className="text-2xl font-bold text-neutral-dark">
                            Política de Privacidad
                        </DialogTitle>
                        <DialogDescription className="text-[14px] font-semibold text-neutral-dark/70 pt-1">
                            Última actualización: 04 de marzo de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">Sección I: Marco legal y habeas data</h4>
                            <p>
                                Universitas garantiza el derecho constitucional a la protección de datos personales
                                (Art. 28 y 60 de la Constitución de la República Bolivariana de Venezuela). El
                                tratamiento de sus datos se rige por los principios dictados por el Tribunal Supremo de
                                Justicia: autonomía de la voluntad (consentimiento previo, libre e informado),
                                legalidad, finalidad y calidad, temporalidad, exactitud, y seguridad y confidencialidad.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección II: Datos objeto de tratamiento
                            </h4>
                            <p>
                                Recopilamos de forma automatizada datos de registro (nombre, correo electrónico, número
                                de teléfono), datos técnicos (IP, registros de sesión) y el contenido de las
                                interacciones con el agente para auditoría de calidad.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección III: Finalidades del tratamiento
                            </h4>
                            <p>
                                Los datos personales responderán a causas predeterminadas y serán procesados única y
                                exclusivamente para:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Prestación del servicio: Validar la identidad mediante enlaces de activación y
                                    personalizar la experiencia.
                                </li>
                                <li>
                                    Soporte y mejora continua: Contactar al Usuario para asistencia técnica, resolver
                                    incidencias, y conocer su experiencia para mejoras en el motor de Vertex AI.
                                </li>
                                <li>
                                    Comunicaciones comerciales: Enviar información sobre nuevos servicios,
                                    actualizaciones y ofertas de Universitas. Los datos no se emplearán para otras
                                    finalidades que no sean aquellas para las cuales se recopilaron, excepto con el
                                    consentimiento expreso del Usuario.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección IV: Seguridad tecnológica</h4>
                            <p>
                                Adoptamos medidas técnicas y organizativas para proteger los datos contra su
                                adulteración, pérdida, acceso no autorizado o uso fraudulento. Empleamos cifrado en
                                reposo (AES-256) en Supabase/AWS y cifrado en tránsito vía TLS 1.2+. Las contraseñas se
                                protegen mediante hashing con bcrypt.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección V: Flujo transfronterizo de datos
                            </h4>
                            <p>
                                Mediante la aceptación expresa de esta política, el Usuario autoriza, de forma libre e
                                informada, la transferencia y almacenamiento de sus datos en la región AWS us-east-2 y
                                en la infraestructura de Google Cloud, estrictamente necesarios para el procesamiento de
                                los modelos de IA.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VI: Conservación y anonimización
                            </h4>
                            <p>
                                La conservación de los datos personales se extenderá únicamente hasta el logro de los
                                objetivos que justificaron su obtención. Al materializarse la rescisión del contrato o
                                solicitar la eliminación de la cuenta, los datos de identidad son destruidos de manera
                                inmediata, dejando el historial de consultas en un estado de anonimización irreversible
                                para fines estadísticos.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VII: Ejercicio de derechos ARCO (Habeas Data)
                            </h4>
                            <p>
                                El Usuario posee el derecho a la autodeterminación informativa. En cualquier momento
                                podrá ejercer sus derechos constitucionales de:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Acceso: Conocer la existencia de registros, su uso y finalidad.</li>
                                <li>
                                    Rectificación y actualización: Corregir datos falsos, inexactos o desactualizados.
                                </li>
                                <li>
                                    Cancelación (Destrucción): Solicitar la eliminación total de sus datos cuando
                                    revoque su consentimiento o no sean necesarios.
                                </li>
                                <li>
                                    Oposición: Negarse a un tratamiento específico de sus datos, incluyendo el uso para
                                    marketing directo. Estos derechos pueden ejercerse enviando una solicitud a
                                    contacto@universitas.legal.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VIII: Comunicaciones comerciales y anti-spam
                            </h4>
                            <p>
                                Universitas garantiza el derecho del Usuario a elegir si desea recibir mensajes
                                comerciales. Toda comunicación de marketing incluirá un mecanismo fácil para revocar su
                                consentimiento. Cuando el Usuario indique que no desea recibir mensajes comerciales
                                electrónicos, Universitas suspenderá su envío en un lapso no mayor de veinticuatro (24)
                                horas, manteniendo únicamente las comunicaciones transaccionales estrictamente
                                necesarias.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección IX: Modificación de las políticas de privacidad
                            </h4>
                            <p>
                                En caso de realizar cambios sustanciales sobre las finalidades o el tratamiento de sus
                                datos, Universitas notificará al Usuario y solicitará nuevamente su consentimiento
                                previo, libre e inequívoco a través de la plataforma antes de que dichos cambios entren
                                en vigor. Si el Usuario no está de acuerdo, tendrá derecho a denegar su consentimiento y
                                cancelar su cuenta.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección X: Notificación de brechas de seguridad
                            </h4>
                            <p>
                                En caso de detectarse una vulneración en la seguridad que ponga en riesgo la
                                confidencialidad de los datos, Universitas informará oportunamente a los usuarios
                                afectados, detallando los riesgos y las medidas adoptadas.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección XI: Atención a consultas de privacidad
                            </h4>
                            <p>
                                Cualquier solicitud relativa a la protección de datos personales debe ser dirigida a:{' '}
                                <strong>contacto@universitas.legal</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 pt-6 mt-2 border-t border-surface-soft/20">
                        <Button
                            variant="secondary"
                            className="w-full h-12 rounded-xl bg-surface-soft/20 hover:bg-surface-soft/40 text-neutral-dark font-bold text-base transition-colors"
                            onClick={() => setIsPrivacyOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
