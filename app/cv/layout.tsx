import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envía tu CV | Cámara de Comercio La Maná',
  description: 'Únete a nuestro equipo en la Cámara de Comercio de La Maná. Envíanos tu CV y forma parte de nuestra organización.',
  keywords: 'empleo, trabajo, cv, curriculum, carrera, oportunidades laborales, La Maná, Ecuador',
  openGraph: {
    title: 'Envía tu CV | Cámara de Comercio La Maná',
    description: 'Únete a nuestro equipo en la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/cv',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Envía tu CV | Cámara de Comercio La Maná',
    description: 'Únete a nuestro equipo en la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/cv',
  },
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
} 