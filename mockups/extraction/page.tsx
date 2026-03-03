"use client"

import { cn } from "@/lib/utils"
import {
  FileText,
  Building2,
  Users,
  DollarSign,
  AlertTriangle,
  Check,
  Shield,
  RefreshCw,
} from "lucide-react"

// ---- Static data ----

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
  { field: "Address", value: "4200 Southpoint Parkway", source: "Offering Memorandum", sourceType: "doc", confidence: 99 },
  { field: "City, State", value: "Austin, TX", source: "Offering Memorandum", sourceType: "doc", confidence: 99 },
  { field: "Property Type", value: "Industrial / Warehouse", source: "Appraisal", sourceType: "doc", confidence: 97 },
  { field: "Total SF", value: "182,350", source: "Rent Roll", sourceType: "doc", confidence: 99, isMono: true },
  { field: "Year Built", value: "2018", source: "Appraisal", sourceType: "doc", confidence: 92, isMono: true },
  { field: "Zoning", value: "LI (Light Industrial)", source: "Zoning Report", sourceType: "doc", confidence: 95 },
  { field: "Asking Price", value: "$42,500,000", source: "Offering Memorandum", sourceType: "doc", confidence: 98, isMono: true },
]

interface Tenant {
  name: string
  suite: string
  sf: string
  rentPerSf: string
  leaseStart: string
  leaseEnd: string
  source: string
  confidence: number
}

const TENANTS: Tenant[] = [
  { name: "Bluefin Analytics, LLC", suite: "100", sf: "76,587", rentPerSf: "$13.25", leaseStart: "Jan 2023", leaseEnd: "Jun 2028", source: "Rent Roll", confidence: 99 },
  { name: "Vertex Logistics Corp", suite: "200", sf: "32,450", rentPerSf: "$11.80", leaseStart: "Apr 2022", leaseEnd: "Mar 2031", source: "Rent Roll", confidence: 99 },
  { name: "Lone Star Fabrication", suite: "300", sf: "24,100", rentPerSf: "$12.00", leaseStart: "Jul 2021", leaseEnd: "Dec 2029", source: "Rent Roll", confidence: 98 },
  { name: "DataPrime Solutions", suite: "400", sf: "18,200", rentPerSf: "$14.50", leaseStart: "Aug 2024", leaseEnd: "Aug 2030", source: "Rent Roll", confidence: 99 },
  { name: "Greenfield Supply Co", suite: "500", sf: "8,437", rentPerSf: "$11.50", leaseStart: "Nov 2022", leaseEnd: "Nov 2027", source: "Rent Roll", confidence: 97 },
]

interface FinancialLine {
  label: string
  amount: string
  perSf: string
  source: string
  confidence: number
  isNegative?: boolean
  isTotal?: boolean
}

const FINANCIALS: FinancialLine[] = [
  { label: "Potential Gross Revenue", amount: "$2,389,414", perSf: "$13.10", source: "T-12", confidence: 98 },
  { label: "Vacancy & Credit Loss", amount: "($143,365)", perSf: "($0.79)", source: "T-12", confidence: 95, isNegative: true },
  { label: "Effective Gross Income", amount: "$2,246,049", perSf: "$12.31", source: "T-12", confidence: 98 },
  { label: "Property Taxes", amount: "($328,230)", perSf: "($1.80)", source: "T-12", confidence: 99, isNegative: true },
  { label: "Insurance", amount: "($91,175)", perSf: "($0.50)", source: "T-12", confidence: 97, isNegative: true },
  { label: "Maintenance & Repairs", amount: "($164,115)", perSf: "($0.90)", source: "T-12", confidence: 94, isNegative: true },
  { label: "Management Fee", amount: "($67,381)", perSf: "($0.37)", source: "T-12", confidence: 96, isNegative: true },
  { label: "Total Operating Expenses", amount: "($791,233)", perSf: "($4.34)", source: "T-12", confidence: 97, isNegative: true },
  { label: "Net Operating Income", amount: "$1,454,816", perSf: "$7.98", source: "T-12", confidence: 97, isTotal: true },
]

interface EnvItem {
  label: string
  value: string
  status: "good" | "warning" | "neutral"
}

const ENV_ITEMS: EnvItem[] = [
  { label: "Phase I ESA", value: "No RECs identified", status: "good" },
  { label: "PCA", value: "$145,000 in immediate repairs", status: "warning" },
  { label: "Roof Condition", value: "Good (estimated 12 years remaining)", status: "good" },
  { label: "Flood Zone", value: "Zone X (minimal risk)", status: "good" },
]

// ---- Helper components ----

function ConfidenceBar({ confidence }: { confidence: number }) {
  const barColor =
    confidence >= 90
      ? "bg-emerald-500"
      : confidence >= 70
        ? "bg-accent"
        : "bg-warning"

  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className={cn("h-full rounded-full", barColor)}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-[10px] text-text-dim font-mono ml-1">{confidence}%</span>
    </div>
  )
}

function SourcePill({ source, sourceType }: { source: string; sourceType: SourceType }) {
  const pillStyles: Record<SourceType, string> = {
    doc: "bg-emerald-500/10 text-emerald-600",
    ai: "bg-accent/10 text-accent",
    fund: "bg-gold/10 text-gold",
  }

  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap", pillStyles[sourceType])}>
      <FileText className="h-2.5 w-2.5" />
      {source}
    </span>
  )
}

