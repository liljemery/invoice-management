import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash, 
  ArrowLeft, 
  Save, 
  FileText,
  Calendar,
  Users,
  User,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { formatCurrency } from '../lib/utils';
import { useInvoiceStore } from '../stores/invoiceStore';

// Mock data
const customers = [
  { value: 'cust-1', label: 'Acme Corp' },
  { value: 'cust-2', label: 'Globex Inc' },
  { value: 'cust-3', label: 'Stark Industries' },
  { value: 'cust-4', label: 'Wayne Enterprises' },
];

const paymentTerms = [
  { value: 'term-1', label: 'Net 15' },
  { value: 'term-2', label: 'Net 30' },
  { value: 'term-3', label: 'Net 45' },
  { value: 'term-4', label: 'Net 60' },
];

const salespeople = [
  { value: 'sp-1', label: 'John Doe' },
  { value: 'sp-2', label: 'Jane Smith' },
  { value: 'sp-3', label: 'Robert Johnson' },
];

const products = [
  { value: 'prod-1', label: 'Laptop Computer', price: 899.99 },
  { value: 'prod-2', label: 'Office Chair', price: 149.99 },
  { value: 'prod-3', label: 'Desktop Monitor', price: 249.99 },
  { value: 'prod-4', label: 'Wireless Keyboard', price: 59.99 },
  { value: 'prod-5', label: 'Wireless Mouse', price: 39.99 },
  { value: 'prod-6', label: 'USB-C Dock', price: 89.99 },
  { value: 'prod-7', label: 'Webcam HD', price: 79.99 },
  { value: 'prod-8', label: 'Noise Cancelling Headphones', price: 199.99 },
];

const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  const { 
    draftInvoice, 
    initDraftInvoice, 
    updateDraftInvoice, 
    addInvoiceItem, 
    updateInvoiceItem, 
    removeInvoiceItem, 
    createInvoice,
    isLoading
  } = useInvoiceStore();

  const [newProduct, setNewProduct] = useState<string>('');
  const [newQuantity, setNewQuantity] = useState<number>(1);

  useEffect(() => {
    initDraftInvoice();
  }, [initDraftInvoice]);

  const handleAddItem = () => {
    if (!newProduct) return;

    const selectedProduct = products.find(p => p.value === newProduct);
    if (!selectedProduct) return;

    addInvoiceItem({
      productId: selectedProduct.value,
      productDescription: selectedProduct.label,
      quantity: newQuantity,
      unitPrice: selectedProduct.price,
      subtotal: selectedProduct.price * newQuantity,
    });

    // Reset form
    setNewProduct('');
    setNewQuantity(1);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) quantity = 1;
    updateInvoiceItem(index, { quantity });
  };

  const handleSaveInvoice = async () => {
    if (!draftInvoice) return;
    
    try {
      await createInvoice(draftInvoice);
      navigate('/invoices');
    } catch (error) {
      console.error('Failed to save invoice:', error);
    }
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedCustomer = customers.find(c => c.value === selectedId);
    
    if (selectedCustomer) {
      updateDraftInvoice({
        customerId: selectedId,
        customerName: selectedCustomer.label,
      });
    }
  };

  const handlePaymentTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedTerm = paymentTerms.find(t => t.value === selectedId);
    
    if (selectedTerm) {
      updateDraftInvoice({
        paymentTermId: selectedId,
        paymentTermDescription: selectedTerm.label,
      });
    }
  };

  const handleSalespersonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedSalesperson = salespeople.find(s => s.value === selectedId);
    
    if (selectedSalesperson) {
      updateDraftInvoice({
        salespersonId: selectedId,
        salespersonName: selectedSalesperson.label,
      });
    }
  };

  if (!draftInvoice) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/invoices')}
          >
            Back to Invoices
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Create New Invoice</h1>
        </div>
        <Button 
          variant="primary" 
          leftIcon={<Save size={16} />}
          onClick={handleSaveInvoice}
          isLoading={isLoading}
        >
          Save Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Invoice Date"
                type="date"
                value={draftInvoice.date.split('T')[0]}
                onChange={(e) => updateDraftInvoice({ date: new Date(e.target.value).toISOString() })}
                leftIcon={<Calendar size={16} />}
                fullWidth
              />
              <Select
                label="Payment Terms"
                options={paymentTerms}
                value={draftInvoice.paymentTermId}
                onChange={handlePaymentTermChange}
                fullWidth
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Customer"
                options={customers}
                value={draftInvoice.customerId}
                onChange={handleCustomerChange}
                leftIcon={<Users size={16} />}
                fullWidth
              />
              <Select
                label="Salesperson"
                options={salespeople}
                value={draftInvoice.salespersonId}
                onChange={handleSalespersonChange}
                leftIcon={<User size={16} />}
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Comments"
                type="text"
                value={draftInvoice.comments}
                onChange={(e) => updateDraftInvoice({ comments: e.target.value })}
                leftIcon={<MessageSquare size={16} />}
                fullWidth
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatCurrency(draftInvoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (18%)</span>
              <span className="font-medium">{formatCurrency(draftInvoice.tax)}</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">{formatCurrency(draftInvoice.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Invoice Items</CardTitle>
          <FileText className="h-5 w-5 text-primary-500" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {draftInvoice.items.map((item, index) => (
                  <TableRow key={item.id} className="animate-fade-in">
                    <TableCell>{item.productDescription}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell>{formatCurrency(item.subtotal)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInvoiceItem(index)}
                      >
                        <Trash size={16} className="text-error-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {draftInvoice.items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500 italic">
                      No items added yet. Add your first item below.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-4">
          <Select
            options={products}
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            fullWidth
            className="sm:w-auto sm:flex-grow"
          />
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="1"
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
              className="w-20"
            />
            <Button
              leftIcon={<Plus size={16} />}
              onClick={handleAddItem}
              disabled={!newProduct}
            >
              Add Item
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateInvoice;