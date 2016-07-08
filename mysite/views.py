from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
from mysite import settings
import re

# Create your views here.

def map(request):
	context = {'site': settings.SITE, 'session': request.session}
	return render(request, 'mysite/map.html', context)

def map_gen(request):
	context = {'site': settings.SITE, 'session': request.session}
	return render(request, 'mysite/map_gen.html', context)
