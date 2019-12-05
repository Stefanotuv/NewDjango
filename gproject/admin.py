from django.contrib import admin
from .models import Elaboration, ElaborationSettings, ListDB, ListValuesDB, ElaborationSettingsGroup

# Register your models here.

admin.site.register(Elaboration)
admin.site.register(ElaborationSettings)
admin.site.register(ListDB)
admin.site.register(ListValuesDB)
admin.site.register(ElaborationSettingsGroup)

