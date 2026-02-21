// 회원가입 폼 유효성 검사 스키마
// 비밀번호 확인 일치 여부를 refine으로 추가 검증
import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().email("유효한 이메일을 입력해주세요"),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
    confirmPassword: z.string().min(6, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
