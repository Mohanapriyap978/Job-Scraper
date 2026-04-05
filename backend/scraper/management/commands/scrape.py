from django.core.management.base import BaseCommand
from scraper.utils import jobs_collection
from datetime import datetime
import requests
from bs4 import BeautifulSoup

class Command(BaseCommand):
    help = 'Scrapes job listings and saves them to MongoDB'

    def handle(self, *args, **kwargs):
        # We will scrape a simple public board for Python jobs or use dummy data for reliability.
        # Python.org jobs: https://www.python.org/jobs/
        self.stdout.write(self.style.NOTICE('Starting to scrape Python.org jobs...'))
        
        try:
            url = 'https://www.python.org/jobs/'
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            job_listings = soup.select('.list-recent-jobs li')
            new_jobs = 0
            
            for job in job_listings:
                title_tag = job.select_one('.listing-company-name a')
                company_tag = job.select_one('.listing-company-name')
                location_tag = job.select_one('.listing-location')
                category_tag = job.select_one('.listing-job-type')
                date_tag = job.select_one('time')

                if not title_tag:
                    continue

                title = title_tag.text.strip()
                # Company tag text contains both company and title, separate them by extracting children
                # Simplification: just get the plain text directly ignoring the a tag
                company_text = company_tag.text.strip()
                company = company_text.split('\n')[-1].strip() if '\n' in company_text else company_text
                
                link = 'https://www.python.org' + title_tag['href']
                location = location_tag.text.strip() if location_tag else 'Unknown'
                category = category_tag.text.strip() if category_tag else 'General'
                
                # Check if job already exists to avoid duplicates
                if not jobs_collection.find_one({'link': link}):
                    jobs_collection.insert_one({
                        'title': title,
                        'company': company,
                        'location': location,
                        'description': f"Category: {category}. For more details, visit the link.",
                        'link': link,
                        'source': 'Python.org',
                        'date_posted': datetime.now()
                    })
                    new_jobs += 1
            
            self.stdout.write(self.style.SUCCESS(f'Successfully scraped and saved {new_jobs} new jobs!'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to scrape: {str(e)}'))

        # Also add some mock data if empty
        if jobs_collection.count_documents({}) == 0:
            mock_jobs = [
                {'title': 'Senior Frontend Engineer', 'company': 'Techflow', 'location': 'Remote', 'description': 'React and Tailwind expert needed.', 'link': '#', 'source': 'Internal', 'date_posted': datetime.now()},
                {'title': 'Backend Developer', 'company': 'DataCorp', 'location': 'New York, NY', 'description': 'Django and MongoDB heavy lifting.', 'link': '#', 'source': 'Internal', 'date_posted': datetime.now()},
            ]
            jobs_collection.insert_many(mock_jobs)
            self.stdout.write(self.style.SUCCESS('Added fallback mock jobs since nothing was scraped from Python.org.'))
