"use client";

import { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/utils/image';

interface Testimonial {
  id: number;
  nombre: string;
  cargo: string;
  empresa_nombre: string;
  comentario: string;
  imagen?: string;
}

interface FallbackAvatarProps {
  name: string;
}

const FallbackAvatar: FC<FallbackAvatarProps> = ({ name }) => (
  <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center text-lg font-semibold text-white shadow-inner">
    {name.charAt(0)}
  </div>
);

const TestimonialsCarousel: FC = () => {
  const [testimonios, setTestimonios] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [retryCount, setRetryCount] = useState<Record<number, number>>({});
  const MAX_RETRIES = 3;

  const handleImageError = useCallback((id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
    setRetryCount(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }, []);

  const retryImageLoad = useCallback((id: number) => {
    if (retryCount[id] < MAX_RETRIES) {
      setImageErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, [retryCount]);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/testimonios/');
        if (!response.ok) throw new Error('Error al cargar los testimonios');
        const data = await response.json();
        setTestimonios(data.results);
        setError(null);
      } catch (err) {
        setError('Error al cargar los testimonios');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonios();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">
          <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Cargando testimonios...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-400 flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  if (!testimonios.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">No hay testimonios disponibles</div>
      </div>
    );
  }

  return (
    <section id="testimonios" className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-12">
          Lo que dicen nuestras <span className="text-red-600">empresas</span>
        </h2>
        <div className="relative overflow-hidden">
          <div className="slider-track flex">
            {[...testimonios, ...testimonios, ...testimonios].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="testimonial-item flex-shrink-0 w-64 px-2"
              >
                <div className="bg-blue-950/90 backdrop-blur-sm border border-blue-900/20 shadow-md transform transition-all duration-300 hover:scale-102 hover:shadow-xl h-full cursor-pointer rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {testimonial.imagen && !imageErrors.has(testimonial.id) ? (
                      <div className="relative">
                        <Image
                          src={getCloudinaryUrl(testimonial.imagen)}
                          alt={testimonial.nombre}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          onError={() => handleImageError(testimonial.id)}
                          onLoad={() => retryImageLoad(testimonial.id)}
                        />
                        {retryCount[testimonial.id] > 0 && retryCount[testimonial.id] < MAX_RETRIES && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ) : (
                      <FallbackAvatar name={testimonial.nombre} />
                    )}
                    <div>
                      <h3 className="text-white text-base font-medium leading-tight">{testimonial.nombre}</h3>
                      <p className="text-xs text-gray-300">{testimonial.cargo} de {testimonial.empresa_nombre}</p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-xs leading-relaxed">{testimonial.comentario}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-track {
          animation: scroll 40s linear infinite;
          width: calc(250px * ${testimonios.length * 3});
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-250px * ${testimonios.length}));
          }
        }

        .slider-track:hover {
          animation-play-state: paused;
        }

        .testimonial-item:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;