import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import LocationMap from './components/LocationMap';
import FAQ from './components/FAQ';

const ContactAndLocation = () => {
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

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'uz':
        return "Aloqa va Joylashuv";
      case 'ru':
        return "Контакты и Местоположение";
      default:
        return "Contact & Location";
    }
  };

  const getPageSubtitle = () => {
    switch (currentLanguage) {
      case 'uz':
        return "Biz bilan bog'laning va bizning joylashuvimizni bilib oling";
      case 'ru':
        return "Свяжитесь с нами и узнайте наше местоположение";
      default:
        return "Get in touch with us and find our location";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              {getPageSubtitle()}
            </p>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>

          {/* Location Map Section */}
          <div className="mb-16">
            <LocationMap />
          </div>

          {/* FAQ Section */}
          <div>
            <FAQ />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.92 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                  <path d="M12 7v5l4 2-4 2v5" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-lg font-heading font-semibold text-text-primary">
                KhamsaHotel
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} KhamsaHotel. {
                currentLanguage === 'uz' 
                  ? "Barcha huquqlar himoyalangan." 
                  : currentLanguage === 'ru' 
                  ? "Все права защищены." :"All rights reserved."
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactAndLocation;