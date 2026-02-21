// 로그인 폼 유효성 검사 스키마
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
