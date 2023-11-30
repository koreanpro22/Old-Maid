from django.db import models

# Create your models here.

class PlayingCard(models.Model):
        suit = models.CharField(max_length=20, default='')
        value = models.CharField(max_length=20, default='')
