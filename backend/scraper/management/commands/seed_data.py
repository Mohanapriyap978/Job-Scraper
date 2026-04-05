from django.core.management.base import BaseCommand
from scraper.utils import jobs_collection
from datetime import datetime

class Command(BaseCommand):
    help = 'Seeds MongoDB with mock jobs in India'

    def handle(self, *args, **kwargs):
        indian_states = [
            "Haryana", "Karnataka", "Maharashtra", "Delhi", "Tamil Nadu", 
            "Telangana", "Uttar Pradesh", "West Bengal", "Gujarat"
        ]
        
        job_titles = [
            "Python Software Engineer", "Backend Developer", "Junior Full Stack Developer", 
            "Senior Data Engineer", "Machine Learning Specialist", "Python Backend Developer"
        ]
        
        companies = ["Techflow", "DataCorp", "Innovate India", "Global Systems", "TCS", "Infosys", "Wipro"]

        mock_jobs = []
        for state in indian_states:
            # Add 2 jobs per state
            for i in range(3):
                title = job_titles[(len(mock_jobs) + i) % len(job_titles)]
                company = companies[(len(mock_jobs) + i) % len(companies)]
                
                job = {
                    'title': title,
                    'company': company,
                    'location': f"{state}, India",
                    'description': f"We are looking for a skilled {title} to join our fast-growing team in {state}. Must have strong experience with modern frameworks.",
                    'link': '#',
                    'source': 'Internal Seed',
                    'date_posted': datetime.now()
                }
                
                # prevent duplicates for exact title and location
                if not jobs_collection.find_one({'title': job['title'], 'location': job['location']}):
                    mock_jobs.append(job)

        if mock_jobs:
            jobs_collection.insert_many(mock_jobs)
            self.stdout.write(self.style.SUCCESS(f'Successfully added {len(mock_jobs)} mock jobs across India!'))
        else:
            self.stdout.write(self.style.SUCCESS('Mock jobs already exist in the database!'))

