from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Elaboration, ListDB

class ElaborationCreateForm(forms.ModelForm):

    class Meta:
        model = Elaboration
        exclude = ['user']

class ListDBCreateForm(forms.ModelForm):
    document_input = forms.FileField()
    class Meta:

        model = ListDB
        exclude = ['user']
        # fields = ('name','user','document_input')



