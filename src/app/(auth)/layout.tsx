import { ReactNode } from 'react';
import Image from 'next/image';
import { APP_CONFIG } from '@/config/app.config';
import { Network } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white flex">
            <div className="w-full flex flex-col md:flex-row h-screen">

                {/* Panel Izquierdo (Móvil y Desktop) */}
                <div className="flex md:w-[45%] bg-primary flex-col items-center justify-center p-8 lg:p-12 relative text-on-primary shrink-0 min-h-[300px] md:min-h-full">
                    <div className="flex flex-col items-center justify-center z-10 space-y-4 text-center">
                        {APP_CONFIG.AGENT_AVATAR_URL ? (
                            <div className="w-20 h-20 rounded-full bg-surface-soft/10 flex items-center justify-center overflow-hidden mb-1 ring-4 ring-white/10">
                                <Image src={APP_CONFIG.AGENT_AVATAR_URL} alt="Agent" width={80} height={80} className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-surface-soft/20 flex items-center justify-center mb-1">
                                <span className="text-3xl text-white">🤖</span>
                            </div>
                        )}
                        <h1 className="text-3xl font-bold tracking-tight">{APP_CONFIG.PROJECT_NAME}</h1>
                        <p className="text-on-primary/80 max-w-xs text-sm leading-relaxed">
                            Gestiona tus agentes conversacionales con la potencia de la inteligencia artificial avanzada.
                        </p>
                    </div>

                    <div className="absolute bottom-6 opacity-20 hidden md:block">
                        <Network size={120} strokeWidth={1} />
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
