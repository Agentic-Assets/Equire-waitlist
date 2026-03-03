"use client"

import { cn } from "~/lib/utils"
import {
  Sparkles,
  ArrowUp,
  Building2,
  BarChart3,
  ChevronRight,
  MessageCircle,
} from "lucide-react"

export default function ChatMockup() {
  return (
    <div className="w-[960px] h-[540px] flex overflow-hidden bg-background">
      {/* Left: deal workspace (dimmed background) */}
      <div className="flex-1 flex flex-col opacity-80 min-w-0">
        {/* Deal header */}
        <div className="px-6 py-3.5 border-b border-border bg-surface flex items-center gap-3 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h1 className="text-[17px] font-semibold text-text-primary leading-tight">
              Southpoint Industrial Park
            </h1>
            <p className="text-[13px] text-text-dim mt-0.5">
              Austin, TX &middot; Industrial &middot; Due Diligence
            </p>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-bg px-3 py-1.5 text-[13px] text-purple font-medium">
              <span className="h-2 w-2 rounded-full bg-purple" />
              Due Diligence
            </span>
          </div>
        </div>

        {/* Tab bar */}
        <div className="px-6 bg-surface border-b border-border shrink-0">
          <div className="flex gap-0">
            {["Overview", "Documents", "Data", "Rent Roll", "Valuation", "IC Memo"].map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "px-4 py-3 text-[14px] border-b-2",
                  i === 0 ? "border-accent text-accent font-semibold" : "border-transparent text-text-muted"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview content — metric cards + skeleton */}
        <div className="flex-1 p-6 bg-background overflow-hidden">
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: "Purchase Price", value: "$42.5M" },
              { label: "Cap Rate", value: "6.8%" },
              { label: "Total SF", value: "182,350" },
              { label: "NOI", value: "$2.89M" },
            ].map((m) => (
              <div key={m.label} className="bg-surface rounded-xl border border-border p-4">
                <p className="text-[11px] uppercase tracking-widest text-text-dim font-semibold mb-2">{m.label}</p>
                <p className="text-[24px] font-bold tabular-nums text-text-primary leading-none">{m.value}</p>
              </div>
            ))}
          </div>
          {/* Skeleton content blocks */}
          <div className="bg-surface rounded-xl border border-border p-5">
            <div className="h-3.5 bg-surface-light rounded w-full mb-3" />
            <div className="h-3.5 bg-surface-light rounded w-11/12 mb-3" />
            <div className="h-3.5 bg-surface-light rounded w-4/5 mb-3" />
            <div className="h-3.5 bg-surface-light rounded w-full mb-3" />
            <div className="h-3.5 bg-surface-light rounded w-3/4" />
          </div>
        </div>
      </div>

      {/* Right: Chat panel */}
      <div className="w-[380px] shrink-0 bg-surface border-l border-border flex flex-col">
        {/* Chat header */}
        <div className="px-5 py-3 border-b border-border flex items-center gap-3 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="h-4.5 w-4.5 text-accent" />
          </div>
          <div>
            <p className="text-[16px] font-semibold text-text-primary leading-tight">EQUIRE AI</p>
            <p className="text-[12px] text-text-dim">Deal Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden px-5 py-4 space-y-4">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[85%] bg-accent/10 rounded-2xl px-4 py-3">
              <p className="text-[15px] text-text-primary">What are the key risks on this deal?</p>
            </div>
          </div>

          {/* Assistant response */}
          <div className="flex justify-start">
            <div className="max-w-[95%] space-y-2">
              <div className="flex items-center gap-1.5 text-[12px] text-text-dim">
                <Sparkles className="h-3 w-3 text-accent" />
                Analyzed 12 documents and market data
              </div>
              <div className="bg-surface-light rounded-2xl px-4 py-3 space-y-3">
                <p className="text-[15px] text-text-primary leading-relaxed">
                  Based on my analysis, here are the key risks:
                </p>
                {[
                  { n: 1, title: "Tenant Concentration", severity: "HIGH", color: "bg-danger/15 text-danger", desc: "Bluefin Analytics occupies 42% of NRA. Lease expires June 2028." },
                  { n: 2, title: "Lease Rollover", severity: "MED", color: "bg-warning/15 text-warning", desc: "3 tenants (58% of rent) expire within the hold period. WALT is 4.2 yrs." },
                  { n: 3, title: "Exit Cap Assumption", severity: "MED", color: "bg-warning/15 text-warning", desc: "Exit cap of 7.50% is 30bps below market range. IRR drops to 11.8% at 8.0%." },
                ].map((r) => (
                  <div key={r.n}>
                    <p className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                      {r.n}. {r.title}
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-semibold", r.color)}>{r.severity}</span>
                    </p>
                    <p className="text-[13px] text-text-muted mt-0.5 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tool call */}
          <div className="flex justify-start">
            <div className="bg-surface border border-border rounded-xl px-3.5 py-2 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-accent shrink-0" />
              <span className="font-mono text-[13px] text-text-muted">Ran sensitivity on exit cap rate</span>
              <ChevronRight className="h-3.5 w-3.5 text-text-dim ml-2" />
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-5 py-3.5 border-t border-border shrink-0">
          <div className="flex items-center gap-2 bg-surface-light rounded-2xl px-4 py-3 border border-border">
            <MessageCircle className="h-4.5 w-4.5 text-text-dim shrink-0" />
            <span className="flex-1 text-[15px] text-text-dim">Ask about this deal...</span>
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0"
            >
              <ArrowUp className="h-4.5 w-4.5 text-accent-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
