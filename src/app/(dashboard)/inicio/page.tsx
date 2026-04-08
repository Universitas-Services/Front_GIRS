'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaXTwitter } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';

export default function InicioPage() {
    const router = useRouter();

    const handleIniciarChat = () => {
        router.push('/chat');
    };

    const handleSoporteTecnico = () => {
        window.open('https://wa.me/584145051716', '_blank');
    };

    const handleMasInformacion = () => {
        toast.info('Más información próximamente disponible.');
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-dashboard-bg)] flex items-center justify-center p-6 sm:p-10">
            {/* Contenedor Macro / Gran Tarjeta Blanca */}
            <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 md:p-12 shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
                    {/* Left Section - Profile info */}
                    <div className="flex flex-col justify-center">
                        {/* Character Avatar Box */}
                        <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-5 bg-[var(--color-avatar-bg)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/asset/Julio-AI-Fospuca.png"
                                alt="Asistente IA GIRS"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="text-3xl font-black text-primary tracking-tight mb-1">¿Quien soy?</h1>
                        <p className="italic text-gray-500 text-[15px] mb-4">Tu consultor legal inteligente</p>

                        <p className="italic text-gray-500 text-sm leading-relaxed mb-6">
                            Soy el Consultor IA de GIRS, un asistente especializado en gestión documental y orientación
                            jurídica. Estoy aquí para ayudarte a resolver dudas, redactar documentos y navegar procesos
                            legales de manera ágil y eficiente.
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                            <Button
                                onClick={handleIniciarChat}
                                className="bg-[var(--color-btn-green)] hover:bg-[var(--color-btn-green-hover)] text-white font-bold rounded-full px-6 h-10 transition-all active:scale-95"
                            >
                                Iniciar chat
                            </Button>
                            <span className="text-gray-500 font-semibold font-sans text-sm">o</span>
                            <Button
                                onClick={handleSoporteTecnico}
                                className="bg-primary hover:bg-primary-hover text-white font-bold rounded-full px-5 h-10 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <IoSettingsSharp size={18} color="white" />
                                Soporte técnico
                            </Button>
                        </div>
                    </div>

                    {/* Right Section - Social Inner Card */}
                    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-8 flex flex-col">
                        <h2 className="text-xl font-bold text-primary leading-snug mb-6 pr-4">
                            Conócenos y síguenos en nuestras redes sociales
                        </h2>

                        <p className="italic text-gray-500 text-sm leading-relaxed mb-8 flex-1">
                            Forma parte de nuestra <br />
                            comunidad. Accede a todos <br />
                            nuestros cursos sobre <br />
                            diversos temas de la <br />
                            Administración Pública. <br />
                            Infórmate de temas de interés <br />
                            en nuestro medio digital, <br />
                            Ágora.
                        </p>

                        <Button
                            onClick={handleMasInformacion}
                            className="bg-primary hover:bg-primary-hover text-white font-semibold rounded-md px-6 h-10 self-start transition-all active:scale-95 mb-8"
                        >
                            Más Información
                        </Button>

                        {/* Social Icons */}
                        <div className="flex items-center gap-5 mt-auto text-primary">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/universitas.legal/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-hover transition-all hover:scale-110"
                                title="Instagram"
                            >
                                <FaInstagram size={28} />
                            </a>
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/contratacionespublicas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-hover transition-all hover:scale-110"
                                title="Facebook"
                            >
                                <FaFacebook size={28} />
                            </a>
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/universitas-legal/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-hover transition-all hover:scale-110"
                                title="LinkedIn"
                            >
                                <FaLinkedin size={28} />
                            </a>
                            {/* Twitter (Pájaro) */}
                            <a
                                href="https://twitter.com/contratosve"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-hover transition-all hover:scale-110"
                                title="X (Twitter)"
                            >
                                <FaTwitter size={28} />
                            </a>
                            {/* X (Moderno) */}
                            <a
                                href="https://twitter.com/contratarve"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-hover transition-all hover:scale-110"
                                title="X"
                            >
                                <FaXTwitter size={26} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
