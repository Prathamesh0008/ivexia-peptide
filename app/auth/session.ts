//app\auth\session.ts
import { cookies } from "next/headers";

export const SESSION_COOKIE = "ivexia_session";

export type UserSession = {
  email: string;
};

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);

  if (!session?.value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(session.value)) as UserSession;
    return parsed.email ? parsed : null;
  } catch {
    return null;
  }
}
