"use client"

import { cn } from "~/lib/utils"
import {
  Download,
  TrendingUp,
  Wallet,
  Building2,
  DoorOpen,
} from "lucide-react"

type Source = "doc" | "ai" | "fund" | "user"

const SOURCE_DOT: Record<Source, string> = {
  doc: "bg-emerald-500",
  ai: "bg-blue-500",
  fund: "bg-gold",
  user: "bg-purple",
}

const SOURCE_BORDER: Record<Source, string> = {
  doc: "border-l-emerald-500",
  ai: "border-l-blue-500",
  fund: "border-l-gold",
  user: "border-l-purple",
}

interface Assumption { label: string; value: string; source: Source }

const groups: { name: string; icon: React.ReactNode; items: Assumption[] }[] = [
  {
    name: "Revenue",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    items: [
      { label: "Market Rent / SF", value: "$12.50", source: "doc" },
      { label: "Rent Growth", value: "3.0%", source: "ai" },
      { label: "Stabilized Occ.", value: "94.0%", source: "doc" },
    ],
  },
  {
    name: "Expenses",
    icon: <Wallet className="w-3.5 h-3.5" />,
    items: [
      { label: "Expense Ratio", value: "35.2%", source: "doc" },
      { label: "Mgmt Fee", value: "3.0%", source: "fund" },
    ],
  },
  {
    name: "Debt",
    icon: <Building2 className="w-3.5 h-3.5" />,
    items: [
      { label: "Loan Amount", value: "$28.0M", source: "user" },
      { label: "Interest Rate", value: "5.75%", source: "fund" },
      { label: "Amort Period", value: "30 yrs", source: "fund" },
    ],
  },
  {
    name: "Exit",
    icon: <DoorOpen className="w-3.5 h-3.5" />,
    items: [
      { label: "Exit Cap Rate", value: "7.50%", source: "ai" },
      { label: "Hold Period", value: "7 yrs", source: "fund" },
    ],
  },
]

