import React from 'react';
import { Download, FileText } from 'lucide-react';
import Button from './Button';

// Mock data - En una aplicación real, esto vendría de las stores o API
const mockData = {
  products: [
    { id: '1', description: 'Laptop Computer', unitCost: 500, unitPrice: 899.99, isActive: true },
    { id: '2', description: 'Office Chair', unitCost: 75, unitPrice: 149.99, isActive: true },
    { id: '3', description: 'Desktop Monitor', unitCost: 120, unitPrice: 249.99, isActive: true },
    { id: '4', description: 'Wireless Keyboard', unitCost: 25, unitPrice: 59.99, isActive: true },
    { id: '5', description: 'Wireless Mouse', unitCost: 15, unitPrice: 39.99, isActive: true },
    { id: '6', description: 'USB-C Dock', unitCost: 45, unitPrice: 89.99, isActive: false },
    { id: '7', description: 'Webcam HD', unitCost: 35, unitPrice: 79.99, isActive: true },
    { id: '8', description: 'Noise Cancelling Headphones', unitCost: 120, unitPrice: 199.99, isActive: true },
  ],
  customers: [
    { id: '1', businessName: 'Acme Corp', legalName: 'Acme Corporation', taxId: '12-3456789', accountNumber: '1001', isActive: true },
    { id: '2', businessName: 'Globex Inc', legalName: 'Globex Incorporated', taxId: '98-7654321', accountNumber: '1002', isActive: true },
    { id: '3', businessName: 'Stark Industries', legalName: 'Stark Industries LLC', taxId: '45-6789123', accountNumber: '1003', isActive: true },
    { id: '4', businessName: 'Wayne Enterprises', legalName: 'Wayne Enterprises Inc', taxId: '78-9123456', accountNumber: '1004', isActive: true },
    { id: '5', businessName: 'Umbrella Corp', legalName: 'Umbrella Corporation', taxId: '32-1654987', accountNumber: '1005', isActive: false },
    { id: '6', businessName: 'Oscorp', legalName: 'Oscorp Industries', taxId: '65-4321987', accountNumber: '1006', isActive: true },
    { id: '7', businessName: 'LexCorp', legalName: 'LexCorp International', taxId: '89-7456321', accountNumber: '1007', isActive: true },
    { id: '8', businessName: 'Cyberdyne Systems', legalName: 'Cyberdyne Systems Corp', taxId: '23-7891456', accountNumber: '1008', isActive: false },
  ],
  paymentTerms: [
    { id: '1', description: 'Net 15', days: 15, isActive: true, invoicesCount: 23 },
    { id: '2', description: 'Net 30', days: 30, isActive: true, invoicesCount: 156 },
    { id: '3', description: 'Net 45', days: 45, isActive: true, invoicesCount: 45 },
    { id: '4', description: 'Net 60', days: 60, isActive: true, invoicesCount: 12 },
    { id: '5', description: 'Due on Receipt', days: 0, isActive: true, invoicesCount: 8 },
    { id: '6', description: 'Net 90', days: 90, isActive: false, invoicesCount: 3 },
    { id: '7', description: 'Net 7', days: 7, isActive: true, invoicesCount: 34 },
    { id: '8', description: 'Net 120', days: 120, isActive: false, invoicesCount: 1 },
  ],
  salespeople: [
    { id: '1', name: 'John Doe', commissionPercentage: 5.0, isActive: true, totalSales: 125000, invoicesCount: 45 },
    { id: '2', name: 'Jane Smith', commissionPercentage: 4.5, isActive: true, totalSales: 98000, invoicesCount: 32 },
    { id: '3', name: 'Robert Johnson', commissionPercentage: 6.0, isActive: true, totalSales: 156000, invoicesCount: 58 },
    { id: '4', name: 'Emily Davis', commissionPercentage: 4.0, isActive: true, totalSales: 87000, invoicesCount: 28 },
    { id: '5', name: 'Michael Wilson', commissionPercentage: 5.5, isActive: false, totalSales: 45000, invoicesCount: 15 },
    { id: '6', name: 'Sarah Brown', commissionPercentage: 4.8, isActive: true, totalSales: 112000, invoicesCount: 41 },
    { id: '7', name: 'David Miller', commissionPercentage: 5.2, isActive: true, totalSales: 134000, invoicesCount: 49 },
    { id: '8', name: 'Lisa Garcia', commissionPercentage: 4.2, isActive: false, totalSales: 23000, invoicesCount: 8 },
  ],
  invoices: [
    {
      id: 'inv-1',
      number: 'INV-2023001',
      date: '2023-09-15T00:00:00.000Z',
      customerId: 'cust-1',
      customerName: 'Acme Corp',
      paymentTermId: 'term-2',
      paymentTermDescription: 'Net 30',
      salespersonId: 'sp-1',
      salespersonName: 'John Doe',
      comments: 'Quarterly office supplies order',
      items: [
        {
          id: 'item-1-1',
          productId: 'prod-1',
          productDescription: 'Laptop Computer',
          quantity: 2,
          unitPrice: 899.99,
          subtotal: 1799.98
        },
        {
          id: 'item-1-2',
          productId: 'prod-2',
          productDescription: 'Office Chair',
          quantity: 5,
          unitPrice: 149.99,
          subtotal: 749.95
        }
      ],
      subtotal: 2549.93,
      tax: 458.99,
      total: 3008.92,
      status: 'paid'
    },
    {
      id: 'inv-2',
      number: 'INV-2023002',
      date: '2023-09-14T00:00:00.000Z',
      customerId: 'cust-2',
      customerName: 'Globex Inc',
      paymentTermId: 'term-1',
      paymentTermDescription: 'Net 15',
      salespersonId: 'sp-2',
      salespersonName: 'Jane Smith',
      comments: 'IT equipment upgrade',
      items: [
        {
          id: 'item-2-1',
          productId: 'prod-3',
          productDescription: 'Desktop Monitor',
          quantity: 3,
          unitPrice: 249.99,
          subtotal: 749.97
        }
      ],
      subtotal: 749.97,
      tax: 134.99,
      total: 884.96,
      status: 'issued'
    },
    {
      id: 'inv-3',
      number: 'INV-2023003',
      date: '2023-09-12T00:00:00.000Z',
      customerId: 'cust-3',
      customerName: 'Stark Industries',
      paymentTermId: 'term-2',
      paymentTermDescription: 'Net 30',
      salespersonId: 'sp-3',
      salespersonName: 'Robert Johnson',
      comments: 'Research department equipment',
      items: [
        {
          id: 'item-3-1',
          productId: 'prod-8',
          productDescription: 'Noise Cancelling Headphones',
          quantity: 10,
          unitPrice: 199.99,
          subtotal: 1999.90
        },
        {
          id: 'item-3-2',
          productId: 'prod-7',
          productDescription: 'Webcam HD',
          quantity: 8,
          unitPrice: 79.99,
          subtotal: 639.92
        }
      ],
      subtotal: 2639.82,
      tax: 475.17,
      total: 3114.99,
      status: 'paid'
    }
  ]
};

