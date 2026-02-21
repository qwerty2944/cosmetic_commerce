import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/shared/lib/supabase-server";

export async function POST() {
  try {
    const supabase = await createSupabaseServer();
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
