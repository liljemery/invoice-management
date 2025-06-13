import { create } from 'zustand';
import { Invoice, InvoiceFilters, InvoiceItem, PaginatedResponse } from '../types';
import { api } from '../lib/api';

interface InvoiceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  draftInvoice: Invoice | null;
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters: InvoiceFilters;
}

interface InvoiceStore extends InvoiceState {
  fetchInvoices: (page?: number, limit?: number, filters?: InvoiceFilters) => Promise<void>;
  fetchInvoiceById: (id: string) => Promise<Invoice>;
  createInvoice: (invoice: Partial<Invoice>) => Promise<Invoice>;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<Invoice>;
  deleteInvoice: (id: string) => Promise<void>;
  setFilters: (filters: InvoiceFilters) => void;
  initDraftInvoice: () => void;
  updateDraftInvoice: (data: Partial<Invoice>) => void;
  addInvoiceItem: (item: Partial<InvoiceItem>) => void;
  updateInvoiceItem: (index: number, item: Partial<InvoiceItem>) => void;
  removeInvoiceItem: (index: number) => void;
  clearDraftInvoice: () => void;
  calculateInvoiceTotals: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],
  currentInvoice: null,
  draftInvoice: null,
  isLoading: false,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  filters: {},

  fetchInvoices: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, filters });
    try {
      // This would be an actual API call
      // const response = await api.get<PaginatedResponse<Invoice>>('/invoices', {
      //   params: { page, limit, ...filters },
      // });
      
      // Mock response for demo
      const mockResponse: PaginatedResponse<Invoice> = {
        data: Array(5).fill(0).map((_, index) => ({
          id: `inv-${index + 1}`,
          number: `INV-${2023000 + index + 1}`,
          date: new Date().toISOString(),
          customerId: `cust-${index % 3 + 1}`,
          customerName: `Customer ${index % 3 + 1}`,
          paymentTermId: `term-${index % 2 + 1}`,
          paymentTermDescription: `Net ${index % 2 ? 30 : 15}`,
          salespersonId: `sp-${index % 2 + 1}`,
          salespersonName: `Salesperson ${index % 2 + 1}`,
          comments: `Test invoice ${index + 1}`,
          items: [
            {
              id: `item-${index}-1`,
              productId: `prod-${index % 4 + 1}`,
              productDescription: `Product ${index % 4 + 1}`,
              quantity: Math.floor(Math.random() * 5) + 1,
              unitPrice: 100 + (index * 10),
              subtotal: (100 + (index * 10)) * (Math.floor(Math.random() * 5) + 1)
            }
          ],
          subtotal: (100 + (index * 10)) * (Math.floor(Math.random() * 5) + 1),
          tax: ((100 + (index * 10)) * (Math.floor(Math.random() * 5) + 1)) * 0.18,
          total: ((100 + (index * 10)) * (Math.floor(Math.random() * 5) + 1)) * 1.18,
          status: ['draft', 'issued', 'paid', 'cancelled'][index % 4] as 'draft' | 'issued' | 'paid' | 'cancelled',
        })),
        total: 15,
        page,
        limit,
        totalPages: Math.ceil(15 / limit),
      };

      set({
        invoices: mockResponse.data,
        total: mockResponse.total,
        page: mockResponse.page,
        limit: mockResponse.limit,
        totalPages: mockResponse.totalPages,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      set({ isLoading: false });
    }
  },

  fetchInvoiceById: async (id: string) => {
    set({ isLoading: true });
    try {
      // This would be an actual API call
      // const response = await api.get<Invoice>(`/invoices/${id}`);
      
      // Mock response for demo
      const mockInvoice: Invoice = {
        id,
        number: `INV-${2023000 + parseInt(id.split('-')[1])}`,
        date: new Date().toISOString(),
        customerId: 'cust-1',
        customerName: 'Customer 1',
        paymentTermId: 'term-1',
        paymentTermDescription: 'Net 30',
        salespersonId: 'sp-1',
        salespersonName: 'Salesperson 1',
        comments: 'Test invoice details',
        items: [
          {
            id: `item-${id}-1`,
            productId: 'prod-1',
            productDescription: 'Product 1',
            quantity: 2,
            unitPrice: 100,
            subtotal: 200
          },
          {
            id: `item-${id}-2`,
            productId: 'prod-2',
            productDescription: 'Product 2',
            quantity: 1,
            unitPrice: 150,
            subtotal: 150
          }
        ],
        subtotal: 350,
        tax: 63,
        total: 413,
        status: 'issued',
      };

      set({ currentInvoice: mockInvoice, isLoading: false });
      return mockInvoice;
    } catch (error) {
      console.error(`Failed to fetch invoice ${id}:`, error);
      set({ isLoading: false });
      throw error;
    }
  },

  createInvoice: async (invoice: Partial<Invoice>) => {
    set({ isLoading: true });
    try {
      // This would be an actual API call
      // const response = await api.post<Invoice>('/invoices', invoice);
      
      // Mock response for demo
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        number: `INV-${Date.now()}`,
        date: new Date().toISOString(),
        customerId: invoice.customerId || '',
        customerName: invoice.customerName || '',
        paymentTermId: invoice.paymentTermId || '',
        paymentTermDescription: invoice.paymentTermDescription || '',
        salespersonId: invoice.salespersonId || '',
        salespersonName: invoice.salespersonName || '',
        comments: invoice.comments || '',
        items: invoice.items || [],
        subtotal: invoice.subtotal || 0,
        tax: invoice.tax || 0,
        total: invoice.total || 0,
        status: 'draft',
      };

      set((state) => ({
        invoices: [newInvoice, ...state.invoices],
        isLoading: false,
      }));
      
      return newInvoice;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateInvoice: async (id: string, invoice: Partial<Invoice>) => {
    set({ isLoading: true });
    try {
      // This would be an actual API call
      // const response = await api.put<Invoice>(`/invoices/${id}`, invoice);
      
      // Mock response for demo
      const updatedInvoice: Invoice = {
        ...get().invoices.find(inv => inv.id === id)!,
        ...invoice,
      };

      set((state) => ({
        invoices: state.invoices.map(inv => 
          inv.id === id ? updatedInvoice : inv
        ),
        currentInvoice: state.currentInvoice?.id === id ? updatedInvoice : state.currentInvoice,
        isLoading: false,
      }));
      
      return updatedInvoice;
    } catch (error) {
      console.error(`Failed to update invoice ${id}:`, error);
      set({ isLoading: false });
      throw error;
    }
  },

  deleteInvoice: async (id: string) => {
    set({ isLoading: true });
    try {
      // This would be an actual API call
      // await api.delete(`/invoices/${id}`);
      
      // For demo, just remove from state
      set((state) => ({
        invoices: state.invoices.filter(inv => inv.id !== id),
        currentInvoice: state.currentInvoice?.id === id ? null : state.currentInvoice,
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Failed to delete invoice ${id}:`, error);
      set({ isLoading: false });
      throw error;
    }
  },

  setFilters: (filters: InvoiceFilters) => {
    set({ filters });
    get().fetchInvoices(1, get().limit, filters);
  },

  initDraftInvoice: () => {
    const emptyDraft: Invoice = {
      id: '',
      number: '',
      date: new Date().toISOString(),
      customerId: '',
      customerName: '',
      paymentTermId: '',
      paymentTermDescription: '',
      salespersonId: '',
      salespersonName: '',
      comments: '',
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      status: 'draft',
    };
    
    set({ draftInvoice: emptyDraft });
  },

  updateDraftInvoice: (data: Partial<Invoice>) => {
    set((state) => ({
      draftInvoice: state.draftInvoice ? { ...state.draftInvoice, ...data } : null,
    }));
    get().calculateInvoiceTotals();
  },

  addInvoiceItem: (item: Partial<InvoiceItem>) => {
    const { draftInvoice } = get();
    if (!draftInvoice) return;

    const newItem: InvoiceItem = {
      id: `item-draft-${Date.now()}`,
      productId: item.productId || '',
      productDescription: item.productDescription || '',
      quantity: item.quantity || 0,
      unitPrice: item.unitPrice || 0,
      subtotal: (item.quantity || 0) * (item.unitPrice || 0),
    };

    set((state) => ({
      draftInvoice: state.draftInvoice ? {
        ...state.draftInvoice,
        items: [...state.draftInvoice.items, newItem],
      } : null,
    }));

    get().calculateInvoiceTotals();
  },

  updateInvoiceItem: (index: number, item: Partial<InvoiceItem>) => {
    const { draftInvoice } = get();
    if (!draftInvoice || index < 0 || index >= draftInvoice.items.length) return;

    const updatedItems = [...draftInvoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      ...item,
      subtotal: (item.quantity !== undefined ? item.quantity : updatedItems[index].quantity) * 
                (item.unitPrice !== undefined ? item.unitPrice : updatedItems[index].unitPrice),
    };

    set((state) => ({
      draftInvoice: state.draftInvoice ? {
        ...state.draftInvoice,
        items: updatedItems,
      } : null,
    }));

    get().calculateInvoiceTotals();
  },

  removeInvoiceItem: (index: number) => {
    const { draftInvoice } = get();
    if (!draftInvoice || index < 0 || index >= draftInvoice.items.length) return;

    const updatedItems = draftInvoice.items.filter((_, i) => i !== index);

    set((state) => ({
      draftInvoice: state.draftInvoice ? {
        ...state.draftInvoice,
        items: updatedItems,
      } : null,
    }));

    get().calculateInvoiceTotals();
  },

  clearDraftInvoice: () => {
    set({ draftInvoice: null });
  },

  calculateInvoiceTotals: () => {
    const { draftInvoice } = get();
    if (!draftInvoice) return;

    const subtotal = draftInvoice.items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.18; // 18% tax rate
    const total = subtotal + tax;

    set((state) => ({
      draftInvoice: state.draftInvoice ? {
        ...state.draftInvoice,
        subtotal,
        tax,
        total,
      } : null,
    }));
  },
}));