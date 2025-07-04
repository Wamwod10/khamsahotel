import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ReviewCard = ({ review, currentLanguage, onHelpfulVote, onReportReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          verified: 'Tasdiqlangan qolish',
          helpful: 'Foydali',
          report: 'Shikoyat',
          readMore: 'Batafsil',
          readLess: 'Kamroq',
          managementResponse: 'Boshqaruv javobi',
          roomType: 'Xona turi',
          stayDuration: 'Qolish muddati'
        };
      case 'ru':
        return {
          verified: 'Подтвержденное пребывание',
          helpful: 'Полезно',
          report: 'Пожаловаться',
          readMore: 'Подробнее',
          readLess: 'Свернуть',
          managementResponse: 'Ответ администрации',
          roomType: 'Тип номера',
          stayDuration: 'Продолжительность пребывания'
        };
      default:
        return {
          verified: 'Verified Stay',
          helpful: 'Helpful',
          report: 'Report',
          readMore: 'Read More',
          readLess: 'Read Less',
          managementResponse: 'Management Response',
          roomType: 'Room Type',
          stayDuration: 'Stay Duration'
        };
    }
  };

  const labels = getLabels();

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHasVoted(true);
      onHelpfulVote(review.id);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      currentLanguage === 'uz' ? 'uz-UZ' : 
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const shouldTruncate = review.comment.length > 200;
  const displayComment = shouldTruncate && !isExpanded 
    ? review.comment.substring(0, 200) + '...' 
    : review.comment;

  return (
    <div className={`bg-surface rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 ${
      review.featured ? 'ring-2 ring-accent/20 bg-gradient-to-br from-accent/5 to-transparent' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={review.avatar}
              alt={review.guestName}
              className="w-12 h-12 rounded-full object-cover"
            />
            {review.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-text-primary">{review.guestName}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-text-secondary">
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>

        {review.verified && (
          <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} />
            <span>{labels.verified}</span>
          </div>
        )}
      </div>

      {/* Stay Details */}
      {(review.roomType || review.stayDuration) && (
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-secondary">
          {review.roomType && (
            <div className="flex items-center space-x-1">
              <Icon name="Bed" size={14} />
              <span>{labels.roomType}: {review.roomType}</span>
            </div>
          )}
          {review.stayDuration && (
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{labels.stayDuration}: {review.stayDuration}</span>
            </div>
          )}
        </div>
      )}

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-text-primary leading-relaxed">
          {displayComment}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 text-sm font-medium mt-2 transition-colors duration-200"
          >
            {isExpanded ? labels.readLess : labels.readMore}
          </button>
        )}
      </div>

      {/* Management Response */}
      {review.managementResponse && (
        <div className="bg-primary/5 rounded-lg p-4 mb-4 border-l-4 border-primary">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{labels.managementResponse}</span>
          </div>
          <p className="text-sm text-text-secondary">{review.managementResponse}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleHelpfulClick}
            disabled={hasVoted}
            className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
              hasVoted 
                ? 'text-success cursor-not-allowed' :'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name="ThumbsUp" size={16} className={hasVoted ? 'fill-current' : ''} />
            <span>{labels.helpful}</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {review.helpfulCount + (hasVoted ? 1 : 0)}
            </span>
          </button>
        </div>

        <button
          onClick={() => onReportReview(review.id)}
          className="text-text-secondary hover:text-error text-sm transition-colors duration-200"
        >
          {labels.report}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;