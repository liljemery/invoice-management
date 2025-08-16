import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp, 
  Clock, 
  Package, 
  BarChart3, 
  Zap 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import PDFReportButton from '../components/ui/PDFReportButton';

// Mock data for dashboard
const recentInvoices = [
  { id: '1', customer: 'Acme Corp', date: '2024-01-15', amount: '2,500.00', status: 'Paid' },
  { id: '2', customer: 'Globex Inc', date: '2024-01-14', amount: '1,800.00', status: 'Pending' },
  { id: '3', customer: 'Stark Industries', date: '2024-01-13', amount: '3,200.00', status: 'Paid' },
  { id: '4', customer: 'Wayne Enterprises', date: '2024-01-12', amount: '950.00', status: 'Overdue' },
  { id: '5', customer: 'Umbrella Corp', date: '2024-01-11', amount: '4,100.00', status: 'Paid' },
];

const topCustomers = [
  { id: '1', name: 'Acme Corp', total: 125000, invoices: 45, percentage: 28 },
  { id: '2', name: 'Globex Inc', total: 98000, invoices: 32, percentage: 22 },
  { id: '3', name: 'Stark Industries', total: 87500, invoices: 28, percentage: 19 },
  { id: '4', name: 'Wayne Enterprises', total: 72000, invoices: 25, percentage: 16 },
  { id: '5', name: 'Umbrella Corp', total: 68000, invoices: 22, percentage: 15 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: 'Total Sales',
      value: '$24,780.00',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign size={24} className="text-primary-500" />,
    },
    {
      title: 'New Customers',
      value: '18',
      change: '+4.3%',
      isPositive: true,
      icon: <Users size={24} className="text-secondary-500" />,
    },
    {
      title: 'Pending Invoices',
      value: '7',
      change: '-2.5%',
      isPositive: true,
      icon: <Clock size={24} className="text-warning-500" />,
    },
    {
      title: 'Revenue Growth',
      value: '15.2%',
      change: '+3.1%',
      isPositive: true,
      icon: <TrendingUp size={24} className="text-success-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,231</p>
                <p className="text-xs text-green-600 dark:text-green-400">+20.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Customers</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+2,350</p>
                <p className="text-xs text-green-600 dark:text-green-400">+180.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Invoices</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">+2 from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Growth</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+12.5%</p>
                <p className="text-xs text-green-600 dark:text-green-400">+2.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} className="text-primary-600 dark:text-primary-400" />
              <span>Recent Invoices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.customer}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {invoice.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${invoice.amount}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : invoice.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-primary-600 dark:text-primary-400" />
              <span>Top Customers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {customer.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {customer.invoices} invoices
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${customer.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {customer.percentage}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap size={20} className="text-primary-600 dark:text-primary-400" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/invoices/create')}
            >
              <FileText size={24} className="text-primary-600 dark:text-primary-400" />
              <span>Create Invoice</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/customers')}
            >
              <Users size={24} className="text-primary-600 dark:text-primary-400" />
              <span>Add Customer</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/products')}
            >
              <Package size={24} className="text-primary-600 dark:text-primary-400" />
              <span>Add Product</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/invoices')}
            >
              <BarChart3 size={24} className="text-primary-600 dark:text-primary-400" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PDF Report Button */}
      <div className="flex justify-center">
        <PDFReportButton />
      </div>
    </div>
  );
};

export default Dashboard;