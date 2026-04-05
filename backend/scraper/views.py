import math
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import jobs_collection
from bson import ObjectId
from .models import SavedJob

class JobListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', '')
        location = request.query_params.get('location', '')
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 12))
        
        db_query = {}
        if query:
            db_query['$or'] = [
                {'title': {'$regex': query, '$options': 'i'}},
                {'company': {'$regex': query, '$options': 'i'}},
                {'description': {'$regex': query, '$options': 'i'}}
            ]
        if location:
            db_query['location'] = {'$regex': location, '$options': 'i'}
            
        total_jobs = jobs_collection.count_documents(db_query)
        total_pages = math.ceil(total_jobs / limit) if total_jobs > 0 else 1
        skip = (page - 1) * limit
        
        jobs = []
        for job in jobs_collection.find(db_query).sort("date_posted", -1).skip(skip).limit(limit):
            job['_id'] = str(job['_id'])
            jobs.append(job)
            
        return Response({
            'jobs': jobs,
            'page': page,
            'total_pages': total_pages,
            'total_jobs': total_jobs
        })

class JobDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            job = jobs_collection.find_one({'_id': ObjectId(pk)})
            if job:
                job['_id'] = str(job['_id'])
                return Response(job)
            return Response({'error': 'Job not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

class SaveJobView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        job_id = request.data.get('job_id')
        if not job_id:
            return Response({'error': 'job_id is required'}, status=400)
            
        saved_job, created = SavedJob.objects.get_or_create(user=request.user, job_id=job_id)
        if created:
            return Response({'status': 'Job saved successfully'})
        else:
            saved_job.delete()
            return Response({'status': 'Job unsaved successfully'})

class SavedJobListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        saved_job_ids = SavedJob.objects.filter(user=request.user).values_list('job_id', flat=True)
        
        object_ids = []
        for jid in saved_job_ids:
            try:
                object_ids.append(ObjectId(jid))
            except:
                pass
                
        jobs = []
        for job in jobs_collection.find({'_id': {'$in': object_ids}}):
            job['_id'] = str(job['_id'])
            jobs.append(job)
            
        return Response({'jobs': jobs, 'saved_job_ids': list(saved_job_ids)})

class JobMetadataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            locations = jobs_collection.distinct('location')
            # For titles, we can extract distinct titles or categories if available.
            titles = jobs_collection.distinct('title')
            return Response({
                'locations': [loc for loc in locations if loc],
                'titles': [t for t in titles if t]
            })
        except Exception as e:
            return Response({'error': str(e)}, status=400)

