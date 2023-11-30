from django.shortcuts import render, HttpResponse
from myapp.models import PlayingCard, User
from myapp.serializers import PlayingCardSerializer, UserSerializer

from rest_framework import generics, status
from rest_framework.response import Response

# Create your views here.
def home(request):
    return HttpResponse("hello world!")

def playingcards(request):
    cards = PlayingCard.objects.all()
    # return render(request, "base.html", {"playingcards": cards})
    return HttpResponse("playing cards!")

class PlayingCardList(generics.ListAPIView):
    queryset = PlayingCard.objects.all()
    serializer_class = PlayingCardSerializer

class PlayingCardCreate(generics.CreateAPIView):
    queryset = PlayingCard.objects.all()
    serializer_class = PlayingCardSerializer

class UserList(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
