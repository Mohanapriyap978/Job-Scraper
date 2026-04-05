import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const jobTitle = location.state?.jobTitle || 'the position';

    return (
        <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px', animation: 'fadeIn 0.6s ease-out' }}>
            <div className="glass-panel" style={{ padding: '50px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)' }}>
                <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    color: '#10b981', 
                    marginBottom: '24px'
                }}>
                    <CheckCircle size={40} />
                </div>
                
                <h1 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                    Application Submitted!
                </h1>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
                    Thank you for applying to <strong>{jobTitle}</strong>. We have successfully received your application and it is now under review by the hiring team.
                </p>
                
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="btn-primary" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', fontSize: '1rem', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)', border: 'none', cursor: 'pointer' }}
                    >
                        <Home size={18} />
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