function SectionCard({
  icon: Icon,
  title,
  badge,
  children,
}: {
  icon: React.ElementType
  title: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden mb-5">
      <div className="px-5 py-3 border-b border-border bg-surface-light flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-text-muted" />
          <h2 className="font-semibold text-text-primary">{title}</h2>
        </div>
        {badge && (
          <span className="text-[10px] text-text-dim bg-surface px-2 py-0.5 rounded-full border border-border">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

// ---- Page component ----

export default function ExtractionMockup() {
  return (
    <div className="p-4 md:p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Extracted Data
            </h1>
            <span className="bg-warning/10 text-warning border border-warning/30 text-xs px-2 py-0.5 rounded-full">
              2 conflicts
            </span>
          </div>
          <p className="text-text-muted mt-0.5">
            Auto-extracted from 12 documents &middot; Last updated 2 minutes ago
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Extraction</span>
        </button>
      </div>

      {/* Conflict banner */}
      <div className="bg-warning/5 border border-warning/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="font-semibold text-text-primary">Data Conflicts</h3>
        </div>
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-surface/60 rounded-md px-3.5 py-2.5 border border-border/50">
            <div>
              <span className="font-medium text-text-primary">Total SF: </span>
              <span className="text-text-muted">
                182,350 <span className="text-text-dim">(Rent Roll, 99%)</span> vs 183,000 <span className="text-text-dim">(Offering Memorandum, 85%)</span>
              </span>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md border border-warning/40 bg-warning/10 px-3 py-1 text-warning font-medium transition-colors hover:bg-warning/20"
            >
              Resolve
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-surface/60 rounded-md px-3.5 py-2.5 border border-border/50">
            <div>
              <span className="font-medium text-text-primary">Year Built: </span>
              <span className="text-text-muted">
                2018 <span className="text-text-dim">(Appraisal, 92%)</span> vs 2019 <span className="text-text-dim">(Offering Memorandum, 78%)</span>
              </span>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md border border-warning/40 bg-warning/10 px-3 py-1 text-warning font-medium transition-colors hover:bg-warning/20"
            >
              Resolve
            </button>
          </div>
        </div>
      </div>

      {/* Section 1: Property Information */}
      <SectionCard icon={Building2} title="Property Information" badge="8 of 10 fields extracted">
        <div>
          {PROPERTY_FIELDS.map((row, i) => (
            <div
              key={row.field}
              className={cn(
                "px-5 py-3 flex items-center justify-between hover:bg-surface-light/50 transition-colors",
                i < PROPERTY_FIELDS.length - 1 && "border-b border-border/50"
              )}
            >
              <span className="text-sm text-text-muted w-40 shrink-0">{row.field}</span>
              <div className="flex-1 min-w-0 mx-4">
                <span className={cn("text-sm font-semibold text-text-primary", row.isMono && "font-mono")}>
                  {row.value}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <SourcePill source={row.source} sourceType={row.sourceType} />
                <ConfidenceBar confidence={row.confidence} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Section 2: Tenant Roster */}
      <SectionCard icon={Users} title="Tenant Roster" badge="5 tenants">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-light border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Tenant</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Suite</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">SF</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Rent/SF</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Lease Start</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Lease End</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {TENANTS.map((tenant, i) => (
                <tr
                  key={tenant.name}
                  className={cn(
                    "hover:bg-surface-light/50 transition-colors",
                    i < TENANTS.length - 1 && "border-b border-border/50"
                  )}
                >
                  <td className="px-4 py-2.5 font-medium text-text-primary whitespace-nowrap">{tenant.name}</td>
                  <td className="px-4 py-2.5 text-text-muted font-mono tabular-nums">{tenant.suite}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-primary">{tenant.sf}</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-primary">{tenant.rentPerSf}</td>
                  <td className="px-4 py-2.5 text-text-muted whitespace-nowrap">{tenant.leaseStart}</td>
                  <td className="px-4 py-2.5 text-text-muted whitespace-nowrap">{tenant.leaseEnd}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <SourcePill source={tenant.source} sourceType="doc" />
                      <span className="text-[10px] text-text-dim font-mono">{tenant.confidence}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Section 3: Financial Summary */}
      <SectionCard icon={DollarSign} title="Financial Summary (T-12)" badge="9 line items">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-light border-b border-border">
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Line Item</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">T-12 Amount</th>
                <th className="text-right text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Per SF</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-text-dim font-semibold px-4 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {FINANCIALS.map((line, i) => (
                <tr
                  key={line.label}
                  className={cn(
                    "hover:bg-surface-light/50 transition-colors",
                    i < FINANCIALS.length - 1 && "border-b border-border/50",
                    line.isTotal && "bg-accent/5"
                  )}
                >
                  <td className={cn("px-4 py-2.5 text-text-primary whitespace-nowrap", line.isTotal && "font-bold")}>
                    {line.label}
                  </td>
                  <td className={cn("px-4 py-2.5 text-right font-mono tabular-nums text-text-primary", line.isTotal && "font-bold")}>
                    {line.amount}
                  </td>
                  <td className={cn("px-4 py-2.5 text-right font-mono tabular-nums text-text-muted", line.isTotal && "font-bold text-text-primary")}>
                    {line.perSf}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <SourcePill source={line.source} sourceType="doc" />
                      <span className="text-[10px] text-text-dim font-mono">{line.confidence}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Section 4: Environmental & Physical */}
      <SectionCard icon={Shield} title="Environmental & Physical" badge="4 items reviewed">
        <div>
          {ENV_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "px-5 py-3 flex items-center justify-between hover:bg-surface-light/50 transition-colors",
                i < ENV_ITEMS.length - 1 && "border-b border-border/50"
              )}
            >
              <span className="text-sm text-text-muted w-40 shrink-0">{item.label}</span>
              <div className="flex-1 min-w-0 mx-4 flex items-center gap-2">
                {item.status === "good" ? (
                  <span className="flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500/10">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center h-4 w-4 rounded-full bg-warning/10">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                  </span>
                )}
                <span className="text-sm text-text-primary">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
