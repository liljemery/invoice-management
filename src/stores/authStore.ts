import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';
import { api } from '../lib/api';

interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
          // This would be replaced with actual API call
          // const response = await api.post('/auth/login', { username, password });
          // const { user, token } = response.data;
          
          // Mock login for demo
          const mockUser: User = {
            id: '1',
            username,
            role: username.includes('admin') ? 'admin' : 'salesperson',
            name: username.includes('admin') ? 'Admin User' : 'Sales User',
          };
          const mockToken = 'mock-jwt-token';
          
          // Set auth header for future requests
          api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Login failed:', error);
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        // Remove auth header
        delete api.defaults.headers.common['Authorization'];
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return false;

        set({ isLoading: true });
        try {
          // This would be replaced with actual API call to validate token
          // const response = await api.get('/auth/me');
          // set({ user: response.data, isLoading: false });
          
          // For demo, we just validate that token exists
          set({ isLoading: false });
          return true;
        } catch (error) {
          console.error('Token validation failed:', error);
          set({ user: null, token: null, isAuthenticated: false, isLoading: false });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);