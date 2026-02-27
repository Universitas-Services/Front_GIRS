import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Ingresa un correo válido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export const registerSchema = z
    .object({
        name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(50, 'Máximo 50 caracteres'),
        lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').max(50, 'Máximo 50 caracteres'),
        phone: z.string().min(7, 'Teléfono inválido').max(20, 'Teléfono inválido'),
        email: z.string().email('Ingresa un correo válido'),
        password: z
            .string()
            .min(8, 'Mínimo 8 caracteres')
            .regex(/^(?=.*[A-Z])(?=.*\d)/, 'Debe tener al menos una mayúscula y un número'),
        confirmPassword: z.string(),
        termsAccepted: z.boolean().refine((val) => val === true, 'Debes aceptar los términos y condiciones'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    });

export const forgotPasswordSchema = z
    .object({
        email: z.string().email('Ingresa un correo válido'),
        code: z
            .string()
            .regex(/^\d{6}$/, 'El código debe tener 6 dígitos numéricos')
            .optional()
            .or(z.literal('')),
        password: z
            .string()
            .min(8, 'Mínimo 8 caracteres')
            .regex(/^(?=.*[A-Z])(?=.*\d)/, 'Debe tener al menos una mayúscula y un número')
            .optional()
            .or(z.literal('')),
        confirmPassword: z.string().optional().or(z.literal('')),
    })
    .refine(
        (data) => {
            if (data.password && data.password.length > 0) {
                return data.password === data.confirmPassword;
            }
            return true;
        },
        {
            message: 'Las contraseñas no coinciden',
            path: ['confirmPassword'],
        }
    );
