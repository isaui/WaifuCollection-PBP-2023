from django.shortcuts import render, redirect
from .models import Item
from django.http import HttpResponse
from django.core import serializers

def create_card(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        amount = request.POST.get('amount')
        description = request.POST.get('description')
        strength = request.POST.get('strength')
        speed = request.POST.get('speed')
        potential = request.POST.get('potential')
        intelligence = request.POST.get('intelligence')
        endurance = request.POST.get('endurance')
        height = request.POST.get('height')
        weight = request.POST.get('weight')
        item = Item(
            name=name,
            amount=amount,
            description=description,
            strength=strength,
            speed=speed,
            potential=potential,
            intelligence=intelligence,
            endurance=endurance,
            height=height,
            weight=weight,
        )
        item.save()
        return redirect('main:home')

    return render(request, "addCard.html",{})
# Create your views here.
def home(request):
    waifus = Item.objects.all()
    card_total = 0
    for waifu in waifus:
        card_total += waifu.amount
    return render(request, "home.html", {'waifus': waifus, 'total':card_total})

def show_xml_by_id(request, id):
    data = Item.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")
def show_json_by_id(request, id):
    data = Item.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")
def show_json(request):
    data = Item.objects.all()
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")
def show_xml(request):
    data = Item.objects.all()
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")