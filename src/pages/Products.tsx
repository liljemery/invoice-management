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
import Modal from '../components/ui/Modal';
import ProductForm from '../components/forms/ProductForm';
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
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [products, setProducts] = useState(mockProducts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleSubmitProduct = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `product-${Date.now()}`
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === null || product.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                leftIcon={<Search size={16} />}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeFilter === null ? 'primary' : 'outline'}
                onClick={() => setActiveFilter(null)}
                leftIcon={<Filter size={16} />}
              >
                All
              </Button>
              <Button
                variant={activeFilter === true ? 'primary' : 'outline'}
                onClick={() => setActiveFilter(true)}
                leftIcon={<CheckCircle size={16} />}
              >
                Active
              </Button>
              <Button
                variant={activeFilter === false ? 'primary' : 'outline'}
                onClick={() => setActiveFilter(false)}
                leftIcon={<XCircle size={16} />}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Product List</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredProducts.length} products)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      ${product.unitCost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      ${product.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {product.margin}%
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical size={16} />
                        </Button>
                        
                        {showDropdown === product.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEditProduct(product);
                                  setShowDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit size={16} className="mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteProduct(product.id);
                                  setShowDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Trash size={16} className="mr-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Products;