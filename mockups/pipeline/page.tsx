"use client"

import { cn } from "@/lib/utils"
import {
  Building,
  Building2,
  LayoutGrid,
  List,
  Plus,
  MapPin,
  Clock,
} from "lucide-react"

// ---- Static data ----

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
  updatedAgo: string
}

const DEALS: Deal[] = [
  {
    name: "Southpoint Industrial Park",
    location: "Austin, TX",
    type: "Industrial",
    sf: "182,350",
    price: "$42.5M",
    capRate: "6.8%",
    phase: "Due Diligence",
    updatedAgo: "2h ago",
  },
  {
    name: "Harbor View Office Tower",
    location: "Miami, FL",
    type: "Office",
    sf: "325,000",
    price: "$89.2M",
    capRate: "5.4%",
    phase: "LOI",
    updatedAgo: "5h ago",
  },
  {
    name: "Crossroads Distribution Center",
    location: "Dallas, TX",
    type: "Industrial",
    sf: "450,000",
    price: "$67.8M",
    capRate: "7.2%",
    phase: "Under Contract",
    updatedAgo: "1d ago",
  },
  {
    name: "Meridian Business Park",
    location: "Phoenix, AZ",
    type: "Industrial",
    sf: "215,000",
    price: "$38.4M",
    capRate: "6.5%",
    phase: "Screening",
    updatedAgo: "3h ago",
  },
  {
    name: "Lakefront Commons",
    location: "Chicago, IL",
    type: "Office",
    sf: "175,000",
    price: "$52.1M",
    capRate: "5.9%",
    phase: "Due Diligence",
    updatedAgo: "8h ago",
  },
  {
    name: "Pacific Gateway Logistics",
    location: "Long Beach, CA",
    type: "Industrial",
    sf: "380,000",
    price: "$95.6M",
    capRate: "5.8%",
    phase: "Screening",
    updatedAgo: "12h ago",
  },
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

// ---- Page component ----

export default function PipelineMockup() {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Deal Pipeline
          </h1>
          <p className="text-text-muted mt-0.5">
            Acquisition opportunities &middot; 8 total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              type="button"
              className="p-2 bg-surface-light text-text-primary"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-2 bg-surface text-text-dim border-l border-border"
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            <span>New Deal</span>
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden mb-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-surface px-4 py-3.5 text-center">
            <p className="text-[11px] uppercase tracking-wider text-text-dim leading-none mb-1.5">
              {stat.label}
            </p>
            <p className={cn("text-xl font-bold tabular-nums", stat.colorClass)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline bar */}
      <div className="mb-6">
        <div className="h-2 rounded-sm overflow-hidden flex">
          {PIPELINE_SEGMENTS.map((seg) => (
            <div
              key={seg.label}
              className={cn("h-full", seg.colorClass)}
              style={{ width: `${(seg.count / TOTAL_DEALS) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {PIPELINE_SEGMENTS.map((seg) => (
            <div key={seg.label} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-2 w-2 rounded-full", seg.colorClass)} />
              <span className="text-text-muted leading-none">
                {seg.label}
              </span>
              <span className="text-text-dim tabular-nums leading-none">
                ({seg.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deal cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {DEALS.map((deal) => (
          <DealCard key={deal.name} deal={deal} />
        ))}
      </div>
    </div>
  )
}

function DealCard({ deal }: { deal: Deal }) {
  const Icon = deal.type === "Industrial" ? Building2 : Building

  return (
    <div
      className={cn(
        "relative flex flex-col h-full rounded-lg border bg-surface border-l-2 card-hover",
        PHASE_BORDER[deal.phase]
      )}
    >
      {/* Card body */}
      <div className="p-4 flex-1">
        {/* Icon + name + location */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 h-9 w-9 rounded-md bg-surface-light flex items-center justify-center">
            <Icon className="h-4.5 w-4.5 text-text-muted" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate leading-tight">
              {deal.name}
            </p>
            <p className="flex items-center gap-1 text-text-dim mt-0.5 leading-tight">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{deal.location}</span>
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-text-dim leading-none mb-1">
              Price
            </p>
            <p className="text-sm font-semibold tabular-nums leading-tight text-text-primary">
              {deal.price}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-text-dim leading-none mb-1">
              Cap Rate
            </p>
            <p className="text-sm font-semibold tabular-nums leading-tight text-text-primary">
              {deal.capRate}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-text-dim leading-none mb-1">
              Total SF
            </p>
            <p className="text-sm font-semibold tabular-nums leading-tight text-text-primary">
              {deal.sf}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 py-2.5 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={cn("inline-block h-2 w-2 rounded-full", PHASE_DOT[deal.phase])} />
          <span className="text-text-muted leading-none">{deal.phase}</span>
        </div>
        <div className="flex items-center gap-1 text-text-dim">
          <Clock className="h-3 w-3" />
          <span className="leading-none">{deal.updatedAgo}</span>
        </div>
      </div>
    </div>
  )
}
