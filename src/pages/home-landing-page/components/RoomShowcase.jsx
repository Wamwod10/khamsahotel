import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RoomShowcase = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSlides, setActiveSlides] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const roomsData = [
    {
      id: 'standard',
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      name: { en: "Standard Room", uz: "Standart Xona", ru: "Стандартный номер" },
      price: { en: "$89", uz: "890,000 so\'m", ru: "8,900 руб" },
      priceUnit: { en: "per night", uz: "bir kecha", ru: "за ночь" },
      description: {
        en: "Comfortable and well-appointed room with modern amenities for a pleasant stay.",
        uz: "Yoqimli qolish uchun zamonaviy qulayliklar bilan jihozlangan qulay xona.",
        ru: "Удобный и хорошо оборудованный номер с современными удобствами для приятного пребывания."
      },
      features: [
        { icon: "Bed", label: { en: "Queen Bed", uz: "Katta karavot", ru: "Большая кровать" } },
        { icon: "Wifi", label: { en: "Free Wi-Fi", uz: "Bepul Wi-Fi", ru: "Бесплатный Wi-Fi" } },
        { icon: "Tv", label: { en: "Smart TV", uz: "Smart TV", ru: "Умный телевизор" } },
        { icon: "Bath", label: { en: "Private Bath", uz: "Shaxsiy hammom", ru: "Личная ванная" } }
      ],
      size: { en: "25 m²", uz: "25 m²", ru: "25 м²" },
      capacity: { en: "2 Guests", uz: "2 mehmon", ru: "2 гостя" }
    },
    {
      id: 'family',
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      name: { en: "Family Room", uz: "Oilaviy Xona", ru: "Семейный номер" },
      price: { en: "$149", uz: "1,490,000 so\'m", ru: "14,900 руб" },
      priceUnit: { en: "per night", uz: "bir kecha", ru: "за ночь" },
      description: {
        en: "Spacious family room with separate sleeping areas and kid-friendly amenities.",
        uz: "Alohida yotoq joylari va bolalar uchun qulayliklar bilan keng oilaviy xona.",
        ru: "Просторный семейный номер с отдельными спальными зонами и удобствами для детей."
      },
      features: [
        { icon: "Users", label: { en: "4 Guests", uz: "4 mehmon", ru: "4 гостя" } },
        { icon: "Bed", label: { en: "2 Beds", uz: "2 karavot", ru: "2 кровати" } },
        { icon: "Baby", label: { en: "Kid Friendly", uz: "Bolalar uchun", ru: "Для детей" } },
        { icon: "Coffee", label: { en: "Mini Kitchen", uz: "Mini oshxona", ru: "Мини-кухня" } }
      ],
      size: { en: "40 m²", uz: "40 m²", ru: "40 м²" },
      capacity: { en: "4 Guests", uz: "4 mehmon", ru: "4 гостя" }
    },
    {
      id: 'deluxe',
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      name: { en: "Deluxe Suite", uz: "Deluxe Lyuks", ru: "Люкс номер" },
      price: { en: "$249", uz: "2,490,000 so\'m", ru: "24,900 руб" },
      priceUnit: { en: "per night", uz: "bir kecha", ru: "за ночь" },
      description: {
        en: "Luxurious suite with premium amenities, city view, and exclusive services.",
        uz: "Premium qulayliklar, shahar manzarasi va eksklyuziv xizmatlar bilan hashamatli lyuks.",
        ru: "Роскошный люкс с премиальными удобствами, видом на город и эксклюзивными услугами."
      },
      features: [
        { icon: "Crown", label: { en: "Premium", uz: "Premium", ru: "Премиум" } },
        { icon: "MapPin", label: { en: "City View", uz: "Shahar manzarasi", ru: "Вид на город" } },
        { icon: "Utensils", label: { en: "Room Service", uz: "Xona xizmati", ru: "Обслуживание номеров" } },
        { icon: "Car", label: { en: "Valet Parking", uz: "Valet parking", ru: "Парковка с обслуживанием" } }
      ],
      size: { en: "60 m²", uz: "60 m²", ru: "60 м²" },
      capacity: { en: "2 Guests", uz: "2 mehmon", ru: "2 гостя" }
    }
  ];

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Bizning Xonalarimiz",
          subtitle: "Har bir ehtiyoj uchun mukammal xona tanlang",
          bookNow: "Hozir Bron Qiling",
          viewDetails: "Batafsil Ko'rish"
        };
      case 'ru':
        return {
          title: "Наши номера",
          subtitle: "Выберите идеальный номер для каждой потребности",
          bookNow: "Забронировать сейчас",
          viewDetails: "Подробнее"
        };
      default:
        return {
          title: "Our Rooms",
          subtitle: "Choose the perfect room for every need",
          bookNow: "Book Now",
          viewDetails: "View Details"
        };
    }
  };

  const handleSlideChange = (roomId, direction) => {
    const room = roomsData.find(r => r.id === roomId);
    const currentSlide = activeSlides[roomId] || 0;
    const totalSlides = room.images.length;
    
    let newSlide;
    if (direction === 'next') {
      newSlide = (currentSlide + 1) % totalSlides;
    } else {
      newSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    }
    
    setActiveSlides(prev => ({
      ...prev,
      [roomId]: newSlide
    }));
  };

  const handleBookRoom = (roomId) => {
    const roomData = roomsData.find(r => r.id === roomId);
    window.dispatchEvent(new CustomEvent('openBookingModal', { 
      detail: { 
        selectedRoom: roomData,
        roomType: roomData.name[currentLanguage]
      } 
    }));
  };

  const content = getContent();

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            {content.title}
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {roomsData.map((room) => {
            const currentSlide = activeSlides[room.id] || 0;
            
            return (
              <div key={room.id} className="bg-surface rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image Slider */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <Image
                    src={room.images[currentSlide]}
                    alt={`${room.name[currentLanguage]} - Image ${currentSlide + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Slider Controls */}
                  {room.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleSlideChange(room.id, 'prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Previous image"
                      >
                        <Icon name="ChevronLeft" size={20} />
                      </button>
                      <button
                        onClick={() => handleSlideChange(room.id, 'next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Next image"
                      >
                        <Icon name="ChevronRight" size={20} />
                      </button>
                      
                      {/* Slide Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {room.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveSlides(prev => ({ ...prev, [room.id]: index }))}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentSlide ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Room Type Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {room.name[currentLanguage]}
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  {/* Price and Size */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {room.price[currentLanguage]}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {room.priceUnit[currentLanguage]}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-text-primary">
                        {room.size[currentLanguage]}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {room.capacity[currentLanguage]}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {room.description[currentLanguage]}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name={feature.icon} size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-text-secondary">
                          {feature.label[currentLanguage]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      onClick={() => handleBookRoom(room.id)}
                      iconName="Calendar"
                      iconPosition="left"
                      className="flex-1"
                    >
                      {content.bookNow}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.dispatchEvent(new CustomEvent('viewRoomDetails', { detail: room }))}
                      iconName="Eye"
                      iconPosition="left"
                      className="flex-1"
                    >
                      {content.viewDetails}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoomShowcase;