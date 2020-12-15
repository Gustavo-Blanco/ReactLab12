from rest_framework import serializers
from .models import Autor, Libro, Prestamo, Usuario

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Libro
        # fields = ['prestamo_set', 'codigo','titulo','isbn','editorial','num_pags','autor']
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Usuario
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    libro = LibroSerializer(many=False)
    usuario = UsuarioSerializer(many=False)
    class Meta:
        model = Prestamo
        fields = '__all__'