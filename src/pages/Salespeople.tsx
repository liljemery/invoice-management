import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Edit, 
  Trash, 
  MoreVertical,
  CheckCircle,
  XCircle,
  DollarSign,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import SalespersonForm from '../components/forms/SalespersonForm';
import { formatCurrency } from '../lib/utils';

// Mock data for salespeople
const mockSalespeople = [
  { id: '1', name: 'John Doe', commissionPercentage: 5.0, isActive: true, totalSales: 125000, invoicesCount: 45 },
  { id: '2', name: 'Jane Smith', commissionPercentage: 4.5, isActive: true, totalSales: 98000, invoicesCount: 32 },
  { id: '3', name: 'Robert Johnson', commissionPercentage: 6.0, isActive: true, totalSales: 156000, invoicesCount: 58 },
  { id: '4', name: 'Emily Davis', commissionPercentage: 4.0, isActive: true, totalSales: 87000, invoicesCount: 28 },
  { id: '5', name: 'Michael Wilson', commissionPercentage: 5.5, isActive: false, totalSales: 45000, invoicesCount: 15 },
  { id: '6', name: 'Sarah Brown', commissionPercentage: 4.8, isActive: true, totalSales: 112000, invoicesCount: 41 },
  { id: '7', name: 'David Miller', commissionPercentage: 5.2, isActive: true, totalSales: 134000, invoicesCount: 49 },
  { id: '8', name: 'Lisa Garcia', commissionPercentage: 4.2, isActive: false, totalSales: 23000, invoicesCount: 8 },
];

const Salespeople: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSalesperson, setEditingSalesperson] = useState<any>(null);
  const [salespeople, setSalespeople] = useState(mockSalespeople);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const handleAddSalesperson = () => {
    setEditingSalesperson(null);
    setShowModal(true);
  };

  const handleEditSalesperson = (salesperson: any) => {
    setEditingSalesperson(salesperson);
    setShowModal(true);
  };

  const handleDeleteSalesperson = (salespersonId: string) => {
    if (window.confirm('Are you sure you want to delete this salesperson?')) {
      setSalespeople(prev => prev.filter(sp => sp.id !== salespersonId));
    }
  };

  const handleSubmitSalesperson = (salespersonData: any) => {
    if (editingSalesperson) {
      // Update existing salesperson
      setSalespeople(prev => prev.map(sp => 
        sp.id === editingSalesperson.id 
          ? { ...sp, ...salespersonData }
          : sp
      ));
    } else {
      // Add new salesperson
      const newSalesperson = {
        ...salespersonData,
        id: `sp-${Date.now()}`,
        totalSales: 0,
        invoicesCount: 0
      };
      setSalespeople(prev => [...prev, newSalesperson]);
    }
    setShowModal(false);
    setEditingSalesperson(null);
  };

  const filteredSalespeople = salespeople.filter(salesperson => {
    const matchesSearch = salesperson.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === null || salesperson.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  const getPerformanceColor = (totalSales: number) => {
    if (totalSales >= 100000) return 'bg-success-100 text-success-800';
    if (totalSales >= 50000) return 'bg-warning-100 text-warning-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Salespeople</h1>
        <Button 
          leftIcon={<Plus size={16} />}
          onClick={handleAddSalesperson}
        >
          Add Salesperson
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search salespeople..."
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

      {/* Salespeople Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Salespeople List</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredSalespeople.length} salespeople)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalespeople.map((salesperson) => (
                  <TableRow key={salesperson.id}>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {salesperson.name}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {salesperson.commissionPercentage}%
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      ${salesperson.totalSales.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-300">
                      {salesperson.invoicesCount}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        salesperson.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {salesperson.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(salesperson.id)}
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical size={16} />
                        </Button>
                        
                        {showDropdown === salesperson.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEditSalesperson(salesperson);
                                  setShowDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Edit size={16} className="mr-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteSalesperson(salesperson.id);
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

      {/* Add/Edit Salesperson Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingSalesperson ? 'Edit Salesperson' : 'Add Salesperson'}
        size="lg"
      >
        <SalespersonForm
          salesperson={editingSalesperson}
          onSubmit={handleSubmitSalesperson}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Salespeople;