import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const RoomDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const loadRoom = async () => {
            try {
                const res = await axiosInstance.get(`/api/rooms/${id}`);
                setRoom(res.data);
                setEditData(res.data);
                document.title = `StudyNook - ${res.data.name}`;
            } catch {
                toast.error('Failed to load room details!');
            } finally {
                setLoading(false);
            }
        };
        loadRoom();
    }, [id]);

    const fetchRoom = async () => {
        try {
            const res = await axiosInstance.get(`/api/rooms/${id}`);
            setRoom(res.data);
            setEditData(res.data);
        } catch {
            toast.error('Failed to refresh room!');
        }
    };

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This room will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: '#1a1a2e',
            color: '#ffffff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/api/rooms/${id}`);
                    toast.success('Room deleted successfully!');
                    navigate('/my-listings');
                } catch {
                    toast.error('Failed to delete room!');
                }
            }
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/rooms/${id}`, editData);
            toast.success('Room updated successfully!');
            setShowEditModal(false);
            fetchRoom();
        } catch {
            toast.error('Failed to update room!');
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!room) return <div className="text-center text-white mt-20">Room not found!</div>;

    const isOwner = user && room.owner === user.uid;

    return (
        <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#0f0f1a' }}>
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>

                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden mb-8" style={{ height: '400px' }}>
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left — Details */}
                        <div className="lg:col-span-2">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-3xl font-black" style={{ color: '#ffffff' }}>
                                    {room.name}
                                </h1>
                                <span className="px-3 py-1 rounded-full text-sm"
                                    style={{ backgroundColor: '#0f0f1a', color: '#10b981', border: '1px solid #10b981' }}>
                                    🔖 {room.bookingCount || 0} bookings
                                </span>
                            </div>

                            <p className="text-lg mb-6 leading-relaxed" style={{ color: '#9ca3af' }}>
                                {room.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                    <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Floor</p>
                                    <p className="font-bold" style={{ color: '#ffffff' }}>🏢 {room.floor}</p>
                                </div>
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                    <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Capacity</p>
                                    <p className="font-bold" style={{ color: '#ffffff' }}>👥 {room.capacity} people</p>
                                </div>
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                    <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Hourly Rate</p>
                                    <p className="font-bold" style={{ color: '#10b981' }}>💰 ${room.hourlyRate}/hr</p>
                                </div>
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                    <p className="text-sm mb-1" style={{ color: '#6b7280' }}>Owner</p>
                                    <p className="font-bold text-sm" style={{ color: '#ffffff' }}>👤 {room.ownerEmail}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-3" style={{ color: '#ffffff' }}>Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {room.amenities?.map((amenity, index) => (
                                        <span key={index}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{ backgroundColor: '#0f0f1a', color: '#10b981', border: '1px solid #10b981' }}>
                                            ✓ {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right — Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 p-6 rounded-2xl"
                                style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
                                    Book This Room
                                </h3>
                                <p className="text-3xl font-black mb-6" style={{ color: '#10b981' }}>
                                    ${room.hourlyRate}<span className="text-lg font-normal" style={{ color: '#9ca3af' }}>/hr</span>
                                </p>

                                {user ? (
                                    <button
                                        onClick={() => setShowBookingModal(true)}
                                        className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 cursor-pointer"
                                        style={{ backgroundColor: '#10b981' }}>
                                        Book Now 🚀
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="w-full py-3 rounded-xl font-bold transition-all duration-200 hover:opacity-90 cursor-pointer"
                                        style={{ border: '2px solid #10b981', color: '#10b981' }}>
                                        Login to Book
                                    </button>
                                )}

                                {isOwner && (
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => setShowEditModal(true)}
                                            className="flex-1 py-2 rounded-xl font-semibold cursor-pointer"
                                            style={{ backgroundColor: '#1a1a2e', border: '1px solid #10b981', color: '#10b981' }}>
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="flex-1 py-2 rounded-xl font-semibold cursor-pointer"
                                            style={{ backgroundColor: '#1a1a2e', border: '1px solid #ef4444', color: '#ef4444' }}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {showBookingModal && (
                <BookingModal
                    room={room}
                    onClose={() => setShowBookingModal(false)}
                    onSuccess={() => {
                        setShowBookingModal(false);
                        fetchRoom();
                    }}
                />
            )}

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <div className="w-full max-w-lg rounded-2xl p-8"
                        style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                        <h3 className="text-xl font-bold mb-6" style={{ color: '#ffffff' }}>Edit Room</h3>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <input type="text" value={editData.name || ''}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                placeholder="Room Name"
                                className="w-full px-4 py-3 rounded-lg text-white"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                            <textarea value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                placeholder="Description" rows={3}
                                className="w-full px-4 py-3 rounded-lg text-white"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                            <input type="text" value={editData.image || ''}
                                onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                                placeholder="Image URL"
                                className="w-full px-4 py-3 rounded-lg text-white"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" value={editData.floor || ''}
                                    onChange={(e) => setEditData({ ...editData, floor: e.target.value })}
                                    placeholder="Floor"
                                    className="w-full px-4 py-3 rounded-lg text-white"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                                <input type="number" value={editData.capacity || ''}
                                    onChange={(e) => setEditData({ ...editData, capacity: e.target.value })}
                                    placeholder="Capacity"
                                    className="w-full px-4 py-3 rounded-lg text-white"
                                    style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                            </div>
                            <input type="number" value={editData.hourlyRate || ''}
                                onChange={(e) => setEditData({ ...editData, hourlyRate: e.target.value })}
                                placeholder="Hourly Rate"
                                className="w-full px-4 py-3 rounded-lg text-white"
                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }} />
                            <div className="flex gap-3">
                                <button type="submit"
                                    className="flex-1 py-3 rounded-xl font-bold text-white cursor-pointer"
                                    style={{ backgroundColor: '#10b981' }}>
                                    Update Room
                                </button>
                                <button type="button" onClick={() => setShowEditModal(false)}
                                    className="flex-1 py-3 rounded-xl font-bold cursor-pointer"
                                    style={{ border: '1px solid #ef4444', color: '#ef4444' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;