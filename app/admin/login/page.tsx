import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/cms/actions/auth";
import SubmitButton from "@/components/admin/SubmitButton";
import { Notice, adminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { getCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import { site } from "@/lib/site";

export const metadata = {
  title: "Sign in — Creativoxa Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  // Already signed in? Straight to the dashboard — the login page is never
  // shown to a valid session.
  const user = await getCurrentUser();
  if (user) redirect("/admin/dashboard");

  const { error } = params;
  // Only relative `next` targets are ever written by the proxy.
  const nextParam = typeof params.next === "string" && params.next.startsWith("/admin") ? params.next : "";

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-2/40 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
            Creativoxa<span className="text-primary">.</span>
          </Link>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-faint">Admin</p>
        </div>

        <div className="rounded-xl border border-line bg-background p-6">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Sign in</h1>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Content management for {site.name}. Access is restricted to staff accounts.
          </p>

          {error ? (
            <div className="mt-4">
              <Notice error={error} />
            </div>
          ) : null}

          {!isSupabaseConfigured ? (
            <div className="mt-4">
              <Notice
                error="Supabase is not configured on this environment, so sign-in is unavailable. See supabase/README.md."
              />
            </div>
          ) : null}

          <form action={signIn} className="mt-5 space-y-4">
            <input type="hidden" name="next" value={nextParam} />
            <div>
              <label htmlFor="email" className={adminLabel}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={adminInput}
              />
            </div>
            <div>
              <label htmlFor="password" className={adminLabel}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={adminInput}
              />
            </div>
            <SubmitButton className={`${adminButton.primary} w-full`} pendingLabel="Signing in…">
              Sign in
            </SubmitButton>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-faint">
          <Link href="/" className="transition-colors hover:text-foreground">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
