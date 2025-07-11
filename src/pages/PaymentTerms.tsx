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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const filteredPaymentTerms = mockPaymentTerms.filter(term => {
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
        <h1 className="text-2xl font-bold text-gray-900">Payment Terms</h1>
        <Button 
          leftIcon={<Plus size={16} />}
        >
          Add Payment Term
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Payment Terms</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Input
              placeholder="Search payment terms..."
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
                      All Payment Terms
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
                  <TableHead>Payment Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaymentTerms.map((term, index) => (
                  <TableRow 
                    key={term.id}
                    className="hover:bg-gray-50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell className="font-medium">{term.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {term.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {getDaysDisplay(term.days)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUsageColor(term.invoicesCount)}`}>
                        {term.invoicesCount} invoices
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        term.isActive 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {term.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(term.id)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {showDropdown === term.id && (
                          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1" role="none">
                              <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit size={16} className="mr-2" />
                                Edit Payment Term
                              </button>
                              <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {term.isActive ? (
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
                                disabled={term.invoicesCount > 0}
                              >
                                <Trash size={16} className="mr-2" />
                                {term.invoicesCount > 0 ? 'Cannot Delete (In Use)' : 'Delete'}
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

export default PaymentTerms;