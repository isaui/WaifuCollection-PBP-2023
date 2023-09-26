from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name= models.CharField(max_length=255)
    amount= models.IntegerField(validators=[MinValueValidator(0)])
    description=models.TextField()
    strength = models.PositiveIntegerField()
    speed = models.PositiveIntegerField() 
    potential = models.PositiveIntegerField() 
    intelligence = models.PositiveIntegerField() 
    endurance = models.PositiveIntegerField() 
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)


