import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../../assets/studynook-logo.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
        } catch {
            toast.error('Logout failed!');
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/" 
                    style={({ isActive }) => ({
                        color: isActive ? '#10b981' : '#9ca3af',
                        fontWeight: isActive ? '600' : '400',
                    })}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/rooms"
                    style={({ isActive }) => ({
                        color: isActive ? '#10b981' : '#9ca3af',
                        fontWeight: isActive ? '600' : '400',
                    })}>
                    Rooms
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/add-room"
                            style={({ isActive }) => ({
                                color: isActive ? '#10b981' : '#9ca3af',
                                fontWeight: isActive ? '600' : '400',
                            })}>
                            Add Room
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-listings"
                            style={({ isActive }) => ({
                                color: isActive ? '#10b981' : '#9ca3af',
                                fontWeight: isActive ? '600' : '400',
                            })}>
                            My Listings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-bookings"
                            style={({ isActive }) => ({
                                color: isActive ? '#10b981' : '#9ca3af',
                                fontWeight: isActive ? '600' : '400',
                            })}>
                            My Bookings
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div style={{ backgroundColor: '#0f0f1a' }} className="navbar shadow-md sticky top-0 z-50 px-6">
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" style={{ color: '#10b981' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow rounded-box w-52"
                        style={{ backgroundColor: '#0f0f1a', border: '0.5px solid #2a2a4e' }}>
                        {navLinks}
                    </ul>
                </div>
                
                <Link to="/" className="flex items-center">
                 <img 
                 src={logo}
                 alt="StudyNook" 
                 className="h-8 w-auto"
                 />
                 <span style={{ color: '#10b981' }} className="text-xl font-bold">Study   
                 </span>
                 <span style={{ color: '#ffffff' }} className="text-xl font-bold">Nook</span>
                 </Link>

            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end gap-3">
                {/* Theme Toggle */}
                <button onClick={toggleTheme} 
                    className="btn btn-ghost btn-circle"
                    style={{ color: '#10b981' }}>
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>

                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring-2" style={{ ringColor: '#10b981' }}>
                                <img src={user?.photoURL || 'https://i.pravatar.cc/150'} alt={user?.displayName} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow rounded-box w-52"
                            style={{ backgroundColor: '#0f0f1a', border: '0.5px solid #2a2a4e' }}>
                            <li className="px-4 py-2">
                                <span style={{ color: '#10b981', fontWeight: '600' }}>{user?.displayName}</span>
                            </li>
                            <li><Link to="/my-listings" style={{ color: '#9ca3af' }}>My Listings</Link></li>
                            <li><Link to="/my-bookings" style={{ color: '#9ca3af' }}>My Bookings</Link></li>
                            <li><button onClick={handleLogout} style={{ color: '#ef4444' }}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" 
                            className="btn btn-sm btn-ghost"
                            style={{ color: '#10b981', border: '1px solid #10b981' }}>
                            Login
                        </Link>
                        <Link to="/register" 
                            className="btn btn-sm"
                            style={{ backgroundColor: '#10b981', color: '#ffffff', border: 'none' }}>
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;