#!-*-coding:utf-8 -*-
from django.http import HttpResponseRedirect, HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import render
import re
import json
from qblog.templatetags.blog_filter import mark_down
from qblog.models import User, Blog, Tag
from mysite import settings
import smtplib
from email.utils import formataddr
import email.mime.text  
import traceback

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
	try:
		smtp = smtplib.SMTP()  
		#print 'connecting ...'  
		smtp.set_debuglevel(1)  
		if  settings.SITE['stmp_tls']:
		    smtp.starttls()  
		try:  
		    #print 'loginning ...'  
		    smtp.login(settings.SITE['email_send'],settings.SITE['email_pwd'])  
		except:  
		    1#print 'LOGIN ERROR ****'  
		msg = email.mime.text.MIMEText(request.POST['content'], _charset='utf-8')
		msg['From'] = settings.SITE['email_send']  
		msg['To'] = settings.SITE['email']
		msg['Subject']=settings.SITE['email_subject']
		smtp.sendmail(settings.SITE['email_send'],settings.SITE['email'],msg.as_string())  
		smtp.quit()  
		return HttpResponse('success')
	except Exception as e:
		exstr = traceback.format_exc()
		#print exstr
		return HttpResponse("failed")



