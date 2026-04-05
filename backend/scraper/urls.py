from django.urls import path
from .views import JobListView, JobDetailView, SaveJobView, SavedJobListView, JobMetadataView

urlpatterns = [
    path('', JobListView.as_view(), name='job-list'),
    path('metadata/', JobMetadataView.as_view(), name='job-metadata'),
    path('saved/', SavedJobListView.as_view(), name='job-saved'),
    path('save/', SaveJobView.as_view(), name='job-save'),
    path('<str:pk>/', JobDetailView.as_view(), name='job-detail'),
]
