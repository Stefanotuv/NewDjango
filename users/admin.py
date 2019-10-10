from django.contrib import admin

# Register your models here.

from .models import Profile

admin.site.register(Profile)

# class ProfileModelAdmin(admin.ModelAdmin):
#     list_display = ["title","updated","timestamp"]
#
#     class Meta:
#         model = Profile
#
# admin.site.register(Profile,ProfileModelAdmin)