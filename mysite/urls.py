from django.contrib import admin
from django.urls import include, re_path
from django.views.generic import RedirectView
from mysite import settings
from mysite import views
from mysite import ajax
import os

urlpatterns = [
    re_path('^ajax/sendMail', ajax.sendMail, name='index'),
    re_path('^ajax/loadTags', ajax.loadTags, name='index'),
    re_path('^ajax/markdown', ajax.markdown, name='index'),
    re_path('^sitemap.xml', views.sitemap, name='index'),
    re_path('^admin/', admin.site.urls),
    re_path('^file/', include('qfile.urls')),
    re_path('^authority/', include('qauthority.urls')),
    re_path('^video/', include('qvideo.urls')),
    re_path('^album/', include('qalbum.urls')),
    re_path('^mail$', views.mail, name='index'),
    re_path('^map$', views.map, name='index'),
    re_path('^map_gen$', views.map_gen, name='index'),
    re_path('^$', RedirectView.as_view(url=settings.SITE['index'])),
    re_path('^', include('qblog.urls')),
]
