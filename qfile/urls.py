from django.conf.urls import patterns, url

from qfile import views

urlpatterns = patterns('',
    url(r'^upload', views.upload, name='index'),
    url(r'^list', views.list, name='index'),
    url(r'^', views.download, name='index'),
)
