export interface Translation {
  [key: string]: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

const TRANSLATIONS: Record<string, Translation> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.customers': 'Customers',
    'nav.products': 'Products',
    'nav.invoices': 'Invoices',
    'nav.paymentTerms': 'Payment Terms',
    'nav.salespeople': 'Salespeople',
    'nav.settings': 'Settings',
    'nav.reports': 'Reports',

    // Common
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.yes': 'Yes',
    'common.no': 'No',

    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.advanced': 'Advanced',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',
    'settings.language.select': 'Select Language',
    'settings.currency': 'Currency',
    'settings.dateFormat': 'Date Format',
    'settings.timeFormat': 'Time Format',
    'settings.timeFormat.12h': '12-hour',
    'settings.timeFormat.24h': '24-hour',
    'settings.notifications.enable': 'Enable Notifications',
    'settings.autoSave': 'Auto Save',
    'settings.reset': 'Reset to Defaults',
    'settings.reset.confirm': 'Are you sure you want to reset all settings to defaults?',
    'settings.reset.success': 'Settings reset successfully',
    'settings.save.success': 'Settings saved successfully',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back! Here\'s your business overview.',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.newCustomers': 'New Customers',
    'dashboard.pendingInvoices': 'Pending Invoices',
    'dashboard.revenueGrowth': 'Revenue Growth',
    'dashboard.fromLastMonth': 'from last month',

    // Customers
    'customers.title': 'Customers',
    'customers.add': 'Add Customer',
    'customers.edit': 'Edit Customer',
    'customers.businessName': 'Business Name',
    'customers.legalName': 'Legal Name',
    'customers.taxId': 'Tax ID',
    'customers.accountNumber': 'Account Number',
    'customers.search.placeholder': 'Search by name or tax ID...',

    // Products
    'products.title': 'Products',
    'products.add': 'Add Product',
    'products.edit': 'Edit Product',
    'products.description': 'Description',
    'products.unitCost': 'Unit Cost',
    'products.unitPrice': 'Unit Price',
    'products.margin': 'Margin',
    'products.search.placeholder': 'Search products...',

    // Payment Terms
    'paymentTerms.title': 'Payment Terms',
    'paymentTerms.add': 'Add Payment Term',
    'paymentTerms.edit': 'Edit Payment Term',
    'paymentTerms.description': 'Description',
    'paymentTerms.days': 'Payment Days',
    'paymentTerms.usage': 'Usage',
    'paymentTerms.search.placeholder': 'Search payment terms...',

    // Salespeople
    'salespeople.title': 'Salespeople',
    'salespeople.add': 'Add Salesperson',
    'salespeople.edit': 'Edit Salesperson',
    'salespeople.name': 'Name',
    'salespeople.commission': 'Commission %',
    'salespeople.totalSales': 'Total Sales',
    'salespeople.invoices': 'Invoices',
    'salespeople.search.placeholder': 'Search salespeople...',

    // Invoices
    'invoices.title': 'Invoices',
    'invoices.add': 'Create Invoice',
    'invoices.edit': 'Edit Invoice',
    'invoices.number': 'Invoice Number',
    'invoices.date': 'Date',
    'invoices.customer': 'Customer',
    'invoices.paymentTerm': 'Payment Term',
    'invoices.salesperson': 'Salesperson',
    'invoices.comments': 'Comments',
    'invoices.items': 'Invoice Items',
    'invoices.addItem': 'Add Item',
    'invoices.subtotal': 'Subtotal',
    'invoices.tax': 'Tax',
    'invoices.total': 'Total',
    'invoices.search.placeholder': 'Search invoices...',

