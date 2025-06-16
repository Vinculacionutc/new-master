from django.contrib import admin
from .models import Categoria, Icono, RedSocial, Empresa, EmpresaRedSocial, Producto, CaracteristicaProducto, Servicio, Testimonio, MensajeContacto, Noticia

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'descripcion']
    search_fields = ['nombre']

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'telefono', 'correo', 'activa']
    list_filter = ['categoria', 'activa']
    search_fields = ['nombre', 'descripcion']

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'empresa', 'categoria', 'precio', 'activo']
    list_filter = ['categoria', 'activo', 'empresa']
    search_fields = ['nombre', 'descripcion']

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'categoria', 'activo']
    list_filter = ['categoria', 'activo']
    search_fields = ['titulo', 'descripcion']

@admin.register(Testimonio)
class TestimonioAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'cargo', 'empresa', 'fecha', 'aprobado']
    list_filter = ['aprobado', 'fecha']
    search_fields = ['nombre', 'comentario']

@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'email', 'asunto', 'fecha_creacion', 'leido']
    list_filter = ['leido', 'fecha_creacion']
    search_fields = ['nombre', 'email', 'asunto', 'mensaje']
    readonly_fields = ['fecha_creacion']

@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'fecha_publicacion']
    list_filter = ['fecha_publicacion']
    search_fields = ['titulo', 'contenido']
    readonly_fields = ['fecha_publicacion']
