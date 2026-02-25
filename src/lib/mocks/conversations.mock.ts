import { Conversation } from '@/types/chat.types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 4);

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'conv_1',
        title: '¿Cómo optimizar SQL...',
        lastMessage: 'Claro, aquí tienes una optimización.',
        lastMessageAt: today.toISOString(),
        messageCount: 4
    }
];
