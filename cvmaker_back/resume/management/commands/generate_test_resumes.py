import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from resume.models import Resume, Skill, Education, Experience

User = get_user_model()

class Command(BaseCommand):
    help = 'Generate test resume data'

    def add_arguments(self, parser):
        parser.add_argument('--count', type=int, default=5, help='Number of test resumes to generate')
        parser.add_argument('--username', type=str, help='Username to assign resumes to (will be created if not exists)')

    def handle(self, *args, **options):
        count = options['count']
        username = options.get('username')

        # Create or get user
        if username:
            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    'email': f"{username}@example.com",
                    'first_name': username.title(),
                    'last_name': 'User'
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Created new user: {username}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Using existing user: {username}'))
        else:
            # If no username provided, get or create a test user
            user, created = User.objects.get_or_create(
                username='testuser',
                defaults={
                    'email': 'testuser@example.com',
                    'first_name': 'Test',
                    'last_name': 'User'
                }
            )
            if created:
                user.set_password('password123')
                user.save()
                self.stdout.write(self.style.SUCCESS('Created new user: testuser'))
            else:
                self.stdout.write(self.style.SUCCESS('Using existing user: testuser'))

        # Generate test resumes
        for i in range(count):
            # Create resume
            resume = Resume.objects.create(
                user=user,
                title=f"Test Resume {i+1}",
                full_name=f"{user.first_name} {user.last_name}",
                email=user.email,
                phone=f"+1 (555) {random.randint(100, 999)}-{random.randint(1000, 9999)}",
                location=random.choice(["New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX", "Seattle, WA"]),
                summary=f"Professional with {random.randint(1, 20)} years of experience in software development and project management. "
                        f"Skilled in Python, JavaScript, and database management. "
                        f"Looking for opportunities to leverage my technical and leadership skills.",
            )

            # Create skills
            skills = [
                ("Python", random.choice(["Intermediate", "Advanced", "Expert"])),
                ("JavaScript", random.choice(["Intermediate", "Advanced", "Expert"])),
                ("React", random.choice(["Beginner", "Intermediate", "Advanced"])),
                ("Django", random.choice(["Beginner", "Intermediate", "Advanced", "Expert"])),
                ("SQL", random.choice(["Intermediate", "Advanced"])),
                ("AWS", random.choice(["Beginner", "Intermediate", "Advanced"])),
                ("Docker", random.choice(["Beginner", "Intermediate", "Advanced"])),
                ("Git", random.choice(["Intermediate", "Advanced", "Expert"])),
                ("HTML/CSS", random.choice(["Intermediate", "Advanced", "Expert"])),
                ("TypeScript", random.choice(["Beginner", "Intermediate", "Advanced"])),
            ]
            
            # Add random selection of skills
            skill_count = random.randint(4, 8)
            selected_skills = random.sample(skills, skill_count)
            
            for skill_name, skill_level in selected_skills:
                Skill.objects.create(
                    resume=resume,
                    name=skill_name,
                    level=skill_level
                )

            # Create education entries
            education_institutions = [
                ("Stanford University", "Bachelor of Science", "Computer Science"),
                ("MIT", "Master of Science", "Artificial Intelligence"),
                ("Harvard University", "Bachelor of Arts", "Business Administration"),
                ("UC Berkeley", "Bachelor of Science", "Data Science"),
                ("Carnegie Mellon", "Master of Science", "Computer Engineering"),
                ("Georgia Tech", "Bachelor of Science", "Information Technology"),
                ("University of Washington", "Master of Science", "Software Engineering"),
            ]
            
            # Add 1-2 education entries
            edu_count = random.randint(1, 2)
            selected_edu = random.sample(education_institutions, edu_count)
            
            for institution, degree, field in selected_edu:
                # Generate random dates
                end_year = datetime.now().year - random.randint(0, 10)
                end_date = datetime(end_year, random.randint(1, 12), random.randint(1, 28))
                start_date = end_date - timedelta(days=random.randint(365*2, 365*6))  # 2-6 years of education
                
                Education.objects.create(
                    resume=resume,
                    institution=institution,
                    degree=degree,
                    field=field,
                    start_date=start_date,
                    end_date=end_date
                )

            # Create experience entries
            experience_entries = [
                ("Google", "Senior Software Engineer", "Mountain View, CA", 
                 "Led a team of 5 engineers to develop and launch new features. "
                 "Improved system performance by 30%. "
                 "Collaborated with product managers to define product requirements."),
                ("Microsoft", "Software Developer", "Redmond, WA", 
                 "Developed new features for Microsoft Office. "
                 "Fixed critical bugs and improved system stability. "
                 "Participated in code reviews and knowledge sharing."),
                ("Amazon", "Full Stack Developer", "Seattle, WA", 
                 "Built RESTful APIs and microservices for the e-commerce platform. "
                 "Implemented responsive UI using React. "
                 "Worked in an Agile environment with daily stand-ups and sprint planning."),
                ("Facebook", "Frontend Engineer", "Menlo Park, CA", 
                 "Designed and implemented user interfaces using React. "
                 "Worked on improving performance and user experience. "
                 "Collaborated with designers and backend engineers."),
                ("Netflix", "Backend Developer", "Los Gatos, CA", 
                 "Developed and maintained backend services for the streaming platform. "
                 "Implemented caching strategies to improve performance. "
                 "Participated in system design discussions."),
                ("Apple", "iOS Developer", "Cupertino, CA", 
                 "Built native iOS applications for Apple products. "
                 "Worked with Swift and Objective-C. "
                 "Implemented UI components following Apple's design guidelines."),
                ("IBM", "Cloud Engineer", "New York, NY", 
                 "Designed and implemented cloud-based solutions. "
                 "Worked with IBM Cloud and AWS. "
                 "Automated deployment processes using CI/CD pipelines."),
            ]
            
            # Add 2-4 experience entries
            exp_count = random.randint(2, 4)
            selected_exp = random.sample(experience_entries, exp_count)
            
            # Sort them to create a coherent job history
            current_date = datetime.now()
            
            for i, (company, position, location, description) in enumerate(selected_exp):
                # For the most recent job
                if i == 0:
                    end_date = None if random.choice([True, False]) else current_date
                    start_date = current_date - timedelta(days=random.randint(365*1, 365*4))  # 1-4 years
                else:
                    # Previous jobs
                    end_date = start_date - timedelta(days=random.randint(1, 90))  # 1-90 days between jobs
                    start_date = end_date - timedelta(days=random.randint(365*1, 365*3))  # 1-3 years
                
                Experience.objects.create(
                    resume=resume,
                    company=company,
                    position=position,
                    location=location,
                    start_date=start_date,
                    end_date=end_date,
                    description=description
                )

            self.stdout.write(self.style.SUCCESS(f'Created resume: {resume.title}'))

        self.stdout.write(self.style.SUCCESS(f'Successfully generated {count} test resumes')) 