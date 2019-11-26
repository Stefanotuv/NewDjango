from .serialiser import ElaborationSerialiser
from gproject.models import Elaboration
from rest_framework import generics
from gproject.forms import ElaborationCreateForm
from NewDjango.settings import GROUPING_COLUMNS
import pandas, json
import os, xlrd, sys
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.views import APIView

from NewDjango.settings import MEDIA_ROOT, MEDIA_URL
# Create your views here.


@method_decorator(login_required, name='dispatch')
class ElaborationListAPIView(LoginRequiredMixin, generics.ListAPIView):
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
class ElaborationGetDataFromFile(LoginRequiredMixin,generics.GenericAPIView):
    # use to elaborate the json file to be passed to the table

    def get(self,request, format=None):
        varia = 1

        pass


@method_decorator(login_required, name='dispatch')
class ElaborationCreateAPIView(LoginRequiredMixin,generics.CreateAPIView):
    lookup_field = 'pk'
    form_class = ElaborationCreateForm
    queryset = Elaboration.objects.all()
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    permission_classes = ()
    temp_file_name = ''

    parser_classes = (MultiPartParser, JSONParser, FileUploadParser, FormParser)

    def post(self, request, *args, **kwargs):

        # intercept the post in order to operate on the saved file
        # after posting the request

        try:
            input_file = request.FILES['document_input']
            wb = xlrd.open_workbook(filename=None, file_contents=input_file.read())
            sh = wb.sheet_by_index(0)
            file_columns = []

            for rowvalue in range(0, sh.row(0).__len__()):
                file_columns.append(sh.row(0)[rowvalue].value)

            if (file_columns != GROUPING_COLUMNS):
                raise()

            obj = self.create(request, *args, **kwargs)
            self.excel_to_json(self.temp_file_name)
            return obj

        except:
            print("Error: File Format issues")

    def perform_create(self, serializer):

        serializer.save()

        temp_full_path_file_name = serializer.data['document_input']
        self.temp_file_name = os.path.basename(temp_full_path_file_name)

    def excel_to_json(self, path_filename):
        full_path_filename = os.path.join(os.path.join(os.path.join(MEDIA_ROOT,'static'),'documents'),path_filename)

        try:
            wb = xlrd.open_workbook(full_path_filename)
            sh = wb.sheet_by_index(0)
            data_list = []

            for rownum in range(1, sh.nrows):
                dict = {}
                for rowvalue in range(0, sh.row(rownum).__len__()):
                    dict[sh.row(0)[rowvalue].value] = sh.row(rownum)[rowvalue].value
                data_list.append(dict)

                # verify if the columns are same as the expected columns for the grouping

            filejson = os.path.splitext(full_path_filename)[0] + '.json'

            with open(filejson, 'w+') as json_file:
                json.dump(data_list, json_file)

        except:
            print("Error: File Format issues")

@method_decorator(login_required, name='dispatch')
class ElaborationSettingsAPIView(LoginRequiredMixin,APIView):
    permission_classes = ()
    def get(self, request, *args, **kwargs):
        temp = 1;
        return self.list(request, *args, **kwargs)

    # TODO: to be done



