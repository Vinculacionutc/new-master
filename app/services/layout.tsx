import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios | Cámara de Comercio La Maná',
  description: 'Descubra los servicios que ofrece la Cámara de Comercio de La Maná para apoyar a empresarios y comerciantes locales. Asesoría, capacitación, networking y más.',
  keywords: 'servicios, asesoría empresarial, capacitación, networking, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Servicios | Cámara de Comercio La Maná',
    description: 'Descubra los servicios que ofrece la Cámara de Comercio de La Maná para apoyar a empresarios y comerciantes locales.',
    url: 'https://camaradecomerciolamana.com/services',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios | Cámara de Comercio La Maná',
    description: 'Descubra los servicios que ofrece la Cámara de Comercio de La Maná para apoyar a empresarios y comerciantes locales.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/services',
  },
};

export default function ServicesLayout({
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