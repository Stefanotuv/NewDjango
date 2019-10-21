from django.shortcuts import render
from .serialiser import ElaborationSerialiser
from gproject.models import Elaboration
from rest_framework import generics
from django.views import View
import sys
from django.http import JsonResponse
# Create your views here.

class ElaborationListAPIView(generics.ListAPIView):
    lookup_field = 'pk'
    queryset = Elaboration.objects.all()
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    permission_classes = ()

def tableColumnsAPIView(request):
    temp = getattr(sys.modules[__name__], 'ElaborationSerialiser')
    fields = temp.Meta.fields
    context = {'fields':fields}
    return  JsonResponse(context)
