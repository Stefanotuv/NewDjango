from django.db import models

# Create your models here.
# first model is to keep the information about the elaboration

from django.contrib.auth.models import User
from django.utils import timezone

class Elaboration(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='user_elaboration',default=None)
    date_elaboration = models.DateTimeField(default=timezone.now, auto_now_add=False)
    document_input = models.FileField(upload_to='static/documents/',default=None)
    elaborated = models.BooleanField()

    # links to the files?
    def __str__(self):
        return f'{self.name}'



