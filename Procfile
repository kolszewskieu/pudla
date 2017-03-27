web: gunicorn pudla.wsgi --limit-request-line 8188 --log-file -
worker: celery worker --app=pudla --loglevel=info
