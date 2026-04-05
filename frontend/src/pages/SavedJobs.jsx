import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';

const SavedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchSavedJobs = async () => {
        try {
            const token = localStorage.getItem('access');
            const res = await axios.get('http://127.0.0.1:8000/api/jobs/saved/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.jobs) {
                setJobs(res.data.jobs);
            }
        } catch (error) {
            console.error("Failed to fetch saved jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const handleToggleSave = (jobId) => {
        // If un-saved in this view, we can just remove it from the list
        setJobs(jobs.filter(j => (j._id || j.id) !== jobId));
    };

    if (loading) {
        return (
            <div className="dashboard-container" style={{ textAlign: 'center', marginTop: '100px' }}>
                <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>Loading Saved Jobs...</div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Saved Opportunities</h1>
                <p style={{ color: 'var(--text-muted)' }}>Your shortlisted career moves.</p>
            </div>
            
            {jobs.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    You haven't saved any jobs yet. Check out the dashboard to find opportunities!
                </div>
            ) : (
                <div className="job-grid">
                    {jobs.map((job) => (
                        <JobCard 
                            key={job._id || job.id} 
                            job={job} 
                            isSaved={true} 
                            onToggleSave={handleToggleSave} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
