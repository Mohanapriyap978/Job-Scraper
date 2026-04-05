from django.db import models
from django.contrib.auth.models import User

class SavedJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_jobs')
    job_id = models.CharField(max_length=50) # MongoDB ObjectId string
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job_id')

    def __str__(self):
        return f"{self.user.username} saved {self.job_id}"
