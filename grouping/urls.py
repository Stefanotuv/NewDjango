__author__ = "stefanotuv"

from django.urls import path
from .views import HomeGroupingView, TableAPIView,TableView

urlpatterns = [
    path('', HomeGroupingView.as_view(), name='grouping-home'),
    path('api/table/',TableAPIView.as_view(),name='grouping-api'),
    path('tables/',TableView.as_view(),name='grouping-table')
]