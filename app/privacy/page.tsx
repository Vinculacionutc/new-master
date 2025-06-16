"use client";

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-24 pb-16"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <Shield className="text-blue-950 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            Política de <span className="text-red-600">Privacidad</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cómo recopilamos, utilizamos y protegemos su información
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Última actualización: {new Date().toLocaleDateString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'})}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <Lock className="mr-2 text-red-600" size={24} />
                  Introducción
                </h2>
                <p className="mb-4">
                  La Cámara de Comercio de La Maná (&ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo; o &ldquo;la Cámara&rdquo;) se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web o utiliza nuestros servicios.
                </p>
                <p>
                  Al utilizar nuestro sitio web, usted acepta las prácticas descritas en esta política. Le recomendamos que lea esta política detenidamente para comprender nuestras prácticas con respecto a su información.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <Eye className="mr-2 text-red-600" size={24} />
                  Información que Recopilamos
                </h2>
                <p className="mb-4">
                  Podemos recopilar varios tipos de información, incluyendo:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Información personal identificable</strong>: Nombre, dirección de correo electrónico, número de teléfono, dirección postal, y otra información similar que usted proporciona voluntariamente.</li>
                  <li><strong>Información no personal</strong>: Datos anónimos como dirección IP, tipo de navegador, proveedor de servicios de Internet, páginas de referencia/salida, sistema operativo, fecha/hora y datos de navegación.</li>
                  <li><strong>Información de afiliación</strong>: Datos relacionados con su empresa o negocio si solicita afiliarse a la Cámara.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <FileText className="mr-2 text-red-600" size={24} />
                  Cómo Utilizamos su Información
                </h2>
                <p className="mb-4">
                  Utilizamos la información que recopilamos para:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Proporcionar, operar y mantener nuestro sitio web y servicios</li>
                  <li>Mejorar, personalizar y expandir nuestro sitio web y servicios</li>
                  <li>Comprender y analizar cómo utiliza nuestro sitio web</li>
                  <li>Desarrollar nuevos productos, servicios y funcionalidades</li>
                  <li>Comunicarnos con usted, incluyendo responder a consultas y proporcionar información sobre la Cámara</li>
                  <li>Procesar solicitudes de afiliación y gestionar la relación con los miembros</li>
                  <li>Enviar boletines informativos, materiales promocionales y otra información relevante</li>
                  <li>Prevenir actividades fraudulentas y mejorar la seguridad</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <CheckCircle className="mr-2 text-red-600" size={24} />
                  Divulgación de su Información
                </h2>
                <p className="mb-4">
                  No vendemos, intercambiamos ni transferimos su información personal identificable a terceros sin su consentimiento, excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Proveedores de servicios</strong>: Podemos compartir su información con terceros de confianza que nos ayudan a operar nuestro sitio web, realizar negocios o brindarle servicios, siempre que estas partes acuerden mantener esta información confidencial.</li>
                  <li><strong>Cumplimiento legal</strong>: Podemos divulgar su información cuando creemos que la divulgación es apropiada para cumplir con la ley, hacer cumplir nuestras políticas del sitio o proteger nuestros derechos, propiedad o seguridad.</li>
                  <li><strong>Directorio de miembros</strong>: Si es miembro de la Cámara, cierta información comercial puede incluirse en nuestro directorio de miembros, que está disponible para otros miembros y el público.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Seguridad de los Datos</h2>
                <p className="mb-4">
                  Implementamos medidas de seguridad razonables para mantener la seguridad de su información personal. Sin embargo, recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Sus Derechos</h2>
                <p className="mb-4">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Acceder a la información personal que tenemos sobre usted</li>
                  <li>Corregir cualquier información inexacta</li>
                  <li>Solicitar la eliminación de su información personal</li>
                  <li>Oponerse al procesamiento de su información personal</li>
                  <li>Solicitar la restricción del procesamiento de su información personal</li>
                  <li>Solicitar la transferencia de su información personal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Cambios a esta Política</h2>
                <p className="mb-4">
                  Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de &ldquo;última actualización&rdquo;.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Contáctenos</h2>
                <p className="mb-4">
                  Si tiene preguntas o inquietudes sobre esta Política de Privacidad, comuníquese con nosotros en:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-1"><strong>Cámara de Comercio de La Maná</strong></p>
                  <p className="mb-1">Av. 19 de Mayo, La Maná, Ecuador</p>
                  <p className="mb-1">Email: info@camaradecomerciolamana.com</p>
                  <p>Teléfono: +593 123 456 789</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-950 hover:text-red-600 transition-colors"
          >
            <span className="mr-2">Volver al inicio</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;