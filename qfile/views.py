from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from wsgiref.util import FileWrapper
import re
import os
from mysite import settings
from qblog.models import Blog, Tag
from qauthority.models import User
from qfile.models import File

# Create your views here.


def upload(request):
    if request.method == 'POST':
        dir = File.try_save(request.POST, request.FILES['file'], request.session)
        return HttpResponse('Your file path is<br><a href="%s">%s</a><br>It can be directly pasted in a wiki link.' % (dir, dir) )
    context = {'site': settings.SITE, 'session': request.session}
    return render(request, 'file/upload.html', context)

def download(request):
    path = "%s%s" % (settings.FILE_DIR, re.match('.*/([^/]*)$', request.path).group(1))
    

    print path
    fil = File.show_file_path(path, request.session)

    if (fil is None) :
        return HttpResponse('file not exist')
    response = HttpResponse()
    response['Content-Length'] = os.path.getsize('./' + path)
    response['X-Accel-Redirect'] = path
    print response['X-Accel-Redirect']
    return response


def list(request):
    files = File.get_all(request.session)
    context = {'file_dir':settings.FILE_DIR, 'site': settings.SITE, 'session': request.session, 'files': files}
    return render(request, 'file/list.html', context)
