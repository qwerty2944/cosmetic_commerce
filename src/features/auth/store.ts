"use client";

import { create } from "zustand";
import { authApi, type AuthUser } from "@/shared/api";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authApi.login({ email, password });
      set({ user: data.user, loading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Login failed";
      set({ error: message, loading: false });
      throw err;
    }
  },

  signup: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authApi.signup({ email, password, name });
      set({ user: data.user, loading: false });
      return data.needsConfirmation ?? false;
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Signup failed";
      set({ error: message, loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
      set({ user: null });
    } catch {
      // Ignore logout errors
    }
  },

  fetchUser: async () => {
    try {
      const { data } = await authApi.me();
      set({ user: data.user });
    } catch {
      set({ user: null });
    }
  },

  clearError: () => set({ error: null }),
}));
