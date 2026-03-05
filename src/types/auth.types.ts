export interface User {
    id: string;
    email: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    name?: string; // Derived full name
    avatar?: string | null;
    createdAt?: string;
    role?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    nombre: string;
    apellido?: string;
    telefono?: string;
    email: string;
    password: string;
}

export interface UpdateProfileInput {
    nombre: string;
    apellido: string;
    telefono: string;
}

export interface ChangePasswordInput {
    currentPassword?: string;
    newPassword?: string;
}
