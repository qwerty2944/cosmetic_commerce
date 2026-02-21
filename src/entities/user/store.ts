// 사용자 상태 관리 스토어
// 현재 로그인된 사용자 정보 조회(GET) 및 상태 관리 전용
"use client";

import { create } from "zustand";
import { authApi, type AuthUser } from "@/shared/api";

interface UserState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;

  // 현재 사용자 정보를 서버에서 가져옴
  fetchUser: () => Promise<void>;
  // 사용자 상태를 직접 설정 (로그인/회원가입 성공 후 사용)
  setUser: (user: AuthUser | null) => void;
  // 에러 메시지 초기화
  clearError: () => void;
  // 로딩/에러 상태 설정 (feature에서 mutation 시 사용)
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    try {
      const { data } = await authApi.me();
      set({ user: data.user });
    } catch {
      set({ user: null });
    }
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
