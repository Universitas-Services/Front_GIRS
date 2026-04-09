'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/store/auth.context';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/services/auth.service';
import { MembershipExpiringModal } from '@/components/Modales';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
    const [membershipDaysLeft, setMembershipDaysLeft] = useState<number>(0);

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.replace('/login');
            } else {
                document.title = 'Consultor IA - GIRS';
            }
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const checkMembershipStatus = async () => {
            if (isAuthenticated) {
                try {
                    const profile = await authService.getFullProfile();

                    if (profile.alertaVencimiento) {
                        setMembershipDaysLeft(profile.alertaVencimiento.diasRestantes);
                        // Delay modal appearance for a better user experience
                        timeoutId = setTimeout(() => {
                            setIsMembershipModalOpen(true);
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Failed to fetch profile membership status', error);
                }
            }
        };

        if (!isLoading) {
            checkMembershipStatus();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isAuthenticated, isLoading]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex h-[100dvh] items-center justify-center bg-surface-light">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-surface-light text-neutral-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">{children}</main>

            <MembershipExpiringModal
                isOpen={isMembershipModalOpen}
                onClose={() => setIsMembershipModalOpen(false)}
                daysLeft={membershipDaysLeft}
            />
        </div>
    );
}
