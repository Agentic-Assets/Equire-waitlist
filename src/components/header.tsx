"use client";

import { cn } from "~/lib/utils";
import { useScroll } from "~/hooks/use-scroll";
import { GithubLogo } from "./svgs";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const scrolled = useScroll();

	return (
		<header
			className={cn(
				"py-4 flex flex-row gap-2 justify-between items-center md:px-10 sm:px-6 px-4 sticky top-0 z-50",
				scrolled &&
					"bg-background/50 md:bg-transparent md:backdrop-blur-none backdrop-blur-sm",
			)}
		>
			<Link href="/" className="flex items-center">
				<Image
					src="/equire_dark.png"
					alt="Equire"
					width={120}
					height={32}
					className="dark:hidden"
					priority
				/>
				<Image
					src="/equire_light.png"
					alt="Equire"
					width={120}
					height={32}
					className="hidden dark:block"
					priority
				/>
			</Link>

			<div className="flex items-center gap-2">
				<Link
					href="https://github.com/new?template_name=Waitly&template_owner=revokslab"
					target="_blank"
					rel="noopener noreferrer"
					className="cursor-pointer"
				>
					<Button variant="secondary">
						<GithubLogo />
						Use this template
					</Button>
				</Link>
			</div>
		</header>
	);
}
