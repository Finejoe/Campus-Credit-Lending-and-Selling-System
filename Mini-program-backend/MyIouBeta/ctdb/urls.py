from django.urls import path

from ctdb import views

urlpatterns = [
    path('upload',views.upload_view),
    path('viewiou1',views.view1_iou),
    path('viewiou2',views.view2_iou)
]