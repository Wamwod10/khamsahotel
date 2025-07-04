import React from 'react';
import Input from '../../../components/ui/Input';

const GuestInformationForm = ({ 
  guestInfo, 
  onGuestInfoChange, 
  errors, 
  currentLanguage 
}) => {
  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Mehmon Ma\'lumotlari',
          fullName: 'To\'liq ism',
          email: 'Email manzil',
          phone: 'Telefon raqam',
          specialRequests: 'Maxsus so\'rovlar',
          fullNamePlaceholder: 'Ismingizni kiriting',
          emailPlaceholder: 'email@example.com',
          phonePlaceholder: '+998 90 123 45 67',
          specialRequestsPlaceholder: 'Qo\'shimcha so\'rovlar yoki izohlar...'
        };
      case 'ru':
        return {
          title: 'Информация о Госте',
          fullName: 'Полное имя',
          email: 'Email адрес',
          phone: 'Номер телефона',
          specialRequests: 'Особые пожелания',
          fullNamePlaceholder: 'Введите ваше имя',
          emailPlaceholder: 'email@example.com',
          phonePlaceholder: '+7 900 123 45 67',
          specialRequestsPlaceholder: 'Дополнительные пожелания или комментарии...'
        };
      default:
        return {
          title: 'Guest Information',
          fullName: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          specialRequests: 'Special Requests',
          fullNamePlaceholder: 'Enter your full name',
          emailPlaceholder: 'email@example.com',
          phonePlaceholder: '+1 (555) 123-4567',
          specialRequestsPlaceholder: 'Any special requests or comments...'
        };
    }
  };

  const labels = getLabels();

  const handleInputChange = (field, value) => {
    onGuestInfoChange({
      ...guestInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary">{labels.title}</h3>
      
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder={labels.fullNamePlaceholder}
            value={guestInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-error' : ''}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-error">{errors.fullName}</p>
          )}
        </div>

        <div>
          <Input
            type="email"
            placeholder={labels.emailPlaceholder}
            value={guestInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email}</p>
          )}
        </div>

        <div>
          <Input
            type="tel"
            placeholder={labels.phonePlaceholder}
            value={guestInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error">{errors.phone}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder={labels.specialRequestsPlaceholder}
            value={guestInfo.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestInformationForm;