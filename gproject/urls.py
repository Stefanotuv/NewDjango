__author__ = "stefanotuv"

from django.urls import path
from .views import ElaborationListView, GPHomeView,GPElaborationCreateView

urlpatterns = [
    # for testing
    path('grouping/', ElaborationListView.as_view(),name='grouping-home-test'),
    path('', GPHomeView.as_view(template_name = 'gproject/tables_elaboration_summary.html'),name='gproject-home'),
    path('new/', GPHomeView.as_view(template_name = 'gproject/elaboration.html'),name='gproject-new'),

    path('GP/new/',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration.html'),
         name='gproject-gp-new'),
    path('GP/wizard',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard.html'),
         name='gproject-gp-wizard'),
    path('GP/wizard_2',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard_2.html'),
         name='gproject-gp-wizard-2'),
    path('GP/wizard-table',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard_return_table.html'),
         name='gproject-gp-wizard-table')

    # path('GP/wizard2',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard_2.html'),
    #          name='gproject-gp-wizard2')

]