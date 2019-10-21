from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from PIL import Image

from django.contrib.auth.models import User

from django.contrib.auth.models import AbstractBaseUser
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(User,unique=True, on_delete=models.CASCADE,default=None)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'



    def save(self,*args,**kwargs):
        super().save(*args,**kwargs)

        img = Image.open(self.image.path )

        if img.height > 300 or img.weight >300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img = Image.open(self.image.path)

@receiver(post_save, sender=User)
def create_user_profile(sender,instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()