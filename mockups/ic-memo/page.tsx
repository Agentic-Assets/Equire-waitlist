"use client"

import { cn } from "@/lib/utils"
import {
  Sparkles,
  Check,
  Clock,
  AlertTriangle,
  Copy,
  Edit,
  RotateCcw,
  ChevronRight,
  Download,
  FileText,
  Loader2,
} from "lucide-react"

// ---- Static data ----

type SectionStatus = "complete" | "generating" | "needs-input" | "pending"

interface MemoSection {
  emoji: string
  name: string
  status: SectionStatus
  wordCount?: number
}

const SECTIONS: MemoSection[] = [
  { emoji: "\u{1F4CB}", name: "Executive Summary", status: "complete", wordCount: 842 },
  { emoji: "\u{1F3E2}", name: "Transaction Overview", status: "complete", wordCount: 1124 },
  { emoji: "\u{1F4A1}", name: "Investment Thesis", status: "complete", wordCount: 967 },
  { emoji: "\u{1F4CA}", name: "Market Analysis", status: "complete", wordCount: 1453 },
  { emoji: "\u{1F3D7}\uFE0F", name: "Property & Physical Condition", status: "complete", wordCount: 1289 },
  { emoji: "\u{1F465}", name: "Tenancy & Lease Analysis", status: "complete", wordCount: 1587 },
  { emoji: "\u{1F4B0}", name: "Financial Analysis", status: "generating" },
  { emoji: "\u{1F3E6}", name: "Financing Structure", status: "pending" },
  { emoji: "\u26A0\uFE0F", name: "Risk Factors & Mitigants", status: "needs-input" },
  { emoji: "\u{1F4D0}", name: "Operational Plan", status: "needs-input" },
  { emoji: "\u{1F3AF}", name: "Fund Considerations", status: "pending" },
  { emoji: "\u270D\uFE0F", name: "Proposed Resolution", status: "pending" },
]

const SELECTED_INDEX = 5 // Tenancy & Lease Analysis

const STATUS_BADGE: Record<SectionStatus, { label: string; className: string }> = {
  complete: {
    label: "Complete",
    className: "bg-success/10 text-success",
  },
  generating: {
    label: "Generating",
    className: "bg-accent/10 text-accent",
  },
  "needs-input": {
    label: "Needs Input",
    className: "bg-warning/10 text-warning",
  },
  pending: {
    label: "Pending",
    className: "bg-surface-light text-text-dim",
  },
}

// ---- Tenant data for the table ----

interface Tenant {
  name: string
  suite: string
  sf: string
  pctNRA: string
  baseRentSF: string
  annualRent: string
  leaseExp: string
  escalations: string
}

const TENANTS: Tenant[] = [
  { name: "Bluefin Analytics, LLC", suite: "100", sf: "76,587", pctNRA: "42.0%", baseRentSF: "$13.25", annualRent: "$1,014,778", leaseExp: "Jun 2028", escalations: "3% Annual" },
  { name: "Vertex Logistics Corp", suite: "200", sf: "32,450", pctNRA: "17.8%", baseRentSF: "$11.80", annualRent: "$382,910", leaseExp: "Mar 2031", escalations: "CPI" },
  { name: "Lone Star Fabrication", suite: "300", sf: "24,100", pctNRA: "13.2%", baseRentSF: "$12.00", annualRent: "$289,200", leaseExp: "Dec 2029", escalations: "2.5% Annual" },
  { name: "DataPrime Solutions", suite: "400", sf: "18,200", pctNRA: "10.0%", baseRentSF: "$14.50", annualRent: "$263,900", leaseExp: "Aug 2030", escalations: "3% Annual" },
  { name: "Greenfield Supply Co", suite: "500", sf: "8,437", pctNRA: "4.6%", baseRentSF: "$11.50", annualRent: "$97,026", leaseExp: "Nov 2027", escalations: "Flat" },
  { name: "Summit Precision Mfg", suite: "600", sf: "6,000", pctNRA: "3.3%", baseRentSF: "$12.75", annualRent: "$76,500", leaseExp: "Feb 2032", escalations: "3% Annual" },
  { name: "Apex Coatings Inc", suite: "650", sf: "4,000", pctNRA: "2.2%", baseRentSF: "$13.00", annualRent: "$52,000", leaseExp: "Jan 2029", escalations: "2% Annual" },
  { name: "QuickShip Fulfillment", suite: "700", sf: "2,000", pctNRA: "1.1%", baseRentSF: "$15.00", annualRent: "$30,000", leaseExp: "Sep 2028", escalations: "3% Annual" },
]

