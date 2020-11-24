from django.urls import re_path

from qvideo import views

urlpatterns = [
    re_path('^list/$', views.list, name='index'),
    re_path('^', views.video, name='index'),
]
