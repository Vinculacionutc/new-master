"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LucideIcon,

  Check, 
  X
} from 'lucide-react';

interface LegalDetails {
  id: number;
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  color: string;
  details: Record<string, string | string[]>;
  keyPoints: string[];
}

const LegalFoundationSection: React.FC = () => {
  const [selectedDetail, setSelectedDetail] = useState<LegalDetails | null>(null);

  

  return (
    <section className="bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        

        

        {/* Modal de Detalles */}
        <AnimatePresence>
          {selectedDetail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            >
              <motion.div 
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full mx-4 overflow-hidden shadow-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {/* Enc abezado del modal */}
                <div className="flex justify-between items-center p-6 border-b border-slate-300 dark:border-slate-700">
                  <div className="flex items-center">
                    <selectedDetail.icon className="w-12 h-12 text-yellow-400 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedDetail.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">{selectedDetail.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDetail(null)}
                    className="text-yellow-400 hover:text-yellow-400 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Descripción</h4>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    {selectedDetail.description}
                  </p>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Detalles</h4>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4">
                    {Object.entries(selectedDetail.details).map(([key, value]) => (
                      <li className='list-none' key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                      </li>
                    ))}
                  </ul>
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4">Puntos Clave</h4>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
                    {selectedDetail.keyPoints.map((point, index) => (
                      <li className='list-none' key={index}>
                        <Check className="inline w-4 h-4 text-yellow-400 mr-2" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LegalFoundationSection;