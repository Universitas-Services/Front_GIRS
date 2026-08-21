'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/types/chat.types';
import { AgentAvatar } from './AgentAvatar';
import { cn } from '@/lib/utils';
import { APP_CONFIG } from '@/config/app.config';

interface MessageBubbleProps {
    message: Message;
    isLast: boolean;
}

const CHARS_PER_TICK = 8;
const TICK_MS = 12;

export function MessageBubble({ message, isLast }: MessageBubbleProps) {
    const isAgent = message.role === 'assistant';
    const [displayedText, setDisplayedText] = useState(isAgent && isLast ? '' : message.content);
    const [isTyping, setIsTyping] = useState(isAgent && isLast);

    useEffect(() => {
        if (!(isAgent && isLast && isTyping)) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = Math.min(currentIndex + CHARS_PER_TICK, message.content.length);
            setDisplayedText(message.content.substring(0, currentIndex));

            if (currentIndex >= message.content.length) {
                setIsTyping(false);
                clearInterval(interval);
            }
        }, TICK_MS);

        return () => clearInterval(interval);
    }, [message.content, isAgent, isLast, isTyping]);

    const dateObj = new Date(message.createdAt);
    const dateStr = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
    const timestamp = `${dateStr} ${timeStr}`;

    return (
        <div className={cn('flex w-full animate-fade-in group', isAgent ? 'justify-start' : 'justify-end')}>
            <div
                className={cn(
                    'flex max-w-[85%] sm:max-w-[75%] items-end gap-2',
                    isAgent ? 'flex-row' : 'flex-row-reverse'
                )}
            >
                {isAgent && (
                    <div className="shrink-0 mb-1">
                        <AgentAvatar size="sm" />
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <div
                        className={cn(
                            'p-4 relative max-w-full',
                            isAgent
                                ? 'bg-msg-user-bg text-neutral-dark rounded-[20px] rounded-tl-sm border border-msg-user-border/40'
                                : 'bg-primary text-on-primary rounded-[20px] rounded-tr-sm'
                        )}
                    >
                        <div
                            className={cn(
                                'chat-markdown text-[15px] leading-relaxed break-words',
                                !isAgent && 'chat-markdown--user'
                            )}
                        >
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => (
                                        <p className="mb-2 last:mb-0 whitespace-pre-wrap">{children}</p>
                                    ),
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    ul: ({ children }) => (
                                        <ul className="my-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
                                    ),
                                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                'underline underline-offset-2',
                                                isAgent ? 'text-primary' : 'text-on-primary/90'
                                            )}
                                        >
                                            {children}
                                        </a>
                                    ),
                                    code: ({ children }) => (
                                        <code
                                            className={cn(
                                                'rounded px-1 py-0.5 text-[0.9em]',
                                                isAgent ? 'bg-black/5' : 'bg-white/15'
                                            )}
                                        >
                                            {children}
                                        </code>
                                    ),
                                }}
                            >
                                {displayedText}
                            </ReactMarkdown>
                            {isTyping && (
                                <span className="inline-block w-1.5 h-4 ml-1 bg-accent animate-pulse align-middle" />
                            )}
                        </div>
                    </div>

                    <div className={cn('flex items-center gap-2', isAgent ? 'justify-start ml-1' : 'justify-end mr-1')}>
                        {isAgent && (
                            <span className="text-[10px] font-medium text-neutral-dark/40 uppercase tracking-wider">
                                {APP_CONFIG.AGENT_NAME}
                            </span>
                        )}
                        <span className="text-xs text-neutral-dark/40">{timestamp}</span>
                        {!isAgent && (
                            <span className="text-[10px] font-medium text-neutral-dark/40 uppercase tracking-wider">
                                TÚ
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