const TABLE_HEADERS = ["Tenant", "Suite", "SF", "% NRA", "Base Rent/SF", "Annual Rent", "Lease Exp", "Escalations"]

// ---- Page component ----

export default function ICMemoMockup() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left sidebar */}
      <aside className="w-72 bg-surface border-r border-border flex flex-col flex-shrink-0">
        {/* Header area */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 mb-0.5">
            <FileText className="h-4 w-4 text-accent" />
            <h1 className="text-base font-semibold text-text-primary">IC Memo</h1>
          </div>
          <p className="text-xs text-text-muted">Southpoint Industrial Park</p>

          <button
            type="button"
            className="w-full bg-accent text-white rounded text-sm font-semibold py-2 mt-2 flex items-center justify-center gap-1.5 hover:bg-accent/90 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate All Sections
          </button>
          <button
            type="button"
            className="w-full border border-border rounded text-sm py-2 mt-1.5 flex items-center justify-center gap-1.5 text-text-primary hover:bg-surface-light transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download DOCX
          </button>
        </div>

        {/* Section list */}
        <nav className="flex-1 overflow-y-auto py-1">
          {SECTIONS.map((section, i) => {
            const isSelected = i === SELECTED_INDEX
            const badge = STATUS_BADGE[section.status]

            return (
              <button
                key={section.name}
                type="button"
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-surface-light",
                  isSelected && "bg-surface-light"
                )}
              >
                <span className="text-sm flex-shrink-0" aria-hidden="true">
                  {section.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-sm truncate",
                        isSelected ? "font-semibold text-text-primary" : "text-text-primary"
                      )}
                    >
                      {section.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium",
                        badge.className
                      )}
                    >
                      {section.status === "generating" && (
                        <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      )}
                      {section.status === "complete" && (
                        <Check className="h-2.5 w-2.5" />
                      )}
                      {section.status === "needs-input" && (
                        <AlertTriangle className="h-2.5 w-2.5" />
                      )}
                      {section.status === "pending" && (
                        <Clock className="h-2.5 w-2.5" />
                      )}
                      {badge.label}
                    </span>
                    {section.wordCount && (
                      <span className="text-[10px] text-text-dim">
                        {section.wordCount} words
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 flex-shrink-0",
                    isSelected ? "text-accent" : "text-text-dim"
                  )}
                />
              </button>
            )
          })}
        </nav>

        {/* Sidebar footer - progress */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center justify-between text-[11px] text-text-dim mb-1.5">
            <span>Progress</span>
            <span className="tabular-nums">6 / 12 sections</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-light overflow-hidden">
            <div className="h-full bg-accent rounded-full" style={{ width: "50%" }} />
          </div>
        </div>
      </aside>

      {/* Right panel */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Section header bar */}
        <header className="px-6 py-3 border-b border-border flex items-center justify-between bg-surface">
          <div className="flex items-center gap-3">
            <span className="text-lg" aria-hidden="true">
              {SECTIONS[SELECTED_INDEX].emoji}
            </span>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                {SECTIONS[SELECTED_INDEX].name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-medium",
                    STATUS_BADGE.complete.className
                  )}
                >
                  <Check className="h-2.5 w-2.5" />
                  Complete
                </span>
                <span className="text-[10px] text-text-dim tabular-nums">
                  1,587 words
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted rounded border border-border hover:bg-surface-light transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted rounded border border-border hover:bg-surface-light transition-colors"
            >
              <Edit className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted rounded border border-border hover:bg-surface-light transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <article className="max-w-4xl">
            {/* Section: Tenant Roster */}
            <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4">
              Tenant Roster and Lease Summary
            </h3>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              Southpoint Industrial Park is currently{" "}
              <strong>94.2% occupied</strong> across{" "}
              <strong>8 tenants</strong> totaling{" "}
              <strong>171,774 SF</strong> of leased space out of 182,350 SF total NRA{" "}
              <span className="text-text-dim italic text-xs">[Source: Rent Roll]</span>.
              The property benefits from a diversified tenant mix spanning data analytics,
              logistics, manufacturing, and fulfillment operations, providing exposure to
              multiple industrial subsectors within the Austin MSA.
            </p>

            {/* Tenant table */}
            <div className="overflow-x-auto mb-6">
              <table className="text-xs font-mono w-full border-collapse">
                <thead>
                  <tr>
                    {TABLE_HEADERS.map((h) => (
                      <th
                        key={h}
                        className="border border-border bg-surface-light px-2.5 py-2 text-left font-semibold text-text-primary whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TENANTS.map((t, i) => (
                    <tr
                      key={t.suite}
                      className={i % 2 === 0 ? "bg-surface" : "bg-background"}
                    >
                      <td className="border border-border px-2.5 py-1.5 text-text-primary font-medium whitespace-nowrap">
                        {t.name}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-center">
                        {t.suite}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {t.sf}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {t.pctNRA}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {t.baseRentSF}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {t.annualRent}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted whitespace-nowrap">
                        {t.leaseExp}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted whitespace-nowrap">
                        {t.escalations}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-text-primary leading-relaxed mb-6">
              Total in-place base rental revenue is{" "}
              <strong>$2,206,314 per annum</strong>, yielding a weighted average
              base rent of{" "}
              <strong>$12.84/SF</strong>{" "}
              <span className="text-text-dim italic text-xs">[Source: Rent Roll]</span>.
              This is approximately 4.8% below the current asking rate for
              comparable Class B industrial space in the Southeast Austin submarket
              ($13.49/SF), suggesting modest mark-to-market upside at lease renewal{" "}
              <span className="text-text-dim italic text-xs">[Source: Market Analysis]</span>.
            </p>

            {/* Section: Credit Quality */}
            <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-6">
              Credit Quality Assessment
            </h3>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              The tenant base represents a mix of regional mid-market companies with no
              investment-grade rated tenants.{" "}
              <strong>Bluefin Analytics</strong> (42.0% of NRA) is the dominant tenant
              and primary credit concentration risk. Founded in 2019, Bluefin is a
              privately held data analytics firm serving enterprise clients in the energy
              and healthcare sectors. The company has demonstrated consistent revenue
              growth (est. $45M revenue in 2025) and recently completed a Series C funding
              round of $28M{" "}
              <span className="text-text-dim italic text-xs">[Source: Web Research]</span>.
            </p>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              <strong>Vertex Logistics</strong> (17.8% of NRA) is a regional 3PL
              operator with 12 years of operating history and stable financials.
              The remaining six tenants each represent less than 14% of NRA individually,
              providing granularity that limits single-tenant exposure beyond the
              anchor tenant.
            </p>
            <p className="text-sm text-text-primary leading-relaxed mb-6">
              Management has obtained estoppels and tenant financial statements for the
              top four tenants (representing 83.0% of NRA). Preliminary credit review
              indicates adequate debt service coverage across all major tenants, though
              Greenfield Supply Co has shown declining margins over the past two fiscal
              years and bears monitoring{" "}
              <span className="text-text-dim italic text-xs">[Source: Financial Statements]</span>.
            </p>

            {/* Section: Lease Rollover */}
            <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2 mb-4 mt-6">
              Lease Rollover Analysis
            </h3>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              <strong>Weighted Average Lease Term (WALT): 4.2 years</strong>{" "}
              <span className="text-text-dim italic text-xs">[Source: Valuation Model]</span>
            </p>
            <p className="text-sm text-text-primary leading-relaxed mb-4">
              Near-term rollover exposure is concentrated in 2027-2028, with{" "}
              <strong>3 tenants representing 47.7% of base rent</strong> expiring
              within 24 months of the anticipated close date. This includes the anchor
              tenant Bluefin Analytics (lease expiration June 2028), which constitutes
              the single largest re-leasing risk in the portfolio.
            </p>

            {/* Rollover table */}
            <div className="overflow-x-auto mb-6">
              <table className="text-xs font-mono w-full border-collapse">
                <thead>
                  <tr>
                    {["Year", "Tenants Expiring", "SF Rolling", "% of NRA", "Cumulative %"].map((h) => (
                      <th
                        key={h}
                        className="border border-border bg-surface-light px-2.5 py-2 text-left font-semibold text-text-primary whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: "2027", tenants: "1", sf: "8,437", pct: "4.6%", cum: "4.6%" },
                    { year: "2028", tenants: "2", sf: "78,587", pct: "43.1%", cum: "47.7%" },
                    { year: "2029", tenants: "2", sf: "28,100", pct: "15.4%", cum: "63.1%" },
                    { year: "2030", tenants: "1", sf: "18,200", pct: "10.0%", cum: "73.1%" },
                    { year: "2031", tenants: "1", sf: "32,450", pct: "17.8%", cum: "90.9%" },
                    { year: "2032", tenants: "1", sf: "6,000", pct: "3.3%", cum: "94.2%" },
                  ].map((row, i) => (
                    <tr
                      key={row.year}
                      className={cn(
                        i % 2 === 0 ? "bg-surface" : "bg-background",
                        row.year === "2028" && "font-semibold"
                      )}
                    >
                      <td className="border border-border px-2.5 py-1.5 text-text-primary">
                        {row.year}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-center">
                        {row.tenants}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {row.sf}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {row.pct}
                      </td>
                      <td className="border border-border px-2.5 py-1.5 text-text-muted text-right tabular-nums">
                        {row.cum}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-text-primary leading-relaxed mb-4">
              The acquisition team has initiated preliminary discussions with Bluefin
              Analytics regarding an early lease extension. Management has indicated
              willingness to explore a 7-year renewal at market rates with a modest
              tenant improvement allowance ($5.00/SF), which would materially
              de-risk the investment by extending WALT to approximately 6.1 years{" "}
              <span className="text-text-dim italic text-xs">[Source: Broker Correspondence]</span>.
            </p>
            <p className="text-sm text-text-primary leading-relaxed">
              The underwriting base case assumes{" "}
              <strong>75% tenant retention</strong> with 6 months of downtime and
              $2.50/SF in leasing commissions on renewals. The downside case stress-tests
              Bluefin Analytics vacating at lease expiry, requiring 12 months of
              absorption at $12.00/SF with a $15.00/SF TI package for replacement
              tenancy{" "}
              <span className="text-text-dim italic text-xs">[Source: Valuation Model]</span>.
            </p>
          </article>
        </div>

        {/* Bottom bar - refine input */}
        <div className="px-6 py-3 border-t border-border bg-surface flex gap-2">
          <textarea
            className="flex-1 border border-border rounded px-3 py-2 text-sm bg-background text-text-primary placeholder:text-text-dim resize-none focus:outline-none focus:ring-1 focus:ring-accent"
            rows={1}
            placeholder="Refine this section... (e.g., 'Add more detail on Bluefin's credit profile')"
            readOnly
          />
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-accent rounded hover:bg-accent/90 transition-colors flex-shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Refine
          </button>
        </div>
      </main>
    </div>
  )
}
