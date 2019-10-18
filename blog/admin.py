from django.contrib import admin
from .models import Post

# Register your models here.

class PostModelAdmin(admin.ModelAdmin):
    list_display = ["title","updated","date_posted"]
    list_display_links = ["updated","date_posted"]
    list_filter = ["updated","date_posted"]
    list_editable = ["title"]

    search_fields = ["title","content"]
    class Meta:
        model = Post

admin.site.register(Post,PostModelAdmin)