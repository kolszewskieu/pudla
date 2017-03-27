from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
import profiles.urls
import accounts.urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^djangojs/', include('djangojs.urls')),
    #url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts/', include('authtools.urls')),
    url(r'^users/', include(profiles.urls, namespace='profiles')),
    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^calc/$', TemplateView.as_view(template_name='exampleapp/itworks.html'), name='calc'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),
    url(r'^', include(accounts.urls, namespace='accounts')),
]
