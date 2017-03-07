from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.views.generic import RedirectView
from mysite import settings
from mysite import views
from mysite import ajax
import os

urlpatterns = patterns('',
    url(r'^ajax/sendMail', ajax.sendMail, name='index'),
    url(r'^ajax/loadTags', ajax.loadTags, name='index'),
    url(r'^ajax/markdown', ajax.markdown, name='index'),
    url(r'^sitemap.xml', views.sitemap, name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^file/', include('qfile.urls')),
    url(r'^authority/', include('qauthority.urls')),
    url(r'^video/', include('qvideo.urls')),
    url(r'^album/', include('qalbum.urls')),
    url(r'^mail$', views.mail, name='index'),
    url(r'^map$', views.map, name='index'),
    url(r'^map_gen$', views.map_gen, name='index'),
    url(r'^$', RedirectView.as_view(url=settings.SITE['index'])),
    url(r'^', include('qblog.urls')),
)
