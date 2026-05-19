import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';

const BookingModal = ({ room, onClose, onSuccess }) => {
    // const { user} = useAuth();
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [specialNote, setSpecialNote] = useState('');
    const [loading, setLoading] = useState(false);

    const timeSlots = [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00'
    ];

    const getEndTimeSlots = () => {
        if (!startTime) return [];
        const startIndex = timeSlots.indexOf(startTime);
        return timeSlots.slice(startIndex + 1);
    };

    const calculateTotalCost = () => {
        if (!startTime || !endTime) return 0;
        const start = parseInt(startTime.split(':')[0]);
        const end = parseInt(endTime.split(':')[0]);
        return (end - start) * room.hourlyRate;
    };

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/api/bookings', {
                roomId: room._id,
                date,
                startTime,
                endTime,
                totalCost: calculateTotalCost(),
                specialNote
            });
            toast.success('Room booked successfully! 🎉');
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="w-full max-w-md rounded-2xl p-8"
                style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>
                        Book — {room.name}
                    </h3>
                    <button onClick={onClose}
                        className="cursor-pointer text-2xl"
                        style={{ color: '#9ca3af' }}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                    {/* Date */}
                    <div>
                        <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                            Select Date
                        </label>
                        <input
                            type="date"
                            required
                            min={getTodayDate()}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg text-white focus:outline-none cursor-pointer"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                            Start Time
                        </label>
                        <select
                            required
                            value={startTime}
                            onChange={(e) => {
                                setStartTime(e.target.value);
                                setEndTime('');
                            }}
                            className="w-full px-4 py-3 rounded-lg text-white focus:outline-none cursor-pointer"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                            <option value="">Select start time</option>
                            {timeSlots.slice(0, -1).map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                            End Time
                        </label>
                        <select
                            required
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            disabled={!startTime}
                            className="w-full px-4 py-3 rounded-lg text-white focus:outline-none cursor-pointer"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}>
                            <option value="">Select end time</option>
                            {getEndTimeSlots().map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    {/* Total Cost */}
                    {startTime && endTime && (
                        <div className="p-4 rounded-xl"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #10b981' }}>
                            <div className="flex justify-between items-center">
                                <span style={{ color: '#9ca3af' }}>Duration:</span>
                                <span style={{ color: '#ffffff' }}>
                                    {parseInt(endTime) - parseInt(startTime)} hour(s)
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span style={{ color: '#9ca3af' }}>Total Cost:</span>
                                <span className="text-xl font-bold" style={{ color: '#10b981' }}>
                                    ${calculateTotalCost()}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Special Note */}
                    <div>
                        <label className="block text-sm mb-2" style={{ color: '#9ca3af' }}>
                            Special Note (Optional)
                        </label>
                        <textarea
                            value={specialNote}
                            onChange={(e) => setSpecialNote(e.target.value)}
                            placeholder="Any special requirements..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg text-white focus:outline-none"
                            style={{ backgroundColor: '#0f0f1a', border: '1px solid #2a2a4e' }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-xl font-bold text-white cursor-pointer hover:opacity-90"
                            style={{ backgroundColor: '#10b981' }}>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold cursor-pointer"
                            style={{ border: '1px solid #ef4444', color: '#ef4444' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;