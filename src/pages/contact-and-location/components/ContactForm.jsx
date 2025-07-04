import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactForm = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const getContent = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: "Xabar yuborish",
          subtitle: "Bizga xabar yuboring va biz tez orada javob beramiz",
          name: "To'liq ism",
          namePlaceholder: "Ismingizni kiriting",
          email: "Elektron pochta",
          emailPlaceholder: "email@example.com",
          phone: "Telefon raqami",
          phonePlaceholder: "+998 XX XXX XX XX",
          subject: "Mavzu",
          subjectPlaceholder: "Xabar mavzusini tanlang",
          message: "Xabar",
          messagePlaceholder: "Xabaringizni yozing...",
          submit: "Xabar yuborish",
          submitting: "Yuborilmoqda...",
          success: "Xabaringiz muvaffaqiyatli yuborildi!",
          successDesc: "Biz tez orada siz bilan bog'lanamiz.",
          subjects: [
            { value: '', label: 'Mavzuni tanlang' },
            { value: 'booking', label: 'Bron qilish' },
            { value: 'services', label: 'Xizmatlar' },
            { value: 'complaint', label: 'Shikoyat' },
            { value: 'suggestion', label: 'Taklif' },
            { value: 'other', label: 'Boshqa' }
          ],
          errors: {
            nameRequired: "Ism kiritish majburiy",
            emailRequired: "Elektron pochta kiritish majburiy",
            emailInvalid: "Elektron pochta formati noto'g'ri",
            phoneRequired: "Telefon raqami kiritish majburiy",
            subjectRequired: "Mavzu tanlash majburiy",
            messageRequired: "Xabar kiritish majburiy",
            messageMinLength: "Xabar kamida 10 ta belgi bo'lishi kerak"
          }
        };
      case 'ru':
        return {
          title: "Отправить сообщение",
          subtitle: "Отправьте нам сообщение и мы свяжемся с вами в ближайшее время",
          name: "Полное имя",
          namePlaceholder: "Введите ваше имя",
          email: "Электронная почта",
          emailPlaceholder: "email@example.com",
          phone: "Номер телефона",
          phonePlaceholder: "+998 XX XXX XX XX",
          subject: "Тема",
          subjectPlaceholder: "Выберите тему сообщения",
          message: "Сообщение",
          messagePlaceholder: "Напишите ваше сообщение...",
          submit: "Отправить сообщение",
          submitting: "Отправка...",
          success: "Ваше сообщение успешно отправлено!",
          successDesc: "Мы свяжемся с вами в ближайшее время.",
          subjects: [
            { value: '', label: 'Выберите тему' },
            { value: 'booking', label: 'Бронирование' },
            { value: 'services', label: 'Услуги' },
            { value: 'complaint', label: 'Жалоба' },
            { value: 'suggestion', label: 'Предложение' },
            { value: 'other', label: 'Другое' }
          ],
          errors: {
            nameRequired: "Имя обязательно для заполнения",
            emailRequired: "Email обязателен для заполнения",
            emailInvalid: "Неверный формат email",
            phoneRequired: "Номер телефона обязателен",
            subjectRequired: "Выбор темы обязателен",
            messageRequired: "Сообщение обязательно",
            messageMinLength: "Сообщение должно содержать минимум 10 символов"
          }
        };
      default:
        return {
          title: "Send Message",
          subtitle: "Send us a message and we'll get back to you soon",
          name: "Full Name",
          namePlaceholder: "Enter your name",
          email: "Email Address",
          emailPlaceholder: "email@example.com",
          phone: "Phone Number",
          phonePlaceholder: "+998 XX XXX XX XX",
          subject: "Subject",
          subjectPlaceholder: "Select message subject",
          message: "Message",
          messagePlaceholder: "Write your message...",
          submit: "Send Message",
          submitting: "Sending...",
          success: "Your message has been sent successfully!",
          successDesc: "We'll get back to you soon.",
          subjects: [
            { value: '', label: 'Select Subject' },
            { value: 'booking', label: 'Booking Inquiry' },
            { value: 'services', label: 'Services' },
            { value: 'complaint', label: 'Complaint' },
            { value: 'suggestion', label: 'Suggestion' },
            { value: 'other', label: 'Other' }
          ],
          errors: {
            nameRequired: "Name is required",
            emailRequired: "Email is required",
            emailInvalid: "Invalid email format",
            phoneRequired: "Phone number is required",
            subjectRequired: "Subject is required",
            messageRequired: "Message is required",
            messageMinLength: "Message must be at least 10 characters"
          }
        };
    }
  };

  const content = getContent();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = content.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.errors.emailInvalid;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = content.errors.phoneRequired;
    }

    if (!formData.subject) {
      newErrors.subject = content.errors.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = content.errors.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = content.errors.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8 h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
            {content.success}
          </h3>
          <p className="text-text-secondary mb-6">
            {content.successDesc}
          </p>
          <Button
            variant="primary"
            onClick={() => setIsSubmitted(false)}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            {currentLanguage === 'uz' ? 'Orqaga' : currentLanguage === 'ru' ? 'Назад' : 'Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8 h-full">
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary mb-3">
          {content.title}
        </h2>
        <p className="text-text-secondary text-base lg:text-lg">
          {content.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {content.name} <span className="text-error">*</span>
          </label>
          <Input
            type="text"
            placeholder={content.namePlaceholder}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'border-error' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {content.email} <span className="text-error">*</span>
          </label>
          <Input
            type="email"
            placeholder={content.emailPlaceholder}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors.email ? 'border-error' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {content.phone} <span className="text-error">*</span>
          </label>
          <Input
            type="tel"
            placeholder={content.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'border-error' : ''}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {content.subject} <span className="text-error">*</span>
          </label>
          <select
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 ${
              errors.subject ? 'border-error' : 'border-border'
            }`}
          >
            {content.subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {content.message} <span className="text-error">*</span>
          </label>
          <textarea
            placeholder={content.messagePlaceholder}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none ${
              errors.message ? 'border-error' : 'border-border'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
          className="shadow-md hover:shadow-lg"
        >
          {isSubmitting ? content.submitting : content.submit}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;