import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import RoomCard from '../components/RoomCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const amenitiesList = [
        'Whiteboard', 'Projector', 'Wi-Fi',
        'Power Outlets', 'Quiet Zone', 'Air Conditioning'
    ];

    useEffect(() => {
        document.title = 'StudyNook - Available Rooms';
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [search, selectedAmenities]);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));
            const res = await axiosInstance.get(`/api/rooms?${params.toString()}`);
            setRooms(res.data);
        } catch {
            console.error('Failed to fetch rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleAmenityToggle = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    return (
        <div className="min-h-screen px-6 py-12" style={{ backgroundColor: '#0f0f1a' }}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12">
                    <h1 className="text-4xl font-black mb-4" style={{ color: '#ffffff' }}>
                        Available Study <span style={{ color: '#10b981' }}>Rooms</span>
                    </h1>
                    <p style={{ color: '#9ca3af' }}>
                        Find and book your perfect study space
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <div className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="🔍 Search rooms by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                        />
                    </div>

                    {/* Amenities Filter */}
                    <div>
                        <p className="text-sm mb-3" style={{ color: '#9ca3af' }}>Filter by Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                            {amenitiesList.map((amenity) => (
                                <button
                                    key={amenity}
                                    onClick={() => handleAmenityToggle(amenity)}
                                    className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                                    style={{
                                        backgroundColor: selectedAmenities.includes(amenity) ? '#10b981' : '#0f0f1a',
                                        color: selectedAmenities.includes(amenity) ? '#ffffff' : '#9ca3af',
                                        border: `1px solid ${selectedAmenities.includes(amenity) ? '#10b981' : '#2a2a4e'}`
                                    }}>
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <p className="mb-6 text-sm" style={{ color: '#6b7280' }}>
                    Showing <span style={{ color: '#10b981' }}>{rooms.length}</span> rooms
                </p>

                {/* Rooms Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : rooms.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-6xl mb-4">🔍</p>
                        <p className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>No rooms found!</p>
                        <p style={{ color: '#9ca3af' }}>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room, index) => (
                            <motion.div
                                key={room._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <RoomCard room={room} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rooms;