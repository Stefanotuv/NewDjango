__author__ = "stefanotuv"

from rest_framework import serializers
from blog.models import Post

class BlogPostSerialiser(serializers.Serializer):
    class Meta:
        model = Post
        fields = ("title","content","author", "date_posted")
        read_only_fields = ["author", "date_posted"]

    pass