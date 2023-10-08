from django.urls import path

from .views import home,home_ajax,create_ajax ,create_card, show_json_by_id, show_xml_by_id, show_json, show_xml, register,changeAmount, deleteCard,login_user, logout_user

app_name = 'main'
urlpatterns = [
    path('', home, name='home'), 
    path('home_ajax/', home_ajax, name='home_ajax'),
    path('create_ajax/', create_ajax, name='create_ajax'),
    path('register/', register, name='register'), 
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name="logout"),
    path('deleteCard/', deleteCard, name="deleteCard"),
    path('changeAmount/', changeAmount, name="change_amount" ),
    path('addCard/', create_card, name='addCard'),
    path('json/', show_json, name='show_json'), 
    path('xml/', show_xml, name='show_xml'),
    path('xml/<int:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:id>/', show_json_by_id, name='show_json_by_id'),
  ]