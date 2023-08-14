from django.urls import path

from checkdb import views

urlpatterns = [
    #path('c_userinfo',views.c_userinfo),
    path('get_userinfo',views.get_useinfo),
    path('cxbind',views.cxbind),
    path('gobind',views.gobind),
    path('gounbind',views.gounbind),
    path('cxstudent',views.cxstudent)
]