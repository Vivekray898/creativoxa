import { redirect } from "next/navigation";
import { getCurrentUser, type CurrentUser } from "@/lib/auth";

// Shared plumbing for every admin server action.
//
// Server functions are reachable by direct POST, so each action authorises the
// caller itself — the proxy redirect and the dashboard layout are convenience,
// not the security boundary. Row Level Security enforces the same rules again
// in the database.

export async function requireStaff(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireStaff();
  if (user.role !== "admin") {
    backWithError("/admin/dashboard", "That action requires an admin account.");
  }
  return user;
}

/** Returns to a page with a readable error message (no silent failures). */
export function backWithError(path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export function backWithSuccess(path: string, message: string): never {
  redirect(`${path}?saved=${encodeURIComponent(message)}`);
}

export function backToList(path: string, message: string): never {
  redirect(`${path}?saved=${encodeURIComponent(message)}`);
}
