"use client";

import Faq from "~/components/faq";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import Screenshots from "~/components/screenshots";
import ValueProps from "~/components/value-props";

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  return (
    <main className="mx-auto max-w-screen-2xl w-full h-full flex-1 flex flex-col relative">
      <Hero waitlistPeople={waitlistPeople} />
      <Screenshots />
      <ValueProps />
      <Faq />
      <Footer />
    </main>
  );
}
