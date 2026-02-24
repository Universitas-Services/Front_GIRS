import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Ingresa un correo válido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(50, "Máximo 50 caracteres"),
    email: z.string().email("Ingresa un correo válido"),
    password: z.string()
        .min(8, "Mínimo 8 caracteres")
        .regex(/^(?=.*[A-Z])(?=.*\d)/, "Debe tener al menos una mayúscula y un número"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Ingresa un correo válido"),
});
