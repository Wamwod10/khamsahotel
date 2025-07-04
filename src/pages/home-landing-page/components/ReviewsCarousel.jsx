import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewsCarousel = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const reviewsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2024-01-15",
      review: {
        en: "Absolutely wonderful stay! The staff was incredibly friendly and the room was spotless. The location is perfect for exploring the city. Will definitely return!",
        uz: "Ajoyib qolish! Xodimlar juda do'stona va xona juda toza edi. Joylashuv shaharni o'rganish uchun mukammal. Albatta qaytaman!",
        ru: "Абсолютно замечательное пребывание! Персонал был невероятно дружелюбным, а номер был безупречно чистым. Расположение идеально подходит для изучения города. Обязательно вернусь!"
      },
      country: "🇺🇸 USA"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      date: "2024-01-10",
      review: {
        en: "Exceptional service and beautiful rooms. The breakfast was delicious and the pool area was very relaxing. Highly recommend this hotel!",
        uz: "Ajoyib xizmat va chiroyli xonalar. Nonushta mazali va hovuz hududi juda tinch edi. Ushbu mehmonxonani tavsiya qilaman!",
        ru: "Исключительный сервис и красивые номера. Завтрак был вкусным, а зона бассейна очень расслабляющей. Настоятельно рекомендую этот отель!"
      },
      country: "🇦🇪 UAE"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4,
      date: "2024-01-08",
      review: {
        en: "Great hotel with modern amenities. The fitness center was well-equipped and the restaurant food was excellent. Minor issue with Wi-Fi but overall fantastic experience.",
        uz: "Zamonaviy qulayliklar bilan ajoyib mehmonxona. Fitnes markazi yaxshi jihozlangan va restoran taomi ajoyib edi. Wi-Fi bilan kichik muammo bor edi, lekin umuman ajoyib tajriba.",
        ru: "Отличный отель с современными удобствами. Фитнес-центр был хорошо оборудован, а еда в ресторане была превосходной. Небольшая проблема с Wi-Fi, но в целом фантастический опыт."
      },
      country: "🇪🇸 Spain"
    },
    {
      id: 4,
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 5,
      date: "2024-01-05",
      review: {
        en: "Perfect for business travel. The rooms are quiet, well-lit for work, and the business center facilities are top-notch. The concierge was very helpful with local recommendations.",
        uz: "Biznes sayohati uchun mukammal. Xonalar jim, ish uchun yaxshi yoritilgan va biznes markaz imkoniyatlari eng yaxshi. Konsyerj mahalliy tavsiyalar bilan juda yordam berdi.",
        ru: "Идеально подходит для деловых поездок. Номера тихие, хорошо освещены для работы, а возможности бизнес-центра первоклассные. Консьерж очень помог с местными рекомендациями."
      },
      country: "🇸🇬 Singapore"
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      rating: 5,
      date: "2024-01-02",
      review: {
        en: "Family-friendly hotel with excellent amenities for kids. The family room was spacious and the staff went above and beyond to make our children feel welcome. Outstanding service!",
        uz: "Bolalar uchun ajoyib qulayliklar bilan oilaviy mehmonxona. Oilaviy xona keng edi va xodimlar bolalarimizni xush kelibsiz his qilishlari uchun ko\'p harakat qildilar. Ajoyib xizmat!",
        ru: "Семейный отель с отличными удобствами для детей. Семейный номер был просторным, а персонал сделал все возможное, чтобы наши дети чувствовали себя желанными гостями. Выдающийся сервис!"
      },
      country: "🇬🇧 UK"
    },
    {
      id: 6,
      name: "Alexei Petrov",
      avatar: "https://randomuser.me/api/portraits/men/38.jpg",
      rating: 4,
      date: "2023-12-28",
      review: {
        en: "Comfortable stay with great value for money. The location is convenient and the parking is a big plus. Room service was prompt and the food quality was good.",
        uz: "Pul uchun ajoyib qiymat bilan qulay qolish. Joylashuv qulay va parking katta afzallik. Xona xizmati tez va ovqat sifati yaxshi edi.",
        ru: "Комфортное пребывание с отличным соотношением цены и качества. Расположение удобное, а парковка - большой плюс. Обслуживание номеров было быстрым, а качество еды хорошим."
      },
      country: "🇷🇺 Russia"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % reviewsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviewsData.length]);

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Mehmonlarimiz Fikrlari",
          subtitle: "Bizning xizmatlarimiz haqida haqiqiy sharhlar",
          showingText: "ko'rsatilmoqda",
          ofText: "dan",
          prevButton: "Oldingi",
          nextButton: "Keyingi"
        };
      case 'ru':
        return {
          title: "Отзывы наших гостей",
          subtitle: "Настоящие отзывы о наших услугах",
          showingText: "показано",
          ofText: "из",
          prevButton: "Предыдущий",
          nextButton: "Следующий"
        };
      default:
        return {
          title: "Guest Reviews",
          subtitle: "Real feedback from our valued guests",
          showingText: "Showing",
          ofText: "of",
          prevButton: "Previous",
          nextButton: "Next"
        };
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? reviewsData.length - 1 : prev - 1);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % reviewsData.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const content = getContent();
  const currentReview = reviewsData[currentSlide];

  return (
    <section className="py-16 lg:py-24 bg-background">
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

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Card */}
          <div className="bg-surface rounded-2xl shadow-lg p-8 lg:p-12 border border-border">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="w-20 h-20 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <Image
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-1">
                  {currentReview.name}
                </h4>
                <p className="text-sm text-text-secondary mb-2">
                  {currentReview.country}
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                  {renderStars(currentReview.rating)}
                </div>
                <p className="text-xs text-text-secondary">
                  {formatDate(currentReview.date)}
                </p>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="relative">
                  <Icon
                    name="Quote"
                    size={32}
                    className="text-primary/20 absolute -top-2 -left-2"
                  />
                  <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed pl-8">
                    "{currentReview.review[currentLanguage]}"
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePrevSlide}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label={content.prevButton}
            >
              <Icon name="ChevronLeft" size={20} />
              <span className="hidden sm:inline">{content.prevButton}</span>
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-2">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-primary scale-125' :'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextSlide}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label={content.nextButton}
            >
              <span className="hidden sm:inline">{content.nextButton}</span>
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Review Counter */}
          <div className="text-center mt-6">
            <p className="text-sm text-text-secondary">
              {content.showingText} {currentSlide + 1} {content.ofText} {reviewsData.length}
            </p>
          </div>

          {/* Auto-play Control */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 mx-auto px-3 py-1 rounded-lg text-xs text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={14} />
              <span>
                {isAutoPlaying 
                  ? (currentLanguage === 'uz' ? 'To\'xtatish' : currentLanguage === 'ru' ? 'Пауза' : 'Pause')
                  : (currentLanguage === 'uz' ? 'Davom ettirish' : currentLanguage === 'ru' ? 'Воспроизвести' : 'Play')
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;