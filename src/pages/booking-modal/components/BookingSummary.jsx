import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingSummary = ({ 
  checkInDate, 
  checkOutDate, 
  selectedRoom, 
  roomQuantity, 
  guestQuantity, 
  promoCode, 
  discount,
  currentLanguage 
}) => {
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB');
  };

  const nights = calculateNights();
  const basePrice = selectedRoom ? selectedRoom.price * roomQuantity * nights : 0;
  const taxes = basePrice * 0.12; // 12% tax
  const discountAmount = discount ? basePrice * (discount / 100) : 0;
  const totalPrice = basePrice + taxes - discountAmount;

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Buyurtma Xulosasi',
          checkIn: 'Kelish sanasi',
          checkOut: 'Ketish sanasi',
          nights: 'Tunlar',
          room: 'Xona',
          rooms: 'Xonalar',
          guests: 'Mehmonlar',
          basePrice: 'Asosiy narx',
          taxes: 'Soliqlar',
          discount: 'Chegirma',
          total: 'Jami',
          perNight: 'tuniga'
        };
      case 'ru':
        return {
          title: 'Сводка Бронирования',
          checkIn: 'Дата заезда',
          checkOut: 'Дата выезда',
          nights: 'Ночей',
          room: 'Номер',
          rooms: 'Номеров',
          guests: 'Гостей',
          basePrice: 'Базовая цена',
          taxes: 'Налоги',
          discount: 'Скидка',
          total: 'Итого',
          perNight: 'за ночь'
        };
      default:
        return {
          title: 'Booking Summary',
          checkIn: 'Check-in',
          checkOut: 'Check-out',
          nights: 'Nights',
          room: 'Room',
          rooms: 'Rooms',
          guests: 'Guests',
          basePrice: 'Base Price',
          taxes: 'Taxes & Fees',
          discount: 'Discount',
          total: 'Total',
          perNight: 'per night'
        };
    }
  };

  const labels = getLabels();

  const getRoomName = (room) => {
    if (!room) return '';
    switch (currentLanguage) {
      case 'uz': return room.nameUz;
      case 'ru': return room.nameRu;
      default: return room.name;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">{labels.title}</h3>
      
      {/* Dates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">{labels.checkIn}</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {formatDate(checkInDate)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">{labels.checkOut}</span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {formatDate(checkOutDate)}
          </span>
        </div>
        
        {nights > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Moon" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-secondary">{labels.nights}</span>
            </div>
            <span className="text-sm font-medium text-text-primary">{nights}</span>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        {/* Room Details */}
        {selectedRoom && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Bed" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {roomQuantity} {roomQuantity === 1 ? labels.room : labels.rooms}
                </span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {getRoomName(selectedRoom)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{labels.guests}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{guestQuantity}</span>
            </div>
          </div>
        )}
      </div>

      {/* Pricing */}
      {basePrice > 0 && (
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{labels.basePrice}</span>
            <span className="text-sm font-medium text-text-primary">${basePrice.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{labels.taxes}</span>
            <span className="text-sm font-medium text-text-primary">${taxes.toFixed(2)}</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-success">{labels.discount} ({promoCode})</span>
              <span className="text-sm font-medium text-success">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-text-primary">{labels.total}</span>
              <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;