import React from 'react';
import { FileText } from 'lucide-react';
import Button from './Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const generatePDFReport = async () => {
    try {
      // Create a temporary HTML element for the report
      const reportElement = document.createElement('div');
      reportElement.style.position = 'absolute';
      reportElement.style.left = '-9999px';
      reportElement.style.top = '0';
      reportElement.style.width = '800px';
      reportElement.style.backgroundColor = 'white';
      reportElement.style.padding = '40px';
      reportElement.style.fontFamily = 'Arial, sans-serif';
      reportElement.style.color = 'black';
      
      const totalRevenue = mockData.invoices.reduce((sum, inv) => sum + inv.total, 0);
      const activeProducts = mockData.products.filter(p => p.isActive).length;
      const activeCustomers = mockData.customers.filter(c => c.isActive).length;
      const activeSalespeople = mockData.salespeople.filter(s => s.isActive).length;

      reportElement.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #3b82f6; margin: 0; font-size: 28px;">INVOICE MANAGEMENT SYSTEM</h1>
          <p style="color: #6b7280; margin: 5px 0; font-size: 16px;">Complete Business Report</p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">Generated on: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #3b82f6; margin: 0 0 15px 0; font-size: 18px;">EXECUTIVE SUMMARY</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <p style="margin: 5px 0;"><strong>Total Revenue:</strong> ${formatCurrency(totalRevenue)}</p>
              <p style="margin: 5px 0;"><strong>Active Products:</strong> ${activeProducts}</p>
            </div>
            <div>
              <p style="margin: 5px 0;"><strong>Active Customers:</strong> ${activeCustomers}</p>
              <p style="margin: 5px 0;"><strong>Active Salespeople:</strong> ${activeSalespeople}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #3b82f6; margin: 0 0 15px 0; font-size: 18px;">PRODUCTS CATALOG</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
            <thead>
              <tr style="background: #3b82f6; color: white;">
                <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">ID</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Description</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #e5e7eb;">Cost</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #e5e7eb;">Price</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #e5e7eb;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${mockData.products.map((product, index) => {
                const margin = ((product.unitPrice - product.unitCost) / product.unitPrice * 100).toFixed(1);
                return `
                  <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${product.id}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${product.description}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(product.unitCost)}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(product.unitPrice)}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">
                      <span style="background: ${product.isActive ? '#10b981' : '#ef4444'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">
                        ${product.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #3b82f6; margin: 0 0 15px 0; font-size: 18px;">RECENT INVOICES</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
            <thead>
              <tr style="background: #3b82f6; color: white;">
                <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Invoice #</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Customer</th>
                <th style="padding: 10px; text-align: left; border: 1px solid #e5e7eb;">Date</th>
                <th style="padding: 10px; text-align: right; border: 1px solid #e5e7eb;">Total</th>
                <th style="padding: 10px; text-align: center; border: 1px solid #e5e7eb;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${mockData.invoices.map((invoice, index) => `
                <tr style="background: ${index % 2 === 0 ? '#f9fafb' : 'white'};">
                  <td style="padding: 8px; border: 1px solid #e5e7eb;">${invoice.number}</td>
                  <td style="padding: 8px; border: 1px solid #e5e7eb;">${invoice.customerName}</td>
                  <td style="padding: 8px; border: 1px solid #e5e7eb;">${formatDate(invoice.date)}</td>
                  <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${formatCurrency(invoice.total)}</td>
                  <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: center;">
                    <span style="background: ${invoice.status === 'paid' ? '#10b981' : '#f59e0b'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px;">
                      ${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #3b82f6;">
          <p style="color: #6b7280; margin: 0; font-size: 12px;">
            Invoice Management System - Generated on ${new Date().toLocaleDateString()}
          </p>
        </div>
      `;

      // Add to DOM temporarily
      document.body.appendChild(reportElement);

      // Convert to canvas
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary element
      document.body.removeChild(reportElement);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      const fileName = `invoice-system-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
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