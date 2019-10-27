from django.shortcuts import render,redirect
from .models import Elaboration
from .forms import ElaborationCreateForm
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import HttpResponse, HttpResponseRedirect
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

# use generic view
@method_decorator(login_required, name='dispatch')
class GPHomeView(View):
    template_name = 'gproject/home.html'
    def get(self,request, format=None):
        return render(request, self.template_name, {})

@method_decorator(login_required, name='dispatch')
class GPSummaryView(View):
    template_name = 'gproject/home.html'
    def get(self,request, format=None):
        return render(request, self.template_name, {})

@method_decorator(login_required, name='dispatch')
class GPElaborationCreateView(LoginRequiredMixin,CreateView):
    model = Elaboration
    # fields = ['name','description','document_input']
    template_name = 'gproject/home.html'
    form_class = ElaborationCreateForm
    queryset = Elaboration.objects.all()
    context_object_name = 'elaboration'

    def form_valid(self, form):
        instance = form.save(commit=False)
        instance.user = self.request.user
        instance.save()
        print(form.cleaned_data)
        return super().form_valid(form)

    # def post(self, request, *args, **kwargs):
    #     form = ElaborationCreateForm(request.POST,instance=request.user)
    #     if form.is_valid():
    #         form.save()
    #         return redirect('users-profile')


    # def post(self, request, *args, **kwargs):
    #     form = self.form_class(request.POST)
    #     if form.is_valid():
    #         # form.instance.user = self.request.user
    #         elaboration = form.save()
    #
    #         elaboration.save()
    #         return HttpResponseRedirect(reverse_lazy('elaborations:detail', args=[elaboration.id]))
    #     return render(request, self.template_name, {'form': form})

@method_decorator(login_required, name='dispatch')
class GPElaborationUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Elaboration
    template_name = 'gproject/home.html'
    fields = ['name', 'description', 'document_input']
    form_class = ElaborationCreateForm

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def test_func(self):
        elaboration = self.get_object()
        if self.request.user == elaboration.user:
            return True
        return False




    # form_class = ElaborationCreateForm

    # def get_form_kwargs(self, *args, **kwargs):
    #     kwargs = super(GPElaborationCreateView, self).get_form_kwargs(*args, **kwargs)
    #     kwargs['user'] = self.request.user
    #     return kwargs



    # def post(self, request, *args, **kwargs):
    #     form = self.form_class(request.POST)
    #     if form.is_valid():
    #         # <process form cleaned data>
    #         return HttpResponseRedirect('/success/')
    #
    #     return render(request, self.template_name, {'form': form})

    # def form_valid(self, form):
    #     f = form.save(commit=False)
    #     f.user = self.request.user
    #     f.save()
    #     return super().form_valid(form)

        # self.object = form.save(commit=False)
        # self.object.user = self.request.user
        # self.object.save()
        # return HttpResponseRedirect(self.get_success_url())


