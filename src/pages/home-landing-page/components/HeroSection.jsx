import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomQuantity, setRoomQuantity] = useState(1);
  const [guestQuantity, setGuestQuantity] = useState(2);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Khamsa Hotel'ga Xush Kelibsiz",
          subtitle: "Zamonaviy qulayliklar va an'anaviy mehmondo'stlik bilan ajoyib tajriba",
          checkIn: "Kelish sanasi",
          checkOut: "Ketish sanasi",
          rooms: "Xonalar",
          guests: "Mehmonlar",
          searchButton: "Xonalarni Qidirish",
          availabilityText: "Mavjud xonalarni tekshiring"
        };
      case 'ru':
        return {
          title: "Добро пожаловать в Khamsa Hotel",
          subtitle: "Исключительный опыт с современными удобствами и традиционным гостеприимством",
          checkIn: "Дата заезда",
          checkOut: "Дата выезда",
          rooms: "Номера",
          guests: "Гости",
          searchButton: "Найти номера",
          availabilityText: "Проверьте доступные номера"
        };
      default:
        return {
          title: "Welcome to Khamsa Hotel",
          subtitle: "Experience exceptional hospitality with modern amenities and traditional warmth",
          checkIn: "Check-in Date",
          checkOut: "Check-out Date",
          rooms: "Rooms",
          guests: "Guests",
          searchButton: "Search Rooms",
          availabilityText: "Check available rooms"
        };
    }
  };

  const handleBookingSearch = () => {
    if (!checkInDate || !checkOutDate) {
      alert(currentLanguage === 'uz' ? 'Iltimos, sanalarni tanlang' : 
            currentLanguage === 'ru'? 'Пожалуйста, выберите даты' : 'Please select dates');
      return;
    }
    
    const searchParams = {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      rooms: roomQuantity,
      guests: guestQuantity
    };
    
    localStorage.setItem('bookingSearch', JSON.stringify(searchParams));
    window.dispatchEvent(new CustomEvent('openBookingModal', { detail: searchParams }));
  };

  const content = getContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Khamsa Hotel Exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
              {content.subtitle}
            </p>
            
            {/* Mobile Booking Form */}
            <div className="lg:hidden bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <Icon name="Calendar" size={24} className="text-primary mr-2" />
                <h3 className="text-lg font-semibold text-text-primary">
                  {content.availabilityText}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {content.checkIn}
                  </label>
                  <Input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {content.checkOut}
                  </label>
                  <Input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {content.rooms}
                  </label>
                  <select
                    value={roomQuantity}
                    onChange={(e) => setRoomQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text-primary"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    {content.guests}
                  </label>
                  <select
                    value={guestQuantity}
                    onChange={(e) => setGuestQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text-primary"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button
                variant="primary"
                onClick={handleBookingSearch}
                iconName="Search"
                iconPosition="left"
                fullWidth
                className="shadow-lg hover:shadow-xl"
              >
                {content.searchButton}
              </Button>
            </div>
          </div>

          {/* Desktop Booking Form */}
          <div className="hidden lg:block">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <Icon name="Calendar" size={28} className="text-primary mr-3" />
                <h3 className="text-2xl font-semibold text-text-primary">
                  {content.availabilityText}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    {content.checkIn}
                  </label>
                  <Input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    {content.checkOut}
                  </label>
                  <Input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    {content.rooms}
                  </label>
                  <select
                    value={roomQuantity}
                    onChange={(e) => setRoomQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text-primary"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    {content.guests}
                  </label>
                  <select
                    value={guestQuantity}
                    onChange={(e) => setGuestQuantity(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-surface text-text-primary"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Button
                variant="primary"
                onClick={handleBookingSearch}
                iconName="Search"
                iconPosition="left"
                fullWidth
                size="lg"
                className="shadow-lg hover:shadow-xl"
              >
                {content.searchButton}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;