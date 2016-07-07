
from django.db import models
from datetime import datetime, date, time
import hashlib
import json

from mysite import settings

# Create your models here.


class Invite(models.Model):
	code = models.CharField(max_length = 20)
	times = models.IntegerField() 
	comment = models.CharField(max_length = 100)
	level = models.IntegerField()



class User(models.Model):
	name = models.CharField(max_length = 20) # the unique user handle
	password = models.CharField(max_length = 20) # the digested password
	realname = models.CharField(max_length = 10) # real name
	email = models.CharField(max_length = 50) # email address
	access_level = models.IntegerField() # access powerx
	@staticmethod
	def try_save(data):
		fetch = User.objects.filter(name = data['name'])

		if (len(fetch) > 0):
			return (False, 'User already existed.')

		if (len(data['name']) < 3):
			return (False, 'User Id must longer than 3')

		if (len(data['password']) < 3):
			return (False, 'User Password must longer than 3')

		if data['password'] != data['password2']:
			return (False, 'Password not consistant!')

		invite = Invite.objects.filter(code = data['invite'], times__gt = 0)#
		
		if (len(invite) == 0):
			return (False, "invite code error")

		level = invite[0].level

		invite[0].times -= 1

		invite[0].save()

		user = User(
			name = data['name'],
			password = User.digest(data['password']),
			realname = data['realname'],
			email = data['email'],
			access_level = level)
		user.save()
		
		return (True, user)

	@staticmethod
	def digest(code):
		return hashlib.md5(code).hexdigest()[:20]

	@staticmethod
	def authenticate(data):
		name = data['name']
		password = data['password']
		found = User.objects.filter(name = name)
		if len(found) == 0:
			return (None, 'User not defined')
		elif found[0].password != User.digest(password):
			return (None, 'Password doesnot match')
		else:
			return (found[0], 'OK')

	@staticmethod
	def get_default_level():
		return settings.SITE['levels'][-1]['level']

	@staticmethod
	def get_admin_level():
		return settings.SITE['levels'][0]['level']

	@staticmethod
	def get_level_session(session):
		if ("level" in session):
			return session['level']
		else :
			return User.get_default_level()
			
	@staticmethod
	def get_user_session(session):
		if ('id' not in session):
			return None
		found = User.objects.filter(name = session['id'])
		if len(found) == 0:
			return None
		return found[0]
		

