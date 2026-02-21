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
  login: (data: LoginPayload) =>
    api.post<AuthResponse>("/auth/login", data),

  signup: (data: SignupPayload) =>
    api.post<AuthResponse>("/auth/signup", data),

  logout: () =>
    api.post("/auth/logout"),

  me: () =>
    api.get<AuthResponse>("/auth/me"),

  oauthUrl: (provider: "google" | "kakao") =>
    api.post<{ url: string }>("/auth/oauth", { provider }),
};
