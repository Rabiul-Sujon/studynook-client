import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const amenitiesList = [
    'Whiteboard', 'Projector', 'Wi-Fi',
    'Power Outlets', 'Quiet Zone', 'Air Conditioning'
];

const AddRoom = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        floor: '',
        capacity: '',
        hourlyRate: '',
    });

    useEffect(() => {
        document.title = 'StudyNook - Add Room';
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAmenityToggle = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedAmenities.length === 0) {
            toast.error('Please select at least one amenity!');
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.post('/api/rooms', {
                ...formData,
                capacity: Number(formData.capacity),
                hourlyRate: Number(formData.hourlyRate),
                amenities: selectedAmenities
            });
            toast.success('Room added successfully!');
            navigate('/my-listings');
        } catch {
            toast.error('Failed to add room!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#0f0f1a' }}>
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black mb-2" style={{ color: '#ffffff' }}>
                            Add a <span style={{ color: '#10b981' }}>Room</span>
                        </h1>
                        <p style={{ color: '#9ca3af' }}>
                            List your study room and start earning!
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl p-8"
                        style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Room Name */}
                            <div>
                                <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                    Room Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Silent Study Room A"
                                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your room..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                    Image URL *
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                />
                            </div>

                            {/* Floor & Capacity */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                        Floor *
                                    </label>
                                    <input
                                        type="text"
                                        name="floor"
                                        required
                                        value={formData.floor}
                                        onChange={handleChange}
                                        placeholder="e.g. 3rd Floor"
                                        className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                        style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                        Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        required
                                        min="1"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        placeholder="e.g. 4"
                                        className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                        style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                    />
                                </div>
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                                    Hourly Rate ($) *
                                </label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    required
                                    min="1"
                                    value={formData.hourlyRate}
                                    onChange={handleChange}
                                    placeholder="e.g. 5"
                                    className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                                />
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-sm mb-3" style={{ color: '#9ca3af' }}>
                                    Amenities * (Select all that apply)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {amenitiesList.map((amenity) => (
                                        <button
                                            key={amenity}
                                            type="button"
                                            onClick={() => handleAmenityToggle(amenity)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                                            style={{
                                                backgroundColor: selectedAmenities.includes(amenity) ? '#10b981' : '#0f0f1a',
                                                color: selectedAmenities.includes(amenity) ? '#ffffff' : '#9ca3af',
                                                border: `1px solid ${selectedAmenities.includes(amenity) ? '#10b981' : '#2a2a4e'}`
                                            }}>
                                            {selectedAmenities.includes(amenity) ? '✓ ' : ''}{amenity}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 cursor-pointer text-lg"
                                style={{ backgroundColor: '#10b981' }}>
                                {loading ? 'Adding Room...' : '🏠 Add Room'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AddRoom;