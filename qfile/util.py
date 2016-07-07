#!/usr/bin/env python
from PIL import Image, ImageEnhance
import re


def reduce_opacity(im, opacity):
    """Returns an image with reduced opacity."""
    assert opacity >= 0 and opacity <= 1
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    else:
        im = im.copy()
    alpha = im.split()[3]
    alpha = ImageEnhance.Brightness(alpha).enhance(opacity)
    im.putalpha(alpha)
    return im

def waterMark(dir, settings):
    print dir
    print re.search(r'(\.[^.]+)$', dir).group(1)
    if (re.search(r'(\.[^.]+)$', dir).group(1) not in settings.WATER_TYPE):
    	print "type wrong"
    	return
    im = Image.open(dir)
    mark = reduce_opacity(Image.open(settings.WATER_DIR), settings.WATER_OPACITY)
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    layer = Image.new('RGBA', im.size, (0,0,0,0))
    scale = min(im.size[0] * settings.WATER_SCALE / mark.size[0], im.size[1] * settings.WATER_SCALE / mark.size[1])
    mark = mark.resize((int(mark.size[0] * scale), int(mark.size[1] * scale)))
    layer.paste(mark, (im.size[0] + settings.WATER_POS_0 - mark.size[0], im.size[1] + settings.WATER_POS_1 - mark.size[1]))
    Image.composite(layer, im, layer).save(dir)