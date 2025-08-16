import React, { useState, useEffect } from 'react';
import { FileText, User, Calendar, Package, DollarSign, Plus, Trash } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface InvoiceItem {
  id: string;
  productId: string;
  productDescription: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  customerId: string;
  customerName: string;
  paymentTermId: string;
  paymentTermDescription: string;
  salespersonId: string;
  salespersonName: string;
  comments: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
}

interface InvoiceFormProps {
  invoice?: Invoice;
  customers: Array<{ id: string; businessName: string }>;
  paymentTerms: Array<{ id: string; description: string }>;
  salespeople: Array<{ id: string; name: string }>;
  products: Array<{ id: string; description: string; unitPrice: number }>;
  onSubmit: (invoice: Omit<Invoice, 'id' | 'subtotal' | 'tax' | 'total'>) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  invoice, 
  customers, 
  paymentTerms, 
  salespeople, 
  products,
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    customerId: '',
    paymentTermId: '',
    salespersonId: '',
    comments: '',
    items: [] as InvoiceItem[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (invoice) {
      setFormData({
        number: invoice.number,
        date: invoice.date.split('T')[0],
        customerId: invoice.customerId,
        paymentTermId: invoice.paymentTermId,
        salespersonId: invoice.salespersonId,
        comments: invoice.comments,
        items: invoice.items
      });
    }
  }, [invoice]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.number.trim()) {
      newErrors.number = 'Invoice number is required';
    }

    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }

    if (!formData.paymentTermId) {
      newErrors.paymentTermId = 'Payment term is required';
    }

    if (!formData.salespersonId) {
      newErrors.salespersonId = 'Salesperson is required';
    }

    if (formData.items.length === 0) {
      newErrors.items = 'At least one item is required';
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

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      productId: '',
      productDescription: '',
      quantity: 1,
      unitPrice: 0,
      subtotal: 0
    };
    setFormData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({ 
      ...prev, 
      items: prev.items.filter(item => item.id !== itemId) 
    }));
  };

  const updateItem = (itemId: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'productId') {
            const product = products.find(p => p.id === value);
            updatedItem.productDescription = product?.description || '';
            updatedItem.unitPrice = product?.unitPrice || 0;
          }
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.subtotal = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.18; // 18% tax rate
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Number *
          </label>
          <Input
            value={formData.number}
            onChange={(e) => handleChange('number', e.target.value)}
            placeholder="e.g., INV-2024001"
            leftIcon={<FileText size={16} />}
            error={errors.number}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            leftIcon={<Calendar size={16} />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer *
          </label>
          <Select
            value={formData.customerId}
            onChange={(value) => handleChange('customerId', value)}
            options={customers.map(c => ({ value: c.id, label: c.businessName }))}
            placeholder="Select customer"
            error={errors.customerId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Term *
          </label>
          <Select
            value={formData.paymentTermId}
            onChange={(value) => handleChange('paymentTermId', value)}
            options={paymentTerms.map(pt => ({ value: pt.id, label: pt.description }))}
            placeholder="Select payment term"
            error={errors.paymentTermId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salesperson *
          </label>
          <Select
            value={formData.salespersonId}
            onChange={(value) => handleChange('salespersonId', value)}
            options={salespeople.map(sp => ({ value: sp.id, label: sp.name }))}
            placeholder="Select salesperson"
            error={errors.salespersonId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comments
          </label>
          <Input
            value={formData.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            placeholder="Enter invoice comments"
            leftIcon={<FileText size={16} />}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
          <Button type="button" variant="outline" onClick={addItem} leftIcon={<Plus size={16} />}>
            Add Item
          </Button>
        </div>

        {formData.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package size={48} className="mx-auto mb-2 text-gray-300" />
            <p>No items added yet. Click "Add Item" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 p-4 border rounded-lg bg-gray-50">
                <div className="col-span-4">
                  <Select
                    value={item.productId}
                    onChange={(value) => updateItem(item.id, 'productId', value)}
                    options={products.map(p => ({ value: p.id, label: p.description }))}
                    placeholder="Select product"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    placeholder="Qty"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    placeholder="Price"
                    leftIcon={<DollarSign size={16} />}
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center h-10 px-3 bg-white border border-gray-300 rounded-md">
                    <span className="text-sm font-medium text-gray-900">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    leftIcon={<Trash size={14} />}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {errors.items && (
          <p className="text-sm text-red-600 mt-1">{errors.items}</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
          <span>Tax (18%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold text-blue-600 mt-2 pt-2 border-t">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {invoice ? 'Update Invoice' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
