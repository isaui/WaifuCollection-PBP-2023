from django.forms import ModelForm
from main.models import Item
class ProductForm(ModelForm):
    class Meta:
        model = Item
        fields= ["name", "amount", "description", "strength", "speed", "potential",
                 "intelligence", "endurance", "height", "weight"]