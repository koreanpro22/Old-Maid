from django.shortcuts import render, HttpResponse
from .models import PlayingCard

# Create your views here.
def home(request):
    return HttpResponse("hello world!")

def playingcards(request):
    cards = PlayingCard.objects.all()
    # return render(request, "base.html", {"playingcards": cards})    
    return HttpResponse("playing cards!")
