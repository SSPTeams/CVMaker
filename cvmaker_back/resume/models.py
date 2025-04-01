from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Skill(models.Model):
    SKILL_LEVELS = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Expert', 'Expert'),
    ]

    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=SKILL_LEVELS)
    resume = models.ForeignKey('Resume', on_delete=models.CASCADE, related_name='skills')

    def __str__(self):
        return f"{self.name} - {self.level}"

class Education(models.Model):
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    resume = models.ForeignKey('Resume', on_delete=models.CASCADE, related_name='education')

    def __str__(self):
        return f"{self.degree} at {self.institution}"

    class Meta:
        verbose_name_plural = "Education"

class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    resume = models.ForeignKey('Resume', on_delete=models.CASCADE, related_name='experience')

    def __str__(self):
        return f"{self.position} at {self.company}"

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=200)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.full_name}"

    class Meta:
        ordering = ['-updated_at']
