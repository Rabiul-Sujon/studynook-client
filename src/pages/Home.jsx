import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import axiosInstance from '../utils/axios';

// Stats Data
const stats = [
    { number: '500+', label: 'Rooms Listed' },
    { number: '2000+', label: 'Bookings Made' },
    { number: '50+', label: 'Universities' },
    { number: '98%', label: 'Satisfaction Rate' },
];

// Testimonials Data
const testimonials = [
    {
        name: 'Sarah Johnson',
        university: 'MIT',
        rating: 5,
        comment: 'StudyNook made it so easy to find a quiet room for my thesis work. Absolutely love it!',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
        name: 'James Williams',
        university: 'Harvard University',
        rating: 5,
        comment: 'Best platform for booking study rooms. No double bookings, instant confirmation!',
        avatar: 'https://i.pravatar.cc/150?img=8',
    },
    {
        name: 'Emily Chen',
        university: 'Stanford University',
        rating: 5,
        comment: 'I listed my private study room and started earning. Amazing experience overall!',
        avatar: 'https://i.pravatar.cc/150?img=9',
    },
];

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'StudyNook - Home';
        const fetchRooms = async () => {
            try {
                const res = await axiosInstance.get('/api/rooms/latest');
                setRooms(res.data);
            } catch {
                console.error('Failed to fetch rooms');
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div style={{ backgroundColor: '#0f0f1a' }}>

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center px-6"
                style={{
                    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f2027 100%)',
                }}>
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10"
                        style={{ backgroundColor: '#10b981', filter: 'blur(80px)' }}></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
                        style={{ backgroundColor: '#10b981', filter: 'blur(100px)' }}></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}>
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                            style={{ backgroundColor: '#0f2027', color: '#10b981', border: '1px solid #10b981' }}>
                            🎓 Your Perfect Study Space Awaits
                            {/*emoji: window + . == graduation*/}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        <span style={{ color: '#ffffff' }}>Find Your </span>
                        <span style={{ color: '#10b981' }}>Perfect</span>
                        <br />
                        <span style={{ color: '#ffffff' }}>Study Room</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                        style={{ color: '#9ca3af' }}>
                        Browse and book quiet, private study rooms in your library. 
                        List your own room and earn.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex gap-4 justify-center flex-wrap">
                        <Link to="/rooms"
                            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
                            style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                            Explore Rooms 🚀
                        </Link>
                        <Link to="/register"
                            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
                            style={{ border: '2px solid #10b981', color: '#10b981', backgroundColor: 'transparent' }}>
                            Get Started Free
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ===== LATEST ROOMS SECTION ===== */}
            <section className="py-20 px-6" style={{ backgroundColor: '#0f0f1a' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            Available Study <span style={{ color: '#10b981' }}>Rooms</span>
                        </h2>
                        <p style={{ color: '#9ca3af' }}>
                            Discover our latest study rooms — quiet, comfortable, and ready to book!
                        </p>
                    </motion.div>

                    {rooms.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-6xl mb-4">📚</p>
                            <p style={{ color: '#9ca3af' }}>No rooms available yet. Be the first to list one!</p>
                            <Link to="/add-room"
                                className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold"
                                style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                                Add a Room
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room, index) => (
                                <motion.div
                                    key={room._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}>
                                    <RoomCard room={room} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/rooms"
                            className="px-8 py-3 rounded-xl font-bold transition-all duration-200 hover:opacity-90"
                            style={{ border: '2px solid #10b981', color: '#10b981' }}>
                            View All Rooms →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section className="py-20 px-6" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            Trusted by <span style={{ color: '#10b981' }}>Thousands</span>
                        </h2>
                        <p style={{ color: '#9ca3af' }}>
                            Join our growing community of students and room owners
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                                <h3 className="text-4xl font-black mb-2" style={{ color: '#10b981' }}>
                                    {stat.number}
                                </h3>
                                <p style={{ color: '#9ca3af' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="py-20 px-6" style={{ backgroundColor: '#0f0f1a' }}>
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            What Students <span style={{ color: '#10b981' }}>Say</span>
                        </h2>
                        <p style={{ color: '#9ca3af' }}>
                            Real experiences from real students
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl"
                                style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} style={{ color: '#10b981' }}>⭐</span>
                                    ))}
                                </div>
                                {/* Comment */}
                                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#9ca3af' }}>
                                    "{testimonial.comment}"
                                </p>
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        style={{ border: '2px solid #10b981' }}
                                    />
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: '#ffffff' }}>
                                            {testimonial.name}
                                        </p>
                                        <p className="text-xs" style={{ color: '#10b981' }}>
                                            {testimonial.university}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;