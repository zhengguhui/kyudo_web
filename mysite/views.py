from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from mysite import settings
from qblog.models import Blog
from qvideo.models import Video
from qalbum.models import Album
import re

# Create your views here.


def mail(request):
	context = {'site': settings.SITE, 'session': request.session}
	return render(request, 'mysite/mail.html', context)


def map(request):
	blog = {'content':"""
%{blog:shop%}
> * <a href="%{path%}">%{title%}</a>%{end%}
"""}
	context = {'site': settings.SITE, 'session': request.session, 'blog' : blog}
	return render(request, 'mysite/map.html', context)

def map_gen(request):
	context = {'site': settings.SITE, 'session': request.session}
	return render(request, 'mysite/map_gen.html', context)

def index(request):
	blogs = Blog.get_all(request.session)
	context = {'site': settings.SITE, 'session': request.session, 'blogs' : blogs}
	return render(request, 'blog/archive.html', context)

def sitemap(request):
	blogs = Blog.get_all(request.session)
	videos = Video.get_all(request.session)
	albums = Album.get_all(request.session)
	context = {'file_dir':settings.FILE_DIR, 'site': settings.SITE, 'session': request.session, 'blogs': blogs, 'path':request.get_host(),
			'videos':videos, 'albums':albums}
	return render(request, 'mysite/sitemap.html', context)
	
