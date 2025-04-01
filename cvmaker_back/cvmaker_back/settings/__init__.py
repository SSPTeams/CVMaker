import os

# По умолчанию используем локальные настройки
environment = os.environ.get('DJANGO_ENVIRONMENT', 'local')

if environment == 'production':
    from .prod import *
else:
    from .local import * 