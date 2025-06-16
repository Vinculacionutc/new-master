"use client";

import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale, Shield, BookOpen } from "lucide-react";
import Link from 'next/link';

const TermsOfUse = () => {
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
              <Scale className="text-blue-950 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            Términos de <span className="text-red-600">Uso</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Condiciones para el uso de nuestro sitio web y servicios
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
                  <BookOpen className="mr-2 text-red-600" size={24} />
                  Introducción
                </h2>
                <p className="mb-4">
                  Estos Términos de Uso (&ldquo;Términos&rdquo;) rigen su acceso y uso del sitio web de la Cámara de Comercio de La Maná (&ldquo;nosotros&rdquo;, &ldquo;nuestro&rdquo; o &ldquo;la Cámara&rdquo;), incluyendo cualquier contenido, funcionalidad y servicios ofrecidos en o a través de nuestro sitio web.
                </p>
                <p className="mb-4">
                  Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos. Si no está de acuerdo con alguna parte de estos Términos, no tendrá derecho a acceder al sitio web.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <FileText className="mr-2 text-red-600" size={24} />
                  Uso del Sitio Web
                </h2>
                <p className="mb-4">
                  Al utilizar nuestro sitio web, usted garantiza que:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Es mayor de 18 años o tiene el consentimiento de un padre o tutor legal.</li>
                  <li>Proporcionará información precisa, actualizada y completa cuando se le solicite.</li>
                  <li>Mantendrá y actualizará prontamente su información para mantenerla precisa, actualizada y completa.</li>
                  <li>No creará cuentas utilizando identidades falsas o información fraudulenta.</li>
                  <li>No utilizará el sitio web de manera ilegal o no autorizada.</li>
                </ul>
                <p className="mb-4">
                  Nos reservamos el derecho de:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Modificar o interrumpir, temporal o permanentemente, el sitio web o cualquier servicio con o sin previo aviso.</li>
                  <li>Restringir el acceso a algunas partes del sitio web, o al sitio web completo, a usuarios.</li>
                  <li>Rechazar, cancelar o suspender el acceso a nuestros servicios sin previo aviso por cualquier motivo.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <AlertTriangle className="mr-2 text-red-600" size={24} />
                  Contenido y Conducta del Usuario
                </h2>
                <p className="mb-4">
                  Nuestro sitio web puede permitir a los usuarios publicar, vincular, almacenar, compartir y poner a disposición cierta información, texto, gráficos, videos u otro material (&ldquo;Contenido&rdquo;). Usted es responsable del Contenido que publica en o a través del sitio web, incluyendo su legalidad, confiabilidad y apropiación.
                </p>
                <p className="mb-4">
                  Al publicar Contenido en o a través de nuestro sitio web, usted declara y garantiza que:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>El Contenido es suyo y/o tiene el derecho de usarlo y otorgarnos los derechos y licencias previstos en estos Términos.</li>
                  <li>El Contenido no infringe los derechos de privacidad, derechos de publicidad, derechos de autor, derechos contractuales o cualquier otro derecho de cualquier persona o entidad.</li>
                  <li>El Contenido no contiene material que sea difamatorio, obsceno, indecente, abusivo, ofensivo, acosador, violento, odioso, inflamatorio o ilegal.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4 flex items-center">
                  <Shield className="mr-2 text-red-600" size={24} />
                  Propiedad Intelectual
                </h2>
                <p className="mb-4">
                  El sitio web y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de la Cámara de Comercio de La Maná y sus licenciantes. El sitio web está protegido por derechos de autor, marcas registradas y otras leyes de Ecuador y otros países.
                </p>
                <p className="mb-4">
                  Nuestras marcas comerciales y elementos de imagen comercial no pueden ser utilizados en relación con ningún producto o servicio sin el consentimiento previo por escrito de la Cámara de Comercio de La Maná.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Enlaces a Otros Sitios Web</h2>
                <p className="mb-4">
                  Nuestro sitio web puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por la Cámara de Comercio de La Maná.
                </p>
                <p className="mb-4">
                  La Cámara de Comercio de La Maná no tiene control ni asume ninguna responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web de terceros. No garantizamos ni asumimos ninguna responsabilidad por ofertas de terceros.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Limitación de Responsabilidad</h2>
                <p className="mb-4">
                  En ningún caso la Cámara de Comercio de La Maná, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Su acceso o uso o incapacidad para acceder o usar el sitio web.</li>
                  <li>Cualquier conducta o contenido de terceros en el sitio web.</li>
                  <li>Cualquier contenido obtenido del sitio web.</li>
                  <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Indemnización</h2>
                <p className="mb-4">
                  Usted acepta defender, indemnizar y mantener indemne a la Cámara de Comercio de La Maná, sus afiliados, licenciantes y proveedores de servicios, y sus respectivos funcionarios, directores, empleados, contratistas, agentes, licenciantes, proveedores, sucesores y cesionarios de y contra cualquier reclamo, responsabilidad, daño, juicio, premio, pérdida, costo, gasto o tarifa (incluidos honorarios razonables de abogados) que surjan de o estén relacionados con su violación de estos Términos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Cambios a estos Términos</h2>
                <p className="mb-4">
                  Podemos revisar y actualizar estos Términos de vez en cuando a nuestra sola discreción. Todos los cambios son efectivos inmediatamente cuando los publicamos.
                </p>
                <p className="mb-4">
                  Su uso continuado del sitio web después de la publicación de los Términos revisados significa que acepta y está de acuerdo con los cambios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-blue-950 mb-4">Contáctenos</h2>
                <p className="mb-4">
                  Si tiene preguntas sobre estos Términos, comuníquese con nosotros en:
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

export default TermsOfUse;