from django.urls import path

from .views import home, create_card, show_json_by_id, show_xml_by_id, show_json, show_xml

app_name = 'main'
urlpatterns = [
    path('', home, name='home'), 
    path('addCard/', create_card, name='addCard'),
    path('json/', show_json, name='show_json'), 
    path('xml/', show_xml, name='show_xml'),
    path('xml/<int:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:id>/', show_json_by_id, name='show_json_by_id'),
  ]