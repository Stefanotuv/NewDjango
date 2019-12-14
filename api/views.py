from .serialiser import ElaborationSerialiser, ElaborationSettingsSerialiser
from .serialiser import ListDBSerialiser, ElaborationSettingsGroupSerialiser, ListValuesDBSerialiser
from gproject.models import Elaboration, ElaborationSettings, ListDB, ListValuesDB, ElaborationSettingsGroup
from rest_framework import generics, permissions, authentication
# from rest_framework_jwt import authentication
from gproject.forms import ElaborationCreateForm, ListDBCreateForm, ListValuesDB
from NewDjango.settings import GROUPING_COLUMNS
import pandas, json
import os, xlrd, sys
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.views import APIView
from rest_framework.response import Response

from NewDjango.settings import MEDIA_ROOT, MEDIA_URL
# Create your views here.

# ------------------------- Elaboration --------------------------------------------------

@method_decorator(login_required, name='dispatch')
class ElaborationListAPIView(LoginRequiredMixin, generics.ListAPIView):
    lookup_field = 'pk'
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    ordering = ['-date_created']
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    def get_queryset(self):
        # user = self.kwargs['username']
        user = self.request.user
        if user.is_superuser:
            return Elaboration.objects.filter()


def tableColumnsAPIView(request):
    temp = getattr(sys.modules[__name__], 'ElaborationSerialiser')
    fields = temp.Meta.fields
    context = {'fields':fields}
    return  JsonResponse(context)
# ,generics.base.CreateModelMixin):

# return the cloun of the elaboration
@method_decorator(login_required, name='dispatch')
class ElaborationListColAPIView(LoginRequiredMixin, generics.ListAPIView):
    lookup_field = 'pk'
    queryset = Elaboration.objects.all()
    serializer_class = ElaborationSerialiser
    columns = serializer_class.Meta.fields
    permission_classes = ()
    ordering = ['-date_created']

    def get(self, request, *args, **kwargs):
        item = 0
        return Response(self.columns)
        # super(ElaborationListColAPIView, self).get(request, *args, **kwargs);

# to be build to load file - low priority
@method_decorator(login_required, name='dispatch')
class ElaborationGetDataFromFile(LoginRequiredMixin,generics.GenericAPIView):
    # use to elaborate the json file to be passed to the table

    def get(self,request, format=None):
        varia = 1

        pass

# post the user, desription and file excel to the DB and
# convert the file in json with the same name and save it in the
# same directory
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



# this view returns the user in the url (using user number)

# @method_decorator(login_required, name='dispatch')
# class ElaborationSettingsByUserAPIView(LoginRequiredMixin,generics.ListAPIView):
#     lookup_field = 'pk'
#     serializer_class = ElaborationSettingsSerialiser
#     permission_classes = ()
#     def get_queryset(self):
#         user = self.kwargs['username']
#         return ElaborationSettings.objects.filter(user=user)


# ------------------------- Elaboration Settings --------------------------------------------------
@method_decorator(login_required, name='dispatch')
class ElaborationSettingsGroupByUserAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    queryset = ElaborationSettingsGroup.objects.all()
    serializer_class = ElaborationSettingsGroupSerialiser
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    def get_queryset(self):
        # user = self.kwargs['username']
        user = self.request.user
        if user.is_superuser:
            return ElaborationSettingsGroup.objects.filter()
        else:
            return ElaborationSettingsGroup.objects.filter(user=user)

@method_decorator(login_required, name='dispatch')
class ElaborationSettingsAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    queryset = ElaborationSettings.objects.all()
    serializer_class = ElaborationSettingsSerialiser
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,permissions.IsAdminUser]


@method_decorator(login_required, name='dispatch')
class ElaborationSettingsByGroupAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    queryset = ElaborationSettings.objects.all()
    serializer_class = ElaborationSettingsSerialiser
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    def get_queryset(self):
        # elaboration_settings_group = self.kwargs['elaboration_settings_group']
        elaboration_settings_group = self.request.query_params.get('elaboration_settings_group')
        user = self.request.user
        if user.is_superuser:
            return ElaborationSettings.objects.filter(elaboration_settings_group_id=int(elaboration_settings_group))
        else:
            return ElaborationSettings.objects.filter(user=user,elaboration_settings_group_id=int(elaboration_settings_group))

# TODO: create the authentication and permission

@method_decorator(login_required, name='dispatch')
class ElaborationSettingsByUserAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    queryset = ElaborationSettings.objects.all()
    serializer_class = ElaborationSettingsSerialiser
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    def get_queryset(self):
        # user = self.kwargs['username']
        user = self.request.user
        if user.is_superuser:
            return ElaborationSettings.objects.filter()
        else:
            return ElaborationSettings.objects.filter(user=user)


# ------------------------- LISTDB --------------------------------------------------
@method_decorator(login_required, name='dispatch')
class ListDBAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    queryset = ListDB.objects.all()
    serializer_class = ListDBSerialiser
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

@method_decorator(login_required, name='dispatch')
class ListDBValueAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    form_class = ListValuesDB
    queryset = ListValuesDB.objects.all()
    serializer_class = ListValuesDBSerialiser
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication, ]
    permission_classes = [permissions.IsAuthenticated,]


@method_decorator(login_required, name='dispatch')
class ListDBValueCreateAPIView(LoginRequiredMixin,generics.CreateAPIView):
    lookup_field = 'pk'
    queryset = ListValuesDB.objects.all()
    form_class = ListValuesDB
    serializer_class = ListValuesDBSerialiser
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]

@method_decorator(login_required, name='dispatch')
class ListDBByUserAPIView(LoginRequiredMixin,generics.ListAPIView):
    lookup_field = 'pk'
    serializer_class = ListDBSerialiser
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication, ]
    permission_classes = [permissions.IsAuthenticated, ]
    def get_queryset(self):
        # user = self.kwargs['username']
        user = self.request.user
        if user.is_superuser:
            return ListDB.objects.filter()
        else:
            return ListDB.objects.filter(user=user)

# post the user, desription and file excel to the DB and
# convert the file in json with the same name and save it in the
# same directory
@method_decorator(login_required, name='dispatch')
class ListDBCreateListAPIView(LoginRequiredMixin,generics.CreateAPIView):
    lookup_field = 'pk'
    form_class = ListDBCreateForm
    # queryset = ListValuesDB.objects.all()
    serializer_class = ListDBSerialiser
    columns = serializer_class.Meta.fields
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    temp_file_name = ''

    parser_classes = (MultiPartParser, JSONParser, FileUploadParser, FormParser)



    def post(self, request, *args, **kwargs):

        # intercept the post in order to operate on the saved file
        # after posting the request
        # TODO: re engineering of the function extract the file elaboration from
        # TODO: the post

        try:

            input_file = request.FILES['document_input']
            wb = xlrd.open_workbook(filename=None, file_contents=input_file.read())
            sh = wb.sheet_by_index(0)
            file_columns = []

            for rowvalue in range(0, sh.row(0).__len__()):
                file_columns.append(sh.row(0)[rowvalue].value)

            if (file_columns != GROUPING_COLUMNS):
                raise()

            data_list = []

            for rownum in range(1, sh.nrows):
                dict = {}
                for rowvalue in range(0, sh.row(rownum).__len__()):
                    dict[sh.row(0)[rowvalue].value] = sh.row(rownum)[rowvalue].value
                data_list.append(dict)
            data = {'list_value':{'value':'name1'}}
            # kwargs['list_value'] = data
            # request.data['list_value'] = data
            obj = self.create(request, *args, **kwargs)
            return obj

        except:
            print("Error: File Format issues")
    # to read only the first column as list



    def perform_create(self, serializer):

        serializer.save()


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