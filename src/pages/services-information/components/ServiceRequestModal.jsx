import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ServiceRequestModal = ({ currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    phone: '',
    service: '',
    message: '',
    urgency: 'normal'
  });

  useEffect(() => {
    const handleOpenServiceRequest = (event) => {
      setSelectedService(event.detail);
      setFormData(prev => ({
        ...prev,
        service: event.detail?.title || ''
      }));
      setIsOpen(true);
    };

    const handleOpenGeneralRequest = () => {
      setSelectedService(null);
      setFormData(prev => ({
        ...prev,
        service: ''
      }));
      setIsOpen(true);
    };

    window.addEventListener('openServiceRequest', handleOpenServiceRequest);
    window.addEventListener('openGeneralServiceRequest', handleOpenGeneralRequest);

    return () => {
      window.removeEventListener('openServiceRequest', handleOpenServiceRequest);
      window.removeEventListener('openGeneralServiceRequest', handleOpenGeneralRequest);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedService(null);
    setFormData({
      name: '',
      room: '',
      phone: '',
      service: '',
      message: '',
      urgency: 'normal'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    console.log('Service request submitted:', formData);
    alert(getSuccessMessage());
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getModalTitle = () => {
    switch (currentLanguage) {
      case 'uz': return 'Xizmat so\'rovi';
      case 'ru': return 'Запрос услуги';
      default: return 'Service Request';
    }
  };

  const getSuccessMessage = () => {
    switch (currentLanguage) {
      case 'uz': return 'Sizning so\'rovingiz muvaffaqiyatli yuborildi!';
      case 'ru': return 'Ваш запрос успешно отправлен!';
      default: return 'Your service request has been submitted successfully!';
    }
  };

  const getFieldLabel = (field) => {
    const labels = {
      name: {
        uz: 'To\'liq ism',
        ru: 'Полное имя',
        en: 'Full Name'
      },
      room: {
        uz: 'Xona raqami',
        ru: 'Номер комнаты',
        en: 'Room Number'
      },
      phone: {
        uz: 'Telefon raqami',
        ru: 'Номер телефона',
        en: 'Phone Number'
      },
      service: {
        uz: 'Xizmat turi',
        ru: 'Тип услуги',
        en: 'Service Type'
      },
      message: {
        uz: 'Qo\'shimcha ma\'lumot',
        ru: 'Дополнительная информация',
        en: 'Additional Information'
      },
      urgency: {
        uz: 'Muhimlik darajasi',
        ru: 'Уровень срочности',
        en: 'Urgency Level'
      }
    };
    
    return labels[field][currentLanguage] || labels[field].en;
  };

  const getUrgencyOptions = () => {
    return [
      {
        value: 'low',
        label: currentLanguage === 'uz' ? 'Past' : currentLanguage === 'ru' ? 'Низкий' : 'Low'
      },
      {
        value: 'normal',
        label: currentLanguage === 'uz' ? 'O\'rtacha' : currentLanguage === 'ru' ? 'Обычный' : 'Normal'
      },
      {
        value: 'high',
        label: currentLanguage === 'uz' ? 'Yuqori' : currentLanguage === 'ru' ? 'Высокий' : 'High'
      },
      {
        value: 'urgent',
        label: currentLanguage === 'uz' ? 'Shoshilinch' : currentLanguage === 'ru' ? 'Срочный' : 'Urgent'
      }
    ];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-modal-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {getModalTitle()}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-background rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {selectedService && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={selectedService.icon} size={20} className="text-primary" />
                <span className="font-medium text-text-primary">
                  {selectedService.title}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getFieldLabel('name')} *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={getFieldLabel('name')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getFieldLabel('room')} *
            </label>
            <Input
              type="text"
              name="room"
              value={formData.room}
              onChange={handleInputChange}
              placeholder="101, 205, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getFieldLabel('phone')} *
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+998 90 123 4567"
              required
            />
          </div>

          {!selectedService && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {getFieldLabel('service')} *
              </label>
              <Input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                placeholder={getFieldLabel('service')}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getFieldLabel('urgency')}
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              {getUrgencyOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {getFieldLabel('message')}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'uz' ? 'Qo\'shimcha ma\'lumot yozing...' :
                          currentLanguage === 'ru'? 'Напишите дополнительную информацию...' : 'Write additional information...'}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              fullWidth
            >
              {currentLanguage === 'uz' ? 'Bekor qilish' :
               currentLanguage === 'ru' ? 'Отмена' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              variant="primary"
              iconName="Send"
              iconPosition="left"
              fullWidth
            >
              {currentLanguage === 'uz' ? 'Yuborish' :
               currentLanguage === 'ru' ? 'Отправить' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestModal;