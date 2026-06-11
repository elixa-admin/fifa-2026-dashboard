import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Dashboard",
  description: "Live interactive FIFA 2026 World Cup dashboard — fixtures, standings, odds, and predictions in SAST.",
  keywords: ["FIFA", "World Cup", "2026", "football", "soccer", "dashboard", "SAST"],
  openGraph: {
    title: "FIFA World Cup 2026 Dashboard",
    description: "Live scores, group standings, match odds, and goal predictions — all in SAST.",
    type: "website",
  },
};

function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#060c1a]/78 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-xl">⚽</span>
          <div className="min-w-0">
            <span className="block text-sm leading-none font-black text-white">
              <span className="text-amber-400">FIFA</span> WC 2026
            </span>
            <span className="block text-[11px] leading-none text-slate-500 sm:text-xs">Match Intelligence Dashboard</span>
          </div>
        </Link>

        <nav className="flex max-w-[62vw] items-center gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/[0.04] p-1 sm:max-w-none">
          {[
            { href: "/", label: "Home" },
            { href: "/groups/A", label: "Groups" },
            { href: "/bracket", label: "Bracket" },
            { href: "/admin", label: "Admin", className: "text-amber-400" },
          ].map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white sm:px-3 sm:text-sm ${className || ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#060c1a]">
        <NavBar />
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="border-t border-white/8 py-8 text-center text-xs text-slate-600">
          <p>FIFA World Cup 2026 Dashboard · All times shown in SAST (UTC+2)</p>
          <p className="mt-1 text-slate-700">USA · Canada · Mexico · June 11 to July 19, 2026</p>
        </footer>
      </body>
    </html>
  );
}
