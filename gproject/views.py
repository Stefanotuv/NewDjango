from django.shortcuts import render
from .models import Elaboration

from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)


# Create your views here.


class ElaborationListView(ListView):
    model = Elaboration
    template_name = 'gproject/home.html'
    context_object_name = 'elaborations'
    ordering = ['-date_elaboration']
    paginate_by = 10
    # understand how to include the def get

    pass
