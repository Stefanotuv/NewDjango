__author__ = "stefanotuv"

from django.urls import path
from .views import HomeGroupingView, TableAPIView,TableView, TablePostsAPIView, TablePostsView

urlpatterns = [
    path('', HomeGroupingView.as_view(), name='grouping-home'),

    path('api/table/',TableAPIView.as_view(),name='grouping-api-table'),
    path('api/table-posts/', TablePostsAPIView.as_view(), name='grouping-api-table-posts'),

    path('tables/',TableView.as_view(),name='grouping-table'),
    path('tables-posts/',TablePostsView.as_view(),name='grouping-table-posts'),
    path('simple-table/',TablePostsView.as_view(template_name="grouping/table_simple.html")),
    path('simple-table-ajax/',TablePostsView.as_view(template_name="grouping/table_simple_ajax.html")),
    path('dynamic-table-ajax/',TablePostsView.as_view(template_name="grouping/tables_dynamic_ajax.html"))
]