import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Insight Copilot",
  description: "AI-powered corporate finance analysis and ABC profitability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        <nav className="border-b border-slate-800 bg-slate-950">
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">

            <Link
              href="/"
              className="text-xl font-bold"
            >
              Finance Insight Copilot
            </Link>

            <div className="flex gap-6 text-sm">
              <Link
                href="/"
                className="text-slate-300 hover:text-white"
              >
                Financial Analysis
              </Link>

              <Link
                href="/abc"
                className="text-slate-300 hover:text-white"
              >
                ABC Analyzer
              </Link>
            </div>

          </div>
        </nav>

        {children}

      </body>
    </html>
  );
}