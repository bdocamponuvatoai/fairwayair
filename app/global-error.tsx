"use client";

import { business } from "@/lib/site";
import "./globals.css";

// Last-resort boundary for errors in the root layout. It replaces the whole
// document, so it renders its own <html> and avoids layout-level providers.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-US">
      <body className="grid min-h-screen place-items-center bg-sand-50 p-6 text-navy">
        <main className="max-w-md text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Fairway Air is temporarily unavailable.</h1>
          <p className="mt-4 text-navy/70">
            Please try again, or call{" "}
            <a className="font-semibold underline" href={business.phone.href}>
              {business.phone.display}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-700"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
