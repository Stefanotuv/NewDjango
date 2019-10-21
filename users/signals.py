__author__ = "stefanotuv"

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile


# @receiver(post_save, sender=User)
# def create_profile(sender,instance, *args, **kwargs):
#     if kwargs['created']:
#         profile = Profile(instance)
#
# # # def create_profile(sender, instance, created, *args, **kwargs):
# #
# #     if kwargs['created']:
# #         user_profile = Profile.objects.create(user=kwargs['instance'])
# #
# #     # if created:
# #     #     Profile.objects.create(user=instance)
# #
# # #
# # @receiver(post_save, sender=User)
# # def save_profile(sender, instance,*args, **kwargs):
# #     instance.profile.save()