import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        } catch {
            toast.error('Invalid email or password!');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        } catch {
            toast.error('Google login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4"
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
                        <h2 style={{ color: '#ffffff' }} className="text-2xl font-bold">Welcome Back!</h2>
                        <p style={{ color: '#9ca3af' }} className="text-sm mt-1">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
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
                                style={{ 
                                    backgroundColor: '#0f0f1a', 
                                    border: '1px solid #2a2a4e',
                                    focusRingColor: '#10b981'
                                }}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ color: '#9ca3af' }} className="block text-sm mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                                style={{ 
                                    backgroundColor: '#0f0f1a', 
                                    border: '1px solid #2a2a4e',
                                }}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
                            style={{ backgroundColor: '#10b981' }}>
                            {loading ? 'Signing in...' : 'Login'}
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

                    {/* Register Link */}
                    <p className="text-center mt-6 text-sm" style={{ color: '#9ca3af' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#10b981' }} className="font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;