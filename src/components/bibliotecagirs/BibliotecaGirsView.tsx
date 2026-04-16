'use client';

import { BibliotecaGirsCard } from './BibliotecaGirsCard';
import { BookOpen, ArrowRight } from 'lucide-react';

export function BibliotecaGirsView() {
    return (
        <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[#f4f7f6]">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#00b800]" />
                        <span className="text-[#00b800] font-medium text-sm tracking-wider uppercase">
                            Documentación Técnica
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#003d52]">Biblioteca GIRS</h1>
                    <div className="w-50 h-0.5 bg-[#003d52]"></div>
                    <p className="text-neutral-500 italic max-w-3xl leading-relaxed">
                        Acceda al repositorio centralizado de conocimientos normativos y doctrinales para la Gestión
                        Integral de Residuos Sólidos. Una arquitectura de información diseñada para la soberanía técnica
                        legal.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BibliotecaGirsCard
                        title="Legislación"
                        tagLabel="NACIONAL"
                        tagBgColor="bg-blue-100"
                        tagTextColor="text-blue-700"
                        imageSrc="/bibliotecagirs/legislacionn.png"
                        description="Compendio integral de leyes nacionales, decretos reglamentarios y normativas..."
                    />
                    <BibliotecaGirsCard
                        title="Ordenanzas"
                        tagLabel="LOCAL"
                        tagBgColor="bg-green-100"
                        tagTextColor="text-green-700"
                        imageSrc="/bibliotecagirs/ordenanzass.png"
                        description="Repositorio de disposiciones municipales y resoluciones regionales específicas que..."
                    />
                    <BibliotecaGirsCard
                        title="Sentencias"
                        tagLabel="JUDICIAL"
                        tagBgColor="bg-slate-200"
                        tagTextColor="text-slate-600"
                        imageSrc="/bibliotecagirs/sentenciass.png"
                        description="Análisis detallado de fallos jurisprudenciales y dictámenes de tribunales superiores..."
                    />
                    <BibliotecaGirsCard
                        title="Doctrinas Administrativas"
                        tagLabel="TÉCNICO"
                        tagBgColor="bg-fuchsia-100"
                        tagTextColor="text-fuchsia-700"
                        imageSrc="/bibliotecagirs/doctrinas_administrativass.png"
                        description="Criterios interpretativos emitidos por entes reguladores y autoridades ambientales....."
                    />
                    <BibliotecaGirsCard
                        title="Doctrinas"
                        tagLabel="ACADEMICO"
                        tagBgColor="bg-orange-100"
                        tagTextColor="text-orange-700"
                        imageSrc="/bibliotecagirs/doctrinass.png"
                        description="Artículos de investigación, ensayos académicos y tesis especializadas que exploran las..."
                    />

                    {/* Especial Promo Card */}
                    <div className="flex flex-col bg-[#003d52] text-white rounded-xl shadow-sm border border-[#003d52] overflow-hidden p-8 justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold mb-2 leading-tight">
                                Conoce nuestro medio digital Ágora
                            </h3>
                            <div className="w-50 h-0.5 bg-white mb-4"></div>
                            <p className="text-white/80 italic text-sm leading-relaxed mb-6">
                                Nuevo manual de procedimientos para la gestión de residuos biomédicos en zonas urbanas
                                de alta densidad. Actualizado Mayo 2024.
                            </p>
                        </div>
                        <a
                            href="#"
                            className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-[#00b800] hover:bg-[#009900] transition-colors text-white font-medium rounded-lg text-sm group mt-auto"
                        >
                            Saber más
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
