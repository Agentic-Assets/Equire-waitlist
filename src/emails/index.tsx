import * as React from 'react';
import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
	Tailwind,
} from '@react-email/components';

const WaitlistEmail = ({ userFirstname }: { userFirstname: string }) => {
	const currentYear = new Date().getFullYear();

	return (
		<Html>
			<Tailwind>
				<Head>
					<title>Welcome to EQUIRE</title>
					<Preview>You're on the EQUIRE waitlist — we'll be in touch soon.</Preview>
					<style>
						{`
              @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:wght@400;500&display=swap');
            `}
					</style>
				</Head>
				<Body className="bg-[#0A0E17] py-[40px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
					<Container className="bg-[#111827] rounded-[12px] mx-auto p-[40px] max-w-[600px]" style={{ border: '1px solid #1E2D3D' }}>
						{/* Logo */}
						<Section className="text-center">
							<Img
								src="https://equire.ai/equire_light.png"
								alt="EQUIRE"
								width="160"
								height="28"
								className="mx-auto"
							/>
						</Section>

						{/* Hero */}
						<Section className="mt-[32px] text-center">
							<Text
								className="text-[26px] text-white m-0 leading-[1.3]"
								style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
							>
								You're on the list.
							</Text>

							<Text className="text-[16px] text-[#94A3B8] mt-[12px] mb-[24px]">
								Thanks for your interest in EQUIRE.
							</Text>

							<Hr className="border-solid border-[#1E2D3D] my-[24px]" />
						</Section>

						{/* Body */}
						<Section>
							<Text className="text-[15px] leading-[26px] text-[#F1F5F9]">
								Hi {userFirstname},
							</Text>

							<Text className="text-[15px] leading-[26px] text-[#CBD5E1]">
								We're building AI-powered deal intelligence for commercial real estate acquisitions — from document ingestion to IC memo, in a fraction of the time.
							</Text>

							<Text className="text-[15px] leading-[26px] text-[#CBD5E1]">
								You've secured your spot on the early access waitlist. We'll reach out as soon as we're ready for you.
							</Text>

							{/* Feature highlights */}
							<Section className="my-[28px] rounded-[8px] p-[24px]" style={{ backgroundColor: '#0A0E17', border: '1px solid #1E2D3D' }}>
								<Text className="text-[13px] text-[#D4A843] font-semibold tracking-wider uppercase m-0 mb-[16px]">
									What EQUIRE Does
								</Text>
								<Text className="text-[14px] leading-[24px] text-[#94A3B8] m-0">
									<span style={{ color: '#D4A843' }}>&#9632;</span>&nbsp;&nbsp;Extract rent rolls, OMs, T-12s, and leases automatically
								</Text>
								<Text className="text-[14px] leading-[24px] text-[#94A3B8] m-0">
									<span style={{ color: '#D4A843' }}>&#9632;</span>&nbsp;&nbsp;Generate institutional-grade DCF models
								</Text>
								<Text className="text-[14px] leading-[24px] text-[#94A3B8] m-0">
									<span style={{ color: '#D4A843' }}>&#9632;</span>&nbsp;&nbsp;Produce export-ready IC memos in one click
								</Text>
							</Section>

							<Text className="text-[15px] leading-[26px] text-[#CBD5E1]">
								In the meantime, share your referral link with colleagues to move up the line.
							</Text>

							<Text className="text-[15px] leading-[26px] text-[#CBD5E1] mt-[24px]">
								— The EQUIRE Team
							</Text>
						</Section>

						<Hr className="border-solid border-[#1E2D3D] my-[32px]" />

						{/* Footer */}
						<Section>
							<Text className="text-[12px] text-[#64748B] text-center m-0">
								© {currentYear} Agentic Assets Inc. All rights reserved.
							</Text>
							<Text className="text-[12px] text-[#64748B] text-center m-0 mt-[8px]">
								You're receiving this because you signed up for the EQUIRE waitlist.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WaitlistEmail;
