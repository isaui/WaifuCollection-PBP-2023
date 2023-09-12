from django.shortcuts import render
from .models import Item

# Create your views here.
def home(request):
    waifu = Item(
        name="Keqing",
        amount=10,  # Jumlah, pastikan >= 0
        description="Cakep Banget Sumpah Maukah Keqing jadi Istriku?",
        strength=80,
        speed=90,
        potential=85,
        intelligence=75,
        endurance=70,
        height=160.5,  # Tinggi dalam cm
        weight=48.5    # Berat dalam kg
    )
    return render(request, "home.html", {'data': waifu})

