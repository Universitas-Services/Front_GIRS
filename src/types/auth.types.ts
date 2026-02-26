export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    createdAt: string;
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
