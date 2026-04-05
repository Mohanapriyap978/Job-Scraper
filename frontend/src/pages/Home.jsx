import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Briefcase, TrendingUp } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '24px', color: '#fff', letterSpacing: '-2px', lineHeight: '1.1' }}>
                    Find Your Next <span style={{ color: 'var(--primary)' }}>Career Move</span>
                </h1>
                <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 48px auto' }}>
                    Connect with thousands of opportunities from top companies. Our AI-driven scraper finds the most relevant jobs specifically for your skills.
                </p>
                
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '80px' }}>
                    {user ? (
                        <Link to="/dashboard" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.15rem', fontWeight: '600', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', width: 'auto' }}>
                            <Briefcase size={22} />
                            Open Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.15rem', fontWeight: '600', borderRadius: '12px', width: 'auto' }}>
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.15rem', fontWeight: '600', borderRadius: '12px', color: 'var(--text-main)', border: 'none', width: 'auto' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
                    <FeatureCard 
                        icon={<Search size={36} color="var(--primary)" />}
                        title="Intelligent Search"
                        desc="Advanced algorithms scan more than 50+ job boards to find exactly what you're looking for."
                    />
                    <FeatureCard 
                        icon={<TrendingUp size={36} color="#60a5fa" />}
                        title="Market Insights"
                        desc="Stay ahead with real-time data on salary trends, required skills, and hiring patterns in your industry."
                    />
                    <FeatureCard 
                        icon={<Briefcase size={36} color="#3b82f6" />}
                        title="Direct Apply"
                        desc="Apply to your favorite roles directly through our streamlined interface with just one click."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-panel" style={{ padding: '30px', textAlign: 'left', transition: 'transform 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.05)', display: 'inline-block', padding: '12px', borderRadius: '12px' }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-main)' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{desc}</p>
    </div>
);

export default Home;