const cfHeaders = ["", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"]
const cfRows = [
  { label: "Gross Revenue", values: ["$3,588", "$3,696", "$3,807", "$3,921", "$4,039"], bold: false, neg: false },
  { label: "Vacancy Loss", values: ["($215)", "($222)", "($228)", "($235)", "($242)"], bold: false, neg: true },
  { label: "EGI", values: ["$3,373", "$3,474", "$3,579", "$3,686", "$3,797"], bold: true, neg: false },
  { label: "OpEx", values: ["($1,187)", "($1,223)", "($1,260)", "($1,298)", "($1,337)"], bold: false, neg: true },
  { label: "NOI", values: ["$2,886", "$2,951", "$3,019", "$3,088", "$3,160"], bold: true, neg: false, highlight: true },
]

const metrics = [
  { label: "Levered IRR", value: "14.2%", color: "text-emerald-600" },
  { label: "Equity Multiple", value: "1.87x", color: "text-gold" },
  { label: "Going-In Cap", value: "6.8%", color: "text-accent" },
  { label: "Cash-on-Cash", value: "8.4%", color: "text-foreground" },
  { label: "DSCR", value: "1.79x", color: "text-foreground" },
  { label: "DCF Value", value: "$44.8M", color: "text-accent" },
]

const scenarios = ["BASE", "UPSIDE", "DOWNSIDE"] as const

export default function ValuationMockup() {
  return (
    <div className="w-[960px] h-[540px] bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-11 bg-surface border-b border-border px-6 flex items-center shrink-0">
        <span className="text-[14px] font-bold tracking-wider font-mono text-foreground">VALUATION</span>
        <div className="w-px h-6 bg-border mx-5" />
        {scenarios.map((s) => (
          <button
            key={s}
            className={cn(
              "px-4 h-11 flex items-center text-[12px] font-semibold tracking-wide font-mono",
              s === "BASE" ? "border-b-[3px] border-accent text-accent" : "text-muted-foreground"
            )}
          >
            {s}
          </button>
        ))}
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Metrics banner */}
      <div className="bg-surface px-6 py-3 flex items-center gap-0 border-b border-border shrink-0">
        {metrics.map((m, i) => (
          <div key={m.label} className={cn("flex flex-col min-w-0 shrink-0", i < metrics.length - 1 && "pr-7 mr-7 border-r border-border")}>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-mono font-semibold">{m.label}</span>
            <span className={cn("text-[22px] font-mono font-bold leading-none", m.color)}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left: Assumptions */}
        <div className="w-[250px] bg-surface border-r border-border flex flex-col shrink-0 overflow-hidden">
          {/* Legend */}
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-3">
            {(["doc", "ai", "fund", "user"] as Source[]).map((s) => (
              <div key={s} className="flex items-center gap-1">
                <div className={cn("w-2 h-2 rounded-full", SOURCE_DOT[s])} />
                <span className="text-[10px] text-muted-foreground font-mono uppercase">{s === "doc" ? "Doc" : s === "ai" ? "AI" : s === "fund" ? "Fund" : "User"}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            {groups.map((g) => (
              <div key={g.name}>
                <div className="px-4 py-1.5 flex items-center gap-2 bg-surface-light">
                  <span className="text-gold">{g.icon}</span>
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider font-mono">{g.name}</span>
                </div>
                {g.items.map((item) => (
                  <div
                    key={item.label}
                    className={cn("px-4 py-2 flex items-center border-l-[3px] border-b border-b-border/50", SOURCE_BORDER[item.source])}
                  >
                    <div className="flex-1">
                      <div className="text-[12px] text-muted-foreground leading-tight">{item.label}</div>
                      <span className="text-[14px] font-mono font-semibold text-foreground">{item.value}</span>
                    </div>
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", SOURCE_DOT[item.source])} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Deal summary */}
          <div className="px-4 py-3 border-t border-border bg-surface-light">
            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider font-mono">Deal Summary</span>
            <div className="mt-2 space-y-1">
              {[["Purchase Price", "$42,500,000"], ["Price / SF", "$184.78"], ["LTV", "65.9%"], ["Equity Req.", "$14,500,000"]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">{l}</span>
                  <span className="text-[13px] font-mono font-semibold text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: DCF Table */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          <div className="flex items-center px-6 bg-surface border-b border-border shrink-0">
            {["DCF", "Returns", "Sensitivity", "Tenants"].map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-2.5 text-[13px] font-medium tracking-wide",
                  tab === "DCF" ? "border-b-2 border-accent text-accent font-semibold" : "text-muted-foreground"
                )}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1" />
            <span className="text-[10px] text-muted-foreground font-mono tracking-widest font-semibold">VALUES IN $000s</span>
          </div>

          <div className="flex-1 p-6 overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {cfHeaders.map((h, i) => (
                    <th
                      key={i}
                      className={cn(
                        "text-[12px] font-mono font-semibold uppercase tracking-wider py-2.5 border-b-2 border-border-strong",
                        i === 0 ? "text-left text-muted-foreground pl-3 w-44" : "text-right text-muted-foreground pr-4"
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cfRows.map((row) => (
                  <tr key={row.label} className={cn(row.highlight && "bg-accent/[0.04] border-b-2 border-border-strong")}>
                    <td className={cn("py-2.5 pl-3 text-[14px]", row.bold ? "font-semibold text-foreground" : "text-muted-foreground")}>
                      {row.label}
                    </td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={cn(
                          "py-2.5 pr-4 text-right font-mono tabular-nums text-[14px]",
                          row.bold ? "font-semibold text-foreground" : "",
                          row.neg ? "text-danger" : !row.bold ? "text-foreground" : ""
                        )}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary cards */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {[
                { label: "Total Equity", value: "$14,500", accent: false },
                { label: "Total Cash Flow", value: "$8,687", accent: false },
                { label: "Net Sale Proceeds", value: "$18,274", accent: true },
                { label: "Total Profit", value: "$12,461", accent: true },
              ].map((c) => (
                <div key={c.label} className={cn("rounded-xl border p-4", c.accent ? "border-accent/30 bg-accent/[0.04]" : "border-border bg-surface")}>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-semibold mb-1">{c.label}</div>
                  <div className={cn("text-[22px] font-mono font-bold leading-none", c.accent ? "text-accent" : "text-foreground")}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
