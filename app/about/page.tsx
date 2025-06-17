"use client";

import { motion, useScroll } from 'framer-motion';
import { 
  Building2,  
  Award, 
  Target, 
  HandshakeIcon,
  Globe,
  Rocket,
  Shield,
  Zap,
  FileText,
  CheckCircle,
  Users,
  ArrowRight
} from "lucide-react";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const About = () => {
  const ref = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Datos institucionales
  const stats = [
    {
      title: "Empresas Asociadas",
      value: "20+",
      icon: Building2,
      description: "Empresas comprometidas con el desarrollo económico"
    },
    {
      title: "Años de Trayectoria",
      value: "30+",
      icon: Globe,
      description: "Impulsando el comercio y la innovación local"
    },
    {
      title: "Miembros Activos",
      value: "100+",
      icon: Users,
      description: "Profesionales comprometidos con el crecimiento regional"
    },
  ];

  // Pilares estratégicos
  const keyInitiatives = [
    {
      title: "Desarrollo Empresarial",
      description: "Capacitación, asesoramiento y recursos para el crecimiento de negocios locales.",
      icon: Rocket
    },
    {
      title: "Networking Estratégico",
      description: "Conexiones empresariales que fortalecen el tejido comercial de La Maná.",
      icon: Zap
    },
    {
      title: "Representación Comercial",
      description: "Defensa de los intereses del sector ante instituciones públicas y privadas.",
      icon: Shield
    }
  ];

  // Valores institucionales
  const values = [
    {
      title: "Integridad",
      description: "Actuamos con honestidad, transparencia y ética en todas nuestras actividades.",
      icon: Shield,
      benefits: [
        "Transparencia en la gestión",
        "Rendición de cuentas",
        "Conducta ética"
      ]
    },
    {
      title: "Compromiso",
      description: "Dedicación plena al desarrollo económico de La Maná y sus empresarios.",
      icon: Target,
      benefits: [
        "Dedicación al servicio",
        "Responsabilidad social",
        "Mejora continua"
      ]
    },
    {
      title: "Colaboración",
      description: "Fomentamos alianzas estratégicas entre empresarios, instituciones y comunidad.",
      icon: HandshakeIcon,
      benefits: [
        "Alianzas estratégicas",
        "Trabajo en equipo",
        "Beneficio mutuo"
      ]
    },
  ];

  // Derechos y obligaciones (versión condensada)
  const derechosSocios = [
    "Elegir y ser elegido para cualquier dignidad.",
    "Usar como referencia a la Cámara de Comercio en papeles comerciales.",
    "Obtener informes y asesoramiento de la Cámara.",
    "Solicitar mediación en reclamos comerciales.",
    "Participar en Asambleas Generales y comisiones.",
    "Utilizar las instalaciones para eventos comerciales (con autorización)."
  ];

  const obligacionesSocios = [
    "Pagar las cuotas ordinarias y extraordinarias.",
    "Desempeñar cargos y comisiones con responsabilidad y honestidad.",
    "Suministrar información solicitada por la Cámara.",
    "Asistir a las Asambleas y participar con su voto.",
    "Cumplir con las leyes, estatutos y reglamentos internos."
  ];

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white pt-24 relative overflow-hidden"
    >
      {/* Fondo sutil con patrón */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 z-0" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Encabezado con imagen */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dqnjw25rj/image/upload/v1738702145/empresas/zoeb19ews9gqsyv3znvc.png"
                alt="Logo Cámara de Comercio"
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-blue-950 mb-4">
            Sobre <span className="text-red-600">Nosotros</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Impulsando el desarrollo económico y empresarial de La Maná desde 1994
          </p>
        </motion.div>

        {/* Sección de Historia y Misión/Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Historia */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-blue-950 rounded-3xl p-8 h-full shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="mr-3 text-red-600" size={24} />
              Nuestra Historia
            </h2>
            <p className="text-white mb-4 leading-relaxed">
              Fundada el 26 de octubre de 1994, la Cámara de Comercio de La Maná surgió como respuesta a la necesidad de organizar y fortalecer el sector comercial en una época de crecimiento económico para la región.
            </p>
            <p className="text-white leading-relaxed">
              Durante más de 30 años, hemos sido un pilar fundamental en el desarrollo económico local, adaptándonos a los cambios y desafíos del mercado.
            </p>
          </motion.div>

          {/* Misión y Visión */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
          >
            <div className="bg-blue-950 rounded-3xl p-8 h-full flex flex-col shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Target className="mr-3 text-red-600" size={24} />
                Misión
              </h2>
              <p className="text-white leading-relaxed flex-grow">
                Representar, promover y defender los intereses del sector comercial de La Maná, facilitando servicios que impulsen la competitividad empresarial y contribuyan al desarrollo socioeconómico sostenible.
              </p>
            </div>
            <div className="bg-blue-950 rounded-3xl p-8 h-full flex flex-col shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Rocket className="mr-3 text-red-600" size={24} />
                Visión
              </h2>
              <p className="text-white leading-relaxed flex-grow">
                Ser la institución líder en el fortalecimiento del comercio local, reconocida por su excelencia en la representación gremial y por su contribución efectiva al crecimiento económico y social de La Maná.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Sección de Estadísticas */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
            Nuestro Impacto
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl text-center border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-blue-950" />
                </div>
                <div className="text-4xl font-bold mb-2 text-red-600">{stat.value}</div>
                <div className="text-xl font-semibold mb-2 text-blue-950">{stat.title}</div>
                <div className="text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sección de Valores */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
            Valores Institucionales
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-blue-950 p-8 rounded-3xl text-white border-0 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-blue-100 mb-6">{value.description}</p>
                <ul className="text-blue-100 space-y-2">
                  {value.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sección de Iniciativas Clave */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
            Pilares Estratégicos
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-8 rounded-3xl text-center border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-950 flex items-center justify-center">
                  <initiative.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-950">{initiative.title}</h3>
                <p className="text-gray-600">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sección de Derechos y Obligaciones */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
            Derechos y Obligaciones
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-950 p-8 rounded-3xl text-white border-0 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-red-600 mr-4" />
                <h3 className="text-2xl font-semibold">Derechos de los Socios</h3>
              </div>
              <ul className="text-blue-100 space-y-3">
                {derechosSocios.map((derecho, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="min-w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span>{derecho}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-950 p-8 rounded-3xl text-white border-0 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-red-600 mr-4" />
                <h3 className="text-2xl font-semibold">Obligaciones de los Socios</h3>
              </div>
              <ul className="text-blue-100 space-y-3">
                {obligacionesSocios.map((obligacion, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="min-w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span>{obligacion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Nueva sección: Llamado a la acción */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 rounded-3xl p-10 shadow-xl relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">¿Quieres formar parte de nuestra comunidad empresarial?</h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Únete a la Cámara de Comercio de La Maná y accede a beneficios exclusivos, networking estratégico y representación efectiva para tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <span>Solicitar Afiliación</span>
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/companies" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <span>Ver Empresas Afiliadas</span>
                  <Building2 size={18} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Nueva sección: Preguntas frecuentes */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-950 mb-3">¿Cómo puedo afiliarme a la Cámara?</h3>
              <p className="text-gray-600">
                Para afiliarte, debes completar el formulario de solicitud disponible en nuestra sección de contacto, adjuntar los documentos requeridos y realizar el pago de la cuota de afiliación.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-950 mb-3">¿Cuáles son los beneficios de ser socio?</h3>
              <p className="text-gray-600">
                Los socios tienen acceso a networking empresarial, capacitaciones exclusivas, representación gremial, asesoría legal y comercial, y promoción de sus negocios a través de nuestros canales.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-950 mb-3">¿Con qué frecuencia se realizan las reuniones?</h3>
              <p className="text-gray-600">
                Las Asambleas Generales ordinarias se realizan anualmente, mientras que las reuniones de directorio son mensuales. También organizamos eventos de networking y capacitación periódicamente.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold text-blue-950 mb-3">¿Qué documentos necesito para afiliarme?</h3>
              <p className="text-gray-600">
                Necesitarás copia del RUC, cédula de identidad, patente municipal, y completar el formulario de afiliación. Para más detalles, contacta directamente a nuestra oficina.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Decoración de fondo */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-100 to-transparent z-0"></div>
    </motion.div>
  );
};

export default About;