export const getCloudinaryUrl = (url: string) => {
  if (!url) return '';
  
  // Si la URL ya es una URL completa de Cloudinary, la retornamos
  if (url.startsWith('https://res.cloudinary.com')) {
    return url;
  }

  // Si la URL es de Facebook u otra fuente externa, la retornamos como está
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }

  // Para URLs de Cloudinary que vienen del backend, eliminamos el prefijo 'image/upload' si existe
  const cleanUrl = url.replace(/^image\/upload\//, '');

  // Construimos la URL completa de Cloudinary
  return `https://res.cloudinary.com/dqnjw25rj/image/upload/${cleanUrl}`;
}; 