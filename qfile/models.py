from django.db import models
import hashlib, datetime, os
import re
from mysite import settings
from qauthority.models import User
from util import waterMark

FILE_STATE_VALID = 0
FILE_STATE_INVALID = 1

FILE_TYPE_PICTURE_MARK = 0
FILE_TYPE_PICTURE_UNMARK = 1

class File(models.Model):
	title = models.CharField(max_length = 20) 
	path = models.CharField(max_length = 100) 
	src = models.CharField(max_length = 100) 
	edit_level = models.IntegerField()
	view_level = models.IntegerField()
	typ = models.IntegerField()
	state = models.IntegerField()
	owner = models.ForeignKey(User,on_delete=models.CASCADE,) 
	date = models.DateTimeField()
	content = models.TextField()


	@staticmethod
	def show_file_path(path, session):
		files = File.objects.filter(path = path, state = FILE_STATE_VALID)


		if len(files) > 0: 
			fil = files[0]
		else:  
			return None

		user_level = User.get_level_session(session)


		
		if (user_level > fil.view_level):
			return None

		return fil


	@staticmethod
	def get_all(session):
		user_level = User.get_level_session(session)
		files = File.objects.filter(view_level__gte = user_level, state = FILE_STATE_VALID).order_by('-date')
		return files

	@staticmethod 
	def createPath(fil):
		exist = True
		name = ""
		m = re.search(r'(\.[^.]+)$', fil.name)
		while exist:	
			name = hashlib.sha224( "%s%s" % (name, str(datetime.datetime.now() ) ) ).hexdigest()
			if m is not None:
				name += m.group(1)
			exist = os.path.isfile("%s%s" % (settings.FILE_DIR, name)) 
		return name

	@staticmethod
	def try_save(data, fil, session):

		user = User.get_user_session(session)

		if user is None:
			return (None, "please login first")
		
		if user.access_level > 1:
			return (None, "you have no authority to upload files")

		name = File.createPath(fil)
		path = "%s%s" % (settings.FILE_DIR, name)
		src = "%s%s" % (settings.FILE_SRC, name)
		dest = open('./' + path, 'wb')
		for chunk in fil.chunks():
			dest.write(chunk)
		dest.close()
		fil = File(title = "%s_%s" % (data['title'], re.search(r'^([^.]+)', fil.name).group(0)) ,
			path = path,
			src = src,
			typ = data['type'],
			edit_level = user.access_level,
			view_level = data['level'],
			state = FILE_STATE_VALID,
			owner = user,
			date = datetime.datetime.now(),
			content = data['content'])
		fil.save() 
		if (data['type'] == ("%d" % FILE_TYPE_PICTURE_MARK)):
			waterMark('./' + path, settings)
		return fil
