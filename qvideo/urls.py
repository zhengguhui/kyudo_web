from django.conf.urls import patterns, url

from qvideo import views

urlpatterns = patterns('',
    url(r'^list/$', views.list, name='index'),
    url(r'^', views.video, name='index'),
)
