'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function AcercaDePage() {
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-[var(--color-dashboard-bg)]">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* ── Un solo card conteniendo todo el contenido ── */}
                <div className="w-full rounded-xl bg-white border border-gray-200/70 shadow-sm p-6 md:p-8 flex flex-col gap-6">
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
                                Acerca de la <span style={{ color: 'var(--color-primary)' }}>PLATAFORMA GIRS</span>
                            </h1>
                            <p className="descripcion-cards mt-0.5">
                                La infraestructura jurídica y técnica para la Gestión Ambiental en Venezuela.
                            </p>
                        </div>
                    </div>

                    {/* Descripción principal */}
                    <div className="space-y-4">
                        <p className="descripcion-cards leading-relaxed">
                            La Plataforma GIRS es el ecosistema digital definitivo diseñado para transformar la{' '}
                            <strong>Gestión de Residuos Sólidos </strong>
                            en Venezuela, desarrollada por Universitas Services C.A.
                        </p>
                        <p className="descripcion-cards leading-relaxed">
                            Nuestra misión es cerrar el &quot;abismo de información&quot; y el caos normativo que
                            enfrentan municipios, empresas y asesores, proporcionando una base sólida para la toma de
                            decisiones desinformadas.
                        </p>
                    </div>

                    {/* Versión Pro: barra vertical color primario */}
                    <div className="flex gap-4">
                        <div
                            className="w-1 rounded-full shrink-0 self-stretch"
                            style={{ backgroundColor: 'var(--color-accent-bar)' }}
                        />
                        <p className="descripcion-cards leading-relaxed">
                            <span
                                className="font-bold"
                                style={{ color: 'var(--color-heading-dark)', fontStyle: 'normal' }}
                            >
                                El Corazón de nuestra Innovación: Biblioteca Digital GIRS
                            </span>{' '}
                            Nuestra plataforma centraliza el repositorio de conocimientos más completo del país.
                            Contamos con más de 130 instrumentos normativos, técnicos y doctrinales previamente curados,
                            digitalizados y validados por expertos. Eliminamos la dispersión de la información,
                            permitiendo que incluso los municipios con menos recursos tengan acceso a una asesoría de
                            nivel global.
                        </p>
                    </div>

                    {/* Cierre */}
                    <p className="descripcion-cards leading-relaxed">
                        Contamos con el Consultor IA, a diferencia de las inteligencias artificiales genéricas que
                        suelen &quot;alucinar&quot; o inventar datos legales, nuestro Agente GIRS opera bajo una
                        arquitectura de circuito cerrado (RAG). No improvisa, sus respuestas están ancladas
                        exclusivamente a nuestra Biblioteca Digital GIRS, logrando una precisión actual superior al 80%
                        (aún se encuentra en entrenamiento); Cada respuesta incluye la cita oficial exacta (Gaceta y
                        número de artículo), permitiendo una validación instantánea.
                        <br />
                        <br />
                        Un Copiloto, no un sustituto. En Universitas Services C.A., creemos en el empoderamiento del
                        criterio humano. El Agente GIRS está diseñado para actuar como una supervisión especializada y
                        un copiloto experto que asiste en tiempo real, permitiendo que el funcionario decida con base en
                        datos ciertos en menos de 3.2 segundos.
                        <br />
                        <br />
                        <strong>Nuestro Compromiso</strong>
                        <br />
                        Estamos comprometidos con la mitigación de la discrecionalidad administrativa y la
                        democratización del saber experto. Plataforma GIRS es una herramienta potente, confiable y
                        segura, creada no solo para consultar leyes, sino para habilitar una verdadera economía circular
                        y alcanzar la justicia ambiental en cada territorio.
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
            </div>

            {/* ── Modal: Términos y Condiciones ── */}
            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col p-6 sm:p-8 bg-white border-none rounded-3xl shadow-2xl">
                    <DialogHeader className="shrink-0 mb-4">
                        <DialogTitle className="text-2xl font-bold text-neutral-dark">
                            Términos y Condiciones
                        </DialogTitle>
                        <DialogDescription className="text-[14px] font-semibold text-neutral-dark/70 pt-1">
                            Última actualización: 21 de abril de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">1. Definiciones</h4>
                            <p>
                                Para la interpretación y ejecución de los presentes términos y condiciones, se
                                establecen las siguientes definiciones:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Plataforma GIRS:</strong> Ecosistema digital especializado en gestión
                                    integral de residuos sólidos, accesible en la dirección web oficial de la
                                    organización, propiedad exclusiva de Universitas Services, C.A..
                                </li>
                                <li>
                                    <strong>Biblioteca legal GIRS:</strong> Repositorio estructurado de documentos
                                    públicos, tales como ordenanzas municipales, decretos de tarifas, planes de gestión
                                    y modelos jurídicos editables, previamente auditados y organizados por el equipo de
                                    Universitas.
                                </li>
                                <li>
                                    <strong>Consultor IA - GIRS:</strong> Asistente conversacional basado en
                                    inteligencia artificial con arquitectura RAG (retrieval-augmented generation) que
                                    interactúa exclusivamente con el corpus documental de la biblioteca para asistir al
                                    usuario.
                                </li>
                                <li>
                                    <strong>Servidor público:</strong> Usuario vinculado a entes del estado en áreas de
                                    aseo urbano, ambiente o afines, cuyo acceso es gratuito a cambio de la consignación
                                    de normativa oficial.
                                </li>
                                <li>
                                    <strong>Asesor privado:</strong> Usuario profesional o corporativo que accede
                                    mediante el pago de una suscripción onerosa.
                                </li>
                                <li>
                                    <strong>Normativa GIRS:</strong> Conjunto de instrumentos jurídicos públicos que el
                                    servidor público se compromete a suministrar como condición para su acceso gratuito.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                2. Condiciones de acceso y gestión de roles
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>2.1. Registro y veracidad:</strong> El usuario se obliga a suministrar
                                    información veraz, actual y completa durante el proceso de registro, seleccionando
                                    el rol que corresponda a su realidad profesional.
                                </li>
                                <li>
                                    <strong>2.2. Régimen del plan asesor:</strong> El plan asesor incluye un periodo de
                                    prueba gratuito de siete días continuos. Al finalizar este lapso, el acceso a las
                                    funcionalidades premium se supeditará al pago de la suscripción mensual vigente.
                                </li>
                                <li>
                                    <strong>2.3. Validación del rol de servidor público:</strong> La gratuidad de este
                                    plan es una condición sujeta a verificación manual por parte de Universitas. El
                                    usuario reconoce que Universitas realizará una revisión de su perfil profesional.
                                </li>
                                <li>
                                    <strong>2.4. Facultad de reclasificación y suspensión:</strong> Si se determina que
                                    un usuario se ha registrado como servidor público sin ostentar dicha cualidad, o si
                                    incumple con la entrega de la normativa solicitada, Universitas podrá, a su sola
                                    discreción, suspender el acceso o reclasificar la cuenta al plan asesor previa
                                    notificación.
                                </li>
                                <li>
                                    <strong>2.5. Activación manual:</strong> El usuario acepta que la habilitación o
                                    rehabilitación de funciones tras una suspensión es un proceso manual ejecutado por
                                    el equipo técnico de Universitas, lo cual puede generar tiempos de espera
                                    discrecionales.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                3. Propiedad intelectual y régimen de contenidos
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>3.1. Titularidad de Universitas:</strong> Son propiedad exclusiva de
                                    Universitas Services, C.A. los algoritmos de procesamiento, el código fuente del
                                    Consultor IA - GIRS, el diseño de la interfaz y los modelos jurídicos o de
                                    estructuras de costos desarrollados originalmente por su equipo técnico.
                                </li>
                                <li>
                                    <strong>3.2. Documentación de dominio público:</strong> Las leyes nacionales y
                                    ordenanzas municipales alojadas íntegramente pertenecen a sus entes emisores. El
                                    acceso a estos documentos no implica que Universitas reclame autoría sobre los
                                    mismos.
                                </li>
                                <li>
                                    <strong>3.3. Limitación de la licencia sobre modelos:</strong> Universitas otorga
                                    una licencia para utilizar y adaptar los modelos de documentos. Se prohíbe
                                    expresamente la reventa de estos modelos como un producto independiente de
                                    consultoría sin la debida contratación del servicio de acompañamiento e implantación
                                    de Universitas.
                                </li>
                                <li>
                                    <strong>3.4. Exclusión de garantía por uso autónomo:</strong> Universitas no se hace
                                    responsable por los vicios o errores técnicos en los que incurra un usuario que
                                    decida implementar los modelos de forma autónoma, sin contar con el servicio de
                                    asesoría personalizada de nuestro equipo experto.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                4. Naturaleza del Consultor IA - GIRS y deber de validación
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>4.1. Función de asistencia:</strong> El usuario reconoce que el Consultor IA
                                    - GIRS es una herramienta de localización y análisis documental que no constituye un
                                    dictamen jurídico vinculante ni un sistema de toma de decisiones automatizadas.
                                </li>
                                <li>
                                    <strong>4.2. Obligación de validación normativa:</strong> El usuario tiene la
                                    responsabilidad ineludible de validar cada respuesta proporcionada por la
                                    inteligencia artificial frente al texto íntegro de las leyes, ordenanzas y gacetas
                                    oficiales originales disponibles en la biblioteca antes de emprender cualquier
                                    acción administrativa o legal.
                                </li>
                                <li>
                                    <strong>4.3. Exoneración por errores técnicos:</strong> Universitas no será
                                    responsable por las interpretaciones erróneas o decisiones tomadas por el usuario
                                    basándose en la interacción con el Consultor IA - GIRS, debido a que la tecnología
                                    puede generar respuestas imprecisas (alucinaciones).
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                5. Suspensión, cierre de cuenta y retención técnica
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>5.1. Cierre de cuenta e inhabilitación:</strong> El usuario puede solicitar
                                    el cierre de su cuenta en cualquier momento. Una vez ejecutado, el usuario perderá
                                    de forma permanente el derecho de acceso y la plataforma podrá impedir el reingreso
                                    con las mismas credenciales.
                                </li>
                                <li>
                                    <strong>5.2. Procedimiento de suspensión manual:</strong> Universitas podrá
                                    desactivar funcionalidades de forma manual si el usuario incumple con sus
                                    compromisos de entrega de información o viola normas de propiedad intelectual.
                                </li>
                                <li>
                                    <strong>5.3. Retención para integridad y entrenamiento:</strong> Tras el cierre o
                                    suspensión, los registros de actividad y conversaciones permanecerán en la base de
                                    datos vinculados a un identificador técnico para garantizar la integridad del
                                    sistema y permitir el reentrenamiento supervisado de la inteligencia artificial.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                6. Limitación de responsabilidad, conciliación y jurisdicción
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>6.1. Fallas técnicas y fuerza mayor:</strong> Universitas se compromete a la
                                    estabilidad de sus servidores internos, pero no será responsable por fallas
                                    derivadas del suministro eléctrico nacional, deficiencias en la conectividad del
                                    usuario o caídas de servicios de terceros como Google Cloud.
                                </li>
                                <li>
                                    <strong>6.2. Fase de conciliación amistosa virtual:</strong> Antes de iniciar
                                    cualquier acción judicial, las partes se obligan a agotar una fase de conciliación
                                    amistosa virtual por un lapso de treinta días continuos.
                                </li>
                                <li>
                                    <strong>6.3. Jurisdicción y ley aplicable:</strong> Estos términos se rigen por las
                                    leyes de la República Bolivariana de Venezuela. Cualquier controversia no resuelta
                                    en conciliación se someterá a los tribunales del estado Lara, con sede en
                                    Barquisimeto.
                                </li>
                            </ul>
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
                            Última actualización: 21 de abril de 2026
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar text-[15px] leading-relaxed text-neutral-dark/80 space-y-5">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-2">
                                1. Responsable del tratamiento de datos
                            </h4>
                            <p>
                                Los datos personales recabados a través de la Plataforma GIRS son tratados
                                exclusivamente por Universitas Services, C.A., con domicilio social en Barquisimeto,
                                Venezuela. El usuario puede dirigir cualquier solicitud sobre sus datos al correo
                                electrónico: contacto@universitas.legal.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                2. Finalidad del tratamiento y marketing
                            </h4>
                            <p>
                                Al registrarse en la plataforma, el usuario consiente que sus datos de contacto (nombre
                                y correo electrónico) sean utilizados para las siguientes finalidades:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Gestión del servicio:</strong> Validación de perfiles, control de acceso y
                                    notificaciones operativas.
                                </li>
                                <li>
                                    <strong>Comunicaciones técnicas:</strong> Alertas sobre nueva normativa cargada en
                                    la biblioteca legal y actualizaciones del Consultor IA - GIRS.
                                </li>
                                <li>
                                    <strong>Marketing segmentado:</strong> Envío de información promocional sobre
                                    formación, eventos y planes de suscripción de Universitas. Esta comunicación se
                                    segmentará según el rol del usuario (asesor privado o servidor público) para
                                    garantizar su relevancia. El usuario podrá retirar su consentimiento para
                                    comunicaciones comerciales en cualquier momento mediante el enlace de desuscripción
                                    presente en cada correo.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                3. Infraestructura técnica y transferencia de datos
                            </h4>
                            <p>
                                Para la ejecución de las funciones avanzadas de búsqueda y análisis, la plataforma
                                utiliza servicios de terceros bajo estrictos protocolos de seguridad:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Proveedores de nube:</strong> Se utiliza la infraestructura de Google Cloud
                                    Platform (GCP) y el motor de procesamiento de lenguaje natural Dialogflow CX.
                                </li>
                                <li>
                                    <strong>Privacidad en la nube:</strong> Universitas garantiza que los datos se
                                    procesan en una instancia privada. La información de las consultas técnicas del
                                    usuario no es utilizada por el proveedor externo para el entrenamiento de modelos de
                                    inteligencia artificial públicos o de terceros.
                                </li>
                                <li>
                                    <strong>Flujo de datos:</strong> La comunicación con las api de procesamiento se
                                    limita al cuerpo de la consulta técnica, evitando la transmisión de metadatos de
                                    identidad personal siempre que sea técnicamente posible.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                4. Auditoría y entrenamiento del Consultor IA - GIRS
                            </h4>
                            <p>
                                El usuario reconoce y acepta que el historial de sus conversaciones con el agente
                                conversacional es auditado y analizado por el equipo técnico de Universitas. Esta
                                auditoría tiene como única finalidad el entrenamiento y reentrenamiento del modelo para
                                mejorar la precisión de las respuestas técnicas. El procesamiento para entrenamiento no
                                ocurre en tiempo real y es supervisado por humanos.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">
                                5. Política de retención y cancelación lógica (soft delete)
                            </h4>
                            <p>
                                La Plataforma GIRS implementa un sistema de cancelación lógica para garantizar la
                                integridad de sus registros:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    <strong>Baja del usuario:</strong> Cuando un usuario solicita el cierre de su
                                    cuenta, el sistema inhabilita el acceso pero conserva los registros históricos.
                                </li>
                                <li>
                                    <strong>Seudonimización:</strong> Los datos personales permanecen vinculados a un
                                    identificador técnico (id) dentro de la base de datos para evitar errores de
                                    referencia y permitir la continuidad del entrenamiento de la ia.
                                </li>
                                <li>
                                    <strong>Compromiso de confidencialidad:</strong> Universitas se compromete a no
                                    utilizar los datos de cuentas cerradas para fines comerciales ni de identificación
                                    activa de personas.
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">6. Derechos de los usuarios</h4>
                            <p>
                                Los usuarios podrán ejercer sus derechos de acceso y rectificación de datos enviando una
                                comunicación formal al responsable del tratamiento. Debido a la naturaleza técnica de la
                                plataforma y los compromisos de entrenamiento de la ia, el derecho de supresión se
                                ejecutará mediante el procedimiento de seudonimización y bloqueo de acceso descrito en
                                la sección anterior.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-dark mt-4">7. Actualizaciones de la política</h4>
                            <p>
                                Universitas se reserva el derecho de modificar esta política para adaptarla a novedades
                                legislativas o técnicas. El uso continuado de la plataforma tras la publicación de
                                cambios implica la aceptación de la nueva política de privacidad.
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
