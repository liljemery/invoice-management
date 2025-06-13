// Authentication Types
export type User = {
  id: string;
  username: string;
  role: 'admin' | 'salesperson';
  name: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Product Types
export type Product = {
  id: string;
  description: string;
  unitCost: number;
  unitPrice: number;
  isActive: boolean;
};

// Customer Types
export type Customer = {
  id: string;
  businessName: string;
  legalName: string;
  taxId: string;
  accountNumber: string;
  isActive: boolean;
};

// Payment Term Types
export type PaymentTerm = {
  id: string;
  description: string;
  days: number;
  isActive: boolean;
};

// Salesperson Types
export type Salesperson = {
  id: string;
  name: string;
  commissionPercentage: number;
  isActive: boolean;
};

// Invoice Types
export type InvoiceItem = {
  id: string;
  productId: string;
  productDescription: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Invoice = {
  id: string;
  number: string;
  date: string;
  customerId: string;
  customerName: string;
  paymentTermId: string;
  paymentTermDescription: string;
  salespersonId: string;
  salespersonName: string;
  comments: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
};

// API Response Types
export type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Filter Types
export type DateRange = {
  startDate: string;
  endDate: string;
};

export type InvoiceFilters = {
  customerId?: string;
  salespersonId?: string;
  paymentTermId?: string;
  status?: string;
  dateRange?: DateRange;
};

export type ProductFilters = {
  description?: string;
  isActive?: boolean;
};

export type CustomerFilters = {
  businessName?: string;
  taxId?: string;
  isActive?: boolean;
};