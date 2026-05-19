import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, googleLogin } = useAuth();
    const navigate = useNavigate();

    const validatePassword = (pass) => {
        if (pass.length < 6) return 'Password must be at least 6 characters!';
        if (!/[A-Z]/.test(pass)) return 'Password must have at least one uppercase letter!';
        if (!/[a-z]/.test(pass)) return 'Password must have at least one lowercase letter!';
        return '';
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationError = validatePassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');
        setLoading(true);
        try {
            await register(name, email, password, photoURL);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch {
            toast.error('Registration failed! Email may already exist.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            toast.success('Welcome to StudyNook!');
            navigate('/');
        } catch {
            toast.error('Google login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: '#0f0f1a' }}>
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="rounded-2xl p-8 shadow-2xl"
                    style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="flex items-center justify-center gap-1 mb-4">
                            <span style={{ color: '#10b981' }} className="text-3xl font-bold">Study</span>
                            <span style={{ color: '#ffffff' }} className="text-3xl font-bold">Nook</span>
                        </Link>
                        <h2 style={{ color: '#ffffff' }} className="text-2xl font-bold">Create Account</h2>
                        <p style={{ color: '#9ca3af' }} className="text-sm mt-1">Join StudyNook today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label style={{ color: '#9ca3af' }} className="block text-sm mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ color: '#9ca3af' }} className="block text-sm mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label style={{ color: '#9ca3af' }} className="block text-sm mb-2">Photo URL</label>
                            <input
                                type="text"
                                required
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                placeholder="Enter your photo URL"
                                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ color: '#9ca3af' }} className="block text-sm mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(validatePassword(e.target.value));
                                }}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                            />
                            {/* Password Error */}
                            {error && (
                                <p className="text-sm mt-2" style={{ color: '#ef4444' }}>
                                    {error}
                                </p>
                            )}
                            {/* Password hints */}
                            <ul className="text-xs mt-2 space-y-1" style={{ color: '#6b7280' }}>
                                <li style={{ color: password.length >= 6 ? '#10b981' : '#6b7280' }}>
                                    ✓ At least 6 characters
                                </li>
                                <li style={{ color: /[A-Z]/.test(password) ? '#10b981' : '#6b7280' }}>
                                    ✓ At least one uppercase letter
                                </li>
                                <li style={{ color: /[a-z]/.test(password) ? '#10b981' : '#6b7280' }}>
                                    ✓ At least one lowercase letter
                                </li>
                            </ul>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: '#10b981' }}>
                            {loading ? 'Creating account...' : 'Register'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px" style={{ backgroundColor: '#2a2a4e' }}></div>
                        <span style={{ color: '#6b7280' }} className="text-sm">OR</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: '#2a2a4e' }}></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-3"
                        style={{
                            backgroundColor: '#0f0f1a',
                            border: '1px solid #2a2a4e',
                            color: '#ffffff'
                        }}>
                        <FaGoogle style={{ color: '#10b981' }} />
                        Continue with Google
                    </button>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-sm" style={{ color: '#9ca3af' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#10b981' }} className="font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;