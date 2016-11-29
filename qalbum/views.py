from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from qalbum.models import Album
from mysite import settings
import re

# Create your views here.

def list(request):
	print "xxxxx"
	albums = Album.get_all(request.session)
	print len(albums)
	context = {'site': settings.SITE, 'session': request.session, 'albums' : albums}
	return render(request, 'album/list.html', context)

def album(request):
	path = request.path#.match('.*/([^/]*)$', request.path).group(1)
	if path == '':
		return HttpResponseRedirect('/')
	album = Album.get_album_path(path)
	if request.method == 'POST':
		(ret, message) = Album.try_save(request.POST, path, request.session, album)
		return HttpResponse(message)
	if album is None:
		if (not Album.create_check(request.session)):
			return HttpResponse('album not exist')
		if 'edit' in request.GET:
			return edit_album(request, album)
		return HttpResponseRedirect(path + '?edit=');
	else :
		if 'edit' in request.GET:
			return edit_album(request, album)
		return show_album(request, album)

def edit_album(request, album):
	context = {'site': settings.SITE, 'session': request.session, 'album':album}
	return render(request, 'album/album_edit.html', context)

def show_album(request, album):
	if (not album.read_check(request.session)):
		return HttpResponse('album not exist')
	context = {'site': settings.SITE, 'session': request.session, 'album': album}
	return render(request, 'album/album.html', context)
