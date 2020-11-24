from django.urls import re_path

from qauthority import views

urlpatterns = [
    re_path('^logout', views.logout, name='index'),
    re_path('^login', views.login, name='index'),
    re_path('^register', views.register, name='index'),
]
