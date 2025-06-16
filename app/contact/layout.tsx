import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Cámara de Comercio La Maná',
  description: 'Póngase en contacto con la Cámara de Comercio de La Maná. Encuentre nuestra dirección, teléfono, correo electrónico y horarios de atención.',
  keywords: 'contacto, dirección, teléfono, email, horario, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Contacto | Cámara de Comercio La Maná',
    description: 'Póngase en contacto con la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/contact',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Cámara de Comercio La Maná',
    description: 'Póngase en contacto con la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/contact',
  },
};

export default function ContactLayout({
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