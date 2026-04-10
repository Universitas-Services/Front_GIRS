'use client';

import { useState } from 'react';
import { MembershipExpiringModal } from '@/components/Modales/MembershipExpiringModal';

export default function SandboxPage() {
    // Estado para controlar si el modal está abierto o cerrado
    const [isExpiringModalOpen, setIsExpiringModalOpen] = useState(true);

    // Estado para controlar los días restantes y ver los diferentes diseños
    const [daysLeft, setDaysLeft] = useState(2);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4 w-full max-w-md">
                <h1 className="text-xl font-bold text-[#001D29]">Controles de Prueba</h1>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsExpiringModalOpen(true)}
                        className="px-4 py-2 bg-[#003d52] text-white rounded-xl shadow-sm hover:bg-[#003d52]/90 transition"
                    >
                        Abrir Modal
                    </button>
                </div>

                <div className="w-full h-[1px] bg-gray-100 my-2"></div>

                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-semibold text-gray-600">Estado de la membresía:</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setDaysLeft(2);
                                setIsExpiringModalOpen(true);
                            }}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${daysLeft > 0 ? 'bg-[#FFF9EB] text-[#D97706] border border-[#D97706]/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Por vencer (2 días)
                        </button>
                        <button
                            onClick={() => {
                                setDaysLeft(0);
                                setIsExpiringModalOpen(true);
                            }}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${daysLeft <= 0 ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            Vencida (0 días)
                        </button>
                    </div>
                </div>
            </div>

            {/* Renderizado del Modal */}
            <MembershipExpiringModal
                isOpen={isExpiringModalOpen}
                onClose={() => setIsExpiringModalOpen(false)}
                daysLeft={daysLeft}
            />
        </div>
    );
}
