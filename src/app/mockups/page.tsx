import Link from "next/link"

const MOCKUPS = [
  { title: "Deal Pipeline", href: "/mockups/pipeline", desc: "Dashboard with deal cards, stats, and pipeline status" },
  { title: "DCF Valuation", href: "/mockups/valuation", desc: "Assumptions panel, cash flow table, and return metrics" },
  { title: "AI Chat", href: "/mockups/chat", desc: "Risk analysis conversation with tool calls" },
  { title: "IC Memo", href: "/mockups/ic-memo", desc: "12-section memo with tenant analysis content" },
  { title: "Extracted Data", href: "/mockups/extraction", desc: "Source provenance, conflicts, and confidence bars" },
]

export default function MockupsIndexPage() {
  return (
    <div className="w-[960px] h-[540px] bg-background flex flex-col items-center justify-center p-12">
      <h1 className="text-[32px] font-bold text-text-primary tracking-tight mb-2">
        EQUIRE Mockups
      </h1>
      <p className="text-[16px] text-text-muted mb-10">
        Static interface mockups &middot; 960&times;540 embed format
      </p>

      <div className="grid grid-cols-3 gap-5 w-full max-w-[720px]">
        {MOCKUPS.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-border-strong hover:shadow-md"
          >
            <h2 className="text-[16px] font-semibold text-text-primary group-hover:text-accent transition-colors mb-1.5">
              {m.title}
            </h2>
            <p className="text-[13px] text-text-muted leading-relaxed">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
