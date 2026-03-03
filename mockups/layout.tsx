import "@/app/globals.css"

export const metadata = {
  title: "EQUIRE Mockups",
  robots: "noindex, nofollow",
}

export default function MockupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        "--font-geist-sans": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        "--font-geist-mono": "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace",
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
