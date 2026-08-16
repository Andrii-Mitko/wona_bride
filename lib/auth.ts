import "server-only";
import { cookies } from "next/headers";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  return adminAuth?.value === "true";
}
