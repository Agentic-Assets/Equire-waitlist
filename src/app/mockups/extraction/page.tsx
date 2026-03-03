"use client"

import { cn } from "~/lib/utils"
import {
  FileText,
  Building2,
  DollarSign,
  AlertTriangle,
  Check,
  Shield,
  RefreshCw,
} from "lucide-react"

type SourceType = "doc" | "ai" | "fund"

interface ExtractedField {
  field: string
  value: string
  source: string
  sourceType: SourceType
  confidence: number
  isMono?: boolean
}

const PROPERTY_FIELDS: ExtractedField[] = [
  { field: "Property Name", value: "Southpoint Industrial Park", source: "Offering Memorandum", sourceType: "doc", confidence: 99 },
  { field: "Address", value: "4200 Southpoint Parkway, Austin, TX", source: "Offering Memorandum", sourceType: "doc", confidence: 99 },
  { field: "Property Type", value: "Industrial / Warehouse", source: "Appraisal", sourceType: "doc", confidence: 97 },
  { field: "Total SF", value: "182,350", source: "Rent Roll", sourceType: "doc", confidence: 99, isMono: true },
  { field: "Asking Price", value: "$42,500,000", source: "Offering Memorandum", sourceType: "doc", confidence: 98, isMono: true },
]

interface FinancialLine {
  label: string
  amount: string
  perSf: string
  confidence: number
  isNeg?: boolean
  isTotal?: boolean
}

const FINANCIALS: FinancialLine[] = [
  { label: "Potential Gross Revenue", amount: "$2,389,414", perSf: "$13.10", confidence: 98 },
  { label: "Vacancy & Credit Loss", amount: "($143,365)", perSf: "($0.79)", confidence: 95, isNeg: true },
  { label: "Effective Gross Income", amount: "$2,246,049", perSf: "$12.31", confidence: 98 },
  { label: "Total Operating Expenses", amount: "($791,233)", perSf: "($4.34)", confidence: 97, isNeg: true },
  { label: "Net Operating Income", amount: "$1,454,816", perSf: "$7.98", confidence: 97, isTotal: true },
]

const ENV_ITEMS = [
  { label: "Phase I ESA", value: "No RECs identified", good: true },
  { label: "PCA", value: "$145,000 in immediate repairs", good: false },
  { label: "Roof Condition", value: "Good (12 yrs remaining)", good: true },
]

