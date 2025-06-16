import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noticias | Cámara de Comercio La Maná',
  description: 'Manténgase informado sobre las últimas noticias, eventos y actividades de la Cámara de Comercio de La Maná y el sector empresarial local.',
  keywords: 'noticias, eventos, actividades, actualidad empresarial, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Noticias | Cámara de Comercio La Maná',
    description: 'Manténgase informado sobre las últimas noticias, eventos y actividades de la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/news',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noticias | Cámara de Comercio La Maná',
    description: 'Manténgase informado sobre las últimas noticias, eventos y actividades de la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/news',
  },
};

export default function NewsLayout({
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