'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  Layers,
  Target,
  Rocket,
  Zap,
  Users,
  Award,
  Flag,
  User,
  ScrollText
} from 'lucide-react';

// Interfaces
interface HitoHistorico {
  año: number;
  titulo: string;
  descripcion: string;
  icono: React.ComponentType<{ className?: string }>;
  color: string;
}

interface EtapaDesarrollo {
  periodo: string;
  titulo: string;
  descripcion: string;
  icono: React.ComponentType<{ className?: string }>;
  color: string;
  logros: string[];
}

interface FundadorInfo {
  nombre: string;
  cargo: string;
}

const HistoriaCamaraComercioLaMana: React.FC = () => {
  const [selectedHito, setSelectedHito] = useState<HitoHistorico | null>(null);

  // Hitos Históricos
  const hitosHistoricos: HitoHistorico[] = [
    {
      año: 1994,
      titulo: "Fundación",
      descripcion: "El 30 de septiembre de 1994, en el local comercial 'SORAYA', nació la Cámara de Comercio de La Maná con 31 ciudadanos fundadores.",
      icono: Rocket,
      color: "bg-red-600"
    },
    {
      año: 2002,
      titulo: "Primera Transformación",
      descripcion: "Modernización de servicios y organizacional",
      icono: Layers,
      color: "bg-red-600"
    },
    {
      año: 2010,
      titulo: "Expansión Regional",
      descripcion: "Consolidación como referente empresarial en Cotopaxi",
      icono: Target,
      color: "bg-red-600"
    },
    {
      año: 2018,
      titulo: "Transformación Digital",
      descripcion: "Implementación de tecnologías y servicios en línea",
      icono: Zap,
      color: "bg-red-600"
    }
  ];

  // Fundadores principales
  const fundadoresPrincipales: FundadorInfo[] = [
    { nombre: "Sr. Gonzalo Llumiluiza", cargo: "Presidente" },
    { nombre: "Sr. Luis Chango", cargo: "Vicepresidente" },
    { nombre: "Sr. Jaime Zapata", cargo: "Secretario" },
    { nombre: "Dr. Alejandro Iza", cargo: "Tesorero" }
  ];

  // Etapas de Desarrollo
  const etapasDesarrollo: EtapaDesarrollo[] = [
    {
      periodo: "1 de septiembre de 1994",
      titulo: "Resoluciones Fundacionales",
      descripcion: "En el local comercial 'SORAYA', ubicado en las calles América y Quito, en la ciudad de La Maná, se tomaron las siguientes resoluciones históricas:",
      icono: ScrollText,
      color: "bg-blue-600",
      logros: [
        "1. La Asamblea por unanimidad acuerda formar la Cámara de Comercio",
        "2. Formar un directorio provisional entre los presentes",
        "3. Iniciar los trámites con la ayuda del señor Julián Maldonado y el señor Mario Defáz"
      ]
    },
    {
      periodo: "26 de Octubre 1994",
      titulo: "Fundación y Primera Directiva",
      descripcion: "Se designa por unanimidad el primer Directorio Provisional de la Cámara de Comercio La Maná, estableciendo una cuota inicial de veinte mil sucres para los trámites de personería jurídica.",
      icono: Flag,
      color: "bg-blue-600",
      logros: [
        "PRESIDENTE: Sr. Gonzalo Llumiluiza",
        "VICEPRESIDENTE: Sr. Luis Chango",
        "SECRETARIO: Sr. Jaime Zapata",
        "TESORERO: Dr. Alejandro Iza S.",
        "VOCALES PRINCIPALES: Sra. Piedad Cabrera, Sr. Gerardo Tutillo, Sr. Luis Jecho",
        "VOCALES SUPLENTES: Sr. Arturo Ortega, Sr. Guillermo Crespo, Sra. Margoth Morocho"
      ]
    },
    {
      periodo: "1994 - 1996, 1996-1998, 2002-2004",
      titulo: "Presidencia del Sr. Gonzalo Llumiluiza",
      descripcion: "Primer presidente y fundador de la Cámara de Comercio La Maná. Durante sus períodos se realizaron importantes adquisiciones y obras fundamentales.",
      icono: User,
      color: "bg-red-600",
      logros: [
        "Adquisición de 10 hectáreas de terrenos para lotización mediante crédito del Banco del Pichicha",
        "Construcción de la sede institucional",
        "Construcción del cerramiento del terreno"
      ]
    },
    {
      periodo: "1998 - 2000",
      titulo: "Presidencia del Sr. Raúl Araque",
      descripcion: "Continuó con el desarrollo y fortalecimiento de la institución.",
      icono: User,
      color: "bg-green-600",
      logros: []
    },
    {
      periodo: "2000 - 2002",
      titulo: "Presidencia del Sr. Guillermo Crespo Barrera",
      descripcion: "Aportó al crecimiento institucional durante su período.",
      icono: User,
      color: "bg-purple-600",
      logros: []
    },
    {
      periodo: "2004 - 2006, 2006-2008",
      titulo: "Presidencia del C.P.A. Leónidas Apolo",
      descripcion: "Dos períodos de gestión fortaleciendo el desarrollo de la Cámara.",
      icono: User,
      color: "bg-yellow-600",
      logros: []
    },
    {
      periodo: "2008 - 2010, 2010",
      titulo: "Presidencia del Sr. Carlos Freire",
      descripcion: "Continuó la labor de crecimiento y mejora de servicios para los socios.",
      icono: User,
      color: "bg-indigo-600",
      logros: []
    }
  ];

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-blue-950">
          Historia de la <span className="text-red-600">Cámara de Comercio</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Un viaje de innovación, crecimiento y liderazgo empresarial en La Maná desde 1994
          </p>
        </motion.div>

        {/* Resumen de Fundación */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-blue-950 p-8 rounded-2xl shadow-2xl mb-16 text-white"
        >
          <h2 className="text-3xl font-bold mb-4 text-red-600">Acta de Fundación</h2>
          <p className="mb-4">
            Siendo las veinte y un horas del primero de septiembre de mil novecientos noventa y cuatro en el local comercial 
            &ldquo;SORAYA&rdquo;, ubicado en las calles Amazonas y 27 de Noviembre, en esta ciudad de La Maná, se reúnen los señores 
            comerciantes del Cantón con el propósito de formar la Cámara de Comercio con la asistencia de 21 ciudadanos.
          </p>
          <p className="mb-4">
            Tomó la palabra el Sr. Gonzalo Llumiluiza, destacado y claro visionario económico, exponiendo la importancia de 
            impulsar esta práctica como Cámara de Comercio desde nuestros días los primeros pasos.
          </p>
          <p>
            Seguidamente solicitó la participación de los Sres. Julián Maldonado y Mario Defáz como vocales principales y la 
            persona de la autoridad en colaboración para el avance institucional, al ser nombrados en la reunión 
            designándose como director de Asambleas y secretario Ad-Doc a los señores Arturo Ortega y Jaime Zapata 
            respectivamente, firmas facultadas de sus cargos.
          </p>
        </motion.div>

        {/* Directiva Fundadora */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-950">Directiva Fundadora</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {fundadoresPrincipales.map((fundador, index) => (
              <div 
                key={index}
                className="bg-blue-950 p-4 sm:p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-red-600 p-2 sm:p-3 rounded-full mx-auto mb-3 sm:mb-4 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{fundador.nombre}</h3>
                <p className="text-sm sm:text-base text-gray-400">{fundador.cargo}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Línea de Tiempo */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 h-full"></div>
          
          {hitosHistoricos.map((hito, index) => {
            const Icon = hito.icono;
            return (
              <motion.div
                key={hito.año}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`
                  flex flex-col md:flex-row items-center mb-16 
                  ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
              >
                <div 
                  className={`
                    w-full md:w-1/2 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl 
                    ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}
                    bg-blue-950 mb-4 md:mb-0
                    border border-opacity-20 hover:border-opacity-100
                    transform transition-all duration-300 hover:scale-105
                    cursor-pointer
                  `}
                  onClick={() => setSelectedHito(hito)}
                >
                  <div className="flex items-center mb-4">
                    <div className={`${hito.color} p-3 rounded-full mr-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {hito.año} - {hito.titulo}
                    </h3>
                  </div>
                  <p className="text-gray-400">{hito.descripcion}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Etapas de Desarrollo */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {etapasDesarrollo.map((etapa, index) => {
            const Icon = etapa.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`
                  p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl 
                  bg-blue-950
                  transform transition-all duration-300 hover:scale-105
                `}
              >
                <div className="flex items-center mb-6">
                  <div className={`${etapa.color} p-3 rounded-full mr-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {etapa.titulo}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">{etapa.descripcion}</p>
                <h4 className="text-xl font-semibold text-red-600 mb-2">
                  Periodo: {etapa.periodo}
                </h4>
                <h5 className="text-red-600 font-semibold">Logros:</h5>
                <ul className="list-disc list-inside text-gray-300">
                  {etapa.logros.map((logro, index) => (
                    <li className='list-none' key={index}>{logro}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Resoluciones Fundacionales */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 bg-blue-950 p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-red-600">Resoluciones Fundacionales</h2>
          <ol className="space-y-4 text-white">
            <li className="flex items-start">
              <div className="bg-red-600 rounded-full p-2 mr-4 mt-1">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p>La Asamblea por unanimidad acordó formar la Cámara de Comercio.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-red-600 rounded-full p-2 mr-4 mt-1">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p>Formar un directorio provisional entre los presentes.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-red-600 rounded-full p-2 mr-4 mt-1">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p>Iniciar los trámites con la ayuda del señor Pablo Maldonado y el señor Mario Ortega.</p>
            </li>
          </ol>
        </motion.div>

        {/* Modal de Detalles de Hito Histórico */}
        <AnimatePresence>
          {selectedHito && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-red-600"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedHito.titulo}
                  </h3>
                  <button 
                    onClick={() => setSelectedHito(null)} 
                    className="text-red-600 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-400 mb-4">
                  Año: {selectedHito.año}
                </p>
                <p className="text-gray-300 mb-4">
                  {selectedHito.descripcion}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HistoriaCamaraComercioLaMana;