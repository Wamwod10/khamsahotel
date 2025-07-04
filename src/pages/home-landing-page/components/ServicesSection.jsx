import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ServicesSection = () => {
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

  const servicesData = [
    {
      icon: "Clock",
      title: { en: "24/7 Reception", uz: "24/7 Qabulxona", ru: "Круглосуточная стойка регистрации" },
      description: {
        en: "Our friendly staff is available around the clock to assist you with any needs.",
        uz: "Bizning do'stona xodimlarimiz har qanday ehtiyojlaringizda yordam berish uchun doimo tayyorlar.",
        ru: "Наш дружелюбный персонал доступен круглосуточно, чтобы помочь вам с любыми потребностями."
      }
    },
    {
      icon: "Wifi",
      title: { en: "Free Wi-Fi", uz: "Bepul Wi-Fi", ru: "Бесплатный Wi-Fi" },
      description: {
        en: "High-speed internet access throughout the hotel for all your connectivity needs.",
        uz: "Barcha aloqa ehtiyojlaringiz uchun mehmonxona bo\'ylab yuqori tezlikdagi internet.",
        ru: "Высокоскоростной интернет по всему отелю для всех ваших потребностей в подключении."
      }
    },
    {
      icon: "Sparkles",
      title: { en: "Daily Housekeeping", uz: "Kundalik Tozalash", ru: "Ежедневная уборка" },
      description: {
        en: "Professional cleaning service to ensure your room is always fresh and comfortable.",
        uz: "Xonangiz doimo toza va qulay bo'lishini ta'minlash uchun professional tozalash xizmati.",
        ru: "Профессиональная служба уборки, чтобы ваш номер всегда был свежим и комфортным."
      }
    },
    {
      icon: "Car",
      title: { en: "Free Parking", uz: "Bepul Parking", ru: "Бесплатная парковка" },
      description: {
        en: "Secure parking space available for all guests at no additional charge.",
        uz: "Barcha mehmonlar uchun qo\'shimcha to\'lovsiz xavfsiz parking joyi mavjud.",
        ru: "Безопасное парковочное место доступно для всех гостей без дополнительной платы."
      }
    },
    {
      icon: "Utensils",
      title: { en: "Restaurant & Bar", uz: "Restoran va Bar", ru: "Ресторан и бар" },
      description: {
        en: "Enjoy delicious local and international cuisine at our on-site restaurant.",
        uz: "Bizning mehmonxonadagi restoranda mazali mahalliy va xalqaro taomlardan bahramand bo\'ling.",
        ru: "Наслаждайтесь вкусной местной и международной кухней в нашем ресторане."
      }
    },
    {
      icon: "Dumbbell",
      title: { en: "Fitness Center", uz: "Fitnes Markazi", ru: "Фитнес-центр" },
      description: {
        en: "Stay active with our modern fitness equipment and exercise facilities.",
        uz: "Zamonaviy fitnes uskunalari va mashq qilish imkoniyatlari bilan faol qoling.",
        ru: "Оставайтесь активными с нашим современным фитнес-оборудованием и тренажерами."
      }
    },
    {
      icon: "Waves",
      title: { en: "Swimming Pool", uz: "Suzish Havzasi", ru: "Бассейн" },
      description: {
        en: "Relax and unwind in our beautiful outdoor swimming pool area.",
        uz: "Chiroyli ochiq suzish havzasi hududida dam oling va zavqlaning.",
        ru: "Расслабьтесь и отдохните в нашем красивом открытом бассейне."
      }
    },
    {
      icon: "Plane",
      title: { en: "Airport Transfer", uz: "Aeroport Transferi", ru: "Трансфер из аэропорта" },
      description: {
        en: "Convenient transportation service to and from the airport upon request.",
        uz: "So\'rov bo\'yicha aeroportga va aeroportdan qulay transport xizmati.",
        ru: "Удобная транспортная служба в аэропорт и из аэропорта по запросу."
      }
    }
  ];

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Bizning Xizmatlarimiz",
          subtitle: "Sizning qolishingizni yanada qulay qilish uchun keng xizmatlar"
        };
      case 'ru':
        return {
          title: "Наши услуги",
          subtitle: "Широкий спектр услуг, чтобы сделать ваше пребывание более комфортным"
        };
      default:
        return {
          title: "Our Services",
          subtitle: "Comprehensive amenities to make your stay more comfortable"
        };
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

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-background hover:bg-primary/5 transition-all duration-300 hover:shadow-lg border border-border hover:border-primary/20"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                <Icon 
                  name={service.icon} 
                  size={32} 
                  className="text-primary group-hover:text-primary transition-colors duration-300" 
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title[currentLanguage]}
              </h3>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {service.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-text-secondary">
            <Icon name="Info" size={20} className="text-primary" />
            <span className="text-lg">
              {currentLanguage === 'uz' ? "Qo'shimcha xizmatlar haqida ma'lumot olish uchun qabulxonaga murojaat qiling"
                : currentLanguage === 'ru'
                ? "Для получения информации о дополнительных услугах обращайтесь на стойку регистрации" :"Contact our reception for information about additional services"
              }
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;