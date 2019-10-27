from django.db import models

# Create your models here.
# first model is to keep the information about the elaboration

from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from django.conf import settings

class Elaboration(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='user_elaboration', null=True,
    #                             unique=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_elaboration')
    date_elaboration = models.DateTimeField(default=timezone.now, auto_now_add=False,null=True)
    document_input = models.FileField(upload_to='static/documents/',blank=True, null=True)
    elaborated = models.BooleanField(default=False)

    # links to the files?
    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        # return reverse('gproject-gp-wizard', kwargs={'id':self.id})
        return reverse('gproject-gp-wizard')



