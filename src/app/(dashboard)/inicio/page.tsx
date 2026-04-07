'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

    const handleRedSocial = (red: string) => {
        toast.info(`${red} próximamente.`);
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[#f0f3f2] flex items-center justify-center p-6 sm:p-10">
            {/* Contenedor Macro / Gran Tarjeta Blanca */}
            <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200/60 shadow-sm p-8 md:p-12 shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-stretch">
                    {/* Left Section - Profile info */}
                    <div className="flex flex-col justify-center">
                        {/* Character Avatar Box */}
                        <div className="w-40 h-40 rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-5 bg-[#e3cdb4]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/asset/Julio-AI-Fospuca.png"
                                alt="Asistente IA GIRS"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="text-3xl font-black text-[#003d52] tracking-tight mb-1">¿Quien soy?</h1>
                        <p className="italic text-gray-500 text-[15px] mb-4">Tu consultor legal inteligente</p>

                        <p className="italic text-gray-500 text-sm leading-relaxed mb-6">
                            Soy el Consultor IA de GIRS, un asistente especializado en gestión documental y orientación
                            jurídica. Estoy aquí para ayudarte a resolver dudas, redactar documentos y navegar procesos
                            legales de manera ágil y eficiente.
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                            <Button
                                onClick={handleIniciarChat}
                                className="bg-[#449f48] hover:bg-[#3b8a3e] text-white font-bold rounded-full px-6 h-10 transition-all active:scale-95"
                            >
                                Iniciar chat
                            </Button>
                            <span className="text-gray-500 font-semibold font-sans text-sm">o</span>
                            <Button
                                onClick={handleSoporteTecnico}
                                className="bg-[#003d52] hover:bg-[#002a3a] text-white font-bold rounded-full px-5 h-10 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.564.743-2.435 1.376-3.707.848h-.001c-1.268-.528-1.432-1.581-2.019-3.22h-3.232c-.587 1.638-.752 2.693-2.02 3.22h-.001c-1.27-.528-2.132-.1-3.706-.848l-2.285 2.285c.742 1.562 1.374 2.434.847 3.707v.001c-.528 1.268-1.583 1.433-3.22 2.019v3.232c1.637.586 2.692.75 3.22 2.019v.001c.528 1.271-.102 2.133-.847 3.707l2.285 2.286c1.559-.742 2.428-1.375 3.692-.851 1.278.531 1.442 1.59 2.033 3.234h3.232c.587-1.652.753-2.696 2.02-3.222.01-.003.018-.007.027-.01 1.242-.519 2.1.1 3.681.854l2.285-2.286c-.744-1.56-1.375-2.418-.846-3.704.002-.008.006-.017.009-.025.526-1.268 1.568-1.433 3.218-2.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                                </svg>
                                Soporte técnico
                            </Button>
                        </div>
                    </div>

                    {/* Right Section - Social Inner Card */}
                    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-8 flex flex-col">
                        <h2 className="text-xl font-bold text-[#003d52] leading-snug mb-6 pr-4">
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
                            className="bg-[#003d52] hover:bg-[#002a3a] text-white font-semibold rounded-md px-6 h-10 self-start transition-all active:scale-95 mb-8"
                        >
                            Más Información
                        </Button>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-auto text-[#003d52]">
                            {/* Instagram */}
                            <button
                                onClick={() => handleRedSocial('Instagram')}
                                className="hover:text-[#002a3a] transition-colors rounded-sm overflow-hidden flex items-center justify-center"
                            >
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </button>
                            {/* LinkedIn */}
                            <button
                                onClick={() => handleRedSocial('LinkedIn')}
                                className="hover:text-[#002a3a] transition-colors"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </button>
                            {/* Twitter */}
                            <button
                                onClick={() => handleRedSocial('Twitter')}
                                className="hover:text-[#002a3a] transition-colors"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </button>
                            {/* YouTube */}
                            <button
                                onClick={() => handleRedSocial('YouTube')}
                                className="hover:text-[#002a3a] transition-colors"
                            >
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21.582 6.186a2.68 2.68 0 0 0-1.884-1.895C18.034 3.84 12 3.84 12 3.84s-6.034 0-7.698.451a2.68 2.68 0 0 0-1.884 1.895C2 7.859 2 12 2 12s0 4.141.418 5.814a2.68 2.68 0 0 0 1.884 1.895C6.034 20.16 12 20.16 12 20.16s6.034 0 7.698-.451a2.68 2.68 0 0 0 1.884-1.895C22 16.141 22 12 22 12s0-4.141-.418-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
