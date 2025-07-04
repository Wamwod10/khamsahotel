import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodSelector = ({ selectedMethod, onMethodSelect, currentLanguage }) => {
  const paymentMethods = [
    {
      id: 'payme',
      name: 'Payme',
      icon: 'CreditCard',
      color: 'bg-blue-500',
      description: 'Pay with Payme',
      descriptionUz: 'Payme orqali to\'lash',
      descriptionRu: 'Оплата через Payme',
      priority: currentLanguage === 'uz' ? 1 : 3
    },
    {
      id: 'click',
      name: 'Click',
      icon: 'Smartphone',
      color: 'bg-green-500',
      description: 'Pay with Click',
      descriptionUz: 'Click orqali to\'lash',
      descriptionRu: 'Оплата через Click',
      priority: currentLanguage === 'uz' ? 2 : 4
    },
    {
      id: 'visa',
      name: 'Visa',
      icon: 'CreditCard',
      color: 'bg-blue-600',
      description: 'Pay with Visa card',
      descriptionUz: 'Visa karta orqali to\'lash',
      descriptionRu: 'Оплата картой Visa',
      priority: currentLanguage === 'en' ? 1 : 5
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      icon: 'CreditCard',
      color: 'bg-red-500',
      description: 'Pay with Mastercard',
      descriptionUz: 'Mastercard orqali to\'lash',
      descriptionRu: 'Оплата картой Mastercard',
      priority: currentLanguage === 'en' ? 2 : 6
    }
  ];

  const getDescription = (method) => {
    switch (currentLanguage) {
      case 'uz': return method.descriptionUz;
      case 'ru': return method.descriptionRu;
      default: return method.description;
    }
  };

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'To\'lov Usulini Tanlang'
        };
      case 'ru':
        return {
          title: 'Выберите Способ Оплаты'
        };
      default:
        return {
          title: 'Select Payment Method'
        };
    }
  };

  const labels = getLabels();
  const sortedMethods = [...paymentMethods].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">{labels.title}</h3>
      <div className="space-y-3">
        {sortedMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onMethodSelect(method)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedMethod?.id === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center`}>
                <Icon name={method.icon} size={24} className="text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary">{method.name}</h4>
                <p className="text-sm text-text-secondary">{getDescription(method)}</p>
              </div>
              
              <div className="flex-shrink-0">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod?.id === method.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedMethod?.id === method.id && (
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

export default PaymentMethodSelector;