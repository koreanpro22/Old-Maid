from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from datetime import date

class User(AbstractUser):
  username = models.CharField(max_length = 20, blank = True, null = True, unique = True)
  email = models.EmailField(_('email address'), unique = True)
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
  def __str__(self):
      return "{}".format(self.email)