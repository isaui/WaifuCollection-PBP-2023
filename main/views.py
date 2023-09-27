from django.shortcuts import render, redirect
from .models import Item
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages  
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import datetime
from django.urls import reverse


@login_required(login_url='/main/login')
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
            user=request.user
        )
        item.save()
        return redirect('main:home')

    return render(request, "addCard.html",{})
# Create your views here.

def calculate_rank(strength, speed, intelligence, potential, endurance):
    # Menghitung nilai total stats
    total_stats = (strength + speed + intelligence + potential + endurance) / 5

    # Menentukan kisaran rank berdasarkan total stats
    if total_stats >= 90:
        return 'S'
    elif total_stats >= 80:
        return 'A'
    elif total_stats >= 70:
        return 'B'
    elif total_stats >= 60:
        return 'C'
    elif total_stats >= 50:
        return 'D'
    else:
        return 'E'

@login_required(login_url='/main/login')
def home(request):
    waifus = Item.objects.filter(user=request.user)
    user = request.user
    card_total = 0
    last_login = request.COOKIES.get('last_login', 'Tidak ada data')
    for waifu in waifus:
        card_total += waifu.amount
    return render(request, "home.html", {'waifus': waifus, 'username': user.username, 'total':card_total, 'last_login': last_login,})



def register(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        print(form.is_valid())
        
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:login')
    context = {'form': form}
    return render(request, 'register.html', context)

def changeAmount(request):
    if request.method == 'POST' :
        waifu_card_id = request.POST.get('waifu_card_id')
        quantity = request.POST.get('quantity')
        selected_waifu_card = Item.objects.get(id=waifu_card_id)
        if selected_waifu_card is not None and quantity is not None:
            selected_waifu_card.amount += int(quantity)
            if selected_waifu_card.amount >=1:
                selected_waifu_card.save()
            else:
                selected_waifu_card.delete()

    return redirect('main:home')

def deleteCard(request):
    if request.method == 'POST':
        waifu_card_id = request.POST.get('waifu_card_id')
        selected_waifu_card = Item.objects.get(id=waifu_card_id)
        if selected_waifu_card is not None:
            selected_waifu_card.delete()
    return redirect('main:home')
def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = HttpResponseRedirect(reverse("main:home")) 
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response
        else:
            messages.info(request, 'Sorry, incorrect username or password. Please try again.')
    context = {}
    return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

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