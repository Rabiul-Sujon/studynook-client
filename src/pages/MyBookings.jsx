
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (authLoading || !user) return;

            try {
                const res = await axiosInstance.get('/api/bookings/my-bookings');
                // setBookings(res.data);
                setBookings(res.data.filter(booking => booking.status !== 'cancelled'));
            } catch (error) {
                console.error("Fetch bookings error:", error);
                toast.error('Failed to load your bookings!');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, authLoading]);

    const handleCancelBooking = async (bookingId) => {
        Swal.fire({
            title: 'Cancel this booking?',
            text: 'Are you sure you want to cancel your reservation?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, cancel it!',
            background: '#1a1a2e',
            color: '#ffffff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // await axiosInstance.delete(`/api/bookings/${bookingId}`);
            
                    await axiosInstance.patch(`/api/bookings/${bookingId}/cancel`);
                    toast.success('Booking cancelled successfully!');
                    
                    // Optimistic UI update: remove from local state instantly
                    setBookings((prevBookings) => prevBookings.filter((b) => b._id !== bookingId));
                } catch (error) {
                    console.error("Cancel booking error:", error);
                    toast.error('Failed to cancel your booking!');
                }
            }
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (authLoading || loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen py-12 px-6" style={{ backgroundColor: '#0f0f1a' }}>
            <div className="max-w-5xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black mb-2" style={{ color: '#ffffff' }}>
                        My Reservations
                    </h1>
                    <p style={{ color: '#9ca3af' }}>View, track, and manage your upcoming study space bookings.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                        <p className="text-xl mb-4" style={{ color: '#9ca3af' }}>You don't have any rooms booked yet.</p>
                        <Link to="/rooms" className="font-bold" style={{ color: '#10b981' }}>
                            Browse available rooms now →
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => {
                            // Extract ID securely, checking populated fields, strings, or nested document fields
                            const targetRoomId = 
                                (booking.room && typeof booking.room === 'object' ? booking.room._id : booking.room) || 
                                booking.roomId || 
                                booking.room_id ||
                                booking._doc?.room;

                            return (
                                <motion.div
                                    key={booking._id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                    style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
                                    
                                    {/* Room Meta Information */}
                                    <div className="flex items-center gap-5 w-full md:w-auto">
                                        <div className="w-24 h-20 rounded-xl overflow-hidden hidden sm:block flex-shrink-0">
                                            <img 
                                                src={booking.room?.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300'} 
                                                alt={booking.room?.name || 'Study Room'} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="truncate">
                                            <h3 className="text-xl font-bold mb-1 truncate" style={{ color: '#ffffff' }}>
                                                {booking.room?.name || 'Study Space'}
                                            </h3>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium" style={{ color: '#9ca3af' }}>
                                                <span>📅 Date: {formatDate(booking.date)}</span>
                                                <span>⏰ Time: {booking.startTime} - {booking.endTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing & Control Actions */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0" style={{ borderColor: '#2a2a4e' }}>
                                        <div>
                                            <p className="text-xs text-right" style={{ color: '#6b7280' }}>Total Cost</p>
                                            <p className="text-xl font-black text-right" style={{ color: '#10b981' }}>
                                                ${booking.totalCost || 0}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                         
                                            <Link
                                                to={`/rooms/${targetRoomId}`}
                                                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                                                style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e', color: '#ffffff' }}>
                                                View Room
                                            </Link>
                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                                                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444' }}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;