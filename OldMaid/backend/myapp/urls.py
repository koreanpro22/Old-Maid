from django.urls import path
from . import views

urlpatterns=[
    path("", views.home, name="home"),
    path('playingcards/', views.playingcards, name="playingcards"),
    path('api/playingcards', views.PlayingCardList.as_view())
    path('api/users', views.UserList.as_view())
]
