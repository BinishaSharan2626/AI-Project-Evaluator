from django.urls import path
from . import views

urlpatterns = [
    path('auth/signup', views.signup, name='api_signup'),
    path('auth/login', views.login, name='api_login'),
    path('projects/submit', views.submit_project, name='api_submit_project'),
    path('projects/history', views.get_user_evaluations, name='api_get_user_evaluations'),
    path('evaluations/<int:evaluation_id>', views.get_evaluation, name='api_get_evaluation'),
    path('admin/stats', views.get_admin_stats, name='api_admin_stats'),
    path('admin/evaluations/<int:evaluation_id>/delete', views.delete_evaluation, name='api_delete_evaluation'),
    path('admin/projects/<int:project_id>/delete', views.delete_project, name='api_delete_project'),
]
