import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WriteReviewModal = ({ isOpen, onClose, currentLanguage, onSubmitReview }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    guestName: '',
    email: '',
    roomType: '',
    stayDuration: '',
    photos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          writeReview: 'Sharh yozish',
          overallRating: 'Umumiy reyting',
          reviewTitle: 'Sharh sarlavhasi',
          reviewComment: 'Sizning fikringiz',
          guestName: 'Ismingiz',
          email: 'Email manzil',
          roomType: 'Xona turi',
          stayDuration: 'Qolish muddati',
          addPhotos: 'Rasmlar qo\'shish',
          submitReview: 'Sharh yuborish',
          cancel: 'Bekor qilish',
          required: 'Majburiy maydon',
          titlePlaceholder: 'Qisqacha sarlavha yozing...',
          commentPlaceholder: 'Mehmonxona haqida batafsil fikringizni yozing...',
          namePlaceholder: 'To\'liq ismingiz',
          emailPlaceholder: 'email@example.com',
          roomTypePlaceholder: 'Masalan: Standart xona',
          stayDurationPlaceholder: 'Masalan: 3 kun',
          photoUploadText: 'Rasmlarni yuklash uchun bosing yoki sudrab olib keling',
          maxPhotos: 'Maksimal 5 ta rasm',
          submitting: 'Yuborilmoqda...'
        };
      case 'ru':
        return {
          writeReview: 'Написать отзыв',
          overallRating: 'Общая оценка',
          reviewTitle: 'Заголовок отзыва',
          reviewComment: 'Ваш отзыв',
          guestName: 'Ваше имя',
          email: 'Email адрес',
          roomType: 'Тип номера',
          stayDuration: 'Продолжительность пребывания',
          addPhotos: 'Добавить фото',
          submitReview: 'Отправить отзыв',
          cancel: 'Отмена',
          required: 'Обязательное поле',
          titlePlaceholder: 'Напишите краткий заголовок...',
          commentPlaceholder: 'Расскажите подробно о вашем пребывании в отеле...',
          namePlaceholder: 'Ваше полное имя',
          emailPlaceholder: 'email@example.com',
          roomTypePlaceholder: 'Например: Стандартный номер',
          stayDurationPlaceholder: 'Например: 3 дня',
          photoUploadText: 'Нажмите для загрузки или перетащите фото сюда',
          maxPhotos: 'Максимум 5 фото',
          submitting: 'Отправка...'
        };
      default:
        return {
          writeReview: 'Write a Review',
          overallRating: 'Overall Rating',
          reviewTitle: 'Review Title',
          reviewComment: 'Your Review',
          guestName: 'Your Name',
          email: 'Email Address',
          roomType: 'Room Type',
          stayDuration: 'Stay Duration',
          addPhotos: 'Add Photos',
          submitReview: 'Submit Review',
          cancel: 'Cancel',
          required: 'Required field',
          titlePlaceholder: 'Write a brief title...',
          commentPlaceholder: 'Tell us about your experience at the hotel...',
          namePlaceholder: 'Your full name',
          emailPlaceholder: 'email@example.com',
          roomTypePlaceholder: 'e.g., Standard Room',
          stayDurationPlaceholder: 'e.g., 3 nights',
          photoUploadText: 'Click to upload or drag and drop photos here',
          maxPhotos: 'Maximum 5 photos',
          submitting: 'Submitting...'
        };
    }
  };

  const labels = getLabels();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + formData.photos.length > 5) {
      alert(labels.maxPhotos);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating || !formData.comment || !formData.guestName || !formData.email) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmitReview(formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      rating: 0,
      title: '',
      comment: '',
      guestName: '',
      email: '',
      roomType: '',
      stayDuration: '',
      photos: []
    });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-colors duration-200 hover:scale-110 transform"
        >
          <Icon
            name="Star"
            size={32}
            className={`${
              starValue <= (hoveredRating || formData.rating)
                ? 'text-yellow-400 fill-current' :'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-modal-in">
        <div className="sticky top-0 bg-surface border-b border-border p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">{labels.writeReview}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              {labels.overallRating} <span className="text-error">*</span>
            </label>
            <div className="flex items-center space-x-2">
              {renderStars()}
              {formData.rating > 0 && (
                <span className="ml-4 text-lg font-semibold text-primary">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {labels.reviewTitle}
            </label>
            <Input
              type="text"
              placeholder={labels.titlePlaceholder}
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {labels.reviewComment} <span className="text-error">*</span>
            </label>
            <textarea
              placeholder={labels.commentPlaceholder}
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-background text-text-primary placeholder-text-secondary"
              required
            />
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {labels.guestName} <span className="text-error">*</span>
              </label>
              <Input
                type="text"
                placeholder={labels.namePlaceholder}
                value={formData.guestName}
                onChange={(e) => handleInputChange('guestName', e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {labels.email} <span className="text-error">*</span>
              </label>
              <Input
                type="email"
                placeholder={labels.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Stay Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {labels.roomType}
              </label>
              <Input
                type="text"
                placeholder={labels.roomTypePlaceholder}
                value={formData.roomType}
                onChange={(e) => handleInputChange('roomType', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {labels.stayDuration}
              </label>
              <Input
                type="text"
                placeholder={labels.stayDurationPlaceholder}
                value={formData.stayDuration}
                onChange={(e) => handleInputChange('stayDuration', e.target.value)}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {labels.addPhotos}
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
                <p className="text-text-secondary">{labels.photoUploadText}</p>
                <p className="text-xs text-text-secondary mt-1">{labels.maxPhotos}</p>
              </label>
            </div>
            
            {formData.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-error/80 transition-colors duration-200"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              disabled={isSubmitting}
            >
              {labels.cancel}
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={!formData.rating || !formData.comment || !formData.guestName || !formData.email || isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? labels.submitting : labels.submitReview}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;