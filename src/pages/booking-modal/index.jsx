import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DatePicker from './components/DatePicker';
import QuantitySelector from './components/QuantitySelector';
import RoomTypeSelector from './components/RoomTypeSelector';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import BookingSummary from './components/BookingSummary';
import GuestInformationForm from './components/GuestInformationForm';
import PromoCodeInput from './components/PromoCodeInput';
import BookingConfirmation from './components/BookingConfirmation';

const BookingModal = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Booking form state
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [guestQuantity, setGuestQuantity] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Xonani Bron Qilish',
          step1: 'Sana va Xona',
          step2: 'Mehmon Ma\'lumotlari',
          step3: 'To\'lov',
          step4: 'Tasdiqlash',
          checkIn: 'Kelish sanasi',
          checkOut: 'Ketish sanasi',
          rooms: 'Xonalar soni',
          guests: 'Mehmonlar soni',
          next: 'Keyingi',
          back: 'Orqaga',
          bookNow: 'Bron qilish',
          cancel: 'Bekor qilish',
          close: 'Yopish',
          selectCheckIn: 'Kelish sanasini tanlang',
          selectCheckOut: 'Ketish sanasini tanlang',
          selectRoom: 'Xona turini tanlang',
          selectPayment: 'To\'lov usulini tanlang',
          processing: 'Ishlov berilmoqda...',
          downloadPDF: 'PDF Yuklab olish'
        };
      case 'ru':
        return {
          title: 'Бронирование Номера',
          step1: 'Дата и Номер',
          step2: 'Информация о Госте',
          step3: 'Оплата',
          step4: 'Подтверждение',
          checkIn: 'Дата заезда',
          checkOut: 'Дата выезда',
          rooms: 'Количество номеров',
          guests: 'Количество гостей',
          next: 'Далее',
          back: 'Назад',
          bookNow: 'Забронировать',
          cancel: 'Отмена',
          close: 'Закрыть',
          selectCheckIn: 'Выберите дату заезда',
          selectCheckOut: 'Выберите дату выезда',
          selectRoom: 'Выберите тип номера',
          selectPayment: 'Выберите способ оплаты',
          processing: 'Обработка...',
          downloadPDF: 'Скачать PDF'
        };
      default:
        return {
          title: 'Book Your Room',
          step1: 'Date & Room',
          step2: 'Guest Information',
          step3: 'Payment',
          step4: 'Confirmation',
          checkIn: 'Check-in Date',
          checkOut: 'Check-out Date',
          rooms: 'Number of Rooms',
          guests: 'Number of Guests',
          next: 'Next',
          back: 'Back',
          bookNow: 'Book Now',
          cancel: 'Cancel',
          close: 'Close',
          selectCheckIn: 'Select check-in date',
          selectCheckOut: 'Select check-out date',
          selectRoom: 'Select room type',
          selectPayment: 'Select payment method',
          processing: 'Processing...',
          downloadPDF: 'Download PDF'
        };
    }
  };

  const labels = getLabels();

  const steps = [
    { number: 1, title: labels.step1 },
    { number: 2, title: labels.step2 },
    { number: 3, title: labels.step3 },
    { number: 4, title: labels.step4 }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!checkInDate) newErrors.checkIn = labels.selectCheckIn;
        if (!checkOutDate) newErrors.checkOut = labels.selectCheckOut;
        if (!selectedRoom) newErrors.room = labels.selectRoom;
        if (checkInDate && checkOutDate && checkInDate >= checkOutDate) {
          newErrors.dates = 'Check-out date must be after check-in date';
        }
        break;
      case 2:
        if (!guestInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!guestInfo.email.trim()) newErrors.email = 'Email is required';
        if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';
        if (guestInfo.email && !/\S+@\S+\.\S+/.test(guestInfo.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;
      case 3:
        if (!selectedPaymentMethod) newErrors.payment = labels.selectPayment;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePromoApply = (code, discountPercent) => {
    setPromoCode(code);
    setDiscount(discountPercent);
  };

  const calculateTotal = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return 0;
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    const basePrice = selectedRoom.price * roomQuantity * nights;
    const taxes = basePrice * 0.12;
    const discountAmount = discount ? basePrice * (discount / 100) : 0;
    
    return basePrice + taxes - discountAmount;
  };

  const handleBooking = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);

    // Simulate booking process
    setTimeout(() => {
      const bookingReference = 'KH' + Date.now().toString().slice(-8);
      const totalAmount = calculateTotal();

      setBookingData({
        bookingReference,
        checkInDate,
        checkOutDate,
        selectedRoom,
        roomQuantity,
        guestQuantity,
        guestInfo,
        selectedPaymentMethod,
        promoCode,
        discount,
        totalAmount: totalAmount.toFixed(2)
      });

      setIsConfirmed(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob(['Booking Confirmation - ' + bookingData.bookingReference], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `booking-${bookingData.bookingReference}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClose = () => {
    navigate('/home-landing-page');
  };

  const renderStepContent = () => {
    if (isConfirmed) {
      return (
        <BookingConfirmation
          bookingData={bookingData}
          onClose={handleClose}
          onDownloadPDF={handleDownloadPDF}
          currentLanguage={currentLanguage}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatePicker
                label={labels.checkIn}
                value={checkInDate}
                onChange={setCheckInDate}
                placeholder={labels.selectCheckIn}
                minDate={new Date()}
              />
              <DatePicker
                label={labels.checkOut}
                value={checkOutDate}
                onChange={setCheckOutDate}
                placeholder={labels.selectCheckOut}
                minDate={checkInDate || new Date()}
              />
            </div>
            
            {errors.dates && (
              <div className="text-error text-sm flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.dates}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <QuantitySelector
                label={labels.rooms}
                value={roomQuantity}
                onChange={setRoomQuantity}
                min={1}
                max={5}
              />
              <QuantitySelector
                label={labels.guests}
                value={guestQuantity}
                onChange={setGuestQuantity}
                min={1}
                max={10}
              />
            </div>

            <RoomTypeSelector
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
              currentLanguage={currentLanguage}
            />
            
            {errors.room && (
              <div className="text-error text-sm flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.room}</span>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <GuestInformationForm
            guestInfo={guestInfo}
            onGuestInfoChange={setGuestInfo}
            errors={errors}
            currentLanguage={currentLanguage}
          />
        );

      case 3:
        return (
          <div className="space-y-6">
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={setSelectedPaymentMethod}
              currentLanguage={currentLanguage}
            />
            
            {errors.payment && (
              <div className="text-error text-sm flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.payment}</span>
              </div>
            )}

            <PromoCodeInput
              onPromoApply={handlePromoApply}
              currentLanguage={currentLanguage}
              appliedPromo={promoCode}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-text-primary">{labels.title}</h1>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={24} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            {!isConfirmed && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.number
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-border text-text-secondary'
                      }`}>
                        {currentStep > step.number ? (
                          <Icon name="Check" size={20} />
                        ) : (
                          <span className="text-sm font-semibold">{step.number}</span>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-full h-0.5 mx-4 ${
                          currentStep > step.number ? 'bg-primary' : 'bg-border'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((step) => (
                    <div key={step.number} className="text-xs text-text-secondary text-center">
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step Content */}
            <div className="bg-surface rounded-lg border border-border p-6">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            {!isConfirmed && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={currentStep === 1 ? handleClose : handleBack}
                  iconName={currentStep === 1 ? "X" : "ArrowLeft"}
                  iconPosition="left"
                >
                  {currentStep === 1 ? labels.cancel : labels.back}
                </Button>

                {currentStep < 3 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {labels.next}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleBooking}
                    loading={isLoading}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    {isLoading ? labels.processing : labels.bookNow}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          {!isConfirmed && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingSummary
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  selectedRoom={selectedRoom}
                  roomQuantity={roomQuantity}
                  guestQuantity={guestQuantity}
                  promoCode={promoCode}
                  discount={discount}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;