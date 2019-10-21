from django.shortcuts import render
from .models import Elaboration
from users.models import User
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from django.views.generic import (
    View,
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)


# Create your views here.

# for testing
class ElaborationListView(ListView):
    model = Elaboration
    template_name = 'gproject/home_.html'
    context_object_name = 'elaborations'
    ordering = ['-date_elaboration']
    paginate_by = 10
    # understand how to include the def get

    pass

# use generic view
@method_decorator(login_required, name='dispatch')
class GprojectHomeView(View):
    model = User
    # template_name = 'gproject/home.html'
    template_name_1 = 'gproject/tables_elaboration_summary.html'
    def get(self,request, format=None):
        # return render(request, self.template_name, {})
        return render(request, self.template_name_1, {})

