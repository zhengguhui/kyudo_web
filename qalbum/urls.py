from django.urls import re_path

from qalbum import views

urlpatterns = [
    re_path('^list/$', views.list, name='index'),
    re_path('^', views.album, name='index'),
]
