import React from 'react';
import { FileText, Download } from 'lucide-react';
import Button from './Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

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
    { id: '5', description: 'Umbrella Corp', legalName: 'Umbrella Corporation', taxId: '32-1654987', accountNumber: '1005', isActive: false },
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

interface PDFReportButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const PDFReportButton: React.FC<PDFReportButtonProps> = ({ 
  variant = 'primary', 
  size = 'md' 
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const generatePDFReport = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let yPosition = 20;

      // Colors
      const primaryColor = [59, 130, 246]; // Blue
      const secondaryColor = [107, 114, 128]; // Gray
      const accentColor = [16, 185, 129]; // Green

      // Header
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE MANAGEMENT SYSTEM', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Complete Business Report', pageWidth / 2, 30, { align: 'center' });

      yPosition = 50;

      // Report Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}`, 20, yPosition);
      
      yPosition += 20;

      // Summary Statistics
      doc.setFillColor(248, 250, 252);
      doc.rect(15, yPosition - 5, pageWidth - 30, 25, 'F');
      
      doc.setTextColor(...primaryColor);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EXECUTIVE SUMMARY', 20, yPosition + 5);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const totalRevenue = mockData.invoices.reduce((sum, inv) => sum + inv.total, 0);
      const activeProducts = mockData.products.filter(p => p.isActive).length;
      const activeCustomers = mockData.customers.filter(c => c.isActive).length;
      const activeSalespeople = mockData.salespeople.filter(s => s.isActive).length;

      doc.text(`• Total Revenue: ${formatCurrency(totalRevenue)}`, 25, yPosition + 12);
      doc.text(`• Active Products: ${activeProducts}`, 25, yPosition + 17);
      doc.text(`• Active Customers: ${activeCustomers}`, 120, yPosition + 12);
      doc.text(`• Active Salespeople: ${activeSalespeople}`, 120, yPosition + 17);

      yPosition += 35;

      // Products Section
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('PRODUCTS CATALOG', 20, yPosition);
      yPosition += 10;

      const productHeaders = ['ID', 'Description', 'Cost', 'Price', 'Margin', 'Status'];
      const productData = mockData.products.map(product => {
        const margin = ((product.unitPrice - product.unitCost) / product.unitPrice * 100).toFixed(1);
        return [
          product.id,
          product.description.length > 25 ? product.description.substring(0, 25) + '...' : product.description,
          formatCurrency(product.unitCost),
          formatCurrency(product.unitPrice),
          `${margin}%`,
          product.isActive ? 'Active' : 'Inactive'
        ];
      });

      doc.autoTable({
        startY: yPosition,
        head: [productHeaders],
        body: productData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 20;

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Customers Section
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOMER DIRECTORY', 20, yPosition);
      yPosition += 10;

      const customerHeaders = ['ID', 'Business Name', 'Tax ID', 'Account #', 'Status'];
      const customerData = mockData.customers.map(customer => [
        customer.id,
        customer.businessName?.length > 20 ? customer.businessName.substring(0, 20) + '...' : customer.businessName || 'N/A',
        customer.taxId,
        customer.accountNumber,
        customer.isActive ? 'Active' : 'Inactive'
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [customerHeaders],
        body: customerData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 20;

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Salespeople Section
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('SALES TEAM PERFORMANCE', 20, yPosition);
      yPosition += 10;

      const salespeopleHeaders = ['ID', 'Name', 'Commission %', 'Total Sales', 'Invoices', 'Status'];
      const salespeopleData = mockData.salespeople.map(person => [
        person.id,
        person.name,
        `${person.commissionPercentage}%`,
        formatCurrency(person.totalSales),
        person.invoicesCount.toString(),
        person.isActive ? 'Active' : 'Inactive'
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [salespeopleHeaders],
        body: salespeopleData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 20;

      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Payment Terms Section
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('PAYMENT TERMS', 20, yPosition);
      yPosition += 10;

      const paymentTermsHeaders = ['ID', 'Description', 'Days', 'Usage', 'Status'];
      const paymentTermsData = mockData.paymentTerms.map(term => [
        term.id,
        term.description,
        term.days === 0 ? 'Immediate' : `${term.days} days`,
        `${term.invoicesCount} invoices`,
        term.isActive ? 'Active' : 'Inactive'
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [paymentTermsHeaders],
        body: paymentTermsData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 20;

      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      // Invoices Section
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('RECENT INVOICES', 20, yPosition);
      yPosition += 10;

      const invoiceHeaders = ['Invoice #', 'Customer', 'Date', 'Salesperson', 'Total', 'Status'];
      const invoiceData = mockData.invoices.map(invoice => [
        invoice.number,
        invoice.customerName.length > 15 ? invoice.customerName.substring(0, 15) + '...' : invoice.customerName,
        formatDate(invoice.date),
        invoice.salespersonName.length > 12 ? invoice.salespersonName.substring(0, 12) + '...' : invoice.salespersonName,
        formatCurrency(invoice.total),
        invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [invoiceHeaders],
        body: invoiceData,
        theme: 'striped',
        headStyles: { 
          fillColor: primaryColor,
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: { fontSize: 8 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 }
      });

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFillColor(...primaryColor);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text(`Invoice Management System - Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 7, { align: 'center' });
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 20, pageHeight - 7, { align: 'right' });
      }

      // Save the PDF
      const fileName = `invoice-system-report-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      console.log('PDF report generated successfully');
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Error al generar el reporte PDF. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={generatePDFReport}
      leftIcon={<FileText size={16} />}
      className="shadow-sm hover:shadow-md transition-shadow"
    >
      <span className="hidden sm:inline">Generar Reporte PDF</span>
      <span className="sm:hidden">PDF</span>
    </Button>
  );
};

export default PDFReportButton;