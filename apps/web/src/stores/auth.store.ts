import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo?: string;
  avatarURL?: string;
  isAdmin: number;
  role: 'CLIENT' | 'OWNER' | 'ADMIN';
}

interface AuthState {
  // State
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Actions
  login: (
    tokens: { accessToken: string; refreshToken: string },
    user: AuthUser,
  ) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      // Login action
      login: (tokens, user) => {
        console.log('[AuthStore] User logged in:', user.email);
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user,
          isAuthenticated: true,
        });
      },

      // Logout action
      logout: () => {
        console.log('[AuthStore] User logged out');
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      // Update user profile
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, ...updatedUser }
            : (updatedUser as AuthUser),
        }));
      },

      // Update tokens (for refresh)
      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
    }),
    {
      name: 'authStore', // localStorage key
    },
  ),
);

// Helper function to get current auth token
export const getAuthToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return useAuthStore.getState().isAuthenticated;
};

// Helper function to get current user
export const getCurrentUser = (): AuthUser | null => {
  return useAuthStore.getState().user;
};
