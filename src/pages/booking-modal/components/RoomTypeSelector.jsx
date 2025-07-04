import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RoomTypeSelector = ({ selectedRoom, onRoomSelect, currentLanguage }) => {
  const roomTypes = [
    {
      id: 'standard',
      name: 'Standard Room',
      nameUz: 'Standart Xona',
      nameRu: 'Стандартный Номер',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV'],
      featuresUz: ['Bepul Wi-Fi', 'Konditsioner', 'Shaxsiy Hammom', 'Televizor'],
      featuresRu: ['Бесплатный Wi-Fi', 'Кондиционер', 'Личная Ванная', 'Телевизор'],
      maxGuests: 2
    },
    {
      id: 'family',
      name: 'Family Room',
      nameUz: 'Oilaviy Xona',
      nameRu: 'Семейный Номер',
      price: 180,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge'],
      featuresUz: ['Bepul Wi-Fi', 'Konditsioner', 'Shaxsiy Hammom', 'Televizor', 'Mini Muzlatgich'],
      featuresRu: ['Бесплатный Wi-Fi', 'Кондиционер', 'Личная Ванная', 'Телевизор', 'Мини Холодильник'],
      maxGuests: 4
    },
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      nameUz: 'Deluxe Lyuks',
      nameRu: 'Делюкс Люкс',
      price: 250,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Private Bathroom', 'TV', 'Mini Fridge', 'Balcony'],
      featuresUz: ['Bepul Wi-Fi', 'Konditsioner', 'Shaxsiy Hammom', 'Televizor', 'Mini Muzlatgich', 'Balkon'],
      featuresRu: ['Бесплатный Wi-Fi', 'Кондиционер', 'Личная Ванная', 'Телевизор', 'Мини Холодильник', 'Балкон'],
      maxGuests: 2
    }
  ];

  const getRoomName = (room) => {
    switch (currentLanguage) {
      case 'uz': return room.nameUz;
      case 'ru': return room.nameRu;
      default: return room.name;
    }
  };

  const getRoomFeatures = (room) => {
    switch (currentLanguage) {
      case 'uz': return room.featuresUz;
      case 'ru': return room.featuresRu;
      default: return room.features;
    }
  };

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Xona Turini Tanlang',
          perNight: 'tuniga',
          maxGuests: 'Maksimal mehmonlar'
        };
      case 'ru':
        return {
          title: 'Выберите Тип Номера',
          perNight: 'за ночь',
          maxGuests: 'Максимум гостей'
        };
      default:
        return {
          title: 'Select Room Type',
          perNight: 'per night',
          maxGuests: 'Max guests'
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">{labels.title}</h3>
      <div className="space-y-3">
        {roomTypes.map((room) => (
          <div
            key={room.id}
            onClick={() => onRoomSelect(room)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRoom?.id === room.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={room.image}
                  alt={getRoomName(room)}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-text-primary">{getRoomName(room)}</h4>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${room.price}</div>
                    <div className="text-sm text-text-secondary">{labels.perNight}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-sm text-text-secondary">
                    <Icon name="Users" size={16} />
                    <span>{labels.maxGuests}: {room.maxGuests}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {getRoomFeatures(room).slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {getRoomFeatures(room).length > 3 && (
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      +{getRoomFeatures(room).length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedRoom?.id === room.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedRoom?.id === room.id && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomTypeSelector;