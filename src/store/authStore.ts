import { create } from 'zustand';
import type { AuthTokens, User } from '../types/auth';
import { getTokens, removeTokens } from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: AuthTokens | null;
  setAuth: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getTokens(),
  user: null,
  tokens: getTokens(),
  setAuth: (tokens: AuthTokens) => set({ isAuthenticated: true, tokens }),
  setUser: (user: User) => set({ user }),
  logout: () => {
    removeTokens();
    set({ isAuthenticated: false, user: null, tokens: null });
  }
}));