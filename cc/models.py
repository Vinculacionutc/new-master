from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
# models.py
from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Icono(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    codigo = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class RedSocial(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    url_base = models.URLField()
    icono = models.ForeignKey(Icono, on_delete=models.PROTECT)

    def __str__(self):
        return self.nombre

class Empresa(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    descripcion = models.TextField()
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(blank=True, null=True)
    sitio_web = models.URLField(blank=True, null=True)
    direccion = models.CharField(max_length=200)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activa = models.BooleanField(default=True)
    logo = CloudinaryField('logo', blank=True, null=True)

    def __str__(self):
        return self.nombre

class EmpresaRedSocial(models.Model):
    empresa = models.ForeignKey(Empresa, related_name='redes_sociales', on_delete=models.CASCADE)
    red_social = models.ForeignKey(RedSocial, on_delete=models.CASCADE)
    usuario = models.CharField(max_length=100)
    url = models.URLField()

    class Meta:
        unique_together = ['empresa', 'red_social']

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    empresa = models.ForeignKey(Empresa, related_name='productos', on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = CloudinaryField('imagen', blank=True, null=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class CaracteristicaProducto(models.Model):
    producto = models.ForeignKey(Producto, related_name='caracteristicas', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    valor = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.producto.nombre} - {self.nombre}"

class Servicio(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    icono = models.ForeignKey(Icono, on_delete=models.PROTECT)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo

class Testimonio(models.Model):
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateField(auto_now_add=True)
    aprobado = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nombre} - {self.empresa.nombre}"
    

# models.py
from django.db import models

class Equipo(models.Model):
    nombre = models.CharField(max_length=100)
    posicion = models.CharField(max_length=100)
    imagen = CloudinaryField('imagen', blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    contenido = models.TextField()
    fecha_publicacion = models.DateField(auto_now_add=True)
    link = models.URLField(blank=True, null=True)
    foto = CloudinaryField('foto', blank=True, null=True)

    def __str__(self):
        return self.titulo
    

# models.py
from django.db import models
from django.utils import timezone

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    fecha_creacion = models.DateTimeField(default=timezone.now)
    leido = models.BooleanField(default=False)

    class Meta:
        ordering = ['-fecha_creacion']
        verbose_name = 'Mensaje de contacto'
        verbose_name_plural = 'Mensajes de contacto'

    def __str__(self):
        return f"{self.nombre} - {self.asunto}"