#!/usr/bin/env python
#!-*-coding:utf-8 -*-

import urllib
import urllib2
import re
import json
from pyquery import PyQuery



SHOP_SITE = 'kyudogu.jp/shop/\d+.html'
CLUB_SITE = 'http://kyudogu.jp/about'
MAP_SITE = 'http://maps.googleapis.com/maps/api/geocode/json'
MAP_KEY = "AIzaSyC4pjZiOjwCzzgR_FjdqMxXyE7JmrW5I6k"


def getShopInfo(site):
	f = urllib.urlopen(site)
	site = ''.join(f.readlines())
	jq = PyQuery(site)

	shopInfo = {'name': jq('.rightBox h3').text()}
	for p in jq('.shopInfo p').items():
		shopInfo[p.attr('class')] = re.sub(r' +', ' ', p.text())

	print shopInfo['address'].encode('utf-8')
	data = urllib.urlencode({'address': shopInfo['address'].encode('utf-8'), 'key' : MAP_KEY})
	print data
	f = urllib2.urlopen(MAP_SITE, data)
	site = ''.join(f.readlines())
	print site
	return shopInfo

def getShopList():
	f = urllib.urlopen(CLUB_SITE)
	site = ''.join(f.readlines())
	return re.findall(SHOP_SITE, site)

#print getShopInfo('http://kyudogu.jp/shop/1886.html')




shopList = getShopList()
shopInfos = []
i = 0
for shopUrl in shopList:
	i += 1
	if (i == 2): break
	shopInfo = getShopInfo('http://' + shopUrl)
	shopInfos.append(shopInfo)
print json.dumps(shopInfos, indent=4, sort_keys=True, ensure_ascii=False).encode('utf-8')