function ConfidenceBar({ confidence }: { confidence: number }) {
  const color = confidence >= 90 ? "bg-emerald-500" : confidence >= 70 ? "bg-accent" : "bg-warning"
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 rounded-full bg-border overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${confidence}%` }} />
      </div>
      <span className="text-[12px] text-text-dim font-mono">{confidence}%</span>
    </div>
  )
}

function SourcePill({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 whitespace-nowrap">
      <FileText className="h-3 w-3" />
      {source}
    </span>
  )
}

export default function ExtractionMockup() {
  return (
    <div className="w-[960px] h-[540px] bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-5 pb-4 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[26px] font-bold tracking-tight text-text-primary leading-none">
              Extracted Data
            </h1>
            <span className="bg-warning/10 text-warning border border-warning/30 text-[12px] px-2.5 py-0.5 rounded-full font-medium">
              2 conflicts
            </span>
          </div>
          <p className="text-[14px] text-text-muted mt-1.5">
            Auto-extracted from 12 documents &middot; Last updated 2 min ago
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[14px] font-semibold text-accent-foreground"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Conflict banner */}
      <div className="mx-8 bg-warning/5 border border-warning/30 rounded-xl p-4 mb-4 shrink-0">
        <div className="flex items-center gap-2 mb-2.5">
          <AlertTriangle className="h-4.5 w-4.5 text-warning" />
          <h3 className="text-[15px] font-semibold text-text-primary">Data Conflicts</h3>
        </div>
        <div className="flex gap-3">
          {[
            { field: "Total SF", a: "182,350 (Rent Roll, 99%)", b: "183,000 (OM, 85%)" },
            { field: "Year Built", a: "2018 (Appraisal, 92%)", b: "2019 (OM, 78%)" },
          ].map((c) => (
            <div key={c.field} className="flex-1 flex items-center justify-between bg-surface/60 rounded-lg px-4 py-2.5 border border-border/50">
              <div className="text-[14px]">
                <span className="font-semibold text-text-primary">{c.field}: </span>
                <span className="text-text-muted">{c.a} vs {c.b}</span>
              </div>
              <button className="shrink-0 rounded-lg border border-warning/40 bg-warning/10 px-3 py-1.5 text-[13px] text-warning font-semibold">
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex-1 flex gap-5 px-8 pb-5 min-h-0 overflow-hidden">
        {/* Left: Property Info */}
        <div className="flex-1 bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="px-5 py-2.5 border-b border-border bg-surface-light flex items-center gap-2 shrink-0">
            <Building2 className="h-4 w-4 text-text-muted" />
            <h2 className="text-[15px] font-semibold text-text-primary">Property Information</h2>
            <span className="ml-auto text-[11px] text-text-dim bg-surface px-2 py-0.5 rounded-full border border-border">5 fields</span>
          </div>
          <div className="flex-1 overflow-hidden">
            {PROPERTY_FIELDS.map((row, i) => (
              <div
                key={row.field}
                className={cn(
                  "px-5 py-2.5 flex items-center",
                  i < PROPERTY_FIELDS.length - 1 && "border-b border-border/50"
                )}
              >
                <span className="text-[13px] text-text-muted w-28 shrink-0">{row.field}</span>
                <span className={cn("text-[14px] font-semibold text-text-primary flex-1", row.isMono && "font-mono")}>{row.value}</span>
                <div className="flex items-center gap-2.5 shrink-0">
                  <SourcePill source={row.source} />
                  <ConfidenceBar confidence={row.confidence} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Financials + Environmental */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Financials */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden flex-1">
            <div className="px-5 py-2.5 border-b border-border bg-surface-light flex items-center gap-2 shrink-0">
              <DollarSign className="h-4 w-4 text-text-muted" />
              <h2 className="text-[15px] font-semibold text-text-primary">Financial Summary (T-12)</h2>
            </div>
            <div>
              {FINANCIALS.map((line, i) => (
                <div
                  key={line.label}
                  className={cn(
                    "px-5 py-2 flex items-center",
                    i < FINANCIALS.length - 1 && "border-b border-border/50",
                    line.isTotal && "bg-accent/5"
                  )}
                >
                  <span className={cn("text-[13px] text-text-primary flex-1", line.isTotal && "font-bold")}>{line.label}</span>
                  <span className={cn("text-[14px] font-mono tabular-nums text-text-primary w-24 text-right", line.isTotal && "font-bold")}>{line.amount}</span>
                  <span className={cn("text-[13px] font-mono tabular-nums text-text-muted w-16 text-right", line.isTotal && "font-bold text-text-primary")}>{line.perSf}</span>
                  <div className="w-24 ml-3 shrink-0"><ConfidenceBar confidence={line.confidence} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden shrink-0">
            <div className="px-5 py-2.5 border-b border-border bg-surface-light flex items-center gap-2">
              <Shield className="h-4 w-4 text-text-muted" />
              <h2 className="text-[15px] font-semibold text-text-primary">Environmental & Physical</h2>
            </div>
            <div>
              {ENV_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className={cn("px-5 py-2.5 flex items-center gap-3", i < ENV_ITEMS.length - 1 && "border-b border-border/50")}
                >
                  <span className="text-[13px] text-text-muted w-24 shrink-0">{item.label}</span>
                  {item.good ? (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/10 shrink-0">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </span>
                  ) : (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-warning/10 shrink-0">
                      <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                    </span>
                  )}
                  <span className="text-[14px] text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
