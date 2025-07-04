import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ServiceCategory from './components/ServiceCategory';
import QuickReference from './components/QuickReference';
import ServiceRequestModal from './components/ServiceRequestModal';

const ServicesInformation = () => {
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

  const serviceCategories = [
    {
      id: 1,
      title: "Reception Services",
      titleUz: "Qabulxona xizmatlari",
      titleRu: "Услуги ресепшн",
      description: "24/7 front desk assistance and guest services",
      descriptionUz: "24/7 qabulxona yordami va mehmon xizmatlari",
      descriptionRu: "Круглосуточная помощь на ресепшн и услуги для гостей",
      icon: "Users",
      services: [
        {
          id: 1,
          title: "24/7 Reception",
          titleUz: "24/7 Qabulxona",
          titleRu: "Круглосуточная ресепшн",
          description: "Our friendly reception staff is available around the clock to assist with check-in, check-out, and any guest inquiries.",
          descriptionUz: "Bizning do'stona qabulxona xodimlarimiz kecha-kunduz ro'yxatdan o'tish, chiqish va har qanday mehmon so'rovlariga yordam berish uchun mavjud.",
          descriptionRu: "Наш дружелюбный персонал ресепшн доступен круглосуточно для помощи с заселением, выселением и любыми вопросами гостей.",
          icon: "Clock",
          hours: {
            en: "24 hours daily",
            uz: "Kuniga 24 soat",
            ru: "24 часа в сутки"
          },
          features: [
            {
              en: "Express check-in/check-out",
              uz: "Tezkor ro\'yxatdan o\'tish/chiqish",
              ru: "Экспресс заселение/выселение"
            },
            {
              en: "Multilingual staff",
              uz: "Ko\'p tilli xodimlar",
              ru: "Многоязычный персонал"
            },
            {
              en: "Guest information services",
              uz: "Mehmon ma\'lumot xizmatlari",
              ru: "Информационные услуги для гостей"
            }
          ],
          requestable: true
        },
        {
          id: 2,
          title: "Concierge Services",
          titleUz: "Konsyerj xizmatlari",
          titleRu: "Услуги консьержа",
          description: "Personal assistance with reservations, recommendations, and special arrangements to enhance your stay.",
          descriptionUz: "Bron qilish, tavsiyalar va maxsus tartiblar bilan shaxsiy yordam, sizning qolishingizni yaxshilash uchun.",
          descriptionRu: "Персональная помощь с бронированием, рекомендациями и специальными договоренностями для улучшения вашего пребывания.",
          icon: "UserCheck",
          hours: {
            en: "8:00 AM - 10:00 PM",
            uz: "8:00 - 22:00",
            ru: "8:00 - 22:00"
          },
          features: [
            {
              en: "Restaurant reservations",
              uz: "Restoran bronlari",
              ru: "Бронирование ресторанов"
            },
            {
              en: "Event tickets booking",
              uz: "Tadbir chiptalarini bron qilish",
              ru: "Бронирование билетов на мероприятия"
            },
            {
              en: "Local attraction recommendations",
              uz: "Mahalliy diqqatga sazovor joylar tavsiyalari",
              ru: "Рекомендации местных достопримечательностей"
            }
          ],
          requestable: true,
          isPremium: true
        }
      ]
    },
    {
      id: 2,
      title: "Room Amenities",
      titleUz: "Xona qulayliklari",
      titleRu: "Удобства в номере",
      description: "Comfort and convenience in every room",
      descriptionUz: "Har bir xonada qulaylik va qulaylik",
      descriptionRu: "Комфорт и удобство в каждом номере",
      icon: "Bed",
      services: [
        {
          id: 3,
          title: "Housekeeping",
          titleUz: "Xona tozalash",
          titleRu: "Уборка номеров",
          description: "Daily housekeeping service to maintain cleanliness and comfort throughout your stay.",
          descriptionUz: "Sizning qolishingiz davomida tozalik va qulaylikni saqlash uchun kunlik xona tozalash xizmati.",
          descriptionRu: "Ежедневная служба уборки для поддержания чистоты и комфорта во время вашего пребывания.",
          icon: "Sparkles",
          hours: {
            en: "9:00 AM - 5:00 PM",
            uz: "9:00 - 17:00",
            ru: "9:00 - 17:00"
          },
          features: [
            {
              en: "Daily room cleaning",
              uz: "Kunlik xona tozalash",
              ru: "Ежедневная уборка номера"
            },
            {
              en: "Fresh towels and linens",
              uz: "Yangi sochiqlar va choyshablar",
              ru: "Свежие полотенца и постельное белье"
            },
            {
              en: "Bathroom sanitization",
              uz: "Hammom dezinfeksiyasi",
              ru: "Дезинфекция ванной комнаты"
            }
          ],
          requestable: true
        },
        {
          id: 4,
          title: "Room Service",
          titleUz: "Xona xizmati",
          titleRu: "Обслуживание номеров",
          description: "Enjoy delicious meals and beverages delivered directly to your room at your convenience.",
          descriptionUz: "Sizning qulayligingiz uchun to\'g\'ridan-to\'g\'ri xonangizga yetkazib beriladigan mazali taomlar va ichimliklardan bahramand bo\'ling.",
          descriptionRu: "Наслаждайтесь вкусными блюдами и напитками, доставляемыми прямо в ваш номер в удобное для вас время.",
          icon: "Utensils",
          hours: {
            en: "6:00 AM - 11:00 PM",
            uz: "6:00 - 23:00",
            ru: "6:00 - 23:00"
          },
          features: [
            {
              en: "Full menu available",
              uz: "To\'liq menyu mavjud",
              ru: "Полное меню доступно"
            },
            {
              en: "24/7 beverage service",
              uz: "24/7 ichimlik xizmati",
              ru: "Круглосуточное обслуживание напитков"
            },
            {
              en: "Special dietary options",
              uz: "Maxsus parhez variantlari",
              ru: "Специальные диетические варианты"
            }
          ],
          requestable: true,
          pricing: "From $15"
        }
      ]
    },
    {
      id: 3,
      title: "Business Services",
      titleUz: "Biznes xizmatlari",
      titleRu: "Бизнес-услуги",
      description: "Professional services for business travelers",
      descriptionUz: "Biznes sayohatchilari uchun professional xizmatlar",
      descriptionRu: "Профессиональные услуги для деловых путешественников",
      icon: "Briefcase",
      services: [
        {
          id: 5,
          title: "Business Center",
          titleUz: "Biznes markaz",
          titleRu: "Бизнес-центр",
          description: "Fully equipped business center with computers, printers, and meeting facilities for your professional needs.",
          descriptionUz: "Sizning professional ehtiyojlaringiz uchun kompyuterlar, printerlar va yig\'ilish joylari bilan to\'liq jihozlangan biznes markaz.",
          descriptionRu: "Полностью оборудованный бизнес-центр с компьютерами, принтерами и конференц-залами для ваших профессиональных нужд.",
          icon: "Monitor",
          hours: {
            en: "6:00 AM - 10:00 PM",
            uz: "6:00 - 22:00",
            ru: "6:00 - 22:00"
          },
          features: [
            {
              en: "High-speed internet",
              uz: "Yuqori tezlikdagi internet",
              ru: "Высокоскоростной интернет"
            },
            {
              en: "Printing and scanning",
              uz: "Chop etish va skanerlash",
              ru: "Печать и сканирование"
            },
            {
              en: "Meeting room booking",
              uz: "Yig\'ilish xonasini bron qilish",
              ru: "Бронирование переговорной"
            }
          ],
          requestable: true
        },
        {
          id: 6,
          title: "Conference Facilities",
          titleUz: "Konferentsiya joylari",
          titleRu: "Конференц-залы",
          description: "Modern conference rooms and event spaces equipped with the latest technology for successful meetings.",
          descriptionUz: "Muvaffaqiyatli uchrashuvlar uchun eng so\'nggi texnologiya bilan jihozlangan zamonaviy konferentsiya xonalari va tadbir joylari.",
          descriptionRu: "Современные конференц-залы и мероприятийные площадки, оснащенные новейшими технологиями для успешных встреч.",
          icon: "Presentation",
          hours: {
            en: "24 hours (advance booking required)",
            uz: "24 soat (oldindan bron qilish talab qilinadi)",
            ru: "24 часа (требуется предварительное бронирование)"
          },
          features: [
            {
              en: "Audio-visual equipment",
              uz: "Audio-vizual jihozlar",
              ru: "Аудиовизуальное оборудование"
            },
            {
              en: "Catering services",
              uz: "Ovqatlanish xizmatlari",
              ru: "Кейтеринг услуги"
            },
            {
              en: "Technical support",
              uz: "Texnik yordam",
              ru: "Техническая поддержка"
            }
          ],
          requestable: true,
          isPremium: true,
          pricing: "From $200/day"
        }
      ]
    },
    {
      id: 4,
      title: "Recreation & Wellness",
      titleUz: "Dam olish va salomatlik",
      titleRu: "Отдых и велнес",
      description: "Relaxation and wellness facilities",
      descriptionUz: "Dam olish va salomatlik joylari",
      descriptionRu: "Релаксация и велнес-услуги",
      icon: "Heart",
      services: [
        {
          id: 7,
          title: "Fitness Center",
          titleUz: "Fitnes markaz",
          titleRu: "Фитнес-центр",
          description: "State-of-the-art fitness facility with modern equipment and personal training services available.",
          descriptionUz: "Zamonaviy jihozlar va shaxsiy mashq xizmatlari mavjud bo\'lgan eng zamonaviy fitnes markaz.",
          descriptionRu: "Современный фитнес-центр с современным оборудованием и услугами персонального тренера.",
          icon: "Dumbbell",
          hours: {
            en: "5:00 AM - 11:00 PM",
            uz: "5:00 - 23:00",
            ru: "5:00 - 23:00"
          },
          features: [
            {
              en: "Cardio equipment",
              uz: "Kardio jihozlar",
              ru: "Кардио оборудование"
            },
            {
              en: "Weight training area",
              uz: "Og'irlik mashq maydoni",
              ru: "Зона силовых тренировок"
            },
            {
              en: "Personal trainer available",
              uz: "Shaxsiy murabbiy mavjud",
              ru: "Персональный тренер доступен"
            }
          ],
          requestable: true
        },
        {
          id: 8,
          title: "Spa Services",
          titleUz: "Spa xizmatlari",
          titleRu: "СПА услуги",
          description: "Rejuvenating spa treatments and massage services to help you relax and unwind during your stay.",
          descriptionUz: "Sizning qolishingiz davomida dam olish va tinchlanish uchun yoshartiruvchi spa davolash va massaj xizmatlari.",
          descriptionRu: "Омолаживающие спа-процедуры и массажные услуги, которые помогут вам расслабиться и отдохнуть во время пребывания.",
          icon: "Flower",
          hours: {
            en: "9:00 AM - 9:00 PM",
            uz: "9:00 - 21:00",
            ru: "9:00 - 21:00"
          },
          features: [
            {
              en: "Therapeutic massages",
              uz: "Terapevtik massajlar",
              ru: "Терапевтические массажи"
            },
            {
              en: "Facial treatments",
              uz: "Yuz davolash",
              ru: "Процедуры для лица"
            },
            {
              en: "Aromatherapy sessions",
              uz: "Aromaterapiya seanslari",
              ru: "Сеансы ароматерапии"
            }
          ],
          requestable: true,
          isPremium: true,
          pricing: "From $80"
        }
      ]
    },
    {
      id: 5,
      title: "Transportation & Parking",
      titleUz: "Transport va to\'xtash joyi",
      titleRu: "Транспорт и парковка",
      description: "Convenient transportation and parking solutions",
      descriptionUz: "Qulay transport va to\'xtash joyi yechimlari",
      descriptionRu: "Удобные транспортные и парковочные решения",
      icon: "Car",
      services: [
        {
          id: 9,
          title: "Valet Parking",
          titleUz: "Valet to\'xtash joyi",
          titleRu: "Парковка с обслуживанием",
          description: "Convenient valet parking service available 24/7 for hotel guests with secure vehicle storage.",
          descriptionUz: "Mehmonxona mehmonlari uchun xavfsiz avtomobil saqlash bilan 24/7 mavjud bo\'lgan qulay valet to\'xtash joyi xizmati.",
          descriptionRu: "Удобная услуга парковки с обслуживанием, доступная 24/7 для гостей отеля с безопасным хранением автомобилей.",
          icon: "ParkingCircle",
          hours: {
            en: "24 hours daily",
            uz: "Kuniga 24 soat",
            ru: "24 часа в сутки"
          },
          features: [
            {
              en: "Secure parking garage",
              uz: "Xavfsiz to\'xtash garaji",
              ru: "Безопасный паркинг-гараж"
            },
            {
              en: "Professional valet staff",
              uz: "Professional valet xodimlari",
              ru: "Профессиональный персонал парковки"
            },
            {
              en: "Vehicle cleaning service",
              uz: "Avtomobil tozalash xizmati",
              ru: "Услуга мойки автомобиля"
            }
          ],
          requestable: true,
          pricing: "$25/night"
        },
        {
          id: 10,
          title: "Airport Transfer",
          titleUz: "Aeroport transferi",
          titleRu: "Трансфер из аэропорта",
          description: "Comfortable and reliable airport transfer service with professional drivers and luxury vehicles.",
          descriptionUz: "Professional haydovchilar va hashamatli avtomobillar bilan qulay va ishonchli aeroport transfer xizmati.",
          descriptionRu: "Комфортная и надежная услуга трансфера из аэропорта с профессиональными водителями и роскошными автомобилями.",
          icon: "Plane",
          hours: {
            en: "24 hours (advance booking required)",
            uz: "24 soat (oldindan bron qilish talab qilinadi)",
            ru: "24 часа (требуется предварительное бронирование)"
          },
          features: [
            {
              en: "Luxury vehicles",
              uz: "Hashamatli avtomobillar",
              ru: "Роскошные автомобили"
            },
            {
              en: "Professional chauffeurs",
              uz: "Professional haydovchilar",
              ru: "Профессиональные шоферы"
            },
            {
              en: "Flight tracking service",
              uz: "Parvoz kuzatuv xizmati",
              ru: "Служба отслеживания рейсов"
            }
          ],
          requestable: true,
          isPremium: true,
          pricing: "From $45"
        }
      ]
    }
  ];

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xizmatlar va qulayliklar';
      case 'ru': return 'Услуги и удобства';
      default: return 'Services & Amenities';
    }
  };

  const getPageSubtitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Khamsa Hotel\'da sizning qolishingizni mukammal qilish uchun keng ko\'lamli xizmatlar';
      case 'ru': return 'Широкий спектр услуг для идеального пребывания в Khamsa Hotel';
      default: return 'Comprehensive services to make your stay at Khamsa Hotel perfect';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-6">
                {getPageTitle()}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                {getPageSubtitle()}
              </p>
            </div>
          </div>
        </section>

        {/* Services Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {serviceCategories.map((category) => (
                  <ServiceCategory
                    key={category.id}
                    category={category}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <QuickReference currentLanguage={currentLanguage} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <ServiceRequestModal currentLanguage={currentLanguage} />
    </div>
  );
};

export default ServicesInformation;