import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empresas Afiliadas | Cámara de Comercio La Maná',
  description: 'Directorio de empresas y negocios afiliados a la Cámara de Comercio de La Maná. Conozca los comercios locales que forman parte de nuestra red empresarial.',
  keywords: 'empresas afiliadas, directorio empresarial, negocios locales, comercios, cámara de comercio, La Maná, Ecuador',
  openGraph: {
    title: 'Empresas Afiliadas | Cámara de Comercio La Maná',
    description: 'Directorio de empresas y negocios afiliados a la Cámara de Comercio de La Maná.',
    url: 'https://camaradecomerciolamana.com/companies',
    siteName: 'Cámara de Comercio La Maná',
    locale: 'es_EC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empresas Afiliadas | Cámara de Comercio La Maná',
    description: 'Directorio de empresas y negocios afiliados a la Cámara de Comercio de La Maná.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://camaradecomerciolamana.com/companies',
  },
};

export default function CompaniesLayout({
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