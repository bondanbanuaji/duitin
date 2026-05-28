import { create } from 'zustand';

interface UIState {
  isSidebarCollapsed: boolean;
  isAiChatOpen: boolean;
  theme: 'dark' | 'light';
  setSidebarCollapsed: (collapsed: boolean) => void;
  setAiChatOpen: (open: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleSidebar: () => void;
  toggleAiChat: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isAiChatOpen: false,
  theme: 'dark',
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  setAiChatOpen: (open) => set({ isAiChatOpen: open }),
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleAiChat: () => set((state) => ({ isAiChatOpen: !state.isAiChatOpen })),
}));
