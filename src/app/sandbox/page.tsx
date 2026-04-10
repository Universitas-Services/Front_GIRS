'use client';

import { useState } from 'react';
// Asegúrate de que la ruta de importación coincida con donde guardaste el archivo
import { ProfileIncompleteModal } from '@/components/Modales/ProfileIncompleteModal';

export default function SandboxPage() {
    // Estado para controlar el modal
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(true);

    // Función que simula lo que pasa cuando el formulario se envía con éxito
    const handleSuccess = () => {
        console.log('Mock: El perfil se completó con éxito. Cerrando modal...');
        setIsProfileModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4 w-full max-w-md">
                <h1 className="text-xl font-bold text-[#001D29]">Controles de Prueba</h1>
                <p className="text-sm text-gray-500 text-center mb-2">
                    Prueba las validaciones, los campos condicionales y los estados de carga.
                </p>

                <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="w-full px-4 py-2 bg-[#124C5A] text-white rounded-xl shadow-sm hover:bg-[#0E3A45] transition font-medium"
                >
                    Abrir Modal de Perfil Incompleto
                </button>
            </div>

            {/* Renderizado del Modal */}
            <ProfileIncompleteModal isOpen={isProfileModalOpen} onSuccess={handleSuccess} />
        </div>
    );
}
