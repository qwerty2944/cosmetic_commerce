// 인증 관련 API 호출 모듈
// 로그인, 회원가입, 로그아웃, 현재 사용자 조회, OAuth URL 요청
import { api } from "./instance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: AuthUser;
  needsConfirmation?: boolean;
}

export const authApi = {
  // 이메일/비밀번호 로그인
  login: (data: LoginPayload) => api.post<AuthResponse>("/auth/login", data),

  // 회원가입
  signup: (data: SignupPayload) => api.post<AuthResponse>("/auth/signup", data),

  // 로그아웃
  logout: () => api.post("/auth/logout"),

  // 현재 로그인된 사용자 정보 조회
  me: () => api.get<AuthResponse>("/auth/me"),

  // OAuth 로그인 URL 요청 (Google, Kakao)
  oauthUrl: (provider: "google" | "kakao") =>
    api.post<{ url: string }>("/auth/oauth", { provider }),
};
