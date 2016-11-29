from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from qblog.models import Blog
from mysite import settings
import re

# Create your views here.




def list(request):
	blogs = Blog.get_all(request.session)
	context = {'file_dir':settings.FILE_DIR, 'site': settings.SITE, 'session': request.session, 'blogs': blogs}
	return render(request, 'blog/list.html', context)

def blog(request):
	path = request.path#re.match('.*/([^/]*)$', request.path).group(1)
	if path == '':
		return HttpResponseRedirect('/')
	blog = Blog.get_blog_path(path)
	if request.method == 'POST':
		(ret, message) = Blog.try_save(request.POST, path, request.session, blog)
		return HttpResponse(message)
	
	if blog is None:
		if (not Blog.create_check(request.session)):
			return HttpResponse('blog not exist')
		if 'edit' in request.GET:
			return edit_blog(request, blog)
		return HttpResponseRedirect(path + '?edit=');
	else :
		if 'edit' in request.GET:
			return edit_blog(request, blog)
		return show_blog(request, blog)


def edit_blog(request, blog):
	context = {'site': settings.SITE, 'session': request.session, 'blog':blog}
	return render(request, 'blog/blog_edit.html', context)

def show_blog(request, blog):
	if (not blog.read_check(request.session)):
		return HttpResponse('blog not exist')
	context = {'site': settings.SITE, 'session': request.session, 'blog': blog}
	return render(request, 'blog/blog.html', context)

