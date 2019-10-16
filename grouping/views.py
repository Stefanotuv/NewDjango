from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from users.models import User
from blog.models import Post
from django.http import JsonResponse
# Create your views here.

class HomeGroupingView(View):
    template_name = 'grouping/index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name,{})

class TableView(View):
    template_name = 'grouping/tables_dynamic.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name,{})

class TableAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self,request, format=None):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)

class TablePostsAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    model = Post
    def get(self,request, format=None):
        # return a lists of posts
        posts = [post for post in Post.objects.all()]
        posts_dict_list =[post.to_dictionary() for post in posts]
        # return JsonResponse(posts_dict_list,safe=False)
        return Response(posts_dict_list)

class TablePostsView(View):
    model = Post
    template_name = 'grouping/tables_dynamic_back_end.html'
    def get(self,request, format=None):
        # return a lists of posts
        posts = [post for post in Post.objects.all()]
        posts_dict_list =[post.to_dictionary() for post in posts]
        # return Response(posts_dict_list)
        return render(request, self.template_name, {'dataAPI':posts_dict_list})
