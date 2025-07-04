import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const ContactInfo = () => {
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

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Biz bilan bog'laning",
          subtitle: "Har qanday savol yoki takliflar uchun biz bilan bog'laning",
          address: "Manzil",
          phone: "Telefon",
          email: "Elektron pochta",
          hours: "Ish vaqti",
          social: "Ijtimoiy tarmoqlar",
          emergency: "Favqulodda aloqa",
          addressText: "Toshkent shahri, Amir Temur ko'chasi 15-uy",
          phoneMain: "+998 71 123 45 67",
          phoneReception: "+998 71 123 45 68",
          emailMain: "info@khamsahotel.uz",
          emailBooking: "booking@khamsahotel.uz",
          hoursReception: "Qabulxona: 24/7",
          hoursRestaurant: "Restoran: 07:00 - 23:00",
          hoursSpa: "Spa: 09:00 - 21:00",
          emergencyText: "Favqulodda vaziyatlarda 24/7 xizmat"
        };
      case 'ru':
        return {
          title: "Свяжитесь с нами",
          subtitle: "Обращайтесь к нам по любым вопросам или предложениям",
          address: "Адрес",
          phone: "Телефон",
          email: "Электронная почта",
          hours: "Часы работы",
          social: "Социальные сети",
          emergency: "Экстренная связь",
          addressText: "г. Ташкент, ул. Амира Темура 15",
          phoneMain: "+998 71 123 45 67",
          phoneReception: "+998 71 123 45 68",
          emailMain: "info@khamsahotel.uz",
          emailBooking: "booking@khamsahotel.uz",
          hoursReception: "Стойка регистрации: 24/7",
          hoursRestaurant: "Ресторан: 07:00 - 23:00",
          hoursSpa: "Спа: 09:00 - 21:00",
          emergencyText: "Экстренная помощь 24/7"
        };
      default:
        return {
          title: "Get in Touch",
          subtitle: "Contact us for any questions or suggestions",
          address: "Address",
          phone: "Phone",
          email: "Email",
          hours: "Operating Hours",
          social: "Social Media",
          emergency: "Emergency Contact",
          addressText: "15 Amir Temur Street, Tashkent, Uzbekistan",
          phoneMain: "+998 71 123 45 67",
          phoneReception: "+998 71 123 45 68",
          emailMain: "info@khamsahotel.uz",
          emailBooking: "booking@khamsahotel.uz",
          hoursReception: "Reception: 24/7",
          hoursRestaurant: "Restaurant: 07:00 - 23:00",
          hoursSpa: "Spa: 09:00 - 21:00",
          emergencyText: "Emergency assistance available 24/7"
        };
    }
  };

  const content = getContent();

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/khamsahotel', color: 'text-pink-500' },
    { name: 'Facebook', icon: 'Facebook', url: 'https://facebook.com/khamsahotel', color: 'text-blue-600' },
    { name: 'Telegram', icon: 'MessageCircle', url: 'https://t.me/khamsahotel', color: 'text-blue-500' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/khamsahotel', color: 'text-blue-400' }
  ];

  return (
    <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8 h-full">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-3">
          {content.title}
        </h2>
        <p className="text-text-secondary text-base lg:text-lg">
          {content.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="MapPin" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              {content.address}
            </h3>
            <p className="text-text-secondary">
              {content.addressText}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Phone" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              {content.phone}
            </h3>
            <div className="space-y-2">
              <a 
                href={`tel:${content.phoneMain}`}
                className="block text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {content.phoneMain}
              </a>
              <a 
                href={`tel:${content.phoneReception}`}
                className="block text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {content.phoneReception}
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Mail" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              {content.email}
            </h3>
            <div className="space-y-2">
              <a 
                href={`mailto:${content.emailMain}`}
                className="block text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {content.emailMain}
              </a>
              <a 
                href={`mailto:${content.emailBooking}`}
                className="block text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {content.emailBooking}
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Clock" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              {content.hours}
            </h3>
            <div className="space-y-2 text-text-secondary">
              <p>{content.hoursReception}</p>
              <p>{content.hoursRestaurant}</p>
              <p>{content.hoursSpa}</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="Share2" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-4">
              {content.social}
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-background rounded-lg hover:bg-primary/10 transition-all duration-200 group"
                >
                  <Icon 
                    name={social.icon} 
                    size={20} 
                    className={`${social.color} group-hover:scale-110 transition-transform duration-200`} 
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-error/5 border border-error/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertCircle" size={20} className="text-error" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-heading font-medium text-error mb-1">
                {content.emergency}
              </h3>
              <p className="text-sm text-text-secondary">
                {content.emergencyText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;