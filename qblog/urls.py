from django.conf.urls import patterns, url

from qblog import views

urlpatterns = patterns('',
    url(r'^blog/list/$', views.list, name='index'),
    url(r'^', views.blog, name='index'),
)
