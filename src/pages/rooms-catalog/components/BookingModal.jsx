import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingModal = ({ isOpen, onClose, room, currentLanguage }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    specialRequests: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getModalTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xonani bron qilish';
      case 'ru': return 'Бронирование номера';
      default: return 'Book Room';
    }
  };

  const getCheckInLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Kelish sanasi';
      case 'ru': return 'Дата заезда';
      default: return 'Check-in Date';
    }
  };

  const getCheckOutLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Ketish sanasi';
      case 'ru': return 'Дата выезда';
      default: return 'Check-out Date';
    }
  };

  const getGuestsLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Mehmonlar soni';
      case 'ru': return 'Количество гостей';
      default: return 'Number of Guests';
    }
  };

  const getRoomsLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xonalar soni';
      case 'ru': return 'Количество номеров';
      default: return 'Number of Rooms';
    }
  };

  const getSpecialRequestsLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Maxsus so\'rovlar';
      case 'ru': return 'Особые пожелания';
      default: return 'Special Requests';
    }
  };

  const getBookNowLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Bron qilish';
      case 'ru': return 'Забронировать';
      default: return 'Book Now';
    }
  };

  const getCancelLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Bekor qilish';
      case 'ru': return 'Отмена';
      default: return 'Cancel';
    }
  };

  const getTotalLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Jami';
      case 'ru': return 'Итого';
      default: return 'Total';
    }
  };

  const getNightsLabel = (nights) => {
    switch (currentLanguage) {
      case 'uz': return `${nights} kecha`;
      case 'ru': return `${nights} ночей`;
      default: return `${nights} nights`;
    }
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (room && nights > 0) {
      return room.price * nights * bookingData.rooms;
    }
    return 0;
  };

  const handleBooking = () => {
    // Mock booking logic
    const bookingDetails = {
      room: room,
      ...bookingData,
      total: calculateTotal(),
      nights: calculateNights()
    };
    
    console.log('Booking Details:', bookingDetails);
    alert(`Booking confirmed for ${room?.name || 'Room'}! Total: $${calculateTotal()}`);
    onClose();
  };

  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-heading font-semibold text-text-primary">
            {getModalTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Room Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start space-x-4">
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-text-primary mb-1">
                {currentLanguage === 'uz' ? room.nameUz : 
                 currentLanguage === 'ru' ? room.nameRu : room.name}
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                {currentLanguage === 'uz' ? room.descriptionUz : 
                 currentLanguage === 'ru' ? room.descriptionRu : room.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>{room.capacity} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Bed" size={16} />
                  <span>{room.beds} beds</span>
                </div>
                <div className="text-lg font-bold text-primary">
                  ${room.price}/night
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getCheckInLabel()}
              </label>
              <Input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getCheckOutLabel()}
              </label>
              <Input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests and Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getGuestsLabel()}
              </label>
              <select
                value={bookingData.guests}
                onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {[...Array(room.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getRoomsLabel()}
              </label>
              <select
                value={bookingData.rooms}
                onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'room' : 'rooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getSpecialRequestsLabel()}
            </label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder={currentLanguage === 'uz' ? 'Maxsus so\'rovlaringizni yozing...' : 
                          currentLanguage === 'ru'? 'Напишите ваши особые пожелания...' : 'Enter your special requests...'}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Booking Summary */}
          {calculateNights() > 0 && (
            <div className="bg-background rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  ${room.price} × {getNightsLabel(calculateNights())} × {bookingData.rooms} rooms
                </span>
                <span className="text-text-primary">${calculateTotal()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                <span className="text-text-primary">{getTotalLabel()}</span>
                <span className="text-primary">${calculateTotal()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex space-x-4 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {getCancelLabel()}
          </Button>
          <Button
            variant="primary"
            onClick={handleBooking}
            className="flex-1"
            disabled={!bookingData.checkIn || !bookingData.checkOut || calculateNights() <= 0}
            iconName="Calendar"
            iconPosition="left"
          >
            {getBookNowLabel()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;