import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <nav className="navbar glass-panel" style={{ borderRadius: '0 0 16px 16px', borderTop: 'none' }}>
            <Link to="/" className="nav-brand">
                <Briefcase color="#3b82f6" size={28} />
                JobSearch API
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <Link to="/dashboard" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Dashboard</Link>
                        <Link to="/saved" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Saved Jobs</Link>
                        <span style={{ color: 'var(--text-muted)' }}>Hello, {user.username}</span>
                        <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    isAuthPage && <Link to="/" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Home</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
