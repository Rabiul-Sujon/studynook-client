import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
    const [count, setCount] = useState(10);

    useEffect(() => {
        document.title = 'StudyNook - Page Not Found';
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    window.location.href = '/';
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: '#0f0f1a' }}>
            <div className="text-center">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1 className="text-[180px] font-black leading-none select-none"
                        style={{
                            color: 'transparent',
                            WebkitTextStroke: '2px #10b981',
                            opacity: '0.2'
                        }}>
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-2">📚</div>
                            <h2 className="text-2xl font-bold" style={{ color: '#10b981' }}>
                                Room Not Found!
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <p className="text-lg mb-2" style={{ color: '#ffffff' }}>
                    Oops! Looks like this study room doesn't exist.
                </p>
                <p className="text-sm mb-8" style={{ color: '#9ca3af' }}>
                    The page you're looking for may have been moved or deleted.
                </p>

                {/* Auto redirect */}
                <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
                    Redirecting to home in{' '}
                    <span style={{ color: '#10b981' }} className="font-bold text-lg">
                        {count}
                    </span>{' '}
                    seconds...
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <Link to="/"
                        className="px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: '#10b981' }}>
                        Back to Home
                    </Link>
                    <Link to="/rooms"
                        className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #10b981',
                            color: '#10b981'
                        }}>
                        Browse Rooms
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;