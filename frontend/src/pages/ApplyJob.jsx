import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, Building, MapPin } from 'lucide-react';

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeUrl: '',
        coverLetter: ''
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem('access');
                const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJob(res.data);
            } catch (error) {
                console.error("Failed to fetch job", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/thank-you', { state: { jobTitle: job.title } });
    };

    if (loading) return <div style={{textAlign: 'center', marginTop: '100px'}}>Loading Application...</div>;
    if (!job) return <div style={{textAlign: 'center', marginTop: '100px'}}>Job not found.</div>;

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px', animation: 'fadeIn 0.5s ease-out' }}>
            <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', marginBottom: '20px' }}>
                    <Briefcase size={30} />
                </div>
                <h1 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', fontSize: '2rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
                    Apply for {job.title}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building size={16} color="var(--primary)" /> {job.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={16} color="var(--primary)" /> {job.location || 'Remote'}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="auth-form glass-panel" style={{ maxWidth: '100%', padding: '40px' }}>
                <h2 style={{ color: 'var(--text-main)', marginBottom: '30px', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px' }}>Your Information</h2>
                
                <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '500' }}>Full Name</label>
                    <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        style={{ background: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-main)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', width: '100%', fontSize: '1rem', transition: 'all 0.2s' }}
                    />
                </div>
                
                <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '500' }}>Email Address</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        style={{ background: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-main)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', width: '100%', fontSize: '1rem', transition: 'all 0.2s' }}
                    />
                </div>
                
                <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '500' }}>Resume (Link or Portfolio)</label>
                    <input 
                        type="url" 
                        required 
                        placeholder="https://your-portfolio.com"
                        value={formData.resumeUrl}
                        onChange={e => setFormData({...formData, resumeUrl: e.target.value})}
                        style={{ background: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-main)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', width: '100%', fontSize: '1rem', transition: 'all 0.2s' }}
                    />
                </div>
                
                <div className="form-group" style={{ marginBottom: '35px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: '500' }}>Cover Letter</label>
                    <textarea 
                        rows="6" 
                        required 
                        placeholder="Tell us why you're a great fit for this role..."
                        value={formData.coverLetter}
                        onChange={e => setFormData({...formData, coverLetter: e.target.value})}
                        style={{ background: 'rgba(0, 0, 0, 0.2)', color: 'var(--text-main)', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', width: '100%', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit', transition: 'all 0.2s' }}
                    ></textarea>
                </div>
                
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button type="button" onClick={() => navigate(-1)} style={{ flex: '1', padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s' }}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ flex: '2', padding: '14px', borderRadius: '10px', fontWeight: '600', fontSize: '1rem', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyJob;
