from django.db import models
from datetime import datetime, date, time
import hashlib
import json
from qauthority.models import User

BLOG_STATE_VALID = 0
BLOG_STATE_INVALID = 1

class Tag(models.Model):
	value = models.CharField(max_length = 20)

class Blog(models.Model):
	# for all the documentations!!
	title = models.CharField(max_length = 20) # article title
	date = models.DateField()
	modify = models.DateField()
	path = models.CharField(max_length = 100) # article path
	content = models.TextField() # the wiki body
	edit_level = models.IntegerField() # the level need to edit this page
	view_level = models.IntegerField() # the level need to read this page
	owner = models.ForeignKey(User,on_delete=models.CASCADE,) # owner id
	state = models.IntegerField()
	tags = models.ManyToManyField(Tag)


	

	@staticmethod
	def get_all(session):
		user_level = User.get_level_session(session)
		blogs = Blog.objects.filter(view_level__gte = user_level, state = BLOG_STATE_VALID).order_by('-date')
		return blogs

	@staticmethod
	def get_blog_path(path):
		blogs = Blog.objects.filter(path = path, state = BLOG_STATE_VALID)
		if len(blogs) > 0: blog = blogs[0]
		else: blog = None
		return blog
	
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
	def try_save(data, path, session, blog):
		user = User.get_user_session(session)

		if user is None:
			return (False, "please login first")
		
		if user.access_level > 1:
			return (False, "you have no authority to write blog")
		new_blog = Blog(
			title = data['title'],
			date = datetime.strptime (data['date'], '%Y-%m-%d'),
			modify = datetime.now(),
			path = path,
			content = data['content'],
			edit_level = user.access_level,
			view_level = data['level'],
			owner = user,
			state = BLOG_STATE_VALID,
			)
		tag_list = []
		for value in json.loads(data['tags']):
			tags = Tag.objects.filter(value = value)
			if len(tags) == 0:
				tag = Tag(value = value)
				tag.save()
			else: 
				tag = tags[0]
			tag_list.append(tag)
		new_blog.save()
		for tag in tag_list:
			new_blog.tags.add(tag)
		if blog is not None:
			blog.state = BLOG_STATE_INVALID
			blog.save()
		return (True, "success")
