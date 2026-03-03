"use client"

import { cn } from "~/lib/utils"
import { Building, Building2, Plus, MapPin } from "lucide-react"

const STATS = [
  { label: "Total Deals", value: "8", colorClass: "text-text-primary" },
  { label: "Active", value: "6", colorClass: "text-success" },
  { label: "Closed YTD", value: "2", colorClass: "text-accent" },
  { label: "Pipeline Value", value: "$287.5M", colorClass: "text-gold" },
] as const

const PIPELINE_SEGMENTS = [
  { label: "Screening", count: 2, colorClass: "bg-amber-500" },
  { label: "LOI", count: 1, colorClass: "bg-blue-500" },
  { label: "Due Diligence", count: 2, colorClass: "bg-purple" },
  { label: "Under Contract", count: 1, colorClass: "bg-success" },
  { label: "Closed", count: 2, colorClass: "bg-text-dim" },
] as const

const TOTAL_DEALS = PIPELINE_SEGMENTS.reduce((s, p) => s + p.count, 0)

type Phase = "Screening" | "LOI" | "Due Diligence" | "Under Contract"

interface Deal {
  name: string
  location: string
  type: "Industrial" | "Office"
  sf: string
  price: string
  capRate: string
  phase: Phase
}

const DEALS: Deal[] = [
  { name: "Southpoint Industrial Park", location: "Austin, TX", type: "Industrial", sf: "182,350", price: "$42.5M", capRate: "6.8%", phase: "Due Diligence" },
  { name: "Harbor View Office Tower", location: "Miami, FL", type: "Office", sf: "325,000", price: "$89.2M", capRate: "5.4%", phase: "LOI" },
  { name: "Crossroads Distribution Ctr", location: "Dallas, TX", type: "Industrial", sf: "450,000", price: "$67.8M", capRate: "7.2%", phase: "Under Contract" },
  { name: "Meridian Business Park", location: "Phoenix, AZ", type: "Industrial", sf: "215,000", price: "$38.4M", capRate: "6.5%", phase: "Screening" },
]

const PHASE_BORDER: Record<Phase, string> = {
  Screening: "border-l-amber-500",
  LOI: "border-l-blue-500",
  "Due Diligence": "border-l-purple",
  "Under Contract": "border-l-success",
}

const PHASE_DOT: Record<Phase, string> = {
  Screening: "bg-amber-500",
  LOI: "bg-blue-500",
  "Due Diligence": "bg-purple",
  "Under Contract": "bg-success",
}

export default function PipelineMockup() {
  return (
    <div className="w-[960px] h-[540px] bg-background flex flex-col overflow-hidden" style={{ fontSize: 16 }}>
      {/* Header */}
      <div className="flex items-end justify-between px-8 pt-6 pb-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-text-primary leading-none">
            Deal Pipeline
          </h1>
          <p className="text-[15px] text-text-muted mt-1.5">
            Acquisition opportunities &middot; 8 total
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[15px] font-semibold text-accent-foreground"
        >
          <Plus className="h-5 w-5" />
          New Deal
        </button>
      </div>

      {/* Stats strip */}
      <div className="mx-8 grid grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-surface px-5 py-4 text-center">
            <p className="text-[11px] uppercase tracking-widest text-text-dim leading-none mb-2 font-semibold">
              {stat.label}
            </p>
            <p className={cn("text-[26px] font-bold tabular-nums leading-none", stat.colorClass)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline bar */}
      <div className="mx-8 mt-5 mb-1">
        <div className="h-2.5 rounded-sm overflow-hidden flex">
          {PIPELINE_SEGMENTS.map((seg) => (
            <div
              key={seg.label}
              className={cn("h-full", seg.colorClass)}
              style={{ width: `${(seg.count / TOTAL_DEALS) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex gap-5 mt-2.5">
          {PIPELINE_SEGMENTS.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-full", seg.colorClass)} />
              <span className="text-[13px] text-text-muted">{seg.label}</span>
              <span className="text-[13px] text-text-dim tabular-nums">({seg.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Deal cards — 4 cards in a row */}
      <div className="flex-1 px-8 pt-4 pb-6 grid grid-cols-4 gap-4 min-h-0">
        {DEALS.map((deal) => {
          const Icon = deal.type === "Industrial" ? Building2 : Building
          return (
            <div
              key={deal.name}
              className={cn(
                "flex flex-col rounded-xl border bg-surface border-l-[3px]",
                PHASE_BORDER[deal.phase]
              )}
            >
              <div className="p-4 flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-surface-light flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-text-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-text-primary leading-tight truncate">
                      {deal.name}
                    </p>
                    <p className="flex items-center gap-1 text-[13px] text-text-dim mt-1">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{deal.location}</span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Price", val: deal.price },
                    { label: "Cap Rate", val: deal.capRate },
                    { label: "Total SF", val: deal.sf },
                  ].map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] uppercase tracking-widest text-text-dim mb-1 font-semibold">{m.label}</p>
                      <p className="text-[15px] font-semibold tabular-nums text-text-primary leading-tight">{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-4 py-2.5 border-t border-border/50 flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", PHASE_DOT[deal.phase])} />
                <span className="text-[13px] text-text-muted">{deal.phase}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
