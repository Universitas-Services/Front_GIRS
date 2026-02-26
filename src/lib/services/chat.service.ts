import { Conversation, Message } from '@/types/chat.types';
import { api } from '@/lib/api/axios.instance';

export const chatService = {
    getConversations: async (): Promise<Conversation[]> => {
        try {
            const response = await api.get('/ai/conversations');
            // We map the backend response to our Conversation interface
            // If the backend returns a different structure, we'll need to adapt this mapping
            const rawData = response.data?.agrupadoPorFecha || response.data;
            if (Array.isArray(rawData)) {
                return rawData as Conversation[];
            }
            return []; // Fallback
        } catch (error) {
            console.error('Error fetching conversations:', error);
            return [];
        }
    },

    getMessages: async (id: string): Promise<Message[]> => {
        try {
            const response = await api.get(`/ai/conversations/${id}`);
            // The swagger mentions "conversacion" holding the array
            const rawMessages = response.data?.conversacion || (Array.isArray(response.data) ? response.data : []);

            return rawMessages.map((msg: Record<string, unknown>) => ({
                id: (msg.id as string) || crypto.randomUUID(),
                conversationId: (msg.sessionId as string) || id,
                role: msg.tipo === 'bot' || msg.tipo === 'assistant' || msg.role === 'assistant' ? 'assistant' : 'user',
                content: (msg.contenido as string) || (msg.message as string) || (msg.content as string) || '',
                createdAt: (msg.timestamp as string) || (msg.createdAt as string) || new Date().toISOString(),
            }));
        } catch (error) {
            console.error('Error fetching messages for session', id, error);
            return [];
        }
    },

    sendMessage: async (id: string, content: string): Promise<Message> => {
        // Send the user message payload
        const response = await api.post('/ai/message', {
            sessionId: id,
            message: content,
        });

        const reply = response.data;

        // Map the Bot's response to our state
        return {
            id: reply.id || crypto.randomUUID(),
            conversationId: reply.sessionId || id,
            role: 'assistant',
            content: reply.respuesta || reply.message || reply.content || '...',
            createdAt: reply.timestamp || new Date().toISOString(),
        };
    },

    createConversation: async (): Promise<Conversation> => {
        // Generate a real client-side UUID for the new session
        // until the first message is sent which persists it on the backend
        const newId = crypto.randomUUID();
        return {
            id: newId,
            title: 'Nueva conversación',
            lastMessage: '',
            lastMessageAt: new Date().toISOString(),
            messageCount: 0,
        };
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteConversation: async (_id: string): Promise<void> => {
        // Not implemented in backend user scope currently, no-op
        return Promise.resolve();
    },
};
