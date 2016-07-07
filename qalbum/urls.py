from django.conf.urls import patterns, url

from qalbum import views

urlpatterns = patterns('',
    url(r'^list/$', views.list, name='index'),
    url(r'^', views.album, name='index'),
)
