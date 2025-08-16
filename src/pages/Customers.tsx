import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
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
import CustomerForm from '../components/forms/CustomerForm';

// Mock data for customers
const mockCustomers = [
  { id: '1', businessName: 'Acme Corp', legalName: 'Acme Corporation', taxId: '12-3456789', accountNumber: '1001', isActive: true },
  { id: '2', businessName: 'Globex Inc', legalName: 'Globex Incorporated', taxId: '98-7654321', accountNumber: '1002', isActive: true },
  { id: '3', businessName: 'Stark Industries', legalName: 'Stark Industries LLC', taxId: '45-6789123', accountNumber: '1003', isActive: true },
  { id: '4', businessName: 'Wayne Enterprises', legalName: 'Wayne Enterprises Inc', taxId: '78-9123456', accountNumber: '1004', isActive: true },
  { id: '5', businessName: 'Umbrella Corp', legalName: 'Umbrella Corporation', taxId: '32-1654987', accountNumber: '1005', isActive: false },
  { id: '6', businessName: 'Oscorp', legalName: 'Oscorp Industries', taxId: '65-4321987', accountNumber: '1006', isActive: true },
  { id: '7', businessName: 'LexCorp', legalName: 'LexCorp International', taxId: '89-7456321', accountNumber: '1007', isActive: true },
  { id: '8', businessName: 'Cyberdyne Systems', legalName: 'Cyberdyne Systems Corp', taxId: '23-7891456', accountNumber: '1008', isActive: false },
];

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [customers, setCustomers] = useState(mockCustomers);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
    }
  };

  const handleSubmitCustomer = (customerData: any) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(c => 
        c.id === editingCustomer.id 
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer = {
        ...customerData,
        id: `customer-${Date.now()}`
      };
      setCustomers(prev => [...prev, newCustomer]);
    }
    setShowModal(false);
    setEditingCustomer(null);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.taxId.includes(searchTerm);
    const matchesActive = activeFilter === null || customer.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or tax ID..."
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Customer List</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredCustomers.length} customers)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Legal Name</TableHead>
                  <TableHead>Tax ID</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {customer.businessName}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {customer.legalName}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {customer.taxId}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {customer.accountNumber}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(customer.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical size={16} />
                        </Button>
                        
                        {showDropdown === customer.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEditCustomer(customer);
                                  setShowDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit size={16} className="mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteCustomer(customer.id);
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

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCustomer ? 'Edit Customer' : 'Add Customer'}
        size="lg"
      >
        <CustomerForm
          customer={editingCustomer}
          onSubmit={handleSubmitCustomer}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Customers;