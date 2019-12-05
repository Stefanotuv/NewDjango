__author__ = "stefanotuv"

from django.urls import path
from .views import ElaborationListView, GPHomeView,GPElaborationCreateView

urlpatterns = [
    # for testing
    path('grouping/', ElaborationListView.as_view(),name='grouping-home-test'),

    path('', GPHomeView.as_view(template_name ='gproject/OLD/tables_elaboration_summary.html'), name='gproject-home'),

    path('new/', GPHomeView.as_view(template_name = 'gproject/elaboration.html'),name='gproject-new'),

    path('GP/new/',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration.html'),
         name='gproject-gp-new'),
    path('GP/wizard', GPElaborationCreateView.as_view(template_name ='gproject/OLD/elaboration_wizard.html'),
         name='gproject-gp-wizard'),
    path('GP/wizard_new', GPElaborationCreateView.as_view(template_name='gproject/OLD/elaboration_wizard_new.html'),
         name='gproject-gp-wizard-new'),
    path('GP/wizard_new_2', GPElaborationCreateView.as_view(template_name='gproject/OLD/elaboration_wizard_new_2.html'),
         name='gproject-gp-wizard-new-2'),
    path('GP/wizard_new_3', GPElaborationCreateView.as_view(template_name='gproject/elaboration_wizard_new_3.html'),
         name='gproject-gp-wizard-new-3'),
    path('GP/wizard_new_4', GPElaborationCreateView.as_view(template_name='gproject/elaboration_wizard_new_4.html'),
         name='gproject-gp-wizard-new-4'),
    path('GP/wizard_2', GPElaborationCreateView.as_view(template_name ='gproject/OLD/elaboration_wizard_2.html'),
         name='gproject-gp-wizard-2'),
    path('GP/wizard-table',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard_return_table.html'),
         name='gproject-gp-wizard-table'),
    path('GP/elaboration_settings',
         GPElaborationCreateView.as_view(template_name='gproject/elaboration_settings.html'),
         name='gproject-gp-elaboration-settings'),
    path('GP/elaboration_settings_2',
         GPElaborationCreateView.as_view(template_name='gproject/elaboration_settings_2.html'),
         name='gproject-gp-elaboration-settings-2'),
    path('GP/elaboration_settings_new',
         GPElaborationCreateView.as_view(template_name='gproject/elaboration_settings_new.html'),
         name='gproject-gp-elaboration-settings-new'),
    path('GP/elaboration_settings_list_add',
         GPElaborationCreateView.as_view(template_name='gproject/elaboration_settings_list_add.html'),
         name='gproject-gp-elaboration-settings-list-add'),

    path('GP/home/',GPElaborationCreateView.as_view(template_name = 'gproject/home.html'),
         name='gproject-gp-home'),
    path('GP/home_new/', GPElaborationCreateView.as_view(template_name='gproject/home_new.html'),
         name='gproject-gp-home-new'),
    path('GP/home_new_2/', GPElaborationCreateView.as_view(template_name='gproject/home_new_2.html'),
         name='gproject-gp-home-new-2'),
    # path('GP/wizard2',GPElaborationCreateView.as_view(template_name = 'gproject/elaboration_wizard_2.html'),
    #          name='gproject-gp-wizard2')

]