'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JoinForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    direccion: '',
    ciudad: '',
    descripcion_empresa: '',
    motivo: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    direccion: '',
    ciudad: '',
    descripcion_empresa: '',
    motivo: ''
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

  const validateField = (field: string, value: string) => {
    let errorMessage = "";
    
    switch (field) {
      case "nombre":
      case "apellido":
        if (!value.trim()) {
          errorMessage = `El ${field} es requerido`;
        } else if (value.trim().length < 3) {
          errorMessage = `El ${field} debe tener al menos 3 caracteres`;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim() || !emailRegex.test(value)) {
          errorMessage = "Ingrese un correo electrónico válido";
        }
        break;
      case "telefono":
        const phoneRegex = /^(02|09)\d{8}$/;
        if (!value.trim()) {
          errorMessage = "El teléfono es requerido";
        } else if (!phoneRegex.test(value)) {
          errorMessage = "El teléfono debe tener 10 dígitos y empezar con 02 o 09";
        }
        break;
      case "cedula":
        const cedulaRegex = /^\d{10}$/;
        if (!value.trim()) {
          errorMessage = "La cédula es requerida";
        } else if (!cedulaRegex.test(value)) {
          errorMessage = "La cédula debe tener exactamente 10 dígitos";
        }
        break;
      case "empresa":
        if (!value.trim()) {
          errorMessage = "El nombre de la empresa es requerido";
        }
        break;
      case "cargo":
        if (!value.trim()) {
          errorMessage = "El cargo es requerido";
        }
        break;
      case "direccion":
        if (!value.trim()) {
          errorMessage = "La dirección es requerida";
        }
        break;
      case "ciudad":
        if (!value.trim()) {
          errorMessage = "La ciudad es requerida";
        }
        break;
      case "descripcion_empresa":
      case "motivo":
        if (!value.trim()) {
          errorMessage = `El campo es requerido`;
        } else if (value.trim().length < 10) {
          errorMessage = "El campo debe tener al menos 10 caracteres";
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));
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

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field as keyof typeof formData]);
      if (errors[field as keyof typeof errors]) {
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
      const response = await fetch('https://api.camaradecomerciolamana.com/api/socios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSubmitStatus({
        type: "success",
        message: "¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto."
      });
      
      setFormData({
        nombre: '',
        apellido: '',
        cedula: '',
        email: '',
        telefono: '',
        empresa: '',
        cargo: '',
        direccion: '',
        ciudad: '',
        descripcion_empresa: '',
        motivo: ''
      });
      
      setFormTouched(false);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Error al enviar el formulario. Por favor, intente nuevamente."
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
              Nombre <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
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
            <Label htmlFor="apellido" className="text-white flex items-center text-sm">
              Apellido <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.apellido ? 'border-red-500' : ''}
                `}
              />
              {errors.apellido && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.apellido}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="cedula" className="text-white flex items-center text-sm">
              Cédula <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cedula"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Número de cédula"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.cedula ? 'border-red-500' : ''}
                `}
              />
              {errors.cedula && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.cedula}
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
            <Label htmlFor="empresa" className="text-white flex items-center text-sm">
              Nombre de la Empresa <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nombre de tu empresa"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.empresa ? 'border-red-500' : ''}
                `}
              />
              {errors.empresa && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.empresa}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <Label htmlFor="cargo" className="text-white flex items-center text-sm">
              Cargo <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Tu cargo en la empresa"
                className={`
                  bg-[#2a357e] text-white border-[#3a447e]
                  focus:border-red-500 focus:ring-red-500
                  placeholder:text-gray-400
                  ${errors.cargo ? 'border-red-500' : ''}
                `}
              />
              {errors.cargo && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {errors.cargo}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="direccion" className="text-white flex items-center text-sm">
            Dirección <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Dirección de la empresa"
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.direccion ? 'border-red-500' : ''}
              `}
            />
            {errors.direccion && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.direccion}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="ciudad" className="text-white flex items-center text-sm">
            Ciudad <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Input
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ciudad donde se ubica la empresa"
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.ciudad ? 'border-red-500' : ''}
              `}
            />
            {errors.ciudad && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.ciudad}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="descripcion_empresa" className="text-white flex items-center text-sm">
            Descripción de la Empresa <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="descripcion_empresa"
              name="descripcion_empresa"
              value={formData.descripcion_empresa}
              onChange={handleChange}
              placeholder="Describe brevemente tu empresa y su actividad principal"
              rows={4}
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.descripcion_empresa ? 'border-red-500' : ''}
              `}
            />
            {errors.descripcion_empresa && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.descripcion_empresa}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1">
          <Label htmlFor="motivo" className="text-white flex items-center text-sm">
            ¿Por qué desea ser socio? <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              placeholder="Cuéntanos por qué deseas unirte a la Cámara de Comercio"
              rows={4}
              className={`
                bg-[#2a357e] text-white border-[#3a447e]
                focus:border-red-500 focus:ring-red-500
                placeholder:text-gray-400
                ${errors.motivo ? 'border-red-500' : ''}
              `}
            />
            {errors.motivo && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle size={12} className="mr-1" />
                {errors.motivo}
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
                Enviar Solicitud
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

export default JoinForm;