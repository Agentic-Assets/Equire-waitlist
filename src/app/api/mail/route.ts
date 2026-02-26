import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";

import WelcomeTemplate from "~/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	const { email, name } = await request.json();

	const { data, error } = await resend.emails.send({
		from: process.env.RESEND_FROM_EMAIL || "",
		to: [email],
		subject: "Welcome to the EQUIRE Waitlist",
		react: WelcomeTemplate({ userFirstname: name }),
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	if (!data) {
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}

	return NextResponse.json(
		{ message: "Email sent successfully" },
		{ status: 200 },
	);
}
