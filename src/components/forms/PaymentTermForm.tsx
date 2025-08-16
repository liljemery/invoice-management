import React, { useState, useEffect } from 'react';
import { Calendar, FileText, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface PaymentTerm {
  id: string;
  description: string;
  days: number;
  isActive: boolean;
}

interface PaymentTermFormProps {
  paymentTerm?: PaymentTerm;
  onSubmit: (paymentTerm: Omit<PaymentTerm, 'id'>) => void;
  onCancel: () => void;
}

const PaymentTermForm: React.FC<PaymentTermFormProps> = ({ paymentTerm, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    days: 0,
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (paymentTerm) {
      setFormData({
        description: paymentTerm.description,
        days: paymentTerm.days,
        isActive: paymentTerm.isActive
      });
    }
  }, [paymentTerm]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Payment term description is required';
    }

    if (formData.days < 0) {
      newErrors.days = 'Days cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPaymentDescription = () => {
    if (formData.days === 0) return 'Due on Receipt';
    if (formData.days === 1) return 'Due Next Day';
    return `Net ${formData.days} days`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <Input
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="e.g., Net 30, Due on Receipt"
          leftIcon={<FileText size={16} />}
          error={errors.description}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Days *
        </label>
        <Input
          type="number"
          min="0"
          value={formData.days}
          onChange={(e) => handleChange('days', parseInt(e.target.value) || 0)}
          placeholder="0"
          leftIcon={<Calendar size={16} />}
          error={errors.days}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter 0 for immediate payment, or number of days for net terms
        </p>
      </div>

      {formData.days >= 0 && (
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
          <div className="flex items-center text-sm text-blue-800">
            <FileText size={16} className="mr-2" />
            <span className="font-medium">Preview:</span>
            <span className="ml-2">{getPaymentDescription()}</span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <Select
          value={formData.isActive ? 'active' : 'inactive'}
          onChange={(value) => handleChange('isActive', value === 'active')}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {paymentTerm ? 'Update Payment Term' : 'Add Payment Term'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentTermForm;
