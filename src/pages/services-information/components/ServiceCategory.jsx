import React from 'react';
import Icon from '../../../components/AppIcon';
import ServiceCard from './ServiceCard';

const ServiceCategory = ({ category, currentLanguage }) => {
  const getCategoryTitle = () => {
    switch (currentLanguage) {
      case 'uz': return category.titleUz;
      case 'ru': return category.titleRu;
      default: return category.title;
    }
  };

  const getCategoryDescription = () => {
    switch (currentLanguage) {
      case 'uz': return category.descriptionUz;
      case 'ru': return category.descriptionRu;
      default: return category.description;
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={category.icon} size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            {getCategoryTitle()}
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            {getCategoryDescription()}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            currentLanguage={currentLanguage}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;