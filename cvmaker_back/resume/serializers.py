from rest_framework import serializers
from .models import Resume, Education, Experience, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'institution', 'degree', 'field', 'start_date', 'end_date']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'company', 'position', 'location', 'start_date', 'end_date', 'description']

class ResumeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'title', 'full_name', 'email', 'phone', 'location', 'summary', 
                 'created_at', 'updated_at', 'skills', 'education', 'experience']
        read_only_fields = ['created_at', 'updated_at']

class ResumeCreateSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    education = EducationSerializer(many=True)
    experience = ExperienceSerializer(many=True)

    class Meta:
        model = Resume
        fields = ['title', 'full_name', 'email', 'phone', 'location', 'summary', 
                 'skills', 'education', 'experience']

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        education_data = validated_data.pop('education', [])
        experience_data = validated_data.pop('experience', [])
        
        resume = Resume.objects.create(**validated_data)
        
        for skill_data in skills_data:
            Skill.objects.create(resume=resume, **skill_data)
            
        for edu_data in education_data:
            Education.objects.create(resume=resume, **edu_data)
            
        for exp_data in experience_data:
            Experience.objects.create(resume=resume, **exp_data)
            
        return resume 