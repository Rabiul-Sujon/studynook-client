import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyListings = () => {
    const { user, loading: authLoading } = useAuth();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    {/* Fetch listings */}
    useEffect(() => {
        const fetchRooms = async () => {
            if (authLoading || !user) return;

            try {
                const res = await axiosInstance.get('/api/rooms/my-listings');
                setRooms(res.data);
            } catch (error) {
                console.error("Fetch listings error:", error);
                toast.error('Failed to load your listings!');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [user, authLoading]);

    {/* Delete listing */}
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This listing will be permanently removed!',
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
                    toast.success('Listing deleted successfully!');
                    setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
                } catch {
                    toast.error('Failed to delete listing!');
                }
            }
        });
    };

    if (authLoading || loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#0f0f1a' }}>
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
                            My Room Listings
                        </h1>
                        <p style={{ color: '#9ca3af' }}>Manage and track your listed study spaces.</p>
                    </div>
                    <Link
                        to="/add-room"
                        className="px-5 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: '#10b981' }}>
                        + Add New Room
                    </Link>
                </div>

                {/* Main content */}
                {rooms.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                        <p className="text-xl mb-4" style={{ color: '#9ca3af' }}>You haven't listed any rooms yet.</p>
                        <Link to="/add-room" className="font-bold" style={{ color: '#10b981' }}>
                            Create your first listing now →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <motion.div
                                key={room._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="rounded-2xl overflow-hidden flex flex-col justify-between"
                                style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                
                                <div>
                                    {/* Image */}
                                    <div className="h-48 relative">
                                        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                                            style={{ backgroundColor: 'rgba(16, 185, 129, 0.85)' }}>
                                            ${room.hourlyRate}/hr
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold mb-2 truncate" style={{ color: '#ffffff' }}>
                                            {room.name}
                                        </h3>
                                        <p className="text-sm line-clamp-2 mb-4" style={{ color: '#9ca3af' }}>
                                            {room.description}
                                        </p>
                                        <div className="flex gap-4 text-xs font-semibold" style={{ color: '#6b7280' }}>
                                            <span>🏢 Floor: {room.floor}</span>
                                            <span>👥 Cap: {room.capacity}</span>
                                            <span style={{ color: '#10b981' }}>🔖 Bookings: {room.bookingCount || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-5 pt-0 flex gap-2">
                                    <Link
                                        to={`/rooms/${room._id}`}
                                        className="flex-1 py-2 rounded-xl font-medium text-center text-sm transition-colors"
                                        style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e', color: '#ffffff' }}>
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyListings;