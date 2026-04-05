import React, { useState } from 'react';
import { MapPin, Building, Calendar, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobCard = ({ job, isSaved = false, onToggleSave }) => {
    const [saving, setSaving] = useState(false);

    // Determine the date text securely based on what is provided
    let dateStr = "Recently";
    if (job.date_posted) {
        try {
            const dateObj = new Date(job.date_posted);
            dateStr = dateObj.toLocaleDateString();
        } catch (e) {
            // Keep default
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaving(true);
        try {
            const token = localStorage.getItem('access');
            const jobId = job._id || job.id;
            await axios.post('http://127.0.0.1:8000/api/jobs/save/', { job_id: jobId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (onToggleSave) {
                onToggleSave(jobId);
            }
        } catch (error) {
            console.error("Failed to toggle save", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="job-card glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="job-title">{job.title}</div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isSaved ? 'var(--primary)' : 'var(--text-muted)' }}
                    title={isSaved ? "Unsave job" : "Save job"}
                >
                    <Bookmark fill={isSaved ? "var(--primary)" : "transparent"} size={20} />
                </button>
            </div>
            <div className="job-company">
                <Building size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {job.company}
            </div>
            
            <div className="job-meta">
                <div className="meta-item">
                    <MapPin size={14} /> {job.location || 'Remote'}
                </div>
                <div className="meta-item">
                    <Calendar size={14} /> {dateStr}
                </div>
            </div>
            
            <p className="job-desc">{job.description || "No description provided. Click apply to learn more about this role."}</p>
            
            <div className="job-footer">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Source: {job.source || 'Internal'}</span>
                <Link to={`/apply/${job._id || job.id}`} className="apply-btn">
                    Apply Now
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
