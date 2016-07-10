from django.conf.urls import patterns, url

from qblog import views
from mysite import ajax

urlpatterns = patterns('',
    url(r'^ajax/loadTags', ajax.loadTags, name='index'),
    url(r'^ajax/markdown', ajax.markdown, name='index'),
    url(r'^blog/list/$', views.list, name='index'),
    url(r'^', views.blog, name='index'),
)
