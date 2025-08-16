import React, { useState, useEffect } from 'react';
import { User, Building, Hash, CreditCard } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Customer {
  id: string;
  businessName: string;
  legalName: string;
  taxId: string;
  accountNumber: string;
  isActive: boolean;
}

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (customer: Omit<Customer, 'id'>) => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    legalName: '',
    taxId: '',
    accountNumber: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer) {
      setFormData({
        businessName: customer.businessName,
        legalName: customer.legalName,
        taxId: customer.taxId,
        accountNumber: customer.accountNumber,
        isActive: customer.isActive
      });
    }
  }, [customer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.legalName.trim()) {
      newErrors.legalName = 'Legal name is required';
    }

    if (!formData.taxId.trim()) {
      newErrors.taxId = 'Tax ID is required';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
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

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <Input
            value={formData.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            placeholder="Enter business name"
            leftIcon={<Building size={16} />}
            error={errors.businessName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legal Name *
          </label>
          <Input
            value={formData.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            placeholder="Enter legal name"
            leftIcon={<User size={16} />}
            error={errors.legalName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax ID *
          </label>
          <Input
            value={formData.taxId}
            onChange={(e) => handleChange('taxId', e.target.value)}
            placeholder="Enter tax ID"
            leftIcon={<Hash size={16} />}
            error={errors.taxId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number *
          </label>
          <Input
            value={formData.accountNumber}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            placeholder="Enter account number"
            leftIcon={<CreditCard size={16} />}
            error={errors.accountNumber}
          />
        </div>
      </div>

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
          {customer ? 'Update Customer' : 'Add Customer'}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
