from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from prestamo import views

urlpatterns = [
    path('prestamo/crear', views.crear),
    path('autor/<int:autor_id>', views.libros_autor),
    path('libro/guardar', views.guardar),
    path('prestamo/listar', views.listar_prestamos),
    path('prestamo/guardar',views.crear_prestamo),
]