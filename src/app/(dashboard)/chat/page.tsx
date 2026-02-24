'use client';

import { useEffect, useState } from 'react';
import { useChat } from '@/store/chat.context';
import { chatService } from '@/lib/services/chat.service';
import { MessageList, ChatInput, AgentAvatar } from '@/components/chat';
import { Menu } from 'lucide-react';
import { APP_CONFIG } from '@/config/app.config';

export default function ChatDashboardPage() {
    const {
        dispatch,
        activeConversationId,
        conversations,
        messages
    } = useChat();

    const [isLoading, setIsLoading] = useState(true);

    // Initial fetch mock
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const convs = await chatService.getConversations();
                dispatch({ type: 'SET_CONVERSATIONS', payload: convs });

                // Comentado para que siempre inicie en "Nuevo Chat"
                // if (convs.length > 0) {
                //     dispatch({ type: 'SET_ACTIVE', payload: convs[0].id });
                // }
            } catch (error) {
                console.error('Error fetching conversations', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [dispatch]);

    // Fetch messages when active conversation changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeConversationId) {
                dispatch({ type: 'SET_MESSAGES', payload: [] });
                return;
            }

            try {
                const msgs = await chatService.getMessages(activeConversationId);
                dispatch({ type: 'SET_MESSAGES', payload: msgs });
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();
    }, [activeConversationId, dispatch]);

    const handleSendMessage = async (content: string) => {
        if (!activeConversationId) {
            // If no active, create one first (mock behavior)
            const newConv = await chatService.createConversation();
            dispatch({ type: 'SET_ACTIVE', payload: newConv.id });
            dispatch({ type: 'SET_CONVERSATIONS', payload: [newConv, ...conversations] });

            dispatch({ type: 'SET_SENDING', payload: true });
            const newMsg = await chatService.sendMessage(newConv.id, content);
            dispatch({ type: 'ADD_MESSAGE', payload: newMsg });
            dispatch({ type: 'SET_SENDING', payload: false });
            return;
        }

        dispatch({ type: 'SET_SENDING', payload: true });

        // Optimistic UI for User Msg
        const optimisticMsg = {
            id: `optimistic_${Date.now()}`,
            conversationId: activeConversationId,
            content,
            role: 'user' as const,
            createdAt: new Date().toISOString()
        };
        dispatch({ type: 'ADD_MESSAGE', payload: optimisticMsg });


        try {
            const newMsg = await chatService.sendMessage(activeConversationId, content);

            // Since it's a mock, we already added the optimistic. 
            // Replace it basically by doing nothing extra or we can simulate AI response:

            // Simulate AI thinking and replying
            setTimeout(() => {
                const aiMsg = {
                    id: `ai_${Date.now()}`,
                    conversationId: activeConversationId,
                    content: `He recibido tu mensaje solicitando: "${content}". En un entorno real, aquí te respondería con la información procesada.`,
                    role: 'assistant' as const,
                    createdAt: new Date().toISOString()
                };
                dispatch({ type: 'ADD_MESSAGE', payload: aiMsg });
            }, 1000); // AI Delay

        } catch (error) {
            console.error('Failed to send target message', error);
        } finally {
            dispatch({ type: 'SET_SENDING', payload: false });
        }
    };

    const handleSuggestionClick = (text: string) => {
        handleSendMessage(text);
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#E5EBE7] relative animate-fade-in">

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-10 flex items-center p-4 bg-surface-light/95 backdrop-blur-sm border-b border-surface-soft/40 shadow-sm">
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    className="p-2 mr-3 bg-white rounded-lg border border-surface-soft shadow-sm hover:bg-surface-soft/20 active:scale-95 transition-all text-neutral-dark"
                >
                    <Menu size={20} />
                </button>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-neutral-dark text-base">{APP_CONFIG.AGENT_NAME}</h1>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] uppercase font-bold text-accent tracking-wider">En línea</span>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 overflow-hidden flex flex-col pt-0">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-12 h-12 bg-surface-soft/40 rounded-full mb-4"></div>
                            <div className="h-4 w-32 bg-surface-soft/40 rounded mb-2"></div>
                            <div className="h-3 w-48 bg-surface-soft/40 rounded"></div>
                        </div>
                    </div>
                ) : messages.length > 0 ? (
                    <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col bg-white shadow-xl md:rounded-[24px] overflow-hidden md:mt-4 md:mb-6 border border-surface-soft/40">
                        {/* Header for Active Conversation inside the White Card */}
                        <div className="flex items-center px-6 py-4 border-b border-surface-soft/60 bg-white shrink-0 z-10 transition-all">
                            <AgentAvatar size="sm" className="mr-3 ring-2 ring-white shadow-sm" />
                            <h2 className="font-bold text-neutral-dark text-[17px]">{APP_CONFIG.AGENT_NAME} - Consultor IA</h2>
                        </div>

                        <MessageList onSuggestionClick={handleSuggestionClick} />
                        <ChatInput onSendMessage={handleSendMessage} variant="inline" />
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col w-full relative">
                        <MessageList onSuggestionClick={handleSuggestionClick} />
                        <ChatInput onSendMessage={handleSendMessage} variant="floating" />
                    </div>
                )}
            </div>
        </div>
    );
}
