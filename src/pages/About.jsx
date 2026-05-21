import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        document.title = 'StudyNook - About Us';
    }, []);

    const steps = [
        {
            icon: '🔍',
            title: 'Browse Rooms',
            description: 'Search and filter through our wide selection of quiet study rooms available in your library.'
        },
        {
            icon: '📅',
            title: 'Book a Slot',
            description: 'Pick your date and time slot. Our smart system prevents double bookings automatically.'
        },
        {
            icon: '📚',
            title: 'Start Studying',
            description: 'Show up and enjoy your perfectly quiet study space. Focus and achieve your goals!'
        }
    ];

    const team = [
        
        {
            name: 'Sarah Johnson',
            role: 'UI/UX Designer',
            avatar: 'https://i.pravatar.cc/150?img=5',
        },
        {
            name: 'Rabiul Sujon',
            role: 'Full Stack Developer',
            avatar: 'https://avatars.githubusercontent.com/Rabiul-Sujon',
        },
        {
            name: 'James Williams',
            role: 'Backend Developer',
            avatar: 'https://i.pravatar.cc/150?img=8',
        },
    ];

    return (
        <div style={{ backgroundColor: '#0f0f1a' }} className="min-h-screen">

            {/* Hero Section */}
            <section className="py-20 px-6 text-center"
                style={{ background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f2027 100%)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        style={{ backgroundColor: '#0f2027', color: '#10b981', border: '1px solid #10b981' }}>
                        🏫 About StudyNook
                    </span>
                    <h1 className="text-5xl font-black mb-6" style={{ color: '#ffffff' }}>
                        We Help Students <span style={{ color: '#10b981' }}>Focus</span>
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: '#9ca3af' }}>
                        StudyNook is a platform that connects students with quiet, 
                        private study rooms in their library. We believe every student 
                        deserves a perfect space to learn and grow.
                    </p>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            Our <span style={{ color: '#10b981' }}>Mission</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#10b981' }}>
                                🎯 Our Vision
                            </h3>
                            <p style={{ color: '#9ca3af' }}>
                                To create a world where every student has access to a 
                                quiet, comfortable, and productive study environment 
                                whenever they need it.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                            <h3 className="text-xl font-bold mb-3" style={{ color: '#10b981' }}>
                                💡 Our Goal
                            </h3>
                            <p style={{ color: '#9ca3af' }}>
                                To eliminate the frustration of finding study spaces 
                                by providing a seamless booking experience that saves 
                                time and reduces stress for students everywhere.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6" style={{ backgroundColor: '#0f0f1a' }}>
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            How It <span style={{ color: '#10b981' }}>Works</span>
                        </h2>
                        <p style={{ color: '#9ca3af' }}>
                            Getting started with StudyNook is simple and fast!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl"
                                style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                <div className="text-5xl mb-4">{step.icon}</div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold"
                                    style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#ffffff' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: '#9ca3af' }}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                            Our <span style={{ color: '#10b981' }}>Team</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6 rounded-2xl"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                    style={{ border: '3px solid #10b981' }}
                                />
                                <h3 className="text-lg font-bold mb-1" style={{ color: '#ffffff' }}>
                                    {member.name}
                                </h3>
                                <p style={{ color: '#10b981' }}>{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 text-center" style={{ backgroundColor: '#0f0f1a' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}>
                    <h2 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                        Ready to <span style={{ color: '#10b981' }}>Get Started?</span>
                    </h2>
                    <p className="mb-8" style={{ color: '#9ca3af' }}>
                        Join thousands of students already using StudyNook!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/rooms"
                            className="px-8 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-all"
                            style={{ backgroundColor: '#10b981' }}>
                            Browse Rooms
                        </Link>
                        <Link to="/register"
                            className="px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
                            style={{ border: '2px solid #10b981', color: '#10b981' }}>
                            Get Started Free
                        </Link>
                    </div>
                </motion.div>
            </section>

        </div>
    );
};

export default About;