from django.contrib import admin
from .models import Resume, Education, Experience, Skill

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'full_name', 'email', 'created_at', 'updated_at')
    search_fields = ('title', 'full_name', 'email')
    list_filter = ('created_at', 'updated_at')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('institution', 'degree', 'field', 'start_date', 'end_date')
    search_fields = ('institution', 'degree', 'field')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'location', 'start_date', 'end_date')
    search_fields = ('company', 'position', 'location')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level')
    list_filter = ('level',)
    search_fields = ('name',)
