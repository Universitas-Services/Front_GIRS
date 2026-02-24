'use client';

import { ReactNode, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useAuth } from '@/store/auth.context';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Optional basic mock auth protection
        // if (!isAuthenticated) {
        //   router.push('/login');
        // }
    }, [isAuthenticated, router]);

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-surface-light text-neutral-dark">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
                {children}
            </main>
        </div>
    );
}
