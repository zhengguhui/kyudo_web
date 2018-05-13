#!/usr/bin/env python
# -*- coding: utf-8 -*-
from pyquery import PyQuery
import json
from urllib import unquote
import urllib

def get_site(url):
	f = urllib.urlopen(url)
	site = ''.join(f.readlines())
	f.close()
	return site

if __name__=="__main__":
	d = get_site("http://kyudogu.jp/")
	jq = PyQuery(''.join(d))
	l = []
	for i in jq('dl').items():
		area = i('dt').text()
		#print area.endcode("utf-8")
		a = {
			"area":area,
			"county":[],
		}
		for j in i('li a').items():
			#print j.text()
			h = j.attr('href')
			print h.index('meta_value')
			h = h[h.index('meta_value=') + len('meta_value='):]
			h = unquote(h).decode('utf-8')
			#h = ""
			#print h.encode("utf-8")
			#h = json.dumps(h, encoding='utf-8', ensure_ascii=False).encode('gbk')
			print h 
			a["county"].append({
				"county" : h,
				"shop" : [],
			}
			)
		l.append(a)
	#print l
	shop = []
	for i in jq('.shop_name').items():
		href = i('a').attr('href')
		print href
		site = PyQuery(get_site(href))
		name = site('h2').text()
		location = site('.pankuzu').text().replace(' ', '').split('>')
		area = location[0]
		county = location[1]
		city = location[2]
		data = {
			"kyudogu" : href,
			"name" : name,
			"location":{
				"area" : area,
				"county" : county,
				"city" : city,
			},
		}
		for j in site('.shopInfo p').items():
			print j.attr('class'), ' '.join(j.text().split())
			data[j.attr('class')] = ' '.join(j.text().split())
		if 'address' in data:
			shop.append(data)
		print name, location
	out = file('kyudogu.py', "w")
	print >> out, "# -*- coding: utf-8 -*-"
	#print >> out, "area = " + json.dumps(l, indent=4, ensure_ascii=False)
	#print >> out, "shop = " + json.dumps(shop, indent=4, ensure_ascii=False)
	print >> out, "area = " + json.dumps(l, encoding='gbk', indent=4, ensure_ascii=False).encode('utf-8')
	print >> out, "shop = " + json.dumps(shop, encoding='gbk', indent=4, ensure_ascii=False).encode('utf-8')
	out.close()
	#print ''.join(d)
