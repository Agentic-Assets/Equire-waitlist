"use client"

import { cn } from "@/lib/utils"
import {
  Download,
  ChevronDown,
  Building2,
  TrendingUp,
  Wallet,
  DoorOpen,
  CircleDot,
} from "lucide-react"

/* ═══════════════════════════════════════════════════════════════════════════
   STATIC DATA — realistic $42.5M industrial acquisition
   ═══════════════════════════════════════════════════════════════════════════ */

type Source = "doc" | "ai" | "fund" | "user"

const SOURCE_COLORS: Record<Source, { dot: string; border: string; label: string }> = {
  doc: { dot: "bg-emerald-500", border: "border-l-emerald-500", label: "Document" },
  ai: { dot: "bg-blue-500", border: "border-l-blue-500", label: "AI" },
  fund: { dot: "bg-gold", border: "border-l-gold", label: "Fund" },
  user: { dot: "bg-purple", border: "border-l-purple", label: "User" },
}

interface Assumption {
  label: string
  value: string
  source: Source
  confidence?: number
}

interface AssumptionGroup {
  name: string
  icon: React.ReactNode
  items: Assumption[]
}

const assumptionGroups: AssumptionGroup[] = [
  {
    name: "Revenue",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    items: [
      { label: "Market Rent / SF", value: "$12.50", source: "doc", confidence: 95 },
      { label: "Rent Growth", value: "3.0%", source: "ai", confidence: 82 },
      { label: "Stabilized Occ.", value: "94.0%", source: "doc", confidence: 98 },
      { label: "Other Income", value: "$0.35/SF", source: "doc", confidence: 88 },
    ],
  },
  {
    name: "Expenses",
    icon: <Wallet className="w-3.5 h-3.5" />,
    items: [
      { label: "Expense Ratio", value: "35.2%", source: "doc", confidence: 91 },
      { label: "Mgmt Fee", value: "3.0%", source: "fund" },
      { label: "CapEx Reserve", value: "$0.45/SF", source: "fund" },
    ],
  },
  {
    name: "Debt",
    icon: <Building2 className="w-3.5 h-3.5" />,
    items: [
      { label: "Loan Amount", value: "$28.0M", source: "user" },
      { label: "Interest Rate", value: "5.75%", source: "fund" },
      { label: "IO Period", value: "2 yrs", source: "fund" },
      { label: "Amort Period", value: "30 yrs", source: "fund" },
    ],
  },
  {
    name: "Exit",
    icon: <DoorOpen className="w-3.5 h-3.5" />,
    items: [
      { label: "Exit Cap Rate", value: "7.50%", source: "ai", confidence: 78 },
      { label: "Hold Period", value: "7 yrs", source: "fund" },
      { label: "Sale Costs", value: "2.0%", source: "fund" },
    ],
  },
]

// Realistic DCF cash flow for $42.5M industrial, 230,000 SF
// Year 1 NOI ~$2.89M at 6.8% going-in cap
const cashFlowData = {
  headers: ["", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "Yr 6", "Yr 7", "Exit"],
  rows: [
    {
      label: "Gross Revenue",
      values: ["$3,588", "$3,696", "$3,807", "$3,921", "$4,039", "$4,160", "$4,285", ""],
      bold: false,
      separator: false,
    },
    {
      label: "Vacancy / Credit Loss",
      values: ["($215)", "($222)", "($228)", "($235)", "($242)", "($250)", "($257)", ""],
      bold: false,
      negative: true,
      separator: false,
    },
    {
      label: "EGI",
      values: ["$3,373", "$3,474", "$3,579", "$3,686", "$3,797", "$3,910", "$4,028", ""],
      bold: true,
      separator: false,
    },
    {
      label: "Operating Expenses",
      values: ["($1,187)", "($1,223)", "($1,260)", "($1,298)", "($1,337)", "($1,377)", "($1,418)", ""],
      bold: false,
      negative: true,
      separator: false,
    },
    {
      label: "Net Operating Income",
      values: ["$2,886", "$2,951", "$3,019", "$3,088", "$3,160", "$3,233", "$3,310", ""],
      bold: true,
      highlight: true,
      separator: true,
    },
    {
      label: "Debt Service",
      values: ["($1,610)", "($1,610)", "($1,948)", "($1,948)", "($1,948)", "($1,948)", "($1,948)", ""],
      bold: false,
      negative: true,
      separator: false,
    },
    {
      label: "Cash Flow (After DS)",
      values: ["$1,276", "$1,341", "$1,071", "$1,140", "$1,212", "$1,285", "$1,362", ""],
      bold: true,
      separator: false,
    },
    {
      label: "Exit Proceeds",
      values: ["", "", "", "", "", "", "", "$43,880"],
      bold: true,
      separator: true,
    },
    {
      label: "DSCR",
      values: ["1.79x", "1.83x", "1.55x", "1.59x", "1.62x", "1.66x", "1.70x", ""],
      bold: false,
      dscr: true,
      separator: false,
    },
  ],
}

