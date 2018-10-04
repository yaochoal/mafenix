from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^comments/$', views.snippet_list),
    url(r'^comments/(?P<pk>[0-9]+)/$', views.snippet_detail),
    url(r'^search/$', views.snippet_query),
]
