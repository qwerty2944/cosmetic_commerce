// 로그아웃 기능 (POST mutation)
// 서버에 로그아웃 요청 후 사용자 상태 초기화
import { authApi } from "@/shared/api";
import { useUserStore } from "@/entities/user/store";

export async function signOut() {
  try {
    await authApi.logout();
    useUserStore.getState().setUser(null);
  } catch {
    // 로그아웃 에러는 무시 — 클라이언트 상태는 초기화
  }
}
