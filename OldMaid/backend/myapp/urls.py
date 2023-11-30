from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path('playingcards/', views.playingcards, name="playingcards"),
    path('api/playingcards', views.PlayingCardList.as_view(), name="playingcard-list"),
    path('api/users', views.UserList.as_view(), name="user-list"),
    # Assuming PlayingCardCreate is a view
    path('api/createcard', views.PlayingCardCreate.as_view(), name="create-card"),
]
