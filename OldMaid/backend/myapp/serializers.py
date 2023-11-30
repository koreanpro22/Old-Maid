from rest_framework import serializers
from myapp.models import PlayingCard, User

class PlayingCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayingCard
        fields = ['name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username']
