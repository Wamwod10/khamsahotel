import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const location = useLocation();
  const languageDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Choose Room', labelUz: 'Xona tanlang', labelRu: 'Выбрать номер', path: '/rooms-catalog', icon: 'Search' },
    { label: 'Home', labelUz: 'Bosh sahifa', labelRu: 'Главная', path: '/home-landing-page', icon: 'Home' },
    { label: 'Rooms', labelUz: 'Xonalar', labelRu: 'Номера', path: '/rooms-catalog', icon: 'Bed' },
    { label: 'Gallery', labelUz: 'Galereya', labelRu: 'Галерея', path: '/gallery', icon: 'Image' },
    { label: 'Services', labelUz: 'Xizmatlar', labelRu: 'Услуги', path: '/services-information', icon: 'Concierge' },
    { label: 'Reviews', labelUz: 'Sharhlar', labelRu: 'Отзывы', path: '/reviews-and-testimonials', icon: 'Star' },
    { label: 'Contact', labelUz: 'Aloqa', labelRu: 'Контакты', path: '/contact-and-location', icon: 'MapPin' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentLanguage(savedLanguage);
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsLanguageDropdownOpen(false);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }));
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }));
  };

  const handleBookingModal = () => {
    setIsBookingModalOpen(true);
    window.dispatchEvent(new CustomEvent('openBookingModal'));
  };

  const getNavigationLabel = (item) => {
    switch (currentLanguage) {
      case 'uz': return item.labelUz;
      case 'ru': return item.labelRu;
      default: return item.label;
    }
  };

  const getBookingLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Bron qilish';
      case 'ru': return 'Забронировать';
      default: return 'Book Now';
    }
  };

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage);

  return (
    <header className="fixed top-0 left-0 right-0 z-90 bg-surface/95 backdrop-blur-sm border-b border-border shadow-md">
      <div className="max-w-7_5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home-landing-page" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors duration-200">
              <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.92 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                <path d="M12 7v5l4 2-4 2v5" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                KhamsaHotel
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/5 border border-primary/20' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{getNavigationLabel(item)}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <span className="text-base">{currentLanguageData?.flag}</span>
                <span className="hidden sm:inline">{currentLanguageData?.name}</span>
                <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border animate-slide-down z-100">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-primary/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        currentLanguage === language.code ? 'text-primary bg-primary/5' : 'text-text-secondary'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <Icon name="Check" size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
            </button>

            {/* Book Now Button */}
            <Button
              variant="primary"
              onClick={handleBookingModal}
              iconName="Calendar"
              iconPosition="left"
              className="shadow-md hover:shadow-lg"
            >
              {getBookingLabel()}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-surface border-b border-border shadow-lg animate-slide-down"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{getNavigationLabel(item)}</span>
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-border">
                <div className="px-4 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                  {currentLanguage === 'uz' ? 'Til' : currentLanguage === 'ru' ? 'Язык' : 'Language'}
                </div>
                <div className="space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageChange(language.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                        currentLanguage === language.code
                          ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <Icon name="Check" size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Book Now Button */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleBookingModal();
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="Calendar"
                  iconPosition="left"
                  fullWidth
                  className="shadow-md"
                >
                  {getBookingLabel()}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;