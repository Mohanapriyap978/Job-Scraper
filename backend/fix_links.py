import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from scraper.utils import jobs_collection

jobs_collection.update_many({'link': '#'}, {'$set': {'link': 'https://www.linkedin.com/jobs/search/?keywords=software+engineer'}})
print("Fixed dummy links to point to LinkedIn.")