interface ReportButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const ReportButton: React.FC<ReportButtonProps> = ({ 
  variant = 'outline', 
  size = 'md' 
}) => {
  const generateReport = () => {
    try {
      // Crear el objeto del reporte con metadata
      const reportData = {
        metadata: {
          generatedAt: new Date().toISOString(),
          generatedBy: 'Invoice Management System',
          version: '1.0.0',
          totalRecords: {
            products: mockData.products.length,
            customers: mockData.customers.length,
            paymentTerms: mockData.paymentTerms.length,
            salespeople: mockData.salespeople.length,
            invoices: mockData.invoices.length
          }
        },
        data: mockData
      };

      // Convertir a JSON con formato bonito
      const jsonString = JSON.stringify(reportData, null, 2);
      
      // Crear blob y descargar
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Crear elemento de descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-system-report-${new Date().toISOString().split('T')[0]}.json`;
      
      // Simular click para descargar
      document.body.appendChild(link);
      link.click();
      
      // Limpiar
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Reporte generado exitosamente');
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      alert('Error al generar el reporte. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={generateReport}
      leftIcon={<Download size={16} />}
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <span className="hidden sm:inline">Generar Reporte JSON</span>
      <span className="sm:hidden">Reporte</span>
    </Button>
  );
};

export default ReportButton;