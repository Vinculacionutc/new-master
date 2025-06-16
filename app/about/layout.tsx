import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Cámara de Comercio La Maná',
  description: 'Conozca la historia, misión, visión y valores de la Cámara de Comercio de La Maná. Descubra cómo trabajamos para impulsar el desarrollo económico de nuestra región.',
  keywords: 'sobre nosotros, historia, misión, visión, valores, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Sobre Nosotros | Cámara de Comercio La Maná',
    description: 'Conozca la historia, misión, visión y valores de la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/about',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | Cámara de Comercio La Maná',
    description: 'Conozca la historia, misión, visión y valores de la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/about',
  },
};

export default function AboutLayout({
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