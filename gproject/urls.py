__author__ = "stefanotuv"

from django.urls import path
from .views import ElaborationListView, GprojectHomeView

urlpatterns = [
    # for testing
    path('grouping/', ElaborationListView.as_view(),name='grouping-home-test'),
    path('', GprojectHomeView.as_view(),name='gproject-home'),

]