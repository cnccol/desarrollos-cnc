from rest_framework import viewsets, permissions, parsers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from . import serializers
from .serializers import PersonaSerializer
from .models import Persona
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound as NotFoundError


class Personas(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        personas = Persona.objects
        serializer = PersonaSerializer(personas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PersonaSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=
                status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)