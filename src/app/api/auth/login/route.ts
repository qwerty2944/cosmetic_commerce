import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
