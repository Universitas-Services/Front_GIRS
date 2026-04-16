'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function AcercaDePage() {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="flex-1 overflow-y-auto bg-[var(--color-dashboard-bg)] flex flex-col p-4 md:p-6">
            {/* ── Un solo card conteniendo todo el contenido ── */}
            <div className="w-full max-w-3xl mx-auto rounded-xl bg-white border border-gray-200/70 shadow-sm p-6 md:p-8 flex flex-col gap-6">
                {/* Header: logo + título */}
                <div className="flex items-center gap-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/asset/LOGO UNIVERSITAS LEGAL.png"
                        alt="Universitas Legal"
                        className="h-14 w-auto object-contain shrink-0"
                    />
                    <div>
                        <h1 className="titulos-cards leading-tight mb-0 text-xl md:text-[23px]">
                            Acerca de <span style={{ color: 'var(--color-primary)' }}>AGENTES VIRTUALES</span>
                        </h1>
                        <p className="descripcion-cards mt-0.5">Una solución innovadora de Universitas Services C.A.</p>
                    </div>
                </div>

                {/* Descripción principal */}
                <div className="space-y-4">
                    <p className="descripcion-cards leading-relaxed">
                        Actas de entrega es una innovadora plataforma digital diseñada para ser el principal asistente
                        tecnológico de los servidores públicos en Venezuela. Nuestra aplicación transforma un proceso
                        tradicionalmente complejo en una experiencia de usuario simple, estructurada y segura.
                    </p>
                    <p className="descripcion-cards leading-relaxed">
                        El núcleo de nuestra plataforma es una interfaz intuitiva que guía al usuario a través de
                        formularios inteligentes, facilitando la recopilación de toda la información necesaria de manera
                        ordenada. Hemos creado un ecosistema que se adapta a las distintas necesidades de nuestros
                        usuarios a través de dos versiones: una versión express, ideal para generar un documento de
                        forma rápida y directa, y una versión pro, pensada para una gestión integral y a largo plazo.
                    </p>
                </div>

                {/* Versión Pro: barra vertical color primario */}
                <div className="flex gap-4">
                    <div
                        className="w-1 rounded-full shrink-0 self-stretch"
                        style={{ backgroundColor: 'var(--color-accent-bar)' }}
                    />
                    <p className="descripcion-cards leading-relaxed">
                        <span className="font-bold" style={{ color: 'var(--color-heading-dark)', fontStyle: 'normal' }}>
                            La versión pro es el corazón de nuestra innovación.
                        </span>{' '}
                        Ofrece un entorno robusto con almacenamiento seguro en la nube, permitiendo al usuario guardar,
                        gestionar y editar sus documentos en cualquier momento y desde cualquier lugar. Además,
                        integramos herramientas de inteligencia artificial que actúan como un asesor proactivo,
                        generando alertas y sugerencias para asegurar la debida diligencia en cada paso.
                    </p>
                </div>

                {/* Cierre */}
                <p className="descripcion-cards leading-relaxed">
                    En Universitas Services C.A. estamos comprometidos con el desarrollo de soluciones digitales
                    profesionales. Actas de entrega es un reflejo de esa visión: una aplicación potente, confiable y
                    segura, diseñada no solo para generar un documento, sino para aportar tranquilidad, control y
                    eficiencia a la importante labor de los servidores públicos de nuestro país.
                </p>

                {/* Footer: términos y privacidad */}
                <div className="flex items-center gap-8 pt-2">
                    <button
                        onClick={() => setIsTermsOpen(true)}
                        className="text-sm text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline transition-colors cursor-pointer"
                    >
                        Ver términos y condiciones
                    </button>
                    <button
                        onClick={() => setIsPrivacyOpen(true)}
                        className="text-sm text-[var(--color-neutral-dark)] hover:text-[var(--color-primary)] underline-offset-2 hover:underline transition-colors cursor-pointer"
                    >
                        Políticas de privacidad
                    </button>
                </div>
            </div>

            {/* ── Modal: Términos y Condiciones ── */}
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8 bg-white border-none rounded-3xl shadow-2xl">
                    <DialogHeader className="shrink-0 mb-4">
                        <DialogTitle className="text-2xl font-bold text-neutral-dark">
                            Términos y Condiciones
                        </DialogTitle>
                        <DialogDescription className="text-[14px] font-semibold text-neutral-dark/70 pt-1">
                            Última actualización: 04 de marzo de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">
                                Sección I: Identificación y aceptación de las partes.
                            </h4>
                            <p>
                                El presente instrumento regula la relación contractual entre Universitas Services C.A.
                                (en adelante, &quot;La Empresa&quot;) y el Usuario. Al registrarse y marcar la casilla
                                de &quot;Acepto&quot;, el Usuario manifiesta su consentimiento previo, libre e
                                informado, admitiendo haber leído, comprendido y aceptado la vinculación jurídica total
                                con este contrato, de conformidad con la Ley sobre Mensajes de Datos y Firmas
                                Electrónicas.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección II: Naturaleza del software y soporte IA
                            </h4>
                            <p>
                                El Consultor IA - GIRS es un sistema de asistencia basado en procesamiento de lenguaje
                                natural (NLP). Se define como una herramienta de soporte a la gestión documental y no
                                como un prestador de servicios jurídicos autónomos. Integra componentes de Google
                                Dialogflow y Vertex AI bajo una arquitectura propietaria.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección III: Licencia de uso y restricciones
                            </h4>
                            <p>
                                La Empresa otorga una licencia de uso no exclusiva e intransferible. Queda estrictamente
                                prohibido:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>El uso de la plataforma para fines ilícitos.</li>
                                <li>La compartición de credenciales de acceso.</li>
                                <li>Cualquier intento de extracción de la lógica de negocio alojada en el backend.</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección IV: Propiedad intelectual</h4>
                            <p>
                                Toda la propiedad intelectual, incluyendo el código fuente, las bibliotecas de
                                componentes y la base de datos documental, son propiedad exclusiva de La Empresa. El
                                Usuario no adquiere ningún derecho de propiedad sobre los algoritmos.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección V: Responsabilidad legal</h4>
                            <p>
                                La Empresa realiza sus mejores esfuerzos técnicos para el funcionamiento del sistema;
                                sin embargo, no puede garantizar la infalibilidad absoluta de las respuestas generadas
                                por la IA. El Usuario reconoce que el Consultor IA no sustituye la asesoría legal
                                profesional. La Empresa responderá únicamente por aquellos daños directos que sean
                                consecuencia de dolo o culpa grave comprobada en la prestación del servicio técnico, no
                                haciéndose responsable por las decisiones administrativas, financieras o legales que el
                                Usuario tome basándose exclusivamente en los resultados de la plataforma.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección VI: Derecho de retracto</h4>
                            <p>
                                Al tratarse de un servicio contratado por medios electrónicos, el Usuario tendrá derecho
                                a retractarse del presente contrato por justa causa dentro de un plazo de siete (7) días
                                contados desde su aceptación o desde la recepción del servicio, siempre que no haya
                                hecho un uso efectivo y sustancial del mismo, garantizándose el reintegro de los montos
                                pagados si fuere el caso.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VII: Disponibilidad y soporte técnico
                            </h4>
                            <p>
                                La Empresa se reserva el derecho de interrumpir temporalmente el servicio para labores
                                de mantenimiento. La Empresa no será responsable por fallas imputables a fuerza mayor,
                                caso fortuito, o caídas masivas en los proveedores de infraestructura de terceros (ej.
                                Google Cloud, AWS), siempre que dichas fallas escapen de su control razonable.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección VIII: Suspensión y resolución</h4>
                            <p>
                                La Empresa podrá suspender el acceso de forma inmediata ante usos abusivos debidamente
                                comprobados, intentos de inyección de código o manipulación de tokens, notificando al
                                Usuario sobre los motivos de la suspensión.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección IX: Actualización de los documentos
                            </h4>
                            <p>
                                Universitas Services C.A. podrá modificar los presentes Términos y Condiciones. En caso
                                de contratos con vigencia temporal de mediano o largo plazo, cualquier modificación
                                unilateral de las condiciones que justifique cambios en la facturación o el servicio
                                será notificada al Usuario con una antelación mínima de un (1) mes.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección X: Jurisdicción y Ley aplicable
                            </h4>
                            <p>
                                Para todos los efectos legales, este contrato se regirá por la legislación venezolana.
                                Toda controversia será sometida a la jurisdicción de los tribunales competentes según el
                                domicilio del Usuario.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección XI: Canales de contacto oficial
                            </h4>
                            <p>
                                Para dudas, soporte técnico o reclamaciones, el Usuario deberá comunicarse a través de:{' '}
                                <strong>contacto@universitas.legal</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 pt-6 mt-2 border-t border-surface-soft/20">
                        <Button
                            variant="secondary"
                            className="w-full h-12 rounded-xl bg-surface-soft/20 hover:bg-surface-soft/40 text-neutral-dark font-bold text-base transition-colors"
                            onClick={() => setIsTermsOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ── Modal: Política de Privacidad ── */}
            <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
                <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8 bg-white border-none rounded-3xl shadow-2xl">
                    <DialogHeader className="shrink-0 mb-4">
                        <DialogTitle className="text-2xl font-bold text-neutral-dark">
                            Política de Privacidad
                        </DialogTitle>
                        <DialogDescription className="text-[14px] font-semibold text-neutral-dark/70 pt-1">
                            Última actualización: 04 de marzo de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">Sección I: Marco legal y habeas data</h4>
                            <p>
                                Universitas garantiza el derecho constitucional a la protección de datos personales
                                (Art. 28 y 60 de la Constitución de la República Bolivariana de Venezuela). El
                                tratamiento de sus datos se rige por los principios dictados por el Tribunal Supremo de
                                Justicia: autonomía de la voluntad, legalidad, finalidad y calidad, temporalidad,
                                exactitud, y seguridad y confidencialidad.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección II: Datos objeto de tratamiento
                            </h4>
                            <p>
                                Recopilamos de forma automatizada datos de registro (nombre, correo electrónico, número
                                de teléfono), datos técnicos (IP, registros de sesión) y el contenido de las
                                interacciones con el agente para auditoría de calidad.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección III: Finalidades del tratamiento
                            </h4>
                            <p>Los datos personales serán procesados única y exclusivamente para:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Prestación del servicio: Validar la identidad mediante enlaces de activación y
                                    personalizar la experiencia.
                                </li>
                                <li>
                                    Soporte y mejora continua: Contactar al Usuario para asistencia técnica y conocer su
                                    experiencia para mejoras en el motor de Vertex AI.
                                </li>
                                <li>
                                    Comunicaciones comerciales: Enviar información sobre nuevos servicios,
                                    actualizaciones y ofertas de Universitas.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">Sección IV: Seguridad tecnológica</h4>
                            <p>
                                Adoptamos medidas técnicas y organizativas para proteger los datos contra su
                                adulteración, pérdida, acceso no autorizado o uso fraudulento. Empleamos cifrado en
                                reposo (AES-256) en Supabase/AWS y cifrado en tránsito vía TLS 1.2+. Las contraseñas se
                                protegen mediante hashing con bcrypt.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección V: Flujo transfronterizo de datos
                            </h4>
                            <p>
                                Mediante la aceptación expresa de esta política, el Usuario autoriza la transferencia y
                                almacenamiento de sus datos en la región AWS us-east-2 y en la infraestructura de Google
                                Cloud, estrictamente necesarios para el procesamiento de los modelos de IA.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VI: Conservación y anonimización
                            </h4>
                            <p>
                                La conservación de los datos personales se extenderá únicamente hasta el logro de los
                                objetivos que justificaron su obtención. Al materializarse la rescisión del contrato o
                                solicitar la eliminación de la cuenta, los datos de identidad son destruidos de manera
                                inmediata, dejando el historial de consultas en un estado de anonimización irreversible
                                para fines estadísticos.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VII: Ejercicio de derechos ARCO (Habeas Data)
                            </h4>
                            <p>
                                El Usuario posee el derecho a la autodeterminación informativa. En cualquier momento
                                podrá ejercer sus derechos constitucionales de:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Acceso: Conocer la existencia de registros, su uso y finalidad.</li>
                                <li>
                                    Rectificación y actualización: Corregir datos falsos, inexactos o desactualizados.
                                </li>
                                <li>
                                    Cancelación (Destrucción): Solicitar la eliminación total de sus datos cuando
                                    revoque su consentimiento.
                                </li>
                                <li>
                                    Oposición: Negarse a un tratamiento específico de sus datos, incluyendo el uso para
                                    marketing directo. Contacto: contacto@universitas.legal.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección VIII: Comunicaciones comerciales y anti-spam
                            </h4>
                            <p>
                                Universitas garantiza el derecho del Usuario a elegir si desea recibir mensajes
                                comerciales. Toda comunicación de marketing incluirá un mecanismo fácil para revocar su
                                consentimiento. Cuando el Usuario indique que no desea recibir mensajes comerciales
                                electrónicos, Universitas suspenderá su envío en un lapso no mayor de veinticuatro (24)
                                horas.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección IX: Modificación de las políticas de privacidad
                            </h4>
                            <p>
                                En caso de realizar cambios sustanciales sobre las finalidades o el tratamiento de sus
                                datos, Universitas notificará al Usuario y solicitará nuevamente su consentimiento
                                previo, libre e inequívoco a través de la plataforma antes de que dichos cambios entren
                                en vigor.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección X: Notificación de brechas de seguridad
                            </h4>
                            <p>
                                En caso de detectarse una vulneración en la seguridad que ponga en riesgo la
                                confidencialidad de los datos, Universitas informará oportunamente a los usuarios
                                afectados, detallando los riesgos y las medidas adoptadas.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                Sección XI: Atención a consultas de privacidad
                            </h4>
                            <p>
                                Cualquier solicitud relativa a la protección de datos personales debe ser dirigida a:{' '}
                                <strong>contacto@universitas.legal</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0 pt-6 mt-2 border-t border-surface-soft/20">
                        <Button
                            variant="secondary"
                            className="w-full h-12 rounded-xl bg-surface-soft/20 hover:bg-surface-soft/40 text-neutral-dark font-bold text-base transition-colors"
                            onClick={() => setIsPrivacyOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
