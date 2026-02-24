import { Conversation, Message } from '@/types/chat.types';
import { MOCK_CONVERSATIONS } from '@/lib/mocks/conversations.mock';
import { MOCK_MESSAGES } from '@/lib/mocks/messages.mock';
import { sleep } from '@/lib/utils';

export const chatService = {
    getConversations: async (): Promise<Conversation[]> => {
        await sleep(800);
        return Promise.resolve([...MOCK_CONVERSATIONS]);
    },

    getMessages: async (id: string): Promise<Message[]> => {
        await sleep(500);
        return Promise.resolve(MOCK_MESSAGES[id] || []);
    },

    sendMessage: async (id: string, content: string): Promise<Message> => {
        await sleep(600);
        const newMessage: Message = {
            id: `msg_${Date.now()}`,
            conversationId: id,
            role: 'user',
            content,
            createdAt: new Date().toISOString()
        };
        return Promise.resolve(newMessage);
    },

    createConversation: async (): Promise<Conversation> => {
        await sleep(800);
        const newConv: Conversation = {
            id: `conv_${Date.now()}`,
            title: 'Nueva conversación',
            lastMessage: '',
            lastMessageAt: new Date().toISOString(),
            messageCount: 0
        };
        return Promise.resolve(newConv);
    },

    deleteConversation: async (id: string): Promise<void> => {
        await sleep(500);
        return Promise.resolve();
    }
};
