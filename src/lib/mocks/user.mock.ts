import { User } from '@/types/auth.types';

export const MOCK_USER: User = {
    id: 'usr_1',
    name: 'Frank López',
    email: 'frank@email.com',
    createdAt: new Date().toISOString(),
};
