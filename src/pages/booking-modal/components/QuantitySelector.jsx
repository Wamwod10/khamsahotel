import React from 'react';
import Icon from '../../../components/AppIcon';

const QuantitySelector = ({ label, value, onChange, min = 1, max = 10, disabled }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center transition-colors duration-200 ${
            disabled || value <= min
              ? 'opacity-50 cursor-not-allowed' :'hover:bg-primary/10 hover:border-primary/20'
          }`}
        >
          <Icon name="Minus" size={16} className="text-text-secondary" />
        </button>
        
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-text-primary">{value}</span>
        </div>
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className={`w-10 h-10 rounded-lg border border-border flex items-center justify-center transition-colors duration-200 ${
            disabled || value >= max
              ? 'opacity-50 cursor-not-allowed' :'hover:bg-primary/10 hover:border-primary/20'
          }`}
        >
          <Icon name="Plus" size={16} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;