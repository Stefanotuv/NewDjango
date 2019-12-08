__author__ = "stefanotuv"

from rest_framework import serializers
from gproject.models import Elaboration, ElaborationSettings , ListValuesDB, ListDB, ElaborationSettingsGroup

from collections.abc import Mapping
from collections import OrderedDict
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError
from rest_framework.settings import api_settings
from rest_framework.fields import get_error_detail, set_value
from rest_framework.fields import (  # NOQA # isort:skip
    SkipField,empty
)

from rest_framework.serializers import as_serializer_error

class ElaborationSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Elaboration
        fields = ('pk','name','description','user','document_input','elaborated','date_elaboration')
        # fields = "__all__"
     # TODO: search if the other fields can be added to allow visualisation on the page (including the admin page)




    # def to_internal_value(self, data):
    #
    #     pass

    # def get_value(self, dictionary):
    #     return super().get_value(dictionary)

class ListDBSerialiser(serializers.ModelSerializer):
    # list_value = serializers.StringRelatedField(many=True) # the api shows the value as a string
    # list_value = ListValuesDBSerialiser(many=True) # the api shows all the details
    class Meta:
        model = ListDB
        depth = 1
        fields = ('name','user_id','document_input','list_value')

    # def get_value(self, dictionary):
    #     return super().get_value(dictionary)
    # def create(self, validated_data):
    #     list_value = validated_data.pop('list_value')
    #
    #     listDB = ListDB.objects.create(**validated_data)
    #     super().create(self, validated_data)

    # def run_validation(self, data=empty):
    #     """
    #     We override the default `run_validation`, because the validation
    #     performed by validators and the `.validate()` method should
    #     be coerced into an error dictionary with a 'non_fields_error' key.
    #     """
    #     (is_empty_value, data) = self.validate_empty_values(data)
    #     if is_empty_value:
    #         return data
    #
    #     value = self.to_internal_value(data)
    #     try:
    #         self.run_validators(value)
    #         value = self.validate(value)
    #         assert value is not None, '.validate() should return the validated data'
    #     except (ValidationError, DjangoValidationError) as exc:
    #         raise ValidationError(detail=as_serializer_error(exc))
    #
    #     return value
    #
    # def to_internal_value(self, data):
    #
    #     if not isinstance(data, Mapping):
    #         message = self.error_messages['invalid'].format(
    #             datatype=type(data).__name__
    #         )
    #         raise ValidationError({
    #             api_settings.NON_FIELD_ERRORS_KEY: [message]
    #         }, code='invalid')
    #
    #     ret = OrderedDict()
    #     errors = OrderedDict()
    #     fields = self._writable_fields
    #
    #     for field in fields:
    #         validate_method = getattr(self, 'validate_' + field.field_name, None)
    #         primitive_value = field.get_value(data)
    #         try:
    #             validated_value = field.run_validation(primitive_value)
    #             if validate_method is not None:
    #                 validated_value = validate_method(validated_value)
    #         except ValidationError as exc:
    #             errors[field.field_name] = exc.detail
    #         except DjangoValidationError as exc:
    #             errors[field.field_name] = get_error_detail(exc)
    #         except SkipField:
    #             pass
    #         else:
    #             set_value(ret, field.source_attrs, validated_value)
    #
    #     if errors:
    #         raise ValidationError(errors)
    #
    #     return ret
    #
    #
    #
    #
    #
    #
    #
    #
    #     return super().to_internal_value(data)

class ListValuesDBSerialiser(serializers.ModelSerializer):
    values = ListDBSerialiser(many=True,read_only=True)
    class Meta:
        model = ListValuesDB
        # fields = ('value')
        depth = 1
        fields = "__all__"

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
