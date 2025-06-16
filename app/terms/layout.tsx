import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Uso | Cámara de Comercio La Maná',
  description: 'Condiciones legales para el uso del sitio web y servicios de la Cámara de Comercio de La Maná. Conozca sus derechos y responsabilidades.',
  keywords: 'términos de uso, condiciones legales, acuerdo de usuario, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Términos de Uso | Cámara de Comercio La Maná',
    description: 'Condiciones legales para el uso del sitio web y servicios de la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/terms',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Términos de Uso | Cámara de Comercio La Maná',
    description: 'Condiciones legales para el uso del sitio web y servicios de la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/terms',
  },
};

export default function TermsLayout({
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