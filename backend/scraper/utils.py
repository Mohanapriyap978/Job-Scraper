import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['job_scraper_db']
jobs_collection = db['jobs']
