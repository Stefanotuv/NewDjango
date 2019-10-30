from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Elaboration

class ElaborationCreateForm(forms.ModelForm):

    class Meta:
        model = Elaboration
        exclude = ['user']




