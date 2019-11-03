__author__ = "stefanotuv"

from rest_framework import serializers
from gproject.models import Elaboration

class ElaborationSerialiser(serializers.ModelSerializer):

    class Meta:
        model = Elaboration
        fields = ('pk','name','description','user','document_input','elaborated','date_elaboration')
        # fields = "__all__"