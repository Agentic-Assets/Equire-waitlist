"use client"

import { cn } from "~/lib/utils"
import {
  Sparkles,
  Check,
  Clock,
  AlertTriangle,
  Download,
  FileText,
  Loader2,
  ChevronRight,
} from "lucide-react"

type SectionStatus = "complete" | "generating" | "needs-input" | "pending"

interface MemoSection {
  emoji: string
  name: string
  status: SectionStatus
  words?: number
}

const SECTIONS: MemoSection[] = [
  { emoji: "\u{1F4CB}", name: "Executive Summary", status: "complete", words: 842 },
  { emoji: "\u{1F3E2}", name: "Transaction Overview", status: "complete", words: 1124 },
  { emoji: "\u{1F4A1}", name: "Investment Thesis", status: "complete", words: 967 },
  { emoji: "\u{1F4CA}", name: "Market Analysis", status: "complete", words: 1453 },
  { emoji: "\u{1F3D7}\uFE0F", name: "Property & Physical", status: "complete", words: 1289 },
  { emoji: "\u{1F465}", name: "Tenancy & Lease Analysis", status: "complete", words: 1587 },
  { emoji: "\u{1F4B0}", name: "Financial Analysis", status: "generating" },
  { emoji: "\u{1F3E6}", name: "Financing Structure", status: "pending" },
  { emoji: "\u26A0\uFE0F", name: "Risk Factors", status: "needs-input" },
  { emoji: "\u{1F4D0}", name: "Operational Plan", status: "needs-input" },
  { emoji: "\u{1F3AF}", name: "Fund Considerations", status: "pending" },
  { emoji: "\u270D\uFE0F", name: "Proposed Resolution", status: "pending" },
]

const SELECTED = 5

const STATUS_STYLE: Record<SectionStatus, { label: string; cls: string }> = {
  complete: { label: "Complete", cls: "bg-success/10 text-success" },
  generating: { label: "Generating", cls: "bg-accent/10 text-accent" },
  "needs-input": { label: "Needs Input", cls: "bg-warning/10 text-warning" },
  pending: { label: "Pending", cls: "bg-surface-light text-text-dim" },
}

const StatusIcon = ({ status }: { status: SectionStatus }) => {
  if (status === "complete") return <Check className="h-3 w-3" />
  if (status === "generating") return <Loader2 className="h-3 w-3 animate-spin" />
  if (status === "needs-input") return <AlertTriangle className="h-3 w-3" />
  return <Clock className="h-3 w-3" />
}

const TENANTS = [
  { name: "Bluefin Analytics", suite: "100", sf: "76,587", pct: "42.0%", rent: "$13.25", annual: "$1,014,778", exp: "Jun 2028" },
  { name: "Vertex Logistics", suite: "200", sf: "32,450", pct: "17.8%", rent: "$11.80", annual: "$382,910", exp: "Mar 2031" },
  { name: "Lone Star Fabrication", suite: "300", sf: "24,100", pct: "13.2%", rent: "$12.00", annual: "$289,200", exp: "Dec 2029" },
  { name: "DataPrime Solutions", suite: "400", sf: "18,200", pct: "10.0%", rent: "$14.50", annual: "$263,900", exp: "Aug 2030" },
]

