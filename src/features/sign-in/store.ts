// 로그인 기능 (POST mutation)
// useUserStore의 상태를 변경하는 비동기 함수
import { authApi } from "@/shared/api";
import { useUserStore } from "@/entities/user/store";

// 이메일/비밀번호로 로그인 후 사용자 상태 업데이트
export async function signIn(email: string, password: string) {
  const { setLoading, setError, setUser } = useUserStore.getState();
  setLoading(true);
  setError(null);
  try {
    const { data } = await authApi.login({ email, password });
    setUser(data.user);
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : (err as { response?: { data?: { error?: string } } })?.response?.data
            ?.error || "Login failed";
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
}
