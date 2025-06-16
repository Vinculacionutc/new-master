import CVForm from '@/components/CVForm';
import { Send } from 'lucide-react';

export default function CVPage() {
  return (
    <div className="min-h-screen bg-white py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-600/10 mb-6">
              <Send className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-blue-950 mb-4">
              Envíanos tu CV
            </h1>
            <p className="text-lg text-black max-w-2xl mx-auto">
              ¿Te gustaría formar parte de nuestro equipo? Envíanos tu CV y cuéntanos por qué te gustaría trabajar con nosotros.
            </p>
          </div>

          <CVForm />
        </div>
      </div>
    </div>
  );
} 