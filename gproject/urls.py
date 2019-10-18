__author__ = "stefanotuv"

from django.urls import path
from .views import ElaborationListView

urlpatterns = [
    path('grouping/', ElaborationListView.as_view(),name='grouping-home'),

]