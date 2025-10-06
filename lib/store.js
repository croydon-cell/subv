import { create } from 'zustand';

// Global state management with Zustand
export const useStore = create((set) => ({
  // User/Auth state
  user: null,
  userRole: 'super_admin', // super_admin, merchant_admin, operator, customer
  setUser: (user) => set({ user }),
  setUserRole: (role) => set({ userRole: role }),

  // Dashboard data
  merchants: [],
  alerts: [],
  settlements: [],
  systemHealth: null,
  analytics: null,

  setMerchants: (merchants) => set({ merchants }),
  setAlerts: (alerts) => set({ alerts }),
  setSettlements: (settlements) => set({ settlements }),
  setSystemHealth: (health) => set({ systemHealth: health }),
  setAnalytics: (analytics) => set({ analytics }),

  // UI state
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Filters
  merchantFilter: 'all',
  alertFilter: 'active',
  setMerchantFilter: (filter) => set({ merchantFilter: filter }),
  setAlertFilter: (filter) => set({ alertFilter: filter }),
}));
