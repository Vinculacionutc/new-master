import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Afíliese | Cámara de Comercio La Maná',
  description: 'Únase a la Cámara de Comercio de La Maná y acceda a beneficios exclusivos para su negocio. Conozca los requisitos y el proceso de afiliación.',
  keywords: 'afiliación, membresía, beneficios, requisitos, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Afíliese | Cámara de Comercio La Maná',
    description: 'Únase a la Cámara de Comercio de La Maná y acceda a beneficios exclusivos para su negocio.',
    url: 'https://camaradecomerciolamana.com/join',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afíliese | Cámara de Comercio La Maná',
    description: 'Únase a la Cámara de Comercio de La Maná y acceda a beneficios exclusivos para su negocio.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/join',
  },
};

export default function JoinLayout({
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