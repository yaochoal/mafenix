# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    service_id = models.IntegerField()
    service = models.CharField(blank=True, default='', max_length=200)
    comment = models.CharField(blank=True, default='', max_length=200)
    user_id = models.CharField(blank=True, default='', max_length=200)
    
    class Meta:
        ordering = ('created_at',)
