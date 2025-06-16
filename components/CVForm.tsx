'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CVForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    puesto_deseado: '',
    experiencia: '',
    mensaje: '',
    cv_file: null as File | null
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    telefono: '',
    puesto_deseado: '',
    experiencia: '',
    mensaje: '',
    cv_file: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formTouched, setFormTouched] = useState(false);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const validateField = (field: string, value: string | File | null) => {
    let errorMessage = "";
    
    switch (field) {
      case "nombre":
        if (!value) {
          errorMessage = "El nombre es requerido";
        } else if (typeof value === 'string' && value.trim().length < 3) {
          errorMessage = "El nombre debe tener al menos 3 caracteres";
        }
        break;
      case "email":
        if (!value) {
          errorMessage = "El correo electrónico es requerido";
        } else if (typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errorMessage = "Ingrese un correo electrónico válido";
          }
        }
        break;
      case "telefono":
        if (!value) {
          errorMessage = "El teléfono es requerido";
        }
        break;
      case "puesto_deseado":
        if (!value) {
          errorMessage = "El puesto deseado es requerido";
        }
        break;
      case "experiencia":
        if (!value) {
          errorMessage = "La experiencia es requerida";
        } else if (typeof value === 'string' && value.trim().length < 50) {
          errorMessage = "Por favor, proporcione más detalles sobre su experiencia";
        }
        break;
      case "mensaje":
        if (!value) {
          errorMessage = "El mensaje es requerido";
        } else if (typeof value === 'string' && value.trim().length < 30) {
          errorMessage = "El mensaje debe tener al menos 30 caracteres";
        }
        break;
      case "cv_file":
        if (!value) {
          errorMessage = "El CV es requerido";
        } else if (value instanceof File) {
          const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          if (!allowedTypes.includes(value.type)) {
            errorMessage = "El archivo debe ser PDF o Word";
          } else if (value.size > 5 * 1024 * 1024) { // 5MB
            errorMessage = "El archivo no debe superar los 5MB";
          }
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));

    return !errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (!formTouched) {
      setFormTouched(true);
    }
    
    if (formTouched) {
      validateField(name, value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      cv_file: file
    }));
    
    if (!formTouched) {
      setFormTouched(true);
    }
    
    if (formTouched) {
      validateField('cv_file', file);
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    // Validar todos los campos
    Object.keys(formData).forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nombre_completo', formData.nombre);
      formDataToSend.append('correo_electronico', formData.email);
      formDataToSend.append('telefono', formData.telefono);
      formDataToSend.append('puesto_deseado', formData.puesto_deseado);
      formDataToSend.append('experiencia_relevante', formData.experiencia);
      formDataToSend.append('mensaje_presentacion', formData.mensaje);
      if (formData.cv_file) {
        formDataToSend.append('cv', formData.cv_file);
      }

      const response = await fetch('https://api.camaradecomerciolamana.com/api/aplicaciones-trabajo/', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al enviar el formulario');
      }

      setSubmitStatus({
        type: "success",
        message: "¡CV enviado con éxito! Revisaremos tu información y nos pondremos en contacto contigo pronto."
      });
      
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        puesto_deseado: '',
        experiencia: '',
        mensaje: '',
        cv_file: null
      });
      
      setFormTouched(false);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al enviar el formulario. Por favor, intente nuevamente."
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#1e2756] rounded-3xl p-8">
      <AnimatePresence>
        {submitStatus.message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              p-4 rounded-lg flex items-center justify-between
              ${submitStatus.type === "success" 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-red-600/20 text-red-400 border border-red-600/30"
              }
            `}
          >
            <div className="flex items-center">
              {submitStatus.type === "success" ? (
                <CheckCircle className="mr-2 flex-shrink-0" size={20} />
              ) : (
                <AlertCircle className="mr-2 flex-shrink-0" size={20} />
              )}
              <span>{submitStatus.message}</span>
            </div>
            <button 
              type="button"
              onClick={() => setSubmitStatus({ type: "", message: "" })}
              className="hover:text-white transition-colors"
              aria-label="Cerrar notificación"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="nombre" className="text-white flex items-center text-sm">
              Nombre Completo <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.nombre ? 'border-red-500' : ''}
                `}
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.nombre}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="email" className="text-white flex items-center text-sm">
              Correo Electrónico <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.email ? 'border-red-500' : ''}
                `}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="telefono" className="text-white flex items-center text-sm">
              Teléfono <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Tu número de teléfono"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.telefono ? 'border-red-500' : ''}
                `}
              />
              {errors.telefono && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.telefono}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="puesto_deseado" className="text-white flex items-center text-sm">
              Puesto Deseado <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="puesto_deseado"
                name="puesto_deseado"
                value={formData.puesto_deseado}
                onChange={handleChange}
                placeholder="¿Qué puesto te interesa?"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.puesto_deseado ? 'border-red-500' : ''}
                `}
              />
              {errors.puesto_deseado && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.puesto_deseado}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="experiencia" className="text-white flex items-center text-sm">
            Experiencia Relevante <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              placeholder="Describe tu experiencia relevante para el puesto"
              rows={4}
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.experiencia ? 'border-red-500' : ''}
              `}
            />
            {errors.experiencia && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.experiencia}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="mensaje" className="text-white flex items-center text-sm">
            Mensaje de Presentación <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Cuéntanos por qué te gustaría trabajar con nosotros"
              rows={4}
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.mensaje ? 'border-red-500' : ''}
              `}
            />
            {errors.mensaje && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.mensaje}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="cv_file" className="text-white flex items-center text-sm">
            Adjuntar CV <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <div className={`
              relative border-2 border-dashed rounded-lg p-4
              ${errors.cv_file ? 'border-red-500' : 'border-[#3a447e]'}
              hover:border-red-500 transition-colors
              bg-[#2a357e]
            `}>
              <input
                type="file"
                id="cv_file"
                name="cv_file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <p className="text-sm text-white">
                    {formData.cv_file ? formData.cv_file.name : 'Arrastra tu CV aquí o haz clic para seleccionar'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF o Word (máx. 5MB)
                  </p>
                </div>
              </div>
            </div>
            {errors.cv_file && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.cv_file}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <Button 
            type="submit" 
            className="
              w-full 
              bg-red-600
              text-white 
              hover:bg-red-700
              transition-all 
              duration-300
              flex items-center justify-center
              group
              py-6
              shadow-lg shadow-red-600/20
              hover:shadow-xl hover:shadow-red-600/30
              hover:-translate-y-0.5
              rounded-xl
            "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Enviando</span>
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              </>
            ) : (
              <>
                Enviar CV
                <ArrowRight 
                  className="ml-2 group-hover:translate-x-1 transition-transform" 
                  size={20} 
                />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default CVForm; 