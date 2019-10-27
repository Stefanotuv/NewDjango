from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from rest_framework import generics


from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)

# Create your views here.

# Dummy data

# posts = [
#     {
#         'author': 'Stefano',
#         'title': 'First Post',
#         'content': 'First Post Content',
#         'date_posted':'01 Jan 2019'
#     },
#     {
#         'author': 'Stefano',
#         'title': 'Second Post',
#         'content': 'Second Post Content',
#         'date_posted': '02 Jan 2019'
#     },
# ]

@login_required
def home(request):
    # return HttpResponse('<h1>BLOG HOME</h1>')
    context = {
        'title': 'FIRST',
        'posts': Post.objects.all()
        # include the filter for the post from the logged in user
    }
    return render(request, 'blog/home.html', context=context)

@login_required
def about(request):
    # return HttpResponse('<h1>BLOG ABOUT</h1>')
    return render(request, 'blog/about.html')

class PostListView(ListView):
    model = Post
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    ordering = ['-date_posted']
    paginate_by = 10

class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/post-details.html'
    context_object_name = 'post'


class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    template_name = 'blog/post_form.html'
    fields = ['title', 'content']
    context_object_name = 'post'

    def form_valid(self, form):
        # form.instance.author = self.request.user
        instance = form.save(commit=False)
        instance.user = self.request.user
        instance.save()
        return super().form_valid(form)



class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content']
    template_name = 'blog/post_form.html'
    context_object_name = 'post'
    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'
    template_name = 'blog/post_confirm_delete.html'
    context_object_name = 'post'
    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False