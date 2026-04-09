'use client';

import * as React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MembershipExpiringModalProps {
    isOpen: boolean;
    onClose: () => void;
    daysLeft?: number;
}

export function MembershipExpiringModal({ isOpen, onClose, daysLeft = 2 }: MembershipExpiringModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] p-8 gap-0 rounded-3xl" showCloseButton={false}>
                <div className="flex flex-col items-center">
                    {/* Top Icon Section */}
                    <div className="flex items-center justify-center w-16 h-16 bg-[#FFF9EB] rounded-2xl mb-6">
                        <AlertTriangle className="w-8 h-8 text-[#D97706]" strokeWidth={2.5} />
                    </div>

                    {/* Title */}
                    <DialogHeader className="p-0 mb-4">
                        <DialogTitle className="text-3xl font-bold text-[#001D29] text-center leading-tight">
                            Membresía por vencer
                        </DialogTitle>
                    </DialogHeader>

                    {/* Description */}
                    <p className="text-[#4B5E7C] text-center text-[15px] leading-relaxed mb-6 px-4">
                        Tu comprobación finaliza en {daysLeft} día(s). No pierdas el acceso a tus chats y herramientas
                        de investigación.
                    </p>

                    {/* Simulated Progress Bar */}
                    <div className="w-full h-2 bg-[#E9EFFF] rounded-full mb-10 overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '85%' }} />
                    </div>

                    {/* Benefits Box */}
                    <div className="bg-[#F4F7FF] p-6 rounded-xl w-full mb-8">
                        <h4 className="text-[#003D52] font-bold text-center text-sm mb-4">
                            Actualiza tu plan ahora para continuar sin interrupciones.
                        </h4>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#0EA5E9]" />
                                <span className="text-[#4B5E7C] text-sm font-medium">Acceso completo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#0EA5E9]" />
                                <span className="text-[#4B5E7C] text-sm font-medium">Historial completo de chats</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col w-full gap-3">
                        <Button className="bg-[#003d52] hover:bg-[#003d52]/90 text-white rounded-xl h-12 text-base font-semibold shadow-sm transition-all">
                            Renovar membresía
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-[#4B5E7C] hover:text-[#001D29] hover:bg-transparent text-base font-medium transition-all h-10"
                        >
                            Continuar sin renovar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
