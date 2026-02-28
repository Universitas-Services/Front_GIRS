'use client';

import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/auth.context';

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace('/chat');
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <div className="min-h-screen bg-white flex">
            <div className="w-full flex flex-col md:flex-row h-screen">
                {/* Panel Izquierdo (Móvil y Desktop) */}
                <div className="flex md:w-[45%] bg-primary flex-col items-center justify-center p-8 lg:p-12 relative text-on-primary shrink-0 min-h-[300px] md:min-h-full">
                    <div className="flex flex-col items-center justify-center z-10 space-y-6 text-center">
                        <div className="w-80 h-auto flex items-center justify-center mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/asset/LOGO UNIVERSITAS LEGAL (BLANCO).png"
                                alt="Universitas Legal Logo"
                                className="w-full h-auto object-contain drop-shadow-md"
                            />
                        </div>
                        <p className="text-on-primary/90 max-w-sm text-[15px] font-medium leading-relaxed">
                            Consultoría experta en Gestión Integral de Residuos Sólidos.
                        </p>
                    </div>
                </div>

                {/* Panel Derecho (Formularios) */}
                <div className="w-full md:w-[55%] bg-white flex flex-col justify-center p-6 sm:p-10 lg:p-14 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
