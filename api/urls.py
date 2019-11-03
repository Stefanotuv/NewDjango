__author__ = "stefanotuv"

from django.conf.urls import url
from django.urls import path
from api import views

from .views import ElaborationListAPIView, ElaborationCreateAPIView
    # , TableColumnsAPIView

urlpatterns = [
    # get data
    path('elaborations/all', ElaborationListAPIView.as_view(),name='elaborations-all'),
    path('elaborations/all_', views.tableColumnsAPIView,name='elaborations-all-'),

    # post data
    path('elaborations/add', ElaborationCreateAPIView.as_view(),name='elaborations-add'),

]
