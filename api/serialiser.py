__author__ = "stefanotuv"

from rest_framework import serializers
from gproject.models import Elaboration, ElaborationSettings , ListValuesDB, ListDB, ElaborationSettingsGroup

class ElaborationSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Elaboration
        fields = ('pk','name','description','user','document_input','elaborated','date_elaboration')
        # fields = "__all__"
     # TODO: search if the other fields can be added to allow visualisation on the page (including the admin page)


class ListValuesDBSerialiser(serializers.ModelSerializer):
    # values = ListDBSerialiser(many=True,read_only=True)
    class Meta:
        model = ListValuesDB
        fields = ('value')
        # fields = "__all__"

class ListDBSerialiser(serializers.ModelSerializer):
    # list_value = serializers.RelatedField(many=True,read_only=True)
    class Meta:
        model = ListDB
        fields = ('name','user_id','document_input')
        depth = 1


class ElaborationSettingsSerialiser(serializers.ModelSerializer):
    list_DB = ListDBSerialiser()
    class Meta:
        model = ElaborationSettings
        # fields = "__all__"
        fields = ['id',	'name',	'date_created','mandatory','option_value','list_DB','range_from','range_to','user','elaboration_settings_group']

class ElaborationSettingsGroupSerialiser(serializers.ModelSerializer):
    # elaboration_settings = ElaborationSettings()
    class Meta:
        model = ElaborationSettingsGroup
        fields = ['id','group_name','user']
        depth = 1
