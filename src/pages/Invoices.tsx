import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash, 
  Download 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatCurrency, formatDate } from '../lib/utils';
import { useInvoiceStore } from '../stores/invoiceStore';

const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const { 
    invoices, 
    isLoading, 
    fetchInvoices, 
    page, 
    limit, 
    totalPages, 
    total 
  } = useInvoiceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you'd probably want to debounce this
  };

  const handleCreateInvoice = () => {
    navigate('/invoices/create');
  };

  const handleViewInvoice = (id: string) => {
    navigate(`/invoices/${id}`);
  };

  const handleEditInvoice = (id: string) => {
    navigate(`/invoices/${id}/edit`);
  };

  const toggleDropdown = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'issued':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-success-100 text-success-800';
      case 'cancelled':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <Button 
          onClick={handleCreateInvoice} 
          leftIcon={<Plus size={16} />}
        >
          Create Invoice
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={handleSearch}
                leftIcon={<Search size={16} />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Invoice List</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({invoices.length} invoices)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {invoice.number}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {invoice.customer}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {formatDate(invoice.date)}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {formatCurrency(invoice.total)}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === 'draft'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            : invoice.status === 'issued'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : invoice.status === 'paid'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleDropdown(invoice.id)}
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical size={16} />
                          </Button>
                          
                          {showDropdown === invoice.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    handleViewInvoice(invoice.id);
                                    setShowDropdown(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Eye size={16} className="mr-3" />
                                  View
                                </button>
                                <button
                                  onClick={() => {
                                    handleEditInvoice(invoice.id);
                                    setShowDropdown(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Edit size={16} className="mr-3" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    // Handle download
                                    setShowDropdown(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Download size={16} className="mr-3" />
                                  Download
                                </button>
                                <button
                                  onClick={() => {
                                    // Handle delete
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Handle previous page */}}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Handle next page */}}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Invoices;