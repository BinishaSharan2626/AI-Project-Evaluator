from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('evaluator.urls')),
    # Serve the frontend
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('signup.html', TemplateView.as_view(template_name='signup.html'), name='signup'),
    path('forgot-password.html', TemplateView.as_view(template_name='forgot-password.html'), name='forgot-password'),
    path('submit-project.html', TemplateView.as_view(template_name='submit-project.html'), name='submit-project'),
    path('dashboard.html', TemplateView.as_view(template_name='dashboard.html'), name='dashboard'),
    path('evaluation-result.html', TemplateView.as_view(template_name='evaluation-result.html'), name='evaluation-result'),
    path('admin-dashboard.html', TemplateView.as_view(template_name='admin-dashboard.html'), name='admin-dashboard'),
    path('admin-login.html', TemplateView.as_view(template_name='admin-login.html'), name='admin-login'),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
