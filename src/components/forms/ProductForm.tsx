import React, { useState, useEffect } from 'react';
import { Package, DollarSign, Tag, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Product {
  id: string;
  description: string;
  unitCost: number;
  unitPrice: number;
  isActive: boolean;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    unitCost: 0,
    unitPrice: 0,
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        description: product.description,
        unitCost: product.unitCost,
        unitPrice: product.unitPrice,
        isActive: product.isActive
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (formData.unitCost < 0) {
      newErrors.unitCost = 'Unit cost cannot be negative';
    }

    if (formData.unitPrice < 0) {
      newErrors.unitPrice = 'Unit price cannot be negative';
    }

    if (formData.unitPrice < formData.unitCost) {
      newErrors.unitPrice = 'Unit price must be greater than unit cost';
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

  const calculateMargin = () => {
    if (formData.unitPrice > 0 && formData.unitCost > 0) {
      return ((formData.unitPrice - formData.unitCost) / formData.unitPrice * 100).toFixed(1);
    }
    return '0.0';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Description *
        </label>
        <Input
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter product description"
          leftIcon={<Package size={16} />}
          error={errors.description}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Cost *
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={formData.unitCost}
            onChange={(e) => handleChange('unitCost', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            leftIcon={<DollarSign size={16} />}
            error={errors.unitCost}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Price *
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={formData.unitPrice}
            onChange={(e) => handleChange('unitPrice', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            leftIcon={<Tag size={16} />}
            error={errors.unitPrice}
          />
        </div>
      </div>

      {formData.unitCost > 0 && formData.unitPrice > 0 && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Profit Margin:</span>
            <span className="font-medium text-green-600">{calculateMargin()}%</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Profit per Unit:</span>
            <span className="font-medium text-green-600">
              ${(formData.unitPrice - formData.unitCost).toFixed(2)}
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
          {product ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
