import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Edit, 
  Trash, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import PaymentTermForm from '../components/forms/PaymentTermForm';

// Mock data for payment terms
const mockPaymentTerms = [
  { id: '1', description: 'Net 15', days: 15, isActive: true, invoicesCount: 23 },
  { id: '2', description: 'Net 30', days: 30, isActive: true, invoicesCount: 156 },
  { id: '3', description: 'Net 45', days: 45, isActive: true, invoicesCount: 45 },
  { id: '4', description: 'Net 60', days: 60, isActive: true, invoicesCount: 12 },
  { id: '5', description: 'Due on Receipt', days: 0, isActive: true, invoicesCount: 8 },
  { id: '6', description: 'Net 90', days: 90, isActive: false, invoicesCount: 3 },
  { id: '7', description: 'Net 7', days: 7, isActive: true, invoicesCount: 34 },
  { id: '8', description: 'Net 120', days: 120, isActive: false, invoicesCount: 1 },
];

const PaymentTerms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPaymentTerm, setEditingPaymentTerm] = useState<any>(null);
  const [paymentTerms, setPaymentTerms] = useState(mockPaymentTerms);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleAddPaymentTerm = () => {
    setEditingPaymentTerm(null);
    setShowModal(true);
  };

  const handleEditPaymentTerm = (paymentTerm: any) => {
    setEditingPaymentTerm(paymentTerm);
    setShowModal(true);
  };

  const handleDeletePaymentTerm = (paymentTermId: string) => {
    if (window.confirm('Are you sure you want to delete this payment term?')) {
      setPaymentTerms(prev => prev.filter(pt => pt.id !== paymentTermId));
    }
  };

  const handleSubmitPaymentTerm = (paymentTermData: any) => {
    if (editingPaymentTerm) {
      // Update existing payment term
      setPaymentTerms(prev => prev.map(pt => 
        pt.id === editingPaymentTerm.id 
          ? { ...pt, ...paymentTermData }
          : pt
      ));
    } else {
      // Add new payment term
      const newPaymentTerm = {
        ...paymentTermData,
        id: `term-${Date.now()}`,
        invoicesCount: 0
      };
      setPaymentTerms(prev => [...prev, newPaymentTerm]);
    }
    setShowModal(false);
    setEditingPaymentTerm(null);
  };

  const filteredPaymentTerms = paymentTerms.filter(term => {
    const matchesSearch = term.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === null || term.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  const getDaysDisplay = (days: number) => {
    if (days === 0) return 'Immediate';
    return `${days} days`;
  };

  const getUsageColor = (count: number) => {
    if (count >= 100) return 'bg-success-100 text-success-800';
    if (count >= 50) return 'bg-warning-100 text-warning-800';
    if (count >= 10) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Terms</h1>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={handleAddPaymentTerm}
        >
          Add Payment Term
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search payment terms..."
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

      {/* Payment Terms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Payment Terms List</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredPaymentTerms.length} terms)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Payment Days</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentTerms.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {term.description}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {term.days} days
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {term.usage}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        term.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {term.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(term.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical size={16} />
                        </Button>
                        
                        {showDropdown === term.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEditPaymentTerm(term);
                                  setShowDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit size={16} className="mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeletePaymentTerm(term.id);
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

      {/* Add/Edit Payment Term Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPaymentTerm ? 'Edit Payment Term' : 'Add Payment Term'}
        size="lg"
      >
        <PaymentTermForm
          paymentTerm={editingPaymentTerm}
          onSubmit={handleSubmitPaymentTerm}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default PaymentTerms;