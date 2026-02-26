export default function Footer() {
	return (
		<footer className="flex flex-col justify-center items-center gap-2 pb-6 pt-4">
			<p className="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} EQUIRE. All rights reserved.
			</p>
			<p className="text-xs text-muted-foreground">
				Deal Intelligence for Commercial Real Estate
			</p>
		</footer>
	);
}
