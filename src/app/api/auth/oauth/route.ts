import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();
    const supabase = await createSupabaseServer();

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ url: data.url });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
