'use client';

import { useChat } from '@/store/chat.context';
import { useAuth } from '@/store/auth.context';
import { cn } from '@/lib/utils';
import { MessageSquare, Settings, LogOut, Menu, X, User, Headset } from 'lucide-react';
import { IoMdBook, IoMdInformationCircleOutline } from 'react-icons/io';
import { BsGearFill } from 'react-icons/bs';
import { IoHomeSharp, IoAddCircleOutline } from 'react-icons/io5';
import { FaGavel, FaBalanceScale } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
            <div className={cn('flex items-center h-[60px] shrink-0', expanded ? 'p-4' : 'justify-center w-full')}>
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
                    className={cn(
                        'flex items-center justify-center rounded-md hover:bg-surface-soft/10 transition-colors text-on-primary shrink-0',
                        expanded ? 'p-2 mr-2' : 'w-10 h-10'
                    )}
                >
                    <Menu size={24} color="var(--color-white)" />
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

            {/* Menú Principal Section */}
            <div className="w-full flex-shrink-0 mt-2">
                <div
                    className={cn(
                        'mb-2 transition-opacity duration-300',
                        expanded ? 'px-3 opacity-100' : 'opacity-0 hidden'
                    )}
                >
                    <p className="text-[11px] font-semibold text-on-primary/50 tracking-wider">Menú principal</p>
                </div>

                {/* Home Button */}
                <div className={cn('shrink-0 mb-0.5', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <button
                        onClick={() => router.push('/inicio')}
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors cursor-pointer',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                        )}
                        title="Inicio"
                    >
                        <IoHomeSharp size={18} color="var(--color-white)" className="shrink-0" />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Inicio
                        </span>
                    </button>
                </div>

                {/* Proyecto Ley Button */}
                <div className={cn('shrink-0 my-0.5', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <button
                        onClick={() => router.push('/proyecto-ley')}
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors cursor-pointer',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                        )}
                        title="Proyecto ley"
                    >
                        <FaGavel size={18} color="var(--color-white)" className="shrink-0 gavel-icon" />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Proyecto ley
                        </span>
                    </button>
                </div>

                {/* Repositorio Legal Button */}
                <div className={cn('shrink-0 my-0.5', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <button
                        onClick={() => toast.info('Próximamente disponible.')}
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors cursor-pointer',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                        )}
                        title="Repositorio legal"
                    >
                        <FaBalanceScale size={18} color="var(--color-white)" className="shrink-0" />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Repositorio legal
                        </span>
                    </button>
                </div>

                {/* Biblioteca GIRS Button */}
                <div className={cn('shrink-0 my-0.5', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <a
                        href="https://universitas.legal/biblioteca-girs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors cursor-pointer',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                        )}
                        title="Biblioteca girs"
                    >
                        <IoMdBook size={18} color="var(--color-white)" className="shrink-0" />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Biblioteca girs
                        </span>
                    </a>
                </div>
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
                            <MessageSquare size={20} color="var(--color-white)" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 mt-2 transition-opacity duration-300">
                        <div>
                            <p className="text-[11px] font-semibold text-on-primary/50 tracking-wider mb-2 px-3 pt-4 border-t border-surface-soft/10">
                                Consultor GIRS IA
                            </p>

                            {/* New Chat Button */}
                            <div className={cn('shrink-0 mb-1', expanded ? '' : 'w-full flex justify-center')}>
                                <button
                                    onClick={handleNewChat}
                                    className={cn(
                                        'flex items-center py-1.5 rounded-lg transition-colors border-transparent cursor-pointer',
                                        expanded
                                            ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10 border'
                                            : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                                    )}
                                    title="Iniciar nuevo chat"
                                >
                                    <IoAddCircleOutline size={20} color="var(--color-white)" className="shrink-0" />
                                    <span
                                        className={cn(
                                            'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                            expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                                        )}
                                    >
                                        Iniciar nuevo chat
                                    </span>
                                </button>
                            </div>

                            {/* Filter out empty/new chats with no messages from history */}
                            {(() => {
                                const validConversations = conversations.filter(
                                    (c) =>
                                        c.title !== 'Nueva conversación' &&
                                        (!('messageCount' in c) || (c.messageCount as number) > 0)
                                );

                                const todayDate = new Date();
                                todayDate.setHours(0, 0, 0, 0);

                                const yesterdayDate = new Date(todayDate);
                                yesterdayDate.setDate(yesterdayDate.getDate() - 1);

                                const startOfWeekDate = new Date(todayDate);
                                startOfWeekDate.setDate(startOfWeekDate.getDate() - 7);

                                const grouped = {
                                    Hoy: [] as typeof validConversations,
                                    Ayer: [] as typeof validConversations,
                                    'Esta semana': [] as typeof validConversations,
                                    Anteriores: [] as typeof validConversations,
                                };

                                validConversations.forEach((conv) => {
                                    const convDateStr = conv.lastMessageAt;
                                    if (!convDateStr) {
                                        grouped.Anteriores.push(conv);
                                        return;
                                    }

                                    const convDate = new Date(convDateStr);
                                    convDate.setHours(0, 0, 0, 0);

                                    if (convDate.getTime() === todayDate.getTime()) {
                                        grouped.Hoy.push(conv);
                                    } else if (convDate.getTime() === yesterdayDate.getTime()) {
                                        grouped.Ayer.push(conv);
                                    } else if (convDate.getTime() >= startOfWeekDate.getTime()) {
                                        grouped['Esta semana'].push(conv);
                                    } else {
                                        grouped.Anteriores.push(conv);
                                    }
                                });

                                const groups = [
                                    { label: 'Hoy', items: grouped.Hoy },
                                    { label: 'Ayer', items: grouped.Ayer },
                                    { label: 'Esta semana', items: grouped['Esta semana'] },
                                    { label: 'Anteriores', items: grouped.Anteriores },
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
                                                            'group flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors whitespace-nowrap overflow-hidden',
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

            {/* Otros Servicios Section */}
            <div className="w-full flex-shrink-0 mb-2 mt-4 pt-4 border-t border-surface-soft/10">
                <div
                    className={cn(
                        'mb-2 transition-opacity duration-300',
                        expanded ? 'px-3 opacity-100' : 'opacity-0 hidden'
                    )}
                >
                    <p className="text-[11px] font-semibold text-on-primary/50 tracking-wider">Otros Servicios</p>
                </div>

                <div className={cn('shrink-0 mb-0.5', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <button
                        onClick={() => router.push('/acerca-de')}
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors cursor-pointer',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10'
                        )}
                        title="Acerca de"
                    >
                        <IoMdInformationCircleOutline
                            size={18}
                            color="var(--color-white)"
                            className="shrink-0 info-flash-icon"
                        />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Acerca de
                        </span>
                    </button>
                </div>

                <div className={cn('shrink-0 mb-0', expanded ? 'px-3' : 'w-full flex justify-center')}>
                    <a
                        href="https://wa.me/584145051716"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'flex items-center py-1.5 rounded-lg transition-colors border-transparent',
                            expanded
                                ? 'w-full px-3 text-on-primary/80 hover:bg-surface-soft/10 border cursor-pointer'
                                : 'w-10 h-10 justify-center text-on-primary/70 hover:text-on-primary hover:bg-surface-soft/10 cursor-pointer'
                        )}
                        title="Soporte técnico"
                    >
                        <Headset size={18} color="var(--color-white)" className="shrink-0 support-bounce-icon" />
                        <span
                            className={cn(
                                'font-medium text-[13px] transition-all duration-300 whitespace-nowrap overflow-hidden',
                                expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 hidden'
                            )}
                        >
                            Soporte técnico
                        </span>
                    </a>
                </div>
            </div>

            {/* Footer Settings / User */}
            <div className={cn('shrink-0 pb-3 relative mt-0', expanded ? 'px-3' : 'w-full flex flex-col items-center')}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {!expanded ? (
                            <button className="flex items-center justify-center w-9 h-9 rounded-lg outline-none hover:bg-surface-soft/10 hover:text-on-primary transition-colors text-on-primary/60 focus-visible:ring-0">
                                <Settings size={18} color="var(--color-white)" className="gear-spin-icon" />
                            </button>
                        ) : (
                            <div
                                role="button"
                                className="flex outline-none items-center space-x-3 bg-surface-soft/10 hover:bg-surface-soft/20 py-2 px-3 rounded-xl border border-surface-soft/5 transition-all duration-300 cursor-pointer focus-visible:ring-0"
                            >
                                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-on-primary shrink-0">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1 overflow-hidden text-left">
                                    <p className="text-[13px] font-medium text-on-primary truncate">
                                        {user?.name || 'Usuario'}
                                    </p>
                                    <p className="text-[11px] text-on-primary/60 truncate">
                                        {user?.email || 'test@email.com'}
                                    </p>
                                </div>
                                <Settings size={14} color="var(--color-white)" className="shrink-0 gear-spin-icon" />
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

            {/* Copyright Section */}
            {expanded && (
                <div className="px-3 pb-4 mt-auto text-center">
                    <p className="text-[7px] font-bold text-[#8CA8B1] uppercase tracking-tighter">
                        Copyright © 2026 Universitas Services | AGENTES VIRTUALES
                    </p>
                </div>
            )}
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