const metricsData = [
  { label: "Levered IRR", value: "14.2%", color: "text-emerald-600" },
  { label: "Unlevered IRR", value: "9.8%", color: "text-emerald-600" },
  { label: "Equity Multiple", value: "1.87x", color: "text-gold" },
  { label: "Going-In Cap", value: "6.8%", color: "text-accent" },
  { label: "Cash-on-Cash", value: "8.4%", color: "text-foreground" },
  { label: "NPV", value: "$4.2M", color: "text-foreground" },
  { label: "Min DSCR", value: "1.42x", color: "text-foreground" },
  { label: "DCF Value", value: "$44.8M", color: "text-accent" },
]

const scenarios = ["BASE", "UPSIDE", "DOWNSIDE"] as const
const dcfTabs = ["DCF", "Returns", "Sensitivity", "Tenants", "T-12"] as const

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ValuationMockup() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* ── Top Header Bar ─────────────────────────────────────────────── */}
      <div className="h-12 bg-surface border-b border-border px-5 flex items-center shrink-0">
        <span className="text-sm font-bold tracking-wider font-mono text-foreground">
          VALUATION
        </span>
        <div className="w-px h-6 bg-border mx-5" />

        {/* Scenario Tabs */}
        <div className="flex items-center gap-0">
          {scenarios.map((s) => (
            <button
              key={s}
              className={cn(
                "px-4 h-12 flex items-center text-xs font-semibold tracking-wide font-mono transition-colors",
                s === "BASE"
                  ? "border-b-[3px] border-accent text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Export Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-medium hover:opacity-90 transition-opacity">
          <Download className="w-3.5 h-3.5" />
          Export Excel
        </button>
      </div>

      {/* ── Returns Banner ─────────────────────────────────────────────── */}
      <div className="bg-surface px-5 py-2 flex items-center gap-0 border-b border-border overflow-x-auto shrink-0 scrollbar-none">
        {metricsData.map((m, i) => (
          <div
            key={m.label}
            className={cn(
              "flex flex-col min-w-0 shrink-0",
              i < metricsData.length - 1 && "pr-6 mr-6 border-r border-border"
            )}
          >
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider mb-0.5 font-mono whitespace-nowrap">
              {m.label}
            </span>
            <span className={cn("text-lg font-mono font-bold whitespace-nowrap", m.color)}>
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Main Body ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left Panel: Assumptions ──────────────────────────────────── */}
        <div className="w-72 bg-surface border-r border-border flex flex-col overflow-y-auto shrink-0">
          {/* Panel Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-foreground tracking-wide">
                Assumption Hierarchy
              </h3>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            {/* Source Legend */}
            <div className="flex items-center gap-3">
              {(["doc", "ai", "fund", "user"] as Source[]).map((s) => (
                <div key={s} className="flex items-center gap-1">
                  <div className={cn("w-1.5 h-1.5 rounded-full", SOURCE_COLORS[s].dot)} />
                  <span className="text-[9px] text-muted-foreground font-mono uppercase">
                    {SOURCE_COLORS[s].label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assumption Groups */}
          <div className="flex-1 overflow-y-auto">
            {assumptionGroups.map((group) => (
              <div key={group.name}>
                {/* Group Header */}
                <div className="px-4 py-2 flex items-center gap-2 bg-surface-light">
                  <span className="text-gold">{group.icon}</span>
                  <span className="text-[10px] font-bold text-foreground uppercase tracking-wider font-mono">
                    {group.name}
                  </span>
                </div>

                {/* Group Items */}
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "px-4 py-2 flex items-center border-l-[3px] border-b border-b-border/50 hover:bg-surface-hover transition-colors",
                      SOURCE_COLORS[item.source].border
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-muted-foreground leading-tight truncate">
                        {item.label}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono font-semibold text-foreground">
                          {item.value}
                        </span>
                        {item.confidence !== undefined && (
                          <span className="text-[9px] text-muted-foreground font-mono">
                            {item.confidence}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={cn("w-2 h-2 rounded-full shrink-0", SOURCE_COLORS[item.source].dot)} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom: Deal Summary */}
          <div className="px-4 py-3 border-t border-border bg-surface-light">
            <div className="flex items-center gap-2 mb-2">
              <CircleDot className="w-3 h-3 text-gold" />
              <span className="text-[10px] font-bold text-foreground uppercase tracking-wider font-mono">
                Deal Summary
              </span>
            </div>
            <div className="space-y-1">
              {[
                ["Purchase Price", "$42,500,000"],
                ["Price / SF", "$184.78"],
                ["Building SF", "230,000"],
                ["LTV", "65.9%"],
                ["Equity Required", "$14,500,000"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                  <span className="text-[11px] font-mono font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel: DCF Table ───────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* DCF Tab Bar */}
          <div className="flex items-center gap-0 px-5 bg-surface border-b border-border shrink-0">
            {dcfTabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-2.5 text-xs font-medium tracking-wide transition-colors",
                  tab === "DCF"
                    ? "border-b-2 border-accent text-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1" />
            <span className="text-[9px] text-muted-foreground font-mono tracking-wider">
              VALUES IN $000s
            </span>
          </div>

          {/* Cash Flow Table */}
          <div className="flex-1 overflow-auto p-5">
            <div className="min-w-[720px]">
              <table className="w-full border-collapse">
                {/* Table Header */}
                <thead>
                  <tr>
                    {cashFlowData.headers.map((h, i) => (
                      <th
                        key={i}
                        className={cn(
                          "text-[10px] font-mono font-semibold uppercase tracking-wider py-2 border-b-2 border-border-strong",
                          i === 0
                            ? "text-left text-muted-foreground pl-3 w-48"
                            : "text-right text-muted-foreground pr-3",
                          h === "Exit" && "text-accent"
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {cashFlowData.rows.map((row) => (
                    <tr
                      key={row.label}
                      className={cn(
                        "group",
                        row.highlight && "bg-accent/[0.04]",
                        row.separator && "border-b-2 border-border-strong"
                      )}
                    >
                      {/* Row Label */}
                      <td
                        className={cn(
                          "py-2 pl-3 pr-4 text-left whitespace-nowrap",
                          row.bold
                            ? "text-xs font-semibold text-foreground"
                            : "text-[11px] text-muted-foreground",
                          row.highlight && "text-foreground font-bold"
                        )}
                      >
                        {row.label}
                      </td>

                      {/* Row Values */}
                      {row.values.map((val, i) => (
                        <td
                          key={i}
                          className={cn(
                            "py-2 pr-3 text-right font-mono tabular-nums whitespace-nowrap",
                            row.bold && !row.dscr
                              ? "text-xs font-semibold text-foreground"
                              : "text-[11px]",
                            row.highlight && "text-foreground font-bold",
                            row.negative && val ? "text-danger" : "",
                            !row.negative && !row.bold && !row.dscr && val ? "text-foreground" : "",
                            !val && "text-transparent",
                            row.dscr && val && getDscrColor(val)
                          )}
                        >
                          {val || "\u2014"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Waterfall Summary Below Table */}
              <div className="mt-8 grid grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Equity Invested",
                    value: "$14,500",
                    sub: "34.1% of total capitalization",
                    accent: false,
                  },
                  {
                    label: "Total Cash Flow",
                    value: "$8,687",
                    sub: "Cumulative distributions over hold",
                    accent: false,
                  },
                  {
                    label: "Net Sale Proceeds",
                    value: "$18,274",
                    sub: "After debt payoff & sale costs",
                    accent: true,
                  },
                  {
                    label: "Total Profit",
                    value: "$12,461",
                    sub: "1.87x equity multiple on $14.5M",
                    accent: true,
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className={cn(
                      "rounded-lg border p-4",
                      card.accent
                        ? "border-accent/30 bg-accent/[0.04]"
                        : "border-border bg-surface"
                    )}
                  >
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-mono mb-1">
                      {card.label}
                    </div>
                    <div
                      className={cn(
                        "text-lg font-mono font-bold",
                        card.accent ? "text-accent" : "text-foreground"
                      )}
                    >
                      {card.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{card.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */

function getDscrColor(val: string): string {
  const num = parseFloat(val)
  if (num >= 1.25) return "text-emerald-600 font-semibold"
  if (num >= 1.0) return "text-yellow-600 font-semibold"
  return "text-danger font-semibold"
}
