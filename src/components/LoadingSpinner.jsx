const LoadingSpinner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: '#0f0f1a' }}>
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                        style={{ borderTopColor: '#10b981' }}>
                    </div>
                    {/* Inner ring */}
                    <div className="absolute inset-2 rounded-full border-4 border-transparent animate-spin"
                        style={{ borderTopColor: '#059669', animationDirection: 'reverse', animationDuration: '0.8s' }}>
                    </div>
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                    </div>
                </div>
                <p className="text-sm animate-pulse" style={{ color: '#10b981' }}>
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;