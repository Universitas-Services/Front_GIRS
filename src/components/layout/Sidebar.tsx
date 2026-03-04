'use client';

import { useChat } from '@/store/chat.context';
import { useAuth } from '@/store/auth.context';
import { cn } from '@/lib/utils';
import { PlusCircle, MessageSquare, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Sidebar() {
    const { isSidebarOpen, dispatch, conversations, activeConversationId } = useChat();
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });
    const handleNewChat = () => {
        dispatch({ type: 'SET_ACTIVE', payload: null });
        if (isMobile) toggleSidebar();
        router.push('/chat');
    };

    const handleLogout = async () => {
        await logout();
    };

    const expanded = isSidebarOpen;

    const sidebarContent = (
        <div className="flex flex-col h-full bg-primary text-on-primary border-r border-surface-soft/10">
            {/* Header */}
            <div className={cn('flex items-center h-[72px] shrink-0', expanded ? 'p-4' : 'justify-center w-full')}>
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    className={cn(
                        'flex items-center justify-center rounded-md hover:bg-surface-soft/10 transition-colors text-on-primary shrink-0',
                        expanded ? 'p-2 mr-2' : 'w-10 h-10'
                    )}
                >
                    <Menu size={24} />
                </button>
                <div
                    className={cn(
                        'flex-1 flex justify-center items-center transition-all duration-300 pr-12',
                        expanded ? 'opacity-100 min-w-[192px]' : 'opacity-0 w-0 md:hidden'
                    )}
                >
                    <div className="relative h-12 w-48 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/asset/LOGO UNIVERSITAS LEGAL (BLANCO).png"
                            alt="Universitas Legal"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Primary Actions */}
            <div className={cn('shrink-0 my-2', expanded ? 'px-3' : 'w-full flex justify-center')}>
                <button
                    onClick={handleNewChat}
                    className={cn(
                        'flex items-center py-2.5 rounded-lg transition-colors border-accent/30',
                        expanded
                            ? 'w-full px-3 bg-surface-soft/10 border hover:bg-accent/20'
                            : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                    )}
                >
                    <PlusCircle size={20} className="shrink-0" />
                    <span
                        className={cn(
                            'font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden',
                            expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                        )}
                    >
                        Nuevo Chat
                    </span>
                </button>
            </div>

            {/* Navigation / History */}
            <div
                className={cn(
                    'flex-1 py-2 custom-scrollbar',
                    expanded ? 'overflow-y-auto px-3' : 'flex flex-col items-center'
                )}
            >
                {!expanded ? (
                    <div className="w-full flex justify-center pt-4 text-on-primary/60 transition-opacity duration-300">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-soft/10 hover:text-on-primary transition-colors"
                            title="Historial"
                        >
                            <MessageSquare size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 mt-2 transition-opacity duration-300">
                        <div>
                            <p className="text-xs font-semibold text-on-primary/50 tracking-wider mb-2 px-3 uppercase">
                                Historial
                            </p>
                            {/* Filter out empty/new chats with no messages from history */}
                            {(() => {
                                const validConversations = conversations.filter(
                                    (c) =>
                                        c.title !== 'Nueva conversación' &&
                                        (!('messageCount' in c) || (c.messageCount as number) > 0)
                                );

                                const groups = [
                                    { label: 'Hoy', items: validConversations.slice(0, 2) },
                                    { label: 'Ayer', items: validConversations.slice(2, 4) },
                                    { label: 'Esta semana', items: validConversations.slice(4, 6) },
                                    { label: 'Anteriores', items: validConversations.slice(6) },
                                ].filter((g) => g.items.length > 0);

                                if (groups.length === 0) {
                                    return (
                                        <p className="text-sm px-3 text-on-primary/40 text-center py-4">
                                            No hay historial
                                        </p>
                                    );
                                }

                                return groups.map((group) => (
                                    <div key={group.label} className="mb-4">
                                        <p className="text-xs text-on-primary/40 px-3 mb-1">{group.label}</p>
                                        <div className="space-y-0.5">
                                            {group.items.map((conv) => {
                                                const isActive = conv.id === activeConversationId;
                                                return (
                                                    <div
                                                        key={conv.id}
                                                        onClick={() => {
                                                            dispatch({ type: 'SET_ACTIVE', payload: conv.id });
                                                            if (isMobile) toggleSidebar();
                                                            router.push('/chat');
                                                        }}
                                                        className={cn(
                                                            'group flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors whitespace-nowrap overflow-hidden',
                                                            isActive
                                                                ? 'bg-accent/20 border-l-2 border-accent text-on-primary'
                                                                : 'text-on-primary/80 hover:bg-on-primary/10 border-l-2 border-transparent'
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                'truncate transition-opacity duration-300',
                                                                expanded ? 'opacity-100' : 'opacity-0'
                                                            )}
                                                        >
                                                            {conv.title}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Settings / User */}
            <div className={cn('shrink-0 pb-4 relative mt-2', expanded ? 'px-3' : 'w-full flex flex-col items-center')}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {!expanded ? (
                            <button className="flex items-center justify-center w-10 h-10 rounded-lg outline-none hover:bg-surface-soft/10 hover:text-on-primary transition-colors text-on-primary/60 focus-visible:ring-0">
                                <Settings size={20} />
                            </button>
                        ) : (
                            <div
                                role="button"
                                className="flex outline-none items-center space-x-3 bg-surface-soft/10 hover:bg-surface-soft/20 p-3 rounded-xl border border-surface-soft/5 transition-all duration-300 cursor-pointer focus-visible:ring-0"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-on-primary shrink-0">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1 overflow-hidden text-left">
                                    <p className="text-sm font-medium text-on-primary truncate">
                                        {user?.name || 'Usuario'}
                                    </p>
                                    <p className="text-xs text-on-primary/60 truncate">
                                        {user?.email || 'test@email.com'}
                                    </p>
                                </div>
                                <Settings size={16} className="text-on-primary/60 shrink-0" />
                            </div>
                        )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align={expanded ? 'start' : 'center'}
                        alignOffset={expanded ? 0 : 0}
                        sideOffset={12}
                        className="w-[260px] bg-white border-surface-soft/30 shadow-2xl rounded-xl p-0"
                    >
                        {/* User Info Header Block */}
                        <div className="flex items-center gap-3 p-4">
                            <div className="w-10 h-10 rounded-full bg-neutral-dark text-white flex items-center justify-center text-sm font-bold shrink-0">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-neutral-dark truncate leading-tight">
                                    {user?.name || 'Usuario'}
                                </p>
                                <p className="text-sm text-neutral-dark/60 truncate leading-tight">
                                    {user?.email || 'test@email.com'}
                                </p>
                            </div>
                        </div>

                        <DropdownMenuSeparator className="m-0 bg-surface-soft/10" />

                        <div className="p-1">
                            <DropdownMenuItem
                                className="px-3 py-2.5 cursor-pointer text-neutral-dark focus:bg-surface-soft/20 rounded-lg font-medium transition-colors"
                                onClick={() => router.push('/perfil')}
                            >
                                <User className="mr-3 h-[18px] w-[18px]" />
                                Perfil
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="my-1 bg-surface-soft/10" />

                            <DropdownMenuItem
                                className="px-3 py-2.5 cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg font-medium transition-colors"
                                onClick={() => setIsLogoutOpen(true)}
                            >
                                <LogOut className="mr-3 h-[18px] w-[18px]" />
                                Cerrar sesión
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                    <AlertDialogContent className="sm:max-w-md bg-white border border-surface-soft shadow-2xl rounded-2xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-neutral-dark text-xl font-bold">
                                ¿Cerrar sesión?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-dark/70 mt-2">
                                Estás a punto de salir de tu cuenta. Necesitarás volver a iniciar sesión para continuar
                                usando el Consultor IA.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
                            <AlertDialogCancel className="bg-transparent text-neutral-dark hover:bg-surface-soft/20 border border-surface-soft/60 rounded-lg">
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white border-transparent shadow shadow-red-600/20 font-bold rounded-lg"
                            >
                                Sí, cerrar sesión
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    'fixed md:relative top-0 left-0 z-50 h-full transition-all duration-300 ease-in-out shadow-2xl md:shadow-none border-r border-surface-soft/10',
                    isMobile
                        ? isSidebarOpen
                            ? 'translate-x-0 w-72'
                            : '-translate-x-full w-72'
                        : isSidebarOpen
                          ? 'w-[280px]'
                          : 'w-[72px]'
                )}
            >
                {isMobile && isSidebarOpen && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4 -right-12 p-2 bg-primary text-on-primary rounded-r-lg"
                    >
                        <X size={20} />
                    </button>
                )}
                {sidebarContent}
            </aside>
        </>
    );
}
