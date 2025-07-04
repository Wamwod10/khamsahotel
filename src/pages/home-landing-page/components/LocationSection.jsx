import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSection = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const locationData = {
    coordinates: { lat: 41.2995, lng: 69.2401 }, // Tashkent coordinates
    address: {
      en: "123 Amir Timur Avenue, Tashkent 100000, Uzbekistan",
      uz: "Amir Temur shoh ko\'chasi 123, Toshkent 100000, O\'zbekiston",
      ru: "Проспект Амира Тимура 123, Ташкент 100000, Узбекистан"
    },
    phone: "+998 71 123 45 67",
    email: "info@khamsahotel.uz",
    telegram: "@khamsahotel"
  };

  const contactInfo = [
    {
      icon: "MapPin",
      label: { en: "Address", uz: "Manzil", ru: "Адрес" },
      value: locationData.address,
      action: "address"
    },
    {
      icon: "Phone",
      label: { en: "Phone", uz: "Telefon", ru: "Телефон" },
      value: locationData.phone,
      action: "phone"
    },
    {
      icon: "Mail",
      label: { en: "Email", uz: "Email", ru: "Электронная почта" },
      value: locationData.email,
      action: "email"
    },
    {
      icon: "MessageCircle",
      label: { en: "Telegram", uz: "Telegram", ru: "Телеграм" },
      value: locationData.telegram,
      action: "telegram"
    }
  ];

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Bizning Joylashuvimiz",
          subtitle: "Shahar markazida qulay joylashgan, asosiy diqqatga sazovor joylarga yaqin",
          mapTitle: "Khamsa Hotel Joylashuvi",
          contactTitle: "Biz bilan bog'laning",
          directionsButton: "Yo'nalishlarni olish",
          callButton: "Qo'ng'iroq qilish",
          emailButton: "Email yuborish",
          telegramButton: "Telegram orqali yozish"
        };
      case 'ru':
        return {
          title: "Наше расположение",
          subtitle: "Удобно расположен в центре города, рядом с основными достопримечательностями",
          mapTitle: "Расположение Khamsa Hotel",
          contactTitle: "Свяжитесь с нами",
          directionsButton: "Получить направления",
          callButton: "Позвонить",
          emailButton: "Отправить email",
          telegramButton: "Написать в Telegram"
        };
      default:
        return {
          title: "Our Location",
          subtitle: "Conveniently located in the city center, close to major attractions",
          mapTitle: "Khamsa Hotel Location",
          contactTitle: "Get in Touch",
          directionsButton: "Get Directions",
          callButton: "Call Now",
          emailButton: "Send Email",
          telegramButton: "Message on Telegram"
        };
    }
  };

  const handleContactAction = (action, value) => {
    switch (action) {
      case 'address':
        window.open(`https://www.google.com/maps?q=${locationData.coordinates.lat},${locationData.coordinates.lng}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_self');
        break;
      case 'telegram':
        window.open(`https://t.me/${value.replace('@', '')}`, '_blank');
        break;
      default:
        break;
    }
  };

  const content = getContent();

  return (
    <section className="py-16 lg:py-24 bg-surface">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-background rounded-2xl overflow-hidden shadow-lg border border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-semibold text-text-primary flex items-center">
                  <Icon name="MapPin" size={24} className="text-primary mr-3" />
                  {content.mapTitle}
                </h3>
              </div>
              
              <div className="relative h-80 lg:h-96">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Khamsa Hotel Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${locationData.coordinates.lat},${locationData.coordinates.lng}&z=15&output=embed`}
                  className="border-0"
                />
              </div>
              
              <div className="p-6">
                <Button
                  variant="primary"
                  onClick={() => handleContactAction('address', locationData.address[currentLanguage])}
                  iconName="Navigation"
                  iconPosition="left"
                  fullWidth
                  className="shadow-md hover:shadow-lg"
                >
                  {content.directionsButton}
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-semibold text-text-primary mb-8 flex items-center">
                <Icon name="Phone" size={28} className="text-primary mr-3" />
                {content.contactTitle}
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/20">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200 flex-shrink-0">
                        <Icon 
                          name={info.icon} 
                          size={20} 
                          className="text-primary" 
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-text-secondary mb-1">
                          {info.label[currentLanguage]}
                        </h4>
                        <p className="text-text-primary font-medium break-words">
                          {typeof info.value === 'object' ? info.value[currentLanguage] : info.value}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Icon 
                          name="ExternalLink" 
                          size={16} 
                          className="text-text-secondary group-hover:text-primary transition-colors duration-200" 
                        />
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-3 ml-16">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactAction(info.action, typeof info.value === 'object' ? info.value[currentLanguage] : info.value)}
                        iconName={info.icon}
                        iconPosition="left"
                        className="text-xs"
                      >
                        {info.action === 'address' && content.directionsButton}
                        {info.action === 'phone' && content.callButton}
                        {info.action === 'email' && content.emailButton}
                        {info.action === 'telegram' && content.telegramButton}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm">
                    {currentLanguage === 'uz' 
                      ? "24/7 qabulxona xizmati"
                      : currentLanguage === 'ru'
                      ? "Круглосуточная стойка регистрации" :"24/7 Front Desk Service"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;