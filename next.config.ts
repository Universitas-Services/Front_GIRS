import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // 1. Autoriza el origen para cargar estilos, scripts y HMR (WebSockets)
    allowedDevOrigins: ['https://bat-phones-possibly-minutes.trycloudflare.com', '*.trycloudflare.com'],

    // 2. Autoriza el origen para poder enviar formularios (Login) usando Server Actions
    experimental: {
        serverActions: {
            allowedOrigins: ['https://bat-phones-possibly-minutes.trycloudflare.com', '*.trycloudflare.com'],
        },
    },
};

export default nextConfig;
