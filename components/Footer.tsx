"use client"

import { Mail, MapPin, Phone, Facebook, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600 rounded-full opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden">
                <Image 
                  src="https://res.cloudinary.com/dqnjw25rj/image/upload/v1738702145/empresas/zoeb19ews9gqsyv3znvc.png"
                  alt="Logo Cámara de Comercio"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold">Cámara de Comercio<br/><span className="text-red-500">La Maná</span></h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Impulsando el desarrollo empresarial y económico de nuestra región desde hace más de 20 años, con compromiso y excelencia.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/camaradecomerciodelamana.ciudadlamana/?locale=es_LA" 
                className="w-10 h-10 rounded-full bg-blue-900 hover:bg-red-600 flex items-center justify-center transition-colors duration-300" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <Link
                href="https://wa.me/593980265231?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20la%20Cámara%20de%20Comercio%20de%20La%20Maná."
                className="w-10 h-10 rounded-full bg-green-600 hover:bg-red-600 flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Phone className="text-red-600" size={20} />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="text-red-600 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  Av. 19 de Mayo, La Maná, Ecuador
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone size={18} className="text-red-600 mt-1 group-hover:scale-110 transition-transform" />
                
                  +593 980265231
                
              </li>
              <li className="flex items-start gap-3 group">
                <Mail size={18} className="text-red-600 mt-1 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@camaradecomerciolamana.com" className="text-gray-300 group-hover:text-white transition-colors">
                  camaradecomerciolamana@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="text-red-600" size={20} />
              Horario de Atención
            </h4>
            <div className="space-y-3">
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <p className="font-medium">Lunes a Viernes</p>
                <p className="text-gray-300">8:00 AM - 5:00 PM</p>
              </div>
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <p className="font-medium">Sábados</p>
                <p className="text-gray-300">9:00 AM - 1:00 PM</p>
              </div>
              <div className="bg-blue-900/50 p-3 rounded-lg">
                <p className="font-medium">Domingos</p>
                <p className="text-red-500">Cerrado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-blue-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Cámara de Comercio La Maná. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
