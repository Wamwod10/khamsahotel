import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ 
  bookingData, 
  onClose, 
  onDownloadPDF, 
  currentLanguage 
}) => {
  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Buyurtma Tasdiqlandi!',
          subtitle: 'Sizning buyurtmangiz muvaffaqiyatli qabul qilindi',
          bookingRef: 'Buyurtma raqami',
          checkIn: 'Kelish sanasi',
          checkOut: 'Ketish sanasi',
          room: 'Xona',
          guests: 'Mehmonlar',
          total: 'Jami to\'lov',
          downloadPDF: 'PDF Yuklab olish',
          close: 'Yopish',
          thankYou: 'Rahmat!',
          confirmationEmail: 'Tasdiqlash emaili yuborildi'
        };
      case 'ru':
        return {
          title: 'Бронирование Подтверждено!',
          subtitle: 'Ваше бронирование успешно принято',
          bookingRef: 'Номер бронирования',
          checkIn: 'Дата заезда',
          checkOut: 'Дата выезда',
          room: 'Номер',
          guests: 'Гостей',
          total: 'Общая сумма',
          downloadPDF: 'Скачать PDF',
          close: 'Закрыть',
          thankYou: 'Спасибо!',
          confirmationEmail: 'Письмо с подтверждением отправлено'
        };
      default:
        return {
          title: 'Booking Confirmed!',
          subtitle: 'Your reservation has been successfully processed',
          bookingRef: 'Booking Reference',
          checkIn: 'Check-in Date',
          checkOut: 'Check-out Date',
          room: 'Room',
          guests: 'Guests',
          total: 'Total Amount',
          downloadPDF: 'Download PDF',
          close: 'Close',
          thankYou: 'Thank You!',
          confirmationEmail: 'Confirmation email has been sent'
        };
    }
  };

  const labels = getLabels();

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB');
  };

  const getRoomName = (room) => {
    if (!room) return '';
    switch (currentLanguage) {
      case 'uz': return room.nameUz;
      case 'ru': return room.nameRu;
      default: return room.name;
    }
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center animate-pulse">
          <Icon name="Check" size={40} className="text-success-foreground" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">{labels.title}</h2>
        <p className="text-text-secondary">{labels.subtitle}</p>
      </div>

      {/* Booking Reference */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="text-sm text-text-secondary mb-1">{labels.bookingRef}</div>
        <div className="text-2xl font-bold text-primary font-mono">
          {bookingData.bookingReference}
        </div>
      </div>

      {/* Booking Details */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-text-secondary mb-1">{labels.checkIn}</div>
            <div className="font-semibold text-text-primary">
              {formatDate(bookingData.checkInDate)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-text-secondary mb-1">{labels.checkOut}</div>
            <div className="font-semibold text-text-primary">
              {formatDate(bookingData.checkOutDate)}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-text-secondary mb-1">{labels.room}</div>
            <div className="font-semibold text-text-primary">
              {getRoomName(bookingData.selectedRoom)} × {bookingData.roomQuantity}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-text-secondary mb-1">{labels.guests}</div>
            <div className="font-semibold text-text-primary">
              {bookingData.guestQuantity}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-text-primary">{labels.total}</span>
            <span className="text-2xl font-bold text-primary">
              ${bookingData.totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Email Notice */}
      <div className="flex items-center justify-center space-x-2 text-success">
        <Icon name="Mail" size={16} />
        <span className="text-sm">{labels.confirmationEmail}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="primary"
          onClick={onDownloadPDF}
          iconName="Download"
          iconPosition="left"
          className="sm:w-auto"
        >
          {labels.downloadPDF}
        </Button>
        
        <Button
          variant="outline"
          onClick={onClose}
          className="sm:w-auto"
        >
          {labels.close}
        </Button>
      </div>

      {/* Thank You Message */}
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">{labels.thankYou}</p>
        <p className="text-sm text-text-secondary mt-1">
          KhamsaHotel - Your comfort is our priority
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;