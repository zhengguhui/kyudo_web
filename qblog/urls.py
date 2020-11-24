from django.urls import re_path

from qblog import views

urlpatterns =[
    re_path('^blog/list/$', views.list, name='index'),
    re_path('^', views.blog, name='index'),
]
