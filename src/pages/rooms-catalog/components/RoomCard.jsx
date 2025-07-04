import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoomCard = ({ room, currentLanguage, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const getRoomName = () => {
    switch (currentLanguage) {
      case 'uz': return room.nameUz;
      case 'ru': return room.nameRu;
      default: return room.name;
    }
  };

  const getRoomDescription = () => {
    switch (currentLanguage) {
      case 'uz': return room.descriptionUz;
      case 'ru': return room.descriptionRu;
      default: return room.description;
    }
  };

  const getAmenityName = (amenity) => {
    switch (currentLanguage) {
      case 'uz': return amenity.nameUz;
      case 'ru': return amenity.nameRu;
      default: return amenity.name;
    }
  };

  const getBookNowLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Bron qilish';
      case 'ru': return 'Забронировать';
      default: return 'Book Now';
    }
  };

  const getViewDetailsLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Batafsil';
      case 'ru': return 'Подробнее';
      default: return 'View Details';
    }
  };

  const getAvailabilityLabel = () => {
    switch (currentLanguage) {
      case 'uz': return room.isAvailable ? 'Mavjud' : 'Band';
      case 'ru': return room.isAvailable ? 'Доступно' : 'Занято';
      default: return room.isAvailable ? 'Available' : 'Booked';
    }
  };

  const getPriceLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'kechasi';
      case 'ru': return 'за ночь';
      default: return 'per night';
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleCardClick = () => {
    // Navigate to room details or open modal
    navigate(`/room-details/${room.id}`);
  };

  return (
    <div className="bg-surface rounded-xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden" onClick={handleCardClick}>
        <Image
          src={room.images[currentImageIndex]}
          alt={getRoomName()}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Image Navigation */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {room.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          room.isAvailable 
            ? 'bg-success text-success-foreground' 
            : 'bg-error text-error-foreground'
        }`}>
          {getAvailabilityLabel()}
        </div>

        {/* Room Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
          {getRoomName()}
        </div>
      </div>

      {/* Room Details */}
      <div className="p-6">
        {/* Room Name and Price */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-heading font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
            {getRoomName()}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${room.price}
            </div>
            <div className="text-sm text-text-secondary">
              {getPriceLabel()}
            </div>
          </div>
        </div>

        {/* Room Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {getRoomDescription()}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 4).map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-background px-2 py-1 rounded-lg text-xs text-text-secondary"
            >
              <Icon name={amenity.icon} size={14} />
              <span>{getAmenityName(amenity)}</span>
            </div>
          ))}
          {room.amenities.length > 4 && (
            <div className="flex items-center space-x-1 bg-background px-2 py-1 rounded-lg text-xs text-text-secondary">
              <span>+{room.amenities.length - 4} more</span>
            </div>
          )}
        </div>

        {/* Room Capacity */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{room.capacity} guests</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bed" size={16} />
            <span>{room.beds} beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bath" size={16} />
            <span>{room.bathrooms} bath</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleCardClick}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            {getViewDetailsLabel()}
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow(room);
            }}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
            disabled={!room.isAvailable}
          >
            {getBookNowLabel()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;