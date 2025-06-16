/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Opción 1: Usar remotePatterns con wildcard (MÁS SEGURO)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    
    // Opción 2: Usar la función loader personalizada (ALTERNATIVA)
    // loader: 'custom',
    // loaderFile: './my-loader.js',
    
    // Optimizaciones adicionales
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;