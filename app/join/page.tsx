import JoinForm from '@/components/JoinForm';
import { Toaster } from 'react-hot-toast';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-950 mb-4">
            Únete a la Cámara <span className="text-red-600">de Comercio</span>
          </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Forma parte de nuestra comunidad empresarial y accede a beneficios exclusivos para impulsar tu negocio.
            </p>
          </div>
          
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6"></div>
         

          <div className="bg-blue-950 shadow-xl rounded-2xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Formulario de Solicitud
              </h2>
              <p className="text-white">
                Complete el siguiente formulario para iniciar su proceso de afiliación. Nos pondremos en contacto con usted a la brevedad.
              </p>
            </div>

            <JoinForm />
          </div>
        </div>
      </div>
    </div>
  );
} 