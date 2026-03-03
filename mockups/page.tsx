import Link from "next/link"

const MOCKUPS = [
  {
    title: "Deal Pipeline",
    description: "Dashboard with 6 active deals, pipeline stats, and status tracking",
    href: "/mockups/pipeline",
  },
  {
    title: "DCF Valuation Model",
    description: "Full assumptions panel, cash flow projections, and return metrics",
    href: "/mockups/valuation",
  },
  {
    title: "AI Chat Assistant",
    description: "Conversational risk analysis with sensitivity matrix and tool calls",
    href: "/mockups/chat",
  },
  {
    title: "IC Memo",
    description: "12-section Investment Committee memorandum with tenant analysis",
    href: "/mockups/ic-memo",
  },
  {
    title: "Extracted Data",
    description: "Document extraction with source provenance, conflicts, and confidence scores",
    href: "/mockups/extraction",
  },
]

export default function MockupsIndexPage() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          EQUIRE Mockups
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Static interface mockups for marketing screenshots. Each page renders
          realistic CRE deal data with no API calls or authentication required.
        </p>

        <div className="mt-8 grid gap-4">
          {MOCKUPS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group block rounded-lg border border-border bg-surface p-5 transition-all hover:border-border-strong hover:shadow-md"
            >
              <h2 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {m.title}
              </h2>
              <p className="mt-1 text-xs text-text-muted">{m.description}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-text-dim">
          These pages are excluded from search engine indexing.
        </p>
      </div>
    </div>
  )
}
