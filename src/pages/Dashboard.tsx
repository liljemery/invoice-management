import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { BarChart, TrendingUp, Users, DollarSign, Clock, FileText } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';
import PDFReportButton from '../components/ui/PDFReportButton';

const Dashboard: React.FC = () => {
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

  const recentInvoices = [
    { id: 'INV-2023001', customer: 'Acme Corp', date: '2023-09-15', amount: 1250.00, status: 'paid' },
    { id: 'INV-2023002', customer: 'Globex Inc', date: '2023-09-14', amount: 876.50, status: 'pending' },
    { id: 'INV-2023003', customer: 'Stark Industries', date: '2023-09-12', amount: 3450.00, status: 'paid' },
    { id: 'INV-2023004', customer: 'Wayne Enterprises', date: '2023-09-10', amount: 1100.00, status: 'pending' },
    { id: 'INV-2023005', customer: 'Umbrella Corp', date: '2023-09-08', amount: 2780.00, status: 'paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here's your business overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-md">
            <FileText size={14} className="mr-1" />
            Reporte completo del sistema
          </div>
          <PDFReportButton variant="primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-gray-50">{stat.icon}</div>
              </div>
              <div className={`text-sm mt-2 ${stat.isPositive ? 'text-success-600' : 'text-error-600'}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
            <BarChart size={20} className="text-gray-400" />
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] flex items-end justify-between">
              {[40, 65, 45, 75, 55, 85, 70, 60, 80, 55, 75, 90].map((height, i) => (
                <div key={i} className="relative flex-1 mx-1">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary-200 rounded-t-sm animate-slide-up transition-all duration-500" 
                    style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded-t-sm animate-slide-up transition-all duration-500" 
                    style={{ height: `${height * 0.7}%`, animationDelay: `${i * 0.05 + 0.1}s` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Invoices</CardTitle>
            <span className="text-sm text-primary-600 hover:underline cursor-pointer">View all</span>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableBody>
                {recentInvoices.map((invoice, i) => (
                  <TableRow key={invoice.id} className="animate-slide-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    <TableCell className="py-2">
                      <div className="font-medium">{invoice.id}</div>
                      <div className="text-xs text-gray-500">{invoice.customer}</div>
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                      <div className="text-xs text-gray-500">{formatDate(invoice.date)}</div>
                    </TableCell>
                    <TableCell className="text-right py-2 w-24">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                        invoice.status === 'paid' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-warning-100 text-warning-800'
                      }`}>
                        {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;