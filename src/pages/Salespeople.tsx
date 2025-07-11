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
  Percent
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const filteredSalespeople = mockSalespeople.filter(salesperson => {
    const matchesSearch = salesperson.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === null || salesperson.isActive === activeFilter;
    return matchesSearch && matchesActive;
  });

  const calculateCommission = (totalSales: number, percentage: number) => {
    return (totalSales * percentage) / 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Salespeople</h1>
        <Button 
          leftIcon={<Plus size={16} />}
        >
          Add Salesperson
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Salespeople</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Input
              placeholder="Search salespeople..."
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
                      All Salespeople
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
                  <TableHead>Name</TableHead>
                  <TableHead>Commission %</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Earned Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalespeople.map((salesperson, index) => {
                  const earnedCommission = calculateCommission(salesperson.totalSales, salesperson.commissionPercentage);
                  
                  return (
                    <TableRow 
                      key={salesperson.id}
                      className="hover:bg-gray-50 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium">{salesperson.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-400" />
                          {salesperson.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Percent size={14} className="mr-1 text-gray-400" />
                          {salesperson.commissionPercentage.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(salesperson.totalSales)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {salesperson.invoicesCount} invoices
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-success-600">
                          {formatCurrency(earnedCommission)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          salesperson.isActive 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {salesperson.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(salesperson.id)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {showDropdown === salesperson.id && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1" role="none">
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit size={16} className="mr-2" />
                                  Edit Salesperson
                                </button>
                                <button
                                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {salesperson.isActive ? (
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

export default Salespeople;