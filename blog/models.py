from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()

    # date_posted = models.DateTimeField(auto_now_add=True)
    # timestamp = models.DateTimeField(auto_now=True,auto_now_add=False)

    date_posted = models.DateTimeField(default=timezone.now,auto_now_add=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE) # delete the user would delete the post
    updated = models.DateTimeField(auto_now=False,auto_now_add=True)

    def __str__(self):
        return self.title


