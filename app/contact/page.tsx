"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowRight,
  Clock,
  Globe,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [formTouched, setFormTouched] = useState(false);

  // Resetear el estado de éxito después de 5 segundos
  useEffect(() => {
    if (submitStatus.type === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = () => {
    const tempErrors = {
      nombre: "",
      email: "",
      asunto: "",
      mensaje: ""
    };
    let isValid = true;

    if (!formData.nombre.trim()) {
      tempErrors.nombre = "El nombre es requerido";
      isValid = false;
    } else if (formData.nombre.trim().length < 3) {
      tempErrors.nombre = "El nombre debe tener al menos 3 caracteres";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      tempErrors.email = "Ingrese un correo electrónico válido";
      isValid = false;
    }

    if (!formData.asunto.trim()) {
      tempErrors.asunto = "El asunto es requerido";
      isValid = false;
    }

    if (!formData.mensaje.trim()) {
      tempErrors.mensaje = "El mensaje es requerido";
      isValid = false;
    } else if (formData.mensaje.trim().length < 10) {
      tempErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
    
    if (!formTouched) {
      setFormTouched(true);
    }
    
    // Validación en tiempo real para mejorar UX
    if (formTouched) {
      validateField(id, value);
    }
  };
  
  const validateField = (field: string, value: string) => {
    let errorMessage = "";
    
    switch (field) {
      case "nombre":
        if (!value.trim()) {
          errorMessage = "El nombre es requerido";
        } else if (value.trim().length < 3) {
          errorMessage = "El nombre debe tener al menos 3 caracteres";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim() || !emailRegex.test(value)) {
          errorMessage = "Ingrese un correo electrónico válido";
        }
        break;
      case "asunto":
        if (!value.trim()) {
          errorMessage = "El asunto es requerido";
        }
        break;
      case "mensaje":
        if (!value.trim()) {
          errorMessage = "El mensaje es requerido";
        } else if (value.trim().length < 10) {
          errorMessage = "El mensaje debe tener al menos 10 caracteres";
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/mensajes-contacto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitStatus({ 
          type: "success", 
          message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto." 
        });
        // Resetear el formulario después de envío exitoso
        setFormData({
          nombre: "",
          email: "",
          asunto: "",
          mensaje: ""
        });
        setFormTouched(false);
      } else {
        setSubmitStatus({ 
          type: "error", 
          message: "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente." 
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ 
        type: "error", 
        message: "Error de conexión. Verifica tu conexión a internet e intenta nuevamente." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16 relative"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-50 rounded-full opacity-30 blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <div className="relative w-20 h-20 mx-auto overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dqnjw25rj/image/upload/v1738702145/empresas/zoeb19ews9gqsyv3znvc.png"
                alt="Logo Cámara de Comercio"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-blue-950 mb-4">
            Contáctanos <span className="text-red-600">ahora</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas y ayudarte con el proceso de afiliación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 border border-blue-900/20 shadow-2xl relative overflow-hidden"
          >
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-800 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Send className="mr-4 text-red-600" size={28} />
                Envíanos un Mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="space-y-1">
                    <Label htmlFor="nombre" className="text-white flex items-center text-sm">
                      Nombre <span className="text-red-600 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className={`
                          bg-white/10 text-white border-blue-800/50 
                          focus:border-red-600 focus:ring-red-600
                          placeholder:text-white/50
                          ${errors.nombre ? 'border-red-600' : ''}
                        `}
                      />
                      {errors.nombre && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.nombre}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1">
                    <Label htmlFor="email" className="text-white flex items-center text-sm">
                      Correo Electrónico <span className="text-red-600 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className={`
                          bg-white/10 text-white border-blue-800/50 
                          focus:border-red-600 focus:ring-red-600
                          placeholder:text-white/50
                          ${errors.email ? 'border-red-600' : ''}
                        `}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1">
                    <Label htmlFor="asunto" className="text-white flex items-center text-sm">
                      Asunto <span className="text-red-600 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="asunto"
                        value={formData.asunto}
                        onChange={handleInputChange}
                        placeholder="Asunto del mensaje"
                        className={`
                          bg-white/10 text-white border-blue-800/50 
                          focus:border-red-600 focus:ring-red-600
                          placeholder:text-white/50
                          ${errors.asunto ? 'border-red-600' : ''}
                        `}
                      />
                      {errors.asunto && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.asunto}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1">
                    <Label htmlFor="mensaje" className="text-white flex items-center text-sm">
                      Mensaje <span className="text-red-600 ml-1">*</span>
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={4}
                        className={`
                          bg-white/10 text-white border-blue-800/50 
                          focus:border-red-600 focus:ring-red-600
                          placeholder:text-white/50
                          ${errors.mensaje ? 'border-red-600' : ''}
                        `}
                      />
                      {errors.mensaje && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.mensaje}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <Button 
                      type="submit" 
                      className="
                        w-full 
                        bg-gradient-to-r from-red-600 to-red-500
                        text-white 
                        hover:from-red-700 hover:to-red-600 
                        transition-all 
                        duration-300
                        flex items-center justify-center
                        group
                        py-5
                        shadow-lg shadow-red-600/20
                        hover:shadow-xl hover:shadow-red-600/30
                        hover:-translate-y-0.5
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
                          Enviar Mensaje
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
            </div>
          </motion.div>

          {/* Información de Contacto */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Tarjeta de Información de Contacto */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 border border-blue-900/20 shadow-2xl relative overflow-hidden"
            >
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-800 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Globe className="mr-4 text-red-600" size={28} />
                  Información de Contacto
                </h2>
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                      <MapPin className="text-red-600 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Dirección</h3>
                      <p className="text-gray-300">Av. 19 de Mayo, La Maná, Ecuador</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                      <Phone className="text-red-600 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Teléfono</h3>
                      <p className="text-gray-300">+593 123 456 789</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                      <Mail className="text-red-600 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Correo</h3>
                      <p className="text-gray-300">info@camaradecomerciolamana.com</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Horario de Atención */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 border border-blue-900/20 shadow-2xl relative overflow-hidden"
            >
              {/* Elementos decorativos */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <Clock className="mr-4 text-red-600" size={28} />
                  Horario de Atención
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 transition-colors">
                    <span className="text-gray-300">Lunes a Viernes</span>
                    <span className="text-white font-semibold">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 transition-colors">
                    <span className="text-gray-300">Sábados</span>
                    <span className="text-white font-semibold">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 transition-colors">
                    <span className="text-gray-300">Domingos</span>
                    <span className="text-red-500 font-semibold">Cerrado</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Ubicación - Movida abajo como sección completa */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-8 border border-blue-900/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-800 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <MapPin className="mr-4 text-red-600" size={28} />
              Ubicación
            </h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-blue-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.531295292562!2d-79.22647221803583!3d-0.9421799247359648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d4eb1e13920133%3A0x8b23c27ba6d3ad26!2sLa%20Man%C3%A1%2C%20Ecuador!5e0!3m2!1sen!2s!4v1704827006255!5m2!1sen!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;