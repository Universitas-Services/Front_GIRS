'use client';

import { FaBook } from 'react-icons/fa';
import { IoDownloadOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

export default function ProyectoLeyPage() {
    const downloadUrl = '#';
    const imageUrl = '';
    const descriptionText =
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const handleDownload = () => {
        if (downloadUrl && downloadUrl !== '#') {
            window.open(downloadUrl, '_blank');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-dashboard-bg)] flex flex-col p-2 sm:p-4 md:p-6">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 py-2">
                <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm px-4 py-3 flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--color-icon-green-bg)' }}
                    >
                        <FaBook className="w-9 h-9" style={{ color: 'var(--color-icon-green)' }} />
                    </div>
                    <h1 className="titulos-cards leading-tight mb-0">
                        ANTEPROYECTO DE &ldquo;LEY ORGÁNICA DE GESTIÓN INTEGRAL DE RESIDUOS Y DESECHOS SÓLIDOS&rdquo;
                    </h1>
                </div>

                <div className="grid grid-cols-2 gap-8 items-stretch">
                    <div className="flex flex-col gap-4 h-full">
                        <div className="rounded-xl bg-white border border-green-500 shadow-sm p-1.5 flex-1 flex flex-col min-h-[280px]">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Anteproyecto de Ley"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex-1 flex items-center justify-center rounded-lg"
                                    style={{ backgroundColor: 'var(--color-surface-soft)' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-24 h-24 opacity-25"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="var(--color-neutral-dark)"
                                        strokeWidth={0.7}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="h-10 flex items-center">
                            <Button
                                onClick={handleDownload}
                                className="h-10 text-white font-semibold rounded-lg px-5 text-sm transition-all active:scale-95 cursor-pointer gap-2"
                                style={{ backgroundColor: 'var(--color-icon-green)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-btn-green-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--color-icon-green)';
                                }}
                            >
                                Descarga aqui
                                <IoDownloadOutline className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm px-8 py-8 h-full flex flex-col justify-center">
                        <p className="descripcion-cards leading-relaxed italic text-gray-600 text-[15px]">
                            {descriptionText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
