from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
import re
import json
from qblog.templatetags.blog_filter import mark_down
from qblog.models import User, Blog, Tag
from mysite import settings
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

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
	return HttpResponse(mark_down(request.POST['content'], request.session))




def sendMail(request):
	my_sender='zhenggushanghai@gmail.com' 
	my_user='zhenggushanghai@gmail.com' 
	def mail():
		ret=True
		try:
			msg=MIMEText('test','plain','utf-8')
			msg['From']=formataddr([settings.SITE['owner'],my_sender])	
			msg['To']=formataddr(["x",my_user])	
			msg['Subject']="y" 
			server=smtplib.SMTP("smtp.gmail.com",465) 
			server.login(my_sender,"wyyxbnygyg") 
			server.sendmail(my_sender,[my_user,],msg.as_string())
			server.quit()
		except Exception, e:
			ret=False
			print e
		return ret
	ret=mail()
	if ret:
		return HttpResponse('success')
	else:
		HttpResponse("failed") 


