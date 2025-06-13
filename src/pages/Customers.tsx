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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.taxId.includes(searchTerm);
    const matchesActive = activeFilter === null || customer.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button 
          leftIcon={<Plus size={16} />}
        >
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Customers</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Input
              placeholder="Search by name or tax ID..."
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
                      All Customers
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
                  <TableHead>Business Name</TableHead>
                  <TableHead>Legal Name</TableHead>
                  <TableHead>Tax ID</TableHead>
                  <TableHead>Account #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <TableRow 
                    key={customer.id}
                    className="hover:bg-gray-50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-gray-400" />
                        {customer.businessName}
                      </div>
                    </TableCell>
                    <TableCell>{customer.legalName}</TableCell>
                    <TableCell>{customer.taxId}</TableCell>
                    <TableCell>{customer.accountNumber}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        customer.isActive 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {customer.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(customer.id)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {showDropdown === customer.id && (
                          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1" role="none">
                              <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit size={16} className="mr-2" />
                                Edit Customer
                              </button>
                              <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {customer.isActive ? (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;