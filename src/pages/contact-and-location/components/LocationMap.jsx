import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [mapView, setMapView] = useState('roadmap');

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
          title: "Bizning joylashuvimiz",
          subtitle: "Khamsa Hotel Toshkent markazida joylashgan",
          directions: "Yo'nalishlar",
          satellite: "Sun'iy yo'ldosh",
          roadmap: "Yo'l xaritasi",
          nearby: "Yaqin atrofda",
          landmarks: [
            { name: "Amir Temur maydoni", distance: "500m", icon: "MapPin" },
            { name: "Toshkent Xalqaro aeroporti", distance: "12km", icon: "Plane" },
            { name: "Toshkent Markaziy vokzali", distance: "3km", icon: "Train" },
            { name: "Chorsu bozori", distance: "2km", icon: "ShoppingBag" },
            { name: "Alisher Navoiy teatri", distance: "1.5km", icon: "Theater" },
            { name: "Toshkent Metro", distance: "300m", icon: "Navigation" }
          ],
          transportation: "Transport",
          transportOptions: [
            { name: "Metro", desc: "Amir Temur Hiyoboni stantsiyasi", icon: "Navigation" },
            { name: "Taksi", desc: "Yandex, Uber mavjud", icon: "Car" },
            { name: "Avtobus", desc: "11, 67, 89 marshrutlar", icon: "Bus" }
          ]
        };
      case 'ru':
        return {
          title: "Наше местоположение",
          subtitle: "Отель Khamsa расположен в центре Ташкента",
          directions: "Маршрут",
          satellite: "Спутник",
          roadmap: "Карта",
          nearby: "Поблизости",
          landmarks: [
            { name: "Площадь Амира Темура", distance: "500м", icon: "MapPin" },
            { name: "Международный аэропорт Ташкента", distance: "12км", icon: "Plane" },
            { name: "Центральный вокзал Ташкента", distance: "3км", icon: "Train" },
            { name: "Рынок Чорсу", distance: "2км", icon: "ShoppingBag" },
            { name: "Театр Алишера Навои", distance: "1.5км", icon: "Theater" },
            { name: "Метро Ташкента", distance: "300м", icon: "Navigation" }
          ],
          transportation: "Транспорт",
          transportOptions: [
            { name: "Метро", desc: "Станция Амир Темур Хиёбони", icon: "Navigation" },
            { name: "Такси", desc: "Доступны Яндекс, Uber", icon: "Car" },
            { name: "Автобус", desc: "Маршруты 11, 67, 89", icon: "Bus" }
          ]
        };
      default:
        return {
          title: "Our Location",
          subtitle: "Khamsa Hotel is located in the heart of Tashkent",
          directions: "Get Directions",
          satellite: "Satellite",
          roadmap: "Roadmap",
          nearby: "Nearby",
          landmarks: [
            { name: "Amir Temur Square", distance: "500m", icon: "MapPin" },
            { name: "Tashkent International Airport", distance: "12km", icon: "Plane" },
            { name: "Tashkent Central Railway Station", distance: "3km", icon: "Train" },
            { name: "Chorsu Bazaar", distance: "2km", icon: "ShoppingBag" },
            { name: "Alisher Navoi Theatre", distance: "1.5km", icon: "Theater" },
            { name: "Tashkent Metro", distance: "300m", icon: "Navigation" }
          ],
          transportation: "Transportation",
          transportOptions: [
            { name: "Metro", desc: "Amir Temur Hiyoboni Station", icon: "Navigation" },
            { name: "Taxi", desc: "Yandex, Uber available", icon: "Car" },
            { name: "Bus", desc: "Routes 11, 67, 89", icon: "Bus" }
          ]
        };
    }
  };

  const content = getContent();

  // Hotel coordinates (Tashkent city center)
  const hotelLat = 41.2995;
  const hotelLng = 69.2401;

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/place";
    const apiKey = "YOUR_API_KEY"; // In production, use environment variable
    return `https://www.google.com/maps?q=${hotelLat},${hotelLng}&z=15&output=embed&t=${mapView}`;
  };

  const handleDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hotelLat},${hotelLng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="bg-surface rounded-2xl shadow-lg overflow-hidden h-full">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-2">
              {content.title}
            </h2>
            <p className="text-text-secondary">
              {content.subtitle}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleDirections}
            iconName="Navigation"
            iconPosition="left"
            className="hidden sm:flex"
          >
            {content.directions}
          </Button>
        </div>

        {/* Map Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMapView('roadmap')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              mapView === 'roadmap' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {content.roadmap}
          </button>
          <button
            onClick={() => setMapView('satellite')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              mapView === 'satellite' ?'bg-primary text-primary-foreground' :'bg-background text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {content.satellite}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-64 lg:h-80">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Khamsa Hotel Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapUrl()}
          className="border-0"
        />
        
        {/* Mobile Directions Button */}
        <div className="absolute bottom-4 right-4 sm:hidden">
          <Button
            variant="primary"
            onClick={handleDirections}
            iconName="Navigation"
            size="sm"
            className="shadow-lg"
          >
            {content.directions}
          </Button>
        </div>
      </div>

      {/* Location Info */}
      <div className="p-6 lg:p-8 space-y-6">
        {/* Nearby Landmarks */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2 text-primary" />
            {content.nearby}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.landmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-background rounded-lg hover:bg-primary/5 transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={landmark.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {landmark.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {landmark.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transportation */}
        <div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Car" size={20} className="mr-2 text-primary" />
            {content.transportation}
          </h3>
          <div className="space-y-3">
            {content.transportOptions.map((transport, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-background rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={transport.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {transport.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {transport.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;