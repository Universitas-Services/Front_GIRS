import { AuthResponse, LoginInput, RegisterInput } from '@/types/auth.types';
import { MOCK_USER } from '@/lib/mocks/user.mock';
import { sleep } from '@/lib/utils';

export const authService = {
    login: async (data: LoginInput): Promise<AuthResponse> => {
        await sleep(1500);
        if (data.email === 'error@test.com') {
            throw new Error('Credenciales incorrectas');
        }
        return {
            user: MOCK_USER,
            token: 'mock-jwt-token-xyz',
        };
    },

    register: async (data: RegisterInput): Promise<void> => {
        await sleep(1200);
    },

    forgotPassword: async (email: string): Promise<void> => {
        await sleep(1000);
    },

    logout: async (): Promise<void> => {
        await sleep(300);
    },
};
