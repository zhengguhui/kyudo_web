 #!-*-coding:utf-8 -*-
from django import template
from qblog.models import Blog, Tag

import re
import markdown

register = template.Library()




@register.filter(name='markdown')
def mark_down(value, session):
	def blog_list(m):
		blogs = Blog.get_all(session)
		tag =  m.group(1)
		inner = m.group(2)
		print tag, inner
		info = []
		for blog in blogs:
			#print blog.content
			if (len(blog.tags.filter(value = m.group(1))) > 0):
				data = inner
				file = re.search('!\[(.*?)\]\((.*?)\)', blog.content).group(2)
				print file
				data = re.compile('%{path%}').sub(blog.path, data)
				data = re.compile('%{title%}').sub(blog.title, data)
				data = re.compile('%{file%}').sub(file, data)
				info.append(data)
				#print data


		return "".join(info)	
	#print value
	#blogs = Blog.get_all(session)
	#for blog in blogs:
	#	print blog.content
	#value = reg.compile('%{blog%}').sub(blog_list, value)
	#print value
	value = re.compile('%{blog:(.*?)%}(.*?)%{end%}', re.M | re.S).sub(blog_list, value)
	return markdown.markdown(value, extensions=['markdown.extensions.tables', 'markdown.extensions.extra'])

