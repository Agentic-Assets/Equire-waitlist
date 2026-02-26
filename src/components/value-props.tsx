"use client";

import { motion } from "motion/react";
import { FileText, LineChart, ClipboardCheck } from "lucide-react";

const props = [
	{
		icon: FileText,
		title: "Documents to Data in Minutes",
		description:
			"Upload rent rolls, OMs, T-12s, leases, and environmental reports. EQUIRE extracts every data point and maps it directly into your deal.",
	},
	{
		icon: LineChart,
		title: "Institutional-Grade DCF Models",
		description:
			"Fully underwritten models with tenant-level projections, scenario analysis, and sensitivity tables — generated automatically. No spreadsheets to build or audit.",
	},
	{
		icon: ClipboardCheck,
		title: "Auto-Generated IC Memos",
		description:
			"Generate 12-section investment committee memorandums pulled from your deal data, documents, and market research. Export-ready in one click.",
	},
];

export default function ValueProps() {
	return (
		<div className="py-10 sm:py-16 px-4">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-8 sm:mb-12">
					<h2 className="text-2xl sm:text-3xl font-semibold text-foreground font-heading">
						Execution Infrastructure for Modern Acquisitions Teams
					</h2>
					<p className="text-muted-foreground mt-2 max-w-lg mx-auto">
						A structured, research-driven environment for underwriting, diligence, and IC delivery.
					</p>
				</div>
				<div className="grid sm:grid-cols-3 gap-6 sm:gap-8 items-start">
					{props.map((prop, i) => (
						<motion.div
							key={prop.title}
							className="flex flex-col items-center text-center gap-3"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
						>
							<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold-light border border-gold/20">
								<prop.icon className="w-6 h-6 text-gold" />
							</div>
							<h3 className="text-lg font-semibold text-foreground">
								{prop.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{prop.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
