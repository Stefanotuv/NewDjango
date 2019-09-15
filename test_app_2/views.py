from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    # return HttpResponse("test 2")
    dic = {'test_var':'test 2 var with injection 2'}
    return render(request, 'test_app_2/index.html', context=dic)

def help(request):
    dic = {'help_var': 'this is the help page'}
    return render(request, 'test_app_2/help.html', context=dic)
