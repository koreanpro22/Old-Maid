from django.db import models

# Create your models here.

class PlayingCard(models.Model):
        name = models.CharField(max_length=10)

