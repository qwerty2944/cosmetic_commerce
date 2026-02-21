// API 인스턴스 — 빌더 패턴으로 생성
// 모든 API 호출의 공통 설정(기본 URL, 헤더, 인터셉터)을 여기서 관리
import { ApiClient } from "./client";

// 401 에러 발생 시 인증 페이지 리다이렉트 처리
function handleAuthError(error: unknown) {
  const err = error as { response?: { status?: number } };
  if (err.response?.status === 401) {
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/auth")
    ) {
      // 필요 시 로그인 페이지로 리다이렉트
    }
  }
  return Promise.reject(error);
}

export const api = ApiClient.create()
  .setBaseURL("/api")
  .setHeaders({ "Content-Type": "application/json" })
  .setWithCredentials(true)
  .addResponseInterceptor((response) => response, handleAuthError)
  .build();
