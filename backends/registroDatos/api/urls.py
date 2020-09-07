from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views as authviews
from .views import Personas

urlpatterns = [
    path('api-auth/', authviews.obtain_auth_token),
    path('personas/', Personas.as_view(), name = 'personas')
]