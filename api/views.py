from django.shortcuts import render, redirect
from .serialiser import ElaborationSerialiser
from gproject.models import Elaboration
from rest_framework import generics
from gproject.forms import ElaborationCreateForm
import pandas, json
import os
import xlrd
from django.views import View
import sys
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
# Create your views here.

class ElaborationListAPIView(generics.ListAPIView):
    lookup_field = 'pk'
    queryset = Elaboration.objects.all()
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    permission_classes = ()
    ordering = ['-date_created']

def tableColumnsAPIView(request):
    temp = getattr(sys.modules[__name__], 'ElaborationSerialiser')
    fields = temp.Meta.fields
    context = {'fields':fields}
    return  JsonResponse(context)
# ,generics.base.CreateModelMixin):

@method_decorator(login_required, name='dispatch')
class ElaborationCreateAPIView(LoginRequiredMixin,generics.CreateAPIView):
# class ElaborationCreateAPIView(generics.CreateAPIView):
    lookup_field = 'pk'
    form_class = ElaborationCreateForm
    queryset = Elaboration.objects.all()
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    permission_classes = ()

    parser_classes = (MultiPartParser, JSONParser, FileUploadParser, FormParser)




    def post(self, request, *args, **kwargs):
        if self.request.method == "POST" and self.request.is_ajax():
            super().post(request, *args, **kwargs)
        super().post(request, *args, **kwargs)

    def form_valid(self, form):
        instance = form.save(commit=False)
        instance.user = self.request.user
        instance.save()
        self.excel_to_json(instance.document_input)
        super().form_valid(form)

    def excel_to_json(self, path_filename):
        wb = xlrd.open_workbook(path_filename.file.name)
        sh = wb.sheet_by_index(0)
        data_list = []
        columns = []
        for rownum in range(1, sh.nrows):
            dict = {}
            for rowvalue in range(0, sh.row(rownum).__len__() - 1):
                columns.append(sh.row(0)[rowvalue].value)
            for rowvalue in range(0, sh.row(rownum).__len__() - 1):
                dict[sh.row(0)[rowvalue].value] = sh.row(rownum)[rowvalue].value
            data_list.append(dict)
        filejson = os.path.splitext(path_filename.file.name)[0] + '.json'
        with open(filejson, 'w+') as json_file:
            json.dump(data_list, json_file)



