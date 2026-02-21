// 회원가입 기능 (POST mutation)
// useUserStore의 상태를 변경하는 비동기 함수
import { AxiosError } from "axios";
import { authApi } from "@/shared/api";
import { useUserStore } from "@/entities/user/store";

// 회원가입 후 사용자 상태 업데이트, 이메일 인증 필요 여부 반환
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<boolean> {
  const { setLoading, setError, setUser } = useUserStore.getState();
  setLoading(true);
  setError(null);
  try {
    const { data } = await authApi.signup({ email, password, name });
    setUser(data.user);
    return data.needsConfirmation ?? false;
  } catch (err: unknown) {
    const message =
      err instanceof AxiosError
        ? err.response?.data?.error ?? err.message
        : "Signup failed";
    setError(message);
    throw err;
  } finally {
    setLoading(false);
  }
}
