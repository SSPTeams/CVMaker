# Generate Test Resumes

This Django management command allows you to generate test resumes with fake data for development and testing purposes.

## Usage

```bash
# Generate 5 test resumes (default) for the default testuser
python manage.py generate_test_resumes

# Generate specific number of resumes
python manage.py generate_test_resumes --count 10

# Generate resumes for specific user (will be created if doesn't exist)
python manage.py generate_test_resumes --username john_doe

# Combine options
python manage.py generate_test_resumes --count 3 --username jane_smith
```

## Generated Data

For each resume, the command creates:

- A resume with basic information
- 4-8 random skills with different proficiency levels
- 1-2 education entries with random institutions
- 2-4 work experience entries with different companies

## Default User

If no username is provided, resumes will be created for a user named 'testuser' with password 'password123'.

## Note

This command is meant for development and testing only. Do not use in production environments with real user data. 