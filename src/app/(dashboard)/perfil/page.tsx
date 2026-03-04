'use client';

import { useState } from 'react';
import { useAuth } from '@/store/auth.context';
import { Settings, Key, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { authService } from '@/lib/services/auth.service';
import { toast } from 'sonner';

type Tab = 'edit' | 'security' | 'delete';

export default function ProfilePage() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('delete'); // Default to delete for testing visibility based on user request

    // First modal state
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

    // Second modal state
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [confirmationPhrase, setConfirmationPhrase] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const targetPhrase = 'eliminar mi cuenta';

    const handleFirstModalContinue = () => {
        setIsFirstModalOpen(false);
        setTimeout(() => {
            setIsSecondModalOpen(true);
        }, 150); // slight delay to allow smooth unmount
    };

    const handleFinalDelete = async () => {
        if (confirmationPhrase !== targetPhrase) {
            toast.error('La frase de confirmación no coincide exactamente.');
            return;
        }

        if (!deletePassword) {
            toast.error('La contraseña actual es requerida.');
            return;
        }

        setIsDeleting(true);
        try {
            await authService.deleteAccount(deletePassword);
            toast.success('Tu cuenta ha sido eliminada permanentemente.');
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Failed to delete account', error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errMsg =
                (error as any).response?.data?.message || 'Contraseña incorrecta o error al procesar tu solicitud.';
            toast.error(errMsg);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-surface flex flex-col pt-6 px-4 sm:px-8">
            <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
                {/* Header */}
                <div className="mb-4 flex justify-center">
                    <h1 className="text-2xl font-bold text-neutral-dark">Gestión de perfil</h1>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-surface-soft overflow-hidden">
                    {/* Inner Header */}
                    <div className="p-6 border-b border-surface-soft/40">
                        <h2 className="text-xl font-bold text-neutral-dark">Configuración de tu perfil</h2>
                        <p className="text-sm text-neutral-dark/60 mt-1">
                            Gestiona la información de tu cuenta y tu configuración de seguridad.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row min-h-[400px]">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-56 border-r border-surface-soft/40 p-3 space-y-1">
                            <button
                                onClick={() => setActiveTab('edit')}
                                className={cn(
                                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer text-left',
                                    activeTab === 'edit'
                                        ? 'bg-transparent text-neutral-dark font-bold'
                                        : 'text-neutral-dark/70 hover:bg-surface-soft/10 font-medium'
                                )}
                            >
                                <Settings className="w-4 h-4" />
                                Editar perfil
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={cn(
                                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer text-left',
                                    activeTab === 'security'
                                        ? 'bg-transparent text-neutral-dark font-bold'
                                        : 'text-neutral-dark/70 hover:bg-surface-soft/10 font-medium'
                                )}
                            >
                                <Key className="w-4 h-4" />
                                Cambiar contraseña
                            </button>

                            <div className="px-2 pt-2">
                                <button
                                    onClick={() => setActiveTab('delete')}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors cursor-pointer text-left',
                                        activeTab === 'delete'
                                            ? 'bg-surface-soft/20 text-[#ee3f46] font-semibold'
                                            : 'text-neutral-dark/70 hover:bg-surface-soft/10 font-medium hover:text-[#ee3f46]'
                                    )}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Eliminar cuenta
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-6">
                            {activeTab === 'edit' && (
                                <div className="text-neutral-dark/60">
                                    <p>Opciones de edición de perfil (Próximamente)</p>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="text-neutral-dark/60">
                                    <p>Opciones de seguridad (Próximamente)</p>
                                </div>
                            )}

                            {activeTab === 'delete' && (
                                <div className="w-full">
                                    <div className="w-full rounded-xl border border-red-400 bg-white overflow-hidden shadow-sm">
                                        <div className="p-5">
                                            <h3 className="text-[14px] font-bold text-neutral-dark mb-1">
                                                Eliminar cuenta
                                            </h3>
                                            <p className="text-neutral-dark/70 text-[13px] leading-relaxed">
                                                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
                                                asegúrate de que realmente quieres hacerlo. Toda tu información y actas
                                                guardadas se perderán permanentemente.
                                            </p>
                                        </div>
                                        <div className="border-t border-red-400 px-5 py-3 flex justify-end">
                                            <Button
                                                variant="destructive"
                                                className="w-full sm:w-auto px-6 bg-[#ee3f46] hover:bg-red-600 text-white font-semibold rounded-lg h-9 text-sm transition-all"
                                                onClick={() => setIsFirstModalOpen(true)}
                                            >
                                                Eliminar cuenta
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* MODAL 1: First Confirmation */}
                <AlertDialog open={isFirstModalOpen} onOpenChange={setIsFirstModalOpen}>
                    <AlertDialogContent className="sm:max-w-md bg-white border border-surface-soft shadow-2xl rounded-2xl p-6">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-neutral-dark text-xl font-bold">
                                ¿Estás absolutamente seguro?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-dark/70 text-[15px] pt-2 leading-relaxed">
                                Esta acción es irreversible y no se puede deshacer. Esto eliminará permanentemente tu
                                cuenta y todos tus datos de nuestros servidores.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
                            <AlertDialogCancel className="bg-surface hover:bg-surface-soft/30 text-neutral-dark border-transparent font-medium rounded-lg">
                                Cancelar
                            </AlertDialogCancel>
                            <Button
                                variant="destructive"
                                onClick={handleFirstModalContinue}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
                            >
                                Continuar con la eliminación
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* MODAL 2: Final Confirmation */}
                <AlertDialog
                    open={isSecondModalOpen}
                    onOpenChange={(open) => {
                        setIsSecondModalOpen(open);
                        if (!open) {
                            setConfirmationPhrase('');
                            setDeletePassword('');
                        }
                    }}
                >
                    <AlertDialogContent className="sm:max-w-md bg-white border border-surface-soft shadow-2xl rounded-3xl p-6 sm:p-8">
                        <div className="absolute top-4 right-4">
                            <AlertDialogCancel className="h-8 w-8 p-0 rounded-full bg-transparent border-transparent hover:bg-surface-soft/30 text-neutral-dark/60">
                                <X className="h-4 w-4" />
                            </AlertDialogCancel>
                        </div>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-neutral-dark text-xl font-bold flex items-center gap-2">
                                Confirmación final requerida
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-dark/70 text-[15px] pt-1 leading-relaxed">
                                Para confirmar, escribe <span className="font-bold text-[#ee3f46]">{targetPhrase}</span>{' '}
                                en el campo de abajo y proporciona tu contraseña actual.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="my-5 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-neutral-dark mb-1.5">
                                    Frase de confirmación
                                </label>
                                <Input
                                    value={confirmationPhrase}
                                    onChange={(e) => setConfirmationPhrase(e.target.value)}
                                    className="border-surface-soft focus-visible:ring-red-200 bg-surface-light h-11 text-neutral-dark font-medium"
                                    placeholder=""
                                    disabled={isDeleting}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-neutral-dark mb-1.5">
                                    Contraseña actual
                                </label>
                                <Input
                                    type="password"
                                    value={deletePassword}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                    className="border-surface-soft focus-visible:ring-red-200 bg-surface-light h-11 text-neutral-dark font-medium"
                                    disabled={isDeleting}
                                />
                            </div>
                        </div>

                        <AlertDialogFooter className="mt-2">
                            <Button
                                variant="destructive"
                                onClick={handleFinalDelete}
                                disabled={isDeleting || confirmationPhrase !== targetPhrase || !deletePassword}
                                className="w-full bg-[#ee3f46] hover:bg-red-600 focus:ring-[#ee3f46] text-white font-bold rounded-xl h-[52px] text-[16px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? 'Eliminando...' : 'Eliminar cuenta permanentemente'}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
