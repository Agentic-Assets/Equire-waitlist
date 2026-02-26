import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-8 sm:py-10 px-4">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground font-heading">
					Frequently Asked Questions
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Common questions about EQUIRE and the waitlist.
				</p>
			</div>
			<div className="w-full max-w-lg">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							What is EQUIRE?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							EQUIRE is an AI-powered deal intelligence platform built for
							commercial real estate acquisitions teams. It handles document
							ingestion, data extraction, DCF modeling, due diligence tracking,
							and IC memo generation in a single workspace.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							Who is EQUIRE built for?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Acquisitions teams, asset managers, investment committee members,
							and capital markets teams at CRE firms who want to underwrite
							faster with better data and get to IC sooner.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							What happens after I join the waitlist?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							You'll receive a confirmation email and a referral link. When early
							access opens, we'll invite people from the waitlist in order.
							Sharing your referral link moves you up the line.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
