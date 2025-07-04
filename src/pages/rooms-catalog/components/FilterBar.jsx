import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterBar = ({ 
  filters, 
  onFiltersChange, 
  currentLanguage, 
  onSortChange, 
  sortBy,
  isMobile 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilterLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Filtr';
      case 'ru': return 'Фильтр';
      default: return 'Filter';
    }
  };

  const getSortLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Saralash';
      case 'ru': return 'Сортировка';
      default: return 'Sort';
    }
  };

  const getClearLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Tozalash';
      case 'ru': return 'Очистить';
      default: return 'Clear';
    }
  };

  const getApplyLabel = () => {
    switch (currentLanguage) {
      case 'uz': return 'Qo\'llash';
      case 'ru': return 'Применить';
      default: return 'Apply';
    }
  };

  const sortOptions = [
    { 
      value: 'price-low', 
      label: currentLanguage === 'uz' ? 'Narx: Pastdan yuqoriga' : 
             currentLanguage === 'ru'? 'Цена: По возрастанию' : 'Price: Low to High' 
    },
    { 
      value: 'price-high', 
      label: currentLanguage === 'uz' ? 'Narx: Yuqoridan pastga' : 
             currentLanguage === 'ru'? 'Цена: По убыванию' : 'Price: High to Low' 
    },
    { 
      value: 'capacity', 
      label: currentLanguage === 'uz' ? 'Sig\'im' : 
             currentLanguage === 'ru'? 'Вместимость' : 'Capacity' 
    },
    { 
      value: 'name', 
      label: currentLanguage === 'uz' ? 'Nom' : 
             currentLanguage === 'ru'? 'Название' : 'Name' 
    }
  ];

  const amenityOptions = [
    { 
      value: 'wifi', 
      label: currentLanguage === 'uz' ? 'Wi-Fi' : 
             currentLanguage === 'ru'? 'Wi-Fi' : 'Wi-Fi',
      icon: 'Wifi'
    },
    { 
      value: 'ac', 
      label: currentLanguage === 'uz' ? 'Konditsioner' : 
             currentLanguage === 'ru'? 'Кондиционер' : 'Air Conditioning',
      icon: 'Wind'
    },
    { 
      value: 'tv', 
      label: currentLanguage === 'uz' ? 'Televizor' : 
             currentLanguage === 'ru'? 'Телевизор' : 'TV',
      icon: 'Tv'
    },
    { 
      value: 'minibar', 
      label: currentLanguage === 'uz' ? 'Minibar' : 
             currentLanguage === 'ru'? 'Мини-бар' : 'Minibar',
      icon: 'Coffee'
    },
    { 
      value: 'balcony', 
      label: currentLanguage === 'uz' ? 'Balkon' : 
             currentLanguage === 'ru'? 'Балкон' : 'Balcony',
      icon: 'Home'
    }
  ];

  const handleTempFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 1000],
      capacity: '',
      amenities: [],
      availability: 'all',
      checkIn: '',
      checkOut: ''
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.capacity) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.availability !== 'all') count++;
    if (filters.checkIn || filters.checkOut) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {currentLanguage === 'uz' ? 'Narx oralig\'i' : 
           currentLanguage === 'ru'? 'Диапазон цен' : 'Price Range'}
        </label>
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            placeholder="Min"
            value={tempFilters.priceRange[0]}
            onChange={(e) => handleTempFilterChange('priceRange', [parseInt(e.target.value) || 0, tempFilters.priceRange[1]])}
            className="flex-1"
          />
          <span className="text-text-secondary">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={tempFilters.priceRange[1]}
            onChange={(e) => handleTempFilterChange('priceRange', [tempFilters.priceRange[0], parseInt(e.target.value) || 1000])}
            className="flex-1"
          />
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {currentLanguage === 'uz' ? 'Sig\'im' : 
           currentLanguage === 'ru'? 'Вместимость' : 'Capacity'}
        </label>
        <select
          value={tempFilters.capacity}
          onChange={(e) => handleTempFilterChange('capacity', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">
            {currentLanguage === 'uz' ? 'Barcha' : 
             currentLanguage === 'ru'? 'Все' : 'All'}
          </option>
          <option value="1">1 {currentLanguage === 'uz' ? 'kishi' : currentLanguage === 'ru' ? 'человек' : 'guest'}</option>
          <option value="2">2 {currentLanguage === 'uz' ? 'kishi' : currentLanguage === 'ru' ? 'человека' : 'guests'}</option>
          <option value="3">3 {currentLanguage === 'uz' ? 'kishi' : currentLanguage === 'ru' ? 'человека' : 'guests'}</option>
          <option value="4">4+ {currentLanguage === 'uz' ? 'kishi' : currentLanguage === 'ru' ? 'человек' : 'guests'}</option>
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {currentLanguage === 'uz' ? 'Qulayliklar' : 
           currentLanguage === 'ru'? 'Удобства' : 'Amenities'}
        </label>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={tempFilters.amenities.includes(amenity.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleTempFilterChange('amenities', [...tempFilters.amenities, amenity.value]);
                  } else {
                    handleTempFilterChange('amenities', tempFilters.amenities.filter(a => a !== amenity.value));
                  }
                }}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
              />
              <Icon name={amenity.icon} size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">{amenity.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {currentLanguage === 'uz' ? 'Mavjudlik' : 
           currentLanguage === 'ru'? 'Доступность' : 'Availability'}
        </label>
        <select
          value={tempFilters.availability}
          onChange={(e) => handleTempFilterChange('availability', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">
            {currentLanguage === 'uz' ? 'Barcha' : 
             currentLanguage === 'ru'? 'Все' : 'All'}
          </option>
          <option value="available">
            {currentLanguage === 'uz' ? 'Mavjud' : 
             currentLanguage === 'ru'? 'Доступно' : 'Available'}
          </option>
          <option value="booked">
            {currentLanguage === 'uz' ? 'Band' : 
             currentLanguage === 'ru'? 'Занято' : 'Booked'}
          </option>
        </select>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {currentLanguage === 'uz' ? 'Sanalar' : 
           currentLanguage === 'ru'? 'Даты' : 'Dates'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            value={tempFilters.checkIn}
            onChange={(e) => handleTempFilterChange('checkIn', e.target.value)}
            placeholder={currentLanguage === 'uz' ? 'Kelish' : currentLanguage === 'ru' ? 'Заезд' : 'Check-in'}
          />
          <Input
            type="date"
            value={tempFilters.checkOut}
            onChange={(e) => handleTempFilterChange('checkOut', e.target.value)}
            placeholder={currentLanguage === 'uz' ? 'Ketish' : currentLanguage === 'ru' ? 'Выезд' : 'Check-out'}
          />
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Bar */}
        <div className="sticky top-16 z-40 bg-surface border-b border-border p-4">
          <div className="flex items-center justify-between space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              iconName="Filter"
              iconPosition="left"
              className="flex-1 relative"
            >
              {getFilterLabel()}
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
            
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
            <div 
              ref={filterRef}
              className="w-full bg-surface rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up"
            >
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">{getFilterLabel()}</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <FilterContent />
                
                <div className="flex space-x-2 mt-6 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="flex-1"
                  >
                    {getClearLabel()}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleApplyFilters}
                    className="flex-1"
                  >
                    {getApplyLabel()}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="sticky top-16 z-40 bg-surface border-b border-border p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative" ref={filterRef}>
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                iconName="Filter"
                iconPosition="left"
                className="relative"
              >
                {getFilterLabel()}
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>

              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-surface rounded-lg shadow-lg border border-border p-4 animate-slide-down">
                  <FilterContent />
                  
                  <div className="flex space-x-2 mt-6 pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="flex-1"
                    >
                      {getClearLabel()}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleApplyFilters}
                      className="flex-1"
                    >
                      {getApplyLabel()}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
                className="text-text-secondary hover:text-error"
              >
                {getClearLabel()}
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">{getSortLabel()}:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;