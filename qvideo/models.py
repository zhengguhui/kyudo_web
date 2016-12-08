from django.db import models
from datetime import datetime, date, time
import hashlib
import json
from qauthority.models import User
from qfile.models import File


VIDEO_STATE_VALID = 0
VIDEO_STATE_INVALID = 1

class Video(models.Model):
	# for all the documentations!!
	title = models.CharField(max_length = 20) # article title
	date = models.DateField()
	modify = models.DateField()
	path = models.CharField(max_length = 100) # article path
	content = models.TextField() # the wiki body
	edit_level = models.IntegerField() # the level need to edit this page
	view_level = models.IntegerField() # the level need to read this page
	owner = models.ForeignKey(User) # owner id
	state = models.IntegerField()
	files = models.ManyToManyField(File)



	@staticmethod
	def get_all(session):
		user_level = User.get_level_session(session)
		videos = Video.objects.filter(view_level__gte = user_level, state = VIDEO_STATE_VALID).order_by('-date')
		return videos

	@staticmethod
	def get_video_path(path):
		videos = Video.objects.filter(path = path, state = VIDEO_STATE_VALID)
		if len(videos) > 0: video = videos[0]
		else: video = None
		return video
	
	@staticmethod
	def create_check(session):
		if ("level" not in session):
			return False
		if (session['level'] > User.get_admin_level()):
			return False
		return True

	def read_check(self, session):
		user_level = User.get_level_session(session)
		if (user_level > self.view_level):
			return False
		return True

	@staticmethod
	def try_save(data, path, session, video):
		user = User.get_user_session(session)
		if user is None:
			return (False, "please login first")
		
		if user.access_level > 1:
			return (False, "you have no authority to write video")
		new_video = Video(
			title = data['title'],
			date = datetime.strptime (data['date'], '%Y-%m-%d'),
			modify = datetime.now(),
			path = path,
			content = data['content'],
			edit_level = user.access_level,
			view_level = data['level'],
			owner = user,
			state = VIDEO_STATE_VALID,
			)
		file_list = []
		for file_src in json.loads(data['files']):
			print file_src
			files = File.objects.filter(src = file_src)
			if len(files) != 0:
				file_list.append(files[0])
				print "add"
		new_video.save()
		for fil in file_list:
			print fil.path
			new_video.files.add(fil)
		print len(video.files.all())
		if video is not None:
			video.state = VIDEO_STATE_INVALID
			video.save()
		return (True, "success")
