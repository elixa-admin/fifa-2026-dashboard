import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#060c1a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl">⚽</span>
          <div>
            <span className="font-black text-white text-sm leading-none block">
              <span className="text-amber-400">FIFA</span> WC 2026
            </span>
            <span className="text-slate-500 text-xs leading-none block">Interactive Dashboard</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {[
            { href: "/", label: "Home" },
            { href: "/groups/A", label: "Groups" },
            { href: "/bracket", label: "Bracket" },
            { href: "/admin", label: "Admin", className: "text-amber-400" },
          ].map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${className || ""}`}
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#060c1a]">
        <NavBar />
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="border-t border-white/5 py-6 text-center text-xs text-slate-600">
          <p>FIFA World Cup 2026 Dashboard · Built with ❤️ · All times in SAST (UTC+2)</p>
          <p className="mt-1 text-slate-700">USA · Canada · Mexico · June 11 – July 19, 2026</p>
        </footer>
      </body>
    </html>
  );
}
