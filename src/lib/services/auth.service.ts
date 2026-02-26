import { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth.types';
import { api } from '@/lib/api/axios.instance';

export const authService = {
    login: async (data: LoginInput): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', data);

        // Based on typical NestJS/Auth integrations, if the user object isn't returned directly
        // with the token, we fetch the profile immediately after.
        let user = response.data.user;
        const token = response.data.access_token || response.data.token;

        if (!user && token) {
            // Set the token temporarily to fetch the profile
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const profileResponse = await api.get('/users/my');
            user = profileResponse.data;
        }
        if (user) {
            // Ensure the frontend 'name' property is populated from the backend's 'nombreCompleto' or 'nombre'
            if (!user.name && user.nombreCompleto) {
                user.name = user.nombreCompleto;
            } else if (!user.name && user.nombre) {
                user.name = `${user.nombre} ${user.apellido || ''}`.trim();
            }
        }

        return {
            user,
            token,
        };
    },

    getProfile: async (): Promise<User> => {
        const profileResponse = await api.get('/users/my');
        const user = profileResponse.data;
        if (user) {
            // Ensure the frontend 'name' property is populated from the backend's 'nombreCompleto' or 'nombre'
            if (!user.name && user.nombreCompleto) {
                user.name = user.nombreCompleto;
            } else if (!user.name && user.nombre) {
                user.name = `${user.nombre} ${user.apellido || ''}`.trim();
            }
        }
        return user;
    },

    register: async (data: RegisterInput): Promise<void> => {
        await api.post('/auth/register', data);
    },

    confirmEmail: async (token: string): Promise<void> => {
        await api.get(`/auth/confirm-email/${token}`);
    },

    forgotPassword: async (email: string): Promise<void> => {
        await api.post('/auth/forgot-password', { email });
    },

    resetPassword: async (email: string, newPassword: string): Promise<void> => {
        await api.post('/auth/reset-password', { email, newPassword });
    },

    verifyOtp: async (email: string, otp: string): Promise<void> => {
        await api.post('/auth/verify-otp', { email, otp });
    },

    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            // If it fails (e.g., token already expired), we still want to clear local state.
            console.warn('Logout API failed, continuing local cleanup', error);
        }
    },
};
