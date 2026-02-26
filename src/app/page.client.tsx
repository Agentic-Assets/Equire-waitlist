"use client";

import Demo from "~/components/demo";
import Faq from "~/components/faq";
import Footer from "~/components/footer";
import Hero from "~/components/hero";
import ValueProps from "~/components/value-props";

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  return (
    <main className="mx-auto max-w-screen-2xl w-full h-full flex-1 flex flex-col relative">
      <Hero waitlistPeople={waitlistPeople} />
      <Demo videoSrc="/demo.mp4" thumbnailSrc="/demo.png" />
      <ValueProps />
      <Faq />
      <Footer />
    </main>
  );
}
