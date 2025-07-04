import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewSummary = ({ summary, currentLanguage }) => {
  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          overallRating: 'Umumiy reyting',
          totalReviews: 'Jami sharhlar',
          ratingDistribution: 'Reyting taqsimoti',
          excellent: 'Ajoyib',
          veryGood: 'Juda yaxshi',
          average: 'O\'rtacha',
          poor: 'Yomon',
          terrible: 'Dahshatli',
          stars: 'yulduz'
        };
      case 'ru':
        return {
          overallRating: 'Общий рейтинг',
          totalReviews: 'Всего отзывов',
          ratingDistribution: 'Распределение рейтинга',
          excellent: 'Отлично',
          veryGood: 'Очень хорошо',
          average: 'Средне',
          poor: 'Плохо',
          terrible: 'Ужасно',
          stars: 'звезд'
        };
      default:
        return {
          overallRating: 'Overall Rating',
          totalReviews: 'Total Reviews',
          ratingDistribution: 'Rating Distribution',
          excellent: 'Excellent',
          veryGood: 'Very Good',
          average: 'Average',
          poor: 'Poor',
          terrible: 'Terrible',
          stars: 'stars'
        };
    }
  };

  const labels = getLabels();

  const ratingLabels = [
    labels.excellent,
    labels.veryGood,
    labels.average,
    labels.poor,
    labels.terrible
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={20}
        className={`${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-md border border-border mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-text-primary mb-4">{labels.overallRating}</h3>
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
            <span className="text-4xl font-bold text-primary">{summary.averageRating}</span>
            <div className="flex items-center space-x-1">
              {renderStars(summary.averageRating)}
            </div>
          </div>
          <p className="text-text-secondary">
            {summary.totalReviews.toLocaleString()} {labels.totalReviews}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-text-primary mb-4">{labels.ratingDistribution}</h3>
          <div className="space-y-3">
            {summary.distribution.map((item, index) => {
              const percentage = (item.count / summary.totalReviews) * 100;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-20">
                    <span className="text-sm text-text-secondary">{5 - index}</span>
                    <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                  </div>
                  
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <div className="w-16 text-right">
                    <span className="text-sm text-text-secondary">{item.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Location</span>
          </div>
          <span className="text-lg font-semibold text-primary">{summary.locationRating}</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Cleanliness</span>
          </div>
          <span className="text-lg font-semibold text-primary">{summary.cleanlinessRating}</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Service</span>
          </div>
          <span className="text-lg font-semibold text-primary">{summary.serviceRating}</span>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">Value</span>
          </div>
          <span className="text-lg font-semibold text-primary">{summary.valueRating}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;