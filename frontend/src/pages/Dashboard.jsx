import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import JobCard from '../components/JobCard';
import { Search, MapPin, X } from 'lucide-react';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [metadata, setMetadata] = useState({ locations: [], titles: [] });
    const { user } = useAuth();

    const fetchJobs = async (currentQuery = query, currentLocation = location, currentPage = page) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access');
            const res = await axios.get(`http://127.0.0.1:8000/api/jobs/?q=${currentQuery}&location=${currentLocation}&page=${currentPage}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // According to backend: {'jobs': jobs, 'page': page, 'total_pages': total_pages}
            // For now, the backend might just be returning the array if old, or the obj if new. Let's handle both.
            if (res.data.jobs) {
                setJobs(res.data.jobs);
                setTotalPages(res.data.total_pages);
            } else {
                setJobs(res.data);
            }
            
            // Fetch saved jobs to know which ones to mark as saved
            const savedRes = await axios.get('http://127.0.0.1:8000/api/jobs/saved/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (savedRes.data.saved_job_ids) {
                setSavedJobIds(new Set(savedRes.data.saved_job_ids));
            }
            
            // Fetch metadata for autocomplete
            try {
                const metaRes = await axios.get('http://127.0.0.1:8000/api/jobs/metadata/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (metaRes.data) {
                    setMetadata(metaRes.data);
                }
            } catch(e) {
                console.error("Failed to fetch metadata", e);
            }
            
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // Re-fetch on page change

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset to page 1 on search
        fetchJobs(query, location, 1);
    };

    const handleClearFilters = () => {
        setQuery('');
        setLocation('');
        setPage(1);
        fetchJobs('', '', 1);
    };

    const handleToggleSave = (jobId) => {
        setSavedJobIds(prev => {
            const next = new Set(prev);
            if (next.has(jobId)) {
                next.delete(jobId);
            } else {
                next.add(jobId);
            }
            return next;
        });
    };

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
        "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry"
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Featured Opportunities</h1>
                <p style={{ color: 'var(--text-muted)' }}>Discover your next career move, exclusively curated for you.</p>
            </div>
            
            <form onSubmit={handleSearch} className="search-bar glass-panel">
                <datalist id="titleOptions">
                    {metadata.titles.map((t, idx) => <option key={idx} value={t} />)}
                </datalist>
                <datalist id="locationOptions">
                    {indianStates.map((state, idx) => <option key={idx} value={state} />)}
                </datalist>
                <div className="search-input">
                    <Search size={20} color="var(--text-muted)" />
                    <input 
                        type="text" 
                        list="titleOptions"
                        placeholder="Search by keywords, title, or company" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <X 
                            size={16} 
                            color="var(--text-muted)" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => {
                                setQuery('');
                                setPage(1);
                                fetchJobs('', location, 1);
                            }} 
                        />
                    )}
                </div>
                <div className="search-input">
                    <MapPin size={20} color="var(--text-muted)" />
                    <input 
                        type="text" 
                        list="locationOptions"
                        placeholder="Location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {location && (
                        <X 
                            size={16} 
                            color="var(--text-muted)" 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => {
                                setLocation('');
                                setPage(1);
                                fetchJobs(query, '', 1);
                            }} 
                        />
                    )}
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '12px 24px', width: 'auto' }}>Search</button>
                {(query || location) && (
                    <button 
                        type="button" 
                        className="btn-primary" 
                        style={{ padding: '12px 24px', width: 'auto', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)' }} 
                        onClick={handleClearFilters}
                    >
                        Clear
                    </button>
                )}
            </form>

            {loading && jobs.length === 0 ? (
                 <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--primary)', fontSize: '1.2rem' }}>Loading Jobs...</div>
            ) : jobs.length === 0 ? (
                <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
                    No jobs match your search criteria. Try modifying your filters or check back later!
                </div>
            ) : (
                <>
                    <div className="job-grid" style={{ marginTop: '20px' }}>
                        {jobs.map((job) => (
                            <JobCard 
                                key={job._id || job.id} 
                                job={job} 
                                isSaved={savedJobIds.has(job._id || job.id)} 
                                onToggleSave={handleToggleSave} 
                            />
                        ))}
                    </div>
                    
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))} 
                                disabled={page === 1}
                                className="apply-btn"
                            >
                                Previous
                            </button>
                            <span style={{ color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                                disabled={page === totalPages}
                                className="apply-btn"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
