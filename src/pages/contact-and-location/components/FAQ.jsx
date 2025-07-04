import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FAQ = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [openItems, setOpenItems] = useState(new Set());

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
          title: "Tez-tez so'raladigan savollar",
          subtitle: "Eng ko'p so'raladigan savollarga javoblar",
          faqs: [
            {
              question: "Mehmonxonada bepul Wi-Fi bormi?",
              answer: `Ha, bizda barcha xonalarda va umumiy joylarda bepul yuqori tezlikdagi Wi-Fi mavjud.\nMehmonlar uchun 24/7 internet xizmati ta'minlanadi.\nProfessional ishlar uchun biznes markaz ham mavjud.`
            },
            {
              question: "Qanday to'lov usullari qabul qilinadi?",
              answer: `Biz quyidagi to'lov usullarini qabul qilamiz:\n• Naqd pul (UZS, USD, EUR)\n• Bank kartalari (Visa, Mastercard, Humo, UzCard)\n• Elektron to'lovlar (Payme, Click)\n• Bank o'tkazmalari`
            },
            {
              question: "Aeroportdan mehmonxonagacha qanday borish mumkin?",
              answer: `Aeroportdan mehmonxonagacha bir necha yo'l bor:\n• Taksi xizmati (15-20 daqiqa)\n• Mehmonxona transferi (oldindan buyurtma)\n• Jamoat transporti (metro + avtobus)\n• Ijaraga olingan avtomobil`
            },
            {
              question: "Bron qilishni bekor qilish shartlari qanday?",
              answer: `Bron qilishni bekor qilish shartlari:\n• 24 soat oldin - bepul bekor qilish\n• 24 soatdan kam - birinchi kun to'lovi\n• Maxsus takliflar uchun alohida shartlar\n• Qaytarib berish 3-5 ish kunida amalga oshiriladi`
            }
          ]
        };
      case 'ru':
        return {
          title: "Часто задаваемые вопросы",
          subtitle: "Ответы на самые популярные вопросы",
          faqs: [
            {
              question: "Есть ли в отеле бесплатный Wi-Fi?",
              answer: `Да, у нас есть бесплатный высокоскоростной Wi-Fi во всех номерах и общественных зонах.\nИнтернет-сервис доступен для гостей 24/7.\nТакже доступен бизнес-центр для профессиональной работы.`
            },
            {
              question: "Какие способы оплаты принимаются?",
              answer: `Мы принимаем следующие способы оплаты:\n• Наличные (UZS, USD, EUR)\n• Банковские карты (Visa, Mastercard, Humo, UzCard)\n• Электронные платежи (Payme, Click)\n• Банковские переводы`
            },
            {
              question: "Как добраться от аэропорта до отеля?",
              answer: `От аэропорта до отеля есть несколько способов:\n• Такси (15-20 минут)\n• Трансфер отеля (предварительный заказ)\n• Общественный транспорт (метро + автобус)\n• Аренда автомобиля`
            },
            {
              question: "Каковы условия отмены бронирования?",
              answer: `Условия отмены бронирования:\n• За 24 часа - бесплатная отмена\n• Менее 24 часов - оплата первого дня\n• Специальные предложения имеют отдельные условия\n• Возврат средств в течение 3-5 рабочих дней`
            }
          ]
        };
      default:
        return {
          title: "Frequently Asked Questions",
          subtitle: "Answers to the most common questions",
          faqs: [
            {
              question: "Is there free Wi-Fi in the hotel?",
              answer: `Yes, we provide complimentary high-speed Wi-Fi in all rooms and public areas.\n24/7 internet service is available for all guests.\nBusiness center is also available for professional work.`
            },
            {
              question: "What payment methods are accepted?",
              answer: `We accept the following payment methods:\n• Cash (UZS, USD, EUR)\n• Credit cards (Visa, Mastercard, Humo, UzCard)\n• Electronic payments (Payme, Click)\n• Bank transfers`
            },
            {
              question: "How to get from the airport to the hotel?",
              answer: `There are several ways to get from the airport to the hotel:\n• Taxi service (15-20 minutes)\n• Hotel transfer (advance booking required)\n• Public transport (metro + bus)\n• Car rental`
            },
            {
              question: "What are the cancellation terms?",
              answer: `Cancellation terms:\n• 24 hours in advance - free cancellation\n• Less than 24 hours - first night charge\n• Special offers have separate terms\n• Refunds processed within 3-5 business days`
            }
          ]
        };
    }
  };

  const content = getContent();

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-3">
          {content.title}
        </h2>
        <p className="text-text-secondary text-base lg:text-lg">
          {content.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {content.faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-background hover:bg-primary/5 transition-colors duration-200"
            >
              <h3 className="text-base lg:text-lg font-medium text-text-primary pr-4">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                <Icon
                  name={openItems.has(index) ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className={`text-text-secondary transition-all duration-200 ${
                    openItems.has(index) ? 'text-primary' : ''
                  }`}
                />
              </div>
            </button>
            
            {openItems.has(index) && (
              <div className="px-6 py-4 bg-surface border-t border-border animate-slide-down">
                <div className="text-text-secondary leading-relaxed">
                  {faq.answer.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < faq.answer.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="HelpCircle" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
              {currentLanguage === 'uz' 
                ? "Boshqa savollaringiz bormi?" 
                : currentLanguage === 'ru' 
                ? "Есть другие вопросы?" :"Have other questions?"
              }
            </h3>
            <p className="text-text-secondary mb-4">
              {currentLanguage === 'uz' ? "Bizning qo'llab-quvvatlash jamoasi sizga yordam berishga tayyor." 
                : currentLanguage === 'ru' 
                ? "Наша команда поддержки готова помочь вам." :"Our support team is ready to help you."
              }
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+998711234567"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
              >
                <Icon name="Phone" size={16} className="mr-2" />
                {currentLanguage === 'uz' ? "Qo'ng'iroq qilish" : currentLanguage === 'ru' ? "Позвонить" : "Call Us"}
              </a>
              <a
                href="mailto:info@khamsahotel.uz"
                className="inline-flex items-center px-4 py-2 bg-background text-text-primary border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 text-sm font-medium"
              >
                <Icon name="Mail" size={16} className="mr-2" />
                {currentLanguage === 'uz' ? "Email yuborish" : currentLanguage === 'ru' ? "Написать" : "Send Email"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;