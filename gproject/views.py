from django.shortcuts import render,redirect
from .models import Elaboration
from .forms import ElaborationCreateForm
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
import pandas, json
import os
import xlrd

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
        # instance = form.save(commit=True)
        instance.user = self.request.user
        instance.save()
        self.excel_to_json(instance.document_input)
        filename =instance.document_input.file.name
        super().form_valid(form)
        # return redirect('gproject-gp-wizard-table',{"filename":filename})
        return redirect('gproject-gp-wizard-table')

    def excel_to_json(self,path_filename):

        wb = xlrd.open_workbook(path_filename.file.name)
        sh = wb.sheet_by_index(0)
        data_column_list = ['LBSNo',
                        'Stream',
                        'Group',
                        'First Name',
                        'Known Name',
                        'Surname',
                        'Nationality',
                        'Nationality Region',
                        'Gender',
                        'Age',
                        'Relevant Experience',
                        'Country of Residence',
                        'CoR Region',
                        'GMAT Score(total)',
                        'Quant',
                        'English Mother Tongue',
                        'English Scores',
                        'Job Title',
                        'Company Name',
                        'City (Employment)',
                        'Country(Employment)',
                        'Professional Category (PO team)',
                        'Job Function',
                        'Email Address',
                        'School Email',
                        'Q Score',
                        'Q Score %',
                        'V Score',
                        'V Score %',
                        'AW Score',
                        'AW Score  %',
                        'IR Score',
                        'IR Score  %',
                        'Second Nationality',
                        'Home City',
                        'Microeconomics Waiver',
                        'Macroeconomics Waiver',
                        'DAM Waiver ',
                        'Visa at risk ',]
        data_list = []
        columns = []
        for rownum in range(1, sh.nrows):
            dict = {}

            for rowvalue in range(0, sh.row(rownum).__len__() - 1):
                columns.append(sh.row(0)[rowvalue].value)

            for rowvalue in range(0, sh.row(rownum).__len__()-1):
                dict[sh.row(0)[rowvalue].value] = sh.row(rownum)[rowvalue].value

            data_list.append(dict)


        filejson = os.path.splitext(path_filename.file.name)[0] + '.json'
        with open(filejson, 'w+') as json_file:
            json.dump(data_list, json_file)




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
