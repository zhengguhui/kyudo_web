from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from qvideo.models import Video
from mysite import settings
import re

# Create your views here.

def list(request):
	videos = Video.get_all(request.session)
	context = {'site': settings.SITE, 'session': request.session, 'videos' : videos}
	return render(request, 'video/list.html', context)

def video(request):
	path = request.path#.match('.*/([^/]*)$', request.path).group(1)
	if path == '':
		return HttpResponseRedirect('/')
	video = Video.get_video_path(path)
	if request.method == 'POST':
		(ret, message) = Video.try_save(request.POST, path, request.session, video)
		return HttpResponse(message)
	if video is None:
		if (not Video.create_check(request.session)):
			return HttpResponse('video not exist')
		if 'edit' in request.GET:
			return edit_video(request, video)
		return HttpResponseRedirect(path + '?edit=');
	else :
		if 'edit' in request.GET:
			return edit_video(request, video)
		return show_video(request, video)

def edit_video(request, video):
	context = {'site': settings.SITE, 'session': request.session, 'video':video}
	return render(request, 'video/video_edit.html', context)

def show_video(request, video):
	if (not video.read_check(request.session)):
		return HttpResponse('video not exist')
	context = {'site': settings.SITE, 'session': request.session, 'video': video}
	return render(request, 'video/video.html', context)
