import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const { _id, name, description, image, floor, capacity, hourlyRate, amenities } = room;

    return (
        <div className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4e' }}>
            
            {/* Image */}
            <div className="relative overflow-hidden" style={{ height: '200px' }}>
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Hourly Rate Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                    ${hourlyRate}/hr
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold mb-2" style={{ color: '#ffffff' }}>
                    {name}
                </h3>

                {/* Description */}
                <p className="text-sm mb-3" style={{ color: '#9ca3af' }}>
                    {description?.length > 100 ? description.substring(0, 100) + '...' : description}
                </p>

                {/* Floor & Capacity */}
                <div className="flex gap-4 mb-3">
                    <span className="text-sm" style={{ color: '#6b7280' }}>
                        🏢 {floor}
                    </span>
                    <span className="text-sm" style={{ color: '#6b7280' }}>
                        👥 {capacity} people
                    </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {amenities?.slice(0, 3).map((amenity, index) => (
                        <span key={index}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ backgroundColor: '#0f0f1a', color: '#10b981', border: '1px solid #10b981' }}>
                            {amenity}
                        </span>
                    ))}
                    {amenities?.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full"
                            style={{ backgroundColor: '#0f0f1a', color: '#9ca3af', border: '1px solid #2a2a4e' }}>
                            +{amenities.length - 3} more
                        </span>
                    )}
                </div>

                {/* Button */}
                <Link to={`/rooms/${_id}`}
                    className="block w-full text-center py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#10b981', color: '#ffffff' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;