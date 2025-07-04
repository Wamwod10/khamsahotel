import React from 'react';
import RoomCard from './RoomCard';
import Icon from '../../../components/AppIcon';

const RoomGrid = ({ rooms, currentLanguage, onBookNow, isLoading }) => {
  const getNoRoomsMessage = () => {
    switch (currentLanguage) {
      case 'uz': return 'Hech qanday xona topilmadi';
      case 'ru': return 'Номера не найдены';
      default: return 'No rooms found';
    }
  };

  const getNoRoomsDescription = () => {
    switch (currentLanguage) {
      case 'uz': return 'Filtrlaringizni o\'zgartirib ko\'ring yoki boshqa sanalarni tanlang';
      case 'ru': return 'Попробуйте изменить фильтры или выбрать другие даты';
      default: return 'Try adjusting your filters or selecting different dates';
    }
  };

  const getLoadingMessage = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xonalar yuklanmoqda...';
      case 'ru': return 'Загрузка номеров...';
      default: return 'Loading rooms...';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-secondary">{getLoadingMessage()}</p>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            {getNoRoomsMessage()}
          </h3>
          <p className="text-text-secondary">
            {getNoRoomsDescription()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          currentLanguage={currentLanguage}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
};

export default RoomGrid;