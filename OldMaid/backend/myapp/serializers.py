from rest_framework import serializers
from myapp.models import PlayingCard

class PlayingCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayingCard
        fields = ['name']
