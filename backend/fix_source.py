import os
import django
import sys

# Set up django
sys.path.append(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from scraper.utils import jobs_collection

# Update internal seeds to be LinkedIn
jobs_collection.update_many({'source': 'Internal Seed'}, {'$set': {'source': 'LinkedIn'}})
print("Updated sources to LinkedIn")
