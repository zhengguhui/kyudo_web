from django.urls import re_path

from qfile import views

urlpatterns = [
    re_path('^upload', views.upload, name='index'),
    re_path('^list', views.list, name='index'),
    re_path('^', views.download, name='index'),
]
