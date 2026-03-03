"use client"

import { cn } from "@/lib/utils"
import {
  Sparkles,
  Maximize2,
  X,
  ArrowUp,
  Building2,
  FileText,
  BarChart3,
  Users,
  MessageCircle,
  Settings,
  ChevronRight,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react"

// ---- Static deal data ----

const DEAL_NAME = "Southpoint Industrial Park"
const DEAL_LOCATION = "Austin, TX"

const METRICS = [
  { label: "Purchase Price", value: "$42.5M", icon: TrendingUp },
  { label: "Cap Rate", value: "6.8%", icon: Activity },
  { label: "Total SF", value: "182,350", icon: Building2 },
  { label: "NOI", value: "$2.89M", icon: BarChart3 },
] as const

const TABS = [
  { label: "Overview", active: true },
  { label: "Documents", active: false },
  { label: "Data", active: false },
  { label: "Rent Roll", active: false },
  { label: "Valuation", active: false },
  { label: "IC Memo", active: false },
] as const

const SIDEBAR_ITEMS = [
  { icon: Building2, label: "Deals", active: false },
  { icon: FileText, label: "Documents", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Team", active: false },
  { icon: Settings, label: "Settings", active: false },
] as const

// ---- Page component ----

export default function ChatMockup() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left: deal workspace preview (dimmed) */}
      <div className="flex-1 flex flex-col opacity-90 min-w-0">
        {/* Mini sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:flex w-14 flex-col items-center py-4 gap-3 bg-surface border-r border-border">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center mb-4">
              <span className="font-bold text-accent-foreground tracking-tighter" style={{ fontSize: "10px" }}>EQ</span>
            </div>
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="h-9 w-9 rounded-md flex items-center justify-center text-text-dim hover:bg-surface-light transition-colors"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Deal header */}
            <div className="px-4 md:px-6 py-3 border-b border-border bg-surface flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-4.5 w-4.5 text-accent" />
              </div>
              <div className="min-w-0">
                <h1 className="font-semibold text-text-primary truncate leading-tight">
                  {DEAL_NAME}
                </h1>
                <p className="text-text-dim leading-tight mt-0.5">
                  {DEAL_LOCATION} &middot; Industrial &middot; Due Diligence
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-purple-bg px-2.5 py-1 text-purple">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple" />
                  Due Diligence
                </span>
              </div>
            </div>

            {/* Tab bar */}
            <div className="px-4 md:px-6 bg-surface border-b border-border">
              <div className="flex gap-0 overflow-x-auto scrollbar-none">
                {TABS.map((tab) => (
                  <button
                    key={tab.label}
                    type="button"
                    className={cn(
                      "px-3 py-2.5 whitespace-nowrap border-b-2 transition-colors",
                      tab.active
                        ? "border-accent text-accent font-medium"
                        : "border-transparent text-text-muted hover:text-text-primary"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Page content: overview */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
              {/* Metric cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-surface rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="h-4 w-4 text-text-dim" />
                      <p className="text-text-dim uppercase tracking-wider" style={{ fontSize: "11px" }}>
                        {metric.label}
                      </p>
                    </div>
                    <p className="font-bold tabular-nums text-text-primary" style={{ fontSize: "22px" }}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Deal summary card */}
              <div className="bg-surface rounded-lg border border-border p-5 mb-4">
                <h2 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-text-dim" />
                  Deal Summary
                </h2>
                <div className="space-y-2">
                  <div className="h-3 bg-surface-light rounded w-full" />
                  <div className="h-3 bg-surface-light rounded w-11/12" />
                  <div className="h-3 bg-surface-light rounded w-4/5" />
                  <div className="h-3 bg-surface-light rounded w-full" />
                  <div className="h-3 bg-surface-light rounded w-3/4" />
                </div>
              </div>

              {/* Activity + checklist row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg border border-border p-5">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-text-dim" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { text: "Rent roll uploaded and processed", time: "2h ago" },
                      { text: "Valuation model auto-populated", time: "3h ago" },
                      { text: "Environmental Phase I received", time: "1d ago" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary leading-snug">{item.text}</p>
                          <p className="text-text-dim mt-0.5">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface rounded-lg border border-border p-5">
                  <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-text-dim" />
                    DD Checklist
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { text: "Title & Survey Review", done: true },
                      { text: "Environmental (Phase I)", done: true },
                      { text: "Financial Underwriting", done: false },
                      { text: "Property Condition Report", done: false },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-4 w-4 rounded border flex items-center justify-center flex-shrink-0",
                            item.done
                              ? "bg-success/20 border-success text-success"
                              : "border-border"
                          )}
                        >
                          {item.done && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                        <span
                          className={cn(
                            "text-text-primary",
                            item.done && "line-through text-text-dim"
                          )}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Chat panel */}
      <div className="w-full sm:w-[420px] flex-shrink-0 bg-surface border-l border-border flex flex-col">
        {/* Chat header */}
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-text-primary leading-tight">
                EQUIRE AI
              </p>
              <p className="text-text-dim leading-tight" style={{ fontSize: "11px" }}>
                Deal Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="h-8 w-8 rounded-md flex items-center justify-center text-text-dim hover:bg-surface-light transition-colors"
              aria-label="Expand"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-md flex items-center justify-center text-text-dim hover:bg-surface-light transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Conversation area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Message 1 - User */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-accent/10 rounded-xl px-4 py-3">
              <p className="text-text-primary" style={{ fontSize: "14px" }}>
                What are the key risks on this deal?
              </p>
            </div>
          </div>

          {/* Message 2 - Assistant with thinking */}
          <div className="flex justify-start">
            <div className="max-w-[95%] space-y-2">
              {/* Thinking indicator */}
              <div className="flex items-center gap-1.5 text-text-dim mb-1" style={{ fontSize: "11px" }}>
                <Sparkles className="h-3 w-3 text-accent" />
                <span>Analyzed 12 documents, rent roll, and market data</span>
              </div>

              <div className="bg-surface-light rounded-xl px-4 py-3">
                <div className="text-text-primary space-y-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  <p>
                    Based on my analysis of the deal data, documents, and market context, here are the key risks for Southpoint Industrial Park:
                  </p>

                  <div className="space-y-3">
                    {/* Risk 1 */}
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        1. Tenant Concentration Risk
                        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 font-medium bg-danger/15 text-danger" style={{ fontSize: "10px" }}>HIGH</span>
                      </p>
                      <p className="text-text-muted mt-0.5">
                        Bluefin Analytics occupies 42% of total NRA (76,587 SF). Their lease expires in 18 months (June 2028), creating significant rollover exposure. If they vacate, stabilized occupancy drops to ~52%.
                      </p>
                    </div>

                    {/* Risk 2 */}
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        2. Near-Term Lease Rollover
                        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 font-medium bg-warning/15 text-warning" style={{ fontSize: "10px" }}>MED</span>
                      </p>
                      <p className="text-text-muted mt-0.5">
                        3 of 8 tenants (representing 58% of base rent) have leases expiring within the hold period. The weighted average lease term (WALT) is only 4.2 years.
                      </p>
                    </div>

                    {/* Risk 3 */}
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        3. Below-Market Exit Cap Assumption
                        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 font-medium bg-warning/15 text-warning" style={{ fontSize: "10px" }}>MED</span>
                      </p>
                      <p className="text-text-muted mt-0.5">
                        The current exit cap of 7.50% is 30bps below the AI-estimated market range of 7.75-8.25% for Austin industrial. Sensitivity shows IRR drops to 11.8% at an 8.0% exit cap.
                      </p>
                    </div>
                  </div>

                  {/* Summary table */}
                  <div className="overflow-x-auto -mx-1">
                    <table className="w-full border-collapse font-mono" style={{ fontSize: "12px" }}>
                      <thead>
                        <tr>
                          <th className="text-left px-2 py-1.5 border-b border-border font-semibold text-text-primary">Metric</th>
                          <th className="text-right px-2 py-1.5 border-b border-border font-semibold text-text-primary">Base Case</th>
                          <th className="text-right px-2 py-1.5 border-b border-border font-semibold text-text-primary">Stress Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-2 py-1.5 border-b border-border/50 text-text-muted">Exit Cap</td>
                          <td className="px-2 py-1.5 border-b border-border/50 text-right tabular-nums text-text-primary">7.50%</td>
                          <td className="px-2 py-1.5 border-b border-border/50 text-right tabular-nums text-danger">8.25%</td>
                        </tr>
                        <tr className="bg-surface/50">
                          <td className="px-2 py-1.5 border-b border-border/50 text-text-muted">Levered IRR</td>
                          <td className="px-2 py-1.5 border-b border-border/50 text-right tabular-nums text-success font-medium">14.2%</td>
                          <td className="px-2 py-1.5 border-b border-border/50 text-right tabular-nums text-danger font-medium">10.4%</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1.5 text-text-muted">Equity Multiple</td>
                          <td className="px-2 py-1.5 text-right tabular-nums text-success font-medium">1.87x</td>
                          <td className="px-2 py-1.5 text-right tabular-nums text-danger font-medium">1.62x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-text-dim italic" style={{ fontSize: "12px" }}>
                    [Source: Rent Roll, Valuation Model, Market Data (Austin CBSA)]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message 3 - Tool call result */}
          <div className="flex justify-start">
            <div className="max-w-[95%]">
              <div className="bg-surface border border-border rounded-lg px-3 py-2 flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                <span className="font-mono text-text-muted" style={{ fontSize: "12px" }}>
                  Ran sensitivity analysis on exit cap rate
                </span>
                <ChevronRight className="h-3 w-3 text-text-dim ml-auto" />
              </div>
            </div>
          </div>

          {/* Message 4 - User */}
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-accent/10 rounded-xl px-4 py-3">
              <p className="text-text-primary" style={{ fontSize: "14px" }}>
                Run a sensitivity on rent growth and exit cap
              </p>
            </div>
          </div>

          {/* Message 5 - Assistant with sensitivity matrix */}
          <div className="flex justify-start">
            <div className="max-w-[95%] space-y-2">
              {/* Thinking indicator */}
              <div className="flex items-center gap-1.5 text-text-dim mb-1" style={{ fontSize: "11px" }}>
                <Sparkles className="h-3 w-3 text-accent" />
                <span>Computed 20-scenario sensitivity matrix</span>
              </div>

              <div className="bg-surface-light rounded-xl px-4 py-3">
                <div className="text-text-primary space-y-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  <p>
                    I&apos;ve run a two-variable sensitivity analysis:
                  </p>

                  <p className="font-semibold">
                    IRR Sensitivity: Rent Growth vs Exit Cap Rate
                  </p>

                  {/* Sensitivity matrix */}
                  <div className="overflow-x-auto -mx-1">
                    <table className="w-full border-collapse font-mono" style={{ fontSize: "11px" }}>
                      <thead>
                        <tr>
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-dim font-medium text-left" />
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-primary font-semibold text-center">6.75%</th>
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-primary font-semibold text-center">7.00%</th>
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-primary font-semibold text-center">7.25%</th>
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-primary font-semibold text-center">7.50%</th>
                          <th className="px-2 py-1.5 border border-border bg-surface text-text-primary font-semibold text-center">7.75%</th>
                        </tr>
                      </thead>
                      <tbody>
                        <SensitivityRow label="2.0%" values={["16.1%", "15.2%", "14.3%", "13.5%", "12.8%"]} highlightCol={-1} />
                        <SensitivityRow label="2.5%" values={["16.8%", "15.9%", "15.0%", "14.2%", "13.4%"]} highlightCol={-1} isEven />
                        <SensitivityRow label="3.0%" values={["17.5%", "16.6%", "15.7%", "14.8%", "14.1%"]} highlightCol={3} />
                        <SensitivityRow label="3.5%" values={["18.2%", "17.3%", "16.4%", "15.5%", "14.7%"]} highlightCol={-1} isEven />
                      </tbody>
                    </table>
                  </div>

                  <p className="text-text-muted">
                    The base case (<span className="text-success font-medium">3.0% growth</span>,{" "}
                    <span className="font-medium text-text-primary">7.50% exit</span>) delivers{" "}
                    <span className="text-success font-semibold">14.8% IRR</span>. The deal breaks the 12% hurdle in all scenarios except extreme downside.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2 bg-surface-light rounded-xl px-3 py-2.5 border border-border">
            <MessageCircle className="h-4 w-4 text-text-dim flex-shrink-0" />
            <span className="flex-1 text-text-dim" style={{ fontSize: "14px" }}>
              Ask about this deal...
            </span>
            <button
              type="button"
              className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4 text-accent-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- Helper components ----

function SensitivityRow({
  label,
  values,
  highlightCol,
  isEven,
}: {
  label: string
  values: string[]
  highlightCol: number
  isEven?: boolean
}) {
  return (
    <tr className={isEven ? "bg-surface/50" : ""}>
      <td className="px-2 py-1.5 border border-border bg-surface font-semibold text-text-primary">
        {label}
      </td>
      {values.map((val, i) => {
        const numVal = parseFloat(val)
        const isHighlight = i === highlightCol
        const colorClass =
          numVal >= 15
            ? "text-success"
            : numVal >= 13
              ? "text-text-primary"
              : "text-warning"

        return (
          <td
            key={i}
            className={cn(
              "px-2 py-1.5 border border-border text-center tabular-nums",
              colorClass,
              isHighlight && "bg-accent/10 font-semibold ring-1 ring-accent/30"
            )}
          >
            {val}
          </td>
        )
      })}
    </tr>
  )
}
