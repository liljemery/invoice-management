import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Package size={20} />, label: 'Products', path: '/products' },
    { icon: <Users size={20} />, label: 'Customers', path: '/customers' },
    { icon: <Calendar size={20} />, label: 'Payment Terms', path: '/payment-terms' },
    { icon: <Users size={20} />, label: 'Salespeople', path: '/salespeople' },
    { icon: <FileText size={20} />, label: 'Invoices', path: '/invoices' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <FileText className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">InvoiceSystem</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    {user?.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </div>
                </a>
              ))}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                <div className="flex items-center">
                  <LogOut size={20} />
                  <span className="ml-3">Logout</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="flex-grow flex">
        {/* Sidebar Navigation (desktop) */}
        <aside className="hidden sm:flex sm:flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 text-gray-400 group-hover:text-gray-500">{item.icon}</div>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;