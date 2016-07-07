from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from mysite import settings
from mysite import views
import os

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^file/', include('qfile.urls')),
    url(r'^authority/', include('qauthority.urls')),
    url(r'^video/', include('qvideo.urls')),
    url(r'^album/', include('qalbum.urls')),
    url(r'^map$', views.map, name='index'),
    url(r'^', include('qblog.urls')),
)