    // Form validation
    'validation.required': 'This field is required',
    'validation.invalid': 'Invalid value',
    'validation.min': 'Value must be at least {min}',
    'validation.max': 'Value must be at most {max}',
    'validation.email': 'Invalid email address',
    'validation.number': 'Must be a number',
    'validation.positive': 'Must be a positive number',
  },

  es: {
    // Navigation
    'nav.dashboard': 'Panel de Control',
    'nav.customers': 'Clientes',
    'nav.products': 'Productos',
    'nav.invoices': 'Facturas',
    'nav.paymentTerms': 'Términos de Pago',
    'nav.salespeople': 'Vendedores',
    'nav.settings': 'Configuración',
    'nav.reports': 'Reportes',

    // Common
    'common.add': 'Agregar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.close': 'Cerrar',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.actions': 'Acciones',
    'common.status': 'Estado',
    'common.active': 'Activo',
    'common.inactive': 'Inactivo',
    'common.yes': 'Sí',
    'common.no': 'No',

    // Settings
    'settings.title': 'Configuración',
    'settings.general': 'General',
    'settings.appearance': 'Apariencia',
    'settings.language': 'Idioma',
    'settings.notifications': 'Notificaciones',
    'settings.advanced': 'Avanzado',
    'settings.theme': 'Tema',
    'settings.theme.light': 'Claro',
    'settings.theme.dark': 'Oscuro',
    'settings.theme.system': 'Sistema',
    'settings.language.select': 'Seleccionar Idioma',
    'settings.currency': 'Moneda',
    'settings.dateFormat': 'Formato de Fecha',
    'settings.timeFormat': 'Formato de Hora',
    'settings.timeFormat.12h': '12 horas',
    'settings.timeFormat.24h': '24 horas',
    'settings.notifications.enable': 'Habilitar Notificaciones',
    'settings.autoSave': 'Guardado Automático',
    'settings.reset': 'Restablecer a Valores Predeterminados',
    'settings.reset.confirm': '¿Estás seguro de que quieres restablecer toda la configuración a los valores predeterminados?',
    'settings.reset.success': 'Configuración restablecida exitosamente',
    'settings.save.success': 'Configuración guardada exitosamente',

    // Dashboard
    'dashboard.title': 'Panel de Control',
    'dashboard.welcome': '¡Bienvenido de vuelta! Aquí tienes una vista general de tu negocio.',
    'dashboard.totalSales': 'Ventas Totales',
    'dashboard.newCustomers': 'Nuevos Clientes',
    'dashboard.pendingInvoices': 'Facturas Pendientes',
    'dashboard.revenueGrowth': 'Crecimiento de Ingresos',
    'dashboard.fromLastMonth': 'desde el mes pasado',

    // Customers
    'customers.title': 'Clientes',
    'customers.add': 'Agregar Cliente',
    'customers.edit': 'Editar Cliente',
    'customers.businessName': 'Nombre del Negocio',
    'customers.legalName': 'Nombre Legal',
    'customers.taxId': 'ID Fiscal',
    'customers.accountNumber': 'Número de Cuenta',
    'customers.search.placeholder': 'Buscar por nombre o ID fiscal...',

    // Products
    'products.title': 'Productos',
    'products.add': 'Agregar Producto',
    'products.edit': 'Editar Producto',
    'products.description': 'Descripción',
    'products.unitCost': 'Costo Unitario',
    'products.unitPrice': 'Precio Unitario',
    'products.margin': 'Margen',
    'products.search.placeholder': 'Buscar productos...',

    // Payment Terms
    'paymentTerms.title': 'Términos de Pago',
    'paymentTerms.add': 'Agregar Término de Pago',
    'paymentTerms.edit': 'Editar Término de Pago',
    'paymentTerms.description': 'Descripción',
    'paymentTerms.days': 'Días de Pago',
    'paymentTerms.usage': 'Uso',
    'paymentTerms.search.placeholder': 'Buscar términos de pago...',

    // Salespeople
    'salespeople.title': 'Vendedores',
    'salespeople.add': 'Agregar Vendedor',
    'salespeople.edit': 'Editar Vendedor',
    'salespeople.name': 'Nombre',
    'salespeople.commission': 'Comisión %',
    'salespeople.totalSales': 'Ventas Totales',
    'salespeople.invoices': 'Facturas',
    'salespeople.search.placeholder': 'Buscar vendedores...',

    // Invoices
    'invoices.title': 'Facturas',
    'invoices.add': 'Crear Factura',
    'invoices.edit': 'Editar Factura',
    'invoices.number': 'Número de Factura',
    'invoices.date': 'Fecha',
    'invoices.customer': 'Cliente',
    'invoices.paymentTerm': 'Término de Pago',
    'invoices.salesperson': 'Vendedor',
    'invoices.comments': 'Comentarios',
    'invoices.items': 'Elementos de Factura',
    'invoices.addItem': 'Agregar Elemento',
    'invoices.subtotal': 'Subtotal',
    'invoices.tax': 'Impuesto',
    'invoices.total': 'Total',
    'invoices.search.placeholder': 'Buscar facturas...',

    // Form validation
    'validation.required': 'Este campo es requerido',
    'validation.invalid': 'Valor inválido',
    'validation.min': 'El valor debe ser al menos {min}',
    'validation.max': 'El valor debe ser como máximo {max}',
    'validation.email': 'Dirección de email inválida',
    'validation.number': 'Debe ser un número',
    'validation.positive': 'Debe ser un número positivo',
  },

  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.customers': 'Clients',
    'nav.products': 'Produits',
    'nav.invoices': 'Factures',
    'nav.paymentTerms': 'Conditions de Paiement',
    'nav.salespeople': 'Vendeurs',
    'nav.settings': 'Paramètres',
    'nav.reports': 'Rapports',

    // Common
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.close': 'Fermer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.actions': 'Actions',
    'common.status': 'Statut',
    'common.active': 'Actif',
    'common.inactive': 'Inactif',
    'common.yes': 'Oui',
    'common.no': 'Non',

    // Settings
    'settings.title': 'Paramètres',
    'settings.general': 'Général',
    'settings.appearance': 'Apparence',
    'settings.language': 'Langue',
    'settings.notifications': 'Notifications',
    'settings.advanced': 'Avancé',
    'settings.theme': 'Thème',
    'settings.theme.light': 'Clair',
    'settings.theme.dark': 'Sombre',
    'settings.theme.system': 'Système',
    'settings.language.select': 'Sélectionner la Langue',
    'settings.currency': 'Devise',
    'settings.dateFormat': 'Format de Date',
    'settings.timeFormat': 'Format d\'Heure',
    'settings.timeFormat.12h': '12 heures',
    'settings.timeFormat.24h': '24 heures',
    'settings.notifications.enable': 'Activer les Notifications',
    'settings.autoSave': 'Sauvegarde Automatique',
    'settings.reset': 'Réinitialiser aux Valeurs par Défaut',
    'settings.reset.confirm': 'Êtes-vous sûr de vouloir réinitialiser tous les paramètres aux valeurs par défaut?',
    'settings.reset.success': 'Paramètres réinitialisés avec succès',
    'settings.save.success': 'Paramètres enregistrés avec succès',

    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.welcome': 'Bon retour ! Voici un aperçu de votre entreprise.',
    'dashboard.totalSales': 'Ventes Totales',
    'dashboard.newCustomers': 'Nouveaux Clients',
    'dashboard.pendingInvoices': 'Factures en Attente',
    'dashboard.revenueGrowth': 'Croissance des Revenus',
    'dashboard.fromLastMonth': 'du mois dernier',

    // Customers
    'customers.title': 'Clients',
    'customers.add': 'Ajouter un Client',
    'customers.edit': 'Modifier le Client',
    'customers.businessName': 'Nom de l\'Entreprise',
    'customers.legalName': 'Nom Légal',
    'customers.taxId': 'Numéro Fiscal',
    'customers.accountNumber': 'Numéro de Compte',
    'customers.search.placeholder': 'Rechercher par nom ou numéro fiscal...',

    // Products
    'products.title': 'Produits',
    'products.add': 'Ajouter un Produit',
    'products.edit': 'Modifier le Produit',
    'products.description': 'Description',
    'products.unitCost': 'Coût Unitaire',
    'products.unitPrice': 'Prix Unitaire',
    'products.margin': 'Marge',
    'products.search.placeholder': 'Rechercher des produits...',

    // Payment Terms
    'paymentTerms.title': 'Conditions de Paiement',
    'paymentTerms.add': 'Ajouter une Condition de Paiement',
    'paymentTerms.edit': 'Modifier la Condition de Paiement',
    'paymentTerms.description': 'Description',
    'paymentTerms.days': 'Jours de Paiement',
    'paymentTerms.usage': 'Utilisation',
    'paymentTerms.search.placeholder': 'Rechercher des conditions de paiement...',

    // Salespeople
    'salespeople.title': 'Vendeurs',
    'salespeople.add': 'Ajouter un Vendeur',
    'salespeople.edit': 'Modifier le Vendeur',
    'salespeople.name': 'Nom',
    'salespeople.commission': 'Commission %',
    'salespeople.totalSales': 'Ventes Totales',
    'salespeople.invoices': 'Factures',
    'salespeople.search.placeholder': 'Rechercher des vendeurs...',

    // Invoices
    'invoices.title': 'Factures',
    'invoices.add': 'Créer une Facture',
    'invoices.edit': 'Modifier la Facture',
    'invoices.number': 'Numéro de Facture',
    'invoices.date': 'Date',
    'invoices.customer': 'Client',
    'invoices.paymentTerm': 'Condition de Paiement',
    'invoices.salesperson': 'Vendeur',
    'invoices.comments': 'Commentaires',
    'invoices.items': 'Éléments de Facture',
    'invoices.addItem': 'Ajouter un Élément',
    'invoices.subtotal': 'Sous-total',
    'invoices.tax': 'Taxe',
    'invoices.total': 'Total',
    'invoices.search.placeholder': 'Rechercher des factures...',

    // Form validation
    'validation.required': 'Ce champ est requis',
    'validation.invalid': 'Valeur invalide',
    'validation.min': 'La valeur doit être au moins {min}',
    'validation.max': 'La valeur doit être au plus {max}',
    'validation.email': 'Adresse email invalide',
    'validation.number': 'Doit être un nombre',
    'validation.positive': 'Doit être un nombre positif',
  },
};

