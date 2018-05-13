#!/usr/bin/env python
# -*- coding: utf-8 -*-
from kyudogu import area, shop
from pygeocoder import Geocoder
import time
import json
if __name__=="__main__":
	#print area
	#print shop
	for s in shop:
		print s['name']
		print s['address']
		geo = Geocoder(api_key="AIzaSyCV2LhPPs_xQ5olb_gmqTq3oYPCXYgTMjQ")
		g = geo.geocode(s['address'])
		print g
		print g[0].coordinates
		(lat, lng) = g[0].coordinates
		s["location"]["lat"] = lat
		s["location"]["lng"] = lng
		time.sleep(1)
		#break
        out = file('geocoder.js', "w")
        print >> out, "# -*- coding: utf-8 -*-"
        print >> out, "var area = " + json.dumps(area, indent=4, ensure_ascii=False)
        print >> out, "var shop = " + json.dumps(shop, indent=4, ensure_ascii=False)
        out.close()
	
