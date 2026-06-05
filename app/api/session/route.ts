import { NextResponse } from "next/server";
import { getSession } from "@/app/auth/session";

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    loggedIn: Boolean(session),
    email: session?.email || null,
  });
}