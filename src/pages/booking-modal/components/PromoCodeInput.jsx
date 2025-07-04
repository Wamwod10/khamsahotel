import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromoCodeInput = ({ onPromoApply, currentLanguage, appliedPromo }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const promoCodes = [
    { code: 'WELCOME10', discount: 10 },
    { code: 'SUMMER20', discount: 20 },
    { code: 'FAMILY15', discount: 15 },
    { code: 'WEEKEND25', discount: 25 }
  ];

  const getLabels = () => {
    switch (currentLanguage) {
      case 'uz':
        return {
          title: 'Promo Kod',
          placeholder: 'Promo kodni kiriting',
          apply: 'Qo\'llash',
          applied: 'Qo\'llanildi',
          remove: 'Olib tashlash',
          invalid: 'Noto\'g\'ri promo kod',
          success: 'Promo kod muvaffaqiyatli qo\'llanildi!'
        };
      case 'ru':
        return {
          title: 'Промо Код',
          placeholder: 'Введите промо код',
          apply: 'Применить',
          applied: 'Применен',
          remove: 'Удалить',
          invalid: 'Неверный промо код',
          success: 'Промо код успешно применен!'
        };
      default:
        return {
          title: 'Promo Code',
          placeholder: 'Enter promo code',
          apply: 'Apply',
          applied: 'Applied',
          remove: 'Remove',
          invalid: 'Invalid promo code',
          success: 'Promo code applied successfully!'
        };
    }
  };

  const labels = getLabels();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsApplying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const validPromo = promoCodes.find(
        promo => promo.code.toLowerCase() === promoCode.toLowerCase()
      );

      if (validPromo) {
        onPromoApply(validPromo.code, validPromo.discount);
        setError('');
      } else {
        setError(labels.invalid);
      }
      
      setIsApplying(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    onPromoApply('', 0);
    setPromoCode('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">{labels.title}</h3>
      
      {appliedPromo ? (
        <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} className="text-success-foreground" />
            </div>
            <div>
              <p className="font-medium text-success">{appliedPromo}</p>
              <p className="text-sm text-success/80">{labels.success}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleRemovePromo}
            className="text-success hover:text-success/80"
          >
            {labels.remove}
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder={labels.placeholder}
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setError('');
                }}
                className={`w-full px-4 py-3 border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 ${
                  error ? 'border-error' : 'border-border'
                }`}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleApplyPromo}
              disabled={!promoCode.trim() || isApplying}
              loading={isApplying}
              className="px-6"
            >
              {labels.apply}
            </Button>
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 text-error">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {/* Sample promo codes for demo */}
          <div className="text-xs text-text-secondary">
            Sample codes: WELCOME10, SUMMER20, FAMILY15, WEEKEND25
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;