__author__ = "stefanotuv"

from django.conf.urls import url
from django.urls import path
from api import views
from django.urls.conf import include

from .views import ElaborationListAPIView, ElaborationCreateAPIView, ElaborationGetDataFromFile, \
    ElaborationSettingsAPIView, ElaborationListColAPIView, ListDBAPIView, \
    ElaborationSettingsByUserAPIView, ListDBByUserAPIView, ElaborationSettingsGroupByUserAPIView, \
    ElaborationSettingsByGroupAPIView,ListDBCreateListAPIView,ListDBValueAPIView,ListDBValueCreateAPIView
    # , TableColumnsAPIView

urlpatterns = [
    # get all data
    path('elaborations/all', ElaborationListAPIView.as_view(),name='elaborations-all'),

    # get all column names
    path('elaborations/col', ElaborationListColAPIView.as_view(),name='elaborations-col'),

    path('elaborations/all_', views.tableColumnsAPIView,name='elaborations-all-'),

    # post data
    path('elaborations/add', ElaborationCreateAPIView.as_view(),name='elaborations-add'),

    # post data
    path('elaborations/list/add', ListDBCreateListAPIView.as_view(), name='elaborations-list-add'),

    # post data
    path('elaborations/list/value', ListDBValueAPIView.as_view(), name='elaborations-list-value'),

    # post data
    path('elaborations/list/value/add', ListDBValueCreateAPIView.as_view(), name='elaborations-list-value-add'),

    # get data - not in use
    path('elaborations/file/<filename>',ElaborationGetDataFromFile.as_view(),name='elaboration-data'),

    # read t
    path('elaborations/settings',ElaborationSettingsAPIView.as_view(),name='elaboration-settings'),

    # read
    path('elaborations/settings-lists', ListDBAPIView.as_view(), name='elaboration-settings-lists'),

    # read
    path('elaborations/settings/<username>',ElaborationSettingsByUserAPIView.as_view(),name='elaboration-settings-by-user'),

    # read
    path('elaborations/settings-lists', ListDBAPIView.as_view(), name='elaboration-settings-lists'),

    # read
    path('elaborations/settings-lists/user', ListDBByUserAPIView.as_view(), name='elaboration-settings-lists-user'),

    # read
    path('elaborations/settings-lists/group/', ElaborationSettingsByGroupAPIView.as_view(), name='elaboration-settings-lists-group'),

    # read
    path('elaborations/settings-group/user', ElaborationSettingsGroupByUserAPIView.as_view(), name='elaboration-settings-group'),

    # read the json setting file for the user
    path('auth',include('rest_framework.urls')),


]