export default function ICMemoMockup() {
  return (
    <div className="w-[960px] h-[540px] flex overflow-hidden bg-background">
      {/* Left sidebar */}
      <aside className="w-[260px] bg-surface border-r border-border flex flex-col shrink-0">
        <div className="px-4 py-3.5 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4.5 w-4.5 text-accent" />
            <h1 className="text-[17px] font-semibold text-text-primary">IC Memo</h1>
          </div>
          <p className="text-[13px] text-text-muted">Southpoint Industrial Park</p>
          <button
            type="button"
            className="w-full bg-accent text-white rounded-lg text-[14px] font-semibold py-2.5 mt-3 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate All Sections
          </button>
          <button
            type="button"
            className="w-full border border-border rounded-lg text-[14px] py-2 mt-2 flex items-center justify-center gap-2 text-text-primary"
          >
            <Download className="h-4 w-4" />
            Download DOCX
          </button>
        </div>

        {/* Section list */}
        <nav className="flex-1 overflow-hidden py-0.5">
          {SECTIONS.map((s, i) => {
            const sel = i === SELECTED
            const st = STATUS_STYLE[s.status]
            return (
              <button
                key={s.name}
                type="button"
                className={cn(
                  "w-full flex items-center gap-2.5 px-3.5 py-2 text-left",
                  sel && "bg-surface-light"
                )}
              >
                <span className="text-[14px] shrink-0">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className={cn("text-[13px] truncate block", sel ? "font-semibold text-text-primary" : "text-text-primary")}>
                    {s.name}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={cn("inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium", st.cls)}>
                      <StatusIcon status={s.status} />
                      {st.label}
                    </span>
                    {s.words && <span className="text-[10px] text-text-dim">{s.words}w</span>}
                  </div>
                </div>
                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", sel ? "text-accent" : "text-text-dim")} />
              </button>
            )
          })}
        </nav>

        {/* Progress */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between text-[12px] text-text-dim mb-1.5">
            <span>Progress</span>
            <span className="tabular-nums">6 / 12</span>
          </div>
          <div className="h-2 rounded-full bg-surface-light overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: "50%" }} />
          </div>
        </div>
      </aside>

      {/* Right content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Section header */}
        <header className="px-6 py-3 border-b border-border flex items-center justify-between bg-surface shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[20px]">{SECTIONS[SELECTED].emoji}</span>
            <div>
              <h2 className="text-[16px] font-semibold text-text-primary">{SECTIONS[SELECTED].name}</h2>
              <span className={cn("inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded font-medium mt-0.5", STATUS_STYLE.complete.cls)}>
                <Check className="h-3 w-3" /> Complete &middot; 1,587 words
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden px-6 py-5">
          <article className="max-w-full">
            <h3 className="text-[18px] font-semibold text-text-primary border-b border-border pb-2 mb-3">
              Tenant Roster and Lease Summary
            </h3>
            <p className="text-[15px] text-text-primary leading-relaxed mb-4">
              Southpoint Industrial Park is currently <strong>94.2% occupied</strong> across <strong>8 tenants</strong> totaling <strong>171,774 SF</strong> of leased space out of 182,350 SF total NRA.
              The property benefits from a diversified tenant mix spanning analytics, logistics, and manufacturing.
            </p>

            {/* Tenant table — 4 rows */}
            <div className="mb-4">
              <table className="text-[13px] font-mono w-full border-collapse">
                <thead>
                  <tr>
                    {["Tenant", "Suite", "SF", "% NRA", "Rent/SF", "Annual Rent", "Exp"].map((h) => (
                      <th key={h} className="border border-border bg-surface-light px-3 py-2 text-left font-semibold text-text-primary whitespace-nowrap text-[12px]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TENANTS.map((t, i) => (
                    <tr key={t.suite} className={i % 2 === 0 ? "bg-surface" : "bg-background"}>
                      <td className="border border-border px-3 py-2 text-text-primary font-medium whitespace-nowrap">{t.name}</td>
                      <td className="border border-border px-3 py-2 text-text-muted text-center">{t.suite}</td>
                      <td className="border border-border px-3 py-2 text-text-muted text-right tabular-nums">{t.sf}</td>
                      <td className="border border-border px-3 py-2 text-text-muted text-right tabular-nums">{t.pct}</td>
                      <td className="border border-border px-3 py-2 text-text-muted text-right tabular-nums">{t.rent}</td>
                      <td className="border border-border px-3 py-2 text-text-muted text-right tabular-nums">{t.annual}</td>
                      <td className="border border-border px-3 py-2 text-text-muted whitespace-nowrap">{t.exp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[15px] text-text-primary leading-relaxed">
              Total in-place base rental revenue is <strong>$2,206,314 per annum</strong>, yielding a weighted average base rent of <strong>$12.84/SF</strong> — approximately 4.8% below current asking rates for comparable Class B industrial in the Southeast Austin submarket.
            </p>
          </article>
        </div>
      </main>
    </div>
  )
}
