"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screens = [
	{
		id: "pipeline",
		label: "Deal Pipeline",
		src: "/screenshots/pipeline.png",
		description:
			"Track every deal from screening to close. Real-time stats, stage-based views, and team-wide visibility.",
	},
	{
		id: "extraction",
		label: "Data Extraction",
		src: "/screenshots/extraction.png",
		description:
			"Upload documents and let EQUIRE extract structured data — with source provenance and conflict detection built in.",
	},
	{
		id: "valuation",
		label: "Valuation & DCF",
		src: "/screenshots/valuation.png",
		description:
			"Fully underwritten DCF models with scenario analysis, sensitivity tables, and assumption traceability.",
	},
	{
		id: "deal-overview",
		label: "Deal Overview",
		src: "/screenshots/deal-overview.png",
		description:
			"One view for everything: AI-powered risk analysis, due diligence checklists, activity feed, and deal metrics.",
	},
	{
		id: "ic-memo",
		label: "IC Memo",
		src: "/screenshots/ic-memo.png",
		description:
			"Auto-generated investment committee memos with tenant analysis, market context, and export-ready formatting.",
	},
];

export default function Screenshots() {
	const [active, setActive] = useState(0);

	const prev = () => setActive((i) => (i === 0 ? screens.length - 1 : i - 1));
	const next = () => setActive((i) => (i === screens.length - 1 ? 0 : i + 1));

	return (
		<div className="py-10 sm:py-16 px-4">
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-6 sm:mb-10">
					<h2 className="text-2xl sm:text-3xl font-semibold text-foreground font-heading">
						See It in Action
					</h2>
					<p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm sm:text-base">
						A look inside the platform.
					</p>
				</div>

				{/* Tab bar — scrollable on mobile */}
				<div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-5 sm:mb-8 scrollbar-hide">
					<div className="flex sm:flex-wrap sm:justify-center gap-2 min-w-max sm:min-w-0">
						{screens.map((screen, i) => (
							<button
								key={screen.id}
								type="button"
								onClick={() => setActive(i)}
								className={`shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
									active === i
										? "bg-accent text-accent-foreground"
										: "bg-surface-light text-text-muted hover:text-foreground"
								}`}
							>
								{screen.label}
							</button>
						))}
					</div>
				</div>

				{/* Screenshot display with nav arrows */}
				<div className="relative group">
					<div className="rounded-xl border border-border overflow-hidden bg-surface">
						<AnimatePresence mode="wait">
							<motion.div
								key={screens[active].id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<Image
									src={screens[active].src}
									alt={screens[active].label}
									width={1200}
									height={700}
									className="w-full h-auto"
									priority={active === 0}
								/>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Prev/Next arrows */}
					<button
						type="button"
						onClick={prev}
						className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity sm:left-3"
						aria-label="Previous screenshot"
					>
						<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
					</button>
					<button
						type="button"
						onClick={next}
						className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity sm:right-3"
						aria-label="Next screenshot"
					>
						<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
					</button>
				</div>

				{/* Dot indicators for mobile */}
				<div className="flex justify-center gap-1.5 mt-4 sm:hidden">
					{screens.map((screen, i) => (
						<button
							key={screen.id}
							type="button"
							onClick={() => setActive(i)}
							className={`w-2 h-2 rounded-full transition-colors ${
								active === i ? "bg-accent" : "bg-border"
							}`}
							aria-label={`Go to ${screen.label}`}
						/>
					))}
				</div>

				{/* Caption */}
				<AnimatePresence mode="wait">
					<motion.p
						key={screens[active].id}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.2 }}
						className="text-xs sm:text-sm text-muted-foreground text-center mt-3 sm:mt-4 max-w-xl mx-auto"
					>
						{screens[active].description}
					</motion.p>
				</AnimatePresence>
			</div>
		</div>
	);
}
