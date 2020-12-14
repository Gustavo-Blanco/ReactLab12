from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from prestamo.models import Autor, Libro, Prestamo, Usuario
from prestamo.serializers import AutorSerializer, LibroSerializer, PrestamoSerializer, UsuarioSerializer

# Create your views here.

@api_view(['GET'])
def crear(request):
    autores = Autor.objects.all()
    usuarios = Usuario.objects.all()

    datos = {
        'autores': AutorSerializer(autores, many=True).data,
        'usuarios': UsuarioSerializer(usuarios, many=True).data
    }

    return Response(datos)

@api_view(['GET'])
def libros_autor(request, autor_id):
    autor = Autor.objects.get(pk=autor_id)
    libros = Libro.objects.filter(autor=autor)

    return Response(LibroSerializer(libros, many=True).data)

@api_view(['POST'])
def guardar(request):
    serializer = LibroSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)