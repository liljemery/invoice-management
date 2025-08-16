import React, { useState, useEffect } from 'react';
import { User, Percent, DollarSign, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Salesperson {
  id: string;
  name: string;
  commissionPercentage: number;
  isActive: boolean;
}

interface SalespersonFormProps {
  salesperson?: Salesperson;
  onSubmit: (salesperson: Omit<Salesperson, 'id'>) => void;
  onCancel: () => void;
}

const SalespersonForm: React.FC<SalespersonFormProps> = ({ salesperson, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    commissionPercentage: 5.0,
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (salesperson) {
      setFormData({
        name: salesperson.name,
        commissionPercentage: salesperson.commissionPercentage,
        isActive: salesperson.isActive
      });
    }
  }, [salesperson]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Salesperson name is required';
    }

    if (formData.commissionPercentage < 0 || formData.commissionPercentage > 100) {
      newErrors.commissionPercentage = 'Commission percentage must be between 0 and 100';
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

  const calculateCommissionExample = () => {
    const exampleSale = 1000;
    const commission = (exampleSale * formData.commissionPercentage) / 100;
    return commission.toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter salesperson full name"
          leftIcon={<User size={16} />}
          error={errors.name}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Commission Percentage *
        </label>
        <Input
          type="number"
          step="0.1"
          min="0"
          max="100"
          value={formData.commissionPercentage}
          onChange={(e) => handleChange('commissionPercentage', parseFloat(e.target.value) || 0)}
          placeholder="5.0"
          leftIcon={<Percent size={16} />}
          error={errors.commissionPercentage}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter the commission percentage (0-100%)
        </p>
      </div>

      {formData.commissionPercentage > 0 && (
        <div className="bg-green-50 p-3 rounded-md border border-green-200">
          <div className="flex items-center text-sm text-green-800">
            <DollarSign size={16} className="mr-2" />
            <span className="font-medium">Commission Example:</span>
            <span className="ml-2">
              On a $1,000 sale: ${calculateCommissionExample()}
            </span>
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
          {salesperson ? 'Update Salesperson' : 'Add Salesperson'}
        </Button>
      </div>
    </form>
  );
};

export default SalespersonForm;
