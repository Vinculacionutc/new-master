'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Mountain,
  Thermometer,
  Compass,
  TreePine, TrendingUp
} from 'lucide-react';

interface CityDetail {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HistoricalFact {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CityHistory: React.FC = () => {
  const cityDetails: CityDetail[] = [
    { label: "Área", value: "663 km²", icon: MapPin },
    { label: "Ubicación", value: "Occidente de Cotopaxi", icon: Compass },
    { label: "Altura", value: "200 a 1150 m.s.n.m.", icon: Mountain },
    { label: "Cantonización", value: "19 de mayo de 1986", icon: Calendar },
    { label: "Población", value: "42,216 habitantes (2010)", icon: Users },
    { label: "Temperatura", value: "23°C a 35°C", icon: Thermometer }
  ];

  const historicalFacts: HistoricalFact[] = [
    {
      title: "Primeros Asentamientos (1870)",
      description: "Los primeros colonos llegaron a La Maná en 1870, atraídos por la fertilidad de sus tierras. Provenían principalmente de Latacunga, Pujilí y Saquisilí. En 1899, Carlos Lozada Quintana estableció un importante aserradero que impulsó el comercio entre la sierra y la costa.",
      icon: Calendar
    },
    {
      title: "Desarrollo Agrícola (1900-1950)",
      description: "Durante la primera mitad del siglo XX, La Maná experimentó un significativo crecimiento gracias al cultivo de productos como cacao, café y plátano. La construcción de caminos vecinales facilitó el comercio y atrajo más colonos a la región.",
      icon: TrendingUp
    },
    {
      title: "Parroquialización (1952)",
      description: "El 18 de octubre de 1952, La Maná alcanzó el estatus de parroquia del cantón Pujilí, tras una intensa gestión del primer Comité de Patriotas Pro-Parroquialización formado en 1950. Este hito marcó el inicio de su autonomía administrativa.",
      icon: Users
    },
    {
      title: "Proceso de Cantonización (1978-1986)",
      description: "El proceso de cantonización inició en 1978 con la formación del Comité Pro-Cantonización. Tras años de gestión y con el apoyo de figuras como el Dr. Holger Velasteguí Domínguez, se logró la cantonización el 19 de mayo de 1986.",
      icon: Calendar
    },
    {
      title: "Recursos Naturales",
      description: "La Maná posee una extraordinaria biodiversidad gracias a su ubicación privilegiada. Sus bosques albergan especies únicas de flora y fauna, mientras que sus suelos fértiles permiten el cultivo de productos como banano, cacao, café, caña de azúcar y cítricos.",
      icon: TreePine
    },
    {
      title: "Desarrollo Económico",
      description: "El cantón se ha convertido en un importante centro agrícola y comercial de Cotopaxi. Su economía se basa en la agricultura, ganadería y comercio, destacando la producción de banano orgánico para exportación y el turismo ecológico.",
      icon: TrendingUp
    },
    {
      title: "Estructura Política",
      description: "Actualmente, La Maná cuenta con tres parroquias urbanas: La Maná, El Carmen y El Triunfo; y dos rurales: Guasaganda y Pucayacu. Esta organización territorial ha permitido una mejor administración y desarrollo de servicios públicos.",
      icon: Users
    },
    {
      title: "Patrimonio Cultural",
      description: "La riqueza cultural de La Maná se refleja en su diversidad étnica, donde conviven pobladores de la sierra y la costa, creando una identidad única. Sus festividades, gastronomía y tradiciones son una mezcla de estas influencias culturales.",
      icon: Users
    },
    {
      title: "Potencial Turístico",
      description: "El cantón ofrece diversos atractivos turísticos, desde cascadas y senderos ecológicos hasta fincas agroturísticas. Las Chorreras del Zapanal, las 7 cascadas y las plantaciones de banano orgánico son destinos destacados.",
      icon: Mountain
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-blue-950">
            La Maná: <span className="text-red-600">Una Tierra Llena de Historia</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Descubre la rica historia y características de este cantón ubicado en el corazón del Ecuador
          </p>
        </motion.div>

        {/* City Details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {cityDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-blue-950 p-4 rounded-xl text-center text-white"
              >
                <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{detail.label}</h3>
                <p className="text-gray-300">{detail.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Current Boundaries */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-950 p-6 rounded-xl text-white mb-16"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">Límites Actuales</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-start">
              <Compass className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">NORTE:</h3>
                <p className="text-gray-300">Con la parroquia Alluriquín, cantón Santo Domingo</p>
              </div>
            </div>
            <div className="flex items-start">
              <Compass className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">SUR:</h3>
                <p className="text-gray-300">El río Calope es el accidente geográfico que la separa de la parroquia Moraspungo, cantón Pangua</p>
              </div>
            </div>
            <div className="flex items-start">
              <Compass className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">ESTE:</h3>
                <p className="text-gray-300">La parroquia La Esperanza del cantón Pujilí y Zumbahua</p>
              </div>
            </div>
            <div className="flex items-start">
              <Compass className="w-5 h-5 text-red-600 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">OESTE:</h3>
                <p className="text-gray-300">El cantón Quinsaloma de la provincia de Los Ríos</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Historical Facts */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-blue-950 mb-10"
          >
            Historia y Características
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-blue-950 p-6 rounded-xl text-white flex items-start gap-4 h-full"
                >
                  <div className="bg-red-600 p-3 rounded-full flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{fact.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        

       
      </div>
    </section>
  );
};

export default CityHistory;