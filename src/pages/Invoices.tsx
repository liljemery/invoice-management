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
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <Button 
          onClick={handleCreateInvoice} 
          leftIcon={<Plus size={16} />}
        >
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
          <CardTitle className="text-lg font-medium">All Invoices</CardTitle>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={handleSearch}
              leftIcon={<Search size={16} />}
              className="max-w-xs"
            />
            <Button 
              variant="outline" 
              leftIcon={<Filter size={16} />}
              className="hidden sm:flex"
            >
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow 
                        key={invoice.id}
                        className="cursor-pointer hover:bg-gray-50 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => handleViewInvoice(invoice.id)}
                      >
                        <TableCell className="font-medium">{invoice.number}</TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>{formatDate(invoice.date)}</TableCell>
                        <TableCell>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(invoice.status)}`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(invoice.total)}</TableCell>
                        <TableCell>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(invoice.id);
                              }}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {showDropdown === invoice.id && (
                              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1" role="none">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewInvoice(invoice.id);
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Eye size={16} className="mr-2" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditInvoice(invoice.id);
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit size={16} className="mr-2" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle download
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Download size={16} className="mr-2" />
                                    Download PDF
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Handle delete
                                    }}
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
              
              <div className="flex items-center justify-between px-4 py-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{invoices.length}</span> of{' '}
                  <span className="font-medium">{total}</span> invoices
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => fetchInvoices(page - 1, limit)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => fetchInvoices(page + 1, limit)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;