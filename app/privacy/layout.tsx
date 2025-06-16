import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Cámara de Comercio La Maná',
  description: 'Conozca cómo la Cámara de Comercio de La Maná recopila, utiliza y protege su información personal. Nuestro compromiso con la transparencia y seguridad de sus datos.',
  keywords: 'política de privacidad, protección de datos, seguridad de información, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Política de Privacidad | Cámara de Comercio La Maná',
    description: 'Conozca cómo la Cámara de Comercio de La Maná recopila, utiliza y protege su información personal.',
    url: 'https://camaradecomerciolamana.com/privacy',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidad | Cámara de Comercio La Maná',
    description: 'Conozca cómo la Cámara de Comercio de La Maná recopila, utiliza y protege su información personal.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/privacy',
  },
};

export default function PrivacyLayout({
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