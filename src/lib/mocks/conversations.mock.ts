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
    },
    {
        id: 'conv_2',
        title: 'Ideas para mi startup',
        lastMessage: 'Podrías enfocarte en B2B.',
        lastMessageAt: today.toISOString(),
        messageCount: 8
    },
    {
        id: 'conv_3',
        title: 'Ayúdame con este bug',
        lastMessage: 'El error null reference se debe a...',
        lastMessageAt: yesterday.toISOString(),
        messageCount: 6
    },
    {
        id: 'conv_4',
        title: 'Resumen del libro...',
        lastMessage: 'El libro trata principalmente sobre...',
        lastMessageAt: yesterday.toISOString(),
        messageCount: 2
    },
    {
        id: 'conv_5',
        title: 'Estrategia de marketing',
        lastMessage: 'Te sugiero usar canales orgánicos.',
        lastMessageAt: lastWeek.toISOString(),
        messageCount: 12
    },
    {
        id: 'conv_6',
        title: 'Traducción al inglés',
        lastMessage: 'Hello, how can I help you?',
        lastMessageAt: lastWeek.toISOString(),
        messageCount: 2
    },
];
