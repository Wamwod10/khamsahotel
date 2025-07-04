import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickReference = ({ currentLanguage }) => {
  const quickServices = [
    {
      id: 1,
      icon: "Phone",
      title: "Reception",
      titleUz: "Qabulxona",
      titleRu: "Ресепшн",
      contact: "+998 71 123 4567",
      status: "24/7",
      statusUz: "24/7",
      statusRu: "24/7"
    },
    {
      id: 2,
      icon: "Car",
      title: "Valet Parking",
      titleUz: "Avtomobil parkovkasi",
      titleRu: "Парковка",
      contact: "Ext. 101",
      status: "Available",
      statusUz: "Mavjud",
      statusRu: "Доступно"
    },
    {
      id: 3,
      icon: "Utensils",
      title: "Room Service",
      titleUz: "Xona xizmati",
      titleRu: "Обслуживание номеров",
      contact: "Ext. 102",
      status: "6:00 - 23:00",
      statusUz: "6:00 - 23:00",
      statusRu: "6:00 - 23:00"
    },
    {
      id: 4,
      icon: "Wifi",
      title: "Wi-Fi Support",
      titleUz: "Wi-Fi yordam",
      titleRu: "Поддержка Wi-Fi",
      contact: "Ext. 103",
      status: "24/7",
      statusUz: "24/7",
      statusRu: "24/7"
    }
  ];

  const getTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Tezkor aloqa';
      case 'ru': return 'Быстрая связь';
      default: return 'Quick Contact';
    }
  };

  const getServiceTitle = (service) => {
    switch (currentLanguage) {
      case 'uz': return service.titleUz;
      case 'ru': return service.titleRu;
      default: return service.title;
    }
  };

  const getServiceStatus = (service) => {
    switch (currentLanguage) {
      case 'uz': return service.statusUz;
      case 'ru': return service.statusRu;
      default: return service.status;
    }
  };

  const getEmergencyTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Favqulodda holat';
      case 'ru': return 'Экстренная связь';
      default: return 'Emergency Contact';
    }
  };

  const getRequestServiceText = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xizmat so\'rash';
      case 'ru': return 'Запросить услугу';
      default: return 'Request Service';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center space-x-2">
        <Icon name="Headphones" size={20} className="text-primary" />
        <span>{getTitle()}</span>
      </h3>
      
      <div className="space-y-4 mb-6">
        {quickServices.map((service) => (
          <div key={service.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-background transition-colors duration-200">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={service.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {getServiceTitle(service)}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-text-secondary">
                  {service.contact}
                </p>
                <span className="text-xs text-success font-medium">
                  {getServiceStatus(service)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm font-medium text-text-primary">
            {getEmergencyTitle()}
          </span>
        </div>
        <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
          <p className="text-sm text-text-primary font-medium">
            +998 71 911 0000
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {currentLanguage === 'uz' ? 'Favqulodda vaziyatlarda qo\'ng\'iroq qiling' :
             currentLanguage === 'ru'? 'Звоните в экстренных случаях' : 'Call for emergency situations'}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        iconName="MessageSquare"
        iconPosition="left"
        onClick={() => window.dispatchEvent(new CustomEvent('openGeneralServiceRequest'))}
      >
        {getRequestServiceText()}
      </Button>
    </div>
  );
};

export default QuickReference;