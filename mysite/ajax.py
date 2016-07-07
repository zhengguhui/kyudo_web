from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
import re
import json
from qblog.templatetags.blog_filter import mark_down
from qblog.models import User, Blog, Tag
from mysite import settings

def loadTags(request):
	tags = json.loads(request.GET['tags'])
	ret_tags = []
	for tag in Tag.objects.all():
		value = tag.value
		if value not in tags:
			ret_tags.append(value)
	return HttpResponse(json.dumps(ret_tags))

def markdown(request):
	return HttpResponse(mark_down(request.POST['content']))

