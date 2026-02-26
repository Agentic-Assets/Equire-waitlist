"use client";

import { useState } from "react";

import Image from "next/image";
import People from "./people";
import Form from "./form";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
	const [isSuccess, setIsSuccess] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center gap-8 pt-12 pb-8">
			<div className="flex flex-col items-center justify-center gap-5">
				<Image
					src="/equire_dark.png"
					alt="Equire"
					width={220}
					height={60}
					className="dark:hidden"
					priority
				/>
				<Image
					src="/equire_light.png"
					alt="Equire"
					width={220}
					height={60}
					className="hidden dark:block"
					priority
				/>
				<div className="flex items-center gap-3 rounded-full border border-border px-4 py-1.5">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
						<span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
					</span>
					<p className="uppercase text-xs font-medium tracking-wide">
						Early Access Coming Soon
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center gap-3 max-w-2xl px-4">
				<h1 className="text-4xl sm:text-5xl font-medium text-foreground text-center leading-tight font-heading">
					{isSuccess
						? "You're on the list."
						: "AI-Native Deal Execution for Commercial Real Estate"}
				</h1>
				<p className="text-base sm:text-lg text-muted-foreground text-center max-w-lg">
					{isSuccess
						? "We'll be in touch as soon as early access opens. In the meantime, share your link to move up the line."
						: "From document extraction to IC memo — a structured, research-powered execution environment where every assumption is tracked, every output defensible, and your team moves as one."}
				</p>
			</div>

			<div className="flex flex-col items-center justify-center gap-2 w-full max-w-md px-4">
				<Form onSuccessChange={setIsSuccess} />
			</div>

			<People count={waitlistPeople} />
		</div>
	);
}
