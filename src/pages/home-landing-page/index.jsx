import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import RoomShowcase from './components/RoomShowcase';
import ServicesSection from './components/ServicesSection';
import ReviewsCarousel from './components/ReviewsCarousel';
import LocationSection from './components/LocationSection';

const HomeLandingPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title based on language
    const updatePageTitle = () => {
      const currentLanguage = localStorage.getItem('language') || 'en';
      let title;
      
      switch (currentLanguage) {
        case 'uz':
          title = "Khamsa Hotel - Bosh Sahifa | Zamonaviy Mehmonxona";
          break;
        case 'ru':
          title = "Khamsa Hotel - Главная | Современный Отель";
          break;
        default:
          title = "Khamsa Hotel - Home | Modern Hospitality";
      }
      
      document.title = title;
    };

    updatePageTitle();

    // Listen for language changes
    const handleLanguageChange = () => {
      updatePageTitle();
    };

    window.addEventListener('languageChange', handleLanguageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <Header />
      
      {/* Hero Section with Booking Form */}
      <HeroSection />
      
      {/* Room Showcase */}
      <RoomShowcase />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Reviews Carousel */}
      <ReviewsCarousel />
      
      {/* Location & Contact */}
      <LocationSection />
    </div>
  );
};

export default HomeLandingPage;