export class TranslationManager {
  private static instance: TranslationManager;
  private currentLanguage: string = 'en';
  private translations: Translation = TRANSLATIONS.en;

  private constructor() {
    // Initialize with stored language preference
    const storedLang = localStorage.getItem('invoice-management-language');
    if (storedLang && TRANSLATIONS[storedLang]) {
      this.setLanguage(storedLang);
    }
  }

  public static getInstance(): TranslationManager {
    if (!TranslationManager.instance) {
      TranslationManager.instance = new TranslationManager();
    }
    return TranslationManager.instance;
  }

  public setLanguage(languageCode: string): void {
    if (TRANSLATIONS[languageCode]) {
      this.currentLanguage = languageCode;
      this.translations = TRANSLATIONS[languageCode];
      localStorage.setItem('invoice-management-language', languageCode);
      document.documentElement.setAttribute('lang', languageCode);
    }
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public getSupportedLanguages(): Language[] {
    return SUPPORTED_LANGUAGES;
  }

  public t(key: string, params?: Record<string, string | number>): string {
    let translation = this.translations[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  }

  public getCurrentTranslation(): Translation {
    return { ...this.translations };
  }
}

export const translationManager = TranslationManager.getInstance();
export const t = (key: string, params?: Record<string, string | number>) => translationManager.t(key, params);
