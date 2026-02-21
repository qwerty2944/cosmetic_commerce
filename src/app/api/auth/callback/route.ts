import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page after OAuth callback
  return NextResponse.redirect(new URL("/", request.url));
}
