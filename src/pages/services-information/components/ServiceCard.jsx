import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getServiceTitle = () => {
    switch (currentLanguage) {
      case 'uz': return service.titleUz;
      case 'ru': return service.titleRu;
      default: return service.title;
    }
  };

  const getServiceDescription = () => {
    switch (currentLanguage) {
      case 'uz': return service.descriptionUz;
      case 'ru': return service.descriptionRu;
      default: return service.description;
    }
  };

  const getServiceDetails = () => {
    switch (currentLanguage) {
      case 'uz': return service.detailsUz;
      case 'ru': return service.detailsRu;
      default: return service.details;
    }
  };

  const getExpandButtonText = () => {
    switch (currentLanguage) {
      case 'uz': return isExpanded ? 'Kamroq ko\'rsatish' : 'Batafsil';
      case 'ru': return isExpanded ? 'Показать меньше' : 'Подробнее';
      default: return isExpanded ? 'Show Less' : 'Learn More';
    }
  };

  const getRequestButtonText = () => {
    switch (currentLanguage) {
      case 'uz': return 'So\'rov yuborish';
      case 'ru': return 'Запросить';
      default: return 'Request Service';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
            service.isPremium ? 'bg-accent/20' : 'bg-primary/10'
          }`}>
            <Icon 
              name={service.icon} 
              size={24} 
              className={service.isPremium ? 'text-accent' : 'text-primary'} 
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary">
                {getServiceTitle()}
              </h3>
              {service.isPremium && (
                <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">
                  {currentLanguage === 'uz' ? 'Premium' : currentLanguage === 'ru' ? 'Премиум' : 'Premium'}
                </span>
              )}
            </div>
            
            <p className="text-text-secondary text-sm mb-4 leading-relaxed">
              {getServiceDescription()}
            </p>

            {service.features && (
              <div className="mb-4">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span>
                        {currentLanguage === 'uz' ? feature.uz : 
                         currentLanguage === 'ru' ? feature.ru : feature.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.hours && (
              <div className="mb-4 p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">
                    {currentLanguage === 'uz' ? 'Ish vaqti' : 
                     currentLanguage === 'ru' ? 'Часы работы' : 'Service Hours'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary ml-6">
                  {currentLanguage === 'uz' ? service.hours.uz : 
                   currentLanguage === 'ru' ? service.hours.ru : service.hours.en}
                </p>
              </div>
            )}

            {service.pricing && (
              <div className="mb-4 p-3 bg-success/5 rounded-lg border border-success/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">
                    {currentLanguage === 'uz' ? 'Narx' : 
                     currentLanguage === 'ru' ? 'Цена' : 'Price'}
                  </span>
                  <span className="text-lg font-semibold text-success">
                    {service.pricing}
                  </span>
                </div>
              </div>
            )}

            {isExpanded && service.details && (
              <div className="mb-4 p-4 bg-background rounded-lg animate-slide-down">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {getServiceDetails()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {service.details && (
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(!isExpanded)}
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  className="flex-1"
                >
                  {getExpandButtonText()}
                </Button>
              )}
              
              {service.requestable && (
                <Button
                  variant="primary"
                  onClick={() => window.dispatchEvent(new CustomEvent('openServiceRequest', { detail: service }))}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1"
                >
                  {getRequestButtonText()}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;