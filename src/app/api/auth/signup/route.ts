import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 이메일 인증이 필요한 경우 user가 부분적으로 존재할 수 있음
    const needsConfirmation = !data.user?.email_confirmed_at;

    return NextResponse.json({
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email ?? email,
            name: data.user.user_metadata?.name ?? name,
          }
        : { id: "", email, name },
      needsConfirmation,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
