import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewFilters = ({ currentLanguage, onFilterChange, activeFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          filters: 'Filtrlar',
          sortBy: 'Saralash',
          rating: 'Reyting',
          reviewType: 'Sharh turi',
          allRatings: 'Barcha reytinglar',
          allTypes: 'Barcha turlar',
          newest: 'Eng yangi',
          oldest: 'Eng eski',
          highestRated: 'Eng yuqori reyting',
          lowestRated: 'Eng past reyting',
          mostHelpful: 'Eng foydali',
          verifiedOnly: 'Faqat tasdiqlangan',
          businessTravelers: 'Biznes sayohatchilar',
          families: 'Oilalar',
          couples: 'Juftliklar',
          soloTravelers: 'Yolg\'iz sayohatchilar',
          clearAll: 'Hammasini tozalash',
          applyFilters: 'Filtrlarni qo\'llash'
        };
      case 'ru':
        return {
          filters: 'Фильтры',
          sortBy: 'Сортировка',
          rating: 'Рейтинг',
          reviewType: 'Тип отзыва',
          allRatings: 'Все рейтинги',
          allTypes: 'Все типы',
          newest: 'Сначала новые',
          oldest: 'Сначала старые',
          highestRated: 'Высокий рейтинг',
          lowestRated: 'Низкий рейтинг',
          mostHelpful: 'Самые полезные',
          verifiedOnly: 'Только подтвержденные',
          businessTravelers: 'Бизнес-путешественники',
          families: 'Семьи',
          couples: 'Пары',
          soloTravelers: 'Одиночные путешественники',
          clearAll: 'Очистить все',
          applyFilters: 'Применить фильтры'
        };
      default:
        return {
          filters: 'Filters',
          sortBy: 'Sort By',
          rating: 'Rating',
          reviewType: 'Review Type',
          allRatings: 'All Ratings',
          allTypes: 'All Types',
          newest: 'Newest First',
          oldest: 'Oldest First',
          highestRated: 'Highest Rated',
          lowestRated: 'Lowest Rated',
          mostHelpful: 'Most Helpful',
          verifiedOnly: 'Verified Only',
          businessTravelers: 'Business Travelers',
          families: 'Families',
          couples: 'Couples',
          soloTravelers: 'Solo Travelers',
          clearAll: 'Clear All',
          applyFilters: 'Apply Filters'
        };
    }
  };

  const labels = getLabels();

  const sortOptions = [
    { value: 'newest', label: labels.newest },
    { value: 'oldest', label: labels.oldest },
    { value: 'highest', label: labels.highestRated },
    { value: 'lowest', label: labels.lowestRated },
    { value: 'helpful', label: labels.mostHelpful }
  ];

  const ratingOptions = [
    { value: 'all', label: labels.allRatings },
    { value: '5', label: '5 ⭐' },
    { value: '4', label: '4 ⭐' },
    { value: '3', label: '3 ⭐' },
    { value: '2', label: '2 ⭐' },
    { value: '1', label: '1 ⭐' }
  ];

  const typeOptions = [
    { value: 'all', label: labels.allTypes },
    { value: 'verified', label: labels.verifiedOnly },
    { value: 'business', label: labels.businessTravelers },
    { value: 'families', label: labels.families },
    { value: 'couples', label: labels.couples },
    { value: 'solo', label: labels.soloTravelers }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      sortBy: 'newest',
      rating: 'all',
      type: 'all'
    });
  };

  const FilterSection = ({ title, options, activeValue, filterType }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-text-primary">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={filterType}
              value={option.value}
              checked={activeValue === option.value}
              onChange={(e) => handleFilterChange(filterType, e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-text-secondary">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(true)}
          iconName="Filter"
          iconPosition="left"
          fullWidth
        >
          {labels.filters}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block bg-surface rounded-xl p-6 shadow-md border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">{labels.filters}</h3>
          <button
            onClick={handleClearAll}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {labels.clearAll}
          </button>
        </div>

        <div className="space-y-6">
          <FilterSection
            title={labels.sortBy}
            options={sortOptions}
            activeValue={activeFilters.sortBy}
            filterType="sortBy"
          />
          
          <FilterSection
            title={labels.rating}
            options={ratingOptions}
            activeValue={activeFilters.rating}
            filterType="rating"
          />
          
          <FilterSection
            title={labels.reviewType}
            options={typeOptions}
            activeValue={activeFilters.type}
            filterType="type"
          />
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">{labels.filters}</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <FilterSection
                title={labels.sortBy}
                options={sortOptions}
                activeValue={activeFilters.sortBy}
                filterType="sortBy"
              />
              
              <FilterSection
                title={labels.rating}
                options={ratingOptions}
                activeValue={activeFilters.rating}
                filterType="rating"
              />
              
              <FilterSection
                title={labels.reviewType}
                options={typeOptions}
                activeValue={activeFilters.type}
                filterType="type"
              />
            </div>

            <div className="flex space-x-3 mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleClearAll}
                fullWidth
              >
                {labels.clearAll}
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsFilterOpen(false)}
                fullWidth
              >
                {labels.applyFilters}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewFilters;