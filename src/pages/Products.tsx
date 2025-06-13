import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  Edit, 
  Trash, 
  MoreVertical,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';

// Mock data for products
const mockProducts = [
  { id: '1', description: 'Laptop Computer', unitCost: 500, unitPrice: 899.99, isActive: true },
  { id: '2', description: 'Office Chair', unitCost: 75, unitPrice: 149.99, isActive: true },
  { id: '3', description: 'Desktop Monitor', unitCost: 120, unitPrice: 249.99, isActive: true },
  { id: '4', description: 'Wireless Keyboard', unitCost: 25, unitPrice: 59.99, isActive: true },
  { id: '5', description: 'Wireless Mouse', unitCost: 15, unitPrice: 39.99, isActive: true },
  { id: '6', description: 'USB-C Dock', unitCost: 45, unitPrice: 89.99, isActive: false },
  { id: '7', description: 'Webcam HD', unitCost: 35, unitPrice: 79.99, isActive: true },
  { id: '8', description: 'Noise Cancelling Headphones', unitCost: 120, unitPrice: 199.99, isActive: true },
];

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === null || product.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button 
          leftIcon={<Plus size={16} />}
        >
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Products</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={<Search size={16} />}
              className="max-w-xs"
            />
            <div className="relative">
              <Button 
                variant="outline" 
                leftIcon={<Filter size={16} />}
                onClick={() => setShowDropdown(showDropdown === 'filter' ? null : 'filter')}
              >
                Filter
              </Button>
              {showDropdown === 'filter' && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <button
                      onClick={() => {
                        setActiveFilter(null);
                        setShowDropdown(null);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter(true);
                        setShowDropdown(null);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <CheckCircle size={16} className="mr-2 text-success-500" />
                      Active Only
                    </button>
                    <button
                      onClick={() => {
                        setActiveFilter(false);
                        setShowDropdown(null);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <XCircle size={16} className="mr-2 text-error-500" />
                      Inactive Only
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Profit Margin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => {
                  const profitMargin = ((product.unitPrice - product.unitCost) / product.unitPrice) * 100;
                  
                  return (
                    <TableRow 
                      key={product.id}
                      className="hover:bg-gray-50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Package size={16} className="mr-2 text-gray-400" />
                          {product.description}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(product.unitCost)}</TableCell>
                      <TableCell>{formatCurrency(product.unitPrice)}</TableCell>
                      <TableCell>
                        <span className={`${
                          profitMargin > 30 
                            ? 'text-success-600' 
                            : profitMargin > 15 
                              ? 'text-warning-600' 
                              : 'text-error-600'
                        }`}>
                          {profitMargin.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          product.isActive 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(product.id)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {showDropdown === product.id && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1" role="none">
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit size={16} className="mr-2" />
                                  Edit Product
                                </button>
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {product.isActive ? (
                                    <>
                                      <XCircle size={16} className="mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle size={16} className="mr-2" />
                                      Activate
                                    </>
                                  )}
                                </button>
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm text-error-600 hover:bg-gray-100"
                                >
                                  <Trash size={16} className="mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;