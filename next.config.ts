import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // 1. Autoriza el origen para cargar estilos, scripts y HMR (WebSockets)
    allowedDevOrigins: ['https://consolidated-defence-making-forwarding.trycloudflare.com', '*.trycloudflare.com'],

    // 2. Autoriza el origen para poder enviar formularios (Login) usando Server Actions
    experimental: {
        serverActions: {
            allowedOrigins: ['https://consolidated-defence-making-forwarding.trycloudflare.com', '*.trycloudflare.com'],
        },
    },
};

export default nextConfig;
