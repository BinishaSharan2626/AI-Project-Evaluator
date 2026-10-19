from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('manager', 'Manager/Recruiter/TL'),
        ('developer', 'Developer'),
        ('admin', 'Administrator'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    file_path = models.FileField(upload_to='project_files/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Evaluation(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='evaluations')
    evaluator_role = models.CharField(max_length=50) # The perspective (e.g. Recruiter)
    total_score = models.FloatField(null=True, blank=True)
    evaluation_data = models.JSONField() # Store structured JSON from Gemini
    created_at = models.DateTimeField(auto_now_add=True)
