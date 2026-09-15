"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <div className="mx-auto w-full max-w-[var(--container)] px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">Something went wrong</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            This page didn&apos;t load properly.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
            It&apos;s usually temporary. Try again, and if the problem persists, let us know.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn btn-primary">
              Try again
            </button>
            <Link href="/" className="btn btn-outline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
