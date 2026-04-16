'use client';

import { useRef, useEffect, useCallback } from 'react';
import { BibliotecaGirsCard } from '@/components/bibliotecagirs/BibliotecaGirsCard';
import { FaBalanceScale } from 'react-icons/fa';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// Data original de 6 tarjetas
const BASE_CARDS = [
    {
        type: 'technical',
        title: 'Legislación',
        tagLabel: 'NACIONAL',
        tagBgColor: 'bg-blue-100',
        tagTextColor: 'text-blue-700',
        imageSrc: '/bibliotecagirs/legislacionn.png',
        description: 'Compendio integral de leyes nacionales, decretos reglamentarios y normativas estatales.',
    },
    {
        type: 'technical',
        title: 'Ordenanzas',
        tagLabel: 'LOCAL',
        tagBgColor: 'bg-green-100',
        tagTextColor: 'text-green-700',
        imageSrc: '/bibliotecagirs/ordenanzass.png',
        description: 'Repositorio de disposiciones municipales y resoluciones regionales específicas.',
    },
    {
        type: 'technical',
        title: 'Sentencias',
        tagLabel: 'JUDICIAL',
        tagBgColor: 'bg-slate-200',
        tagTextColor: 'text-slate-600',
        imageSrc: '/bibliotecagirs/sentenciass.png',
        description: 'Análisis detallado de fallos jurisprudenciales y dictámenes de tribunales superiores.',
    },
    {
        type: 'technical',
        title: 'Doctrinas Administrativas',
        tagLabel: 'TÉCNICO',
        tagBgColor: 'bg-fuchsia-100',
        tagTextColor: 'text-fuchsia-700',
        imageSrc: '/bibliotecagirs/doctrinas_administrativass.png',
        description: 'Criterios interpretativos emitidos por entes reguladores y autoridades ambientales.',
    },
    {
        type: 'technical',
        title: 'Doctrinas',
        tagLabel: 'ACADEMICO',
        tagBgColor: 'bg-orange-100',
        tagTextColor: 'text-orange-700',
        imageSrc: '/bibliotecagirs/doctrinass.png',
        description: 'Artículos de investigación, ensayos académicos y tesis especializadas.',
    },
    {
        type: 'promo',
        title: 'Ágora',
    },
];

// Triplicamos la data para que el loop infinito sea invisible
const INFINITE_CARDS = [...BASE_CARDS, ...BASE_CARDS, ...BASE_CARDS];

export default function RepositorioLegalPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const hasInitializedRef = useRef(false);
    const hoverScrollRef = useRef<number | null>(null);

    // Inicializar el scroll en el set del medio
    useEffect(() => {
        if (scrollContainerRef.current && !hasInitializedRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = 300 + 24; // ancho + gap
            const midPoint = BASE_CARDS.length * cardWidth;
            container.scrollLeft = midPoint;
            hasInitializedRef.current = true;
        }
    }, []);

    // Manejar el salto infinito cuando se llega a los bordes
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const { scrollLeft, scrollWidth } = container;
        const cardWidth = 300 + 24;
        const setWidth = BASE_CARDS.length * cardWidth;

        // Si entramos en el primer set, saltamos al medio
        if (scrollLeft < setWidth / 2) {
            container.scrollLeft = scrollLeft + setWidth;
        }
        // Si entramos en el último set, saltamos al medio
        else if (scrollLeft > scrollWidth - setWidth * 1.5) {
            container.scrollLeft = scrollLeft - setWidth;
        }
    }, []);

    // Función de scroll automático (Hover)
    const startHoverScroll = (direction: 'left' | 'right') => {
        const speed = direction === 'left' ? -4 : 4;

        const animate = () => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollLeft += speed;
                hoverScrollRef.current = requestAnimationFrame(animate);
            }
        };

        hoverScrollRef.current = requestAnimationFrame(animate);
    };

    const stopHoverScroll = () => {
        if (hoverScrollRef.current) {
            cancelAnimationFrame(hoverScrollRef.current);
            hoverScrollRef.current = null;
        }
    };

    // Scroll manual por click (salta una tarjeta)
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const cardWidth = 300 + 24;
            const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-dashboard-bg)] flex flex-col p-4 md:p-6 pb-20">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 py-2">
                {/* ── Card de Información ── */}
                <div className="rounded-xl bg-white border border-gray-200/70 shadow-sm p-6 md:p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[var(--color-icon-green)] etiquetas font-bold">
                        <FaBalanceScale size={18} />
                        <span>Base de Conocimiento</span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="titulos-cards text-3xl md:text-[34px] leading-tight mb-0">Repositorio Legal</h1>
                        <p className="descripcion-cards text-base md:text-[17px] leading-relaxed max-w-3xl">
                            Acceda a la normativa vigente, decretos legislativos y marcos regulatorios que rigen la
                            Gestión Integral de Residuos Sólidos.
                        </p>
                    </div>
                </div>

                {/* ── Sección de Carrusel ── */}
                <div className="relative group overflow-visible">
                    {/* Botones de Navegación - Siempre visibles para guiar al usuario */}
                    <button
                        onMouseEnter={() => startHoverScroll('left')}
                        onMouseLeave={stopHoverScroll}
                        onClick={() => scroll('left')}
                        className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-all opacity-40 hover:opacity-100 active:scale-90 cursor-pointer"
                        title="Deslizar a la izquierda"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onMouseEnter={() => startHoverScroll('right')}
                        onMouseLeave={stopHoverScroll}
                        onClick={() => scroll('right')}
                        className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 transition-all opacity-40 hover:opacity-100 active:scale-90 cursor-pointer"
                        title="Deslizar a la derecha"
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Contenedor del Carrusel - Eliminamos scroll-smooth para control instantáneo */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 no-scrollbar"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {INFINITE_CARDS.map((card, idx) => (
                            <div
                                key={idx}
                                className="min-w-[300px] w-[300px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-1"
                            >
                                {card.type === 'technical' ? (
                                    <BibliotecaGirsCard
                                        tagLabel={card.tagLabel!}
                                        title={card.title}
                                        description={card.description!}
                                        imageSrc={card.imageSrc}
                                        tagBgColor={card.tagBgColor}
                                        tagTextColor={card.tagTextColor}
                                        className="h-full shadow-sm border-gray-200/50"
                                    />
                                ) : (
                                    <div className="flex flex-col bg-[#003d52] text-white rounded-xl shadow-md border border-[#003d52] overflow-hidden p-6 h-full justify-between min-h-[460px]">
                                        <div>
                                            <h3 className="text-xl font-bold mb-3 leading-tight uppercase tracking-tight">
                                                Conoce nuestro medio digital Ágora
                                            </h3>
                                            <div className="w-12 h-1 bg-[#00b800] mb-4"></div>
                                            <p className="text-white/80 italic text-sm leading-relaxed mb-6">
                                                Nuevo manual de procedimientos para la gestión de residuos biomédicos en
                                                zonas urbanas de alta densidad. Actualizado Mayo 2024.
                                            </p>
                                        </div>
                                        <div className="mt-auto">
                                            <a
                                                href="#"
                                                className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#00b800] hover:bg-[#009900] transition-colors text-white font-bold rounded-lg text-sm group overflow-hidden relative shadow-lg shadow-[#00b800]/20"
                                            >
                                                Saber más
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
