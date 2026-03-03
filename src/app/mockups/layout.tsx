import "~/app/globals.css"

export const metadata = {
  title: "EQUIRE Mockups",
  robots: "noindex, nofollow",
}

export default function MockupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0E17]"
    >
      <div
        className="relative overflow-hidden"
        style={{ width: 960, height: 540 }}
      >
        {children}
      </div>
    </div>
  )
}
